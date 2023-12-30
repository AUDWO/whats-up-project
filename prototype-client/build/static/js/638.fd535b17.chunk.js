"use strict";(self.webpackChunkprototype_client=self.webpackChunkprototype_client||[]).push([[638],{9638:function(n,t,i){i.r(t),i.d(t,{default:function(){return gn}});var e,r,o,d,a,s,l,c,p,h,x,u,f,g,m,Z,v,j,y,w,b,P,k,C=i(9439),T=i(2791),U=i(9422),z=i(1413),A=i(4165),I=i(5861),D=i(1243),F=i(168),q=i(5867),E=q.ZP.div(e||(e=(0,F.Z)(["\n  width: 300px;\n  height: 370px;\n  margin-bottom: 10px;\n  position: relative;\n  border-radius: 5px;\n  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;\n  transition: transform 0.3s;\n  cursor: pointer;\n  &:hover {\n    transform: scale(1.05);\n  }\n"]))),S=(q.ZP.div(r||(r=(0,F.Z)(["\n  display: flex;\n  flex-wrap: wrap;\n  background-color: #f8f9fa;\n  justify-content: flex-start;\n  padding: 20px;\n"]))),q.ZP.div(o||(o=(0,F.Z)(["\n  background-color: black;\n  width: 100%;\n  height: 50%;\n  position: absolute;\n  top: 0;\n  display: flex;\n  justify-content: center;\n"])))),V=q.ZP.img(d||(d=(0,F.Z)(["\n  min-width: 50%;\n  max-width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  border: none;\n"]))),_=q.ZP.div(a||(a=(0,F.Z)(["\n  width: 100%;\n  height: 50%;\n  position: absolute;\n  bottom: 0;\n"]))),H=q.ZP.div(s||(s=(0,F.Z)(["\n  height: 60%;\n  font-weight: 600;\n  padding: 10px 20px 10px 20px;\n"]))),K=q.ZP.div(l||(l=(0,F.Z)(["\n  width: 100%;\n  height: 20%;\n  border-top: 0.5px solid #959ca3;\n  padding-left: 5%;\n  display: flex;\n  align-items: center;\n"]))),M=q.ZP.img(c||(c=(0,F.Z)(["\n  width: 1.8em;\n  height: 1.8em;\n  border-radius: 50%;\n  background-color: black;\n  margin-right: 0.5em;\n"]))),N=q.ZP.span(p||(p=(0,F.Z)(["\n  font-size: 13px;\n"]))),Q=q.ZP.div(h||(h=(0,F.Z)(["\n  display: flex;\n  align-items: center;\n  height: 20%;\n  line-height: 0.6;\n  color: #959ca3;\n  font-weight: 100;\n  font-size: 18px;\n  padding: 10px 20px 10px 20px;\n"]))),Y=i(1087),B=(0,q.ZP)(Y.rU)(x||(x=(0,F.Z)(["\n  color: black;\n"]))),G=q.ZP.div(u||(u=(0,F.Z)(["\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  padding: 20px;\n"]))),J=q.ZP.div(f||(f=(0,F.Z)(["\n  display: grid;\n  @media screen and (min-width: 1755px) {\n    width: 95%;\n    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  }\n  @media screen and (min-width: 1389px) and (max-width: 1752px) {\n    width: 1000px;\n    grid-gap: 20px;\n    grid-template-columns: repeat(3, minmax(300px, 1fr));\n  }\n  @media screen and (min-width: 1090px) and (max-width: 1388px) {\n    width: 90%;\n    grid-gap: 20px;\n    grid-template-columns: repeat(2, 1fr);\n    "," {\n      width: 100%;\n      position: relative;\n      padding-top: 120%;\n    }\n    "," {\n      position: absolute;\n      top: 0;\n      height: 50%;\n    }\n    "," {\n      position: absolute;\n      bottom: 0;\n      height: 50%;\n    }\n  }\n  @media screen and (max-width: 1090px) {\n    grid-gap: 20px;\n    grid-template-columns: repeat(1, 1fr);\n    width: 80%;\n    "," {\n      width: 100%;\n      padding-top: 120%;\n    }\n    "," {\n      position: absolute;\n      top: 0;\n      height: 50%;\n    }\n    "," {\n      position: absolute;\n      bottom: 0;\n      height: 50%;\n    }\n  }\n\n  width: 95%;\n"])),E,S,_,E,S,_),L=i(184),O=function(n){var t=n.diaryImg;return(0,L.jsx)(S,{children:(0,L.jsx)(V,{src:t})})},R=function(n){var t=n.diaryInfo,i=new Date(t.createdAt),e=i.getUTCFullYear(),r=i.getUTCMonth()+1,o=i.getUTCDate();return(0,L.jsxs)(_,{children:[(0,L.jsx)(Q,{children:"".concat(e,"-").concat(r,"-").concat(o)}),(0,L.jsx)(H,{children:t.title}),(0,L.jsxs)(K,{children:[(0,L.jsx)(M,{src:t.User.profileImg}),(0,L.jsx)(N,{children:t.User.nickname})]})]})},W=function(n){var t=n.diary;return(0,L.jsxs)(E,{children:[t.img?(0,L.jsx)(O,{diaryImg:t.img}):(0,L.jsx)(X,{children:"Diary"}),(0,L.jsx)(R,{diaryInfo:t})]})},X=q.ZP.div(g||(g=(0,F.Z)(["\n  background-color: #f7dd07;\n  color: black;\n  width: 100%;\n  height: 50%;\n  position: absolute;\n  top: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 70px;\n  font-weight: 700;\n"]))),$=i(150),nn=function(n){var t,i=n.filterType,e=(0,$.a)({queryKey:["diaries"],queryFn:function(){return(t=t||(0,I.Z)((0,A.Z)().mark((function n(){var t;return(0,A.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,D.Z.get("/page/render-diaries");case 3:return t=n.sent,n.abrupt("return",t.data);case 7:n.prev=7,n.t0=n.catch(0),console.error(n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})))).apply(this,arguments)}}),r=e.data,o=null===r||void 0===r?void 0:r.map((function(n){return(0,z.Z)((0,z.Z)({},n),{},{createdAt:Date.parse(n.createdAt)})})),d=null===o||void 0===o?void 0:o.filter((function(n){return!0===n.publicControl})),a=null===d||void 0===d?void 0:d.toSorted((function(n,t){return t.createdAt-n.createdAt})),s=null===d||void 0===d?void 0:d.toSorted((function(n,t){return t.reactCount-n.reactCount}));return"latest"===i?(0,L.jsx)(G,{children:(0,L.jsx)(J,{children:null===a||void 0===a?void 0:a.map((function(n){return(0,L.jsx)(B,{to:"/more-diary/".concat(n.id),children:(0,L.jsx)(W,{diary:n})},n.id)}))})}):"trend"===i?(0,L.jsx)(G,{children:(0,L.jsx)(J,{children:null===s||void 0===s?void 0:s.map((function(n){return(0,L.jsx)(B,{to:"/more-diary/".concat(n.id),children:(0,L.jsx)(W,{diary:n})},n.id)}))})}):void 0},tn=i(7692),en=i(9126),rn=q.ZP.div(m||(m=(0,F.Z)([""]))),on=q.ZP.div(Z||(Z=(0,F.Z)(["\n  width: 100%;\n  height: 60px;\n  opacity: 0.7;\n  margin-left: 15px;\n"]))),dn=q.ZP.div(v||(v=(0,F.Z)(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n"]))),an=q.ZP.div(j||(j=(0,F.Z)(["\n  width: 10%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  font-size: 20px;\n"]))),sn=q.ZP.span(y||(y=(0,F.Z)(["\n  font-size: 20px;\n  ",";\n  cursor: pointer;\n"])),(function(n){return n.type===n.on?"border-bottom: 1px solid black":""})),ln=(0,q.ZP)(tn.HgU)(w||(w=(0,F.Z)(["\n  margin-right: 10px;\n"]))),cn=(0,q.ZP)(en.NbQ)(b||(b=(0,F.Z)(["\n  margin-right: 10px;\n"]))),pn=q.ZP.div(P||(P=(0,F.Z)(["\n  height: 60px;\n"]))),hn=i(7810),xn=function(){var n=(0,U.FV)((0,hn.Z)("filterType")),t=(0,C.Z)(n,2),i=t[0],e=t[1];return(0,L.jsxs)(rn,{children:[(0,L.jsx)(pn,{}),(0,L.jsx)(on,{children:(0,L.jsxs)(dn,{children:[(0,L.jsxs)(an,{onClick:function(){e("latest")},children:[(0,L.jsx)(cn,{}),(0,L.jsx)(sn,{type:"latest",on:i,children:"\ucd5c\uc2e0"})]}),(0,L.jsxs)(an,{onClick:function(){e("trend")},children:[(0,L.jsx)(ln,{}),(0,L.jsx)(sn,{type:"trend",on:i,children:"\ud2b8\ub80c\ub529"})]})]})})]})},un=i(1809),fn=q.ZP.div(k||(k=(0,F.Z)(["\n  height: 100%;\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n"]))),gn=function(){var n=(0,U.FV)((0,hn.Z)("filterType")),t=(0,C.Z)(n,2),i=t[0],e=t[1];if((0,T.useEffect)((function(){e("latest")}),[]),console.log("useEffect"),"latest"===i||"trend"===i)return(0,L.jsx)(un.Z,{children:(0,L.jsxs)(fn,{children:[(0,L.jsx)(xn,{}),(0,L.jsx)(nn,{filterType:i})]})})}}}]);
//# sourceMappingURL=638.fd535b17.chunk.js.map