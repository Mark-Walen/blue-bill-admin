import{b as h,z as o,d as m,J as g,e as c,u as $,a4 as p,a5 as N,o as _,c as j,w as C,f as x,n as v,g as f,h as O,i as E,j as k,k as w}from"./index.81d639e1.js";import{m as u}from"./typescript.72bf8adc.js";import{r as S}from"./el-row.f75985f5.js";const B=h({tag:{type:String,default:"div"},span:{type:Number,default:24},offset:{type:Number,default:0},pull:{type:Number,default:0},push:{type:Number,default:0},xs:{type:o([Number,Object]),default:()=>u({})},sm:{type:o([Number,Object]),default:()=>u({})},md:{type:o([Number,Object]),default:()=>u({})},lg:{type:o([Number,Object]),default:()=>u({})},xl:{type:o([Number,Object]),default:()=>u({})}}),K=m({name:"ElCol"}),P=m({...K,props:B,setup(d){const t=d,{gutter:n}=g(S,{gutter:c(()=>0)}),a=$("col"),i=c(()=>{const e={};return n.value&&(e.paddingLeft=e.paddingRight=`${n.value/2}px`),e}),b=c(()=>{const e=[];return["span","offset","pull","push"].forEach(s=>{const l=t[s];p(l)&&(s==="span"?e.push(a.b(`${t[s]}`)):l>0&&e.push(a.b(`${s}-${t[s]}`)))}),["xs","sm","md","lg","xl"].forEach(s=>{p(t[s])?e.push(a.b(`${s}-${t[s]}`)):N(t[s])&&Object.entries(t[s]).forEach(([l,r])=>{e.push(l!=="span"?a.b(`${s}-${l}-${r}`):a.b(`${s}-${r}`))})}),n.value&&e.push(a.is("guttered")),[a.b(),e]});return(e,y)=>(_(),j(E(e.tag),{class:v(f(b)),style:O(f(i))},{default:C(()=>[x(e.$slots,"default")]),_:3},8,["class","style"]))}});var D=k(P,[["__file","/home/runner/work/element-plus/element-plus/packages/components/col/src/col.vue"]]);const T=w(D);export{T as E};
