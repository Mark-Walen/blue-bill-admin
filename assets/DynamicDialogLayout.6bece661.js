import{a as b,d as B,B as C}from"./BmCard.1925ac2b.js";/* empty css             */import{E as D}from"./el-button.b28cb169.js";import{e as k,aE as T,d as y,aJ as g,bS as L,_ as v,r as _,o as l,c,w as u,a as w,f as P,D as m,br as q,E,L as S,c9 as V,Y as W,W as x,i as G,aF as N,aB as A,V as z}from"./index.81d639e1.js";import{r as f,f as F}from"./dom.0b067d67.js";import"./use-form-item.641765da.js";/* empty css                   */const I=b({name:"BmToolbar",props:{inset:Boolean},setup(o,{slots:t}){const n=k(()=>"bm-toolbar row flex-nowrap items-center"+(o.inset===!0?" bm-toolbar--inset":""));return()=>T("div",{class:n.value},B(t.default))}});b({name:"QToolbarTitle",props:{shrink:Boolean},setup(o,{slots:t}){const n=k(()=>"q-toolbar__title ellipsis"+(o.shrink===!0?" col-shrink":""));return()=>h("div",{class:n.value},B(t.default))}});const J=y({name:"BmToolBarWithGoBack",components:{BmToolbar:I},setup(){const o=g();return{goBack:()=>{o.go(-1)},ArrowLeft:L}}});function M(o,t,n,p,a,r){const s=D,e=_("bm-toolbar");return l(),c(e,{class:"bg-white p-0"},{default:u(()=>[w(s,{onClick:o.goBack,icon:o.ArrowLeft},null,8,["onClick","icon"]),P(o.$slots,"default",{},void 0,!0)]),_:3})}const Q=v(J,[["render",M],["__scopeId","data-v-b4defc23"]]);const U=y({name:"DynamicDialogPage",components:{BmToolBarWithGoBack:Q,BmCard:C},setup(){const o=m(null),t=m(null),n=m(null),p=g(),a=q(),r=()=>{f(a.query._route);const[s,e,i={}]=F(a.query._route)||[null,null,null,null];o.value=s;const $=async R=>{let d=null;return e&&e.done&&(d=e.done(R)),p.go(-1),d};t.value={...e||{},done:$},n.value=i};return E(()=>a.query._route,()=>r()),S(()=>r()),V((s,e,i)=>{i(),f()}),{compRef:o,compPropsRef:t,optionsRef:n}}}),Y={class:"title-text"};function j(o,t,n,p,a,r){const s=_("bm-tool-bar-with-go-back"),e=_("bm-card");return l(),c(e,{class:"column w-screen h-screen"},{default:u(()=>[w(s,null,{default:u(()=>[W("span",Y,x(o.optionsRef&&o.optionsRef.title),1)]),_:1}),o.compRef?(l(),c(G(o.compRef),N(A({key:0},o.compPropsRef||{})),null,16)):(l(),c(e,{key:1},{default:u(()=>[z("not allowed")]),_:1}))]),_:1})}const to=v(U,[["render",j]]);export{to as default};
