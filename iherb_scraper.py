#!/usr/bin/python
# -*- coding: utf-8 -*-

import sys
import requests
import re
import json
import gevent
from bs4 import BeautifulSoup, NavigableString
import itertools
flatten = itertools.chain.from_iterable

DOMAIN = 'http://www.iherb.com'
UNICODE_REGEX = re.compile(r'[^\x00-\x7f]|\r')
SERVING_TEXT_REGEX = re.compile(
  r'.*serving size:?\s*(?P<serve>.*)(servings)?|(?P<pserve>each packet)',
  re.IGNORECASE)
PRICE_REGEX = re.compile(r'\$(\d{1,2}\.?\d{0,2})')
NON_DIGITS_REGEX = re.compile(r'<|,|\*|%')
SIZE_REGEX = re.compile(r'\s?(\d{1,4}\.?\/?\d{0,3})\s?([a-zA-Z \-]+)')
SIZE_PARTITION_REGEX = re.compile(r',|or |\(|\)')
NUMBER_MAP = {
  'each': 1,
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8
}

def clean(unistr):
  decoded = re.sub(UNICODE_REGEX, '', unistr)
  return (' '.join(x.strip() for x in decoded.split('\n'))).strip()

def load_nutrients():
  nutrients = {}
  with open('app/data/nutrients.json') as data_file:
    nutrients = json.load(data_file)

  return nutrients

ALL_NUTRIENTS = load_nutrients()

def get_serving_text(facts_table):
  endRow = 3
  rows = facts_table.findAll('tr')[0:endRow]
  text = ''
  for row in rows:
    match = SERVING_TEXT_REGEX.match(clean(row.text))
    text = (text + ' ' + row.text) if row.strong else text
    if match:
      return match.group('serve') or match.group('pserve')

  return clean(text)

def get_container_size_text(text):
  return ','.join(text.split(',')[-2:])

def to_number(num):
  divider = '/'
  decimal = '.'
  if divider in num:
    fraction = num.split(divider)
    return float(fraction[0]) / float(fraction[1])
  elif decimal in num:
    return float(num)
  else:
    return int(num)

def get_alphanumber_size(text):
  tokens = re.split(r'\s+', text)
  amount = 1
  unit_tokens = []

  # unit word too long, take the first word
  for i, token in enumerate(tokens):
    token = token.lower()
    if token in NUMBER_MAP:
      amount = NUMBER_MAP[token]
      unit_tokens = tokens[i+1:]
      end_index = 1 if len(unit_tokens) > 5 else len(unit_tokens)
      unit_tokens = unit_tokens[:end_index]

  return {
    'amount': amount,
    'unit': ' '.join(unit_tokens)
  }

def get_sizes(text):
  partitions = re.split(SIZE_PARTITION_REGEX, text)

  sizes = []
  for part in reversed(partitions):
    match = SIZE_REGEX.match(part)
    if match:
      amount, unit = match.groups()
      sizes.append({
        'amount': to_number(amount),
        'unit': unit.strip()
      })

  if len(sizes) == 0:
    sizes.append(get_alphanumber_size(text))

  return sizes

def match_product_nutrient(product_nutrient):
  product_nutrient = ' '.join(product_nutrient.split(' ')[0:2]) + ' '
  for category, nutrientlist in ALL_NUTRIENTS.iteritems():
    for nutrients in nutrientlist:
      for nutrient in nutrients:
        if nutrient.lower() in product_nutrient.lower():
          return (category, nutrients[0])

  return (None, None)

def percent_to_num(field):
  number_str = re.sub(NON_DIGITS_REGEX, '', field)
  try:
    return 0 if number_str == '' else to_number(number_str)
  except ValueError:
    return 0

def price_to_float(field):
  match = PRICE_REGEX.match(field)
  return field if match is None else to_number(match.group(1))

def get_fact_table_rows(facts_table):
  rows = []
  maxc = 3
  for row in facts_table.findAll('tr'):
    rowdata = row.findAll('td')

    if len(rowdata) >= maxc and len(rowdata[0].text) > 1:
      row1, row2 = rowdata[0:2]
      if len(row1.contents) > 1 and len(row2.contents) > 1:
        for idx, text in enumerate(row1.contents):
          if isinstance(text, NavigableString):
            rows.append([clean(text), '', 0])
      else:
        values = [clean(f.text) for f in rowdata[0:maxc]]
        values[2] = percent_to_num(values[2])
        rows.append(values)

  return rows

def fill_nutrients_profile(facts_table, profile):
  profile['nutrients'] = {}
  row_keys = ['actual_name', 'amount', 'percent_dv']
  for category, nutrientlist in ALL_NUTRIENTS.iteritems():
    profile['num_' + category] = 0

  for row_values in get_fact_table_rows(facts_table):
    category, nutrient = match_product_nutrient(row_values[0])
    if nutrient is not None and \
       nutrient not in profile['nutrients']:
      profile['num_' + category] += 1
      profile['nutrients'][nutrient] = dict(zip(row_keys, row_values))
      profile['num_nutrients'] += 1

def has_overlapping_chars(text1, text2, min_overlap=3):
  text1 = text1.lower()
  text2 = text2.lower()
  if text1 == text2:
    return True

  count = index = 0
  for ch in text1:
    index = text2.find(ch, index)
    if index == -1:
      count = index = 0
    else:
      count += 1
    if count >= min_overlap:
      return True

  return False

def has_overlapping_words(text1, text2):
  for t1 in text1.split(' '):
    for t2 in text2.split(' '):
      if has_overlapping_chars(t1, t2):
        return True
  return False

def overlapping_sizes(containers, serves):
  for container_index, cont in enumerate(containers):
    for serve_index, serve in enumerate(serves):
      if has_overlapping_words(serve['unit'], cont['unit']):
        return (container_index, serve_index)

  return (0, -1)

def longest_index(arr):
  max_len = 0
  max_idx = -1

  for i, elem in enumerate(arr):
    length = len(elem)
    if length > max_len:
      max_len = length
      max_idx = i

  return max_idx

def get_display_name(text):
  text = text.replace('/', '/ ')
  return ','.join(text.split(',')[:-1])

def product_profile(html):
  profile = {'nutrients': {}, 'num_nutrients': 0}
  soup = BeautifulSoup(html)
  main = soup.find('div', {'id': 'mainContent'})
  tables = soup.findAll('table')
  index = longest_index(tables)
  price = main.find('span', class_='black20b')
  if not price or index < 0:
    return None

  facts_table = tables[index]
  fill_nutrients_profile(facts_table, profile)
  profile['name'] = main.find('h1').text
  profile['display_name'] = get_display_name(profile['name'])
  profile['price'] = price_to_float(price.text)
  profile['serving_text'] = get_serving_text(facts_table)
  serves = profile['serving_sizes'] = get_sizes(profile['serving_text'])
  profile['container_text'] = get_container_size_text(profile['name'])
  fullsizes = profile['container_sizes'] = get_sizes(profile['container_text'])

  full_index, serve_index = overlapping_sizes(fullsizes, serves)
  full_amt = fullsizes[full_index]['amount']
  serve_amt = serves[serve_index]['amount'] if serve_index >= 0 else full_amt
  profile['size_indexes'] = [full_index, serve_index]
  profile['price_per_serve'] = profile['price'] / (full_amt*1.0) * serve_amt
  return profile

i = 1
def process(jobs):
  profiles = []
  jobs = [j.value for j in jobs if j.value.status_code == 200]
  global i

  for val in jobs:
    print('{0}) Processing: {1}'.format(i, val.url))
    i = i + 1
    profile = product_profile(val.text)
    if profile:
      profile.update({'url': val.url + '?rcode=KQM091'})
      profiles.append(profile)

  return profiles

def process_page_links(url):
  response = requests.get(url)
  soup = BeautifulSoup(response.text)
  results = soup.find(
    'div', {'id': re.compile('display-res(.*)')}
  )
  if not results:
    return []
  results = results.findAll('p', {'class': 'description'})
  prefix = DOMAIN if results[0].find('a')['href'][0] == '/' else ''
  links = (prefix + res.find('a')['href'] for res in results)
  jobs = [gevent.spawn(requests.get, link) for link in links]
  gevent.wait(jobs)

  return [] if len(jobs) == 0 else process(jobs)

def process_search_pages(filename, category='multivitamins', min_nutrients=1):
  res = []
  page_no = 1
  hasLinks = True
  while hasLinks:
    url = DOMAIN + ('/{0}?p={1}').format(category, page_no)
    print(url)
    page_results = process_page_links(url)
    hasLinks = False if len(page_results) == 0 else True
    res += page_results
    page_no = page_no + 1

  res = filter(lambda x: x['num_Vitamins'] >= min_nutrients, res)
  sorter = lambda x: (-(x['num_Minerals'] + x['num_Vitamins']),
                      x['price_per_serve'])
  res = sorted(res, key=sorter)

  print ('Saving {0} results'.format(len(res)))
  if filename:
    with open(filename, 'w') as outfile:
      json.dump(res, outfile, indent=2)
  else:
    return res

def process_one_multiV():
  url = 'http://www.iherb.com/Deva-Multivitamin-Mineral-Supplement-Vegan-90-Coated-Tablets/12664'
  url = 'http://www.iherb.com/Nature-s-Plus-Source-of-Life-Gold-Liquid-Delicious-Tropical-Fruit-Flavor-8-fl-oz-236-ml/22998'
  url = 'http://www.iherb.com/Eclectic-Institute-Vita-Natal-Multi-Vitamin-Mineral-Formula-180-Tablets/15335'
  url = 'http://www.iherb.com/Rexall-Sundown-Naturals-Complete-Women-s-Multivitamin-Multimineral-Supplement-with-Herbs-90-Caplets/41060'
  #url = 'http://www.iherb.com/All-One-Nutritech-Original-Formula-Multiple-Vitamin-Mineral-Powder-15-9-oz-450-g/4521'
  r = requests.get(url)
  res = product_profile(r.text)
  filename='test.json'
  with open(filename, 'w') as outfile:
    json.dump(res, outfile, indent=2)
  print(res)

if __name__ == "__main__":
  outfile = 'app/data/results.json'
  if len(sys.argv) > 1:
    outfile = sys.argv[1]

  #postprocess(outfile)
  #process_search_pages('digestives.json', 'enzymes', 7)
  process_search_pages(outfile, min_nutrients=1)
  #process_one_multiV()
