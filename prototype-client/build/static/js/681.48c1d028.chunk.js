"use strict";(self.webpackChunkprototype_client=self.webpackChunkprototype_client||[]).push([[681],{5218:function(t,e,r){r.d(e,{E:function(){return I}});var n=r(5671),o=r(3144),i=r(136),a=r(7277),c=r(7762),u=r(2791),s=r(8737),h=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","#","$","%","*","+",",","-",".",":",";","=","?","@","[","]","^","_","{","|","}","~"],l=function(t){for(var e=0,r=0;r<t.length;r++){var n=t[r];e=83*e+h.indexOf(n)}return e},f=function(t){var e=t/255;return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)},p=function(t){var e=Math.max(0,Math.min(1,t));return e<=.0031308?Math.trunc(12.92*e*255+.5):Math.trunc(255*(1.055*Math.pow(e,.4166666666666667)-.055)+.5)},d=function(t,e){return function(t){return t<0?-1:1}(t)*Math.pow(Math.abs(t),e)},v=function(t){(0,i.Z)(r,t);var e=(0,a.Z)(r);function r(t){var o;return(0,n.Z)(this,r),(o=e.call(this,t)).name="ValidationError",o.message=t,o}return(0,o.Z)(r)}((0,s.Z)(Error)),g=function(t){if(!t||t.length<6)throw new v("The blurhash string must be at least 6 characters");var e=l(t[0]),r=Math.floor(e/9)+1,n=e%9+1;if(t.length!==4+2*n*r)throw new v("blurhash length mismatch: length is ".concat(t.length," but it should be ").concat(4+2*n*r))},y=function(t){var e=t>>8&255,r=255&t;return[f(t>>16),f(e),f(r)]},m=function(t,e){var r=Math.floor(t/361),n=Math.floor(t/19)%19,o=t%19;return[d((r-9)/9,2)*e,d((n-9)/9,2)*e,d((o-9)/9,2)*e]},b=function(t,e,r,n){g(t),n|=1;for(var o=l(t[0]),i=Math.floor(o/9)+1,a=o%9+1,c=(l(t[1])+1)/166,u=new Array(a*i),s=0;s<u.length;s++)if(0===s){var h=l(t.substring(2,6));u[s]=y(h)}else{var f=l(t.substring(4+2*s,6+2*s));u[s]=m(f,c*n)}for(var d=4*e,v=new Uint8ClampedArray(d*r),b=0;b<r;b++)for(var w=0;w<e;w++){for(var Z=0,P=0,O=0,M=0;M<i;M++)for(var x=0;x<a;x++){var k=Math.cos(Math.PI*w*x/e)*Math.cos(Math.PI*b*M/r),j=u[x+M*a];Z+=j[0]*k,P+=j[1]*k,O+=j[2]*k}var C=p(Z),E=p(P),R=p(O);v[4*w+0+b*d]=C,v[4*w+1+b*d]=E,v[4*w+2+b*d]=R,v[4*w+3+b*d]=255}return v},w=Object.defineProperty,Z=Object.defineProperties,P=Object.getOwnPropertyDescriptors,O=Object.getOwnPropertySymbols,M=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable,k=function(t,e,r){return e in t?w(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r},j=function(t,e){for(var r in e||(e={}))M.call(e,r)&&k(t,r,e[r]);if(O){var n,o=(0,c.Z)(O(e));try{for(o.s();!(n=o.n()).done;){r=n.value;x.call(e,r)&&k(t,r,e[r])}}catch(i){o.e(i)}finally{o.f()}}return t},C=function(t,e){return Z(t,P(e))},E=function(t,e){var r={};for(var n in t)M.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(null!=t&&O){var o,i=(0,c.Z)(O(t));try{for(i.s();!(o=i.n()).done;){n=o.value;e.indexOf(n)<0&&x.call(t,n)&&(r[n]=t[n])}}catch(a){i.e(a)}finally{i.f()}}return r},R=function(t){(0,i.Z)(r,t);var e=(0,a.Z)(r);function r(){var t;return(0,n.Z)(this,r),(t=e.apply(this,arguments)).canvas=null,t.handleRef=function(e){t.canvas=e,t.draw()},t.draw=function(){var e=t.props,r=e.hash,n=e.height,o=e.punch,i=e.width;if(t.canvas){var a=b(r,i,n,o),c=t.canvas.getContext("2d"),u=c.createImageData(i,n);u.data.set(a),c.putImageData(u,0,0)}},t}return(0,o.Z)(r,[{key:"componentDidUpdate",value:function(){this.draw()}},{key:"render",value:function(){var t=this.props,e=(t.hash,t.height),r=t.width,n=E(t,["hash","height","width"]);return u.createElement("canvas",C(j({},n),{height:e,width:r,ref:this.handleRef}))}}]),r}(u.PureComponent);R.defaultProps={height:128,width:128};var N={position:"absolute",top:0,bottom:0,left:0,right:0,width:"100%",height:"100%"},I=function(t){(0,i.Z)(r,t);var e=(0,a.Z)(r);function r(){return(0,n.Z)(this,r),e.apply(this,arguments)}return(0,o.Z)(r,[{key:"componentDidUpdate",value:function(){if(this.props.resolutionX<=0)throw new Error("resolutionX must be larger than zero");if(this.props.resolutionY<=0)throw new Error("resolutionY must be larger than zero")}},{key:"render",value:function(){var t=this.props,e=t.hash,r=t.height,n=t.width,o=t.punch,i=t.resolutionX,a=t.resolutionY,c=t.style,s=E(t,["hash","height","width","punch","resolutionX","resolutionY","style"]);return u.createElement("div",C(j({},s),{style:C(j({display:"inline-block",height:r,width:n},c),{position:"relative"})}),u.createElement(R,{hash:e,height:a,width:i,punch:o,style:N}))}}]),r}(u.PureComponent);I.defaultProps={height:128,width:128,resolutionX:32,resolutionY:32}},6564:function(t,e,r){r.d(e,{Z:function(){return s}});var n=r(2791),o={cm:!0,mm:!0,in:!0,px:!0,pt:!0,pc:!0,em:!0,ex:!0,ch:!0,rem:!0,vw:!0,vh:!0,vmin:!0,vmax:!0,"%":!0};function i(t){var e=function(t){if("number"===typeof t)return{value:t,unit:"px"};var e,r=(t.match(/^[0-9.]*/)||"").toString();e=r.includes(".")?parseFloat(r):parseInt(r,10);var n=(t.match(/[^0-9]*$/)||"").toString();return o[n]?{value:e,unit:n}:(console.warn("React Spinners: ".concat(t," is not a valid css value. Defaulting to ").concat(e,"px.")),{value:e,unit:"px"})}(t);return"".concat(e.value).concat(e.unit)}var a=function(){return a=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},a.apply(this,arguments)},c=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(t);o<n.length;o++)e.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(t,n[o])&&(r[n[o]]=t[n[o]])}return r},u=function(t,e,r){var n="react-spinners-".concat(t,"-").concat(r);if("undefined"==typeof window||!window.document)return n;var o=document.createElement("style");document.head.appendChild(o);var i=o.sheet,a="\n    @keyframes ".concat(n," {\n      ").concat(e,"\n    }\n  ");return i&&i.insertRule(a,0),n}("ClipLoader","0% {transform: rotate(0deg) scale(1)} 50% {transform: rotate(180deg) scale(0.8)} 100% {transform: rotate(360deg) scale(1)}","clip");var s=function(t){var e=t.loading,r=void 0===e||e,o=t.color,s=void 0===o?"#000000":o,h=t.speedMultiplier,l=void 0===h?1:h,f=t.cssOverride,p=void 0===f?{}:f,d=t.size,v=void 0===d?35:d,g=c(t,["loading","color","speedMultiplier","cssOverride","size"]),y=a({background:"transparent !important",width:i(v),height:i(v),borderRadius:"100%",border:"2px solid",borderTopColor:s,borderBottomColor:"transparent",borderLeftColor:s,borderRightColor:s,display:"inline-block",animation:"".concat(u," ").concat(.75/l,"s 0s infinite linear"),animationFillMode:"both"},p);return r?n.createElement("span",a({style:y},g)):null}},1311:function(t,e,r){r.d(e,{N:function(){return d}});var n=r(1413),o=r(5671),i=r(3144),a=r(1752),c=r(1120),u=r(136),s=r(7277),h=r(8155),l=r(6160),f=function(t){(0,u.Z)(r,t);var e=(0,s.Z)(r);function r(t,n){return(0,o.Z)(this,r),e.call(this,t,n)}return(0,i.Z)(r,[{key:"bindMethods",value:function(){(0,a.Z)((0,c.Z)(r.prototype),"bindMethods",this).call(this),this.fetchNextPage=this.fetchNextPage.bind(this),this.fetchPreviousPage=this.fetchPreviousPage.bind(this)}},{key:"setOptions",value:function(t,e){(0,a.Z)((0,c.Z)(r.prototype),"setOptions",this).call(this,(0,n.Z)((0,n.Z)({},t),{},{behavior:(0,l.Gm)()}),e)}},{key:"getOptimisticResult",value:function(t){return t.behavior=(0,l.Gm)(),(0,a.Z)((0,c.Z)(r.prototype),"getOptimisticResult",this).call(this,t)}},{key:"fetchNextPage",value:function(t){return this.fetch((0,n.Z)((0,n.Z)({},t),{},{meta:{fetchMore:{direction:"forward"}}}))}},{key:"fetchPreviousPage",value:function(t){return this.fetch((0,n.Z)((0,n.Z)({},t),{},{meta:{fetchMore:{direction:"backward"}}}))}},{key:"createResult",value:function(t,e){var o,i,u=t.state,s=(0,a.Z)((0,c.Z)(r.prototype),"createResult",this).call(this,t,e),h=s.isFetching,f=s.isRefetching,p=h&&"forward"===(null===(o=u.fetchMeta)||void 0===o||null===(o=o.fetchMore)||void 0===o?void 0:o.direction),d=h&&"backward"===(null===(i=u.fetchMeta)||void 0===i||null===(i=i.fetchMore)||void 0===i?void 0:i.direction);return(0,n.Z)((0,n.Z)({},s),{},{fetchNextPage:this.fetchNextPage,fetchPreviousPage:this.fetchPreviousPage,hasNextPage:(0,l.Qy)(e,u.data),hasPreviousPage:(0,l.ZF)(e,u.data),isFetchingNextPage:p,isFetchingPreviousPage:d,isRefetching:f&&!p&&!d})}}]),r}(h.z),p=r(5391);function d(t,e){return(0,p.r)(t,f,e)}}}]);
//# sourceMappingURL=681.48c1d028.chunk.js.map