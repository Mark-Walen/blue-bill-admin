/* empty css             *//* empty css                   */import{E as k}from"./el-button.88a6410d.js";import{d as w,e as x,_ as g,o as c,m as b,f as $,n as V,E as I,F as P,a as l,w as s,V as r,T as E,c as u,i as f,at as S,aA as j,aB as z,g as N,aj as O,N as R,aC as W,aD as H,$ as T,a0 as A,ag as F}from"./index.90d6b2ab.js";const U=w({name:"BmBar",props:{dark:{type:Boolean,default:!1},dense:Boolean},setup(e,{slots:o}){return{classes:x(()=>`bm-bar row flex-nowrap items-center bm-bar--${e.dense===!0?"dense":"standard"} bm-bar--${e.dark===!0?"dark":"light"}`)}}});function q(e,o,a,t,p,d){return c(),b("div",{class:V(e.classes),role:"toolbar"},[$(e.$slots,"default",{},void 0,!0)],2)}const G=g(U,[["render",q],["__scopeId","data-v-a9dc3006"]]);const v=e=>(T("data-v-6618bc99"),e=e(),A(),e),J={class:"dynamic-dialog-wrapper"},K={class:"wrapper"},L=["id"],M=v(()=>r("div",{class:"space"},null,-1)),Q=v(()=>r("span",{class:"focus-helper"},null,-1)),X={__name:"DynamicDialogWrapper",props:{comp:{type:Object},comProps:{type:Object},options:{type:Object}},setup(e){const o=e,a=I({visible:!0}),{visible:t}=P(a),p=n=>{a.visible=n},{emit:d}=F();function _(){p(!1),R(()=>{d("closed")})}const y=n=>{console.log(n),_()};return(n,m)=>{const B=W,h=k,D=H;return c(),b("div",J,[l(D,{modelValue:N(t),"onUpdate:modelValue":m[0]||(m[0]=i=>O(t)?t.value=i:null),class:"dynamic-dialog","show-close":!1,onClosed:_,width:"608px","align-center":"",draggable:"","destroy-on-close":""},{header:s(({close:i,titleId:C,titleClass:Y})=>[r("div",K,[l(G,null,{default:s(()=>[r("span",{class:"font-bold text-caption",id:C},E(o.options&&o.options.title),9,L),M,l(h,{onClick:i,link:"",class:"btn__dialog-close"},{default:s(()=>[Q,l(B,{size:18,name:"close"})]),_:2},1032,["onClick"])]),_:2},1024)])]),footer:s(()=>[(c(),u(f(o.options.footerComp),S(o.options.footerComProps,{onDone:y}),null,16))]),default:s(()=>[(c(),u(f(o.comp),j(z(o.comProps)),null,16))]),_:1},8,["modelValue"])])}}},ae=g(X,[["__scopeId","data-v-6618bc99"]]);export{ae as D};