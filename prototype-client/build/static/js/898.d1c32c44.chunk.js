"use strict";(self.webpackChunkprototype_client=self.webpackChunkprototype_client||[]).push([[898],{6856:function(t,e,i){i.d(e,{DJ5:function(){return r},x3N:function(){return s}});var n=i(9983);function s(t){return(0,n.w_)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0V0z"}},{tag:"path",attr:{d:"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"}}]})(t)}function r(t){return(0,n.w_)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0V0z"}},{tag:"path",attr:{d:"M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"}}]})(t)}},8556:function(t,e,i){i.d(e,{D:function(){return V}});var n,s,r,a,o,u,l=i(1413),c=i(9439),h=i(2791),v=i(5671),Z=i(3144),d=i(7326),f=i(136),p=i(7277),b=i(101),k=i(2346),w=i(6033),g=i(3889),y=i(3092),M=i(2756),m=i(7211),C=i(8974),O=i(9549),S=(n=new WeakMap,s=new WeakMap,r=new WeakMap,a=new WeakMap,o=new WeakSet,u=new WeakSet,function(t){(0,f.Z)(i,t);var e=(0,p.Z)(i);function i(t,l){var c;return(0,v.Z)(this,i),c=e.call(this),(0,b.Z)((0,d.Z)(c),u),(0,b.Z)((0,d.Z)(c),o),(0,k.Z)((0,d.Z)(c),n,{writable:!0,value:void 0}),(0,k.Z)((0,d.Z)(c),s,{writable:!0,value:void 0}),(0,k.Z)((0,d.Z)(c),r,{writable:!0,value:void 0}),(0,k.Z)((0,d.Z)(c),a,{writable:!0,value:void 0}),(0,y.Z)((0,d.Z)(c),s,void 0),(0,y.Z)((0,d.Z)(c),n,t),c.setOptions(l),c.bindMethods(),(0,g.Z)((0,d.Z)(c),o,x).call((0,d.Z)(c)),c}return(0,Z.Z)(i,[{key:"bindMethods",value:function(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}},{key:"setOptions",value:function(t){var e,i=this.options;this.options=(0,w.Z)(this,n).defaultMutationOptions(t),(0,O.VS)(i,this.options)||(0,w.Z)(this,n).getMutationCache().notify({type:"observerOptionsUpdated",mutation:(0,w.Z)(this,r),observer:this}),null===(e=(0,w.Z)(this,r))||void 0===e||e.setOptions(this.options)}},{key:"onUnsubscribe",value:function(){var t;this.hasListeners()||(null===(t=(0,w.Z)(this,r))||void 0===t||t.removeObserver(this))}},{key:"onMutationUpdate",value:function(t){(0,g.Z)(this,o,x).call(this),(0,g.Z)(this,u,L).call(this,t)}},{key:"getCurrentResult",value:function(){return(0,w.Z)(this,s)}},{key:"reset",value:function(){(0,y.Z)(this,r,void 0),(0,g.Z)(this,o,x).call(this),(0,g.Z)(this,u,L).call(this)}},{key:"mutate",value:function(t,e){var i;return(0,y.Z)(this,a,e),null===(i=(0,w.Z)(this,r))||void 0===i||i.removeObserver(this),(0,y.Z)(this,r,(0,w.Z)(this,n).getMutationCache().build((0,w.Z)(this,n),this.options)),(0,w.Z)(this,r).addObserver(this),(0,w.Z)(this,r).execute(t)}}]),i}(C.l));function x(){var t,e,i=null!==(t=null===(e=(0,w.Z)(this,r))||void 0===e?void 0:e.state)&&void 0!==t?t:(0,M.R)();(0,y.Z)(this,s,(0,l.Z)((0,l.Z)({},i),{},{isPending:"pending"===i.status,isSuccess:"success"===i.status,isError:"error"===i.status,isIdle:"idle"===i.status,mutate:this.mutate,reset:this.reset}))}function L(t){var e=this;m.V.batch((function(){var i,n,r,o;if((0,w.Z)(e,a)&&e.hasListeners())if("success"===(null===t||void 0===t?void 0:t.type))null===(i=(n=(0,w.Z)(e,a)).onSuccess)||void 0===i||i.call(n,t.data,(0,w.Z)(e,s).variables,(0,w.Z)(e,s).context),null===(r=(o=(0,w.Z)(e,a)).onSettled)||void 0===r||r.call(o,t.data,null,(0,w.Z)(e,s).variables,(0,w.Z)(e,s).context);else if("error"===(null===t||void 0===t?void 0:t.type)){var u,l,c,h;null===(u=(l=(0,w.Z)(e,a)).onError)||void 0===u||u.call(l,t.error,(0,w.Z)(e,s).variables,(0,w.Z)(e,s).context),null===(c=(h=(0,w.Z)(e,a)).onSettled)||void 0===c||c.call(h,void 0,t.error,(0,w.Z)(e,s).variables,(0,w.Z)(e,s).context)}e.listeners.forEach((function(t){t((0,w.Z)(e,s))}))}))}var E=i(3713),W=i(8981);function V(t,e){var i=(0,E.NL)(e),n=h.useState((function(){return new S(i,t)})),s=(0,c.Z)(n,1)[0];h.useEffect((function(){s.setOptions(t)}),[s,t]);var r=h.useSyncExternalStore(h.useCallback((function(t){return s.subscribe(m.V.batchCalls(t))}),[s]),(function(){return s.getCurrentResult()}),(function(){return s.getCurrentResult()})),a=h.useCallback((function(t,e){s.mutate(t,e).catch(z)}),[s]);if(r.error&&(0,W.L)(s.options.throwOnError,[r.error]))throw r.error;return(0,l.Z)((0,l.Z)({},r),{},{mutate:a,mutateAsync:r.mutate})}function z(){}}}]);
//# sourceMappingURL=898.d1c32c44.chunk.js.map