import{d as n,l as w,u as c,e as m,o as i,m as u,f as p,n as _,g as t,j as d,h,k as S,q as f}from"./index.81d639e1.js";const b=n({name:"ElContainer"}),C=n({...b,props:{direction:{type:String}},setup(r){const s=r,e=w(),o=c("container"),a=m(()=>s.direction==="vertical"?!0:s.direction==="horizontal"?!1:e&&e.default?e.default().some(g=>{const k=g.type.name;return k==="ElHeader"||k==="ElFooter"}):!1);return(l,g)=>(i(),u("section",{class:_([t(o).b(),t(o).is("vertical",t(a))])},[p(l.$slots,"default")],2))}});var B=d(C,[["__file","/home/runner/work/element-plus/element-plus/packages/components/container/src/container.vue"]]);const F=n({name:"ElAside"}),H=n({...F,props:{width:{type:String,default:null}},setup(r){const s=r,e=c("aside"),o=m(()=>s.width?e.cssVarBlock({width:s.width}):{});return(a,l)=>(i(),u("aside",{class:_(t(e).b()),style:h(t(o))},[p(a.$slots,"default")],6))}});var v=d(H,[["__file","/home/runner/work/element-plus/element-plus/packages/components/container/src/aside.vue"]]);const A=n({name:"ElFooter"}),M=n({...A,props:{height:{type:String,default:null}},setup(r){const s=r,e=c("footer"),o=m(()=>s.height?e.cssVarBlock({height:s.height}):{});return(a,l)=>(i(),u("footer",{class:_(t(e).b()),style:h(t(o))},[p(a.$slots,"default")],6))}});var E=d(M,[["__file","/home/runner/work/element-plus/element-plus/packages/components/container/src/footer.vue"]]);const N=n({name:"ElHeader"}),V=n({...N,props:{height:{type:String,default:null}},setup(r){const s=r,e=c("header"),o=m(()=>s.height?e.cssVarBlock({height:s.height}):{});return(a,l)=>(i(),u("header",{class:_(t(e).b()),style:h(t(o))},[p(a.$slots,"default")],6))}});var $=d(V,[["__file","/home/runner/work/element-plus/element-plus/packages/components/container/src/header.vue"]]);const z=n({name:"ElMain"}),x=n({...z,setup(r){const s=c("main");return(e,o)=>(i(),u("main",{class:_(t(s).b())},[p(e.$slots,"default")],2))}});var y=d(x,[["__file","/home/runner/work/element-plus/element-plus/packages/components/container/src/main.vue"]]);const j=S(B,{Aside:v,Footer:E,Header:$,Main:y}),q=f(v),D=f(E),G=f($),J=f(y);export{J as E,j as a,q as b,G as c,D as d};
