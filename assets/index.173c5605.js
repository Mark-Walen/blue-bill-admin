import{at as N,E as P,aM as S,aN as A,aO as C,aP as Q,D as R,aQ as L,aR as T,aS as j}from"./index.ade87d89.js";function O(e){var r;const t=A(e);return(r=t==null?void 0:t.$el)!=null?r:t}const b=N?window:void 0;function v(...e){let r,t,n,u;if(C(e[0])||Array.isArray(e[0])?([t,n,u]=e,r=b):[r,t,n,u]=e,!r)return Q;Array.isArray(t)||(t=[t]),Array.isArray(n)||(n=[n]);const p=[],i=()=>{p.forEach(o=>o()),p.length=0},l=(o,f,s,a)=>(o.addEventListener(f,s,a),()=>o.removeEventListener(f,s,a)),d=P(()=>[O(r),A(u)],([o,f])=>{i(),o&&p.push(...t.flatMap(s=>n.map(a=>l(o,s,a,f))))},{immediate:!0,flush:"post"}),m=()=>{d(),i()};return S(m),m}let I=!1;function H(e,r,t={}){const{window:n=b,ignore:u=[],capture:p=!0,detectIframe:i=!1}=t;if(!n)return;j&&!I&&(I=!0,Array.from(n.document.body.children).forEach(s=>s.addEventListener("click",Q)));let l=!0;const d=s=>u.some(a=>{if(typeof a=="string")return Array.from(n.document.querySelectorAll(a)).some(c=>c===s.target||s.composedPath().includes(c));{const c=O(a);return c&&(s.target===c||s.composedPath().includes(c))}}),o=[v(n,"click",s=>{const a=O(e);if(!(!a||a===s.target||s.composedPath().includes(a))){if(s.detail===0&&(l=!d(s)),!l){l=!0;return}r(s)}},{passive:!0,capture:p}),v(n,"pointerdown",s=>{const a=O(e);a&&(l=!s.composedPath().includes(a)&&!d(s))},{passive:!0}),i&&v(n,"blur",s=>{var a;const c=O(e);((a=n.document.activeElement)==null?void 0:a.tagName)==="IFRAME"&&!(c!=null&&c.contains(n.document.activeElement))&&r(s)})].filter(Boolean);return()=>o.forEach(s=>s())}function W(e,r=!1){const t=R(),n=()=>t.value=Boolean(e());return n(),L(n,r),t}const y=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},_="__vueuse_ssr_handlers__";y[_]=y[_]||{};y[_];var h=Object.getOwnPropertySymbols,k=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable,B=(e,r)=>{var t={};for(var n in e)k.call(e,n)&&r.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&h)for(var n of h(e))r.indexOf(n)<0&&x.call(e,n)&&(t[n]=e[n]);return t};function q(e,r,t={}){const n=t,{window:u=b}=n,p=B(n,["window"]);let i;const l=W(()=>u&&"ResizeObserver"in u),d=()=>{i&&(i.disconnect(),i=void 0)},m=P(()=>O(e),f=>{d(),l.value&&u&&f&&(i=new ResizeObserver(r),i.observe(f,p))},{immediate:!0,flush:"post"}),o=()=>{d(),m()};return S(o),{isSupported:l,stop:o}}var E;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(E||(E={}));var $=Object.defineProperty,w=Object.getOwnPropertySymbols,M=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable,g=(e,r,t)=>r in e?$(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,F=(e,r)=>{for(var t in r||(r={}))M.call(r,t)&&g(e,t,r[t]);if(w)for(var t of w(r))z.call(r,t)&&g(e,t,r[t]);return e};const U={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};F({linear:T},U);export{v as a,O as b,H as o,q as u};
