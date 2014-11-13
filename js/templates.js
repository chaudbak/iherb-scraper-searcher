!function(){(window.nunjucksPrecompiled=window.nunjucksPrecompiled||{})["results.html"]=function(){function a(a,b,c,d,e){var f=null,g=null,h="";try{h+='<table id="nutrients">\n  <thead>\n  <tr>\n    <th class="header center">\n      <div class="normal">\n        Showing Columns: <br>\n        ';var i;if(i=(d.contextOrFrameLookup(b,c,"page_no")-1)*d.contextOrFrameLookup(b,c,"results_per_page")+1,c.set("start",i,!0),c.parent||(b.setVariable("start",i),b.addExport("start")),h+="\n        ",d.contextOrFrameLookup(b,c,"page_no")<d.contextOrFrameLookup(b,c,"total_pages")){h+="\n          ";var j;j=d.contextOrFrameLookup(b,c,"page_no")*d.contextOrFrameLookup(b,c,"results_per_page"),c.set("end",j,!0),c.parent||(b.setVariable("end",j),b.addExport("end")),h+="\n        "}else{h+="\n          ";var k;k=d.contextOrFrameLookup(b,c,"total_results"),c.set("end",k,!0),c.parent||(b.setVariable("end",k),b.addExport("end")),h+="\n        "}h+="\n        <b>",h+=d.suppressValue(d.contextOrFrameLookup(b,c,"start"),a.autoesc),h+=" to ",h+=d.suppressValue(d.contextOrFrameLookup(b,c,"end"),a.autoesc),h+="</b> <br>\n        (",h+=d.suppressValue(d.contextOrFrameLookup(b,c,"total_results"),a.autoesc),h+=" total)\n      </div>\n      ",h+=d.contextOrFrameLookup(b,c,"page_no")>1?'\n      <span data-navigate="prev">\n      ':'\n      <span class="hidden">\n      ',h+="\n        &#x21a4;\n      </span>\n      ",h+=d.contextOrFrameLookup(b,c,"page_no")<d.contextOrFrameLookup(b,c,"total_pages")?' \n      <span data-navigate="next">\n      ':'\n      <span class="hidden">\n      ',h+='\n        &#x21a6;\n      </span>\n      <div class="icon">\n      <a title="The codez" class="icon-github" href="https://github.com/alyssaq/iherb-scraper-searcher"></a>\n      </div>\n    </th>\n    ',c=c.push();var l=d.contextOrFrameLookup(b,c,"data");if(l)for(var m=l.length,n=0;n<l.length;n++){var o=l[n];c.set("row",o),c.set("loop.index",n+1),c.set("loop.index0",n),c.set("loop.revindex",m-n),c.set("loop.revindex0",m-n-1),c.set("loop.first",0===n),c.set("loop.last",n===m-1),c.set("loop.length",m),h+='\n    <th>\n      <a href="',h+=d.suppressValue(d.memberLookup(o,"url",a.autoesc),a.autoesc),h+='">',h+=d.suppressValue(d.memberLookup(o,"display_name",a.autoesc),a.autoesc),h+="</a>\n    </th>\n    "}c=c.pop(),h+='\n  </tr>\n  </thead>\n  <tbody style="height: 300px; overflow-y: auto">\n  <tr class="price">\n    <td class="header sorter" data-key="price">Price</td>\n    ',c=c.push();var p=d.contextOrFrameLookup(b,c,"data");if(p)for(var q=p.length,r=0;r<p.length;r++){var s=p[r];c.set("row",s),c.set("loop.index",r+1),c.set("loop.index0",r),c.set("loop.revindex",q-r),c.set("loop.revindex0",q-r-1),c.set("loop.first",0===r),c.set("loop.last",r===q-1),c.set("loop.length",q),h+="\n      <td>",h+=d.suppressValue(d.memberLookup(s,"price",a.autoesc),a.autoesc),h+="</td>\n    "}c=c.pop(),h+='\n  </tr>\n\n  <tr class="price_per_unit">\n    <td class="header sorter" data-key="price_per_unit">\n      Price per 1 unit\n    </td>\n    ',c=c.push();var t=d.contextOrFrameLookup(b,c,"data");if(t)for(var u=t.length,v=0;v<t.length;v++){var w=t[v];c.set("row",w),c.set("loop.index",v+1),c.set("loop.index0",v),c.set("loop.revindex",u-v),c.set("loop.revindex0",u-v-1),c.set("loop.first",0===v),c.set("loop.last",v===u-1),c.set("loop.length",u),h+="\n      <td>",h+=d.suppressValue(a.getFilter("round").call(b,d.memberLookup(w,"price_per_unit",a.autoesc),2),a.autoesc),h+="</td>\n    "}c=c.pop(),h+='\n  </tr>\n\n  <tr class="price_per_serve">\n    <td class="header sorter" data-key="price_per_serve">\n      Price per serve\n    </td>\n    ',c=c.push();var x=d.contextOrFrameLookup(b,c,"data");if(x)for(var y=x.length,z=0;z<x.length;z++){var A=x[z];c.set("row",A),c.set("loop.index",z+1),c.set("loop.index0",z),c.set("loop.revindex",y-z),c.set("loop.revindex0",y-z-1),c.set("loop.first",0===z),c.set("loop.last",z===y-1),c.set("loop.length",y),h+="\n      <td>",h+=d.suppressValue(a.getFilter("round").call(b,d.memberLookup(A,"price_per_serve",a.autoesc),2),a.autoesc),h+="</td>\n    "}c=c.pop(),h+='\n  </tr>\n\n  <tr class="container_size">\n    <td class="header">Container Size</td>\n    ',c=c.push();var B=d.contextOrFrameLookup(b,c,"data");if(B)for(var C=B.length,D=0;D<B.length;D++){var E=B[D];c.set("row",E),c.set("loop.index",D+1),c.set("loop.index0",D),c.set("loop.revindex",C-D),c.set("loop.revindex0",C-D-1),c.set("loop.first",0===D),c.set("loop.last",D===C-1),c.set("loop.length",C),h+="\n      <td>\n      ";var F;F=d.memberLookup(d.memberLookup(E,"container_sizes",a.autoesc),d.memberLookup(d.memberLookup(E,"size_indexes",a.autoesc),0,a.autoesc),a.autoesc),c.set("size",F,!0),c.parent||(b.setVariable("size",F),b.addExport("size")),h+="\n      ",h+=d.suppressValue(d.memberLookup(d.contextOrFrameLookup(b,c,"size"),"amount",a.autoesc),a.autoesc),h+="\n      </td>\n    "}c=c.pop(),h+='\n  </tr>\n\n  <tr class="serving_size">\n    <td class="header">Serving Size</td>\n    ',c=c.push();var G=d.contextOrFrameLookup(b,c,"data");if(G)for(var H=G.length,I=0;I<G.length;I++){var J=G[I];c.set("row",J),c.set("loop.index",I+1),c.set("loop.index0",I),c.set("loop.revindex",H-I),c.set("loop.revindex0",H-I-1),c.set("loop.first",0===I),c.set("loop.last",I===H-1),c.set("loop.length",H),h+="\n      <td>\n      ";var K;K=d.memberLookup(d.memberLookup(J,"serving_sizes",a.autoesc),d.memberLookup(d.memberLookup(J,"size_indexes",a.autoesc),1,a.autoesc),a.autoesc),c.set("size",K,!0),c.parent||(b.setVariable("size",K),b.addExport("size")),h+="\n      ",h+=d.suppressValue(d.memberLookup(d.contextOrFrameLookup(b,c,"size"),"amount",a.autoesc),a.autoesc),h+="\n      </td>\n    "}c=c.pop(),h+='\n  </tr>\n\n  <tr class="unit">\n    <td class="header">Unit</td>\n    ',c=c.push();var L=d.contextOrFrameLookup(b,c,"data");if(L)for(var M=L.length,N=0;N<L.length;N++){var O=L[N];c.set("row",O),c.set("loop.index",N+1),c.set("loop.index0",N),c.set("loop.revindex",M-N),c.set("loop.revindex0",M-N-1),c.set("loop.first",0===N),c.set("loop.last",N===M-1),c.set("loop.length",M),h+="\n      <td>\n      ";var P;P=d.memberLookup(d.memberLookup(O,"serving_sizes",a.autoesc),d.memberLookup(d.memberLookup(O,"size_indexes",a.autoesc),1,a.autoesc),a.autoesc),c.set("size",P,!0),c.parent||(b.setVariable("size",P),b.addExport("size")),h+="\n      ",h+=d.suppressValue(d.memberLookup(d.contextOrFrameLookup(b,c,"size"),"unit",a.autoesc),a.autoesc),h+="\n      </td>\n    "}c=c.pop(),h+="\n  </tr>\n\n  ",c=c.push();var Q=d.contextOrFrameLookup(b,c,"categories");if(Q)for(var R=Q.length,S=0;S<Q.length;S++){var T=Q[S];c.set("category",T),c.set("loop.index",S+1),c.set("loop.index0",S),c.set("loop.revindex",R-S),c.set("loop.revindex0",R-S-1),c.set("loop.first",0===S),c.set("loop.last",S===R-1),c.set("loop.length",R),h+='\n  <tr class="category">\n    <td class="header sorter" data-key="num_',h+=d.suppressValue(T,a.autoesc),h+='">',h+=d.suppressValue(T,a.autoesc),h+="</td>\n    ",c=c.push();var U=d.contextOrFrameLookup(b,c,"data");if(U)for(var V=U.length,W=0;W<U.length;W++){var X=U[W];c.set("row",X),c.set("loop.index",W+1),c.set("loop.index0",W),c.set("loop.revindex",V-W),c.set("loop.revindex0",V-W-1),c.set("loop.first",0===W),c.set("loop.last",W===V-1),c.set("loop.length",V),h+="\n      <td>",h+=d.suppressValue(d.memberLookup(X,"num_"+T,a.autoesc),a.autoesc),h+="</td>\n    "}c=c.pop(),h+="\n  </tr>\n\n  ",c=c.push();var Y=d.memberLookup(d.contextOrFrameLookup(b,c,"allnutrients"),T,a.autoesc);if(Y)for(var Z=Y.length,$=0;$<Y.length;$++){var _=Y[$];c.set("nutrients",_),c.set("loop.index",$+1),c.set("loop.index0",$),c.set("loop.revindex",Z-$),c.set("loop.revindex0",Z-$-1),c.set("loop.first",0===$),c.set("loop.last",$===Z-1),c.set("loop.length",Z),h+='\n  <tr>\n    <!-- <td><div  class=\'num_slider\'></div></td> -->\n    <td class="header">\n      <input type="checkbox" data-category="',h+=d.suppressValue(T,a.autoesc),h+='" ',h+=d.suppressValue(d.memberLookup(d.contextOrFrameLookup(b,c,"checkedBox"),d.memberLookup(_,0,a.autoesc),a.autoesc),a.autoesc),h+=">\n      ",h+=d.suppressValue(d.memberLookup(_,0,a.autoesc),a.autoesc),h+=" \n    </td>\n    ",c=c.push();var ab=d.contextOrFrameLookup(b,c,"data");if(ab)for(var bb=ab.length,cb=0;cb<ab.length;cb++){var db=ab[cb];if(c.set("row",db),c.set("loop.index",cb+1),c.set("loop.index0",cb),c.set("loop.revindex",bb-cb),c.set("loop.revindex0",bb-cb-1),c.set("loop.first",0===cb),c.set("loop.last",cb===bb-1),c.set("loop.length",bb),h+="\n      ",f=112,g=38,d.callWrap(d.memberLookup(d.memberLookup(db,"nutrients",a.autoesc),"hasOwnProperty",a.autoesc),'row["nutrients"]["hasOwnProp"]',[d.memberLookup(_,0,a.autoesc)])){h+="\n        ";var eb;eb=d.memberLookup(d.memberLookup(db,"nutrients",a.autoesc),d.memberLookup(_,0,a.autoesc),a.autoesc),c.set("cur_nutrient",eb,!0),c.parent||(b.setVariable("cur_nutrient",eb),b.addExport("cur_nutrient")),h+="\n\n        ",d.memberLookup(d.contextOrFrameLookup(b,c,"cur_nutrient"),"percent_dv",a.autoesc)>0?(h+="\n        <td>",h+=d.suppressValue(d.memberLookup(d.contextOrFrameLookup(b,c,"cur_nutrient"),"percent_dv",a.autoesc),a.autoesc),h+="</td>\n        "):""!=d.memberLookup(d.contextOrFrameLookup(b,c,"cur_nutrient"),"amount",a.autoesc)?(h+="\n        <td>",h+=d.suppressValue(d.memberLookup(d.contextOrFrameLookup(b,c,"cur_nutrient"),"amount",a.autoesc),a.autoesc),h+="</td>\n        "):h+="\n        <td>&#10004;</td>\n        ",h+="\n\n      "}else h+="\n      <td>***</td>\n      ";h+="\n    "}c=c.pop(),h+="\n  </tr> \n  "}c=c.pop(),h+="\n   \n  "}c=c.pop(),h+="\n</tbody>\n</table>",e(null,h)}catch(fb){e(d.handleError(fb,f,g))}}return{root:a}}()}();