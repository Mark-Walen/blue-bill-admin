import{d as A,b as we,a as Be,i as Ie,c as Ee}from"./index.ade4d1d9.js";import{f as ee,h as $e,j as Oe,l as ne,a as Pe,o as Fe,U as K,m as Ne,p as Te}from"./isEqual.fca31e49.js";import{v as ae,S as M,s as te,aa as Ve,ab as le,ac as ze,ad as De,ae as P,z as R,a1 as H,A as F,H as I,e as g,af as N,C as oe,D as se,N as re,ag as ie,B as T,y as B,a2 as Ge,ah as q,d as L,l as ue,u as z,o as y,c as de,w as ce,V as W,n as x,g as r,ai as E,m as C,aj as $,ak as O,f as D,M as Ue,R as ve,T as be,U as V,i as fe,j as G,h as Ae,b as Ke,x as Me,p as Re,F as He,k as qe,q as me}from"./index.544751a4.js";import{e as he,d as We,b as U,u as J,g as pe}from"./use-form-item.564f31f8.js";function Je(e){return e}var Q=Object.create,Qe=function(){function e(){}return function(n){if(!ae(n))return{};if(Q)return Q(n);e.prototype=n;var a=new e;return e.prototype=void 0,a}}();const Xe=Qe;function Ye(e,n,a){switch(a.length){case 0:return e.call(n);case 1:return e.call(n,a[0]);case 2:return e.call(n,a[0],a[1]);case 3:return e.call(n,a[0],a[1],a[2])}return e.apply(n,a)}function Xn(e,n){var a=-1,t=e.length;for(n||(n=Array(t));++a<t;)n[a]=e[a];return n}var Ze=800,_e=16,je=Date.now;function en(e){var n=0,a=0;return function(){var t=je(),o=_e-(t-a);if(a=t,o>0){if(++n>=Ze)return arguments[0]}else n=0;return e.apply(void 0,arguments)}}function nn(e){return function(){return e}}var an=A?function(e,n){return A(e,"toString",{configurable:!0,enumerable:!1,value:nn(n),writable:!0})}:Je;const tn=an;var ln=en(tn);const on=ln;function Yn(e,n,a,t){var o=!a;a||(a={});for(var i=-1,d=n.length;++i<d;){var l=n[i],v=t?t(a[l],e[l],l,a,e):void 0;v===void 0&&(v=e[l]),o?we(a,l,v):Be(a,l,v)}return a}var X=Math.max;function sn(e,n,a){return n=X(n===void 0?e.length-1:n,0),function(){for(var t=arguments,o=-1,i=X(t.length-n,0),d=Array(i);++o<i;)d[o]=t[n+o];o=-1;for(var l=Array(n+1);++o<n;)l[o]=t[o];return l[n]=a(d),Ye(e,this,l)}}function rn(e){var n=[];if(e!=null)for(var a in Object(e))n.push(a);return n}var un=Object.prototype,dn=un.hasOwnProperty;function cn(e){if(!ae(e))return rn(e);var n=ee(e),a=[];for(var t in e)t=="constructor"&&(n||!dn.call(e,t))||a.push(t);return a}function Zn(e){return $e(e)?Oe(e,!0):cn(e)}var Y=M?M.isConcatSpreadable:void 0;function vn(e){return te(e)||ne(e)||!!(Y&&e&&e[Y])}function ge(e,n,a,t,o){var i=-1,d=e.length;for(a||(a=vn),o||(o=[]);++i<d;){var l=e[i];n>0&&a(l)?n>1?ge(l,n-1,a,t,o):Pe(o,l):t||(o[o.length]=l)}return o}function bn(e){var n=e==null?0:e.length;return n?ge(e,1):[]}function fn(e){return on(sn(e,void 0,bn),e+"")}var mn=Fe(Object.getPrototypeOf,Object);const hn=mn;var ke=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Z=ke&&typeof module=="object"&&module&&!module.nodeType&&module,pn=Z&&Z.exports===ke,_=pn?Ve.Buffer:void 0,j=_?_.allocUnsafe:void 0;function _n(e,n){if(n)return e.slice();var a=e.length,t=j?j(a):new e.constructor(a);return e.copy(t),t}function gn(e){var n=new e.constructor(e.byteLength);return new K(n).set(new K(e)),n}function jn(e,n){var a=n?gn(e.buffer):e.buffer;return new e.constructor(a,e.byteOffset,e.length)}function ea(e){return typeof e.constructor=="function"&&!ee(e)?Xe(hn(e)):{}}function kn(e,n){return e!=null&&n in Object(e)}function xn(e,n,a){n=le(n,e);for(var t=-1,o=n.length,i=!1;++t<o;){var d=ze(n[t]);if(!(i=e!=null&&a(e,d)))break;e=e[d]}return i||++t!=o?i:(o=e==null?0:e.length,!!o&&Ne(o)&&Ie(d,o)&&(te(e)||ne(e)))}function yn(e,n){return e!=null&&xn(e,n,kn)}function Cn(e,n,a){for(var t=-1,o=n.length,i={};++t<o;){var d=n[t],l=De(e,d);a(l,d)&&Ee(i,le(d,e),l)}return i}function Sn(e,n){return Cn(e,n,function(a,t){return yn(e,t)})}var Ln=fn(function(e,n){return e==null?{}:Sn(e,n)});const wn=Ln,xe={modelValue:{type:[Number,String,Boolean],default:void 0},label:{type:[String,Boolean,Number,Object]},indeterminate:Boolean,disabled:Boolean,checked:Boolean,name:{type:String,default:void 0},trueLabel:{type:[String,Number],default:void 0},falseLabel:{type:[String,Number],default:void 0},id:{type:String,default:void 0},controls:{type:String,default:void 0},border:Boolean,size:he,tabindex:[String,Number],validateEvent:{type:Boolean,default:!0}},ye={[P]:e=>R(e)||H(e)||F(e),change:e=>R(e)||H(e)||F(e)},w=Symbol("checkboxGroupContextKey"),Bn=({model:e,isChecked:n})=>{const a=I(w,void 0),t=g(()=>{var i,d;const l=(i=a==null?void 0:a.max)==null?void 0:i.value,v=(d=a==null?void 0:a.min)==null?void 0:d.value;return!N(l)&&e.value.length>=l&&!n.value||!N(v)&&e.value.length<=v&&n.value});return{isDisabled:We(g(()=>(a==null?void 0:a.disabled.value)||t.value)),isLimitDisabled:t}},In=(e,{model:n,isLimitExceeded:a,hasOwnLabel:t,isDisabled:o,isLabeledByFormItem:i})=>{const d=I(w,void 0),{formItem:l}=U(),{emit:v}=ie();function s(c){var b,f;return c===e.trueLabel||c===!0?(b=e.trueLabel)!=null?b:!0:(f=e.falseLabel)!=null?f:!1}function m(c,b){v("change",s(c),b)}function p(c){if(a.value)return;const b=c.target;v("change",s(b.checked),c)}async function S(c){a.value||!t.value&&!o.value&&i.value&&(c.composedPath().some(h=>h.tagName==="LABEL")||(n.value=s([!1,e.falseLabel].includes(n.value)),await re(),m(n.value,c)))}const u=g(()=>(d==null?void 0:d.validateEvent)||e.validateEvent);return oe(()=>e.modelValue,()=>{u.value&&(l==null||l.validate("change").catch(c=>se()))}),{handleChange:p,onClickRoot:S}},En=e=>{const n=T(!1),{emit:a}=ie(),t=I(w,void 0),o=g(()=>N(t)===!1),i=T(!1);return{model:g({get(){var l,v;return o.value?(l=t==null?void 0:t.modelValue)==null?void 0:l.value:(v=e.modelValue)!=null?v:n.value},set(l){var v,s;o.value&&B(l)?(i.value=((v=t==null?void 0:t.max)==null?void 0:v.value)!==void 0&&l.length>(t==null?void 0:t.max.value),i.value===!1&&((s=t==null?void 0:t.changeEvent)==null||s.call(t,l))):(a(P,l),n.value=l)}}),isGroup:o,isLimitExceeded:i}},$n=(e,n,{model:a})=>{const t=I(w,void 0),o=T(!1),i=g(()=>{const s=a.value;return F(s)?s:B(s)?Ge(e.label)?s.map(q).some(m=>Te(m,e.label)):s.map(q).includes(e.label):s!=null?s===e.trueLabel:!!s}),d=J(g(()=>{var s;return(s=t==null?void 0:t.size)==null?void 0:s.value}),{prop:!0}),l=J(g(()=>{var s;return(s=t==null?void 0:t.size)==null?void 0:s.value})),v=g(()=>!!(n.default||e.label));return{checkboxButtonSize:d,isChecked:i,isFocused:o,checkboxSize:l,hasOwnLabel:v}},On=(e,{model:n})=>{function a(){B(n.value)&&!n.value.includes(e.label)?n.value.push(e.label):n.value=e.trueLabel||!0}e.checked&&a()},Ce=(e,n)=>{const{formItem:a}=U(),{model:t,isGroup:o,isLimitExceeded:i}=En(e),{isFocused:d,isChecked:l,checkboxButtonSize:v,checkboxSize:s,hasOwnLabel:m}=$n(e,n,{model:t}),{isDisabled:p}=Bn({model:t,isChecked:l}),{inputId:S,isLabeledByFormItem:u}=pe(e,{formItemContext:a,disableIdGeneration:m,disableIdManagement:o}),{handleChange:c,onClickRoot:b}=In(e,{model:t,isLimitExceeded:i,hasOwnLabel:m,isDisabled:p,isLabeledByFormItem:u});return On(e,{model:t}),{inputId:S,isLabeledByFormItem:u,isChecked:l,isDisabled:p,isFocused:d,checkboxButtonSize:v,checkboxSize:s,hasOwnLabel:m,model:t,handleChange:c,onClickRoot:b}},Pn=["tabindex","role","aria-checked"],Fn=["id","aria-hidden","name","tabindex","disabled","true-value","false-value"],Nn=["id","aria-hidden","disabled","value","name","tabindex"],Tn=L({name:"ElCheckbox"}),Vn=L({...Tn,props:xe,emits:ye,setup(e){const n=e,a=ue(),{inputId:t,isLabeledByFormItem:o,isChecked:i,isDisabled:d,isFocused:l,checkboxSize:v,hasOwnLabel:s,model:m,handleChange:p,onClickRoot:S}=Ce(n,a),u=z("checkbox"),c=g(()=>[u.b(),u.m(v.value),u.is("disabled",d.value),u.is("bordered",n.border),u.is("checked",i.value)]),b=g(()=>[u.e("input"),u.is("disabled",d.value),u.is("checked",i.value),u.is("indeterminate",n.indeterminate),u.is("focus",l.value)]);return(f,h)=>(y(),de(fe(!r(s)&&r(o)?"span":"label"),{class:x(r(c)),"aria-controls":f.indeterminate?f.controls:null,onClick:r(S)},{default:ce(()=>[W("span",{class:x(r(b)),tabindex:f.indeterminate?0:void 0,role:f.indeterminate?"checkbox":void 0,"aria-checked":f.indeterminate?"mixed":void 0},[f.trueLabel||f.falseLabel?E((y(),C("input",{key:0,id:r(t),"onUpdate:modelValue":h[0]||(h[0]=k=>$(m)?m.value=k:null),class:x(r(u).e("original")),type:"checkbox","aria-hidden":f.indeterminate?"true":"false",name:f.name,tabindex:f.tabindex,disabled:r(d),"true-value":f.trueLabel,"false-value":f.falseLabel,onChange:h[1]||(h[1]=(...k)=>r(p)&&r(p)(...k)),onFocus:h[2]||(h[2]=k=>l.value=!0),onBlur:h[3]||(h[3]=k=>l.value=!1)},null,42,Fn)),[[O,r(m)]]):E((y(),C("input",{key:1,id:r(t),"onUpdate:modelValue":h[4]||(h[4]=k=>$(m)?m.value=k:null),class:x(r(u).e("original")),type:"checkbox","aria-hidden":f.indeterminate?"true":"false",disabled:r(d),value:f.label,name:f.name,tabindex:f.tabindex,onChange:h[5]||(h[5]=(...k)=>r(p)&&r(p)(...k)),onFocus:h[6]||(h[6]=k=>l.value=!0),onBlur:h[7]||(h[7]=k=>l.value=!1)},null,42,Nn)),[[O,r(m)]]),W("span",{class:x(r(u).e("inner"))},null,2)],10,Pn),r(s)?(y(),C("span",{key:0,class:x(r(u).e("label"))},[D(f.$slots,"default"),f.$slots.default?V("v-if",!0):(y(),C(Ue,{key:0},[ve(be(f.label),1)],64))],2)):V("v-if",!0)]),_:3},8,["class","aria-controls","onClick"]))}});var zn=G(Vn,[["__file","/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox.vue"]]);const Dn=["name","tabindex","disabled","true-value","false-value"],Gn=["name","tabindex","disabled","value"],Un=L({name:"ElCheckboxButton"}),An=L({...Un,props:xe,emits:ye,setup(e){const n=e,a=ue(),{isFocused:t,isChecked:o,isDisabled:i,checkboxButtonSize:d,model:l,handleChange:v}=Ce(n,a),s=I(w,void 0),m=z("checkbox"),p=g(()=>{var u,c,b,f;const h=(c=(u=s==null?void 0:s.fill)==null?void 0:u.value)!=null?c:"";return{backgroundColor:h,borderColor:h,color:(f=(b=s==null?void 0:s.textColor)==null?void 0:b.value)!=null?f:"",boxShadow:h?`-1px 0 0 0 ${h}`:void 0}}),S=g(()=>[m.b("button"),m.bm("button",d.value),m.is("disabled",i.value),m.is("checked",o.value),m.is("focus",t.value)]);return(u,c)=>(y(),C("label",{class:x(r(S))},[u.trueLabel||u.falseLabel?E((y(),C("input",{key:0,"onUpdate:modelValue":c[0]||(c[0]=b=>$(l)?l.value=b:null),class:x(r(m).be("button","original")),type:"checkbox",name:u.name,tabindex:u.tabindex,disabled:r(i),"true-value":u.trueLabel,"false-value":u.falseLabel,onChange:c[1]||(c[1]=(...b)=>r(v)&&r(v)(...b)),onFocus:c[2]||(c[2]=b=>t.value=!0),onBlur:c[3]||(c[3]=b=>t.value=!1)},null,42,Dn)),[[O,r(l)]]):E((y(),C("input",{key:1,"onUpdate:modelValue":c[4]||(c[4]=b=>$(l)?l.value=b:null),class:x(r(m).be("button","original")),type:"checkbox",name:u.name,tabindex:u.tabindex,disabled:r(i),value:u.label,onChange:c[5]||(c[5]=(...b)=>r(v)&&r(v)(...b)),onFocus:c[6]||(c[6]=b=>t.value=!0),onBlur:c[7]||(c[7]=b=>t.value=!1)},null,42,Gn)),[[O,r(l)]]),u.$slots.default||u.label?(y(),C("span",{key:2,class:x(r(m).be("button","inner")),style:Ae(r(o)?r(p):void 0)},[D(u.$slots,"default",{},()=>[ve(be(u.label),1)])],6)):V("v-if",!0)],2))}});var Se=G(An,[["__file","/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-button.vue"]]);const Kn=Ke({modelValue:{type:Me(Array),default:()=>[]},disabled:Boolean,min:Number,max:Number,size:he,label:String,fill:String,textColor:String,tag:{type:String,default:"div"},validateEvent:{type:Boolean,default:!0}}),Mn={[P]:e=>B(e),change:e=>B(e)},Rn=L({name:"ElCheckboxGroup"}),Hn=L({...Rn,props:Kn,emits:Mn,setup(e,{emit:n}){const a=e,t=z("checkbox"),{formItem:o}=U(),{inputId:i,isLabeledByFormItem:d}=pe(a,{formItemContext:o}),l=async s=>{n(P,s),await re(),n("change",s)},v=g({get(){return a.modelValue},set(s){l(s)}});return Re(w,{...wn(He(a),["size","min","max","disabled","validateEvent","fill","textColor"]),modelValue:v,changeEvent:l}),oe(()=>a.modelValue,()=>{a.validateEvent&&(o==null||o.validate("change").catch(s=>se()))}),(s,m)=>{var p;return y(),de(fe(s.tag),{id:r(i),class:x(r(t).b("group")),role:"group","aria-label":r(d)?void 0:s.label||"checkbox-group","aria-labelledby":r(d)?(p=r(o))==null?void 0:p.labelId:void 0},{default:ce(()=>[D(s.$slots,"default")]),_:3},8,["id","class","aria-label","aria-labelledby"])}}});var Le=G(Hn,[["__file","/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-group.vue"]]);const na=qe(zn,{CheckboxButton:Se,CheckboxGroup:Le});me(Se);me(Le);export{na as E,gn as a,jn as b,Yn as c,Xn as d,_n as e,Je as f,hn as g,yn as h,ea as i,ge as j,Zn as k,sn as o,on as s};
