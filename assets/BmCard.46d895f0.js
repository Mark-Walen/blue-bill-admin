import{Y as o,d as s,e as r,aw as u,ag as c}from"./index.f099e77e.js";const l=a=>o(s(a));function m(a,e){return a!==void 0&&a()||e}const b={dark:{type:Boolean,default:null}};function f(a,e){return r(()=>a.dark===null?e.dark.isActive:a.dark)}const k=l({name:"BmCard",props:{...b,tag:{type:String,default:"div"},square:Boolean,flat:Boolean,bordered:Boolean},setup(a,{slots:e}){const t=c(),n=f(a,t.proxy.$bm),d=r(()=>"bm-card"+(n.value===!0?" bm-card--dark bm-dark":"")+(a.bordered===!0?" bm-card--bordered":"")+(a.square===!0?" bm-card--square no-border-radius":"")+(a.flat===!0?" bm-card--flat no-shadow":""));return()=>u(a.tag,{class:d.value},m(e.default))}});export{k as B,f as a,l as c,m as h,b as u};
