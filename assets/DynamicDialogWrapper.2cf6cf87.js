/* empty css             *//* empty css                   */import{E as k}from"./el-button.a8349cb8.js";import{d as w,e as x,_ as g,o as c,m as b,f as $,n as V,E,F as I,a as l,w as s,V as r,T as P,c as u,i as f,aw as S,aD as j,aE as z,g as N,am as O,N as R,aF as W,aG as F,$ as H,a0 as T,aj as G}from"./index.2c4b8d5f.js";const U=w({name:"BmBar",props:{dark:{type:Boolean,default:!1},dense:Boolean},setup(e,{slots:o}){return{classes:x(()=>`bm-bar row flex-nowrap items-center bm-bar--${e.dense===!0?"dense":"standard"} bm-bar--${e.dark===!0?"dark":"light"}`)}}});function q(e,o,a,t,p,d){return c(),b("div",{class:V(e.classes),role:"toolbar"},[$(e.$slots,"default",{},void 0,!0)],2)}const A=g(U,[["render",q],["__scopeId","data-v-a9dc3006"]]);const v=e=>(H("data-v-6618bc99"),e=e(),T(),e),J={class:"dynamic-dialog-wrapper"},K={class:"wrapper"},L=["id"],M=v(()=>r("div",{class:"space"},null,-1)),Q=v(()=>r("span",{class:"focus-helper"},null,-1)),X={__name:"DynamicDialogWrapper",props:{comp:{type:Object},comProps:{type:Object},options:{type:Object}},setup(e){const o=e,a=E({visible:!0}),{visible:t}=I(a),p=n=>{a.visible=n},{emit:d}=G();function _(){p(!1),R(()=>{d("closed")})}const y=n=>{console.log(n),_()};return(n,m)=>{const h=W,B=k,D=F;return c(),b("div",J,[l(D,{modelValue:N(t),"onUpdate:modelValue":m[0]||(m[0]=i=>O(t)?t.value=i:null),class:"dynamic-dialog","show-close":!1,onClosed:_,width:"608px","align-center":"",draggable:"","destroy-on-close":""},{header:s(({close:i,titleId:C,titleClass:Y})=>[r("div",K,[l(A,null,{default:s(()=>[r("span",{class:"font-bold text-caption",id:C},P(o.options&&o.options.title),9,L),M,l(B,{onClick:i,link:"",class:"btn__dialog-close"},{default:s(()=>[Q,l(h,{size:18,name:"close"})]),_:2},1032,["onClick"])]),_:2},1024)])]),footer:s(()=>[(c(),u(f(o.options.footerComp),S(o.options.footerComProps,{onDone:y}),null,16))]),default:s(()=>[(c(),u(f(o.comp),j(z(o.comProps)),null,16))]),_:1},8,["modelValue"])])}}},ae=g(X,[["__scopeId","data-v-6618bc99"]]);export{ae as D};
