import{bF as Al,y as Tl,b as Fl,d as ie,u as te,e as m,o as b,m as V,Y as T,f as ee,n as g,g as w,c as $,w as O,a as Y,b9 as gl,a1 as N,ac as rl,X as A,h as x,b3 as ul,j as ge,k as Il,J as Pe,ap as ze,bG as W,E as K,ao as dl,F as Be,G as cl,M as Wl,P as k,aq as be,aA as pl,W as Z,D as F,L as fl,ba as vl,a6 as Kl,av as yl,H as Hl,I as oe,bH as he,at as Nl,a4 as Rl,bI as al,a5 as Cl,am as _,B as Ml,bJ as jl,bd as Ql,bK as kl,aa as Sl,aC as Gl,bf as Ul,p as $l,r as X,bL as Jl,O as Ve,bt as sl,bM as q,bN as Xl,bg as Yl,i as Ol,q as Vl}from"./index.81d639e1.js";import{u as Pl}from"./index.b0b5c2b9.js";import{E as Zl,b as xl,a as _l,d as en}from"./el-scrollbar.3b954484.js";import{i as ln,E as nn}from"./el-input.52366165.js";import{u as zl,b as on}from"./use-form-item.641765da.js";import{p as wl}from"./index.79394490.js";import{d as Ll,C as tn}from"./el-tag.7a491b4f.js";const an=(e="")=>e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d"),sn=e=>Al[e||"default"],rn=e=>["",...Tl].includes(e),un=e=>({focus:()=>{var l,i;(i=(l=e.value)==null?void 0:l.focus)==null||i.call(l)}}),Bl=Fl({closable:Boolean,type:{type:String,values:["success","info","warning","danger",""],default:""},hit:Boolean,disableTransitions:Boolean,color:{type:String,default:""},size:{type:String,values:Tl,default:""},effect:{type:String,values:["dark","light","plain"],default:"light"},round:Boolean}),dn={close:e=>e instanceof MouseEvent,click:e=>e instanceof MouseEvent},cn=ie({name:"ElTag"}),pn=ie({...cn,props:Bl,emits:dn,setup(e,{emit:l}){const i=e,y=zl(),p=te("tag"),c=m(()=>{const{type:d,hit:C,effect:v,closable:h,round:S}=i;return[p.b(),p.is("closable",h),p.m(d),p.m(y.value),p.m(v),p.is("hit",C),p.is("round",S)]}),a=d=>{l("close",d)},u=d=>{l("click",d)};return(d,C)=>d.disableTransitions?(b(),V("span",{key:0,class:g(w(c)),style:x({backgroundColor:d.color}),onClick:u},[T("span",{class:g(w(p).e("content"))},[ee(d.$slots,"default")],2),d.closable?(b(),$(w(rl),{key:0,class:g(w(p).e("close")),onClick:N(a,["stop"])},{default:O(()=>[Y(w(gl))]),_:1},8,["class","onClick"])):A("v-if",!0)],6)):(b(),$(ul,{key:1,name:`${w(p).namespace.value}-zoom-in-center`,appear:""},{default:O(()=>[T("span",{class:g(w(c)),style:x({backgroundColor:d.color}),onClick:u},[T("span",{class:g(w(p).e("content"))},[ee(d.$slots,"default")],2),d.closable?(b(),$(w(rl),{key:0,class:g(w(p).e("close")),onClick:N(a,["stop"])},{default:O(()=>[Y(w(gl))]),_:1},8,["class","onClick"])):A("v-if",!0)],6)]),_:3},8,["name"]))}});var fn=ge(pn,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tag/src/tag.vue"]]);const vn=Il(fn),Dl=Symbol("ElSelectGroup"),De=Symbol("ElSelect");function mn(e,l){const i=Pe(De),y=Pe(Dl,{disabled:!1}),p=m(()=>Object.prototype.toString.call(e.value).toLowerCase()==="[object object]"),c=m(()=>i.props.multiple?h(i.props.modelValue,e.value):S(e.value,i.props.modelValue)),a=m(()=>{if(i.props.multiple){const t=i.props.modelValue||[];return!c.value&&t.length>=i.props.multipleLimit&&i.props.multipleLimit>0}else return!1}),u=m(()=>e.label||(p.value?"":e.value)),d=m(()=>e.value||e.label||""),C=m(()=>e.disabled||l.groupDisabled||a.value),v=dl(),h=(t=[],f)=>{if(p.value){const I=i.props.valueKey;return t&&t.some(R=>ze(W(R,I))===W(f,I))}else return t&&t.includes(f)},S=(t,f)=>{if(p.value){const{valueKey:I}=i.props;return W(t,I)===W(f,I)}else return t===f},L=()=>{!e.disabled&&!y.disabled&&(i.hoverIndex=i.optionsArray.indexOf(v.proxy))};K(()=>u.value,()=>{!e.created&&!i.props.remote&&i.setSelected()}),K(()=>e.value,(t,f)=>{const{remote:I,valueKey:R}=i.props;if(Object.is(t,f)||(i.onOptionDestroy(f,v.proxy),i.onOptionCreate(v.proxy)),!e.created&&!I){if(R&&typeof t=="object"&&typeof f=="object"&&t[R]===f[R])return;i.setSelected()}}),K(()=>y.disabled,()=>{l.groupDisabled=y.disabled},{immediate:!0});const{queryChange:B}=ze(i);return K(B,t=>{const{query:f}=w(t),I=new RegExp(an(f),"i");l.visible=I.test(u.value)||e.created,l.visible||i.filteredOptionsCount--},{immediate:!0}),{select:i,currentLabel:u,currentValue:d,itemSelected:c,isDisabled:C,hoverItem:L}}const hn=ie({name:"ElOption",componentName:"ElOption",props:{value:{required:!0,type:[String,Number,Boolean,Object]},label:[String,Number],created:Boolean,disabled:{type:Boolean,default:!1}},setup(e){const l=te("select"),i=Be({index:-1,groupDisabled:!1,visible:!0,hitState:!1,hover:!1}),{currentLabel:y,itemSelected:p,isDisabled:c,select:a,hoverItem:u}=mn(e,i),{visible:d,hover:C}=cl(i),v=dl().proxy;a.onOptionCreate(v),Wl(()=>{const S=v.value,{selected:L}=a,t=(a.props.multiple?L:[L]).some(f=>f.value===v.value);k(()=>{a.cachedOptions.get(S)===v&&!t&&a.cachedOptions.delete(S)}),a.onOptionDestroy(S,v)});function h(){e.disabled!==!0&&i.groupDisabled!==!0&&a.handleOptionSelect(v,!0)}return{ns:l,currentLabel:y,itemSelected:p,isDisabled:c,select:a,hoverItem:u,visible:d,hover:C,selectOptionClick:h,states:i}}});function bn(e,l,i,y,p,c){return be((b(),V("li",{class:g([e.ns.be("dropdown","item"),e.ns.is("disabled",e.isDisabled),{selected:e.itemSelected,hover:e.hover}]),onMouseenter:l[0]||(l[0]=(...a)=>e.hoverItem&&e.hoverItem(...a)),onClick:l[1]||(l[1]=N((...a)=>e.selectOptionClick&&e.selectOptionClick(...a),["stop"]))},[ee(e.$slots,"default",{},()=>[T("span",null,Z(e.currentLabel),1)])],34)),[[pl,e.visible]])}var ml=ge(hn,[["render",bn],["__file","/home/runner/work/element-plus/element-plus/packages/components/select/src/option.vue"]]);const gn=ie({name:"ElSelectDropdown",componentName:"ElSelectDropdown",setup(){const e=Pe(De),l=te("select"),i=m(()=>e.props.popperClass),y=m(()=>e.props.multiple),p=m(()=>e.props.fitInputWidth),c=F("");function a(){var u;c.value=`${(u=e.selectWrapper)==null?void 0:u.offsetWidth}px`}return fl(()=>{a(),Pl(e.selectWrapper,a)}),{ns:l,minWidth:c,popperClass:i,isMultiple:y,isFitInputWidth:p}}});function yn(e,l,i,y,p,c){return b(),V("div",{class:g([e.ns.b("dropdown"),e.ns.is("multiple",e.isMultiple),e.popperClass]),style:x({[e.isFitInputWidth?"width":"minWidth"]:e.minWidth})},[ee(e.$slots,"default")],6)}var Cn=ge(gn,[["render",yn],["__file","/home/runner/work/element-plus/element-plus/packages/components/select/src/select-dropdown.vue"]]);function Sn(e){const{t:l}=vl();return Be({options:new Map,cachedOptions:new Map,createdLabel:null,createdSelected:!1,selected:e.multiple?[]:{},inputLength:20,inputWidth:0,optionsCount:0,filteredOptionsCount:0,visible:!1,softFocus:!1,selectedLabel:"",hoverIndex:-1,query:"",previousQuery:null,inputHovering:!1,cachedPlaceHolder:"",currentPlaceholder:l("el.select.placeholder"),menuVisibleOnFocus:!1,isOnComposition:!1,isSilentBlur:!1,prefixWidth:11,tagInMultiLine:!1,mouseEnter:!1})}const On=(e,l,i)=>{const{t:y}=vl(),p=te("select");Kl({from:"suffixTransition",replacement:"override style scheme",version:"2.3.0",scope:"props",ref:"https://element-plus.org/en-US/component/select.html#select-attributes"},m(()=>e.suffixTransition===!1));const c=F(null),a=F(null),u=F(null),d=F(null),C=F(null),v=F(null),h=F(-1),S=yl({query:""}),L=yl(""),B=F([]);let t=0;const{form:f,formItem:I}=on(),R=m(()=>!e.filterable||e.multiple||!l.visible),G=m(()=>e.disabled||(f==null?void 0:f.disabled)),ye=m(()=>{const n=e.multiple?Array.isArray(e.modelValue)&&e.modelValue.length>0:e.modelValue!==void 0&&e.modelValue!==null&&e.modelValue!=="";return e.clearable&&!G.value&&l.inputHovering&&n}),Ce=m(()=>e.remote&&e.filterable&&!e.remoteShowSuffix?"":e.suffixIcon),qe=m(()=>p.is("reverse",Ce.value&&l.visible&&e.suffixTransition)),Se=m(()=>e.remote?300:0),de=m(()=>e.loading?e.loadingText||y("el.select.loading"):e.remote&&l.query===""&&l.options.size===0?!1:e.filterable&&l.query&&l.options.size>0&&l.filteredOptionsCount===0?e.noMatchText||y("el.select.noMatch"):l.options.size===0?e.noDataText||y("el.select.noData"):null),M=m(()=>{const n=Array.from(l.options.values()),o=[];return B.value.forEach(s=>{const r=n.findIndex(E=>E.currentLabel===s);r>-1&&o.push(n[r])}),o.length?o:n}),Ae=m(()=>Array.from(l.cachedOptions.values())),Fe=m(()=>{const n=M.value.filter(o=>!o.created).some(o=>o.currentLabel===l.query);return e.filterable&&e.allowCreate&&l.query!==""&&!n}),ae=zl(),We=m(()=>["small"].includes(ae.value)?"small":"default"),Ke=m({get(){return l.visible&&de.value!==!1},set(n){l.visible=n}});K([()=>G.value,()=>ae.value,()=>f==null?void 0:f.size],()=>{k(()=>{H()})}),K(()=>e.placeholder,n=>{l.cachedPlaceHolder=l.currentPlaceholder=n}),K(()=>e.modelValue,(n,o)=>{e.multiple&&(H(),n&&n.length>0||a.value&&l.query!==""?l.currentPlaceholder="":l.currentPlaceholder=l.cachedPlaceHolder,e.filterable&&!e.reserveKeyword&&(l.query="",U(l.query))),ce(),e.filterable&&!e.multiple&&(l.inputLength=20),!wl(n,o)&&e.validateEvent&&(I==null||I.validate("change").catch(s=>Hl()))},{flush:"post",deep:!0}),K(()=>l.visible,n=>{var o,s,r;n?((s=(o=u.value)==null?void 0:o.updatePopper)==null||s.call(o),e.filterable&&(l.filteredOptionsCount=l.optionsCount,l.query=e.remote?"":l.selectedLabel,e.multiple?(r=a.value)==null||r.focus():l.selectedLabel&&(l.currentPlaceholder=`${l.selectedLabel}`,l.selectedLabel=""),U(l.query),!e.multiple&&!e.remote&&(S.value.query="",he(S),he(L)))):(e.filterable&&(oe(e.filterMethod)&&e.filterMethod(""),oe(e.remoteMethod)&&e.remoteMethod("")),a.value&&a.value.blur(),l.query="",l.previousQuery=null,l.selectedLabel="",l.inputLength=20,l.menuVisibleOnFocus=!1,He(),k(()=>{a.value&&a.value.value===""&&l.selected.length===0&&(l.currentPlaceholder=l.cachedPlaceHolder)}),e.multiple||(l.selected&&(e.filterable&&e.allowCreate&&l.createdSelected&&l.createdLabel?l.selectedLabel=l.createdLabel:l.selectedLabel=l.selected.currentLabel,e.filterable&&(l.query=l.selectedLabel)),e.filterable&&(l.currentPlaceholder=l.cachedPlaceHolder))),i.emit("visible-change",n)}),K(()=>l.options.entries(),()=>{var n,o,s;if(!Nl)return;(o=(n=u.value)==null?void 0:n.updatePopper)==null||o.call(n),e.multiple&&H();const r=((s=C.value)==null?void 0:s.querySelectorAll("input"))||[];Array.from(r).includes(document.activeElement)||ce(),e.defaultFirstOption&&(e.filterable||e.remote)&&l.filteredOptionsCount&&we()},{flush:"post"}),K(()=>l.hoverIndex,n=>{Rl(n)&&n>-1?h.value=M.value[n]||{}:h.value={},M.value.forEach(o=>{o.hover=h.value===o})});const H=()=>{k(()=>{var n,o;if(!c.value)return;const s=c.value.$el.querySelector("input");t=t||(s.clientHeight>0?s.clientHeight+2:0);const r=d.value,E=sn(ae.value||(f==null?void 0:f.size)),P=E===t||t<=0?E:t;!(s.offsetParent===null)&&(s.style.height=`${(l.selected.length===0?P:Math.max(r?r.clientHeight+(r.clientHeight>P?6:0):0,P))-2}px`),l.tagInMultiLine=Number.parseFloat(s.style.height)>=P,l.visible&&de.value!==!1&&((o=(n=u.value)==null?void 0:n.updatePopper)==null||o.call(n))})},U=async n=>{if(!(l.previousQuery===n||l.isOnComposition)){if(l.previousQuery===null&&(oe(e.filterMethod)||oe(e.remoteMethod))){l.previousQuery=n;return}l.previousQuery=n,k(()=>{var o,s;l.visible&&((s=(o=u.value)==null?void 0:o.updatePopper)==null||s.call(o))}),l.hoverIndex=-1,e.multiple&&e.filterable&&k(()=>{const o=a.value.value.length*15+20;l.inputLength=e.collapseTags?Math.min(50,o):o,Oe(),H()}),e.remote&&oe(e.remoteMethod)?(l.hoverIndex=-1,e.remoteMethod(n)):oe(e.filterMethod)?(e.filterMethod(n),he(L)):(l.filteredOptionsCount=l.optionsCount,S.value.query=n,he(S),he(L)),e.defaultFirstOption&&(e.filterable||e.remote)&&l.filteredOptionsCount&&(await k(),we())}},Oe=()=>{l.currentPlaceholder!==""&&(l.currentPlaceholder=a.value.value?"":l.cachedPlaceHolder)},we=()=>{const n=M.value.filter(r=>r.visible&&!r.disabled&&!r.states.groupDisabled),o=n.find(r=>r.created),s=n[0];l.hoverIndex=Te(M.value,o||s)},ce=()=>{var n;if(e.multiple)l.selectedLabel="";else{const s=Le(e.modelValue);(n=s.props)!=null&&n.created?(l.createdLabel=s.props.value,l.createdSelected=!0):l.createdSelected=!1,l.selectedLabel=s.currentLabel,l.selected=s,e.filterable&&(l.query=l.selectedLabel);return}const o=[];Array.isArray(e.modelValue)&&e.modelValue.forEach(s=>{o.push(Le(s))}),l.selected=o,k(()=>{H()})},Le=n=>{let o;const s=al(n).toLowerCase()==="object",r=al(n).toLowerCase()==="null",E=al(n).toLowerCase()==="undefined";for(let Q=l.cachedOptions.size-1;Q>=0;Q--){const D=Ae.value[Q];if(s?W(D.value,e.valueKey)===W(n,e.valueKey):D.value===n){o={value:n,currentLabel:D.currentLabel,isDisabled:D.isDisabled};break}}if(o)return o;const P=s?n.label:!r&&!E?n:"",j={value:n,currentLabel:P};return e.multiple&&(j.hitState=!1),j},He=()=>{setTimeout(()=>{const n=e.valueKey;e.multiple?l.selected.length>0?l.hoverIndex=Math.min.apply(null,l.selected.map(o=>M.value.findIndex(s=>W(s,n)===W(o,n)))):l.hoverIndex=-1:l.hoverIndex=M.value.findIndex(o=>ue(o)===ue(l.selected))},300)},Ne=()=>{var n,o;Re(),(o=(n=u.value)==null?void 0:n.updatePopper)==null||o.call(n),e.multiple&&H()},Re=()=>{var n;l.inputWidth=(n=c.value)==null?void 0:n.$el.offsetWidth},je=()=>{e.filterable&&l.query!==l.selectedLabel&&(l.query=l.selectedLabel,U(l.query))},Qe=Ll(()=>{je()},Se.value),Ge=Ll(n=>{U(n.target.value)},Se.value),le=n=>{wl(e.modelValue,n)||i.emit(kl,n)},Ue=n=>{if(n.target.value.length<=0&&!ve()){const o=e.modelValue.slice();o.pop(),i.emit(_,o),le(o)}n.target.value.length===1&&e.modelValue.length===0&&(l.currentPlaceholder=l.cachedPlaceHolder)},se=(n,o)=>{const s=l.selected.indexOf(o);if(s>-1&&!G.value){const r=e.modelValue.slice();r.splice(s,1),i.emit(_,r),le(r),i.emit("remove-tag",o.value)}n.stopPropagation()},Ee=n=>{n.stopPropagation();const o=e.multiple?[]:"";if(!Ml(o))for(const s of l.selected)s.isDisabled&&o.push(s.value);i.emit(_,o),le(o),l.hoverIndex=-1,l.visible=!1,i.emit("clear")},pe=(n,o)=>{var s;if(e.multiple){const r=(e.modelValue||[]).slice(),E=Te(r,n.value);E>-1?r.splice(E,1):(e.multipleLimit<=0||r.length<e.multipleLimit)&&r.push(n.value),i.emit(_,r),le(r),n.created&&(l.query="",U(""),l.inputLength=20),e.filterable&&((s=a.value)==null||s.focus())}else i.emit(_,n.value),le(n.value),l.visible=!1;l.isSilentBlur=o,fe(),!l.visible&&k(()=>{re(n)})},Te=(n=[],o)=>{if(!Cl(o))return n.indexOf(o);const s=e.valueKey;let r=-1;return n.some((E,P)=>ze(W(E,s))===W(o,s)?(r=P,!0):!1),r},fe=()=>{l.softFocus=!0;const n=a.value||c.value;n&&(n==null||n.focus())},re=n=>{var o,s,r,E,P;const j=Array.isArray(n)?n[0]:n;let Q=null;if(j!=null&&j.value){const D=M.value.filter(il=>il.value===j.value);D.length>0&&(Q=D[0].$el)}if(u.value&&Q){const D=(E=(r=(s=(o=u.value)==null?void 0:o.popperRef)==null?void 0:s.contentRef)==null?void 0:r.querySelector)==null?void 0:E.call(r,`.${p.be("dropdown","wrap")}`);D&&jl(D,Q)}(P=v.value)==null||P.handleScroll()},Je=n=>{l.optionsCount++,l.filteredOptionsCount++,l.options.set(n.value,n),l.cachedOptions.set(n.value,n)},Xe=(n,o)=>{l.options.get(n)===o&&(l.optionsCount--,l.filteredOptionsCount--,l.options.delete(n))},Ye=n=>{n.code!==Ql.backspace&&ve(!1),l.inputLength=a.value.value.length*15+20,H()},ve=n=>{if(!Array.isArray(l.selected))return;const o=l.selected[l.selected.length-1];if(!!o)return n===!0||n===!1?(o.hitState=n,n):(o.hitState=!o.hitState,o.hitState)},Ze=n=>{const o=n.target.value;if(n.type==="compositionend")l.isOnComposition=!1,k(()=>U(o));else{const s=o[o.length-1]||"";l.isOnComposition=!ln(s)}},xe=()=>{k(()=>re(l.selected))},_e=n=>{l.softFocus?l.softFocus=!1:((e.automaticDropdown||e.filterable)&&(e.filterable&&!l.visible&&(l.menuVisibleOnFocus=!0),l.visible=!0),i.emit("focus",n))},J=()=>{var n;l.visible=!1,(n=c.value)==null||n.blur()},Ie=n=>{k(()=>{l.isSilentBlur?l.isSilentBlur=!1:i.emit("blur",n)}),l.softFocus=!1},el=n=>{Ee(n)},Me=()=>{l.visible=!1},ll=n=>{l.visible&&(n.preventDefault(),n.stopPropagation(),l.visible=!1)},ke=n=>{var o;n&&!l.mouseEnter||G.value||(l.menuVisibleOnFocus?l.menuVisibleOnFocus=!1:(!u.value||!u.value.isFocusInsideContent())&&(l.visible=!l.visible),l.visible&&((o=a.value||c.value)==null||o.focus()))},nl=()=>{l.visible?M.value[l.hoverIndex]&&pe(M.value[l.hoverIndex],void 0):ke()},ue=n=>Cl(n.value)?W(n.value,e.valueKey):n.value,ol=m(()=>M.value.filter(n=>n.visible).every(n=>n.disabled)),tl=m(()=>l.selected.slice(0,e.maxCollapseTags)),me=m(()=>l.selected.slice(e.maxCollapseTags)),$e=n=>{if(!l.visible){l.visible=!0;return}if(!(l.options.size===0||l.filteredOptionsCount===0)&&!l.isOnComposition&&!ol.value){n==="next"?(l.hoverIndex++,l.hoverIndex===l.options.size&&(l.hoverIndex=0)):n==="prev"&&(l.hoverIndex--,l.hoverIndex<0&&(l.hoverIndex=l.options.size-1));const o=M.value[l.hoverIndex];(o.disabled===!0||o.states.groupDisabled===!0||!o.visible)&&$e(n),k(()=>re(h.value))}};return{optionList:B,optionsArray:M,selectSize:ae,handleResize:Ne,debouncedOnInputChange:Qe,debouncedQueryChange:Ge,deletePrevTag:Ue,deleteTag:se,deleteSelected:Ee,handleOptionSelect:pe,scrollToOption:re,readonly:R,resetInputHeight:H,showClose:ye,iconComponent:Ce,iconReverse:qe,showNewOption:Fe,collapseTagSize:We,setSelected:ce,managePlaceholder:Oe,selectDisabled:G,emptyText:de,toggleLastOptionHitState:ve,resetInputState:Ye,handleComposition:Ze,onOptionCreate:Je,onOptionDestroy:Xe,handleMenuEnter:xe,handleFocus:_e,blur:J,handleBlur:Ie,handleClearClick:el,handleClose:Me,handleKeydownEscape:ll,toggleMenu:ke,selectOption:nl,getValueKey:ue,navigateOptions:$e,dropMenuVisible:Ke,queryChange:S,groupQueryChange:L,showTagList:tl,collapseTagList:me,reference:c,input:a,tooltipRef:u,tags:d,selectWrapper:C,scrollbar:v,handleMouseEnter:()=>{l.mouseEnter=!0},handleMouseLeave:()=>{l.mouseEnter=!1}}};var wn=ie({name:"ElOptions",emits:["update-options"],setup(e,{slots:l,emit:i}){let y=[];function p(c,a){if(c.length!==a.length)return!1;for(const[u]of c.entries())if(c[u]!=a[u])return!1;return!0}return()=>{var c,a;const u=(c=l.default)==null?void 0:c.call(l),d=[];function C(v){!Array.isArray(v)||v.forEach(h=>{var S,L,B,t;const f=(S=(h==null?void 0:h.type)||{})==null?void 0:S.name;f==="ElOptionGroup"?C(!Ml(h.children)&&!Array.isArray(h.children)&&oe((L=h.children)==null?void 0:L.default)?(B=h.children)==null?void 0:B.default():h.children):f==="ElOption"?d.push((t=h.props)==null?void 0:t.label):Array.isArray(h.children)&&C(h.children)})}return u.length&&C((a=u[0])==null?void 0:a.children),p(d,y)||(y=d,i("update-options",d)),u}}});const El="ElSelect",Ln=ie({name:El,componentName:El,components:{ElInput:nn,ElSelectMenu:Cn,ElOption:ml,ElOptions:wn,ElTag:vn,ElScrollbar:Zl,ElTooltip:xl,ElIcon:rl},directives:{ClickOutside:tn},props:{name:String,id:String,modelValue:{type:[Array,String,Number,Boolean,Object],default:void 0},autocomplete:{type:String,default:"off"},automaticDropdown:Boolean,size:{type:String,validator:rn},effect:{type:String,default:"light"},disabled:Boolean,clearable:Boolean,filterable:Boolean,allowCreate:Boolean,loading:Boolean,popperClass:{type:String,default:""},popperOptions:{type:Object,default:()=>({})},remote:Boolean,loadingText:String,noMatchText:String,noDataText:String,remoteMethod:Function,filterMethod:Function,multiple:Boolean,multipleLimit:{type:Number,default:0},placeholder:{type:String},defaultFirstOption:Boolean,reserveKeyword:{type:Boolean,default:!0},valueKey:{type:String,default:"value"},collapseTags:Boolean,collapseTagsTooltip:{type:Boolean,default:!1},maxCollapseTags:{type:Number,default:1},teleported:_l.teleported,persistent:{type:Boolean,default:!0},clearIcon:{type:Sl,default:Gl},fitInputWidth:{type:Boolean,default:!1},suffixIcon:{type:Sl,default:Ul},tagType:{...Bl.type,default:"info"},validateEvent:{type:Boolean,default:!0},remoteShowSuffix:{type:Boolean,default:!1},suffixTransition:{type:Boolean,default:!0},placement:{type:String,values:en,default:"bottom-start"}},emits:[_,kl,"remove-tag","clear","visible-change","focus","blur"],setup(e,l){const i=te("select"),y=te("input"),{t:p}=vl(),c=Sn(e),{optionList:a,optionsArray:u,selectSize:d,readonly:C,handleResize:v,collapseTagSize:h,debouncedOnInputChange:S,debouncedQueryChange:L,deletePrevTag:B,deleteTag:t,deleteSelected:f,handleOptionSelect:I,scrollToOption:R,setSelected:G,resetInputHeight:ye,managePlaceholder:Ce,showClose:qe,selectDisabled:Se,iconComponent:de,iconReverse:M,showNewOption:Ae,emptyText:Fe,toggleLastOptionHitState:ae,resetInputState:We,handleComposition:Ke,onOptionCreate:H,onOptionDestroy:U,handleMenuEnter:Oe,handleFocus:we,blur:ce,handleBlur:Le,handleClearClick:He,handleClose:Ne,handleKeydownEscape:Re,toggleMenu:je,selectOption:Qe,getValueKey:Ge,navigateOptions:le,dropMenuVisible:Ue,reference:se,input:Ee,tooltipRef:pe,tags:Te,selectWrapper:fe,scrollbar:re,queryChange:Je,groupQueryChange:Xe,handleMouseEnter:Ye,handleMouseLeave:ve,showTagList:Ze,collapseTagList:xe}=On(e,c,l),{focus:_e}=un(se),{inputWidth:J,selected:Ie,inputLength:el,filteredOptionsCount:Me,visible:ll,softFocus:ke,selectedLabel:nl,hoverIndex:ue,query:ol,inputHovering:tl,currentPlaceholder:me,menuVisibleOnFocus:$e,isOnComposition:hl,isSilentBlur:bl,options:n,cachedOptions:o,optionsCount:s,prefixWidth:r,tagInMultiLine:E}=cl(c),P=m(()=>{const z=[i.b()],ne=w(d);return ne&&z.push(i.m(ne)),e.disabled&&z.push(i.m("disabled")),z}),j=m(()=>({maxWidth:`${w(J)-32}px`,width:"100%"})),Q=m(()=>({maxWidth:`${w(J)>123?w(J)-123:w(J)-75}px`}));$l(De,Be({props:e,options:n,optionsArray:u,cachedOptions:o,optionsCount:s,filteredOptionsCount:Me,hoverIndex:ue,handleOptionSelect:I,onOptionCreate:H,onOptionDestroy:U,selectWrapper:fe,selected:Ie,setSelected:G,queryChange:Je,groupQueryChange:Xe})),fl(()=>{c.cachedPlaceHolder=me.value=e.placeholder||(()=>p("el.select.placeholder")),e.multiple&&Array.isArray(e.modelValue)&&e.modelValue.length>0&&(me.value=""),Pl(fe,v),e.remote&&e.multiple&&ye(),k(()=>{const z=se.value&&se.value.$el;if(!!z&&(J.value=z.getBoundingClientRect().width,l.slots.prefix)){const ne=z.querySelector(`.${y.e("prefix")}`);r.value=Math.max(ne.getBoundingClientRect().width+5,30)}}),G()}),e.multiple&&!Array.isArray(e.modelValue)&&l.emit(_,[]),!e.multiple&&Array.isArray(e.modelValue)&&l.emit(_,"");const D=m(()=>{var z,ne;return(ne=(z=pe.value)==null?void 0:z.popperRef)==null?void 0:ne.contentRef});return{onOptionsRendered:z=>{a.value=z},tagInMultiLine:E,prefixWidth:r,selectSize:d,readonly:C,handleResize:v,collapseTagSize:h,debouncedOnInputChange:S,debouncedQueryChange:L,deletePrevTag:B,deleteTag:t,deleteSelected:f,handleOptionSelect:I,scrollToOption:R,inputWidth:J,selected:Ie,inputLength:el,filteredOptionsCount:Me,visible:ll,softFocus:ke,selectedLabel:nl,hoverIndex:ue,query:ol,inputHovering:tl,currentPlaceholder:me,menuVisibleOnFocus:$e,isOnComposition:hl,isSilentBlur:bl,options:n,resetInputHeight:ye,managePlaceholder:Ce,showClose:qe,selectDisabled:Se,iconComponent:de,iconReverse:M,showNewOption:Ae,emptyText:Fe,toggleLastOptionHitState:ae,resetInputState:We,handleComposition:Ke,handleMenuEnter:Oe,handleFocus:we,blur:ce,handleBlur:Le,handleClearClick:He,handleClose:Ne,handleKeydownEscape:Re,toggleMenu:je,selectOption:Qe,getValueKey:Ge,navigateOptions:le,dropMenuVisible:Ue,focus:_e,reference:se,input:Ee,tooltipRef:pe,popperPaneRef:D,tags:Te,selectWrapper:fe,scrollbar:re,wrapperKls:P,selectTagsStyle:j,nsSelect:i,tagTextStyle:Q,handleMouseEnter:Ye,handleMouseLeave:ve,showTagList:Ze,collapseTagList:xe}}}),En=["disabled","autocomplete"],Tn={style:{height:"100%",display:"flex","justify-content":"center","align-items":"center"}};function In(e,l,i,y,p,c){const a=X("el-tag"),u=X("el-tooltip"),d=X("el-icon"),C=X("el-input"),v=X("el-option"),h=X("el-options"),S=X("el-scrollbar"),L=X("el-select-menu"),B=Jl("click-outside");return be((b(),V("div",{ref:"selectWrapper",class:g(e.wrapperKls),onMouseenter:l[21]||(l[21]=(...t)=>e.handleMouseEnter&&e.handleMouseEnter(...t)),onMouseleave:l[22]||(l[22]=(...t)=>e.handleMouseLeave&&e.handleMouseLeave(...t)),onClick:l[23]||(l[23]=N((...t)=>e.toggleMenu&&e.toggleMenu(...t),["stop"]))},[Y(u,{ref:"tooltipRef",visible:e.dropMenuVisible,placement:e.placement,teleported:e.teleported,"popper-class":[e.nsSelect.e("popper"),e.popperClass],"popper-options":e.popperOptions,"fallback-placements":["bottom-start","top-start","right","left"],effect:e.effect,pure:"",trigger:"click",transition:`${e.nsSelect.namespace.value}-zoom-in-top`,"stop-popper-mouse-event":!1,"gpu-acceleration":!1,persistent:e.persistent,onShow:e.handleMenuEnter},{default:O(()=>[T("div",{class:"select-trigger",onMouseenter:l[19]||(l[19]=t=>e.inputHovering=!0),onMouseleave:l[20]||(l[20]=t=>e.inputHovering=!1)},[e.multiple?(b(),V("div",{key:0,ref:"tags",class:g(e.nsSelect.e("tags")),style:x(e.selectTagsStyle)},[e.collapseTags&&e.selected.length?(b(),$(ul,{key:0,onAfterLeave:e.resetInputHeight},{default:O(()=>[T("span",{class:g([e.nsSelect.b("tags-wrapper"),{"has-prefix":e.prefixWidth&&e.selected.length}])},[(b(!0),V(Ve,null,sl(e.showTagList,t=>(b(),$(a,{key:e.getValueKey(t),closable:!e.selectDisabled&&!t.isDisabled,size:e.collapseTagSize,hit:t.hitState,type:e.tagType,"disable-transitions":"",onClose:f=>e.deleteTag(f,t)},{default:O(()=>[T("span",{class:g(e.nsSelect.e("tags-text")),style:x(e.tagTextStyle)},Z(t.currentLabel),7)]),_:2},1032,["closable","size","hit","type","onClose"]))),128)),e.selected.length>e.maxCollapseTags?(b(),$(a,{key:0,closable:!1,size:e.collapseTagSize,type:e.tagType,"disable-transitions":""},{default:O(()=>[e.collapseTagsTooltip?(b(),$(u,{key:0,disabled:e.dropMenuVisible,"fallback-placements":["bottom","top","right","left"],effect:e.effect,placement:"bottom",teleported:e.teleported},{default:O(()=>[T("span",{class:g(e.nsSelect.e("tags-text"))},"+ "+Z(e.selected.length-e.maxCollapseTags),3)]),content:O(()=>[T("div",{class:g(e.nsSelect.e("collapse-tags"))},[(b(!0),V(Ve,null,sl(e.collapseTagList,t=>(b(),V("div",{key:e.getValueKey(t),class:g(e.nsSelect.e("collapse-tag"))},[Y(a,{class:"in-tooltip",closable:!e.selectDisabled&&!t.isDisabled,size:e.collapseTagSize,hit:t.hitState,type:e.tagType,"disable-transitions":"",style:{margin:"2px"},onClose:f=>e.deleteTag(f,t)},{default:O(()=>[T("span",{class:g(e.nsSelect.e("tags-text")),style:x({maxWidth:e.inputWidth-75+"px"})},Z(t.currentLabel),7)]),_:2},1032,["closable","size","hit","type","onClose"])],2))),128))],2)]),_:1},8,["disabled","effect","teleported"])):(b(),V("span",{key:1,class:g(e.nsSelect.e("tags-text"))},"+ "+Z(e.selected.length-e.maxCollapseTags),3))]),_:1},8,["size","type"])):A("v-if",!0)],2)]),_:1},8,["onAfterLeave"])):A("v-if",!0),e.collapseTags?A("v-if",!0):(b(),$(ul,{key:1,onAfterLeave:e.resetInputHeight},{default:O(()=>[T("span",{class:g([e.nsSelect.b("tags-wrapper"),{"has-prefix":e.prefixWidth&&e.selected.length}])},[(b(!0),V(Ve,null,sl(e.selected,t=>(b(),$(a,{key:e.getValueKey(t),closable:!e.selectDisabled&&!t.isDisabled,size:e.collapseTagSize,hit:t.hitState,type:e.tagType,"disable-transitions":"",onClose:f=>e.deleteTag(f,t)},{default:O(()=>[T("span",{class:g(e.nsSelect.e("tags-text")),style:x({maxWidth:e.inputWidth-75+"px"})},Z(t.currentLabel),7)]),_:2},1032,["closable","size","hit","type","onClose"]))),128))],2)]),_:1},8,["onAfterLeave"])),e.filterable?be((b(),V("input",{key:2,ref:"input","onUpdate:modelValue":l[0]||(l[0]=t=>e.query=t),type:"text",class:g([e.nsSelect.e("input"),e.nsSelect.is(e.selectSize)]),disabled:e.selectDisabled,autocomplete:e.autocomplete,style:x({marginLeft:e.prefixWidth&&!e.selected.length||e.tagInMultiLine?`${e.prefixWidth}px`:"",flexGrow:1,width:`${e.inputLength/(e.inputWidth-32)}%`,maxWidth:`${e.inputWidth-42}px`}),onFocus:l[1]||(l[1]=(...t)=>e.handleFocus&&e.handleFocus(...t)),onBlur:l[2]||(l[2]=(...t)=>e.handleBlur&&e.handleBlur(...t)),onKeyup:l[3]||(l[3]=(...t)=>e.managePlaceholder&&e.managePlaceholder(...t)),onKeydown:[l[4]||(l[4]=(...t)=>e.resetInputState&&e.resetInputState(...t)),l[5]||(l[5]=q(N(t=>e.navigateOptions("next"),["prevent"]),["down"])),l[6]||(l[6]=q(N(t=>e.navigateOptions("prev"),["prevent"]),["up"])),l[7]||(l[7]=q((...t)=>e.handleKeydownEscape&&e.handleKeydownEscape(...t),["esc"])),l[8]||(l[8]=q(N((...t)=>e.selectOption&&e.selectOption(...t),["stop","prevent"]),["enter"])),l[9]||(l[9]=q((...t)=>e.deletePrevTag&&e.deletePrevTag(...t),["delete"])),l[10]||(l[10]=q(t=>e.visible=!1,["tab"]))],onCompositionstart:l[11]||(l[11]=(...t)=>e.handleComposition&&e.handleComposition(...t)),onCompositionupdate:l[12]||(l[12]=(...t)=>e.handleComposition&&e.handleComposition(...t)),onCompositionend:l[13]||(l[13]=(...t)=>e.handleComposition&&e.handleComposition(...t)),onInput:l[14]||(l[14]=(...t)=>e.debouncedQueryChange&&e.debouncedQueryChange(...t))},null,46,En)),[[Xl,e.query]]):A("v-if",!0)],6)):A("v-if",!0),Y(C,{id:e.id,ref:"reference",modelValue:e.selectedLabel,"onUpdate:modelValue":l[15]||(l[15]=t=>e.selectedLabel=t),type:"text",placeholder:typeof e.currentPlaceholder=="function"?e.currentPlaceholder():e.currentPlaceholder,name:e.name,autocomplete:e.autocomplete,size:e.selectSize,disabled:e.selectDisabled,readonly:e.readonly,"validate-event":!1,class:g([e.nsSelect.is("focus",e.visible)]),tabindex:e.multiple&&e.filterable?-1:void 0,onFocus:e.handleFocus,onBlur:e.handleBlur,onInput:e.debouncedOnInputChange,onPaste:e.debouncedOnInputChange,onCompositionstart:e.handleComposition,onCompositionupdate:e.handleComposition,onCompositionend:e.handleComposition,onKeydown:[l[16]||(l[16]=q(N(t=>e.navigateOptions("next"),["stop","prevent"]),["down"])),l[17]||(l[17]=q(N(t=>e.navigateOptions("prev"),["stop","prevent"]),["up"])),q(N(e.selectOption,["stop","prevent"]),["enter"]),q(e.handleKeydownEscape,["esc"]),l[18]||(l[18]=q(t=>e.visible=!1,["tab"]))]},Yl({suffix:O(()=>[e.iconComponent&&!e.showClose?(b(),$(d,{key:0,class:g([e.nsSelect.e("caret"),e.nsSelect.e("icon"),e.iconReverse])},{default:O(()=>[(b(),$(Ol(e.iconComponent)))]),_:1},8,["class"])):A("v-if",!0),e.showClose&&e.clearIcon?(b(),$(d,{key:1,class:g([e.nsSelect.e("caret"),e.nsSelect.e("icon")]),onClick:e.handleClearClick},{default:O(()=>[(b(),$(Ol(e.clearIcon)))]),_:1},8,["class","onClick"])):A("v-if",!0)]),_:2},[e.$slots.prefix?{name:"prefix",fn:O(()=>[T("div",Tn,[ee(e.$slots,"prefix")])])}:void 0]),1032,["id","modelValue","placeholder","name","autocomplete","size","disabled","readonly","class","tabindex","onFocus","onBlur","onInput","onPaste","onCompositionstart","onCompositionupdate","onCompositionend","onKeydown"])],32)]),content:O(()=>[Y(L,null,{default:O(()=>[be(Y(S,{ref:"scrollbar",tag:"ul","wrap-class":e.nsSelect.be("dropdown","wrap"),"view-class":e.nsSelect.be("dropdown","list"),class:g([e.nsSelect.is("empty",!e.allowCreate&&Boolean(e.query)&&e.filteredOptionsCount===0)])},{default:O(()=>[e.showNewOption?(b(),$(v,{key:0,value:e.query,created:!0},null,8,["value"])):A("v-if",!0),Y(h,{onUpdateOptions:e.onOptionsRendered},{default:O(()=>[ee(e.$slots,"default")]),_:3},8,["onUpdateOptions"])]),_:3},8,["wrap-class","view-class","class"]),[[pl,e.options.size>0&&!e.loading]]),e.emptyText&&(!e.allowCreate||e.loading||e.allowCreate&&e.options.size===0)?(b(),V(Ve,{key:0},[e.$slots.empty?ee(e.$slots,"empty",{key:0}):(b(),V("p",{key:1,class:g(e.nsSelect.be("dropdown","empty"))},Z(e.emptyText),3))],64)):A("v-if",!0)]),_:3})]),_:3},8,["visible","placement","teleported","popper-class","popper-options","effect","transition","persistent","onShow"])],34)),[[B,e.handleClose,e.popperPaneRef]])}var Mn=ge(Ln,[["render",In],["__file","/home/runner/work/element-plus/element-plus/packages/components/select/src/select.vue"]]);const kn=ie({name:"ElOptionGroup",componentName:"ElOptionGroup",props:{label:String,disabled:{type:Boolean,default:!1}},setup(e){const l=te("select"),i=F(!0),y=dl(),p=F([]);$l(Dl,Be({...cl(e)}));const c=Pe(De);fl(()=>{p.value=a(y.subTree)});const a=d=>{const C=[];return Array.isArray(d.children)&&d.children.forEach(v=>{var h;v.type&&v.type.name==="ElOption"&&v.component&&v.component.proxy?C.push(v.component.proxy):(h=v.children)!=null&&h.length&&C.push(...a(v))}),C},{groupQueryChange:u}=ze(c);return K(u,()=>{i.value=p.value.some(d=>d.visible===!0)},{flush:"post"}),{visible:i,ns:l}}});function $n(e,l,i,y,p,c){return be((b(),V("ul",{class:g(e.ns.be("group","wrap"))},[T("li",{class:g(e.ns.be("group","title"))},Z(e.label),3),T("li",null,[T("ul",{class:g(e.ns.b("group"))},[ee(e.$slots,"default")],2)])],2)),[[pl,e.visible]])}var ql=ge(kn,[["render",$n],["__file","/home/runner/work/element-plus/element-plus/packages/components/select/src/option-group.vue"]]);const Fn=Il(Mn,{Option:ml,OptionGroup:ql}),Wn=Vl(ml);Vl(ql);export{Wn as E,Fn as a};
