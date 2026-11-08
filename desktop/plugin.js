// Hermes UI — built from src/ by scripts/build.mjs. Do not edit by hand.
var rM=Object.defineProperty;var Jo=(e,t)=>{for(var o in t)rM(e,o,{get:t[o],enumerable:!0})};import{host as Xy,KEYBINDS_AREA as tM,PALETTE_AREA as U9,ROUTES_AREA as oM,SIDEBAR_NAV_AREA as $9}from"@hermes/plugin-sdk";import{useEffect as Ou}from"react";import{host as UE,useValue as RF}from"@hermes/plugin-sdk";import{isValidElement as W6,useEffect as qh,useLayoutEffect as rk,useRef as uf,useState as nk}from"react";var Oa={};Jo(Oa,{Action:()=>Av,Arrow:()=>jx,Close:()=>Pv,Content:()=>yv,Description:()=>Rv,Portal:()=>Fv,Positioner:()=>Wx,Provider:()=>Fw,Root:()=>bv,Title:()=>Ev,Viewport:()=>ev,createToastManager:()=>Xx,useToastManager:()=>Yx});import*as Dw from"react";import*as Qy from"react";function Be(){}var Ft=Object.freeze([]),ze=Object.freeze({});function Zn(e){Qy.useEffect(e,Ft)}import*as ew from"react";var Jy={};function Ze(e,t){let o=ew.useRef(Jy);return o.current===Jy&&(o.current=e(t)),o}import*as tw from"react";var nM=()=>{},_=typeof document<"u"?tw.useLayoutEffect:nM;function sM(e,t){return function(a,...r){let n=new URL(e);return n.searchParams.set("code",a.toString()),r.forEach(s=>n.searchParams.append("args[]",s)),`${t} error #${a}; visit ${n} for the full message.`}}var iM=sM("https://base-ui.com/production-error","Base UI"),De=iM;import*as Qu from"react";var g1=Qu.createContext(void 0);function Kr(){let e=Qu.useContext(g1);if(!e)throw new Error(De(73));return e}import*as iw from"react";import{useSyncExternalStore as jl}from"react";import{useEffect as lM,useMemo as cM,useRef as uM,useSyncExternalStore as dM}from"react";var mM=Object.is;function ow(e,t,o,a,r){let n=uM(null),s=n.current;s===null&&(s={hasValue:!1,value:null},n.current=s);let l=s,[i,c]=cM(()=>{let d=!1,m,p,f=b=>{if(!d){d=!0,m=b;let h=a(b);if(r!==void 0&&l.hasValue){let I=l.value;if(r(I,h))return p=I,I}return p=h,h}let w=m,y=p;if(mM(w,b))return y;let x=a(b);return r!==void 0&&r(y,x)?y:(m=b,p=x,x)};return[()=>f(t()),o===void 0?void 0:()=>f(o())]},[t,o,a,r,l]),u=dM(e,i,c);return lM(()=>{l.hasValue=!0,l.value=u},[l,u]),u}import*as aw from"react";var pM=parseInt(aw.version,10);function Ii(e){return pM>=e}import*as rw from"react";var h1=[],b1;function nw(){return b1}function sw(e){h1.push(e)}function Kl(e){let t=(o,a)=>{let r=Ze(fM).current,n;try{b1=r;for(let s of h1)s.before(r);n=e(o,a);for(let s of h1)s.after(r);r.didInitialize=!0}finally{b1=void 0}return n};return t.displayName=e.displayName||e.name,t}function Ju(e){return rw.forwardRef(Kl(e))}function fM(){return{didInitialize:!1}}var gM=Ii(19),hM=gM?yM:wM;function Yr(e,t,o,a,r){return hM(e,t,o,a,r)}function bM(e,t,o,a,r){let n=iw.useCallback(()=>t(e.getSnapshot(),o,a,r),[e,t,o,a,r]);return jl(e.subscribe,n,n)}sw({before(e){e.syncIndex=0,e.didInitialize||(e.syncTick=1,e.syncHooks=[],e.didChangeStore=!0,e.getSnapshot=()=>{let t=!1;for(let o=0;o<e.syncHooks.length;o+=1){let a=e.syncHooks[o],r=a.selector(a.store.state,a.a1,a.a2,a.a3);Object.is(a.value,r)||(t=!0,a.value=r)}return t&&(e.syncTick+=1),e.syncTick})},after(e){e.syncHooks.length>0&&(e.didChangeStore&&(e.didChangeStore=!1,e.subscribe=t=>{let o=new Set;for(let r of e.syncHooks)o.add(r.store);let a=[];for(let r of o)a.push(r.subscribe(t));return()=>{for(let r of a)r()}}),jl(e.subscribe,e.getSnapshot,e.getSnapshot))}});function yM(e,t,o,a,r){let n=nw();if(!n)return bM(e,t,o,a,r);let s=n.syncIndex;n.syncIndex+=1;let l;return n.didInitialize?(l=n.syncHooks[s],(l.store!==e||l.selector!==t||!Object.is(l.a1,o)||!Object.is(l.a2,a)||!Object.is(l.a3,r))&&(l.store!==e&&(n.didChangeStore=!0),l.store=e,l.selector=t,l.a1=o,l.a2=a,l.a3=r,l.value=t(e.getSnapshot(),o,a,r))):(l={store:e,selector:t,a1:o,a2:a,a3:r,value:t(e.getSnapshot(),o,a,r)},n.syncHooks.push(l)),l.value}function wM(e,t,o,a,r){return ow(e.subscribe,e.getSnapshot,e.getSnapshot,n=>t(n,o,a,r))}var ed=class{static create(t){return new this(t)}constructor(t){this.state=t,this.listeners=new Set,this.updateTick=0}subscribe=t=>(this.listeners.add(t),()=>{this.listeners.delete(t)});getSnapshot=()=>this.state;setState(t){if(this.state===t)return;this.state=t,this.updateTick+=1;let o=this.updateTick;for(let a of this.listeners){if(o!==this.updateTick)return;a(t)}}update(t){for(let o in t)if(!Object.is(this.state[o],t[o])){this.setState({...this.state,...t});return}}set(t,o){Object.is(this.state[t],o)||this.setState({...this.state,[t]:o})}notifyAll(){let t={...this.state};this.setState(t)}use(t,o,a,r){return Yr(this,t,o,a,r)}};import*as Cs from"react";import*as vM from"react";var Yl={...vM};var y1=Yl.useInsertionEffect,xM=y1&&y1!==Yl.useLayoutEffect?y1:e=>e();function $(e){let t=Ze(IM).current;return t.next=e,xM(t.effect),t.trampoline}function IM(){let e={next:void 0,callback:CM,trampoline:(...t)=>e.callback?.(...t),effect:()=>{e.callback=e.next}};return e}function CM(){}var La=class extends ed{constructor(t,o={},a){super(t),this.context=o,this.selectors=a}useSyncedValue(t,o){Cs.useDebugValue(t);let a=this;_(()=>{a.state[t]!==o&&a.set(t,o)},[a,t,o])}useSyncedValueWithCleanup(t,o){let a=this;_(()=>(a.state[t]!==o&&a.set(t,o),()=>{a.set(t,void 0)}),[a,t,o])}useSyncedValues(t){let o=this,a=Object.values(t);_(()=>{o.update(t)},[o,...a])}useControlledProp(t,o){Cs.useDebugValue(t);let a=this,r=o!==void 0;_(()=>{r&&!Object.is(a.state[t],o)&&a.setState({...a.state,[t]:o})},[a,t,o,r])}select(t,o,a,r){let n=this.selectors[t];return n(this.state,o,a,r)}useState(t,o,a,r){return Cs.useDebugValue(t),Yr(this,this.selectors[t],o,a,r)}useContextCallback(t,o){Cs.useDebugValue(t);let a=$(o??Be);this.context[t]=a}useStateSetter(t){let o=Cs.useRef(void 0);return o.current===void 0&&(o.current=a=>{this.set(t,a)}),o.current}observe(t,o){let a;typeof t=="function"?a=t:a=this.selectors[t];let r=a(this.state);return o(r,r,this),this.subscribe(n=>{let s=a(n);if(!Object.is(r,s)){let l=r;r=s,o(s,l,this)}})}};import*as RM from"react";var SM=Symbol.for("react.portal");function Mr(e,t,o=null){return{$$typeof:SM,key:o==null?null:""+o,children:e,containerInfo:t,implementation:null}}function xa(e){return e?e():void 0}function td(){return typeof window<"u"}function Gt(e){return od(e)?(e.nodeName||"").toLowerCase():"#document"}function Ke(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function Xr(e){var t;return(t=(od(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function od(e){return td()?e instanceof Node||e instanceof Ke(e).Node:!1}function Ge(e){return td()?e instanceof Element||e instanceof Ke(e).Element:!1}function Fe(e){return td()?e instanceof HTMLElement||e instanceof Ke(e).HTMLElement:!1}function ja(e){return!td()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof Ke(e).ShadowRoot}function Ss(e){let{overflow:t,overflowX:o,overflowY:a,display:r}=Go(e);return/auto|scroll|overlay|hidden|clip/.test(t+a+o)&&r!=="inline"&&r!=="contents"}function lw(e){return/^(table|td|th)$/.test(Gt(e))}function Xl(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}var EM=/transform|translate|scale|rotate|perspective|filter/,TM=/paint|layout|strict|content/,Rs=e=>!!e&&e!=="none",w1;function ad(e){let t=Ge(e)?Go(e):e;return Rs(t.transform)||Rs(t.translate)||Rs(t.scale)||Rs(t.rotate)||Rs(t.perspective)||!rd()&&(Rs(t.backdropFilter)||Rs(t.filter))||EM.test(t.willChange||"")||TM.test(t.contain||"")}function cw(e){let t=dr(e);for(;Fe(t)&&!mr(t);){if(ad(t))return t;if(Xl(t))return null;t=dr(t)}return null}function rd(){return w1==null&&(w1=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),w1}function mr(e){return/^(html|body|#document)$/.test(Gt(e))}function Go(e){return Ke(e).getComputedStyle(e)}function Ql(e){return Ge(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function dr(e){if(Gt(e)==="html")return e;let t=e.assignedSlot||e.parentNode||ja(e)&&e.host||Xr(e);return ja(t)?t.host:t}function uw(e){let t=dr(e);return mr(t)?(e.ownerDocument||e).body:Fe(t)&&Ss(t)?t:uw(t)}function Gn(e,t,o){var a;t===void 0&&(t=[]),o===void 0&&(o=!0);let r=uw(e),n=r===((a=e.ownerDocument)==null?void 0:a.body),s=Ke(r);if(n){let l=nd(s);return t.concat(s,s.visualViewport||[],Ss(r)?r:[],l&&o?Gn(l):[])}else return t.concat(r,Gn(r,[],o))}function nd(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function jo(...e){return()=>{for(let t=0;t<e.length;t+=1){let o=e[t];o&&o()}}}function Ie(e){return e?.ownerDocument||document}function Ae(e,t,o,a){return e.addEventListener(t,o,a),()=>{e.removeEventListener(t,o,a)}}import*as sd from"react";function id(){let[,e]=sd.useState({});return sd.useCallback(()=>{e({})},[])}var ld=null,N7=globalThis.requestAnimationFrame,v1=class{callbacks=[];callbacksCount=0;nextId=1;startId=1;isScheduled=!1;tick=t=>{this.isScheduled=!1;let o=this.callbacks,a=this.callbacksCount;if(this.callbacks=[],this.callbacksCount=0,this.startId=this.nextId,a>0)for(let r=0;r<o.length;r+=1)o[r]?.(t)};request(t){let o=this.nextId;return this.nextId+=1,this.callbacks.push(t),this.callbacksCount+=1,(!this.isScheduled||!1)&&(requestAnimationFrame(this.tick),this.isScheduled=!0),o}cancel(t){let o=t-this.startId;o<0||o>=this.callbacks.length||this.callbacks[o]!==null&&(this.callbacks[o]=null,this.callbacksCount-=1)}},cd=new v1;var Uo=class e{static create(){return new e}static request(t){return cd.request(t)}static cancel(t){return cd.cancel(t)}currentId=ld;request(t){this.cancel(),this.currentId=cd.request(()=>{this.currentId=ld,t()})}cancel=()=>{this.currentId!==ld&&(cd.cancel(this.currentId),this.currentId=ld)};disposeEffect=()=>this.cancel};function Ka(){let e=Ze(Uo.create).current;return Zn(e.disposeEffect),e}var Jl=0,Fo=class e{static create(){return new e}currentId=Jl;start(t,o){this.clear(),this.currentId=setTimeout(()=>{this.currentId=Jl,o()},t)}isStarted(){return this.currentId!==Jl}clear=()=>{this.currentId!==Jl&&(clearTimeout(this.currentId),this.currentId=Jl)};disposeEffect=()=>this.clear};function Qe(){let e=Ze(Fo.create).current;return Zn(e.disposeEffect),e}var dw=0;function ud(e){return dw+=1,`${e}-${Math.random().toString(36).slice(2,6)}-${dw}`}function dd(e,t){if(typeof e=="string")return{description:e};if(typeof e=="function"){let o=e(t);return typeof o=="string"?{description:o}:o}return e}var at={};Jo(at,{engine:()=>S1,env:()=>T1,mediaQuery:()=>M1,os:()=>C1,screenReader:()=>E1});var C1={};Jo(C1,{android:()=>fw,apple:()=>I1,ios:()=>x1,linux:()=>zM,mac:()=>gw,windows:()=>AM});function MM(){return typeof navigator>"u"?{userAgent:"",platform:"",maxTouchPoints:0}:{userAgent:navigator.userAgent,platform:navigator.platform??"",maxTouchPoints:navigator.maxTouchPoints??0}}var{userAgent:PM,platform:kM,maxTouchPoints:mw}=MM(),Es=PM.toLowerCase(),Ts=kM.toLowerCase();var x1=/^i(os$|p)/.test(Ts)||Ts==="macintel"&&mw>1,pw="android",fw=Ts===pw||Es.includes(pw),gw=!x1&&Ts.startsWith("mac"),AM=Ts.startsWith("win"),zM=!fw&&/^(linux|chrome os)/.test(Ts),I1=gw||x1;var S1={};Jo(S1,{blink:()=>NM,gecko:()=>LM,webkit:()=>R1});var R1=typeof CSS<"u"&&!!CSS.supports?.("-webkit-backdrop-filter:none"),LM=!R1&&Es.includes("firefox"),NM=!R1&&Es.includes("chrom");var E1={};Jo(E1,{voiceOver:()=>DM});var DM=I1;var T1={};Jo(T1,{jsdom:()=>FM});var FM=/jsdom|happydom/.test(Es);var M1={};Jo(M1,{iOS:()=>OM});var OM="@supports (-webkit-touch-callout: none)";function Je(e){let t=e.activeElement;for(;t?.shadowRoot?.activeElement!=null;)t=t.shadowRoot.activeElement;return t}function ue(e,t){if(!e||!t)return!1;let o=t.getRootNode?.();if(e.contains(t))return!0;if(o&&ja(o)){let a=t;for(;a;){if(e===a)return!0;a=a.parentNode||a.host}}return!1}function Ya(e,t){let o=e;for(;o;){if(Ge(o)&&o.matches(t))return o;o=o.assignedSlot??o.parentNode??(ja(o)?o.host:null)}return null}function He(e){return"composedPath"in e?e.composedPath()[0]??e.target:e.target}var ec="data-base-ui-focusable";var P1="input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])",tc="ArrowLeft",oc="ArrowRight",k1="ArrowUp",md="ArrowDown";var Sn={};Jo(Sn,{endingStyle:()=>A1,startingStyle:()=>ac});var ac="data-starting-style",A1="data-ending-style";var HM={[ac]:""},VM={[A1]:""},la={transitionStatus(e){return e==="starting"?HM:e==="ending"?VM:null}};var hw="data-open",bw="data-closed";var yw="data-anchor-hidden";var fd={};Jo(fd,{popupOpen:()=>pd,pressed:()=>z1});var pd="data-popup-open",z1="data-pressed";var _M={[pd]:""},ZM={[pd]:"",[z1]:""},GM={[hw]:""},UM={[bw]:""},$M={[yw]:""},gd={open(e){return e?_M:null}},rc={open(e){return e?ZM:null}},Ms={open(e){return e?GM:UM},anchorHidden(e){return e?$M:null}},Ci={...Ms,...la};var eO=fd.popupOpen,nc="data-trigger-disabled";function Un(e,t){if(!Ge(e))return!1;let o=e;if(t.hasElement(o))return!o.hasAttribute(nc);for(let[,a]of t.entries())if(ue(a,o))return!a.hasAttribute(nc);return!1}function hd(e,t){if(t==null)return!1;if("composedPath"in e)return e.composedPath().includes(t);let o=e;return o.target!=null&&t.contains(o.target)}function ww(e){return e.matches("html,body")}function Pr(e){return Fe(e)&&e.matches(P1)}function N1(e){return Ya(e,`button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${P1}`)!=null}function sc(e){return e?e.getAttribute("role")==="combobox"&&Pr(e):!1}function $n(e){if(!e||at.env.jsdom)return!0;try{return e.matches(":focus-visible")}catch{return!0}}function ic(e){return e?e.hasAttribute(ec)?e:e.querySelector(`[${ec}]`)||e:null}function pr(e,t,o=!0){return e.filter(r=>r.parentId===t).flatMap(r=>[...!o||r.context?.open?[r]:[],...pr(e,r.id,o)])}function D1(e,t){let o=[],a=e.find(r=>r.id===t)?.parentId;for(;a;){let r=e.find(n=>n.id===a);a=r?.parentId,r&&(o=o.concat(r))}return o}function Ot(e){e.preventDefault(),e.stopPropagation()}function vw(e){return"nativeEvent"in e}function Wn(e){return e.pointerType===""&&e.isTrusted?!0:at.os.android&&e.pointerType?e.type==="click"&&e.buttons===1:e.detail===0&&!e.pointerType}function Qr(e){return at.env.jsdom?!1:!at.os.android&&e.width===0&&e.height===0||e.type==="pointerdown"&&e.width===1&&e.height===1&&e.pressure===0&&e.detail===0&&e.pointerType==="mouse"&&(at.os.android||e.buttons===0)||e.width<1&&e.height<1&&e.pressure===0&&e.detail===0&&e.pointerType==="touch"}function Xa(e,t){let o=["mouse","pen"];return t||o.push("",void 0),o.includes(e)}function xw(e){let t=e.type;return t==="click"||t==="mousedown"||t==="keydown"||t==="keyup"}var qn=Math.min,kr=Math.max,jn=Math.round,cc=Math.floor,Jr=e=>({x:e,y:e}),WM={left:"right",right:"left",bottom:"top",top:"bottom"};function yd(e,t,o){return kr(e,qn(t,o))}function en(e,t){return typeof e=="function"?e(t):e}function ea(e){return e.split("-")[0]}function Qa(e){return e.split("-")[1]}function wd(e){return e==="x"?"y":"x"}function uc(e){return e==="y"?"height":"width"}function Na(e){let t=e[0];return t==="t"||t==="b"?"y":"x"}function dc(e){return wd(Na(e))}function Rw(e,t,o){o===void 0&&(o=!1);let a=Qa(e),r=dc(e),n=uc(r),s=r==="x"?a===(o?"end":"start")?"right":"left":a==="start"?"bottom":"top";return t.reference[n]>t.floating[n]&&(s=lc(s)),[s,lc(s)]}function Sw(e){let t=lc(e);return[bd(e),t,bd(t)]}function bd(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}var Iw=["left","right"],Cw=["right","left"],qM=["top","bottom"],jM=["bottom","top"];function KM(e,t,o){switch(e){case"top":case"bottom":return o?t?Cw:Iw:t?Iw:Cw;case"left":case"right":return t?qM:jM;default:return[]}}function Ew(e,t,o,a){let r=Qa(e),n=KM(ea(e),o==="start",a);return r&&(n=n.map(s=>s+"-"+r),t&&(n=n.concat(n.map(bd)))),n}function lc(e){let t=ea(e);return WM[t]+e.slice(t.length)}function YM(e){var t,o,a,r;return{top:(t=e.top)!=null?t:0,right:(o=e.right)!=null?o:0,bottom:(a=e.bottom)!=null?a:0,left:(r=e.left)!=null?r:0}}function vd(e){return typeof e!="number"?YM(e):{top:e,right:e,bottom:e,left:e}}function Ps(e){let{x:t,y:o,width:a,height:r}=e;return{width:a,height:r,top:o,left:t,right:t+a,bottom:o+r,x:t,y:o}}function En(e,t){return t<0||t>=e.length}function Ar(e,t){return Kn(e.current,{disabledIndices:t})}function tn(e,t){return Kn(e.current,{decrement:!0,startingIndex:e.current.length,disabledIndices:t})}function xd(e,t,o){let{decrement:a,loopFocus:r,allowEscape:n,disabledIndices:s,minIndex:l,maxIndex:i}=o,c=()=>Kn(e,{startingIndex:t,decrement:a,disabledIndices:s}),u,d=!1;if(!r)u=a?Math.max(l,c()):Math.min(i,c());else if(a?t<=l:t>=i){let m=a?-1:e.length;n&&t!==m?u=-1:(u=a?i:l,d=!0)}else u=c();return{index:En(e,u)?-1:u,wrapped:d}}function Kn(e,{startingIndex:t=-1,decrement:o=!1,disabledIndices:a,amount:r=1}={}){let n=t;do n+=o?-r:r;while(n>=0&&n<=e.length-1&&Tn(e,n,a));return n}function Tn(e,t,o){if(typeof o=="function"?o(t):o?.includes(t)??!1)return!0;let r=e[t];return r?!ks(r)||r.matches(":disabled")?!0:!o&&(r.hasAttribute("disabled")||r.getAttribute("aria-disabled")==="true"):!1}function XM(e){return e.visibility==="hidden"||e.visibility==="collapse"}function ks(e,t=e?Go(e):null){return!e||!e.isConnected||!t||XM(t)?!1:typeof e.checkVisibility=="function"?e.checkVisibility():t.display!=="none"&&t.display!=="contents"}var QM='a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable="false"]),audio[controls],video[controls]';function JM(e){let t=e.assignedSlot;if(t)return t;if(e.parentElement)return e.parentElement;let o=e.getRootNode();return ja(o)?o.host:null}function O1(e){for(let t of Array.from(e.children))if(Gt(t)==="summary")return t;return null}function eP(e,t){let o=O1(t);return!!o&&(e===o||ue(o,e))}function Tw(e){let t=e?Gt(e):"";return e!=null&&e.matches(QM)&&(t!=="summary"||e.parentElement!=null&&Gt(e.parentElement)==="details"&&O1(e.parentElement)===e)&&(t!=="details"||O1(e)==null)&&(t!=="input"||e.type!=="hidden")}function H1(e){if(!Tw(e)||!e.isConnected||e.matches(":disabled"))return!1;for(let t=e;t;t=JM(t)){let o=t!==e,a=Gt(t)==="slot";if(t.hasAttribute("inert")||o&&Gt(t)==="details"&&!t.open&&!eP(e,t)||t.hasAttribute("hidden")||!a&&!tP(t,o))return!1}return!0}function tP(e,t){let o=Go(e);return t?o.display!=="none":ks(e,o)}function Mw(e){let t=e.tabIndex;if(t<0){let o=Gt(e);if(o==="details"||o==="audio"||o==="video"||Fe(e)&&e.isContentEditable)return 0}return t}function F1(e){if(Gt(e)!=="input")return null;let t=e;return t.type==="radio"&&t.name!==""?t:null}function Pw(e,t){let o=F1(e);if(!o)return!0;let a=t.find(r=>{let n=F1(r);return n?.name===o.name&&n.form===o.form&&n.checked});return a?a===o:t.find(r=>{let n=F1(r);return n?.name===o.name&&n.form===o.form})===o}function kw(e){if(Fe(e)&&Gt(e)==="slot"){let t=e.assignedElements({flatten:!0});if(t.length>0)return t}return Fe(e)&&e.shadowRoot?Array.from(e.shadowRoot.children):Array.from(e.children)}function V1(e,t){kw(e).forEach(o=>{Tw(o)&&t.push(o),V1(o,t)})}function Aw(e,t,o){kw(e).forEach(a=>{Fe(a)&&a.matches(t)&&o.push(a),Aw(a,t,o)})}function mc(e){return H1(e)&&Mw(e)>=0}function B1(e){let t=[];return V1(e,t),t.filter(H1)}function pc(e){let t=B1(e);return t.filter(o=>Mw(o)>=0&&Pw(o,t))}function zw(e,t){let o=pc(e),a=o.length;if(a===0)return;let r=Je(Ie(e)),n=o.indexOf(r),s=n===-1?t===1?0:a-1:n+t;return o[s]}function Id(e){return zw(Ie(e).body,1)||e}function Cd(e){return zw(Ie(e).body,-1)||e}function Lw(e,t,o){if(!e)return null;let a=[];V1(Ie(e).body,a);let r=a.indexOf(e);if(r===-1)return null;let n=a.filter(H1);for(let s=1;s<a.length;s+=1){let l=a[(r+t*s+a.length)%a.length];if(!ue(o,l)&&mc(l)&&Pw(l,n))return l}return a[r]}function Mn(e,t){let o=t||e.currentTarget,a=e.relatedTarget;return!a||!ue(o,a)}function Nw(e){pc(e).forEach(o=>{o.dataset.tabindex=o.getAttribute("tabindex")||"",o.setAttribute("tabindex","-1")})}function _1(e){let t=[];Aw(e,"[data-tabindex]",t),t.forEach(o=>{let a=o.dataset.tabindex;delete o.dataset.tabindex,a?o.setAttribute("tabindex",a):o.removeAttribute("tabindex")})}function Z1(e){let t=new Map,o=0,a=0;return e.forEach((r,n)=>{let s=r.transitionStatus==="ending";t.set(r.id,{value:r,domIndex:n,visibleIndex:s?-1:o,offsetY:a}),a+=r.height||0,s||(o+=1)}),t}function G1(e,t){let o=0;return e.map(a=>{if(a.transitionStatus==="ending")return a;let r=o>=t;return o+=1,a.limited===r?a:{...a,limited:r}})}var zr={toasts:e=>e.toasts,isEmpty:e=>e.toasts.length===0,toast:(e,t)=>e.toastMetadata.get(t)?.value,toastIndex:(e,t)=>e.toastMetadata.get(t)?.domIndex??-1,toastOffsetY:(e,t)=>e.toastMetadata.get(t)?.offsetY??0,toastVisibleIndex:(e,t)=>e.toastMetadata.get(t)?.visibleIndex??-1,focused:e=>e.focused,expanded:e=>e.hovering||e.focused,expandedOrOutOfFocus:e=>e.hovering||e.focused||!e.isWindowFocused,prevFocusElement:e=>e.prevFocusElement},Rd=class extends La{timers=new Map;areTimersPaused=!1;constructor(t){super({...t,toastMetadata:Z1(t.toasts)},{},zr)}setViewport=t=>{this.set("viewport",t)};syncProviderProps(t,o){let a=this.state.limit!==o;if(this.state.timeout===t&&!a)return;let r={timeout:t,limit:o};if(a){let n=G1(this.state.toasts,o);r.toasts=n,r.toastMetadata=Z1(n)}this.update(r)}disposeEffect=()=>()=>{this.timers.forEach(t=>{t.timeout?.clear()}),this.timers.clear()};removeToast(t,o=!1){let a=zr.toastIndex(this.state,t);if(a===-1)return;let r=this.state.toasts[a];o||r?.onRemove?.();let n=[...this.state.toasts];n.splice(a,1),this.setToasts(n)}addToast=t=>{let{timeout:o,limit:a}=this.state,r=t.id||ud("toast");if(t.id){let i=zr.toast(this.state,t.id);if(i)if(i.transitionStatus==="ending")this.removeToast(t.id,!0);else{let{id:c,transitionStatus:u,...d}=t;return this.updateToastInternal(t.id,d,!0,!0),t.id}}let n={...t,id:r,updateKey:0,transitionStatus:"starting"},s=[n,...this.state.toasts];this.setToasts(G1(s,a));let l=n.timeout??o;return n.type!=="loading"&&l>0&&this.scheduleTimer(r,l,()=>this.closeToast(r)),zr.expandedOrOutOfFocus(this.state)&&this.pauseTimers(),r};updateToast=(t,o)=>{let a=zr.toast(this.state,t);!a||a.transitionStatus==="ending"||this.updateToastInternal(t,typeof o=="function"?o(a):o,!1,!0)};updateToastInternal=(t,o,a=!1,r=!1)=>{let{timeout:n,toasts:s}=this.state,l=zr.toast(this.state,t);if(!l||l.transitionStatus==="ending")return;let i={...l,...o,...r&&{updateKey:l.updateKey+1}};this.setToasts(s.map(g=>g.id===t?i:g));let c=i.timeout??n,u=l.timeout??n,d=Object.hasOwn(o,"timeout"),m=i.transitionStatus!=="ending"&&i.type!=="loading"&&c>0,p=this.timers.has(t),f=u!==c,v=l.type==="loading";if(!m&&p){this.clearTimer(t);return}m&&(!p||f||d||v||a)&&(this.clearTimer(t),this.scheduleTimer(t,c,()=>this.closeToast(t)),zr.expandedOrOutOfFocus(this.state)&&this.pauseTimers())};closeToast=t=>{let o=t===void 0,{limit:a,toasts:r}=this.state,n;if(o)n=r,this.clearTimers();else{let i=zr.toast(this.state,t);if(!i)return;n=[i],this.clearTimer(t)}let s=r.map(i=>o||i.id===t?{...i,transitionStatus:"ending",height:0}:i),l=G1(s,a);this.setToasts(l,!l.some(i=>i.transitionStatus!=="ending")),n.forEach(i=>{i.transitionStatus!=="ending"&&i.onClose?.()}),this.handleFocusManagement(t)};promiseToast=(t,o)=>{let a=dd(o.loading),r=this.addToast({...a,type:"loading"}),n=t.then(s=>{let l=dd(o.success,s);return this.updateToast(r,{...l,type:"success",timeout:l.timeout}),s}).catch(s=>{let l=dd(o.error,s);return this.updateToast(r,{...l,type:"error",timeout:l.timeout}),Promise.reject(s)});return{}.hasOwnProperty.call(o,"setPromise")&&o.setPromise(n),n};pauseTimers(){this.areTimersPaused||(this.areTimersPaused=!0,this.timers.forEach(t=>{t.timeout&&(t.timeout.clear(),t.remaining=Math.max(t.remaining-(Date.now()-t.start),0))}))}resumeTimers(){this.areTimersPaused&&(this.areTimersPaused=!1,this.timers.forEach((t,o)=>{t.remaining=t.remaining>0?t.remaining:t.delay,t.timeout??=Fo.create(),t.timeout.start(t.remaining,()=>{this.handleTimerFired(o),t.callback()}),t.start=Date.now()}))}restoreFocusToPrevElement(){this.state.prevFocusElement?.focus({preventScroll:!0})}handleDocumentPointerDown=t=>{if(t.pointerType!=="touch")return;let o=He(t);ue(this.state.viewport,o)||(this.resumeTimers(),this.update({hovering:!1,focused:!1}))};scheduleTimer(t,o,a){let r=Date.now(),s=!zr.expandedOrOutOfFocus(this.state)?Fo.create():void 0;s?.start(o,()=>{this.handleTimerFired(t),a()}),this.timers.set(t,{timeout:s,start:r,delay:o,remaining:o,callback:a})}clearTimers(){this.timers.forEach(t=>{t.timeout?.clear()}),this.timers.clear(),this.areTimersPaused=!1}clearTimer(t){this.timers.get(t)?.timeout?.clear(),this.timers.delete(t),this.resetPausedStateIfNoTimersRemain()}handleTimerFired(t){this.timers.delete(t),this.resetPausedStateIfNoTimersRemain()}resetPausedStateIfNoTimersRemain(){this.timers.size===0&&(this.areTimersPaused=!1)}setToasts(t,o=t.length===0){let a={toasts:t,toastMetadata:Z1(t)};o&&(a.hovering=!1,a.focused=!1),this.update(a)}handleFocusManagement(t){let o=Je(Ie(this.state.viewport));if(!this.state.viewport||!ue(this.state.viewport,o)||!$n(o))return;if(t===void 0){this.restoreFocusToPrevElement();return}let a=zr.toasts(this.state),r=zr.toastIndex(this.state,t),n=(l,i)=>{for(let c=l;c>=0&&c<a.length;c+=i)if(a[c].transitionStatus!=="ending")return a[c];return null},s=n(r+1,1)??n(r-1,-1);s?s.ref?.current?.focus():this.restoreFocusToPrevElement()}};import{jsx as oP,jsxs as aP}from"react/jsx-runtime";var Fw=function(t){let{children:o,timeout:a=5e3,limit:r=3,toastManager:n}=t,s=Ze(()=>new Rd({timeout:a,limit:r,viewport:null,toasts:[],hovering:!1,focused:!1,isWindowFocused:!0,prevFocusElement:null})).current;return Zn(s.disposeEffect),Dw.useEffect(function(){return n?n[" subscribe"](({action:c,options:u})=>{let d=u.id;c==="promise"&&u.promise?s.promiseToast(u.promise,u):c==="update"&&d?s.updateToast(d,u.updates):c==="close"?s.closeToast(d):s.addToast(u)}):void 0},[s,n]),aP(g1.Provider,{value:s,children:[oP(rP,{store:s,timeout:a,limit:r}),o]})};function rP(e){let{store:t,timeout:o,limit:a}=e;return _(()=>{t.syncProviderProps(o,a)},[t,o,a]),null}import*as fr from"react";var Ow={clipPath:"inset(50%)",overflow:"hidden",whiteSpace:"nowrap",border:0,padding:0,width:1,height:1,margin:-1},Ri={...Ow,position:"fixed",margin:0,top:0,left:0},Hw={...Ow,position:"absolute"};import*as Sd from"react";import{jsx as nP}from"react/jsx-runtime";var Lr=Sd.forwardRef(function(t,o){let[a,r]=Sd.useState();return _(()=>{at.screenReader.voiceOver&&at.engine.webkit&&r("button")},[]),nP("span",{...t,ref:o,style:Ri,"aria-hidden":a?void 0:!0,...{tabIndex:0,role:a},"data-base-ui-focus-guard":""})});import*as Yn from"react";function Bt(e,t,o,a){let r=Ze(Bw).current;return sP(r,e,t,o,a)&&_w(r,[e,t,o,a]),r.callback}function Vw(e){let t=Ze(Bw).current;return iP(t,e)&&_w(t,e),t.callback}function Bw(){return{callback:null,cleanup:null,refs:[]}}function sP(e,t,o,a,r){return e.refs[0]!==t||e.refs[1]!==o||e.refs[2]!==a||e.refs[3]!==r}function iP(e,t){return e.refs.length!==t.length||e.refs.some((o,a)=>o!==t[a])}function _w(e,t){if(e.refs=t,t.every(o=>o==null)){e.callback=null;return}e.callback=o=>{if(e.cleanup&&(e.cleanup(),e.cleanup=null),o!=null){let a=Array(t.length).fill(null);for(let r=0;r<t.length;r+=1){let n=t[r];if(n!=null)switch(typeof n){case"function":{let s=n(o);typeof s=="function"&&(a[r]=s);break}case"object":{n.current=o;break}default:}}e.cleanup=()=>{for(let r=0;r<t.length;r+=1){let n=t[r];if(n!=null)switch(typeof n){case"function":{let s=a[r];typeof s=="function"?s():n(null);break}case"object":{n.current=null;break}default:}}}}}}import*as Zw from"react";function U1(e){if(!Zw.isValidElement(e))return null;let t=e,o=t.props;return(Ii(19)?o?.ref:t.ref)??null}function fc(e,t){if(e&&!t)return e;if(!e&&t)return t;if(e||t)return{...e,...t}}function Gw(e,t){let o={};for(let a in e){let r=e[a];if(t?.hasOwnProperty(a)){let n=t[a](r);n!=null&&Object.assign(o,n);continue}r===!0?o[`data-${a.toLowerCase()}`]="":r&&(o[`data-${a.toLowerCase()}`]=r.toString())}return o}function Uw(e,t){return typeof e=="function"?e(t):e}function Ed(e,t){return typeof e=="function"?e(t):e}var $w={};function rt(e,t,o,a,r){if(!o&&!a&&!r&&!e)return Td(t);let n=Td(e);return t&&(n=gc(n,t)),o&&(n=gc(n,o)),a&&(n=gc(n,a)),r&&(n=gc(n,r)),n}function Ww(e){if(e.length===0)return $w;if(e.length===1)return Td(e[0]);let t=Td(e[0]);for(let o=1;o<e.length;o+=1)t=gc(t,e[o]);return t}function Td(e){return jw(e)?{...e($w)}:lP(e)}function gc(e,t){return jw(t)?t(e):cP(e,t)}function lP(e){let t={...e};for(let o in t){let a=t[o];qw(o,a)&&(t[o]=Kw(a))}return t}function cP(e,t){if(!t)return e;for(let o in t){let a=t[o];switch(o){case"style":{e[o]=fc(e.style,a);break}case"className":{e[o]=$1(e.className,a);break}default:qw(o,a)?e[o]=uP(e[o],a):e[o]=a}}return e}function qw(e,t){let o=e.charCodeAt(0),a=e.charCodeAt(1),r=e.charCodeAt(2);return o===111&&a===110&&r>=65&&r<=90&&(typeof t=="function"||typeof t>"u")}function jw(e){return typeof e=="function"}function uP(e,t){return t?e?(...o)=>{let a=o[0];if(Yw(a)){let n=a;hc(n);let s=t(...o);return n.baseUIHandlerPrevented||e?.(...o),s}let r=t(...o);return e?.(...o),r}:Kw(t):e}function Kw(e){return e&&((...t)=>{let o=t[0];return Yw(o)&&hc(o),e(...t)})}function hc(e){return e.preventBaseUIHandler=()=>{e.baseUIHandlerPrevented=!0},e}function $1(e,t){return t?e?t+" "+e:t:e}function Yw(e){return e!=null&&typeof e=="object"&&"nativeEvent"in e}import{createElement as Xw}from"react";function ae(e,t,o={}){let a=t.render;o.enabled!==!1&&(a=As(a));let r=dP(t,o,a);if(o.enabled===!1)return null;let n=o.state??ze;return fP(e,a,r,n)}function dP(e,t,o){let{className:a,style:r}=e,{state:n=ze,ref:s,props:l,stateAttributesMapping:i,enabled:c=!0}=t,u=c?Uw(a,n):void 0,d=c?Ed(r,n):void 0,m=c?Gw(n,i):ze,p=c&&l?mP(l):void 0,f=c?fc(m,p)??{}:ze;return typeof document<"u"&&(c?Array.isArray(s)?f.ref=Vw([f.ref,U1(o),...s]):f.ref=Bt(f.ref,U1(o),s):Bt(null,null)),c?(u!==void 0&&(f.className=$1(f.className,u)),d!==void 0&&(f.style=fc(f.style,d)),f):ze}function mP(e){return Array.isArray(e)?Ww(e):rt(void 0,e)}var pP=Symbol.for("react.lazy");function As(e){if(e?.$$typeof!==pP)return e;let t=Yn.Children.toArray(e)[0];return Yn.isValidElement(t)?t:e}function fP(e,t,o,a){if(t){if(typeof t=="function")return t(o,a);let r=rt(o,t.props);return r.ref=o.ref,Yn.cloneElement(t,r)}return gP(e,o)}function gP(e,t){return e==="button"?Xw("button",{type:"button",...t,key:t.key}):e==="img"?Xw("img",{alt:"",...t,key:t.key}):Yn.createElement(e,t)}var Qw="--toast-frontmost-height";import{jsx as Md,jsxs as W1}from"react/jsx-runtime";var ev=fr.forwardRef(function(t,o){let{render:a,className:r,style:n,children:s,...l}=t,i=Kr(),c=Qe(),u=fr.useRef(!1),d=fr.useRef(!1),m=fr.useRef(!1),p=i.useState("isEmpty"),f=i.useState("toasts"),v=i.useState("focused"),g=i.useState("expanded"),b=i.useState("prevFocusElement"),w=f[0]?.height,y=f.some(k=>k.transitionStatus==="ending"),x=f.filter(k=>k.priority==="high");fr.useEffect(()=>{let k=i.state.viewport;if(!k||p)return;let N=Ke(k),L=Ie(k);function U(B){B.key==="F6"&&He(B)!==k&&(B.preventDefault(),i.set("prevFocusElement",Je(L)),k?.focus({preventScroll:!0}),i.pauseTimers(),i.set("focused",!0))}function A(B){He(B)===N&&(i.set("isWindowFocused",!1),i.pauseTimers())}function ee(B){if(B.relatedTarget)return;let Z=He(B),G=Je(Ie(k));(Z===N||!ue(k,Z)||!$n(G))&&i.resumeTimers(),c.start(0,()=>i.set("isWindowFocused",!0))}return jo(Ae(N,"keydown",U),Ae(N,"blur",A,!0),Ae(N,"focus",ee,!0),Ae(L,"pointerdown",i.handleDocumentPointerDown,!0))},[i,c,p]);function h(k){u.current=!0;let N=k.relatedTarget===i.state.viewport?f.find(L=>L.transitionStatus!=="ending"&&!L.limited):void 0;N?N.ref?.current?.focus():i.restoreFocusToPrevElement()}function I(k){k.key==="Tab"&&k.shiftKey&&He(k.nativeEvent)===i.state.viewport&&(k.preventDefault(),i.restoreFocusToPrevElement())}function R(){i.state.toasts.some(N=>N.transitionStatus==="ending")||m.current||!d.current||(i.set("hovering",!1),i.select("expandedOrOutOfFocus")||i.resumeTimers(),d.current=!1)}fr.useEffect(R,[y,i]);function C(){i.pauseTimers(),i.set("hovering",!0),d.current=!1}function S(){d.current=!0,R()}function T(k){k.pointerType==="touch"&&(m.current=!0)}function P(k){k.pointerType==="touch"&&(m.current=!1,R())}function V(){if(u.current){u.current=!1;return}v||$n(Je(Ie(i.state.viewport)))&&(i.set("focused",!0),i.pauseTimers())}function E(k){!v||ue(i.state.viewport,k.relatedTarget)||(i.set("focused",!1),i.select("expandedOrOutOfFocus")||i.resumeTimers())}let z={tabIndex:-1,role:"region","aria-live":"polite","aria-atomic":!1,"aria-relevant":"additions text","aria-label":"Notifications",onMouseEnter:C,onMouseMove:C,onMouseLeave:S,onFocus:V,onBlur:E,onKeyDown:I,onClick:V,onPointerDown:T,onPointerUp:P,onPointerCancel:P,style:{[Qw]:w?`${w}px`:void 0}},M={expanded:g},O=!p&&b&&Md(Lr,{onFocus:h}),H=ae("div",t,{ref:[o,i.setViewport],state:M,props:[z,l,{children:W1(fr.Fragment,{children:[O,s,O]})}]});return W1(fr.Fragment,{children:[O,H,!v&&x.length>0&&Md("div",{style:Ri,children:x.map(k=>W1("div",{role:"alert","aria-atomic":!0,children:[Md("div",{children:k.title}),Md("div",{children:k.description})]},k.id))})]})});import*as wt from"react";function Si(e){return Ii(19)?e:e?"true":void 0}import*as Pd from"react";var q1=Pd.createContext(void 0);function Xn(){let e=Pd.useContext(q1);if(!e)throw new Error(De(66));return e}import*as tv from"react";function Nr(e){return e==null?e:"current"in e?e.current:e}function j1(e,t){return e.getAnimations(t).filter(o=>{let a=o.effect?.getTiming();return a?.duration!==1/0&&a?.iterations!==1/0})}var kd=null;function hP(e){if(!kd){let t=[];kd=t,queueMicrotask(()=>{kd=null,xa(()=>{for(let o of t)o()})})}kd.push(e)}function gr(e,t=!1,o=!1){let a=Ka();return $((r,n=null)=>{a.cancel();let s=Nr(e);if(s==null)return;let l=s,i=()=>{if(!o){xa(r);return}hP(()=>{n?.aborted||r()})};if(typeof l.getAnimations!="function"||globalThis.BASE_UI_ANIMATIONS_DISABLED){r();return}function c(){Promise.all(j1(l).map(u=>u.finished.then(Be))).then(()=>{n?.aborted||i()},()=>{if(n?.aborted)return;if(j1(l).some(d=>d.pending||d.playState!=="finished")){c();return}i()})}if(t){let u=ac;if(!l.hasAttribute(u)){a.request(c);return}let d=new MutationObserver(()=>{l.hasAttribute(u)||(d.disconnect(),c())});d.observe(l,{attributes:!0,attributeFilter:[u]}),n?.addEventListener("abort",()=>d.disconnect(),{once:!0});return}a.request(c)})}function Oo(e){let{enabled:t=!0,open:o,ref:a,batch:r=!1,onComplete:n}=e,s=$(n),l=gr(a,o,r);tv.useEffect(()=>{if(!t)return;let i=new AbortController;return l(s,i.signal),()=>{i.abort()}},[t,o,s,l])}var ov={style:{transition:"none"}},av="data-base-ui-click-trigger",bP="data-base-ui-swipe-ignore",yP="data-swipe-ignore",rv=`[${bP}]`,nv=`[${yP}]`,sv={fallbackAxisSide:"none"},Ei={fallbackAxisSide:"end"},iv={clipPath:"inset(50%)",position:"fixed",top:0,left:0};import*as K1 from"react";function lv(e,t){let o=(t??Ke(e).getComputedStyle(e)).transform,a=0,r=0,n=1;if(o&&o!=="none"){let s=o.match(/matrix(?:3d)?\(([^)]+)\)/);if(s){let l=s[1].split(", ").map(parseFloat);l.length===6?(a=l[4],r=l[5],n=Math.sqrt(l[0]*l[0]+l[1]*l[1])):l.length===16&&(a=l[12],r=l[13],n=l[0])}}return{x:a,y:r,scale:n}}function Ad(e,t,o){switch(e){case"up":return-o;case"down":return o;case"left":return-t;case"right":return t;default:return 0}}var zd="--toast-index",cv="--toast-offset-y",uv="--toast-height",dv="--toast-swipe-movement-x",mv="--toast-swipe-movement-y";var pv="data-swipe-direction",HH=Sn.startingStyle,VH=Sn.endingStyle;import{jsx as wP}from"react/jsx-runtime";var vP={...la,swipeDirection(e){return e?{[pv]:e}:null}},gv=40,xP=10,hv=.5,IP=1,CP=`${rv},${nv}`,bv=wt.forwardRef(function(t,o){let{toast:a,render:r,className:n,swipeDirection:s=["down","right"],style:l,...i}=t,c=a.positionerProps?.anchor!==void 0,u=[];c||(u=Array.isArray(s)?s:[s]);let d=u.length>0,m=Kr(),[p,f]=wt.useState(void 0),[v,g]=wt.useState(!1),[b,w]=wt.useState(!1),[y,x]=wt.useState({x:0,y:0}),[h,I]=wt.useState({x:0,y:0,scale:1}),[R,C]=wt.useState(),[S,T]=wt.useState(),[P,V]=wt.useState(null),E=wt.useRef(null),z=wt.useRef(void 0),M=wt.useRef({x:0,y:0}),O=wt.useRef({x:0,y:0,scale:1}),H=wt.useRef(void 0),k=wt.useRef(0),N=wt.useRef(!1),L=wt.useRef({x:0,y:0}),U=wt.useRef(!1),A=wt.useRef({x:0,y:0}),ee=wt.useRef(null),B=wt.useRef(null),Z=m.useState("toastIndex",a.id),G=m.useState("toastVisibleIndex",a.id),X=m.useState("toastOffsetY",a.id),be=m.useState("focused"),K=m.useState("expanded");Oo({open:a.transitionStatus!=="ending",ref:E,onComplete(){a.transitionStatus==="ending"&&m.removeToast(a.id)}});let Y=$((he=!1)=>{let le=E.current;if(!le)return;let W=le.style.height;le.style.height="auto";let Q=le.offsetHeight;le.style.height=W;function xe(){m.updateToastInternal(a.id,{ref:E,height:Q,transitionStatus:void 0})}he?xa(xe):xe()});_(()=>{let he=z.current;a.transitionStatus!=="starting"&&he===a.id||(he!==void 0&&(f(void 0),I({x:0,y:0,scale:1}),j({x:0,y:0})),z.current=a.id,Y())},[Y,a.id,a.transitionStatus]);function j(he){A.current=he,x(he)}_(()=>()=>{B.current?.abort()},[]);function se(he,le){let W=re=>re>0?re**hv:-(Math.abs(re)**hv),Q=he>0&&!u.includes("right")||he<0&&!u.includes("left"),xe=le>0&&!u.includes("down")||le<0&&!u.includes("up");return{x:Q?W(he):he,y:xe?W(le):le}}let pe=$(he=>{if(he.pointerId!==ee.current)return;ee.current=null,B.current?.abort(),B.current=null,g(!1),w(!1),V(null);let le=O.current;if(he.type==="pointercancel"||N.current){j({x:le.x,y:le.y}),f(void 0);return}let W=A.current,Q=W.x-le.x,xe=W.y-le.y,re;for(let ce of u)if(Ad(ce,Q,xe)>gv){re=ce;break}re?(f(re),m.closeToast(a.id)):(j({x:le.x,y:le.y}),f(void 0))});function oe(he){if(he.button!==0)return;he.pointerType==="touch"&&m.pauseTimers();let le=He(he.nativeEvent);if(Ya(le,`button,a,input,textarea,[role="button"],${CP}`))return;N.current=!1,H.current=void 0,k.current=0,ee.current=he.pointerId,M.current={x:he.clientX,y:he.clientY},L.current=M.current;let Q=he.currentTarget,xe=lv(Q);O.current=xe,I(xe),j({x:xe.x,y:xe.y}),m.set("hovering",!0),g(!0),w(!1),V(null),U.current=!0,B.current?.abort();let re=new AbortController;B.current=re;let ce=Ie(Q);ce.addEventListener("pointerup",pe,{signal:re.signal}),ce.addEventListener("pointercancel",pe,{signal:re.signal}),Q.setPointerCapture?.(he.pointerId)}function Se(he){if(he.pointerId!==ee.current)return;he.preventDefault(),U.current&&(M.current={x:he.clientX,y:he.clientY},U.current=!1);let{clientY:le,clientX:W,movementX:Q,movementY:xe}=he;(xe<0&&le>L.current.y||xe>0&&le<L.current.y)&&(L.current={x:L.current.x,y:le}),(Q<0&&W>L.current.x||Q>0&&W<L.current.x)&&(L.current={x:W,y:L.current.y});let re=W-M.current.x,ce=le-M.current.y,mt=le-L.current.y,st=W-L.current.x,Xe=P;if(!b&&Math.sqrt(re*re+ce*ce)>=IP){w(!0);let Dt=u.includes("left")||u.includes("right"),Aa=u.includes("up")||u.includes("down");if(Dt&&Aa){let ya=Math.abs(re),Vt=Math.abs(ce);Xe=ya>Vt?"horizontal":"vertical",V(Xe)}}let Ue;if(!H.current)Xe==="vertical"?ce>0?Ue="down":ce<0&&(Ue="up"):Xe==="horizontal"?re>0?Ue="right":re<0&&(Ue="left"):Math.abs(re)>=Math.abs(ce)?Ue=re>0?"right":"left":Ue=ce>0?"down":"up",Ue&&u.includes(Ue)&&(H.current=Ue,k.current=Ad(Ue,re,ce),f(Ue));else{let Tt=H.current,Dt=Ad(Tt,st,mt);Dt>gv?(N.current=!1,f(Tt)):!(u.includes("left")&&u.includes("right"))&&!(u.includes("up")&&u.includes("down"))&&k.current-Dt>=xP&&(N.current=!0)}let pt=se(re,ce),Zo=O.current.x,bt=O.current.y,Rt=u.includes("left")||u.includes("right"),ba=u.includes("up")||u.includes("down");Xe!=="vertical"&&Rt&&(Zo+=pt.x),Xe!=="horizontal"&&ba&&(bt+=pt.y),j({x:Zo,y:bt})}function ie(he){if(he.key==="Escape"){if(!E.current||!ue(E.current,Je(Ie(E.current))))return;m.closeToast(a.id)}}wt.useEffect(()=>{let he=E.current;if(!d||!he)return;function le(W){ee.current===null||!ue(he,He(W))||W.preventDefault()}return Ae(he,"touchmove",le,{passive:!1})},[d]);function te(){let he=y.x-h.x,le=y.y-h.y;return{transition:v?"none":void 0,transform:v?`translateX(${y.x}px) translateY(${y.y}px) scale(${h.scale})`:void 0,[dv]:`${he}px`,[mv]:`${le}px`}}let fe=a.priority==="high",de={role:fe?"alertdialog":"dialog",tabIndex:0,"aria-modal":!1,"aria-labelledby":R,"aria-describedby":S,"aria-hidden":fe&&!be?!0:void 0,onPointerDown:d?oe:void 0,onPointerMove:d?Se:void 0,onPointerUp:d?pe:void 0,onPointerCancel:d?pe:void 0,onKeyDown:ie,inert:Si(a.limited),style:{...te(),[zd]:a.transitionStatus==="ending"?Z:G,[cv]:`${X}px`,[uv]:a.height?`${a.height}px`:void 0}},ve=wt.useMemo(()=>({toast:a,setTitleId:C,setDescriptionId:T,recalculateHeight:Y,visibleIndex:G,expanded:K}),[a,C,T,Y,G,K]),ge={transitionStatus:a.transitionStatus,expanded:K,limited:a.limited||!1,type:a.type,swiping:v,swipeDirection:p},je=ae("div",t,{ref:[o,E],state:ge,stateAttributesMapping:vP,props:[de,i]});return wP(q1.Provider,{value:ve,children:je})});import*as Ld from"react";var yv=Ld.forwardRef(function(t,o){let{render:a,className:r,style:n,...s}=t,{visibleIndex:l,expanded:i,recalculateHeight:c}=Xn(),u=Ld.useRef(null);_(()=>{c();let p=u.current;if(!p||typeof ResizeObserver!="function"||typeof MutationObserver!="function")return;let f=new ResizeObserver(()=>c(!0)),v=new MutationObserver(()=>c(!0));return f.observe(p),v.observe(p,{childList:!0,subtree:!0,characterData:!0}),()=>{f.disconnect(),v.disconnect()}},[c]);let d=l>0;return ae("div",t,{ref:[o,u],state:{expanded:i,behind:d},props:s})});import*as Cv from"react";import*as Nd from"react";var wv=0;function RP(e,t="mui"){let o=Nd.useRef(void 0),a=id(),r=e??o.current;return Nd.useEffect(()=>{o.current==null&&(wv+=1,o.current=`${t}-${wv}`,e==null&&a())},[e,t,a]),r}var vv=Yl.useId;function Da(e,t){if(vv!==void 0){let o=vv();return e??(t?`${t}-${o}`:o)}return RP(e,t)}import*as xv from"react";function Iv(e){return e==null||typeof e=="boolean"||e===""?!1:Array.isArray(e)?e.some(Iv):!0}function Dd(e){return xv.isValidElement(e)&&Iv(e.props.children)}function Fd(e,t,o){let{toast:a,setTitleId:r,setDescriptionId:n}=Xn(),s=o==="title"?r:n,l=t??(o==="title"?a.title:a.description);return{id:Da(e),children:l,type:a.type,setId:s}}function Od(e,t,o){let a=Dd(e);return _(()=>{if(a)return o(t),()=>{o(r=>r===t?void 0:r)}},[a,t,o]),a?e:null}var Rv=Cv.forwardRef(function(t,o){let{render:a,className:r,style:n,id:s,children:l,...i}=t,{id:c,children:u,type:d,setId:m}=Fd(s,l,"description"),f=ae("p",t,{ref:o,state:{type:d},props:{...i,id:c,children:u}});return Od(f,c,m)});import*as Sv from"react";var Ev=Sv.forwardRef(function(t,o){let{render:a,className:r,style:n,id:s,children:l,...i}=t,{id:c,children:u,type:d,setId:m}=Fd(s,l,"title"),f=ae("h2",t,{ref:o,state:{type:d},props:{...i,id:c,children:u}});return Od(f,c,m)});import*as Vd from"react";import*as Mi from"react";import*as Hd from"react";var X1=Hd.createContext(void 0);function Ti(e=!1){let t=Hd.useContext(X1);if(t===void 0&&!e)throw new Error(De(16));return t}import*as Tv from"react";function Mv(e){let{focusableWhenDisabled:t,disabled:o,composite:a=!1,tabIndex:r=0,isNativeButton:n}=e,s=a&&t!==!1,l=a&&t===!1;return{props:Tv.useMemo(()=>{let c={onKeyDown(u){o&&t&&u.key!=="Tab"&&u.preventDefault()}};return a||(c.tabIndex=r,!n&&o&&(c.tabIndex=t?r:-1)),(n&&(t||s)||!n&&o)&&(c["aria-disabled"]=o),n&&(!t||l)&&(c.disabled=o),c},[a,o,t,s,l,n,r])}}function on(e,t,{detail:o=0,pointerType:a=""}={}){e.dispatchEvent(new(Ke(e)).PointerEvent("click",{bubbles:!0,cancelable:!0,composed:!0,detail:o,pointerType:a,shiftKey:t.shiftKey,ctrlKey:t.ctrlKey,altKey:t.altKey,metaKey:t.metaKey}))}function Ut(e={}){let{disabled:t=!1,focusableWhenDisabled:o,tabIndex:a=0,native:r=!0,composite:n}=e,s=Mi.useRef(null),l=Ti(!0),i=n??l!==void 0,{props:c}=Mv({focusableWhenDisabled:o,disabled:t,composite:i,tabIndex:a,isNativeButton:r}),u=Mi.useCallback(()=>{let p=s.current;Q1(p)&&i&&t&&c.disabled===void 0&&p.disabled&&(p.disabled=!1)},[t,c.disabled,i]);_(u,[u]);let d=Mi.useCallback((p={})=>{let{onClick:f,onMouseDown:v,onKeyUp:g,onKeyDown:b,onPointerDown:w,...y}=p;return rt({onClick(x){if(t){x.preventDefault();return}f?.(x)},onMouseDown(x){t||v?.(x)},onKeyDown(x){if(t||(hc(x),b?.(x),x.baseUIHandlerPrevented))return;let h=x.target===x.currentTarget,I=x.currentTarget,R=Q1(I),C=!r&&SP(I),S=h&&(r?R:!C),T=x.key==="Enter",P=x.key===" ",V=I.getAttribute("role"),E=V?.startsWith("menuitem")||V==="option"||V==="gridcell";if(h&&i&&P){if(x.defaultPrevented&&E)return;x.preventDefault(),(!r||R)&&(x.preventBaseUIHandler(),on(I,x));return}if(!S||r||!P&&!T){h&&C&&P&&x.preventDefault();return}x.defaultPrevented||(x.preventDefault(),T&&(x.preventBaseUIHandler(),on(I,x)))},onKeyUp(x){if(!t){if(hc(x),g?.(x),x.target===x.currentTarget&&r&&i&&Q1(x.currentTarget)&&x.key===" "){x.preventDefault();return}x.baseUIHandlerPrevented||x.target===x.currentTarget&&!r&&!i&&!x.defaultPrevented&&x.key===" "&&(x.preventBaseUIHandler(),on(x.currentTarget,x))}},onPointerDown(x){if(t){x.preventDefault();return}w?.(x)}},r?{type:"button"}:{role:"button"},c,y)},[t,c,i,r]),m=$(p=>{s.current=p,u()});return{getButtonProps:d,buttonRef:m}}function Q1(e){return Fe(e)&&e.tagName==="BUTTON"}function SP(e){return Fe(e)&&e.tagName==="A"&&!!e.href}var Pv=Vd.forwardRef(function(t,o){let{render:a,className:r,style:n,disabled:s,nativeButton:l=!0,...i}=t,c=Kr(),{toast:u,expanded:d}=Xn(),[m,p]=Vd.useState(!1),{getButtonProps:f,buttonRef:v}=Ut({disabled:s,native:l}),g={type:u.type};return ae("button",t,{ref:[o,v],state:g,props:[{"aria-hidden":!d&&!m,onClick(){c.closeToast(u.id)},onFocus(){p(!0)},onBlur(){p(!1)}},i,f]})});import*as kv from"react";var Av=kv.forwardRef(function(t,o){let{render:a,className:r,style:n,disabled:s,nativeButton:l=!0,...i}=t,{toast:c}=Xn(),u=c.actionProps?.children??i.children,{getButtonProps:d,buttonRef:m}=Ut({disabled:s,native:l}),p={type:c.type},f=ae("button",t,{ref:[o,m],state:p,props:[i,c.actionProps,d,{children:u}]});return Dd(f)?f:null});import*as Dv from"react";import*as _d from"react";import*as At from"react";function we(e,t,o,a){let r=!1,n=!1,s=a??ze;return{reason:e,event:t??new Event("base-ui"),cancel(){r=!0},allowPropagation(){n=!0},get isCanceled(){return r},get isPropagationAllowed(){return n},trigger:o,...s}}function zv(e,t,o){let a=o??ze;return{reason:e,event:t??new Event("base-ui"),...a}}var q={};Jo(q,{cancelOpen:()=>e3,chipRemovePress:()=>DP,clearPress:()=>NP,closePress:()=>zP,closeWatcher:()=>WP,decrementPress:()=>HP,disabled:()=>o3,drag:()=>YP,escapeKey:()=>$P,focusOut:()=>UP,imperativeAction:()=>n3,incrementPress:()=>OP,initial:()=>r3,inputBlur:()=>_P,inputChange:()=>VP,inputClear:()=>BP,inputPaste:()=>ZP,inputPress:()=>GP,itemPress:()=>AP,keyboard:()=>jP,linkPress:()=>LP,listNavigation:()=>qP,missing:()=>a3,none:()=>EP,outsidePress:()=>kP,pointer:()=>KP,popupClose:()=>JP,scrub:()=>QP,siblingOpen:()=>t3,swipe:()=>s3,trackPress:()=>FP,triggerFocus:()=>PP,triggerHover:()=>MP,triggerPress:()=>TP,wheel:()=>XP,windowResize:()=>i3});var EP="none",TP="trigger-press",MP="trigger-hover",PP="trigger-focus",kP="outside-press",AP="item-press",zP="close-press",LP="link-press",NP="clear-press",DP="chip-remove-press",FP="track-press",OP="increment-press",HP="decrement-press",VP="input-change",BP="input-clear",_P="input-blur",ZP="input-paste",GP="input-press",UP="focus-out",$P="escape-key",WP="close-watcher",qP="list-navigation",jP="keyboard",KP="pointer",YP="drag",XP="wheel",QP="scrub",JP="popup-close",e3="cancel-open",t3="sibling-open",o3="disabled",a3="missing",r3="initial",n3="imperative-action",s3="swipe",i3="window-resize";function an(e){return`data-base-ui-${e}`}import{jsx as J1,jsxs as Lv}from"react/jsx-runtime";var Nv=At.createContext(null),eh=()=>At.useContext(Nv),l3=an("portal");function Bd(e={}){let{ref:t,container:o,componentProps:a=ze,elementProps:r}=e,n=Da(),l=eh()?.portalNode,[i,c]=At.useState(null),[u,d]=At.useState(null),m=$(g=>{g!==null&&d(g)}),p=At.useRef(null);_(()=>{if(o===null){p.current&&(p.current=null,d(null),c(null));return}let g=(o&&(od(o)?o:o.current))??l??document.body;if(g==null){p.current&&(p.current=null,d(null),c(null));return}p.current!==g&&(p.current=g,d(null),c(g))},[o,l]);let f=ae("div",a,{ref:[t,m],props:[{id:n,[l3]:""},r]}),v=i&&f?Mr(f,i):null;return{node:u,nodeId:At.isValidElement(f)?f.props.id:void 0,subtree:v}}var th=At.forwardRef(function(t,o){let{render:a,className:r,style:n,children:s,container:l,portalOwnerRole:i,...c}=t,{node:u,nodeId:d,subtree:m}=Bd({container:l,ref:o,componentProps:t,elementProps:c}),p=At.useRef(null),f=At.useRef(null),v=At.useRef(null),g=At.useRef(null),[b,w]=At.useState(null),y=At.useRef(!1),x=b?.modal,h=b?.open,I=!!b&&!b.modal&&b.open&&!!u;At.useEffect(()=>{if(!u||x)return;function C(S){u&&S.relatedTarget&&Mn(S)&&(S.type==="focusin"?y.current&&(_1(u),y.current=!1):(Nw(u),y.current=!0))}return jo(Ae(u,"focusin",C,!0),Ae(u,"focusout",C,!0))},[u,x]),_(()=>{!u||h!==!0||!y.current||(_1(u),y.current=!1)},[h,u]);let R=At.useMemo(()=>({beforeOutsideRef:p,afterOutsideRef:f,beforeInsideRef:v,afterInsideRef:g,portalNode:u,setFocusManagerState:w}),[u]);return Lv(At.Fragment,{children:[m,Lv(Nv.Provider,{value:R,children:[I&&u&&J1(Lr,{"data-type":"outside",ref:p,onFocus:C=>{if(Mn(C,u))v.current?.focus();else{let S=b?b.domReference:null;Cd(S)?.focus()}}}),I&&u&&J1("span",{role:i,"aria-owns":d,style:iv}),u&&Mr(s,u),I&&u&&J1(Lr,{"data-type":"outside",ref:f,onFocus:C=>{if(Mn(C,u))g.current?.focus();else{let S=b?b.domReference:null;Id(S)?.focus(),b?.closeOnFocusOut&&b?.onOpenChange(!1,we(q.focusOut,C.nativeEvent))}}})]})]})});import{jsxs as c3}from"react/jsx-runtime";var Zd=_d.forwardRef(function(t,o){let{children:a,container:r,className:n,render:s,style:l,...i}=t,{node:c,subtree:u}=Bd({container:r,ref:o,componentProps:t,elementProps:i});return!u&&!c?null:c3(_d.Fragment,{children:[u,c&&Mr(a,c)]})});import{jsx as u3}from"react/jsx-runtime";var Fv=Dv.forwardRef(function(t,o){return u3(Zd,{ref:o,...t})});import*as hm from"react";import*as Ja from"react";function ft(e){let t=Ze(d3,e).current;return t.next=e,_(t.effect),t}function d3(e){let t={current:e,next:e,effect:()=>{t.current=t.next}};return t}import*as Ia from"react";function m3(e,t){return t!=null&&!Xa(t)?0:typeof e=="function"?e():e}function Dr(e,t,o){let a=m3(e,o);return typeof a=="number"?a:a?.[t]}function oh(e){return typeof e=="function"?e():e}function Gd(e,t){return t||e==="click"||e==="mousedown"}function Ov(e){return e?.includes("mouse")&&e!=="mousedown"}import{jsx as p3}from"react/jsx-runtime";var Hv=Ia.createContext({hasProvider:!1,timeoutMs:0,delayRef:{current:0},initialDelayRef:{current:0},timeout:new Fo,currentIdRef:{current:null},currentContextRef:{current:null}});function f3(e,t){e.current=t.current}function ah(e){let{children:t,delay:o,timeoutMs:a=0}=e,r=Ia.useRef(o),n=Ia.useRef(o),s=Ia.useRef(null),l=Ia.useRef(null),i=Qe();return _(()=>{if(n.current=o,!s.current){r.current=o;return}r.current={open:Dr(r.current,"open"),close:Dr(o,"close")}},[o,s,r,n]),p3(Hv.Provider,{value:Ia.useMemo(()=>({hasProvider:!0,delayRef:r,initialDelayRef:n,currentIdRef:s,timeoutMs:a,currentContextRef:l,timeout:i}),[a,i]),children:t})}function rh(e,t={open:!1}){let{open:o}=t,a=e.useState("floatingId"),r=Ia.useContext(Hv),{currentIdRef:n,delayRef:s,timeoutMs:l,initialDelayRef:i,currentContextRef:c,hasProvider:u,timeout:d}=r,[m,p]=Ia.useState(!1),f=Ia.useRef(o);return _(()=>{f.current=o},[o]),_(()=>{function v(){c.current?.setIsInstantPhase(!1),n.current=null,c.current=null,s.current=i.current,d.clear()}if(n.current&&!o&&n.current===a){if(p(!1),l){let g=a;return d.start(l,()=>{e.select("open")||n.current&&n.current!==g||v()}),()=>{(f.current||n.current!==g)&&d.clear()}}v()}},[o,a,n,s,l,i,c,d,e]),_(()=>{if(!o)return;let v=c.current,g=n.current;d.clear(),c.current={onOpenChange:e.setOpen,setIsInstantPhase:p},n.current=a,s.current={open:0,close:Dr(i.current,"close")},g!==null&&g!==a?(p(!0),v?.setIsInstantPhase(!0),v?.onOpenChange(!1,we(q.none))):(p(!1),v?.setIsInstantPhase(!1))},[o,a,e,n,s,i,c,d]),_(()=>()=>{if(n.current===a){if(c.current=null,!f.current)return;n.current=null,f3(s,i),d.clear()}},[c,n,s,a,i,d]),Ia.useMemo(()=>({activeIdRef:n,hasProvider:u,delayRef:s,isInstantPhase:m}),[n,u,s,m])}import*as ta from"react";var Ud=0;function Pi(e,t={}){let{preventScroll:o=!1,sync:a=!1,shouldFocus:r}=t;cancelAnimationFrame(Ud);function n(){r&&!r()||e?.focus({preventScroll:o})}if(a)return n(),Be;let s=requestAnimationFrame(n);return Ud=s,()=>{Ud===s&&(cancelAnimationFrame(s),Ud=0)}}var Vv="data-base-ui-inert",bc=new WeakMap,$d=new WeakSet,yc=new WeakMap,nh=0;function Gv(e){return e?ja(e)?e.host:Gv(e.parentNode):null}var Bv=(e,t)=>t.map(o=>{if(e.contains(o))return o;let a=Gv(o);return e.contains(a)?a:null}).filter(o=>o!=null),_v=e=>{let t=new Set;return e.forEach(o=>{let a=o;for(;a&&!t.has(a);)t.add(a),a=a.parentNode}),t},Zv=(e,t,o)=>{let a=[],r=n=>{!n||o.has(n)||Array.from(n.children).forEach(s=>{Gt(s)!=="script"&&(t.has(s)?r(s):a.push(s))})};return r(e),a};function g3(e,t,o,{mark:a=!0}){let r=Bv(t,e),n=a?Zv(t,_v(r),new Set(r)):[],s=[],l=[];if(o){let i=Bv(t,Array.from(t.querySelectorAll("[aria-live]"))),c=r.concat(i);Zv(t,_v(c),new Set(c)).forEach(d=>{let m=d.getAttribute("aria-hidden"),p=m!==null&&m!=="false",f=(bc.get(d)||0)+1;bc.set(d,f),s.push(d),f===1&&p&&$d.add(d),p||d.setAttribute("aria-hidden","true")})}return a&&n.forEach(i=>{let c=(yc.get(i)||0)+1;yc.set(i,c),l.push(i),c===1&&i.setAttribute(Vv,"")}),nh+=1,()=>{s.forEach(i=>{let c=(bc.get(i)||0)-1;bc.set(i,c),c||($d.has(i)||i.removeAttribute("aria-hidden"),$d.delete(i))}),a&&l.forEach(i=>{let c=(yc.get(i)||0)-1;yc.set(i,c),c||i.removeAttribute(Vv)}),nh-=1,nh||(bc=new WeakMap,$d=new WeakSet,yc=new WeakMap)}}function sh(e,t={}){let{ariaHidden:o=!1,mark:a=!0}=t,r=Ie(e[0]).body;return g3(e,r,o,{mark:a})}import*as Jn from"react";function Wd(){let e=new Map;return{emit(t,o){e.get(t)?.forEach(a=>a(o))},on(t,o){e.has(t)||e.set(t,new Set),e.get(t).add(o)},off(t,o){e.get(t)?.delete(o)}}}var Qn=class{nodesRef={current:[]};events=Wd();addNode(t){this.nodesRef.current.push(t)}removeNode(t){let o=this.nodesRef.current.findIndex(a=>a===t);o!==-1&&this.nodesRef.current.splice(o,1)}};import{jsx as Uv}from"react/jsx-runtime";var $v=Jn.createContext(null),Wv=Jn.createContext(null),Ca=()=>Jn.useContext($v)?.id||null,ca=e=>{let t=Jn.useContext(Wv);return e??t};function wc(e){let t=Da(),o=ca(e),a=Ca();return _(()=>{if(!t)return;let r={id:t,parentId:a};return o?.addNode(r),()=>{o?.removeNode(r)}},[o,t,a]),t}function ih(e){let{children:t,id:o}=e,a=Ca();return Uv($v.Provider,{value:Jn.useMemo(()=>({id:o,parentId:a}),[o,a]),children:t})}function lh(e){let{children:t,externalTree:o}=e,a=Ze(()=>o??new Qn).current;return Uv(Wv.Provider,{value:a,children:t})}import{jsx as qv,jsxs as h3}from"react/jsx-runtime";function b3(e,t){let o=Ke(He(e));return e instanceof o.KeyboardEvent?"keyboard":e instanceof o.FocusEvent?t||"keyboard":"pointerType"in e?e.pointerType||(Wn(e)?"keyboard":t||"mouse"):"touches"in e?"touch":e instanceof o.MouseEvent?t||(e.detail===0?"keyboard":"mouse"):""}var jv=20,es=[];function ch(){es=es.filter(e=>e.deref()?.isConnected)}function Kv(e){ch(),e&&Gt(e)!=="body"&&(es.push(new WeakRef(e)),es.length>jv&&(es=es.slice(-jv)))}function Yv(){return ch(),es[es.length-1]?.deref()}function y3(e){return e?mc(e)?e:pc(e)[0]||e:null}function Xv(e){if(e.hasAttribute("tabindex")&&!e.hasAttribute("data-tabindex")||!e.getAttribute("role")?.includes("dialog"))return;let o=B1(e).filter(r=>{let n=r.getAttribute("data-tabindex")||"";return mc(r)||r.hasAttribute("data-tabindex")&&!n.startsWith("-")}),a=e.getAttribute("tabindex");o.length===0?a!=="0"&&(e.setAttribute("tabindex","0"),e.setAttribute("data-tabindex","0")):(a!=="-1"||e.hasAttribute("data-tabindex")&&e.getAttribute("data-tabindex")!=="-1")&&(e.setAttribute("tabindex","-1"),e.setAttribute("data-tabindex","-1"))}function uh(e){let{context:t,children:o,disabled:a=!1,initialFocus:r=!0,returnFocus:n=!0,explicitReturnFocus:s,restoreFocus:l=!1,modal:i=!0,closeOnFocusOut:c=!0,openInteractionType:u="",nextFocusableElement:d,previousFocusableElement:m,beforeContentFocusGuardRef:p,externalTree:f,getInsideElements:v}=e,g=t.useState("open"),b=t.useState("domReferenceElement"),w=t.useState("floatingElement"),{events:y,dataRef:x}=t.context,h=$(()=>x.current.floatingContext?.nodeId),I=r===!1,R=sc(b)&&I,C=ft(r),S=ft(n),T=ft(s),P=ft(u),V=ft(g),E=ca(f),z=eh(),M=ta.useRef(!1),O=ta.useRef(!1),H=ta.useRef(!1),k=ta.useRef(null),N=ta.useRef(""),L=ta.useRef(""),U=ta.useRef(null),A=ta.useRef(null),ee=Bt(U,p,z?.beforeInsideRef),B=Bt(A,z?.afterInsideRef),Z=Qe(),G=Qe(),X=Ka(),be=z!=null,K=ic(w),Y=$((oe=K)=>oe?pc(oe):[]),j=$(()=>v?.().filter(oe=>oe!=null)??[]);ta.useEffect(()=>{if(a||!i)return;function oe(ie){ie.key==="Tab"&&ue(K,Je(Ie(K)))&&Y().length===0&&!R&&Ot(ie)}let Se=Ie(K);return Ae(Se,"keydown",oe)},[a,K,i,R,Y]),ta.useEffect(()=>{if(a||!g)return;let oe=Ie(K);function Se(){H.current=!1}function ie(fe){let de=He(fe),ve=j(),ge=ue(w,de)||ue(b,de)||ue(z?.portalNode,de)||ve.some(je=>je===de||ue(je,de));H.current=!ge,L.current=fe.pointerType||"keyboard",Ya(de,`[${av}]`)&&(O.current=!0,G.start(0,()=>{O.current=!1}))}function te(){L.current="keyboard"}return jo(Ae(oe,"pointerdown",ie,!0),Ae(oe,"pointerup",Se,!0),Ae(oe,"pointercancel",Se,!0),Ae(oe,"keydown",te,!0),Se)},[a,w,b,K,g,z,G,j]),ta.useEffect(()=>{if(a||!c)return;let oe=Ie(K);function Se(){O.current=!0,G.start(0,()=>{O.current=!1})}function ie(ve){let ge=He(ve);mc(ge)&&(k.current=ge)}function te(ve){let ge=ve.relatedTarget,je=ve.currentTarget,he=He(ve);i&&ge==null&&he!=null&&ue(w,he)&&Kv(he),queueMicrotask(()=>{let le=h(),W=t.context.triggerElements,Q=j(),xe=ge?.hasAttribute(an("focus-guard"))&&[U.current,A.current,z?.beforeInsideRef.current,z?.afterInsideRef.current,z?.beforeOutsideRef.current,z?.afterOutsideRef.current,Nr(m),Nr(d)].includes(ge),re=!(ue(b,ge)||ue(w,ge)||ue(ge,w)||ue(z?.portalNode,ge)||Q.some(ce=>ce===ge||ue(ce,ge))||W.hasMatchingElement(ce=>ue(ce,ge))||xe||E&&(pr(E.nodesRef.current,le).find(ce=>ue(ce.context?.elements.floating,ge)||ue(ce.context?.elements.domReference,ge))||D1(E.nodesRef.current,le).find(ce=>[ce.context?.elements.floating,ic(ce.context?.elements.floating)].includes(ge)||ce.context?.elements.domReference===ge)));if(je===b&&K&&Xv(K),l&&je!==b&&!ks(he)&&Je(oe)===oe.body){if(Fe(K)&&(K.focus(),l==="popup")){X.request(()=>{K.focus()});return}let ce=Y(),mt=k.current,st=(mt&&ce.includes(mt)?mt:null)||ce[ce.length-1]||K;Fe(st)&&st.focus()}if(x.current.insideReactTree){x.current.insideReactTree=!1;return}(R||!i)&&ge&&re&&!O.current&&(R||ge!==Yv())&&(M.current=!0,t.setOpen(!1,we(q.focusOut,ve)))})}function fe(){H.current||(x.current.insideReactTree=!0,Z.start(0,()=>{x.current.insideReactTree=!1}))}let de=Fe(b)?b:null;if(!(!w&&!de))return jo(de&&Ae(de,"focusout",te),de&&Ae(de,"pointerdown",Se),w&&Ae(w,"focusin",ie),w&&Ae(w,"focusout",te),w&&z&&Ae(w,"focusout",fe,!0))},[a,b,w,K,i,E,z,t,c,l,Y,R,h,x,Z,G,X,d,m,j]),ta.useEffect(()=>{if(a||!w||!g)return;let oe=Array.from(z?.portalNode?.querySelectorAll(`[${an("portal")}]`)||[]),ie=(E?D1(E.nodesRef.current,h()):[]).find(je=>sc(je.context?.elements.domReference||null))?.context?.elements.domReference,fe=[...[w,...oe,U.current,A.current,z?.beforeOutsideRef.current,z?.afterOutsideRef.current,...j()],ie,Nr(m),Nr(d),R?b:null].filter(je=>je!=null),de=sh(fe,{ariaHidden:i||R,mark:!1}),ve=[w,...oe].filter(je=>je!=null),ge=sh(ve);return()=>{ge(),de()}},[g,a,b,w,i,z,R,E,h,d,m,j]),_(()=>{if(!g||a||!Fe(K))return;N.current="",L.current="";let oe=Ie(K),Se=Je(oe);queueMicrotask(()=>{let ie=C.current,te=typeof ie=="function"?ie(P.current||""):ie;if(te===void 0||te===!1||ue(K,Se))return;let de=null,ve=()=>(de==null&&(de=Y(K)),de[0]||K),ge;te===!0||te===null?ge=ve():ge=Nr(te),ge=ge||ve();let je=ue(K,Je(oe)),he=x.current.openEvent,le=he?.type==="mousedown"&&Wn(he);Pi(ge,{sync:le,preventScroll:ge===K,shouldFocus(){if(!V.current)return!1;if(je)return!0;let W=Je(oe);return!(W!==ge&&ue(K,W))}})})},[a,g,K,Y,C,P,V,x]);let se=ta.useRef(null);_(()=>{if(a||!K){se.current=null;return}se.current&&(se.current.cancelled=!0,se.current=null);let oe=Ie(K),Se=Je(oe),ie=P.current==null;Kv(Se);function te(de){if(de.open||(N.current=b3(de.nativeEvent,L.current)),(de.reason===q.focusOut&&de.triggerElement?.hasAttribute(an("focus-guard"))||de.reason===q.triggerHover&&de.nativeEvent.type==="mouseleave")&&(M.current=!0),de.reason===q.outsidePress)if(de.nested)M.current=!1;else if(Wn(de.nativeEvent)||Qr(de.nativeEvent))M.current=!1;else{let ve=!1;Ie(K).createElement("div").focus({get preventScroll(){return ve=!0,!1}}),ve?M.current=!1:M.current=!0}}y.on("openchange",te);function fe(de){let ve=S.current,ge=typeof ve=="function"?ve(de):ve;if(ge===void 0||ge===!1)return null;ge===null&&(ge=!0);let je=b?.isConnected?b:null,he=Se?.isConnected&&Gt(Se)!=="body"?Se:null,le=ie?he||je:je||he;return le||(le=Yv()||null),typeof ge=="boolean"?le:Nr(ge)||le||null}return()=>{y.off("openchange",te);let de=Je(oe),ve=j(),ge=ue(w,de)||ve.some(Q=>Q===de||ue(Q,de))||E&&pr(E.nodesRef.current,h(),!1).some(Q=>ue(Q.context?.elements.floating,de)),je=S.current,he=N.current,le=fe(he),W={cancelled:!1};se.current=W,queueMicrotask(()=>{se.current===W&&(se.current=null);let Q=y3(le),xe=T.current??typeof je!="boolean";if(!W.cancelled&&je&&!M.current&&Fe(Q)&&(!(!xe&&Q!==de&&de!==oe.body)||ge)){let re={preventScroll:!0};he==="keyboard"&&(re.focusVisible=!0),Q.focus(re)}M.current=!1})}},[a,w,K,S,T,P,y,E,b,h,j]),_(()=>{if(!at.engine.webkit||g||!w)return;let oe=Je(Ie(w));!Fe(oe)||!Pr(oe)||ue(w,oe)&&oe.blur()},[g,w]),_(()=>{if(!(a||!z))return z.setFocusManagerState({modal:i,closeOnFocusOut:c,open:g,onOpenChange:t.setOpen,domReference:b}),()=>{z.setFocusManagerState(null)}},[a,z,i,g,t,c,b]),_(()=>{if(!(a||!K))return Xv(K),()=>{queueMicrotask(ch)}},[a,K]);let pe=!a&&(i?!R:!0)&&(be||i);return h3(ta.Fragment,{children:[pe&&qv(Lr,{"data-type":"inside",ref:ee,onFocus:oe=>{if(i){let Se=Y();Pi(Se[Se.length-1])}else z?.portalNode&&(M.current=!1,Mn(oe,z.portalNode)?Id(b)?.focus():Nr(m??z.beforeOutsideRef)?.focus())}}),o,pe&&qv(Lr,{"data-type":"inside",ref:B,onFocus:oe=>{i?Pi(Y()[0]):z?.portalNode&&(c&&(M.current=!0),Mn(oe,z.portalNode)?Cd(b)?.focus():Nr(d??z.afterOutsideRef)?.focus())}})]})}import*as vc from"react";function xc(e,t={}){let{enabled:o=!0,event:a="click",toggle:r=!0,ignoreMouse:n=!1,stickIfOpen:s=!0,touchOpenDelay:l=0,reason:i=q.triggerPress}=t,c=e.context.dataRef,u=vc.useRef(void 0),d=Ka(),m=Qe(),p=vc.useMemo(()=>{function f(g,b,w,y){let x=we(i,b,w);g&&y==="touch"&&l>0?m.start(l,()=>{e.setOpen(!0,x)}):e.setOpen(g,x)}function v(g,b,w){let y=c.current.openEvent,x=e.select("domReferenceElement")!==b;return g&&x||!g||!r?!0:y&&(typeof s=="function"?s():s)?!w(y.type):!1}return{onPointerDown(g){u.current=Xa(g.pointerType,!0)&&Qr(g.nativeEvent)?"virtual":g.pointerType},onMouseDown(g){let b=u.current,w=g.nativeEvent,y=e.select("open");if(g.button!==0||a==="click"||Xa(b,!0)&&n)return;let x=v(y,g.currentTarget,C=>C==="click"||C==="mousedown"),h=He(w),I=Pr(h);if(I||b==="virtual"){f(x,w,I?h:g.currentTarget,b);return}let R=g.currentTarget;d.request(()=>{f(x,w,R,b)})},onClick(g){if(a==="mousedown-only")return;let b=u.current;if(a==="mousedown"&&b){u.current=void 0;return}if(Xa(b,!0)&&n)return;let w=e.select("open"),y=v(w,g.currentTarget,x=>x==="click"||x==="mousedown"||x==="keydown"||x==="keyup");f(y,g.nativeEvent,g.currentTarget,b)},onKeyDown(){u.current=void 0}}},[c,a,n,i,e,s,r,d,m,l]);return vc.useMemo(()=>o?{reference:p}:ze,[o,p])}import*as Fa from"react";function w3(e,t){let o=null,a=null,r=!1;return{contextElement:e||void 0,getBoundingClientRect(){let n=e?.getBoundingClientRect()||{width:0,height:0,x:0,y:0},s=t.axis==="x"||t.axis==="both",l=t.axis==="y"||t.axis==="both",i=["mouseenter","mousemove"].includes(t.dataRef.current.openEvent?.type||"")&&t.pointerType!=="touch",c=t.axis==="y"?n.width:0,u=t.axis==="x"?n.height:0,d=n.x,m=n.y;return o==null&&t.x&&s&&(o=n.x-t.x),a==null&&t.y&&l&&(a=n.y-t.y),d-=o||0,m-=a||0,(!r||i)&&(d=s&&t.x!=null?t.x:d,m=l&&t.y!=null?t.y:m),r=!0,{width:c,height:u,x:d,y:m,top:m,right:d+c,bottom:m+u,left:d}}}}function Qv(e){return e!=null&&e.clientX!=null}function dh(e,t={}){let{enabled:o=!0,axis:a="both"}=t,r=e.useState("open"),n=e.useState("floatingElement"),s=e.useState("domReferenceElement"),l=e.context.dataRef,i=Fa.useRef(!1),c=Fa.useRef(null),[u,d]=Fa.useState(),[m,p]=Fa.useState([]),f=$(y=>{e.set("positionReference",y)}),v=$((y,x,h)=>{i.current||l.current.openEvent&&!Qv(l.current.openEvent)||e.set("positionReference",w3(h??s,{x:y,y:x,axis:a,dataRef:l,pointerType:u}))}),g=$(y=>{r?c.current||(v(y.clientX,y.clientY,y.currentTarget),p([])):v(y.clientX,y.clientY,y.currentTarget)}),b=Xa(u)?n:r;Fa.useEffect(()=>{if(!o){f(s);return}if(!b)return;function y(){c.current?.(),c.current=null}let x=Ke(n);function h(I){let R=He(I);ue(n,R)?y():v(I.clientX,I.clientY)}return!l.current.openEvent||Qv(l.current.openEvent)?c.current=Ae(x,"mousemove",h):f(s),y},[b,o,n,l,s,e,v,f,m]),Fa.useEffect(()=>()=>{e.set("positionReference",null)},[e]),Fa.useEffect(()=>{o&&!n&&(i.current=!1)},[o,n]),Fa.useEffect(()=>{!o&&r&&(i.current=!0)},[o,r]);let w=Fa.useMemo(()=>{function y(x){d(x.pointerType)}return{onPointerDown:y,onPointerEnter:y,onMouseMove:g,onMouseEnter:g}},[g]);return Fa.useMemo(()=>o?{reference:w,trigger:w}:{},[o,w])}import*as ua from"react";function v3(){return!1}function x3(e){return{escapeKey:typeof e=="boolean"?e:e?.escapeKey??!1,outsidePress:typeof e=="boolean"?e:e?.outsidePress??!0}}function Ic(e,t={}){let{enabled:o=!0,escapeKey:a=!0,outsidePress:r=!0,outsidePressEvent:n="sloppy",referencePress:s=v3,bubbles:l,externalTree:i}=t,c=e.useState("open"),u=e.useState("floatingElement"),{dataRef:d,events:m}=e.context,p=ca(i),f=$(typeof r=="function"?r:()=>!1),v=typeof r=="function"?f:r,g=v!==!1,b=$(()=>n),{escapeKey:w,outsidePress:y}=x3(l),x=ua.useRef(!1),h=ua.useRef(!1),I=ua.useRef(!1),R=ua.useRef(!1),C=ua.useRef(!1),S=ua.useRef(""),T=ua.useRef(null),P=Qe(),V=Qe(),E=Qe(),z=$(()=>{V.clear(),d.current.insideReactTree=!1}),M=$(B=>{let Z=d.current.floatingContext?.nodeId;return(p?pr(p.nodesRef.current,Z):[]).some(X=>X.context?.open&&!X.context.dataRef.current[B])}),O=$(B=>hd(B,e.select("floatingElement"))||hd(B,e.select("domReferenceElement"))),H=$(B=>{s()&&e.setOpen(!1,we(q.triggerPress,B.nativeEvent))}),k=$(B=>{if(!c||!o||!a||B.key!=="Escape")return;let Z=vw(B)?B.nativeEvent:B;if(C.current||Z.isComposing||!w&&M("__escapeKeyBubbles"))return;let G=we(q.escapeKey,Z);e.setOpen(!1,G),G.isCanceled||B.preventDefault(),!w&&!G.isPropagationAllowed&&B.stopPropagation()}),N=$(()=>{d.current.insideReactTree=!0,V.start(0,z)}),L=$(B=>{if(!c||!o||B.button!==0)return;let Z=He(B.nativeEvent);ue(e.select("floatingElement"),Z)&&(x.current||(x.current=!0,h.current=!1))}),U=$(B=>{!c||!o||(B.defaultPrevented||B.nativeEvent.defaultPrevented)&&x.current&&(h.current=!0)});ua.useEffect(()=>{function B(Z){Z.open||(R.current=!1)}return m.on("openchange",B),()=>{m.off("openchange",B)}},[m]),ua.useEffect(()=>z,[z]),ua.useEffect(()=>{if(!c||!o)return c||(R.current=!1,C.current=!1,S.current="",T.current=null),z;d.current.__escapeKeyBubbles=w,d.current.__outsidePressBubbles=y;let B=new Fo,Z=Ie(u);function G(){E.clear(),C.current=!0}function X(){C.current=!0,E.start(at.engine.webkit?5:0,()=>{C.current=!1})}function be(){I.current=!0,B.start(0,()=>{I.current=!1})}function K(){x.current=!1,h.current=!1}function Y(){let W=S.current,Q=W==="pen"||!W?"mouse":W,xe=b(),re=typeof xe=="function"?xe():xe;return typeof re=="string"?re:re[Q]}function j(W){let Q=Y();return Q==="intentional"&&W.type!=="click"||Q==="sloppy"&&W.type==="click"}function se(W){let Q=d.current.floatingContext?.nodeId,xe=p&&pr(p.nodesRef.current,Q).some(re=>hd(W,re.context?.elements.floating));return O(W)||xe}function pe(W){if(j(W)){W.type!=="click"&&!O(W)&&(B.clear(),I.current=!1),z();return}if(d.current.insideReactTree){z();return}let Q=He(W),xe=`[${an("inert")}]`,re=Ge(Q)?Q.getRootNode():null,ce=Array.from((ja(re)?re:Ie(e.select("floatingElement"))).querySelectorAll(xe)),mt=e.context.triggerElements;if(Q&&(mt.hasElement(Q)||mt.hasMatchingElement(Xe=>ue(Xe,Q))))return;let st=Ge(Q)?Q:null;for(;st&&!mr(st);){let Xe=dr(st);if(mr(Xe)||!Ge(Xe))break;st=Xe}if(!(ce.length&&Ge(Q)&&!ww(Q)&&!ue(Q,e.select("floatingElement"))&&ce.every(Xe=>!ue(st,Xe)))){if(Fe(Q)&&!("touches"in W)){let Xe=mr(Q),Ue=Go(Q),pt=/auto|scroll/,Zo=Xe||pt.test(Ue.overflowX),bt=Xe||pt.test(Ue.overflowY),Rt=Zo&&Q.clientWidth>0&&Q.scrollWidth>Q.clientWidth,ba=bt&&Q.clientHeight>0&&Q.scrollHeight>Q.clientHeight,Tt=Ue.direction==="rtl",Dt=ba&&(Tt?W.offsetX<=Q.offsetWidth-Q.clientWidth:W.offsetX>Q.clientWidth),Aa=Rt&&W.offsetY>Q.clientHeight;if(Dt||Aa)return}if(!se(W)){if(Y()==="intentional"){if(W.detail!==0&&!Wn(W)&&!R.current)return;if(I.current){B.clear(),I.current=!1;return}}typeof v=="function"&&!v(W)||M("__outsidePressBubbles")||(e.setOpen(!1,we(q.outsidePress,W)),z())}}}function oe(W){Y()!=="sloppy"||W.pointerType==="touch"||!e.select("open")||!o||O(W)||pe(W)}function Se(W){if(Y()!=="sloppy"||!e.select("open")||!o||O(W))return;let Q=W.touches[0];Q&&(T.current={startTime:Date.now(),startX:Q.clientX,startY:Q.clientY,dismissOnTouchEnd:!1,dismissOnMouseDown:!0},P.start(1e3,()=>{T.current&&(T.current.dismissOnTouchEnd=!1,T.current.dismissOnMouseDown=!1)}))}function ie(W,Q){let xe=He(W);if(!xe)return;let re=Ae(xe,W.type,()=>{Q(W),re()})}function te(W){S.current="touch",ie(W,Se)}function fe(W){P.clear(),W.type==="pointerdown"&&(W.button===0&&(R.current=!0),S.current=W.pointerType),!(W.type==="mousedown"&&T.current&&!T.current.dismissOnMouseDown)&&ie(W,Q=>{Q.type==="pointerdown"?oe(Q):pe(Q)})}function de(W){if(W.type==="pointercancel"&&(R.current=!1),!x.current)return;let Q=h.current;if(K(),Y()==="intentional"){if(W.type==="pointercancel"){Q&&be();return}if(!se(W)){if(Q){be();return}typeof v=="function"&&!v(W)||(B.clear(),I.current=!0,z())}}}function ve(W){if(Y()!=="sloppy"||!T.current||O(W))return;let Q=W.touches[0];if(!Q)return;let xe=Math.abs(Q.clientX-T.current.startX),re=Math.abs(Q.clientY-T.current.startY),ce=Math.sqrt(xe*xe+re*re);ce>5&&(T.current.dismissOnTouchEnd=!0),ce>10&&(pe(W),P.clear(),T.current=null)}function ge(W){ie(W,ve)}function je(W){Y()!=="sloppy"||!T.current||O(W)||(T.current.dismissOnTouchEnd&&pe(W),P.clear(),T.current=null)}function he(W){ie(W,je)}let le=jo(a&&jo(Ae(Z,"keydown",k),Ae(Z,"compositionstart",G),Ae(Z,"compositionend",X)),g&&jo(Ae(Z,"click",fe,!0),Ae(Z,"pointerdown",fe,!0),Ae(Z,"pointerup",de,!0),Ae(Z,"pointercancel",de,!0),Ae(Z,"mousedown",fe,!0),Ae(Z,"mouseup",de,!0),Ae(Z,"touchstart",te,{capture:!0,passive:!0}),Ae(Z,"touchmove",ge,{capture:!0,passive:!0}),Ae(Z,"touchend",he,{capture:!0,passive:!0})));return()=>{le(),B.clear(),K(),I.current=!1}},[d,u,a,g,v,c,o,w,y,k,z,b,M,O,p,e,P,E]);let A=ua.useMemo(()=>({onKeyDown:k,onPointerDown:H,onClick:H}),[k,H]),ee=ua.useMemo(()=>({onKeyDown:k,onPointerDown:U,onMouseDown:U,onClickCapture:N,onMouseDownCapture(B){N(),L(B)},onPointerDownCapture(B){N(),L(B)},onMouseUpCapture:N,onTouchEndCapture:N,onTouchMoveCapture:N}),[k,N,L,U]);return ua.useMemo(()=>o?{reference:A,floating:ee,trigger:A}:{},[o,A,ee])}var ki=class{attachedStores=[];attachedStoreValue=null;storeListeners=new Set;constructor(t,o,a=!0){this.fallbackStore=t,this.componentName=o,this.throwOnMissingTrigger=a}get attachedStore(){return this.attachedStoreValue}get store(){return this.attachedStoreValue??this.fallbackStore}get serverStore(){return this.fallbackStore}subscribeStore(t){return this.storeListeners.add(t),()=>{this.storeListeners.delete(t)}}attachStore(t){return this.attachedStores.push(t),this.setActiveStore(t),()=>{let o=this.attachedStores.lastIndexOf(t);o!==-1&&this.attachedStores.splice(o,1),this.setActiveStore(this.attachedStores[this.attachedStores.length-1]??null)}}setActiveStore(t){this.attachedStoreValue!==t&&(this.attachedStoreValue=t,this.storeListeners.forEach(o=>{o()}))}openByTrigger(t){let o=this.attachedStore;if(o===null)return;let a;if(t){for(let r=this.attachedStores.length-1;r>=0&&!a;r-=1)a=this.attachedStores[r].context.triggerElements.getById(t);a??=this.fallbackStore.context.triggerElements.getById(t)}if(t&&!a&&this.throwOnMissingTrigger)throw new Error(De(99,this.componentName,t,this.componentName));o.setOpen(!0,we(q.imperativeAction,void 0,a))}closePopup(){let t=this.attachedStore;t!==null&&t.setOpen(!1,we(q.imperativeAction))}};import*as fh from"react";function Cc(e){let{popupStore:t,treatPopupAsFloatingElement:o=!1,floatingRootContext:a,floatingId:r,nested:n,onOpenChange:s}=e,l=t.useState("open"),i=t.useState("activeTriggerElement"),c=t.useState(o?"popupElement":"positionerElement"),u=s;return t.useSyncedValue("floatingId",r),_(()=>{let d={open:l,floatingId:r,referenceElement:i,floatingElement:c};Ge(i)&&(d.domReferenceElement=i),a.state.positionReference===a.state.referenceElement&&(d.positionReference=i),a.update(d)},[l,r,i,c,a]),a.context.onOpenChange=u,a.context.nested=n,a}import*as ph from"react";import*as mh from"react";function da(e,t=!1,o=!1,a=!1){let[r,n]=mh.useState(e&&t?"idle":void 0),[s,l]=mh.useState(e&&!a);return e&&!s&&(l(!0),n("starting")),!e&&s&&r!=="ending"&&!o&&n("ending"),!e&&!s&&r==="ending"&&n(void 0),_(()=>{if(!e&&s&&r!=="ending"&&o){let i=Uo.request(()=>{n("ending")});return()=>{Uo.cancel(i)}}},[e,s,r,o]),_(()=>{if(!e||t||r===void 0)return;let i=Uo.request(()=>{n(void 0)});return()=>{Uo.cancel(i)}},[t,e,r]),_(()=>{if(!e||!t)return;e&&s&&r!=="idle"&&n("starting");let i=Uo.request(()=>{n("idle")});return()=>{Uo.cancel(i)}},[t,e,s,r]),{mounted:s,setMounted:l,transitionStatus:r}}function Jv(e){let{open:t,ref:o,preventUnmountOnClose:a,setPreventUnmountOnClose:r,onUnmount:n,animateInitialOpen:s}=e,l=$(r),{mounted:i,setMounted:c,transitionStatus:u}=da(t,!1,!1,s),d=t?!1:a;_(()=>{t&&l(!1)},[t,l]);let m=ph.useRef(i),p=ph.useRef(!1),f=id(),v=()=>{m.current=!1,c(!1),n()};_(()=>{m.current=i,p.current&&(p.current=!1,!t&&i&&v())});let g=$(()=>{if(m.current){if(t){p.current=!0,f();return}v()}});return Oo({enabled:i&&!t&&!d,open:t,ref:o,onComplete(){t||g()}}),{mounted:i,transitionStatus:u,preventUnmountingOnClose:d,forceUnmount:g}}var qd={tabIndex:-1,[ec]:""};function tx(e,t=!1){let o=Da(),a=Ca()!=null,r=Ze(()=>e(o,a)).current;return Cc({popupStore:r,treatPopupAsFloatingElement:t,floatingRootContext:r.state.floatingRootContext,floatingId:o,nested:a,onOpenChange:r.setOpen}),r}function jd({handle:e,store:t}){return _(()=>e.attachStore(t),[e,t]),null}function ex(e){let t=e.context.triggerElements.size;e.select("open")&&e.state.triggerCount!==t&&e.set("triggerCount",t)}function gh(e,t){let o=fh.useRef(null);return $(a=>{let r=o.current;if(r!==null){if(r.element===a&&r.store===t&&r.id===e)return;o.current=null;let n=r.store;n.context.triggerElements.getById(r.id)===r.element&&(n.context.triggerElements.delete(r.id),ex(n))}a!==null&&e!==void 0&&(o.current={store:t,id:e,element:a},t.context.triggerElements.add(e,a),ex(t))})}function hh(e,t,o,a=!1){let r=e.preventUnmountingOnClose;t?r=!1:a&&(r=!0);let n=o?.id??null,s=e.activeTriggerId,l=e.activeTriggerElement;return(n||t)&&(s=n,l=o??null),{open:t,preventUnmountingOnClose:r,activeTriggerId:s,activeTriggerElement:l,openedWithoutTrigger:t?o==null:e.openedWithoutTrigger}}function bh(e){let t=!1;return e.preventUnmountOnClose=()=>{t=!0},()=>t}function ox(e,t,o,a={}){let r=o.reason,n=r===q.triggerHover,s=t&&r===q.triggerFocus,l=!t&&(r===q.triggerPress||r===q.escapeKey),i=bh(o);if(e.context.onOpenChange?.(t,o),o.isCanceled)return;a.onBeforeDispatch?.(),e.state.floatingRootContext.dispatchOpenChange(t,o);let c=()=>{let u=hh(e.state,t,o.trigger,i()),d={...a.extraState,...u};s?d.instantType="focus":l?d.instantType="dismiss":n&&(d.instantType=void 0),e.update(d)};n?xa(c):c()}function Kd(e,t,o,a){let r=o.useState("isMountedByTrigger",e),n=gh(e,o),s=$(i=>{let c=o.select("open"),u=o.select("activeTriggerId");if(u===e){let d={activeTriggerElement:i,...c?a:null};o.update(d);return}if(u==null&&c&&!o.state.openedWithoutTrigger){let d={activeTriggerId:e??null,activeTriggerElement:i,...a};o.update(d)}}),l=$(i=>{n(i),i&&s(i)});return _(()=>(l(t.current),()=>l(null)),[l,t,o,e]),_(()=>{if(r){let i={activeTriggerElement:t.current,...a};o.update(i)}},[r,o,t,...Object.values(a)]),{registerTrigger:l,isMountedByThisTrigger:r}}function Yd(e,t={}){let{closeOnActiveTriggerUnmount:o=!1}=t,a=fh.useRef(null),r=e.useState("open"),n=e.useState("triggerCount"),s=e.useState("activeTriggerId"),l=e.useState("activeTriggerElement");_(()=>{if(!r){a.current=null,e.state.triggerCount!==0&&e.set("triggerCount",0),e.state.openedWithoutTrigger&&e.set("openedWithoutTrigger",!1);return}let i=e.context.triggerElements.size,c={};e.state.triggerCount!==i&&(c.triggerCount=i);let u=e.select("activeTriggerId"),d=null;if(u){let m=e.context.triggerElements.getById(u);if(m)a.current=u,m!==e.state.activeTriggerElement&&(c.activeTriggerElement=m);else{for(let[p,f]of e.context.triggerElements.entries())if(f===e.state.activeTriggerElement){c.activeTriggerId=p,c.activeTriggerElement=f,a.current=p;break}c.activeTriggerId===void 0&&(a.current===u?d=u:a.current=null)}}else a.current=null;if(!d&&!u&&!e.state.openedWithoutTrigger&&i===1){let m=e.context.triggerElements.entries().next();if(!m.done){let[p,f]=m.value;c.activeTriggerId=p,c.activeTriggerElement=f,a.current=p}}(c.triggerCount!==void 0||c.activeTriggerId!==void 0||c.activeTriggerElement!==void 0)&&e.update(c),d&&o&&queueMicrotask(()=>{if(e.select("open")&&e.select("activeTriggerId")===d&&!e.context.triggerElements.getById(d)){let m=we(q.none);e.setOpen(!1,m),m.isCanceled||e.update({activeTriggerId:null,activeTriggerElement:null})}})},[r,e,n,s,l,o])}function Xd(e,t,o,a){let{mounted:r,transitionStatus:n,forceUnmount:s}=Jv({open:e,ref:t.context.popupRef,preventUnmountOnClose:t.useState("preventUnmountingOnClose"),setPreventUnmountOnClose:l=>t.set("preventUnmountingOnClose",l),animateInitialOpen:a,onUnmount(){t.update({activeTriggerId:null,activeTriggerElement:null,mounted:!1,preventUnmountingOnClose:!1}),o?.(),t.context.onOpenChangeComplete?.(!1)}});return Ze(()=>(t.set("mounted",r),null)),t.useSyncedValues({mounted:r,transitionStatus:n}),{forceUnmount:s,transitionStatus:n}}function Qd(e,t){e.useSyncedValues(t),_(()=>()=>{e.update({activeTriggerProps:ze,inactiveTriggerProps:ze,popupProps:ze})},[e])}var rn=class{idMap=new Map;add(t,o){this.idMap.set(t,o)}delete(t){this.idMap.delete(t)}hasElement(t){for(let o of this.idMap.values())if(o===t)return!0;return!1}hasMatchingElement(t){for(let o of this.idMap.values())if(t(o))return!0;return!1}getById(t){return this.idMap.get(t)}entries(){return this.idMap.entries()}elements(){return this.idMap.values()}get size(){return this.idMap.size}};var I3={open:e=>e.open,transitionStatus:e=>e.transitionStatus,domReferenceElement:e=>e.domReferenceElement,referenceElement:e=>e.positionReference??e.referenceElement,floatingElement:e=>e.floatingElement,floatingId:e=>e.floatingId},Ai=class extends La{constructor(t){let{syncOnly:o,nested:a,onOpenChange:r,triggerElements:n,...s}=t;super({...s,positionReference:s.referenceElement,domReferenceElement:s.referenceElement},{onOpenChange:r,dataRef:{current:{}},events:Wd(),nested:a,triggerElements:n},I3),this.syncOnly=o}syncOpenEvent=(t,o)=>{(!t||!this.state.open||o!=null&&xw(o))&&(this.context.dataRef.current.openEvent=t?o:void 0)};dispatchOpenChange=(t,o)=>{this.syncOpenEvent(t,o.event);let a={open:t,reason:o.reason,nativeEvent:o.event,nested:this.context.nested,triggerElement:o.trigger};this.context.events.emit("openchange",a)};setOpen=(t,o)=>{if(this.syncOnly){this.context.onOpenChange?.(t,o);return}this.dispatchOpenChange(t,o),this.context.onOpenChange?.(t,o)}};function em(e,t,o=!1){return{open:!1,openProp:void 0,mounted:!1,transitionStatus:void 0,floatingRootContext:new Ai({open:!1,transitionStatus:void 0,floatingElement:null,referenceElement:null,triggerElements:e,floatingId:t,syncOnly:!0,nested:o,onOpenChange:void 0}),floatingId:t,triggerCount:0,preventUnmountingOnClose:!1,payload:void 0,activeTriggerId:null,activeTriggerElement:null,openedWithoutTrigger:!1,triggerIdProp:void 0,popupElement:null,positionerElement:null,activeTriggerProps:ze,inactiveTriggerProps:ze,popupProps:ze}}var Rc=e=>e.triggerIdProp??e.activeTriggerId,Jd=e=>e.openProp??e.open,ax=e=>(e.popupElement?.id??e.floatingId)||void 0;function rx(e,t){return t!==void 0&&Jd(e)&&Rc(e)===t}function C3(e,t){return rx(e,t)?!0:t!==void 0&&Jd(e)&&Rc(e)==null&&!e.openedWithoutTrigger&&e.triggerCount===1}var zi={open:Jd,mounted:e=>e.mounted,transitionStatus:e=>Jd(e)&&!e.mounted?"starting":e.transitionStatus,floatingRootContext:e=>e.floatingRootContext,triggerCount:e=>e.triggerCount,preventUnmountingOnClose:e=>e.preventUnmountingOnClose,payload:e=>e.payload,activeTriggerId:Rc,activeTriggerElement:e=>e.mounted?e.activeTriggerElement:null,popupId:ax,isTriggerActive:(e,t)=>t!==void 0&&Rc(e)===t,isOpenedByTrigger:(e,t)=>rx(e,t),isMountedByTrigger:(e,t)=>t!==void 0&&Rc(e)===t&&e.mounted,triggerProps:(e,t)=>t?e.activeTriggerProps:e.inactiveTriggerProps,triggerPopupId:(e,t)=>C3(e,t)?ax(e):void 0,popupProps:e=>e.popupProps,popupElement:e=>e.popupElement,positionerElement:e=>e.positionerElement};import*as yh from"react";function tm(e){let t=yh.useCallback(a=>e===void 0?Be:e.subscribeStore(a),[e]),o=yh.useCallback(()=>e===void 0?void 0:e.store,[e]);return jl(t,o,()=>e?.serverStore)}function wh(e){let{open:t=!1,onOpenChange:o,elements:a={}}=e,r=Da(),n=Ca()!=null,s=Ze(()=>new Ai({open:t,transitionStatus:void 0,onOpenChange:o,referenceElement:a.reference??null,floatingElement:a.floating??null,triggerElements:new rn,floatingId:r,syncOnly:!1,nested:n})).current;return _(()=>{let l={open:t,floatingId:r};a.reference!==void 0&&(l.referenceElement=a.reference,l.domReferenceElement=Ge(a.reference)?a.reference:null),a.floating!==void 0&&(l.floatingElement=a.floating),s.update(l)},[t,r,a.reference,a.floating,s]),s.context.onOpenChange=o,s.context.nested=n,s}import*as nn from"react";var vh=at.os.mac&&at.engine.webkit;function Sc(e,t={}){let{enabled:o=!0,delay:a}=t,{events:r,dataRef:n}=e.context,s=nn.useRef(!1),l=nn.useRef(null),i=nn.useRef(!0),c=Qe();nn.useEffect(()=>{let d=e.select("domReferenceElement");if(!o)return;let m=Ke(d);function p(){let g=e.select("domReferenceElement");!e.select("open")&&Fe(g)&&g===Je(Ie(g))&&(s.current=!0,l.current=g)}function f(){i.current=!0}function v(){i.current=!1}return jo(Ae(m,"blur",p),vh&&Ae(m,"keydown",f,!0),vh&&Ae(m,"pointerdown",v,!0))},[e,o]),nn.useEffect(()=>{if(!o)return;function d(m){if(m.reason===q.triggerPress||m.reason===q.escapeKey){let p=e.select("domReferenceElement");Ge(p)&&(l.current=p,s.current=!0)}}return r.on("openchange",d),()=>{r.off("openchange",d)}},[r,o,e]);let u=nn.useMemo(()=>{function d(){s.current=!1,l.current=null}return{onMouseLeave(){d()},onFocus(m){let p=m.currentTarget;if(s.current){if(l.current===p)return;d()}let f=He(m.nativeEvent);if(Ge(f)){if(vh&&!m.relatedTarget){if(!i.current&&!Pr(f))return}else if(!$n(f))return}let v=Un(m.relatedTarget,e.context.triggerElements),{nativeEvent:g,currentTarget:b}=m;if(e.select("open")&&v||!a){e.setOpen(!0,we(q.triggerFocus,g,b));return}c.start(a,()=>{s.current||e.setOpen(!0,we(q.triggerFocus,g,b))})},onBlur(m){d();let p=m.relatedTarget,f=m.nativeEvent,v=Ge(p)&&p.hasAttribute(an("focus-guard"))&&p.getAttribute("data-type")==="outside";c.start(0,()=>{let g=e.select("domReferenceElement"),b=Je(Ie(g));!p&&b===g||ue(n.current.floatingContext?.refs.floating.current,b)||ue(g,b)||v||Un(p??b,e.context.triggerElements)||e.setOpen(!1,we(q.triggerFocus,f))})}}},[n,a,e,c]);return nn.useMemo(()=>o?{reference:u,trigger:u}:{},[o,u])}import*as Ih from"react";var xh=class e{pointerType=void 0;interactedInside=!1;handler=void 0;blockMouseMove=!0;performedPointerEventsMutation=!1;pointerEventsScopeElement=null;pointerEventsReferenceElement=null;pointerEventsFloatingElement=null;restTimeoutPending=!1;openChangeTimeout=new Fo;restTimeout=new Fo;handleCloseOptions=void 0;static create(){return new e}dispose=()=>{this.openChangeTimeout.clear(),this.restTimeout.clear()};disposeEffect=()=>this.dispose},om=new WeakMap;function Li(e){if(!e.performedPointerEventsMutation)return;let t=e.pointerEventsScopeElement;t&&om.get(t)===e&&(e.pointerEventsScopeElement?.style.removeProperty("pointer-events"),e.pointerEventsReferenceElement?.style.removeProperty("pointer-events"),e.pointerEventsFloatingElement?.style.removeProperty("pointer-events"),om.delete(t)),e.performedPointerEventsMutation=!1,e.pointerEventsScopeElement=null,e.pointerEventsReferenceElement=null,e.pointerEventsFloatingElement=null}function am(e,t){let{scopeElement:o,referenceElement:a,floatingElement:r}=t,n=om.get(o);n&&n!==e&&Li(n),Li(e),e.performedPointerEventsMutation=!0,e.pointerEventsScopeElement=o,e.pointerEventsReferenceElement=a,e.pointerEventsFloatingElement=r,om.set(o,e),o.style.pointerEvents="none",a.style.pointerEvents="auto",r.style.pointerEvents="auto"}function Ni(e){let t=e.context.dataRef.current,o=Ze(()=>t.hoverInteractionState??xh.create()).current;return t.hoverInteractionState||(t.hoverInteractionState=o),Zn(t.hoverInteractionState.disposeEffect),t.hoverInteractionState}function Ec(e,t={}){let{enabled:o=!0,closeDelay:a=0,nodeId:r}=t,n=e.useState("open"),s=e.useState("floatingElement"),l=e.useState("domReferenceElement"),{dataRef:i}=e.context,c=ca(),u=Ca(),d=Ni(e),m=Qe(),p=$(()=>Gd(i.current.openEvent?.type,d.interactedInside)),f=$(()=>Ov(i.current.openEvent?.type)),v=$(()=>{Li(d)});_(()=>{n||(d.pointerType=void 0,d.restTimeoutPending=!1,d.interactedInside=!1,v())},[n,d,v]),Ih.useEffect(()=>v,[v]),_(()=>{if(o&&n&&d.handleCloseOptions?.blockPointerEvents&&f()&&Ge(l)&&s){let g=l,b=s,w=Ie(s),y=c?.nodesRef.current.find(R=>R.id===u)?.context?.elements.floating;y&&(y.style.pointerEvents="");let x=d.pointerEventsScopeElement!==b?d.pointerEventsScopeElement:null,h=y!==b?y:null,I=d.handleCloseOptions?.getScope?.()??x??h??Ya(g,"[data-rootownerid]")??w.body;return am(d,{scopeElement:I,referenceElement:g,floatingElement:b}),()=>{v()}}},[o,n,l,s,d,f,c,u,v]),Ih.useEffect(()=>{if(!o)return;function g(){return!!(c&&u&&pr(c.nodesRef.current,u).length>0)}function b(R){let C=Dr(a,"close",d.pointerType),S=()=>{e.setOpen(!1,we(q.triggerHover,R)),c?.events.emit("floating.closed",R)};C?d.openChangeTimeout.start(C,S):(d.openChangeTimeout.clear(),S())}function w(R){let C=He(R);if(!N1(C)){d.interactedInside=!1;return}d.interactedInside=Ya(C,"[aria-haspopup]")!=null}function y(){d.openChangeTimeout.clear(),m.clear(),c?.events.off("floating.closed",h),v()}function x(R){if(g()&&c){c.events.on("floating.closed",h);return}if(Un(R.relatedTarget,e.context.triggerElements))return;let C=i.current.floatingContext?.nodeId??r,S=R.relatedTarget;if(!(c&&C&&Ge(S)&&pr(c.nodesRef.current,C,!1).some(P=>ue(P.context?.elements.floating,S)))){if(d.handler){d.handler(R);return}v(),f()&&!p()&&b(R)}}function h(R){!c||!u||g()||m.start(0,()=>{c.events.off("floating.closed",h),e.setOpen(!1,we(q.triggerHover,R)),c.events.emit("floating.closed",R)})}let I=s;return jo(I&&Ae(I,"mouseenter",y),I&&Ae(I,"mouseleave",x),I&&Ae(I,"pointerdown",w,!0),()=>{c?.events.off("floating.closed",h)})},[o,s,e,i,a,r,f,p,v,d,c,u,m])}import*as ts from"react";var R3={current:null};function zs(e,t={}){let{enabled:o=!0,delay:a=0,handleClose:r=null,mouseOnly:n=!1,restMs:s=0,move:l=!0,triggerElementRef:i=R3,externalTree:c,isActiveTrigger:u=!0,getHandleCloseContext:d,isClosing:m,shouldOpen:p,guardStaleOpen:f=!1}=t,{dataRef:v,events:g}=e.context,b=ca(c),w=Ni(e),y=ts.useRef(!1),x=ft(r),h=ft(a),I=ft(s),R=ft(o),C=ft(p),S=ft(m),T=$(()=>Gd(v.current.openEvent?.type,w.interactedInside)),P=$(()=>C.current?.()!==!1),V=$((M,O,H)=>{let k=e.context.triggerElements;if(k.hasElement(O))return!M||!ue(M,O);if(!Ge(H))return!1;let N=H;return k.hasMatchingElement(L=>ue(L,N))&&(!M||!ue(M,N))}),E=$(()=>{if(!w.handler)return;Ie(e.select("domReferenceElement")).removeEventListener("mousemove",w.handler),w.handler=void 0}),z=$(()=>{Li(w)});return u&&(w.handleCloseOptions=r?.__options),ts.useEffect(()=>E,[E]),ts.useEffect(()=>{if(!o)return;function M(O){O.open?y.current=!1:(y.current=O.reason===q.triggerHover,E(),w.openChangeTimeout.clear(),w.restTimeout.clear(),w.blockMouseMove=!0,w.restTimeoutPending=!1)}return g.on("openchange",M),()=>{g.off("openchange",M)}},[o,g,w,E]),ts.useEffect(()=>{if(!o)return;function M(U,A=!0){let ee=Dr(h.current,"close",w.pointerType);ee?w.openChangeTimeout.start(ee,()=>{e.setOpen(!1,we(q.triggerHover,U)),b?.events.emit("floating.closed",U)}):A&&(w.openChangeTimeout.clear(),e.setOpen(!1,we(q.triggerHover,U)),b?.events.emit("floating.closed",U))}let O=i.current??(u?e.select("domReferenceElement"):null);if(!Ge(O))return;function H(U){if(w.openChangeTimeout.clear(),w.blockMouseMove=!1,n&&!Xa(w.pointerType))return;let A=oh(I.current),ee=Dr(h.current,"open",w.pointerType),B=He(U),Z=U.currentTarget??null,G=e.select("domReferenceElement"),X=Z;if(Ge(B)&&!e.context.triggerElements.hasElement(B)){for(let ie of e.context.triggerElements.elements())if(ue(ie,B)){X=ie;break}}Ge(Z)&&Ge(G)&&!e.context.triggerElements.hasElement(Z)&&ue(Z,G)&&(X=G);let be=X==null?!1:V(G,X,B),K=e.select("open"),Y=S.current?.()??e.select("transitionStatus")==="ending",j=!K&&Y&&y.current,se=!be&&Ge(X)&&Ge(G)&&ue(G,X)&&j,pe=A>0&&!ee,oe=be&&(K||j)||se,Se=!K||be;if(oe){P()&&e.setOpen(!0,we(q.triggerHover,U,X));return}pe||(ee?w.openChangeTimeout.start(ee,()=>{Se&&P()&&e.setOpen(!0,we(q.triggerHover,U,X))}):Se&&P()&&e.setOpen(!0,we(q.triggerHover,U,X)))}function k(U){if(T()){z();return}E();let A=e.select("domReferenceElement"),ee=Ie(A);w.restTimeout.clear(),w.restTimeoutPending=!1;let B=v.current.floatingContext??d?.();if(Un(U.relatedTarget,e.context.triggerElements))return;if(x.current&&B){e.select("open")||w.openChangeTimeout.clear();let G=i.current;w.handler=x.current({...B,tree:b,x:U.clientX,y:U.clientY,onClose(){z(),E(),R.current&&!T()&&G===e.select("domReferenceElement")&&M(U,!0)}}),ee.addEventListener("mousemove",w.handler),w.handler(U);return}(w.pointerType==="touch"?!ue(e.select("floatingElement"),U.relatedTarget):!0)&&M(U)}function N(U){ue(O,U.relatedTarget)||(w.openChangeTimeout.clear(),w.restTimeout.clear(),w.restTimeoutPending=!1)}let L=f?Ae(O,"mouseout",N):void 0;return l?jo(Ae(O,"mousemove",H,{once:!0}),Ae(O,"mouseenter",H),Ae(O,"mouseleave",k),L):jo(Ae(O,"mouseenter",H),Ae(O,"mouseleave",k),L)},[E,z,v,h,e,o,x,w,u,V,T,n,l,I,i,b,R,d,S,P,f]),ts.useMemo(()=>{if(!o)return;function M(O){w.pointerType=O.pointerType}return{onPointerDown:M,onPointerEnter:M,onMouseMove(O){let{nativeEvent:H}=O,k=O.currentTarget,N=e.select("domReferenceElement"),L=e.select("open"),U=V(N,k,O.target);if(n&&!Xa(w.pointerType))return;if(L&&U&&w.handleCloseOptions?.blockPointerEvents){let B=e.select("floatingElement");if(B){let Z=w.handleCloseOptions?.getScope?.()??k.ownerDocument.body;am(w,{scopeElement:Z,referenceElement:k,floatingElement:B})}}let A=oh(I.current);if(L&&!U||A===0||!U&&w.restTimeoutPending&&O.movementX**2+O.movementY**2<2)return;w.restTimeout.clear();function ee(){if(w.restTimeoutPending=!1,T())return;let B=e.select("open");!w.blockMouseMove&&(!B||U)&&P()&&e.setOpen(!0,we(q.triggerHover,H,k))}w.pointerType==="touch"?xa(()=>{ee()}):U&&L?ee():(w.restTimeoutPending=!0,w.restTimeout.start(A,ee))}}},[o,w,T,V,n,e,I,P])}import*as oa from"react";function nx(e){return at.engine.webkit&&e.movementX===0&&e.movementY===0}function rm(e,t,o){switch(e){case"vertical":return t;case"horizontal":return o;default:return t||o}}function hr(e,t){return rm(t,e===k1||e===md,e===tc||e===oc)}function Tc(e,t,o){return rm(t,e===md,o?e===tc:e===oc)||e==="Enter"||e===" "||e===""}function Mc(e,t,o){return rm(t,o?e===tc:e===oc,e===md)}function os(e,t,o,a){let r=o?e===oc:e===tc,n=e===k1;return t==="both"||t==="horizontal"&&a?e==="Escape":rm(t,r,n)}function Ch(e,t){let{listRef:o,activeIndex:a,onNavigate:r=()=>{},enabled:n=!0,selectedIndex:s=null,allowEscape:l=!1,loopFocus:i=!1,nested:c=!1,rtl:u=!1,virtual:d=!1,focusItemOnOpen:m="auto",focusItemOnHover:p=!0,openOnArrowKeyDown:f=!0,disabledIndices:v=void 0,orientation:g="vertical",triggerOrientation:b=g,parentOrientation:w,id:y,resetOnPointerLeave:x=!0,externalTree:h,nestedReturnFocusRef:I,grid:R}=t,C=R!=null,S=e.useState("open"),T=e.useState("floatingElement"),P=e.useState("domReferenceElement"),V=e.context.dataRef,E=ic(T),z=sc(P),M=ft(E),O=Ca(),H=ca(h),k=oa.useRef(m),N=oa.useRef(s??-1),L=oa.useRef(null),U=oa.useRef(!0),A=$(W=>{r(N.current===-1?null:N.current,W)}),ee=oa.useRef(!!T),B=oa.useRef(S),Z=oa.useRef(!1),G=oa.useRef(!1),X=oa.useRef(null),be=ft(v),K=ft(S),Y=ft(s),j=ft(x),se=Ka(),pe=Ka(),oe=$(()=>{se.cancel();function W(ce){d||(X.current=Pi(ce,{sync:Z.current,preventScroll:!0}))}let Q=o.current[N.current],xe=G.current;Q&&W(Q),(Z.current?ce=>ce():ce=>se.request(ce))(()=>{let ce=o.current[N.current]||Q;if(!ce)return;Q||W(ce),ve&&(xe||!U.current)&&ce.scrollIntoView?.({block:"nearest",inline:"nearest"})})});_(()=>{V.current.orientation=g},[V,g]),_(()=>{S||(L.current=null),(!S||m!=="auto")&&(k.current=m)},[S,m]),_(()=>{n&&(S&&T?(N.current=s??-1,k.current&&s!=null&&(G.current=!0,A())):ee.current&&(N.current=-1,A()))},[n,S,T,s,A]),_(()=>{if(n){if(!S){Z.current=!1;return}if(T)if(a==null){if(Z.current=!1,Y.current!=null)return;if(ee.current&&(N.current=-1,oe()),(!B.current||!ee.current)&&k.current&&(L.current!=null||k.current===!0&&L.current==null)){let W=0,Q=()=>{o.current[0]==null?(W<2&&(W?re=>pe.request(re):queueMicrotask)(Q),W+=1):(N.current=L.current==null||Tc(L.current,b,u)||c?Ar(o):tn(o),L.current=null,A())};Q()}}else En(o.current,a)||(N.current=a,oe(),G.current=!1)}},[n,S,T,a,Y,c,o,b,u,A,oe,pe]),_(()=>{if(!n||T||!H||d||!ee.current)return;let W=H.nodesRef.current,Q=W.find(ce=>ce.id===O)?.context?.elements.floating,xe=Je(Ie(P??Q??null)),re=W.some(ce=>ce.context&&ue(ce.context.elements.floating,xe));Q&&!re&&U.current&&Q.focus({preventScroll:!0})},[n,T,P,H,O,d]),_(()=>{B.current=S,ee.current=!!T});let Se=a!=null,ie=$(W=>{if(!K.current)return;let Q=o.current.indexOf(W.currentTarget);Q!==-1&&(N.current!==Q||a!==Q)&&(N.current=Q,A(W))}),te=$(()=>w??H?.nodesRef.current.find(W=>W.id===O)?.context?.dataRef?.current.orientation),fe=$(()=>Ar(o,be.current)),de=$(W=>{if(U.current=!1,Z.current=!0,W.which===229||!K.current&&W.currentTarget===M.current)return;if(c&&os(W.key,g,u,C)){hr(W.key,te())||Ot(W),e.setOpen(!1,we(q.listNavigation,W.nativeEvent));let ce=I?.current??P;Fe(ce)&&ce.focus();return}a!=null&&a!==N.current&&!En(o.current,a)&&(N.current=a);let Q=N.current,xe=Ar(o,v),re=tn(o,v);if(z||(W.key==="Home"&&(Ot(W),N.current=xe,A(W)),W.key==="End"&&(Ot(W),N.current=re,A(W))),R!=null){let ce=R(W,N.current,o,g,i,u,v,xe,re);if(ce!=null&&ce!==N.current&&(N.current=ce,A(W)),g==="both")return}if(hr(W.key,g)){Ot(W);let ce=Je(W.currentTarget.ownerDocument);if(S&&!d&&ue(W.currentTarget,ce)&&!o.current.some(Xe=>Xe!=null&&ue(Xe,ce))){N.current=Tc(W.key,g,u)?xe:re,A(W),a===N.current&&oe();return}let{index:mt,wrapped:st}=xd(o.current,Q,{decrement:!Tc(W.key,g,u),loopFocus:i,allowEscape:l,disabledIndices:v,minIndex:xe,maxIndex:re});st&&(Z.current=!1),N.current=mt,A(W)}}),ve=oa.useMemo(()=>({onFocus(Q){Z.current=!0,ie(Q)},onClick({currentTarget:Q}){d||Q.focus({preventScroll:!0})},onMouseMove(Q){nx(Q)||(Z.current=!0,G.current=!1,p&&ie(Q))},onPointerLeave(Q){if(!K.current||!U.current||Q.pointerType==="touch")return;Z.current=!0;let xe=Q.relatedTarget;if(!(!p||o.current.includes(xe))&&j.current&&(X.current?.(),X.current=null,N.current=-1,A(Q),!d)){let re=M.current,ce=Je(Ie(re));re&&ue(re,ce)&&re.focus({preventScroll:!0})}}}),[ie,K,M,p,o,A,j,d]),ge=oa.useMemo(()=>d&&S&&Se&&{"aria-activedescendant":`${y}-${a}`},[d,S,Se,y,a]),je=oa.useMemo(()=>({...z?{}:ge,onKeyDown(W){if(W.key==="Tab"&&W.shiftKey&&S&&!d){let Q=He(W.nativeEvent);if(Q&&!ue(M.current,Q))return;Ot(W);let xe=we(q.focusOut,W.nativeEvent);e.setOpen(!1,xe);let re=I?.current??P;!xe.isCanceled&&Fe(re)&&re.focus();return}de(W)},onPointerMove(W){nx(W)||(U.current=!0)}}),[ge,de,M,z,e,S,d,P,I]),he=oa.useMemo(()=>{function W(re){e.setOpen(!0,we(q.listNavigation,re.nativeEvent,re.currentTarget))}function Q(re){m==="auto"&&Wn(re.nativeEvent)&&(k.current=!d)}function xe(re){k.current=m,m==="auto"&&Qr(re.nativeEvent)&&(k.current=!0)}return{onKeyDown(re){let ce=e.select("open");U.current=!1;let mt=re.key.startsWith("Arrow"),st=Mc(re.key,te(),u),Xe=hr(re.key,ce?g:b),Ue=(c?st:Xe)||re.key==="Enter"||re.key.trim()==="";if(d&&ce&&(!c||Pr(re.currentTarget)))return de(re);if(!(!ce&&!f&&mt)){if(Ue){let pt=hr(re.key,te());L.current=c&&pt?null:re.key}if(c){st&&(Ot(re),ce?(N.current=fe(),A(re),d&&M.current?.focus()):W(re));return}Xe&&(Y.current!=null&&(N.current=Y.current),Ot(re),!ce&&f?W(re):de(re),ce&&A(re))}},onFocus(re){re.target===re.currentTarget&&e.select("open")&&!d&&(N.current=-1,A(re))},onPointerDown:xe,onPointerEnter:xe,onMouseDown:Q,onClick:Q}},[de,m,fe,c,A,e,f,g,b,te,u,Y,d,M]),le=oa.useMemo(()=>({...ge,...he}),[ge,he]);return oa.useMemo(()=>n?{reference:le,floating:je,item:ve,trigger:he}:{},[n,le,je,he,ve])}import*as Ls from"react";function Rh(e,t){let{listRef:o,elementsRef:a,activeIndex:r,onMatch:n,disabledIndices:s,onTyping:l,enabled:i=!0,resetMs:c=750,selectedIndex:u=null}=t,d=$(l),m=e.useState("open"),p=Qe(),f=Ls.useRef(""),v=Ls.useRef(u??r??-1),g=Ls.useRef(null),b=$(x=>{function h(z){return a?.current[z]}function I(z){let M=h(z);return M&&!ks(M)||M?.matches(":disabled")?!1:s==null||!Tn(Ft,z,s)}function R(z,M,O=0){if(z.length===0)return-1;let H=(O%z.length+z.length)%z.length,k=M.toLowerCase();for(let N=0;N<z.length;N+=1){let L=(H+N)%z.length;if(!(!z[L]?.toLowerCase().startsWith(k)||!I(L)))return L}return-1}let C=o.current;if(f.current.length>0&&x.key===" "&&(Ot(x),d?.(!0)),f.current.length>0&&f.current[0]!==" "&&R(C,f.current)===-1&&x.key!==" "&&d?.(!1),C==null||x.key.length!==1||x.ctrlKey||x.metaKey||x.altKey)return;m&&x.key!==" "&&(Ot(x),d?.(!0));let S=f.current==="";S&&(v.current=u??r??-1),C.every((z,M)=>z&&I(M)?z[0]?.toLowerCase()!==z[1]?.toLowerCase():!0)&&f.current===x.key&&(f.current="",v.current=g.current),f.current+=x.key,p.start(c,()=>{f.current="",v.current=g.current,d?.(!1)});let V=((S?u??r??-1:v.current)??0)+1,E=R(C,f.current,V);E!==-1?(n?.(E,x),g.current=E):x.key!==" "&&(f.current="",d?.(!1))}),w=$(x=>{let h=x.relatedTarget,I=e.select("domReferenceElement"),R=e.select("floatingElement");ue(I,h)||ue(R,h)||(p.clear(),f.current="",v.current=g.current,d?.(!1))});_(()=>{!m&&u!==null||(p.clear(),g.current=null,f.current!==""&&(f.current="",d?.(!1)))},[m,u,p,d]);let y=Ls.useMemo(()=>({onKeyDown:b,onBlur:w}),[b,w]);return Ls.useMemo(()=>i?{reference:y,floating:y}:{},[i,y])}var sx=.1,S3=sx*sx,vt=.5;function nm(e,t,o,a,r,n){return a>=t!=n>=t&&e<=(r-o)*(t-a)/(n-a)+o}function sm(e,t,o,a,r,n,s,l,i,c){let u=!1;return nm(e,t,o,a,r,n)&&(u=!u),nm(e,t,r,n,s,l)&&(u=!u),nm(e,t,s,l,i,c)&&(u=!u),nm(e,t,i,c,o,a)&&(u=!u),u}function E3(e,t,o){return e>=o.x&&e<=o.x+o.width&&t>=o.y&&t<=o.y+o.height}function im(e,t,o,a,r,n){let s=Math.min(o,r),l=Math.max(o,r),i=Math.min(a,n),c=Math.max(a,n);return e>=s&&e<=l&&t>=i&&t<=c}function Ns(e={}){let{blockPointerEvents:t=!1}=e,o=new Fo,a=({x:r,y:n,placement:s,elements:l,onClose:i,nodeId:c,tree:u})=>{let d=s?.split("-")[0],m=!1,p=null,f=null,v=typeof performance<"u"?performance.now():0;function g(w,y){let x=performance.now(),h=x-v;if(p===null||f===null||h===0)return p=w,f=y,v=x,!1;let I=w-p,R=y-f,C=I*I+R*R,S=h*h*S3;return p=w,f=y,v=x,C<S}function b(){o.clear(),i()}return function(y){o.clear();let x=l.domReference,h=l.floating;if(!x||!h||d==null||r==null||n==null)return;let{clientX:I,clientY:R}=y,C=He(y),S=y.type==="mouseleave",T=ue(h,C),P=ue(x,C);if(T&&(m=!0,!S))return;if(P&&(m=!1,!S)){m=!0;return}if(S&&Ge(y.relatedTarget)&&ue(h,y.relatedTarget))return;function V(){return!!(u&&pr(u.nodesRef.current,c).length>0)}function E(){V()||b()}if(V())return;let z=x.getBoundingClientRect(),M=h.getBoundingClientRect(),O=r>M.right-M.width/2,H=n>M.bottom-M.height/2,k=M.width>z.width,N=M.height>z.height,L=(k?z:M).left,U=(k?z:M).right,A=(N?z:M).top,ee=(N?z:M).bottom;if(d==="top"&&n>=z.bottom-1||d==="bottom"&&n<=z.top+1||d==="left"&&r>=z.right-1||d==="right"&&r<=z.left+1){E();return}let B=!1;switch(d){case"top":B=im(I,R,L,z.top+1,U,M.bottom-1);break;case"bottom":B=im(I,R,L,M.top+1,U,z.bottom-1);break;case"left":B=im(I,R,M.right-1,ee,z.left+1,A);break;case"right":B=im(I,R,z.right-1,ee,M.left+1,A);break;default:}if(B)return;if(m&&!E3(I,R,z)){E();return}if(!S&&g(I,R)){E();return}let Z=!1;switch(d){case"top":{let G=k?vt/2:vt*4,X=k||O?r+G:r-G,be=k?r-G:O?r+G:r-G,K=n+vt+1,Y=O||k?M.bottom-vt:M.top,j=O?k?M.bottom-vt:M.top:M.bottom-vt;Z=sm(I,R,X,K,be,K,M.left,Y,M.right,j);break}case"bottom":{let G=k?vt/2:vt*4,X=k||O?r+G:r-G,be=k?r-G:O?r+G:r-G,K=n-vt,Y=O||k?M.top+vt:M.bottom,j=O?k?M.top+vt:M.bottom:M.top+vt;Z=sm(I,R,X,K,be,K,M.left,Y,M.right,j);break}case"left":{let G=N?vt/2:vt*4,X=N||H?n+G:n-G,be=N?n-G:H?n+G:n-G,K=r+vt+1,Y=H||N?M.right-vt:M.left,j=H?N?M.right-vt:M.left:M.right-vt;Z=sm(I,R,Y,M.top,j,M.bottom,K,X,K,be);break}case"right":{let G=N?vt/2:vt*4,X=N||H?n+G:n-G,be=N?n-G:H?n+G:n-G,K=r-vt,Y=H||N?M.left+vt:M.right,j=H?N?M.left+vt:M.right:M.left+vt;Z=sm(I,R,K,X,K,be,Y,M.top,j,M.bottom);break}default:}Z?m||o.start(40,E):E()}};return a.__options={...e,blockPointerEvents:t},a}function ix(e,t,o){let{reference:a,floating:r}=e,n=Na(t),s=dc(t),l=uc(s),i=ea(t),c=n==="y",u=a.x+a.width/2-r.width/2,d=a.y+a.height/2-r.height/2,m=a[l]/2-r[l]/2,p;switch(i){case"top":p={x:u,y:a.y-r.height};break;case"bottom":p={x:u,y:a.y+a.height};break;case"right":p={x:a.x+a.width,y:d};break;case"left":p={x:a.x-r.width,y:d};break;default:p={x:a.x,y:a.y}}let f=Qa(t);return f&&(p[s]+=m*(f==="end"?1:-1)*(o&&c?-1:1)),p}async function lx(e,t){var o;t===void 0&&(t={});let{x:a,y:r,platform:n,rects:s,elements:l,strategy:i}=e,{boundary:c="clippingAncestors",rootBoundary:u="viewport",elementContext:d="floating",altBoundary:m=!1,padding:p=0}=en(t,e),f=vd(p),g=l[m?d==="floating"?"reference":"floating":d],b=Ps(await n.getClippingRect({element:(o=await(n.isElement==null?void 0:n.isElement(g)))==null||o?g:g.contextElement||await(n.getDocumentElement==null?void 0:n.getDocumentElement(l.floating)),boundary:c,rootBoundary:u,strategy:i})),w=d==="floating"?{x:a,y:r,width:s.floating.width,height:s.floating.height}:s.reference,y=await(n.getOffsetParent==null?void 0:n.getOffsetParent(l.floating)),x=await(n.isElement==null?void 0:n.isElement(y))&&await(n.getScale==null?void 0:n.getScale(y))||{x:1,y:1},h=Ps(n.convertOffsetParentRelativeRectToViewportRelativeRect?await n.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:w,offsetParent:y,strategy:i}):w);return{top:(b.top-h.top+f.top)/x.y,bottom:(h.bottom-b.bottom+f.bottom)/x.y,left:(b.left-h.left+f.left)/x.x,right:(h.right-b.right+f.right)/x.x}}var T3=50,cx=async(e,t,o)=>{let{placement:a="bottom",strategy:r="absolute",middleware:n=[],platform:s}=o,l=s.detectOverflow?s:{...s,detectOverflow:lx},i=await(s.isRTL==null?void 0:s.isRTL(t)),c=await s.getElementRects({reference:e,floating:t,strategy:r}),{x:u,y:d}=ix(c,a,i),m=a,p=0,f={};for(let v=0;v<n.length;v++){let g=n[v];if(!g)continue;let{name:b,fn:w}=g,{x:y,y:x,data:h,reset:I}=await w({x:u,y:d,initialPlacement:a,placement:m,strategy:r,middlewareData:f,rects:c,platform:l,elements:{reference:e,floating:t}});u=y??u,d=x??d,f[b]={...f[b],...h},I&&p<T3&&(p++,typeof I=="object"&&(I.placement&&(m=I.placement),I.rects&&(c=I.rects===!0?await s.getElementRects({reference:e,floating:t,strategy:r}):I.rects),{x:u,y:d}=ix(c,m,i)),v=-1)}return{x:u,y:d,placement:m,strategy:r,middlewareData:f}};var ux=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var o,a;let{placement:r,middlewareData:n,rects:s,initialPlacement:l,platform:i,elements:c}=t,{mainAxis:u=!0,crossAxis:d=!0,fallbackPlacements:m,fallbackStrategy:p="bestFit",fallbackAxisSideDirection:f="none",flipAlignment:v=!0,...g}=en(e,t);if((o=n.arrow)!=null&&o.alignmentOffset)return{};let b=ea(r),w=Na(l),y=ea(l)===l,x=await(i.isRTL==null?void 0:i.isRTL(c.floating)),h=m||(y||!v?[lc(l)]:Sw(l)),I=f!=="none";!m&&I&&h.push(...Ew(l,v,f,x));let R=[l,...h],C=await i.detectOverflow(t,g),S=[],T=((a=n.flip)==null?void 0:a.overflows)||[];if(u&&S.push(C[b]),d){let z=Rw(r,s,x);S.push(C[z[0]],C[z[1]])}if(T=[...T,{placement:r,overflows:S}],!S.every(z=>z<=0)){var P,V;let z=(((P=n.flip)==null?void 0:P.index)||0)+1,M=R[z];if(M&&(!(d==="alignment"?w!==Na(M):!1)||T.every(k=>Na(k.placement)===w?k.overflows[0]>0:!0)))return{data:{index:z,overflows:T},reset:{placement:M}};let O=(V=T.filter(H=>H.overflows[0]<=0).sort((H,k)=>H.overflows[1]-k.overflows[1])[0])==null?void 0:V.placement;if(!O)switch(p){case"bestFit":{var E;let H=(E=T.filter(k=>{if(I){let N=Na(k.placement);return N===w||N==="y"}return!0}).map(k=>[k.placement,k.overflows.filter(N=>N>0).reduce((N,L)=>N+L,0)]).sort((k,N)=>k[1]-N[1])[0])==null?void 0:E[0];H&&(O=H);break}case"initialPlacement":O=l;break}if(r!==O)return{reset:{placement:O}}}return{}}}};var dx=new Set(["left","top"]);async function M3(e,t){let{placement:o,platform:a,elements:r}=e,n=await(a.isRTL==null?void 0:a.isRTL(r.floating)),s=ea(o),l=Qa(o),i=Na(o)==="y",c=dx.has(s)?-1:1,u=n&&i?-1:1,d=en(t,e),{mainAxis:m,crossAxis:p,alignmentAxis:f}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return l&&typeof f=="number"&&(p=l==="end"?f*-1:f),i?{x:p*u,y:m*c}:{x:m*c,y:p*u}}var mx=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var o,a;let{x:r,y:n,placement:s,middlewareData:l}=t,i=await M3(t,e);return s===((o=l.offset)==null?void 0:o.placement)&&(a=l.arrow)!=null&&a.alignmentOffset?{}:{x:r+i.x,y:n+i.y,data:{...i,placement:s}}}}},px=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){let{x:o,y:a,placement:r,platform:n}=t,{mainAxis:s=!0,crossAxis:l=!1,limiter:i={fn:w=>{let{x:y,y:x}=w;return{x:y,y:x}}},...c}=en(e,t),u={x:o,y:a},d=await n.detectOverflow(t,c),m=Na(r),p=wd(m),f=u[p],v=u[m],g=(w,y)=>yd(y+d[w==="y"?"top":"left"],y,y-d[w==="y"?"bottom":"right"]);s&&(f=g(p,f)),l&&(v=g(m,v));let b=i.fn({...t,[p]:f,[m]:v});return{...b,data:{x:b.x-o,y:b.y-a,enabled:{[p]:s,[m]:l}}}}}},fx=function(e){return e===void 0&&(e={}),{options:e,fn(t){var o,a;let{x:r,y:n,placement:s,rects:l,middlewareData:i}=t,{offset:c=0,mainAxis:u=!0,crossAxis:d=!0}=en(e,t),m={x:r,y:n},p=Na(s),f=wd(p),v=m[f],g=m[p],b=en(c,t),w=typeof b=="number"?{mainAxis:b,crossAxis:0}:{mainAxis:(o=b.mainAxis)!=null?o:0,crossAxis:(a=b.crossAxis)!=null?a:0};if(u){let h=f==="y"?"height":"width",I=l.reference[f]-l.floating[h]+w.mainAxis,R=l.reference[f]+l.reference[h]-w.mainAxis;v<I?v=I:v>R&&(v=R)}if(d){var y,x;let h=f==="y"?"width":"height",I=dx.has(ea(s)),R=l.reference[p]-l.floating[h]+(I&&((y=i.offset)==null?void 0:y[p])||0)+(I?0:w.crossAxis),C=l.reference[p]+l.reference[h]+(I?0:((x=i.offset)==null?void 0:x[p])||0)-(I?w.crossAxis:0);g<R?g=R:g>C&&(g=C)}return{[f]:v,[p]:g}}}},gx=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){let{placement:o,rects:a,platform:r,elements:n}=t,{apply:s=()=>{},...l}=en(e,t),i=await r.detectOverflow(t,l),c=ea(o),u=Qa(o),d=Na(o)==="y",{width:m,height:p}=a.floating,f,v;c==="top"||c==="bottom"?(f=c,v=u===(await(r.isRTL==null?void 0:r.isRTL(n.floating))?"start":"end")?"left":"right"):(v=c,f=u==="end"?"top":"bottom");let g=p-i.top-i.bottom,b=m-i.left-i.right,w=qn(p-i[f],g),y=qn(m-i[v],b),x=t.middlewareData.shift,h=!x,I=w,R=y;x!=null&&x.enabled.x&&(R=b),x!=null&&x.enabled.y&&(I=g),h&&!u&&(d?R=m-2*kr(i.left,i.right):I=p-2*kr(i.top,i.bottom)),await s({...t,availableWidth:R,availableHeight:I});let C=await r.getDimensions(n.floating);return m!==C.width||p!==C.height?{reset:{rects:!0}}:{}}}};function yx(e){let t=Go(e),o=parseFloat(t.width)||0,a=parseFloat(t.height)||0,r=Fe(e),n=r?e.offsetWidth:o,s=r?e.offsetHeight:a,l=jn(o)!==n||jn(a)!==s;return l&&(o=n,a=s),{width:o,height:a,$:l}}function Eh(e){return Ge(e)?e:e.contextElement}function Di(e){let t=Eh(e);if(!Fe(t))return Jr(1);let o=t.getBoundingClientRect(),{width:a,height:r,$:n}=yx(t),s=(n?jn(o.width):o.width)/a,l=(n?jn(o.height):o.height)/r;return(!s||!Number.isFinite(s))&&(s=1),(!l||!Number.isFinite(l))&&(l=1),{x:s,y:l}}var P3=Jr(0);function wx(e){let t=Ke(e);return!rd()||!t.visualViewport?P3:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function k3(e,t,o){return t===void 0&&(t=!1),!!o&&t&&o===Ke(e)}function Ds(e,t,o,a){t===void 0&&(t=!1),o===void 0&&(o=!1);let r=e.getBoundingClientRect(),n=Eh(e),s=Jr(1);t&&(a?Ge(a)&&(s=Di(a)):s=Di(e));let l=k3(n,o,a)?wx(n):Jr(0),i=(r.left+l.x)/s.x,c=(r.top+l.y)/s.y,u=r.width/s.x,d=r.height/s.y;if(n&&a){let m=Ke(n),p=Ge(a)?Ke(a):a,f=m,v=nd(f);for(;v&&p!==f;){let g=Di(v),b=v.getBoundingClientRect(),w=Go(v),y=b.left+(v.clientLeft+parseFloat(w.paddingLeft))*g.x,x=b.top+(v.clientTop+parseFloat(w.paddingTop))*g.y;i*=g.x,c*=g.y,u*=g.x,d*=g.y,i+=y,c+=x,f=Ke(v),v=nd(f)}}return Ps({width:u,height:d,x:i,y:c})}function lm(e,t){let o=Ql(e).scrollLeft;return t?t.left+o:Ds(Xr(e)).left+o}function vx(e,t){let o=e.getBoundingClientRect(),a=o.left+t.scrollLeft-lm(e,o),r=o.top+t.scrollTop;return{x:a,y:r}}function A3(e){let{elements:t,rect:o,offsetParent:a,strategy:r}=e,n=r==="fixed",s=Xr(a),l=t?Xl(t.floating):!1;if(a===s||l&&n)return o;let i={scrollLeft:0,scrollTop:0},c=Jr(1),u=Jr(0),d=Fe(a);if((d||!n)&&((Gt(a)!=="body"||Ss(s))&&(i=Ql(a)),d)){let p=Ds(a);c=Di(a),u.x=p.x+a.clientLeft,u.y=p.y+a.clientTop}let m=s&&!d&&!n?vx(s,i):Jr(0);return{width:o.width*c.x,height:o.height*c.y,x:o.x*c.x-i.scrollLeft*c.x+u.x+m.x,y:o.y*c.y-i.scrollTop*c.y+u.y+m.y}}function z3(e){return e.getClientRects?Array.from(e.getClientRects()):[]}function L3(e){let t=Ql(e),o=e.ownerDocument.body,a=kr(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),r=kr(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight),n=-t.scrollLeft+lm(e),s=-t.scrollTop;return Go(o).direction==="rtl"&&(n+=kr(e.clientWidth,o.clientWidth)-a),{width:a,height:r,x:n,y:s}}var N3=25;function D3(e,t,o){o===void 0&&(o="viewport");let a=o==="layoutViewport",r=Ke(e),n=Xr(e),s=r.visualViewport,l=n.clientWidth,i=n.clientHeight,c=0,u=0;if(s){let m=!rd()||t==="fixed";a?m||(c=-s.offsetLeft,u=-s.offsetTop):(l=s.width,i=s.height,m&&(c=s.offsetLeft,u=s.offsetTop))}if(lm(n)<=0){let m=n.ownerDocument,p=m.body,f=getComputedStyle(p),v=m.compatMode==="CSS1Compat"&&parseFloat(f.marginLeft)+parseFloat(f.marginRight)||0,g=Math.abs(n.clientWidth-p.clientWidth-v),b=getComputedStyle(n).scrollbarGutter==="stable both-edges"?g/2:g;b<=N3&&(l-=b)}return{width:l,height:i,x:c,y:u}}function F3(e,t){let o=Ds(e,!0,t==="fixed"),a=o.top+e.clientTop,r=o.left+e.clientLeft,n=Di(e),s=e.clientWidth*n.x,l=e.clientHeight*n.y,i=r*n.x,c=a*n.y;return{width:s,height:l,x:i,y:c}}function hx(e,t,o){let a;if(t==="viewport"||t==="layoutViewport")a=D3(e,o,t);else if(t==="document")a=L3(Xr(e));else if(Ge(t))a=F3(t,o);else{let r=wx(e);a={x:t.x-r.x,y:t.y-r.y,width:t.width,height:t.height}}return Ps(a)}function O3(e,t){let o=t.get(e);if(o)return o;let a=Gn(e,[],!1).filter(l=>Ge(l)&&Gt(l)!=="body"),r=null,n=Go(e).position==="fixed",s=n?dr(e):e;for(;Ge(s)&&!mr(s);){let l=Go(s),i=ad(s),c=r?r.position:n?"fixed":"";!i&&(c==="fixed"||c==="absolute"&&l.position==="static")?a=a.filter(d=>d!==s):r=l,s=dr(s)}return t.set(e,a),a}function H3(e){let{element:t,boundary:o,rootBoundary:a,strategy:r}=e,s=[...o==="clippingAncestors"?Xl(t)?[]:O3(t,this._c):[].concat(o),a],l=hx(t,s[0],r),i=l.top,c=l.right,u=l.bottom,d=l.left;for(let m=1;m<s.length;m++){let p=hx(t,s[m],r);i=kr(p.top,i),c=qn(p.right,c),u=qn(p.bottom,u),d=kr(p.left,d)}return{width:c-d,height:u-i,x:d,y:i}}function V3(e){let{width:t,height:o}=yx(e);return{width:t,height:o}}function B3(e,t,o){let a=Fe(t),r=Xr(t),n=o==="fixed",s=Ds(e,!0,n,t),l={scrollLeft:0,scrollTop:0},i=Jr(0);if((a||!n)&&((Gt(t)!=="body"||Ss(r))&&(l=Ql(t)),a)){let m=Ds(t,!0,n,t);i.x=m.x+t.clientLeft,i.y=m.y+t.clientTop}!a&&r&&(i.x=lm(r));let c=r&&!a&&!n?vx(r,l):Jr(0),u=s.left+l.scrollLeft-i.x-c.x,d=s.top+l.scrollTop-i.y-c.y;return{x:u,y:d,width:s.width,height:s.height}}function Sh(e){return Go(e).position==="static"}function bx(e,t){if(!Fe(e)||Go(e).position==="fixed")return null;if(t)return t(e);let o=e.offsetParent;return Xr(e)===o&&(o=o.ownerDocument.body),o}function xx(e,t){let o=Ke(e);if(Xl(e))return o;if(!Fe(e)){let r=dr(e);for(;r&&!mr(r);){if(Ge(r)&&!Sh(r))return r;r=dr(r)}return o}let a=bx(e,t);for(;a&&lw(a)&&Sh(a);)a=bx(a,t);return a&&mr(a)&&Sh(a)&&!ad(a)?o:a||cw(e)||o}var _3=async function(e){let t=this.getOffsetParent||xx,o=this.getDimensions,a=await o(e.floating);return{reference:B3(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:a.width,height:a.height}}};function Z3(e){return Go(e).direction==="rtl"}var Th={convertOffsetParentRelativeRectToViewportRelativeRect:A3,getDocumentElement:Xr,getClippingRect:H3,getOffsetParent:xx,getElementRects:_3,getClientRects:z3,getDimensions:V3,getScale:Di,isElement:Ge,isRTL:Z3};function Ix(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function G3(e,t,o){let a=null,r,n=Xr(e);function s(){var u;clearTimeout(r),(u=a)==null||u.disconnect(),a=null}function l(u,d){u===void 0&&(u=!1),d===void 0&&(d=1),s();let m=e.getBoundingClientRect(),{left:p,top:f,width:v,height:g}=m;if(u||t(),!v||!g)return;let b=cc(f),w=cc(n.clientWidth-(p+v)),y=cc(n.clientHeight-(f+g)),x=cc(p),I={rootMargin:-b+"px "+-w+"px "+-y+"px "+-x+"px",threshold:kr(0,qn(1,d))||1},R=!0;function C(S){let T=S[0].intersectionRatio;if(!Ix(m,e.getBoundingClientRect()))return l();if(T!==d){if(!R)return l();T?l(!1,T):r=setTimeout(()=>{l(!1,1e-7)},1e3)}R=!1}try{a=new IntersectionObserver(C,{...I,root:n.ownerDocument})}catch{a=new IntersectionObserver(C,I)}a.observe(e)}let i=Ke(e),c=()=>l(o);return i.addEventListener("resize",c),l(!0),()=>{i.removeEventListener("resize",c),s()}}function Pc(e,t,o,a){a===void 0&&(a={});let{ancestorScroll:r=!0,ancestorResize:n=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:i=!1}=a,c=Eh(e),u=r||n?[...c?Gn(c):[],...t?Gn(t):[]]:[];u.forEach(b=>{r&&b.addEventListener("scroll",o),n&&b.addEventListener("resize",o)});let d=c&&l?G3(c,o,n):null,m=-1,p=null;s&&(p=new ResizeObserver(b=>{let[w]=b;w&&w.target===c&&p&&t&&(p.unobserve(t),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var y;(y=p)==null||y.observe(t)})),o()}),c&&!i&&p.observe(c),t&&p.observe(t));let f,v=i?Ds(e):null;i&&g();function g(){let b=Ds(e);v&&!Ix(v,b)&&o(),v=b,f=requestAnimationFrame(g)}return o(),()=>{var b;u.forEach(w=>{r&&w.removeEventListener("scroll",o),n&&w.removeEventListener("resize",o)}),d?.(),(b=p)==null||b.disconnect(),p=null,i&&cancelAnimationFrame(f)}}var Cx=mx;var Rx=px,Sx=ux,Ex=gx;var Tx=fx,cm=(e,t,o)=>{let a=new Map,r=o??{},n={...Th,...r.platform,_c:a};return cx(e,t,{...r,platform:n})};import*as Ho from"react";import{useLayoutEffect as $3}from"react";var W3=typeof document<"u",q3=function(){},um=W3?$3:q3;function dm(e,t){if(e===t)return!0;if(typeof e!=typeof t)return!1;if(typeof e=="function"&&e.toString()===t.toString())return!0;let o,a,r;if(e&&t&&typeof e=="object"){if(Array.isArray(e)){if(o=e.length,o!==t.length)return!1;for(a=o;a--!==0;)if(!dm(e[a],t[a]))return!1;return!0}if(r=Object.keys(e),o=r.length,o!==Object.keys(t).length)return!1;for(a=o;a--!==0;)if(!{}.hasOwnProperty.call(t,r[a]))return!1;for(a=o;a--!==0;){let n=r[a];if(!(n==="_owner"&&e.$$typeof)&&!dm(e[n],t[n]))return!1}return!0}return e!==e&&t!==t}function Px(e){return typeof window>"u"?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function Mx(e,t){let o=Px(e);return Math.round(t*o)/o}function Mh(e){let t=Ho.useRef(e);return um(()=>{t.current=e}),t}function kx(e){e===void 0&&(e={});let{placement:t="bottom",strategy:o="absolute",middleware:a=[],platform:r,elements:{reference:n,floating:s}={},transform:l=!0,whileElementsMounted:i,open:c}=e,[u,d]=Ho.useState({x:0,y:0,strategy:o,placement:t,middlewareData:{},isPositioned:!1}),[m,p]=Ho.useState(a);dm(m,a)||p(a);let[f,v]=Ho.useState(null),[g,b]=Ho.useState(null),w=Ho.useCallback(k=>{k!==I.current&&(I.current=k,v(k))},[]),y=Ho.useCallback(k=>{k!==R.current&&(R.current=k,b(k))},[]),x=n||f,h=s||g,I=Ho.useRef(null),R=Ho.useRef(null),C=Ho.useRef(u),S=i!=null,T=Mh(i),P=Mh(r),V=Mh(c),E=Ho.useCallback(()=>{if(!I.current||!R.current)return;let k={placement:t,strategy:o,middleware:m};P.current&&(k.platform=P.current),cm(I.current,R.current,k).then(N=>{let L={...N,isPositioned:V.current!==!1};z.current&&!dm(C.current,L)&&(C.current=L,xa(()=>{d(L)}))})},[m,t,o,P,V]);um(()=>{c===!1&&C.current.isPositioned&&(C.current.isPositioned=!1,d(k=>({...k,isPositioned:!1})))},[c]);let z=Ho.useRef(!1);um(()=>(z.current=!0,()=>{z.current=!1}),[]),um(()=>{if(x&&(I.current=x),h&&(R.current=h),x&&h){if(T.current)return T.current(x,h,E);E()}},[x,h,E,T,S]);let M=Ho.useMemo(()=>({reference:I,floating:R,setReference:w,setFloating:y}),[w,y]),O=Ho.useMemo(()=>({reference:x,floating:h}),[x,h]),H=Ho.useMemo(()=>{let k={position:o,left:0,top:0};if(!O.floating)return k;let N=Mx(O.floating,u.x),L=Mx(O.floating,u.y);return l?{...k,transform:"translate("+N+"px, "+L+"px)",...Px(O.floating)>=1.5&&{willChange:"transform"}}:{position:o,left:N,top:L}},[o,l,O.floating,u.x,u.y]);return Ho.useMemo(()=>({...u,update:E,refs:M,elements:O,floatingStyles:H}),[u,E,M,O,H])}var Ph=(e,t)=>{let o=Cx(e);return{name:o.name,fn:o.fn,options:[e,t]}},kh=(e,t)=>{let o=Rx(e);return{name:o.name,fn:o.fn,options:[e,t]}},Ah=(e,t)=>({fn:Tx(e).fn,options:[e,t]}),zh=(e,t)=>{let o=Sx(e);return{name:o.name,fn:o.fn,options:[e,t]}},Lh=(e,t)=>{let o=Ex(e);return{name:o.name,fn:o.fn,options:[e,t]}};import*as br from"react";function Ax(e){let{nodeId:t,externalTree:o,rootContext:a}=e,r=a.useState("referenceElement"),n=a.useState("floatingElement"),s=a.useState("domReferenceElement"),l=a.useState("open"),i=a.useState("floatingId"),[c,u]=br.useState(null),d=br.useRef(null),m=ca(o),p=br.useMemo(()=>({reference:r,floating:n,domReference:s}),[r,n,s]),f=kx({...e,elements:{...p,...c&&{reference:c}}}),v=br.useCallback(y=>{let x=Ge(y)?{getBoundingClientRect:()=>y.getBoundingClientRect(),getClientRects:()=>y.getClientRects(),contextElement:y}:y;u(x),f.refs.setReference(x)},[f.refs]),g=br.useMemo(()=>({...f.refs,setPositionReference:v,domReference:d}),[f.refs,v]),b=br.useMemo(()=>({...f.elements,domReference:s}),[f.elements,s]),w=br.useMemo(()=>({...f,dataRef:a.context.dataRef,open:l,onOpenChange:a.setOpen,events:a.context.events,floatingId:i,refs:g,elements:b,nodeId:t,rootStore:a}),[f,g,b,t,a,l,i]);return _(()=>{s&&(d.current=s)},[s]),_(()=>{a.context.dataRef.current.floatingContext=w;let y=m?.nodesRef.current.find(x=>x.id===t);y&&(y.context=w)}),br.useMemo(()=>({...f,context:w,refs:g,elements:b,rootStore:a}),[f,g,b,w,a])}import*as mm from"react";var j3=mm.createContext(void 0);function Ko(){return mm.useContext(j3)?.direction??"ltr"}var K3=e=>({name:"arrow",options:e,async fn(t){let{x:o,y:a,placement:r,rects:n,platform:s,elements:l,middlewareData:i}=t,{element:c,padding:u=0}=en(e,t)||{};if(c==null)return{};let d=vd(u),m={x:o,y:a},p=dc(r),f=uc(p),v=await s.getDimensions(c),g=p==="y",b=g?"top":"left",w=g?"bottom":"right",y=g?"clientHeight":"clientWidth",x=n.reference[f]+n.reference[p]-m[p]-n.floating[f],h=m[p]-n.reference[p],I=l.floating[y]||n.floating[f],R=x/2-h/2,C=I/2-v[f]/2-1,S=Math.min(d[b],C),T=Math.min(d[w],C),P=S,V=I-v[f]-T,E=I/2-v[f]/2+R,z=yd(P,E,V),M=!i.arrow&&Qa(r)!=null&&E!==z&&n.reference[f]/2-(E<P?S:T)-v[f]/2<0,O=M?E<P?E-P:E-V:0;return{[p]:m[p]+O,data:{[p]:z,centerOffset:E-z-O,...M&&{alignmentOffset:O}},reset:M}}}),zx=(e,t)=>{let{name:o,fn:a}=K3(e);return{name:o,fn:a,options:[e,t]}};var Lx={name:"hide",async fn(e){let{width:t,height:o,x:a,y:r}=e.rects.reference,n=t===0&&o===0&&a===0&&r===0,s=await e.platform.detectOverflow(e,{elementContext:"reference"});return{data:{referenceHidden:s.top-o>=0||s.right-t>=0||s.bottom-o>=0||s.left-t>=0||n}}}};var Fi={sideX:"left",sideY:"top"};var pm="--available-width",fm="--available-height",Nx="--anchor-width",Dx="--anchor-height",Fx="--transform-origin",Ox="--positioner-width",Hx="--positioner-height";var Bx=pm,_x=fm;function Ux(e,t,o){let a=e==="inline-start"||e==="inline-end";return{top:"top",right:a?o?"inline-start":"inline-end":"right",bottom:"bottom",left:a?o?"inline-end":"inline-start":"left"}[t]}function Zx(e,t,o){let{rects:a,placement:r}=e;return{side:Ux(t,ea(r),o),align:Qa(r)||"center",anchor:{width:a.reference.width,height:a.reference.height},positioner:{width:a.floating.width,height:a.floating.height}}}function Oi(e){return Y3(e,Ax)}function Y3(e,t){let{anchor:o,positionMethod:a="absolute",side:r="bottom",sideOffset:n=0,align:s="center",alignOffset:l=0,collisionBoundary:i,collisionPadding:c=5,sticky:u=!1,arrowPadding:d=5,disableAnchorTracking:m=!1,inline:p,keepMounted:f=!1,floatingRootContext:v,mounted:g,collisionAvoidance:b,shift:w,nodeId:y,adaptiveOrigin:x,lazyFlip:h=!1,externalTree:I}=e,R=b.side||"flip",C=b.align||"flip",S=b.fallbackAxisSide||"end",T=w?.crossAxis??!1,P=w?.rootBoundary,V=typeof o=="function"?o:void 0,E=$(V),z=V?E:o,M=ft(o),O=ft(g),k=Ko()==="rtl",[N,L]=Ja.useState(null);!g&&N!==null&&L(null);let U=h==="placement",A=N?ea(N):null,ee=N&&U?Qa(N)||"center":null,B=A||{top:"top",right:"right",bottom:"bottom",left:"left","inline-end":k?"left":"right","inline-start":k?"right":"left"}[r],Z=ee||s,G=Z==="center"?B:`${B}-${Z}`,X=c;typeof X=="number"?X={top:X,right:X,bottom:X,left:X}:X&&(X={top:X.top||0,right:X.right||0,bottom:X.bottom||0,left:X.left||0});let be=1,K=r==="bottom"?be:0,Y=r==="top"?be:0,j=r==="right"?be:0,se=r==="left"?be:0,pe={boundary:i==="clipping-ancestors"?"clippingAncestors":i,padding:X},oe=Ja.useRef(null),Se=ft(n),ie=ft(l),te=typeof n!="function"?n:0,fe=typeof l!="function"?l:0,de=[];p&&de.push(p),de.push(Ph(We=>{let Mt=Zx(We,r,k),Ee=typeof Se.current=="function"?Se.current(Mt):Se.current,Me=typeof ie.current=="function"?ie.current(Mt):ie.current;return{mainAxis:Ee,crossAxis:Me,alignmentAxis:Me}},[te,fe,k,r]));let ve=C==="none"&&R!=="shift",ge=!ve&&(u||T||R==="shift"),je=R==="none"?null:zh({...pe,padding:{top:X.top+be+K,right:X.right+be+se,bottom:X.bottom+be+Y,left:X.left+be+j},mainAxis:!T&&R==="flip",crossAxis:C==="flip"?"alignment":!1,fallbackAxisSideDirection:S}),he=ve?null:kh({...pe,rootBoundary:P,mainAxis:C!=="none",crossAxis:ge,limiter:u||T?void 0:Ah(We=>{if(!oe.current)return{};let{width:Mt,height:Ee}=oe.current.getBoundingClientRect(),Me=Na(ea(We.placement)),ot=Me==="y"?Mt:Ee,Lt=Me==="y"?X.left+X.right:X.top+X.bottom;return{offset:ot/2+Lt/2}})},[pe,u,T,P,X,C]);R==="shift"||C==="shift"||Z==="center"?de.push(he,je):de.push(je,he),de.push(Lh({...pe,apply({elements:{floating:We},availableWidth:Mt,availableHeight:Ee,rects:Me}){if(!O.current)return;let ot=We.style;ot.setProperty(Bx,`${Mt}px`),ot.setProperty(_x,`${Ee}px`);let Lt=Ke(We).devicePixelRatio||1,{x:wa,y:za,width:yt,height:Qo}=Me.reference,$r=(Math.round((wa+yt)*Lt)-Math.round(wa*Lt))/Lt,Er=(Math.round((za+Qo)*Lt)-Math.round(za*Lt))/Lt;ot.setProperty(Nx,`${$r}px`),ot.setProperty(Dx,`${Er}px`)}}),zx(We=>({element:oe.current||Ie(We.elements.floating).createElement("div"),padding:oe.current?d:0}),[d]),{name:"transformOrigin",fn(We){let{elements:{floating:Mt},middlewareData:Ee,placement:Me,platform:ot,rects:Lt,y:wa}=We,za=ea(Me),yt=Qa(Me),Qo=Na(za)==="y",$r=oe.current,Er=typeof n=="function"?n(Zx(We,r,k)):n,cr;if(!$r&&yt&&Math.abs(Qo?Ee.shift?.x||0:Ee.shift?.y||0)<=1)cr=yt==="start"===(Qo&&ot.isRTL?.(Mt)===!0)?"100%":"0%";else{let xs=Qo?Ee.arrow?.x||0:Ee.arrow?.y||0,Vn=Qo?$r?.clientWidth||0:$r?.clientHeight||0;cr=`${xs+Vn/2}px`}let Tr=za==="top"||za==="left"?`calc(100% + ${Er}px)`:`${-Er}px`;return ge&&Qo&&Math.abs(Ee.shift?.y||0)>Er&&(Tr=`${Lt.reference.y+Lt.reference.height/2-wa}px`),Mt.style.setProperty(Fx,Qo?`${cr} ${Tr}`:`${Tr} ${cr}`),{}}},Lx,x),_(()=>{!g&&v&&v.update({referenceElement:null,floatingElement:null,domReferenceElement:null,positionReference:null})},[g,v]);let le=Ja.useMemo(()=>({ancestorScroll:!m,elementResize:!m&&typeof ResizeObserver<"u",layoutShift:!m&&typeof IntersectionObserver<"u"}),[m]),{refs:W,elements:Q,x:xe,y:re,middlewareData:ce,update:mt,placement:st,context:Xe,isPositioned:Ue,floatingStyles:pt}=t({rootContext:v,open:f?g:void 0,placement:G,middleware:de,strategy:a,whileElementsMounted:f?void 0:(...We)=>Pc(...We,le),nodeId:y,externalTree:I}),{sideX:Zo,sideY:bt}=ce.adaptiveOrigin||Fi,Rt=Ue?a:"fixed",ba=Ja.useMemo(()=>{let We;return Ue?x?We={position:Rt,[Zo]:xe,[bt]:re}:We={...pt,position:Rt}:We={position:Rt,top:0,left:0},We[Bx]="100vw",We[_x]="100vh",Ue||(We.opacity=0),We},[x,Rt,Zo,xe,bt,re,pt,Ue]),Tt=Ja.useRef(null);_(()=>{if(!g)return;let We=M.current,Mt=typeof We=="function"?We():We,Me=(Gx(Mt)?Mt.current:Mt)||null||null;Me!==Tt.current&&(W.setPositionReference(Me),Tt.current=Me)},[g,W,z,M]),Ja.useEffect(()=>{if(!g)return;let We=M.current;typeof We!="function"&&Gx(We)&&We.current!==Tt.current&&(W.setPositionReference(We.current),Tt.current=We.current)},[g,W,z,M]),Ja.useEffect(()=>{if(f&&g&&Q.reference&&Q.floating)return Pc(Q.reference,Q.floating,mt,le)},[f,g,Q,mt,le]);let Dt=ea(st),Aa=Ux(r,Dt,k),ya=Qa(st)||"center",Vt=!!ce.hide?.referenceHidden;_(()=>{h&&g&&Ue&&(Dt!==B||U&&ya!==Z)&&L(st)},[h,U,g,Ue,st,Dt,ya,B,Z]);let Xo=Ja.useMemo(()=>({position:"absolute",top:ce.arrow?.y,left:ce.arrow?.x}),[ce.arrow]),Sr=ce.arrow?.centerOffset!==0;return Ja.useMemo(()=>({positionerStyles:ba,arrowStyles:Xo,arrowRef:oe,arrowUncentered:Sr,side:Aa,align:ya,physicalSide:Dt,anchorHidden:Vt,refs:W,context:Xe,isPositioned:Ue,update:mt}),[ba,Xo,oe,Sr,Aa,ya,Dt,Vt,W,Xe,Ue,mt])}function Gx(e){return e!=null&&"current"in e}import*as gm from"react";var Nh=gm.createContext(void 0);function $x(){let e=gm.useContext(Nh);if(e===void 0)throw new Error(De(84));return e}function Hi(e){return e==="starting"?ov:ze}function Vi(e,t,{styles:o,transitionStatus:a,props:r,refs:n,hidden:s,inert:l=!1}){let i={...o};return l&&(i.pointerEvents="none"),ae("div",e,{state:t,ref:n,props:[{role:"presentation",hidden:s,style:i},Hi(a),r],stateAttributesMapping:Ms})}import{jsx as X3}from"react/jsx-runtime";var Wx=hm.forwardRef(function(t,o){let{toast:a,...r}=t,n=Kr(),s=a.positionerProps??ze,{render:l,className:i,anchor:c=s.anchor,positionMethod:u=s.positionMethod??"absolute",side:d=s.side??"top",align:m=s.align??"center",sideOffset:p=s.sideOffset??0,alignOffset:f=s.alignOffset??0,collisionBoundary:v=s.collisionBoundary??"clipping-ancestors",collisionPadding:g=s.collisionPadding??5,arrowPadding:b=s.arrowPadding??5,sticky:w=s.sticky??!1,disableAnchorTracking:y=s.disableAnchorTracking??!1,collisionAvoidance:x=s.collisionAvoidance??Ei,style:h,...I}=r,[R,C]=hm.useState(null),S=n.useState("toastIndex",a.id),T=n.useState("toastVisibleIndex",a.id),P=Ge(c)?c:null,V=wh({open:!0,onOpenChange:Be,elements:{floating:R,reference:P}}),E=Oi({anchor:P,positionMethod:u,floatingRootContext:V,mounted:!0,side:d,sideOffset:p,align:m,alignOffset:f,collisionBoundary:v,collisionPadding:g,sticky:w,arrowPadding:b,disableAnchorTracking:y,keepMounted:!0,collisionAvoidance:x}),z={side:E.side,align:E.align,anchorHidden:E.anchorHidden},M=Vi(t,z,{styles:{...E.positionerStyles,[zd]:a.transitionStatus==="ending"?S:T},transitionStatus:a.transitionStatus,props:I,refs:[o,C]});return X3(Nh.Provider,{value:E,children:M})});import*as qx from"react";var jx=qx.forwardRef(function(t,o){let{className:a,render:r,style:n,...s}=t,{arrowRef:l,side:i,align:c,arrowUncentered:u,arrowStyles:d}=$x();return ae("div",t,{state:{side:i,align:c,uncentered:u},ref:[o,l],props:[{style:d,"aria-hidden":!0},s]})});import*as Kx from"react";function Yx(){let e=Kr(),t=e.useState("toasts");return Kx.useMemo(()=>({toasts:t,add:e.addToast,close:e.closeToast,update:e.updateToast,promise:e.promiseToast}),[t,e])}function Xx(){let e=new Set;function t(o){e.forEach(a=>a(o))}return{" subscribe":function(a){return e.add(a),()=>{e.delete(a)}},add(o){let a=o.id||ud("toast"),r={...o,id:a,transitionStatus:"starting"};return t({action:"add",options:r}),a},close(o){t({action:"close",options:{id:o}})},update(o,a){t({action:"update",options:{id:o,updates:a}})},promise(o,a){let r=o;return t({action:"promise",options:{...a,promise:o,setPromise(n){r=n}}}),r}}}import{createElement as CW,useLayoutEffect as r5,useState as n5}from"react";import{createContext as Q3,createElement as Dh,Fragment as J3,useContext as Jx,useLayoutEffect as wW,useMemo as e5,useRef as Qx,useState as t5}from"react";var Fh=Q3(void 0),o5=()=>()=>{};function a5(e){let t=[],o=e;for(;o&&o!==o.ownerDocument.body;){let a=o.parentElement;if(!a)break;for(let r of Array.from(a.children))r===o||!(r instanceof HTMLElement)||r.inert||r.tagName==="SCRIPT"||(r.inert=!0,t.push(r));o=a}return()=>{for(let a of t)a.inert=!1}}function kc({children:e,dir:t}){let o=Jx(Fh),[a,r]=t5(null),n=Qx(0),s=Qx(null),l=o?t?"dir":"stage":"root",i=e5(()=>l==="dir"?{container:a,lock:o.lock}:l==="stage"?{container:a,lock:o5}:{container:a,lock:()=>{n.current+=1,n.current===1&&a&&(s.current=a5(a));let u=!1;return()=>{u||(u=!0,n.current-=1,n.current===0&&(s.current?.(),s.current=null))}}},[l,a,o]);if(!o&&t)return Dh(J3,null,e);let c=Dh("div",{ref:r,"data-glaze-portal":l,dir:l==="dir"?t:void 0});return Dh(Fh.Provider,{value:i},e,l==="dir"?o.container?Mr(c,o.container):null:c)}function er(){return Jx(Fh)?.container}var e8=e=>(e&&"current"in e?e.current:e)??null;function bm(e){let[t,o]=n5("ltr");return r5(()=>{let a=e8(e)?.ownerDocument??(typeof document>"u"?null:document);if(!a)return;let r=()=>{let s=e8(e)??a.documentElement;o(getComputedStyle(s).direction==="rtl"?"rtl":"ltr")};r();let n=new MutationObserver(r);return n.observe(a.documentElement,{attributes:!0,attributeFilter:["dir"],subtree:!0}),()=>n.disconnect()},[e]),t}function t8(e){var t,o,a="";if(typeof e=="string"||typeof e=="number")a+=e;else if(typeof e=="object")if(Array.isArray(e)){var r=e.length;for(t=0;t<r;t++)e[t]&&(o=t8(e[t]))&&(a&&(a+=" "),a+=o)}else for(o in e)e[o]&&(a&&(a+=" "),a+=o);return a}function ym(){for(var e,t,o=0,a="",r=arguments.length;o<r;o++)(e=arguments[o])&&(t=t8(e))&&(a&&(a+=" "),a+=t);return a}var s5=(e,t)=>{let o=new Array(e.length+t.length);for(let a=0;a<e.length;a++)o[a]=e[a];for(let a=0;a<t.length;a++)o[e.length+a]=t[a];return o},i5=(e,t)=>({classGroupId:e,validator:t}),c8=(e=new Map,t=null,o)=>({nextPart:e,validators:t,classGroupId:o});var o8=[],l5="arbitrary..",c5=e=>{let t=d5(e),{conflictingClassGroups:o,conflictingClassGroupModifiers:a}=e;return{getClassGroupId:s=>{if(s.startsWith("[")&&s.endsWith("]"))return u5(s);let l=s.split("-"),i=l[0]===""&&l.length>1?1:0;return u8(l,i,t)},getConflictingClassGroupIds:(s,l)=>{if(l){let i=a[s],c=o[s];return i?c?s5(c,i):i:c||o8}return o[s]||o8}}},u8=(e,t,o)=>{if(e.length-t===0)return o.classGroupId;let r=e[t],n=o.nextPart.get(r);if(n){let c=u8(e,t+1,n);if(c)return c}let s=o.validators;if(s===null)return;let l=t===0?e.join("-"):e.slice(t).join("-"),i=s.length;for(let c=0;c<i;c++){let u=s[c];if(u.validator(l))return u.classGroupId}},u5=e=>e.slice(1,-1).indexOf(":")===-1?void 0:(()=>{let t=e.slice(1,-1),o=t.indexOf(":"),a=t.slice(0,o);return a?l5+a:void 0})(),d5=e=>{let{theme:t,classGroups:o}=e;return m5(o,t)},m5=(e,t)=>{let o=c8();for(let a in e){let r=e[a];Vh(r,o,a,t)}return o},Vh=(e,t,o,a)=>{let r=e.length;for(let n=0;n<r;n++){let s=e[n];p5(s,t,o,a)}},p5=(e,t,o,a)=>{if(typeof e=="string"){f5(e,t,o);return}if(typeof e=="function"){g5(e,t,o,a);return}h5(e,t,o,a)},f5=(e,t,o)=>{let a=e===""?t:d8(t,e);a.classGroupId=o},g5=(e,t,o,a)=>{if(b5(e)){Vh(e(a),t,o,a);return}t.validators===null&&(t.validators=[]),t.validators.push(i5(o,e))},h5=(e,t,o,a)=>{let r=Object.entries(e),n=r.length;for(let s=0;s<n;s++){let[l,i]=r[s];Vh(i,d8(t,l),o,a)}},d8=(e,t)=>{let o=e,a=t.split("-"),r=a.length;for(let n=0;n<r;n++){let s=a[n],l=o.nextPart.get(s);l||(l=c8(),o.nextPart.set(s,l)),o=l}return o},b5=e=>"isThemeGetter"in e&&e.isThemeGetter===!0,y5=e=>{if(e<1)return{get:()=>{},set:()=>{}};let t=0,o=Object.create(null),a=Object.create(null),r=(n,s)=>{o[n]=s,t++,t>e&&(t=0,a=o,o=Object.create(null))};return{get(n){let s=o[n];if(s!==void 0)return s;if((s=a[n])!==void 0)return r(n,s),s},set(n,s){n in o?o[n]=s:r(n,s)}}};var w5=[],a8=(e,t,o,a,r)=>({modifiers:e,hasImportantModifier:t,baseClassName:o,maybePostfixModifierPosition:a,isExternal:r}),v5=e=>{let{prefix:t,experimentalParseClassName:o}=e,a=r=>{let n=[],s=0,l=0,i=0,c,u=r.length;for(let v=0;v<u;v++){let g=r[v];if(s===0&&l===0){if(g===":"){n.push(r.slice(i,v)),i=v+1;continue}if(g==="/"){c=v;continue}}g==="["?s++:g==="]"?s--:g==="("?l++:g===")"&&l--}let d=n.length===0?r:r.slice(i),m=d,p=!1;d.endsWith("!")?(m=d.slice(0,-1),p=!0):d.startsWith("!")&&(m=d.slice(1),p=!0);let f=c&&c>i?c-i:void 0;return a8(n,p,m,f)};if(t){let r=t+":",n=a;a=s=>s.startsWith(r)?n(s.slice(r.length)):a8(w5,!1,s,void 0,!0)}if(o){let r=a;a=n=>o({className:n,parseClassName:r})}return a},x5=e=>{let t=new Map;return e.orderSensitiveModifiers.forEach((o,a)=>{t.set(o,1e6+a)}),o=>{let a=[],r=[];for(let n=0;n<o.length;n++){let s=o[n],l=s[0]==="[",i=t.has(s);l||i?(r.length>0&&(r.sort(),a.push(...r),r=[]),a.push(s)):r.push(s)}return r.length>0&&(r.sort(),a.push(...r)),a}},I5=e=>({cache:y5(e.cacheSize),parseClassName:v5(e),sortModifiers:x5(e),postfixLookupClassGroupIds:C5(e),...c5(e)}),C5=e=>{let t=Object.create(null),o=e.postfixLookupClassGroups;if(o)for(let a=0;a<o.length;a++)t[o[a]]=!0;return t},R5=/\s+/,S5=(e,t)=>{let{parseClassName:o,getClassGroupId:a,getConflictingClassGroupIds:r,sortModifiers:n,postfixLookupClassGroupIds:s}=t,l=[],i=e.trim().split(R5),c="";for(let u=i.length-1;u>=0;u-=1){let d=i[u],{isExternal:m,modifiers:p,hasImportantModifier:f,baseClassName:v,maybePostfixModifierPosition:g}=o(d);if(m){c=d+(c.length>0?" "+c:c);continue}let b=!!g,w;if(b){let R=v.substring(0,g);w=a(R);let C=w&&s[w]?a(v):void 0;C&&C!==w&&(w=C,b=!1)}else w=a(v);if(!w){if(!b){c=d+(c.length>0?" "+c:c);continue}if(w=a(v),!w){c=d+(c.length>0?" "+c:c);continue}b=!1}let y=p.length===0?"":p.length===1?p[0]:n(p).join(":"),x=f?y+"!":y,h=x+w;if(l.indexOf(h)>-1)continue;l.push(h);let I=r(w,b);for(let R=0;R<I.length;++R){let C=I[R];l.push(x+C)}c=d+(c.length>0?" "+c:c)}return c},E5=(...e)=>{let t=0,o,a,r="";for(;t<e.length;)(o=e[t++])&&(a=m8(o))&&(r&&(r+=" "),r+=a);return r},m8=e=>{if(typeof e=="string")return e;let t,o="";for(let a=0;a<e.length;a++)e[a]&&(t=m8(e[a]))&&(o&&(o+=" "),o+=t);return o},r8=(e,...t)=>{let o,a,r,n,s=i=>{let c=t.reduce((u,d)=>d(u),e());return o=I5(c),a=o.cache.get,r=o.cache.set,n=l,l(i)},l=i=>{let c=a(i);if(c)return c;let u=S5(i,o);return r(i,u),u};return n=s,(...i)=>n(E5(...i))},T5=[],$o=e=>{let t=o=>o[e]||T5;return t.isThemeGetter=!0,t.themeKey=e,t},p8=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,f8=/^\((?:(\w[\w-]*):)?(.+)\)$/i,M5=/^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,P5=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,k5=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,A5=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/,z5=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,L5=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,as=e=>M5.test(e),et=e=>!!e&&!Number.isNaN(Number(e)),sn=e=>!!e&&Number.isInteger(Number(e)),Oh=e=>e.endsWith("%")&&et(e.slice(0,-1)),Pn=e=>P5.test(e),g8=()=>!0,N5=e=>k5.test(e)&&!A5.test(e),Bh=()=>!1,D5=e=>z5.test(e),F5=e=>L5.test(e),O5=e=>!Re(e)&&!Te(e),H5=e=>e.startsWith("@container")&&(e[10]==="/"&&e[11]!==void 0||e[11]==="s"&&e[16]!==void 0&&e.startsWith("-size/",10)||e[11]==="n"&&e[18]!==void 0&&e.startsWith("-normal/",10)),V5=e=>rs(e,y8,Bh),Re=e=>p8.test(e),Fs=e=>rs(e,w8,N5),n8=e=>rs(e,q5,et),B5=e=>rs(e,x8,g8),_5=e=>rs(e,v8,Bh),s8=e=>rs(e,h8,Bh),Z5=e=>rs(e,b8,F5),wm=e=>rs(e,I8,D5),Te=e=>f8.test(e),Ac=e=>Os(e,w8),G5=e=>Os(e,v8),i8=e=>Os(e,h8),U5=e=>Os(e,y8),$5=e=>Os(e,b8),vm=e=>Os(e,I8,!0),W5=e=>Os(e,x8,!0),rs=(e,t,o)=>{let a=p8.exec(e);return a?a[1]?t(a[1]):o(a[2]):!1},Os=(e,t,o=!1)=>{let a=f8.exec(e);return a?a[1]?t(a[1]):o:!1},h8=e=>e==="position"||e==="percentage",b8=e=>e==="image"||e==="url",y8=e=>e==="length"||e==="size"||e==="bg-size",w8=e=>e==="length",q5=e=>e==="number",v8=e=>e==="family-name",x8=e=>e==="number"||e==="weight",I8=e=>e==="shadow";var l8=()=>{let e=$o("color"),t=$o("font"),o=$o("text"),a=$o("font-weight"),r=$o("tracking"),n=$o("leading"),s=$o("breakpoint"),l=$o("container"),i=$o("spacing"),c=$o("radius"),u=$o("shadow"),d=$o("inset-shadow"),m=$o("text-shadow"),p=$o("drop-shadow"),f=$o("blur"),v=$o("perspective"),g=$o("aspect"),b=$o("ease"),w=$o("animate"),y=()=>["auto","avoid","all","avoid-page","page","left","right","column"],x=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],h=()=>[...x(),Te,Re],I=()=>["auto","hidden","clip","visible","scroll"],R=()=>["auto","contain","none"],C=()=>[Te,Re,i],S=()=>[as,"full","auto",...C()],T=()=>[sn,"none","subgrid",Te,Re],P=()=>["auto",{span:["full",sn,Te,Re]},sn,Te,Re],V=()=>[sn,"auto",Te,Re],E=()=>["auto","min","max","fr",Te,Re],z=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],M=()=>["start","end","center","stretch","center-safe","end-safe"],O=()=>["auto",...C()],H=()=>[as,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...C()],k=()=>[l,as,"screen","full","dvw","lvw","svw","min","max","fit",...C()],N=()=>[as,"screen","full","lh","dvh","lvh","svh","min","max","fit",...C()],L=()=>[e,Te,Re],U=()=>[...x(),i8,s8,{position:[Te,Re]}],A=()=>["no-repeat",{repeat:["","x","y","space","round"]}],ee=()=>["auto","cover","contain",U5,V5,{size:[Te,Re]}],B=()=>[Oh,Ac,Fs],Z=()=>["","none","full",c,Te,Re],G=()=>["",et,Ac,Fs],X=()=>["solid","dashed","dotted","double"],be=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],K=()=>[et,Oh,i8,s8],Y=()=>["","none",f,Te,Re],j=()=>["none",et,Te,Re],se=()=>["none",et,Te,Re],pe=()=>[et,Te,Re],oe=()=>[as,"full",...C()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[Pn],breakpoint:[Pn],color:[g8],container:[Pn],"drop-shadow":[Pn],ease:["in","out","in-out"],font:[O5],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[Pn],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[Pn],shadow:[Pn],spacing:["px",et],text:[Pn],"text-shadow":[Pn],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",as,Re,Te,g]}],container:["container"],"container-type":[{"@container":["","normal","size",Te,Re]}],"container-named":[H5],columns:[{columns:[et,"auto",Re,Te,l]}],"break-after":[{"break-after":y()}],"break-before":[{"break-before":y()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:h()}],overflow:[{overflow:I()}],"overflow-x":[{"overflow-x":I()}],"overflow-y":[{"overflow-y":I()}],overscroll:[{overscroll:R()}],"overscroll-x":[{"overscroll-x":R()}],"overscroll-y":[{"overscroll-y":R()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:S()}],"inset-x":[{"inset-x":S()}],"inset-y":[{"inset-y":S()}],start:[{"inset-s":S(),start:S()}],end:[{"inset-e":S(),end:S()}],"inset-bs":[{"inset-bs":S()}],"inset-be":[{"inset-be":S()}],top:[{top:S()}],right:[{right:S()}],bottom:[{bottom:S()}],left:[{left:S()}],visibility:["visible","invisible","collapse"],z:[{z:[sn,"auto",Te,Re]}],basis:[{basis:[as,"full","auto",l,...C()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[et,as,"auto","initial","none",Re]}],grow:[{grow:["",et,Te,Re]}],shrink:[{shrink:["",et,Te,Re]}],order:[{order:[sn,"first","last","none",Te,Re]}],"grid-cols":[{"grid-cols":T()}],"col-start-end":[{col:P()}],"col-start":[{"col-start":V()}],"col-end":[{"col-end":V()}],"grid-rows":[{"grid-rows":T()}],"row-start-end":[{row:P()}],"row-start":[{"row-start":V()}],"row-end":[{"row-end":V()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":E()}],"auto-rows":[{"auto-rows":E()}],gap:[{gap:C()}],"gap-x":[{"gap-x":C()}],"gap-y":[{"gap-y":C()}],"justify-content":[{justify:[...z(),"normal"]}],"justify-items":[{"justify-items":[...M(),"normal"]}],"justify-self":[{"justify-self":["auto",...M()]}],"align-content":[{content:["normal",...z()]}],"align-items":[{items:[...M(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...M(),{baseline:["","last"]}]}],"place-content":[{"place-content":z()}],"place-items":[{"place-items":[...M(),"baseline"]}],"place-self":[{"place-self":["auto",...M()]}],p:[{p:C()}],px:[{px:C()}],py:[{py:C()}],ps:[{ps:C()}],pe:[{pe:C()}],pbs:[{pbs:C()}],pbe:[{pbe:C()}],pt:[{pt:C()}],pr:[{pr:C()}],pb:[{pb:C()}],pl:[{pl:C()}],m:[{m:O()}],mx:[{mx:O()}],my:[{my:O()}],ms:[{ms:O()}],me:[{me:O()}],mbs:[{mbs:O()}],mbe:[{mbe:O()}],mt:[{mt:O()}],mr:[{mr:O()}],mb:[{mb:O()}],ml:[{ml:O()}],"space-x":[{"space-x":C()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":C()}],"space-y-reverse":["space-y-reverse"],size:[{size:H()}],"inline-size":[{inline:["auto",...k()]}],"min-inline-size":[{"min-inline":["auto",...k()]}],"max-inline-size":[{"max-inline":["none",...k()]}],"block-size":[{block:["auto",...N()]}],"min-block-size":[{"min-block":["auto",...N()]}],"max-block-size":[{"max-block":["none",...N()]}],w:[{w:[l,"screen",...H()]}],"min-w":[{"min-w":[l,"screen","none",...H()]}],"max-w":[{"max-w":[l,"screen","none","prose",{screen:[s]},...H()]}],h:[{h:["screen","lh",...H()]}],"min-h":[{"min-h":["screen","lh","none",...H()]}],"max-h":[{"max-h":["screen","lh","none",...H()]}],"font-size":[{text:["base",o,Ac,Fs]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[a,W5,B5]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",Oh,Re]}],"font-family":[{font:[G5,_5,t]}],"font-features":[{"font-features":[Re]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[r,Te,Re]}],"line-clamp":[{"line-clamp":[et,"none",Te,n8]}],leading:[{leading:["none",n,...C()]}],"list-image":[{"list-image":["none",Te,Re]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",Te,Re]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:L()}],"text-color":[{text:L()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...X(),"wavy"]}],"text-decoration-thickness":[{decoration:[et,"from-font","auto",Te,Fs]}],"text-decoration-color":[{decoration:L()}],"underline-offset":[{"underline-offset":[et,"auto",Te,Re]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:C()}],"tab-size":[{tab:[sn,Te,Re]}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",Te,Re]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",Te,Re]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:U()}],"bg-repeat":[{bg:A()}],"bg-size":[{bg:ee()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},sn,Te,Re],radial:["",Te,Re],conic:["",sn,Te,Re]},$5,Z5]}],"bg-color":[{bg:L()}],"gradient-from-pos":[{from:B()}],"gradient-via-pos":[{via:B()}],"gradient-to-pos":[{to:B()}],"gradient-from":[{from:L()}],"gradient-via":[{via:L()}],"gradient-to":[{to:L()}],rounded:[{rounded:Z()}],"rounded-s":[{"rounded-s":Z()}],"rounded-e":[{"rounded-e":Z()}],"rounded-t":[{"rounded-t":Z()}],"rounded-r":[{"rounded-r":Z()}],"rounded-b":[{"rounded-b":Z()}],"rounded-l":[{"rounded-l":Z()}],"rounded-ss":[{"rounded-ss":Z()}],"rounded-se":[{"rounded-se":Z()}],"rounded-ee":[{"rounded-ee":Z()}],"rounded-es":[{"rounded-es":Z()}],"rounded-tl":[{"rounded-tl":Z()}],"rounded-tr":[{"rounded-tr":Z()}],"rounded-br":[{"rounded-br":Z()}],"rounded-bl":[{"rounded-bl":Z()}],"border-w":[{border:G()}],"border-w-x":[{"border-x":G()}],"border-w-y":[{"border-y":G()}],"border-w-s":[{"border-s":G()}],"border-w-e":[{"border-e":G()}],"border-w-bs":[{"border-bs":G()}],"border-w-be":[{"border-be":G()}],"border-w-t":[{"border-t":G()}],"border-w-r":[{"border-r":G()}],"border-w-b":[{"border-b":G()}],"border-w-l":[{"border-l":G()}],"divide-x":[{"divide-x":G()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":G()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...X(),"hidden","none"]}],"divide-style":[{divide:[...X(),"hidden","none"]}],"border-color":[{border:L()}],"border-color-x":[{"border-x":L()}],"border-color-y":[{"border-y":L()}],"border-color-s":[{"border-s":L()}],"border-color-e":[{"border-e":L()}],"border-color-bs":[{"border-bs":L()}],"border-color-be":[{"border-be":L()}],"border-color-t":[{"border-t":L()}],"border-color-r":[{"border-r":L()}],"border-color-b":[{"border-b":L()}],"border-color-l":[{"border-l":L()}],"divide-color":[{divide:L()}],"outline-style":[{outline:[...X(),"none","hidden"]}],"outline-offset":[{"outline-offset":[et,Te,Re]}],"outline-w":[{outline:["",et,Ac,Fs]}],"outline-color":[{outline:L()}],shadow:[{shadow:["","inner","none",u,vm,wm]}],"shadow-color":[{shadow:L()}],"inset-shadow":[{"inset-shadow":["none",d,vm,wm]}],"inset-shadow-color":[{"inset-shadow":L()}],"ring-w":[{ring:G()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:L()}],"ring-offset-w":[{"ring-offset":[et,Fs]}],"ring-offset-color":[{"ring-offset":L()}],"inset-ring-w":[{"inset-ring":G()}],"inset-ring-color":[{"inset-ring":L()}],"text-shadow":[{"text-shadow":["none",m,vm,wm]}],"text-shadow-color":[{"text-shadow":L()}],opacity:[{opacity:[et,Te,Re]}],"mix-blend":[{"mix-blend":[...be(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":be()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[et]}],"mask-image-linear-from-pos":[{"mask-linear-from":K()}],"mask-image-linear-to-pos":[{"mask-linear-to":K()}],"mask-image-linear-from-color":[{"mask-linear-from":L()}],"mask-image-linear-to-color":[{"mask-linear-to":L()}],"mask-image-t-from-pos":[{"mask-t-from":K()}],"mask-image-t-to-pos":[{"mask-t-to":K()}],"mask-image-t-from-color":[{"mask-t-from":L()}],"mask-image-t-to-color":[{"mask-t-to":L()}],"mask-image-r-from-pos":[{"mask-r-from":K()}],"mask-image-r-to-pos":[{"mask-r-to":K()}],"mask-image-r-from-color":[{"mask-r-from":L()}],"mask-image-r-to-color":[{"mask-r-to":L()}],"mask-image-b-from-pos":[{"mask-b-from":K()}],"mask-image-b-to-pos":[{"mask-b-to":K()}],"mask-image-b-from-color":[{"mask-b-from":L()}],"mask-image-b-to-color":[{"mask-b-to":L()}],"mask-image-l-from-pos":[{"mask-l-from":K()}],"mask-image-l-to-pos":[{"mask-l-to":K()}],"mask-image-l-from-color":[{"mask-l-from":L()}],"mask-image-l-to-color":[{"mask-l-to":L()}],"mask-image-x-from-pos":[{"mask-x-from":K()}],"mask-image-x-to-pos":[{"mask-x-to":K()}],"mask-image-x-from-color":[{"mask-x-from":L()}],"mask-image-x-to-color":[{"mask-x-to":L()}],"mask-image-y-from-pos":[{"mask-y-from":K()}],"mask-image-y-to-pos":[{"mask-y-to":K()}],"mask-image-y-from-color":[{"mask-y-from":L()}],"mask-image-y-to-color":[{"mask-y-to":L()}],"mask-image-radial":[{"mask-radial":[Te,Re]}],"mask-image-radial-from-pos":[{"mask-radial-from":K()}],"mask-image-radial-to-pos":[{"mask-radial-to":K()}],"mask-image-radial-from-color":[{"mask-radial-from":L()}],"mask-image-radial-to-color":[{"mask-radial-to":L()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":x()}],"mask-image-conic-pos":[{"mask-conic":[et]}],"mask-image-conic-from-pos":[{"mask-conic-from":K()}],"mask-image-conic-to-pos":[{"mask-conic-to":K()}],"mask-image-conic-from-color":[{"mask-conic-from":L()}],"mask-image-conic-to-color":[{"mask-conic-to":L()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:U()}],"mask-repeat":[{mask:A()}],"mask-size":[{mask:ee()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",Te,Re]}],filter:[{filter:["","none",Te,Re]}],blur:[{blur:Y()}],brightness:[{brightness:[et,Te,Re]}],contrast:[{contrast:[et,Te,Re]}],"drop-shadow":[{"drop-shadow":["","none",p,vm,wm]}],"drop-shadow-color":[{"drop-shadow":L()}],grayscale:[{grayscale:["",et,Te,Re]}],"hue-rotate":[{"hue-rotate":[et,Te,Re]}],invert:[{invert:["",et,Te,Re]}],saturate:[{saturate:[et,Te,Re]}],sepia:[{sepia:["",et,Te,Re]}],"backdrop-filter":[{"backdrop-filter":["","none",Te,Re]}],"backdrop-blur":[{"backdrop-blur":Y()}],"backdrop-brightness":[{"backdrop-brightness":[et,Te,Re]}],"backdrop-contrast":[{"backdrop-contrast":[et,Te,Re]}],"backdrop-grayscale":[{"backdrop-grayscale":["",et,Te,Re]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[et,Te,Re]}],"backdrop-invert":[{"backdrop-invert":["",et,Te,Re]}],"backdrop-opacity":[{"backdrop-opacity":[et,Te,Re]}],"backdrop-saturate":[{"backdrop-saturate":[et,Te,Re]}],"backdrop-sepia":[{"backdrop-sepia":["",et,Te,Re]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":C()}],"border-spacing-x":[{"border-spacing-x":C()}],"border-spacing-y":[{"border-spacing-y":C()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",Te,Re]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[et,"initial",Te,Re]}],ease:[{ease:["linear","initial",b,Te,Re]}],delay:[{delay:[et,Te,Re]}],animate:[{animate:["none",w,Te,Re]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[v,Te,Re]}],"perspective-origin":[{"perspective-origin":h()}],rotate:[{rotate:j()}],"rotate-x":[{"rotate-x":j()}],"rotate-y":[{"rotate-y":j()}],"rotate-z":[{"rotate-z":j()}],scale:[{scale:se()}],"scale-x":[{"scale-x":se()}],"scale-y":[{"scale-y":se()}],"scale-z":[{"scale-z":se()}],"scale-3d":["scale-3d"],skew:[{skew:pe()}],"skew-x":[{"skew-x":pe()}],"skew-y":[{"skew-y":pe()}],transform:[{transform:[Te,Re,"","none","gpu","cpu"]}],"transform-origin":[{origin:h()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:oe()}],"translate-x":[{"translate-x":oe()}],"translate-y":[{"translate-y":oe()}],"translate-z":[{"translate-z":oe()}],"translate-none":["translate-none"],zoom:[{zoom:[sn,Te,Re]}],accent:[{accent:L()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:L()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",Te,Re]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scrollbar-thumb-color":[{"scrollbar-thumb":L()}],"scrollbar-track-color":[{"scrollbar-track":L()}],"scrollbar-gutter":[{"scrollbar-gutter":["auto","stable","both"]}],"scrollbar-w":[{scrollbar:["auto","thin","none"]}],"scroll-m":[{"scroll-m":C()}],"scroll-mx":[{"scroll-mx":C()}],"scroll-my":[{"scroll-my":C()}],"scroll-ms":[{"scroll-ms":C()}],"scroll-me":[{"scroll-me":C()}],"scroll-mbs":[{"scroll-mbs":C()}],"scroll-mbe":[{"scroll-mbe":C()}],"scroll-mt":[{"scroll-mt":C()}],"scroll-mr":[{"scroll-mr":C()}],"scroll-mb":[{"scroll-mb":C()}],"scroll-ml":[{"scroll-ml":C()}],"scroll-p":[{"scroll-p":C()}],"scroll-px":[{"scroll-px":C()}],"scroll-py":[{"scroll-py":C()}],"scroll-ps":[{"scroll-ps":C()}],"scroll-pe":[{"scroll-pe":C()}],"scroll-pbs":[{"scroll-pbs":C()}],"scroll-pbe":[{"scroll-pbe":C()}],"scroll-pt":[{"scroll-pt":C()}],"scroll-pr":[{"scroll-pr":C()}],"scroll-pb":[{"scroll-pb":C()}],"scroll-pl":[{"scroll-pl":C()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",Te,Re]}],fill:[{fill:["none",...L()]}],"stroke-w":[{stroke:[et,Ac,Fs,n8]}],stroke:[{stroke:["none",...L()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{"container-named":["container-type"],overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","inset-bs","inset-be","start","end","top","right","bottom","left"],"inset-x":["start","end","right","left"],"inset-y":["inset-bs","inset-be","top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pbs","pbe","pt","pr","pb","pl"],px:["ps","pe","pr","pl"],py:["pbs","pbe","pt","pb"],m:["mx","my","ms","me","mbs","mbe","mt","mr","mb","ml"],mx:["ms","me","mr","ml"],my:["mbs","mbe","mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-bs","border-w-be","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-s","border-w-e","border-w-r","border-w-l"],"border-w-y":["border-w-bs","border-w-be","border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-bs","border-color-be","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-s","border-color-e","border-color-r","border-color-l"],"border-color-y":["border-color-bs","border-color-be","border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mbs","scroll-mbe","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-ms","scroll-me","scroll-mr","scroll-ml"],"scroll-my":["scroll-mbs","scroll-mbe","scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pbs","scroll-pbe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-ps","scroll-pe","scroll-pr","scroll-pl"],"scroll-py":["scroll-pbs","scroll-pbe","scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},postfixLookupClassGroups:["container-type"],orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}},j5=(e,{cacheSize:t,prefix:o,experimentalParseClassName:a,extend:r={},override:n={}})=>(Bi(e,"cacheSize",t),Bi(e,"prefix",o),Bi(e,"experimentalParseClassName",a),xm(e.theme,n.theme),xm(e.classGroups,n.classGroups),xm(e.conflictingClassGroups,n.conflictingClassGroups),xm(e.conflictingClassGroupModifiers,n.conflictingClassGroupModifiers),Bi(e,"postfixLookupClassGroups",n.postfixLookupClassGroups),Bi(e,"orderSensitiveModifiers",n.orderSensitiveModifiers),Im(e.theme,r.theme),Im(e.classGroups,r.classGroups),Im(e.conflictingClassGroups,r.conflictingClassGroups),Im(e.conflictingClassGroupModifiers,r.conflictingClassGroupModifiers),Hh(e,r,"postfixLookupClassGroups"),Hh(e,r,"orderSensitiveModifiers"),e),Bi=(e,t,o)=>{o!==void 0&&(e[t]=o)},xm=(e,t)=>{if(t)for(let o in t)Bi(e,o,t[o])},Im=(e,t)=>{if(t)for(let o in t)Hh(e,t,o)},Hh=(e,t,o)=>{let a=t[o];a!==void 0&&(e[o]=e[o]?e[o].concat(a):a)},C8=(e,...t)=>typeof e=="function"?r8(l8,e,...t):r8(()=>j5(l8(),e),...t);var K5=C8({extend:{classGroups:{"type-role":[{type:["title","heading","heading-sm","body","body-sm","label","label-sm","label-lg","caption","code","code-sm","code-xs"]}],"glass-key":[{glass:["ink","paper","coral"]}]}}}),ns={sm:"h-[max(var(--control-sm),calc(1lh+var(--space-2)))]",default:"h-[max(var(--control),calc(1lh+var(--space-2)))]",lg:"h-[max(var(--control-lg),calc(1lh+var(--space-2)))]"};function F(...e){return K5(ym(e))}function Et(e,t){return typeof t=="function"?o=>F(e,t(o)):F(e,t)}function Ra(...e){return t=>{for(let o of e)typeof o=="function"?o(t):o&&(o.current=t)}}import*as zc from"react";var R8="forced-colors:outline-solid forced-colors:outline-1 forced-colors:outline-[CanvasText]",Lc=F("overlay outline-none",R8),DW=F("shell grid-rows-[minmax(0,1fr)] border-line text-text-1 outline-none",R8);var _h="overlay-motion";var S8=F(Lc,_h,"flex max-h-[min(var(--popup-max),var(--available-height))] min-w-(--menu-min) max-w-(--available-width) flex-col overflow-y-auto overscroll-contain p-1 [--menu-item-h:var(--menu-row)]","data-[size=sm]:[--menu-item-h:var(--menu-row-sm)]"),Nc=F("relative flex min-h-(--menu-item-h) w-full cursor-default items-center gap-2 rounded-tag px-2 type-label text-text-1 outline-none select-none data-inset:ps-7","in-data-[size=sm]:type-label-sm","[&_svg]:size-(--icon) [&_svg]:shrink-0 [&_svg]:text-text-3","data-highlighted:bg-hover data-disabled:cursor-not-allowed data-disabled:text-text-disabled data-disabled:[&_svg]:text-text-disabled","data-[variant=destructive]:text-fail-text data-[variant=destructive]:[&_svg]:text-fail-text data-[variant=destructive]:data-highlighted:bg-fail-tint","forced-colors:data-highlighted:outline-solid forced-colors:data-highlighted:outline-2 forced-colors:data-highlighted:-outline-offset-2"),Y5=F(Nc,"ps-7"),Cm="flex min-h-(--menu-item-h) items-center px-2 type-caption text-text-2 select-none data-inset:ps-7",E8="-mx-1 my-1 h-px shrink-0 bg-line-faint";import*as Dc from"react";var ye=Dc.forwardRef((e,t)=>{let{alt:o,color:a="currentColor",size:r="1em",weight:n="regular",mirrored:s=!1,children:l,weights:i,...c}=e;return Dc.createElement("svg",{ref:t,xmlns:"http://www.w3.org/2000/svg",width:r,height:r,fill:a,viewBox:"0 0 256 256",transform:s?"scale(-1, 1)":void 0,...c},!!o&&Dc.createElement("title",null,o),l,i.get(n))});ye.displayName="SSRBase";import*as Rm from"react";import*as $t from"react";var T8=new Map([["bold",$t.createElement($t.Fragment,null,$t.createElement("path",{d:"M244,56v48a12,12,0,0,1-12,12H184a12,12,0,1,1,0-24H201.1l-19-17.38c-.13-.12-.26-.24-.38-.37A76,76,0,1,0,127,204h1a75.53,75.53,0,0,0,52.15-20.72,12,12,0,0,1,16.49,17.45A99.45,99.45,0,0,1,128,228h-1.37A100,100,0,1,1,198.51,57.06L220,76.72V56a12,12,0,0,1,24,0Z"}))],["duotone",$t.createElement($t.Fragment,null,$t.createElement("path",{d:"M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z",opacity:"0.2"}),$t.createElement("path",{d:"M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1,0-16H211.4L184.81,71.64l-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,0,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60L224,85.8V56a8,8,0,1,1,16,0Z"}))],["fill",$t.createElement($t.Fragment,null,$t.createElement("path",{d:"M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1-5.66-13.66l17-17-10.55-9.65-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,1,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60l10.93,10L226.34,50.3A8,8,0,0,1,240,56Z"}))],["light",$t.createElement($t.Fragment,null,$t.createElement("path",{d:"M238,56v48a6,6,0,0,1-6,6H184a6,6,0,0,1,0-12h32.55l-30.38-27.8c-.06-.06-.12-.13-.19-.19a82,82,0,1,0-1.7,117.65,6,6,0,0,1,8.24,8.73A93.46,93.46,0,0,1,128,222h-1.28A94,94,0,1,1,194.37,61.4L226,90.35V56a6,6,0,1,1,12,0Z"}))],["regular",$t.createElement($t.Fragment,null,$t.createElement("path",{d:"M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1,0-16H211.4L184.81,71.64l-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,0,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60L224,85.8V56a8,8,0,1,1,16,0Z"}))],["thin",$t.createElement($t.Fragment,null,$t.createElement("path",{d:"M236,56v48a4,4,0,0,1-4,4H184a4,4,0,0,1,0-8h37.7L187.53,68.69l-.13-.12a84,84,0,1,0-1.75,120.51,4,4,0,0,1,5.5,5.82A91.43,91.43,0,0,1,128,220h-1.26A92,92,0,1,1,193,62.84l35,32.05V56a4,4,0,1,1,8,0Z"}))]]);var Sm=Rm.forwardRef((e,t)=>Rm.createElement(ye,{ref:t,...e,weights:T8}));Sm.displayName="ArrowClockwiseIcon";import*as Em from"react";import*as Wt from"react";var M8=new Map([["bold",Wt.createElement(Wt.Fragment,null,Wt.createElement("path",{d:"M208.49,152.49l-72,72a12,12,0,0,1-17,0l-72-72a12,12,0,0,1,17-17L116,187V40a12,12,0,0,1,24,0V187l51.51-51.52a12,12,0,0,1,17,17Z"}))],["duotone",Wt.createElement(Wt.Fragment,null,Wt.createElement("path",{d:"M200,144l-72,72L56,144Z",opacity:"0.2"}),Wt.createElement("path",{d:"M207.39,140.94A8,8,0,0,0,200,136H136V40a8,8,0,0,0-16,0v96H56a8,8,0,0,0-5.66,13.66l72,72a8,8,0,0,0,11.32,0l72-72A8,8,0,0,0,207.39,140.94ZM128,204.69,75.31,152H180.69Z"}))],["fill",Wt.createElement(Wt.Fragment,null,Wt.createElement("path",{d:"M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72A8,8,0,0,1,56,136h64V40a8,8,0,0,1,16,0v96h64a8,8,0,0,1,5.66,13.66Z"}))],["light",Wt.createElement(Wt.Fragment,null,Wt.createElement("path",{d:"M204.24,148.24l-72,72a6,6,0,0,1-8.48,0l-72-72a6,6,0,0,1,8.48-8.48L122,201.51V40a6,6,0,0,1,12,0V201.51l61.76-61.75a6,6,0,0,1,8.48,8.48Z"}))],["regular",Wt.createElement(Wt.Fragment,null,Wt.createElement("path",{d:"M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z"}))],["thin",Wt.createElement(Wt.Fragment,null,Wt.createElement("path",{d:"M202.83,146.83l-72,72a4,4,0,0,1-5.66,0l-72-72a4,4,0,0,1,5.66-5.66L124,206.34V40a4,4,0,0,1,8,0V206.34l65.17-65.17a4,4,0,0,1,5.66,5.66Z"}))]]);var Tm=Em.forwardRef((e,t)=>Em.createElement(ye,{ref:t,...e,weights:M8}));Tm.displayName="ArrowDownIcon";import*as Mm from"react";import*as qt from"react";var P8=new Map([["bold",qt.createElement(qt.Fragment,null,qt.createElement("path",{d:"M236,112a68.07,68.07,0,0,1-68,68H61l27.52,27.51a12,12,0,0,1-17,17l-48-48a12,12,0,0,1,0-17l48-48a12,12,0,1,1,17,17L61,156H168a44,44,0,0,0,0-88H80a12,12,0,0,1,0-24h88A68.07,68.07,0,0,1,236,112Z"}))],["duotone",qt.createElement(qt.Fragment,null,qt.createElement("path",{d:"M80,120v96L32,168Z",opacity:"0.2"}),qt.createElement("path",{d:"M168,48H80a8,8,0,0,0,0,16h88a48,48,0,0,1,0,96H88V120a8,8,0,0,0-13.66-5.66l-48,48a8,8,0,0,0,0,11.32l48,48A8,8,0,0,0,88,216V176h80a64,64,0,0,0,0-128ZM72,196.69,43.31,168,72,139.31Z"}))],["fill",qt.createElement(qt.Fragment,null,qt.createElement("path",{d:"M232,112a64.07,64.07,0,0,1-64,64H88v40a8,8,0,0,1-13.66,5.66l-48-48a8,8,0,0,1,0-11.32l48-48A8,8,0,0,1,88,120v40h80a48,48,0,0,0,0-96H80a8,8,0,0,1,0-16h88A64.07,64.07,0,0,1,232,112Z"}))],["light",qt.createElement(qt.Fragment,null,qt.createElement("path",{d:"M230,112a62.07,62.07,0,0,1-62,62H46.49l37.75,37.76a6,6,0,1,1-8.48,8.48l-48-48a6,6,0,0,1,0-8.48l48-48a6,6,0,0,1,8.48,8.48L46.49,162H168a50,50,0,0,0,0-100H80a6,6,0,0,1,0-12h88A62.07,62.07,0,0,1,230,112Z"}))],["regular",qt.createElement(qt.Fragment,null,qt.createElement("path",{d:"M232,112a64.07,64.07,0,0,1-64,64H51.31l34.35,34.34a8,8,0,0,1-11.32,11.32l-48-48a8,8,0,0,1,0-11.32l48-48a8,8,0,0,1,11.32,11.32L51.31,160H168a48,48,0,0,0,0-96H80a8,8,0,0,1,0-16h88A64.07,64.07,0,0,1,232,112Z"}))],["thin",qt.createElement(qt.Fragment,null,qt.createElement("path",{d:"M228,112a60.07,60.07,0,0,1-60,60H41.66l41.17,41.17a4,4,0,0,1-5.66,5.66l-48-48a4,4,0,0,1,0-5.66l48-48a4,4,0,0,1,5.66,5.66L41.66,164H168a52,52,0,0,0,0-104H80a4,4,0,0,1,0-8h88A60.07,60.07,0,0,1,228,112Z"}))]]);var Pm=Mm.forwardRef((e,t)=>Mm.createElement(ye,{ref:t,...e,weights:P8}));Pm.displayName="ArrowUDownLeftIcon";import*as km from"react";import*as jt from"react";var k8=new Map([["bold",jt.createElement(jt.Fragment,null,jt.createElement("path",{d:"M208.49,120.49a12,12,0,0,1-17,0L140,69V216a12,12,0,0,1-24,0V69L64.49,120.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0l72,72A12,12,0,0,1,208.49,120.49Z"}))],["duotone",jt.createElement(jt.Fragment,null,jt.createElement("path",{d:"M200,112H56l72-72Z",opacity:"0.2"}),jt.createElement("path",{d:"M205.66,106.34l-72-72a8,8,0,0,0-11.32,0l-72,72A8,8,0,0,0,56,120h64v96a8,8,0,0,0,16,0V120h64a8,8,0,0,0,5.66-13.66ZM75.31,104,128,51.31,180.69,104Z"}))],["fill",jt.createElement(jt.Fragment,null,jt.createElement("path",{d:"M207.39,115.06A8,8,0,0,1,200,120H136v96a8,8,0,0,1-16,0V120H56a8,8,0,0,1-5.66-13.66l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,207.39,115.06Z"}))],["light",jt.createElement(jt.Fragment,null,jt.createElement("path",{d:"M204.24,116.24a6,6,0,0,1-8.48,0L134,54.49V216a6,6,0,0,1-12,0V54.49L60.24,116.24a6,6,0,0,1-8.48-8.48l72-72a6,6,0,0,1,8.48,0l72,72A6,6,0,0,1,204.24,116.24Z"}))],["regular",jt.createElement(jt.Fragment,null,jt.createElement("path",{d:"M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"}))],["thin",jt.createElement(jt.Fragment,null,jt.createElement("path",{d:"M202.83,114.83a4,4,0,0,1-5.66,0L132,49.66V216a4,4,0,0,1-8,0V49.66L58.83,114.83a4,4,0,0,1-5.66-5.66l72-72a4,4,0,0,1,5.66,0l72,72A4,4,0,0,1,202.83,114.83Z"}))]]);var Am=km.forwardRef((e,t)=>km.createElement(ye,{ref:t,...e,weights:k8}));Am.displayName="ArrowUpIcon";import*as zm from"react";import*as Kt from"react";var A8=new Map([["bold",Kt.createElement(Kt.Fragment,null,Kt.createElement("path",{d:"M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128ZM119.51,96.49a12,12,0,0,0,17,0l32-32a12,12,0,0,0-17-17L140,59V16a12,12,0,0,0-24,0V59L104.49,47.51a12,12,0,0,0-17,17Zm17,63a12,12,0,0,0-17,0l-32,32a12,12,0,0,0,17,17L116,197v43a12,12,0,0,0,24,0V197l11.51,11.52a12,12,0,0,0,17-17Z"}))],["duotone",Kt.createElement(Kt.Fragment,null,Kt.createElement("path",{d:"M216,32V224a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V32A16,16,0,0,1,56,16H200A16,16,0,0,1,216,32Z",opacity:"0.2"}),Kt.createElement("path",{d:"M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM122.34,101.66a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32L136,76.69V16a8,8,0,0,0-16,0V76.69L101.66,58.34A8,8,0,0,0,90.34,69.66Zm11.32,52.68a8,8,0,0,0-11.32,0l-32,32a8,8,0,0,0,11.32,11.32L120,179.31V240a8,8,0,0,0,16,0V179.31l18.34,18.35a8,8,0,0,0,11.32-11.32Z"}))],["fill",Kt.createElement(Kt.Fragment,null,Kt.createElement("path",{d:"M90.34,69.66A8,8,0,0,1,96,56h24V16a8,8,0,0,1,16,0V56h24a8,8,0,0,1,5.66,13.66l-32,32a8,8,0,0,1-11.32,0Zm43.32,84.68a8,8,0,0,0-11.32,0l-32,32A8,8,0,0,0,96,200h24v40a8,8,0,0,0,16,0V200h24a8,8,0,0,0,5.66-13.66ZM216,120H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"}))],["light",Kt.createElement(Kt.Fragment,null,Kt.createElement("path",{d:"M222,128a6,6,0,0,1-6,6H40a6,6,0,0,1,0-12H216A6,6,0,0,1,222,128Zm-98.24-27.76a6,6,0,0,0,8.48,0l32-32a6,6,0,0,0-8.48-8.48L134,81.51V16a6,6,0,0,0-12,0V81.51L100.24,59.76a6,6,0,0,0-8.48,8.48Zm8.48,55.52a6,6,0,0,0-8.48,0l-32,32a6,6,0,0,0,8.48,8.48L122,174.49V240a6,6,0,0,0,12,0V174.49l21.76,21.75a6,6,0,0,0,8.48-8.48Z"}))],["regular",Kt.createElement(Kt.Fragment,null,Kt.createElement("path",{d:"M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM122.34,101.66a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32L136,76.69V16a8,8,0,0,0-16,0V76.69L101.66,58.34A8,8,0,0,0,90.34,69.66Zm11.32,52.68a8,8,0,0,0-11.32,0l-32,32a8,8,0,0,0,11.32,11.32L120,179.31V240a8,8,0,0,0,16,0V179.31l18.34,18.35a8,8,0,0,0,11.32-11.32Z"}))],["thin",Kt.createElement(Kt.Fragment,null,Kt.createElement("path",{d:"M220,128a4,4,0,0,1-4,4H40a4,4,0,0,1,0-8H216A4,4,0,0,1,220,128ZM125.17,98.83a4,4,0,0,0,5.66,0l32-32a4,4,0,1,0-5.66-5.66L132,86.34V16a4,4,0,0,0-8,0V86.34L98.83,61.17a4,4,0,0,0-5.66,5.66Zm5.66,58.34a4,4,0,0,0-5.66,0l-32,32a4,4,0,0,0,5.66,5.66L124,169.66V240a4,4,0,0,0,8,0V169.66l25.17,25.17a4,4,0,0,0,5.66-5.66Z"}))]]);var Lm=zm.forwardRef((e,t)=>zm.createElement(ye,{ref:t,...e,weights:A8}));Lm.displayName="ArrowsInLineVerticalIcon";import*as Nm from"react";import*as Yt from"react";var z8=new Map([["bold",Yt.createElement(Yt.Fragment,null,Yt.createElement("path",{d:"M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z"}))],["duotone",Yt.createElement(Yt.Fragment,null,Yt.createElement("path",{d:"M208,96l-80,80L48,96Z",opacity:"0.2"}),Yt.createElement("path",{d:"M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z"}))],["fill",Yt.createElement(Yt.Fragment,null,Yt.createElement("path",{d:"M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,48,88H208a8,8,0,0,1,5.66,13.66Z"}))],["light",Yt.createElement(Yt.Fragment,null,Yt.createElement("path",{d:"M212.24,100.24l-80,80a6,6,0,0,1-8.48,0l-80-80a6,6,0,0,1,8.48-8.48L128,167.51l75.76-75.75a6,6,0,0,1,8.48,8.48Z"}))],["regular",Yt.createElement(Yt.Fragment,null,Yt.createElement("path",{d:"M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"}))],["thin",Yt.createElement(Yt.Fragment,null,Yt.createElement("path",{d:"M210.83,98.83l-80,80a4,4,0,0,1-5.66,0l-80-80a4,4,0,0,1,5.66-5.66L128,170.34l77.17-77.17a4,4,0,1,1,5.66,5.66Z"}))]]);var Dm=Nm.forwardRef((e,t)=>Nm.createElement(ye,{ref:t,...e,weights:z8}));Dm.displayName="CaretDownIcon";import*as Fm from"react";import*as Xt from"react";var L8=new Map([["bold",Xt.createElement(Xt.Fragment,null,Xt.createElement("path",{d:"M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"}))],["duotone",Xt.createElement(Xt.Fragment,null,Xt.createElement("path",{d:"M176,128,96,208V48Z",opacity:"0.2"}),Xt.createElement("path",{d:"M181.66,122.34l-80-80A8,8,0,0,0,88,48V208a8,8,0,0,0,13.66,5.66l80-80A8,8,0,0,0,181.66,122.34ZM104,188.69V67.31L164.69,128Z"}))],["fill",Xt.createElement(Xt.Fragment,null,Xt.createElement("path",{d:"M181.66,133.66l-80,80A8,8,0,0,1,88,208V48a8,8,0,0,1,13.66-5.66l80,80A8,8,0,0,1,181.66,133.66Z"}))],["light",Xt.createElement(Xt.Fragment,null,Xt.createElement("path",{d:"M180.24,132.24l-80,80a6,6,0,0,1-8.48-8.48L167.51,128,91.76,52.24a6,6,0,0,1,8.48-8.48l80,80A6,6,0,0,1,180.24,132.24Z"}))],["regular",Xt.createElement(Xt.Fragment,null,Xt.createElement("path",{d:"M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"}))],["thin",Xt.createElement(Xt.Fragment,null,Xt.createElement("path",{d:"M178.83,130.83l-80,80a4,4,0,0,1-5.66-5.66L170.34,128,93.17,50.83a4,4,0,0,1,5.66-5.66l80,80A4,4,0,0,1,178.83,130.83Z"}))]]);var Om=Fm.forwardRef((e,t)=>Fm.createElement(ye,{ref:t,...e,weights:L8}));Om.displayName="CaretRightIcon";import*as Hm from"react";import*as Qt from"react";var N8=new Map([["bold",Qt.createElement(Qt.Fragment,null,Qt.createElement("path",{d:"M184.49,167.51a12,12,0,0,1,0,17l-48,48a12,12,0,0,1-17,0l-48-48a12,12,0,0,1,17-17L128,207l39.51-39.52A12,12,0,0,1,184.49,167.51Zm-96-79L128,49l39.51,39.52a12,12,0,0,0,17-17l-48-48a12,12,0,0,0-17,0l-48,48a12,12,0,0,0,17,17Z"}))],["duotone",Qt.createElement(Qt.Fragment,null,Qt.createElement("path",{d:"M80,176h96l-48,48ZM128,32,80,80h96Z",opacity:"0.2"}),Qt.createElement("path",{d:"M176,168H80a8,8,0,0,0-5.66,13.66l48,48a8,8,0,0,0,11.32,0l48-48A8,8,0,0,0,176,168Zm-48,44.69L99.31,184h57.38ZM80,88h96a8,8,0,0,0,5.66-13.66l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,80,88Zm48-44.69L156.69,72H99.31Z"}))],["fill",Qt.createElement(Qt.Fragment,null,Qt.createElement("path",{d:"M72.61,83.06a8,8,0,0,1,1.73-8.72l48-48a8,8,0,0,1,11.32,0l48,48A8,8,0,0,1,176,88H80A8,8,0,0,1,72.61,83.06ZM176,168H80a8,8,0,0,0-5.66,13.66l48,48a8,8,0,0,0,11.32,0l48-48A8,8,0,0,0,176,168Z"}))],["light",Qt.createElement(Qt.Fragment,null,Qt.createElement("path",{d:"M180.24,171.76a6,6,0,0,1,0,8.48l-48,48a6,6,0,0,1-8.48,0l-48-48a6,6,0,0,1,8.48-8.48L128,215.51l43.76-43.75A6,6,0,0,1,180.24,171.76Zm-96-87.52L128,40.49l43.76,43.75a6,6,0,0,0,8.48-8.48l-48-48a6,6,0,0,0-8.48,0l-48,48a6,6,0,0,0,8.48,8.48Z"}))],["regular",Qt.createElement(Qt.Fragment,null,Qt.createElement("path",{d:"M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z"}))],["thin",Qt.createElement(Qt.Fragment,null,Qt.createElement("path",{d:"M178.83,173.17a4,4,0,0,1,0,5.66l-48,48a4,4,0,0,1-5.66,0l-48-48a4,4,0,0,1,5.66-5.66L128,218.34l45.17-45.17A4,4,0,0,1,178.83,173.17Zm-96-90.34L128,37.66l45.17,45.17a4,4,0,1,0,5.66-5.66l-48-48a4,4,0,0,0-5.66,0l-48,48a4,4,0,0,0,5.66,5.66Z"}))]]);var Vm=Hm.forwardRef((e,t)=>Hm.createElement(ye,{ref:t,...e,weights:N8}));Vm.displayName="CaretUpDownIcon";import*as Bm from"react";import*as Jt from"react";var D8=new Map([["bold",Jt.createElement(Jt.Fragment,null,Jt.createElement("path",{d:"M236,208a12,12,0,0,1-12,12H32a12,12,0,0,1-12-12V48a12,12,0,0,1,24,0v85.55L88.1,95a12,12,0,0,1,15.1-.57l56.22,42.16L216.1,87A12,12,0,1,1,231.9,105l-64,56a12,12,0,0,1-15.1.57L96.58,119.44,44,165.45V196H224A12,12,0,0,1,236,208Z"}))],["duotone",Jt.createElement(Jt.Fragment,null,Jt.createElement("path",{d:"M224,64V208H32V48H208A16,16,0,0,1,224,64Z",opacity:"0.2"}),Jt.createElement("path",{d:"M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z"}))],["fill",Jt.createElement(Jt.Fragment,null,Jt.createElement("path",{d:"M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM200,176a8,8,0,0,1,0,16H56a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v62.92l34.88-29.07a8,8,0,0,1,9.56-.51l43,28.69,43.41-36.18a8,8,0,0,1,10.24,12.3l-48,40a8,8,0,0,1-9.56.51l-43-28.69L64,155.75V176Z"}))],["light",Jt.createElement(Jt.Fragment,null,Jt.createElement("path",{d:"M230,208a6,6,0,0,1-6,6H32a6,6,0,0,1-6-6V48a6,6,0,0,1,12,0v98.78l54.05-47.3a6,6,0,0,1,7.55-.28l60.11,45.08,60.34-52.8a6,6,0,0,1,7.9,9l-64,56a6,6,0,0,1-7.55.28L96.29,111.72,38,162.72V202H224A6,6,0,0,1,230,208Z"}))],["regular",Jt.createElement(Jt.Fragment,null,Jt.createElement("path",{d:"M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z"}))],["thin",Jt.createElement(Jt.Fragment,null,Jt.createElement("path",{d:"M228,208a4,4,0,0,1-4,4H32a4,4,0,0,1-4-4V48a4,4,0,0,1,8,0V151.19L93.37,101a4,4,0,0,1,5-.19l61.41,46.05L221.37,93a4,4,0,0,1,5.26,6l-64,56a4,4,0,0,1-5,.19l-61.41-46L36,161.81V204H224A4,4,0,0,1,228,208Z"}))]]);var _m=Bm.forwardRef((e,t)=>Bm.createElement(ye,{ref:t,...e,weights:D8}));_m.displayName="ChartLineIcon";import*as Zm from"react";import*as eo from"react";var F8=new Map([["bold",eo.createElement(eo.Fragment,null,eo.createElement("path",{d:"M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z"}))],["duotone",eo.createElement(eo.Fragment,null,eo.createElement("path",{d:"M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z",opacity:"0.2"}),eo.createElement("path",{d:"M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z"}))],["fill",eo.createElement(eo.Fragment,null,eo.createElement("path",{d:"M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z"}))],["light",eo.createElement(eo.Fragment,null,eo.createElement("path",{d:"M228.24,76.24l-128,128a6,6,0,0,1-8.48,0l-56-56a6,6,0,0,1,8.48-8.48L96,191.51,219.76,67.76a6,6,0,0,1,8.48,8.48Z"}))],["regular",eo.createElement(eo.Fragment,null,eo.createElement("path",{d:"M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"}))],["thin",eo.createElement(eo.Fragment,null,eo.createElement("path",{d:"M226.83,74.83l-128,128a4,4,0,0,1-5.66,0l-56-56a4,4,0,0,1,5.66-5.66L96,194.34,221.17,69.17a4,4,0,1,1,5.66,5.66Z"}))]]);var Gm=Zm.forwardRef((e,t)=>Zm.createElement(ye,{ref:t,...e,weights:F8}));Gm.displayName="CheckIcon";import*as Um from"react";import*as to from"react";var O8=new Map([["bold",to.createElement(to.Fragment,null,to.createElement("path",{d:"M176.49,95.51a12,12,0,0,1,0,17l-56,56a12,12,0,0,1-17,0l-24-24a12,12,0,1,1,17-17L112,143l47.51-47.52A12,12,0,0,1,176.49,95.51ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Z"}))],["duotone",to.createElement(to.Fragment,null,to.createElement("path",{d:"M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z",opacity:"0.2"}),to.createElement("path",{d:"M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"}))],["fill",to.createElement(to.Fragment,null,to.createElement("path",{d:"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"}))],["light",to.createElement(to.Fragment,null,to.createElement("path",{d:"M172.24,99.76a6,6,0,0,1,0,8.48l-56,56a6,6,0,0,1-8.48,0l-24-24a6,6,0,0,1,8.48-8.48L112,151.51l51.76-51.75A6,6,0,0,1,172.24,99.76ZM230,128A102,102,0,1,1,128,26,102.12,102.12,0,0,1,230,128Zm-12,0a90,90,0,1,0-90,90A90.1,90.1,0,0,0,218,128Z"}))],["regular",to.createElement(to.Fragment,null,to.createElement("path",{d:"M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"}))],["thin",to.createElement(to.Fragment,null,to.createElement("path",{d:"M170.83,101.17a4,4,0,0,1,0,5.66l-56,56a4,4,0,0,1-5.66,0l-24-24a4,4,0,0,1,5.66-5.66L112,154.34l53.17-53.17A4,4,0,0,1,170.83,101.17ZM228,128A100,100,0,1,1,128,28,100.11,100.11,0,0,1,228,128Zm-8,0a92,92,0,1,0-92,92A92.1,92.1,0,0,0,220,128Z"}))]]);var $m=Um.forwardRef((e,t)=>Um.createElement(ye,{ref:t,...e,weights:O8}));$m.displayName="CheckCircleIcon";import*as Wm from"react";import*as oo from"react";var H8=new Map([["bold",oo.createElement(oo.Fragment,null,oo.createElement("path",{d:"M236,128a108,108,0,0,1-216,0c0-42.52,24.73-81.34,63-98.9A12,12,0,1,1,93,50.91C63.24,64.57,44,94.83,44,128a84,84,0,0,0,168,0c0-33.17-19.24-63.43-49-77.09A12,12,0,1,1,173,29.1C211.27,46.66,236,85.48,236,128Z"}))],["duotone",oo.createElement(oo.Fragment,null,oo.createElement("path",{d:"M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z",opacity:"0.2"}),oo.createElement("path",{d:"M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"}))],["fill",oo.createElement(oo.Fragment,null,oo.createElement("path",{d:"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,176A72,72,0,0,1,92,65.64a8,8,0,0,1,8,13.85,56,56,0,1,0,56,0,8,8,0,0,1,8-13.85A72,72,0,0,1,128,200Z"}))],["light",oo.createElement(oo.Fragment,null,oo.createElement("path",{d:"M230,128a102,102,0,0,1-204,0c0-40.18,23.35-76.86,59.5-93.45a6,6,0,0,1,5,10.9C58.61,60.09,38,92.49,38,128a90,90,0,0,0,180,0c0-35.51-20.61-67.91-52.5-82.55a6,6,0,0,1,5-10.9C206.65,51.14,230,87.82,230,128Z"}))],["regular",oo.createElement(oo.Fragment,null,oo.createElement("path",{d:"M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"}))],["thin",oo.createElement(oo.Fragment,null,oo.createElement("path",{d:"M228,128a100,100,0,0,1-200,0c0-39.4,22.9-75.37,58.33-91.63a4,4,0,1,1,3.34,7.27C57.07,58.6,36,91.71,36,128a92,92,0,0,0,184,0c0-36.29-21.07-69.4-53.67-84.36a4,4,0,1,1,3.34-7.27C205.1,52.63,228,88.6,228,128Z"}))]]);var qm=Wm.forwardRef((e,t)=>Wm.createElement(ye,{ref:t,...e,weights:H8}));qm.displayName="CircleNotchIcon";import*as jm from"react";import*as ao from"react";var V8=new Map([["bold",ao.createElement(ao.Fragment,null,ao.createElement("path",{d:"M100,28H64A20,20,0,0,0,44,48V208a20,20,0,0,0,20,20h36a20,20,0,0,0,20-20V48A20,20,0,0,0,100,28ZM96,204H68V52H96ZM192,28H156a20,20,0,0,0-20,20V208a20,20,0,0,0,20,20h36a20,20,0,0,0,20-20V48A20,20,0,0,0,192,28Zm-4,176H160V52h28Z"}))],["duotone",ao.createElement(ao.Fragment,null,ao.createElement("path",{d:"M112,48V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h40A8,8,0,0,1,112,48Zm80-8H152a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8h40a8,8,0,0,0,8-8V48A8,8,0,0,0,192,40Z",opacity:"0.2"}),ao.createElement("path",{d:"M104,32H64A16,16,0,0,0,48,48V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,104,32Zm0,176H64V48h40ZM192,32H152a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,192,32Zm0,176H152V48h40Z"}))],["fill",ao.createElement(ao.Fragment,null,ao.createElement("path",{d:"M120,48V208a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V48A16,16,0,0,1,64,32h40A16,16,0,0,1,120,48Zm72-16H152a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,192,32Z"}))],["light",ao.createElement(ao.Fragment,null,ao.createElement("path",{d:"M104,34H64A14,14,0,0,0,50,48V208a14,14,0,0,0,14,14h40a14,14,0,0,0,14-14V48A14,14,0,0,0,104,34Zm2,174a2,2,0,0,1-2,2H64a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2h40a2,2,0,0,1,2,2ZM192,34H152a14,14,0,0,0-14,14V208a14,14,0,0,0,14,14h40a14,14,0,0,0,14-14V48A14,14,0,0,0,192,34Zm2,174a2,2,0,0,1-2,2H152a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2h40a2,2,0,0,1,2,2Z"}))],["regular",ao.createElement(ao.Fragment,null,ao.createElement("path",{d:"M104,32H64A16,16,0,0,0,48,48V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,104,32Zm0,176H64V48h40ZM192,32H152a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,192,32Zm0,176H152V48h40Z"}))],["thin",ao.createElement(ao.Fragment,null,ao.createElement("path",{d:"M104,36H64A12,12,0,0,0,52,48V208a12,12,0,0,0,12,12h40a12,12,0,0,0,12-12V48A12,12,0,0,0,104,36Zm4,172a4,4,0,0,1-4,4H64a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4h40a4,4,0,0,1,4,4ZM192,36H152a12,12,0,0,0-12,12V208a12,12,0,0,0,12,12h40a12,12,0,0,0,12-12V48A12,12,0,0,0,192,36Zm4,172a4,4,0,0,1-4,4H152a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4h40a4,4,0,0,1,4,4Z"}))]]);var Km=jm.forwardRef((e,t)=>jm.createElement(ye,{ref:t,...e,weights:V8}));Km.displayName="ColumnsIcon";import*as Ym from"react";import*as ro from"react";var B8=new Map([["bold",ro.createElement(ro.Fragment,null,ro.createElement("path",{d:"M216,28H88A12,12,0,0,0,76,40V76H40A12,12,0,0,0,28,88V216a12,12,0,0,0,12,12H168a12,12,0,0,0,12-12V180h36a12,12,0,0,0,12-12V40A12,12,0,0,0,216,28ZM156,204H52V100H156Zm48-48H180V88a12,12,0,0,0-12-12H100V52H204Z"}))],["duotone",ro.createElement(ro.Fragment,null,ro.createElement("path",{d:"M216,40V168H168V88H88V40Z",opacity:"0.2"}),ro.createElement("path",{d:"M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"}))],["fill",ro.createElement(ro.Fragment,null,ro.createElement("path",{d:"M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32Zm-8,128H176V88a8,8,0,0,0-8-8H96V48H208Z"}))],["light",ro.createElement(ro.Fragment,null,ro.createElement("path",{d:"M216,34H88a6,6,0,0,0-6,6V82H40a6,6,0,0,0-6,6V216a6,6,0,0,0,6,6H168a6,6,0,0,0,6-6V174h42a6,6,0,0,0,6-6V40A6,6,0,0,0,216,34ZM162,210H46V94H162Zm48-48H174V88a6,6,0,0,0-6-6H94V46H210Z"}))],["regular",ro.createElement(ro.Fragment,null,ro.createElement("path",{d:"M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"}))],["thin",ro.createElement(ro.Fragment,null,ro.createElement("path",{d:"M216,36H88a4,4,0,0,0-4,4V84H40a4,4,0,0,0-4,4V216a4,4,0,0,0,4,4H168a4,4,0,0,0,4-4V172h44a4,4,0,0,0,4-4V40A4,4,0,0,0,216,36ZM164,212H44V92H164Zm48-48H172V88a4,4,0,0,0-4-4H92V44H212Z"}))]]);var Xm=Ym.forwardRef((e,t)=>Ym.createElement(ye,{ref:t,...e,weights:B8}));Xm.displayName="CopyIcon";import*as Qm from"react";import*as no from"react";var _8=new Map([["bold",no.createElement(no.Fragment,null,no.createElement("path",{d:"M144,128a16,16,0,1,1-16-16A16,16,0,0,1,144,128ZM60,112a16,16,0,1,0,16,16A16,16,0,0,0,60,112Zm136,0a16,16,0,1,0,16,16A16,16,0,0,0,196,112Z"}))],["duotone",no.createElement(no.Fragment,null,no.createElement("path",{d:"M240,96v64a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V96A16,16,0,0,1,32,80H224A16,16,0,0,1,240,96Z",opacity:"0.2"}),no.createElement("path",{d:"M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"}))],["fill",no.createElement(no.Fragment,null,no.createElement("path",{d:"M224,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V96A16,16,0,0,0,224,80ZM60,140a12,12,0,1,1,12-12A12,12,0,0,1,60,140Zm68,0a12,12,0,1,1,12-12A12,12,0,0,1,128,140Zm68,0a12,12,0,1,1,12-12A12,12,0,0,1,196,140Z"}))],["light",no.createElement(no.Fragment,null,no.createElement("path",{d:"M138,128a10,10,0,1,1-10-10A10,10,0,0,1,138,128ZM60,118a10,10,0,1,0,10,10A10,10,0,0,0,60,118Zm136,0a10,10,0,1,0,10,10A10,10,0,0,0,196,118Z"}))],["regular",no.createElement(no.Fragment,null,no.createElement("path",{d:"M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"}))],["thin",no.createElement(no.Fragment,null,no.createElement("path",{d:"M136,128a8,8,0,1,1-8-8A8,8,0,0,1,136,128Zm-76-8a8,8,0,1,0,8,8A8,8,0,0,0,60,120Zm136,0a8,8,0,1,0,8,8A8,8,0,0,0,196,120Z"}))]]);var Jm=Qm.forwardRef((e,t)=>Qm.createElement(ye,{ref:t,...e,weights:_8}));Jm.displayName="DotsThreeIcon";import*as ep from"react";import*as so from"react";var Z8=new Map([["bold",so.createElement(so.Fragment,null,so.createElement("path",{d:"M251,123.13c-.37-.81-9.13-20.26-28.48-39.61C196.63,57.67,164,44,128,44S59.37,57.67,33.51,83.52C14.16,102.87,5.4,122.32,5,123.13a12.08,12.08,0,0,0,0,9.75c.37.82,9.13,20.26,28.49,39.61C59.37,198.34,92,212,128,212s68.63-13.66,94.48-39.51c19.36-19.35,28.12-38.79,28.49-39.61A12.08,12.08,0,0,0,251,123.13Zm-46.06,33C183.47,177.27,157.59,188,128,188s-55.47-10.73-76.91-31.88A130.36,130.36,0,0,1,29.52,128,130.45,130.45,0,0,1,51.09,99.89C72.54,78.73,98.41,68,128,68s55.46,10.73,76.91,31.89A130.36,130.36,0,0,1,226.48,128,130.45,130.45,0,0,1,204.91,156.12ZM128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,64a20,20,0,1,1,20-20A20,20,0,0,1,128,148Z"}))],["duotone",so.createElement(so.Fragment,null,so.createElement("path",{d:"M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Zm0,112a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z",opacity:"0.2"}),so.createElement("path",{d:"M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"}))],["fill",so.createElement(so.Fragment,null,so.createElement("path",{d:"M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"}))],["light",so.createElement(so.Fragment,null,so.createElement("path",{d:"M245.48,125.57c-.34-.78-8.66-19.23-27.24-37.81C201,70.54,171.38,50,128,50S55,70.54,37.76,87.76c-18.58,18.58-26.9,37-27.24,37.81a6,6,0,0,0,0,4.88c.34.77,8.66,19.22,27.24,37.8C55,185.47,84.62,206,128,206s73-20.53,90.24-37.75c18.58-18.58,26.9-37,27.24-37.8A6,6,0,0,0,245.48,125.57ZM128,194c-31.38,0-58.78-11.42-81.45-33.93A134.77,134.77,0,0,1,22.69,128,134.56,134.56,0,0,1,46.55,95.94C69.22,73.42,96.62,62,128,62s58.78,11.42,81.45,33.94A134.56,134.56,0,0,1,233.31,128C226.94,140.21,195,194,128,194Zm0-112a46,46,0,1,0,46,46A46.06,46.06,0,0,0,128,82Zm0,80a34,34,0,1,1,34-34A34,34,0,0,1,128,162Z"}))],["regular",so.createElement(so.Fragment,null,so.createElement("path",{d:"M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"}))],["thin",so.createElement(so.Fragment,null,so.createElement("path",{d:"M243.66,126.38c-.34-.76-8.52-18.89-26.83-37.2C199.87,72.22,170.7,52,128,52S56.13,72.22,39.17,89.18c-18.31,18.31-26.49,36.44-26.83,37.2a4.08,4.08,0,0,0,0,3.25c.34.77,8.52,18.89,26.83,37.2,17,17,46.14,37.17,88.83,37.17s71.87-20.21,88.83-37.17c18.31-18.31,26.49-36.43,26.83-37.2A4.08,4.08,0,0,0,243.66,126.38Zm-32.7,35c-23.07,23-51,34.62-83,34.62s-59.89-11.65-83-34.62A135.71,135.71,0,0,1,20.44,128,135.69,135.69,0,0,1,45,94.62C68.11,71.65,96,60,128,60s59.89,11.65,83,34.62A135.79,135.79,0,0,1,235.56,128,135.71,135.71,0,0,1,211,161.38ZM128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,80a36,36,0,1,1,36-36A36,36,0,0,1,128,164Z"}))]]);var tp=ep.forwardRef((e,t)=>ep.createElement(ye,{ref:t,...e,weights:Z8}));tp.displayName="EyeIcon";import*as op from"react";import*as io from"react";var G8=new Map([["bold",io.createElement(io.Fragment,null,io.createElement("path",{d:"M56.88,31.93A12,12,0,1,0,39.12,48.07l16,17.65C20.67,88.66,5.72,121.58,5,123.13a12.08,12.08,0,0,0,0,9.75c.37.82,9.13,20.26,28.49,39.61C59.37,198.34,92,212,128,212a131.34,131.34,0,0,0,51-10l20.09,22.1a12,12,0,0,0,17.76-16.14ZM128,188c-29.59,0-55.47-10.73-76.91-31.88A130.69,130.69,0,0,1,29.52,128c5.27-9.31,18.79-29.9,42-44.29l90.09,99.11A109.33,109.33,0,0,1,128,188Zm123-55.12c-.36.81-9,20-28,39.16a12,12,0,1,1-17-16.9A130.48,130.48,0,0,0,226.48,128a130.36,130.36,0,0,0-21.57-28.12C183.46,78.73,157.59,68,128,68c-3.35,0-6.7.14-10,.42a12,12,0,1,1-2-23.91c3.93-.34,8-.51,12-.51,36,0,68.63,13.67,94.49,39.52,19.35,19.35,28.11,38.8,28.48,39.61A12.08,12.08,0,0,1,251,132.88Z"}))],["duotone",io.createElement(io.Fragment,null,io.createElement("path",{d:"M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Zm0,112a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z",opacity:"0.2"}),io.createElement("path",{d:"M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134,134,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z"}))],["fill",io.createElement(io.Fragment,null,io.createElement("path",{d:"M96.68,57.87a4,4,0,0,1,2.08-6.6A130.13,130.13,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41a8,8,0,0,1,0,6.5c-.35.79-8.82,19.57-27.65,38.4q-4.28,4.26-8.79,8.07a4,4,0,0,1-5.55-.36ZM213.92,210.62a8,8,0,1,1-11.84,10.76L180,197.13A127.21,127.21,0,0,1,128,208c-34.88,0-66.57-13.26-91.66-38.34C17.51,150.83,9,132.05,8.69,131.26a8,8,0,0,1,0-6.5C9,124,17.51,105.18,36.34,86.35a135,135,0,0,1,25-19.78L42.08,45.38A8,8,0,1,1,53.92,34.62Zm-65.49-48.25-52.69-58a40,40,0,0,0,52.69,58Z"}))],["light",io.createElement(io.Fragment,null,io.createElement("path",{d:"M52.44,36A6,6,0,0,0,43.56,44L64.44,67c-37.28,21.9-53.23,57-53.92,58.57a6,6,0,0,0,0,4.88c.34.77,8.66,19.22,27.24,37.8C55,185.47,84.62,206,128,206a124.91,124.91,0,0,0,52.57-11.25l23,25.29a6,6,0,0,0,8.88-8.08Zm48.62,71.32,45,49.52a34,34,0,0,1-45-49.52ZM128,194c-31.38,0-58.78-11.42-81.45-33.93A134.57,134.57,0,0,1,22.69,128c4.29-8.2,20.1-35.18,50-51.91L92.89,98.3a46,46,0,0,0,61.35,67.48l17.81,19.6A113.47,113.47,0,0,1,128,194Zm6.4-99.4a6,6,0,0,1,2.25-11.79,46.17,46.17,0,0,1,37.15,40.87,6,6,0,0,1-5.42,6.53l-.56,0a6,6,0,0,1-6-5.45A34.1,34.1,0,0,0,134.4,94.6Zm111.08,35.85c-.41.92-10.37,23-32.86,43.12a6,6,0,1,1-8-8.94A134.07,134.07,0,0,0,233.31,128a134.67,134.67,0,0,0-23.86-32.07C186.78,73.42,159.38,62,128,62a120.19,120.19,0,0,0-19.69,1.6,6,6,0,1,1-2-11.83A131.12,131.12,0,0,1,128,50c43.38,0,73,20.54,90.24,37.76,18.58,18.58,26.9,37,27.24,37.81A6,6,0,0,1,245.48,130.45Z"}))],["regular",io.createElement(io.Fragment,null,io.createElement("path",{d:"M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134,134,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z"}))],["thin",io.createElement(io.Fragment,null,io.createElement("path",{d:"M51,37.31A4,4,0,0,0,45,42.69L67.59,67.5C29.34,89,13,124.81,12.34,126.38a4.08,4.08,0,0,0,0,3.25c.34.77,8.52,18.89,26.83,37.2,17,17,46.14,37.17,88.83,37.17a122.59,122.59,0,0,0,53.06-11.69l24,26.38a4,4,0,1,0,5.92-5.38ZM149.1,157.16A36,36,0,0,1,101,104.22ZM128,196c-32,0-59.89-11.65-83-34.62A135.81,135.81,0,0,1,20.44,128c3.65-7.23,20.09-36.81,52.68-54.43l22.45,24.7a44,44,0,0,0,59,64.83l20.89,23A114.94,114.94,0,0,1,128,196Zm6.78-103.36a4,4,0,0,1,1.49-7.86,44.15,44.15,0,0,1,35.54,39.09,4,4,0,0,1-3.61,4.35l-.38,0a4,4,0,0,1-4-3.63A36.1,36.1,0,0,0,134.78,92.64Zm108.88,37c-.41.91-10.2,22.58-32.38,42.45a4,4,0,0,1-2.67,1,4,4,0,0,1-2.67-7A136.71,136.71,0,0,0,235.56,128,136.07,136.07,0,0,0,211,94.62C187.89,71.65,160,60,128,60a122,122,0,0,0-20,1.63,4,4,0,0,1-1.32-7.89A129.3,129.3,0,0,1,128,52c42.7,0,71.87,20.22,88.83,37.18,18.31,18.31,26.49,36.44,26.83,37.2A4.08,4.08,0,0,1,243.66,129.63Z"}))]]);var ap=op.forwardRef((e,t)=>op.createElement(ye,{ref:t,...e,weights:G8}));ap.displayName="EyeSlashIcon";import*as rp from"react";import*as lo from"react";var U8=new Map([["bold",lo.createElement(lo.Fragment,null,lo.createElement("path",{d:"M216.49,79.51l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40V216a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.51ZM183,80H160V57ZM116,212V192h8a12,12,0,0,0,0-24h-8V152h8a12,12,0,0,0,0-24h-8V116a12,12,0,0,0-24,0v12H84a12,12,0,0,0,0,24h8v16H84a12,12,0,0,0,0,24h8v20H60V44h76V92a12,12,0,0,0,12,12h48V212Z"}))],["duotone",lo.createElement(lo.Fragment,null,lo.createElement("path",{d:"M208,88H152V32Z",opacity:"0.2"}),lo.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H112V200h8a8,8,0,0,0,0-16h-8V168h8a8,8,0,0,0,0-16h-8V136h8a8,8,0,0,0,0-16h-8v-8a8,8,0,0,0-16,0v8H88a8,8,0,0,0,0,16h8v16H88a8,8,0,0,0,0,16h8v16H88a8,8,0,0,0,0,16h8v16H56V40h88V88a8,8,0,0,0,8,8h48V216Z"}))],["fill",lo.createElement(lo.Fragment,null,lo.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H92a4,4,0,0,0,4-4V208H88.27A8.17,8.17,0,0,1,80,200.53,8,8,0,0,1,88,192h8V176H88.27A8.17,8.17,0,0,1,80,168.53,8,8,0,0,1,88,160h8V144H88.27A8.17,8.17,0,0,1,80,136.53,8,8,0,0,1,88,128h8v-7.73a8.18,8.18,0,0,1,7.47-8.25,8,8,0,0,1,8.53,8v8h7.73a8.17,8.17,0,0,1,8.25,7.47,8,8,0,0,1-8,8.53h-8v16h7.73a8.17,8.17,0,0,1,8.25,7.47,8,8,0,0,1-8,8.53h-8v16h7.73a8.17,8.17,0,0,1,8.25,7.47,8,8,0,0,1-8,8.53h-8v20a4,4,0,0,0,4,4h84a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM152,88V44l44,44Z"}))],["light",lo.createElement(lo.Fragment,null,lo.createElement("path",{d:"M212.24,83.76l-56-56A6,6,0,0,0,152,26H56A14,14,0,0,0,42,40V216a14,14,0,0,0,14,14H200a14,14,0,0,0,14-14V88A6,6,0,0,0,212.24,83.76ZM158,46.48,193.52,82H158ZM200,218H110V198h10a6,6,0,0,0,0-12H110V166h10a6,6,0,0,0,0-12H110V134h10a6,6,0,0,0,0-12H110V112a6,6,0,0,0-12,0v10H88a6,6,0,0,0,0,12H98v20H88a6,6,0,0,0,0,12H98v20H88a6,6,0,0,0,0,12H98v20H56a2,2,0,0,1-2-2V40a2,2,0,0,1,2-2h90V88a6,6,0,0,0,6,6h50V216A2,2,0,0,1,200,218Z"}))],["regular",lo.createElement(lo.Fragment,null,lo.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H112V200h8a8,8,0,0,0,0-16h-8V168h8a8,8,0,0,0,0-16h-8V136h8a8,8,0,0,0,0-16h-8v-8a8,8,0,0,0-16,0v8H88a8,8,0,0,0,0,16h8v16H88a8,8,0,0,0,0,16h8v16H88a8,8,0,0,0,0,16h8v16H56V40h88V88a8,8,0,0,0,8,8h48V216Z"}))],["thin",lo.createElement(lo.Fragment,null,lo.createElement("path",{d:"M210.83,85.17l-56-56A4,4,0,0,0,152,28H56A12,12,0,0,0,44,40V216a12,12,0,0,0,12,12H200a12,12,0,0,0,12-12V88A4,4,0,0,0,210.83,85.17ZM156,41.65,198.34,84H156ZM200,220H108V196h12a4,4,0,0,0,0-8H108V164h12a4,4,0,0,0,0-8H108V132h12a4,4,0,0,0,0-8H108V112a4,4,0,0,0-8,0v12H88a4,4,0,0,0,0,8h12v24H88a4,4,0,0,0,0,8h12v24H88a4,4,0,0,0,0,8h12v24H56a4,4,0,0,1-4-4V40a4,4,0,0,1,4-4h92V88a4,4,0,0,0,4,4h52V216A4,4,0,0,1,200,220Z"}))]]);var np=rp.forwardRef((e,t)=>rp.createElement(ye,{ref:t,...e,weights:U8}));np.displayName="FileArchiveIcon";import*as sp from"react";import*as co from"react";var $8=new Map([["bold",co.createElement(co.Fragment,null,co.createElement("path",{d:"M96.59,124.91a12,12,0,0,0-13.08,2.6L63,148H44a12,12,0,0,0-12,12v40a12,12,0,0,0,12,12H63l20.48,20.48A12,12,0,0,0,104,224V136A12,12,0,0,0,96.59,124.91ZM80,195l-3.51-3.52A12,12,0,0,0,68,188H56V172H68a12,12,0,0,0,8.49-3.51L80,165Zm80-15a44.55,44.55,0,0,1-21.95,38.36A12,12,0,1,1,126,197.64a20.51,20.51,0,0,0,0-35.28,12,12,0,1,1,12.1-20.72A44.55,44.55,0,0,1,160,180ZM216.49,79.51l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40v72a12,12,0,0,0,24,0V44h76V92a12,12,0,0,0,12,12h48V212H180a12,12,0,0,0,0,24h20a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.51ZM160,57l23,23H160Z"}))],["duotone",co.createElement(co.Fragment,null,co.createElement("path",{d:"M72,160l24-24v88L72,200H48V160ZM152,32V88h56Z",opacity:"0.2"}),co.createElement("path",{d:"M99.06,128.61a8,8,0,0,0-8.72,1.73L68.69,152H48a8,8,0,0,0-8,8v40a8,8,0,0,0,8,8H68.69l21.65,21.66A8,8,0,0,0,104,224V136A8,8,0,0,0,99.06,128.61ZM88,204.69,77.66,194.34A8,8,0,0,0,72,192H56V168H72a8,8,0,0,0,5.66-2.34L88,155.31ZM152,180a40.55,40.55,0,0,1-20,34.91A8,8,0,0,1,124,201.09a24.49,24.49,0,0,0,0-42.18A8,8,0,0,1,132,145.09,40.55,40.55,0,0,1,152,180Zm61.66-97.66-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v80a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216H168a8,8,0,0,0,0,16h32a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160Z"}))],["fill",co.createElement(co.Fragment,null,co.createElement("path",{d:"M152,180a40.55,40.55,0,0,1-20,34.91A8,8,0,0,1,124,201.09a24.49,24.49,0,0,0,0-42.18A8,8,0,0,1,132,145.09,40.55,40.55,0,0,1,152,180ZM99.06,128.61a8,8,0,0,0-8.72,1.73L68.69,152H48a8,8,0,0,0-8,8v40a8,8,0,0,0,8,8H68.69l21.65,21.66A8,8,0,0,0,104,224V136A8,8,0,0,0,99.06,128.61ZM216,88V216a16,16,0,0,1-16,16H168a8,8,0,0,1,0-16h32V96H152a8,8,0,0,1-8-8V40H56v80a8,8,0,0,1-16,0V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88Zm-56-8h28.69L160,51.31Z"}))],["light",co.createElement(co.Fragment,null,co.createElement("path",{d:"M98.3,130.46a6,6,0,0,0-6.54,1.3L69.51,154H48a6,6,0,0,0-6,6v40a6,6,0,0,0,6,6H69.51l22.25,22.24A6,6,0,0,0,102,224V136A6,6,0,0,0,98.3,130.46Zm-8.3,79L76.24,195.76A6,6,0,0,0,72,194H54V166H72a6,6,0,0,0,4.24-1.76L90,150.49ZM150,180a38.53,38.53,0,0,1-19,33.18A6,6,0,0,1,125,202.82a26.5,26.5,0,0,0,0-45.64A6,6,0,0,1,131,146.82,38.53,38.53,0,0,1,150,180Zm62.24-96.24-56-56A6,6,0,0,0,152,26H56A14,14,0,0,0,42,40v80a6,6,0,0,0,12,0V40a2,2,0,0,1,2-2h90V88a6,6,0,0,0,6,6h50V216a2,2,0,0,1-2,2H168a6,6,0,0,0,0,12h32a14,14,0,0,0,14-14V88A6,6,0,0,0,212.24,83.76ZM158,46.48,193.52,82H158Z"}))],["regular",co.createElement(co.Fragment,null,co.createElement("path",{d:"M99.06,128.61a8,8,0,0,0-8.72,1.73L68.69,152H48a8,8,0,0,0-8,8v40a8,8,0,0,0,8,8H68.69l21.65,21.66A8,8,0,0,0,104,224V136A8,8,0,0,0,99.06,128.61ZM88,204.69,77.66,194.34A8,8,0,0,0,72,192H56V168H72a8,8,0,0,0,5.66-2.34L88,155.31ZM152,180a40.55,40.55,0,0,1-20,34.91A8,8,0,0,1,124,201.09a24.49,24.49,0,0,0,0-42.18A8,8,0,0,1,132,145.09,40.55,40.55,0,0,1,152,180Zm61.66-97.66-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v80a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216H168a8,8,0,0,0,0,16h32a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160Z"}))],["thin",co.createElement(co.Fragment,null,co.createElement("path",{d:"M97.53,132.3a4,4,0,0,0-4.36.87L70.34,156H48a4,4,0,0,0-4,4v40a4,4,0,0,0,4,4H70.34l22.83,22.83A4,4,0,0,0,100,224V136A4,4,0,0,0,97.53,132.3Zm-5.53,82L74.83,197.17A4,4,0,0,0,72,196H52V164H72a4,4,0,0,0,2.83-1.17L92,145.66ZM148,180a36.52,36.52,0,0,1-18,31.45,4,4,0,0,1-4-6.9,28.5,28.5,0,0,0,0-49.1,4,4,0,0,1,4-6.9A36.52,36.52,0,0,1,148,180Zm62.83-94.83-56-56A4,4,0,0,0,152,28H56A12,12,0,0,0,44,40v80a4,4,0,0,0,8,0V40a4,4,0,0,1,4-4h92V88a4,4,0,0,0,4,4h52V216a4,4,0,0,1-4,4H168a4,4,0,0,0,0,8h32a12,12,0,0,0,12-12V88A4,4,0,0,0,210.83,85.17ZM156,41.65,198.34,84H156Z"}))]]);var ip=sp.forwardRef((e,t)=>sp.createElement(ye,{ref:t,...e,weights:$8}));ip.displayName="FileAudioIcon";import*as lp from"react";import*as uo from"react";var W8=new Map([["bold",uo.createElement(uo.Fragment,null,uo.createElement("path",{d:"M216.49,79.52l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40V216a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.52ZM160,57l23,23H160ZM60,212V44h76V92a12,12,0,0,0,12,12h48V212Z"}))],["duotone",uo.createElement(uo.Fragment,null,uo.createElement("path",{d:"M208,88H152V32Z",opacity:"0.2"}),uo.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"}))],["fill",uo.createElement(uo.Fragment,null,uo.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM152,88V44l44,44Z"}))],["light",uo.createElement(uo.Fragment,null,uo.createElement("path",{d:"M212.24,83.76l-56-56A6,6,0,0,0,152,26H56A14,14,0,0,0,42,40V216a14,14,0,0,0,14,14H200a14,14,0,0,0,14-14V88A6,6,0,0,0,212.24,83.76ZM158,46.48,193.52,82H158ZM200,218H56a2,2,0,0,1-2-2V40a2,2,0,0,1,2-2h90V88a6,6,0,0,0,6,6h50V216A2,2,0,0,1,200,218Z"}))],["regular",uo.createElement(uo.Fragment,null,uo.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"}))],["thin",uo.createElement(uo.Fragment,null,uo.createElement("path",{d:"M210.83,85.17l-56-56A4,4,0,0,0,152,28H56A12,12,0,0,0,44,40V216a12,12,0,0,0,12,12H200a12,12,0,0,0,12-12V88A4,4,0,0,0,210.83,85.17ZM156,41.65,198.34,84H156ZM200,220H56a4,4,0,0,1-4-4V40a4,4,0,0,1,4-4h92V88a4,4,0,0,0,4,4h52V216A4,4,0,0,1,200,220Z"}))]]);var cp=lp.forwardRef((e,t)=>lp.createElement(ye,{ref:t,...e,weights:W8}));cp.displayName="FileIcon";import*as up from"react";import*as mo from"react";var q8=new Map([["bold",mo.createElement(mo.Fragment,null,mo.createElement("path",{d:"M180.49,143.51a12,12,0,0,1,0,17l-24,24a12,12,0,0,1-17-17L155,152l-15.52-15.51a12,12,0,1,1,17-17Zm-64-24a12,12,0,0,0-17,0l-24,24a12,12,0,0,0,0,17l24,24a12,12,0,0,0,17-17L101,152l15.52-15.51A12,12,0,0,0,116.49,119.51ZM220,88V216a20,20,0,0,1-20,20H56a20,20,0,0,1-20-20V40A20,20,0,0,1,56,20h96a12,12,0,0,1,8.49,3.52l56,56A12,12,0,0,1,220,88ZM160,57V80h23Zm36,155V104H148a12,12,0,0,1-12-12V44H60V212Z"}))],["duotone",mo.createElement(mo.Fragment,null,mo.createElement("path",{d:"M208,88H152V32Z",opacity:"0.2"}),mo.createElement("path",{d:"M181.66,146.34a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32-11.32L164.69,152l-18.35-18.34a8,8,0,0,1,11.32-11.32Zm-72-24a8,8,0,0,0-11.32,0l-24,24a8,8,0,0,0,0,11.32l24,24a8,8,0,0,0,11.32-11.32L91.31,152l18.35-18.34A8,8,0,0,0,109.66,122.34ZM216,88V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88Zm-56-8h28.69L160,51.31Zm40,136V96H152a8,8,0,0,1-8-8V40H56V216H200Z"}))],["fill",mo.createElement(mo.Fragment,null,mo.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34Zm-104,88a8,8,0,0,1-11.32,11.32l-24-24a8,8,0,0,1,0-11.32l24-24a8,8,0,0,1,11.32,11.32L91.31,152Zm72-12.68-24,24a8,8,0,0,1-11.32-11.32L164.69,152l-18.35-18.34a8,8,0,0,1,11.32-11.32l24,24A8,8,0,0,1,181.66,157.66ZM152,88V44l44,44Z"}))],["light",mo.createElement(mo.Fragment,null,mo.createElement("path",{d:"M180.24,147.76a6,6,0,0,1,0,8.48l-24,24a6,6,0,0,1-8.48-8.48L167.51,152l-19.75-19.76a6,6,0,1,1,8.48-8.48Zm-72-24a6,6,0,0,0-8.48,0l-24,24a6,6,0,0,0,0,8.48l24,24a6,6,0,1,0,8.48-8.48L88.49,152l19.75-19.76A6,6,0,0,0,108.24,123.76ZM214,88V216a14,14,0,0,1-14,14H56a14,14,0,0,1-14-14V40A14,14,0,0,1,56,26h96a6,6,0,0,1,4.25,1.76l56,56A6,6,0,0,1,214,88Zm-56-6h35.52L158,46.48Zm44,134V94H152a6,6,0,0,1-6-6V38H56a2,2,0,0,0-2,2V216a2,2,0,0,0,2,2H200A2,2,0,0,0,202,216Z"}))],["regular",mo.createElement(mo.Fragment,null,mo.createElement("path",{d:"M181.66,146.34a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32-11.32L164.69,152l-18.35-18.34a8,8,0,0,1,11.32-11.32Zm-72-24a8,8,0,0,0-11.32,0l-24,24a8,8,0,0,0,0,11.32l24,24a8,8,0,0,0,11.32-11.32L91.31,152l18.35-18.34A8,8,0,0,0,109.66,122.34ZM216,88V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88Zm-56-8h28.69L160,51.31Zm40,136V96H152a8,8,0,0,1-8-8V40H56V216H200Z"}))],["thin",mo.createElement(mo.Fragment,null,mo.createElement("path",{d:"M178.83,149.17a4,4,0,0,1,0,5.66l-24,24a4,4,0,0,1-5.66-5.66L170.34,152l-21.17-21.17a4,4,0,1,1,5.66-5.66Zm-72-24a4,4,0,0,0-5.66,0l-24,24a4,4,0,0,0,0,5.66l24,24a4,4,0,1,0,5.66-5.66L85.66,152l21.17-21.17A4,4,0,0,0,106.83,125.17ZM212,88V216a12,12,0,0,1-12,12H56a12,12,0,0,1-12-12V40A12,12,0,0,1,56,28h96a4,4,0,0,1,2.83,1.17l56,56A4,4,0,0,1,212,88Zm-56-4h42.34L156,41.65Zm48,132V92H152a4,4,0,0,1-4-4V36H56a4,4,0,0,0-4,4V216a4,4,0,0,0,4,4H200A4,4,0,0,0,204,216Z"}))]]);var dp=up.forwardRef((e,t)=>up.createElement(ye,{ref:t,...e,weights:q8}));dp.displayName="FileCodeIcon";import*as mp from"react";import*as po from"react";var j8=new Map([["bold",po.createElement(po.Fragment,null,po.createElement("path",{d:"M48,180c0,8.67,5.49,16,12,16a10.27,10.27,0,0,0,7.33-3.43,12,12,0,1,1,17.34,16.6A34,34,0,0,1,60,220C40.15,220,24,202,24,180s16.15-40,36-40a34,34,0,0,1,24.67,10.83,12,12,0,1,1-17.34,16.6A10.27,10.27,0,0,0,60,164C53.49,164,48,171.31,48,180Zm97.51-5.71c-5.13-3.45-11.33-5.24-16.8-6.82a79.5,79.5,0,0,1-7.91-2.59c2.45-1.18,9.71-1.3,16.07.33A12,12,0,0,0,143,142a69.24,69.24,0,0,0-12-1.86c-9.93-.66-18,1.08-24.1,5.17a24.45,24.45,0,0,0-10.69,17.76c-1.1,8.74,2.48,16.27,10.11,21.19,4.78,3.09,10.36,4.7,15.75,6.26,3,.89,7.94,2.3,9.88,3.53a2,2,0,0,1-.22.71c-1.36,1.55-9.57,1.79-16.39-.06a12,12,0,0,0-6.45,23.11A63.73,63.73,0,0,0,125.09,220c6.47,0,13.74-1.17,19.74-5.15a24.73,24.73,0,0,0,10.95-18C157,187.53,153.32,179.53,145.51,174.27ZM216,140.68A12,12,0,0,0,200.7,148L192,172.3,183.3,148A12,12,0,1,0,160.7,156l20,56a12,12,0,0,0,22.6,0l20-56A12,12,0,0,0,216,140.68ZM36,108V40A20,20,0,0,1,56,20h96a12,12,0,0,1,8.49,3.51l56,56A12,12,0,0,1,220,88v20a12,12,0,1,1-24,0v-4H148a12,12,0,0,1-12-12V44H60v64a12,12,0,1,1-24,0ZM160,80h23L160,57Z"}))],["duotone",po.createElement(po.Fragment,null,po.createElement("path",{d:"M208,88H152V32Z",opacity:"0.2"}),po.createElement("path",{d:"M48,180c0,11,7.18,20,16,20a14.24,14.24,0,0,0,10.22-4.66A8,8,0,0,1,85.78,206.4,30.06,30.06,0,0,1,64,216c-17.65,0-32-16.15-32-36s14.35-36,32-36a30.06,30.06,0,0,1,21.78,9.6,8,8,0,0,1-11.56,11.06A14.24,14.24,0,0,0,64,160C55.18,160,48,169,48,180Zm79.6-8.69c-4-1.16-8.14-2.35-10.45-3.84-1.25-.81-1.23-1-1.12-1.9a4.57,4.57,0,0,1,2-3.67c4.6-3.12,15.34-1.73,19.83-.56A8,8,0,0,0,142,145.86c-2.12-.55-21-5.22-32.84,2.76a20.58,20.58,0,0,0-9,14.95c-2,15.88,13.65,20.41,23,23.11,12.06,3.49,13.12,4.92,12.78,7.59-.31,2.41-1.26,3.34-2.14,3.93-4.6,3.06-15.17,1.56-19.55.36A8,8,0,0,0,109.94,214a61.34,61.34,0,0,0,15.19,2c5.82,0,12.3-1,17.49-4.46a20.82,20.82,0,0,0,9.19-15.23C154,179,137.49,174.17,127.6,171.31Zm83.09-26.84a8,8,0,0,0-10.23,4.84L188,184.21l-12.47-34.9a8,8,0,0,0-15.07,5.38l20,56a8,8,0,0,0,15.07,0l20-56A8,8,0,0,0,210.69,144.47ZM216,88v24a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88Zm-27.31-8L160,51.31V80Z"}))],["fill",po.createElement(po.Fragment,null,po.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v76a4,4,0,0,0,4,4H212a4,4,0,0,0,4-4V88A8,8,0,0,0,213.66,82.34ZM152,88V44l44,44ZM48,180c0,11,7.18,20,16,20a14.18,14.18,0,0,0,10.06-4.5,8.21,8.21,0,0,1,10.9-.91,8,8,0,0,1,.82,11.81A30.06,30.06,0,0,1,64,216c-17.64,0-32-16.15-32-36s14.36-36,32-36a30,30,0,0,1,21.39,9.19,8.26,8.26,0,0,1,.73,11.09,8,8,0,0,1-11.9.38A14.17,14.17,0,0,0,64,160C55.18,160,48,169,48,180Zm103.81,16.31a20.82,20.82,0,0,1-9.19,15.23C137.43,215,131,216,125.13,216A61.14,61.14,0,0,1,110,214a8,8,0,1,1,4.3-15.41c4.38,1.2,14.95,2.7,19.55-.36.88-.59,1.83-1.52,2.14-3.93.35-2.67-.71-4.1-12.78-7.59-9.35-2.7-25-7.23-23-23.11a20.56,20.56,0,0,1,9-14.95c11.84-8,30.71-3.31,32.83-2.76a8,8,0,0,1-4.07,15.48c-4.49-1.17-15.23-2.56-19.83.56a4.54,4.54,0,0,0-2,3.67c-.12.9-.14,1.09,1.11,1.9,2.31,1.49,6.45,2.68,10.45,3.84C137.49,174.17,154.05,179,151.81,196.31ZM215.42,155l-19.89,55.68a8,8,0,0,1-15.06,0L160.58,155a8.21,8.21,0,0,1,4.5-10.45,8,8,0,0,1,10.45,4.76L188,184.21l12.47-34.9a8,8,0,0,1,10.45-4.76A8.23,8.23,0,0,1,215.42,155Z"}))],["light",po.createElement(po.Fragment,null,po.createElement("path",{d:"M46,180c0,12.13,8.07,22,18,22a16.24,16.24,0,0,0,11.67-5.28,6,6,0,0,1,8.66,8.3A28.06,28.06,0,0,1,64,214c-16.54,0-30-15.25-30-34s13.46-34,30-34a28.06,28.06,0,0,1,20.33,9,6,6,0,0,1-8.66,8.3A16.23,16.23,0,0,0,64,158C54.07,158,46,167.86,46,180Zm81.05-6.77c-10.86-3.13-13.41-4.69-13-7.91a6.59,6.59,0,0,1,2.88-5.08c5.6-3.79,17.66-1.82,21.45-.84a6,6,0,0,0,3.06-11.6c-2-.53-20.1-5-31.21,2.48a18.61,18.61,0,0,0-8.08,13.54c-1.8,14.19,12.26,18.25,21.57,20.94,12.12,3.5,14.78,5.33,14.2,9.76a6.85,6.85,0,0,1-3,5.34c-5.61,3.73-17.48,1.64-21.19.62A6,6,0,0,0,110.48,212a59.41,59.41,0,0,0,14.68,2c5.49,0,11.54-.95,16.36-4.14a18.89,18.89,0,0,0,8.31-13.81C151.84,180.39,136.92,176.08,127.05,173.22Zm83-26.88a6,6,0,0,0-7.67,3.63L188,190.15,173.65,150a6,6,0,1,0-11.3,4l20,56a6,6,0,0,0,11.3,0l20-56A6,6,0,0,0,210,146.34ZM214,88v24a6,6,0,1,1-12,0V94H152a6,6,0,0,1-6-6V38H56a2,2,0,0,0-2,2v72a6,6,0,1,1-12,0V40A14,14,0,0,1,56,26h96a6,6,0,0,1,4.24,1.76l56,56A6,6,0,0,1,214,88Zm-20.49-6L158,46.48V82Z"}))],["regular",po.createElement(po.Fragment,null,po.createElement("path",{d:"M48,180c0,11,7.18,20,16,20a14.24,14.24,0,0,0,10.22-4.66A8,8,0,0,1,85.78,206.4,30.06,30.06,0,0,1,64,216c-17.65,0-32-16.15-32-36s14.35-36,32-36a30.06,30.06,0,0,1,21.78,9.6,8,8,0,0,1-11.56,11.06A14.24,14.24,0,0,0,64,160C55.18,160,48,169,48,180Zm79.6-8.69c-4-1.16-8.14-2.35-10.45-3.84-1.25-.81-1.23-1-1.12-1.9a4.57,4.57,0,0,1,2-3.67c4.6-3.12,15.34-1.73,19.82-.56A8,8,0,0,0,142,145.86c-2.12-.55-21-5.22-32.84,2.76a20.58,20.58,0,0,0-9,14.95c-2,15.88,13.65,20.41,23,23.11,12.06,3.49,13.12,4.92,12.78,7.59-.31,2.41-1.26,3.34-2.14,3.93-4.6,3.06-15.17,1.56-19.55.36A8,8,0,0,0,109.94,214a61.34,61.34,0,0,0,15.19,2c5.82,0,12.3-1,17.49-4.46a20.82,20.82,0,0,0,9.19-15.23C154,179,137.49,174.17,127.6,171.31Zm83.09-26.84a8,8,0,0,0-10.23,4.84L188,184.21l-12.47-34.9a8,8,0,0,0-15.07,5.38l20,56a8,8,0,0,0,15.07,0l20-56A8,8,0,0,0,210.69,144.47ZM216,88v24a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88Zm-27.31-8L160,51.31V80Z"}))],["thin",po.createElement(po.Fragment,null,po.createElement("path",{d:"M44,180c0,13.23,9,24,20,24a18.15,18.15,0,0,0,13.11-5.9,4,4,0,1,1,5.78,5.54A26.11,26.11,0,0,1,64,212c-15.44,0-28-14.36-28-32s12.56-32,28-32a26.11,26.11,0,0,1,18.89,8.36,4,4,0,1,1-5.78,5.54A18.15,18.15,0,0,0,64,156C53,156,44,166.77,44,180Zm82.49-4.85c-10.53-3-15.08-4.91-14.42-10.08a8.51,8.51,0,0,1,3.75-6.49c6.25-4.23,18.77-2.24,23.06-1.11a4,4,0,0,0,2-7.74,61.11,61.11,0,0,0-10.47-1.61c-8.12-.54-14.54.75-19.1,3.82a16.66,16.66,0,0,0-7.22,12.13c-1.58,12.49,10.46,16,20.14,18.77,11.26,3.25,16.47,5.49,15.64,11.94a8.94,8.94,0,0,1-3.91,6.75c-6.27,4.17-18.61,2.05-22.83.88a4,4,0,1,0-2.15,7.7A57.89,57.89,0,0,0,125.19,212c5.18,0,10.83-.86,15.22-3.77a17,17,0,0,0,7.43-12.41C149.64,181.84,136.26,178,126.49,175.15Zm82.85-26.92a4,4,0,0,0-5.11,2.42L188,196.11l-16.23-45.46a4,4,0,1,0-7.54,2.7l20,56a4,4,0,0,0,7.54,0l20-56A4,4,0,0,0,209.34,148.23ZM212,88v24a4,4,0,0,1-8,0V92H152a4,4,0,0,1-4-4V36H56a4,4,0,0,0-4,4v72a4,4,0,0,1-8,0V40A12,12,0,0,1,56,28h96a4,4,0,0,1,2.83,1.17l56,56A4,4,0,0,1,212,88Zm-13.66-4L156,41.65V84Z"}))]]);var pp=mp.forwardRef((e,t)=>mp.createElement(ye,{ref:t,...e,weights:j8}));pp.displayName="FileCsvIcon";import*as fp from"react";import*as fo from"react";var K8=new Map([["bold",fo.createElement(fo.Fragment,null,fo.createElement("path",{d:"M114,145.34a12,12,0,0,0-20,0L79,167.82,72.3,157.73a12,12,0,0,0-20.07.17L13.91,217.51A12,12,0,0,0,24,236H152a12,12,0,0,0,10-18.66ZM46,212,62.5,186.3l6.55,9.81a12,12,0,0,0,20,0l15-22.48L129.58,212ZM216.49,79.51l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40v84a12,12,0,0,0,24,0V44h76V92a12,12,0,0,0,12,12h48V212a12,12,0,0,0,0,24h4a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.51ZM160,57l23,23H160Z"}))],["duotone",fo.createElement(fo.Fragment,null,fo.createElement("path",{d:"M104,152l48,72H24l36-56,16.36,25.45ZM152,32V88h56Z",opacity:"0.2"}),fo.createElement("path",{d:"M110.66,147.56a8,8,0,0,0-13.32,0L76.49,178.85l-9.76-15.18a8,8,0,0,0-13.46,0l-36,56A8,8,0,0,0,24,232H152a8,8,0,0,0,6.66-12.44ZM38.65,216,60,182.79l9.63,15a8,8,0,0,0,13.39.11l21-31.47L137.05,216Zm175-133.66-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v88a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216h-8a8,8,0,0,0,0,16h8a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160Z"}))],["fill",fo.createElement(fo.Fragment,null,fo.createElement("path",{d:"M158.66,219.56A8,8,0,0,1,152,232H24a8,8,0,0,1-6.73-12.33l36-56a8,8,0,0,1,13.46,0l9.76,15.18,20.85-31.29a8,8,0,0,1,13.32,0ZM216,88V216a16,16,0,0,1-16,16h-8a8,8,0,0,1,0-16h8V96H152a8,8,0,0,1-8-8V40H56v88a8,8,0,0,1-16,0V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88Zm-56-8h28.69L160,51.31Z"}))],["light",fo.createElement(fo.Fragment,null,fo.createElement("path",{d:"M109,148.67a6,6,0,0,0-10,0L76.46,182.5,65.05,164.76a6,6,0,0,0-10.1,0l-36,56A6,6,0,0,0,24,230H152a6,6,0,0,0,5-9.33ZM35,218l25-38.9,11.32,17.6a6,6,0,0,0,10,.08l22.64-34L140.79,218ZM212.24,83.76l-56-56A6,6,0,0,0,152,26H56A14,14,0,0,0,42,40v88a6,6,0,0,0,12,0V40a2,2,0,0,1,2-2h90V88a6,6,0,0,0,6,6h50V216a2,2,0,0,1-2,2h-8a6,6,0,0,0,0,12h8a14,14,0,0,0,14-14V88A6,6,0,0,0,212.24,83.76ZM158,46.48,193.52,82H158Z"}))],["regular",fo.createElement(fo.Fragment,null,fo.createElement("path",{d:"M110.66,147.56a8,8,0,0,0-13.32,0L76.49,178.85l-9.76-15.18a8,8,0,0,0-13.46,0l-36,56A8,8,0,0,0,24,232H152a8,8,0,0,0,6.66-12.44ZM38.65,216,60,182.79l9.63,15a8,8,0,0,0,13.39.11l21-31.47L137.05,216Zm175-133.66-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v88a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216h-8a8,8,0,0,0,0,16h8a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160Z"}))],["thin",fo.createElement(fo.Fragment,null,fo.createElement("path",{d:"M107.33,149.78a4,4,0,0,0-6.66,0L76.42,186.15,63.36,165.84a4,4,0,0,0-6.72,0l-36,56A4,4,0,0,0,24,228H152a4,4,0,0,0,3.33-6.22ZM31.33,220,60,175.4l13,20.22a4,4,0,0,0,3.33,1.83,3.93,3.93,0,0,0,3.36-1.78L104,159.21,144.53,220ZM210.83,85.17l-56-56A4,4,0,0,0,152,28H56A12,12,0,0,0,44,40v88a4,4,0,0,0,8,0V40a4,4,0,0,1,4-4h92V88a4,4,0,0,0,4,4h52V216a4,4,0,0,1-4,4h-8a4,4,0,0,0,0,8h8a12,12,0,0,0,12-12V88A4,4,0,0,0,210.83,85.17ZM156,41.65,198.34,84H156Z"}))]]);var gp=fp.forwardRef((e,t)=>fp.createElement(ye,{ref:t,...e,weights:K8}));gp.displayName="FileImageIcon";import*as hp from"react";import*as go from"react";var Y8=new Map([["bold",go.createElement(go.Fragment,null,go.createElement("path",{d:"M216.49,79.52l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40V216a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.52ZM160,57l23,23H160ZM60,212V44h76V92a12,12,0,0,0,12,12h48V212Zm112-80a12,12,0,0,1-12,12H96a12,12,0,0,1,0-24h64A12,12,0,0,1,172,132Zm0,40a12,12,0,0,1-12,12H96a12,12,0,0,1,0-24h64A12,12,0,0,1,172,172Z"}))],["duotone",go.createElement(go.Fragment,null,go.createElement("path",{d:"M208,88H152V32Z",opacity:"0.2"}),go.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"}))],["fill",go.createElement(go.Fragment,null,go.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,176H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm-8-56V44l44,44Z"}))],["light",go.createElement(go.Fragment,null,go.createElement("path",{d:"M212.24,83.76l-56-56A6,6,0,0,0,152,26H56A14,14,0,0,0,42,40V216a14,14,0,0,0,14,14H200a14,14,0,0,0,14-14V88A6,6,0,0,0,212.24,83.76ZM158,46.48,193.52,82H158ZM200,218H56a2,2,0,0,1-2-2V40a2,2,0,0,1,2-2h90V88a6,6,0,0,0,6,6h50V216A2,2,0,0,1,200,218Zm-34-82a6,6,0,0,1-6,6H96a6,6,0,0,1,0-12h64A6,6,0,0,1,166,136Zm0,32a6,6,0,0,1-6,6H96a6,6,0,0,1,0-12h64A6,6,0,0,1,166,168Z"}))],["regular",go.createElement(go.Fragment,null,go.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"}))],["thin",go.createElement(go.Fragment,null,go.createElement("path",{d:"M210.83,85.17l-56-56A4,4,0,0,0,152,28H56A12,12,0,0,0,44,40V216a12,12,0,0,0,12,12H200a12,12,0,0,0,12-12V88A4,4,0,0,0,210.83,85.17ZM156,41.65,198.34,84H156ZM200,220H56a4,4,0,0,1-4-4V40a4,4,0,0,1,4-4h92V88a4,4,0,0,0,4,4h52V216A4,4,0,0,1,200,220Zm-36-84a4,4,0,0,1-4,4H96a4,4,0,0,1,0-8h64A4,4,0,0,1,164,136Zm0,32a4,4,0,0,1-4,4H96a4,4,0,0,1,0-8h64A4,4,0,0,1,164,168Z"}))]]);var bp=hp.forwardRef((e,t)=>hp.createElement(ye,{ref:t,...e,weights:Y8}));bp.displayName="FileTextIcon";import*as yp from"react";import*as ho from"react";var X8=new Map([["bold",ho.createElement(ho.Fragment,null,ho.createElement("path",{d:"M216.49,79.51l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40v68a12,12,0,0,0,24,0V44h76V92a12,12,0,0,0,12,12h48V212a12,12,0,0,0,0,24h4a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.51ZM160,57l23,23H160Zm-1.91,84.69a12,12,0,0,0-11.92-.15L126.5,152.44A20,20,0,0,0,108,140H48a20,20,0,0,0-20,20v48a20,20,0,0,0,20,20h60a20,20,0,0,0,18.5-12.44l19.67,10.93A12,12,0,0,0,164,216V152A12,12,0,0,0,158.09,141.66ZM104,204H52V164h52Zm36-8.39-12-6.67v-9.88l12-6.67Z"}))],["duotone",ho.createElement(ho.Fragment,null,ho.createElement("path",{d:"M208,88H152V32Zm-88,72a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v48a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V196l32,20V152l-32,20Z",opacity:"0.2"}),ho.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v72a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216h-8a8,8,0,0,0,0,16h8a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM155.88,145a8,8,0,0,0-8.12.22l-19.95,12.46A16,16,0,0,0,112,144H48a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h64a16,16,0,0,0,15.81-13.68l19.95,12.46A8,8,0,0,0,160,216V152A8,8,0,0,0,155.88,145ZM112,208H48V160h64v48Zm32-6.43-16-10V176.43l16-10Z"}))],["fill",ho.createElement(ho.Fragment,null,ho.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v72a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216h-8a8,8,0,0,0,0,16h8a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM155.88,145a8,8,0,0,0-8.12.22l-19.95,12.46A16,16,0,0,0,112,144H48a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h64a16,16,0,0,0,15.81-13.68l19.95,12.46A8,8,0,0,0,160,216V152A8,8,0,0,0,155.88,145ZM144,201.57l-16-10V176.43l16-10Z"}))],["light",ho.createElement(ho.Fragment,null,ho.createElement("path",{d:"M212.24,83.76l-56-56A6,6,0,0,0,152,26H56A14,14,0,0,0,42,40v72a6,6,0,0,0,12,0V40a2,2,0,0,1,2-2h90V88a6,6,0,0,0,6,6h50V216a2,2,0,0,1-2,2h-8a6,6,0,0,0,0,12h8a14,14,0,0,0,14-14V88A6,6,0,0,0,212.24,83.76ZM158,46.48,193.52,82H158Zm-3.09,100.27a6,6,0,0,0-6.09.16L126,161.17V160a14,14,0,0,0-14-14H48a14,14,0,0,0-14,14v48a14,14,0,0,0,14,14h64a14,14,0,0,0,14-14v-1.17l22.82,14.26A6,6,0,0,0,158,216V152A6,6,0,0,0,154.91,146.75ZM114,208a2,2,0,0,1-2,2H48a2,2,0,0,1-2-2V160a2,2,0,0,1,2-2h64a2,2,0,0,1,2,2Zm32-2.83-20-12.5V175.33l20-12.5Z"}))],["regular",ho.createElement(ho.Fragment,null,ho.createElement("path",{d:"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v72a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216h-8a8,8,0,0,0,0,16h8a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM155.88,145a8,8,0,0,0-8.12.22l-19.95,12.46A16,16,0,0,0,112,144H48a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h64a16,16,0,0,0,15.81-13.68l19.95,12.46A8,8,0,0,0,160,216V152A8,8,0,0,0,155.88,145ZM112,208H48V160h64v48Zm32-6.43-16-10V176.43l16-10Z"}))],["thin",ho.createElement(ho.Fragment,null,ho.createElement("path",{d:"M210.83,85.17l-56-56A4,4,0,0,0,152,28H56A12,12,0,0,0,44,40v72a4,4,0,0,0,8,0V40a4,4,0,0,1,4-4h92V88a4,4,0,0,0,4,4h52V216a4,4,0,0,1-4,4h-8a4,4,0,0,0,0,8h8a12,12,0,0,0,12-12V88A4,4,0,0,0,210.83,85.17ZM156,41.65,198.34,84H156ZM153.94,148.5a4,4,0,0,0-4.06.11L124,164.78V160a12,12,0,0,0-12-12H48a12,12,0,0,0-12,12v48a12,12,0,0,0,12,12h64a12,12,0,0,0,12-12v-4.78l25.88,16.17A4,4,0,0,0,152,220a4.06,4.06,0,0,0,1.94-.5A4,4,0,0,0,156,216V152A4,4,0,0,0,153.94,148.5ZM116,208a4,4,0,0,1-4,4H48a4,4,0,0,1-4-4V160a4,4,0,0,1,4-4h64a4,4,0,0,1,4,4Zm32,.78-24-15V174.22l24-15Z"}))]]);var wp=yp.forwardRef((e,t)=>yp.createElement(ye,{ref:t,...e,weights:X8}));wp.displayName="FileVideoIcon";import*as vp from"react";import*as bo from"react";var Q8=new Map([["bold",bo.createElement(bo.Fragment,null,bo.createElement("path",{d:"M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,187a113.4,113.4,0,0,1-20.39-35h40.82a116.94,116.94,0,0,1-10,20.77A108.61,108.61,0,0,1,128,207Zm-26.49-59a135.42,135.42,0,0,1,0-40h53a135.42,135.42,0,0,1,0,40ZM44,128a83.49,83.49,0,0,1,2.43-20H77.25a160.63,160.63,0,0,0,0,40H46.43A83.49,83.49,0,0,1,44,128Zm84-79a113.4,113.4,0,0,1,20.39,35H107.59a116.94,116.94,0,0,1,10-20.77A108.61,108.61,0,0,1,128,49Zm50.73,59h30.82a83.52,83.52,0,0,1,0,40H178.75a160.63,160.63,0,0,0,0-40Zm20.77-24H173.71a140.82,140.82,0,0,0-15.5-34.36A84.51,84.51,0,0,1,199.52,84ZM97.79,49.64A140.82,140.82,0,0,0,82.29,84H56.48A84.51,84.51,0,0,1,97.79,49.64ZM56.48,172H82.29a140.82,140.82,0,0,0,15.5,34.36A84.51,84.51,0,0,1,56.48,172Zm101.73,34.36A140.82,140.82,0,0,0,173.71,172h25.81A84.51,84.51,0,0,1,158.21,206.36Z"}))],["duotone",bo.createElement(bo.Fragment,null,bo.createElement("path",{d:"M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z",opacity:"0.2"}),bo.createElement("path",{d:"M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z"}))],["fill",bo.createElement(bo.Fragment,null,bo.createElement("path",{d:"M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm78.36,64H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM216,128a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM128,43a115.27,115.27,0,0,1,26,45H102A115.11,115.11,0,0,1,128,43ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48Zm50.35,61.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z"}))],["light",bo.createElement(bo.Fragment,null,bo.createElement("path",{d:"M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm81.57,64H169.19a132.58,132.58,0,0,0-25.73-50.67A90.29,90.29,0,0,1,209.57,90ZM218,128a89.7,89.7,0,0,1-3.83,26H171.81a155.43,155.43,0,0,0,0-52h42.36A89.7,89.7,0,0,1,218,128Zm-90,87.83a110,110,0,0,1-15.19-19.45A124.24,124.24,0,0,1,99.35,166h57.3a124.24,124.24,0,0,1-13.46,30.38A110,110,0,0,1,128,215.83ZM96.45,154a139.18,139.18,0,0,1,0-52h63.1a139.18,139.18,0,0,1,0,52ZM38,128a89.7,89.7,0,0,1,3.83-26H84.19a155.43,155.43,0,0,0,0,52H41.83A89.7,89.7,0,0,1,38,128Zm90-87.83a110,110,0,0,1,15.19,19.45A124.24,124.24,0,0,1,156.65,90H99.35a124.24,124.24,0,0,1,13.46-30.38A110,110,0,0,1,128,40.17Zm-15.46-.84A132.58,132.58,0,0,0,86.81,90H46.43A90.29,90.29,0,0,1,112.54,39.33ZM46.43,166H86.81a132.58,132.58,0,0,0,25.73,50.67A90.29,90.29,0,0,1,46.43,166Zm97,50.67A132.58,132.58,0,0,0,169.19,166h40.38A90.29,90.29,0,0,1,143.46,216.67Z"}))],["regular",bo.createElement(bo.Fragment,null,bo.createElement("path",{d:"M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z"}))],["thin",bo.createElement(bo.Fragment,null,bo.createElement("path",{d:"M128,28h0A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm0,190.61c-6.33-6.09-23-24.41-31.27-54.61h62.54C151,194.2,134.33,212.52,128,218.61ZM94.82,156a140.42,140.42,0,0,1,0-56h66.36a140.42,140.42,0,0,1,0,56ZM128,37.39c6.33,6.09,23,24.41,31.27,54.61H96.73C105,61.8,121.67,43.48,128,37.39ZM169.41,100h46.23a92.09,92.09,0,0,1,0,56H169.41a152.65,152.65,0,0,0,0-56Zm43.25-8h-45a129.39,129.39,0,0,0-29.19-55.4A92.25,92.25,0,0,1,212.66,92ZM117.54,36.6A129.39,129.39,0,0,0,88.35,92h-45A92.25,92.25,0,0,1,117.54,36.6ZM40.36,100H86.59a152.65,152.65,0,0,0,0,56H40.36a92.09,92.09,0,0,1,0-56Zm3,64h45a129.39,129.39,0,0,0,29.19,55.4A92.25,92.25,0,0,1,43.34,164Zm95.12,55.4A129.39,129.39,0,0,0,167.65,164h45A92.25,92.25,0,0,1,138.46,219.4Z"}))]]);var xp=vp.forwardRef((e,t)=>vp.createElement(ye,{ref:t,...e,weights:Q8}));xp.displayName="GlobeIcon";import*as Ip from"react";import*as yo from"react";var J8=new Map([["bold",yo.createElement(yo.Fragment,null,yo.createElement("path",{d:"M214,193.68,145.35,128,214,62.32l.18-.18A20,20,0,0,0,200,28H56A20,20,0,0,0,41.87,62.14l.18.18L110.65,128l-68.6,65.68-.18.18A20,20,0,0,0,56,228H200a20,20,0,0,0,14.14-34.14ZM107.75,92h40.5L128,111.39ZM190,52,173.31,68H82.69L66,52ZM66,204l50-47.9V168a12,12,0,0,0,24,0V156.1L190,204Z"}))],["duotone",yo.createElement(yo.Fragment,null,yo.createElement("path",{d:"M178.13,80,128,128,77.87,80Z",opacity:"0.2"}),yo.createElement("path",{d:"M211.18,196.56,139.57,128l71.61-68.56a1.59,1.59,0,0,1,.13-.13A16,16,0,0,0,200,32H56A16,16,0,0,0,44.69,59.31a1.59,1.59,0,0,1,.13.13L116.43,128,44.82,196.56a1.59,1.59,0,0,1-.13.13A16,16,0,0,0,56,224H200a16,16,0,0,0,11.32-27.31A1.59,1.59,0,0,1,211.18,196.56ZM56,48h0v0ZM97.79,88h60.42L128,116.92ZM200,48,174.92,72H81.08L56,48ZM56,208l64-61.26V168a8,8,0,0,0,16,0V146.74L200,208Z"}))],["fill",yo.createElement(yo.Fragment,null,yo.createElement("path",{d:"M211.18,196.56,139.57,128l71.61-68.56a1.59,1.59,0,0,1,.13-.13A16,16,0,0,0,200,32H56A16,16,0,0,0,44.69,59.31a1.59,1.59,0,0,1,.13.13L116.43,128,44.82,196.56a1.59,1.59,0,0,1-.13.13A16,16,0,0,0,56,224H200a16,16,0,0,0,11.32-27.31A1.59,1.59,0,0,1,211.18,196.56ZM56,48h0v0Zm144,0L174.92,72H81.08L56,48ZM56,208l64-61.26V168a8,8,0,0,0,16,0V146.74L200,208Z"}))],["light",yo.createElement(yo.Fragment,null,yo.createElement("path",{d:"M209.8,198l-73.12-70L209.8,58l.09-.09A14,14,0,0,0,200,34H56a14,14,0,0,0-9.9,23.9l.09.09,73.12,70L46.2,198l-.09.09A14,14,0,0,0,56,222H200a14,14,0,0,0,9.9-23.9ZM92.81,86h70.38L128,119.69ZM54.16,47.23A1.91,1.91,0,0,1,56,46H200a2,2,0,0,1,1.45,3.38L175.72,74H80.28L54.56,49.38A1.91,1.91,0,0,1,54.16,47.23ZM201.84,208.77A1.91,1.91,0,0,1,200,210H56a2,2,0,0,1-1.45-3.38L122,142.05V168a6,6,0,0,0,12,0V142.05l67.44,64.57A1.91,1.91,0,0,1,201.84,208.77Z"}))],["regular",yo.createElement(yo.Fragment,null,yo.createElement("path",{d:"M211.18,196.56,139.57,128l71.61-68.56a1.59,1.59,0,0,1,.13-.13A16,16,0,0,0,200,32H56A16,16,0,0,0,44.7,59.31l.12.13L116.43,128,44.82,196.56l-.12.13A16,16,0,0,0,56,224H200a16,16,0,0,0,11.32-27.31A1.59,1.59,0,0,1,211.18,196.56ZM56,48h0v0ZM97.79,88h60.42L128,116.92ZM200,48,174.92,72H81.08L56,48ZM56,208l64-61.26V168a8,8,0,0,0,16,0V146.74L200,208Z"}))],["thin",yo.createElement(yo.Fragment,null,yo.createElement("path",{d:"M133.78,128l74.68-71.51A12,12,0,0,0,200,36H56a12,12,0,0,0-8.49,20.49l.07.06L122.22,128,47.61,199.45l-.07.06A12,12,0,0,0,56,220H200a12,12,0,0,0,8.42-20.55ZM87.84,84h80.32L128,122.46ZM52.33,46.47A3.93,3.93,0,0,1,56,44H200a4,4,0,0,1,2.89,6.77L176.51,76h-97L53.17,50.8A3.92,3.92,0,0,1,52.33,46.47ZM203.67,209.53A3.93,3.93,0,0,1,200,212H56a4,4,0,0,1-2.86-6.8L124,137.37V168a4,4,0,0,0,8,0V137.37l70.8,67.8A3.93,3.93,0,0,1,203.67,209.53Z"}))]]);var Cp=Ip.forwardRef((e,t)=>Ip.createElement(ye,{ref:t,...e,weights:J8}));Cp.displayName="HourglassSimpleMediumIcon";import*as Rp from"react";import*as wo from"react";var e6=new Map([["bold",wo.createElement(wo.Fragment,null,wo.createElement("path",{d:"M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"}))],["duotone",wo.createElement(wo.Fragment,null,wo.createElement("path",{d:"M192,112a80,80,0,1,1-80-80A80,80,0,0,1,192,112Z",opacity:"0.2"}),wo.createElement("path",{d:"M229.66,218.34,179.6,168.28a88.21,88.21,0,1,0-11.32,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"}))],["fill",wo.createElement(wo.Fragment,null,wo.createElement("path",{d:"M168,112a56,56,0,1,1-56-56A56,56,0,0,1,168,112Zm61.66,117.66a8,8,0,0,1-11.32,0l-50.06-50.07a88,88,0,1,1,11.32-11.31l50.06,50.06A8,8,0,0,1,229.66,229.66ZM112,184a72,72,0,1,0-72-72A72.08,72.08,0,0,0,112,184Z"}))],["light",wo.createElement(wo.Fragment,null,wo.createElement("path",{d:"M228.24,219.76l-51.38-51.38a86.15,86.15,0,1,0-8.48,8.48l51.38,51.38a6,6,0,0,0,8.48-8.48ZM38,112a74,74,0,1,1,74,74A74.09,74.09,0,0,1,38,112Z"}))],["regular",wo.createElement(wo.Fragment,null,wo.createElement("path",{d:"M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"}))],["thin",wo.createElement(wo.Fragment,null,wo.createElement("path",{d:"M226.83,221.17l-52.7-52.7a84.1,84.1,0,1,0-5.66,5.66l52.7,52.7a4,4,0,0,0,5.66-5.66ZM36,112a76,76,0,1,1,76,76A76.08,76.08,0,0,1,36,112Z"}))]]);var Fc=Rp.forwardRef((e,t)=>Rp.createElement(ye,{ref:t,...e,weights:e6}));Fc.displayName="MagnifyingGlassIcon";import*as Sp from"react";import*as vo from"react";var t6=new Map([["bold",vo.createElement(vo.Fragment,null,vo.createElement("path",{d:"M128,180a52.06,52.06,0,0,0,52-52V64A52,52,0,0,0,76,64v64A52.06,52.06,0,0,0,128,180ZM100,64a28,28,0,0,1,56,0v64a28,28,0,0,1-56,0Zm40,155.22V240a12,12,0,0,1-24,0V219.22A92.14,92.14,0,0,1,36,128a12,12,0,0,1,24,0,68,68,0,0,0,136,0,12,12,0,0,1,24,0A92.14,92.14,0,0,1,140,219.22Z"}))],["duotone",vo.createElement(vo.Fragment,null,vo.createElement("path",{d:"M168,64v64a40,40,0,0,1-40,40h0a40,40,0,0,1-40-40V64a40,40,0,0,1,40-40h0A40,40,0,0,1,168,64Z",opacity:"0.2"}),vo.createElement("path",{d:"M128,176a48.05,48.05,0,0,0,48-48V64a48,48,0,0,0-96,0v64A48.05,48.05,0,0,0,128,176ZM96,64a32,32,0,0,1,64,0v64a32,32,0,0,1-64,0Zm40,143.6V240a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64,64,0,0,0,128,0,8,8,0,0,1,16,0A80.11,80.11,0,0,1,136,207.6Z"}))],["fill",vo.createElement(vo.Fragment,null,vo.createElement("path",{d:"M80,128V64a48,48,0,0,1,96,0v64a48,48,0,0,1-96,0Zm128,0a8,8,0,0,0-16,0,64,64,0,0,1-128,0,8,8,0,0,0-16,0,80.11,80.11,0,0,0,72,79.6V240a8,8,0,0,0,16,0V207.6A80.11,80.11,0,0,0,208,128Z"}))],["light",vo.createElement(vo.Fragment,null,vo.createElement("path",{d:"M128,174a46.06,46.06,0,0,0,46-46V64a46,46,0,0,0-92,0v64A46.06,46.06,0,0,0,128,174ZM94,64a34,34,0,0,1,68,0v64a34,34,0,0,1-68,0Zm40,141.75V240a6,6,0,0,1-12,0V205.75A78.09,78.09,0,0,1,50,128a6,6,0,0,1,12,0,66,66,0,0,0,132,0,6,6,0,0,1,12,0A78.09,78.09,0,0,1,134,205.75Z"}))],["regular",vo.createElement(vo.Fragment,null,vo.createElement("path",{d:"M128,176a48.05,48.05,0,0,0,48-48V64a48,48,0,0,0-96,0v64A48.05,48.05,0,0,0,128,176ZM96,64a32,32,0,0,1,64,0v64a32,32,0,0,1-64,0Zm40,143.6V240a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64,64,0,0,0,128,0,8,8,0,0,1,16,0A80.11,80.11,0,0,1,136,207.6Z"}))],["thin",vo.createElement(vo.Fragment,null,vo.createElement("path",{d:"M128,172a44.05,44.05,0,0,0,44-44V64a44,44,0,0,0-88,0v64A44.05,44.05,0,0,0,128,172ZM92,64a36,36,0,0,1,72,0v64a36,36,0,0,1-72,0Zm40,139.89V240a4,4,0,0,1-8,0V203.89A76.09,76.09,0,0,1,52,128a4,4,0,0,1,8,0,68,68,0,0,0,136,0,4,4,0,0,1,8,0A76.09,76.09,0,0,1,132,203.89Z"}))]]);var Ep=Sp.forwardRef((e,t)=>Sp.createElement(ye,{ref:t,...e,weights:t6}));Ep.displayName="MicrophoneIcon";import*as Tp from"react";import*as xo from"react";var o6=new Map([["bold",xo.createElement(xo.Fragment,null,xo.createElement("path",{d:"M56.88,39.93A12,12,0,1,0,39.12,56.07L76,96.64V128a52,52,0,0,0,72.11,48l11.26,12.39A67.34,67.34,0,0,1,128,196a68.07,68.07,0,0,1-68-68,12,12,0,0,0-24,0,92.14,92.14,0,0,0,80,91.22V240a12,12,0,0,0,24,0V219.23a90.39,90.39,0,0,0,35.92-12.68l23.2,25.52a12,12,0,0,0,17.76-16.14ZM128,156a28,28,0,0,1-28-28v-5l29.9,32.89C129.27,156,128.64,156,128,156Zm63-2.42A67.63,67.63,0,0,0,196,128a12,12,0,0,1,24,0,91.48,91.48,0,0,1-6.74,34.61,12,12,0,0,1-22.23-9ZM85.7,33.75A52,52,0,0,1,180,64v56.54a12,12,0,0,1-24,0V64a28,28,0,0,0-50.79-16.28,12,12,0,0,1-19.51-14Z"}))],["duotone",xo.createElement(xo.Fragment,null,xo.createElement("path",{d:"M168,64v64a40,40,0,0,1-40,40h0a40,40,0,0,1-40-40V64a40,40,0,0,1,40-40h0A40,40,0,0,1,168,64Z",opacity:"0.2"}),xo.createElement("path",{d:"M213.92,218.62l-160-176A8,8,0,0,0,42.08,53.38L80,95.09V128a48,48,0,0,0,69.11,43.12l11.1,12.2A63.41,63.41,0,0,1,128,192a64.07,64.07,0,0,1-64-64,8,8,0,0,0-16,0,80.11,80.11,0,0,0,72,79.6V240a8,8,0,0,0,16,0V207.59a78.83,78.83,0,0,0,35.16-12.22l30.92,34a8,8,0,1,0,11.84-10.76ZM128,160a32,32,0,0,1-32-32V112.69l41.66,45.82A32,32,0,0,1,128,160Zm57.52-3.91A63.32,63.32,0,0,0,192,128a8,8,0,0,1,16,0,79.16,79.16,0,0,1-8.11,35.12,8,8,0,0,1-7.19,4.49,7.88,7.88,0,0,1-3.51-.82A8,8,0,0,1,185.52,156.09ZM84,44.87A48,48,0,0,1,176,64v64a49.19,49.19,0,0,1-.26,5,8,8,0,0,1-8,7.17,8.13,8.13,0,0,1-.84,0,8,8,0,0,1-7.12-8.79c.11-1.1.17-2.24.17-3.36V64A32,32,0,0,0,98.64,51.25,8,8,0,1,1,84,44.87Z"}))],["fill",xo.createElement(xo.Fragment,null,xo.createElement("path",{d:"M213.38,229.92a8,8,0,0,1-11.3-.54l-30.92-34A78.83,78.83,0,0,1,136,207.59V240a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64.07,64.07,0,0,0,64,64,63.41,63.41,0,0,0,32.21-8.68l-11.1-12.2A48,48,0,0,1,80,128V95.09L42.08,53.38A8,8,0,0,1,53.92,42.62l160,176A8,8,0,0,1,213.38,229.92Zm-24.19-63.13a7.88,7.88,0,0,0,3.51.82,8,8,0,0,0,7.19-4.49A79.16,79.16,0,0,0,208,128a8,8,0,0,0-16,0,63.32,63.32,0,0,1-6.48,28.09A8,8,0,0,0,189.19,166.79Zm-27.33-29.22A8,8,0,0,0,175.74,133a49.49,49.49,0,0,0,.26-5V64A48,48,0,0,0,84,44.87a8,8,0,0,0,1.41,8.57Z"}))],["light",xo.createElement(xo.Fragment,null,xo.createElement("path",{d:"M212.44,220,52.44,44A6,6,0,0,0,43.56,52L82,94.32V128a46,46,0,0,0,67.56,40.64l13.75,15.12A65.26,65.26,0,0,1,128,194a66.08,66.08,0,0,1-66-66,6,6,0,0,0-12,0,78.09,78.09,0,0,0,72,77.75V240a6,6,0,0,0,12,0V205.77a76.93,76.93,0,0,0,37.48-13L203.56,228a6,6,0,0,0,8.88-8.08ZM128,162a34,34,0,0,1-34-34V107.52l47.12,51.84A33.82,33.82,0,0,1,128,162Zm59.32-5A65.38,65.38,0,0,0,194,128a6,6,0,0,1,12,0,77.33,77.33,0,0,1-7.9,34.25A6,6,0,1,1,187.32,157ZM85.8,45.67A46,46,0,0,1,174,64v64a45.17,45.17,0,0,1-.25,4.81,6,6,0,0,1-6,5.38q-.31,0-.63,0a6,6,0,0,1-5.34-6.59A35.41,35.41,0,0,0,162,128V64A34,34,0,0,0,96.8,50.45a6,6,0,0,1-11-4.78Z"}))],["regular",xo.createElement(xo.Fragment,null,xo.createElement("path",{d:"M213.92,218.62l-160-176A8,8,0,0,0,42.08,53.38L80,95.09V128a48,48,0,0,0,69.11,43.12l11.1,12.2A63.41,63.41,0,0,1,128,192a64.07,64.07,0,0,1-64-64,8,8,0,0,0-16,0,80.11,80.11,0,0,0,72,79.6V240a8,8,0,0,0,16,0V207.59a78.83,78.83,0,0,0,35.16-12.22l30.92,34a8,8,0,1,0,11.84-10.76ZM128,160a32,32,0,0,1-32-32V112.69l41.66,45.82A32,32,0,0,1,128,160Zm57.52-3.91A63.32,63.32,0,0,0,192,128a8,8,0,0,1,16,0,79.16,79.16,0,0,1-8.11,35.12,8,8,0,0,1-7.19,4.49,7.88,7.88,0,0,1-3.51-.82A8,8,0,0,1,185.52,156.09ZM84,44.87A48,48,0,0,1,176,64v64a49.19,49.19,0,0,1-.26,5,8,8,0,0,1-8,7.17,8.13,8.13,0,0,1-.84,0,8,8,0,0,1-7.12-8.79c.11-1.1.17-2.24.17-3.36V64A32,32,0,0,0,98.64,51.25,8,8,0,1,1,84,44.87Z"}))],["thin",xo.createElement(xo.Fragment,null,xo.createElement("path",{d:"M211,221.31,51,45.31A4,4,0,0,0,45,50.69L84,93.55V128a44,44,0,0,0,66,38.12l16.38,18A67.21,67.21,0,0,1,128,196a68.07,68.07,0,0,1-68-68,4,4,0,0,0-8,0,76.09,76.09,0,0,0,72,75.89V240a4,4,0,0,0,8,0V203.89a75.1,75.1,0,0,0,39.79-13.77L205,226.69a4,4,0,1,0,5.92-5.38ZM128,164a36,36,0,0,1-36-36V102.35L144.43,160A35.83,35.83,0,0,1,128,164Zm61.12-6.15A67.44,67.44,0,0,0,196,128a4,4,0,0,1,8,0,75.28,75.28,0,0,1-7.7,33.37,4,4,0,0,1-7.18-3.52ZM87.63,46.46A44,44,0,0,1,172,64v64a44.2,44.2,0,0,1-.24,4.61,4,4,0,0,1-4,3.58l-.42,0a4,4,0,0,1-3.57-4.39A36.67,36.67,0,0,0,164,128V64A36,36,0,0,0,95,49.66a4,4,0,0,1-7.34-3.2Z"}))]]);var Mp=Tp.forwardRef((e,t)=>Tp.createElement(ye,{ref:t,...e,weights:o6}));Mp.displayName="MicrophoneSlashIcon";import*as Pp from"react";import*as Io from"react";var a6=new Map([["bold",Io.createElement(Io.Fragment,null,Io.createElement("path",{d:"M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128Z"}))],["duotone",Io.createElement(Io.Fragment,null,Io.createElement("path",{d:"M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",opacity:"0.2"}),Io.createElement("path",{d:"M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"}))],["fill",Io.createElement(Io.Fragment,null,Io.createElement("path",{d:"M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H72a8,8,0,0,1,0-16H184a8,8,0,0,1,0,16Z"}))],["light",Io.createElement(Io.Fragment,null,Io.createElement("path",{d:"M222,128a6,6,0,0,1-6,6H40a6,6,0,0,1,0-12H216A6,6,0,0,1,222,128Z"}))],["regular",Io.createElement(Io.Fragment,null,Io.createElement("path",{d:"M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"}))],["thin",Io.createElement(Io.Fragment,null,Io.createElement("path",{d:"M220,128a4,4,0,0,1-4,4H40a4,4,0,0,1,0-8H216A4,4,0,0,1,220,128Z"}))]]);var kp=Pp.forwardRef((e,t)=>Pp.createElement(ye,{ref:t,...e,weights:a6}));kp.displayName="MinusIcon";import*as Ap from"react";import*as Co from"react";var r6=new Map([["bold",Co.createElement(Co.Fragment,null,Co.createElement("path",{d:"M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"}))],["duotone",Co.createElement(Co.Fragment,null,Co.createElement("path",{d:"M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",opacity:"0.2"}),Co.createElement("path",{d:"M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"}))],["fill",Co.createElement(Co.Fragment,null,Co.createElement("path",{d:"M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H136v48a8,8,0,0,1-16,0V136H72a8,8,0,0,1,0-16h48V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z"}))],["light",Co.createElement(Co.Fragment,null,Co.createElement("path",{d:"M222,128a6,6,0,0,1-6,6H134v82a6,6,0,0,1-12,0V134H40a6,6,0,0,1,0-12h82V40a6,6,0,0,1,12,0v82h82A6,6,0,0,1,222,128Z"}))],["regular",Co.createElement(Co.Fragment,null,Co.createElement("path",{d:"M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"}))],["thin",Co.createElement(Co.Fragment,null,Co.createElement("path",{d:"M220,128a4,4,0,0,1-4,4H132v84a4,4,0,0,1-8,0V132H40a4,4,0,0,1,0-8h84V40a4,4,0,0,1,8,0v84h84A4,4,0,0,1,220,128Z"}))]]);var zp=Ap.forwardRef((e,t)=>Ap.createElement(ye,{ref:t,...e,weights:r6}));zp.displayName="PlusIcon";import*as Lp from"react";import*as Ro from"react";var n6=new Map([["bold",Ro.createElement(Ro.Fragment,null,Ro.createElement("path",{d:"M72,104a16,16,0,1,1,16,16A16,16,0,0,1,72,104Zm96,16a16,16,0,1,0-16-16A16,16,0,0,0,168,120Zm68-40V192a36,36,0,0,1-36,36H56a36,36,0,0,1-36-36V80A36,36,0,0,1,56,44h60V16a12,12,0,0,1,24,0V44h60A36,36,0,0,1,236,80Zm-24,0a12,12,0,0,0-12-12H56A12,12,0,0,0,44,80V192a12,12,0,0,0,12,12H200a12,12,0,0,0,12-12Zm-12,82a30,30,0,0,1-30,30H86a30,30,0,0,1,0-60h84A30,30,0,0,1,200,162Zm-80-6v12h16V156ZM86,168H96V156H86a6,6,0,0,0,0,12Zm90-6a6,6,0,0,0-6-6H160v12h10A6,6,0,0,0,176,162Z"}))],["duotone",Ro.createElement(Ro.Fragment,null,Ro.createElement("path",{d:"M200,56H56A24,24,0,0,0,32,80V192a24,24,0,0,0,24,24H200a24,24,0,0,0,24-24V80A24,24,0,0,0,200,56ZM164,184H92a20,20,0,0,1,0-40h72a20,20,0,0,1,0,40Z",opacity:"0.2"}),Ro.createElement("path",{d:"M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16ZM72,108a12,12,0,1,1,12,12A12,12,0,0,1,72,108Zm88,0a12,12,0,1,1,12,12A12,12,0,0,1,160,108Zm4,28H92a28,28,0,0,0,0,56h72a28,28,0,0,0,0-56Zm-24,16v24H116V152ZM80,164a12,12,0,0,1,12-12h8v24H92A12,12,0,0,1,80,164Zm84,12h-8V152h8a12,12,0,0,1,0,24Z"}))],["fill",Ro.createElement(Ro.Fragment,null,Ro.createElement("path",{d:"M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48ZM172,96a12,12,0,1,1-12,12A12,12,0,0,1,172,96ZM96,184H80a16,16,0,0,1,0-32H96ZM84,120a12,12,0,1,1,12-12A12,12,0,0,1,84,120Zm60,64H112V152h32Zm32,0H160V152h16a16,16,0,0,1,0,32Z"}))],["light",Ro.createElement(Ro.Fragment,null,Ro.createElement("path",{d:"M200,50H134V16a6,6,0,0,0-12,0V50H56A30,30,0,0,0,26,80V192a30,30,0,0,0,30,30H200a30,30,0,0,0,30-30V80A30,30,0,0,0,200,50Zm18,142a18,18,0,0,1-18,18H56a18,18,0,0,1-18-18V80A18,18,0,0,1,56,62H200a18,18,0,0,1,18,18ZM74,108a10,10,0,1,1,10,10A10,10,0,0,1,74,108Zm88,0a10,10,0,1,1,10,10A10,10,0,0,1,162,108Zm2,30H92a26,26,0,0,0,0,52h72a26,26,0,0,0,0-52Zm-22,12v28H114V150ZM78,164a14,14,0,0,1,14-14h10v28H92A14,14,0,0,1,78,164Zm86,14H154V150h10a14,14,0,0,1,0,28Z"}))],["regular",Ro.createElement(Ro.Fragment,null,Ro.createElement("path",{d:"M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-52-56H92a28,28,0,0,0,0,56h72a28,28,0,0,0,0-56Zm-24,16v24H116V152ZM80,164a12,12,0,0,1,12-12h8v24H92A12,12,0,0,1,80,164Zm84,12h-8V152h8a12,12,0,0,1,0,24ZM72,108a12,12,0,1,1,12,12A12,12,0,0,1,72,108Zm88,0a12,12,0,1,1,12,12A12,12,0,0,1,160,108Z"}))],["thin",Ro.createElement(Ro.Fragment,null,Ro.createElement("path",{d:"M200,52H132V16a4,4,0,0,0-8,0V52H56A28,28,0,0,0,28,80V192a28,28,0,0,0,28,28H200a28,28,0,0,0,28-28V80A28,28,0,0,0,200,52Zm20,140a20,20,0,0,1-20,20H56a20,20,0,0,1-20-20V80A20,20,0,0,1,56,60H200a20,20,0,0,1,20,20ZM76,108a8,8,0,1,1,8,8A8,8,0,0,1,76,108Zm88,0a8,8,0,1,1,8,8A8,8,0,0,1,164,108Zm0,32H92a24,24,0,0,0,0,48h72a24,24,0,0,0,0-48Zm-20,8v32H112V148ZM76,164a16,16,0,0,1,16-16h12v32H92A16,16,0,0,1,76,164Zm88,16H152V148h12a16,16,0,0,1,0,32Z"}))]]);var Np=Lp.forwardRef((e,t)=>Lp.createElement(ye,{ref:t,...e,weights:n6}));Np.displayName="RobotIcon";import*as Dp from"react";import*as So from"react";var s6=new Map([["bold",So.createElement(So.Fragment,null,So.createElement("path",{d:"M56.88,31.93A12,12,0,0,0,36,40a20,20,0,0,0-8,16v56c0,54.29,26.32,87.22,48.4,105.29,23.71,19.39,47.44,26,48.44,26.29a12.1,12.1,0,0,0,6.32,0c1.35-.37,30-8.42,55.86-32.82l12.1,13.31a12,12,0,0,0,17.76-16.14ZM128,219.38a126.38,126.38,0,0,1-37.09-21.23C65.09,176.69,52,147.71,52,112V62.24L170.87,193A126,126,0,0,1,128,219.38ZM228,56v56a144,144,0,0,1-8.23,49.16,12,12,0,0,1-11.28,7.92,11.86,11.86,0,0,1-4.08-.72,12,12,0,0,1-7.2-15.37A120.31,120.31,0,0,0,204,112V60H109.33a12,12,0,1,1,0-24H208A20,20,0,0,1,228,56Z"}))],["duotone",So.createElement(So.Fragment,null,So.createElement("path",{d:"M216,56v56c0,96-88,120-88,120S40,208,40,112V56a8,8,0,0,1,8-8H208A8,8,0,0,1,216,56Z",opacity:"0.2"}),So.createElement("path",{d:"M53.92,34.62A8,8,0,0,0,40.26,42,16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.27,47,25.53a8,8,0,0,0,4.2,0c1.36-.37,31.27-8.78,57.09-34.72l14.89,16.38a8,8,0,1,0,11.84-10.76Zm74.07,189a128.48,128.48,0,0,1-38.92-21.81C61.82,179.51,48,149.3,48,112l0-56h3.71L176.41,193.15A129.26,129.26,0,0,1,128,223.62ZM224,56v56c0,20.58-3.89,39.61-11.56,56.59A8,8,0,1,1,197.86,162c6.73-14.89,10.14-31.71,10.14-50V56L98.52,56a8,8,0,1,1,0-16H208A16,16,0,0,1,224,56Z"}))],["fill",So.createElement(So.Fragment,null,So.createElement("path",{d:"M224,56v56c0,25.24-5.85,45.72-14.3,62.14a4,4,0,0,1-6.53.87L86.52,46.69a4,4,0,0,1,3-6.69H208A16,16,0,0,1,224,56ZM53.92,34.62A8,8,0,0,0,40.26,42,16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.27,47,25.53a8,8,0,0,0,4.2,0c1-.26,23.91-6.67,47-25.53A131.92,131.92,0,0,0,187.18,205l14.9,16.38a8,8,0,1,0,11.84-10.76Z"}))],["light",So.createElement(So.Fragment,null,So.createElement("path",{d:"M52.44,36a6,6,0,0,0-9.63,7A14,14,0,0,0,34,56v56c0,51.94,25.12,83.4,46.2,100.64,22.73,18.6,45.27,24.89,46.22,25.15a6,6,0,0,0,3.16,0c1.36-.37,31.91-8.95,57.67-35.7L203.56,220a6,6,0,0,0,8.88-8.08ZM128,225.72a130.83,130.83,0,0,1-40.56-22.66C59.94,180.39,46,149.75,46,112V56a2,2,0,0,1,2-2h4.6L179.16,193.19A130.68,130.68,0,0,1,128,225.72ZM222,56v56c0,20.29-3.83,39.05-11.38,55.77a6,6,0,0,1-5.47,3.53,5.86,5.86,0,0,1-2.47-.54,6,6,0,0,1-3-7.93C206.53,147.67,210,130.57,210,112V56a2,2,0,0,0-2-2H98.52a6,6,0,1,1,0-12H208A14,14,0,0,1,222,56Z"}))],["regular",So.createElement(So.Fragment,null,So.createElement("path",{d:"M53.92,34.62A8,8,0,0,0,40.26,42,16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.27,47,25.53a8,8,0,0,0,4.2,0c1.36-.37,31.27-8.78,57.09-34.72l14.89,16.38a8,8,0,1,0,11.84-10.76Zm74.07,189a128.48,128.48,0,0,1-38.92-21.81C61.82,179.51,48,149.3,48,112l0-56h3.71L176.41,193.15A129.26,129.26,0,0,1,128,223.62ZM224,56v56c0,20.58-3.89,39.61-11.56,56.59A8,8,0,1,1,197.86,162c6.73-14.89,10.14-31.71,10.14-50V56L98.52,56a8,8,0,1,1,0-16H208A16,16,0,0,1,224,56Z"}))],["thin",So.createElement(So.Fragment,null,So.createElement("path",{d:"M51,37.31A4,4,0,0,0,45,42.69l1.31,1.44A12,12,0,0,0,36,56v56c0,51.16,24.73,82.12,45.47,99.1,22.4,18.32,44.55,24.5,45.48,24.76a4,4,0,0,0,2.1,0c1.37-.37,32.56-9.14,58.23-36.71L205,218.69a4,4,0,1,0,5.92-5.38Zm77,190.51a132.23,132.23,0,0,1-41.71-23.11C58.23,181.63,44,150.44,44,112V56a4,4,0,0,1,4-4H53.5L181.88,193.21C160.23,216.7,133.58,226.06,128,227.82ZM220,56v56c0,20-3.77,38.49-11.2,54.94a4,4,0,0,1-3.65,2.36,4.06,4.06,0,0,1-1.65-.36,4,4,0,0,1-2-5.29c7-15.41,10.49-32.79,10.49-51.65V56a4,4,0,0,0-4-4H98.52a4,4,0,1,1,0-8H208A12,12,0,0,1,220,56Z"}))]]);var Fp=Dp.forwardRef((e,t)=>Dp.createElement(ye,{ref:t,...e,weights:s6}));Fp.displayName="ShieldSlashIcon";import*as Op from"react";import*as Eo from"react";var i6=new Map([["bold",Eo.createElement(Eo.Fragment,null,Eo.createElement("path",{d:"M199,125.31l-49.88-18.39L130.69,57a19.92,19.92,0,0,0-37.38,0L74.92,106.92,25,125.31a19.92,19.92,0,0,0,0,37.38l49.88,18.39L93.31,231a19.92,19.92,0,0,0,37.38,0l18.39-49.88L199,162.69a19.92,19.92,0,0,0,0-37.38Zm-63.38,35.16a12,12,0,0,0-7.11,7.11L112,212.28l-16.47-44.7a12,12,0,0,0-7.11-7.11L43.72,144l44.7-16.47a12,12,0,0,0,7.11-7.11L112,75.72l16.47,44.7a12,12,0,0,0,7.11,7.11L180.28,144ZM140,40a12,12,0,0,1,12-12h12V16a12,12,0,0,1,24,0V28h12a12,12,0,0,1,0,24H188V64a12,12,0,0,1-24,0V52H152A12,12,0,0,1,140,40ZM252,88a12,12,0,0,1-12,12h-4v4a12,12,0,0,1-24,0v-4h-4a12,12,0,0,1,0-24h4V72a12,12,0,0,1,24,0v4h4A12,12,0,0,1,252,88Z"}))],["duotone",Eo.createElement(Eo.Fragment,null,Eo.createElement("path",{d:"M194.82,151.43l-55.09,20.3-20.3,55.09a7.92,7.92,0,0,1-14.86,0l-20.3-55.09-55.09-20.3a7.92,7.92,0,0,1,0-14.86l55.09-20.3,20.3-55.09a7.92,7.92,0,0,1,14.86,0l20.3,55.09,55.09,20.3A7.92,7.92,0,0,1,194.82,151.43Z",opacity:"0.2"}),Eo.createElement("path",{d:"M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z"}))],["fill",Eo.createElement(Eo.Fragment,null,Eo.createElement("path",{d:"M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z"}))],["light",Eo.createElement(Eo.Fragment,null,Eo.createElement("path",{d:"M196.89,130.94,144.4,111.6,125.06,59.11a13.92,13.92,0,0,0-26.12,0L79.6,111.6,27.11,130.94a13.92,13.92,0,0,0,0,26.12L79.6,176.4l19.34,52.49a13.92,13.92,0,0,0,26.12,0L144.4,176.4l52.49-19.34a13.92,13.92,0,0,0,0-26.12Zm-4.15,14.86-55.08,20.3a6,6,0,0,0-3.56,3.56l-20.3,55.08a1.92,1.92,0,0,1-3.6,0L89.9,169.66a6,6,0,0,0-3.56-3.56L31.26,145.8a1.92,1.92,0,0,1,0-3.6l55.08-20.3a6,6,0,0,0,3.56-3.56l20.3-55.08a1.92,1.92,0,0,1,3.6,0l20.3,55.08a6,6,0,0,0,3.56,3.56l55.08,20.3a1.92,1.92,0,0,1,0,3.6ZM146,40a6,6,0,0,1,6-6h18V16a6,6,0,0,1,12,0V34h18a6,6,0,0,1,0,12H182V64a6,6,0,0,1-12,0V46H152A6,6,0,0,1,146,40ZM246,88a6,6,0,0,1-6,6H230v10a6,6,0,0,1-12,0V94H208a6,6,0,0,1,0-12h10V72a6,6,0,0,1,12,0V82h10A6,6,0,0,1,246,88Z"}))],["regular",Eo.createElement(Eo.Fragment,null,Eo.createElement("path",{d:"M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z"}))],["thin",Eo.createElement(Eo.Fragment,null,Eo.createElement("path",{d:"M196.2,132.81l-53.36-19.65L123.19,59.8a11.93,11.93,0,0,0-22.38,0L81.16,113.16,27.8,132.81a11.93,11.93,0,0,0,0,22.38l53.36,19.65,19.65,53.36a11.93,11.93,0,0,0,22.38,0l19.65-53.36,53.36-19.65a11.93,11.93,0,0,0,0-22.38Zm-2.77,14.87L138.35,168a4,4,0,0,0-2.37,2.37l-20.3,55.08a3.92,3.92,0,0,1-7.36,0L88,170.35A4,4,0,0,0,85.65,168l-55.08-20.3a3.92,3.92,0,0,1,0-7.36L85.65,120A4,4,0,0,0,88,117.65l20.3-55.08a3.92,3.92,0,0,1,7.36,0L136,117.65a4,4,0,0,0,2.37,2.37l55.08,20.3a3.92,3.92,0,0,1,0,7.36ZM148,40a4,4,0,0,1,4-4h20V16a4,4,0,0,1,8,0V36h20a4,4,0,0,1,0,8H180V64a4,4,0,0,1-8,0V44H152A4,4,0,0,1,148,40Zm96,48a4,4,0,0,1-4,4H228v12a4,4,0,0,1-8,0V92H208a4,4,0,0,1,0-8h12V72a4,4,0,0,1,8,0V84h12A4,4,0,0,1,244,88Z"}))]]);var Hp=Op.forwardRef((e,t)=>Op.createElement(ye,{ref:t,...e,weights:i6}));Hp.displayName="SparkleIcon";import*as Vp from"react";import*as To from"react";var l6=new Map([["bold",To.createElement(To.Fragment,null,To.createElement("path",{d:"M208,28H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28Zm-4,176H52V52H204Z"}))],["duotone",To.createElement(To.Fragment,null,To.createElement("path",{d:"M216,48V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H208A8,8,0,0,1,216,48Z",opacity:"0.2"}),To.createElement("path",{d:"M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z"}))],["fill",To.createElement(To.Fragment,null,To.createElement("path",{d:"M224,48V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48Z"}))],["light",To.createElement(To.Fragment,null,To.createElement("path",{d:"M208,34H48A14,14,0,0,0,34,48V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V48A14,14,0,0,0,208,34Zm2,174a2,2,0,0,1-2,2H48a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2H208a2,2,0,0,1,2,2Z"}))],["regular",To.createElement(To.Fragment,null,To.createElement("path",{d:"M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z"}))],["thin",To.createElement(To.Fragment,null,To.createElement("path",{d:"M208,36H48A12,12,0,0,0,36,48V208a12,12,0,0,0,12,12H208a12,12,0,0,0,12-12V48A12,12,0,0,0,208,36Zm4,172a4,4,0,0,1-4,4H48a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4H208a4,4,0,0,1,4,4Z"}))]]);var Bp=Vp.forwardRef((e,t)=>Vp.createElement(ye,{ref:t,...e,weights:l6}));Bp.displayName="SquareIcon";import*as _p from"react";import*as Mo from"react";var c6=new Map([["bold",Mo.createElement(Mo.Fragment,null,Mo.createElement("path",{d:"M224,44H32A12,12,0,0,0,20,56V192a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V56A12,12,0,0,0,224,44ZM44,116H76v24H44Zm56,0H212v24H100ZM212,68V92H44V68ZM44,164H76v24H44Zm56,24V164H212v24Z"}))],["duotone",Mo.createElement(Mo.Fragment,null,Mo.createElement("path",{d:"M88,104v96H32V104Z",opacity:"0.2"}),Mo.createElement("path",{d:"M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM40,112H80v32H40Zm56,0H216v32H96ZM216,64V96H40V64ZM40,160H80v32H40Zm176,32H96V160H216v32Z"}))],["fill",Mo.createElement(Mo.Fragment,null,Mo.createElement("path",{d:"M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM40,112H80v32H40Zm56,0H216v32H96ZM40,160H80v32H40Zm176,32H96V160H216v32Z"}))],["light",Mo.createElement(Mo.Fragment,null,Mo.createElement("path",{d:"M224,50H32a6,6,0,0,0-6,6V192a14,14,0,0,0,14,14H216a14,14,0,0,0,14-14V56A6,6,0,0,0,224,50ZM38,110H82v36H38Zm56,0H218v36H94ZM218,62V98H38V62ZM38,192V158H82v36H40A2,2,0,0,1,38,192Zm178,2H94V158H218v34A2,2,0,0,1,216,194Z"}))],["regular",Mo.createElement(Mo.Fragment,null,Mo.createElement("path",{d:"M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM40,112H80v32H40Zm56,0H216v32H96ZM216,64V96H40V64ZM40,160H80v32H40Zm176,32H96V160H216v32Z"}))],["thin",Mo.createElement(Mo.Fragment,null,Mo.createElement("path",{d:"M224,52H32a4,4,0,0,0-4,4V192a12,12,0,0,0,12,12H216a12,12,0,0,0,12-12V56A4,4,0,0,0,224,52ZM36,108H84v40H36Zm56,0H220v40H92ZM220,60v40H36V60ZM36,192V156H84v40H40A4,4,0,0,1,36,192Zm180,4H92V156H220v36A4,4,0,0,1,216,196Z"}))]]);var Zp=_p.forwardRef((e,t)=>_p.createElement(ye,{ref:t,...e,weights:c6}));Zp.displayName="TableIcon";import*as Gp from"react";import*as Po from"react";var u6=new Map([["bold",Po.createElement(Po.Fragment,null,Po.createElement("path",{d:"M72.5,150.63,100.79,128,72.5,105.37a12,12,0,1,1,15-18.74l40,32a12,12,0,0,1,0,18.74l-40,32a12,12,0,0,1-15-18.74ZM144,172h32a12,12,0,0,0,0-24H144a12,12,0,0,0,0,24ZM236,56V200a20,20,0,0,1-20,20H40a20,20,0,0,1-20-20V56A20,20,0,0,1,40,36H216A20,20,0,0,1,236,56Zm-24,4H44V196H212Z"}))],["duotone",Po.createElement(Po.Fragment,null,Po.createElement("path",{d:"M224,56V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H216A8,8,0,0,1,224,56Z",opacity:"0.2"}),Po.createElement("path",{d:"M128,128a8,8,0,0,1-3,6.25l-40,32a8,8,0,1,1-10-12.5L107.19,128,75,102.25a8,8,0,1,1,10-12.5l40,32A8,8,0,0,1,128,128Zm48,24H136a8,8,0,0,0,0,16h40a8,8,0,0,0,0-16Zm56-96V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM216,200V56H40V200H216Z"}))],["fill",Po.createElement(Po.Fragment,null,Po.createElement("path",{d:"M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm-91,94.25-40,32a8,8,0,1,1-10-12.5L107.19,128,75,102.25a8,8,0,1,1,10-12.5l40,32a8,8,0,0,1,0,12.5ZM176,168H136a8,8,0,0,1,0-16h40a8,8,0,0,1,0,16Z"}))],["light",Po.createElement(Po.Fragment,null,Po.createElement("path",{d:"M126,128a6,6,0,0,1-2.25,4.69l-40,32a6,6,0,0,1-7.5-9.38L110.4,128,76.25,100.69a6,6,0,1,1,7.5-9.38l40,32A6,6,0,0,1,126,128Zm50,26H136a6,6,0,0,0,0,12h40a6,6,0,0,0,0-12Zm54-98V200a14,14,0,0,1-14,14H40a14,14,0,0,1-14-14V56A14,14,0,0,1,40,42H216A14,14,0,0,1,230,56Zm-12,0a2,2,0,0,0-2-2H40a2,2,0,0,0-2,2V200a2,2,0,0,0,2,2H216a2,2,0,0,0,2-2Z"}))],["regular",Po.createElement(Po.Fragment,null,Po.createElement("path",{d:"M128,128a8,8,0,0,1-3,6.25l-40,32a8,8,0,1,1-10-12.5L107.19,128,75,102.25a8,8,0,1,1,10-12.5l40,32A8,8,0,0,1,128,128Zm48,24H136a8,8,0,0,0,0,16h40a8,8,0,0,0,0-16Zm56-96V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM216,200V56H40V200H216Z"}))],["thin",Po.createElement(Po.Fragment,null,Po.createElement("path",{d:"M122.5,124.88a4,4,0,0,1,0,6.24l-40,32a4,4,0,0,1-5-6.24L113.6,128,77.5,99.12a4,4,0,0,1,5-6.24ZM176,156H136a4,4,0,0,0,0,8h40a4,4,0,0,0,0-8ZM228,56V200a12,12,0,0,1-12,12H40a12,12,0,0,1-12-12V56A12,12,0,0,1,40,44H216A12,12,0,0,1,228,56Zm-8,0a4,4,0,0,0-4-4H40a4,4,0,0,0-4,4V200a4,4,0,0,0,4,4H216a4,4,0,0,0,4-4Z"}))]]);var Up=Gp.forwardRef((e,t)=>Gp.createElement(ye,{ref:t,...e,weights:u6}));Up.displayName="TerminalWindowIcon";import*as $p from"react";import*as ko from"react";var d6=new Map([["bold",ko.createElement(ko.Fragment,null,ko.createElement("path",{d:"M208,28H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28Zm-4,24v92H179.31a19.86,19.86,0,0,0-14.14,5.86L147,168H109L90.83,149.86A19.86,19.86,0,0,0,76.69,144H52V52ZM52,204V168H75l18.14,18.14A19.86,19.86,0,0,0,107.31,192h41.38a19.86,19.86,0,0,0,14.14-5.86L181,168h23v36Z"}))],["duotone",ko.createElement(ko.Fragment,null,ko.createElement("path",{d:"M216,48V160H179.31a8,8,0,0,0-5.66,2.34l-19.31,19.32a8,8,0,0,1-5.66,2.34H107.31a8,8,0,0,1-5.66-2.34L82.34,162.34A8,8,0,0,0,76.68,160H40V48a8,8,0,0,1,8-8H208A8,8,0,0,1,216,48Z",opacity:"0.2"}),ko.createElement("path",{d:"M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,16V152h-28.7A15.86,15.86,0,0,0,168,156.69L148.69,176H107.31L88,156.68A15.89,15.89,0,0,0,76.69,152H48V48Zm0,160H48V168H76.69L96,187.32A15.89,15.89,0,0,0,107.31,192h41.38A15.86,15.86,0,0,0,160,187.31L179.31,168H208v40Z"}))],["fill",ko.createElement(ko.Fragment,null,ko.createElement("path",{d:"M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V168H76.69L96,187.32A15.89,15.89,0,0,0,107.31,192h41.38A15.86,15.86,0,0,0,160,187.31L179.31,168H208v40Z"}))],["light",ko.createElement(ko.Fragment,null,ko.createElement("path",{d:"M208,34H48A14,14,0,0,0,34,48V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V48A14,14,0,0,0,208,34ZM48,46H208a2,2,0,0,1,2,2V154H179.31a13.94,13.94,0,0,0-9.9,4.1L150.1,177.41a2,2,0,0,1-1.41.59H107.31a2,2,0,0,1-1.41-.58L86.59,158.1a13.94,13.94,0,0,0-9.9-4.1H46V48A2,2,0,0,1,48,46ZM208,210H48a2,2,0,0,1-2-2V166H76.69a2,2,0,0,1,1.41.58L97.41,185.9a13.94,13.94,0,0,0,9.9,4.1h41.38a13.94,13.94,0,0,0,9.9-4.1l19.31-19.31a2,2,0,0,1,1.41-.59H210v42A2,2,0,0,1,208,210Z"}))],["regular",ko.createElement(ko.Fragment,null,ko.createElement("path",{d:"M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,16V152h-28.7A15.86,15.86,0,0,0,168,156.69L148.69,176H107.31L88,156.69A15.86,15.86,0,0,0,76.69,152H48V48Zm0,160H48V168H76.69L96,187.31A15.86,15.86,0,0,0,107.31,192h41.38A15.86,15.86,0,0,0,160,187.31L179.31,168H208v40Z"}))],["thin",ko.createElement(ko.Fragment,null,ko.createElement("path",{d:"M208,36H48A12,12,0,0,0,36,48V208a12,12,0,0,0,12,12H208a12,12,0,0,0,12-12V48A12,12,0,0,0,208,36ZM48,44H208a4,4,0,0,1,4,4V156H179.31a12,12,0,0,0-8.48,3.51l-19.32,19.32a4,4,0,0,1-2.82,1.17H107.31a4,4,0,0,1-2.82-1.17L85.17,159.51A12,12,0,0,0,76.69,156H44V48A4,4,0,0,1,48,44ZM208,212H48a4,4,0,0,1-4-4V164H76.69a4,4,0,0,1,2.82,1.17l19.32,19.32a12,12,0,0,0,8.48,3.51h41.38a12,12,0,0,0,8.48-3.51l19.32-19.32a4,4,0,0,1,2.82-1.17H212v44A4,4,0,0,1,208,212Z"}))]]);var Wp=$p.forwardRef((e,t)=>$p.createElement(ye,{ref:t,...e,weights:d6}));Wp.displayName="TrayIcon";import*as qp from"react";import*as Ao from"react";var m6=new Map([["bold",Ao.createElement(Ao.Fragment,null,Ao.createElement("path",{d:"M240.26,186.1,152.81,34.23h0a28.74,28.74,0,0,0-49.62,0L15.74,186.1a27.45,27.45,0,0,0,0,27.71A28.31,28.31,0,0,0,40.55,228h174.9a28.31,28.31,0,0,0,24.79-14.19A27.45,27.45,0,0,0,240.26,186.1Zm-20.8,15.7a4.46,4.46,0,0,1-4,2.2H40.55a4.46,4.46,0,0,1-4-2.2,3.56,3.56,0,0,1,0-3.73L124,46.2a4.77,4.77,0,0,1,8,0l87.44,151.87A3.56,3.56,0,0,1,219.46,201.8ZM116,136V104a12,12,0,0,1,24,0v32a12,12,0,0,1-24,0Zm28,40a16,16,0,1,1-16-16A16,16,0,0,1,144,176Z"}))],["duotone",Ao.createElement(Ao.Fragment,null,Ao.createElement("path",{d:"M215.46,216H40.54C27.92,216,20,202.79,26.13,192.09L113.59,40.22c6.3-11,22.52-11,28.82,0l87.46,151.87C236,202.79,228.08,216,215.46,216Z",opacity:"0.2"}),Ao.createElement("path",{d:"M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"}))],["fill",Ao.createElement(Ao.Fragment,null,Ao.createElement("path",{d:"M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"}))],["light",Ao.createElement(Ao.Fragment,null,Ao.createElement("path",{d:"M235.07,189.09,147.61,37.22h0a22.75,22.75,0,0,0-39.22,0L20.93,189.09a21.53,21.53,0,0,0,0,21.72A22.35,22.35,0,0,0,40.55,222h174.9a22.35,22.35,0,0,0,19.6-11.19A21.53,21.53,0,0,0,235.07,189.09ZM224.66,204.8a10.46,10.46,0,0,1-9.21,5.2H40.55a10.46,10.46,0,0,1-9.21-5.2,9.51,9.51,0,0,1,0-9.72L118.79,43.21a10.75,10.75,0,0,1,18.42,0l87.46,151.87A9.51,9.51,0,0,1,224.66,204.8ZM122,144V104a6,6,0,0,1,12,0v40a6,6,0,0,1-12,0Zm16,36a10,10,0,1,1-10-10A10,10,0,0,1,138,180Z"}))],["regular",Ao.createElement(Ao.Fragment,null,Ao.createElement("path",{d:"M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"}))],["thin",Ao.createElement(Ao.Fragment,null,Ao.createElement("path",{d:"M233.34,190.09,145.88,38.22h0a20.75,20.75,0,0,0-35.76,0L22.66,190.09a19.52,19.52,0,0,0,0,19.71A20.36,20.36,0,0,0,40.54,220H215.46a20.36,20.36,0,0,0,17.86-10.2A19.52,19.52,0,0,0,233.34,190.09ZM226.4,205.8a12.47,12.47,0,0,1-10.94,6.2H40.54a12.47,12.47,0,0,1-10.94-6.2,11.45,11.45,0,0,1,0-11.72L117.05,42.21a12.76,12.76,0,0,1,21.9,0L226.4,194.08A11.45,11.45,0,0,1,226.4,205.8ZM124,144V104a4,4,0,0,1,8,0v40a4,4,0,0,1-8,0Zm12,36a8,8,0,1,1-8-8A8,8,0,0,1,136,180Z"}))]]);var jp=qp.forwardRef((e,t)=>qp.createElement(ye,{ref:t,...e,weights:m6}));jp.displayName="WarningIcon";import*as Kp from"react";import*as zo from"react";var p6=new Map([["bold",zo.createElement(zo.Fragment,null,zo.createElement("path",{d:"M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm-12-80V80a12,12,0,0,1,24,0v52a12,12,0,0,1-24,0Zm28,40a16,16,0,1,1-16-16A16,16,0,0,1,144,172Z"}))],["duotone",zo.createElement(zo.Fragment,null,zo.createElement("path",{d:"M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z",opacity:"0.2"}),zo.createElement("path",{d:"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"}))],["fill",zo.createElement(zo.Fragment,null,zo.createElement("path",{d:"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z"}))],["light",zo.createElement(zo.Fragment,null,zo.createElement("path",{d:"M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm0,192a90,90,0,1,1,90-90A90.1,90.1,0,0,1,128,218Zm-6-82V80a6,6,0,0,1,12,0v56a6,6,0,0,1-12,0Zm16,36a10,10,0,1,1-10-10A10,10,0,0,1,138,172Z"}))],["regular",zo.createElement(zo.Fragment,null,zo.createElement("path",{d:"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"}))],["thin",zo.createElement(zo.Fragment,null,zo.createElement("path",{d:"M128,28A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm0,192a92,92,0,1,1,92-92A92.1,92.1,0,0,1,128,220Zm-4-84V80a4,4,0,0,1,8,0v56a4,4,0,0,1-8,0Zm12,36a8,8,0,1,1-8-8A8,8,0,0,1,136,172Z"}))]]);var Yp=Kp.forwardRef((e,t)=>Kp.createElement(ye,{ref:t,...e,weights:p6}));Yp.displayName="WarningCircleIcon";import*as Xp from"react";import*as Lo from"react";var f6=new Map([["bold",Lo.createElement(Lo.Fragment,null,Lo.createElement("path",{d:"M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"}))],["duotone",Lo.createElement(Lo.Fragment,null,Lo.createElement("path",{d:"M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",opacity:"0.2"}),Lo.createElement("path",{d:"M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"}))],["fill",Lo.createElement(Lo.Fragment,null,Lo.createElement("path",{d:"M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM181.66,170.34a8,8,0,0,1-11.32,11.32L128,139.31,85.66,181.66a8,8,0,0,1-11.32-11.32L116.69,128,74.34,85.66A8,8,0,0,1,85.66,74.34L128,116.69l42.34-42.35a8,8,0,0,1,11.32,11.32L139.31,128Z"}))],["light",Lo.createElement(Lo.Fragment,null,Lo.createElement("path",{d:"M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z"}))],["regular",Lo.createElement(Lo.Fragment,null,Lo.createElement("path",{d:"M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"}))],["thin",Lo.createElement(Lo.Fragment,null,Lo.createElement("path",{d:"M202.83,197.17a4,4,0,0,1-5.66,5.66L128,133.66,58.83,202.83a4,4,0,0,1-5.66-5.66L122.34,128,53.17,58.83a4,4,0,0,1,5.66-5.66L128,122.34l69.17-69.17a4,4,0,1,1,5.66,5.66L133.66,128Z"}))]]);var Qp=Xp.forwardRef((e,t)=>Xp.createElement(ye,{ref:t,...e,weights:f6}));Qp.displayName="XIcon";import*as Jp from"react";import*as No from"react";var g6=new Map([["bold",No.createElement(No.Fragment,null,No.createElement("path",{d:"M168.49,104.49,145,128l23.52,23.51a12,12,0,0,1-17,17L128,145l-23.51,23.52a12,12,0,0,1-17-17L111,128,87.51,104.49a12,12,0,0,1,17-17L128,111l23.51-23.52a12,12,0,0,1,17,17ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Z"}))],["duotone",No.createElement(No.Fragment,null,No.createElement("path",{d:"M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z",opacity:"0.2"}),No.createElement("path",{d:"M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"}))],["fill",No.createElement(No.Fragment,null,No.createElement("path",{d:"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z"}))],["light",No.createElement(No.Fragment,null,No.createElement("path",{d:"M164.24,100.24,136.48,128l27.76,27.76a6,6,0,1,1-8.48,8.48L128,136.48l-27.76,27.76a6,6,0,0,1-8.48-8.48L119.52,128,91.76,100.24a6,6,0,0,1,8.48-8.48L128,119.52l27.76-27.76a6,6,0,0,1,8.48,8.48ZM230,128A102,102,0,1,1,128,26,102.12,102.12,0,0,1,230,128Zm-12,0a90,90,0,1,0-90,90A90.1,90.1,0,0,0,218,128Z"}))],["regular",No.createElement(No.Fragment,null,No.createElement("path",{d:"M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"}))],["thin",No.createElement(No.Fragment,null,No.createElement("path",{d:"M162.83,98.83,133.66,128l29.17,29.17a4,4,0,0,1-5.66,5.66L128,133.66,98.83,162.83a4,4,0,0,1-5.66-5.66L122.34,128,93.17,98.83a4,4,0,0,1,5.66-5.66L128,122.34l29.17-29.17a4,4,0,1,1,5.66,5.66ZM228,128A100,100,0,1,1,128,28,100.11,100.11,0,0,1,228,128Zm-8,0a92,92,0,1,0-92,92A92.1,92.1,0,0,0,220,128Z"}))]]);var ef=Jp.forwardRef((e,t)=>Jp.createElement(ye,{ref:t,...e,weights:g6}));ef.displayName="XCircleIcon";import{jsx as X5}from"react/jsx-runtime";var Hs=zp,tf=Tm;var _i=Am;var h6=Np;var Vs=Gm,b6=Dm;var Zh=Om,y6=Vm;var w6=_m,tr=Qp,v6=Lm;var Oc=Km,of=Xm;var af=bp,x6=cp;var I6=Wp;var rf=Yp,C6=ef;var R6=np,S6=ip,E6=dp,Gh=gp,T6=pp,M6=wp;var P6=xp,nf=ap;var k6=Fp,A6=Fc,z6=Ep,L6=Mp;var Uh=Jm;var ln=qm;var Bs=Sm;var Zi=Fc;var sf=tp,N6=Hp,D6=Bp,F6=kp,lf=$m,O6=Zp,H6=Up;var Gi=jp,V6=Cp,B6=Pm;function Ce({icon:e,size:t=14,weight:o="regular",label:a,className:r,...n}){return X5(e,{size:t,weight:o,focusable:"false","aria-hidden":a?void 0:!0,"aria-label":a,role:a?"img":void 0,className:F("shrink-0",r),...n})}import*as _6 from"react";var $h=_6.forwardRef(function(t,o){let{render:a,className:r,disabled:n=!1,focusableWhenDisabled:s=!1,nativeButton:l=!0,style:i,...c}=t,{getButtonProps:u,buttonRef:d}=Ut({disabled:n,focusableWhenDisabled:s,native:l});return ae("button",t,{state:{disabled:n},ref:[o,d],props:[c,u]})});var Z6=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,G6=ym,Ye=(e,t)=>o=>{var a;if(t?.variants==null)return G6(e,o?.class,o?.className);let{variants:r,defaultVariants:n}=t,s=Object.keys(r).map(c=>{let u=o?.[c],d=n?.[c];if(u===null)return null;let m=Z6(u)||Z6(d);return r[c][m]}),l=o&&Object.entries(o).reduce((c,u)=>{let[d,m]=u;return m===void 0||(c[d]=m),c},{}),i=t==null||(a=t.compoundVariants)===null||a===void 0?void 0:a.reduce((c,u)=>{let{class:d,className:m,...p}=u;return Object.entries(p).every(f=>{let[v,g]=f;return Array.isArray(g)?g.includes({...n,...l}[v]):{...n,...l}[v]===g})?[...c,d,m]:c},[]);return G6(e,s,i,o?.class,o?.className)};import{useEffect as Q5,useMemo as J5,useRef as ek}from"react";import{jsx as Ui,jsxs as U6}from"react/jsx-runtime";var cf=Ye(["group/button relative inline-flex max-w-full shrink-0 items-center justify-center gap-1.5 rounded-pill whitespace-nowrap select-none","disabled:cursor-not-allowed data-disabled:cursor-not-allowed aria-busy:cursor-progress","[&_svg]:pointer-events-none [&_svg]:shrink-0"],{variants:{variant:{primary:"glass glass-ink",destructive:"glass glass-coral",confirm:"glass glass-green",secondary:"flat",ghost:["bg-transparent text-text-1 transition-[background-color,color,scale] duration-(--dur-press) ease-out","hover:not-data-disabled:bg-hover active:not-data-disabled:bg-pressed active:not-data-disabled:scale-(--scale-press)","data-disabled:not-aria-busy:text-text-disabled","forced-colors:border forced-colors:border-solid forced-colors:border-[ButtonText]"]},size:{sm:`${ns.sm} px-2.5 type-label-sm [&_svg]:size-(--icon-sm)`,default:`${ns.default} px-3 type-label [&_svg]:size-(--icon)`,lg:`${ns.lg} px-3.5 type-label-lg [&_svg]:size-(--icon-lg)`,"icon-sm":"size-(--control-sm) px-0 [&_svg]:size-(--icon-sm)",icon:"size-(--control) px-0 [&_svg]:size-(--icon)","icon-lg":"size-(--control-lg) px-0 [&_svg]:size-(--icon-lg)"}},defaultVariants:{variant:"primary",size:"default"}});function tk(){return Ui(Ce,{icon:ln,"data-slot":"button-arc",className:"animate-spin motion-reduce:animate-none"})}function ok(e){let t=e.getAttribute("aria-label")??"";if(t.trim()||e.getAttribute("aria-labelledby"))return t||"labelledby";let o="",a=r=>{if(r.nodeType===Node.TEXT_NODE){o+=r.textContent??"";return}if(!(r instanceof Element&&r.getAttribute("aria-hidden")==="true")){if(r instanceof Element&&r.getAttribute("role")==="img"){o+=r.getAttribute("aria-label")??"";return}r.childNodes.forEach(a)}};return a(e),o.trim()}function ak(){let e=ek(null);return Q5(()=>{}),e}function $e({className:e,variant:t,size:o,pending:a,pendingLabel:r,disabled:n,focusableWhenDisabled:s,children:l,ref:i,...c}){let u=t??"primary",d=o??"default",m=d.startsWith("icon"),p=a!==void 0,f=ak(),v=J5(()=>Ra(i,f),[i,f]),g=typeof l=="string"?Ui("span",{"data-slot":"button-text",className:"min-w-0 truncate",children:l}):l,b=p?U6("span",{"data-slot":"button-stack",className:"grid min-w-0 place-items-center [grid-template-areas:'stack']",children:[Ui("span",{"data-slot":"button-idle",className:F("inline-flex max-w-full min-w-0 items-center gap-1.5 [grid-area:stack]",a&&"opacity-0"),children:g}),U6("span",{"data-slot":"button-pending","aria-hidden":!0,className:F("inline-flex max-w-full min-w-0 items-center gap-1.5 [grid-area:stack]",!a&&"invisible"),children:[Ui(tk,{}),m?null:typeof r=="string"?Ui("span",{className:"min-w-0 truncate",children:r}):r??g]})]}):g;return Ui($h,{"data-slot":"button","data-variant":u,"data-size":d,ref:v,disabled:n||a,focusableWhenDisabled:a||s,"aria-busy":a||void 0,className:Et(cf({variant:u,size:d}),e),...c,children:b})}import{jsx as Ha,jsxs as Wh}from"react/jsx-runtime";var Bc=Oa.createToastManager();function _c(e){return e==null||typeof e=="boolean"?0:typeof e=="string"||typeof e=="number"?String(e).length:Array.isArray(e)?e.reduce((t,o)=>t+_c(o),0):W6(e)?_c(e.props.children):40}var Hc={base:3e3,char:60,action:3e3,min:4e3,max:12e3};function q6(e,t,o=!1){let a=Hc.base+Hc.char*(_c(e)+_c(t))+(o?Hc.action:0);return Math.min(Hc.max,Math.max(Hc.min,Math.round(a/100)*100))}function sk(e,t,o){return o.timeout!==void 0?o.timeout:e==="fail"||e==="loading"?0:q6(t,o.description,!!o.action)}function j6(e,t,o){let{description:a,action:r,onClose:n}=o,s=sk(e,t,o);return{title:t,description:a,type:e,timeout:s,priority:e==="fail"?"high":"low",onClose:n,data:{timeout:s},actionProps:r?{children:r.label,onClick:r.onClick}:void 0}}function Vc(e,t,o={}){return _c(t)===0&&!W6(t)?"":Bc.add({id:o.id,...j6(e,t,o)})}var jh=Object.assign((e,t)=>Vc("default",e,t),{success:(e,t)=>Vc("success",e,t),warn:(e,t)=>Vc("warn",e,t),fail:(e,t)=>Vc("fail",e,t),loading:(e,t)=>Vc("loading",e,t),promise:(e,t)=>Bc.promise(e,{loading:{title:t.loading,type:"loading",timeout:0,data:{timeout:0}},success:o=>{let a=typeof t.success=="function"?t.success(o):t.success,r=q6(a);return{title:a,type:"success",timeout:r,data:{timeout:r}}},error:o=>({title:typeof t.fail=="function"?t.fail(o):t.fail,type:"fail",priority:"high",timeout:0,data:{timeout:0}})}),update:(e,t,o,a={})=>Bc.update(e,j6(t,o,a)),dismiss:e=>Bc.close(e)});function K6({inline:e,limit:t=3,manager:o=Bc,className:a}){let r=er(),[n,s]=nk(!1);qh(()=>{let i=()=>s(!document.hasFocus());return i(),window.addEventListener("blur",i),window.addEventListener("focus",i),()=>{window.removeEventListener("blur",i),window.removeEventListener("focus",i)}},[]);let l=Ha(Oa.Viewport,{"data-slot":"toast-viewport","data-away":n||void 0,...e?{role:"group","aria-live":"off","aria-label":"Example toasts"}:{},className:F("group/toasts @container/toast flex w-full flex-col-reverse gap-2 outline-none",e?"relative":"fixed z-(--z-overlay) end-0 bottom-0 p-4 pb-[max(var(--space-4),env(safe-area-inset-bottom))] sm:end-6 sm:bottom-6 sm:w-(--toast) sm:p-0",a),children:Ha(lk,{limit:t,manager:o})});return Ha(Oa.Provider,{toastManager:o,limit:Number.MAX_SAFE_INTEGER,children:e?l:Ha(Oa.Portal,{container:r,children:l})})}function ik(e,t){let o=e.filter(n=>n.transitionStatus!=="ending"),a=o.filter(n=>n.type==="fail").length,r=o.filter(n=>n.type!=="fail").reverse();return new Set(r.slice(Math.max(0,t-a)).map(n=>n.id))}function lk({limit:e,manager:t}){let{toasts:o}=Oa.useToastManager(),a=ik(o,e),r=[...a].join(" "),n=uf(new Set);qh(()=>{for(let c of o){let u=c.data?.timeout??0;!u||c.transitionStatus==="ending"||(a.has(c.id)&&!n.current.has(c.id)?(n.current.add(c.id),t.update(c.id,{timeout:0})):!a.has(c.id)&&n.current.has(c.id)&&(n.current.delete(c.id),t.update(c.id,{timeout:u})))}},[r,t]);let s=uf(new Map),l=uf(new Map);rk(()=>{let c=new Map,u=window.matchMedia("(prefers-reduced-motion: reduce)").matches;s.current.forEach((d,m)=>{if(!d.offsetParent||!d.parentElement)return;let p=d.parentElement.getBoundingClientRect().top+d.offsetTop;c.set(m,p);let f=l.current.get(m);if(f===void 0||Math.abs(f-p)<1||u)return;d.getAnimations().forEach(g=>{g.id==="toast-flip"&&g.cancel()});let v=getComputedStyle(d);d.animate([{transform:`translateY(${f-p}px)`},{transform:"none"}],{id:"toast-flip",duration:parseFloat(v.getPropertyValue("--dur-overlay"))||200,easing:v.getPropertyValue("--ease-out").trim()||"ease-out"})}),l.current=c});let i=c=>u=>{u?s.current.set(c,u):s.current.delete(c)};return o.map(c=>Ha(uk,{toast:c,waiting:a.has(c.id),nodeRef:i(c.id)},c.id))}function ck({ms:e}){let t=uf(null);return qh(()=>{let o=t.current,a=o?.closest("[data-slot=toast-viewport]");if(!o||!e||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let r=o.animate([{scale:"1 1"},{scale:"0 1"}],{duration:e,easing:"linear",fill:"forwards"}),n=()=>{!!a&&(a.hasAttribute("data-expanded")||a.hasAttribute("data-away"))?r.pause():r.playState==="paused"&&r.play()};n();let s=new MutationObserver(n);return a&&s.observe(a,{attributes:!0,attributeFilter:["data-expanded","data-away"]}),()=>{s.disconnect(),r.cancel()}},[e]),e?Ha("span",{ref:t,"aria-hidden":!0,"data-slot":"toast-timer",className:"pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-line-control motion-reduce:hidden rtl:origin-right"}):null}var $6={success:{icon:lf,className:"text-ok"},warn:{icon:Gi,className:"text-warn"},fail:{icon:rf,className:"text-fail"},loading:{icon:ln,className:"animate-spin text-text-2 motion-reduce:animate-none"}};function uk({toast:e,waiting:t,nodeRef:o}){let a=e.type??"default",r=e.data?.timeout??e.timeout??0,n=bm(er())==="rtl"?"left":"right",s=a==="warn"||a==="fail"||a==="success"?a:void 0;return Wh(Oa.Root,{ref:o,toast:e,"data-slot":"toast","data-kind-of-toast":a,"data-timeout":r||void 0,"data-waiting":t||void 0,"data-status":s,swipeDirection:["down",n],className:F('relative grid w-full grid-cols-[minmax(0,1fr)_auto_auto] items-start gap-x-2 [grid-template-areas:"content_action_close"] overflow-hidden py-2.5 ps-3 pe-1.5 select-none',Lc,'@max-[20rem]/toast:gap-y-2 @max-[20rem]/toast:[grid-template-areas:"content_content_close"_"action_action_action"]',"translate-x-(--toast-swipe-movement-x) translate-y-(--toast-swipe-movement-y)","transition-[translate,opacity] duration-(--dur-overlay) ease-out data-swiping:transition-none","data-starting-style:translate-y-2 data-starting-style:opacity-0","data-ending-style:hidden data-waiting:hidden"),children:[Wh(Oa.Content,{"data-slot":"toast-content",className:"flex min-w-0 flex-1 items-start gap-2 py-1 [grid-area:content]",children:[a!=="default"&&Ha("span",{"aria-hidden":!0,className:"flex h-lh shrink-0 items-center type-label",children:Ha(Ce,{icon:$6[a].icon,className:$6[a].className})}),Wh("div",{className:"flex min-w-0 flex-1 flex-col gap-0.5",children:[Ha(Oa.Title,{"data-slot":"toast-title",className:"type-label break-words text-text-1"}),Ha(Oa.Description,{"data-slot":"toast-description",className:"type-body-sm break-words text-text-2 empty:hidden"})]})]}),e.actionProps&&Ha(Oa.Action,{"data-slot":"toast-action",className:cf({variant:"secondary",size:"sm",className:"self-start [grid-area:action] @max-[20rem]/toast:ms-6 @max-[20rem]/toast:justify-self-start"})}),Ha(Oa.Close,{"data-slot":"toast-close","aria-label":"Dismiss",className:cf({variant:"ghost",size:"icon-sm",className:"self-start text-text-2 [grid-area:close] hover:text-text-1"}),children:Ha(Ce,{icon:tr,size:12})}),!t&&Ha(ck,{ms:r},`${e.id}-${r}-${String(e.title)}`)]})}import{host as Sa}from"@hermes/plugin-sdk";import{useSyncExternalStore as dk}from"react";function df(e){let t=e,o=new Set;return{get:()=>t,set(a){let r=typeof a=="function"?a(t):a;r&&(t={...t,...r},o.forEach(n=>n()))},subscribe(a){return o.add(a),()=>o.delete(a)}}}function Ht(e,t){return dk(e.subscribe,()=>t(e.get()),()=>t(e.get()))}var Le=df({ready:!1,bots:[],bot:null,sessionsByBot:{},sid:null,storedId:null,loading:!1,messages:[],live:null,approval:null,info:{model:"",title:""},files:[],routines:[],usage:null,error:""}),ss=null,mk=0,Wi=e=>`${e}-${Date.now().toString(36)}-${(mk++).toString(36)}`;function Kh(e){return typeof e=="string"?e:Array.isArray(e)?e.map(t=>typeof t=="string"?t:t?.text||"").filter(Boolean).join(`
`):""}function pk(e){if(!e)return{};if(typeof e=="object")return e;try{return JSON.parse(e)}catch{return{}}}var fk=/^(write_file|create_file|patch|edit_file|apply_patch)$/;function X6(e,t){if(!fk.test(String(e||"")))return[];let o=t?.path||t?.file_path||t?.target;return typeof o=="string"&&o?[o]:[]}function Yh(e){let t=[];for(let o of String(e||"").matchAll(/MEDIA:\s*(\/[^\s)]+)/g))t.push(o[1]);return t}function Y6(e){e.length&&Le.set(t=>{let o=new Set(t.files.map(r=>r.path)),a=e.filter(r=>!o.has(r)).map(r=>({path:r,at:Date.now()}));return a.length?{files:[...a,...t.files]}:null})}function gk(e){let t=[],o=[],a=null;for(let r of e||[])if(!(!r||r.display_kind==="hidden"||r.role==="system")){if(r.role==="user"){a=null;let n=Kh(r.content);if(!n.trim())continue;t.push({id:r.message_uid||Wi("u"),role:"user",text:n,at:(r.timestamp||0)*1e3});continue}if(r.role==="assistant"){a||(a={id:r.message_uid||Wi("a"),role:"assistant",text:"",reasoning:"",tools:[],at:(r.timestamp||0)*1e3,status:"done",model:r.model||""},t.push(a));let n=Kh(r.content);n.trim()&&(a.text=a.text?`${a.text}

${n}`:n);let s=r.reasoning||r.reasoning_content;s&&typeof s=="string"&&(a.reasoning=a.reasoning?`${a.reasoning}

${s}`:s);for(let l of r.tool_calls||[]){let i=l?.function?.name||l?.name,c=pk(l?.function?.arguments||l?.arguments);a.tools.push({id:l?.id||Wi("t"),name:i,done:!0}),o.push(...X6(i,c))}o.push(...Yh(n));continue}}return{turns:t.filter(r=>r.role==="user"||r.text||r.tools.length),files:[...new Set(o)]}}async function hk(){let e=[];try{let a=await Sa.request("profiles.list",{});e=Array.isArray(a?.profiles)?a.profiles:[]}catch(a){Le.set({error:`Profils illisibles : ${a?.message||a}`})}let t=[];try{t=await Sa.profileRoutes()||[]}catch{t=[]}let o=e.map(a=>{let r=t.find(n=>n.profile===a.name)||null;return{name:a.name,display_name:a.display_name||"",description:a.description||"",model:a.model||"",provider:a.provider||"",connectionId:r?.connectionId||null,route:r}});return Le.set({bots:o}),o}async function Xh(e){let t=Le.get().bots.find(o=>o.name===e);if(t)try{let a=((await Sa.listPersistedSessions(t.route,{profile:e,limit:60}))?.sessions||[]).filter(r=>!r.hidden&&!r.archived).map(r=>({id:r.id,title:r.title||r.preview||"Conversation",at:(r.last_active||r.updated_at||r.started_at||0)*1e3})).sort((r,n)=>n.at-r.at);Le.set(r=>({sessionsByBot:{...r.sessionsByBot,[e]:a}}))}catch{Le.set(a=>({sessionsByBot:{...a.sessionsByBot,[e]:a.sessionsByBot[e]||[]}}))}}async function qi(e,{keepConversation:t=!1}={}){let o=Le.get().bots.find(a=>a.name===e);if(o){ss?.storage?.set("lastBot",e),Le.set({bot:e,...t?{}:Qh()});try{await Sa.ensureAgent(o.connectionId,e)}catch(a){Le.set({error:`${e} injoignable : ${a?.message||a}`})}Xh(e),pf()}}function Qh(){return{sid:null,storedId:null,messages:[],live:null,approval:null,files:[],info:{model:"",title:""},error:""}}function Gc(){Le.set(Qh())}async function Q6(e){let{bot:t}=Le.get();Le.set({...Qh(),storedId:e,loading:!0});try{let o=await Sa.request("session.resume",{session_id:e,cols:96,source:"desktop",...t?{profile:t}:{}}),{turns:a,files:r}=gk(o?.messages);Le.set({sid:o?.session_id||e,storedId:o?.stored_session_id||e,messages:a,files:r.map(n=>({path:n,at:0})),loading:!1,live:o?.running?{phase:"thinking",verb:"",subagents:0,startedAt:Date.now(),reasoning:""}:null}),o?.running&&Jh()}catch(o){Le.set({loading:!1,error:`Conversation illisible : ${o?.message||o}`})}}function J6(e){return(ss?.storage?.get("prefs",{})||{})[e]||{}}function bk(e){return new Promise((t,o)=>{let a=new FileReader;a.onload=()=>t(String(a.result||"")),a.onerror=()=>o(a.error),a.readAsDataURL(e)})}async function yk(){let e=Le.get();if(e.sid)return e.sid;let t=J6(e.bot),o=await Sa.request("session.create",{cols:96,source:"desktop",...e.bot?{profile:e.bot}:{},...t.model?{model:t.model,...t.provider?{provider:t.provider}:{}}:{},...t.effort?{reasoning_effort:t.effort}:{},fast:!1}),a=o?.session_id;return mf.set(a,`${t.provider||""}|${t.model||""}|${t.effort||""}`),Le.set({sid:a,storedId:o?.stored_session_id||a}),a}var mf=new Map;async function wk(e){let{bot:t}=Le.get(),o=J6(t),a=`${o.provider||""}|${o.model||""}|${o.effort||""}`,r=mf.get(e);if(r===void 0){mf.set(e,a);return}if(r===a)return;mf.set(e,a);let[n,s,l]=r.split("|");try{o.model&&(o.model!==s||(o.provider||"")!==n)&&await Sa.request("slash.exec",{session_id:e,command:`/model ${o.model}${o.provider?` --provider ${o.provider}`:""}`,confirm_expensive_model:!0}),(o.effort||"")!==l&&o.effort&&await Sa.request("slash.exec",{session_id:e,command:`/reasoning ${o.effort}`})}catch{}}async function eI(e,t=[]){let o=String(e||"").trim();if(!(!o&&!t.length||Le.get().live)){Le.set(r=>({error:"",messages:[...r.messages,{id:Wi("u"),role:"user",text:o,at:Date.now(),attachments:t.map(n=>({name:n.name,kind:n.type?.startsWith("image/")?"image":"file"}))}],live:{phase:"thinking",verb:"",subagents:0,startedAt:Date.now(),reasoning:""}}));try{let r=!!Le.get().sid,n=await yk();r&&await wk(n);let s=[];for(let i of t){let c=await bk(i);if(i.type?.startsWith("image/"))await Sa.request("image.attach_bytes",{session_id:n,content_base64:c.split(",")[1]||"",filename:i.name});else{let u=await Sa.request("file.attach",{session_id:n,name:i.name,data_url:c});u?.ref_text&&s.push(u.ref_text)}}let l=[o,...s].filter(Boolean).join(`

`);await Sa.request("prompt.submit",{session_id:n,text:l}),Jh()}catch(r){oI(r?.message||String(r))}}}async function tI(){let{sid:e}=Le.get();if(e)try{await Sa.request("session.interrupt",{session_id:e})}catch{}}function oI(e){Le.set(t=>({live:null,error:e||"La réponse n'est pas arrivée.",messages:t.messages.map(o=>o.status==="streaming"?{...o,status:o.text?"done":"failed"}:o)})),e2()}var Zc=null;function Jh(){if(Zc)return;let e=async()=>{let{sid:t,live:o}=Le.get();if(!t||!o)return e2();try{let a=await Sa.request("approval.pending",{session_id:t}),n=(a?.approvals||a?.pending||(Array.isArray(a)?a:[]))[0];Le.set({approval:n?{requestId:n.request_id||n.id||"",command:n.command||"",description:n.description||"",allowPermanent:n.allow_permanent!==!1}:null})}catch{}};Zc=ss?ss.setInterval(e,1500):null,e()}function e2(){typeof Zc=="function"&&Zc(),Zc=null}function vk(e){let t=e.messages[e.messages.length-1];return t&&t.role==="assistant"&&t.status==="streaming"?[t,e.messages.slice(0,-1)]:[null,e.messages]}function $i(e){Le.set(t=>{let[o,a]=vk(t);o||(o={id:Wi("a"),role:"assistant",text:"",reasoning:"",tools:[],at:Date.now(),turnStart:t.live?.startedAt||Date.now(),status:"streaming",model:t.info.model},a=t.messages);let r=e({...o,tools:[...o.tools]});return{messages:[...a,r]}})}function _s(e){Le.set(t=>t.live?{live:{...t.live,...e}}:null)}function aI(e){if(!e||typeof e.type!="string")return;let t=Le.get(),o=e.payload||{};if(e.type==="sessions.changed"){t.bot&&Xh(t.bot);return}if(!(!t.sid||e.session_id!==t.sid))switch(e.type){case"session.info":(o.title||o.model)&&Le.set({info:{model:o.model||t.info.model,title:o.title||t.info.title}});return;case"message.start":t.live||Le.set({live:{phase:"thinking",verb:"",subagents:0,startedAt:Date.now(),reasoning:""}}),$i(a=>a);return;case"reasoning.delta":typeof o.text=="string"&&o.text&&($i(a=>({...a,reasoning:a.reasoning+o.text,thinkStart:a.thinkStart||Date.now()})),_s({phase:t.live?.phase==="tool"?"tool":"thinking"}));return;case"tool.generating":_s({phase:"tool",verb:""});return;case"tool.start":{let a=o.tool_name||o.name,r=o.args||{};if($i(n=>({...n,tools:[...n.tools,{id:o.tool_id||Wi("t"),name:a,done:!1}],thinkEnd:n.thinkEnd||Date.now()})),a==="delegate_task"){let n=Array.isArray(r.tasks)?r.tasks.length:1;_s({phase:"delegating",subagents:Math.max(n,1),toolName:a})}else _s({phase:"tool",toolName:a});return}case"tool.complete":{let a=o.tool_name||o.name;$i(r=>({...r,tools:r.tools.map(n=>n.id===o.tool_id?{...n,done:!0,error:!!o.is_error}:n)})),Y6([...X6(a,o.args||{}),...Yh(typeof o.result=="string"?o.result:"")]),_s({phase:"thinking",toolName:""});return}case"subagent.start":_s({phase:"delegating",subagents:Math.max(1,Le.get().live?.subagents||0)});return;case"message.delta":typeof o.text=="string"&&o.text&&($i(a=>({...a,text:a.text+o.text,thinkEnd:a.thinkEnd||Date.now()})),_s({phase:"writing"}));return;case"message.complete":{let a=typeof o.text=="string"?o.text:Kh(o.content),r=o.status==="error"||o.outcome==="failed";$i(n=>({...n,text:a||n.text,reasoning:n.reasoning||(typeof o.reasoning=="string"?o.reasoning:""),status:r&&!a?"failed":"done",thinkEnd:n.thinkEnd||Date.now(),model:Le.get().info.model||n.model})),Y6(Yh(a)),Le.set({live:null,approval:null,...r&&!a?{error:o.error||"La réponse n'est pas arrivée."}:{}}),e2(),t.bot&&Xh(t.bot);return}case"error":case"message.error":oI(o.message||o.error);return;default:e.type.startsWith("approval.")&&Jh()}}async function pf(){let{bot:e}=Le.get();if(e)try{let t=await Sa.request("cron.manage",{action:"list",include_disabled:!0,profile:e}),a=(Array.isArray(t?.jobs)?t.jobs:[]).filter(r=>{let n=/^\[bot:([a-z0-9][a-z0-9_-]*)\]/i.exec(r.name||"");return!n||n[1].toLowerCase()===e});Le.set({routines:a})}catch{Le.set({routines:[]})}}async function xk(e=!1){if(ss)try{let t=await ss.rest(`/usage${e?"?fresh=1":""}`,{timeoutMs:2e4});Le.set({usage:t?.providers||[]})}catch{Le.set({usage:"off"})}}function rI(e){ss=e}async function nI(){if(Le.get().ready)return;let e=await hk(),t=ss?.storage?.get("lastBot",null),o=Sa.state.profile.get(),a=e.find(r=>r.name===t)||e.find(r=>r.name===o)||e[0];Le.set({ready:!0}),a&&await qi(a.name),xk()}var ff=`/*! tailwindcss v4.3.5 | MIT License | https://tailwindcss.com */
@layer properties;
[data-system="glaze"], .glaze {
  --page: #fbfbfa;
  --paper: #ffffff;
  --shell: #f1f1f0;
  --field: #efefef;
  --code-surface: var(--paper);
  --hover: rgb(5 5 5 / 0.06);
  --hover-row: rgb(5 5 5 / 0.035);
  --pressed: rgb(5 5 5 / 0.10);
  --scrim: rgb(5 5 5 / 0.24);
  --ink: #050505;
  --ink-80: rgb(5 5 5 / 0.80);
  --ink-60: rgb(5 5 5 / 0.60);
  --ink-45: rgb(5 5 5 / 0.45);
  --ink-32: rgb(5 5 5 / 0.32);
  --ink-15: rgb(5 5 5 / 0.15);
  --ink-10: rgb(5 5 5 / 0.10);
  --ink-06: rgb(5 5 5 / 0.06);
  --ink-03: rgb(5 5 5 / 0.03);
  --text-1: rgb(5 5 5 / 0.80);
  --text-2: rgb(5 5 5 / 0.60);
  --text-3: rgb(5 5 5 / 0.45);
  --text-disabled: rgb(5 5 5 / 0.32);
  --text-inverse: #ffffff;
  --line-faint: rgb(5 5 5 / 0.06);
  --line: rgb(5 5 5 / 0.10);
  --line-control: rgb(5 5 5 / 0.15);
  --line-focus: rgb(5 5 5 / 0.32);
  --line-strong: rgb(5 5 5 / 0.45);
  --focus: rgb(5 5 5 / 0.80);
  --ok: #2c9a59;
  --ok-text: #1a7640;
  --ok-tint: #e6f4ea;
  --warn: #d98a0b;
  --warn-text: #8a5a00;
  --warn-tint: #fbf0d9;
  --fail: #e35e49;
  --fail-text: #b23c29;
  --fail-tint: #fbe9e5;
  --glass-ink-base: rgb(0 0 0 / 0.66);
  --glass-ink-text: rgb(255 255 255 / 0.90);
  --glass-ink-ring: rgb(0 0 0 / 0.56);
  --glass-coral-base: rgb(150 34 18 / 0.88);
  --glass-coral-text: rgb(255 255 255 / 0.90);
  --glass-coral-ring: rgb(110 24 12 / 0.56);
  --glass-green-base: rgb(6 86 40 / 0.88);
  --glass-green-text: rgb(255 255 255 / 0.90);
  --glass-green-ring: rgb(4 64 28 / 0.56);
  --glass-sheen: 0.12;
  --glass-sheen-hover: 0.16;
  --glass-core: 0.32;
  --glass-core-held: 0.44;
  --glass-rim: 0.24;
  --glass-glaze: 0.06;
  --glass-gloss: 0.28;
  --glass-blur: 6px;
  --gloss-inset: 0.28;
  --gloss-top: 1.5px;
  --gloss-height: 44%;
  --flat-bg: var(--paper);
  --flat-ring: var(--line-faint);
  --flat-text: var(--text-1);
  --flat-hover: #f8f8f8;
  --switch-off: rgb(5 5 5 / 0.10);
  --switch-knob: #ffffff;
  --switch-mark: rgb(5 5 5 / 0.60);
  --glaze-sm-top: #6b6b6b;
  --glaze-sm-mid: #3d3d3d;
  --glaze-sm-bottom: #232323;
  --glaze-sm-highlight: rgb(255 255 255 / 0.30);
  --glaze-sm-rim: rgb(0 0 0 / 0.55);
  --glaze-sm-text: rgb(255 255 255 / 0.92);
  --shadow-none: none;
  --font-sans: "Glaze Sans", "Geist", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: "Glaze Mono", "Geist Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  --mono-scale: 0.8;
  --weight-normal: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --type-title: 500 28px/1.2 var(--font-sans);
  --type-heading: 500 20px/1.3 var(--font-sans);
  --type-heading-sm: 500 16px/1.35 var(--font-sans);
  --type-body: 400 14px/1.5 var(--font-sans);
  --type-body-sm: 400 13px/1.5 var(--font-sans);
  --type-label: 500 13px/1.35 var(--font-sans);
  --type-label-sm: 500 12px/1.35 var(--font-sans);
  --type-label-lg: 500 14px/1.35 var(--font-sans);
  --type-caption: 400 12px/1.35 var(--font-sans);
  --type-code: 400 calc(14px * var(--mono-scale))/1.5 var(--font-mono);
  --type-code-sm: 400 calc(13px * var(--mono-scale))/1.5 var(--font-mono);
  --type-code-xs: 400 calc(12px * var(--mono-scale))/1.35 var(--font-mono);
  --type-code-block: 400 12px/20px var(--font-mono);
  --tracking-heading: -0.025em;
  --tracking-body: 0em;
  --tracking-label: 0.02em;
  --space-0-5: 2px;
  --space-1: 4px;
  --space-1-5: 6px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --shell-inset: 3px;
  --shell-foot-inset: 6px;
  --control-sm: 26px;
  --control: 32px;
  --control-lg: 36px;
  --row: 36px;
  --icon-sm: 12px;
  --icon: 14px;
  --icon-lg: 16px;
  --radius-pill: 999px;
  --radius-shell: 14px;
  --radius-panel: 11px;
  --radius-overlay: 10px;
  --radius-row-focus: calc(var(--radius-panel) - var(--line-width));
  --radius-tag: 6px;
  --line-width: 1px;
  --focus-width: 2px;
  --focus-offset: 2px;
  --focus-width-sm: 1.5px;
  --focus-offset-sm: 1px;
  --dur-press: 120ms;
  --dur-glass-press: 50ms;
  --dur-glass-release: 200ms;
  --dur-state: 160ms;
  --dur-overlay: 200ms;
  --overlay-shift: 4px;
  --scale-overlay: 0.97;
  --dur-spin: 800ms;
  --dur-slide: 200ms;
  --dur-sweep: 1400ms;
  --wait-show: 150ms;
  --wait-hold: 400ms;
  --stale: 0.6;
  --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --scale-press-flat: 0.99;
  --scale-press: 0.97;
  --scale-press-glass: 0.99;
  --z-raised: 10;
  --z-sticky: 20;
  --z-overlay: 50;
  --overlay-sm: 400px;
  --overlay: 480px;
  --overlay-lg: 640px;
  --popover: 288px;
  --toast: 360px;
  --menu-min: 192px;
  --menu-row: 32px;
  --menu-row-sm: 28px;
  --popup-max: 320px;
  --tooltip-max: 256px;
  --label-col: 160px;
  --progress-bar-sm: 4px;
  --progress-bar: 6px;
  --progress-bar-lg: 8px;
  --progress-sweep: 32%;
  --measure: 68ch;
  --measure-hint: 60ch;
  --scrollbar-thumb: rgb(5 5 5 / 0.20);
  --scrollbar-size: 10px;
  --scrollbar-gap: 2px;
}
[data-system="glaze"][data-theme="dark"], .glaze[data-theme="dark"], [data-theme="dark"] [data-system="glaze"], [data-theme="dark"] .glaze {
  --page: #0c0c0c;
  --paper: #1f1f1f;
  --shell: #161616;
  --field: #2a2a2a;
  --hover: rgb(244 244 243 / 0.06);
  --hover-row: rgb(244 244 243 / 0.04);
  --pressed: rgb(244 244 243 / 0.10);
  --scrim: rgb(0 0 0 / 0.64);
  --ink: #f4f4f3;
  --ink-80: #f4f4f3;
  --ink-60: rgb(244 244 243 / 0.60);
  --ink-45: rgb(244 244 243 / 0.45);
  --ink-32: rgb(244 244 243 / 0.34);
  --ink-15: rgb(244 244 243 / 0.15);
  --ink-10: rgb(244 244 243 / 0.10);
  --ink-06: rgb(244 244 243 / 0.06);
  --ink-03: rgb(244 244 243 / 0.03);
  --text-1: #f4f4f3;
  --text-2: rgb(244 244 243 / 0.60);
  --text-3: rgb(244 244 243 / 0.45);
  --text-disabled: rgb(244 244 243 / 0.34);
  --text-inverse: #050505;
  --line-faint: rgb(244 244 243 / 0.06);
  --line: rgb(244 244 243 / 0.10);
  --line-control: rgb(244 244 243 / 0.15);
  --line-focus: rgb(244 244 243 / 0.34);
  --line-strong: rgb(244 244 243 / 0.45);
  --focus: #f4f4f3;
  --ok: #3fbf75;
  --ok-text: #6fd69a;
  --ok-tint: #13261a;
  --warn: #f0a531;
  --warn-text: #f5c065;
  --warn-tint: #2a2010;
  --fail: #ec6f5a;
  --fail-text: #f2917f;
  --fail-tint: #2c1714;
  --glass-ink-base: rgb(255 255 255 / 0.62);
  --glass-ink-text: rgb(5 5 5 / 0.90);
  --glass-ink-ring: rgb(255 255 255 / 0.24);
  --glass-coral-base: rgb(245 140 120 / 0.86);
  --glass-coral-text: rgb(5 5 5 / 0.90);
  --glass-coral-ring: rgb(245 140 120 / 0.40);
  --glass-green-base: rgb(110 215 150 / 0.86);
  --glass-green-text: rgb(5 5 5 / 0.90);
  --glass-green-ring: rgb(110 215 150 / 0.40);
  --glass-sheen: 0.16;
  --glass-sheen-hover: 0.24;
  --glass-core: 0;
  --glass-core-held: 0.06;
  --glass-rim: 0.4;
  --glass-glaze: 0.14;
  --glass-gloss: 0.6;
  --flat-hover: #262626;
  --switch-off: rgb(244 244 243 / 0.15);
  --switch-knob: #e8e8e7;
  --switch-mark: rgb(5 5 5 / 0.60);
  --glaze-sm-top: #fbfbfa;
  --glaze-sm-mid: #dcdcdb;
  --glaze-sm-bottom: #bdbdbc;
  --glaze-sm-highlight: rgb(255 255 255 / 0.90);
  --glaze-sm-rim: rgb(255 255 255 / 0.22);
  --glaze-sm-text: rgb(5 5 5 / 0.88);
  --scrollbar-thumb: rgb(244 244 243 / 0.20);
}
@media (prefers-reduced-motion: reduce) {
  [data-system="glaze"], .glaze {
    --dur-press: 0ms;
    --dur-state: 0ms;
    --dur-overlay: 0ms;
    --scale-press: 1;
    --scale-press-flat: 1;
    --scale-press-glass: 1;
    --dur-glass-press: 0ms;
    --dur-glass-release: 0ms;
    --dur-slide: 0ms;
  }
}
[data-system="glaze"], .glaze {
  background: var(--page);
  color: var(--text-1);
  font: var(--type-body);
  letter-spacing: var(--tracking-body);
  text-wrap: pretty;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color-scheme: light;
}
[data-system="glaze"][data-theme="dark"], .glaze[data-theme="dark"], [data-theme="dark"] [data-system="glaze"], [data-theme="dark"] .glaze {
  color-scheme: dark;
}
@layer base {
  .glaze :where(*, ::before, ::after), [data-system="glaze"] :where(*, ::before, ::after) {
    box-sizing: border-box;
    border: 0 solid var(--line-faint);
    margin: 0;
    padding: 0;
  }
  .glaze :where(h1, h2, h3, h4, h5, h6, p, figure, blockquote, dl, dd, pre) {
    margin: 0;
    font: inherit;
  }
  .glaze :where(ul, ol) {
    list-style: none;
  }
  .glaze :where(a) {
    color: inherit;
    text-decoration: inherit;
  }
  .glaze :where(button, input, select, textarea) {
    font: inherit;
    letter-spacing: inherit;
    color: inherit;
    background: transparent;
  }
  .glaze :where(button, [role="button"]) {
    cursor: pointer;
  }
  .glaze :where(button:disabled, [aria-disabled="true"]) {
    cursor: not-allowed;
  }
  .glaze :where(img, video, canvas, svg) {
    display: block;
    max-width: 100%;
  }
  .glaze :where(table) {
    border-collapse: collapse;
  }
  .glaze :where(code, kbd, samp) {
    font-family: var(--font-mono);
    font-size: calc(1em * var(--mono-scale));
    letter-spacing: 0;
  }
  .glaze :where(pre) {
    font-family: var(--font-mono);
  }
  .glaze :where(td, th, time, data, output) {
    font-variant-numeric: tabular-nums;
  }
  .glaze :where(a, button, summary, input, select, textarea, label, [role="button"], [role="tab"], [role="menuitem"], [role="option"], [role="switch"], [role="checkbox"], [role="radio"]) {
    transition-property: color, background-color, border-color, opacity;
    transition-duration: var(--dur-state);
    transition-timing-function: var(--ease-out);
  }
  .glaze :where(*, ::before, ::after), [data-system="glaze"] :where(*, ::before, ::after) {
    outline-color: var(--focus);
  }
}
.glaze ::selection {
  background: var(--ink-15);
  color: var(--text-1);
}
.glaze :where(*):is(:focus-visible, [data-force-focus-visible]) {
  outline: var(--focus-width) solid var(--focus);
  outline-offset: var(--focus-offset);
}
@supports selector(::-webkit-scrollbar) {
  @layer base {
    .glaze, .glaze *, [data-system="glaze"], [data-system="glaze"] * {
      scrollbar-color: auto;
    }
  }
}
.glaze ::-webkit-scrollbar, .glaze::-webkit-scrollbar, [data-system="glaze"] ::-webkit-scrollbar {
  width: var(--scrollbar-size);
  height: var(--scrollbar-size);
  background: transparent;
}
.glaze ::-webkit-scrollbar-thumb, .glaze::-webkit-scrollbar-thumb, [data-system="glaze"] ::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-thumb);
  background-clip: padding-box;
  border: var(--scrollbar-gap) solid transparent;
  border-radius: var(--radius-pill);
}
.glaze ::-webkit-scrollbar-track, .glaze ::-webkit-scrollbar-corner, [data-system="glaze"] ::-webkit-scrollbar-track, [data-system="glaze"] ::-webkit-scrollbar-corner {
  background: transparent;
}
.glaze ::-webkit-scrollbar-button, [data-system="glaze"] ::-webkit-scrollbar-button {
  display: none;
}
@supports not selector(::-webkit-scrollbar) {
  .glaze, .glaze *, [data-system="glaze"], [data-system="glaze"] * {
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-thumb) transparent;
  }
}
@media (pointer: coarse) {
  .glaze input:not([type="checkbox"], [type="radio"], [type="range"], [type="button"], [type="submit"], [type="file"]), .glaze textarea, .glaze select {
    font-size: max(16px, 1em);
  }
}
:where(.glaze, [data-system="glaze"]) .\\@container\\/field-group {
  container-type: inline-size;
  container-name: field-group;
}
:where(.glaze, [data-system="glaze"]) .\\@container\\/item {
  container-type: inline-size;
  container-name: item;
}
:where(.glaze, [data-system="glaze"]) .\\@container\\/prompt-toolbar {
  container-type: inline-size;
  container-name: prompt-toolbar;
}
:where(.glaze, [data-system="glaze"]) .\\@container\\/queue-row {
  container-type: inline-size;
  container-name: queue-row;
}
:where(.glaze, [data-system="glaze"]) .\\@container\\/reasoning {
  container-type: inline-size;
  container-name: reasoning;
}
:where(.glaze, [data-system="glaze"]) .\\@container\\/toast {
  container-type: inline-size;
  container-name: toast;
}
:where(.glaze, [data-system="glaze"]) .glass {
  --gl-sheen: var(--glass-sheen);
  --gl-sheen-hover: var(--glass-sheen-hover);
  --gl-core: var(--glass-core);
  --gl-core-held: var(--glass-core-held);
  --gl-rim: var(--glass-rim);
  --gl-rim-a: #ffffff;
  --gl-rim-b: #999999;
  --gl-glaze-hi: var(--glass-glaze);
  --gl-gloss: var(--glass-gloss);
  --gl-base: var(--glass-base, var(--glass-ink-base));
  --gl-text: var(--glass-text, var(--glass-ink-text));
  --gl-ring: var(--glass-ring, var(--glass-ink-ring));
  --gl-ring-w: 0.75px;
  --gl-sheen-now: var(--gl-sheen);
  --gl-core-now: var(--gl-core);
  --gl-glint-now: var(--gl-glint, 0);
  --gl-tint-now: var(--gl-tint, 0);
  position: relative;
  isolation: isolate;
  color: var(--gl-text);
  background-color: var(--gl-base);
  background-image: linear-gradient(99deg, transparent 27.7%, rgb(255 255 255 / var(--gl-glint-now, 0)) 60.19%, transparent 86.06%), radial-gradient(65.62% 65.62% at 50% 50%, rgb(0 0 0 / var(--gl-core-now)), transparent), linear-gradient(rgb(255 255 255 / var(--gl-sheen-now)), transparent), linear-gradient(rgb(255 255 255 / var(--gl-glaze-hi, 0)) 0%, rgb(255 255 255 / calc(var(--gl-glaze-hi, 0) * 0.4)) 50%, rgb(0 0 0 / var(--gl-glaze-lo, 0)) 50%, rgb(0 0 0 / var(--gl-glaze-lo, 0)) 100%), linear-gradient(rgb(0 0 0 / var(--gl-tint-now, 0)), rgb(0 0 0 / var(--gl-tint-now, 0)));
  box-shadow: inset 0 -12px 16px 0 rgb(255 255 255 / 0.06), inset 0 4px 16px 0 rgb(255 255 255 / 0.16), inset 0 0.75px 0.25px 0 rgb(255 255 255 / 0.12), inset 0 0.25px 0.25px 0 rgb(255 255 255 / 0.32), 0 0 0 var(--gl-ring-w) var(--gl-ring);
  -webkit-backdrop-filter: blur(var(--glass-blur));
  backdrop-filter: blur(var(--glass-blur));
  -webkit-tap-highlight-color: transparent;
  transition-property: scale, color, opacity;
  transition-duration: var(--dur-glass-release);
  transition-timing-function: var(--ease-out);
  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    pointer-events: none;
    inset: 0;
    padding: var(--line-width);
    border-radius: inherit;
    background-image: linear-gradient(var(--gl-rim-a) 0%, var(--gl-rim-b) 55%, var(--gl-rim-a) 80%, var(--gl-rim-b) 95%);
    opacity: var(--gl-rim);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
  }
  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    pointer-events: none;
    inset-inline: calc(var(--glass-h, var(--control)) * var(--gloss-inset));
    top: var(--gloss-top);
    height: var(--gloss-height);
    border-radius: var(--radius-pill);
    background-image: linear-gradient(rgb(255 255 255 / var(--gl-gloss)), transparent);
    transition-property: opacity;
    transition-duration: var(--dur-glass-release);
  }
  @media (hover: hover) {
    &:hover:not(:disabled, [data-disabled], [aria-busy="true"]) {
      --gl-sheen-now: var(--gl-sheen-hover);
      --gl-tint-now: var(--gl-tint-hover, 0);
    }
  }
  &[data-force-hover]:not(:disabled, [data-disabled]) {
    --gl-sheen-now: var(--gl-sheen-hover);
    --gl-tint-now: var(--gl-tint-hover, 0);
  }
  &:is(:active, [data-force-active]):not(:disabled, [data-disabled]) {
    --gl-sheen-now: 0;
    --gl-core-now: var(--gl-core-held);
    --gl-glint-now: 0;
    --gl-tint-now: var(--gl-tint-held, 0);
    scale: var(--scale-press-glass);
    transition-duration: var(--dur-glass-press);
  }
  &:is(:active, [data-force-active]):not(:disabled, [data-disabled])::after {
    opacity: 0.6;
    transition-duration: var(--dur-glass-press);
  }
  &:is(:disabled, [data-disabled], [aria-disabled="true"]):not([aria-busy="true"]) {
    background-image: none;
    background-color: var(--field);
    box-shadow: 0 0 0 var(--line-width) var(--line-faint);
    color: var(--text-disabled);
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
  &:is(:disabled, [data-disabled], [aria-disabled="true"]):not([aria-busy="true"])::before {
    display: none;
  }
  &:is(:disabled, [data-disabled], [aria-disabled="true"]):not([aria-busy="true"])::after {
    display: none;
  }
  @media (forced-colors: active) {
    background-image: none;
    box-shadow: none;
    border: var(--line-width) solid ButtonText;
    &::before, &::after {
      display: none;
    }
  }
}
:where(.glaze, [data-system="glaze"]) .pointer-events-none {
  pointer-events: none;
}
:where(.glaze, [data-system="glaze"]) .collapse {
  visibility: collapse;
}
:where(.glaze, [data-system="glaze"]) .invisible {
  visibility: hidden;
}
:where(.glaze, [data-system="glaze"]) .visible {
  visibility: visible;
}
:where(.glaze, [data-system="glaze"]) .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border-width: 0;
}
:where(.glaze, [data-system="glaze"]) .absolute {
  position: absolute;
}
:where(.glaze, [data-system="glaze"]) .fixed {
  position: fixed;
}
:where(.glaze, [data-system="glaze"]) .relative {
  position: relative;
}
:where(.glaze, [data-system="glaze"]) .static {
  position: static;
}
:where(.glaze, [data-system="glaze"]) .sticky {
  position: sticky;
}
:where(.glaze, [data-system="glaze"]) .inset-0 {
  inset: 0px;
}
:where(.glaze, [data-system="glaze"]) .inset-x-0 {
  inset-inline: 0px;
}
:where(.glaze, [data-system="glaze"]) .inset-x-3 {
  inset-inline: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .inset-y-0 {
  inset-block: 0px;
}
:where(.glaze, [data-system="glaze"]) .inset-y-0\\.5 {
  inset-block: calc(var(--space-1) * 0.5);
}
:where(.glaze, [data-system="glaze"]) .start-0 {
  inset-inline-start: calc(var(--space-1) * 0);
}
:where(.glaze, [data-system="glaze"]) .start-2 {
  inset-inline-start: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .end-0 {
  inset-inline-end: calc(var(--space-1) * 0);
}
:where(.glaze, [data-system="glaze"]) .end-1 {
  inset-inline-end: calc(var(--space-1) * 1);
}
:where(.glaze, [data-system="glaze"]) .end-3 {
  inset-inline-end: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .end-4 {
  inset-inline-end: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .top-0 {
  top: 0px;
}
:where(.glaze, [data-system="glaze"]) .top-1\\.5 {
  top: calc(var(--space-1) * 1.5);
}
:where(.glaze, [data-system="glaze"]) .top-1\\/2 {
  top: calc(1 / 2 * 100%);
}
:where(.glaze, [data-system="glaze"]) .top-3 {
  top: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .bottom-0 {
  bottom: 0px;
}
:where(.glaze, [data-system="glaze"]) .bottom-4 {
  bottom: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .bottom-6 {
  bottom: calc(var(--space-1) * 6);
}
:where(.glaze, [data-system="glaze"]) .left-0 {
  left: 0px;
}
:where(.glaze, [data-system="glaze"]) .isolate {
  isolation: isolate;
}
:where(.glaze, [data-system="glaze"]) .z-\\(--z-overlay\\) {
  z-index: var(--z-overlay);
}
:where(.glaze, [data-system="glaze"]) .z-\\(--z-raised\\) {
  z-index: var(--z-raised);
}
:where(.glaze, [data-system="glaze"]) .order-last {
  order: 9999;
}
:where(.glaze, [data-system="glaze"]) .col-start-1 {
  grid-column-start: 1;
}
:where(.glaze, [data-system="glaze"]) .col-start-2 {
  grid-column-start: 2;
}
:where(.glaze, [data-system="glaze"]) .row-span-2 {
  grid-row: span 2 / span 2;
}
:where(.glaze, [data-system="glaze"]) .row-start-1 {
  grid-row-start: 1;
}
:where(.glaze, [data-system="glaze"]) .container {
  width: 100%;
  @media (width >= 640px) {
    max-width: 640px;
  }
  @media (width >= 768px) {
    max-width: 768px;
  }
  @media (width >= 1024px) {
    max-width: 1024px;
  }
  @media (width >= 1280px) {
    max-width: 1280px;
  }
}
:where(.glaze, [data-system="glaze"]) .-mx-1 {
  margin-inline: calc(var(--space-1) * -1);
}
:where(.glaze, [data-system="glaze"]) .-mx-1\\.5 {
  margin-inline: calc(var(--space-1) * -1.5);
}
:where(.glaze, [data-system="glaze"]) .-mx-2 {
  margin-inline: calc(var(--space-1) * -2);
}
:where(.glaze, [data-system="glaze"]) .-mx-3 {
  margin-inline: calc(var(--space-1) * -3);
}
:where(.glaze, [data-system="glaze"]) .mx-4 {
  margin-inline: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .mx-auto {
  margin-inline: auto;
}
:where(.glaze, [data-system="glaze"]) .mx-px {
  margin-inline: 1px;
}
:where(.glaze, [data-system="glaze"]) .-my-0\\.5 {
  margin-block: calc(var(--space-1) * -0.5);
}
:where(.glaze, [data-system="glaze"]) .-my-1 {
  margin-block: calc(var(--space-1) * -1);
}
:where(.glaze, [data-system="glaze"]) .my-1 {
  margin-block: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .my-2 {
  margin-block: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .-ms-2 {
  margin-inline-start: calc(var(--space-1) * -2);
}
:where(.glaze, [data-system="glaze"]) .ms-2 {
  margin-inline-start: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .ms-auto {
  margin-inline-start: auto;
}
:where(.glaze, [data-system="glaze"]) .-me-2 {
  margin-inline-end: calc(var(--space-1) * -2);
}
:where(.glaze, [data-system="glaze"]) .me-1 {
  margin-inline-end: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .me-2 {
  margin-inline-end: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .mt-0\\.5 {
  margin-top: calc(var(--space-1) * 0.5);
}
:where(.glaze, [data-system="glaze"]) .mt-1 {
  margin-top: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .-mb-2 {
  margin-bottom: calc(var(--space-1) * -2);
}
:where(.glaze, [data-system="glaze"]) .mb-\\(--shell-inset\\) {
  margin-bottom: var(--shell-inset);
}
:where(.glaze, [data-system="glaze"]) .field {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
  height: var(--field-h, var(--control));
  padding-inline: var(--space-3);
  background-color: var(--paper);
  border: var(--line-width) solid var(--line-control);
  border-radius: var(--radius-pill);
  color: var(--text-1);
  font: var(--type-body-sm);
  letter-spacing: var(--tracking-body);
  transition-property: border-color, background-color, color;
  transition-duration: var(--dur-state);
  transition-timing-function: var(--ease-out);
  &::placeholder, & ::placeholder {
    color: var(--text-3);
  }
  &:is(:focus-visible, [data-force-focus-visible]) {
    outline: none;
  }
  &:is(:focus-within, [data-force-focus], [data-force-focus-visible]) {
    border-color: var(--line-focus);
  }
  &:is([aria-invalid="true"], :has([aria-invalid="true"])) {
    border-color: var(--fail);
  }
  &:is(:disabled, [data-disabled], :has(:disabled)) {
    background-color: var(--field);
    color: var(--text-disabled);
  }
}
:where(.glaze, [data-system="glaze"]) .shell-foot {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
  min-height: calc(var(--control-sm) + 2 * var(--shell-foot-inset) - var(--shell-inset));
  padding-block: var(--shell-foot-inset) calc(var(--shell-foot-inset) - var(--shell-inset));
  padding-inline: calc(var(--space-3) + var(--line-width)) calc(var(--shell-foot-inset) - var(--shell-inset));
  font: var(--type-caption);
  letter-spacing: var(--tracking-body);
  color: var(--text-2);
  :where(& > :not(button, [data-slot="button"])) {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
:where(.glaze, [data-system="glaze"]) .shell {
  display: grid;
  min-width: 0;
  background-color: var(--shell);
  border: var(--line-width) solid var(--line-faint);
  border-radius: var(--radius-shell);
  padding: var(--shell-inset);
}
:where(.glaze, [data-system="glaze"]) .line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
:where(.glaze, [data-system="glaze"]) .\\!inline {
  display: inline !important;
}
:where(.glaze, [data-system="glaze"]) .block {
  display: block;
}
:where(.glaze, [data-system="glaze"]) .contents {
  display: contents;
}
:where(.glaze, [data-system="glaze"]) .flex {
  display: flex;
}
:where(.glaze, [data-system="glaze"]) .grid {
  display: grid;
}
:where(.glaze, [data-system="glaze"]) .hidden {
  display: none;
}
:where(.glaze, [data-system="glaze"]) .inline {
  display: inline;
}
:where(.glaze, [data-system="glaze"]) .inline-block {
  display: inline-block;
}
:where(.glaze, [data-system="glaze"]) .inline-flex {
  display: inline-flex;
}
:where(.glaze, [data-system="glaze"]) .table {
  display: table;
}
:where(.glaze, [data-system="glaze"]) .table-caption {
  display: table-caption;
}
:where(.glaze, [data-system="glaze"]) .table-cell {
  display: table-cell;
}
:where(.glaze, [data-system="glaze"]) .table-row {
  display: table-row;
}
:where(.glaze, [data-system="glaze"]) .field-sizing-content {
  field-sizing: content;
}
:where(.glaze, [data-system="glaze"]) .aspect-square {
  aspect-ratio: 1 / 1;
}
:where(.glaze, [data-system="glaze"]) .size-\\(--action-h\\) {
  width: var(--action-h);
  height: var(--action-h);
}
:where(.glaze, [data-system="glaze"]) .size-\\(--attachment-media\\) {
  width: var(--attachment-media);
  height: var(--attachment-media);
}
:where(.glaze, [data-system="glaze"]) .size-\\(--control\\) {
  width: var(--control);
  height: var(--control);
}
:where(.glaze, [data-system="glaze"]) .size-\\(--control-lg\\) {
  width: var(--control-lg);
  height: var(--control-lg);
}
:where(.glaze, [data-system="glaze"]) .size-\\(--control-sm\\) {
  width: var(--control-sm);
  height: var(--control-sm);
}
:where(.glaze, [data-system="glaze"]) .size-\\(--icon\\) {
  width: var(--icon);
  height: var(--icon);
}
:where(.glaze, [data-system="glaze"]) .size-1\\.5 {
  width: calc(var(--space-1) * 1.5);
  height: calc(var(--space-1) * 1.5);
}
:where(.glaze, [data-system="glaze"]) .size-2 {
  width: calc(var(--space-1) * 2);
  height: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .size-3 {
  width: calc(var(--space-1) * 3);
  height: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .size-4 {
  width: calc(var(--space-1) * 4);
  height: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .size-4\\.5 {
  width: calc(var(--space-1) * 4.5);
  height: calc(var(--space-1) * 4.5);
}
:where(.glaze, [data-system="glaze"]) .size-5 {
  width: calc(var(--space-1) * 5);
  height: calc(var(--space-1) * 5);
}
:where(.glaze, [data-system="glaze"]) .size-6 {
  width: calc(var(--space-1) * 6);
  height: calc(var(--space-1) * 6);
}
:where(.glaze, [data-system="glaze"]) .size-8 {
  width: calc(var(--space-1) * 8);
  height: calc(var(--space-1) * 8);
}
:where(.glaze, [data-system="glaze"]) .size-30 {
  width: calc(var(--space-1) * 30);
  height: calc(var(--space-1) * 30);
}
:where(.glaze, [data-system="glaze"]) .size-\\[calc\\(var\\(--control-sm\\)-2\\*var\\(--shell-inset\\)-2\\*var\\(--line-width\\)\\)\\] {
  width: calc(var(--control-sm) - 2 * var(--shell-inset) - 2 * var(--line-width));
  height: calc(var(--control-sm) - 2 * var(--shell-inset) - 2 * var(--line-width));
}
:where(.glaze, [data-system="glaze"]) .size-full {
  width: 100%;
  height: 100%;
}
:where(.glaze, [data-system="glaze"]) .h-\\(--action-h\\) {
  height: var(--action-h);
}
:where(.glaze, [data-system="glaze"]) .h-\\(--control\\) {
  height: var(--control);
}
:where(.glaze, [data-system="glaze"]) .h-\\(--control-lg\\) {
  height: var(--control-lg);
}
:where(.glaze, [data-system="glaze"]) .h-\\(--control-sm\\) {
  height: var(--control-sm);
}
:where(.glaze, [data-system="glaze"]) .h-\\(--live\\) {
  height: var(--live);
}
:where(.glaze, [data-system="glaze"]) .h-\\(--menu-row\\) {
  height: var(--menu-row);
}
:where(.glaze, [data-system="glaze"]) .h-\\(--menu-row-sm\\) {
  height: var(--menu-row-sm);
}
:where(.glaze, [data-system="glaze"]) .h-\\(--progress-bar-sm\\) {
  height: var(--progress-bar-sm);
}
:where(.glaze, [data-system="glaze"]) .h-\\(--row\\) {
  height: var(--row);
}
:where(.glaze, [data-system="glaze"]) .h-0\\.5 {
  height: calc(var(--space-1) * 0.5);
}
:where(.glaze, [data-system="glaze"]) .h-1\\/2 {
  height: calc(1 / 2 * 100%);
}
:where(.glaze, [data-system="glaze"]) .h-2 {
  height: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .h-4 {
  height: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .h-5 {
  height: calc(var(--space-1) * 5);
}
:where(.glaze, [data-system="glaze"]) .h-8 {
  height: calc(var(--space-1) * 8);
}
:where(.glaze, [data-system="glaze"]) .h-14 {
  height: calc(var(--space-1) * 14);
}
:where(.glaze, [data-system="glaze"]) .h-\\[max\\(var\\(--control\\)\\,calc\\(1lh\\+var\\(--space-2\\)\\)\\)\\] {
  height: max(var(--control), calc(1lh + var(--space-2)));
}
:where(.glaze, [data-system="glaze"]) .h-\\[max\\(var\\(--control-lg\\)\\,calc\\(1lh\\+var\\(--space-2\\)\\)\\)\\] {
  height: max(var(--control-lg), calc(1lh + var(--space-2)));
}
:where(.glaze, [data-system="glaze"]) .h-\\[max\\(var\\(--control-sm\\)\\,calc\\(1lh\\+var\\(--space-2\\)\\)\\)\\] {
  height: max(var(--control-sm), calc(1lh + var(--space-2)));
}
:where(.glaze, [data-system="glaze"]) .h-auto {
  height: auto;
}
:where(.glaze, [data-system="glaze"]) .h-dvh {
  height: 100dvh;
}
:where(.glaze, [data-system="glaze"]) .h-full {
  height: 100%;
}
:where(.glaze, [data-system="glaze"]) .h-lh {
  height: 1lh;
}
:where(.glaze, [data-system="glaze"]) .h-max {
  height: max-content;
}
:where(.glaze, [data-system="glaze"]) .h-px {
  height: 1px;
}
:where(.glaze, [data-system="glaze"]) .max-h-\\(--code-max\\) {
  max-height: var(--code-max);
}
:where(.glaze, [data-system="glaze"]) .max-h-\\(--popup-max\\) {
  max-height: var(--popup-max);
}
:where(.glaze, [data-system="glaze"]) .max-h-40 {
  max-height: calc(var(--space-1) * 40);
}
:where(.glaze, [data-system="glaze"]) .max-h-60 {
  max-height: calc(var(--space-1) * 60);
}
:where(.glaze, [data-system="glaze"]) .max-h-\\[min\\(var\\(--popup-max\\)\\,var\\(--available-height\\)\\)\\] {
  max-height: min(var(--popup-max), var(--available-height));
}
:where(.glaze, [data-system="glaze"]) .min-h-\\(--control\\) {
  min-height: var(--control);
}
:where(.glaze, [data-system="glaze"]) .min-h-\\(--control-sm\\) {
  min-height: var(--control-sm);
}
:where(.glaze, [data-system="glaze"]) .min-h-\\(--menu-item-h\\) {
  min-height: var(--menu-item-h);
}
:where(.glaze, [data-system="glaze"]) .min-h-\\(--menu-row\\) {
  min-height: var(--menu-row);
}
:where(.glaze, [data-system="glaze"]) .min-h-\\(--menu-row-sm\\) {
  min-height: var(--menu-row-sm);
}
:where(.glaze, [data-system="glaze"]) .min-h-\\(--row\\) {
  min-height: var(--row);
}
:where(.glaze, [data-system="glaze"]) .min-h-0 {
  min-height: 0px;
}
:where(.glaze, [data-system="glaze"]) .min-h-4 {
  min-height: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .min-h-5 {
  min-height: calc(var(--space-1) * 5);
}
:where(.glaze, [data-system="glaze"]) .min-h-6 {
  min-height: calc(var(--space-1) * 6);
}
:where(.glaze, [data-system="glaze"]) .min-h-11 {
  min-height: calc(var(--space-1) * 11);
}
:where(.glaze, [data-system="glaze"]) .min-h-full {
  min-height: 100%;
}
:where(.glaze, [data-system="glaze"]) .min-h-lh {
  min-height: 1lh;
}
:where(.glaze, [data-system="glaze"]) .w-\\(--action-h\\) {
  width: var(--action-h);
}
:where(.glaze, [data-system="glaze"]) .w-\\(--aside-w\\) {
  width: var(--aside-w);
}
:where(.glaze, [data-system="glaze"]) .w-\\(--gutter\\) {
  width: var(--gutter);
}
:where(.glaze, [data-system="glaze"]) .w-\\(--pct\\) {
  width: var(--pct);
}
:where(.glaze, [data-system="glaze"]) .w-\\(--rail-w\\) {
  width: var(--rail-w);
}
:where(.glaze, [data-system="glaze"]) .w-\\(--seg-w\\) {
  width: var(--seg-w);
}
:where(.glaze, [data-system="glaze"]) .w-0\\.5 {
  width: calc(var(--space-1) * 0.5);
}
:where(.glaze, [data-system="glaze"]) .w-1\\/2 {
  width: calc(1 / 2 * 100%);
}
:where(.glaze, [data-system="glaze"]) .w-1\\/3 {
  width: calc(1 / 3 * 100%);
}
:where(.glaze, [data-system="glaze"]) .w-2 {
  width: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .w-2\\/3 {
  width: calc(2 / 3 * 100%);
}
:where(.glaze, [data-system="glaze"]) .w-3\\/4 {
  width: calc(3 / 4 * 100%);
}
:where(.glaze, [data-system="glaze"]) .w-4 {
  width: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .w-10 {
  width: calc(var(--space-1) * 10);
}
:where(.glaze, [data-system="glaze"]) .w-12 {
  width: calc(var(--space-1) * 12);
}
:where(.glaze, [data-system="glaze"]) .w-14 {
  width: calc(var(--space-1) * 14);
}
:where(.glaze, [data-system="glaze"]) .w-16 {
  width: calc(var(--space-1) * 16);
}
:where(.glaze, [data-system="glaze"]) .w-22 {
  width: calc(var(--space-1) * 22);
}
:where(.glaze, [data-system="glaze"]) .w-24 {
  width: calc(var(--space-1) * 24);
}
:where(.glaze, [data-system="glaze"]) .w-auto {
  width: auto;
}
:where(.glaze, [data-system="glaze"]) .w-fit {
  width: fit-content;
}
:where(.glaze, [data-system="glaze"]) .w-full {
  width: 100%;
}
:where(.glaze, [data-system="glaze"]) .w-max {
  width: max-content;
}
:where(.glaze, [data-system="glaze"]) .max-w-\\(--available-width\\) {
  max-width: var(--available-width);
}
:where(.glaze, [data-system="glaze"]) .max-w-\\(--measure\\) {
  max-width: var(--measure);
}
:where(.glaze, [data-system="glaze"]) .max-w-\\(--measure-hint\\) {
  max-width: var(--measure-hint);
}
:where(.glaze, [data-system="glaze"]) .max-w-\\(--tooltip-max\\) {
  max-width: var(--tooltip-max);
}
:where(.glaze, [data-system="glaze"]) .max-w-1\\/2 {
  max-width: calc(1 / 2 * 100%);
}
:where(.glaze, [data-system="glaze"]) .max-w-64 {
  max-width: calc(var(--space-1) * 64);
}
:where(.glaze, [data-system="glaze"]) .max-w-\\[calc\\(100\\%\\+var\\(--space-4\\)\\)\\] {
  max-width: calc(100% + var(--space-4));
}
:where(.glaze, [data-system="glaze"]) .max-w-\\[min\\(var\\(--popover\\)\\,var\\(--available-width\\)\\)\\] {
  max-width: min(var(--popover), var(--available-width));
}
:where(.glaze, [data-system="glaze"]) .max-w-full {
  max-width: 100%;
}
:where(.glaze, [data-system="glaze"]) .max-w-measure {
  max-width: var(--measure);
}
:where(.glaze, [data-system="glaze"]) .panel {
  min-width: 0;
  overflow: clip;
  background-color: var(--paper);
  border: var(--line-width) solid var(--line-faint);
  border-radius: var(--radius-panel);
}
:where(.glaze, [data-system="glaze"]) .min-w-\\(--anchor-width\\) {
  min-width: var(--anchor-width);
}
:where(.glaze, [data-system="glaze"]) .min-w-\\(--menu-min\\) {
  min-width: var(--menu-min);
}
:where(.glaze, [data-system="glaze"]) .min-w-0 {
  min-width: 0px;
}
:where(.glaze, [data-system="glaze"]) .min-w-1 {
  min-width: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .min-w-4 {
  min-width: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .min-w-5 {
  min-width: calc(var(--space-1) * 5);
}
:where(.glaze, [data-system="glaze"]) .min-w-6 {
  min-width: calc(var(--space-1) * 6);
}
:where(.glaze, [data-system="glaze"]) .min-w-8 {
  min-width: calc(var(--space-1) * 8);
}
:where(.glaze, [data-system="glaze"]) .min-w-12 {
  min-width: calc(var(--space-1) * 12);
}
:where(.glaze, [data-system="glaze"]) .min-w-32 {
  min-width: calc(var(--space-1) * 32);
}
:where(.glaze, [data-system="glaze"]) .min-w-40 {
  min-width: calc(var(--space-1) * 40);
}
:where(.glaze, [data-system="glaze"]) .min-w-48 {
  min-width: calc(var(--space-1) * 48);
}
:where(.glaze, [data-system="glaze"]) .min-w-full {
  min-width: 100%;
}
:where(.glaze, [data-system="glaze"]) .min-w-px {
  min-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .flex-1 {
  flex: 1;
}
:where(.glaze, [data-system="glaze"]) .shrink {
  flex-shrink: 1;
}
:where(.glaze, [data-system="glaze"]) .shrink-0 {
  flex-shrink: 0;
}
:where(.glaze, [data-system="glaze"]) .grow {
  flex-grow: 1;
}
:where(.glaze, [data-system="glaze"]) .basis-0 {
  flex-basis: 0px;
}
:where(.glaze, [data-system="glaze"]) .basis-40 {
  flex-basis: calc(var(--space-1) * 40);
}
:where(.glaze, [data-system="glaze"]) .basis-48 {
  flex-basis: calc(var(--space-1) * 48);
}
:where(.glaze, [data-system="glaze"]) .basis-full {
  flex-basis: 100%;
}
:where(.glaze, [data-system="glaze"]) .caption-bottom {
  caption-side: bottom;
}
:where(.glaze, [data-system="glaze"]) .border-separate {
  border-collapse: separate;
}
:where(.glaze, [data-system="glaze"]) .border-spacing-0 {
  --tw-border-spacing-x: 0px;
  --tw-border-spacing-y: 0px;
  border-spacing: var(--tw-border-spacing-x) var(--tw-border-spacing-y);
}
:where(.glaze, [data-system="glaze"]) .origin-left {
  transform-origin: 0;
}
:where(.glaze, [data-system="glaze"]) .-translate-x-1\\/2 {
  --tw-translate-x: calc(calc(1 / 2 * 100%) * -1);
  translate: var(--tw-translate-x) var(--tw-translate-y);
}
:where(.glaze, [data-system="glaze"]) .translate-x-\\(--seg-x\\) {
  --tw-translate-x: var(--seg-x);
  translate: var(--tw-translate-x) var(--tw-translate-y);
}
:where(.glaze, [data-system="glaze"]) .translate-x-\\(--toast-swipe-movement-x\\) {
  --tw-translate-x: var(--toast-swipe-movement-x);
  translate: var(--tw-translate-x) var(--tw-translate-y);
}
:where(.glaze, [data-system="glaze"]) .-translate-y-1\\/2 {
  --tw-translate-y: calc(calc(1 / 2 * 100%) * -1);
  translate: var(--tw-translate-x) var(--tw-translate-y);
}
:where(.glaze, [data-system="glaze"]) .translate-y-\\(--toast-swipe-movement-y\\) {
  --tw-translate-y: var(--toast-swipe-movement-y);
  translate: var(--tw-translate-x) var(--tw-translate-y);
}
:where(.glaze, [data-system="glaze"]) .overlay-motion {
  transition-property: opacity, translate, scale;
  transition-duration: var(--dur-overlay);
  transition-timing-function: var(--ease-out);
  &:is([data-starting-style], [data-ending-style]) {
    opacity: 0;
  }
  &[data-ending-style] {
    transition-duration: var(--dur-state);
    transition-timing-function: var(--ease-in);
  }
  &:is([data-side="bottom"]):is([data-starting-style], [data-ending-style]) {
    translate: 0 calc(var(--overlay-shift) * -1);
  }
  &:is([data-side="top"]):is([data-starting-style], [data-ending-style]) {
    translate: 0 var(--overlay-shift);
  }
  &:is([data-side="right"], [data-side="inline-end"]):is([data-starting-style], [data-ending-style]) {
    translate: calc(var(--overlay-shift) * -1) 0;
  }
  &:is([data-side="left"], [data-side="inline-start"]):is([data-starting-style], [data-ending-style]) {
    translate: var(--overlay-shift) 0;
  }
  &:is([data-side="inline-end"]):dir(rtl):is([data-starting-style], [data-ending-style]) {
    translate: var(--overlay-shift) 0;
  }
  &:is([data-side="inline-start"]):dir(rtl):is([data-starting-style], [data-ending-style]) {
    translate: calc(var(--overlay-shift) * -1) 0;
  }
  &:not([data-side]):is([data-starting-style], [data-ending-style]) {
    scale: var(--scale-overlay);
  }
}
:where(.glaze, [data-system="glaze"]) .flat {
  color: var(--flat-text);
  background-color: var(--flat-bg);
  box-shadow: 0 0 0 var(--line-width) var(--flat-ring);
  -webkit-tap-highlight-color: transparent;
  transition-property: background-image, scale, color;
  transition-duration: var(--dur-press);
  transition-timing-function: var(--ease-out);
  @media (hover: hover) {
    &:hover:not(:disabled, [data-disabled], [aria-busy="true"]) {
      background-image: linear-gradient(var(--hover), var(--hover));
    }
  }
  &[data-force-hover]:not(:disabled, [data-disabled]) {
    background-image: linear-gradient(var(--hover), var(--hover));
  }
  &:is(:active, [data-force-active]):not(:disabled, [data-disabled]) {
    background-image: linear-gradient(var(--pressed), var(--pressed));
    scale: var(--scale-press-flat);
  }
  &:is(:disabled, [data-disabled], [aria-disabled="true"]):not([aria-busy="true"]) {
    background-color: var(--field);
    box-shadow: 0 0 0 var(--line-width) var(--line-faint);
    color: var(--text-disabled);
  }
  @media (forced-colors: active) {
    box-shadow: none;
    border: var(--line-width) solid ButtonText;
  }
}
:where(.glaze, [data-system="glaze"]) .transform {
  transform: var(--tw-rotate-x, ) var(--tw-rotate-y, ) var(--tw-rotate-z, ) var(--tw-skew-x, ) var(--tw-skew-y, );
}
:where(.glaze, [data-system="glaze"]) .animate-spin {
  animation: glaze-spin var(--dur-spin) linear infinite;
}
:where(.glaze, [data-system="glaze"]) .cursor-crosshair {
  cursor: crosshair;
}
:where(.glaze, [data-system="glaze"]) .cursor-default {
  cursor: default;
}
:where(.glaze, [data-system="glaze"]) .cursor-not-allowed {
  cursor: not-allowed;
}
:where(.glaze, [data-system="glaze"]) .cursor-pointer {
  cursor: pointer;
}
:where(.glaze, [data-system="glaze"]) .cursor-progress {
  cursor: progress;
}
:where(.glaze, [data-system="glaze"]) .cursor-text {
  cursor: text;
}
:where(.glaze, [data-system="glaze"]) .resize {
  resize: both;
}
:where(.glaze, [data-system="glaze"]) .resize-none {
  resize: none;
}
:where(.glaze, [data-system="glaze"]) .resize-y {
  resize: vertical;
}
:where(.glaze, [data-system="glaze"]) .snap-x {
  scroll-snap-type: x var(--tw-scroll-snap-strictness);
}
:where(.glaze, [data-system="glaze"]) .scroll-py-1 {
  scroll-padding-block: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .\\[scrollbar-width\\:none\\] {
  scrollbar-width: none;
}
:where(.glaze, [data-system="glaze"]) .\\[scrollbar-gutter\\:stable\\] {
  scrollbar-gutter: stable;
}
:where(.glaze, [data-system="glaze"]) .appearance-none {
  appearance: none;
}
:where(.glaze, [data-system="glaze"]) .grid-cols-\\(--cols\\) {
  grid-template-columns: var(--cols);
}
:where(.glaze, [data-system="glaze"]) .grid-cols-\\[max-content_minmax\\(0\\,1fr\\)\\] {
  grid-template-columns: max-content minmax(0,1fr);
}
:where(.glaze, [data-system="glaze"]) .grid-cols-\\[minmax\\(0\\,1fr\\)_auto\\] {
  grid-template-columns: minmax(0,1fr) auto;
}
:where(.glaze, [data-system="glaze"]) .grid-cols-\\[minmax\\(0\\,1fr\\)_auto_auto\\] {
  grid-template-columns: minmax(0,1fr) auto auto;
}
:where(.glaze, [data-system="glaze"]) .grid-rows-\\[minmax\\(0\\,1fr\\)\\] {
  grid-template-rows: minmax(0,1fr);
}
:where(.glaze, [data-system="glaze"]) .flex-col {
  flex-direction: column;
}
:where(.glaze, [data-system="glaze"]) .flex-col-reverse {
  flex-direction: column-reverse;
}
:where(.glaze, [data-system="glaze"]) .flex-row {
  flex-direction: row;
}
:where(.glaze, [data-system="glaze"]) .flex-row-reverse {
  flex-direction: row-reverse;
}
:where(.glaze, [data-system="glaze"]) .flex-wrap {
  flex-wrap: wrap;
}
:where(.glaze, [data-system="glaze"]) .place-items-center {
  place-items: center;
}
:where(.glaze, [data-system="glaze"]) .items-baseline {
  align-items: baseline;
}
:where(.glaze, [data-system="glaze"]) .items-center {
  align-items: center;
}
:where(.glaze, [data-system="glaze"]) .items-end {
  align-items: flex-end;
}
:where(.glaze, [data-system="glaze"]) .items-start {
  align-items: flex-start;
}
:where(.glaze, [data-system="glaze"]) .items-stretch {
  align-items: stretch;
}
:where(.glaze, [data-system="glaze"]) .justify-between {
  justify-content: space-between;
}
:where(.glaze, [data-system="glaze"]) .justify-center {
  justify-content: center;
}
:where(.glaze, [data-system="glaze"]) .justify-end {
  justify-content: flex-end;
}
:where(.glaze, [data-system="glaze"]) .justify-items-end {
  justify-items: end;
}
:where(.glaze, [data-system="glaze"]) .justify-items-start {
  justify-items: start;
}
:where(.glaze, [data-system="glaze"]) .gap-0 {
  gap: 0px;
}
:where(.glaze, [data-system="glaze"]) .gap-0\\.5 {
  gap: calc(var(--space-1) * 0.5);
}
:where(.glaze, [data-system="glaze"]) .gap-1 {
  gap: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .gap-1\\.5 {
  gap: calc(var(--space-1) * 1.5);
}
:where(.glaze, [data-system="glaze"]) .gap-2 {
  gap: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .gap-2\\.5 {
  gap: calc(var(--space-1) * 2.5);
}
:where(.glaze, [data-system="glaze"]) .gap-3 {
  gap: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .gap-4 {
  gap: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .gap-6 {
  gap: calc(var(--space-1) * 6);
}
:where(.glaze, [data-system="glaze"]) .gap-px {
  gap: 1px;
}
:where(.glaze, [data-system="glaze"]) .gap-x-2 {
  column-gap: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .gap-x-2\\.5 {
  column-gap: calc(var(--space-1) * 2.5);
}
:where(.glaze, [data-system="glaze"]) .gap-x-3 {
  column-gap: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .gap-y-0\\.5 {
  row-gap: calc(var(--space-1) * 0.5);
}
:where(.glaze, [data-system="glaze"]) .gap-y-1 {
  row-gap: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .self-center {
  align-self: center;
}
:where(.glaze, [data-system="glaze"]) .self-end {
  align-self: flex-end;
}
:where(.glaze, [data-system="glaze"]) .self-start {
  align-self: flex-start;
}
:where(.glaze, [data-system="glaze"]) .self-stretch {
  align-self: stretch;
}
:where(.glaze, [data-system="glaze"]) .truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
:where(.glaze, [data-system="glaze"]) .overflow-auto {
  overflow: auto;
}
:where(.glaze, [data-system="glaze"]) .overflow-hidden {
  overflow: hidden;
}
:where(.glaze, [data-system="glaze"]) .overflow-visible {
  overflow: visible;
}
:where(.glaze, [data-system="glaze"]) .overflow-x-auto {
  overflow-x: auto;
}
:where(.glaze, [data-system="glaze"]) .overflow-y-auto {
  overflow-y: auto;
}
:where(.glaze, [data-system="glaze"]) .overscroll-contain {
  overscroll-behavior: contain;
}
:where(.glaze, [data-system="glaze"]) .overscroll-x-contain {
  overscroll-behavior-x: contain;
}
:where(.glaze, [data-system="glaze"]) .overlay {
  background-color: var(--paper);
  border: var(--line-width) solid var(--line);
  border-radius: var(--radius-overlay);
  color: var(--text-1);
}
:where(.glaze, [data-system="glaze"]) .rounded-\\[1\\.5px\\] {
  border-radius: 1.5px;
}
:where(.glaze, [data-system="glaze"]) .rounded-\\[inherit\\] {
  border-radius: inherit;
}
:where(.glaze, [data-system="glaze"]) .rounded-overlay {
  border-radius: var(--radius-overlay);
}
:where(.glaze, [data-system="glaze"]) .rounded-panel {
  border-radius: var(--radius-panel);
}
:where(.glaze, [data-system="glaze"]) .rounded-pill {
  border-radius: var(--radius-pill);
}
:where(.glaze, [data-system="glaze"]) .rounded-shell {
  border-radius: var(--radius-shell);
}
:where(.glaze, [data-system="glaze"]) .rounded-tag {
  border-radius: var(--radius-tag);
}
:where(.glaze, [data-system="glaze"]) .rounded-b-none {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
:where(.glaze, [data-system="glaze"]) .border {
  border-style: var(--tw-border-style);
  border-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .border-0 {
  border-style: var(--tw-border-style);
  border-width: 0px;
}
:where(.glaze, [data-system="glaze"]) .rule-row {
  border-block-end: var(--line-width) solid var(--line-faint);
  &:last-child {
    border-block-end-width: 0;
  }
}
:where(.glaze, [data-system="glaze"]) .border-t {
  border-top-style: var(--tw-border-style);
  border-top-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .border-b {
  border-bottom-style: var(--tw-border-style);
  border-bottom-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .border-ink {
  border-color: var(--ink);
}
:where(.glaze, [data-system="glaze"]) .border-line {
  border-color: var(--line);
}
:where(.glaze, [data-system="glaze"]) .border-line-control {
  border-color: var(--line-control);
}
:where(.glaze, [data-system="glaze"]) .border-line-faint {
  border-color: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .border-line-focus {
  border-color: var(--line-focus);
}
:where(.glaze, [data-system="glaze"]) .border-text-inverse\\/20 {
  border-color: var(--text-inverse);
  @supports (color: color-mix(in lab, red, red)) {
    border-color: color-mix(in oklab, var(--text-inverse) 20%, transparent);
  }
}
:where(.glaze, [data-system="glaze"]) .border-transparent {
  border-color: transparent;
}
:where(.glaze, [data-system="glaze"]) .glaze-sm {
  color: var(--glaze-sm-text);
  background-color: var(--glaze-sm-mid);
  background-image: linear-gradient(var(--gz-dir, 180deg),var(--glaze-sm-top), var(--glaze-sm-mid) 50%, var(--glaze-sm-bottom));
  box-shadow: inset 0 var(--line-width) 0 var(--glaze-sm-highlight), 0 0 0 0.5px var(--glaze-sm-rim);
  -webkit-tap-highlight-color: transparent;
  &:is(:active, [data-force-active]):not(:disabled, [data-disabled], [data-readonly]) {
    box-shadow: 0 0 0 0.5px var(--glaze-sm-rim);
  }
  &:is(:disabled, [data-disabled], [aria-disabled="true"]) {
    background-image: none;
    background-color: var(--field);
    box-shadow: 0 0 0 var(--line-width) var(--line-faint);
    color: var(--text-disabled);
  }
  @media (forced-colors: active) {
    background-image: none;
    box-shadow: none;
  }
}
:where(.glaze, [data-system="glaze"]) .code-surface {
  background-color: var(--code-surface);
  border: var(--line-width) solid var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .bg-code-surface {
  background-color: var(--code-surface);
}
:where(.glaze, [data-system="glaze"]) .bg-current {
  background-color: currentcolor;
}
:where(.glaze, [data-system="glaze"]) .bg-fail {
  background-color: var(--fail);
}
:where(.glaze, [data-system="glaze"]) .bg-fail-tint {
  background-color: var(--fail-tint);
}
:where(.glaze, [data-system="glaze"]) .bg-field {
  background-color: var(--field);
}
:where(.glaze, [data-system="glaze"]) .bg-ink {
  background-color: var(--ink);
}
:where(.glaze, [data-system="glaze"]) .bg-line {
  background-color: var(--line);
}
:where(.glaze, [data-system="glaze"]) .bg-line-control {
  background-color: var(--line-control);
}
:where(.glaze, [data-system="glaze"]) .bg-line-faint {
  background-color: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .bg-line-strong {
  background-color: var(--line-strong);
}
:where(.glaze, [data-system="glaze"]) .bg-ok-tint {
  background-color: var(--ok-tint);
}
:where(.glaze, [data-system="glaze"]) .bg-page {
  background-color: var(--page);
}
:where(.glaze, [data-system="glaze"]) .bg-paper {
  background-color: var(--paper);
}
:where(.glaze, [data-system="glaze"]) .bg-pressed {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .bg-scrim {
  background-color: var(--scrim);
}
:where(.glaze, [data-system="glaze"]) .bg-shell {
  background-color: var(--shell);
}
:where(.glaze, [data-system="glaze"]) .bg-text-2 {
  background-color: var(--text-2);
}
:where(.glaze, [data-system="glaze"]) .bg-text-inverse\\/15 {
  background-color: var(--text-inverse);
  @supports (color: color-mix(in lab, red, red)) {
    background-color: color-mix(in oklab, var(--text-inverse) 15%, transparent);
  }
}
:where(.glaze, [data-system="glaze"]) .bg-transparent {
  background-color: transparent;
}
:where(.glaze, [data-system="glaze"]) .bg-warn {
  background-color: var(--warn);
}
:where(.glaze, [data-system="glaze"]) .bg-warn-tint {
  background-color: var(--warn-tint);
}
:where(.glaze, [data-system="glaze"]) .well {
  background-color: var(--field);
}
:where(.glaze, [data-system="glaze"]) .fill-current {
  fill: currentcolor;
}
:where(.glaze, [data-system="glaze"]) .fill-hover {
  fill: var(--hover);
}
:where(.glaze, [data-system="glaze"]) .fill-paper {
  fill: var(--paper);
}
:where(.glaze, [data-system="glaze"]) .fill-text-2 {
  fill: var(--text-2);
}
:where(.glaze, [data-system="glaze"]) .stroke-current {
  stroke: currentcolor;
}
:where(.glaze, [data-system="glaze"]) .stroke-line {
  stroke: var(--line);
}
:where(.glaze, [data-system="glaze"]) .stroke-line-faint {
  stroke: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .stroke-line-strong {
  stroke: var(--line-strong);
}
:where(.glaze, [data-system="glaze"]) .stroke-none {
  stroke: none;
}
:where(.glaze, [data-system="glaze"]) .stroke-paper {
  stroke: var(--paper);
}
:where(.glaze, [data-system="glaze"]) .object-cover {
  object-fit: cover;
}
:where(.glaze, [data-system="glaze"]) .p-0 {
  padding: 0px;
}
:where(.glaze, [data-system="glaze"]) .p-0\\.5 {
  padding: calc(var(--space-1) * 0.5);
}
:where(.glaze, [data-system="glaze"]) .p-1 {
  padding: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .p-1\\.5 {
  padding: calc(var(--space-1) * 1.5);
}
:where(.glaze, [data-system="glaze"]) .p-3 {
  padding: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .p-4 {
  padding: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .px-0 {
  padding-inline: 0px;
}
:where(.glaze, [data-system="glaze"]) .px-1 {
  padding-inline: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .px-1\\.5 {
  padding-inline: calc(var(--space-1) * 1.5);
}
:where(.glaze, [data-system="glaze"]) .px-2 {
  padding-inline: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .px-2\\.5 {
  padding-inline: calc(var(--space-1) * 2.5);
}
:where(.glaze, [data-system="glaze"]) .px-3 {
  padding-inline: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .px-3\\.5 {
  padding-inline: calc(var(--space-1) * 3.5);
}
:where(.glaze, [data-system="glaze"]) .px-4 {
  padding-inline: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .py-1 {
  padding-block: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .py-1\\.5 {
  padding-block: calc(var(--space-1) * 1.5);
}
:where(.glaze, [data-system="glaze"]) .py-2 {
  padding-block: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .py-2\\.5 {
  padding-block: calc(var(--space-1) * 2.5);
}
:where(.glaze, [data-system="glaze"]) .py-3 {
  padding-block: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .py-4 {
  padding-block: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .py-5 {
  padding-block: calc(var(--space-1) * 5);
}
:where(.glaze, [data-system="glaze"]) .py-6 {
  padding-block: calc(var(--space-1) * 6);
}
:where(.glaze, [data-system="glaze"]) .py-10 {
  padding-block: calc(var(--space-1) * 10);
}
:where(.glaze, [data-system="glaze"]) .py-16 {
  padding-block: calc(var(--space-1) * 16);
}
:where(.glaze, [data-system="glaze"]) .ps-0\\.5 {
  padding-inline-start: calc(var(--space-1) * 0.5);
}
:where(.glaze, [data-system="glaze"]) .ps-2 {
  padding-inline-start: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .ps-2\\.5 {
  padding-inline-start: calc(var(--space-1) * 2.5);
}
:where(.glaze, [data-system="glaze"]) .ps-3 {
  padding-inline-start: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .ps-4 {
  padding-inline-start: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .ps-5 {
  padding-inline-start: calc(var(--space-1) * 5);
}
:where(.glaze, [data-system="glaze"]) .ps-6 {
  padding-inline-start: calc(var(--space-1) * 6);
}
:where(.glaze, [data-system="glaze"]) .ps-7 {
  padding-inline-start: calc(var(--space-1) * 7);
}
:where(.glaze, [data-system="glaze"]) .pe-\\(--avatar-covered\\) {
  padding-inline-end: var(--avatar-covered);
}
:where(.glaze, [data-system="glaze"]) .pe-\\(--shell-inset\\) {
  padding-inline-end: var(--shell-inset);
}
:where(.glaze, [data-system="glaze"]) .pe-0 {
  padding-inline-end: 0px;
}
:where(.glaze, [data-system="glaze"]) .pe-1 {
  padding-inline-end: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .pe-1\\.5 {
  padding-inline-end: calc(var(--space-1) * 1.5);
}
:where(.glaze, [data-system="glaze"]) .pe-2 {
  padding-inline-end: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .pe-3 {
  padding-inline-end: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .pe-8 {
  padding-inline-end: calc(var(--space-1) * 8);
}
:where(.glaze, [data-system="glaze"]) .pt-\\(--shell-inset\\) {
  padding-top: var(--shell-inset);
}
:where(.glaze, [data-system="glaze"]) .pt-0\\.5 {
  padding-top: calc(var(--space-1) * 0.5);
}
:where(.glaze, [data-system="glaze"]) .pt-1 {
  padding-top: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .pt-2 {
  padding-top: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .pt-2\\.5 {
  padding-top: calc(var(--space-1) * 2.5);
}
:where(.glaze, [data-system="glaze"]) .pb-1 {
  padding-bottom: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .pb-2 {
  padding-bottom: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .pb-3 {
  padding-bottom: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .pb-4 {
  padding-bottom: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .pb-6 {
  padding-bottom: calc(var(--space-1) * 6);
}
:where(.glaze, [data-system="glaze"]) .pb-\\[max\\(var\\(--space-4\\)\\,env\\(safe-area-inset-bottom\\)\\)\\] {
  padding-bottom: max(var(--space-4), env(safe-area-inset-bottom));
}
:where(.glaze, [data-system="glaze"]) .text-center {
  text-align: center;
}
:where(.glaze, [data-system="glaze"]) .text-end {
  text-align: end;
}
:where(.glaze, [data-system="glaze"]) .text-start {
  text-align: start;
}
:where(.glaze, [data-system="glaze"]) .align-bottom {
  vertical-align: bottom;
}
:where(.glaze, [data-system="glaze"]) .align-middle {
  vertical-align: middle;
}
:where(.glaze, [data-system="glaze"]) .align-top {
  vertical-align: top;
}
:where(.glaze, [data-system="glaze"]) .mono {
  font-family: var(--font-mono);
  font-size: calc(1em * var(--mono-scale));
  letter-spacing: 0;
}
:where(.glaze, [data-system="glaze"]) .font-\\[inherit\\] {
  font-family: inherit;
}
:where(.glaze, [data-system="glaze"]) .leading-none {
  --tw-leading: 1;
  line-height: 1;
}
:where(.glaze, [data-system="glaze"]) .font-normal {
  --tw-font-weight: var(--weight-normal);
  font-weight: var(--weight-normal);
}
:where(.glaze, [data-system="glaze"]) .font-semibold {
  --tw-font-weight: var(--weight-semibold);
  font-weight: var(--weight-semibold);
}
:where(.glaze, [data-system="glaze"]) .type-caption {
  font: var(--type-caption);
  letter-spacing: var(--tracking-body);
  font-variant-numeric: tabular-nums;
}
:where(.glaze, [data-system="glaze"]) .type-code {
  font: var(--type-code);
  letter-spacing: 0;
  font-variant-numeric: tabular-nums;
}
:where(.glaze, [data-system="glaze"]) .type-code-block {
  font: var(--type-code-block);
  letter-spacing: 0;
  font-variant-numeric: tabular-nums;
}
:where(.glaze, [data-system="glaze"]) .type-code-sm {
  font: var(--type-code-sm);
  letter-spacing: 0;
  font-variant-numeric: tabular-nums;
}
:where(.glaze, [data-system="glaze"]) .type-code-xs {
  font: var(--type-code-xs);
  letter-spacing: 0;
  font-variant-numeric: tabular-nums;
}
:where(.glaze, [data-system="glaze"]) .type-body {
  font: var(--type-body);
  letter-spacing: var(--tracking-body);
}
:where(.glaze, [data-system="glaze"]) .type-body-sm {
  font: var(--type-body-sm);
  letter-spacing: var(--tracking-body);
}
:where(.glaze, [data-system="glaze"]) .type-heading {
  font: var(--type-heading);
  letter-spacing: var(--tracking-heading);
}
:where(.glaze, [data-system="glaze"]) .type-heading-sm {
  font: var(--type-heading-sm);
  letter-spacing: var(--tracking-heading);
}
:where(.glaze, [data-system="glaze"]) .type-label {
  font: var(--type-label);
  letter-spacing: var(--tracking-label);
}
:where(.glaze, [data-system="glaze"]) .type-label-lg {
  font: var(--type-label-lg);
  letter-spacing: var(--tracking-label);
}
:where(.glaze, [data-system="glaze"]) .type-label-sm {
  font: var(--type-label-sm);
  letter-spacing: var(--tracking-label);
}
:where(.glaze, [data-system="glaze"]) .text-pretty {
  text-wrap: pretty;
}
:where(.glaze, [data-system="glaze"]) .\\[overflow-wrap\\:anywhere\\] {
  overflow-wrap: anywhere;
}
:where(.glaze, [data-system="glaze"]) .break-words {
  overflow-wrap: break-word;
}
:where(.glaze, [data-system="glaze"]) .break-all {
  word-break: break-all;
}
:where(.glaze, [data-system="glaze"]) .whitespace-normal {
  white-space: normal;
}
:where(.glaze, [data-system="glaze"]) .whitespace-nowrap {
  white-space: nowrap;
}
:where(.glaze, [data-system="glaze"]) .whitespace-pre {
  white-space: pre;
}
:where(.glaze, [data-system="glaze"]) .whitespace-pre-wrap {
  white-space: pre-wrap;
}
:where(.glaze, [data-system="glaze"]) .text-\\(--glaze-sm-text\\) {
  color: var(--glaze-sm-text);
}
:where(.glaze, [data-system="glaze"]) .text-fail {
  color: var(--fail);
}
:where(.glaze, [data-system="glaze"]) .text-fail-text {
  color: var(--fail-text);
}
:where(.glaze, [data-system="glaze"]) .text-field {
  color: var(--field);
}
:where(.glaze, [data-system="glaze"]) .text-inherit {
  color: inherit;
}
:where(.glaze, [data-system="glaze"]) .text-ok {
  color: var(--ok);
}
:where(.glaze, [data-system="glaze"]) .text-ok-text {
  color: var(--ok-text);
}
:where(.glaze, [data-system="glaze"]) .text-text-1 {
  color: var(--text-1);
}
:where(.glaze, [data-system="glaze"]) .text-text-2 {
  color: var(--text-2);
}
:where(.glaze, [data-system="glaze"]) .text-text-3 {
  color: var(--text-3);
}
:where(.glaze, [data-system="glaze"]) .text-text-disabled {
  color: var(--text-disabled);
}
:where(.glaze, [data-system="glaze"]) .text-text-inverse {
  color: var(--text-inverse);
}
:where(.glaze, [data-system="glaze"]) .text-text-inverse\\/60 {
  color: var(--text-inverse);
  @supports (color: color-mix(in lab, red, red)) {
    color: color-mix(in oklab, var(--text-inverse) 60%, transparent);
  }
}
:where(.glaze, [data-system="glaze"]) .text-text-inverse\\/70 {
  color: var(--text-inverse);
  @supports (color: color-mix(in lab, red, red)) {
    color: color-mix(in oklab, var(--text-inverse) 70%, transparent);
  }
}
:where(.glaze, [data-system="glaze"]) .text-warn {
  color: var(--warn);
}
:where(.glaze, [data-system="glaze"]) .text-warn-text {
  color: var(--warn-text);
}
:where(.glaze, [data-system="glaze"]) .tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal, ) var(--tw-slashed-zero, ) var(--tw-numeric-figure, ) var(--tw-numeric-spacing, ) var(--tw-numeric-fraction, );
}
:where(.glaze, [data-system="glaze"]) .data {
  font-variant-numeric: tabular-nums;
}
:where(.glaze, [data-system="glaze"]) .line-through {
  text-decoration-line: line-through;
}
:where(.glaze, [data-system="glaze"]) .no-underline {
  text-decoration-line: none;
}
:where(.glaze, [data-system="glaze"]) .underline {
  text-decoration-line: underline;
}
:where(.glaze, [data-system="glaze"]) .decoration-1 {
  text-decoration-thickness: 1px;
}
:where(.glaze, [data-system="glaze"]) .underline-offset-4 {
  text-underline-offset: 4px;
}
:where(.glaze, [data-system="glaze"]) .opacity-\\(--stale\\) {
  opacity: var(--stale);
}
:where(.glaze, [data-system="glaze"]) .opacity-0 {
  opacity: 0%;
}
:where(.glaze, [data-system="glaze"]) .opacity-40 {
  opacity: 40%;
}
:where(.glaze, [data-system="glaze"]) .opacity-70 {
  opacity: 70%;
}
:where(.glaze, [data-system="glaze"]) .ring {
  --tw-ring-shadow: var(--tw-ring-inset, ) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
}
:where(.glaze, [data-system="glaze"]) .focus-ring {
  outline: var(--focus-width) solid var(--focus);
  outline-offset: var(--focus-offset);
}
:where(.glaze, [data-system="glaze"]) .outline {
  outline-style: var(--tw-outline-style);
  outline-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .outline-2 {
  outline-style: var(--tw-outline-style);
  outline-width: 2px;
}
:where(.glaze, [data-system="glaze"]) .outline-\\(--avatar-cutout\\) {
  outline-color: var(--avatar-cutout);
}
:where(.glaze, [data-system="glaze"]) .filter {
  filter: var(--tw-blur, ) var(--tw-brightness, ) var(--tw-contrast, ) var(--tw-grayscale, ) var(--tw-hue-rotate, ) var(--tw-invert, ) var(--tw-saturate, ) var(--tw-sepia, ) var(--tw-drop-shadow, );
}
:where(.glaze, [data-system="glaze"]) .transition {
  transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, content-visibility, overlay, pointer-events;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[background-color\\,border-color\\,color\\,scale\\] {
  transition-property: background-color,border-color,color,scale;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[background-color\\,border-color\\] {
  transition-property: background-color,border-color;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[background-color\\,color\\,scale\\] {
  transition-property: background-color,color,scale;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[background-color\\,color\\] {
  transition-property: background-color,color;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[background-color\\] {
  transition-property: background-color;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[border-color\\,background-color\\,color\\] {
  transition-property: border-color,background-color,color;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[border-color\\,background-color\\] {
  transition-property: border-color,background-color;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[color\\,background-color\\] {
  transition-property: color,background-color;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[height\\] {
  transition-property: height;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[rotate\\] {
  transition-property: rotate;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[text-decoration-color\\,outline-color\\] {
  transition-property: text-decoration-color,outline-color;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[translate\\,opacity\\] {
  transition-property: translate,opacity;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[translate\\,width\\] {
  transition-property: translate,width;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-\\[width\\] {
  transition-property: width;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-colors {
  transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .transition-opacity {
  transition-property: opacity;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .tick-draw {
  clip-path: inset(0);
  transition: clip-path var(--dur-state) var(--ease-out);
  &[data-starting-style] {
    clip-path: inset(0 100% 0 0);
  }
  &:dir(rtl)[data-starting-style] {
    clip-path: inset(0 0 0 100%);
  }
  &[data-ending-style] {
    transition-duration: 0ms;
  }
}
:where(.glaze, [data-system="glaze"]) .duration-\\(--dur-overlay\\) {
  --tw-duration: var(--dur-overlay);
  transition-duration: var(--dur-overlay);
}
:where(.glaze, [data-system="glaze"]) .duration-\\(--dur-press\\) {
  --tw-duration: var(--dur-press);
  transition-duration: var(--dur-press);
}
:where(.glaze, [data-system="glaze"]) .duration-\\(--dur-slide\\) {
  --tw-duration: var(--dur-slide);
  transition-duration: var(--dur-slide);
}
:where(.glaze, [data-system="glaze"]) .duration-\\(--dur-state\\) {
  --tw-duration: var(--dur-state);
  transition-duration: var(--dur-state);
}
:where(.glaze, [data-system="glaze"]) .ease-out {
  --tw-ease: var(--ease-out);
  transition-timing-function: var(--ease-out);
}
:where(.glaze, [data-system="glaze"]) .\\[contain\\:inline-size\\] {
  contain: inline-size;
}
:where(.glaze, [data-system="glaze"]) .glass-coral {
  --glass-base: var(--glass-coral-base);
  --glass-text: var(--glass-coral-text);
  --glass-ring: var(--glass-coral-ring);
}
:where(.glaze, [data-system="glaze"]) .glass-green {
  --glass-base: var(--glass-green-base);
  --glass-text: var(--glass-green-text);
  --glass-ring: var(--glass-green-ring);
}
:where(.glaze, [data-system="glaze"]) .glass-ink {
  --glass-base: var(--glass-ink-base);
  --glass-text: var(--glass-ink-text);
  --glass-ring: var(--glass-ink-ring);
}
:where(.glaze, [data-system="glaze"]) .focus-sm {
  --focus-width: var(--focus-width-sm);
  --focus-offset: var(--focus-offset-sm);
}
:where(.glaze, [data-system="glaze"]) .outline-none {
  --tw-outline-style: none;
  outline-style: none;
}
:where(.glaze, [data-system="glaze"]) .select-all {
  -webkit-user-select: all;
  user-select: all;
}
:where(.glaze, [data-system="glaze"]) .select-none {
  -webkit-user-select: none;
  user-select: none;
}
:where(.glaze, [data-system="glaze"]) .\\[--action-h\\:calc\\(var\\(--input-h\\)-2\\*var\\(--shell-inset\\)-2\\*var\\(--line-width\\)\\)\\] {
  --action-h: calc(var(--input-h) - 2 * var(--shell-inset) - 2 * var(--line-width));
}
:where(.glaze, [data-system="glaze"]) .\\[--attachment-media\\:var\\(--row\\)\\] {
  --attachment-media: var(--row);
}
:where(.glaze, [data-system="glaze"]) .\\[--attachment-media\\:var\\(--space-6\\)\\] {
  --attachment-media: var(--space-6);
}
:where(.glaze, [data-system="glaze"]) .\\[--avatar-cutout\\:var\\(--paper\\)\\] {
  --avatar-cutout: var(--paper);
}
:where(.glaze, [data-system="glaze"]) .\\[--avatar-overlap\\:var\\(--space-0-5\\)\\] {
  --avatar-overlap: var(--space-0-5);
}
:where(.glaze, [data-system="glaze"]) .\\[--avatar-overlap\\:var\\(--space-1\\)\\] {
  --avatar-overlap: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .\\[--field-h\\:auto\\] {
  --field-h: auto;
}
:where(.glaze, [data-system="glaze"]) .\\[--field-h\\:max\\(var\\(--input-h\\)\\,calc\\(1lh\\+var\\(--space-2\\)\\)\\)\\] {
  --field-h: max(var(--input-h), calc(1lh + var(--space-2)));
}
:where(.glaze, [data-system="glaze"]) .\\[--input-h\\:var\\(--control\\)\\] {
  --input-h: var(--control);
}
:where(.glaze, [data-system="glaze"]) .\\[--input-h\\:var\\(--control-lg\\)\\] {
  --input-h: var(--control-lg);
}
:where(.glaze, [data-system="glaze"]) .\\[--input-h\\:var\\(--control-sm\\)\\] {
  --input-h: var(--control-sm);
}
:where(.glaze, [data-system="glaze"]) .\\[--menu-item-h\\:var\\(--menu-row\\)\\] {
  --menu-item-h: var(--menu-row);
}
:where(.glaze, [data-system="glaze"]) .\\[-webkit-tap-highlight-color\\:transparent\\] {
  -webkit-tap-highlight-color: transparent;
}
:where(.glaze, [data-system="glaze"]) .\\[contain-intrinsic-size\\:auto_160px\\] {
  contain-intrinsic-size: auto 160px;
}
:where(.glaze, [data-system="glaze"]) .\\[content-visibility\\:auto\\] {
  content-visibility: auto;
}
:where(.glaze, [data-system="glaze"]) .\\[grid-area\\:action\\] {
  grid-area: action;
}
:where(.glaze, [data-system="glaze"]) .\\[grid-area\\:c\\] {
  grid-area: c;
}
:where(.glaze, [data-system="glaze"]) .\\[grid-area\\:close\\] {
  grid-area: close;
}
:where(.glaze, [data-system="glaze"]) .\\[grid-area\\:content\\] {
  grid-area: content;
}
:where(.glaze, [data-system="glaze"]) .\\[grid-area\\:stack\\] {
  grid-area: stack;
}
:where(.glaze, [data-system="glaze"]) .\\[grid-template-areas\\:\\"content_action_close\\"\\] {
  grid-template-areas: "content action close";
}
:where(.glaze, [data-system="glaze"]) .\\[grid-template-areas\\:\\'c\\'\\] {
  grid-template-areas: 'c';
}
:where(.glaze, [data-system="glaze"]) .\\[grid-template-areas\\:\\'stack\\'\\] {
  grid-template-areas: 'stack';
}
:where(.glaze, [data-system="glaze"]) .\\[overflow-anchor\\:none\\] {
  overflow-anchor: none;
}
:where(.glaze, [data-system="glaze"]) .\\[unicode-bidi\\:plaintext\\] {
  unicode-bidi: plaintext;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:inline-flex > *) {
  display: inline-flex;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:h-5 > *) {
  height: calc(var(--space-1) * 5);
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:flex-1 > *) {
  flex: 1;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:flex-none > *) {
  flex: none;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:snap-start > *) {
  scroll-snap-align: start;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:items-center > *) {
  align-items: center;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:gap-1 > *) {
  gap: var(--space-1);
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:rounded-tag > *) {
  border-radius: var(--radius-tag);
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:border > *) {
  border-style: var(--tw-border-style);
  border-width: 1px;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:border-line-control > *) {
  border-color: var(--line-control);
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:px-1\\.5 > *) {
  padding-inline: calc(var(--space-1) * 1.5);
}
:where(.glaze, [data-system="glaze"]) .not-first\\:border-t:not(:first-child) {
  border-top-style: var(--tw-border-style);
  border-top-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .not-first\\:border-line-faint:not(:first-child) {
  border-color: var(--line-faint);
}
:is(:where(.group\\/row):focus-within :is(:where(.glaze, [data-system="glaze"]) .group-focus-within\\/row\\:opacity-0)) {
  opacity: 0%;
}
:is(:where(.group\\/row):focus-within :is(:where(.glaze, [data-system="glaze"]) .group-focus-within\\/row\\:opacity-100)) {
  opacity: 100%;
}
@media (hover: hover) {
  :is(:where(.group\\/row):hover :is(:where(.glaze, [data-system="glaze"]) .group-hover\\/row\\:opacity-0)) {
    opacity: 0%;
  }
}
:is(:where(.group\\/row)[data-force-hover] :is(:where(.glaze, [data-system="glaze"]) .group-hover\\/row\\:opacity-0)) {
  opacity: 0%;
}
@media (hover: hover) {
  :is(:where(.group\\/row):hover :is(:where(.glaze, [data-system="glaze"]) .group-hover\\/row\\:opacity-100)) {
    opacity: 100%;
  }
}
:is(:where(.group\\/row)[data-force-hover] :is(:where(.glaze, [data-system="glaze"]) .group-hover\\/row\\:opacity-100)) {
  opacity: 100%;
}
@media (hover: hover) {
  :is(:where(.group\\/sort):hover :is(:where(.glaze, [data-system="glaze"]) .group-hover\\/sort\\:opacity-100)) {
    opacity: 100%;
  }
}
:is(:where(.group\\/sort)[data-force-hover] :is(:where(.glaze, [data-system="glaze"]) .group-hover\\/sort\\:opacity-100)) {
  opacity: 100%;
}
:is(:where(.group\\/sort):focus-visible :is(:where(.glaze, [data-system="glaze"]) .group-focus-visible\\/sort\\:opacity-100)) {
  opacity: 100%;
}
:is(:where(.group\\/sort)[data-force-focus-visible] :is(:where(.glaze, [data-system="glaze"]) .group-focus-visible\\/sort\\:opacity-100)) {
  opacity: 100%;
}
:is(:where(.group\\/native):has(:disabled) :is(:where(.glaze, [data-system="glaze"]) .group-has-disabled\\/native\\:text-text-disabled)) {
  color: var(--text-disabled);
}
:is(:where(.group\\/item):has([data-slot="item-description"]) :is(:where(.glaze, [data-system="glaze"]) .group-has-data-\\[slot\\=item-description\\]\\/item\\:mt-0\\.5)) {
  margin-top: calc(var(--space-1) * 0.5);
}
:is(:where(.group\\/item):has([data-slot="item-description"]) :is(:where(.glaze, [data-system="glaze"]) .group-has-data-\\[slot\\=item-description\\]\\/item\\:self-start)) {
  align-self: flex-start;
}
:is(:where(.group\\/message):has(:is([data-slot=message-status]:is([data-state=live], [data-state=waiting]))) :is(:where(.glaze, [data-system="glaze"]) .group-has-\\[\\[data-slot\\=message-status\\]\\:is\\(\\[data-state\\=live\\]\\,\\[data-state\\=waiting\\]\\)\\]\\/message\\:hidden)) {
  display: none;
}
:is(:where(.group\\/attachment-drop)[data-disabled] :is(:where(.glaze, [data-system="glaze"]) .group-data-disabled\\/attachment-drop\\:text-text-disabled)) {
  color: var(--text-disabled);
}
:is(:where(.group\\/field)[data-disabled] :is(:where(.glaze, [data-system="glaze"]) .group-data-disabled\\/field\\:cursor-not-allowed)) {
  cursor: not-allowed;
}
:is(:where(.group\\/field)[data-disabled] :is(:where(.glaze, [data-system="glaze"]) .group-data-disabled\\/field\\:text-text-disabled)) {
  color: var(--text-disabled);
}
:is(:where(.group\\/input)[data-disabled] :is(:where(.glaze, [data-system="glaze"]) .group-data-disabled\\/input\\:text-text-disabled)) {
  color: var(--text-disabled);
}
:is(:where(.group\\/item)[data-disabled] :is(:where(.glaze, [data-system="glaze"]) .group-data-disabled\\/item\\:text-text-disabled)) {
  color: var(--text-disabled);
}
:is(:where(.group\\/prompt)[data-focused] :is(:where(.glaze, [data-system="glaze"]) .group-data-focused\\/prompt\\:border-line-focus)) {
  border-color: var(--line-focus);
}
:is(:where(.group\\/prompt)[data-force-focus] :is(:where(.glaze, [data-system="glaze"]) .group-data-force-focus\\/prompt\\:border-line-focus)) {
  border-color: var(--line-focus);
}
:is(:where(.group\\/actions)[data-open] :is(:where(.glaze, [data-system="glaze"]) .group-data-open\\/actions\\:opacity-0)) {
  opacity: 0%;
}
:is(:where(.group\\/actions)[data-open] :is(:where(.glaze, [data-system="glaze"]) .group-data-open\\/actions\\:opacity-100)) {
  opacity: 100%;
}
:is(:where(.group\\/row)[data-panel-open] :is(:where(.glaze, [data-system="glaze"]) .group-data-panel-open\\/row\\:rotate-90)) {
  rotate: 90deg;
}
:is(:where(.group\\/table)[data-sticky-header] :is(:where(.glaze, [data-system="glaze"]) .group-data-sticky-header\\/table\\:sticky)) {
  position: sticky;
}
:is(:where(.group\\/table)[data-sticky-header] :is(:where(.glaze, [data-system="glaze"]) .group-data-sticky-header\\/table\\:top-0)) {
  top: 0px;
}
:is(:where(.group\\/table)[data-sticky-header] :is(:where(.glaze, [data-system="glaze"]) .group-data-sticky-header\\/table\\:z-\\(--z-raised\\))) {
  z-index: var(--z-raised);
}
:is(:where(.group\\/message)[data-from="agent"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[from\\=agent\\]\\/message\\:gap-2)) {
  gap: calc(var(--space-1) * 2);
}
:is(:where(.group\\/message)[data-from="user"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[from\\=user\\]\\/message\\:max-w-\\[85\\%\\])) {
  max-width: 85%;
}
:is(:where(.group\\/message)[data-from="user"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[from\\=user\\]\\/message\\:flex-none)) {
  flex: none;
}
:is(:where(.group\\/message)[data-from="user"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[from\\=user\\]\\/message\\:items-end)) {
  align-items: flex-end;
}
:is(:where(.group\\/message)[data-from="user"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[from\\=user\\]\\/message\\:gap-1)) {
  gap: var(--space-1);
}
:is(:where(.group\\/prompt)[data-mode="shell"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[mode\\=shell\\]\\/prompt\\:bg-field)) {
  background-color: var(--field);
}
:is(:where(.group\\/empty)[data-reason="empty"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[reason\\=empty\\]\\/empty\\:block)) {
  display: block;
}
:is(:where(.group\\/empty)[data-reason="error"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[reason\\=error\\]\\/empty\\:block)) {
  display: block;
}
:is(:where(.group\\/empty)[data-reason="error"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[reason\\=error\\]\\/empty\\:text-fail-text)) {
  color: var(--fail-text);
}
:is(:where(.group\\/empty)[data-reason="no-access"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[reason\\=no-access\\]\\/empty\\:block)) {
  display: block;
}
:is(:where(.group\\/empty)[data-reason="no-results"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[reason\\=no-results\\]\\/empty\\:block)) {
  display: block;
}
:is(:where(.group\\/avatar)[data-size="lg"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[size\\=lg\\]\\/avatar\\:type-label)) {
  font: var(--type-label);
  letter-spacing: var(--tracking-label);
}
:is(:where(.group\\/attachment)[data-size="sm"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[size\\=sm\\]\\/attachment\\:hidden)) {
  display: none;
}
:is(:where(.group\\/attachment)[data-size="sm"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[size\\=sm\\]\\/attachment\\:type-label-sm)) {
  font: var(--type-label-sm);
  letter-spacing: var(--tracking-label);
}
:is(:where(.group\\/empty)[data-size="sm"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[size\\=sm\\]\\/empty\\:size-8)) {
  width: calc(var(--space-1) * 8);
  height: calc(var(--space-1) * 8);
}
:is(:where(.group\\/empty)[data-size="sm"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[size\\=sm\\]\\/empty\\:gap-2)) {
  gap: calc(var(--space-1) * 2);
}
:is(:where(.group\\/prompt)[data-state="disabled"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[state\\=disabled\\]\\/prompt\\:bg-field)) {
  background-color: var(--field);
}
:is(:where(.group\\/attachment)[data-state="error"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[state\\=error\\]\\/attachment\\:text-fail-text)) {
  color: var(--fail-text);
}
:is(:where(.group\\/attachment)[data-state="processing"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[state\\=processing\\]\\/attachment\\:opacity-60)) {
  opacity: 60%;
}
:is(:where(.group\\/attachment)[data-state="uploading"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[state\\=uploading\\]\\/attachment\\:opacity-60)) {
  opacity: 60%;
}
:is(:where(.group\\/avatar)[data-type="agent"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[type\\=agent\\]\\/avatar\\:text-text-2)) {
  color: var(--text-2);
}
:is(:where(.group\\/avatar)[data-type="source"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[type\\=source\\]\\/avatar\\:object-contain)) {
  object-fit: contain;
}
:is(:where(.group\\/avatar)[data-type="source"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[type\\=source\\]\\/avatar\\:text-text-2)) {
  color: var(--text-2);
}
:is(:where(.group\\/attachment-drop)[data-variant="zone"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[variant\\=zone\\]\\/attachment-drop\\:-mt-2)) {
  margin-top: calc(var(--space-1) * -2);
}
:is(:where(.peer):disabled ~ :is(:where(.glaze, [data-system="glaze"]) .peer-disabled\\:text-text-disabled)) {
  color: var(--text-disabled);
}
:where(.glaze, [data-system="glaze"]) .file\\:me-2::file-selector-button {
  margin-inline-end: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .file\\:cursor-pointer::file-selector-button {
  cursor: pointer;
}
:where(.glaze, [data-system="glaze"]) .file\\:rounded-pill::file-selector-button {
  border-radius: var(--radius-pill);
}
:where(.glaze, [data-system="glaze"]) .file\\:bg-field::file-selector-button {
  background-color: var(--field);
}
:where(.glaze, [data-system="glaze"]) .file\\:px-2::file-selector-button {
  padding-inline: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .file\\:type-label-sm::file-selector-button {
  font: var(--type-label-sm);
  letter-spacing: var(--tracking-label);
}
:where(.glaze, [data-system="glaze"]) .file\\:text-text-1::file-selector-button {
  color: var(--text-1);
}
:where(.glaze, [data-system="glaze"]) .placeholder\\:text-text-3::placeholder {
  color: var(--text-3);
}
:where(.glaze, [data-system="glaze"]) .before\\:sr-only::before {
  content: var(--tw-content);
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border-width: 0;
}
:where(.glaze, [data-system="glaze"]) .before\\:h-px::before {
  content: var(--tw-content);
  height: 1px;
}
:where(.glaze, [data-system="glaze"]) .before\\:min-w-4::before {
  content: var(--tw-content);
  min-width: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .before\\:flex-1::before {
  content: var(--tw-content);
  flex: 1;
}
:where(.glaze, [data-system="glaze"]) .before\\:bg-line::before {
  content: var(--tw-content);
  background-color: var(--line);
}
:where(.glaze, [data-system="glaze"]) .before\\:content-\\[\\'Highlighted\\:_\\'\\]::before {
  --tw-content: 'Highlighted: ';
  content: var(--tw-content);
}
:where(.glaze, [data-system="glaze"]) .before\\:content-\\[\\'hidden_secret\\'\\]::before {
  --tw-content: 'hidden secret';
  content: var(--tw-content);
}
:where(.glaze, [data-system="glaze"]) .after\\:pointer-events-none::after {
  content: var(--tw-content);
  pointer-events: none;
}
:where(.glaze, [data-system="glaze"]) .after\\:absolute::after {
  content: var(--tw-content);
  position: absolute;
}
:where(.glaze, [data-system="glaze"]) .after\\:-inset-1::after {
  content: var(--tw-content);
  inset: calc(var(--space-1) * -1);
}
:where(.glaze, [data-system="glaze"]) .after\\:inset-0::after {
  content: var(--tw-content);
  inset: 0px;
}
:where(.glaze, [data-system="glaze"]) .after\\:h-px::after {
  content: var(--tw-content);
  height: 1px;
}
:where(.glaze, [data-system="glaze"]) .after\\:min-w-4::after {
  content: var(--tw-content);
  min-width: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .after\\:flex-1::after {
  content: var(--tw-content);
  flex: 1;
}
:where(.glaze, [data-system="glaze"]) .after\\:rounded-\\[inherit\\]::after {
  content: var(--tw-content);
  border-radius: inherit;
}
:where(.glaze, [data-system="glaze"]) .after\\:rounded-shell::after {
  content: var(--tw-content);
  border-radius: var(--radius-shell);
}
:where(.glaze, [data-system="glaze"]) .after\\:border::after {
  content: var(--tw-content);
  border-style: var(--tw-border-style);
  border-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .after\\:border-line::after {
  content: var(--tw-content);
  border-color: var(--line);
}
:where(.glaze, [data-system="glaze"]) .after\\:bg-line::after {
  content: var(--tw-content);
  background-color: var(--line);
}
:where(.glaze, [data-system="glaze"]) .after\\:bg-line-faint::after {
  content: var(--tw-content);
  background-color: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .after\\:content-\\[\\"\\"\\]::after {
  --tw-content: "";
  content: var(--tw-content);
}
:where(.glaze, [data-system="glaze"]) .first\\:ps-0:first-child {
  padding-inline-start: 0px;
}
:where(.glaze, [data-system="glaze"]) .read-only\\:cursor-default:read-only {
  cursor: default;
}
:where(.glaze, [data-system="glaze"]) .empty\\:hidden:empty {
  display: none;
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:bg-hover:hover {
    background-color: var(--hover);
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:bg-hover[data-force-hover] {
  background-color: var(--hover);
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:text-text-1:hover {
    color: var(--text-1);
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:text-text-1[data-force-hover] {
  color: var(--text-1);
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:underline:hover {
    text-decoration-line: underline;
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:underline[data-force-hover] {
  text-decoration-line: underline;
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:decoration-1:hover {
    text-decoration-thickness: 1px;
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:decoration-1[data-force-hover] {
  text-decoration-thickness: 1px;
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:decoration-2:hover {
    text-decoration-thickness: 2px;
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:decoration-2[data-force-hover] {
  text-decoration-thickness: 2px;
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:underline-offset-2:hover {
    text-underline-offset: 2px;
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:underline-offset-2[data-force-hover] {
  text-underline-offset: 2px;
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:not-disabled\\:bg-hover:hover:not(:disabled) {
    background-color: var(--hover);
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:not-disabled\\:bg-hover[data-force-hover]:not(:disabled) {
  background-color: var(--hover);
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:not-disabled\\:text-text-1:hover:not(:disabled) {
    color: var(--text-1);
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:not-disabled\\:text-text-1[data-force-hover]:not(:disabled) {
  color: var(--text-1);
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:not-data-disabled\\:border-line-focus:hover:not([data-disabled]) {
    border-color: var(--line-focus);
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:not-data-disabled\\:border-line-focus[data-force-hover]:not([data-disabled]) {
  border-color: var(--line-focus);
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:not-data-disabled\\:bg-\\(--flat-hover\\):hover:not([data-disabled]) {
    background-color: var(--flat-hover);
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:not-data-disabled\\:bg-\\(--flat-hover\\)[data-force-hover]:not([data-disabled]) {
  background-color: var(--flat-hover);
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:not-data-disabled\\:bg-hover:hover:not([data-disabled]) {
    background-color: var(--hover);
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:not-data-disabled\\:bg-hover[data-force-hover]:not([data-disabled]) {
  background-color: var(--hover);
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .hover\\:not-data-disabled\\:text-text-1:hover:not([data-disabled]) {
    color: var(--text-1);
  }
}
:where(.glaze, [data-system="glaze"]) .hover\\:not-data-disabled\\:text-text-1[data-force-hover]:not([data-disabled]) {
  color: var(--text-1);
}
:where(.glaze, [data-system="glaze"]) .focus\\:not-aria-invalid\\:border-line-focus:focus:not([aria-invalid="true"]) {
  border-color: var(--line-focus);
}
:where(.glaze, [data-system="glaze"]) .focus\\:not-aria-invalid\\:border-line-focus[data-force-focus]:not([aria-invalid="true"]) {
  border-color: var(--line-focus);
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:focus-ring-row:focus-visible {
  outline: var(--focus-width-sm) solid var(--focus);
  outline-offset: calc((var(--focus-width-sm) + var(--focus-offset-sm)) * -1);
  border-radius: var(--radius-row-focus);
  &:is(tr) {
    outline: none;
  }
  &:is(tr) > * {
    box-shadow: inset 0 var(--focus-width-sm) var(--focus), inset 0 calc(var(--focus-width-sm) * -1) var(--focus);
  }
  &:is(tr) > :first-child {
    box-shadow: inset var(--focus-width-sm) 0 var(--focus), inset 0 var(--focus-width-sm) var(--focus), inset 0 calc(var(--focus-width-sm) * -1) var(--focus);
    border-start-start-radius: var(--radius-row-focus);
    border-end-start-radius: var(--radius-row-focus);
  }
  &:is(tr) > :last-child {
    box-shadow: inset calc(var(--focus-width-sm) * -1) 0 var(--focus), inset 0 var(--focus-width-sm) var(--focus), inset 0 calc(var(--focus-width-sm) * -1) var(--focus);
    border-start-end-radius: var(--radius-row-focus);
    border-end-end-radius: var(--radius-row-focus);
  }
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:focus-ring-row[data-force-focus-visible] {
  outline: var(--focus-width-sm) solid var(--focus);
  outline-offset: calc((var(--focus-width-sm) + var(--focus-offset-sm)) * -1);
  border-radius: var(--radius-row-focus);
  &:is(tr) {
    outline: none;
  }
  &:is(tr) > * {
    box-shadow: inset 0 var(--focus-width-sm) var(--focus), inset 0 calc(var(--focus-width-sm) * -1) var(--focus);
  }
  &:is(tr) > :first-child {
    box-shadow: inset var(--focus-width-sm) 0 var(--focus), inset 0 var(--focus-width-sm) var(--focus), inset 0 calc(var(--focus-width-sm) * -1) var(--focus);
    border-start-start-radius: var(--radius-row-focus);
    border-end-start-radius: var(--radius-row-focus);
  }
  &:is(tr) > :last-child {
    box-shadow: inset calc(var(--focus-width-sm) * -1) 0 var(--focus), inset 0 var(--focus-width-sm) var(--focus), inset 0 calc(var(--focus-width-sm) * -1) var(--focus);
    border-start-end-radius: var(--radius-row-focus);
    border-end-end-radius: var(--radius-row-focus);
  }
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:rounded-tag:focus-visible {
  border-radius: var(--radius-tag);
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:rounded-tag[data-force-focus-visible] {
  border-radius: var(--radius-tag);
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:border-line-focus:focus-visible {
  border-color: var(--line-focus);
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:border-line-focus[data-force-focus-visible] {
  border-color: var(--line-focus);
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:focus-ring-inset:focus-visible {
  outline: var(--focus-width) solid var(--focus);
  outline-offset: calc(var(--focus-width) * -1);
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:focus-ring-inset[data-force-focus-visible] {
  outline: var(--focus-width) solid var(--focus);
  outline-offset: calc(var(--focus-width) * -1);
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:outline-offset-0:focus-visible {
  outline-offset: 0px;
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:outline-offset-0[data-force-focus-visible] {
  outline-offset: 0px;
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:not-aria-invalid\\:border-line-focus:focus-visible:not([aria-invalid="true"]) {
  border-color: var(--line-focus);
}
:where(.glaze, [data-system="glaze"]) .focus-visible\\:not-aria-invalid\\:border-line-focus[data-force-focus-visible]:not([aria-invalid="true"]) {
  border-color: var(--line-focus);
}
:where(.glaze, [data-system="glaze"]) .active\\:bg-pressed:active {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .active\\:bg-pressed[data-force-active] {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .active\\:duration-\\(--dur-press\\):active {
  --tw-duration: var(--dur-press);
  transition-duration: var(--dur-press);
}
:where(.glaze, [data-system="glaze"]) .active\\:duration-\\(--dur-press\\)[data-force-active] {
  --tw-duration: var(--dur-press);
  transition-duration: var(--dur-press);
}
:where(.glaze, [data-system="glaze"]) .active\\:not-disabled\\:bg-pressed:active:not(:disabled) {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .active\\:not-disabled\\:bg-pressed[data-force-active]:not(:disabled) {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .active\\:not-data-disabled\\:scale-\\(--scale-press\\):active:not([data-disabled]) {
  scale: var(--scale-press);
}
:where(.glaze, [data-system="glaze"]) .active\\:not-data-disabled\\:scale-\\(--scale-press\\)[data-force-active]:not([data-disabled]) {
  scale: var(--scale-press);
}
:where(.glaze, [data-system="glaze"]) .active\\:not-data-disabled\\:bg-hover:active:not([data-disabled]) {
  background-color: var(--hover);
}
:where(.glaze, [data-system="glaze"]) .active\\:not-data-disabled\\:bg-hover[data-force-active]:not([data-disabled]) {
  background-color: var(--hover);
}
:where(.glaze, [data-system="glaze"]) .active\\:not-data-disabled\\:bg-pressed:active:not([data-disabled]) {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .active\\:not-data-disabled\\:bg-pressed[data-force-active]:not([data-disabled]) {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .disabled\\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}
:where(.glaze, [data-system="glaze"]) .disabled\\:border-line-faint:disabled {
  border-color: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .disabled\\:bg-field:disabled {
  background-color: var(--field);
}
:where(.glaze, [data-system="glaze"]) .disabled\\:text-text-disabled:disabled {
  color: var(--text-disabled);
}
:where(.glaze, [data-system="glaze"]) .disabled\\:placeholder\\:text-text-disabled:disabled::placeholder {
  color: var(--text-disabled);
}
:where([data-size="sm"]) :is(:where(.glaze, [data-system="glaze"]) .in-data-\\[size\\=sm\\]\\:type-label-sm) {
  font: var(--type-label-sm);
  letter-spacing: var(--tracking-label);
}
:where([data-slot="item-group"]) :is(:where(.glaze, [data-system="glaze"]) .in-data-\\[slot\\=item-group\\]\\:rule-row) {
  border-block-end: var(--line-width) solid var(--line-faint);
  &:last-child {
    border-block-end-width: 0;
  }
}
:where(.glaze, [data-system="glaze"]) .has-aria-expanded\\:bg-hover-row:has([aria-expanded="true"]) {
  background-color: var(--hover-row);
}
:where(.glaze, [data-system="glaze"]) .has-data-\\[slot\\=item-description\\]\\:py-2:has([data-slot="item-description"]) {
  padding-block: calc(var(--space-1) * 2);
}
:where(.glaze, [data-system="glaze"]) .has-data-\\[slot\\=tooltip-shortcut\\]\\:pe-1:has([data-slot="tooltip-shortcut"]) {
  padding-inline-end: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .has-data-\\[type\\=agent\\]\\:rounded-tag:has([data-type="agent"]) {
  border-radius: var(--radius-tag);
}
:where(.glaze, [data-system="glaze"]) .has-data-\\[type\\=source\\]\\:rounded-tag:has([data-type="source"]) {
  border-radius: var(--radius-tag);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\[data-slot\\=card-link\\]\\:focus-visible\\]\\:focus-ring:has(:is([data-slot=card-link]:focus-visible)) {
  outline: var(--focus-width) solid var(--focus);
  outline-offset: var(--focus-offset);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\[data-slot\\=item-link\\]\\:active\\]\\:bg-pressed:has(:is([data-slot=item-link]:active)) {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\[data-slot\\=item-link\\]\\:focus-visible\\]\\:focus-ring-row:has(:is([data-slot=item-link]:focus-visible)) {
  outline: var(--focus-width-sm) solid var(--focus);
  outline-offset: calc((var(--focus-width-sm) + var(--focus-offset-sm)) * -1);
  border-radius: var(--radius-row-focus);
  &:is(tr) {
    outline: none;
  }
  &:is(tr) > * {
    box-shadow: inset 0 var(--focus-width-sm) var(--focus), inset 0 calc(var(--focus-width-sm) * -1) var(--focus);
  }
  &:is(tr) > :first-child {
    box-shadow: inset var(--focus-width-sm) 0 var(--focus), inset 0 var(--focus-width-sm) var(--focus), inset 0 calc(var(--focus-width-sm) * -1) var(--focus);
    border-start-start-radius: var(--radius-row-focus);
    border-end-start-radius: var(--radius-row-focus);
  }
  &:is(tr) > :last-child {
    box-shadow: inset calc(var(--focus-width-sm) * -1) 0 var(--focus), inset 0 var(--focus-width-sm) var(--focus), inset 0 calc(var(--focus-width-sm) * -1) var(--focus);
    border-start-end-radius: var(--radius-row-focus);
    border-end-end-radius: var(--radius-row-focus);
  }
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\[data-slot\\=item-link\\]\\:hover\\]\\:not-data-selected\\:bg-hover-row:has(:is([data-slot=item-link]:hover)):not([data-selected]) {
  background-color: var(--hover-row);
}
:where(.glaze, [data-system="glaze"]) .has-\\[input\\:focus-visible\\]\\:text-text-2:has(:is(input:focus-visible)) {
  color: var(--text-2);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=attachment-actions\\]\\]\\:pe-1:has( > [data-slot=attachment-actions]) {
  padding-inline-end: var(--space-1);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=checkbox-group\\]\\]\\:gap-3:has( > [data-slot=checkbox-group]) {
  gap: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=field-content\\]\\]\\:items-start:has( > [data-slot=field-content]) {
  align-items: flex-start;
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=field-set\\]\\]\\:gap-6:has( > [data-slot=field-set]) {
  gap: calc(var(--space-1) * 6);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=input-action\\]\\:first-child\\]\\:-ms-\\[calc\\(var\\(--space-3\\)-var\\(--shell-inset\\)\\)\\]:has( > [data-slot=input-action]:first-child) {
  margin-inline-start: calc(calc(var(--space-3) - var(--shell-inset)) * -1);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=input-action\\]\\:last-child\\]\\:-me-\\[calc\\(var\\(--space-3\\)-var\\(--shell-inset\\)\\)\\]:has( > [data-slot=input-action]:last-child) {
  margin-inline-end: calc(calc(var(--space-3) - var(--shell-inset)) * -1);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=input\\]\\]\\:gap-4:has( > [data-slot=input]) {
  gap: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=radio-group\\]\\]\\:gap-3:has( > [data-slot=radio-group]) {
  gap: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=textarea\\]\\]\\:items-start:has( > [data-slot=textarea]) {
  align-items: flex-start;
}
:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=textarea\\]\\]\\:gap-4:has( > [data-slot=textarea]) {
  gap: calc(var(--space-1) * 4);
}
:where(.glaze, [data-system="glaze"]) .aria-busy\\:cursor-progress[aria-busy="true"] {
  cursor: progress;
}
:where(.glaze, [data-system="glaze"]) .aria-disabled\\:text-text-disabled[aria-disabled="true"] {
  color: var(--text-disabled);
}
:where(.glaze, [data-system="glaze"]) .aria-invalid\\:border-fail[aria-invalid="true"] {
  border-color: var(--fail);
}
:where(.glaze, [data-system="glaze"]) .aria-pressed\\:text-text-1[aria-pressed="true"] {
  color: var(--text-1);
}
:where(.glaze, [data-system="glaze"]) .data-all\\:max-h-96[data-all] {
  max-height: calc(var(--space-1) * 96);
}
:where(.glaze, [data-system="glaze"]) .data-all\\:overflow-y-auto[data-all] {
  overflow-y: auto;
}
:where(.glaze, [data-system="glaze"]) .data-disabled\\:cursor-not-allowed[data-disabled] {
  cursor: not-allowed;
}
:where(.glaze, [data-system="glaze"]) .data-disabled\\:border-line-faint[data-disabled] {
  border-color: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .data-disabled\\:bg-field[data-disabled] {
  background-color: var(--field);
}
:where(.glaze, [data-system="glaze"]) .data-disabled\\:text-text-disabled[data-disabled] {
  color: var(--text-disabled);
}
:where(.glaze, [data-system="glaze"]) .data-disabled\\:not-aria-busy\\:text-text-disabled[data-disabled]:not([aria-busy="true"]) {
  color: var(--text-disabled);
}
:where(.glaze, [data-system="glaze"]) .data-ending-style\\:hidden[data-ending-style] {
  display: none;
}
:where(.glaze, [data-system="glaze"]) .data-ending-style\\:opacity-0[data-ending-style] {
  opacity: 0%;
}
:where(.glaze, [data-system="glaze"]) .data-ending-style\\:duration-\\(--dur-state\\)[data-ending-style] {
  --tw-duration: var(--dur-state);
  transition-duration: var(--dur-state);
}
:where(.glaze, [data-system="glaze"]) .data-highlighted\\:bg-hover[data-highlighted] {
  background-color: var(--hover);
}
:where(.glaze, [data-system="glaze"]) .data-inset\\:ps-7[data-inset] {
  padding-inline-start: calc(var(--space-1) * 7);
}
:where(.glaze, [data-system="glaze"]) .data-instant\\:duration-0[data-instant] {
  --tw-duration: 0ms;
  transition-duration: 0ms;
}
:where(.glaze, [data-system="glaze"]) .data-instant\\:data-ending-style\\:duration-0[data-instant][data-ending-style] {
  --tw-duration: 0ms;
  transition-duration: 0ms;
}
:where(.glaze, [data-system="glaze"]) .data-invalid\\:border-fail[data-invalid] {
  border-color: var(--fail);
}
:where(.glaze, [data-system="glaze"]) .data-last\\:w-\\(--last\\)[data-last] {
  width: var(--last);
}
:where(.glaze, [data-system="glaze"]) .data-missing\\:border-line-faint[data-missing] {
  border-color: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .data-missing\\:text-text-2[data-missing] {
  color: var(--text-2);
}
:where(.glaze, [data-system="glaze"]) .data-missing\\:line-through[data-missing] {
  text-decoration-line: line-through;
}
:where(.glaze, [data-system="glaze"]) .data-missing\\:decoration-1[data-missing] {
  text-decoration-thickness: 1px;
}
:where(.glaze, [data-system="glaze"]) .data-open\\:bg-pressed[data-open] {
  background-color: var(--pressed);
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .data-open\\:hover\\:bg-pressed[data-open]:hover {
    background-color: var(--pressed);
  }
}
:where(.glaze, [data-system="glaze"]) .data-open\\:hover\\:bg-pressed[data-open][data-force-hover] {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .data-placeholder\\:text-text-3[data-placeholder] {
  color: var(--text-3);
}
:where(.glaze, [data-system="glaze"]) .data-popup-open\\:border-line-focus[data-popup-open] {
  border-color: var(--line-focus);
}
:where(.glaze, [data-system="glaze"]) .data-popup-open\\:bg-hover[data-popup-open] {
  background-color: var(--hover);
}
:where(.glaze, [data-system="glaze"]) .data-popup-open\\:bg-pressed[data-popup-open] {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .data-pressed\\:border-line-focus[data-pressed] {
  border-color: var(--line-focus);
}
:where(.glaze, [data-system="glaze"]) .data-pressed\\:bg-pressed[data-pressed] {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .data-readonly\\:cursor-default[data-readonly] {
  cursor: default;
}
:where(.glaze, [data-system="glaze"]) .data-readonly\\:not-focus-within\\:border-line-faint[data-readonly]:not(:focus-within) {
  border-color: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .data-selected\\:bg-pressed[data-selected] {
  background-color: var(--pressed);
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .data-selected\\:hover\\:bg-pressed[data-selected]:hover {
    background-color: var(--pressed);
  }
}
:where(.glaze, [data-system="glaze"]) .data-selected\\:hover\\:bg-pressed[data-selected][data-force-hover] {
  background-color: var(--pressed);
}
:where(.glaze, [data-system="glaze"]) .data-sorted\\:text-text-1[data-sorted] {
  color: var(--text-1);
}
:where(.glaze, [data-system="glaze"]) .data-stale\\:opacity-\\(--stale\\)[data-stale] {
  opacity: var(--stale);
}
:where(.glaze, [data-system="glaze"]) .data-starting-style\\:translate-y-2[data-starting-style] {
  --tw-translate-y: calc(var(--space-1) * 2);
  translate: var(--tw-translate-x) var(--tw-translate-y);
}
:where(.glaze, [data-system="glaze"]) .data-starting-style\\:opacity-0[data-starting-style] {
  opacity: 0%;
}
:where(.glaze, [data-system="glaze"]) .data-swiping\\:transition-none[data-swiping] {
  transition-property: none;
}
:where(.glaze, [data-system="glaze"]) .data-waiting\\:hidden[data-waiting] {
  display: none;
}
:where(.glaze, [data-system="glaze"]) .data-\\[active\\=false\\]\\:pointer-events-none[data-active="false"] {
  pointer-events: none;
}
:where(.glaze, [data-system="glaze"]) .data-\\[active\\=false\\]\\:opacity-0[data-active="false"] {
  opacity: 0%;
}
:where(.glaze, [data-system="glaze"]) .data-\\[size\\=sm\\]\\:\\[--menu-item-h\\:var\\(--menu-row-sm\\)\\][data-size="sm"] {
  --menu-item-h: var(--menu-row-sm);
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:data-\\[slot\\=field-label\\]\\:flex-auto > *)[data-slot="field-label"] {
  flex: auto;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:data-\\[slot\\=field-label\\]\\:shrink-0 > *)[data-slot="field-label"] {
  flex-shrink: 0;
}
:is(:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=input\\]\\]\\:\\*\\:data-\\[slot\\=field-label\\]\\:w-\\(--label-col\\):has( > [data-slot=input]) > *)[data-slot="field-label"] {
  width: var(--label-col);
}
:is(:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=input\\]\\]\\:\\*\\:data-\\[slot\\=field-label\\]\\:flex-none:has( > [data-slot=input]) > *)[data-slot="field-label"] {
  flex: none;
}
:is(:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=textarea\\]\\]\\:\\*\\:data-\\[slot\\=field-label\\]\\:w-\\(--label-col\\):has( > [data-slot=textarea]) > *)[data-slot="field-label"] {
  width: var(--label-col);
}
:is(:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=textarea\\]\\]\\:\\*\\:data-\\[slot\\=field-label\\]\\:flex-none:has( > [data-slot=textarea]) > *)[data-slot="field-label"] {
  flex: none;
}
:is(:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=textarea\\]\\]\\:\\*\\:data-\\[slot\\=field-label\\]\\:pt-1\\.5:has( > [data-slot=textarea]) > *)[data-slot="field-label"] {
  padding-top: calc(var(--space-1) * 1.5);
}
:is(:where(.glaze, [data-system="glaze"]) .has-\\[\\>\\[data-slot\\=input\\]\\]\\:\\*\\:data-\\[slot\\=input\\]\\:flex-1:has( > [data-slot=input]) > *)[data-slot="input"] {
  flex: 1;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:data-\\[slot\\=message-bubble-content\\]\\:border-fail > *)[data-slot="message-bubble-content"] {
  border-color: var(--fail);
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:data-\\[slot\\=message-bubble-content\\]\\:border-line-control > *)[data-slot="message-bubble-content"] {
  border-color: var(--line-control);
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:data-\\[slot\\=message-bubble-content\\]\\:border-line-faint > *)[data-slot="message-bubble-content"] {
  border-color: var(--line-faint);
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:data-\\[slot\\=message-bubble-content\\]\\:bg-paper > *)[data-slot="message-bubble-content"] {
  background-color: var(--paper);
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:data-\\[slot\\=message-bubble-content\\]\\:bg-shell > *)[data-slot="message-bubble-content"] {
  background-color: var(--shell);
}
:is(:is(:where(.group\\/message)[data-from="user"] :is(:where(.glaze, [data-system="glaze"]) .group-data-\\[from\\=user\\]\\/message\\:\\*\\:data-\\[slot\\=message-header\\]\\:sr-only)) > *)[data-slot="message-header"] {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border-width: 0;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:data-\\[slot\\=message-meta\\]\\:ms-auto > *)[data-slot="message-meta"] {
  margin-inline-start: auto;
}
:is(:where(.glaze, [data-system="glaze"]) .\\*\\:data-\\[slot\\=message-model\\]\\:ms-auto > *)[data-slot="message-model"] {
  margin-inline-start: auto;
}
:where(.glaze, [data-system="glaze"]) .data-\\[state\\=error\\]\\:border-fail[data-state="error"] {
  border-color: var(--fail);
}
:where(.glaze, [data-system="glaze"]) .data-\\[status\\=fail\\]\\:border-fail[data-status="fail"] {
  border-color: var(--fail);
}
:where(.glaze, [data-system="glaze"]) .data-\\[status\\=fail\\]\\:bg-fail-tint[data-status="fail"] {
  background-color: var(--fail-tint);
}
:where(.glaze, [data-system="glaze"]) .data-\\[status\\=fail\\]\\:text-fail-text[data-status="fail"] {
  color: var(--fail-text);
}
:where(.glaze, [data-system="glaze"]) .data-\\[status\\=ok\\]\\:text-ok-text[data-status="ok"] {
  color: var(--ok-text);
}
:where(.glaze, [data-system="glaze"]) .data-\\[variant\\=destructive\\]\\:text-fail-text[data-variant="destructive"] {
  color: var(--fail-text);
}
:where(.glaze, [data-system="glaze"]) .data-\\[variant\\=destructive\\]\\:data-highlighted\\:bg-fail-tint[data-variant="destructive"][data-highlighted] {
  background-color: var(--fail-tint);
}
:where(.glaze, [data-system="glaze"]) .data-\\[variant\\=label\\]\\:type-label[data-variant="label"] {
  font: var(--type-label);
  letter-spacing: var(--tracking-label);
}
:where(.glaze, [data-system="glaze"]) .data-\\[variant\\=legend\\]\\:type-heading-sm[data-variant="legend"] {
  font: var(--type-heading-sm);
  letter-spacing: var(--tracking-heading);
}
@media (prefers-reduced-motion: reduce) {
  :where(.glaze, [data-system="glaze"]) .motion-reduce\\:hidden {
    display: none;
  }
}
:where(.glaze, [data-system="glaze"]) .motion-reduce\\:hidden:where([data-force-reduced-motion], [data-force-reduced-motion] *) {
  display: none;
}
@media (prefers-reduced-motion: reduce) {
  :where(.glaze, [data-system="glaze"]) .motion-reduce\\:h-\\(--rest\\) {
    height: var(--rest);
  }
}
:where(.glaze, [data-system="glaze"]) .motion-reduce\\:h-\\(--rest\\):where([data-force-reduced-motion], [data-force-reduced-motion] *) {
  height: var(--rest);
}
@media (prefers-reduced-motion: reduce) {
  :where(.glaze, [data-system="glaze"]) .motion-reduce\\:animate-none {
    animation: none;
  }
}
:where(.glaze, [data-system="glaze"]) .motion-reduce\\:animate-none:where([data-force-reduced-motion], [data-force-reduced-motion] *) {
  animation: none;
}
@media (prefers-reduced-motion: reduce) {
  :where(.glaze, [data-system="glaze"]) .motion-reduce\\:transition-none {
    transition-property: none;
  }
}
:where(.glaze, [data-system="glaze"]) .motion-reduce\\:transition-none:where([data-force-reduced-motion], [data-force-reduced-motion] *) {
  transition-property: none;
}
@media (width < 640px) {
  :where(.glaze, [data-system="glaze"]) .max-sm\\:overflow-visible {
    overflow: visible;
  }
  :where(.glaze, [data-system="glaze"]) .max-sm\\:\\[overflow-wrap\\:anywhere\\] {
    overflow-wrap: anywhere;
  }
  :where(.glaze, [data-system="glaze"]) .max-sm\\:whitespace-normal {
    white-space: normal;
  }
}
@media (width >= 640px) {
  :where(.glaze, [data-system="glaze"]) .sm\\:end-6 {
    inset-inline-end: calc(var(--space-1) * 6);
  }
  :where(.glaze, [data-system="glaze"]) .sm\\:bottom-6 {
    bottom: calc(var(--space-1) * 6);
  }
  :where(.glaze, [data-system="glaze"]) .sm\\:block {
    display: block;
  }
  :where(.glaze, [data-system="glaze"]) .sm\\:w-\\(--toast\\) {
    width: var(--toast);
  }
  :where(.glaze, [data-system="glaze"]) .sm\\:p-0 {
    padding: 0px;
  }
}
@container item (width < 28rem) {
  :where(.glaze, [data-system="glaze"]) .\\@max-md\\/item\\:hidden {
    display: none;
  }
}
@container toast (width < 20rem) {
  :where(.glaze, [data-system="glaze"]) .\\@max-\\[20rem\\]\\/toast\\:ms-6 {
    margin-inline-start: calc(var(--space-1) * 6);
  }
  :where(.glaze, [data-system="glaze"]) .\\@max-\\[20rem\\]\\/toast\\:gap-y-2 {
    row-gap: calc(var(--space-1) * 2);
  }
  :where(.glaze, [data-system="glaze"]) .\\@max-\\[20rem\\]\\/toast\\:justify-self-start {
    justify-self: flex-start;
  }
  :where(.glaze, [data-system="glaze"]) .\\@max-\\[20rem\\]\\/toast\\:\\[grid-template-areas\\:\\"content_content_close\\"_\\"action_action_action\\"\\] {
    grid-template-areas: "content content close" "action action action";
  }
}
@container queue-row (width >= 20rem) {
  :where(.glaze, [data-system="glaze"]) .\\@xs\\/queue-row\\:not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip-path: none;
    white-space: normal;
  }
  :where(.glaze, [data-system="glaze"]) .\\@xs\\/queue-row\\:w-18 {
    width: calc(var(--space-1) * 18);
  }
  :where(.glaze, [data-system="glaze"]) .\\@xs\\/queue-row\\:ps-20\\.5 {
    padding-inline-start: calc(var(--space-1) * 20.5);
  }
}
@container prompt-toolbar (width >= 24rem) {
  :where(.glaze, [data-system="glaze"]) .\\@sm\\/prompt-toolbar\\:order-none {
    order: 0;
  }
  :where(.glaze, [data-system="glaze"]) .\\@sm\\/prompt-toolbar\\:shrink {
    flex-shrink: 1;
  }
  :where(.glaze, [data-system="glaze"]) .\\@sm\\/prompt-toolbar\\:basis-auto {
    flex-basis: auto;
  }
}
@container field-group (width >= 28rem) {
  :where(.glaze, [data-system="glaze"]) .\\@md\\/field-group\\:flex-row {
    flex-direction: row;
  }
  :where(.glaze, [data-system="glaze"]) .\\@md\\/field-group\\:items-center {
    align-items: center;
  }
  :where(.glaze, [data-system="glaze"]) .\\@md\\/field-group\\:gap-6 {
    gap: calc(var(--space-1) * 6);
  }
  :is(:where(.glaze, [data-system="glaze"]) .\\@md\\/field-group\\:\\*\\:data-\\[slot\\=field-content\\]\\:flex-auto > *)[data-slot="field-content"] {
    flex: auto;
  }
  :is(:where(.glaze, [data-system="glaze"]) .\\@md\\/field-group\\:\\*\\:data-\\[slot\\=field-label\\]\\:w-40 > *)[data-slot="field-label"] {
    width: calc(var(--space-1) * 40);
  }
  :is(:where(.glaze, [data-system="glaze"]) .\\@md\\/field-group\\:\\*\\:data-\\[slot\\=field-label\\]\\:shrink-0 > *)[data-slot="field-label"] {
    flex-shrink: 0;
  }
}
:where(.glaze, [data-system="glaze"]) .rtl\\:origin-right:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *) {
  transform-origin: 100%;
}
:where(.glaze, [data-system="glaze"]) .rtl\\:translate-x-1\\/2:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *) {
  --tw-translate-x: calc(1 / 2 * 100%);
  translate: var(--tw-translate-x) var(--tw-translate-y);
}
:where(.glaze, [data-system="glaze"]) .rtl\\:-scale-x-100:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *) {
  --tw-scale-x: calc(100% * -1);
  scale: var(--tw-scale-x) var(--tw-scale-y);
}
:is(:where(.group\\/row)[data-panel-open] :is(:where(.glaze, [data-system="glaze"]) .rtl\\:group-data-panel-open\\/row\\:-rotate-90:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *))) {
  rotate: calc(90deg * -1);
}
@starting-style {
  :where(.glaze, [data-system="glaze"]) .starting\\:opacity-0 {
    opacity: 0%;
  }
}
@media (forced-colors: active) {
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:border-dashed {
    --tw-border-style: dashed;
    border-style: dashed;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:border-solid {
    --tw-border-style: solid;
    border-style: solid;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:border-\\[ButtonText\\] {
    border-color: ButtonText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:border-\\[CanvasText\\] {
    border-color: CanvasText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:bg-\\[CanvasText\\] {
    background-color: CanvasText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:bg-\\[Canvas\\] {
    background-color: Canvas;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:bg-\\[GrayText\\] {
    background-color: GrayText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:bg-\\[Highlight\\] {
    background-color: Highlight;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:fill-\\[CanvasText\\] {
    fill: CanvasText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:stroke-\\[CanvasText\\] {
    stroke: CanvasText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:stroke-\\[GrayText\\] {
    stroke: GrayText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:text-\\[HighlightText\\] {
    color: HighlightText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:outline {
    outline-style: var(--tw-outline-style);
    outline-width: 1px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:outline-1 {
    outline-style: var(--tw-outline-style);
    outline-width: 1px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:-outline-offset-1 {
    outline-offset: calc(1px * -1);
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:outline-\\[CanvasText\\] {
    outline-color: CanvasText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:\\[forced-color-adjust\\:none\\] {
    forced-color-adjust: none;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:outline-solid {
    --tw-outline-style: solid;
    outline-style: solid;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:before\\:bg-\\[CanvasText\\]::before {
    content: var(--tw-content);
    background-color: CanvasText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:after\\:bg-\\[CanvasText\\]::after {
    content: var(--tw-content);
    background-color: CanvasText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-disabled\\:text-\\[GrayText\\][data-disabled] {
    color: GrayText;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-highlighted\\:outline-2[data-highlighted] {
    outline-style: var(--tw-outline-style);
    outline-width: 2px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-highlighted\\:-outline-offset-2[data-highlighted] {
    outline-offset: calc(2px * -1);
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-highlighted\\:outline-solid[data-highlighted] {
    --tw-outline-style: solid;
    outline-style: solid;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-open\\:outline-2[data-open] {
    outline-style: var(--tw-outline-style);
    outline-width: 2px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-open\\:-outline-offset-2[data-open] {
    outline-offset: calc(2px * -1);
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-open\\:outline-\\[Highlight\\][data-open] {
    outline-color: Highlight;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-popup-open\\:outline-1[data-popup-open] {
    outline-style: var(--tw-outline-style);
    outline-width: 1px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-popup-open\\:-outline-offset-1[data-popup-open] {
    outline-offset: calc(1px * -1);
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-popup-open\\:outline-solid[data-popup-open] {
    --tw-outline-style: solid;
    outline-style: solid;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-pressed\\:border-2[data-pressed] {
    border-style: var(--tw-border-style);
    border-width: 2px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-selected\\:outline[data-selected] {
    outline-style: var(--tw-outline-style);
    outline-width: 1px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-selected\\:outline-1[data-selected] {
    outline-style: var(--tw-outline-style);
    outline-width: 1px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-selected\\:outline-2[data-selected] {
    outline-style: var(--tw-outline-style);
    outline-width: 2px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-selected\\:-outline-offset-1[data-selected] {
    outline-offset: calc(1px * -1);
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-selected\\:-outline-offset-2[data-selected] {
    outline-offset: calc(2px * -1);
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:data-selected\\:outline-\\[Highlight\\][data-selected] {
    outline-color: Highlight;
  }
}
@media (pointer: coarse) {
  :where(.glaze, [data-system="glaze"]) .pointer-coarse\\:hidden {
    display: none;
  }
  :where(.glaze, [data-system="glaze"]) .pointer-coarse\\:min-h-11 {
    min-height: calc(var(--space-1) * 11);
  }
  :where(.glaze, [data-system="glaze"]) .pointer-coarse\\:opacity-0 {
    opacity: 0%;
  }
  :where(.glaze, [data-system="glaze"]) .pointer-coarse\\:opacity-100 {
    opacity: 100%;
  }
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_\\[data-mention-type\\=paste\\]\\]\\:cursor-pointer [data-mention-type=paste] {
  cursor: pointer;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_\\[data-menu-target-open\\]\\]\\:bg-pressed [data-menu-target-open] {
  background-color: var(--pressed);
}
@media (forced-colors: active) {
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:\\[\\&_\\[data-menu-target-open\\]\\]\\:outline-2 [data-menu-target-open] {
    outline-style: var(--tw-outline-style);
    outline-width: 2px;
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:\\[\\&_\\[data-menu-target-open\\]\\]\\:-outline-offset-2 [data-menu-target-open] {
    outline-offset: calc(2px * -1);
  }
  :where(.glaze, [data-system="glaze"]) .forced-colors\\:\\[\\&_\\[data-menu-target-open\\]\\]\\:outline-solid [data-menu-target-open] {
    --tw-outline-style: solid;
    outline-style: solid;
  }
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_\\[data-slot\\=mention\\]\\]\\:mx-px [data-slot=mention] {
  margin-inline: 1px;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_a\\]\\:text-text-1 a {
  color: var(--text-1);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_a\\]\\:underline a {
  text-decoration-line: underline;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_a\\]\\:decoration-1 a {
  text-decoration-thickness: 1px;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_a\\]\\:underline-offset-2 a {
  text-underline-offset: 2px;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_a\\]\\:underline-offset-4 a {
  text-underline-offset: 4px;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_img\\]\\:size-full img {
  width: 100%;
  height: 100%;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_img\\]\\:object-cover img {
  object-fit: cover;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_svg\\]\\:pointer-events-none svg {
  pointer-events: none;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_svg\\]\\:size-\\(--icon\\) svg {
  width: var(--icon);
  height: var(--icon);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_svg\\]\\:size-\\(--icon-lg\\) svg {
  width: var(--icon-lg);
  height: var(--icon-lg);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_svg\\]\\:size-\\(--icon-sm\\) svg {
  width: var(--icon-sm);
  height: var(--icon-sm);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_svg\\]\\:shrink-0 svg {
  flex-shrink: 0;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_svg\\]\\:text-current svg {
  color: currentcolor;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_svg\\]\\:text-text-1 svg {
  color: var(--text-1);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_svg\\]\\:text-text-1\\! svg {
  color: var(--text-1) !important;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&_svg\\]\\:text-text-3 svg {
  color: var(--text-3);
}
:where(.glaze, [data-system="glaze"]) .data-disabled\\:\\[\\&_svg\\]\\:text-text-disabled[data-disabled] svg {
  color: var(--text-disabled);
}
:where(.glaze, [data-system="glaze"]) .data-pressed\\:\\[\\&_svg\\]\\:text-text-1[data-pressed] svg {
  color: var(--text-1);
}
:where(.glaze, [data-system="glaze"]) .data-\\[variant\\=destructive\\]\\:\\[\\&_svg\\]\\:text-fail-text[data-variant="destructive"] svg {
  color: var(--fail-text);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\+\\[data-slot\\=card-content\\]\\:not\\(\\[data-flush\\]\\)\\]\\:pt-0 + [data-slot=card-content]:not([data-flush]) {
  padding-top: 0px;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\:\\:-webkit-search-cancel-button\\]\\:appearance-none::-webkit-search-cancel-button {
  appearance: none;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:w-10:has([role=checkbox]) {
  width: calc(var(--space-1) * 10);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]) {
  padding-inline-end: 0px;
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .\\[a\\]\\:hover\\:bg-hover:is(a):hover {
    background-color: var(--hover);
  }
}
:where(.glaze, [data-system="glaze"]) .\\[a\\]\\:hover\\:bg-hover:is(a)[data-force-hover] {
  background-color: var(--hover);
}
:where(.glaze, [data-system="glaze"]) .\\[a\\,button\\]\\:cursor-pointer:is(a, button) {
  cursor: pointer;
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .\\[button\\]\\:hover\\:bg-hover:is(button):hover {
    background-color: var(--hover);
  }
}
:where(.glaze, [data-system="glaze"]) .\\[button\\]\\:hover\\:bg-hover:is(button)[data-force-hover] {
  background-color: var(--hover);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\:is\\(button\\,a\\)\\]\\:text-start:is(button, a) {
  text-align: start;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\:is\\(button\\,a\\)\\]\\:transition-colors:is(button, a) {
  transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\:is\\(button\\,a\\)\\]\\:duration-\\(--dur-state\\):is(button, a) {
  --tw-duration: var(--dur-state);
  transition-duration: var(--dur-state);
}
@media (hover: hover) {
  :where(.glaze, [data-system="glaze"]) .\\[\\&\\:is\\(button\\,a\\)\\]\\:hover\\:bg-hover:is(button, a):hover {
    background-color: var(--hover);
  }
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\:is\\(button\\,a\\)\\]\\:hover\\:bg-hover:is(button, a)[data-force-hover] {
  background-color: var(--hover);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\*\\+\\*\\]\\:-ms-\\(--avatar-overlap\\) > * + * {
  margin-inline-start: calc(var(--avatar-overlap) * -1);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\*\\:first-child\\]\\:min-w-0 > :first-child {
  min-width: 0px;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\*\\:first-child\\]\\:truncate > :first-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:\\[--avatar-covered\\:calc\\(var\\(--avatar-overlap\\)\\+var\\(--space-0-5\\)\\)\\] > :not(:last-child) {
  --avatar-covered: calc(var(--avatar-overlap) + var(--space-0-5));
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\:disabled\\]\\:pointer-events-none > :disabled {
  pointer-events: none;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\:first-child\\]\\:me-auto > :first-child {
  margin-inline-end: auto;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\[data-disabled\\]\\]\\:pointer-events-none > [data-disabled] {
  pointer-events: none;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\[data-slot\\$\\=button\\]\\]\\:transition-opacity > [data-slot$=button] {
  transition-property: opacity;
  transition-timing-function: var(--tw-ease, ease);
  transition-duration: var(--tw-duration, 0s);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\[data-slot\\$\\=button\\]\\]\\:duration-\\(--dur-state\\) > [data-slot$=button] {
  --tw-duration: var(--dur-state);
  transition-duration: var(--dur-state);
}
@media (pointer: fine) {
  :is(:where(.group\\/message)[data-from="agent"] :is(:where(.glaze, [data-system="glaze"]) .pointer-fine\\:group-data-\\[from\\=agent\\]\\/message\\:\\[\\&\\>\\[data-slot\\$\\=button\\]\\]\\:opacity-0)) > [data-slot$=button] {
    opacity: 0%;
  }
  @media (hover: hover) {
    :is(:where(.group\\/message):hover :is(:where(.group\\/message)[data-from="agent"] :is(:where(.glaze, [data-system="glaze"]) .pointer-fine\\:group-data-\\[from\\=agent\\]\\/message\\:group-hover\\/message\\:\\[\\&\\>\\[data-slot\\$\\=button\\]\\]\\:opacity-100))) > [data-slot$=button] {
      opacity: 100%;
    }
  }
  :is(:where(.group\\/message)[data-force-hover] :is(:where(.group\\/message)[data-from="agent"] :is(:where(.glaze, [data-system="glaze"]) .pointer-fine\\:group-data-\\[from\\=agent\\]\\/message\\:group-hover\\/message\\:\\[\\&\\>\\[data-slot\\$\\=button\\]\\]\\:opacity-100))) > [data-slot$=button] {
    opacity: 100%;
  }
  :is(:where(.group\\/message)[data-from="agent"] :is(:where(.glaze, [data-system="glaze"]) .pointer-fine\\:group-data-\\[from\\=agent\\]\\/message\\:has-\\[\\:focus-visible\\,\\[data-force-focus-visible\\]\\]\\:\\[\\&\\>\\[data-slot\\$\\=button\\]\\]\\:opacity-100)):has(:is(:focus-visible, [data-force-focus-visible])) > [data-slot$=button] {
    opacity: 100%;
  }
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\[data-slot\\=card-meta\\]\\:first-child\\]\\:me-auto > [data-slot=card-meta]:first-child {
  margin-inline-end: auto;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\[data-slot\\=card-meta\\]\\:last-child\\]\\:pe-3 > [data-slot=card-meta]:last-child {
  padding-inline-end: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\[data-slot\\=message-model\\]\\+\\[data-slot\\=message-meta\\]\\]\\:ms-3 > [data-slot=message-model] + [data-slot=message-meta] {
  margin-inline-start: calc(var(--space-1) * 3);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>\\[data-slot\\=panel\\]\\~\\[data-slot\\=panel\\]\\]\\:mt-\\(--shell-inset\\) > [data-slot=panel] ~ [data-slot=panel] {
  margin-top: var(--shell-inset);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>option\\]\\:bg-paper > option {
  background-color: var(--paper);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>option\\]\\:text-text-1 > option {
  color: var(--text-1);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>svg\\]\\:pointer-events-none > svg {
  pointer-events: none;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>svg\\]\\:size-\\(--icon-sm\\) > svg {
  width: var(--icon-sm);
  height: var(--icon-sm);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>svg\\]\\:shrink-0 > svg {
  flex-shrink: 0;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>tr\\:not\\(\\:last-child\\)\\>\\*\\]\\:border-b > tr:not(:last-child) > * {
  border-bottom-style: var(--tw-border-style);
  border-bottom-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>tr\\:not\\(\\:last-child\\)\\>\\*\\]\\:border-line-faint > tr:not(:last-child) > * {
  border-color: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>tr\\:not\\(\\:last-child\\)\\>td\\]\\:border-b > tr:not(:last-child) > td {
  border-bottom-style: var(--tw-border-style);
  border-bottom-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>tr\\:not\\(\\:last-child\\)\\>td\\]\\:border-line-faint > tr:not(:last-child) > td {
  border-color: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>tr\\:not\\(\\:last-child\\)\\>th\\]\\:border-b > tr:not(:last-child) > th {
  border-bottom-style: var(--tw-border-style);
  border-bottom-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>tr\\:not\\(\\:last-child\\)\\>th\\]\\:border-line-faint > tr:not(:last-child) > th {
  border-color: var(--line-faint);
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>tr\\>td\\]\\:border-t > tr > td {
  border-top-style: var(--tw-border-style);
  border-top-width: 1px;
}
:where(.glaze, [data-system="glaze"]) .\\[\\&\\>tr\\>td\\]\\:border-line-faint > tr > td {
  border-color: var(--line-faint);
}
[data-slot=message-status] ~ :is(:where(.glaze, [data-system="glaze"]) .\\[\\[data-slot\\=message-status\\]\\~\\&\\]\\:ms-0) {
  margin-inline-start: 0px;
}
@media (hover: hover) {
  tbody > :is(:where(.glaze, [data-system="glaze"]) .\\[tbody\\>\\&\\]\\:hover\\:bg-hover-row):hover {
    background-color: var(--hover-row);
  }
}
tbody > :is(:where(.glaze, [data-system="glaze"]) .\\[tbody\\>\\&\\]\\:hover\\:bg-hover-row)[data-force-hover] {
  background-color: var(--hover-row);
}
.glaze [data-force-reduced-motion], [data-system="glaze"] [data-force-reduced-motion] {
  --dur-press: 0ms;
  --dur-state: 0ms;
  --dur-overlay: 0ms;
  --scale-press: 1;
  --scale-press-flat: 1;
  --scale-press-glass: 1;
  --dur-glass-press: 0ms;
  --dur-glass-release: 0ms;
  --dur-slide: 0ms;
}
.glaze :where([data-control]):is(:focus-visible, [data-force-focus-visible]) {
  outline: none;
}
@keyframes glaze-spin {
  to {
    transform: rotate(1turn);
  }
}
@keyframes glaze-sweep {
  from {
    inset-inline-start: calc(var(--progress-sweep) * -1);
  }
  to {
    inset-inline-start: 100%;
  }
}
.hui-bot {
  --bot-1: #66a6ff;
  --bot-2: #0059d4;
  --bot-face: #ffffff;
  --bot-ground: rgba(0, 0, 0, 0.05);
  --bot-ground-core: rgba(0, 0, 0, 0.095);
  --bot-heart: #ff4f7e;
  --bot-blush: rgba(255, 110, 150, 0.55);
  position: relative;
  display: inline-block;
  flex: none;
  width: var(--bot-size, 24px);
  height: var(--bot-size, 24px);
  vertical-align: middle;
}
.glaze[data-theme='dark'] .hui-bot {
  --bot-face: #101010;
  --bot-ground: rgba(0, 0, 0, 0.2);
  --bot-ground-core: rgba(0, 0, 0, 0.3);
}
.hui-bot svg {
  position: absolute;
  inset: -25%;
  display: block;
  width: 150%;
  height: 150%;
  overflow: visible;
}
.hui-bot .stop1, .hui-bot .stop2 {
  transition: stop-color 450ms ease;
}
.hui-bot .stop1 {
  stop-color: var(--bot-1);
}
.hui-bot .stop2 {
  stop-color: var(--bot-2);
}
.hui-bot .face {
  fill: var(--bot-face);
  stroke: var(--bot-face);
}
.hui-bot .ground {
  fill: var(--bot-ground);
}
.hui-bot .core {
  fill: var(--bot-ground-core);
}
.hui-bot .blush {
  fill: var(--bot-blush);
}
.hui-bot .heart {
  fill: var(--bot-heart);
}
@keyframes hermes-ui-rail-bar {
  from {
    opacity: 0;
    translate: 0 -4px;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}
@keyframes hermes-ui-aside-in {
  from {
    opacity: 0;
    translate: 12px 0;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  @keyframes hermes-ui-rail-bar {
    from {
      opacity: 0;
      translate: 0 0;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }
  @keyframes hermes-ui-aside-in {
    from {
      opacity: 0;
      translate: 0 0;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }
}
.glaze [data-enter='rail-bar'] {
  animation: hermes-ui-rail-bar 160ms var(--ease-out);
}
.glaze [data-enter='aside'] {
  animation: hermes-ui-aside-in 200ms var(--ease-out);
}
@property --tw-border-spacing-x {
  syntax: "<length>";
  inherits: false;
  initial-value: 0;
}
@property --tw-border-spacing-y {
  syntax: "<length>";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-x {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-y {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-z {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-rotate-x {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-y {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-z {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-x {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-y {
  syntax: "*";
  inherits: false;
}
@property --tw-scroll-snap-strictness {
  syntax: "*";
  inherits: false;
  initial-value: proximity;
}
@property --tw-border-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-leading {
  syntax: "*";
  inherits: false;
}
@property --tw-font-weight {
  syntax: "*";
  inherits: false;
}
@property --tw-ordinal {
  syntax: "*";
  inherits: false;
}
@property --tw-slashed-zero {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-figure {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-spacing {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-fraction {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-inset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-ring-inset {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-offset-width {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
@property --tw-ring-offset-color {
  syntax: "*";
  inherits: false;
  initial-value: #fff;
}
@property --tw-ring-offset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-outline-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-blur {
  syntax: "*";
  inherits: false;
}
@property --tw-brightness {
  syntax: "*";
  inherits: false;
}
@property --tw-contrast {
  syntax: "*";
  inherits: false;
}
@property --tw-grayscale {
  syntax: "*";
  inherits: false;
}
@property --tw-hue-rotate {
  syntax: "*";
  inherits: false;
}
@property --tw-invert {
  syntax: "*";
  inherits: false;
}
@property --tw-opacity {
  syntax: "*";
  inherits: false;
}
@property --tw-saturate {
  syntax: "*";
  inherits: false;
}
@property --tw-sepia {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-drop-shadow-size {
  syntax: "*";
  inherits: false;
}
@property --tw-duration {
  syntax: "*";
  inherits: false;
}
@property --tw-ease {
  syntax: "*";
  inherits: false;
}
@property --tw-content {
  syntax: "*";
  initial-value: "";
  inherits: false;
}
@property --tw-scale-x {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-y {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-z {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: block))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    .glaze *, .glaze ::before, .glaze ::after, .glaze ::backdrop {
      --tw-border-spacing-x: 0;
      --tw-border-spacing-y: 0;
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-translate-z: 0;
      --tw-rotate-x: initial;
      --tw-rotate-y: initial;
      --tw-rotate-z: initial;
      --tw-skew-x: initial;
      --tw-skew-y: initial;
      --tw-scroll-snap-strictness: proximity;
      --tw-border-style: solid;
      --tw-leading: initial;
      --tw-font-weight: initial;
      --tw-ordinal: initial;
      --tw-slashed-zero: initial;
      --tw-numeric-figure: initial;
      --tw-numeric-spacing: initial;
      --tw-numeric-fraction: initial;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-color: initial;
      --tw-shadow-alpha: 100%;
      --tw-inset-shadow: 0 0 #0000;
      --tw-inset-shadow-color: initial;
      --tw-inset-shadow-alpha: 100%;
      --tw-ring-color: initial;
      --tw-ring-shadow: 0 0 #0000;
      --tw-inset-ring-color: initial;
      --tw-inset-ring-shadow: 0 0 #0000;
      --tw-ring-inset: initial;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-outline-style: solid;
      --tw-blur: initial;
      --tw-brightness: initial;
      --tw-contrast: initial;
      --tw-grayscale: initial;
      --tw-hue-rotate: initial;
      --tw-invert: initial;
      --tw-opacity: initial;
      --tw-saturate: initial;
      --tw-sepia: initial;
      --tw-drop-shadow: initial;
      --tw-drop-shadow-color: initial;
      --tw-drop-shadow-alpha: 100%;
      --tw-drop-shadow-size: initial;
      --tw-duration: initial;
      --tw-ease: initial;
      --tw-content: "";
      --tw-scale-x: 1;
      --tw-scale-y: 1;
      --tw-scale-z: 1;
    }
  }
}
`;import{useEffect as Yk,useState as Xk}from"react";import{useRef as _Q,useState as ZQ}from"react";import{Fragment as Tk,jsx as Fr,jsxs as Ek}from"react/jsx-runtime";var sI={empty:I6,"no-results":A6,"no-access":k6,error:rf},Ck=Ye("group/empty flex w-full min-w-0 flex-col items-center gap-3 text-center text-text-1",{variants:{variant:{panel:"panel forced-colors:border-[CanvasText]",plain:""},size:{default:"px-4 py-6",sm:"gap-2 px-3 py-4"}},defaultVariants:{variant:"panel",size:"default"}});function t2({className:e,reason:t="empty",variant:o="panel",size:a="default",role:r,...n}){return Fr("div",{"data-slot":"empty","data-reason":t,"data-size":a,role:r??(t==="error"?"alert":void 0),className:F(Ck({variant:o,size:a}),e),...n})}function o2({className:e,...t}){return Fr("div",{"data-slot":"empty-header",className:F("flex max-w-(--measure-hint) min-w-0 flex-col items-center gap-1",e),...t})}function a2({className:e,icon:t,children:o,...a}){return Ek("h3",{"data-slot":"empty-title",className:F("flex min-w-0 flex-col items-center gap-3 type-label text-text-1 group-data-[reason=error]/empty:text-fail-text group-data-[size=sm]/empty:gap-2",e),...a,children:[t!==!1&&Fr(Rk,{icon:t}),Fr("span",{className:"min-w-0 text-pretty",children:o})]})}function Rk({icon:e}){return Fr("span",{"data-slot":"empty-icon",className:"flex shrink-0 text-text-3 group-data-[reason=error]/empty:text-fail-text",children:Fr(Sk,{icon:e})})}function Sk({icon:e}){let t="group-data-[size=sm]/empty:size-8";return e?Fr(Ce,{icon:e,size:40,weight:"light",className:t}):Fr(Tk,{children:Object.keys(sI).map(o=>Fr(Ce,{icon:sI[o],size:40,weight:"light","data-reason":o,className:F("hidden",t,{empty:"group-data-[reason=empty]/empty:block","no-results":"group-data-[reason=no-results]/empty:block","no-access":"group-data-[reason=no-access]/empty:block",error:"group-data-[reason=error]/empty:block"}[o])},o))})}function r2({className:e,...t}){return Fr("p",{"data-slot":"empty-description",className:F("type-body-sm text-pretty text-text-2 [&_a]:text-text-1 [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-2",e),...t})}function n2({className:e,...t}){return Fr("div",{"data-slot":"empty-content",className:F("flex min-w-0 flex-wrap items-center justify-center gap-2",e),...t})}import{createContext as Mk,useContext as Pk}from"react";function Or(e){return ae(e.defaultTagName??"div",e,e)}import{jsx as ji}from"react/jsx-runtime";var iI=Mk(!1),kk=Ye("group/item-group flex w-full min-w-0 flex-col overflow-hidden",{variants:{variant:{panel:"panel forced-colors:border-[CanvasText]",plain:""}},defaultVariants:{variant:"panel"}});function s2({className:e,variant:t="panel",role:o="list",...a}){return ji(iI.Provider,{value:!0,children:ji("div",{"data-slot":"item-group","data-variant":t,role:o,className:F(kk({variant:t}),e),...a})})}var Ak=Ye(["group/item @container/item relative flex w-full min-w-0 items-center gap-3 px-3 text-start text-text-1","transition-[background-color] duration-(--dur-state) ease-out","in-data-[slot=item-group]:rule-row","has-[[data-slot=item-link]:hover]:not-data-selected:bg-hover-row has-[[data-slot=item-link]:active]:bg-pressed","has-[[data-slot=item-link]:focus-visible]:focus-ring-row","data-selected:bg-pressed forced-colors:data-selected:outline forced-colors:data-selected:outline-2 forced-colors:data-selected:-outline-offset-2","data-disabled:text-text-disabled"],{variants:{size:{default:"min-h-(--row) py-1.5 has-data-[slot=item-description]:py-2",sm:"min-h-(--control) gap-2 py-1"}},defaultVariants:{size:"default"}});function gf({className:e,size:t="default",selected:o,disabled:a,render:r,...n}){let s=Pk(iI);return Or({defaultTagName:"div",props:rt({className:F(Ak({size:t}),e)},{"data-slot":"item","data-size":t,"data-selected":o?"":void 0,"data-disabled":a?"":void 0,role:s?"listitem":void 0},n),render:r,state:{slot:"item",size:t}})}var zk=Ye("flex shrink-0 items-center justify-center group-has-data-[slot=item-description]/item:self-start group-has-data-[slot=item-description]/item:mt-0.5 [&_svg]:pointer-events-none",{variants:{variant:{default:"",icon:"size-6 text-text-2",image:"size-8 overflow-hidden rounded-tag bg-field [&_img]:size-full [&_img]:object-cover"}},defaultVariants:{variant:"default"}});function i2({className:e,variant:t="default",...o}){return ji("div",{"data-slot":"item-media","data-variant":t,className:F(zk({variant:t}),e),...o})}function l2({className:e,...t}){return ji("div",{"data-slot":"item-content",className:F("flex min-w-0 flex-1 flex-col gap-0.5",e),...t})}function c2({className:e,...t}){return ji("div",{"data-slot":"item-title",className:F("flex min-w-0 items-baseline gap-2 type-label [&>*:first-child]:min-w-0 [&>*:first-child]:truncate",e),...t})}function lI({className:e,...t}){return ji("p",{"data-slot":"item-description",className:F("line-clamp-2 type-body-sm text-text-2 group-data-disabled/item:text-text-disabled",e),...t})}import{jsx as Ki,jsxs as Dk}from"react/jsx-runtime";var yr={idle:"Idle",queued:"Queued",running:"Running",ok:"Passed",warn:"Warning",fail:"Failed",waiting:"Waiting on you"};var cI=e=>e==="ok"||e==="warn"||e==="fail"||e==="waiting",Lk=Ye("inline-flex max-w-full min-w-0 items-baseline gap-1 data",{variants:{size:{default:"type-label",sm:"type-label-sm"},status:{idle:"text-text-2",queued:"text-text-2",running:"text-text-1",ok:"text-ok-text",warn:"text-warn-text",fail:"text-fail-text",waiting:"text-text-1"}},defaultVariants:{size:"default",status:"idle"}}),Nk={idle:null,queued:null,running:ln,ok:lf,warn:Gi,fail:C6,waiting:V6};function _t({status:e="idle",size:t="default",live:o,className:a,children:r,...n}){let s=r??yr[e];return Dk("span",{"data-slot":"status","data-status":e,"data-size":t,className:F(Lk({size:t,status:e}),a),...n,children:[Ki(u2,{status:e}),Ki("span",{"data-slot":"status-word","aria-hidden":o&&cI(e)?!0:void 0,className:"min-w-0 [overflow-wrap:anywhere]",children:s}),o&&Ki("span",{role:"status",className:"sr-only",children:cI(e)?typeof s=="string"?s:yr[e]:""})]})}function u2({status:e="idle",label:t,className:o,...a}){let r=Nk[e];return r?Ki("span",{"data-slot":"status-mark","data-status":e,role:t?"img":void 0,"aria-label":t,"aria-hidden":t?void 0:!0,className:F("flex h-lh shrink-0 items-center self-start",o),...a,children:Ki(Ce,{icon:r,size:12,weight:e==="running"?"regular":"bold",className:F(e==="running"&&"animate-spin motion-reduce:animate-none")})}):t?Ki("span",{"data-slot":"status-mark","data-status":e,className:"sr-only",children:t}):null}import*as Hr from"react";var Ea={};Jo(Ea,{Arrow:()=>PI,Handle:()=>Wc,Popup:()=>TI,Portal:()=>RI,Positioner:()=>SI,Provider:()=>zI,Root:()=>hI,Trigger:()=>vI,Viewport:()=>ZI,createHandle:()=>GI});import*as Xi from"react";import*as hf from"react";var d2=hf.createContext(void 0);function wr(e){let t=hf.useContext(d2);if(t===void 0&&!e)throw new Error(De(72));return t}import*as uI from"react";var Yi=class extends La{setState(t){}update(t){}set(t,o){}notifyAll(){}};var dI={...zi,disabled:e=>e.disabled,instantType:e=>e.instantType,isInstantPhase:e=>e.isInstantPhase,trackCursorAxis:e=>e.trackCursorAxis,disableHoverablePopup:e=>e.disableHoverablePopup,lastOpenChangeReason:e=>e.openChangeReason,closeOnClick:e=>e.closeOnClick,appliedTriggerProps:(e,t)=>t?e.activeTriggerProps:void 0,closeDelay:e=>e.closeDelay,adaptiveOrigin:e=>e.adaptiveOrigin},bf=class extends La{constructor(t,o,a){let r=new rn;super(pI(t,r,o,a),fI(r),dI)}setOpen=(t,o)=>{ox(this,t,o,{extraState:{openChangeReason:o.reason}})};cancelPendingOpen(t){this.state.floatingRootContext.dispatchOpenChange(!1,we(q.triggerPress,t))}};function mI(){let e=new rn,t=new Yi(Object.freeze(pI(void 0,e)),Object.freeze(fI(e)),dI);return Object.assign(t,{setOpen:Be,cancelPendingOpen:Be})}function pI(e,t,o,a=!1){return{...em(t,o,a),disabled:!1,instantType:void 0,isInstantPhase:!1,trackCursorAxis:"none",disableHoverablePopup:!1,openChangeReason:null,closeOnClick:!0,closeDelay:0,adaptiveOrigin:void 0,...e}}function fI(e){return{popupRef:uI.createRef(),onOpenChange:void 0,onOpenChangeComplete:void 0,triggerElements:e}}import{jsx as gI,jsxs as Fk}from"react/jsx-runtime";var hI=Kl(function(t){let{disabled:o=!1,defaultOpen:a=!1,open:r,disableHoverablePopup:n=!1,trackCursorAxis:s="none",actionsRef:l,onOpenChange:i,onOpenChangeComplete:c,handle:u,triggerId:d,defaultTriggerId:m=null,children:p}=t,f=tx((P,V)=>new bf({open:a,openProp:r,activeTriggerId:m,triggerIdProp:d},P,V));f.useControlledProp("openProp",r),f.useControlledProp("triggerIdProp",d),f.useContextCallback("onOpenChange",i),f.useContextCallback("onOpenChangeComplete",c);let v=f.useState("open"),g=!o&&v,b=f.useState("activeTriggerId"),w=f.useState("mounted"),y=f.useState("payload");f.useSyncedValues({trackCursorAxis:s,disableHoverablePopup:n,disabled:o}),Yd(f,{closeOnActiveTriggerUnmount:!0});let{forceUnmount:x,transitionStatus:h}=Xd(g,f),I=f.useState("isInstantPhase"),R=f.useState("instantType"),C=f.useState("lastOpenChangeReason"),S=Xi.useRef(null);_(()=>{v&&o&&f.setOpen(!1,we(q.disabled))},[v,o,f]),_(()=>{h==="ending"&&C===q.none||h!=="ending"&&I?(R!=="delay"&&(S.current=R),f.set("instantType","delay")):S.current!==null&&(f.set("instantType",S.current),S.current=null)},[h,I,C,R,f]),_(()=>{g&&b==null&&f.set("payload",void 0)},[f,b,g]),Xi.useImperativeHandle(l,()=>({unmount:x,close:()=>f.setOpen(!1,we(q.imperativeAction))}),[x,f]);let T=g||w||!o&&s!=="none";return Fk(d2.Provider,{value:f,children:[u&&gI(jd,{handle:u,store:f}),T&&gI(Ok,{store:f,disabled:o,trackCursorAxis:s}),typeof p=="function"?p({payload:y}):p]})});function Ok({store:e,disabled:t,trackCursorAxis:o}){let a=e.useState("floatingRootContext"),r=Ic(a,{enabled:!t,referencePress:()=>e.select("closeOnClick")}),n=dh(a,{enabled:!t&&o!=="none",axis:o==="none"?void 0:o}),s=Xi.useMemo(()=>rt(n.reference,r.reference),[n.reference,r.reference]);return Qd(e,{activeTriggerProps:s,inactiveTriggerProps:s,popupProps:r.floating??ze}),null}import*as wf from"react";function qe(e){return Da(e,"base-ui")}import*as yf from"react";var m2=yf.createContext(void 0);function bI(){return yf.useContext(m2)}var yI="data-base-ui-tooltip-trigger";function wI(e){let t=He(e);return Ge(t)?t:null}var vI=Ju(function(t,o){let{render:a,className:r,style:n,handle:s,payload:l,disabled:i,delay:c,closeOnClick:u=!0,closeDelay:d,id:m,...p}=t,f=wr(!0),g=tm(s)??f;if(!g)throw new Error(De(82));let b=qe(m),w=g.useState("isTriggerActive",b),y=g.useState("isOpenedByTrigger",b),x=g.useState("floatingRootContext"),h=wf.useRef(null),I=d??0,{registerTrigger:R,isMountedByThisTrigger:C}=Kd(b,h,g,{payload:l,closeOnClick:u,closeDelay:I}),S=bI(),{activeIdRef:T,delayRef:P,isInstantPhase:V,hasProvider:E}=rh(x,{open:y}),z=Ni(x);g.useSyncedValue("isInstantPhase",V);let M=g.useState("disabled"),O=i??M,H=ft(O),k=g.useState("trackCursorAxis"),N=g.useState("disableHoverablePopup"),L=wf.useRef(!1),U=Qe(),A=wf.useRef(void 0);function ee(){return E&&T.current!=null?0:c??S??600}function B(se){let pe=h.current;if(!pe||!se)return!1;let oe=Ya(se,`[${yI}]`);return oe!==null&&oe!==pe&&ue(pe,oe)}function Z(se){let pe=B(se);return L.current=pe,pe&&(z.openChangeTimeout.clear(),z.restTimeout.clear(),z.restTimeoutPending=!1,U.clear()),pe}let G=zs(x,{enabled:!O,mouseOnly:!0,move:!1,handleClose:!N&&k!=="both"?Ns():null,restMs:ee,delay(){return d==null&&E?{close:Dr(P.current,"close")}:{close:I}},triggerElementRef:h,isActiveTrigger:w,isClosing:()=>g.select("transitionStatus")==="ending",shouldOpen(){return!L.current}}),X=Sc(x,{enabled:!O}).reference,be=se=>{let pe=L.current,oe=wI(se),Se=Z(oe),ie=h.current,te=ie&&oe&&ue(ie,oe);if(Se&&g.select("open")&&g.select("lastOpenChangeReason")===q.triggerHover){g.setOpen(!1,we(q.triggerHover,se));return}if(pe&&!Se&&te&&!H.current&&!g.select("open")&&ie&&Xa(A.current)){let fe=()=>{!L.current&&!H.current&&!g.select("open")&&g.setOpen(!0,we(q.triggerHover,se,ie))},de=ee();de===0?(U.clear(),fe()):U.start(de,fe)}},K=g.useState("appliedTriggerProps",C||k!=="none");return ae("button",t,{state:{open:y},ref:[o,R,h],props:[G,X,K,{onMouseOver(se){be(se.nativeEvent)},onFocus(se){B(wI(se.nativeEvent))&&se.preventBaseUIHandler()},onMouseLeave(){L.current=!1,U.clear(),A.current=void 0},onPointerEnter(se){A.current=se.pointerType},onPointerDown(se){A.current=se.pointerType,g.set("closeOnClick",u),u&&!g.select("open")&&g.cancelPendingOpen(se.nativeEvent)},onClick(se){u&&!g.select("open")&&g.cancelPendingOpen(se.nativeEvent)},id:b,[nc]:O?"":void 0,[yI]:O?void 0:""},p],stateAttributesMapping:gd})});import*as CI from"react";import*as vf from"react";var p2=vf.createContext(void 0);function xI(){let e=vf.useContext(p2);if(e===void 0)throw new Error(De(70));return e}import{jsx as II}from"react/jsx-runtime";var RI=CI.forwardRef(function(t,o){let{keepMounted:a=!1,...r}=t;return wr().useState("mounted")||a?II(p2.Provider,{value:a,children:II(Zd,{ref:o,...r})}):null});import*as If from"react";import*as xf from"react";var f2=xf.createContext(void 0);function Qi(){let e=xf.useContext(f2);if(e===void 0)throw new Error(De(71));return e}import{jsx as Hk}from"react/jsx-runtime";var SI=If.forwardRef(function(t,o){let{render:a,className:r,anchor:n,positionMethod:s="absolute",side:l="top",align:i="center",sideOffset:c=0,alignOffset:u=0,collisionBoundary:d="clipping-ancestors",collisionPadding:m=5,arrowPadding:p=5,sticky:f=!1,disableAnchorTracking:v=!1,collisionAvoidance:g=Ei,style:b,...w}=t,y=wr(),x=xI(),h=y.useState("open"),I=y.useState("mounted"),R=y.useState("trackCursorAxis"),C=y.useState("disableHoverablePopup"),S=y.useState("floatingRootContext"),T=y.useState("instantType"),P=y.useState("transitionStatus"),V=y.useState("adaptiveOrigin"),E=Oi({anchor:n,positionMethod:s,floatingRootContext:S,mounted:I,side:l,sideOffset:c,align:i,alignOffset:u,collisionBoundary:d,collisionPadding:m,sticky:f,arrowPadding:p,disableAnchorTracking:v,keepMounted:x,collisionAvoidance:g,adaptiveOrigin:V}),z=If.useMemo(()=>({open:h,side:E.side,align:E.align,anchorHidden:E.anchorHidden,instant:R!=="none"?"tracking-cursor":T}),[h,E.side,E.align,E.anchorHidden,R,T]),M=Vi(t,z,{styles:E.positionerStyles,transitionStatus:P,props:w,refs:[o,y.useStateSetter("positionerElement")],hidden:!I,inert:!h||R==="both"||C});return Hk(f2.Provider,{value:E,children:M})});import*as EI from"react";var TI=EI.forwardRef(function(t,o){let{render:a,className:r,style:n,...s}=t,l=wr(),{side:i,align:c}=Qi(),u=l.useState("open"),d=l.useState("instantType"),m=l.useState("transitionStatus"),p=l.useState("popupProps"),f=l.useState("floatingRootContext"),v=l.useState("disabled"),g=l.useState("closeDelay");Oo({open:u,ref:l.context.popupRef,onComplete(){u&&l.context.onOpenChangeComplete?.(!0)}}),Ec(f,{enabled:!v,closeDelay:g});let b=l.useStateSetter("popupElement");return ae("div",t,{state:{open:u,side:i,align:c,instant:d,transitionStatus:m},ref:[o,l.context.popupRef,b],props:[qd,p,Hi(m),s],stateAttributesMapping:Ci})});import*as MI from"react";var PI=MI.forwardRef(function(t,o){let{render:a,className:r,style:n,...s}=t,l=wr(),{arrowRef:i,side:c,align:u,arrowUncentered:d,arrowStyles:m}=Qi(),p=l.useState("open"),f=l.useState("instantType");return ae("div",t,{state:{open:p,side:c,align:u,uncentered:d,instant:f},ref:[o,i],props:[{style:m,"aria-hidden":!0},s],stateAttributesMapping:Ms})});import*as AI from"react";import{jsx as kI}from"react/jsx-runtime";var zI=function(t){let{delay:o,closeDelay:a,timeout:r=400}=t,n=AI.useMemo(()=>({open:o,close:a}),[o,a]);return kI(m2.Provider,{value:o,children:kI(ah,{delay:n,timeoutMs:r,children:t.children})})};import*as _I from"react";import*as aa from"react";import*as LI from"react";function NI(e){let[t,o]=LI.useState({current:e,previous:null});return Object.is(e,t.current)||o({current:e,previous:t.current}),t.previous}import*as Sf from"react";function g2(e){let t=Go(e),o=parseFloat(t.width)||0,a=parseFloat(t.height)||0,r=Fe(e),n=r?e.offsetWidth:o,s=r?e.offsetHeight:a;return(jn(o)!==n||jn(a)!==s)&&(o=n,a=s),{width:o,height:a}}var Uc="--popup-width",$c="--popup-height";function OI(e){let{popupElement:t,positionerElement:o,content:a,mounted:r,onMeasureLayout:n,onMeasureLayoutComplete:s,side:l,direction:i}=e,c=gr(t,!0),u=Ka(),d=Sf.useRef(null),m=$(n),p=$(s),f=Sf.useMemo(()=>Vk(l,i),[l,i]);_(()=>{if(!r){d.current=null;return}if(!t||!o)return;let v=FI(t,f);h2(t,"auto");let g=Rf(t,"position","static"),b=Rf(t,"transform","none"),w=Rf(t,"scale","1"),y=FI(o,{[pm]:"max-content",[fm]:"max-content"});function x(){g(),b(),y(),w()}if(m?.(),d.current===null){Cf(o,"max-content");let C=g2(t);return d.current=C,Cf(o,C),x(),p?.(null,C),v}Cf(o,"max-content");let h=d.current,I=g2(t);d.current=I,h2(t,h),x(),p?.(h,I),Cf(o,I);let R=new AbortController;return u.request(()=>{h2(t,I),c(()=>{t.style.setProperty(Uc,"auto"),t.style.setProperty($c,"auto")},R.signal)}),()=>{R.abort(),u.cancel(),v()}},[a,t,o,c,u,r,m,p,f])}function Vk(e,t){let o=e==="top",a=e==="left"||e===(t==="rtl"?"inline-end":"inline-start");return!o&&!a?ze:{position:"absolute",[o?"bottom":"top"]:"0",[a?"right":"left"]:"0"}}function Rf(e,t,o){let a=e.style.getPropertyValue(t);return e.style.setProperty(t,o),()=>{e.style.setProperty(t,a)}}function FI(e,t){let o=[];for(let[a,r]of Object.entries(t))o.push(Rf(e,a,r));return o.length?()=>{o.forEach(a=>a())}:Be}function h2(e,t){let o=t==="auto"?"auto":`${t.width}px`,a=t==="auto"?"auto":`${t.height}px`;e.style.setProperty(Uc,o),e.style.setProperty($c,a)}function Cf(e,t){let o=t==="max-content"?"max-content":`${t.width}px`,a=t==="max-content"?"max-content":`${t.height}px`;e.style.setProperty(Ox,o),e.style.setProperty(Hx,a)}var HI={name:"adaptiveOrigin",async fn(e){let{x:t,y:o,rects:{floating:a},elements:{floating:r},platform:n,strategy:s,placement:l}=e,i=Ke(r),c=i.getComputedStyle(r);if(!(c.transitionDuration!=="0s"&&c.transitionDuration!==""))return{x:t,y:o,data:Fi};let d=await n.getOffsetParent?.(r),m={width:0,height:0};if(s==="fixed"&&i?.visualViewport)m={width:i.visualViewport.width,height:i.visualViewport.height};else if(d===i){let w=Ie(r);m={width:w.documentElement.clientWidth,height:w.documentElement.clientHeight}}else await n.isElement?.(d)&&(m=await n.getDimensions(d));let p=ea(l),f=t,v=o;p==="left"&&(f=m.width-(t+a.width)),p==="top"&&(v=m.height-(o+a.height));let g=p==="left"?"right":Fi.sideX,b=p==="top"?"bottom":Fi.sideY;return{x:f,y:v,data:{sideX:g,sideY:b}}}};var VI="data-activation-direction";import{jsx as b2,jsxs as _k}from"react/jsx-runtime";var Ef={activationDirection:e=>e?{[VI]:e}:null};function Tf(e){let{store:t,side:o,children:a}=e,r=Ko(),n=t.useState("activeTriggerElement"),s=t.useState("activeTriggerId"),l=t.useState("open"),i=t.useState("payload"),c=t.useState("mounted"),u=t.useState("popupElement"),d=t.useState("positionerElement"),m=NI(l?n:null),p=Uk(s,i),f=aa.useRef(null),[v,g]=aa.useState(null),[b,w]=aa.useState(null),y=aa.useRef(null),x=aa.useRef(null),h=gr(y,!0),I=Ka(),R=aa.useRef(null),[C,S]=aa.useState(null),[T,P]=aa.useState(!1);_(()=>(t.set("adaptiveOrigin",HI),()=>{t.set("adaptiveOrigin",void 0)}),[t]);let V=$(()=>{y.current?.style.setProperty("animation","none"),y.current?.style.setProperty("transition","none"),x.current?.style.setProperty("display","none")}),E=$(N=>{y.current?.style.removeProperty("animation"),y.current?.style.removeProperty("transition"),x.current?.style.removeProperty("display"),N&&S(N)}),z=$(()=>{R.current?.abort();let N=new AbortController;R.current=N,h(()=>{g(null),S(null),f.current=null},N.signal)}),M=aa.useRef(null);_(()=>{(!l||!c)&&(M.current=null)},[l,c]),_(()=>{if(l&&n&&m&&n!==m&&M.current!==n&&f.current){g(f.current),P(!0);let N=Gk(m,n);w(N),M.current=n}},[l,n,m]),_(()=>{v!=null&&(R.current?.abort(),P(!0),I.request(()=>{xa(()=>{P(!1)}),z()}))},[p,v,z,I]),_(()=>{let N=y.current;if(!N)return;let L=Ie(N).createElement("div");for(let U of Array.from(N.childNodes))L.appendChild(U.cloneNode(!0));f.current=L});let O=v!=null,H;O?H=_k(aa.Fragment,{children:[b2("div",{"data-previous":!0,inert:Si(!0),ref:x,style:{...C?{[Uc]:`${C.width}px`,[$c]:`${C.height}px`}:null,position:"absolute"},"data-ending-style":T?void 0:""},"previous"),b2("div",{"data-current":!0,ref:y,"data-starting-style":T?"":void 0,children:a},p)]}):H=b2("div",{"data-current":!0,ref:y,children:a},p),_(()=>{let N=x.current;!N||!v||N.replaceChildren(...Array.from(v.childNodes))},[v]),OI({popupElement:u,positionerElement:d,mounted:c,content:i,onMeasureLayout:V,onMeasureLayoutComplete:E,side:o,direction:r});let k={activationDirection:Zk(b),transitioning:O};return{children:H,state:k}}function Zk(e){if(e)return`${BI(e.horizontal,5,"right","left")} ${BI(e.vertical,5,"down","up")}`}function BI(e,t,o,a){return e>t?o:e<-t?a:""}function Gk(e,t){let o=e.getBoundingClientRect(),a=t.getBoundingClientRect(),r={x:o.left+o.width/2,y:o.top+o.height/2},n={x:a.left+a.width/2,y:a.top+a.height/2};return{horizontal:n.x-r.x,vertical:n.y-r.y}}function Uk(e,t){let[o,a]=aa.useState(0),r=aa.useRef(e),n=aa.useRef(t),s=aa.useRef(!1);return _(()=>{let l=r.current,i=n.current,c=e!==l,u=t!==i;c?(a(d=>d+1),s.current=!u):s.current&&u&&(a(d=>d+1),s.current=!1),r.current=e,n.current=t},[e,t]),`${e??"current"}-${o}`}var ZI=_I.forwardRef(function(t,o){let{render:a,className:r,style:n,children:s,...l}=t,i=wr(),c=Qi(),u=i.useState("instantType"),{children:d,state:m}=Tf({store:i,side:c.side,children:s}),p={activationDirection:m.activationDirection,transitioning:m.transitioning,instant:u};return ae("div",t,{state:p,ref:o,props:[l,{children:d}],stateAttributesMapping:Ef})});var Wc=class extends ki{constructor(){super(mI(),"Tooltip")}open(t){this.openByTrigger(t)}close(){this.closePopup()}get isOpen(){return this.attachedStore?.select("open")??!1}};function GI(){return new Wc}import{isValidElement as $k}from"react";var Wk=Symbol.for("react.lazy");function qk(e){let t=e;if(!t||typeof t!="object"||t.$$typeof!==Wk||!t._init)return e;try{return t._init(t._payload)}catch{return null}}function y2(e,t){return $k(e)&&(e.type===t||qk(e.type)===t)}import{jsx as cn,jsxs as Kk}from"react/jsx-runtime";function un({delay:e=500,closeDelay:t=0,...o}){return cn(Ea.Provider,{"data-slot":"tooltip-provider",delay:e,closeDelay:t,...o})}var UI=Hr.createContext(null);function or({children:e,...t}){let o=null;return Hr.Children.forEach(e,a=>{y2(a,Va)&&(o=$I(a.props.children,!1).text||null)}),cn(UI.Provider,{value:o,children:cn(Ea.Root,{"data-slot":"tooltip",...t,children:e})})}function w2(e){let t="";return Hr.Children.forEach(e,o=>{typeof o=="string"||typeof o=="number"?t+=o:Hr.isValidElement(o)&&!o.props["aria-hidden"]&&(t+=w2(o.props.children))}),t.trim()}var jk="[&>:disabled]:pointer-events-none [&>[data-disabled]]:pointer-events-none";function ar({className:e,render:t,children:o,...a}){let r=Hr.useContext(UI),n=Hr.isValidElement(t)?t:null,l=!(a["aria-label"]||a["aria-labelledby"]||n?.props["aria-label"]||n?.props["aria-labelledby"]||w2(o)||w2(n?.props.children))&&r?{"aria-label":r,"data-tooltip-named":""}:void 0;return cn(Ea.Trigger,{"data-slot":"tooltip-trigger",render:t,className:Et(jk,e),...l,...a,children:o})}function $I(e,t=!0){let o="",a=null;for(let r of Hr.Children.toArray(e))typeof r=="string"||typeof r=="number"?o+=r:y2(r,WI)&&(a=r);return{text:o.trim(),shortcut:a}}var qc=F("inline-flex min-h-6 w-fit max-w-(--tooltip-max) items-center gap-2 rounded-tag bg-ink px-2 py-1 type-label-sm text-text-inverse break-words","has-data-[slot=tooltip-shortcut]:pe-1","forced-colors:outline-solid forced-colors:outline-1 forced-colors:outline-[CanvasText]"),v2="overlay-motion data-instant:duration-0 data-instant:data-ending-style:duration-0";function Va({className:e,side:t="top",sideOffset:o=6,align:a="center",alignOffset:r=0,collisionPadding:n=8,children:s,shortcut:l,...i}){let c=er(),{text:u,shortcut:d}=$I(s);return!u&&!l?.length&&!d?null:cn(Ea.Portal,{container:c,children:cn(Ea.Positioner,{align:a,alignOffset:r,side:t,sideOffset:o,collisionPadding:n,className:"isolate z-(--z-overlay)",children:Kk(Ea.Popup,{"data-slot":"tooltip-content",className:Et([qc,v2],e),...i,children:[cn("span",{className:"min-w-0",children:u}),l?cn(WI,{keys:l}):d]})})})}function WI({keys:e,className:t,...o}){return cn("kbd",{"data-slot":"tooltip-shortcut",className:F("inline-flex shrink-0 items-center gap-0.5",t),...o,children:e.map((a,r)=>cn("kbd",{className:"inline-flex h-4 min-w-4 items-center justify-center rounded-tag bg-text-inverse/15 px-1 type-code-xs text-text-inverse",children:a},r))})}import{jsx as xt,jsxs as dn}from"react/jsx-runtime";function Qk(e){let t=e?.next_run_at||e?.next_run||e?.nextRunAt;if(!t)return"";let o=typeof t=="number"?t<1e12?t*1e3:t:Date.parse(String(t));return Number.isFinite(o)?new Date(o).toLocaleString("fr-FR",{weekday:"short",hour:"2-digit",minute:"2-digit"}):""}function x2(e){return String(e?.name||"Routine").replace(/^\[bot:[^\]]+\]\s*/i,"")}function qI(e){return e?.enabled!==!1&&e?.state!=="paused"}function jI({label:e,onClick:t,children:o}){return xt("div",{role:"button",tabIndex:0,"aria-label":e,onClick:t,onKeyDown:a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),t())},className:"rounded-tag focus-visible:focus-ring-row hover:bg-hover",children:xt(gf,{size:"sm",className:"gap-2 px-2",children:o})})}function I2({ctx:e}){let t=Ht(Le,i=>i.routines),o=Ht(Le,i=>i.files),a=Ht(Le,i=>i.bot),[r,n]=Xk("");Yk(()=>{if(!a)return;pf();let i=e?.setInterval?e.setInterval(()=>void pf(),6e4):null;return()=>{typeof i=="function"&&i()}},[a,e]);let s=i=>{try{e?.runAction?.(i)}catch{}},l=async i=>{let c=!1;try{c=await e?.os?.revealPath?.(i)}catch{c=!1}if(!c)try{await e?.os?.writeClipboard?.(i),n(i),jh("Chemin copié",{description:i})}catch{jh.fail("Chemin illisible",{description:i})}};return dn("aside",{"aria-label":"Routines et fichiers","data-enter":"aside",className:"flex h-full min-h-0 min-w-0 flex-col gap-4 overflow-y-auto px-3 py-2",children:[dn("section",{className:"flex flex-col gap-1",children:[dn("div",{className:"flex items-center justify-between gap-2",children:[xt("h2",{className:"type-caption text-text-2",children:"Routines"}),xt(un,{children:dn(or,{children:[xt(ar,{render:xt($e,{variant:"ghost",size:"icon-sm","aria-label":"Créer une routine",onClick:()=>s("nav.cron")}),children:xt(Ce,{icon:Hs,size:12})}),xt(Va,{children:"Créer une routine"})]})})]}),t.length?xt(s2,{variant:"plain","aria-label":"Routines du bot",children:t.slice(0,12).map(i=>dn(jI,{label:`Ouvrir la routine ${x2(i)}`,onClick:()=>s("nav.cron"),children:[xt(i2,{children:xt(_t,{status:qI(i)?"ok":"idle",size:"sm",children:qI(i)?"Active":"En pause"})}),xt(l2,{children:xt(c2,{children:xt("span",{children:x2(i)})})}),xt("span",{className:"ms-auto shrink-0 type-caption text-text-3",children:Qk(i)})]},i.id||i.job_id||x2(i)))}):dn(t2,{variant:"plain",size:"sm",children:[dn(o2,{children:[xt(a2,{children:"Aucune routine"}),xt(r2,{children:"Ce bot n'a rien de planifié."})]}),xt(n2,{children:xt($e,{size:"sm",variant:"secondary",onClick:()=>s("nav.cron"),children:"Nouvelle routine"})})]})]}),dn("section",{className:"flex flex-col gap-1",children:[xt("h2",{className:"type-caption text-text-2",children:"Fichiers"}),o.length?xt(s2,{variant:"plain","aria-label":"Fichiers de la conversation",children:o.slice(0,30).map(i=>{let c=String(i.path||"").split("/"),u=c.pop()||i.path;return dn(jI,{label:`Ouvrir ${i.path}`,onClick:()=>void l(i.path),children:[xt(i2,{variant:"icon",children:xt(Ce,{icon:af,size:14})}),dn(l2,{children:[xt(c2,{children:xt("span",{children:u})}),xt(lI,{children:c.join("/")||"/"})]})]},i.path)})}):xt("p",{className:"px-1 py-2 type-caption text-text-3",children:"Les fichiers créés ou modifiés dans cette conversation s'affichent ici."}),r?xt("span",{role:"status",className:"px-1 type-caption text-text-3",children:"Chemin copié"}):null]})]})}import{useRef as BN}from"react";import{createContext as ez,memo as tz,useCallback as il,useContext as B4,useEffect as Jc,useLayoutEffect as _4,useMemo as $2,useRef as pn,useState as ll}from"react";import{Fragment as tA,jsx as eA,jsxs as KI}from"react/jsx-runtime";var Jk=Ye(["inline-flex w-fit max-w-full shrink-0 items-center justify-center gap-1 overflow-hidden rounded-tag whitespace-nowrap data","[&>svg]:pointer-events-none [&>svg]:size-(--icon-sm) [&>svg]:shrink-0","forced-colors:border forced-colors:border-[CanvasText]"],{variants:{variant:{neutral:"bg-field text-text-1",outline:"border border-line-control text-text-1",ok:"bg-ok-tint text-ok-text",warn:"bg-warn-tint text-warn-text",fail:"bg-fail-tint text-fail-text"},size:{default:"min-h-5 px-1.5 type-label-sm",sm:"min-h-4 px-1 type-label-sm"}},defaultVariants:{variant:"neutral",size:"default"}});function Ji({className:e,variant:t="neutral",size:o="default",count:a,max:r=99,render:n,children:s,...l}){let i=a!==void 0&&a>r,c=a?.toLocaleString("en-US"),u=a===void 0?s:i?KI(tA,{children:[KI("span",{"aria-hidden":!0,children:[r,"+"]}),eA("span",{className:"sr-only",children:c})]}):c;return Or({defaultTagName:"span",props:rt({className:F(Jk({variant:t,size:o}),e),children:u},{"data-slot":"badge","data-variant":t,"data-size":o,title:i?c:void 0},l),render:n,state:{slot:"badge",variant:t}})}var _a={};Jo(_a,{Panel:()=>d4,Root:()=>a4,Trigger:()=>n4});import*as Kc from"react";import*as Mf from"react";import*as Zs from"react";function Ba({controlled:e,default:t,name:o,state:a="value"}){let{current:r}=Zs.useRef(e!==void 0),[n,s]=Zs.useState(()=>t),l=r&&e!==void 0?e:n,i=Zs.useCallback(c=>{r||s(c)},[]);return[l,i]}function YI(e){let{open:t,defaultOpen:o=!1,onOpenChange:a,disabled:r}=e,[n,s]=Ba({controlled:t,default:o,name:"Collapsible",state:"open"}),{mounted:l,setMounted:i,transitionStatus:c}=da(n,!0,!0),u=qe(),[d,m]=Mf.useState(),p=d===null?void 0:d??u,f=$(v=>{let g=!n,b=we(q.triggerPress,v.nativeEvent);a(g,b),!b.isCanceled&&s(g)});return Mf.useMemo(()=>({defaultPanelId:u,disabled:r,handleTrigger:f,mounted:l,open:n,panelId:p,setMounted:i,setOpen:s,setPanelIdState:m,transitionStatus:c}),[u,r,f,l,n,p,i,s,m,c])}import*as Pf from"react";var C2=Pf.createContext(void 0);function kf(){let e=Pf.useContext(C2);if(e===void 0)throw new Error(De(15));return e}var XI="data-open",QI="data-closed",jc=Sn.startingStyle,hoe=Sn.endingStyle;var JI="data-panel-open";var oA={[XI]:""},aA={[QI]:""},t4={open(e){return e?{[JI]:""}:null}},o4={open(e){return e?oA:aA}};var Af={...o4,...la};import{jsx as rA}from"react/jsx-runtime";var a4=Kc.forwardRef(function(t,o){let{render:a,className:r,defaultOpen:n=!1,disabled:s=!1,onOpenChange:l,open:i,style:c,...u}=t,d=$(l),m=YI({open:i,defaultOpen:n,onOpenChange:d,disabled:s}),p=Kc.useMemo(()=>({open:m.open,disabled:m.disabled,transitionStatus:m.transitionStatus}),[m.open,m.disabled,m.transitionStatus]),f=Kc.useMemo(()=>({...m,onOpenChange:d,state:p}),[m,d,p]),v=ae("div",t,{state:p,ref:o,props:u,stateAttributesMapping:Af});return rA(C2.Provider,{value:f,children:v})});import*as r4 from"react";var nA={...t4,...la},n4=r4.forwardRef(function(t,o){let{panelId:a,open:r,handleTrigger:n,state:s,disabled:l}=kf(),{className:i,disabled:c=l,render:u,nativeButton:d=!0,style:m,...p}=t,{getButtonProps:f,buttonRef:v}=Ut({disabled:c,native:d});return ae("button",t,{state:s,ref:[o,v],props:[{"aria-controls":r?a:void 0,"aria-expanded":r,onClick:n},p,f],stateAttributesMapping:nA})});import*as S2 from"react";import*as Ta from"react";var el={height:void 0,width:void 0};function i4(e){let{externalRef:t,hiddenUntilFound:o,id:a,keepMounted:r,mounted:n,onOpenChange:s,open:l,setMounted:i,setOpen:c,transitionStatus:u}=e,d=Ta.useRef(null),m=Ta.useRef(null),[p,f]=Ta.useState(el),v=Ta.useRef(el),g=Ta.useRef(!1),b=Ta.useRef(l),w=Ta.useRef(!1),[y,x]=Ta.useState(!1),h=Ta.useRef(null),I=Bt(t,d),R=ft(l),C=gr(d),S=!l&&!n,T=y?"idle":u,P=l&&(b.current||w.current),V=!l&&n&&m.current==="css-animation"&&p.height===void 0&&p.width===void 0?v.current:p,E=o&&S&&m.current!=="css-animation",z=$((N,L=!0)=>{L&&(v.current=N),f(N)}),M=$(()=>{h.current?.(),h.current=null}),O=$(N=>{M(),h.current=()=>{h.current=null,N()}}),H=$(()=>{l&&n&&m.current==="css-animation"&&(w.current=!0)});_(()=>{!y||u==="starting"||x(!1)},[y,u]),Ta.useEffect(()=>()=>{H(),M()},[H,M]),_(()=>{l||(b.current=!1,w.current=!1);let N=d.current;if(!N)return;!l&&h.current&&M();let L=sA(N,P);if(m.current=L,l&&u==="idle"&&b.current&&L==="css-animation"){v.current=tl(N);return}if(l&&u==="starting"){let ee=g.current;if(g.current=!1,L==="none"){z(tl(N)),x(!0);return}if(L==="css-transition"){let G=iA(N);if(z(tl(N)),!ee)return G;let X=zf(N,"transition-duration","0s");return O(X),x(!0),G}z(tl(N));let B=zf(N,"animation-name","none");if(!ee){B();return}let Z=zf(N,"animation-duration","0s");B(),O(Z),x(!0);return}if(!l&&n&&(u==="idle"||u==="starting")){if(L==="none"){z(el,!1),i(!1);return}z(tl(N));return}if(u!=="ending")return;if(L==="none"){i(!1);return}let U=tl(N);if(!(U.height>0||U.width>0)){i(!1);return}z(U),L==="css-animation"&&zf(N,"animation-name","none")()},[n,l,M,z,i,O,P,u]),Oo({enabled:l&&n&&T==="idle",open:!0,ref:d,onComplete(){l&&z(el,!1)}}),Ta.useEffect(()=>{if(l||!n||T!=="ending")return;if(!d.current){i(!1),z(el,!1);return}let L=new AbortController,U=-1;function A(){R.current||(i(!1),z(el,!1))}return U=Uo.request(()=>{C(A,L.signal)}),()=>{Uo.cancel(U),L.abort()}},[R,n,l,T,C,z,i]),_(()=>{let N=d.current;!N||!o||!S||N.setAttribute("hidden","until-found")},[S,o]),Ta.useEffect(function(){let L=d.current;if(!L)return;let U=Fo.create(),A=-1,ee=(G,X)=>{U.start(0,()=>{R.current||(A=Uo.request(()=>{R.current||(G&&(g.current=!1),X&&L.setAttribute(jc,""),L.setAttribute("hidden","until-found"))}))})},Z=Ae(L,"beforematch",G=>{let X=we(q.none,G);if(s(!0,X),X.isCanceled){ee(!1,!1);return}g.current=!0;let be=L.hasAttribute(jc);L.removeAttribute(jc),c(!0),ee(!0,be)});return()=>{U.clear(),Uo.cancel(A),Z()}},[R,s,c]);let k=r||o||n||l;return{height:V.height,props:{...E?{[jc]:""}:void 0,hidden:S,id:a},ref:I,shouldPreventOpenAnimation:P,shouldRender:k,transitionStatus:T,width:V.width}}function tl(e){return{height:e.scrollHeight,width:e.scrollWidth}}function sA(e,t){let o=Ke(e).getComputedStyle(e),a=(o.animationName.split(",").map(n=>n.trim()).some(n=>n!==""&&n!=="none")||t)&&s4(o.animationDuration),r=s4(o.transitionDuration);return a&&r||r?"css-transition":a?"css-animation":"none"}function s4(e){return e.split(",").map(t=>t.trim()).some(t=>t!==""&&Number.parseFloat(t)>0)}function zf(e,t,o){let a=e.style.getPropertyValue(t),r=e.style.getPropertyPriority(t);return e.style.setProperty(t,o),()=>{if(a===""){e.style.removeProperty(t);return}e.style.setProperty(t,a,r)}}function iA(e){let t={"justify-content":e.style.justifyContent,"align-items":e.style.alignItems,"align-content":e.style.alignContent,"justify-items":e.style.justifyItems};Object.keys(t).forEach(r=>{e.style.setProperty(r,"initial","important")});function o(){Object.entries(t).forEach(([r,n])=>{if(n===""){e.style.removeProperty(r);return}e.style.setProperty(r,n)})}let a=Uo.request(o);return()=>{Uo.cancel(a),o()}}var l4="--collapsible-panel-height",c4="--collapsible-panel-width";var d4=S2.forwardRef(function(t,o){let{className:a,hiddenUntilFound:r,keepMounted:n,render:s,id:l,style:i,...c}=t,{defaultPanelId:u,mounted:d,onOpenChange:m,open:p,setMounted:f,setPanelIdState:v,setOpen:g,state:b,transitionStatus:w}=kf(),y=r??!1,x=n??!1,h=l||void 0,I=h??u;_(()=>(v(H=>h??(H===null?void 0:H)),()=>{v(H=>H===h?null:H)}),[h,v]);let{height:R,props:C,ref:S,shouldPreventOpenAnimation:T,shouldRender:P,transitionStatus:V,width:E}=i4({externalRef:o,hiddenUntilFound:y,id:I,keepMounted:x,mounted:d,onOpenChange:m,open:p,setMounted:f,setOpen:g,transitionStatus:w}),z={...b,transitionStatus:V},M=Ed(i,z),O=ae("div",{...t,style:void 0},{state:z,ref:S,props:[C,{style:{[l4]:R===void 0?"auto":`${R}px`,[c4]:E===void 0?"auto":`${E}px`}},c,M?{style:M}:void 0,T?{style:{animationName:"none"}}:void 0],stateAttributesMapping:Af});return P?O:null});import{useCallback as EA,useEffect as _2,useId as TA,useMemo as MA,useReducer as PA,useRef as D2,useState as Z2}from"react";import{Children as uA,isValidElement as dA}from"react";import{jsx as cA}from"react/jsx-runtime";var lA=Ye("panel relative flex min-w-0 flex-col text-text-1 forced-colors:border-[CanvasText]",{variants:{padding:{default:"p-3",none:"p-0"}},defaultVariants:{padding:"default"}});function m4({className:e,padding:t="default",...o}){return cA("div",{"data-slot":"panel","data-padding":t,className:F(lA({padding:t}),e),...o})}import{jsx as Us,jsxs as mA}from"react/jsx-runtime";function E2(e,t){return dA(e)&&e.type===t}function Lf({className:e,children:t,...o}){let a=uA.toArray(t),r=a.filter(l=>E2(l,Gs)),n=a.filter(l=>!E2(l,Gs)),s=n.some(l=>E2(l,m4));return mA("div",{"data-slot":"card","data-footer":r.length?"":void 0,className:F("group/card shell relative text-text-1","[&>[data-slot=panel]~[data-slot=panel]]:mt-(--shell-inset)","has-[[data-slot=card-link]:focus-visible]:focus-ring","forced-colors:border-[CanvasText]",e),...o,children:[s?n:Us("div",{"data-slot":"card-panel",className:"panel flex min-w-0 flex-col forced-colors:border-[CanvasText]",children:n}),r]})}function Nf({className:e,...t}){return Us("div",{"data-slot":"card-header",className:F("grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1 p-3 [&+[data-slot=card-content]:not([data-flush])]:pt-0",e),...t})}function Df({className:e,...t}){return Us("div",{"data-slot":"card-title",className:F("col-start-1 min-w-0 type-label text-text-1 [overflow-wrap:anywhere]",e),...t})}function p4({className:e,...t}){return Us("div",{"data-slot":"card-description",className:F("col-start-1 min-w-0 max-w-(--measure-hint) type-body-sm text-text-2",e),...t})}function Ff({className:e,flush:t,...o}){return Us("div",{"data-slot":"card-content","data-flush":t||void 0,className:F("flex min-w-0 flex-col gap-3 type-body-sm text-text-1",t?"gap-0 not-first:border-t not-first:border-line-faint":"p-3",e),...o})}function Gs({className:e,...t}){return Us("div",{"data-slot":"card-footer",className:F("shell-foot relative z-(--z-raised) justify-end [&>[data-slot=card-meta]:first-child]:me-auto [&>[data-slot=card-meta]:last-child]:pe-3",e),...t})}function f4({className:e,...t}){return Us("span",{"data-slot":"card-meta",className:F("min-w-0 truncate type-caption text-text-2",e),...t})}import{useEffect as M2,useRef as g4,useState as P2}from"react";import{jsx as Yo,jsxs as T2}from"react/jsx-runtime";function Of(e){let t=Number.isFinite(e)?Math.max(0,e):0;if(Math.round(t)<1e3)return`${Math.round(t)}ms`;let o=Math.round(t/100);if(o<600)return`${(o/10).toFixed(1)}s`;let a=l=>String(l).padStart(2,"0"),r=Math.round(t/1e3);if(r<3600)return`${Math.floor(r/60)}m ${a(r%60)}s`;let n=Math.round(t/6e4);if(n<1440)return`${Math.floor(n/60)}h ${a(n%60)}m`;let s=Math.round(t/36e5);return`${Math.floor(s/24)}d ${a(s%24)}h`}function ol(e){return Number.isFinite(e)?e.toLocaleString("en-US"):"0"}function k2({active:e=!0,className:t,render:o,children:a,...r}){return Or({defaultTagName:"span",props:rt({className:F(t),children:a},{"data-slot":"activity-text","data-active":e||void 0},r),render:o,state:{slot:"activity-text",active:e}})}function $s({className:e}){return Yo("span",{"aria-hidden":!0,"data-slot":"activity-arc",className:F("flex size-4 shrink-0 items-center justify-center",e),children:Yo(Ce,{icon:ln,size:12,className:"animate-spin motion-reduce:animate-none"})})}var pA={running:"ran",reading:"read",writing:"wrote",finding:"found",building:"built",sending:"sent",getting:"got",making:"made",thinking:"thought",setting:"set",putting:"put",cutting:"cut",taking:"took",giving:"gave",seeing:"saw",choosing:"chose",bringing:"brought",keeping:"kept",leaving:"left",holding:"held",drawing:"drew",spending:"spent",splitting:"split",telling:"told",understanding:"understood",rewriting:"rewrote",rerunning:"reran",rebuilding:"rebuilt",resetting:"reset",doing:"did",going:"went",paying:"paid",saying:"said",meeting:"met",feeding:"fed",winning:"won",gathering:"gathered"},fA=e=>!!e&&"aeiou".includes(e);function A2(e){let[t,...o]=e.split(" "),a=t.toLowerCase();if(!a.endsWith("ing")||a.length<5)return e;let r=a.slice(0,-3),n=pA[a]??(r.endsWith("y")&&!fA(r.at(-2))?`${r.slice(0,-1)}ied`:`${r}ed`);return[t[0]===t[0].toUpperCase()?n[0].toUpperCase()+n.slice(1):n,...o].join(" ")}function h4(e,t=[]){let o=e.filter(Boolean).join(", ");return[o?o[0].toUpperCase()+o.slice(1):"",...t.filter(Boolean)].filter(Boolean).join(", ")}var gA=1e3;function hA(e,t,o){let[a,r]=P2(e),n=g4(0);return M2(()=>{if(e===a)return;if(!t){r(e),n.current=Date.now();return}let s=Math.max(0,o-(Date.now()-n.current)),l=setTimeout(()=>{r(e),n.current=Date.now()},s);return()=>clearTimeout(l)},[e,a,t,o]),a}function bA(e,t){let[o,a]=P2(e);return M2(()=>{if(e){a(!0);return}let r=setTimeout(()=>a(!1),t);return()=>clearTimeout(r)},[e,t]),e||o}function yA(e,t=150,o=400){let[a,r]=P2(!1),n=g4(0);return M2(()=>{if(e&&!a){let s=setTimeout(()=>{n.current=Date.now(),r(!0)},t);return()=>clearTimeout(s)}if(!e&&a){let s=setTimeout(()=>r(!1),Math.max(0,o-(Date.now()-n.current)));return()=>clearTimeout(s)}},[e,a,t,o]),a}var wA={thinking:"Thinking",stopped:"Stopped",warnEnd:"with a warning",failEnd:"failed",stoppedEnd:"stopped"},vA=Ye("relative flex w-fit max-w-full min-w-0 items-center text-start text-text-1",{variants:{size:{default:"gap-1.5 type-label",sm:"gap-1 type-body-sm"}},defaultVariants:{size:"default"}});function b4({label:e,active:t=!1,waiting:o=!1,doneLabel:a,status:r="ok",size:n="default",minDisplay:s=gA,settle:l=400,delay:i=150,minLoader:c=400,announce:u=!0,labels:d,className:m,...p}){let f={...wA,...d},v=yA(o,i,c),g=bA(t,l),b=hA(e??"",g,s),w=v?"waiting":g?"active":o||!e&&!a?"idle":"done",y=w==="waiting"?e??f.thinking:w==="active"?b:w==="idle"?"":a??(r==="stopped"?f.stopped:A2(b)),x={ok:"",warn:f.warnEnd,fail:f.failEnd,stopped:f.stoppedEnd}[r],h=x&&!y.toLowerCase().includes(x.toLowerCase().replace(/^with a /,""))?`, ${x}`:"",I=w==="done"?`${y}${h}`:w==="waiting"?y:"",R=w==="active"||w==="waiting",C=w==="done"&&(r==="warn"||r==="fail");return T2("span",{"data-slot":"activity","data-state":w,"data-size":n,"aria-busy":R||void 0,className:F(vA({size:n}),m),...p,children:[R&&Yo($s,{className:"text-text-2"}),Yo(k2,{active:R,className:F("min-w-0 truncate",w==="done"&&"text-text-2"),children:y}),C&&Yo(_t,{status:r,size:n==="sm"?"sm":"default",className:"shrink-0","aria-hidden":!0}),u&&Yo("span",{role:"status",className:"sr-only",children:I})]})}function y4({state:e,className:t}){return e==="running"?Yo($s,{className:F("text-text-2",t)}):Yo("span",{"aria-hidden":!0,"data-slot":"step-glyph","data-state":e,className:F("flex size-4 shrink-0 items-center justify-center",t),children:e==="done"?Yo(Ce,{icon:Vs,size:12,className:"text-text-3"}):e==="fail"?Yo(Ce,{icon:tr,size:12,className:"text-fail-text"}):Yo(Ce,{icon:F6,size:12,className:"text-text-3"})})}function Yc({open:e,end:t=!1}){return t&&!e?null:Yo("span",{"aria-hidden":!0,"data-slot":"disclosure","data-end":t||void 0,className:"flex size-4 shrink-0 items-center justify-center text-text-3",children:e&&Yo(Ce,{icon:Zh,size:12,className:"transition-[rotate] duration-(--dur-state) ease-out group-data-panel-open/row:rotate-90 motion-reduce:transition-none rtl:-scale-x-100 rtl:group-data-panel-open/row:-rotate-90"})})}var al=Ye("group/row -mx-2 flex max-w-[calc(100%+var(--space-4))] min-w-0 items-center gap-2 self-start rounded-tag px-2 text-start type-body-sm focus-visible:focus-ring-inset pointer-coarse:min-h-11",{variants:{size:{default:"min-h-(--control)",sm:"min-h-(--menu-row-sm)"},opens:{true:"transition-colors duration-(--dur-state) ease-out hover:bg-hover active:bg-pressed",false:""}},defaultVariants:{size:"default",opens:!0}});function w4({summary:e,meta:t,live:o=!1,open:a,defaultOpen:r=!1,onOpenChange:n,size:s="default",className:l,children:i,...c}){let{force:u,rest:d}=z2(c);return T2(_a.Root,{"data-slot":"activity-group","data-live":o||void 0,open:a,defaultOpen:r,onOpenChange:n,className:F("flex min-w-0 flex-col",l),...d,children:[T2(_a.Trigger,{"data-slot":"activity-group-trigger",className:al({size:s}),...u,children:[Yo(Yc,{open:!0}),Yo("span",{"data-slot":"activity-group-summary",className:"min-w-0 truncate text-text-2",children:e}),Yo("span",{"data-slot":"activity-group-meta",className:"flex shrink-0 items-center gap-2 text-text-2 data empty:hidden",children:t??(o?Yo($s,{}):null)})]}),Yo(_a.Panel,{"data-slot":"activity-group-content",className:"flex min-w-0 flex-col ps-6",children:i})]})}function z2(e){let t={},o={};for(let[a,r]of Object.entries(e))(a.startsWith("data-force-")?t:o)[a]=r;return{force:t,rest:o}}import{useEffect as xA,useRef as v4,useState as I4}from"react";import{Fragment as SA,jsx as Ma,jsxs as Hf}from"react/jsx-runtime";var IA={showMore:e=>`Show ${ol(e)} more`,showLess:"Show less",requests:"Requests"};function L2(e){if(e===void 0||e==="")return;let t=Number(e);return Number.isFinite(t)?t>=500?"fail":t>=400?"warn":"ok":"fail"}function C4(e){let t=e.filter(o=>L2(o.code)==="warn"||L2(o.code)==="fail").length;return{head:`${ol(e.length)} ${e.length===1?"request":"requests"}`,failed:t}}function R4(e){let{head:t,failed:o}=C4(e);return o?`${t}, ${o} failed`:t}function S4({items:e}){let{head:t,failed:o}=C4(e);return o?Hf(SA,{children:[t,", ",Hf("span",{"data-slot":"request-ticker-failed",className:"text-fail-text",children:[o," failed"]})]}):t}function CA(e,t,o,a){let[r,n]=I4(()=>e.slice(-t)),s=v4(0),l=v4(e);return l.current=e,xA(()=>{let i=()=>{s.current=Date.now(),n(l.current.slice(-t))};if(!o){i();return}let c=Math.max(0,a-(Date.now()-s.current));if(!c){i();return}let u=setTimeout(i,c);return()=>clearTimeout(u)},[e,t,o,a]),r}var RA={ok:"outline",warn:"warn",fail:"fail"};function x4({request:e,live:t,as:o="div"}){let a=L2(e.code);return Hf(o,{"data-slot":"request-ticker-row","data-status":a==="warn"||a==="fail"?a:void 0,className:"flex h-(--menu-row-sm) min-w-0 items-center gap-3",children:[Ma("span",{className:"flex w-16 shrink-0",children:e.method&&Ma(Ji,{variant:"outline",size:"sm",children:Ma("span",{className:"mono",children:e.method})})}),Ma("span",{dir:"ltr",className:"min-w-0 flex-1 truncate text-start type-code-xs text-text-1",children:e.target}),Ma("span",{className:"flex w-10 shrink-0 justify-end",children:a?Ma(Ji,{variant:RA[a],size:"sm",children:Ma("span",{className:"mono",children:e.code})}):t&&Ma($s,{className:"text-text-2"})}),Ma("span",{className:"w-14 shrink-0 text-end type-caption text-text-2 data",children:e.duration!==void 0&&Of(e.duration)})]})}function N2({className:e,...t}){return Ma("button",{type:"button",className:F("-mx-3 -mb-2 mt-1 flex h-(--menu-row-sm) items-center self-stretch border-t border-line-faint px-3 text-start type-label-sm text-text-2 transition-colors duration-(--dur-state) ease-out hover:bg-hover hover:text-text-1 focus-visible:focus-ring-inset",e),...t})}function E4({items:e,live:t=!1,max:o=3,cap:a=10,hold:r=300,labels:n,className:s,...l}){let i={...IA,...n},c=CA(e,o,t,r),[u,d]=I4(!1);if(t)return Ma("div",{"data-slot":"request-ticker","data-live":"","aria-hidden":!0,className:F("flex min-w-0 flex-col",s),...l,children:c.map(f=>Ma(x4,{request:f,live:!0},f.id))});let m=u?0:Math.max(0,e.length-a),p=m?e.slice(0,a):e;return Hf("div",{"data-slot":"request-ticker",className:F("flex min-w-0 flex-col",s),...l,children:[Ma("ol",{"aria-label":i.requests,className:"flex min-w-0 flex-col",children:p.map(f=>Ma(x4,{as:"li",request:f,live:!1},f.id))}),e.length>a&&Ma(N2,{"data-slot":"request-ticker-more",onClick:()=>d(f=>!f),children:u?i.showLess:i.showMore(m)})]})}import{Fragment as H2,jsx as Oe,jsxs as ra}from"react/jsx-runtime";var kA=new Set(["completed","error","denied","cancelled"]),Ws=e=>kA.has(e),T4={calls:[],gen:0,stopped:!1,dropped:0},AA="The tool ended without reporting a result.",zA=120,V2=e=>typeof e=="number"&&Number.isFinite(e)?e:Date.now();function F2(e,t){let o=V2(t.at);switch(t.type){case"call":return{...e,tool:t.tool,input:t.input??e.input,raw:t.raw??e.raw,status:"pending"};case"input":return{...e,raw:t.raw,input:t.input??e.input};case"start":return{...e,tool:t.tool??e.tool,input:t.input??e.input,title:t.title??e.title,status:"running",startedAt:e.startedAt??o};case"progress":return{...e,metadata:{...e.metadata,...t.metadata},title:t.title??e.title,status:e.status==="pending"?"running":e.status,startedAt:e.startedAt??o};case"ask":return{...e,status:"awaiting-permission",permission:{patterns:t.patterns,message:t.message}};case"reply":return t.reply==="reject"?{...e,status:"denied",reason:t.feedback,endedAt:o}:{...e,status:"running",startedAt:e.startedAt??o};case"result":{let a=t.status??"error";return{...e,status:a,output:t.output??e.output,title:t.title??e.title,metadata:t.metadata?{...e.metadata,...t.metadata}:e.metadata,error:a==="error"?t.error??(t.status?"The tool failed.":AA):void 0,endedAt:o}}}}function LA(e,t){if(t.type==="reset")return T4;let o={...e,dropped:e.dropped+1};if(t.type==="turn")return{...e,gen:t.gen??e.gen+1,stopped:!1};if(t.type==="stop"){if(t.gen<e.gen||t.gen===e.gen&&e.stopped)return o;let l=V2(t.at);return{...e,gen:t.gen,stopped:!0,calls:e.calls.map(i=>Ws(i.status)?i:{...i,status:"cancelled",endedAt:l})}}let a=t.gen??e.gen;if(a<e.gen||a===e.gen&&e.stopped)return o;a>e.gen&&(e={...e,gen:a,stopped:!1});let r=e.calls.findIndex(l=>l.id===t.id);if(r===-1){let l=t.type==="result"||t.type==="ask"||t.type==="reply"||t.type==="progress",i={id:t.id,tool:"tool"in t&&t.tool||"unknown",status:"pending",seq:t.seq,orphan:l,receivedAt:V2(t.at)};return{...e,calls:[...e.calls,{...F2(i,t),seq:t.seq}]}}let n=e.calls[r],s=l=>({...e,calls:e.calls.map((i,c)=>c===r?l:i)});if(n.orphan&&(t.type==="call"||t.type==="start")){let l={...n,tool:n.tool==="unknown"?t.tool??n.tool:n.tool,input:n.input??t.input,orphan:!1};return s(Ws(n.status)||t.seq<=n.seq?l:{...F2(l,t),seq:t.seq})}return t.seq<=n.seq||Ws(n.status)?o:s({...F2(n,t),seq:t.seq})}function M4(e=[]){return PA(LA,{...T4,calls:e})}var P4=new Map,k4=new Map;function mn(e,t,o=[]){P4.set(e,t);for(let a of o)k4.set(a,e)}var na=e=>typeof e=="string"&&e.trim()?e:void 0,Xc=(e,t)=>t.map(o=>na(e[o])).find(Boolean),B2=["filePath","path","file","url","query","pattern","command","description","name","id"],A4=e=>e?.split("/").filter(Boolean).at(-1)??e;function NA(e){return{active:`Calling ${e}`,done:`Called ${e}`,ask:`Call ${e}`,noun:e,confirm:`Allow ${e}?`,lines:8,detailMono:!1,summary:{key:`tool:${e}`,one:`called ${e}`,many:t=>`called ${e} ${t} times`},detail:t=>Xc(t,B2),body:(t,o)=>{let a=Xc(t.input??{},B2),r=Object.entries(t.input??{}).filter(([,s])=>["string","number","boolean"].includes(typeof s)&&String(s)!==a).slice(0,3),n=t.output??na(t.metadata?.output);return!r.length&&!n?null:ra("div",{className:"flex min-w-0 flex-col gap-2",children:[r.length>0&&Oe("dl",{className:"grid min-w-0 grid-cols-[max-content_minmax(0,1fr)] gap-x-3 gap-y-0.5 type-code-sm",children:r.map(([s,l])=>ra("div",{className:"contents",children:[Oe("dt",{className:"text-text-2",children:s}),Oe("dd",{className:"truncate text-text-1",children:String(l)})]},s))}),n&&Oe(qs,{text:n,lines:8,labels:o.labels})]})}}}function G2(e){let t=k4.get(e)??e;return P4.get(t)??NA(e)}var DA=/\u001b\[[0-9;?]*[ -/]*[@-~]|\u001b\][^\u0007]*\u0007/g,FA=e=>e.replace(DA,"").replace(/\r\n/g,`
`).split(`
`).map(t=>t.split("\r").reduce((o,a)=>a+o.slice(a.length),"")).join(`
`),_f=(e,t,o,a,r,n,s,l)=>({active:e,done:t,ask:o,noun:a,confirm:`Allow ${a}?`,lines:8,detailMono:!0,summary:{key:r,one:n,many:s},detail:i=>{let c=Xc(i,l);return l[0]==="filePath"?A4(c):c},body:(i,c)=>{let u=i.output??na(i.metadata?.output);return u?Oe(qs,{text:u,lines:8,labels:c.labels}):null}});mn("read",_f("Reading","Read","Read","read","read","read a file",e=>`read ${e} files`,["filePath","path","file"]));mn("glob",_f("Finding files","Found files","Find files","search","search","searched once",e=>`searched ${e} times`,["pattern"]));mn("grep",_f("Searching","Searched","Search","search","search","searched once",e=>`searched ${e} times`,["pattern","query"]));mn("list",_f("Listing","Listed","List","list","list","listed a folder",e=>`listed ${e} folders`,["path"]),["ls"]);function z4({children:e}){return ra("code",{children:[Oe("span",{"aria-hidden":!0,className:"text-text-3 select-none",children:"$ "}),e]})}mn("shell",{active:"Running",done:"Ran",ask:"Run",noun:"command",confirm:"Run this command?",lines:24,detailMono:!0,summary:{key:"shell",one:"ran a command",many:e=>`ran ${e} commands`},detail:e=>na(e.command)??na(e.description),body:(e,t)=>{let o=na(e.input?.command),a=e.output??na(e.metadata?.output);if(!a)return null;let r=!!o&&(o.includes(`
`)||o.length>80);return ra("div",{className:"flex min-w-0 flex-col gap-1",children:[r&&Oe("pre",{dir:"ltr",className:"overflow-x-auto text-start type-code-sm text-text-1",children:Oe(z4,{children:o})}),Oe(qs,{text:FA(a),lines:24,labels:t.labels})]})}},["bash","sh","zsh","run_command","terminal"]);mn("edit",{active:"Editing",done:"Edited",ask:"Edit",noun:"edit",confirm:"Apply this edit?",lines:8,detailMono:!0,summary:{key:"edit",one:"edited a file",many:e=>`edited ${e} files`},detail:e=>A4(Xc(e,["filePath","path","file"])),body:(e,t)=>{let o=na(e.metadata?.diff)??na(e.metadata?.patch);return o?Oe(OA,{patch:o,lines:8,labels:t.labels}):null}},["write","apply_patch","patch","multiedit","str_replace"]);mn("webfetch",{active:"Fetching",done:"Fetched",ask:"Fetch",noun:"fetch",confirm:"Fetch this page?",lines:8,detailMono:!0,summary:{key:"web",one:"fetched a page",many:e=>`fetched ${e} pages`},detail:e=>{let t=na(e.url);try{return t?new URL(t).host+new URL(t).pathname.replace(/\/$/,""):void 0}catch{return t}},body:(e,t)=>e.output?Oe(qs,{text:e.output,lines:8,labels:t.labels}):null},["fetch","web_fetch"]);var O2=e=>Array.isArray(e.metadata?.requests)?e.metadata.requests:[];mn("http",{active:"Calling",done:"Called",ask:"Call",noun:"request",confirm:"Send this request?",lines:10,detailMono:!1,summary:{key:"http",one:"made a request",many:e=>`made ${e} requests`},detail:(e,t)=>{let o=O2(t);return o.length&&Ws(t.status)?R4(o):o.at(-1)?.target??na(e.url)??na(e.server)??na(e.name)},detailNode:(e,t)=>{let o=O2(t);return o.length&&Ws(t.status)?Oe(S4,{items:o}):void 0},body:e=>{let t=O2(e);return t.length?Oe(E4,{items:t,live:e.status==="running"}):null}},["http_request","api","mcp","mcp_call"]);mn("websearch",{active:"Searching the web for",done:"Searched the web for",ask:"Search the web for",noun:"search",confirm:"Search the web?",lines:8,summary:{key:"websearch",one:"searched the web",many:e=>`searched the web ${e} times`},detail:e=>na(e.query),body:(e,t)=>e.output?Oe(qs,{text:e.output,lines:8,labels:t.labels}):null},["web_search","search_web"]);mn("task",{active:"Delegating",done:"Delegated",ask:"Delegate",noun:"task",confirm:"Delegate this task?",lines:8,summary:{key:"task",one:"ran a subagent",many:e=>`ran ${e} subagents`},detail:(e,t)=>{let o=na(t.metadata?.current);return t.status==="running"&&o?`↳ ${o}`:na(e.description)},body:(e,t)=>e.output?Oe(qs,{text:e.output,lines:8,labels:t.labels}):null},["subagent","agent"]);var Vf={status:{pending:"Preparing",running:"Running",completed:"Done",error:yr.fail,"awaiting-permission":yr.waiting,denied:"Denied",cancelled:"Stopped"},orphaned:"Orphaned result",result:"Result",forCall:e=>`for call ${e}`,showMore:(e,t)=>`Show ${ol(e)} more ${t==="lines"?e===1?"line":"lines":"characters"}`,showLess:"Show less",trimmed:e=>`Trimmed at ${ol(e)} characters`,added:"added",removed:"removed",worked:e=>`Worked for ${e}`,ranTools:e=>e===1?"Ran 1 tool":`Ran ${e} tools`,failedCount:e=>e===1?"Failed":`${e} failed`,allow:"Allow",deny:"Deny"},Zf=e=>({...Vf,...e,status:{...Vf.status,...e?.status}});function qs({text:e,lines:t,chars:o=2e4,labels:a}){let r=Zf(a),[n,s]=Z2(!1),l=e.length>o,i=(l?e.slice(0,o):e).replace(/\n+$/,""),c=i.split(`
`),u=Math.max(0,c.length-t),d=u?c.slice(0,t).join(`
`):i,m=t*zA,p=Math.max(0,d.length-m),f=n?i:p?`${d.slice(0,m)}…`:d,v=u>0||p>0;return ra("div",{"data-slot":"tool-call-output",className:"flex min-w-0 flex-col gap-1",children:[Oe("pre",{dir:"ltr","data-all":n||void 0,className:"min-w-0 overflow-x-auto text-start type-code-sm whitespace-pre-wrap text-text-2 [overflow-wrap:anywhere] data-all:max-h-96 data-all:overflow-y-auto",children:Oe("code",{children:f})}),l&&Oe("p",{className:"type-caption text-text-2 data",children:r.trimmed(o)}),v&&Oe(N2,{"data-slot":"tool-call-more",onClick:()=>s(g=>!g),children:n?r.showLess:u>0?r.showMore(u,"lines"):r.showMore(p,"characters")})]})}function U2({added:e,removed:t,addedLabel:o="added",removedLabel:a="removed",className:r}){return ra("span",{"data-slot":"diff-count",dir:"ltr",className:F("data",r),children:[Oe("span",{"aria-hidden":!0,children:"+"}),e,ra("span",{className:"sr-only",children:[" ",o]})," ",Oe("span",{"aria-hidden":!0,children:"−"}),t,ra("span",{className:"sr-only",children:[" ",a]})]})}function OA({patch:e,lines:t,labels:o}){let a=Zf(o),r=e.split(`
`).filter(l=>/^[+-]/.test(l)&&!/^(\+\+\+|---)/.test(l)),n=r.filter(l=>l.startsWith("+")).length,s=r.length-n;return ra("div",{className:"flex min-w-0 flex-col gap-1",children:[Oe("p",{className:"text-start type-caption text-text-2",children:Oe(U2,{added:n,removed:s,addedLabel:a.added,removedLabel:a.removed})}),Oe(qs,{text:r.map(l=>(l[0]==="-"?"−":"+")+" "+l.slice(1)).join(`
`),lines:t,labels:o})]})}function HA(e,t){let o=G2(e.tool),a=(e.input&&o.detail?.(e.input,e))??e.title;if(e.orphan&&e.tool==="unknown")return{text:t?.result??Vf.result,detail:e.title??(t?.forCall??Vf.forCall)(e.id)};switch(e.status){case"pending":return{text:`Preparing ${o.noun}`,detail:e.input?a:void 0};case"running":return{text:o.active,detail:a};case"completed":return{text:o.done,detail:a};default:return{text:o.ask,detail:a}}}var Bf=Of;function VA(e){let t=D2(null),o=D2(null),a=D2(e);return _2(()=>{let r=a.current;if(a.current=e,r||!e)return;let n=document.activeElement;(!n||n===document.body||!n.isConnected||t.current?.contains(n))&&o.current?.focus()},[e]),{region:t,target:o}}function L4({call:e,size:t="default",onReply:o,actions:a,label:r,doneLabel:n,detail:s,detailMono:l,duration:i,children:c,open:u,defaultOpen:d,onOpenChange:m,labels:p,className:f,ref:v,...g}){let b=Zf(p),{force:w,rest:y}=z2(g),x=G2(e.tool),h=e.status==="running",I=e.status==="pending",R=e.status==="awaiting-permission",C=e.status==="denied",S=e.status==="error",T=h||I?void 0:i??(e.startedAt!==void 0&&e.endedAt!==void 0?Math.max(0,e.endedAt-e.startedAt):void 0),P=HA(e,b),V=r===void 0?P.text:e.status==="completed"?n??A2(r):r,E=s??P.detail,z=s??(!e.orphan&&e.input?x.detailNode?.(e.input,e):void 0)??E,M=l??(e.orphan&&e.tool==="unknown"?!1:!!x.detailMono),O=!!e.orphan&&Ws(e.status),H=O?b.orphaned:b.status[e.status],{region:k,target:N}=VA(!R),L=MA(()=>Ra(k,v),[k,v]),U=EA(pe=>{N.current=pe},[N]),A=TA(),[ee,B]=Z2(d??S);_2(()=>{S&&B(!0)},[S]);let Z={"data-slot":"tool-call","data-status":e.status,"data-tool":e.tool,"data-size":t,"data-orphan":e.orphan||void 0,"data-waiting":R||void 0,"aria-busy":h||I||void 0},G=F("group/tool-call relative flex w-full min-w-0 flex-col text-text-1",f);if(R){let pe=na(e.input?.command),oe=e.permission?.patterns.join(`
`),Se=pe??oe??(e.input&&Xc(e.input,B2))??E,ie=typeof x.confirm=="function"?x.confirm(e.input??{},e):x.confirm??`${x.ask} this ${x.noun}?`,te=o?ra(Gs,{"data-slot":"tool-call-actions",children:[Oe($e,{size:"sm",variant:"secondary",onClick:()=>o("reject"),children:b.deny}),Oe($e,{size:"sm",variant:"confirm",onClick:()=>o("once"),children:b.allow})]}):a?Oe(Gs,{"data-slot":"tool-call-actions",children:a}):null;return Oe("div",{...Z,...y,ref:L,className:F(G,"my-1"),children:ra(Lf,{"data-slot":"tool-call-approval",role:"group","aria-labelledby":A,children:[Oe(Nf,{children:Oe(Df,{id:A,"data-slot":"tool-call-title",children:ie})}),ra(Ff,{className:"gap-2",children:[e.permission?.message&&Oe("p",{"data-slot":"tool-call-request",className:"type-body-sm text-text-2",children:e.permission.message}),Se&&(pe?Oe("pre",{dir:"ltr","data-slot":"tool-call-command",className:"well min-w-0 rounded-overlay px-3 py-2 text-start type-code-sm whitespace-pre-wrap text-text-1 [overflow-wrap:anywhere]",children:Oe(z4,{children:Se})}):Oe("p",{"data-slot":"tool-call-command",className:"well min-w-0 rounded-overlay px-3 py-2 type-body-sm whitespace-pre-wrap text-text-1 [overflow-wrap:anywhere]",children:Se}))]}),te]})})}let X=c??x.body?.(e,{size:t,labels:p})??null,be=S&&e.error?Oe("p",{"data-slot":"tool-call-error",className:"type-body-sm text-text-1 [overflow-wrap:anywhere]",children:e.error}):C&&e.reason?Oe("p",{"data-slot":"tool-call-reason",className:"type-body-sm text-text-2 [overflow-wrap:anywhere]",children:e.reason}):null,K=X!==null||be!==null,Y=O||e.status==="cancelled"||C?"stopped":h||I?"running":S?"fail":"done",j=O?Oe("span",{children:H}):h||I?Oe("span",{className:"sr-only",children:H}):S?ra(H2,{children:[Oe("span",{className:"text-fail-text",children:H}),T!==void 0&&Bf(T)]}):e.status==="cancelled"?Oe("span",{children:H}):C?null:ra(H2,{children:[Oe("span",{className:"sr-only",children:H}),T!==void 0&&Bf(T)]}),se=ra(H2,{children:[Oe(y4,{state:Y}),Oe("span",{"data-slot":"tool-call-label",className:"shrink-0 text-text-2",children:C?H:V}),Oe("span",{"data-slot":"tool-call-detail",dir:M?"ltr":void 0,title:typeof E=="string"?E:void 0,className:F("min-w-12 truncate text-start text-text-1 max-sm:overflow-visible max-sm:whitespace-normal max-sm:[overflow-wrap:anywhere]",M&&"mono",!E&&"min-w-0"),children:z}),Oe("span",{"data-slot":"tool-call-end",className:"flex shrink-0 items-center gap-2 whitespace-nowrap text-text-2 data empty:hidden",children:j}),Oe(Yc,{open:K,end:!0})]});return K?ra(_a.Root,{...Z,open:u??ee,onOpenChange:pe=>{B(pe),m?.(pe)},...y,ref:L,className:G,children:[Oe(_a.Trigger,{ref:U,"data-slot":"tool-call-row",...w,className:al({size:t}),children:se}),ra(_a.Panel,{"data-slot":"tool-call-content",className:"flex min-w-0 flex-col gap-2 ps-6 pt-0.5 pb-2",children:[be,X!==null&&Oe("div",{"data-slot":"tool-call-well",className:"flex min-w-0 flex-col gap-3 well rounded-overlay px-3 py-2",children:X})]})]}):Oe("div",{...Z,...y,ref:L,className:G,children:Oe("div",{ref:U,tabIndex:-1,"data-slot":"tool-call-row",className:al({size:t,opens:!1}),...w,children:se})})}function BA(e,t=!1){let o=n=>n.map(s=>({type:"call",key:s.id,call:s}));if(!t)return e.length>1?[{type:"group",key:"group:done",calls:[...e],done:!0}]:o(e);let a=e.findIndex(n=>n.status!=="completed"),r=Math.min(a===-1?e.length:a,e.length-1);return r>1?[{type:"group",key:"group:earlier",calls:e.slice(0,r),done:!1},...o(e.slice(r))]:o(e)}function _A(e){let t=e.flatMap(a=>a.startedAt??[]),o=e.flatMap(a=>a.endedAt??[]);return t.length&&o.length?Math.max(0,Math.max(...o)-Math.min(...t)):void 0}function ZA({calls:e,done:t=!1,size:o="default",labels:a,...r}){let n=Zf(a),s=_A(e),l=e.filter(d=>d.status==="error").length,i=e.reduce((d,m)=>d+(m.startedAt!==void 0&&m.endedAt!==void 0?Math.max(0,m.endedAt-m.startedAt):0),0),c=t?s?n.worked(Bf(s)):n.ranTools(e.length):UA(e),u=l?Oe("span",{className:"text-fail-text",children:n.failedCount(l)}):!t&&i>0?Bf(i):null;return Oe(w4,{summary:c,meta:u,size:o,...r,children:e.map(d=>Oe(L4,{call:d,size:o,labels:a},d.id))})}function GA(e,t){let[,o]=Z2(0),a=e.filter(r=>r.orphan&&r.receivedAt!==void 0&&Date.now()-r.receivedAt<t);return _2(()=>{if(!a.length)return;let r=Math.min(...a.map(s=>t-(Date.now()-s.receivedAt))),n=setTimeout(()=>o(s=>s+1),Math.max(0,r)+10);return()=>clearTimeout(n)}),e.filter(r=>!a.includes(r))}function N4({calls:e,live:t,hideCompleted:o=!1,orphanTtl:a=2e3,size:r="default",onReply:n,actions:s,labels:l,className:i,...c}){let u=GA(e,a),d=o?u.filter(f=>f.status!=="completed"):u,m=t??d.some(f=>!Ws(f.status)),p=BA(d,m);return Oe("div",{"data-slot":"tool-call-list",className:F("flex min-w-0 flex-col",i),...c,children:p.map(f=>f.type==="group"?Oe(ZA,{calls:f.calls,done:f.done,size:r,labels:l},f.key):Oe(L4,{call:f.call,size:r,labels:l,onReply:n&&(v=>n(f.call,v)),actions:s?.(f.call)},f.key))})}function UA(e){let t=new Map,o=0,a=0,r=0;for(let n of e)if(n.status==="completed"){let s=G2(n.tool),l=t.get(s.summary.key);t.set(s.summary.key,{n:(l?.n??0)+1,r:s})}else n.status==="error"?o++:n.status==="cancelled"?a++:n.status==="denied"&&r++;return h4([...t.values()].map(({n,r:s})=>n===1?s.summary.one:s.summary.many(n)),[o&&`${o} failed`,r&&`${r} denied`,a&&`${a} stopped`].filter(Boolean))}import{Fragment as JA,jsx as Vo,jsxs as Qc}from"react/jsx-runtime";var $A=Ye("group/message relative flex w-full min-w-0 px-4 py-2",{variants:{size:{default:"type-body",sm:"type-body-sm"}},defaultVariants:{size:"default"}});function js({className:e,from:t="agent",size:o="default",...a}){return Vo("div",{"data-slot":"message","data-from":t,"data-size":o,className:F($A({size:o}),t==="user"&&"justify-end",e),...a})}function rl({name:e,time:t,state:o="done",children:a,...r}){return Vo(js,{from:"agent",...r,children:Qc(Ks,{children:[Qc(Ys,{className:o==="fail"||o==="stopped"?void 0:"sr-only",children:[e,Vo(qA,{state:o}),t&&Vo(Xs,{children:t})]}),a]})})}function Ks({className:e,...t}){return Vo("div",{"data-slot":"message-content",className:F("flex min-w-0 flex-1 flex-col break-words text-text-1","group-data-[from=user]/message:max-w-[85%] group-data-[from=user]/message:flex-none group-data-[from=user]/message:items-end group-data-[from=user]/message:gap-1","group-data-[from=user]/message:*:data-[slot=message-header]:sr-only","group-data-[from=agent]/message:gap-2",e),...t})}function Ys({className:e,...t}){return Vo("div",{"data-slot":"message-header",className:F("flex min-h-(--control-sm) min-w-0 shrink-0 items-center gap-2 type-label-sm text-text-1",e),...t})}function Xs({className:e,...t}){return Vo("time",{"data-slot":"message-time",className:F("ms-auto w-12 shrink-0 truncate text-end type-caption text-text-2 data [[data-slot=message-status]~&]:ms-0",e),...t})}var WA={working:yr.running,paused:yr.waiting,failed:yr.fail,stopped:"Stopped"};function qA({state:e,label:t,labels:o,className:a,...r}){let n={...WA,...o},s=e==="fail"?Vo(_t,{status:"fail",size:"sm",children:t??n.failed}):e==="stopped"?Vo("span",{children:t??n.stopped}):e==="live"?Vo("span",{className:"sr-only",children:t??n.working}):e==="waiting"?Vo("span",{className:"sr-only",children:t??n.paused}):t?Vo("span",{className:"sr-only",children:t}):null;return Vo("span",{"data-slot":"message-status","data-state":e,className:F("ms-auto inline-flex shrink-0 items-center justify-end type-caption whitespace-nowrap text-text-2",a),...r,children:s})}function D4({className:e,...t}){return Vo("div",{"data-slot":"message-footer",className:F("flex min-h-(--control) max-w-full min-w-0 shrink-0 items-center gap-0.5 type-caption text-text-2","-ms-2 *:data-[slot=message-model]:ms-auto *:data-[slot=message-meta]:ms-auto [&>[data-slot=message-model]+[data-slot=message-meta]]:ms-3","[&>[data-slot$=button]]:transition-opacity [&>[data-slot$=button]]:duration-(--dur-state)","pointer-fine:group-data-[from=agent]/message:[&>[data-slot$=button]]:opacity-0","pointer-fine:group-data-[from=agent]/message:group-hover/message:[&>[data-slot$=button]]:opacity-100","pointer-fine:group-data-[from=agent]/message:has-[:focus-visible,[data-force-focus-visible]]:[&>[data-slot$=button]]:opacity-100","group-has-[[data-slot=message-status]:is([data-state=live],[data-state=waiting])]/message:hidden",e),...t})}var jA={worked:e=>`Worked for ${e}`};function F4({duration:e,time:t,labels:o,className:a,...r}){let n={...jA,...o};return Qc("span",{"data-slot":"message-worked",className:F("ms-2 me-1 inline-flex min-w-0 items-baseline gap-1.5 truncate type-caption text-text-2 data",a),...r,children:[e&&Qc("span",{className:"min-w-0 truncate",children:[n.worked(e),t&&","]}),t&&Vo("span",{className:"shrink-0",children:t})]})}var KA=Ye(["group/bubble relative flex w-auto max-w-(--measure) min-w-0 flex-col gap-1 self-end"],{variants:{variant:{default:"*:data-[slot=message-bubble-content]:border-line-faint *:data-[slot=message-bubble-content]:bg-shell",outline:"*:data-[slot=message-bubble-content]:border-line-control *:data-[slot=message-bubble-content]:bg-paper"}},defaultVariants:{variant:"default"}});function nl({variant:e="default",status:t,className:o,...a}){return Vo("div",{"data-slot":"message-bubble","data-variant":e,"data-status":t,className:F(KA({variant:e}),t==="fail"&&"*:data-[slot=message-bubble-content]:border-fail",o),...a})}function sl({className:e,render:t,...o}){return Or({defaultTagName:"div",props:rt({className:F("w-fit max-w-full min-w-0 self-end rounded-overlay border px-3 py-2 type-body break-words whitespace-pre-wrap text-text-1 [overflow-wrap:anywhere]","forced-colors:border-[CanvasText]","[&:is(button,a)]:text-start [&:is(button,a)]:transition-colors [&:is(button,a)]:duration-(--dur-state) [&:is(button,a)]:hover:bg-hover",e)},o),render:t,state:{slot:"message-bubble-content"}})}var YA=Ye("group/divider relative flex min-h-(--control-sm) w-full items-center gap-2 px-4 text-start type-caption text-text-2 [&_a]:text-text-1 [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-4",{variants:{variant:{default:"",separator:"after:h-px after:min-w-4 after:flex-1 after:bg-line-faint",handoff:"justify-center before:h-px before:min-w-4 before:flex-1 before:bg-line after:h-px after:min-w-4 after:flex-1 after:bg-line forced-colors:before:bg-[CanvasText] forced-colors:after:bg-[CanvasText]"}},defaultVariants:{variant:"default"}}),XA={compaction:"Context compacted",interrupted:"Interrupted",handoff:yr.waiting},QA={compaction:v6,interrupted:D6};function O4({className:e,variant:t,reason:o,to:a="person",labels:r,render:n,children:s,...l}){let i=o?r?.[o]??(o==="handoff"&&a==="agent"?void 0:XA[o]):void 0,u=t??(o==="handoff"&&a==="person"?"handoff":o?"separator":"default"),d=o==="compaction"||o==="interrupted"?QA[o]:void 0,m=s??i??null;return Or({defaultTagName:"div",props:rt({role:"separator",className:F(YA({variant:u}),e),children:u==="handoff"?Vo(_t,{"data-slot":"message-divider-content",status:"waiting",size:"sm",className:"min-w-0 shrink",children:m}):Qc(JA,{children:[d&&Vo("span",{"data-slot":"message-divider-icon","aria-hidden":!0,className:"flex size-4 shrink-0 items-center justify-center text-text-3",children:Vo(Ce,{icon:d,size:12})}),Vo("span",{"data-slot":"message-divider-content",className:"min-w-0 shrink break-words",children:m})]})},{"data-reason":o,"data-variant":u,"aria-label":typeof s=="string"?s:i},l),render:n,state:{slot:"message-divider",variant:u}})}import{Fragment as q4,jsx as Pt,jsxs as cl}from"react/jsx-runtime";var oz=30,az=5,rz=800,nz=()=>typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function H4(e,t){let o=e instanceof Element?e:null;for(;o&&o!==t;){if(o instanceof HTMLElement&&o.scrollHeight>o.clientHeight+1){let a=getComputedStyle(o).overflowY;if((a==="auto"||a==="scroll")&&o.scrollTop>0)return!0}o=o.parentElement}return!1}function W2(e,{enabled:t=!0,content:o}={}){let a=pn(!0),r=pn(!1),n=pn(t);n.current=t;let s=pn(0),l=pn(-1/0),i=pn(!1),[c,u]=ll(null),[d,m]=ll(0),[p,f]=ll(!0),v=il(x=>{a.current=x,f(x)},[]),g=il(x=>{e.current=x,u(x)},[e]);_4(()=>{e.current!==c&&u(e.current)});let b=il((x=!1)=>{let h=e.current;if(!h)return;let I=Math.max(0,h.scrollHeight-h.scrollTop-h.clientHeight),R=h.scrollTop>s.current;x&&(s.current=h.scrollTop),!a.current&&x&&R&&I<=az&&(i.current||performance.now()-l.current<rz)&&v(!0),m(I)},[e,v]),w=il((x="smooth")=>{let h=e.current;h&&(v(!0),h.scrollTo({top:h.scrollHeight,behavior:x==="smooth"&&!nz()?"smooth":"auto"}))},[e,v]);Jc(()=>{let x=c;if(!x)return;s.current=x.scrollTop;let h=()=>{n.current&&a.current&&!r.current&&(x.scrollTop=x.scrollHeight),b()},I=new ResizeObserver(h);I.observe(x);let R=o?.current??x.firstElementChild;R&&I.observe(R);let C=new MutationObserver(h);C.observe(x,{childList:!0,subtree:!0,characterData:!0});let S=()=>{a.current&&v(!1)},T=()=>{l.current=performance.now()},P=A=>{A.deltaY<0&&!H4(A.target,x)?S():A.deltaY>0&&T()},V=0,E=A=>{V=A.touches[0]?.clientY??0},z=A=>{let ee=A.touches[0]?.clientY??0;ee>V+2&&!H4(A.target,x)?S():ee<V-2&&T(),V=ee},M=()=>T(),O=A=>{if(A.target!==x)return;let ee=x.getBoundingClientRect();(document.dir==="rtl"||getComputedStyle(x).direction==="rtl"?A.clientX<ee.left+(x.offsetWidth-x.clientWidth):A.clientX>ee.left+x.clientWidth)&&(S(),i.current=!0)},H=()=>{i.current&&(i.current=!1,T())},k=A=>{A.target.closest('input, textarea, [contenteditable="true"], select')||(A.key==="ArrowUp"||A.key==="PageUp"||A.key==="Home"||A.key===" "&&A.shiftKey?S():A.key==="End"?(A.preventDefault(),w()):(A.key==="ArrowDown"||A.key==="PageDown"||A.key===" ")&&T())},N=()=>b(!0),L=()=>{let A=document.getSelection();r.current=!!A&&!A.isCollapsed&&!!A.anchorNode&&x.contains(A.anchorNode),r.current||h()},U=()=>{document.hidden||h()};return x.addEventListener("wheel",P,{passive:!0}),x.addEventListener("touchstart",E,{passive:!0}),x.addEventListener("touchmove",z,{passive:!0}),x.addEventListener("touchend",M,{passive:!0}),x.addEventListener("pointerdown",O),window.addEventListener("pointerup",H),x.addEventListener("keydown",k),x.addEventListener("scroll",N,{passive:!0}),document.addEventListener("selectionchange",L),document.addEventListener("visibilitychange",U),h(),()=>{I.disconnect(),C.disconnect(),x.removeEventListener("wheel",P),x.removeEventListener("touchstart",E),x.removeEventListener("touchmove",z),x.removeEventListener("touchend",M),x.removeEventListener("pointerdown",O),window.removeEventListener("pointerup",H),x.removeEventListener("keydown",k),x.removeEventListener("scroll",N),document.removeEventListener("selectionchange",L),document.removeEventListener("visibilitychange",U)}},[c,o,b,v,w]),Jc(()=>{!t||!c||!a.current||(c.scrollTop=c.scrollHeight)},[c,t]);let y=il(()=>v(!1),[v]);return{ref:g,attached:p,distance:d,atEnd:d<=oz,scrollToEnd:w,detach:y}}var q2=ez(null);function Gf(){let e=B4(q2);if(!e)throw new Error("useConversation must be used inside Conversation or ConversationProvider");return e}function Z4({children:e,status:t}){let o=pn(null),a=pn(null),r=W2(o,{content:a}),{scrollToEnd:n,attached:s,distance:l,atEnd:i,detach:c}=r,u=il(()=>n("auto"),[n]),d=$2(()=>({viewportRef:o,contentRef:a,status:t,attached:s,distance:l,atEnd:i,scrollToEnd:n,snap:u,detach:c}),[t,s,l,i,n,u,c]);return Pt(q2.Provider,{value:d,children:e})}function G4({children:e,status:t="idle"}){return Pt(Z4,{status:t,children:e})}function U4({className:e,status:t="idle",...o}){let a=B4(q2),r=Pt("div",{"data-slot":"conversation","data-status":a?a.status:t,className:F("group/conversation relative flex size-full min-h-0 flex-col overflow-hidden",e),...o});return a?r:Pt(Z4,{status:t,children:r})}var sz={complete:"Response complete",stopped:"Stopped",failed:"Response failed"};function $4({className:e,"aria-label":t="Conversation",labels:o,children:a,ref:r,...n}){let{viewportRef:s,status:l,attached:i}=Gf(),c={...sz,...o},u={idle:c.complete,stopped:c.stopped,error:c.failed},d=$2(()=>Ra(s,r),[s,r]),[m,p]=ll(""),f=pn(l);return Jc(()=>{f.current==="streaming"&&l!=="streaming"&&p(u[l]??""),l==="streaming"&&p(""),f.current=l},[l]),cl(q4,{children:[Pt("div",{ref:d,"data-slot":"conversation-viewport","data-attached":i,role:"log","aria-live":"off","aria-label":t,"aria-busy":l==="streaming"||void 0,tabIndex:0,className:F("size-full min-h-0 min-w-0 overflow-y-auto overscroll-contain [overflow-anchor:none] [scrollbar-gutter:stable] focus-visible:focus-ring-inset",e),...n,children:a}),Pt("span",{role:"status",className:"sr-only",children:m})]})}function W4({className:e,style:t,children:o,ref:a,...r}){let{contentRef:n,viewportRef:s,status:l,attached:i}=Gf(),c=$2(()=>Ra(n,a),[n,a]),[u,d]=ll(0);Jc(()=>{let p=n.current;if(!p)return;if(l!=="streaming"){d(0);return}let f=new ResizeObserver(()=>d(v=>Math.max(v,p.scrollHeight)));return f.observe(p),()=>f.disconnect()},[n,l]);let m=pn(null);return _4(()=>{let p=s.current,f=n.current;if(!p||!f)return;let v=m.current;if(v&&!i){let w=f.querySelector(`[data-row-key="${CSS.escape(v.key)}"]`);if(w){let y=w.offsetTop-v.top;y&&(p.scrollTop+=y)}}let b=[...f.querySelectorAll("[data-row-key]")].find(w=>w.offsetTop+w.offsetHeight>p.scrollTop);m.current=b?{key:b.dataset.rowKey,top:b.offsetTop}:null}),Pt("div",{ref:c,"data-slot":"conversation-content",className:F("flex h-max min-h-full flex-col justify-end gap-4",e),style:{...t,...u?{minHeight:u}:null},...r,children:o})}var sre={latest:"Latest",waitingOnYou:yr.waiting};var V4={retryingIn:e=>`Retrying in ${e}s`,retryingNow:"Retrying now",attempt:e=>`attempt ${e}`,retryNow:"Retry now",errors:{auth:"Sign in again to continue","rate-limit":"Rate limited by the model provider",quota:"Out of credits for this workspace",server:"The model provider failed",network:"Lost the connection",gone:"This run no longer exists"},retry:"Retry",thinking:"Thinking",you:"You",agent:"Agent",filesChanged:e=>`${e} ${e===1?"file":"files"} changed`,added:"added",removed:"removed"},j2=e=>({...V4,...e,errors:{...V4.errors,...e?.errors}});function iz(e){let[t,o]=ll(null);return Jc(()=>{o(Date.now());let a=setInterval(()=>o(Date.now()),1e3);return()=>clearInterval(a)},[e]),t===null?null:Math.max(0,Math.ceil((e-t)/1e3))}function lz({attempt:e,next:t,message:o,onRetry:a,labels:r,className:n,...s}){let l=j2(r),i=iz(t),c=o&&o.length>80?`${o.slice(0,79)}…`:o;return cl("div",{"data-slot":"conversation-retry",className:F("flex min-h-(--control) min-w-0 flex-wrap items-center gap-x-3 ps-4 pe-2",n),...s,children:[Pt(_t,{status:"running",size:"sm",children:i?l.retryingIn(i):l.retryingNow}),Pt("span",{className:"type-caption text-text-2 data",children:l.attempt(e)}),c&&Pt("span",{title:o,className:"min-w-0 grow basis-48 truncate [contain:inline-size] type-body-sm text-text-2",children:c}),a&&Pt($e,{variant:"ghost",size:"sm",onClick:a,className:"ms-auto",children:l.retryNow})]})}function cz({kind:e,message:t,onRetry:o,labels:a,className:r,...n}){let s=j2(a);return cl("div",{"data-slot":"conversation-error","data-status":"fail","data-error":e,className:F("relative mx-4 flex min-h-(--row) min-w-0 flex-wrap items-center gap-x-3 gap-y-1 rounded-overlay bg-fail-tint py-1 ps-3 pe-1",r),...n,children:[Pt(_t,{status:"fail",size:"sm",children:s.errors[e]}),t&&Pt("span",{className:"min-w-0 grow basis-48 type-body-sm text-text-2 [overflow-wrap:anywhere] [contain:inline-size]",children:t}),o&&e!=="gone"&&Pt($e,{variant:"secondary",size:"sm",onClick:o,className:"ms-auto",children:s.retry})]})}var ire=tz(function({row:t,onRetry:o,labels:a}){let r=j2(a);switch(t.type){case"user":{let n=t.name??r.you;return Pt(js,{from:"user",children:cl(Ks,{children:[cl(Ys,{children:[n,t.meta&&Pt(Xs,{children:t.meta})]}),Pt(nl,{children:Pt(sl,{children:t.text})})]})})}case"assistant":return Pt(q4,{children:t.content});case"thinking":return Pt(rl,{name:t.author??r.agent,state:"live",children:Pt(_t,{status:"running",size:"sm",className:"min-h-(--control) items-center text-text-2",children:t.label??r.thinking})});case"retry":return Pt(lz,{attempt:t.attempt,next:t.next,message:t.message,labels:a});case"diff":return cl("p",{"data-slot":"conversation-diff",className:"relative flex min-h-(--control) items-center gap-2 px-4 type-body-sm text-text-2 data",children:[Pt("span",{className:"text-text-1",children:r.filesChanged(t.files)}),Pt(U2,{added:t.additions,removed:t.deletions,addedLabel:r.added,removedLabel:r.removed})]});case"error":return Pt(cz,{kind:t.kind,message:t.message,onRetry:o?()=>o(t):void 0,labels:a});case"divider":return Pt(O4,{reason:t.reason,children:t.label})}});import*as Ve from"react";import*as xr from"react";import{useEffect as uz,useLayoutEffect as dz,useMemo as mz,useRef as Qs,useState as K2}from"react";import{jsx as rr,jsxs as Q4}from"react/jsx-runtime";var pz=F(qc,"[overflow-wrap:anywhere]");function Y2({content:e,children:t,disabled:o,side:a="top"}){let r=er(),[n,s]=K2(!1),l=Qs(""),i=Qs(!1),c=()=>l.current==="touch"||l.current==="pen",u=(d,m)=>{c()&&m.reason!=="escape-key"&&m.reason!=="outside-press"||i.current&&!d&&m.reason!=="escape-key"&&m.reason!=="outside-press"||(d||(i.current=!1),s(d))};return Q4(Ea.Root,{disabled:o,open:n&&!o,onOpenChange:u,children:[rr(Ea.Trigger,{delay:400,render:t,onPointerDown:d=>{l.current=d.pointerType},onKeyDown:()=>{l.current=""},onClickCapture:d=>{c()&&(l.current="",!o&&(d.preventDefault(),d.stopPropagation(),i.current=!n,s(!n)))}}),rr(Ea.Portal,{container:r,children:rr(Ea.Positioner,{side:a,sideOffset:6,collisionPadding:8,className:"isolate z-(--z-overlay)",children:rr(Ea.Popup,{"data-slot":"text-hint",className:F(pz,v2),children:rr("span",{className:"min-w-0",children:e})})})})]})}var j4=typeof Intl<"u"&&"Segmenter"in Intl?new Intl.Segmenter(void 0,{granularity:"grapheme"}):null;function Y4(e){if(j4)return Array.from(j4.segment(e),a=>a.index);let t=[],o=0;for(let a of e)t.push(o),o+=a.length;return t}function fz(e,t){let o=Y4(e);if(t==="auto"){let a=e.lastIndexOf("/");if(a>0&&a<e.length-1&&o.length-o.indexOf(a)<=32)return a;t=6}return t=Math.floor(t),t>0?o.length<=t?0:o[o.length-t]:e.length}function gz(e,t){let[o,a]=K2(!1);return uz(()=>{let r=e.current;if(!r)return;let n=()=>a(r.scrollWidth>r.clientWidth+1);n();let s=new ResizeObserver(n);return s.observe(r),()=>s.disconnect()},[e,t]),o}var K4=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");function hz({children:e,tail:t,hint:o,focusable:a,className:r,...n}){let s=Qs(null),l=Qs(null),i=Qs(null),c=Qs(null),[u,d]=K2(!1),m=fz(e,t),p=e.slice(0,m),f=e.slice(m);dz(()=>{let w=s.current,y=l.current,x=i.current,h=c.current,I=y?.firstChild;if(!w||!y||!x||!h||!I)return;let R=P=>{let V=document.createRange();return V.setStart(I,0),V.setEnd(I,P),V.getBoundingClientRect().width},C=[...Y4(p).slice(1),p.length],S=()=>{y.style.width="",h.style.display="none";let P=w.clientWidth;if(R(p.length)+x.getBoundingClientRect().width<=P+.5||p.length===0){d(!1);return}h.style.display="inline";let E=P-h.getBoundingClientRect().width-x.getBoundingClientRect().width,z=-1,M=C.length-1;for(;z<M;){let O=z+M+1>>1;R(C[O])<=E?z=O:M=O-1}y.style.width=`${z<0?0:R(C[z])}px`,d(!0)};S();let T=new ResizeObserver(S);return T.observe(w),document.fonts?.ready.then(S),()=>T.disconnect()},[p,f]);let b=rr("span",{ref:s,className:"block max-w-full min-w-0",children:Q4("span",{"data-slot":"truncate","data-position":"middle","data-clipped":u||void 0,dir:"auto",tabIndex:u&&o&&a?0:void 0,onCopy:w=>{let y=window.getSelection()?.toString()??"";if(!y)return;let x=new RegExp(`${K4(p)}\\s*${K4(f)}`);w.clipboardData.setData("text/plain",x.test(y)?y.replace(x,e):e),w.preventDefault()},className:F("inline-flex max-w-full whitespace-nowrap focus-visible:rounded-tag",r),...n,children:[rr("span",{ref:l,"data-slot":"truncate-head",className:"overflow-hidden",children:p}),rr("span",{ref:c,"data-slot":"truncate-ellipsis","aria-hidden":"true",className:"hidden shrink-0 select-none",children:"…"}),rr("span",{ref:i,"data-slot":"truncate-tail",className:"shrink-0",children:f})]})});return o?rr(Y2,{content:e,disabled:!u,children:b}):b}function X4({children:e,position:t="end",tail:o="auto",hint:a=!0,focusable:r=!0,className:n,ref:s,...l}){let i=Qs(null),c=mz(()=>Ra(i,s),[s]),u=gz(i,e);if(t==="middle")return rr(hz,{tail:o,hint:a,focusable:r,className:n,ref:s,...l,children:e});let m=rr("span",{ref:c,"data-slot":"truncate","data-position":"end","data-clipped":u||void 0,tabIndex:u&&a&&r?0:void 0,className:F("block min-w-0 truncate focus-visible:rounded-tag",n),...l,children:e});return a?rr(Y2,{content:e,disabled:!u,children:m}):m}import{jsx as vr,jsxs as Ere}from"react/jsx-runtime";var bz=Ye(["group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 items-center gap-2 rounded-overlay border border-line bg-paper p-1 text-text-1","data-[state=error]:border-fail forced-colors:border-[CanvasText]"],{variants:{size:{default:"min-w-48 pe-3 has-[>[data-slot=attachment-actions]]:pe-1 [--attachment-media:var(--row)]",sm:"min-w-40 pe-2 has-[>[data-slot=attachment-actions]]:pe-1 [--attachment-media:var(--space-6)]"}},defaultVariants:{size:"default"}});function eC({className:e,state:t="done",size:o="default",...a}){return vr("div",{"data-slot":"attachment","data-state":t,"data-size":o,"aria-busy":t==="uploading"||t==="processing"||void 0,className:F(bz({size:o}),e),...a})}function tC({className:e,children:t,ref:o,...a}){let r=xr.useRef(null),n=xr.useMemo(()=>Ra(r,o),[o]),[s,l]=xr.useState(!1);return xr.useEffect(()=>{let i=r.current;if(!i)return;let c=d=>{d.target.tagName==="IMG"&&l(!0)};i.addEventListener("error",c,!0);let u=i.querySelector("img");return u?.getAttribute("src")&&u.complete&&u.naturalWidth===0&&l(!0),()=>i.removeEventListener("error",c,!0)},[]),vr("div",{ref:n,"data-slot":"attachment-media",className:F("relative flex size-(--attachment-media) shrink-0 items-center justify-center overflow-hidden rounded-tag bg-field text-text-2","[&_img]:size-full [&_img]:object-cover [&_svg]:pointer-events-none","transition-opacity duration-(--dur-state) ease-out group-data-[state=uploading]/attachment:opacity-60 group-data-[state=processing]/attachment:opacity-60",e),...a,children:s?vr(Ce,{icon:Gh,size:14}):t})}function oC({className:e,...t}){return vr("div",{"data-slot":"attachment-content",className:F("flex min-w-0 flex-1 flex-col",e),...t})}function yz(e){let t=e.lastIndexOf("."),o=t>0?e.length-t:0;return Math.min(e.length,o+4)}function aC({className:e,children:t,...o}){return vr("span",{"data-slot":"attachment-title",className:F("flex min-w-0 type-label text-text-1 group-data-[size=sm]/attachment:type-label-sm",e),...o,children:typeof t=="string"?vr(X4,{position:"middle",tail:yz(t),focusable:!1,children:t}):t})}function rC({className:e,...t}){return vr("span",{"data-slot":"attachment-description",className:F("block min-w-0 truncate type-caption text-text-2 data group-data-[state=error]/attachment:text-fail-text group-data-[size=sm]/attachment:hidden",e),...t})}function nC({value:e,label:t,className:o,...a}){let r=Math.min(100,Math.max(0,Math.round(e)));return vr("div",{"data-slot":"attachment-progress",role:"progressbar","aria-label":t,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":r,"aria-valuetext":`${r}%`,className:F("pointer-events-none absolute inset-x-3 bottom-0 h-0.5 overflow-hidden rounded-pill",o),...a,children:vr("div",{className:"h-full w-(--pct) rounded-pill bg-ink transition-[width] duration-(--dur-state) ease-out motion-reduce:transition-none forced-colors:bg-[CanvasText]",style:{"--pct":`${r}%`}})})}function sC({className:e,...t}){return vr("div",{"data-slot":"attachment-actions",className:F("relative z-(--z-raised) flex shrink-0 items-center gap-0.5",e),...t})}function X2({className:e,variant:t,size:o="icon-sm",...a}){return vr($e,{"data-slot":"attachment-action",variant:t??"ghost",size:o,className:e,...a})}var wz=[[/^image\/|\.(png|jpe?g|gif|webp|avif|svg|heic)$/i,Gh],[/^video\/|\.(mp4|mov|webm)$/i,M6],[/^audio\/|\.(mp3|wav|m4a|ogg)$/i,S6],[/csv|spreadsheet|\.(csv|tsv|xlsx?)$/i,T6],[/zip|tar|gzip|\.(zip|tar|gz|tgz)$/i,R6],[/json|javascript|typescript|x-python|yaml|\.(json|jsonl|js|ts|tsx|py|ya?ml|toml|sh|go|rs)$/i,E6],[/pdf|wordprocessing|msword|^text\/|\.(pdf|docx?|odt|rtf|txt|md|log)$/i,af]];function vz(e,t=""){for(let[o,a]of wz)if(o.test(e)||o.test(t))return a;return x6}function iC({type:e,name:t,size:o=14,className:a}){return vr(Ce,{icon:vz(e,t),size:o,className:a})}var J4=["B","KB","MB","GB"];function lC(e){let t=Math.max(0,e),o=0;for(;t>=1e3&&o<J4.length-1;)t/=1e3,o+=1;return`${o===0||t>=10?Math.round(t):t.toFixed(1)} ${J4[o]}`}var Cre=xr.createContext(null);function xz(e){return(e??"").split(",").map(t=>t.trim().toLowerCase()).filter(Boolean)}function cC(e){let t=r=>r.length<=4?r.toUpperCase():r,o=[...new Set(xz(e).map(r=>r.endsWith("/*")?`${r.slice(0,-2)}s`:r.startsWith(".")?t(r.slice(1)):t(r.split("/").pop())))],a=o.length>1?`${o.slice(0,-1).join(", ")} and ${o[o.length-1]}`:o[0];return o.every(r=>r.endsWith("s")&&r===r.toLowerCase())?a:`${a} files`}var Rre=Ye("group/attachment-drop relative",{variants:{variant:{region:"",zone:"flex flex-col items-start gap-3 rounded-overlay border border-line-control bg-paper p-4 text-start data-disabled:text-text-disabled"}},defaultVariants:{variant:"region"}});import{Fragment as Mz,jsx as Q2,jsxs as uC}from"react/jsx-runtime";var ul={agent:"Agent",run:"Run",deploy:"Deployment",key:"Key",model:"Model",file:"File",folder:"Folder",doc:"Doc",table:"Table",web:"Web page",command:"Command",paste:"Pasted text"},Iz=new Set(Object.keys(ul)),Cz=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g,J2=e=>encodeURIComponent(e.replace(Cz,"�")).replace(/[()]/g,t=>`%${t.charCodeAt(0).toString(16).toUpperCase()}`),Rz={"\\":"\\\\","[":"\\[","]":"\\]","\n":"\\n","\r":"\\r"},Sz={n:`
`,r:"\r"};function eb({type:e,id:t,label:o}){return`[${o.replace(/[\\[\]\n\r]/g,a=>Rz[a])}](${e}:${J2(t)})`}var Ez=/[@/]?\[((?:\\.|[^\]\\\n])*)\]\(([a-z]+):([^)\s]*)\)/g;function Uf(e){let t=[],o=0;for(let a of e.matchAll(Ez)){let[r,n,s,l]=a;if(!Iz.has(s))continue;let i=l;try{i=decodeURIComponent(l)}catch{}a.index>o&&t.push({kind:"text",text:e.slice(o,a.index)}),t.push({kind:"mention",mention:{type:s,id:i,label:n.replace(/\\(.)/g,(c,u)=>Sz[u]??u)}}),o=a.index+r.length}return o<e.length&&t.push({kind:"text",text:e.slice(o)}),t}function dC(e,t){let o=t.find(n=>n.type===e.type&&n.id===e.id);if(o)return o.label;let a=new Set(t.map(n=>n.label));if(!a.has(e.label))return e.label;let r=2;for(;a.has(`${e.label} (${r})`);)r+=1;return`${e.label} (${r})`}var Tz=Ye(["group/mention inline-flex h-5 max-w-full min-w-0 items-center gap-1 rounded-tag border border-line-control bg-paper px-1.5 align-bottom whitespace-nowrap","type-label text-text-1 no-underline select-none","transition-[background-color,border-color] duration-(--dur-state) ease-out","[a]:hover:bg-hover [button]:hover:bg-hover [a,button]:cursor-pointer","aria-disabled:text-text-disabled data-missing:border-line-faint data-missing:text-text-2 data-missing:line-through data-missing:decoration-1","forced-colors:border-[CanvasText]","[&_svg]:pointer-events-none [&_svg]:shrink-0"],{variants:{removable:{true:"pe-0",false:""}},defaultVariants:{removable:!1}});function mC({type:e,missing:t,onRemove:o,removeLabel:a,missingLabel:r=" (no longer exists)",render:n,className:s,children:l,...i}){let c=typeof l=="string"?l:void 0,u=uC(Mz,{children:[uC("span",{"data-slot":"mention-label",className:"min-w-0 truncate",title:c&&c.length>24?c:void 0,children:[e==="command"?"/":"",l]}),t&&Q2("span",{className:"sr-only",children:r}),o&&Q2("button",{type:"button","data-slot":"mention-remove","aria-label":a??`Remove ${c??ul[e]}`,onClick:d=>{let m=d.currentTarget.closest('ul, ol, [role="list"], [role="group"]')??d.currentTarget.parentElement?.parentElement,p=m?[...m.querySelectorAll('[data-slot="mention-remove"]')]:[],f=p.indexOf(d.currentTarget),v=p[f+1]??p[f-1];o(),requestAnimationFrame(()=>{let g=document.activeElement;v?.isConnected&&(!g||g===document.body||!g.isConnected)&&v.focus()})},className:"relative inline-flex size-4.5 shrink-0 items-center justify-center rounded-tag text-text-2 transition-colors duration-(--dur-state) ease-out after:absolute after:-inset-1 hover:bg-hover hover:text-text-1 focus-visible:focus-ring-inset",children:Q2(Ce,{icon:tr,size:12})})]});return Or({defaultTagName:"span",props:rt({className:F(Tz({removable:!!o}),s),children:u},{"data-slot":"mention","data-type":e,"data-missing":t||void 0},i),render:n,state:{slot:"mention",type:e}})}import*as kn from"react";import{Fragment as kz,jsx as $f,jsxs as Az}from"react/jsx-runtime";var Pz={send:"Send",stop:"Stop",stopping:"Stopping",sendAgain:"Send again"},pC=e=>e==="submitted"||e==="streaming"||e==="stopping";function fC({status:e="ready",onStop:t,empty:o,blockedReason:a,generation:r,labels:n,disabled:s,onClick:l,size:i="icon-sm",className:c,type:u,...d}){let m={...Pz,...n},p={ready:m.send,submitted:m.stop,streaming:m.stop,stopping:m.stopping,error:m.sendAgain},f=kn.useId(),v=kn.useRef(null),[g,b]=kn.useState(!1);kn.useEffect(()=>{pC(e)||(v.current=null,b(!1))},[e]),kn.useEffect(()=>{v.current=null,b(!1)},[r]);let w=pC(e),y=w&&g?"stopping":e,x=!w&&!!a,h=!w&&!!o&&!x,I=C=>{C.preventDefault(),!(y==="stopping"||v.current===(r??"current"))&&(v.current=r??"current",b(!0),t?.(r))},R=i==="icon-lg"?16:i==="icon"?14:12;return Az(kz,{children:[$f($e,{"data-slot":"send-button","data-state":y,"data-empty":h||void 0,variant:"primary",type:w?"button":u??"submit",size:i,disabled:w?s:s||o||x,focusableWhenDisabled:x||y==="stopping","aria-busy":y==="stopping"||void 0,"aria-label":p[y],"aria-describedby":x?f:void 0,"aria-keyshortcuts":w?"Escape":"Enter",onClick:w?I:l,className:Et(y==="stopping"&&"cursor-progress",c),...d,children:w?$f("span",{"aria-hidden":!0,"data-slot":"send-button-stop",className:F("size-2 rounded-[1.5px] bg-current forced-colors:bg-[CanvasText]",y==="stopping"&&"opacity-40")}):$f(Ce,{icon:_i,size:R})}),x&&$f("span",{id:f,hidden:!0,children:a})]})}var tb="application/x-glaze-prompt",dl="glaze:prompt-draft:",ob=3,gC=150,zz=e=>e==="command"?"/":e==="paste"?"":"@",Wf=e=>e.nativeEvent.isComposing||e.keyCode===229;function ml(e,t){let o="",a="",r="",n=[],s=(i,c=i,u=c)=>{o+=i,a+=c,r+=u},l=i=>{i.childNodes.forEach(c=>{if(c.nodeType===Node.TEXT_NODE)s((c.nodeValue??"").replace(/ /g," ").replace(/​/g,""));else if(c instanceof HTMLElement){let{mentionId:u,mentionType:d,mentionLabel:m}=c.dataset;if(u!==void 0&&d&&m!==void 0){let p=d,f={id:u,type:p,label:m};if(p==="paste"){let v=`${o&&!/\n\s*$/.test(o)?`
`:""}${t.get(u)??""}
`;s(v,v,eb(f))}else n.push(f),s(`${zz(p)}${m}`,eb(f))}else c.tagName==="BR"?s(`
`):c.hasAttribute("data-template")||((c.tagName==="DIV"||c.tagName==="P")&&o&&!o.endsWith(`
`)&&s(`
`),l(c))}})};return l(e),{text:o,serialized:a,codec:r,mentions:n}}var ab=e=>e.replace(/\n$/,"").split(`
`).length;import*as Js from"react";import{jsx as An,jsxs as rb}from"react/jsx-runtime";var hC=e=>(e??"").split(",").map(t=>t.trim().toLowerCase()).filter(Boolean);function qf(e,t){let o=hC(t);if(!o.length)return!0;let a=e.name.toLowerCase();return o.some(r=>r.startsWith(".")?a.endsWith(r):r.endsWith("/*")?e.type.startsWith(r.slice(0,-1)):e.type===r)}function Lz(e,t){let o=hC(e);return!t||!o.length||o.some(r=>r.startsWith("."))||Array.from(t).filter(r=>r.kind==="file").some(r=>!r.type||qf({name:"",type:r.type},e))?"accept":"reject"}function bC(e,t,o){let a=Js.useRef(0),[r,n]=Js.useState(!1);Js.useEffect(()=>{if(!r)return;let i=()=>{a.current=0,n(!1)};return window.addEventListener("dragend",i),window.addEventListener("blur",i),()=>{window.removeEventListener("dragend",i),window.removeEventListener("blur",i)}},[r]),Js.useEffect(()=>{e||(a.current=0,n(!1))},[e]);let s=i=>Array.from(i.dataTransfer.types).includes("Files");return{dragging:e&&r,dropProps:e?{onDragEnter:i=>{s(i)&&(i.preventDefault(),a.current+=1,n(Lz(o,i.dataTransfer.items)))},onDragOver:i=>{s(i)&&(i.preventDefault(),i.dataTransfer.dropEffect=r==="reject"?"none":"copy")},onDragLeave:i=>{s(i)&&(a.current=Math.max(0,a.current-1),a.current||n(!1))},onDrop:i=>{s(i)&&(i.preventDefault(),a.current=0,n(!1),t(Array.from(i.dataTransfer.files)))}}:{}}}var Nz={uploading:e=>`Uploading ${e}%`,uploadFailed:"Upload failed",attached:"Attached",retryFile:e=>`Retry ${e}`,cancelUpload:e=>`Cancel upload of ${e}`,removeFile:e=>`Remove ${e}`};function yC({attachment:e,onRemove:t,onRetry:o,labels:a,className:r,...n}){let s={...Nz,...a},{name:l,size:i,progress:c=0,status:u,error:d}=e,m=Math.round(Math.min(1,Math.max(0,Number.isFinite(c)?c:0))*100);return rb(eC,{"data-slot":"prompt-attachment",state:u,title:l,className:F("max-w-64",r),...n,children:[An(tC,{children:An(iC,{type:"",name:l})}),rb(oC,{children:[An(aC,{children:l}),An(rC,{children:u==="uploading"?s.uploading(m):u==="error"?d??s.uploadFailed:i!==void 0?lC(i):s.attached})]}),(t||u==="error"&&o)&&rb(sC,{children:[u==="error"&&o&&An(X2,{"aria-label":s.retryFile(l),onClick:o,children:An(Ce,{icon:Bs,size:12})}),t&&An(X2,{"aria-label":u==="uploading"?s.cancelUpload(l):s.removeFile(l),onClick:t,children:An(Ce,{icon:tr,size:12})})]}),u==="uploading"&&An(nC,{value:m,label:l,"aria-hidden":!0})]})}import*as vC from"react";import{Fragment as Oz,jsx as ei,jsxs as wC}from"react/jsx-runtime";var Dz={start:"Start voice input",stop:"Stop voice input",blocked:"Voice input blocked",unavailable:"Voice input unavailable",startTip:"Voice input",stopTip:"Stop listening",blockedTip:"Microphone access is blocked. Allow it in the browser's site settings, then press again.",unavailableTip:"This browser can't record audio. Type your message instead."},Fz=[.6,1,.75];function nb({state:e="idle",level:t=0,onListeningChange:o,size:a="sm",reason:r,tooltip:n=!0,labels:s,className:l,onClick:i,...c}){let u={...Dz,...s},d=vC.useId(),m=e==="listening",p=e==="denied"||e==="unsupported",f={idle:u.start,listening:u.stop,denied:u.blocked,unsupported:u.unavailable}[e],v=p&&r?r:{idle:u.startTip,listening:u.stopTip,denied:u.blockedTip,unsupported:u.unavailableTip}[e],g=Math.min(1,Math.max(0,Number.isFinite(t)?t:0)),b=a==="lg"?16:a==="sm"?12:14,w=ei($e,{"data-slot":"prompt-input-mic","data-state":e,variant:"ghost",size:a==="sm"?"icon-sm":a==="lg"?"icon-lg":"icon","aria-label":f,"aria-pressed":e==="unsupported"?void 0:m,"aria-describedby":p?d:void 0,disabled:e==="unsupported",focusableWhenDisabled:e==="unsupported",onClick:y=>{i?.(y),!y.defaultPrevented&&e!=="unsupported"&&o?.(!m)},className:Et(F("relative",m&&"bg-pressed"),l),...c,children:m?ei("span",{"aria-hidden":!0,"data-slot":"prompt-input-mic-level",className:F("flex items-center justify-center gap-0.5",a==="sm"?"size-3":"size-4"),children:Fz.map((y,x)=>ei("span",{style:{"--live":`${(.2+.8*g*y)*100}%`,"--rest":`${y*70}%`},className:"h-(--live) w-0.5 rounded-pill bg-current transition-[height] duration-(--dur-state) ease-out motion-reduce:h-(--rest) motion-reduce:transition-none"},x))}):ei(Ce,{icon:p?L6:z6,size:b})});return wC(Oz,{children:[n?wC(or,{children:[ei(ar,{render:w}),ei(Va,{children:v})]}):w,p&&ei("span",{id:d,hidden:!0,children:v})]})}import*as is from"react";import{jsx as tu,jsxs as ou}from"react/jsx-runtime";var xC=6,eu=16,Hz=120,Vz=320,sb=320;function IC(e,t){let o=e.toLowerCase();if(!t||o===t)return 0;if(o.startsWith(t))return/[a-z0-9]/i.test(o.charAt(t.length))?2:1;for(let a=o.indexOf(t,1);a>0;a=o.indexOf(t,a+1))if(!/[a-z0-9]/i.test(o.charAt(a-1)))return 3;return 4}function CC({id:e,menu:t,title:o,empty:a,options:r,active:n,onHover:s,onPick:l,typeLabel:i,search:c}){let u=er(),d=is.useRef(null),[m,p]=is.useState({visibility:"hidden"});return is.useLayoutEffect(()=>{let f=d.current;if(!f)return;let v=Math.min(Vz,window.innerWidth-2*eu),g=Math.max(eu,Math.min(t.rect.left-8,window.innerWidth-v-eu)),b=t.rect.top-eu,w=b>Math.min(f.scrollHeight,sb)+8;p(w?{position:"fixed",left:g,width:v,bottom:window.innerHeight-t.rect.top+xC,maxHeight:Math.min(sb,b-8)}:{position:"fixed",left:g,width:v,top:t.rect.bottom+xC,maxHeight:Math.max(Hz,Math.min(sb,window.innerHeight-t.rect.bottom-eu))})},[t.rect,r.length]),is.useEffect(()=>{d.current?.querySelector(`[data-index="${n}"]`)?.scrollIntoView({block:"nearest"})},[n]),u===null?null:Mr(ou("div",{ref:d,"data-slot":"prompt-input-menu","data-menu":t.kind,onMouseDown:f=>{f.target.closest("input")||f.preventDefault()},style:m,className:F("isolate z-(--z-overlay) flex flex-col overflow-hidden [--menu-item-h:var(--menu-row)]",Lc,_h,"starting:opacity-0"),children:[c,ou("div",{id:e,role:"listbox","aria-label":o,className:"min-h-0 flex-1 overflow-y-auto overscroll-contain p-1",children:[tu("p",{className:Cm,"aria-hidden":!0,children:o}),r.length===0&&tu("p",{"data-slot":"prompt-input-menu-empty",role:"presentation",className:"flex min-h-(--menu-row) items-center px-2 type-body-sm text-text-2",children:a}),r.map((f,v)=>ou("div",{id:`${e}-${v}`,role:"option","aria-selected":v===n,"data-index":v,"data-highlighted":v===n||void 0,onMouseMove:()=>s(v),onClick:()=>l(f),className:F(Nc,f.description&&"py-1"),children:[ou("span",{className:"flex min-w-0 flex-1 flex-col",children:[ou("span",{className:"truncate",children:[f.mention.type==="command"?"/":"",f.mention.label]}),f.description&&tu("span",{className:"truncate type-caption text-text-2",children:f.description})]}),f.detail?tu("span",{dir:"ltr",className:"max-w-1/2 shrink-0 truncate type-code-xs text-text-2",children:f.detail}):tu("span",{className:"shrink-0 type-caption text-text-2",children:i(f)})]},f.key))]})]}),u??document.body)}var ib=/​/g,Bz=e=>e instanceof HTMLElement&&!!e.dataset.mentionId;function jf(e,t){let o=window.getSelection();if(!o?.rangeCount||!o.isCollapsed)return null;let{anchorNode:a,anchorOffset:r}=o;if(!a||!e?.contains(a))return null;let n=null;if(a.nodeType===Node.TEXT_NODE){let s=a.data;if(t==="back"&&s.slice(0,r).replace(ib,"")!==""||t==="forward"&&s.slice(r).replace(ib,"")!=="")return null;n=t==="back"?a.previousSibling:a.nextSibling}else n=t==="back"?a.childNodes[r-1]??null:a.childNodes[r]??null;for(;n&&n.nodeType===Node.TEXT_NODE&&!n.data.replace(ib,"");)n=t==="back"?n.previousSibling:n.nextSibling;return Bz(n)?n:null}function pl(e,t){let o=document.createRange();e==="before"?o.setStartBefore(t):o.setStartAfter(t),o.collapse(!0);let a=window.getSelection();a?.removeAllRanges(),a?.addRange(o)}function lb(e){let t=document.createRange();t.selectNodeContents(e),t.collapse(!1);let o=window.getSelection();o?.removeAllRanges(),o?.addRange(t)}import*as hl from"react";import{createContext as mL,useContext as u0,useEffect as pL,useMemo as fL,useRef as gL,useState as eR}from"react";import*as qC from"react";var l0={};Jo(l0,{Control:()=>GC,Description:()=>_C,Error:()=>VC,Item:()=>WC,Label:()=>OC,Root:()=>FC,Validity:()=>UC});import*as Wo from"react";import*as Kf from"react";var RC="data-valid",SC="data-invalid";var ti={badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:null,valueMissing:!1},_z={valid:null,touched:!1,dirty:!1,filled:!1,focused:!1},TC={disabled:!1,..._z},ma={valid(e){return e===null?null:e?{[RC]:""}:{[SC]:""}}};var Zz={invalid:void 0,name:void 0,validityData:{state:ti,errors:[],error:"",value:"",initialValue:null},setValidityData:Be,disabled:void 0,setTouched:Be,setDirty:Be,setFilled:Be,setFocused:Be,focusOwnerRef:{current:void 0},validationMode:"onSubmit",shouldValidateOnChange:()=>!1,state:TC,registerFieldControl:Be,validation:{getValidationProps:(e,t=ze)=>t,inputRef:{current:null},registeredInputs:new Map,registerInput:Be,getInputControl:()=>null,commit:async()=>{},change:Be}},cb=Kf.createContext(Zz);function Bo(e=!0){let t=Kf.useContext(cb);if(t.setValidityData===Be&&!e)throw new Error(De(28));return t}import*as Yf from"react";var Gz=Yf.createContext(void 0);function Xf(e=!1){let t=Yf.useContext(Gz);if(!t&&!e)throw new Error(De(86));return t}import*as Qf from"react";var Uz=Qf.createContext({elementRef:{current:null},formRef:{current:{fields:new Map}},errors:{},clearErrors:Be,validationMode:"onSubmit",submitCountRef:{current:0}});function Ir(){return Qf.useContext(Uz)}import*as ls from"react";import*as Jf from"react";var ub=Jf.createContext({controlId:void 0,registerControlId:Be,resetControlId:Be,labelId:void 0,setLabelId:Be,messageIds:[],setMessageIds:Be,getDescriptionProps:e=>e});function _o(){return Jf.useContext(ub)}import{jsx as $z}from"react/jsx-runtime";var e0=function(t){let o=qe(),[a,r]=ls.useState(o),[n,s]=ls.useState(),[l,i]=ls.useState([]),c=a===void 0?o:a,u=Ze(()=>new Map),{messageIds:d}=_o(),m=$((g,b)=>{let w=u.current;b===void 0?w.delete(g):w.set(g,b),r(y=>{if(w.size===0)return y;let x;for(let h of w.values()){if(h===y)return y;x===void 0&&(x=h)}return x})}),p=$(()=>{u.current.size===0&&r(o)}),f=ls.useCallback(g=>{let b=g["aria-describedby"]?g["aria-describedby"].split(" "):[];return b.push(...d,...l),{...g,"aria-describedby":Array.from(new Set(b)).join(" ")||void 0}},[d,l]),v=ls.useMemo(()=>({controlId:c,registerControlId:m,resetControlId:p,labelId:n,setLabelId:s,messageIds:l,setMessageIds:i,getDescriptionProps:f}),[c,m,p,n,s,l,i,f]);return $z(ub.Provider,{value:v,children:t.children})};import*as MC from"react";function PC(e,t,o,a=!0,r,n){let[s,l]=MC.useState(),i=qe(r?`${r}-label`:void 0),c=!!n?.trim(),d=e??(c?void 0:t)??s;return _(()=>{let m=e||t||c||!a?void 0:Wz(o.current,i);s!==m&&l(m)}),d}function Wz(e,t){let o=qz(e);if(o)return!o.id&&t&&(o.id=t),o.id||void 0}function qz(e){if(!e)return;let t=e.parentElement;if(t&&t.tagName==="LABEL")return t;let o=e.id;if(o){let r=e.nextElementSibling;if(r&&r.htmlFor===o)return r}let a=e.labels;return a&&a[0]}import*as db from"react";function t0(e={}){let{id:t,enabled:o=!0}=e,{controlId:a,registerControlId:r,resetControlId:n}=_o(),s=qe(),l=Ze(()=>Symbol()),i=db.useRef(!1),c=db.useRef(!1),u=$(()=>{!i.current||r===Be||(i.current=!1,r(l.current,void 0))});return _(()=>{if(!o||r===Be){u();return}let d;if(t!==void 0)c.current=!0,d=t;else if(c.current)d=s;else{n();return}if(d===void 0){u();return}i.current=!0,r(l.current,d)},[t,o,r,n,s,l,u]),_(()=>u,[u]),(o?a:void 0)??t??s}function kC(e,t){let o=qe(e);return _(()=>(t(o),()=>{t(a=>a===o?void 0:a)}),[o,t]),o}function AC(e={}){let{id:t,fallbackControlId:o,native:a=!1,setLabelId:r,focusControl:n}=e,{controlId:s,setLabelId:l}=_o(),i=$(p=>{l(p),r?.(p)}),c=kC(t,i),u=s??o;function d(p){if(n){n(p,u);return}if(!u)return;let f=jz(p.currentTarget,u);Fe(f)&&Kz(f)}function m(p){let f=He(p.nativeEvent);Ya(f,"button,input,select,textarea")||(!p.defaultPrevented&&p.detail>1&&p.preventDefault(),!a&&d(p))}return a?{id:c,htmlFor:u,onMouseDown:m}:{id:c,onClick:m,onPointerDown(p){p.preventDefault()}}}function jz(e,t){let o=e.getRootNode();for(;ja(o);){let a=o.getElementById(t);if(a)return a;o=o.host.getRootNode()}return Ie(e).getElementById(t)}function Kz(e){e.focus({focusVisible:!0})}import*as zn from"react";function oi(e,t){return{...e,state:{...e.state,valid:!t&&e.state.valid}}}var mb=Object.keys(ti);function fb(e,t){return e.matches(":disabled")?!1:!t||e.form===t?!0:e.form===null&&!e.hasAttribute("form")}function zC(e,t){let o=null;for(let a of e.keys())if(fb(a,t)){if(!a.validity.valid)return a;o??=a}return o}function LC(e){return{...ti,valid:!e,customError:e}}function pb(e){return e&&e.validationMessage?[e.validationMessage]:[]}function NC(e){let{elementRef:t,formRef:o}=Ir(),{setValidityData:a,validate:r,validityData:n,validationDebounceTime:s,invalid:l,markedDirtyRef:i,state:c,shouldValidateOnChange:u,validationMode:d,registeredFieldIdRef:m}=e,{controlId:p,getDescriptionProps:f}=_o(),v=Qe(),g=zn.useRef(null),b=Ze(()=>new Map).current,w=zn.useRef(0),y=zn.useRef(null),x=zn.useCallback((S,T)=>(b.set(S,T),()=>{b.delete(S)}),[b]),h=$(()=>{let S=zC(b,t.current);return S&&b.get(S)?.controlRef.current||null}),I=$(async(S,T=!1)=>{w.current+=1;let P=w.current;function V(B,Z=l){let G=m.current??p;if(G==null)return;let X=o.current.fields.get(G);if(!X)return;let be=oi(B,Z);o.current.fields.set(G,{...X,validityData:be})}function E(B,Z){let G=B.valid===!1?Z:[];return{value:S,state:B,error:G[0]??"",errors:G,initialValue:n.initialValue}}function z(B,Z){let G=B.validity.customError?B.validationMessage:"",X=Z.replace(/\r\n?/g,`
`);B.setCustomValidity(X),y.current=[B,X,G]}function M(){let B=y.current;y.current=null,B&&(!B[0].willValidate||B[0].validationMessage===B[1])&&B[0].setCustomValidity(B[2])}function O(B,Z,G){let X=E(B,Z);V(X,G),a(X)}function H(B){let Z=mb.reduce((X,be)=>(X[be]=B.validity[be],X),{}),G=!1;for(let X of mb)if(X!=="valid"){if(X==="valueMissing"&&Z[X])G=!0;else if(Z[X])return Z}return G&&!i.current&&(Z.valid=!0,Z.valueMissing=!1),Z}function k(){return b.size>0?zC(b,t.current):g.current}let N=k();function L(){return N=k(),N?.willValidate?H(N):LC(!1)}if(T){if(c.valid!==!1||!N)return;if(!N.validity.valueMissing){M();let B=k(),Z=B?.validity.customError?pb(B):[];O(LC(Z.length>0),Z,!1);return}for(let B of mb)if(B!=="valid"&&B!=="valueMissing"&&B!=="customError"&&N.validity[B])return}v.clear(),M();let U=L(),A=pb(N),ee=u();if(A.length===0||ee){let B=Array.from(o.current.fields.values()).reduce((X,be)=>(be.name&&(X[be.name]=be.getValue()),X),{}),Z=r(S,B),G;if(typeof Z=="object"&&Z!==null&&"then"in Z){if(U.valid===!1?O(U,A):(d==="onSubmit"||!n.state.customError)&&(U.valid=null,O(U,A)),G=await Z,P!==w.current)return;U=L()}else G=Z;A=G?[].concat(G).filter(Boolean):[],A.length>0?(U.valid=!1,U.customError=!0,N?.willValidate&&z(N,A.join(`
`))):A=pb(N)}O(U,A)}),R=$((S,T=!1)=>{if(v.clear(),w.current+=1,T)return;let P=u();P&&S!==""&&s?v.start(s,()=>{I(S)}):I(S,!P)}),C=zn.useCallback((S,T={})=>rt(f(T),c.valid===!1&&!c.disabled&&!S?{"aria-invalid":!0}:ze),[f,c.disabled,c.valid]);return zn.useMemo(()=>({getValidationProps:C,inputRef:g,registeredInputs:b,registerInput:x,getInputControl:h,commit:I,change:R}),[C,b,x,h,I,R])}import*as o0 from"react";function DC(e){let{change:t,commit:o,invalid:a,markedDirtyRef:r,name:n,setRegisteredFieldName:s,registeredFieldIdRef:l,setValidityData:i,validityData:c}=e,{formRef:u}=Ir(),d=o0.useRef(null),m=o0.useRef(null),p=o0.useRef(!1),f=$(()=>{let h=m.current;if(h)return h.getValue?h.getValue():h.value});function v(h){return h.value===void 0?f():h.value}let g=$(()=>{let h=m.current;if(r.current=!0,!h){o(c.value);return}o(v(h))});function b(){let h=m.current;!h||!h.id||u.current.fields.set(h.id,{getValue:f,name:n??h.name,controlRef:h.controlRef,validityData:oi(c,a),validate:g})}function w(h=m.current?.id){h&&u.current.fields.delete(h)}function y(h){if(p.current)return;p.current=!0;let I=v(h);i(R=>R.initialValue===I?R:{...R,initialValue:I})}_(()=>{let h=m.current;!h||!h.id||(s(n?void 0:h.name),u.current.fields.set(h.id,{getValue:f,name:n??h.name,controlRef:h.controlRef,validityData:oi(c,a),validate:g}))},[u,f,a,n,s,g,c]),_(()=>{let h=u.current.fields;return()=>{let I=m.current?.id;I&&h.delete(I)}},[u]);let x=$((h,I)=>{if(!I){d.current===h&&(d.current=null,t(void 0,!0),w(),m.current=null,s(void 0),l.current=void 0);return}let R=m.current?.id,C=d.current;C&&C!==h&&t(void 0,!0),d.current=h,m.current=I,n||s(I.name),l.current=I.id,R&&R!==I.id&&w(R),y(I),b()});return[g,x]}import{jsx as gb}from"react/jsx-runtime";var Yz=Wo.forwardRef(function(t,o){let{errors:a,validationMode:r,submitCountRef:n}=Ir(),{render:s,className:l,validate:i,validationDebounceTime:c=0,validationMode:u=r,name:d,disabled:m=!1,invalid:p,dirty:f,touched:v,actionsRef:g,style:b,...w}=t,y=Xf(!0)?.disabled,x=$(i||(()=>null)),h=y||m,[I,R]=Wo.useState(!1),[C,S]=Wo.useState(!1),[T,P]=Wo.useState(!1),[V,E]=Wo.useState(!1),z=Wo.useRef(void 0),M=f??C,O=v??I,H=Wo.useRef(M),k=Wo.useRef(void 0),[N,L]=Wo.useState(),U=d??N;_(()=>{f!==void 0&&(H.current=f)},[f]);let A=$(te=>{f===void 0&&(te&&(H.current=!0),S(te))}),ee=$(te=>{v===void 0&&R(te)}),B=$(()=>u==="onChange"||u==="onSubmit"&&n.current>0),Z=U&&Object.hasOwn(a,U)?a[U]:null,G=!!(Array.isArray(Z)?Z.length:Z),X=p===!0||G,[be,K]=Wo.useState({state:ti,error:"",errors:[],value:null,initialValue:null}),Y=!X&&(h?null:be.state.valid),j=Wo.useMemo(()=>({disabled:h,touched:O,dirty:M,valid:Y,filled:T,focused:V}),[h,O,M,Y,T,V]),se=NC({setValidityData:K,validate:x,validityData:be,validationDebounceTime:c,invalid:X,markedDirtyRef:H,state:j,shouldValidateOnChange:B,validationMode:u,registeredFieldIdRef:k}),[pe,oe]=DC({change:se.change,commit:se.commit,invalid:X,markedDirtyRef:H,name:d,setRegisteredFieldName:L,registeredFieldIdRef:k,setValidityData:K,validityData:be});Wo.useImperativeHandle(g,()=>({validate:pe}),[pe]);let Se=Wo.useMemo(()=>({invalid:X,name:U,validityData:be,setValidityData:K,disabled:h,setTouched:ee,setDirty:A,setFilled:P,setFocused:E,focusOwnerRef:z,validationMode:u,shouldValidateOnChange:B,state:j,registerFieldControl:oe,validation:se}),[X,U,be,h,ee,A,P,E,u,B,j,oe,se]),ie=ae("div",t,{ref:o,state:j,props:w,stateAttributesMapping:ma});return gb(cb.Provider,{value:Se,children:ie})}),FC=Wo.forwardRef(function(t,o){return gb(e0,{children:gb(Yz,{...t,ref:o})})});import*as au from"react";import*as a0 from"react";var hb=a0.createContext({disabled:!1});function fl(){return a0.useContext(hb)}var OC=au.forwardRef(function(t,o){let{render:a,className:r,style:n,id:s,nativeLabel:l=!0,...i}=t,c=Bo(!1),u=fl(),{labelId:d}=_o(),m={...c.state,disabled:c.disabled||u.disabled},p=au.useRef(null),f=AC({id:d??s,native:l});return ae("label",t,{ref:[o,p],state:m,props:[f,i],stateAttributesMapping:ma})});import*as ai from"react";import{jsx as HC}from"react/jsx-runtime";var Xz={...ma,...la},VC=ai.forwardRef(function(t,o){let{render:a,id:r,className:n,match:s,style:l,...i}=t,c=qe(r),{validityData:u,state:d,name:m}=Bo(!1),{setMessageIds:p}=_o(),{errors:f}=Ir(),v=m&&Object.hasOwn(f,m)?f[m]:null,g=!!(Array.isArray(v)?v.length:v),b=typeof s=="string",w=!1;s===!0?w=!0:d.disabled?w=!1:b?w=!!u.state[s]:w=g||u.state.valid===!1;let{mounted:y,transitionStatus:x,setMounted:h}=da(w);_(()=>{if(!(!w||!c))return p(O=>O.concat(c)),()=>{p(O=>O.filter(H=>H!==c))}},[w,c,p]);let I=ai.useRef(null),[R,C]=ai.useState(null),[S,T]=ai.useState(null),P=u.error;!b&&g?P=v:u.errors.length>1&&(P=u.errors);let V=P;Array.isArray(P)&&(V=P.length>1?HC("ul",{children:P.map(O=>HC("li",{children:O},O))}):P[0]);let E=Array.isArray(P)?JSON.stringify(P):P;w&&E!==S&&(T(E),C(V)),Oo({open:w,ref:I,onComplete(){w||h(!1)}});let z={...d,transitionStatus:x},M=ae("div",t,{ref:[o,I],state:z,props:[{id:c,children:w?V:R},i],stateAttributesMapping:Xz,enabled:y});return y?M:null});import*as BC from"react";var _C=BC.forwardRef(function(t,o){let{render:a,id:r,className:n,style:s,...l}=t,i=qe(r),c=Bo(!1),u=fl(),{setMessageIds:d}=_o(),m={...c.state,disabled:c.disabled||u.disabled};return _(()=>{if(i)return d(f=>f.concat(i)),()=>{d(f=>f.filter(v=>v!==i))}},[i,d]),ae("p",t,{ref:o,state:m,props:[{id:i},l],stateAttributesMapping:ma})});import*as s0 from"react";function r0(e,t,o){let{setFocused:a,focusOwnerRef:r}=Bo(),n=$(s=>{(s?!e:r.current===n)&&(r.current=s&&n,o?.(s),a(s))});return _(()=>{let s=t.current;return s?.getRootNode()?.activeElement===s&&n(!0),()=>n(!1)},[e,t,n]),n}function n0(e,t,o,a,r=!0,n){let{registerFieldControl:s}=Bo(),l=Ze(()=>Symbol());_(()=>{let i=l.current;if(!r){s(i,void 0);return}s(i,{controlRef:e,getValue:a,id:t,name:n,value:o})},[e,r,a,t,n,s,l,o]),_(()=>{let i=l.current;return()=>{s(i,void 0)}},[s,l])}import*as ZC from"react";function gl(e,t){let o=ZC.useRef(e),a=$(t);_(()=>{o.current!==e&&a(o.current),o.current=e},[e,a])}var GC=s0.forwardRef(function(t,o){let{render:a,className:r,id:n,name:s,value:l,disabled:i=!1,onValueChange:c,defaultValue:u,autoFocus:d=!1,style:m,...p}=t,{state:f,name:v,disabled:g,setTouched:b,setDirty:w,validityData:y,setFilled:x,validationMode:h,validation:I}=Bo(),{clearErrors:R,elementRef:C,submitCountRef:S}=Ir(),T=g||i,P=v??s,V={...f,disabled:T},{labelId:E}=_o(),z=t0({id:n}),M=l!==void 0,O=l==null?void 0:String(l),H=$(()=>I.inputRef.current?.value);n0(I.inputRef,z,O,H,!T,s),_(()=>{let A=O??I.inputRef.current?.value;A!==void 0&&x(A!=="")},[O,u,I.inputRef,x]),gl(O,()=>{O!==void 0&&(R(P),w(O!==(y.initialValue??"")),I.change(O))});let k=s0.useRef(null),N=r0(T,k),L=Qe();return ae("input",t,{ref:[o,k],state:V,props:[{id:z,disabled:T,name:P,ref:I.inputRef,"aria-labelledby":E,autoFocus:d,...M?{value:l}:{defaultValue:u},onChange(A){let ee=A.currentTarget.value,B=we(q.none,A.nativeEvent);c?.(ee,B),!M&&(w(ee!==(y.initialValue??"")),x(ee!==""),!A.nativeEvent.defaultPrevented&&!B.isCanceled&&(R(P),I.change(ee)))},onFocus(){N(!0)},onBlur(A){if(b(!0),N(!1),h==="onBlur"){let ee=A.currentTarget.value;I.commit(ee),M&&queueMicrotask(()=>{let B=I.inputRef.current?.value;B!==void 0&&B!==ee&&B!==(y.initialValue??"")&&I.commit(B)})}},onKeyDown(A){if(A.currentTarget.tagName==="INPUT"&&A.key==="Enter"){b(!0);let ee=A.currentTarget.value,B=A.currentTarget.form;if(B&&B===C.current&&!A.defaultPrevented){let Z=A.currentTarget,G=S.current;L.start(0,()=>{S.current===G&&I.commit(Z.value)})}else I.commit(ee)}}},p,A=>I.getValidationProps(T,A)],stateAttributesMapping:ma})});import*as ru from"react";import{jsx as Qz}from"react/jsx-runtime";var UC=function(t){let{children:o}=t,{validityData:a,invalid:r}=Bo(!1),n=ru.useMemo(()=>oi(a,r),[a,r]),s=n.state.valid===!1,{transitionStatus:l}=da(s),i=ru.useMemo(()=>({...n,validity:n.state,transitionStatus:l}),[n,l]);return Qz(ru.Fragment,{children:o(i)})};import*as i0 from"react";import{jsx as $C}from"react/jsx-runtime";var WC=i0.forwardRef(function(t,o){let{render:a,className:r,style:n,disabled:s=!1,...l}=t,{state:i,disabled:c}=Bo(!1),u=c||s,d={...i,disabled:u},m=i0.useMemo(()=>({disabled:u}),[u]),p=ae("div",t,{ref:o,state:d,props:l,stateAttributesMapping:ma});return $C(e0,{children:$C(hb.Provider,{value:m,children:p})})});import{jsx as Jz}from"react/jsx-runtime";var bb=qC.forwardRef(function(t,o){return Jz(l0.Control,{ref:o,...t})});import{useEffect as eL,useRef as jC,useState as KC}from"react";import{Fragment as oL,jsx as nu,jsxs as yb}from"react/jsx-runtime";async function tL(e){let t="",o=e.then(a=>(t=a,new Blob([a],{type:"text/plain"})));if(typeof ClipboardItem<"u"&&typeof navigator.clipboard?.write=="function")try{return await navigator.clipboard.write([new ClipboardItem({"text/plain":o})]),t}catch{}return t=await e,await navigator.clipboard.writeText(t),t}function c0({value:e,label:t,showLabel:o=!1,timeout:a=1600,onCopy:r,forceState:n,variant:s="ghost",size:l,className:i,...c}){let[u,d]=KC("idle"),[m,p]=KC(""),f=jC(void 0),v=jC(0);eL(()=>()=>{clearTimeout(f.current),cancelAnimationFrame(v.current)},[]);let g=n??u,b=I=>{cancelAnimationFrame(v.current),p(""),v.current=requestAnimationFrame(()=>p(I))},w=async()=>{clearTimeout(f.current);try{let I,R=typeof e=="function"?e():e;if(typeof R=="string")I=R,await navigator.clipboard.writeText(I);else{let C=tL(R);d("fetching"),I=await C}d("copied"),b(t?`${t} copied`:"Copied"),r?.(I)}catch{d("failed"),b("Could not copy. Select the text and copy it by hand.")}f.current=setTimeout(()=>{d("idle"),p("")},a)},y=l??(o?"sm":"icon-sm"),x=g==="copied"?Vs:g==="failed"?Gi:of,h=y==="sm"||y==="icon-sm"?12:y==="lg"||y==="icon-lg"?16:14;return yb(oL,{children:[yb($e,{"data-slot":"copy-button","data-state":g,variant:s,size:y,"aria-label":t?`Copy ${t}`:"Copy",pending:g==="fetching",onClick:w,className:i,...c,children:[nu(Ce,{icon:x,size:h}),o&&yb("span",{"aria-hidden":!0,className:"grid [grid-template-areas:'stack']",children:[nu("span",{className:F("[grid-area:stack]",g!=="idle"&&g!=="fetching"&&"invisible"),children:"Copy"}),nu("span",{className:F("[grid-area:stack]",g!=="copied"&&"invisible"),children:"Copied"}),nu("span",{className:F("[grid-area:stack]",g!=="failed"&&"invisible"),children:"Failed"})]})]}),nu("span",{role:"status","data-slot":"copy-button-status",className:"sr-only",children:m})]})}import{createContext as YC,useContext as aL,useEffect as ole,useState as ale}from"react";import{Fragment as mle,jsx as ule,jsxs as dle}from"react/jsx-runtime";var sle=YC(!1),rL=YC(!1);function XC(){return aL(rL)}var ile=["inline-flex w-fit max-w-full min-w-0 items-center gap-1.5 type-label text-text-1 select-none [overflow-wrap:anywhere]","[&_svg]:size-(--icon) [&_svg]:shrink-0 [&_svg]:text-text-3","group-data-disabled/field:cursor-not-allowed group-data-disabled/field:text-text-disabled"].join(" ");var lle=Ye("group/field flex w-full min-w-0",{variants:{orientation:{vertical:"flex-col gap-1.5",horizontal:["flex-row items-center gap-3 has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto *:data-[slot=field-label]:shrink-0","has-[>[data-slot=input]]:gap-4 has-[>[data-slot=input]]:*:data-[slot=field-label]:w-(--label-col) has-[>[data-slot=input]]:*:data-[slot=field-label]:flex-none has-[>[data-slot=input]]:*:data-[slot=input]:flex-1","has-[>[data-slot=textarea]]:items-start has-[>[data-slot=textarea]]:gap-4 has-[>[data-slot=textarea]]:*:data-[slot=field-label]:w-(--label-col) has-[>[data-slot=textarea]]:*:data-[slot=field-label]:flex-none has-[>[data-slot=textarea]]:*:data-[slot=field-label]:pt-1.5"].join(" "),responsive:["flex-col gap-1.5","@md/field-group:flex-row @md/field-group:items-center @md/field-group:gap-6","@md/field-group:*:data-[slot=field-label]:w-40 @md/field-group:*:data-[slot=field-label]:shrink-0 @md/field-group:*:data-[slot=field-content]:flex-auto"].join(" ")}},defaultVariants:{orientation:"vertical"}});import{useSyncExternalStore as nL}from"react";import{jsx as su,jsxs as dL}from"react/jsx-runtime";var sL=()=>()=>{},iL=()=>/Mac|iPhone|iPad/.test(navigator.platform||navigator.userAgent)?"mac":"other";function lL(){return nL(sL,iL,()=>"unknown")}var cL={mod:{mac:"⌘",other:"Ctrl",spoken:{mac:"Command",other:"Control"}},cmd:{mac:"⌘",other:"Win",spoken:{mac:"Command",other:"Windows"}},ctrl:{mac:"⌃",other:"Ctrl",spoken:{mac:"Control",other:"Control"}},shift:{mac:"⇧",other:"Shift",spoken:{mac:"Shift",other:"Shift"}},alt:{mac:"⌥",other:"Alt",spoken:{mac:"Option",other:"Alt"}},enter:{mac:"↵",other:"Enter",spoken:{mac:"Return",other:"Enter"}},esc:{mac:"Esc",other:"Esc",spoken:{mac:"Escape",other:"Escape"}},backspace:{mac:"⌫",other:"Backspace",spoken:{mac:"Delete",other:"Backspace"}},tab:{mac:"⇥",other:"Tab",spoken:{mac:"Tab",other:"Tab"}},space:{mac:"Space",other:"Space",spoken:{mac:"Space",other:"Space"}},up:{mac:"↑",other:"↑",spoken:{mac:"Up arrow",other:"Up arrow"}},down:{mac:"↓",other:"↓",spoken:{mac:"Down arrow",other:"Down arrow"}},left:{mac:"←",other:"←",spoken:{mac:"Left arrow",other:"Left arrow"}},right:{mac:"→",other:"→",spoken:{mac:"Right arrow",other:"Right arrow"}}};function QC(e,t){return e.split("+").map(o=>o.trim()).filter(Boolean).map(o=>{let a=cL[o.toLowerCase()],r=a?a[t]:o.length===1?o.toUpperCase():o;return{shown:r,spoken:a?a.spoken[t]:r}})}var wb=F("pointer-events-none inline-flex min-h-5 w-fit max-w-full min-w-5 items-center justify-center gap-1 rounded-tag border border-line-control bg-paper px-1 text-center","type-code-xs text-text-2 select-none [overflow-wrap:anywhere] [&_svg]:size-(--icon-sm) [&_svg]:shrink-0");function ri({className:e,keys:t,children:o,...a}){return t!==void 0?su(uL,{keys:t,className:e,...a}):su("kbd",{"data-slot":"kbd",className:F(wb,e),...a,children:o})}function uL({keys:e,className:t,...o}){let a=lL(),r=QC(e,a==="unknown"?"other":a),n=a==="unknown"?QC(e,"mac").map((s,l)=>s.shown===r[l].shown):null;return r.length?dL("kbd",{"data-slot":"kbd-group","data-platform":a==="unknown"?void 0:a,className:F("inline-flex max-w-full flex-wrap items-center gap-1 font-[inherit]",t),...o,children:[r.map((s,l)=>n&&!n[l]?su("kbd",{"data-slot":"kbd","data-placeholder":"","aria-hidden":!0,className:wb},l):su("kbd",{"data-slot":"kbd","aria-hidden":!0,className:wb,children:s.shown},l)),a!=="unknown"&&su("span",{className:"sr-only",children:r.map(s=>s.spoken).join(" ")})]}):null}import{jsx as gt,jsxs as h0}from"react/jsx-runtime";var cu=mL("default"),hL={sm:"[--input-h:var(--control-sm)] type-caption",default:"[--input-h:var(--control)] type-body-sm",lg:"[--input-h:var(--control-lg)] type-body"},bL={sm:"type-caption",default:"type-body-sm",lg:"type-body"},yL={sm:"type-code-xs",default:"type-code-sm",lg:"type-code"},tR={sm:"type-label-sm [&_svg]:size-(--icon-sm)",default:"type-label-sm [&_svg]:size-(--icon)",lg:"type-label [&_svg]:size-(--icon-lg)"};function d0(e){let t=XC();return!!e||t}function m0({size:e="default",disabled:t,readOnly:o,className:a,onPointerDown:r,children:n,...s}){let l=i=>{if(r?.(i),i.target.closest("button, a, input, textarea, [role=button]"))return;let c=i.currentTarget.querySelector("[data-control]");!c||t||(i.preventDefault(),c.focus())};return gt(cu.Provider,{value:e,children:gt("div",{"data-slot":"input","data-size":e,"data-disabled":t||void 0,"data-readonly":o||void 0,onPointerDown:l,className:F("field group/input w-full cursor-text [--field-h:max(var(--input-h),calc(1lh+var(--space-2)))]","[--action-h:calc(var(--input-h)-2*var(--shell-inset)-2*var(--line-width))]",hL[e],"data-readonly:cursor-default data-readonly:not-focus-within:border-line-faint data-disabled:cursor-not-allowed",a),...s,children:n})})}var oR="flex shrink-0 items-center gap-1 text-text-2 select-none [&_svg]:shrink-0 [&_svg]:text-text-3 group-data-disabled/input:text-text-disabled [unicode-bidi:plaintext]";function p0({className:e,...t}){let o=u0(cu);return gt("span",{"data-slot":"input-leading",className:F(oR,tR[o],"has-[>[data-slot=input-action]:first-child]:-ms-[calc(var(--space-3)-var(--shell-inset))]",e),...t})}function lu({className:e,...t}){let o=u0(cu);return gt("span",{"data-slot":"input-trailing",className:F(oR,tR[o],"has-[>[data-slot=input-action]:last-child]:-me-[calc(var(--space-3)-var(--shell-inset))]",e),...t})}function f0({className:e,mono:t,...o}){let a=u0(cu);return gt(bb,{"data-slot":"input-control","data-control":"",className:Et(["h-full w-full min-w-0 flex-1 truncate bg-transparent text-inherit",t?yL[a]:bL[a],"disabled:cursor-not-allowed read-only:cursor-default","file:me-2 file:cursor-pointer file:rounded-pill file:bg-field file:px-2 file:type-label-sm file:text-text-1","[&::-webkit-search-cancel-button]:appearance-none"],e),...o})}function aR({className:e,size:t="icon",variant:o="ghost",...a}){let r=u0(cu);return gt($e,{"data-slot":"input-action",variant:o,size:t==="icon"?"icon-sm":"sm",className:Et(["h-(--action-h)",t==="icon"?"w-(--action-h)":"px-2.5",r==="lg"?"type-label [&_svg]:size-(--icon)":"type-label-sm [&_svg]:size-(--icon-sm)"],e),...a})}function g0(e){let t={},o={};for(let[a,r]of Object.entries(e))(a.startsWith("data-force-")||a==="style"?t:o)[a]=r;return{box:t,rest:o}}function rR(e,t,o){let[a,r]=eR(t);return[e!==void 0?e:a,l=>{e===void 0&&r(l),o?.(l)}]}var wL=e=>e["aria-invalid"]===!0||e["aria-invalid"]==="true";function vb(e){switch(e.mode){case"password":return gt(xL,{...e});case"search":return gt(RL,{...e});case"copy":return gt(SL,{...e});default:return gt(vL,{...e})}}function vL({mode:e,size:t="default",leading:o,trailing:a,className:r,controlClassName:n,mono:s,disabled:l,readOnly:i,type:c="text",...u}){let d=d0(l),{box:m,rest:p}=g0(u);return h0(m0,{size:t,disabled:d,readOnly:i,className:r,"data-mode":"text","data-invalid":wL(p)||void 0,...m,children:[o!==void 0&&gt(p0,{children:o}),gt(f0,{type:c,disabled:d,readOnly:i,mono:s,className:n,...p}),a!==void 0&&gt(lu,{children:a})]})}function xL({mode:e,size:t="default",leading:o,trailing:a,className:r,controlClassName:n,mono:s,value:l,defaultValue:i="",onValueChange:c,onChange:u,defaultRevealed:d=!1,disabled:m,autoComplete:p,...f}){let v=d0(m),{box:g,rest:b}=g0(f),[w,y]=rR(l,i,c),[x,h]=eR(d);return h0(m0,{size:t,disabled:v,className:r,"data-mode":"password",...g,children:[o!==void 0&&gt(p0,{children:o}),gt(f0,{type:x?"text":"password",value:w,onChange:I=>{y(I.target.value),u?.(I)},disabled:v,autoComplete:p??"current-password",autoCapitalize:"off",spellCheck:!1,mono:x,className:n,...b}),gt(lu,{children:gt(aR,{disabled:v,"aria-pressed":x,"aria-label":x?"Hide password":"Show password",onClick:()=>h(I=>!I),children:gt(Ce,{icon:x?nf:sf})})})]})}var IL=e=>e instanceof HTMLElement&&(e.isContentEditable||["INPUT","TEXTAREA","SELECT"].includes(e.tagName)),iu=new Set;function JC(e){if(e.defaultPrevented||e.metaKey||e.ctrlKey||e.altKey||e.isComposing||IL(e.target)||e.target instanceof Element&&e.target.closest("[role=listbox], [role=option], [role=combobox], [role=tree], [role=grid]"))return;let t=e.target instanceof Element?e.target.closest("[role=dialog], [role=alertdialog], [role=menu]"):null,o=[...iu].filter(a=>a.key===e.key&&a.el()?.isConnected&&(!t||t.contains(a.el()))).map(a=>a.el()).sort((a,r)=>a.compareDocumentPosition(r)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1);o.length&&(e.preventDefault(),o[0].focus())}function CL(e){return iu.size||window.addEventListener("keydown",JC),iu.add(e),()=>{iu.delete(e),iu.size||window.removeEventListener("keydown",JC)}}function RL({mode:e,size:t="default",leading:o,trailing:a,className:r,controlClassName:n,mono:s,value:l,defaultValue:i="",onValueChange:c,onChange:u,shortcut:d,shortcutOwner:m=!0,clearLabel:p="Clear search",pending:f,disabled:v,onKeyDown:g,ref:b,...w}){let y=d0(v),{box:x,rest:h}=g0(w),[I,R]=rR(l,i,c),C=gL(null),S=fL(()=>Ra(C,b),[b]);return pL(()=>{if(!(!d||!m||y))return CL({el:()=>C.current,key:d})},[d,m,y]),h0(m0,{size:t,disabled:y,className:r,"data-mode":"search","data-pending":f||void 0,...x,children:[gt(p0,{children:f?gt(Ce,{icon:ln,className:"animate-spin motion-reduce:animate-none"}):gt(Ce,{icon:Zi})}),gt(f0,{ref:S,type:"search",value:I,disabled:y,onChange:T=>{R(T.target.value),u?.(T)},onKeyDown:T=>{g?.(T),!(T.key!=="Escape"||T.nativeEvent.isComposing)&&(I?(T.preventDefault(),T.stopPropagation(),R("")):C.current?.blur())},autoComplete:"off",spellCheck:!1,enterKeyHint:"search","aria-busy":f||void 0,className:n,...h}),I&&!y?gt(lu,{children:gt(aR,{"aria-label":p,onClick:()=>{R(""),C.current?.focus()},children:gt(Ce,{icon:tr})})}):d&&gt(lu,{"aria-hidden":!0,className:"pointer-coarse:hidden",children:gt(ri,{children:d})})]})}function SL({mode:e,size:t="default",leading:o,trailing:a,className:r,controlClassName:n,value:s,noun:l,onCopy:i,mono:c=!0,forceCopyState:u,disabled:d,...m}){let p=d0(d),{box:f,rest:v}=g0(m);return h0(m0,{size:t,disabled:p,readOnly:!0,className:r,"data-mode":"copy",...f,children:[o!==void 0&&gt(p0,{children:o}),gt(f0,{readOnly:!0,value:s,disabled:p,onFocus:g=>g.currentTarget.select(),mono:c,className:n,...v}),gt(lu,{children:gt(c0,{"data-slot":"input-action",value:s,label:l,onCopy:i,forceState:u,disabled:p||!s,size:"icon-sm",className:F("size-(--action-h)",t==="lg"?"[&_svg]:size-(--icon)":"[&_svg]:size-(--icon-sm)")})})]})}import{Fragment as Hle,jsx as Fle,jsxs as Ole}from"react/jsx-runtime";import{Fragment as ML,jsx as it,jsxs as Za}from"react/jsx-runtime";var xb=e=>e.toLocaleString("en-US"),EL=e=>Object.fromEntries(Object.entries(e??{}).filter(([,t])=>t!==void 0)),TL={shell:"shell command",off:"Composer is off",shellPlaceholder:"Run a shell command",shellStatus:"Shell. Escape to leave",attach:"Attach files",attachments:"Attachments",drop:"Drop to attach",undo:"Undo",cancel:"Cancel",files:"Files and resources",commands:"Commands",searchCommands:"Search commands",noMatches:e=>`No matches for "${e}"`,results:e=>`${e} ${e===1?"result":"results"}`,types:ul,waiting:e=>`Waiting for ${e} ${e===1?"upload":"uploads"}`,held:e=>`Waiting for ${e} ${e===1?"upload":"uploads"}. Sends when they finish`,failed:e=>e.length===1?`${e[0]} failed. Remove or retry it`:`${e.length} files failed. Remove or retry them`,notSent:e=>`${e}. Not sent.`,removed:e=>`Removed ${e}`,expanded:e=>`Expanded ${e.replace(/^Pasted /,"the paste of ")}`,pasted:(e,t)=>e>=ob?`Pasted ${e} lines`:`Pasted ${xb(t)} characters`,clickToExpand:"Click to expand",textOnly:"This prompt takes text only",acceptOnly:e=>`Only ${e} can be attached here`,notAttached:(e,t)=>`Not attached: ${e.join(", ")}.${t?` Accepts ${t}`:""}`,tooLong:(e,t)=>`Too long to paste: ${xb(e)} characters, ${xb(t)} fit. Attach it as a file.`,waitingOnYou:e=>`${e} ${e===1?"call":"calls"} waiting on you`,review:"Review"};function b0({ref:e,onSubmit:t,onValueChange:o,defaultValue:a,draftKey:r,placeholder:n="Ask the agent to do something",layout:s="stacked",status:l="ready",onStop:i,generation:c,disabled:u,disabledReason:d,disabledAction:m,mentions:p=[],commands:f=[],shell:v=!1,mode:g,onModeChange:b,attachments:w=[],onAttach:y,onRemoveAttachment:x,onRetryAttachment:h,accept:I,maxLength:R=1e5,voice:C,tools:S,meta:T,queue:P,onEditQueued:V,onSendQueuedNow:E,waitingCount:z=0,onReviewWaiting:M,label:O="Prompt",labels:H,className:k,...N}){let L={...H,...TL,...EL(H),types:{...ul,...H?.types}},U=Ve.useRef(L);U.current=L;let A=Ve.useRef(null),ee=Ve.useRef(null),B=Ve.useRef(null),Z=Ve.useRef(null),G=Ve.useRef(new Map),X=Ve.useRef(!1),be=Ve.useRef(null),K=Ve.useRef(0),Y=Ve.useRef([]),j=Ve.useRef(null),se=Ve.useRef(null),pe=Ve.useRef(null),[oe,Se]=Ve.useState(!0),[ie,te]=Ve.useState(!1),[fe,de]=Ve.useState(null),[ve,ge]=Ve.useState(0),[je,he]=Ve.useState("normal"),[le,W]=Ve.useState(!1),[Q,xe]=Ve.useState(null),[re,ce]=Ve.useState(!1),mt=Ve.useId(),st=Ve.useId(),Xe=Ve.useId(),Ue=g??je,pt=Ve.useRef(Ue);pt.current=Ue;let Zo=D=>{pt.current=D,g===void 0&&he(D),b?.(D)},bt=w.filter(D=>D.status==="uploading").length,Rt=l==="submitted"||l==="streaming"||l==="stopping",ba=bt?L.waiting(bt):void 0,Tt=w.filter(D=>D.status==="error"),Dt=Tt.length?L.failed(Tt.map(D=>D.name)):void 0,Aa=ba??Dt,ya=Ve.useRef(null),Vt=Ve.useRef(null);Ve.useLayoutEffect(()=>{let D=Vt.current;if(D===null)return;Vt.current=null;let J=document.activeElement;if(J&&J!==document.body&&J.isConnected&&!J.matches(":disabled"))return;let ne=ya.current?.querySelectorAll('[role="listitem"]')??[],me=ne[Math.min(D,ne.length-1)]?.querySelectorAll("button:not(:disabled)");(me?.length?me[me.length-1]:A.current)?.focus()},[w]),Ve.useEffect(()=>{Rt||(pe.current=null,W(!1))},[Rt]),Ve.useEffect(()=>{pe.current=null,W(!1)},[c]);let Xo=Ve.useCallback((D,J)=>xe({id:Date.now(),text:D,undo:J}),[]);Ve.useEffect(()=>{if(!Q)return;let D=setTimeout(()=>xe(J=>J?.id===Q.id?null:J),Q.undo?6e3:4e3);return()=>clearTimeout(D)},[Q]);let Sr=Ve.useCallback(D=>{let ne=ee.current?.querySelector(`[data-template="${D.type}"]`)?.cloneNode(!0)??document.createElement("span");ne.removeAttribute("data-template"),ne.removeAttribute("hidden"),ne.contentEditable="false",ne.dataset.mentionId=D.id,ne.dataset.mentionType=D.type,ne.dataset.mentionLabel=D.label,ne.setAttribute("aria-label",`${U.current.types[D.type]} ${D.label}`),D.type==="paste"&&(ne.title=`${(G.current.get(D.id)??"").slice(0,280)}

${U.current.clickToExpand}`);let me=ne.querySelector('[data-slot="mention-label"]')??ne;return me.textContent=`${D.type==="command"?"/":""}${D.label}`,ne},[]),We=Ve.useCallback(D=>{let J=document.createDocumentFragment();for(let ne of Uf(D))ne.kind==="text"?J.append(document.createTextNode(ne.text)):(ne.mention.type!=="paste"||G.current.has(ne.mention.id))&&J.append(Sr(ne.mention));return J},[Sr]),Mt=Ve.useCallback(()=>{let{text:D,serialized:J,codec:ne,mentions:me}=ml(A.current??document.createElement("div"),G.current);return{text:D.replace(/\s+$/,""),serialized:J.replace(/\s+$/,""),codec:ne,mentions:me,mode:pt.current}},[]),Ee=Ve.useCallback(D=>{r&&(se.current&&clearTimeout(se.current),se.current=setTimeout(()=>{se.current=null;try{let J=dl+r;D.trim()?localStorage.setItem(J,JSON.stringify({codec:D,mode:pt.current,pastes:[...G.current]})):localStorage.removeItem(J)}catch{}},200))},[r]),Me=Ve.useCallback(()=>{K.current+=1,xe(me=>me?.undo?null:me);let D=Mt();Se(!D.text.trim()&&D.mentions.length===0),Ee(D.codec);let{codec:J,...ne}=D;o?.(ne)},[Mt,o,Ee]),ot=Ve.useCallback(D=>{let J=A.current;if(!J)return;let ne=window.getSelection(),me;ne?.rangeCount&&J.contains(ne.getRangeAt(0).commonAncestorContainer)?me=ne.getRangeAt(0):j.current&&J.contains(j.current.commonAncestorContainer)?me=j.current:(me=document.createRange(),me.selectNodeContents(J),me.collapse(!1));let ct=D.lastChild;me.deleteContents(),me.insertNode(D),ct&&(me.setStartAfter(ct),me.collapse(!0),ne?.removeAllRanges(),ne?.addRange(me)),Me()},[Me]),Lt=Ve.useCallback(()=>{A.current?.replaceChildren(),G.current.clear(),Y.current=[],de(null),se.current&&(clearTimeout(se.current),se.current=null);try{r&&localStorage.removeItem(dl+r)}catch{}K.current+=1,Se(!0),ce(!1),o?.({text:"",serialized:"",mentions:[],mode:Ue})},[r,Ue,o]);Ve.useImperativeHandle(e,()=>({focus:()=>A.current?.focus(),clear:Lt,insert:D=>{A.current?.focus(),ot(We(D))},getValue:()=>{let{codec:D,...J}=Mt();return J}}),[Lt,We,ot,Mt]),Ve.useEffect(()=>{let D=A.current;if(!D)return;let J=a;try{let ne=r?localStorage.getItem(dl+r):null;if(ne){let me=JSON.parse(ne);typeof me.codec=="string"&&(J=me.codec);for(let[ct,nt]of me.pastes??[])G.current.set(ct,nt);me.mode==="shell"&&v&&Zo("shell")}}catch{try{r&&localStorage.removeItem(dl+r)}catch{}}J&&(D.replaceChildren(We(J)),Me())},[]),Ve.useEffect(()=>()=>{if(!(!se.current||!r||!A.current)){clearTimeout(se.current);try{let{codec:D}=ml(A.current,G.current);D.trim()&&localStorage.setItem(dl+r,JSON.stringify({codec:D,mode:pt.current,pastes:[...G.current]}))}catch{}}},[r]);let wa=D=>{let J=D.parentNode,ne=D.nextSibling;if(!J)return;let me=D.dataset.mentionLabel??"chip",ct=D.previousSibling,nt=D.nextSibling,ut=null;ct instanceof Text&&nt instanceof Text&&ct.data.endsWith(" ")&&nt.data.startsWith(" ")&&(ut={node:nt,text:nt.data},nt.data=nt.data.slice(1)),D.remove(),ne&&ne.parentNode===J?pl("before",ne):lb(J),Me();let St=K.current,ur=()=>{ut&&(ut.node.data=ut.text),ne&&ne.parentNode===J?J.insertBefore(D,ne):J.appendChild(D),pl("after",D),Me(),xe(null)};Y.current.push({version:St,restore:ur}),Xo(L.removed(me),ur)},za=()=>{let D=Y.current.at(-1);return!D||D.version!==K.current?(Y.current=[],!1):(Y.current.pop(),D.restore(),!0)},yt=Ve.useMemo(()=>{if(!fe)return[];let D=fe.query.toLowerCase(),J=ne=>IC(ne,D);return fe.kind==="@"?p.filter(ne=>ne.label.toLowerCase().includes(D)).sort((ne,me)=>J(ne.label)-J(me.label)).slice(0,8).map(ne=>({key:`${ne.type}:${ne.id}`,mention:{id:ne.id,type:ne.type,label:ne.label},detail:ne.detail})):f.filter(ne=>ne.label.toLowerCase().includes(D)).sort((ne,me)=>J(ne.label)-J(me.label)).slice(0,8).map(ne=>({key:`command:${ne.id}`,mention:{id:ne.id,type:"command",label:ne.label},description:ne.description}))},[fe,p,f]),Qo=Ve.useCallback(()=>{let D=A.current,J=window.getSelection();X.current||de(ne=>{if(ne?.kind==="commands")return ne;if(!D||!J?.rangeCount||!J.isCollapsed||Ue==="shell")return null;let me=J.anchorNode;if(!(me instanceof Text)||!D.contains(me))return null;let ct=me.data.slice(0,J.anchorOffset),nt=ct.match(/(?:^|[\s ])([@/])([^\s@/]{0,40})$/),ut=nt?.[1];if(!nt||!ut||ut==="@"&&!p.length)return null;if(ut==="/"){let f1=ml(D,G.current).codec.trim();if(!f.length||!/^\/[^\s@/]*$/.test(f1))return null}let St=ct.length-nt[2].length-1;if(be.current?.node===me&&be.current.start===St)return null;let ur=document.createRange();ur.setStart(me,St),ur.setEnd(me,St+1);let xi=ur.getBoundingClientRect();return!xi.width&&!xi.height&&(xi=D.getBoundingClientRect()),(!ne||ne.node!==me||ne.start!==St||ne.kind!==ut)&&ge(0),{kind:ut,query:nt[2],node:me,start:St,rect:xi}})},[p.length,f.length,Ue]),$r=()=>{let D=A.current;if(!D||!f.length)return;let J=window.getSelection();J?.rangeCount&&D.contains(J.anchorNode)&&(j.current=J.getRangeAt(0).cloneRange()),ge(0),de({kind:"commands",query:"",node:null,start:0,rect:D.getBoundingClientRect()}),requestAnimationFrame(()=>Z.current?.focus())},Er=(D=!1)=>{fe?.node&&(be.current={node:fe.node,start:fe.start});let J=fe?.kind==="commands";de(null),(D||J)&&(A.current?.focus(),j.current&&(window.getSelection()?.removeAllRanges(),window.getSelection()?.addRange(j.current)))},cr=D=>{let J=A.current;if(!fe||!J)return;let ne=ml(J,G.current).mentions,me={...D.mention,label:D.mention.type==="command"?D.mention.label:dC(D.mention,ne)},ct=Sr(me),nt=document.createTextNode(" ");if(fe.kind==="commands"){J.prepend(ct,nt),de(null),J.focus(),lb(J),j.current=null,Me();return}let ut=window.getSelection();if(!fe.node||!ut)return;let St=document.createRange();St.setStart(fe.node,fe.start),St.setEnd(fe.node,Math.min(fe.node.length,ut.anchorNode===fe.node?ut.anchorOffset:fe.start+1+fe.query.length)),St.deleteContents(),St.insertNode(nt),St.insertNode(ct),St.setStart(nt,1),St.collapse(!0),ut.removeAllRanges(),ut.addRange(St),de(null),Me()},Tr=!!fe;Ve.useEffect(()=>{if(!Tr)return;let D=()=>{if(fe?.kind==="commands"){let J=A.current?.getBoundingClientRect();J&&de(ne=>ne&&{...ne,rect:J})}else Qo()};return window.addEventListener("resize",D),window.addEventListener("scroll",D,!0),()=>{window.removeEventListener("resize",D),window.removeEventListener("scroll",D,!0)}},[Tr,fe?.kind,Qo]);let xs=w.some(D=>D.status==="done"),Vn=!u&&!bt&&!Tt.length&&(!oe||xs),yi=()=>{if(u)return;if(Tt.length){Xo(L.notSent(Dt));return}if(bt){(!oe||xs)&&ce(!0);return}if(!Vn)return;let{codec:D,...J}=Mt();t?.(J,w.filter(ne=>ne.status==="done")),Lt(),Ue==="shell"&&Zo("normal")};Ve.useEffect(()=>{if(re){if(u){ce(!1);return}if(Tt.length){ce(!1),Xo(L.notSent(Dt));return}bt||(ce(!1),yi())}});let Bn=()=>{let D=c??"current";pe.current!==D&&(pe.current=D,W(!0),i?.(c))},Wr=D=>{D.preventDefault(),D.stopPropagation(),D.nativeEvent.stopImmediatePropagation()},wi=D=>{if(!Wf(D)){if(fe&&fe.kind!=="commands"){let J=yt.length,ne=D.key==="ArrowDown"||D.ctrlKey&&D.key==="n",me=D.key==="ArrowUp"||D.ctrlKey&&D.key==="p";if(ne&&J){D.preventDefault(),ge(ct=>(ct+1)%J);return}if(me&&J){D.preventDefault(),ge(ct=>(ct-1+J)%J);return}if((D.key==="Enter"||D.key==="Tab")&&J){D.preventDefault(),cr(yt[Math.min(ve,J-1)]);return}if(D.key==="Escape"){Wr(D),Er();return}}if((D.metaKey||D.ctrlKey)&&!D.shiftKey&&D.key.toLowerCase()==="z"&&za()){D.preventDefault();return}if(D.key==="Escape"){if(Ue==="shell"){Wr(D),Zo("normal");return}if(re){Wr(D),ce(!1);return}if(Rt){Wr(D),Bn();return}D.preventDefault(),A.current?.blur();return}if(D.key==="Enter"&&!D.shiftKey){if(D.preventDefault(),D.repeat)return;if(oe&&!xs&&Rt&&E){E();return}yi();return}if(D.key==="Enter"&&D.shiftKey){D.preventDefault(),document.execCommand("insertLineBreak")||ot(We(`
`));return}if(D.key==="ArrowUp"&&oe&&!w.length&&V&&!D.altKey&&!D.metaKey&&V()){D.preventDefault();return}if(D.key==="Backspace"&&!D.metaKey&&!D.altKey){if(oe&&Ue==="shell"){D.preventDefault(),Zo("normal");return}let J=jf(A.current,"back");if(J){D.preventDefault(),wa(J);return}}if(D.key==="Delete"){let J=jf(A.current,"forward");if(J){D.preventDefault(),wa(J);return}}if((D.key==="ArrowLeft"||D.key==="ArrowRight")&&!D.shiftKey&&!D.altKey&&!D.metaKey){let J=getComputedStyle(A.current).direction==="rtl",ne=D.key==="ArrowLeft"!==J,me=jf(A.current,ne?"back":"forward");if(me){D.preventDefault(),pl(ne?"before":"after",me);return}}if(D.key==="!"&&v&&Ue==="normal"&&oe){D.preventDefault(),Zo("shell");return}if(D.key==="/"&&!oe&&f.length&&Ue==="normal"){let J=window.getSelection(),ne=A.current;if(J?.rangeCount&&ne){let me=document.createRange();me.setStart(ne,0),me.setEnd(J.anchorNode,J.anchorOffset),!me.toString().trim()&&!me.cloneContents().querySelector("[data-mention-id]")&&(D.preventDefault(),$r())}}}},qr=(D,J=!1)=>{let ne=window.getSelection();if(!ne?.rangeCount||ne.isCollapsed)return;let me=ne.getRangeAt(0),ct=document.createElement("div");ct.append(me.cloneContents());let{serialized:nt,codec:ut}=ml(ct,G.current),St=[...G.current].filter(([ur])=>ut.includes(`(paste:${J2(ur)})`));D.preventDefault(),D.clipboardData.setData("text/plain",nt),D.clipboardData.setData(tb,JSON.stringify({codec:ut,pastes:St})),J&&(me.deleteContents(),Me())},_l=D=>{if(!D.length)return;if(!y){Xo(L.textOnly);return}let J=D.filter(me=>qf(me,I)),ne=D.filter(me=>!qf(me,I));ne.length&&Xo(L.notAttached(ne.map(me=>me.name),I)),J.length&&y(J)},p1=D=>{D.preventDefault();let J=Array.from(D.clipboardData.files);_l(J);let ne=D.clipboardData.getData(tb);if(ne)try{let{codec:nt,pastes:ut}=JSON.parse(ne);for(let[St,ur]of ut??[])G.current.set(St,ur);ot(We(nt));return}catch{}let me=D.clipboardData.getData("text/plain").replace(/\r\n?/g,`
`);if(!me)return;let ct=Mt().text.length;if(ct+me.length>R){Xo(L.tooLong(me.length,Math.max(0,R-ct)));return}if(Ue!=="shell"&&(ab(me)>=ob||me.length>=gC)&&!Uf(me).some(nt=>nt.kind==="mention")){let nt=`p${Date.now().toString(36)}${G.current.size}`;G.current.set(nt,me);let ut=document.createDocumentFragment();ut.append(Sr({id:nt,type:"paste",label:L.pasted(ab(me),me.length)}),document.createTextNode(" ")),ot(ut);return}if(Uf(me).some(nt=>nt.kind==="mention")){ot(We(me));return}if(!document.execCommand("insertText",!1,me)){let nt=document.createDocumentFragment();nt.append(me),ot(nt)}},Is=D=>{let J=D.target.closest('[data-mention-type="paste"]');if(J&&A.current?.contains(J)){let ne=G.current.get(J.dataset.mentionId??"")??"",me=document.createTextNode(ne);J.replaceWith(me),pl("after",me),Me();let ct=()=>{me.parentNode&&(me.replaceWith(J),pl("after",J),Me(),xe(null))};Y.current.push({version:K.current,restore:ct}),Xo(L.expanded(J.dataset.mentionLabel??""),ct);return}Qo()},{dragging:jr,dropProps:Zl}=bC(!!y&&!u,D=>_l(D),I),Ku=u?"disabled":Ue==="shell"?"shell":Rt?"working":bt?"uploading":Tt.length?"blocked":oe?"empty":"typing",Gl=z>0?L.waitingOnYou(z):void 0,va=Q?.text??(Ue==="shell"?L.shellStatus:re&&bt?L.held(bt):Aa??Gl),Ul=!!Gl&&va===Gl,$l=Rt&&le?"stopping":l,_n=s==="inline",qa=Ue==="shell",Yu=y&&Za(ML,{children:[it($e,{size:"icon-sm",variant:"ghost","aria-label":L.attach,disabled:u,onClick:()=>B.current?.click(),children:it(Ce,{icon:Hs,size:12})}),it("input",{ref:B,type:"file",multiple:!0,hidden:!0,accept:I,tabIndex:-1,onChange:D=>{_l(Array.from(D.target.files??[])),D.target.value=""}})]}),Xu=Za("p",{id:Xe,role:"status","data-slot":"prompt-input-status",className:F("flex min-w-0 items-center gap-1.5 type-caption text-text-2 empty:hidden",!_n&&"order-last basis-full px-2 @sm/prompt-toolbar:order-none @sm/prompt-toolbar:basis-auto @sm/prompt-toolbar:shrink",_n&&"flex-1",!va&&"hidden",Ul&&"text-text-1",!!Dt&&va===Dt&&"text-fail-text"),children:[qa&&!Q&&it(Ce,{icon:H6,size:12,className:"shrink-0"}),va&&it("span",{className:"min-w-0 truncate",title:va,children:va}),Ul&&M&&it($e,{variant:"ghost",size:"sm","data-slot":"prompt-input-review",onClick:M,children:L.review}),Q?.undo&&it($e,{variant:"ghost",size:"sm",onClick:Q.undo,children:L.undo}),!Q&&re&&ba&&it($e,{variant:"ghost",size:"sm","data-slot":"prompt-input-cancel-held",onClick:()=>{ce(!1),A.current?.focus()},children:L.cancel})]}),Wl=it(fC,{status:$l,generation:c,empty:!Vn&&!Aa,blockedReason:u?void 0:Aa,disabled:u,onStop:Bn,onClick:yi,type:"button",labels:L}),ql=D=>it("div",{inert:qa,"data-slot":"prompt-input-tools",className:F("flex min-w-0 items-center gap-1 empty:hidden",qa&&"opacity-40",D),children:S}),vi=Za("div",{className:"relative min-w-0 flex-1",children:[oe&&it("span",{"aria-hidden":!0,"data-slot":"prompt-input-placeholder",className:F("pointer-events-none absolute inset-x-0 top-0 truncate text-text-3 select-none",qa?"type-code":"type-body"),children:u?L.off:qa?L.shellPlaceholder:n}),it("div",{ref:A,role:"textbox","aria-multiline":!0,"aria-haspopup":"listbox","aria-autocomplete":"list","aria-label":qa?`${O}, ${L.shell}`:O,"aria-placeholder":n,"aria-disabled":u||void 0,"aria-describedby":[u&&d?st:"",va?Xe:""].filter(Boolean).join(" ")||void 0,"aria-controls":fe&&fe.kind!=="commands"?mt:void 0,"aria-activedescendant":fe&&fe.kind!=="commands"&&yt.length?`${mt}-${Math.min(ve,yt.length-1)}`:void 0,"aria-keyshortcuts":"Enter Shift+Enter Escape",contentEditable:!u,suppressContentEditableWarning:!0,tabIndex:u?-1:0,spellCheck:!qa,autoCapitalize:qa?"off":void 0,autoCorrect:qa?"off":void 0,"data-slot":"prompt-input-editor","data-control":"",onInput:()=>{Me(),Qo()},onKeyDown:wi,onKeyUp:D=>{(!["ArrowDown","ArrowUp","Enter","Tab","Escape"].includes(D.key)||!fe)&&Qo()},onClick:Is,onCompositionStart:()=>{X.current=!0},onCompositionEnd:()=>{X.current=!1,Qo()},onFocus:()=>te(!0),onBlur:D=>{te(!1),fe?.kind!=="commands"&&!D.relatedTarget?.closest('[data-slot="prompt-input-menu"]')&&de(null)},onCopy:D=>qr(D),onCut:D=>qr(D,!0),onPaste:p1,className:F(_n?"max-h-40":"max-h-60 min-h-11","overflow-y-auto overscroll-contain break-words whitespace-pre-wrap text-text-1 outline-none",qa?"type-code":"type-body","[&_[data-slot=mention]]:mx-px [&_[data-mention-type=paste]]:cursor-pointer",u&&"cursor-not-allowed text-text-disabled")})]}),Ne=qa&&it("span",{"aria-hidden":!0,"data-slot":"prompt-input-shell",className:"type-code text-text-3 select-none",children:"$"});return Za("div",{"data-slot":"prompt-input","data-state":Ku,"data-mode":Ue,"data-layout":s,"data-held":re||void 0,"data-dragging":jr||void 0,"data-focused":ie||void 0,className:F("group/prompt shell relative w-full text-text-1 forced-colors:border-[CanvasText]",k),...Zl,...N,children:[it("div",{ref:ee,hidden:!0,"aria-hidden":!0,children:Object.keys(ul).map(D=>it(mC,{type:D,"data-template":D,className:"mx-px",children:"x"},D))}),P&&it("div",{"data-slot":"prompt-input-queue",className:"mb-(--shell-inset) min-w-0 empty:hidden",children:P}),Za("div",{"data-slot":"prompt-input-panel",className:F("panel relative flex min-w-0 flex-col transition-[border-color,background-color] duration-(--dur-state) ease-out","group-data-focused/prompt:border-line-focus group-data-force-focus/prompt:border-line-focus group-data-[mode=shell]/prompt:bg-field group-data-[state=disabled]/prompt:bg-field","forced-colors:border-[CanvasText]"),children:[u&&d&&Za("div",{id:st,"data-slot":"prompt-input-reason",className:"flex min-h-(--row) flex-wrap items-center gap-x-3 gap-y-1 py-1 ps-3 pe-1 rule-row",children:[it("span",{className:"min-w-0 flex-1 type-body-sm break-words text-text-1",children:d}),it("span",{className:"ms-auto empty:hidden",children:m})]}),w.length>0&&it("div",{ref:ya,"data-slot":"prompt-input-attachments",role:"list","aria-label":L.attachments,className:"flex flex-wrap gap-1.5 p-1.5 rule-row",children:w.map((D,J)=>it("div",{role:"listitem",className:"max-w-full min-w-0",children:it(yC,{attachment:D,labels:L,onRemove:x?()=>{Vt.current=J,x(D.id)}:void 0,onRetry:h?()=>{Vt.current=J,h(D.id)}:void 0})},D.id))}),_n&&it("div",{className:F("flex min-h-(--control-sm) items-center px-3 rule-row",!va&&"hidden"),children:Xu}),_n?Za("div",{"data-slot":"prompt-input-body",className:"@container/prompt-toolbar flex min-w-0 items-end gap-1 p-1",children:[Yu,Za("div",{className:"flex min-h-(--control-sm) min-w-0 flex-1 items-center gap-1.5 px-1.5",children:[Ne,vi]}),ql("h-(--control-sm) shrink-0"),T&&it("div",{"data-slot":"prompt-input-meta",className:"flex h-(--control-sm) shrink-0 items-center",children:T}),C&&it(nb,{size:"sm",...C,disabled:u||C.disabled}),Wl]}):Za("div",{"data-slot":"prompt-input-body",className:"flex min-w-0 gap-1.5 px-3 pt-2.5 pb-2",children:[Ne,vi]})]}),!_n&&Za("div",{"data-slot":"prompt-input-toolbar",className:"@container/prompt-toolbar flex min-h-(--control-sm) min-w-0 flex-wrap items-center gap-1 pt-(--shell-inset)",children:[Yu,ql("flex-1 basis-0 overflow-x-auto [scrollbar-width:none]"),!S&&it("span",{"aria-hidden":!0,className:"flex-1"}),Xu,Za("div",{className:"ms-auto flex shrink-0 items-center gap-1",children:[T&&it("div",{"data-slot":"prompt-input-meta",className:"shrink-0",children:T}),C&&it(nb,{size:"sm",...C,disabled:u||C.disabled}),Wl]})]}),jr&&Za("div",{"data-slot":"prompt-input-drop","data-status":jr==="reject"?"fail":void 0,"aria-hidden":!0,className:"pointer-events-none absolute inset-0 z-(--z-raised) flex flex-col items-start gap-1 rounded-shell border border-line-focus bg-paper px-4 py-3 data-[status=fail]:border-fail data-[status=fail]:bg-fail-tint",children:[it("span",{className:"type-label text-text-1",children:L.drop}),jr==="reject"&&it("span",{className:"type-body-sm text-fail-text",children:I?L.acceptOnly(cC(I)):L.textOnly})]}),it("span",{className:"sr-only","aria-live":"polite",children:fe?L.results(yt.length):""}),fe&&it(CC,{id:mt,menu:fe,options:yt,active:Math.min(ve,Math.max(0,yt.length-1)),onHover:ge,onPick:cr,title:fe.kind==="@"?L.files:L.commands,empty:L.noMatches(fe.query),typeLabel:D=>L.types[D.mention.type],search:fe.kind==="commands"&&Za("label",{className:"flex min-h-(--control) items-center gap-2 px-3 text-text-3 rule-row has-[input:focus-visible]:text-text-2",children:[it(Ce,{icon:Zi,size:14}),it("input",{ref:Z,role:"combobox","aria-expanded":!0,"aria-controls":mt,"aria-activedescendant":yt.length?`${mt}-${Math.min(ve,yt.length-1)}`:void 0,"aria-label":L.searchCommands,placeholder:L.searchCommands,"data-control":"",value:fe.query,onChange:D=>{ge(0),de(J=>J&&{...J,query:D.target.value})},onBlur:D=>{D.relatedTarget?.closest('[data-slot="prompt-input-menu"]')||de(null)},onKeyDown:D=>{if(Wf(D))return;let J=yt.length;D.key==="ArrowDown"&&J&&(D.preventDefault(),ge(ne=>(ne+1)%J)),D.key==="ArrowUp"&&J&&(D.preventDefault(),ge(ne=>(ne-1+J)%J)),(D.key==="Enter"||D.key==="Tab")&&J&&(D.preventDefault(),cr(yt[Math.min(ve,J-1)])),D.key==="Escape"&&(Wr(D),Er(!0))},className:"h-(--control) min-w-0 flex-1 bg-transparent type-body-sm text-text-1 outline-none placeholder:text-text-3"})]})})]})}function nR({model:e,children:t,className:o,...a}){return Za($e,{"data-slot":"prompt-input-model",variant:"ghost",size:"sm","aria-label":`Model, ${e}`,className:F("gap-1 text-text-2",o),...a,children:[t??e,it(Ce,{icon:b6,size:12})]})}import{Fragment as v0,memo as GL,useEffect as Tb,useMemo as UL,useRef as x0,useState as gR}from"react";import{useEffect as PL,useRef as kL,useState as Eb}from"react";import{Fragment as y0,jsx as lt,jsxs as cs}from"react/jsx-runtime";var Ib="as async await break case catch class const continue default delete do else enum export extends false finally for from function if import in instanceof interface let new null of return static super switch this throw true try type typeof undefined var void while yield",AL={ts:{line:"//",block:["/*","*/"],quotes:"'\"`",multi:"`",keywords:new Set(Ib.split(" ")),word:/^[A-Za-z_$][\w$]*/},tsx:{line:"//",block:["/*","*/"],quotes:"'\"`",multi:"`",keywords:new Set(Ib.split(" ")),word:/^[A-Za-z_$][\w$]*/},js:{line:"//",block:["/*","*/"],quotes:"'\"`",multi:"`",keywords:new Set(Ib.split(" ")),word:/^[A-Za-z_$][\w$]*/},json:{quotes:'"',keywords:new Set(["true","false","null"]),word:/^[A-Za-z_]\w*/},bash:{line:"#",quotes:`'"`,keywords:new Set("if then else elif fi for while do done case esac in function export local return".split(" ")),word:/^[A-Za-z_./@~-][\w./@~:=-]*/},python:{line:"#",quotes:`'"`,keywords:new Set("and as assert async await break class continue def del elif else except False finally for from global if import in is lambda None nonlocal not or pass raise return True try while with yield".split(" ")),word:/^[A-Za-z_]\w*/},yaml:{line:"#",quotes:`'"`,keywords:new Set(["true","false","null","yes","no"]),word:/^[A-Za-z_][\w.-]*/},text:{quotes:"",keywords:new Set,word:/^\S+/}};function zL(e,t,o){let a=AL[t],r=[],n=(l,i)=>{let c=r[r.length-1];c&&c.type===l?c.value+=i:r.push({type:l,value:i})},s=0;for(;s<e.length;){let l=e.slice(s);if(o.block&&a.block){let u=l.indexOf(a.block[1]);if(u<0){n("comment",l);break}n("comment",l.slice(0,u+a.block[1].length)),s+=u+a.block[1].length,o.block=!1;continue}if(o.quote){let u=0;for(;u<l.length&&l[u]!==o.quote;)u+=l[u]==="\\"?2:1;if(u>=l.length){n("string",l);break}n("string",l.slice(0,u+1)),s+=u+1,o.quote=void 0;continue}if(a.line&&l.startsWith(a.line)&&(a.line!=="#"||s===0||/\s/.test(e[s-1]))){n("comment",l);break}if(a.block&&l.startsWith(a.block[0])){o.block=!0,n("comment",a.block[0]),s+=a.block[0].length;continue}let i=e[s];if(a.quotes.includes(i)){let u=1;for(;u<l.length&&l[u]!==i;)u+=l[u]==="\\"?2:1;if(u>=l.length&&a.multi?.includes(i)){o.quote=i,n("string",l);break}let d=l.slice(0,u+1);s+=d.length,n((t==="json"||t==="yaml")&&/^\s*:/.test(e.slice(s))?"key":"string",d);continue}if(/\s/.test(i)){let u=l.match(/^\s+/)[0];n("plain",u),s+=u.length;continue}if(t!=="text"&&/\d/.test(i)&&!/[\w$]/.test(e[s-1]??"")){let u=l.match(/^\d[\d_.xXa-fA-FeEn]*/)[0];n("number",u),s+=u.length;continue}let c=l.match(a.word);if(c){let u=c[0];s+=u.length,t==="yaml"&&/^\s*:/.test(e.slice(s))&&!e.slice(0,s-u.length).trim().replace(/^-\s*/,"")?n("key",u):n(a.keywords.has(u)?"keyword":"plain",u);continue}n(t==="text"?"plain":"punct",i),s+=1}return r}function Cb(e,t="text"){let o={};return e.split(`
`).map(a=>zL(a,t,o))}var LL={plain:"text-text-1",key:"text-text-1",number:"text-text-1",string:"text-text-1",keyword:"text-text-1 font-semibold",punct:"text-text-2",comment:"text-text-2"},NL="rounded-tag bg-pressed text-text-1",DL="rounded-tag bg-ink text-text-inverse";function FL(e,t,o,a){let r=t+e.length,n=[],s=t;return o.forEach(([l,i],c)=>{if(i<=t||l>=r)return;let u=Math.max(l,t),d=Math.min(i,r);u>s&&n.push(e.slice(s-t,u-t)),n.push(lt("mark",{"data-current":c===a||void 0,className:c===a?DL:NL,children:e.slice(u-t,d-t)},c)),s=d}),s<r&&n.push(e.slice(s-t)),n}function Rb({tokens:e,marks:t,current:o}){if(!e.length)return lt(y0,{children:`
`});let a=0;return lt(y0,{children:e.map((r,n)=>{let s=a;return a+=r.value.length,lt("span",{className:LL[r.type],children:t?.length?FL(r.value,s,t,o):r.value},n)})})}function OL(e){if(!e)return new Set;if(Array.isArray(e))return new Set(e);let t=new Set;for(let o of e.split(",")){let[a,r]=o.trim().split("-").map(Number);if(a)for(let n=a;n<=(r||a);n++)t.add(n)}return t}var sR={ts:"TypeScript",tsx:"TSX",js:"JavaScript",json:"JSON",bash:"Shell",python:"Python",yaml:"YAML",text:"Text"};function Sb({text:e,label:t="Copy code",onCopy:o,className:a}){let[r,n]=Eb("idle"),s=kL(void 0);return PL(()=>()=>clearTimeout(s.current),[]),cs(y0,{children:[lt($e,{"data-slot":"code-copy",variant:"ghost",size:"icon-sm","aria-label":t,onClick:async()=>{let i=typeof e=="function"?e():e;clearTimeout(s.current);try{await navigator.clipboard.writeText(i),n("copied"),o?.(i)}catch{n("failed")}s.current=setTimeout(()=>n("idle"),1600)},className:a,children:lt(Ce,{icon:r==="copied"?Vs:of,size:12})}),lt("span",{role:"status",className:"sr-only",children:r==="copied"?"Copied":r==="failed"?"Copy failed":""})]})}function HL(e){return e.length<=12?"•".repeat(e.length):e.slice(0,8)+"•".repeat(e.length-12)+e.slice(-4)}function VL({line:e,secret:t,revealed:o}){if(!t||o||!e.includes(t))return lt(Rb,{tokens:Cb(e,"bash")[0]});let a=e.split(t);return lt(y0,{children:a.flatMap((r,n)=>{let s=lt(Rb,{tokens:Cb(r,"bash")[0]},`t${n}`);return n===0?[s]:[lt("span",{"data-slot":"code-block-secret",className:"text-text-2 select-none before:sr-only before:content-['hidden_secret']",children:lt("span",{"aria-hidden":!0,children:HL(t)})},`s${n}`),s]})})}function w0(e){return e.variant==="command"?lt(ZL,{...e}):lt(BL,{...e})}var iR="overflow-auto focus-visible:focus-ring-inset",lR=e=>e?{"--code-max":`calc(${e} * 1lh + var(--space-6))`}:void 0;function BL({code:e,language:t="text",filename:o,header:a=!0,lineNumbers:r=!1,highlight:n,defaultWrap:s=!1,startLine:l=1,maxLines:i,copyLabel:c,onCopy:u,className:d,variant:m,prompt:p,secret:f,...v}){let[g,b]=Eb(s),w=e.replace(/\n$/,""),y=Cb(w,t),x=OL(n),h=String(l+y.length-1).length,I=o??sR[t];return cs("figure",{"data-slot":"code-block","data-variant":"block","data-wrap":g||void 0,className:F("code-surface relative flex min-w-0 flex-col overflow-hidden rounded-overlay text-text-1 forced-colors:border forced-colors:border-[CanvasText]",d),...v,children:[a&&cs("figcaption",{"data-slot":"code-block-header",className:"flex min-h-(--control) items-center gap-2 border-b border-line-faint ps-3 pe-1",children:[lt("span",{className:F("min-w-0 flex-1 truncate",o?"type-code-block text-text-1":"type-caption text-text-2"),children:I}),o&&t!=="text"&&lt("span",{className:"hidden type-caption text-text-2 sm:block",children:sR[t]}),lt($e,{"data-slot":"code-block-wrap",variant:"ghost",size:"icon-sm","aria-label":"Wrap lines","aria-pressed":g,onClick:()=>b(R=>!R),className:"text-text-2 aria-pressed:text-text-1",children:lt(Ce,{icon:B6,size:12,weight:g?"fill":"regular"})}),lt(Sb,{text:w,label:c,onCopy:u})]}),lt("div",{"data-slot":"code-block-body",tabIndex:0,role:"region","aria-label":I,dir:"ltr",className:F(iR,"relative min-h-0 py-3 type-code-block",i&&"max-h-(--code-max)",!a&&"pe-8"),style:lR(i),children:lt("pre",{className:g?"w-full":"w-max min-w-full",children:lt("code",{className:"block",children:y.map((R,C)=>{let S=l+C,T=x.has(S);return cs("span",{"data-slot":"code-block-line","data-highlighted":T||void 0,className:F("flex pe-3",!r&&"ps-3",T&&"bg-pressed forced-colors:outline forced-colors:outline-1 forced-colors:-outline-offset-1"),children:[r&&lt("span",{"aria-hidden":!0,className:F("sticky start-0 w-(--gutter) shrink-0 ps-3 pe-3 text-end text-text-2 select-none",T?"bg-transparent text-text-1":"bg-code-surface"),style:{"--gutter":`calc(${h}ch + var(--space-6))`},children:S}),lt("span",{className:F("min-w-0 flex-1",g?"whitespace-pre-wrap [overflow-wrap:anywhere]":"whitespace-pre",T&&"before:sr-only before:content-['Highlighted:_']"),children:lt(Rb,{tokens:R})})]},C)})})})}),!a&&lt("span",{className:"absolute end-1 top-1.5",children:lt(Sb,{text:w,label:c,onCopy:u})})]})}function _L(e,t){let o=e.replace(/\n$/,"").split(`
`),a=t?`${t} `:"",r=!!a&&o.some(n=>n.startsWith(a));return o.map(n=>r?n.startsWith(a)?{kind:"command",text:n.slice(a.length)}:{kind:"output",text:n}:{kind:"command",text:n})}function ZL({code:e,prompt:t="$",secret:o,maxLines:a,copyLabel:r="Copy command",onCopy:n,className:s,variant:l,language:i,filename:c,header:u,lineNumbers:d,highlight:m,defaultWrap:p,startLine:f,...v}){let[g,b]=Eb(!1),w=_L(e,t),y=w.filter(h=>h.kind==="command").map(h=>h.text).join(`
`),x=w.filter(h=>h.kind==="command").length>1;return cs("figure",{"data-slot":"code-block","data-variant":"command",className:F("code-surface flex min-w-0 items-start gap-1 rounded-overlay py-1 ps-3 pe-1 text-text-1 forced-colors:border forced-colors:border-[CanvasText]",s),...v,children:[lt("div",{"data-slot":"code-block-body",tabIndex:0,role:"region","aria-label":x?"Commands":"Command",dir:"ltr",className:F(iR,"min-w-0 flex-1 py-1 type-code-block",a&&"max-h-(--code-max)"),style:lR(a),children:lt("pre",{className:"w-max min-w-full",children:w.map((h,I)=>cs("div",{"data-slot":h.kind==="command"?"code-block-command":"code-block-output",className:F("whitespace-pre",h.kind==="output"&&"text-text-2"),children:[h.kind==="command"&&t&&cs("span",{"aria-hidden":!0,"data-slot":"code-block-prompt",className:"text-text-2 select-none",children:[t," "]}),lt("code",{children:h.kind==="command"?lt(VL,{line:h.text,secret:o,revealed:g}):h.text||" "})]},I))})}),cs("span",{className:"flex shrink-0 items-center gap-0.5",children:[o&&lt($e,{"data-slot":"code-block-reveal",variant:"ghost",size:"icon-sm","aria-label":g?"Hide secret":"Show secret","aria-pressed":g,onClick:()=>b(h=>!h),children:lt(Ce,{icon:g?nf:sf,size:12})}),lt(Sb,{text:y,label:r,onCopy:n})]})]})}import{Fragment as yR,jsx as tt,jsxs as I0}from"react/jsx-runtime";var $L=24,cR=512,WL=/[\s.,!?;:)\]]/;function qL(e){return e<=12?2:e<=48?4:e<=96?8:Math.min(256,Math.ceil(e/4))}function jL(e,t){let o=Math.min(e.length,t+qL(e.length-t)),a=Math.min(e.length,o+8);for(let r=o;r<a;r++)if(WL.test(e[r]??""))return r+1;return o}var KL=()=>typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function YL(e,t,o=!0){let[a,r]=gR(e),n=x0(e),s=x0(e),l=x0(void 0);return s.current=e,Tb(()=>{let i=m=>{n.current=m,r(m)},c=()=>{l.current&&clearTimeout(l.current),l.current=void 0},u=!t||!o||KL()||typeof document<"u"&&document.hidden,d=()=>{l.current=void 0;let m=s.current,p=n.current;if(!m.startsWith(p)||m.length-p.length<=cR){i(m);return}let f=jL(m,p.length);i(m.slice(0,f)),f<m.length&&(l.current=setTimeout(d,$L))};if(u||!e.startsWith(n.current)){c(),i(e);return}if(e.length-n.current.length<=cR&&!l.current){i(e);return}l.current||d()},[e,t,o]),Tb(()=>{let i=()=>{l.current&&clearTimeout(l.current),l.current=void 0,n.current=s.current,r(s.current)},c=()=>{document.hidden||i()};return document.addEventListener("visibilitychange",c),window.addEventListener("pageshow",i),()=>{document.removeEventListener("visibilitychange",c),window.removeEventListener("pageshow",i),l.current&&clearTimeout(l.current)}},[]),t&&o?a:e}function XL(e){let t=0,o=!1,a=!1,r=!1;for(let n=0;n<e.length;n++){let s=e[n];if(o){a?a=!1:s==="\\"?a=!0:s==='"'&&(o=!1);continue}if(s==='"')o=!0;else if(s==="{"||s==="[")t++,r=!0;else if(s==="}"||s==="]"){if(t--,r&&t===0)return n+1;if(t<0)return-1}}return-1}function QL(e){let t=[],o=!1,a=!1,r=-1;for(let l=0;l<e.length;l++){let i=e[l];if(o){a?a=!1:i==="\\"?a=!0:i==='"'&&(o=!1);continue}i==='"'?(o=!0,r=l):i==="{"||i==="["?t.push(i):(i==="}"||i==="]")&&t.pop()}let n=e;o&&(n=(a?n.slice(0,-1):n)+'"'),n=n.replace(/\s+$/,"");let s=o?r:-1;if(/[,]$/.test(n)?n=n.slice(0,-1):/:$/.test(n)?n+="null":/(?:^|[^\w"])(t|tr|tru)$/.test(n)?n=n.replace(/(t|tr|tru)$/,"true"):/(?:^|[^\w"])(f|fa|fal|fals)$/.test(n)?n=n.replace(/(f|fa|fal|fals)$/,"false"):/(?:^|[^\w"])(n|nu|nul)$/.test(n)?n=n.replace(/(n|nu|nul)$/,"null"):/[-+.eE]$/.test(n)&&(n+="0"),t.at(-1)==="{"&&n.endsWith('"')){let l=s!==-1?s:n.lastIndexOf('"',n.length-2),i=n.slice(0,l).replace(/\s+$/,"").at(-1);(i==="{"||i===",")&&(n+=":null")}for(let l=t.length-1;l>=0;l--)n+=t[l]==="{"?"}":"]";return n}function uR(e){if(!e.trim())return!0;try{return JSON.parse(QL(e)),!0}catch{return!1}}function JL(e){let t=e.length-e.trimStart().length;if(!/^[[{]/.test(e.trimStart()))return e.trim()?0:e.length;if(uR(e))return e.length;let o=t+1,a=e.length;for(;o<a;){let r=Math.ceil((o+a)/2);uR(e.slice(0,r))?o=r:a=r-1}return o}var eN=/([\w-]+)="([^"]*)"/g,tN=e=>Object.fromEntries([...e.matchAll(eN)].map(t=>[t[1],t[2]])),hR=/^<([a-z][\w-]*)((?:\s+[\w-]+="[^"]*")*)\s*>/;function oN(e,t=()=>!0){let o=e.split(`
`),a=[],r=[],n=0,s=0,l=()=>{r.length&&r.some(i=>i.trim())&&a.push({text:r.join(`
`),kind:"md",start:n}),r=[]};for(let i=0;i<o.length;i++){let c=o[i],u=c.match(/^(\s{0,3})(`{3,}|~{3,})/),d=c.match(hR),m=d&&t(d[1])?d:null;if(u||m){l();let p=s,f=[c];if(s+=c.length+1,u){let v=new RegExp(`^\\s{0,3}${u[2][0]}{${u[2].length},}\\s*$`);for(;++i<o.length&&(f.push(o[i]),s+=o[i].length+1,!v.test(o[i])););a.push({text:f.join(`
`),kind:"fence",start:p})}else{let v=`</${m[1]}>`,g=c.includes(v);for(;!g&&++i<o.length;)f.push(o[i]),s+=o[i].length+1,g=o[i].includes(v);a.push({text:f.join(`
`),kind:"tag",start:p})}n=s;continue}if(!c.trim()){l(),s+=c.length+1,n=s;continue}r.length||(n=s),r.push(c),s+=c.length+1}return l(),a}var dR=e=>e.trim().replace(/^\|/,"").replace(/\|$/,"").split("|").map(t=>t.trim());function aN(e,t){let o=e.split(`
`),a=[],r=[],n=()=>{r.length&&a.push({type:"p",text:r.join(" ")}),r=[]};for(let s=0;s<o.length;s++){let l=o[s];if(!l.trim()){n();continue}if(/^\s*\|/.test(l)){n();let m=[];for(;s<o.length&&/^\s*\|/.test(o[s]);)m.push(o[s++]);if(s--,!(m[1]&&/^\s*\|?\s*:?-{2,}/.test(m[1]))){t||m.forEach(v=>r.push(v));continue}let f=m.slice(2);t&&f.length&&!/\|\s*$/.test(f.at(-1))&&f.pop(),a.push({type:"table",head:dR(m[0]),rows:f.map(dR)});continue}let i=l.match(/^(#{1,3})\s+(.*)$/);if(i){n(),a.push({type:"h",level:i[1].length,text:i[2]});continue}if(/^(-{3,}|\*{3,})\s*$/.test(l)){n(),a.push({type:"hr"});continue}let c=l.match(/^>\s?(.*)$/);if(c){n();let m=a.at(-1);m?.type==="quote"?m.text+=` ${c[1]}`:a.push({type:"quote",text:c[1]});continue}let u=l.match(/^\s*(?:([-*+])|(\d+)[.)])\s+(.*)$/);if(u){n();let m=u[1]?"ul":"ol",p=a.at(-1);p&&p.type===m?p.items.push(u[3]):a.push({type:m,items:[u[3]]});continue}let d=a.at(-1);if(!r.length&&d&&(d.type==="ul"||d.type==="ol")&&/^\s+\S/.test(l)){d.items[d.items.length-1]+=` ${l.trim()}`;continue}r.push(l.trim())}return n(),a}function rN(e,t){let o=e;for(let a of t)a.partial&&(o=o.replace(a.partial,""));return o=o.replace(/\[([^\]]*)\]\([^)]*$/,"$1").replace(/\[([^\]]*)$/,"$1"),(o.match(/`/g)?.length??0)%2&&(o+="`"),(o.replace(/`[^`]*`/g,"").match(/\*\*/g)?.length??0)%2&&(o=/\*\*\s*$/.test(o)?o.replace(/\*\*\s*$/,""):o+"**"),o.replace(/(^|\s)[*_]$/,"$1")}var nN=e=>/^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(e)?e:void 0,sN=["`[^`]+`","\\*\\*[^*]+\\*\\*","\\*[^*\\s][^*]*\\*|(?<![\\w])_[^_\\s][^_]*_(?![\\w])","\\[[^\\]]+\\]\\((?:[^()\\s]|\\([^()\\s]*\\))+\\)"],mR=e=>e.flags.replace(/[^ius]/g,""),bR=[],pR=new WeakMap;function iN(e){let t=pR.get(e);if(!t){let o=[...new Set(e.flatMap(a=>[...mR(a.pattern)]))].join("");t={all:new RegExp([...sN,...e.map(a=>a.pattern.source)].map(a=>`(${a})`).join("|"),`g${o}`),whole:e.map(a=>new RegExp(`^(?:${a.pattern.source})$`,mR(a.pattern)))},pR.set(e,t)}return t}function Mb({text:e,tags:t=bR,streaming:o=!1}){let{all:a,whole:r}=iN(t),n=[],s=0,l=0;for(let i of e.matchAll(a)){i.index>s&&n.push(e.slice(s,i.index));let c=i[0];if(i[1])n.push(tt("code",{className:"rounded-tag well px-1 text-text-1 [overflow-wrap:anywhere]",children:c.slice(1,-1)},l++));else if(i[2])n.push(tt("strong",{className:"font-semibold text-text-1",children:tt(Mb,{text:c.slice(2,-2),tags:t,streaming:o})},l++));else if(i[3])n.push(tt("em",{children:tt(Mb,{text:c.slice(1,-1),tags:t,streaming:o})},l++));else if(i[4]){let[,u,d]=c.match(/^\[([^\]]+)\]\((.+)\)$/)??[],m=nN(d??"");n.push(m?tt("a",{href:m,className:"text-text-1 underline decoration-1 underline-offset-4 transition-[text-decoration-color,outline-color] duration-(--dur-state) hover:decoration-2 [overflow-wrap:anywhere]",.../^https?:/i.test(m)?{target:"_blank",rel:"noreferrer noopener"}:{},children:u},l++):tt(v0,{children:u},l++))}else{let u=r.findIndex(m=>m.test(c)),d=u===-1?null:c.match(r[u]);n.push(d?tt(v0,{children:t[u].render(d,{streaming:o,key:l})},l++):c)}s=i.index+c.length}return s<e.length&&n.push(e.slice(s)),tt(yR,{children:n.map((i,c)=>tt(v0,{children:i},c))})}function lN(e,t){let o=t.tail?e.findLastIndex(a=>a.type!=="hr"&&a.type!=="table"):-1;return e.map((a,r)=>{let n=r===o,s=(l,i=n)=>tt(Mb,{text:i?rN(l,t.tags):l,tags:t.tags,streaming:t.streaming});switch(a.type){case"p":return tt("p",{children:s(a.text)},r);case"quote":return tt("blockquote",{className:"ps-3 text-text-2",children:s(a.text)},r);case"h":{let l=`h${a.level+2}`;return tt(l,{className:F("pt-1 text-text-1",a.level===1?"type-heading-sm":a.level===2?"type-label-lg":"type-label"),children:s(a.text)},r)}case"ul":case"ol":{let l=a.type;return tt(l,{className:"flex flex-col gap-1",children:a.items.map((i,c)=>I0("li",{className:"flex gap-2",children:[a.type==="ul"?tt("span",{"aria-hidden":!0,className:"flex h-lh w-4 shrink-0 items-center",children:tt("span",{className:"h-px w-2 bg-text-2 forced-colors:bg-[CanvasText]"})}):I0("span",{"aria-hidden":!0,className:"min-w-4 shrink-0 text-text-2 data",children:[c+1,"."]}),tt("span",{className:"min-w-0",children:s(i,n&&c===a.items.length-1)})]},c))},r)}case"hr":return tt("hr",{className:"h-px border-0 bg-line-faint"},r);case"table":return tt("div",{"data-slot":"response-table",className:"min-w-0 overflow-x-auto",children:I0("table",{className:"w-full text-start type-body-sm",children:[tt("thead",{children:tt("tr",{className:"border-b border-line-faint",children:a.head.map((l,i)=>tt("th",{scope:"col",className:"h-(--menu-row) px-3 text-start type-label-sm text-text-2 first:ps-0",children:s(l,!1)},i))})}),tt("tbody",{children:a.rows.map((l,i)=>tt("tr",{className:"rule-row",children:l.map((c,u)=>tt("td",{className:"h-(--menu-row) px-3 py-1.5 align-top first:ps-0",children:s(c,!1)},u))},i))})]})},r)}})}var cN=GL(function({text:t,tags:o,live:a}){return tt(yR,{children:lN(aN(t,a),{tail:a,tags:o,streaming:a})})}),uN={ts:"ts",typescript:"ts",tsx:"tsx",js:"js",javascript:"js",jsx:"js",json:"json",jsonl:"json",bash:"bash",sh:"bash",shell:"bash",zsh:"bash",console:"bash",python:"python",py:"python",yaml:"yaml",yml:"yaml"};function dN({text:e,open:t,maxLines:o}){let a=e.split(`
`),r=a[0].replace(/^\s*(`{3,}|~{3,})\s*/,"").trim().toLowerCase(),n=a.slice(1,t?void 0:-1);return tt(w0,{"data-slot":"response-code","data-open":t||void 0,code:n.join(`
`),language:uN[r]??"text",maxLines:o})}function fR({label:e}){return tt("div",{"data-slot":"response-pending",className:"flex h-(--row) items-center gap-2 rounded-overlay border border-line-faint bg-paper px-3",children:tt(_t,{status:"running",children:e})})}function mN(e,t,o,a){let r=e.match(hR),[n,s,l]=r,i=t[s];if(!i)return{outcome:"literal",node:tt("p",{className:"whitespace-pre-wrap [overflow-wrap:anywhere]",children:e})};let c=tN(l),u=`</${s}>`,d=e.slice(n.length),m=d.indexOf(u),p=m===-1?d:d.slice(0,m),f=m===-1?"":d.slice(m+u.length);if(i.json===!1){if(m!==-1)return{outcome:"segment",node:i.render(p.trim(),c),rest:f};if(o&&!a)return{outcome:"pending",node:tt(fR,{label:i.pending})};let[b,...w]=e.split(`
`);return{outcome:"literal",node:tt("p",{className:"[overflow-wrap:anywhere]",children:b}),rest:w.join(`
`)}}let v=XL(p);if(v!==-1)try{let b=JSON.parse(p.slice(0,v));return{outcome:"segment",node:i.render(b,c),rest:(m===-1?p.slice(v):p.slice(v)+f).replace(new RegExp(`^\\s*${u.replace("/","\\/")}`),"")}}catch{return{outcome:"discard",node:null,rest:m===-1?p.slice(v):f}}let g=JL(p);return g===0&&p.trim()?{outcome:"literal",node:tt("p",{className:"whitespace-pre-wrap [overflow-wrap:anywhere]",children:p.trim()}),rest:f}:g>=p.length&&m===-1?o?{outcome:"pending",node:tt(fR,{label:i.pending})}:{outcome:"discard",node:null}:{outcome:"discard",node:null,rest:m===-1?p.slice(g):f}}var pN=Ye("flex min-w-0 flex-col text-text-1 break-words",{variants:{size:{default:"gap-3 type-body",sm:"gap-2 type-body-sm"}},defaultVariants:{size:"default"}});function bl({children:e,streaming:t=!1,pace:o=!0,tags:a,inlineTags:r=bR,tagTimeout:n=8e3,maxCodeLines:s=24,size:l="default",className:i,...c}){let u=YL(e,t,o),d=x0(t);t&&(d.current=!0);let m=a??fN,p=UL(()=>y=>Object.hasOwn(m,y),[m]),[f,v]=gR(null),g="",b=(y,x,h)=>{let I=oN(y,p);return I.map((R,C)=>{let S=x+R.start,T=C===I.length-1&&t;if(R.kind==="fence"){let P=!/^\s{0,3}(`{3,}|~{3,})\s*$/.test(R.text.split(`
`).at(-1)??"")||R.text.split(`
`).length===1;return tt(dN,{text:R.text,open:P,maxLines:s},S)}if(R.kind==="tag"){let P=mN(R.text,m,T,f===S);T&&(P.outcome==="pending"||f===S)&&(g=`${S}:${R.text.length}`);let V=P.rest?.trim()&&h<8?P.rest:"";return I0(v0,{children:[tt("div",{"data-slot":"response-tag","data-outcome":P.outcome,className:"min-w-0",children:P.node}),V&&b(V,S+R.text.length-V.length,h+1)]},S)}return tt(cN,{text:R.text,tags:r,live:T},S)})},w=b(u,0,0);return Tb(()=>{if(v(null),!g||!t)return;let y=setTimeout(()=>v(Number(g.split(":")[0])),n);return()=>clearTimeout(y)},[g,t,n]),tt("div",{"data-slot":"response","data-streaming":t||void 0,"data-streamed":d.current||void 0,"aria-busy":t||void 0,className:F(pN({size:l}),i),...c,children:w})}var fN={};import*as uu from"react";import*as C0 from"react";var Pb=C0.createContext(void 0);function wR(){return C0.useContext(Pb)}import*as vR from"react";import*as ni from"react";import*as R0 from"react";var kb=R0.createContext({register:()=>{},unregister:()=>{},subscribeMapChange:()=>()=>{},nextIndexRef:{current:0}});function S0(){return R0.useContext(kb)}function Cr(e={}){let{guess:t,label:o,metadata:a,textRef:r,index:n}=e,{register:s,unregister:l,subscribeMapChange:i,nextIndexRef:c}=S0(),u=ni.useRef(-1),[d,m]=ni.useState(n==null&&t?()=>{if(u.current===-1){let g=c.current;c.current+=1,u.current=g}return u.current}:-1),p=n??d,f=ni.useRef(null),v=ni.useCallback(g=>{let b=f.current;b&&l(b),f.current=g,g&&s(g,{metadata:a??null,index:n??null,label:o,textRef:r})},[n,s,l,a,o,r]);return _(()=>{if(n==null)return i(g=>{let b=f.current?g.get(f.current)?.index:null;b!=null&&m(b)})},[n,i]),{ref:v,index:p}}function xR(e={}){let{highlightItemOnHover:t,highlightedIndex:o,onHighlightedIndexChange:a}=Ti(),{ref:r,index:n}=Cr(e),s=o===n,l=vR.useRef(null),i=Bt(r,l);return{compositeProps:{tabIndex:s?0:-1,onFocus(){a(n)},onMouseMove(){let u=l.current;if(!t||!u)return;let d=u.hasAttribute("disabled")||u.ariaDisabled==="true";!s&&!d&&u.focus()}},compositeRef:i,index:n}}function yl(e){let{render:t,className:o,style:a,state:r=ze,props:n=Ft,refs:s=Ft,metadata:l,stateAttributesMapping:i,tag:c="div",...u}=e,{compositeProps:d,compositeRef:m}=xR({metadata:l});return ae(c,e,{state:r,ref:[m,...s],props:[d,...n,u],stateAttributesMapping:i})}import{jsx as gN}from"react/jsx-runtime";var du=uu.forwardRef(function(t,o){let{className:a,defaultPressed:r=!1,disabled:n=!1,form:s,onPressedChange:l,pressed:i,render:c,type:u,value:d,nativeButton:m=!0,style:p,...f}=t,v=qe(d||void 0),g=wR(),b=g?.value??[],w=(n||g?.disabled)??!1,[y,x]=Ba({controlled:g?v!==void 0&&b.indexOf(v)>-1:i,default:r,name:"Toggle",state:"pressed"}),{getButtonProps:h,buttonRef:I}=Ut({disabled:w,native:m}),R={disabled:w,pressed:y},C=[I,o],S=[{"aria-pressed":y,onClick(V){let E=!y,z=we(q.none,V.nativeEvent);l?.(E,z),!z.isCanceled&&(v&&g?.setGroupValue?.(v,E,z),!z.isCanceled&&x(E))}},f,h],T=ae("button",t,{enabled:!g,state:R,ref:C,props:S}),P=uu.useMemo(()=>({disabled:w,focusableWhenDisabled:!1}),[w]);return g?gN(yl,{tag:"button",render:c,className:a,style:p,metadata:P,state:R,refs:C,props:S}):T});import{jsx as fn,jsxs as ER}from"react/jsx-runtime";var IR=Ye(["group/chip relative inline-flex h-(--control-sm) focus-sm max-w-full min-w-0 shrink-0 items-center gap-1 rounded-pill border whitespace-nowrap select-none","type-label-sm transition-[background-color,border-color,color,scale] duration-(--dur-state) ease-out","[&_svg]:pointer-events-none [&_svg]:size-(--icon-sm) [&_svg]:shrink-0 [&_svg]:text-text-3","forced-colors:border-[ButtonText]"]),hN=["cursor-pointer px-2.5 [-webkit-tap-highlight-color:transparent]","border-line-control bg-paper text-text-1","hover:not-data-disabled:border-line-focus active:not-data-disabled:scale-(--scale-press) active:duration-(--dur-press)","data-pressed:border-line-focus data-pressed:bg-pressed data-pressed:[&_svg]:text-text-1","data-disabled:cursor-not-allowed data-disabled:border-line-faint data-disabled:text-text-disabled","forced-colors:data-pressed:border-2"].join(" "),bN=["ps-2.5 pe-(--shell-inset) border-line-control bg-paper text-text-1","data-invalid:border-fail","data-disabled:border-line-faint data-disabled:text-text-disabled"].join(" "),yN=F("relative inline-flex size-[calc(var(--control-sm)-2*var(--shell-inset)-2*var(--line-width))] shrink-0 items-center justify-center rounded-pill text-text-2","transition-[background-color,color] duration-(--dur-state) ease-out hover:not-disabled:bg-hover hover:not-disabled:text-text-1 active:not-disabled:bg-pressed","focus-sm focus-visible:outline-offset-0 disabled:cursor-not-allowed disabled:text-text-disabled","after:absolute after:-inset-1","[&_svg]:text-current"),wN=new Intl.NumberFormat("en-US");function CR({children:e,className:t}){return fn("span",{"data-slot":"chip-count",className:F("data text-text-2",t),children:typeof e=="number"?wN.format(e):e})}function RR(e){if(e.onRemove)return fn(xN,{...e});let{className:t,count:o,children:a,...r}=e;return ER(du,{"data-slot":"chip",className:n=>F(IR(),hN,typeof t=="function"?t(n):t),...r,children:[typeof a=="string"?fn("span",{className:"min-w-0 truncate",children:a}):a,o!==void 0&&fn(CR,{children:o})]})}function vN(e,t){let o=e.closest("[data-slot=chip-group]")??e.closest("[data-slot=chip-value]")?.parentElement;if(!o)return()=>{};let a=[...o.querySelectorAll("[data-slot=chip-remove]:not(:disabled)")],r=a.indexOf(e),n=a[r+1]??a[r-1];return()=>{n?.isConnected?n.focus():n||t?.current?.focus()}}function xN({className:e,count:t,children:o,onRemove:a,removeLabel:r,invalid:n,disabled:s,focusAfterEmpty:l,...i}){let c=typeof o=="string"?o:void 0,u=d=>{let m=vN(d.currentTarget,l);a(),requestAnimationFrame(m)};return ER("span",{"data-slot":"chip-value","data-invalid":n||void 0,"data-disabled":s||void 0,className:F(IR(),bN,e),...i,children:[fn("span",{className:"min-w-0 truncate",children:o}),t!==void 0&&fn(CR,{children:t}),n&&fn("span",{className:"sr-only",children:"(not accepted)"}),fn("button",{type:"button","data-slot":"chip-remove",onClick:u,onKeyDown:d=>{(d.key==="Backspace"||d.key==="Delete")&&(d.preventDefault(),u(d))},disabled:s,"aria-label":r??(c?`Remove ${c}`:"Remove"),className:yN,children:fn(Ce,{icon:tr,size:12})})]})}function SR({className:e,...t}){return fn("div",{"data-slot":"chip-group",className:F("flex flex-wrap items-center gap-1",e),...t})}function IN(e){return e&&e.charAt(0).toUpperCase()+e.slice(1)}var CN={default:"Branco"};function si(e){if(!e)return"Hermes";let t=typeof e=="string"?e:e.name,o=typeof e=="object"?(e.display_name||"").trim():"";return o||CN[t]||IN(String(t||"hermes").replace(/[-_]+/g," "))}var Ab=[["#ff9b80","#e2583a"],["#8fc2ff","#2f6fe0"],["#c4b3ff","#7c4ddb"],["#7ee8c4","#0f9d74"],["#ffd47a","#d48a06"],["#ff9fd0","#d63c8c"],["#86eadc","#0f8a7e"],["#c3ccd8","#5b6b80"]],TR=["pebble","circle","squircle","flower","blob"];function RN(e){let t=2166136261;for(let o of String(e||""))t^=o.charCodeAt(0),t=Math.imul(t,16777619);return t^=t>>>16,t=Math.imul(t,2246822507),t^=t>>>13,t=Math.imul(t,3266489909),t^=t>>>16,t>>>0}var zb={default:[0,"pebble"],dex:[1,"squircle"],preto:[3,"flower"],mint:[6,"blob"],prism:[2,"circle"],youtubot:[5,"pebble"],"bot-builder":[4,"squircle"]};function MR(e){let t=e||"default";if(zb[t])return{colors:Ab[zb[t][0]],shape:zb[t][1]};let o=RN(t);return{colors:Ab[o%Ab.length],shape:TR[(o>>>5)%TR.length]}}function Lb(e){return e?new Date(e).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}):""}var wl=["Aujourd'hui","Hier","7 derniers jours","Plus ancien"];function PR(e){if(!e)return"Plus ancien";let t=new Date(e),o=new Date,a=new Date(o.getFullYear(),o.getMonth(),o.getDate()).getTime();return t.getTime()>=a?wl[0]:t.getTime()>=a-864e5?wl[1]:t.getTime()>=a-6*864e5?wl[2]:wl[3]}import{useEffect as BR,useId as HN,useRef as sr}from"react";var T0=[-3.2,3.2],M0=-2.6,SN=2.4,EN=5.4,zR=4.4,TN=380,MN=13.4+.5,E0=4,mu=2800,PN=2200,kN="M0 1C-0.6 0.55-1.3 0.1-1.3-0.45C-1.3-0.95-0.9-1.2-0.55-1.2C-0.25-1.2-0.05-1 0-0.8C0.05-1 0.25-1.2 0.55-1.2C0.9-1.2 1.3-0.95 1.3-0.45C1.3 0.1 0.6 0.55 0 1Z",Zt=e=>e*e*(3-2*e),Rr=e=>Math.min(1,Math.max(0,e)),AN=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2,LR=e=>1-(1-e)**3,pa=(e,t,o)=>e<=t||e>=o?0:Math.sin(Math.PI*(e-t)/(o-t)),fa=(e,t,o,a,r)=>e<=t||e>=r?0:e<o?Zt((e-t)/(o-t)):e<=a?1:1-Zt((e-a)/(r-a)),Fb=e=>{let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)};function zN(e,t,o,a){let r=Math.cos;switch(e){case"circle":return .97+(.012+a*.03)*r(3*t+o*.5)+.008*r(5*t-o*.6);case"squircle":{let n=Math.abs(r(t)),s=Math.abs(Math.sin(t));return .9/(n**4+s**4)**.25+(.008+a*.02)*r(4*t+o*.6)}case"flower":return .95+(.075+a*.03)*r(8*t)+.012*r(3*t+o*.6);case"blob":return .97+(.05+a*.025)*r(3*t+1.5*Math.PI+.75*Math.sin(o*.3)+.25*Math.sin(o*.71))+(.022+a*.012)*r(2*t-o*.36)+.01*r(5*t+o*.5);default:return 1+(.038+a*.03)*r(5*t+.5*Math.PI+.75*Math.sin(o*.27)+.25*Math.sin(o*.63))+(.02+a*.02)*r(3*t+o*.45)+.01*r(7*t-o*.6)}}function NR(e){let t="";for(let o=0;o<96;o++){let a=o/96*Math.PI*2,r=e[o]*13.4;t+=`${o?"L":"M"}${(r*Math.cos(a)).toFixed(2)} ${(r*Math.sin(a)).toFixed(2)}`}return`${t}Z`}var LN=NR(new Float32Array(96).fill(1));function DR(e,t,o,a,r,n,s){let l=SN/2*r,i=Math.max(.35,EN/2*o*r)*(4/3),c=[e-l,t,e-l,t-i*(1-n),e+l,t-i*(1-s),e+l,t,e+l,t+i,e-l,t+i],u=t+.4,d=[e-1.7,u+1,e-1.5,u-1.6,e+1.5,u-1.6,e+1.7,u+1,e+1.1,u-.3,e-1.1,u-.3],m=c.map((p,f)=>(p+(d[f]-p)*a).toFixed(2));return`M${m[0]} ${m[1]}C${m[2]} ${m[3]} ${m[4]} ${m[5]} ${m[6]} ${m[7]}C${m[8]} ${m[9]} ${m[10]} ${m[11]} ${m[0]} ${m[1]}Z`}function FR(e,t,o,a,r,n,s=0){let l=(2+a*.8-o*.3)*r,i=t-a*.4,c=t+.4+a*(a<0?2.4:1.6),u=c+o*1.8+s,d=c-o*2.4-s,m=v=>v.toFixed(2),p=i+n,f=i-n;return`M${m(e-l)} ${m(p)}Q${m(e)} ${m(u)} ${m(e+l)} ${m(f)}Q${m(e)} ${m(d)} ${m(e-l)} ${m(p)}Z`}var gn={openL:1,openR:1,laughL:0,laughR:0,eyeScale:1,eyeY:0,heavy:0,droop:0,smile:.4,mouth:0,mouthW:1,mouthX:0,skew:0,taper:0,blush:0,gazeX:Number.NaN,gazeY:Number.NaN,wobble:0,bob:0,tilt:0,spin:1},kR={neutral:gn,happy:{...gn,openL:.9,openR:.9,laughL:.45,laughR:.45,smile:1,wobble:.15,bob:-.3},love:{...gn,openL:.88,openR:.88,laughL:.55,laughR:.55,eyeScale:1.03,smile:1,mouthW:.9,blush:1,gazeX:-.6,gazeY:-.7,wobble:.12,bob:-.2,tilt:-3,spin:.7},laugh:{...gn,openL:.9,openR:.9,laughL:.5,laughR:.5,smile:1,mouth:.1,wobble:.3,spin:1.4},surprised:{...gn,openL:1.03,openR:1.03,eyeScale:1.07,eyeY:-.5,smile:0,mouth:1,mouthW:.95,wobble:.12,bob:-.6},sad:{...gn,openL:.75,openR:.75,eyeScale:.92,droop:.85,eyeY:.5,smile:-1,mouthW:1.75,gazeX:0,gazeY:.75,bob:.8,tilt:-4,spin:.35},thinking:{...gn,openL:.95,openR:.8,heavy:.2,smile:.1,mouthW:.6,mouthX:.9,skew:.5,tilt:5,spin:.6},sleepy:{...gn,openL:.6,openR:.6,heavy:.65,eyeY:.5,smile:-.04,mouthW:.8,taper:.3,gazeX:0,gazeY:.6,bob:.5,spin:.3},wink:{...gn,smile:.9,skew:.1,tilt:2,wobble:.1}},NN={surprised:16,sad:3.5,sleepy:2.5},DN=Object.keys(gn),OR=()=>({dy:0,sy:0,tilt:0,faceY:0,scale:0,openL:1,openR:1,laughL:0,laughR:0,mouth:0,smile:0,width:1,skew:0,mouthX:0,yawn:0,blink:0,steady:!1,gaze:null}),Nb=[[.75,-.85],[.4,-1],[-.35,-.85]];function FN(e,t,o){let a=OR();switch(e){case"happy":{t<520&&(a.dy=-1.6*Math.abs(Math.sin(Math.PI*2*t/520))),a.tilt=3*Math.sin(Math.PI*2*t/3600);let r=fa(t%3600,1600,1900,2500,2900);a.laughL=a.laughR=.3*r,a.mouth=.22*r,a.dy-=.6*r;break}case"love":{t<600&&(a.dy=-1.4*pa(t,0,600)),a.tilt=5*Math.sin(Math.PI*2*t/4e3);let r=fa(t%4e3,1400,1900,2500,3200);a.laughL=a.laughR=.3*r,a.scale+=.05*r,a.sy+=.03*r,a.dy-=.8*r,a.mouth+=.1*r;break}case"laugh":{let n=Math.floor(t/5600),s=t%5600,l=Fb(n)<.5?-1:1,i=pa(s,0,340);a.dy-=1.2*i,a.sy+=.04*i,a.scale+=.1*i,a.laughL=a.laughR=-.5*i,a.mouth+=.25*i;let c=fa(s,220,380,3e3,3700);if(a.laughL+=.5*c,a.laughR+=.5*c,a.mouth+=.25*fa(s,220,400,3400,4400),s>260&&s<2900){let u=(s-260)/2640,d=15*u-3*u*u,m=Math.abs(Math.sin(Math.PI*d))**.8,p=(1-.7*u)*(.6+.4*Fb(n*17+Math.floor(d)))*Zt(Math.min(1,(s-260)/120));a.mouth+=.6*m*p,a.dy-=1.4*m*p,a.sy-=.035*m*p,a.scale-=.1*m*p,a.tilt+=2.5*m*p*l}else if(s>=2900&&s<4300){let u=(s-2900)/1400,d=Math.abs(Math.sin(Math.PI*u*4.2)),m=.4*(1-u);a.mouth+=.4*d*m,a.dy-=.8*d*m}a.tilt-=7*l*fa(s,260,600,1800,2900),a.sy-=.02*pa(s,4300,5300),s>4300&&(a.gaze=[0,0]),a.steady=s<3600;break}case"surprised":{let r=t<900?t<120?Zt(t/120):1-Zt((t-120)/780):0;a.scale+=.12*r,a.dy-=3*pa(t,0,420),a.sy+=.06*pa(t,0,380),a.mouth+=.3*r,a.steady=t<1800;let n=t<600?-1:(t-600)%4200,s=fa(n,300,380,640,720),l=fa(n,700,780,1090,1170);a.gaze=n>=300&&n<700?[-.85,-.1]:n>=700&&n<1150?[.85,-.1]:[0,0],a.tilt+=-3*s+3*l,a.blink=Math.max(pa(n,1700,1850),pa(n,1950,2100));let i=Zt(Rr((t-2600)/900));a.mouth-=.45*i,a.width*=1-.2*i;break}case"sad":{let r=t%7e3;a.sy-=.045*pa(r,0,1400),a.dy+=.5*fa(r,700,1100,1800,2400);let n=fa(r,3e3,3200,3800,4100);a.gaze=[0,.75-.9*n],a.openL=a.openR=1+.15*n,a.dy-=.4*n;let s=fa(r,4400,4600,5300,5600);a.skew+=.12*Math.sin(o/40)*s,a.mouth+=.05*s,a.smile-=.15*s,a.tilt+=1.5*Math.sin(o/2200);break}case"thinking":{let r=t%6400;a.gaze=r<1200?Nb[0]:r<2400?Nb[1]:Nb[2];let n=fa(r,1200,1500,2100,2400);a.mouthX-=1.8*n,a.skew-=n,a.tilt-=9*n;let s=fa(r,4100,4250,5600,6200);s>.3&&(a.gaze=[0,0]),a.openL*=1+.2*s,a.openR*=1+.4*s,a.scale+=.08*s,a.smile+=.8*s,a.mouthX-=.9*s,a.skew-=.5*s,a.width*=1+.5*s,a.mouth+=.15*s,a.tilt-=5*s,a.dy-=1.6*pa(r,4100,4500),a.tilt+=1.5*Math.sin(o/900);break}case"sleepy":{let r=t%9200,n=r<3e3?Zt(r/3e3):r<3200?1-Zt((r-3e3)/200):0;a.openL=a.openR=1-.8*n,a.dy+=1.6*n,a.tilt+=6*n,a.gaze=[0,.6+.4*n];let s=pa(r,3e3,3350);a.openL*=1+.9*s,a.openR*=1+.9*s,a.dy-=1.4*s,a.scale+=.1*s,r>=3e3&&r<4200&&(a.gaze=[0,0]),a.blink=Math.max(pa(r,3550,3780),pa(r,3900,4130)),a.yawn=fa(r,5400,6200,6800,7600),a.tilt+=2*Math.sin(o/1700),a.steady=r<3e3;break}case"wink":{let r=t%3200,n=0;if(r>150&&r<950){let s=(r-150)/800;n=s<.2?Zt(s/.2):s<.75?1:1-Zt((s-.75)/.25)}a.laughR+=n,a.laughL+=.25*n,a.openL*=1-.12*n,a.skew+=.45*n,a.smile+=.1*n,a.tilt+=5*n,a.dy-=.9*pa(r,150,450),n>0&&(a.gaze=[0,0]),a.steady=n>0;break}}return a}var HR={jump:950,spin:600,bounce:1200,wiggle:800,float:2200},Db=4.5,nr={dy:0,rot:0,sx:1,sy:1,yaw:0,joy:0,gaze:null};function ON(e,t){let o=Rr(t/HR[e]);switch(e){case"jump":{if(t<160){let n=Zt(t/160);return{...nr,sx:1+.1*n,sy:1-.14*n,joy:n*.6}}if(t<560){let n=(t-160)/400,s=.09*Math.abs(Math.cos(Math.PI*n));return{...nr,dy:-44*n*(1-n),sx:1-s*.6,sy:1+s,joy:1}}let a=(t-560)/390,r=.16*Math.exp(-5*a)*Math.cos(10*a);return{...nr,sx:1+r*.7,sy:1-r,joy:1-Zt(a)}}case"spin":{if(t<90){let n=Zt(t/90);return{...nr,yaw:-30*n,sx:1+.06*n,sy:1-.08*n,joy:.3*n,gaze:[-.6*n,0]}}if(t<440){let n=(t-90)/350,s=Math.sin(Math.PI*n)**2,l=1-Zt(Math.min(1,n*4));return{...nr,yaw:-30+390*AN(n),dy:-2.6*s,sx:1+.06*l,sy:1-.08*l+.04*s,joy:.8,gaze:[.8*s,0]}}let a=(t-440)/160,r=.025*Math.sin(Math.PI*a)*(1-a);return{...nr,yaw:360,sx:1+r*.7,sy:1-r,joy:.8*(1-a)}}case"bounce":{let a=Math.abs(Math.sin(Math.PI*3*o)),r=.08*(1-a)**6;return{...nr,dy:-5*a,sx:1+r*.8,sy:1-r,joy:Math.sin(Math.PI*o)}}case"wiggle":return{...nr,rot:14*Math.sin(Math.PI*8*o)*(1-o),joy:.6*Math.sin(Math.PI*o)};case"float":{let a=[0,.9];if(t<520){let s=t/520,l=.05*Math.sin(Math.PI*s);return{...nr,dy:-Db*LR(s),sx:1-l*.6,sy:1+l,joy:.5*s,gaze:s>.4?a:null}}if(t<1500){let s=(t-520)/980;return{...nr,dy:-Db+.8*Math.sin(Math.PI*3*s),rot:4*Math.sin(Math.PI*2*s),joy:.5,gaze:a}}if(t<1820){let s=(t-1500)/320;return{...nr,dy:-Db*(1-s*s),sx:1-.02*s,sy:1+.04*s,joy:.5,gaze:a}}let r=(t-1820)/380,n=.12*Math.exp(-5*r)*Math.cos(10*r)*(1-r);return{...nr,sx:1+n*.7,sy:1-n,joy:.5*(1-r)}}}}var hn={viewBox:"-24 -24 48 48",body:LN,eyes:T0.map(e=>DR(e,M0,1,0,1,0,0)),blush:T0.map(e=>({cx:e*1.6,cy:M0+4.6})),mouth:FR(0,zR,0,.4,1,0),groundY:MN,heart:kN,hearts:E0},AR=e=>({emotion:e.emotion??"neutral",activity:e.activity??"idle",shape:e.shape??"pebble",lookAround:e.lookAround??!0,followCursor:e.followCursor??!1,hoverGiggle:e.hoverGiggle??!0});function VR(e,t={}){let o={config:AR(t),playing:t.motion?{name:t.motion,start:performance.now()}:null,morph:null,onMotionEnd:t.onMotionEnd,onTickle:t.onTickle,tickledAt:-1/0,chuckledAt:-1/0},a=new Float32Array(96).fill(1),r=o.config.shape,n=t.motion??null,s=t.motionKey??0,l=t.chuckleKey??0,i=()=>{let te=performance.now();o.config.hoverGiggle&&te-o.tickledAt>1300&&(o.tickledAt=te,o.onTickle?.())};e.mover.addEventListener("pointerenter",i);let c=window.matchMedia("(prefers-reduced-motion: reduce)").matches,u=null,d=te=>{u=te.pointerType==="mouse"?{x:te.clientX,y:te.clientY}:null},m=()=>{u=null};window.addEventListener("pointermove",d,{passive:!0}),document.documentElement.addEventListener("pointerleave",m);let p={...kR[o.config.emotion]},f=Math.random()*1e3,v=0,g=performance.now(),b=0,w=0,y=0,x=0,h=g+600+Math.random()*1800,I=g+800+Math.random()*2600,R=-1,C=!1,S=-1/0,T=0,P=0,V=g+4e3+Math.random()*4e3,E=Math.random()*360,z=13.4,M=0,O=7,H=0,k=0,N=0,L=5.5,U=1,A=1,ee=0,B=0,Z=6,G=!1,X=-1/0,be=g+900,K=-1/0,Y=0,j=null,se=g,pe=-1/0,oe=-1/0,Se=te=>{let fe=Math.min(.064,(te-g)/1e3);g=te;let de=c?0:te/1e3+f,ve=o.config;ve.emotion!==j&&(j==="love"&&(oe=te),j=ve.emotion,se=te,j==="love"&&(pe=te,oe=1/0));let ge=te-se,je=kR[j],he=Math.min(1,fe*(NN[j]??8));for(let Ne of DN){let D=je[Ne];Number.isNaN(D)?p[Ne]=Number.NaN:Number.isNaN(p[Ne])?p[Ne]=D:p[Ne]+=(D-p[Ne])*he}let le=c?OR():FN(j,ge,te),W=0,Q=0;if(ve.activity==="speaking"){te>B&&te>ee&&(ee=te+160+Math.random()*260,Z-=1,G=Z<=0,B=ee+(G?520+Math.random()*420:60+Math.random()*120),G&&(Z=4+Math.floor(Math.random()*5)),Math.random()<.3&&(X=te));let Ne=te<ee;W=Ne?.55+.35*Math.abs(Math.sin(te/70)):0,Ne?(N+=fe*L*Math.PI*2,N>=Math.PI*2&&(N-=Math.PI*2,L=4.6+Math.random()*2,U=Math.random()<.18?.12:.55+Math.random()*.45,A=Math.random()<.4?.62+Math.random()*.12:1+Math.random()*.2),Q=Math.min(1,(.35+H)*U*(.5-.5*Math.cos(N)))):N=0;let D=pa(te-X,0,280);le.dy-=.7*D,le.scale+=.06*D}else ve.activity==="listening"&&(W=.18+.14*Math.sin(te/240)*Math.sin(te/610));H+=(W-H)*Math.min(1,fe*12),k+=(Q-k)*Math.min(1,fe*(Q>k?30:20));let xe=nr,re=o.playing;if(re&&!c){let Ne=te-re.start;Ne>=HR[re.name]?(o.playing=null,o.onMotionEnd?.(re.name)):xe=ON(re.name,Ne)}let ce=ve.activity==="listening"?1:0;if(ce&&!re&&te>be&&(K=te,Y+=1,be=te+2400+Math.random()*1800),ce&&!c){let Ne=te-K;if(Y%3===0){let D=fa(Ne,0,160,700,1e3);le.scale+=.08*D,le.faceY-=.6*D,le.mouth+=.18*D,le.smile-=.3*D,le.dy-=.5*D}else{let D=pa(Ne,0,300)+.7*pa(Ne,340,640);le.dy+=1.6*D,le.faceY+=1.2*D,le.sy-=.02*D,le.openL*=1-.15*D,le.openR*=1-.15*D,le.smile+=.1*D}le.tilt+=4+1.5*Math.sin(te/2600)}let mt=!1,st=ve.followCursor&&u?e.svg.getBoundingClientRect():void 0;if(u&&st&&st.width>0){let Ne=u.x-(st.left+st.width/2),D=u.y-(st.top+st.height/2),J=st.width*.9;mt=!0,y=Ne/(Math.abs(Ne)+J),x=D/(Math.abs(D)+J),h=te+700}let Xe=xe.gaze??le.gaze;mt||(Xe?(y=Xe[0],x=Xe[1]):Number.isNaN(p.gazeX)?te>h&&(ve.activity==="listening"?(y=(Math.random()-.5)*.3,x=-.05+(Math.random()-.5)*.15):ve.activity==="speaking"?(y=G?Math.random()<.5?-.7:.7:(Math.random()-.5)*.5,x=G?-.5:(Math.random()-.5)*.3):ve.lookAround?(y=[-1,-.6,0,0,.6,1][Math.floor(Math.random()*6)],x=(Math.random()-.5)*1.2):(y=0,x=0),h=te+(ve.activity==="speaking"?500+Math.random()*900:900+Math.random()*2300)):(y=p.gazeX,x=p.gazeY));let Ue=Math.min(1,fe*(mt?14:16));b+=(y-b)*Ue,w+=(x-w)*Ue;let pt=Math.min(1,fe*5);T+=(b-T)*pt,P+=(w-P)*pt,le.steady&&R<0&&(I=Math.max(I,te+400)),R<0&&te>I&&(R=te);let Zo=1;if(R>=0){let Ne=(te-R)/(j==="sleepy"?460:j==="sad"?280:170);Ne>=1?(R=-1,!C&&Math.random()<.22?(C=!0,I=te+90):(C=!1,I=te+2e3+Math.random()*3200)):Zo=1-Math.sin(Ne*Math.PI)*.88}Zo*=1-le.blink*.9;let bt=te-o.tickledAt,Rt=0,ba=0;ve.hoverGiggle&&bt<1300&&(Rt=bt<180?Zt(bt/180):bt<800?1:1-Zt((bt-800)/500),ba=Math.sin(bt/42)*Math.max(0,1-bt/520));let Tt=te-o.chuckledAt,Dt=Tt>0&&Tt<1700?.45*fa(Tt,0,260,1e3,1700):0;Rt=Math.max(Rt,Dt),j==="neutral"&&ve.activity==="idle"&&te>V&&(S=te,V=te+5e3+Math.random()*6e3);let Aa=j==="neutral"?fa(te-S,0,380,1100,1600):0,ya=j==="sleepy"?1:0,Vt=le.yawn,Xo=ve.shape,Sr=p.wobble+H*.6+Rt*.25,We=Xo==="squircle"?90:Xo==="blob"?120:Xo==="pebble"?72:0,Mt=We?0:3.5+H*18;E=c?E:(E+fe*Mt*p.spin)%360,We&&(E+=(Math.round(E/We)*We-E)*Math.min(1,fe*4));let Ee=o.morph,Me=Ee?Zt(Rr((te-Ee.start)/TN)):1,ot=E*Math.PI/180,Lt=a;for(let Ne=0;Ne<96;Ne++){let D=zN(Xo,Ne/96*Math.PI*2-ot,de,Sr);Lt[Ne]=Ee&&Me<1?Ee.from[Ne]+(D-Ee.from[Ne])*Me:D}Ee&&Me>=1&&(o.morph=null);let za=1+(c?0:ya?.03*Math.sin(de/1.1):.015*Math.sin(de/.9))+H*.04;e.body.setAttribute("d",NR(Lt)),e.bodyGroup.setAttribute("transform",`scale(${za.toFixed(4)})`);let yt=xe.yaw*Math.PI/180,Qo=p.bob+ya*.4*Math.sin(te/1100)-Rt*.5+k*.25-Vt*.5,$r=p.tilt+le.tilt+ba*4+xe.rot,Er=xe.dy+Qo+le.dy,cr=Math.min(0,Er),Tr=.7*Math.max(0,Er)/(2*13.4),xs=xe.sy*(1+le.sy+Vt*.03)*(1-Tr),Vn=xe.sx*(1-(le.sy+Vt*.03)*.5)*(1-.04*Math.abs(Math.sin(yt)))*(1+Tr*.5),yi=$r*Math.PI/180,Bn=0;for(let Ne=0;Ne<96;Ne++)Bn=Math.max(Bn,Lt[Ne]*Math.sin(Ne/96*Math.PI*2+yi));Bn*=13.4*za;let Wr=1/0,wi=-1/0;for(let Ne=0;Ne<96;Ne++){let D=Ne/96*Math.PI*2+yi,J=Lt[Ne]*13.4*za;J*Math.sin(D)<Bn-2.2||(Wr=Math.min(Wr,J*Math.cos(D)),wi=Math.max(wi,J*Math.cos(D)))}z+=(Bn-z)*Math.min(1,fe*12),e.mover.setAttribute("transform",`translate(0 ${cr.toFixed(2)}) translate(0 ${13.4}) scale(${Vn.toFixed(4)} ${xs.toFixed(4)}) translate(0 ${(-z).toFixed(2)}) rotate(${$r.toFixed(2)})`);let qr=Rr(-cr/10),_l=(wi-Wr)/2*Vn,p1=(Wr+wi)/2*Vn;M+=(p1-M)*Math.min(1,fe*12),O+=(_l-O)*Math.min(1,fe*12);let Is=e.ground;Is&&(Is.setAttribute("cx",(M*(1-qr)).toFixed(2)),Is.setAttribute("rx",((O+3.2)*(1+.25*qr)).toFixed(2)),Is.setAttribute("ry",(2*(1+.2*qr)).toFixed(2)),Is.setAttribute("opacity",((1-.65*qr)*(.9+2*Tr)).toFixed(3)));let jr=e.core;jr&&(jr.setAttribute("cx",M.toFixed(2)),jr.setAttribute("rx",(O*.95*(1-.4*qr)).toFixed(2)),jr.setAttribute("ry",(.85*(1-.3*qr)).toFixed(2)),jr.setAttribute("opacity",((1-qr)**2*(.9+3*Tr)).toFixed(3)));let Zl=e.face;if(Zl){let Ne=Math.cos(yt);Zl.setAttribute("transform",`translate(${(Math.sin(yt)*13.4*.72).toFixed(2)} 0) scale(${Math.max(.001,Math.abs(Ne)).toFixed(3)} 1)`),Zl.setAttribute("opacity",Zt(Rr((Ne+.1)/.35)).toFixed(3))}let Ku=1-Zt(Rr((te-oe)/200));e.hearts.forEach((Ne,D)=>{if(!Ne)return;let J=te-pe-250-D*(mu/E0),ne=Math.floor(J/mu),me=(J-ne*mu)/PN,ct=pe+250+D*(mu/E0)+ne*mu;if(c||!(J>=0&&J<1/0)||me>=1||ct>oe||Ku<=0){Ne.setAttribute("opacity","0");return}let nt=(D+ne)%2?1:-1,ut=Fb(ne*E0+D),St=nt*(12+1.5*ut+2*me)+.9*Math.sin(Math.PI*2*(1.1*me+ut)),ur=cr-4-ut*2-14*LR(me),xi=(.75+.35*ut)*(.5+.5*Zt(Rr(me/.18))),f1=nt*10+14*Math.sin(Math.PI*2*(.9*me+ut));Ne.setAttribute("transform",`translate(${St.toFixed(2)} ${ur.toFixed(2)}) rotate(${f1.toFixed(1)}) scale(${xi.toFixed(3)})`),Ne.setAttribute("opacity",(Ku*Zt(Rr(me/.12))*(1-Zt(Rr((me-.55)/.45)))).toFixed(3))});let Gl=Math.max(xe.joy,Aa),va=1-Rt,Ul=Math.min(1,p.smile+le.smile+(1-p.smile)*Gl+ce*.15),$l=Math.max(-1,(Ul+(1-Ul)*Rt)*(1-Vt)),_n=1-.18*Math.max(0,($l-.6)/.4),qa=[p.openL*le.openL,p.openR*le.openR],Yu=[p.laughL+le.laughL,p.laughR+le.laughR];e.eyes.forEach((Ne,D)=>{if(!Ne)return;let J=T0[D]+b*1.8*va,ne=M0+p.eyeY+le.faceY+w*1.1*va,me=Rr(Math.max(Yu[D],Rt,xe.joy*.8)),ct=Math.min(.9,p.heavy+p.droop),nt=Math.min(.9,p.heavy),ut=qa[D]*Zo*_n*(1-Vt*.85);Ne.setAttribute("d",DR(J,ne,ut,me,p.eyeScale+le.scale+ce*.04,D===0?ct:nt,D===0?nt:ct)),Ne.setAttribute("stroke-width",(me*.7).toFixed(2));let St=e.blush[D];St&&(St.setAttribute("cx",(T0[D]*1.6+b*1.2*va).toFixed(2)),St.setAttribute("cy",(M0+4.6+le.faceY+w*.7*va).toFixed(2)),St.setAttribute("opacity",Rr(p.blush).toFixed(3)))});let Xu=Rt*(.3+.25*Math.abs(Math.sin(te/85))),Wl=p.mouthW*le.width*(1+(A-1)*k)*(1-Vt*.1),ql=Rr(-$l+p.taper*(1-Vt)),vi=e.mouth;if(vi){vi.setAttribute("d",FR((p.mouthX+le.mouthX)*(1-Vt)+T*1.2*va,zR+p.eyeY*.5+le.faceY+P*.6*va,Math.max(0,p.mouth+le.mouth,k,Xu,xe.joy*.35,Vt*2.1),$l,Wl,(p.skew+le.skew)*(1-Vt),.9*ql));let Ne=Math.min(1,.55+.45*Wl);vi.setAttribute("stroke-width",(1.4*Ne*(1-.6*ql)).toFixed(2))}v=requestAnimationFrame(Se)};v=requestAnimationFrame(Se);let ie=()=>{cancelAnimationFrame(v),window.removeEventListener("pointermove",d),document.documentElement.removeEventListener("pointerleave",m)};return{update(te){o.config=AR(te),o.onMotionEnd=te.onMotionEnd,o.onTickle=te.onTickle,o.config.shape!==r&&(r=o.config.shape,o.morph={from:a.slice(),start:performance.now()});let fe=te.motion??null,de=te.motionKey??0;(fe!==n||de!==s)&&(n=fe,s=de,o.playing=fe?{name:fe,start:performance.now()}:null);let ve=te.chuckleKey??0;ve!==l&&(l=ve,o.chuckledAt=performance.now()+140+Math.random()*160)},destroy(){ie(),e.mover.removeEventListener("pointerenter",i)}}}import{jsx as sa,jsxs as pu}from"react/jsx-runtime";function ii({colors:e,size:t=24,label:o="Agent",emotion:a="neutral",activity:r="idle",shape:n="pebble",motion:s,motionKey:l,lookAround:i=!1,hoverGiggle:c=!0,className:u=""}){let d=`hui-bot-${HN().replace(/:/g,"")}`,m={svg:sr(null),mover:sr(null),bodyGroup:sr(null),body:sr(null),face:sr(null),mouth:sr(null),ground:sr(null),core:sr(null)},p=sr([]),f=sr([]),v=sr([]),g=sr(null),b={emotion:a,activity:r,shape:n,lookAround:i,hoverGiggle:c,...s?{motion:s,motionKey:l}:{}},w=sr(b);BR(()=>{w.current=b,g.current?.update?.(b)}),BR(()=>{let x={svg:m.svg.current,mover:m.mover.current,bodyGroup:m.bodyGroup.current,body:m.body.current,face:m.face.current,mouth:m.mouth.current,ground:m.ground.current,core:m.core.current};if(!Object.values(x).some(h=>!h)){try{g.current=VR({...x,eyes:p.current,blush:f.current,hearts:v.current},w.current)}catch{g.current=null}return()=>{g.current?.destroy?.(),g.current=null}}},[]);let y={"--bot-size":`${t}px`,...e?{"--bot-1":e[0],"--bot-2":e[1]}:null};return sa("span",{className:`hui-bot ${u}`,style:y,role:"img","aria-label":o,children:pu("svg",{ref:m.svg,viewBox:hn.viewBox,"aria-hidden":"true",children:[pu("defs",{children:[pu("radialGradient",{id:d,gradientUnits:"userSpaceOnUse",cx:"-4.8",cy:"-6.4",r:"24",children:[sa("stop",{className:"stop1",offset:"0"}),sa("stop",{className:"stop2",offset:"1"})]}),sa("filter",{id:`${d}-soft`,x:"-50%",y:"-300%",width:"200%",height:"700%",children:sa("feGaussianBlur",{stdDeviation:"1.3"})}),sa("filter",{id:`${d}-core`,x:"-50%",y:"-300%",width:"200%",height:"700%",children:sa("feGaussianBlur",{stdDeviation:"0.8"})}),sa("filter",{id:`${d}-blush`,x:"-100%",y:"-100%",width:"300%",height:"300%",children:sa("feGaussianBlur",{stdDeviation:"0.55"})})]}),sa("ellipse",{ref:m.ground,className:"ground",cx:"0",cy:hn.groundY,rx:"10",ry:"2.1",filter:`url(#${d}-soft)`}),sa("ellipse",{ref:m.core,className:"core",cx:"0",cy:hn.groundY,rx:"6.5",ry:"0.9",filter:`url(#${d}-core)`}),pu("g",{ref:m.mover,children:[sa("g",{ref:m.bodyGroup,children:sa("path",{ref:m.body,d:hn.body,fill:`url(#${d})`})}),pu("g",{ref:m.face,children:[hn.blush.map((x,h)=>sa("ellipse",{ref:I=>{f.current[h]=I},className:"blush",cx:x.cx,cy:x.cy,rx:"1.9",ry:"1.1",opacity:"0",filter:`url(#${d}-blush)`},`b${h}`)),hn.eyes.map((x,h)=>sa("path",{ref:I=>{p.current[h]=I},className:"face",d:x,strokeWidth:0,strokeLinejoin:"round"},`e${h}`)),sa("path",{ref:m.mouth,className:"face",d:hn.mouth,strokeWidth:1.4,strokeLinecap:"round",strokeLinejoin:"round"})]})]}),Array.from({length:hn.hearts},(x,h)=>sa("path",{ref:I=>{v.current[h]=I},className:"heart",d:hn.heart,opacity:"0"},h))]})})}var _R={default:"Chief of Staff",dex:"CTO",preto:"Head of SEO",mint:"Head of Growth",prism:"Head of Content",youtubot:"Head of YouTube","bot-builder":"Bot Builder"};function VN(e,t){return e&&_R[e]?_R[e]:(t||"").trim()}function ZR(e,t){let o=VN(e,t);return o?`${si(e)} · ${o}`:si(e)}function k0(e){let t=MR(e||"default");return{colors:[t.colors[0],t.colors[1]],shape:t.shape}}var Ob=6e4,Hb=60*Ob,P0=24*Hb;function Vb(e){if(!e)return"maint.";let t=Date.now()-e;return!Number.isFinite(t)||t<Ob?"maint.":t<Hb?`${Math.floor(t/Ob)} min`:t<P0?`${Math.floor(t/Hb)} h`:t<2*P0?"hier":t<7*P0?`${Math.floor(t/P0)} j`:new Date(e).toLocaleDateString("fr-FR",{day:"numeric",month:"short"})}function A0(e){let t=typeof e=="number"?e:Number(e);return Number.isFinite(t)?Math.max(0,Math.min(100,Math.round(t))):0}var ir=df({asideOpen:!0,railOpen:!1});function GR(e){let t=!0;try{t=e?.storage?.get("asideOpen",!0)!==!1}catch{}ir.set({asideOpen:t})}function z0(e){let t=!ir.get().asideOpen;ir.set({asideOpen:t});try{e?.storage?.set("asideOpen",t)}catch{}}import{jsx as It,jsxs as Vr}from"react/jsx-runtime";var _N=["Fais le point sur tes tâches","Qu'as-tu produit aujourd'hui ?","Propose-moi la prochaine action"];function UR({ctx:e,narrowRail:t}){let o=Ht(Le,g=>g.messages),a=Ht(Le,g=>g.live),r=Ht(Le,g=>g.sid),n=Ht(Le,g=>g.bot),s=Ht(Le,g=>g.bots),l=Ht(Le,g=>g.ready),i=Ht(ir,g=>g.asideOpen),c=Ht(ir,g=>g.railOpen),u=BN(null),d=s.find(g=>g.name===n),m=si(d||n),p=k0(n),f=a?"streaming":"idle",v=a?"streaming":"ready";return Vr("main",{className:"relative my-2 me-2 flex min-h-0 min-w-0 flex-col overflow-hidden rounded-panel bg-paper",children:[Vr("div",{className:"absolute end-3 top-3 z-(--z-raised) flex items-center gap-1",children:[t?It(un,{children:Vr(or,{children:[It(ar,{render:It($e,{variant:"ghost",size:"icon-sm","aria-label":"Afficher ou masquer la liste des bots",onClick:()=>ir.set({railOpen:!c})}),children:It(Ce,{icon:Oc,size:14})}),It(Va,{children:"Afficher les bots"})]})}):null,It(un,{children:Vr(or,{children:[It(ar,{render:It($e,{variant:"ghost",size:"icon-sm","aria-label":i?"Masquer le panneau":"Afficher le panneau",onClick:()=>z0(e)}),children:It(Ce,{icon:Oc,size:14})}),It(Va,{shortcut:["mod","alt","B"],children:i?"Masquer le panneau":"Afficher le panneau"})]})})]}),Vr(G4,{status:f,children:[It(U4,{className:"min-h-0 flex-1",children:It($4,{"aria-label":`Conversation avec ${m}`,className:"px-4",children:Vr(W4,{className:"mx-auto flex w-full max-w-measure flex-col gap-6 pb-6",children:[It("div",{className:"sticky top-3 z-(--z-raised) flex justify-center pt-1",children:Vr("span",{className:"inline-flex items-center gap-2 rounded-pill bg-shell px-3 py-1.5 type-label text-text-1",children:[It(ii,{size:20,colors:p.colors,shape:p.shape,label:m,hoverGiggle:!1}),m]})}),l?o.length?o.map(g=>g.role==="user"?It(js,{from:"user",children:Vr(Ks,{children:[Vr(Ys,{children:["Ilyass",It(Xs,{children:Lb(g.at)})]}),It(nl,{children:It(sl,{children:g.text})})]})},g.id):It(rl,{name:m,time:Lb(g.at),state:g.status==="failed"?"fail":g.status==="streaming"?"live":"done",children:It(bl,{streaming:g.status==="streaming",children:g.text})},g.id)):Vr("div",{className:"flex flex-col items-center gap-4 py-16 text-center",children:[It(ii,{size:72,colors:p.colors,shape:p.shape,label:m}),Vr("h1",{className:"type-heading text-text-1",children:["Que fait-on avec ",m," ?"]}),It(SR,{"aria-label":"Suggestions",children:_N.map(g=>It(RR,{onClick:()=>u.current?.insert(g),children:g},g))})]}):It("p",{className:"py-10 text-center type-body-sm text-text-3",children:"Connexion à Hermes…"})]})})}),It(ZN,{composer:u,status:v,sid:r,current:n,name:m})]})]})}function ZN({composer:e,status:t,sid:o,current:a,name:r}){let{snap:n}=Gf();return It("div",{className:"px-4 pb-4",children:It("div",{className:"mx-auto w-full max-w-measure",children:It(b0,{ref:e,status:t,generation:o||void 0,draftKey:`hermes-ui-${a||"default"}`,placeholder:`Écrire à ${r}`,onStop:()=>void tI(),onSubmit:s=>{eI(s.serialized||s.text),n()}})})})}import{useEffect as yF,useMemo as wF,useRef as OE,useState as yy}from"react";var Cl={};Jo(Cl,{Fallback:()=>KR,Image:()=>jR,Root:()=>$R});import*as xl from"react";import*as L0 from"react";var Bb=L0.createContext(void 0);function N0(){let e=L0.useContext(Bb);if(e===void 0)throw new Error(De(13));return e}var vl={imageLoadingStatus:()=>null};import{jsx as GN}from"react/jsx-runtime";var $R=xl.forwardRef(function(t,o){let{className:a,render:r,style:n,...s}=t,[l,i]=xl.useState("idle"),c={imageLoadingStatus:l},u=xl.useMemo(()=>({imageLoadingStatus:l,setImageLoadingStatus:i}),[l,i]),d=ae("span",t,{state:c,ref:o,props:s,stateAttributesMapping:vl});return GN(Bb.Provider,{value:u,children:d})});import*as fu from"react";import*as WR from"react";function qR(e,{referrerPolicy:t,crossOrigin:o,sizes:a,srcSet:r},n){let s=WR.useState("idle"),l=s[1];return _(()=>{if(!n)return Be;if(!e&&!r)return l("error"),Be;let i=!0,c=new window.Image,u=d=>()=>{i&&l(d)};return l("loading"),c.onload=u("loaded"),c.onerror=u("error"),t&&(c.referrerPolicy=t),c.crossOrigin=o??null,a&&(c.sizes=a),r&&(c.srcset=r),e&&(c.src=e),c.complete&&l(c.naturalWidth>0?"loaded":"error"),()=>{i=!1}},[n,e,r,a,o,t,l]),s}var UN={...vl,...la},jR=fu.forwardRef(function(t,o){let{className:a,render:r,onLoadingStatusChange:n,keepMounted:s=!1,style:l,sizes:i,srcSet:c,src:u,...d}=t,{setImageLoadingStatus:m}=N0(),[p,f]=qR(u,t,!s),v=p==="loaded",{mounted:g,transitionStatus:b,setMounted:w}=da(v),y=fu.useRef(null),x=fu.useRef(!0);_(()=>{if(!s)return;let P=x.current;x.current=!1;let V=y.current;if(!V)return;if(!V.complete){f("loading");return}let E=V.naturalWidth>0?"loaded":"error";f(E),E==="loaded"&&P&&w(!0)},[s,u,c,i,d.crossOrigin,d.referrerPolicy,r,f,w]);let h=s?{"data-loading":p==="loading"?"":void 0,"data-error":p==="error"?"":void 0,"aria-hidden":p!=="loaded"||void 0,onLoad(){f("loaded")},onError(){f("error")}}:void 0,I=$(P=>{n?.(P),m(P)});_(()=>{p!=="idle"&&I(p)},[p,I]),_(()=>()=>m("idle"),[m]),Oo({enabled:!v,open:v,ref:y,onComplete(){v||w(!1)}});let R={imageLoadingStatus:p,transitionStatus:s&&b==="ending"?void 0:b},C=s||g,S={};i!==void 0&&(S.sizes=i),c!==void 0&&(S.srcSet=c),u!==void 0&&(S.src=u);let T=ae("img",t,{state:R,ref:[o,y],props:[h,d,S],stateAttributesMapping:UN,enabled:C});return C?T:null});import*as Il from"react";var KR=Il.forwardRef(function(t,o){let{className:a,render:r,delay:n=0,style:s,...l}=t,{imageLoadingStatus:i}=N0(),[c,u]=Il.useState(n===0),d=Qe();return Il.useEffect(()=>(n>0?d.start(n,()=>u(!0)):u(!0),d.clear),[d,n]),ae("span",t,{state:{imageLoadingStatus:i},ref:o,props:l,stateAttributesMapping:vl,enabled:i!=="loaded"&&(n===0||c)})});import{Children as Que,createContext as $N,isValidElement as Jue,useContext as WN}from"react";import{Fragment as XN,jsx as Ln,jsxs as QN}from"react/jsx-runtime";var qN=Ye(["group/avatar relative inline-flex shrink-0 select-none",'after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-line after:content-[""]'],{variants:{size:{xs:"size-4",sm:"size-5",default:"size-6",lg:"size-8"},type:{person:"rounded-pill",agent:"rounded-tag",source:"rounded-tag"}},defaultVariants:{size:"default",type:"person"}});function jN(e,t="default"){let a=e.replace(/^(https?:\/\/)?(www\.)?/i,"").split("@")[0].split(/[\s._\-/]+/).map(r=>r.match(/[\p{L}\p{N}]/gu)?.join("")??"").filter(Boolean);return a.length?t==="xs"||t==="sm"?[...a[0]][0].toUpperCase():a.length===1?[...a[0]].slice(0,2).join("").toUpperCase():([...a[0]][0]+[...a[a.length-1]][0]).toUpperCase():""}var YR={xs:12,sm:12,default:14,lg:16},XR=$N({type:"person",size:"default"});function D0({className:e,size:t="default",type:o="person",name:a,src:r,decorative:n,children:s,...l}){let i=t??"default",c=o??"person",u=!!a&&!n;return Ln(XR.Provider,{value:{type:c,size:i},children:Ln(Cl.Root,{"data-slot":"avatar","data-size":i,"data-type":c,role:u?"img":void 0,"aria-label":u?a:void 0,"aria-hidden":n||void 0,className:Et(qN({size:i,type:c}),e),...l,children:s??QN(XN,{children:[r&&Ln(KN,{src:r,alt:"",referrerPolicy:c==="source"?"no-referrer":void 0}),Ln(gu,{children:a&&c==="person"&&jN(a,i)||void 0})]})})})}function KN({className:e,...t}){return Ln(Cl.Image,{"data-slot":"avatar-image",decoding:"async",draggable:!1,className:Et("aspect-square size-full rounded-[inherit] object-cover group-data-[type=source]/avatar:object-contain",e),...t})}function gu({className:e,children:t,...o}){return Ln(Cl.Fallback,{"data-slot":"avatar-fallback",className:Et(["flex size-full items-center justify-center overflow-hidden rounded-[inherit] bg-field pe-(--avatar-covered) type-label-sm leading-none text-text-1","group-data-[type=agent]/avatar:text-text-2 group-data-[type=source]/avatar:text-text-2 group-data-[size=lg]/avatar:type-label","forced-colors:border forced-colors:border-[CanvasText]"],e),...o,children:t??Ln(YN,{})})}function YN(){let{type:e,size:t}=WN(XR);return e==="source"?Ln(Ce,{icon:P6,size:YR[t]}):e==="agent"?Ln(Ce,{icon:h6,size:YR[t]}):null}import*as ka from"react";var lr={};Jo(lr,{Arrow:()=>H0,Backdrop:()=>B0,CheckboxItem:()=>G0,CheckboxItemIndicator:()=>$0,Clear:()=>SE,Empty:()=>PE,FilterProvider:()=>yE,Group:()=>q0,GroupLabel:()=>j0,Handle:()=>Pu,Input:()=>vE,Item:()=>K0,LinkItem:()=>Y0,List:()=>xE,Popup:()=>ug,Portal:()=>mg,Positioner:()=>gg,RadioGroup:()=>bg,RadioItem:()=>wg,RadioItemIndicator:()=>xg,Root:()=>FS,Separator:()=>kg,SubmenuRoot:()=>Tg,SubmenuTrigger:()=>Ag,Trigger:()=>_S,Viewport:()=>GS,createHandle:()=>WS,useFilter:()=>Ng});import*as QR from"react";import*as F0 from"react";var _b=F0.createContext(void 0);function us(e){let t=F0.useContext(_b);if(t===void 0&&!e)throw new Error(De(33));return t}import*as O0 from"react";var li=O0.createContext(void 0);function _e(e){let t=O0.useContext(li);if(t===void 0&&!e)throw new Error(De(36));return t}var H0=QR.forwardRef(function(t,o){let{render:a,className:r,style:n,...s}=t,{store:l}=_e(),{arrowRef:i,side:c,align:u,arrowUncentered:d,arrowStyles:m}=us(),f={open:l.useState("open"),side:c,align:u,uncentered:d};return ae("div",t,{ref:[i,o],stateAttributesMapping:Ms,state:f,props:{style:m,"aria-hidden":!0,...s}})});import*as JR from"react";import*as V0 from"react";var Zb=V0.createContext(void 0);function bn(e=!0){let t=V0.useContext(Zb);if(t===void 0&&!e)throw new Error(De(25));return t}var B0=JR.forwardRef(function(t,o){let{render:a,className:r,style:n,...s}=t,{store:l}=_e(),i=l.useState("open"),c=l.useState("mounted"),u=l.useState("transitionStatus"),d=l.useState("lastOpenChangeReason"),m=bn(),p={open:i,transitionStatus:u};return ae("div",t,{ref:m?.backdropRef?[o,m.backdropRef]:o,state:p,stateAttributesMapping:Ci,props:[{role:"presentation",hidden:!c,style:{pointerEvents:d===q.triggerHover?"none":void 0,userSelect:"none",WebkitUserSelect:"none"}},s]})});import*as yu from"react";import*as hu from"react";var bu=hu.createContext(null);function yn(e="root"){let t=hu.useContext(bu),o=hu.useContext(li);return t===null||o===void 0?null:(e==="submenu-trigger"?o.virtualFocus||o.parentVirtualFocus:o.virtualFocus)?t:null}function Rl(e){if(yn()===null)throw new Error(De(104,e))}var JN={visible:!0,ref:null};function eD(){return JN}function wn(e,t,o="root"){let a=yn(o),n=((o==="submenu-trigger"?a?.useSubmenuTrigger:a?.useItem)??eD)({label:e.label,children:e.children,render:e.render}),s=Bt(t,n.ref);return{visible:n.visible,ref:s,props:n.props}}import*as _0 from"react";var Gb=_0.createContext(void 0);function eS(){let e=_0.useContext(Gb);if(e===void 0)throw new Error(De(30));return e}import*as Sl from"react";import*as tS from"react";function tD(e){e.preventDefault()}function Z0(e){let{closeOnClick:t,highlighted:o,id:a,nodeId:r,store:n,typingRef:s,itemRef:l,itemMetadata:i}=e,c=_e(),u=bn(!0),d=i.type==="submenu-trigger",m=d?c.parentVirtualFocus:c.virtualFocus,f=(d&&c.parent.type==="menu"?c.parent.store:c.store).useState("webkitAriaSelected",o),{events:v}=n.useState("floatingTreeRoot"),g=n.useState("open"),b=u!==void 0,w=!m&&g&&o?0:-1;return tS.useMemo(()=>({id:a,role:"menuitem",tabIndex:w,"aria-selected":f,onMouseDown:m?tD:void 0,onKeyDown(y){y.key===" "&&s?.current&&y.preventDefault()},onMouseMove(y){r&&v.emit("itemhover",{nodeId:r,target:y.currentTarget})},onClick(y){t&&v.emit("close",{domEvent:y.nativeEvent,reason:q.itemPress})},onMouseUp(y){if(u){let x=u.initialCursorPointRef.current;if(u.initialCursorPointRef.current=null,b&&x&&Math.abs(y.clientX-x.x)<=1&&Math.abs(y.clientY-x.y)<=1||b&&!at.os.mac&&y.button===2)return}l.current&&n.context.allowMouseUpTriggerRef.current&&(!b||y.button===2)&&i.type==="regular-item"&&on(l.current,y,{detail:1,pointerType:"mouse"})}}),[t,w,a,v,r,n.context.allowMouseUpTriggerRef,s,l,u,b,i.type,f,m])}var ds={type:"regular-item"};function ms(e){let{closeOnClick:t,disabled:o,highlighted:a,id:r,store:n,typingRef:s=n.context.typingRef,nativeButton:l,itemMetadata:i,nodeId:c}=e,u=Sl.useRef(null),{getButtonProps:d,buttonRef:m}=Ut({disabled:o,focusableWhenDisabled:!0,native:l,composite:!0}),p=Z0({closeOnClick:t,highlighted:a,id:r,nodeId:c,store:n,typingRef:s,itemRef:u,itemMetadata:i}),f=Sl.useCallback(g=>rt(p,{onMouseEnter(b){i.type==="submenu-trigger"&&i.setActive(b.nativeEvent)}},g,d),[p,d,i]),v=Bt(u,m);return Sl.useMemo(()=>({getItemProps:f,itemRef:v}),[f,v])}var oS="data-checked",aS="data-unchecked";var ps={checked(e){return e?{[oS]:""}:{[aS]:""}},...la};import{jsx as rS}from"react/jsx-runtime";var oD=yu.forwardRef(function(t,o){let{render:a,className:r,id:n,label:s,nativeButton:l=!1,disabled:i=!1,closeOnClick:c=!1,checked:u=!1,onCheckedChange:d,style:m,...p}=t,{store:f}=_e(),v=Cr({guess:!0,label:s}),g=qe(n),b=f.useState("disabled"),w=f.useState("isActive",v.index),y=f.useState("floatingNodeId"),x=f.useState("itemProps"),h=i||b,{getItemProps:I,itemRef:R}=ms({closeOnClick:c,disabled:h,highlighted:w,id:g,store:f,nativeButton:l,nodeId:y,itemMetadata:ds}),C=yu.useMemo(()=>({disabled:h,highlighted:w,checked:u}),[h,w,u]);function S(P){let V=we(q.itemPress,P.nativeEvent,void 0,{preventUnmountOnClose:Be});d?.(!u,V)}let T=ae("div",t,{state:C,stateAttributesMapping:ps,props:[x,{role:"menuitemcheckbox","aria-checked":u,onClick:S},p,I],ref:[R,o,v.ref]});return rS(Gb.Provider,{value:C,children:T})}),G0=yu.forwardRef(function(t,o){let{checked:a,defaultChecked:r,onCheckedChange:n,...s}=t,[l,i]=Ba({controlled:a,default:r??!1,name:"MenuCheckboxItem",state:"checked"}),c=wn(t,o);function u(d,m){n?.(d,m),m.isCanceled||i(d)}return c.visible?rS(oD,{...s,checked:l,onCheckedChange:u,ref:c.ref}):null});import*as U0 from"react";var $0=U0.forwardRef(function(t,o){let{render:a,className:r,style:n,keepMounted:s=!1,...l}=t,i=eS(),c=U0.useRef(null),{transitionStatus:u,mounted:d,setMounted:m}=da(i.checked);Oo({batch:!0,enabled:!i.checked,open:i.checked,ref:c,onComplete(){i.checked||m(!1)}});let p={checked:i.checked,disabled:i.disabled,highlighted:i.highlighted,transitionStatus:u};return ae("span",t,{state:p,ref:[o,c],stateAttributesMapping:ps,props:{"aria-hidden":!0,...l},enabled:s||d})});import*as vu from"react";import*as W0 from"react";var wu=W0.createContext(void 0);function nS(){let e=W0.useContext(wu);if(e===void 0)throw new Error(De(31));return e}import{jsx as sS}from"react/jsx-runtime";var $b=vu.forwardRef(function(t,o){let{render:a,className:r,style:n,...s}=t,[l,i]=vu.useState(void 0),c=ae("div",t,{ref:o,props:{role:"group","aria-labelledby":l,...s}});return sS(wu.Provider,{value:i,children:c})}),q0=vu.forwardRef(function(t,o){let a=yn()?.Group??$b;return sS(a,{...t,ref:o})});import*as iS from"react";var j0=iS.forwardRef(function(t,o){let{render:a,className:r,style:n,id:s,...l}=t,i=qe(s),c=nS();return _(()=>(c(i),()=>{c(u=>u===i?void 0:u)}),[c,i]),ae("div",t,{ref:o,props:{id:i,"aria-hidden":!0,...l}})});import*as Wb from"react";import{jsx as aD}from"react/jsx-runtime";var rD=Wb.forwardRef(function(t,o){let{render:a,className:r,id:n,label:s,nativeButton:l=!1,disabled:i=!1,closeOnClick:c=!0,style:u,...d}=t,{store:m}=_e(),p=Cr({guess:!0,label:s}),f=qe(n),v=m.useState("disabled"),g=m.useState("isActive",p.index),b=m.useState("floatingNodeId"),w=m.useState("itemProps"),y=i||v,{getItemProps:x,itemRef:h}=ms({closeOnClick:c,disabled:y,highlighted:g,id:f,store:m,nativeButton:l,nodeId:b,itemMetadata:ds});return ae("div",t,{state:{disabled:y,highlighted:g},props:[w,d,x],ref:[h,o,p.ref]})}),K0=Wb.forwardRef(function(t,o){let a=wn(t,o);return a.visible?aD(rD,{...t,ref:a.ref}):null});import*as xu from"react";import{jsx as nD}from"react/jsx-runtime";var sD=xu.forwardRef(function(t,o){let{render:a,className:r,id:n,label:s,closeOnClick:l=!1,style:i,...c}=t,{store:u}=_e(),d=xu.useRef(null),m=Cr({guess:!0,label:s}),p=qe(n),f=u.useState("isActive",m.index),v=u.useState("floatingNodeId"),g=u.useState("itemProps"),b=u.context.typingRef,{getButtonProps:w,buttonRef:y}=Ut({native:!1,composite:!0}),x=Z0({closeOnClick:l,highlighted:f,id:p,nodeId:v,store:u,typingRef:b,itemRef:d,itemMetadata:ds});function h(R){return rt(x,R,w)}return ae("a",t,{state:{highlighted:f},props:[g,c,h],ref:[d,y,o,m.ref]})}),Y0=xu.forwardRef(function(t,o){let a=wn(t,o);return a.visible?nD(sD,{...t,ref:a.ref}):null});import*as ci from"react";import*as X0 from"react";var iD=X0.createContext(void 0);function Q0(e){let t=X0.useContext(iD);if(t===void 0&&!e)throw new Error(De(69));return t}var eg="ArrowUp",tg="ArrowDown",og="ArrowLeft",ag="ArrowRight",rg="Home",ng="End";var sg=new Set([eg,tg,og,ag,rg,ng]),qb="Shift",cS=[qb,"Control","Alt","Meta"];function lD(e){return Fe(e)&&e.tagName==="INPUT"}function jb(e){return!!(lD(e)&&e.selectionStart!=null||Fe(e)&&e.tagName==="TEXTAREA")}function Kb(e,t,o,a){if(!e||!t||!t.scrollTo)return;let r=e.scrollLeft,n=e.scrollTop,s=e.clientWidth<e.scrollWidth,l=e.clientHeight<e.scrollHeight;if(s&&a!=="vertical"){let i=lS(e,t,"left"),c=J0(e),u=J0(t);o==="ltr"&&(i+t.offsetWidth+u.scrollMarginRight>e.scrollLeft+e.clientWidth-c.scrollPaddingRight?r=i+t.offsetWidth+u.scrollMarginRight-e.clientWidth+c.scrollPaddingRight:i-u.scrollMarginLeft<e.scrollLeft+c.scrollPaddingLeft&&(r=i-u.scrollMarginLeft-c.scrollPaddingLeft)),o==="rtl"&&(i-u.scrollMarginLeft<e.scrollLeft+c.scrollPaddingLeft?r=i-u.scrollMarginLeft-c.scrollPaddingLeft:i+t.offsetWidth+u.scrollMarginRight>e.scrollLeft+e.clientWidth-c.scrollPaddingRight&&(r=i+t.offsetWidth+u.scrollMarginRight-e.clientWidth+c.scrollPaddingRight))}if(l&&a!=="horizontal"){let i=lS(e,t,"top"),c=J0(e),u=J0(t);i-u.scrollMarginTop<e.scrollTop+c.scrollPaddingTop?n=i-u.scrollMarginTop-c.scrollPaddingTop:i+t.offsetHeight+u.scrollMarginBottom>e.scrollTop+e.clientHeight-c.scrollPaddingBottom&&(n=i+t.offsetHeight+u.scrollMarginBottom-e.clientHeight+c.scrollPaddingBottom)}e.scrollTo({left:r,top:n,behavior:"auto"})}function lS(e,t,o){let a=o==="left"?"offsetLeft":"offsetTop",r=0;for(;t.offsetParent&&(r+=t[a],t.offsetParent!==e);)t=t.offsetParent;return r}function J0(e){let t=getComputedStyle(e);return{scrollMarginTop:parseFloat(t.scrollMarginTop)||0,scrollMarginRight:parseFloat(t.scrollMarginRight)||0,scrollMarginBottom:parseFloat(t.scrollMarginBottom)||0,scrollMarginLeft:parseFloat(t.scrollMarginLeft)||0,scrollPaddingTop:parseFloat(t.scrollPaddingTop)||0,scrollPaddingRight:parseFloat(t.scrollPaddingRight)||0,scrollPaddingBottom:parseFloat(t.scrollPaddingBottom)||0,scrollPaddingLeft:parseFloat(t.scrollPaddingLeft)||0}}import*as ig from"react";var Iu=ig.createContext(void 0);function El(){return ig.useContext(Iu)}import*as lg from"react";function cD(e,t){let o=As(e.render);if(lg.isValidElement(o)){let a=o.props;if(Object.hasOwn(a,"id"))return a.id??""}return e.id??t}function cg(e,t,o){let a=cD(e,t),r=a===t?void 0:a,n=lg.useCallback(s=>o?.(s?r:void 0),[r,o]);return[a,n]}import*as uS from"react";function Tl(e,t,o){let a=As(e.render),r=uS.isValidElement(a)?a.props:void 0,n=e["aria-label"]??r?.["aria-label"],s=e["aria-labelledby"]??r?.["aria-labelledby"];return s==null&&!n&&(s=t?t.id||void 0:o||void 0),s}import{jsx as dS}from"react/jsx-runtime";var Yb=ci.forwardRef(function(t,o){let{render:a,className:r,style:n,finalFocus:s,id:l,initialFocus:i,...c}=t,{store:u,defaultFloatingId:d,setRenderedFloatingId:m,virtualFocus:p,orientation:f}=_e(),v=El(),{side:g,align:b}=us(),w=Q0(!0)!=null,y=u.useState("open"),x=u.useState("transitionStatus"),h=u.useState("popupProps"),I=u.useState("mounted"),R=u.useState("instantType"),C=u.useState("activeTriggerElement"),S=u.useState("parent"),T=u.useState("lastOpenChangeReason"),P=u.useState("rootId"),V=u.useState("floatingRootContext"),E=u.useState("floatingTreeRoot"),z=u.useState("closeDelay"),M=u.useState("hoverEnabled"),O=u.useState("disabled"),H=u.useState("openMethod"),k=u.useState("activeTriggerId"),N=u.useState("listElement"),[L,U]=cg(t,d,m),A=Tl(t,C,k),ee=S.type==="menu"?v:void 0,B=S.type==="context-menu",Z=i??S.type!=="menu";i===void 0&&N&&S.type!=="menu"&&(Z=()=>u.state.activeIndex!==null?!1:N),Oo({open:y,ref:u.context.popupRef,onComplete(){y&&u.context.onOpenChangeComplete?.(!0)}}),ci.useEffect(()=>{function oe(Se){u.setOpen(!1,we(Se.reason,Se.domEvent))}return E.events.on("close",oe),()=>{E.events.off("close",oe)}},[E.events,u]),Ec(V,{enabled:M&&!O&&!B&&S.type!=="menubar",closeDelay:z});let G=u.useStateSetter("popupElement"),X=ci.useContext(bu)?.useParentHandoff??dD,{parentVirtualFocusRef:be,handleFocus:K}=X(u,S,y,p),Y={transitionStatus:x,side:g,align:b,open:y,nested:S.type==="menu",instant:R},j=ae("div",t,{state:Y,ref:[o,u.context.popupRef,G,U],stateAttributesMapping:Ci,props:[h,{id:L,...N?{role:"presentation"}:{role:"menu","aria-orientation":f==="horizontal"?"horizontal":void 0,"aria-labelledby":A},onKeyDown(oe){ee?.onPopupKeyDown?.(oe),w&&sg.has(oe.key)&&oe.stopPropagation()},onFocus:K},Hi(x),c,{"data-rootownerid":P}]}),se=S.type===void 0||B;(C||S.type==="menubar"&&T!==q.outsidePress)&&(se=!0);let pe=ee?.getReturnElement??be;return dS(uh,{context:V,openInteractionType:H,modal:B,disabled:!I,returnFocus:s??pe??se,explicitReturnFocus:s===void 0&&pe?!1:void 0,initialFocus:Z,restoreFocus:!0,getInsideElements:S.type===void 0?()=>[u.context.beforeTriggerFocusGuardRef.current]:void 0,externalTree:S.type!=="menubar"?E:void 0,previousFocusableElement:C,nextFocusableElement:S.type===void 0?u.context.triggerFocusTargetRef:void 0,beforeContentFocusGuardRef:u.context.beforeContentFocusGuardRef,children:j})}),uD={parentVirtualFocusRef:void 0,handleFocus:void 0};function dD(){return uD}var ug=ci.forwardRef(function(t,o){let a=yn()?.Popup??Yb;return dS(a,{...t,ref:o})});import*as fS from"react";import*as dg from"react";var Xb=dg.createContext(void 0);function mS(){let e=dg.useContext(Xb);if(e===void 0)throw new Error(De(32));return e}import{jsx as pS}from"react/jsx-runtime";var mg=fS.forwardRef(function(t,o){let{keepMounted:a=!1,...r}=t,{store:n,parent:s}=_e();if(!(n.useState("mounted")||a))return null;let c=s.type==="menu"||s.type==="menubar"?"group":void 0;return pS(Xb.Provider,{value:a,children:pS(th,{ref:o,...r,portalOwnerRole:c})})});import*as fs from"react";import*as Nn from"react";import{jsx as mD}from"react/jsx-runtime";function pg(e){let{children:t,elementsRef:o,labelsRef:a,onMapChange:r}=e,n=$(r),[,s]=Nn.useState(0),l=Ze(fD).current,i=Ze(pD).current,c=Nn.useRef(0),u=Nn.useRef(!0),d=Nn.useRef(null),m=Nn.useRef(null),p=$(()=>{u.current||(u.current=!0,s(h=>h+1))}),f=$((h,I)=>{i.set(h,I),p()}),v=$(h=>{i.delete(h),p()}),g=$(h=>{let I=new Map;return o.current.length=0,a&&(a.current.length=0),h.forEach(R=>{I.set(R.element,{...R.registration.metadata??{},index:R.index}),o.current[R.index]=R.element,a&&(a.current[R.index]=R.registration.label!==void 0?R.registration.label:R.registration.textRef?.current?.textContent??R.element.textContent)}),c.current=o.current.length,I});function b(h){if(m.current?.disconnect(),m.current=null,typeof MutationObserver!="function"||h.length<2)return;let I=new MutationObserver(C=>{if(!bD(C))return;let S=null;for(let T of h)if(T.isConnected){if(S&&gS(S,T)>0){I.disconnect(),p();return}S=T}});m.current=I;let R=new Set;for(let C=1;C<h.length;C+=1){let S=hD(h[C-1],h[C]);S&&R.add(S)}R.forEach(C=>I.observe(C,{childList:!0}))}let w=$(()=>{let[h,I]=gD(i),R=g(h),C=d.current,S=!C||C.length!==h.length||h.some((T,P)=>{let V=C[P];return T.index!==V.index||T.element!==V.element||T.registration.index!==V.registration.index||T.registration.metadata!==V.registration.metadata});b(I),d.current=h,u.current=!1,S&&(l.forEach(T=>T(R)),n(R))});_(()=>(!u.current&&d.current&&g(d.current),()=>{o.current=[],a&&(a.current=[])}),[o,a,g]),_(()=>{u.current&&w()}),_(()=>()=>{m.current?.disconnect(),u.current=!0},[]);let y=$(h=>(l.add(h),()=>{l.delete(h)})),x=Nn.useMemo(()=>({register:f,unregister:v,subscribeMapChange:y,nextIndexRef:c}),[f,v,y,c]);return mD(kb.Provider,{value:x,children:t})}function pD(){return new Map}function fD(){return new Set}function gD(e){let t=new Set,o=[],a=[];e.forEach((n,s)=>{if(!s.isConnected)return;let l=n.index,i={index:l??-1,element:s,registration:n};l===null?a.push(i):l>=0&&(t.add(l),o.push(i))});let r=0;return a.sort((n,s)=>gS(n.element,s.element)),a.forEach(n=>{for(;t.has(r);)r+=1;n.index=r,o.push(n),r+=1}),t.size>0&&o.sort((n,s)=>n.index-s.index),[o,a.map(n=>n.element)]}function hD(e,t){let o=e.parentElement;for(;o&&!o.contains(t);)o=o.parentElement;return o}function bD(e){for(let t of e)for(let o=0;o<t.removedNodes.length;o+=1)if(t.removedNodes[o].isConnected)return!0;return!1}function gS(e,t){return e.nextElementSibling===t?-1:t.nextElementSibling===e?1:e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1}import*as hS from"react";import{jsx as yD}from"react/jsx-runtime";var bS=hS.forwardRef(function(t,o){let{cutout:a,...r}=t,n;if(a){let s=a.getBoundingClientRect();n=`polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${s.left}px ${s.top}px,${s.left}px ${s.bottom}px,${s.right}px ${s.bottom}px,${s.right}px ${s.top}px,${s.left}px ${s.top}px)`}return yD("div",{ref:o,role:"presentation","data-base-ui-inert":"",...r,style:{position:"fixed",inset:0,userSelect:"none",WebkitUserSelect:"none",clipPath:n}})});import*as Qb from"react";function yS(e){let{store:t,domReference:o,positionerElement:a,open:r}=e,n=Qb.useRef(null),s=Qb.useRef(null),l=gr(a);_(()=>{r||(s.current?.abort(),s.current=null,t.state.instantType==="trigger-change"&&t.set("instantType",void 0))},[r,t]),_(()=>{let i=o,c=n.current;if(i&&(n.current=i),!c||!i||i===c||!t.select("open"))return;t.set("instantType",void 0);let u=new AbortController;return s.current=u,l(()=>{t.select("open")&&t.set("instantType","trigger-change")},u.signal),()=>{u.abort()}},[o,l,t])}import*as RS from"react";var wS={},vS={},xS="";function fg(e,t){return Ss(e)?e:t}function IS(e,t,o){return/hidden|clip/.test(e.getComputedStyle(fg(t,o)).overflowY)}function wD(e){if(typeof document>"u")return!1;let t=Ie(e);return Ke(t).innerWidth-t.documentElement.clientWidth>0}function vD(e){if(!(typeof CSS<"u"&&CSS.supports&&CSS.supports("scrollbar-gutter","stable"))||typeof document>"u")return!1;let o=Ie(e),a=o.documentElement,r=o.body,n=fg(a,r),s=n.style.overflowY,l=a.style.scrollbarGutter;a.style.scrollbarGutter="stable",n.style.overflowY="scroll";let i=n.offsetWidth;n.style.overflowY="hidden";let c=n.offsetWidth;return n.style.overflowY=s,a.style.scrollbarGutter=l,i===c}function xD(e){let t=Ie(e),o=t.documentElement,a=t.body,r=fg(o,a),n={overflowY:r.style.overflowY,overflowX:r.style.overflowX};return Object.assign(r.style,{overflowY:"hidden",overflowX:"hidden"}),()=>{Object.assign(r.style,n)}}function ID(e){let t=Ie(e),o=t.documentElement,a=t.body,r=Ke(o),n=0,s=0,l=!1,i=Uo.create();if(at.engine.webkit&&(r.visualViewport?.scale??1)!==1)return()=>{};function c(){let p=r.getComputedStyle(o),f=r.getComputedStyle(a),b=(p.scrollbarGutter||"").includes("both-edges")?"stable both-edges":"stable";n=o.scrollTop,s=o.scrollLeft,wS={scrollbarGutter:o.style.scrollbarGutter,overflowY:o.style.overflowY,overflowX:o.style.overflowX},xS=o.style.scrollBehavior,vS={position:a.style.position,height:a.style.height,width:a.style.width,boxSizing:a.style.boxSizing,overflowY:a.style.overflowY,overflowX:a.style.overflowX,scrollBehavior:a.style.scrollBehavior};let w=o.scrollHeight>o.clientHeight,y=o.scrollWidth>o.clientWidth,x=p.overflowY==="scroll"||f.overflowY==="scroll",h=p.overflowX==="scroll"||f.overflowX==="scroll",I=Math.max(0,r.innerWidth-a.clientWidth),R=Math.max(0,r.innerHeight-a.clientHeight),C=parseFloat(f.marginTop)+parseFloat(f.marginBottom),S=parseFloat(f.marginLeft)+parseFloat(f.marginRight),T=fg(o,a);if(l=vD(e),l){o.style.scrollbarGutter=b,T.style.overflowY="hidden",T.style.overflowX="hidden";return}Object.assign(o.style,{scrollbarGutter:b,overflowY:"hidden",overflowX:"hidden"}),(w||x)&&(o.style.overflowY="scroll"),(y||h)&&(o.style.overflowX="scroll"),Object.assign(a.style,{position:"relative",height:C||R?`calc(100dvh - ${C+R}px)`:"100dvh",width:S||I?`calc(100vw - ${S+I}px)`:"100vw",boxSizing:"border-box",overflowY:"hidden",overflowX:"hidden",scrollBehavior:"unset"}),a.scrollTop=n,a.scrollLeft=s,o.setAttribute("data-base-ui-scroll-locked",""),o.style.scrollBehavior="unset"}function u(){Object.assign(o.style,wS),Object.assign(a.style,vS),l||(o.scrollTop=n,o.scrollLeft=s,o.removeAttribute("data-base-ui-scroll-locked"),o.style.scrollBehavior=xS)}function d(){u(),i.request(c)}c();let m=Ae(r,"resize",d);return()=>{i.cancel(),u(),typeof r.removeEventListener=="function"&&m()}}var Jb=class{lockCount=0;restore=null;timeoutLock=Fo.create();timeoutUnlock=Fo.create();acquire(t){return this.lockCount+=1,this.lockCount===1&&this.restore===null&&this.timeoutLock.start(0,()=>this.lock(t)),this.release}release=()=>{this.lockCount-=1,this.lockCount===0&&this.restore&&this.timeoutUnlock.start(0,this.unlock)};unlock=()=>{this.lockCount===0&&this.restore&&(this.restore?.(),this.restore=null)};lock(t){if(this.lockCount===0||this.restore!==null)return;let o=Ie(t),a=o.documentElement,r=o.body,n=Ke(a);if(IS(n,a,r)){let l=new n.MutationObserver(()=>{IS(n,a,r)||(l.disconnect(),this.restore=null,this.lock(t))}),i={attributes:!0};l.observe(a,i),l.observe(r,i),this.restore=()=>l.disconnect();return}let s=at.os.ios||!wD(t);this.restore=s?xD(t):ID(t)}},CD=new Jb;function CS(e=!0,t=null){_(()=>{if(e)return CD.acquire(t)},[e,t])}var RD=20;function SS(e,t,o,a){let[r,n]=RS.useState(!1);_(()=>{if(!e||!t||o==null){n(!1);return}let s=Ie(o).documentElement.clientWidth,l=o.offsetWidth;n(s>0&&l>0&&l>=s-RD)},[e,t,o]),CS(e&&(!t||r),a)}import{jsx as ey,jsxs as SD}from"react/jsx-runtime";var gg=fs.forwardRef(function(t,o){let{anchor:a,positionMethod:r="absolute",className:n,render:s,side:l,align:i,sideOffset:c=0,alignOffset:u=0,collisionBoundary:d="clipping-ancestors",collisionPadding:m=5,arrowPadding:p=5,sticky:f=!1,disableAnchorTracking:v=!1,collisionAvoidance:g=sv,style:b,...w}=t,{store:y,virtualFocus:x,syncHighlightedItem:h}=_e(),I=mS(),R=bn(!0),C=y.useState("parent"),S=y.useState("floatingRootContext"),T=y.useState("floatingTreeRoot"),P=y.useState("mounted"),V=y.useState("open"),E=y.useState("modal"),z=y.useState("openMethod"),M=y.useState("activeTriggerElement"),O=y.useState("transitionStatus"),H=y.useState("positionerElement"),k=y.useState("instantType"),N=y.useState("adaptiveOrigin"),L=y.useState("lastOpenChangeReason"),U=y.useState("floatingNodeId"),A=y.useState("floatingParentNodeId"),ee=S.useState("domReferenceElement"),B=a,Z=c,G=u,X=i,be=g;C.type==="context-menu"&&(B=a??C.context?.anchor,X=X??"start",!l&&X!=="center"&&(G=t.alignOffset??2,Z=t.sideOffset??-5));let K=l,Y=X;C.type==="menu"?(K=K??"inline-end",Y=Y??"start",be=t.collisionAvoidance??Ei):C.type==="menubar"&&(K=K??(C.context.orientation==="vertical"?"inline-end":"bottom"),Y=Y??"start");let j=C.type==="context-menu",se=Oi({anchor:B,floatingRootContext:S,positionMethod:R?"fixed":r,mounted:P,side:K,sideOffset:Z,align:Y,alignOffset:G,arrowPadding:j?0:p,collisionBoundary:d,collisionPadding:m,sticky:f,nodeId:U,keepMounted:I,disableAnchorTracking:v,collisionAvoidance:be,shift:j?{crossAxis:!("side"in be&&be.side==="flip"),rootBoundary:"layoutViewport"}:void 0,externalTree:T,adaptiveOrigin:N,lazyFlip:x?"placement":!1});fs.useEffect(()=>{function ve(ge){ge.open&&(ge.parentNodeId===U&&y.set("hoverEnabled",!1),ge.nodeId!==U&&ge.parentNodeId===y.select("floatingParentNodeId")&&y.setOpen(!1,we(q.siblingOpen)))}return T.events.on("menuopenchange",ve),()=>{T.events.off("menuopenchange",ve)}},[y,T.events,U]),fs.useEffect(()=>{if(y.select("floatingParentNodeId")==null)return;function ve(ge){if(ge.open||ge.nodeId!==y.select("floatingParentNodeId"))return;let je=ge.reason??q.siblingOpen;y.setOpen(!1,we(je))}return T.events.on("menuopenchange",ve),()=>{T.events.off("menuopenchange",ve)}},[T.events,y]);let pe=Qe();fs.useEffect(()=>{V||pe.clear()},[V,pe]),fs.useEffect(()=>{function ve(ge){if(!(!V||ge.nodeId!==y.select("floatingParentNodeId")))if(ge.target&&M&&M!==ge.target){let je=y.select("closeDelay");je>0?pe.isStarted()||pe.start(je,()=>{y.setOpen(!1,we(q.siblingOpen))}):y.setOpen(!1,we(q.siblingOpen))}else pe.clear()}return T.events.on("itemhover",ve),()=>{T.events.off("itemhover",ve)}},[T.events,V,M,y,pe]),fs.useEffect(()=>{let ve={open:V,nodeId:U,parentNodeId:A,reason:y.select("lastOpenChangeReason")};T.events.emit("menuopenchange",ve)},[T.events,V,y,U,A]),yS({store:y,domReference:ee,positionerElement:H,open:V});let oe={open:V,side:se.side,align:se.align,anchorHidden:se.anchorHidden,nested:C.type==="menu",instant:k},Se=C.type==="menubar"&&C.context.modal,ie=E&&L!==q.triggerHover;SS(V&&(Se||ie),z==="touch",H,M);let te=Vi(t,oe,{styles:se.positionerStyles,transitionStatus:O,props:w,refs:[o,y.useStateSetter("positionerElement")],hidden:!P,inert:!V}),fe=P&&C.type!=="menu"&&(C.type!=="menubar"&&E&&L!==q.triggerHover||C.type==="menubar"&&C.context.modal),de=null;return C.type==="menubar"?de=C.context.contentElement:C.type===void 0&&(de=M),SD(_b.Provider,{value:se,children:[fe&&ey(bS,{ref:C.type==="context-menu"||C.type==="nested-context-menu"?C.context.internalBackdropRef:null,inert:Si(!V),cutout:de}),ey(ih,{id:U,children:ey(pg,{elementsRef:y.context.itemDomElements,labelsRef:y.context.itemLabels,onMapChange:h,children:te})})]})});import*as Dn from"react";import*as hg from"react";var ty=hg.createContext(void 0);function ES(){let e=hg.useContext(ty);if(e===void 0)throw new Error(De(34));return e}import{jsx as oy}from"react/jsx-runtime";var ay=Dn.forwardRef(function(t,o){let{render:a,className:r,value:n,defaultValue:s,onValueChange:l,disabled:i=!1,style:c,"aria-labelledby":u,...d}=t,[m,p]=Dn.useState(void 0),[f,v]=Ba({controlled:n,default:s,name:"MenuRadioGroup"}),g=$((x,h)=>{l?.(x,h),!h.isCanceled&&v(x)}),w=ae("div",t,{state:{disabled:i},ref:o,props:{role:"group","aria-labelledby":u??m,"aria-disabled":i||void 0,...d}}),y=Dn.useMemo(()=>({value:f,setValue:g,disabled:i}),[f,g,i]);return oy(wu.Provider,{value:p,children:oy(ty.Provider,{value:y,children:w})})}),bg=Dn.memo(Dn.forwardRef(function(t,o){let a=yn()?.RadioGroup??ay;return oy(a,{...t,ref:o})}));import*as Cu from"react";import*as yg from"react";var ry=yg.createContext(void 0);function TS(){let e=yg.useContext(ry);if(e===void 0)throw new Error(De(35));return e}import{jsx as MS}from"react/jsx-runtime";var ED=Cu.forwardRef(function(t,o){let{render:a,className:r,id:n,label:s,nativeButton:l=!1,disabled:i=!1,closeOnClick:c=!1,value:u,style:d,...m}=t,{store:p}=_e(),{value:f,setValue:v,disabled:g}=ES(),b=Cr({guess:!0,label:s}),w=qe(n),y=p.useState("isActive",b.index),x=p.useState("floatingNodeId"),h=p.useState("itemProps"),I=p.useState("disabled"),R=i||g||I,C=f===u,{getItemProps:S,itemRef:T}=ms({closeOnClick:c,disabled:R,highlighted:y,id:w,store:p,nativeButton:l,nodeId:x,itemMetadata:ds}),P=Cu.useMemo(()=>({disabled:R,highlighted:y,checked:C}),[R,y,C]);function V(z){let M=we(q.itemPress,z.nativeEvent,void 0,{preventUnmountOnClose:Be});v(u,M)}let E=ae("div",t,{state:P,stateAttributesMapping:ps,props:[h,{role:"menuitemradio","aria-checked":C,onClick:V},m,S],ref:[T,o,b.ref]});return MS(ry.Provider,{value:P,children:E})}),wg=Cu.forwardRef(function(t,o){let a=wn(t,o);return a.visible?MS(ED,{...t,ref:a.ref}):null});import*as vg from"react";var xg=vg.forwardRef(function(t,o){let{render:a,className:r,style:n,keepMounted:s=!1,...l}=t,i=TS(),c=vg.useRef(null),{transitionStatus:u,mounted:d,setMounted:m}=da(i.checked);Oo({batch:!0,enabled:!i.checked,open:i.checked,ref:c,onComplete(){i.checked||m(!1)}});let p={checked:i.checked,disabled:i.disabled,highlighted:i.highlighted,transitionStatus:u};return ae("span",t,{state:p,stateAttributesMapping:ps,ref:[o,c],props:{"aria-hidden":!0,...l},enabled:s||d})});import*as kt from"react";import*as Ig from"react";var TD=Ig.createContext(null);function Ml(e){let t=Ig.useContext(TD);if(t===null&&!e)throw new Error(De(5));return t}import*as Su from"react";import*as Ru from"react";function Cg(e){let t=Ru.useRef(""),o=Ru.useCallback(r=>{r.defaultPrevented||(t.current=r.pointerType,e(r,r.pointerType))},[e]);return{onClick:Ru.useCallback(r=>{if(r.detail===0){e(r,"keyboard");return}"pointerType"in r?e(r,r.pointerType):e(r,t.current),t.current=""},[e]),onPointerDown:o}}function MD(e,t){let o=$((n,s)=>{(typeof e=="function"?e():e)||t(s||(at.os.ios?"touch":""))}),{onClick:a,onPointerDown:r}=Cg(o);return Su.useMemo(()=>({onClick:a,onPointerDown:r}),[a,r])}function PS(e){let[t,o]=Su.useState(null),a=MD(e,o);return gl(e,r=>{r&&!e&&o(null)}),Su.useMemo(()=>({openMethod:t,triggerProps:a}),[t,a])}function kS(e){return e==null?q.none:e.type.startsWith("key")?q.keyboard:e.type.startsWith("mouse")||e.type.startsWith("pointer")?q.pointer:q.none}import*as Pl from"react";var AS={...zi,disabled:e=>e.parent.type==="menubar"&&e.parent.context.disabled||e.disabled,modal:e=>(e.parent.type===void 0||e.parent.type==="context-menu")&&(e.modal??!0),openMethod:e=>e.openMethod,keyboardOpen:e=>e.keyboardOpen,allowMouseEnter:e=>e.allowMouseEnter,highlightItemOnHover:e=>e.highlightItemOnHover,parent:e=>e.parent,rootId:e=>e.parent.type==="menu"?e.parent.store.select("rootId"):e.parent.type!==void 0?e.parent.context.rootId:e.rootId,activeIndex:e=>e.activeIndex,listElement:e=>e.listElement,triggerControlsId:(e,t)=>{let o=zi.triggerPopupId(e,t);return o?e.listElement?.id||o:void 0},filterTriggerProps:e=>e.filterTriggerProps,inputProps:e=>e.inputProps,webkitAriaSelected:(e,t)=>at.engine.webkit&&e.inputFocused&&t?!0:void 0,highlightedItemId:e=>e.highlightedItem?.id||void 0,isActive:(e,t)=>e.activeIndex===t,hoverEnabled:e=>e.hoverEnabled,instantType:e=>e.instantType==="trigger-change"&&!zi.open(e)?void 0:e.instantType,lastOpenChangeReason:e=>e.openChangeReason,floatingTreeRoot:e=>e.parent.type==="menu"?e.parent.store.select("floatingTreeRoot"):e.floatingTreeRoot,floatingNodeId:e=>e.floatingNodeId,floatingParentNodeId:e=>e.floatingParentNodeId,itemProps:e=>e.itemProps,closeDelay:e=>e.closeDelay,adaptiveOrigin:e=>e.adaptiveOrigin,keyboardEventRelay:e=>{if(e.keyboardEventRelay)return e.keyboardEventRelay;if(e.parent.type==="menu")return e.parent.store.select("keyboardEventRelay")}},Rg=class extends La{constructor(t,o,a=!1){let r=new rn,n=NS(r,o,a,t);super(n,LS(r),AS),this.observe("parent",s=>{s.type==="menu"?this.context.allowMouseUpTriggerRef=s.store.context.allowMouseUpTriggerRef:s.type!==void 0&&(this.context.allowMouseUpTriggerRef=s.context.allowMouseUpTriggerRef)})}subscribeToParentMenu(){let t=this.state.parent;if(t.type!=="menu")return;let o=t.store.select("rootId"),a=t.store.select("floatingTreeRoot"),r=t.store.select("keyboardEventRelay");return t.store.subscribe(()=>{let n=t.store.select("rootId"),s=t.store.select("floatingTreeRoot"),l=t.store.select("keyboardEventRelay");o===n&&a===s&&r===l||(o=n,a=s,r=l,this.notifyAll())})}setOpen(t,o){this.state.floatingRootContext.context.events.emit("setOpen",{open:t,eventDetails:o})}setActiveIndex(t,o,a){if(this.state.activeIndex!==t){let n=(t===null?void 0:this.context.itemDomElements.current[t])===this.context.reportedItem;this.context.highlightReason=n?"none":o,this.context.highlightEvent=n?void 0:a}this.set("activeIndex",t)}highlightItem(t,o,a){let r=this.context.itemDomElements.current.indexOf(t);r>-1&&this.setActiveIndex(r,o,a)}};function zS(){let e=new rn,t=new Yi(Object.freeze(NS(e)),Object.freeze(LS(e)),AS);return Object.assign(t,{setOpen:Be})}function LS(e){return{positionerRef:Pl.createRef(),popupRef:Pl.createRef(),typingRef:{current:!1},itemDomElements:{current:[]},itemLabels:{current:[]},highlightReason:"none",highlightEvent:void 0,reportedItem:void 0,allowMouseUpTriggerRef:{current:!1},virtualFocusRef:void 0,triggerFocusTargetRef:Pl.createRef(),beforeTriggerFocusGuardRef:Pl.createRef(),beforeContentFocusGuardRef:Pl.createRef(),onOpenChangeComplete:void 0,triggerElements:e}}function NS(e,t,o=!1,a){return{...em(e,t,o),disabled:!1,modal:!0,openMethod:null,keyboardOpen:!1,allowMouseEnter:!1,highlightItemOnHover:!0,parent:{type:void 0},rootId:void 0,activeIndex:null,listElement:null,filterTriggerProps:ze,inputProps:ze,inputFocused:!1,highlightedItem:void 0,hoverEnabled:!0,instantType:void 0,openChangeReason:null,floatingTreeRoot:new Qn,floatingNodeId:void 0,floatingParentNodeId:null,itemProps:ze,keyboardEventRelay:void 0,closeDelay:0,adaptiveOrigin:void 0,...a}}import*as DS from"react";var gs=DS.createContext(null);function ny(e,t){return(e===q.triggerPress||e===q.itemPress)&&t?.detail===0}function Sg(e,t){return e===q.listNavigation||ny(e,t)}import{jsx as Eu,jsxs as PD}from"react/jsx-runtime";var ui=Kl(function(t){let{children:o,open:a,onOpenChange:r,onOpenChangeComplete:n,onItemHighlighted:s,defaultOpen:l=!1,disabled:i=!1,modal:c,loopFocus:u=!0,orientation:d="vertical",actionsRef:m,closeParentOnEsc:p=!1,handle:f,triggerId:v,defaultTriggerId:g=null,highlightItemOnHover:b=!0,isSubmenu:w=!1,virtualFocus:y=!1,virtualFocusRef:x,allowEscape:h=!0,resetOnPointerLeave:I=!0}=t,R=bn(!0),C=_e(!0),S=Ml(!0),T=C?.store,P=C?.virtualFocus??!1,V=kt.useMemo(()=>w&&T?{type:"menu",store:T}:S?{type:"menubar",context:S}:R&&!T?{type:"context-menu",context:R}:{type:void 0},[R,T,S,w]),E=qe(),z=qe(),[M,O]=kt.useState(void 0),H=(M??z)||void 0,k=Ca(),N=V.type==="menu"?V.store:void 0,L=(a??l)&&N?.state.transitionStatus==="starting",U=Ze(()=>L?N?.state.instantType:void 0).current,A=Ze(()=>{let Ee=new Rg({open:l,openProp:a,activeTriggerId:g,triggerIdProp:v,parent:V,disabled:i,highlightItemOnHover:b,modal:V.type===void 0?c:void 0,rootId:E,instantType:U},H,k!=null);return Ee.context.virtualFocusRef=x,Ee}).current;A.useControlledProp("openProp",a),A.useControlledProp("triggerIdProp",v),A.useContextCallback("onOpenChangeComplete",n);let ee=A.useState("floatingTreeRoot"),B=wc(ee),Z=A.useState("open"),G=A.useState("activeTriggerElement"),X=A.useState("positionerElement"),be=A.useState("hoverEnabled"),K=A.useState("disabled"),Y=A.useState("lastOpenChangeReason"),j=A.useState("parent"),se=A.useState("activeIndex"),pe=A.useState("keyboardOpen"),oe=A.useState("payload"),Se=A.useState("floatingParentNodeId"),ie=kt.useRef(null),te=kt.useRef(j.type!=="context-menu"),fe=Qe(),de=kt.useRef(!0),ve=Qe(),ge=Se!=null,{openMethod:je,triggerProps:he}=PS(Z);A.useSyncedValues({disabled:i,highlightItemOnHover:b,modal:j.type===void 0?c:void 0,openMethod:je,rootId:E}),Yd(A);let{forceUnmount:le,transitionStatus:W}=Xd(Z,A,()=>{A.set("allowMouseEnter",!1)},L),Q=gr(A.context.popupRef);kt.useEffect(()=>{if(U===void 0)return;let Ee=()=>{A.state.instantType===U&&A.set("instantType",void 0)};if(!Z){Ee();return}if(W!==void 0)return;if(A.context.popupRef.current==null){Ee();return}let Me=new AbortController;return Q(Ee,Me.signal),()=>{Me.abort()}},[U,Z,W,Q,A]),_(()=>{R&&!C?A.update({parent:{type:"context-menu",context:R},floatingNodeId:B,floatingParentNodeId:k}):(C||!A.select("activeTriggerElement"))&&A.update({floatingNodeId:B,floatingParentNodeId:k})},[R,C,B,k,G,A]),kt.useEffect(()=>{if(Z||(ie.current=null),j.type==="context-menu"){if(!Z){fe.clear(),te.current=!1;return}fe.start(500,()=>{te.current=!0})}},[fe,Z,j.type]),_(()=>{!Z&&!be&&A.set("hoverEnabled",!0)},[Z,be,A]);let xe=$((Ee,Me)=>{let ot=Me.reason;if(!Ee&&!A.select("open")||Z===Ee&&Me.trigger===G&&Y===ot)return;let Lt=bh(Me);if(!Ee&&Me.trigger==null&&(Me.trigger=G??void 0),r?.(Ee,Me),Me.isCanceled)return;A.state.floatingRootContext.dispatchOpenChange(Ee,Me);let wa=Me.event;if(Ee===!1&&ot!==q.itemPress&&wa?.type==="click"&&wa.pointerType==="touch"&&!de.current)return;Ee&&ot===q.triggerFocus?(de.current=!1,ve.start(300,()=>{de.current=!0})):(de.current=!0,ve.clear());let za=!Ee&&(ot===q.escapeKey||ot==null);ie.current=Me.event;let yt=hh(A.state,Ee,Me.trigger,Lt());yt.openChangeReason=ot,yt.keyboardOpen=Ee&&Sg(ot,wa),j.type==="menubar"&&(ot===q.triggerFocus||ot===q.focusOut||ot===q.triggerHover||ot===q.listNavigation||ot===q.siblingOpen)?yt.instantType="group":ny(ot,wa)?yt.instantType="click":za?yt.instantType="dismiss":yt.instantType=void 0,A.update(yt)}),re=Cc({popupStore:A,floatingRootContext:A.state.floatingRootContext,floatingId:H,nested:k!=null,onOpenChange:xe}),ce=re.context.events;_(()=>{let Ee=({open:Me,eventDetails:ot})=>xe(Me,ot);return ce.on("setOpen",Ee),()=>{ce?.off("setOpen",Ee)}},[ce,xe]),_(()=>A.subscribeToParentMenu(),[A]);let mt=kt.useCallback(()=>{A.setOpen(!1,we(q.imperativeAction))},[A]);kt.useImperativeHandle(m,()=>({unmount:le,close:mt}),[le,mt]);let st;j.type==="context-menu"&&(st=j.context),kt.useImperativeHandle(st?.positionerRef,()=>X,[X]),kt.useImperativeHandle(st?.actionsRef,()=>({setOpen:xe}),[xe]);let Xe=Ic(re,{enabled:!K,bubbles:{escapeKey:p&&j.type==="menu"},outsidePress(){return j.type!=="context-menu"||ie.current?.type==="contextmenu"?!0:te.current},externalTree:ge?ee:void 0}),Ue=Ko(),pt=Ch(re,{enabled:!K,listRef:A.context.itemDomElements,activeIndex:se,virtual:y,nested:j.type==="menubar"||!y&&j.type!==void 0,parentOrientation:j.type==="menubar"?j.context.orientation:void 0,loopFocus:u,focusItemOnOpen:y?pe:void 0,allowEscape:y&&u&&h,orientation:d,triggerOrientation:y?"vertical":d,rtl:Ue==="rtl",disabledIndices:Ft,onNavigate(Ee,Me){A.setActiveIndex(Ee,kS(Me),Me?.nativeEvent)},openOnArrowKeyDown:j.type!=="context-menu"&&!(y&&w),externalTree:!y&&ge?ee:void 0,nestedReturnFocusRef:N?.context.virtualFocusRef,focusItemOnHover:b,resetOnPointerLeave:I}),Zo=kt.useCallback(Ee=>{A.context.typingRef.current=Ee},[A]),bt=Rh(re,{enabled:!K&&!y,listRef:A.context.itemLabels,elementsRef:A.context.itemDomElements,activeIndex:se,resetMs:500,onMatch:(Ee,Me)=>{Z&&Ee!==se&&A.setActiveIndex(Ee,q.keyboard,Me.nativeEvent)},onTyping:Zo}),Rt=$(s),ba=kt.useRef(-1),Tt=$(()=>{let Ee=A.state.activeIndex,Me=Ee===null?void 0:A.context.itemDomElements.current[Ee]??void 0;if(Me?.isConnected===!1)return;let ot=Me===void 0?-1:Ee;if(ba.current===ot&&A.context.reportedItem===Me)return;ba.current=ot,A.context.reportedItem=Me,y&&A.set("highlightedItem",Me);let{highlightReason:Lt,highlightEvent:wa}=A.context;A.context.highlightReason=q.none,A.context.highlightEvent=void 0,s&&Rt(Me,zv(Lt,wa,{label:Me===void 0?void 0:A.context.itemLabels.current[ot]??void 0}))});_(()=>{Tt()},[se,Tt]);let Dt=kt.useMemo(()=>{if(!y)return pt.reference;if(!pt.trigger)return ze;let{onFocus:Ee,...Me}=pt.trigger;return Me},[y,pt.reference,pt.trigger]);A.useSyncedValue("inputProps",y?pt.reference??ze:ze);let Aa=kt.useMemo(()=>{let Ee=rt(bt.reference,Dt,Xe.reference,{onMouseMove(){A.set("allowMouseEnter",!0)}},he);return Ee["aria-haspopup"]="menu",Ee["aria-expanded"]=Z,Ee},[A,bt.reference,Dt,Xe.reference,he,Z]),ya=kt.useMemo(()=>{let Ee=rt(pt.trigger,Xe.trigger,he);return Ee["aria-haspopup"]="menu",Ee["aria-expanded"]=!1,Ee},[pt.trigger,Xe.trigger,he]);Ze(()=>(A.update({inactiveTriggerProps:ya}),null));let Vt=kt.useMemo(()=>rt(qd,{onMouseMove(){A.set("allowMouseEnter",!0),j.type==="menu"&&A.set("hoverEnabled",!1)},onClick(){A.select("hoverEnabled")&&A.set("hoverEnabled",!1)},onKeyDown(Ee){let Me=A.select("keyboardEventRelay");Me&&!Ee.isPropagationStopped()&&Me(Ee)}},bt.floating,pt.floating,Xe.floating),[j.type,A,bt.floating,pt.floating,Xe.floating]),Xo=pt.item??ze;Qd(A,{floatingRootContext:re,activeTriggerProps:Aa,inactiveTriggerProps:ya,popupProps:Vt,itemProps:Xo});let Sr=kt.useMemo(()=>({store:A,parent:V,orientation:d,loopFocus:u,allowEscape:h,defaultFloatingId:z,setRenderedFloatingId:O,virtualFocus:y,parentVirtualFocus:P,syncHighlightedItem:Tt}),[A,V,d,u,h,z,y,P,Tt]),We=typeof o=="function"?o({payload:oe}):o,Mt=PD(li.Provider,{value:Sr,children:[f&&Eu(jd,{handle:f,store:A}),We]});return(j.type===void 0||j.type==="context-menu")&&(Mt=Eu(lh,{externalTree:ee,children:Mt})),Mt});function FS(e){let t=kt.useContext(gs);if(t===null)return Eu(ui,{...e});let o=t.Root;return Eu(gs.Provider,{value:null,children:Eu(o,{...t.options,...e})})}import*as OS from"react";import{jsx as Eg}from"react/jsx-runtime";var kD={};function Tg(e){_e();let t=OS.useContext(gs);if(t!==null){let o=t.SubmenuRoot;return Eg(gs.Provider,{value:null,children:Eg(o,{...t.options,...e})})}return Eg(Iu.Provider,{value:kD,children:Eg(ui,{...e,isSubmenu:!0})})}import*as ga from"react";var Mg=5;function HS(e,t){let o=AD(t);return e.clientX>=o.left-Mg&&e.clientX<=o.right+Mg&&e.clientY>=o.top-Mg&&e.clientY<=o.bottom+Mg}function AD(e){let t=e.getBoundingClientRect(),o=Ke(e);if(at.env.jsdom)return t;let a=o.getComputedStyle(e,"::before"),r=o.getComputedStyle(e,"::after");if(!(a.content!=="none"||r.content!=="none"))return t;let s=parseFloat(a.width)||0,l=parseFloat(a.height)||0,i=parseFloat(r.width)||0,c=parseFloat(r.height)||0,u=Math.max(t.width,s,i),d=Math.max(t.height,l,c),m=u-t.width,p=d-t.height;return{left:t.left-m/2,right:t.right+m/2,top:t.top-p/2,bottom:t.bottom+p/2}}function Tu(e){if(Fe(e)&&e.hasAttribute("data-rootownerid"))return e.getAttribute("data-rootownerid");if(!mr(e))return Tu(dr(e))}function VS(e,t){function o(n,s,l){let i=n.currentTarget;xa(()=>{e.setOpen(!1,we(q.focusOut,n.nativeEvent,i))}),Lw(i.isConnected?i:t.current,s,l)?.focus()}function a(n){o(n,-1,e.select("positionerElement"))}function r(n){let s=e.select("positionerElement");s&&Mn(n,s)?e.context.beforeContentFocusGuardRef.current?.focus():o(n,1,s)}return{handlePreFocusGuardFocus:a,handleFocusTargetFocus:r}}import*as Pg from"react";function BS(e){let{enabled:t=!0,mouseDownAction:o,open:a}=e,r=Pg.useRef(!1);return Pg.useMemo(()=>t?{onMouseDown:n=>{(o==="open"&&!a||o==="close"&&a)&&(r.current=!0,Ie(n.currentTarget).addEventListener("click",()=>{r.current=!1},{once:!0}))},onClick:n=>{r.current&&(r.current=!1,n.preventBaseUIHandler())}}:ze,[t,o,a])}import{jsx as Mu,jsxs as zD}from"react/jsx-runtime";var _S=Ju(function(t,o){let{render:a,className:r,style:n,disabled:s=!1,nativeButton:l=!0,id:i,openOnHover:c,delay:u=100,closeDelay:d=0,handle:m,payload:p,...f}=t,v=_e(!0),b=tm(m)??v?.store;if(!b)throw new Error(De(85));let w=qe(i),y=b.useState("isTriggerActive",w),x=b.useState("floatingRootContext"),h=b.useState("isOpenedByTrigger",w),I=b.useState("triggerControlsId",w),R=ga.useRef(null),C=ND(),S=Ti(!0),T=ca(),P=ga.useMemo(()=>T??new Qn,[T]),V=wc(P),E=Ca(),{registerTrigger:z,isMountedByThisTrigger:M}=Kd(w,R,b,{payload:p,closeDelay:d,parent:C,floatingTreeRoot:P,floatingNodeId:V,floatingParentNodeId:E,keyboardEventRelay:S?.relayKeyboardEvent}),O=C.type==="menubar",H=b.useState("disabled"),k=s||H||O&&C.context.disabled,{getButtonProps:N,buttonRef:L}=Ut({disabled:k,native:l});ga.useEffect(()=>{!h&&C.type===void 0&&(b.context.allowMouseUpTriggerRef.current=!1)},[b,h,C.type]);let U=ga.useRef(null),A=Qe(),ee=$(ve=>{if(!U.current)return;A.clear(),b.context.allowMouseUpTriggerRef.current=!1;let ge=ve.target;ue(U.current,ge)||ue(b.select("positionerElement"),ge)||ge===U.current||ge!=null&&Tu(ge)===b.select("rootId")||HS(ve,U.current)||P.events.emit("close",{domEvent:ve,reason:q.cancelOpen})});ga.useEffect(()=>{let ve=Ie(U.current);if(h&&b.select("lastOpenChangeReason")===q.triggerHover)return ve.addEventListener("mouseup",ee,{once:!0}),()=>{ve.removeEventListener("mouseup",ee)}},[h,ee,b]);let B=O&&C.context.hasSubmenuOpen,G=zs(x,{enabled:(c??B)&&!k&&(!O||B&&!M),handleClose:Ns({blockPointerEvents:!O}),mouseOnly:!0,move:!1,restMs:C.type===void 0?u:void 0,delay:{close:d},triggerElementRef:R,externalTree:P,isActiveTrigger:y,isClosing:()=>b.select("transitionStatus")==="ending"}),X=LD(h,b.select("lastOpenChangeReason")),be=xc(x,{enabled:!k,event:h&&O?"click":"mousedown",toggle:!0,ignoreMouse:!1,stickIfOpen:C.type===void 0?X:!1}),K=Sc(x,{enabled:!k&&B}),Y=BS({open:h,enabled:O,mouseDownAction:"open"}),j=ga.useMemo(()=>rt(K.reference,be.reference),[K.reference,be.reference]),se=b.useState("triggerProps",M),pe=b.useState("filterTriggerProps"),{handlePreFocusGuardFocus:oe,handleFocusTargetFocus:Se}=VS(b,R),ie={disabled:k,open:h},te=[U,o,L,z,R],fe=[j,G??ze,se,{"aria-haspopup":"menu","aria-controls":I,id:w,onMouseDown:ve=>{if(b.select("open"))return;A.start(200,()=>{b.context.allowMouseUpTriggerRef.current=!0}),Ie(ve.currentTarget).addEventListener("mouseup",ee,{once:!0})}},pe,O?{role:"menuitem"}:{},Y,f,N],de=ae("button",t,{enabled:!O,stateAttributesMapping:rc,state:ie,ref:te,props:fe});return O?Mu(yl,{tag:"button",render:a,className:r,style:n,state:ie,refs:te,props:fe,stateAttributesMapping:rc}):h?zD(ga.Fragment,{children:[Mu(Lr,{ref:b.context.beforeTriggerFocusGuardRef,onFocus:oe},`${w}-pre-focus-guard`),Mu(ga.Fragment,{children:de},w),Mu(Lr,{ref:b.context.triggerFocusTargetRef,onFocus:Se},`${w}-post-focus-guard`)]}):Mu(ga.Fragment,{children:de},w)});function LD(e,t){let o=Qe(),[a,r]=ga.useState(!1);return _(()=>{e&&t===q.triggerHover?(r(!0),o.start(500,()=>{r(!1)})):e||(o.clear(),r(!1))},[e,t,o]),a}function ND(){let e=Ml(!0);return ga.useMemo(()=>e?{type:"menubar",context:e}:{type:void 0},[e])}import*as ZS from"react";var GS=ZS.forwardRef(function(t,o){let{render:a,className:r,style:n,children:s,...l}=t,{store:i}=_e(),{side:c}=us(),u=i.useState("instantType"),{children:d,state:m}=Tf({store:i,side:c,children:s}),p={activationDirection:m.activationDirection,transitioning:m.transitioning,instant:u};return ae("div",t,{state:p,ref:o,props:[l,{children:d}],stateAttributesMapping:Ef})});import*as US from"react";var kg=US.forwardRef(function(t,o){let{className:a,render:r,orientation:n="horizontal",style:s,...l}=t;return ae("div",t,{state:{orientation:n},ref:o,props:[{role:"separator","aria-orientation":n},l]})});import*as Br from"react";function $S(e){return e==null||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"}import{jsx as DD}from"react/jsx-runtime";var FD={"aria-expanded":void 0},OD=Br.forwardRef(function(t,o){let{render:a,className:r,style:n,label:s,id:l,nativeButton:i=!1,openOnHover:c=!0,delay:u=100,closeDelay:d=0,disabled:m=!1,...p}=t,f=_e(!0);if(f?.parent.type!=="menu")throw new Error(De(37));let v=us(),g=El(),{store:b,parentVirtualFocus:w}=f,y=f.parent.store,x=Cr({guess:!0,label:s}),h=qe(l),I=b.useState("open"),R=Br.useRef(!1),C=b.useState("positionerElement"),S=b.useState("floatingRootContext"),T=b.useState("floatingTreeRoot"),P=b.useState("triggerPopupId",h),V=gh(h,b),E=$(ie=>{V(ie);let te=b.select("activeTriggerElement");ie!==null&&b.select("open")&&(te===ie||b.select("activeTriggerId")==null)&&b.update({activeTriggerId:h??null,activeTriggerElement:ie,closeDelay:d})}),z=Br.useRef(null),M=Br.useCallback(ie=>{z.current=ie,b.set("activeTriggerElement",ie)},[b]);_(()=>(E(z.current),()=>E(null)),[E,h,b]),_(()=>{if(!I||!C)return;function ie(te){He(te)===b.context.beforeContentFocusGuardRef.current&&(R.current=te.relatedTarget===z.current)}return C.addEventListener("focusout",ie,!0),()=>{R.current=!1,C.removeEventListener("focusout",ie,!0)}},[I,C,b]),b.useSyncedValue("closeDelay",d);let O=b.useState("disabled"),H=y.useState("disabled"),k=m||O||H,N=y.useState("itemProps"),L=y.useState("isActive",x.index),U=Br.useMemo(()=>({type:"submenu-trigger",setActive(ie){y.select("highlightItemOnHover")&&y.setActiveIndex(x.index,q.pointer,ie)}}),[y,x.index]),{getItemProps:A,itemRef:ee}=ms({closeOnClick:!1,disabled:k,highlighted:L,id:h,store:b,typingRef:y.context.typingRef,nativeButton:i,itemMetadata:U,nodeId:v?.context.nodeId}),B=b.useState("hoverEnabled"),Z=zs(S,{enabled:B&&c&&!k,handleClose:Ns({blockPointerEvents:!0}),mouseOnly:!0,move:!0,restMs:u,delay:{open:u,close:d},shouldOpen:u>0?()=>y.select("allowMouseEnter"):void 0,triggerElementRef:z,externalTree:T,isClosing:()=>b.select("transitionStatus")==="ending",guardStaleOpen:!0}),X=xc(S,{enabled:!k,event:"mousedown",toggle:!0,ignoreMouse:c,stickIfOpen:c}).reference??ze,be=b.useState("triggerProps",!0);delete be.id;let K={disabled:k,highlighted:L,open:I},Y=b.useState("openMethod"),se=b.useState("lastOpenChangeReason")===q.listNavigation||Y==="keyboard",pe=I&&se&&at.screenReader.voiceOver,oe=g?.onTriggerKeyDown?{onKeyDown:g.onTriggerKeyDown}:void 0;return ae("div",t,{state:K,stateAttributesMapping:gd,props:[X,Z,be,oe,N,pe?FD:void 0,{"aria-controls":P,tabIndex:w||!(I||L)?-1:0,onFocus(ie){b.select("open")&&R.current&&(R.current=!1,b.setOpen(!1,we(q.focusOut,ie.nativeEvent)))},onBlur(){L&&y.setActiveIndex(null,q.none)}},p,A],ref:[o,x.ref,ee,E,M]})}),Ag=Br.forwardRef(function(t,o){let a=wn(t,o,"submenu-trigger");if(!a.visible)return null;let r=a.props?rt(a.props,t):t;return DD(OD,{...r,ref:a.ref})});var Pu=class extends ki{constructor(){super(zS(),"Menu")}open(t){this.openByTrigger(t)}close(){this.closePopup()}get isOpen(){return this.attachedStore?.select("open")??!1}};function WS(){return new Pu}import*as bE from"react";import"react";import*as mE from"react";import*as Ga from"react";function sy(e){return Array.isArray(e)?e.map(t=>sy(t)).join(","):e==null?"":String(e)}import*as HD from"react";function zg(e){if(e==null)return"";if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}import{jsx as n1e}from"react/jsx-runtime";function Lg(e,t){if(t&&e!=null)return t(e)??"";if(e&&typeof e=="object"){if("label"in e&&e.label!=null)return String(e.label);if("value"in e)return String(e.value)}return zg(e)}var qS=new Map;function Ng(e={}){let{locale:t,...o}=e,a={usage:"search",sensitivity:"base",ignorePunctuation:!0,...o},r=`${sy(t)}|${JSON.stringify(a)}`,n=qS.get(r);if(n)return n;let s=new Intl.Collator(t,a),l={contains(i,c,u){if(!c)return!0;let d=Lg(i,u);for(let m=0;m<=d.length-c.length;m+=1)if(s.compare(d.slice(m,m+c.length),c)===0)return!0;return!1},startsWith(i,c,u){if(!c)return!0;let d=Lg(i,u);return s.compare(d.slice(0,c.length),c)===0},endsWith(i,c,u){if(!c)return!0;let d=Lg(i,u),m=c.length;return d.length>=m&&s.compare(d.slice(d.length-m),c)===0}};return qS.set(r,l),l}import*as kl from"react";function Dg(){let e=Ze(()=>new Map).current,[t,o]=kl.useState(0),a=kl.useRef(!1),r=$(()=>{a.current||(a.current=!0,o(l=>l+1))}),n=$((l,i)=>(e.set(l,i),r(),()=>{e.delete(l),r()})),s=kl.useMemo(()=>new Map(e),[t]);return _(()=>{a.current=!1},[t]),{items:s,registerItem:n,liveItems:e}}import*as Fn from"react";function jS(){throw new Error(De(103))}var ku=Fn.createContext(null);function vn(e=!1){let t=Fn.useContext(ku);return t===null&&!e&&jS(),t}var iy=Fn.createContext(null);function xn(e=!1){let t=Fn.useContext(iy);return t===null&&!e&&jS(),t}function KS(e){let t=Fn.useContext(ku);if(e===null)return null;for(;t!==null&&t.listRef!==e;)t=t.parent;return t}var ly=Fn.createContext("");function hs(){return Fn.useContext(ly)}var zu={isEmpty:e=>e.visibleItemIds===null?e.registeredItemCount===0:e.visibleItemIds.size===0,isItemVisible:(e,t)=>e.visibleItemIds===null||e.visibleItemIds.has(t)},Au=class extends La{constructor(){super({visibleItemIds:null,registeredItemCount:0},ze,zu)}},YS={registerItem:()=>Be,store:new Au};import{jsx as cy}from"react/jsx-runtime";function XS(e){let{children:t,open:o,disabled:a=!1,openedByKeyboard:r=!1,locale:n,value:s,query:l,onValueChange:i,filter:c,autoHighlight:u=!1,triggerId:d,listRef:m,getActiveIndex:p,setActiveIndex:f,focusOwnerRef:v}=e,g=Ga.useContext(ku),[b,w]=Ga.useState(void 0),[y,x]=Ga.useState(r),[h,I]=Ga.useState(r),[R,C]=Ga.useState(r);r!==R&&(C(r),x(r),I(r));let{items:S,registerItem:T,liveItems:P}=Dg(),V=qe(),E=Ze(()=>new Au).current,z=$((K,Y)=>{let j=T(K,Y);return E.set("registeredItemCount",P.size),()=>{j(),E.set("registeredItemCount",P.size)}}),M=Ga.useRef(null),O=Ga.useRef(null),H=Ga.useMemo(()=>Ng({locale:n}).contains,[n]),k=v??M,N=(l??s).trim(),L=N===""||c===null?null:c??H,U=o&&(u==="always"||u&&N!==""),A=V?`${V}-list`:void 0,ee=(b??A)||void 0,B=d||void 0,Z=$((K,Y)=>{i?.(K,Y),!Y.isCanceled&&!u&&f(null)}),G=$(K=>{let Y=m.current,j=p();j!=null&&Y[j]!=null&&Y[j]===K[j]||f(U&&Y.length>0?0:null)});_(()=>{if(!o&&l===void 0)return;let K=O.current!==null&&O.current!==N;if(O.current=N,L===null){E.set("visibleItemIds",null),U&&P.size>0?(K||p()==null)&&f(0):N===""&&K&&f(null);return}let Y=E.state.visibleItemIds;if(Y===null&&P.size===0)return;let j=new Set,se=Y===null;P.forEach(({getText:pe},oe)=>{let Se=pe();Se!=null&&L(Se,N)&&(j.add(oe),se||=!Y?.has(oe))}),se||Y?.size!==j.size?(U&&j.size>0?f(0):(Y!==null||K)&&f(null),E.set("visibleItemIds",j)):U&&K&&j.size>0&&f(0)},[o,l,N,S,P,L,U,E,f,p]);let X=Ga.useMemo(()=>({open:o,disabled:a,inputFocusVisible:y,setInputFocusVisible:x,keyboardModality:h,setKeyboardModality:I,autoHighlight:u,triggerId:B,defaultListId:A,listId:ee,setRenderedListId:w,focusOwnerRef:k,setActiveIndex:f,onItemsChange:G,onValueChange:Z}),[o,a,y,h,u,B,A,ee,k,f,G,Z]),be=Ga.useMemo(()=>({parent:g,store:E,registerItem:z,listRef:m}),[g,E,z,m]);return cy(ku.Provider,{value:be,children:cy(iy.Provider,{value:X,children:cy(ly.Provider,{value:l??s,children:t})})})}import*as Fg from"react";function QS(e){let{open:t,mounted:o,value:a,onValueChange:r}=e,[n,s]=Fg.useState(null),l=Fg.useRef(t);return _(()=>{let i=l.current;l.current=t,i&&!t&&a!==""?(s(a),r("",we(q.popupClose))):(t||!o)&&n!==null&&s(null)},[t,o,a,n,r]),!t&&n!==null?n:a}import*as eE from"react";import*as Hg from"react";var uy=!1;function bs(e){uy=!0;try{e.focus({preventScroll:!0})}finally{uy=!1}}function Og(){return uy}function JS(e){let t=xn(),o=Ko(),{focusOwnerRef:a}=t,r=Hg.useRef(null),n=Hg.useRef("mouse");function s(i){n.current=i.pointerType||"mouse"}function l(i,c){let u=a.current;if(!t.open||!u)return;let d=Je(Ie(i.currentTarget));if(d===u||ue(i.currentTarget,d))return;let m=null;i.nativeEvent.composedPath().find(f=>Fe(f)?f.getAttribute("role")==="dialog"||f.hasAttribute("data-rootownerid")?!0:(f.hasAttribute("aria-haspopup")&&(m=f),!1):!1)===i.currentTarget&&(r.current&&!(c&&m)||c&&m&&Ge(i.relatedTarget)&&ue(m,i.relatedTarget)||bs(u))}return{"aria-activedescendant":void 0,"aria-orientation":void 0,onMouseDown(i){He(i.nativeEvent)===i.currentTarget&&i.preventDefault()},onPointerDown:s,onPointerOver:s,onPointerMove:s,onMouseMove(i){n.current==="mouse"&&l(i,!1)},onMouseOver(i){n.current==="mouse"&&r.current&&l(i,!0)},onFocus(i){let c=He(i.nativeEvent);c===a.current?r.current=null:Fe(c)&&!ue(i.currentTarget,c)&&!Og()&&(r.current=c),t.open&&c===i.currentTarget&&a.current?.focus({preventScroll:!0})},onKeyDown(i){let c=He(i.nativeEvent);c===a.current||Pr(c)||os(i.key,e,o==="rtl",!1)&&(a.current?.focus({preventScroll:!0}),i.stopPropagation())}}}import{jsx as VD}from"react/jsx-runtime";var tE=eE.forwardRef(function(t,o){let{store:a,orientation:r}=_e(),n=a.useState("open"),s=a.useState("parent"),l=a.useState("openMethod"),i=a.useState("lastOpenChangeReason"),c=JS(r),u=n&&i===q.triggerHover,d=s.type!=="menu"||n&&(l==="keyboard"||i===q.listNavigation||i===q.triggerHover||i===q.triggerPress),m=!1;d&&(m=()=>{let f=(l==="touch"||l==="pen")&&!a.context.virtualPress;return u||f?!1:a.context.virtualFocusRef?.current??!1});let p=rt(c,t);return VD(Yb,{...p,role:"dialog",initialFocus:m,ref:o})});import*as Zg from"react";import*as oE from"react";import*as Vg from"react";var Al=Vg.createContext(null);function Bg(){return Vg.useContext(Al)}import{jsx as BD}from"react/jsx-runtime";var aE=oE.forwardRef(function(t,o){let{render:a,className:r,style:n,id:s,...l}=t,i=xn(),[c,u]=cg(t,i.defaultListId,i.setRenderedListId);return ae("div",t,{ref:[o,u],props:[{tabIndex:-1,id:c,onFocus(m){let p=i.focusOwnerRef.current;p&&m.relatedTarget===p&&He(m.nativeEvent)===m.currentTarget&&bs(p)},onPointerMove(){i.setKeyboardModality(!1)},onPointerDown(){i.setKeyboardModality(!1)}},l,{children:BD(Al.Provider,{value:null,children:l.children})}]})});function _D(e,t){let{orientation:o,rtl:a,hasActiveItem:r,activeItemOpensSubmenu:n,hasValue:s}=t,{key:l}=e;if(e.which===229)return"ignore";if(l==="Tab")return e.shiftKey?"close":"ignore";if(l==="Enter")return r?"activate":"navigate";let i=l.startsWith("Arrow"),c=l==="Home"||l==="End";return e.shiftKey||e.ctrlKey||e.altKey||e.metaKey?i||c||l.length===1?"edit":"navigate":l.length===1?"edit":c?r&&!s?"navigate":"edit":i?hr(l,o)?o==="horizontal"&&!r&&s?"edit":"navigate":n&&(Mc(l,o,a)||os(l,o,a,!1))?"submenu":o==="horizontal"&&!r?"enter-list":s?"edit":"navigate":"navigate"}function zl(e){let{orientation:t,store:o}=_e(),a=El(),r=Ko();return $(n=>{if(!o.select("open"))return;let s=o.state.highlightedItem;switch(_D(n,{orientation:t,rtl:r==="rtl",hasActiveItem:s!=null,activeItemOpensSubmenu:s?.hasAttribute("aria-haspopup")??!1,hasValue:e})){case"edit":n.stopPropagation(),n.key.length===1&&!n.ctrlKey&&!n.metaKey&&!n.altKey&&o.state.inputProps.onKeyDown?.(n);break;case"navigate":{hr(n.key,t)&&n.stopPropagation(),o.state.inputProps.onKeyDown?.(n);break}case"enter-list":{n.stopPropagation();let i=o.context.itemDomElements,c=n.key==="ArrowDown"?Ar(i,Ft):tn(i,Ft);i.current[c]&&(n.preventDefault(),o.setActiveIndex(c,q.keyboard,n.nativeEvent));break}case"submenu":{Ot(n);let i=Ke(s).KeyboardEvent;s.dispatchEvent(new i(n.type,n.nativeEvent));break}case"activate":n.preventDefault(),on(s,n);break;case"close":{Ot(n);let i=o.state.parent.type==="menu"&&a?.getReturnElement?.()||o.state.activeTriggerElement,c=we(q.focusOut,n.nativeEvent);o.setOpen(!1,c),!c.isCanceled&&Fe(i)&&i.focus();break}default:break}})}function _g(e,t,o,a){let{orientation:r,rtl:n,loopFocus:s,allowEscape:l}=a,i=e.context.itemDomElements,c=i.current,{index:u}=xd(c,c.indexOf(t),{decrement:!Tc(o.key,r,n),loopFocus:s,allowEscape:l,disabledIndices:Ft,minIndex:Ar(i,Ft),maxIndex:tn(i,Ft)}),d=c[u];return d&&(e.setActiveIndex(u,q.keyboard,o.nativeEvent),d.scrollIntoView?.({block:"nearest",inline:"nearest"})),d??void 0}import{jsx as ZD}from"react/jsx-runtime";var rE=Zg.forwardRef(function(t,o){let{store:a,orientation:r,loopFocus:n,allowEscape:s}=_e(),l=Ko(),{onItemsChange:i,focusOwnerRef:c,triggerId:u}=xn(),{listRef:d}=vn(),{subscribeMapChange:m}=S0(),p=hs(),f=zl(p!==""),v=$(h=>{let I=c.current,R=He(h.nativeEvent),C=I!=null&&Je(Ie(I))===I,S=!ue(h.currentTarget,R);if(I==null||C||S){if(h.which!==229&&!h.shiftKey&&!h.ctrlKey&&!h.metaKey&&!h.altKey&&hr(h.key,r)){h.stopPropagation();let T=S&&C?g(R):void 0;T&&_g(a,T,h,{orientation:r,rtl:l==="rtl",loopFocus:n,allowEscape:s})}return}h.defaultPrevented||(bs(I),f(h))});function g(h){let I=h.getRootNode();return d.current.find(R=>{let C=R?.getAttribute("aria-controls");return C!=null&&Fe(R)&&ue(I.getElementById(C),h)})}let b=Zg.useRef(null),w=$(()=>{let h=[...d.current],I=b.current;(I===null||I.length!==h.length||h.some((C,S)=>C!==I[S]))&&I!==null&&i(I),b.current=h});_(()=>m(w),[m,w]);let y=Tl(t,null,u??null),x=rt({role:"menu","aria-labelledby":y,"aria-orientation":r==="horizontal"?"horizontal":void 0,onKeyDown:v},t);return ZD(aE,{...x,ref:o})});import*as my from"react";import*as nE from"react";function GD(e,t){if(e.visibleItemIds===null||t.size===0)return!1;for(let[o,a]of t)if(a||e.visibleItemIds.has(o))return!1;return!0}function dy(){let{store:e}=vn(),t=Bg(),{items:o,registerItem:a}=Dg(),r=Yr(e,GD,o),n=Ze(()=>Symbol("filter-dropdown-group")).current,s=t?.registerItem;_(()=>s?.(n,!r),[s,n,r]);let l=nE.useMemo(()=>({registerItem:a}),[a]);return{hidden:r,context:l}}import{jsx as Gg}from"react/jsx-runtime";var sE=my.forwardRef(function(t,o){let{hidden:a,context:r}=dy();return Gg(Al.Provider,{value:r,children:Gg($b,{...t,hidden:a||t.hidden||void 0,ref:o})})}),iE=my.forwardRef(function(t,o){let{hidden:a,context:r}=dy();return Gg(Al.Provider,{value:r,children:Gg(ay,{...t,hidden:a||t.hidden||void 0,ref:o})})});import*as _r from"react";function py(e){return typeof e=="string"||typeof e=="number"?String(e):Array.isArray(e)?e.map(py).join(""):_r.isValidElement(e)?py(e.props.children):""}function Ug(e){let{label:t,retainGroup:o=!1,children:a,render:r,context:n}=e,s=vn(n!==void 0),l=Bg(),i=n===void 0?s:n,{registerItem:c,store:u}=i??YS,d=l?.registerItem,m=Ze(()=>Symbol("filter-dropdown-item")).current,p=_r.useRef(null),f=_r.useRef(void 0),v=Yr(u,zu.isItemVisible,m),[g,b]=_r.useState(v),w=ft(a),y=ft(r),x=_r.useRef(void 0),h=_r.useCallback(()=>{if(t!=null)return t;let R=py(w.current??As(y.current)),C=x.current;return x.current=R,p.current!==null?p.current.textContent??"":f.current!==void 0&&R===C?f.current:R},[t,w,y]),I=_r.useCallback(R=>{let C=R??h();return C&&(f.current=C),c(m,{getText(){return t==null&&p.current&&(f.current=p.current.textContent??""),f.current}})},[m,t,c,h]);return _(()=>{let R=I();return b(!0),R},[I]),_(()=>d?.(m,o),[d,m,o]),_(()=>{let R=h();R!==f.current&&(f.current=R,I(R))},[I,h,a,r,t]),{visible:!g||v,ref:p}}function lE(e){let{store:t,virtualFocus:o}=_e(),a=t.useState("open"),r=t.useState("mounted"),n=t.useState("parent"),s=n.type==="menu"?n.store.context.itemDomElements:null,l=KS(s),{visible:i,ref:c}=Ug({...e,context:l,retainGroup:r});_(()=>{i||!a||t.setOpen(!1,we(q.none))},[i,a,t]);let u=Cg((m,p)=>{m.type==="click"&&t.select("open")&&(p==="keyboard"||p==="mouse"&&t.select("lastOpenChangeReason")===q.triggerPress)&&t.context.virtualFocusRef?.current?.focus({preventScroll:!0})}),d={...o?{"aria-haspopup":"dialog"}:void 0,...u,onPointerDown(m){u.onPointerDown(m),t.context.virtualPress=Qr(m.nativeEvent)},onFocus(m){let p=t.context.virtualFocusRef?.current;p&&t.select("open")&&m.relatedTarget===p&&(m.preventBaseUIHandler(),p.focus({preventScroll:!0}))}};return l===null?{visible:!0,ref:null,props:d}:{visible:i||r,ref:c,props:d}}function cE(e,t,o,a){let r=t.type==="menu"?t.store:null,n=r?.context.virtualFocusRef,s=$((i,c)=>{let u=n?.current;a||e.select("open")||!r?.select("open")||!u||(ue(e.context.popupRef.current,Je(Ie(u)))&&u.focus({preventScroll:!0}),(c===q.listNavigation||c===q.escapeKey)&&r.state.activeIndex==null&&r.highlightItem(i,q.none))});_(()=>{if(!o){let i=e.state.activeTriggerElement,c=e.select("lastOpenChangeReason");queueMicrotask(()=>s(i,c))}},[o,e,s]);function l(){!a&&n&&r?.state.activeIndex!=null&&r.setActiveIndex(null,q.none)}return{parentVirtualFocusRef:n,handleFocus:l}}var uE={Popup:tE,List:rE,Group:sE,RadioGroup:iE,useItem:Ug,useSubmenuTrigger:lE,useParentHandoff:cE};import{jsx as dE}from"react/jsx-runtime";function $g(e){let{value:t,defaultValue:o="",onValueChange:a,...r}=e,{store:n}=_e(),s=n.useState("open"),l=n.useState("mounted"),i=n.useState("keyboardOpen"),c=n.useState("activeTriggerId"),u=n.useState("activeTriggerElement"),d=n.useState("disabled"),[m,p]=Ba({controlled:t,default:o,name:"MenuFilterProvider",state:"value"}),f=$((x,h)=>{a?.(x,h),h.isCanceled||p(x)}),v=$(()=>n.state.activeIndex),g=$(x=>{n.setActiveIndex(x,q.none)}),b=QS({open:s,mounted:l,value:m,onValueChange:f}),w=UD(m!=="");Ze(()=>(n.set("filterTriggerProps",w),null)),n.useSyncedValue("filterTriggerProps",w),_(()=>{s||n.set("keyboardOpen",!1)},[s,n]);let y=u?u.id||null:c;return dE(bu.Provider,{value:uE,children:dE(XS,{...r,open:s,openedByKeyboard:i,disabled:d,value:m,query:b,onValueChange:f,triggerId:y,listRef:n.context.itemDomElements,getActiveIndex:v,setActiveIndex:g,focusOwnerRef:n.context.virtualFocusRef})})}function UD(e){let{store:t}=_e(),o=Ml(!0)!=null,a=zl(e);return mE.useMemo(()=>({"aria-haspopup":"dialog",onPointerDown(r){t.context.virtualPress=Qr(r.nativeEvent)},onKeyDown(r){let n=t.context.virtualFocusRef?.current;!t.select("open")||!n||o||(r.key==="ArrowUp"||r.key==="ArrowDown"?(n.focus({preventScroll:!0}),a(r),r.preventDefault(),r.preventBaseUIHandler()):r.key==="ArrowLeft"||r.key==="ArrowRight"?r.preventBaseUIHandler():$D(r)&&n.focus({preventScroll:!0}))}}),[t,o,a])}function $D(e){return e.key.length===1&&e.key!==" "&&!e.ctrlKey&&!e.metaKey&&!e.altKey}import*as pE from"react";function Wg(e){let{children:t,value:o,defaultValue:a,onValueChange:r,filter:n,autoHighlight:s=!1,locale:l,...i}=e,c=pE.useRef(null);return{children:t,rootProps:{...i,virtualFocus:!0,virtualFocusRef:c,allowEscape:!s,resetOnPointerLeave:s!=="always"},dropdownProps:{value:o,defaultValue:a,onValueChange:r,filter:n,autoHighlight:s,locale:l}}}import{jsx as fE}from"react/jsx-runtime";function gE(e){let{children:t,rootProps:o,dropdownProps:a}=Wg(e);return fE(ui,{...o,children:r=>fE($g,{...a,children:typeof t=="function"?t(r):t})})}import*as Lu from"react";import{jsx as qg}from"react/jsx-runtime";function hE(e){let t=_e(),o=t.store,a=o.useState("disabled"),{rootProps:r,dropdownProps:n}=Wg(e),s=Lu.useRef(null);function l(d,m){let p=t.virtualFocus?o.context.virtualFocusRef?.current:Je(Ie(d));Fe(p)&&(s.current={reference:p,trigger:d},o.setActiveIndex(null,m?q.keyboard:q.none,m))}function i(d,m){o.highlightItem(d,q.keyboard,m)}function c(d){let m=s.current;m&&(m.reference.focus({preventScroll:!0}),i(m.trigger,d))}function u(d,m){if(r.onOpenChange?.(d,m),!m.isCanceled){if(!d){m.reason===q.escapeKey&&Fe(m.trigger)&&(i(m.trigger,m.event),s.current={reference:t.virtualFocus?o.context.virtualFocusRef?.current??m.trigger:m.trigger,trigger:m.trigger});return}s.current=null,Fe(m.trigger)&&Sg(m.reason,m.event)&&l(m.trigger,m.reason===q.listNavigation?m.event:void 0)}}return qg(ui,{...r,isSubmenu:!0,disabled:a||e.disabled,onOpenChange:u,children:qg(WD,{parentStore:o,parentVirtualFocus:t.virtualFocus,parentAllowEscape:t.virtualFocus&&t.allowEscape,parentOrientation:t.orientation,parentLoopFocus:t.loopFocus,getReturnElement:()=>s.current?.reference??(t.virtualFocus?o.context.virtualFocusRef?.current:null)??null,onSubmenuEnter:l,onSubmenuExit:c,children:qg($g,{...n,children:e.children})})})}function WD(e){let{children:t,parentStore:o,parentVirtualFocus:a,parentAllowEscape:r,parentOrientation:n,parentLoopFocus:s,onSubmenuEnter:l,onSubmenuExit:i,getReturnElement:c}=e,{store:u,orientation:d}=_e(),m=Ko(),p=u.useState("mounted"),f=Lu.useRef(!1),v=$(()=>{let[h]=u.context.triggerElements.elements();return c()??(Fe(h)?h:null)});_(()=>{let h=f.current;if(f.current=p,p||!h)return;let I=v();if(!I||!o.select("open"))return;let R=Ie(I),C=Je(R);(C===R.body||ue(u.select("popupElement"),C))&&I.focus({preventScroll:!0})},[p,u,o,v]);function g(h,I){let R=_g(o,h,I,{orientation:n,rtl:m==="rtl",loopFocus:s,allowEscape:r});a||R?.focus({preventScroll:!0})}function b(h){if(!u.select("open"))return;Ot(h);let I=u.select("activeTriggerElement"),R=we(q.listNavigation,h.nativeEvent);u.setOpen(!1,R),R.isCanceled||i(h.nativeEvent);let C=c()??u.select("activeTriggerElement");!u.select("open")&&Fe(C)&&Je(Ie(C))!==C&&C.focus(),!u.select("open")&&Fe(I)&&hr(h.key,n)&&g(I,h)}let w=$(h=>{if(hr(h.key,n)){g(h.currentTarget,h),h.preventBaseUIHandler(),Ot(h);return}let I=u.select("open"),R=m==="rtl",C=os(h.key,d,R,!1);if(I&&C){b(h);return}if(Mc(h.key,n,R)){if(Ot(h),I){l(h.currentTarget,h.nativeEvent),u.context.virtualFocusRef?.current?.focus({preventScroll:!0});return}u.setOpen(!0,we(q.listNavigation,h.nativeEvent,h.currentTarget))}}),y=$(h=>{if(h.which===229)return;os(h.key,d,m==="rtl",!1)&&b(h)}),x=Lu.useMemo(()=>({getReturnElement:v,onTriggerKeyDown:w,onPopupKeyDown:y}),[v,w,y]);return qg(Iu.Provider,{value:x,children:t})}import{jsx as qD}from"react/jsx-runtime";function yE(e){let{children:t,filter:o,value:a,defaultValue:r,onValueChange:n,autoHighlight:s,locale:l}=e,i=bE.useMemo(()=>({Root:gE,SubmenuRoot:hE,options:{filter:o,value:a,defaultValue:r,onValueChange:n,autoHighlight:s,locale:l}}),[o,a,r,n,s,l]);return qD(gs.Provider,{value:i,children:t})}import*as jg from"react";import*as Ll from"react";var wE=Ll.forwardRef(function(t,o){let{render:a,className:r,style:n,id:s,disabled:l,activeItemId:i,navigationProps:c,...u}=t,d=qe(s),m=xn(),{listRef:p}=vn(),f=hs(),[v,g]=Ll.useState(null),b=Ll.useRef(!1);function w(x,h){if(!m.open)return;let I=x===""?q.inputClear:q.inputChange;m.onValueChange(x,we(I,h))}let y={highlighted:m.inputFocusVisible&&(!m.keyboardModality||i==null)};return ae("input",t,{state:y,ref:[o,m.focusOwnerRef],props:[c,{id:d,type:"text",disabled:m.disabled||l,"aria-activedescendant":i,role:"searchbox",inputMode:"search",autoComplete:"off",spellCheck:"false",autoCorrect:"off",autoCapitalize:"none","aria-autocomplete":void 0,"aria-controls":m.listId,value:v??f,onCompositionStart(x){at.os.android||(b.current=!0,g(x.currentTarget.value))},onCompositionEnd(x){b.current&&(b.current=!1,g(null),w(x.currentTarget.value,x.nativeEvent))},onChange(x){if(b.current){g(x.currentTarget.value);return}w(x.currentTarget.value,x.nativeEvent)},onKeyDown(){m.setKeyboardModality(!0)},onPointerDown(){m.setKeyboardModality(!1)},onMouseEnter(x){m.setKeyboardModality(!1),m.open&&bs(x.currentTarget)},onFocus(x){if(m.setInputFocusVisible(!0),m.autoHighlight==="always"||Og())return;let h=x.relatedTarget;h!==null&&p.current.includes(h)&&m.setActiveIndex(null)},onBlur(){m.setInputFocusVisible(!1)}},u]})});import{jsx as jD}from"react/jsx-runtime";var vE=jg.forwardRef(function(t,o){Rl("Input");let{store:a}=_e(),r=hs(),{onKeyDown:n,...s}=a.useState("inputProps"),l=a.useState("highlightedItemId"),i=zl(r!==""),c=jg.useCallback(m=>{a.set("inputFocused",m!==null&&Je(Ie(m))===m)},[a]),u=Bt(o,c),d=rt({onKeyDown:i,onFocus(){a.set("inputFocused",!0)},onBlur(){a.set("inputFocused",!1)}},t);return jD(wE,{...d,activeItemId:l,navigationProps:s,ref:u})});import*as Nu from"react";import{jsx as KD}from"react/jsx-runtime";var YD=Nu.forwardRef(function(t,o){let{render:a,className:r,style:n,id:s,...l}=t,{store:i,orientation:c}=_e(),u=i.useState("activeTriggerId"),d=i.useState("activeTriggerElement"),m=i.useStateSetter("listElement"),p=qe(s),f=Nu.useRef(p);_(()=>{f.current!==p&&(f.current=p,i.notifyAll())},[p,i]);let v=Tl(t,d,u);return ae("div",t,{ref:[o,m],props:[{id:p,role:"menu",tabIndex:-1,"aria-orientation":c==="horizontal"?"horizontal":void 0,"aria-labelledby":v},l]})}),xE=Nu.forwardRef(function(t,o){let a=yn()?.List??YD;return KD(a,{...t,ref:o})});import*as RE from"react";import*as IE from"react";var CE=IE.forwardRef(function(t,o){let{render:a,className:r,style:n,disabled:s=!1,nativeButton:l=!0,...i}=t,c=xn(),u=hs(),d=c.disabled||s,m=u!=="",{buttonRef:p,getButtonProps:f}=Ut({disabled:d,native:l});return ae("button",t,{enabled:m,state:{disabled:d},ref:[o,p],props:[{tabIndex:-1,"aria-hidden":!0,onMouseDown(g){g.preventDefault()},onClick(g){let b=we(q.clearPress,g.nativeEvent);c.onValueChange("",b),c.focusOwnerRef.current?.focus({preventScroll:!0})}},i,f]})});import{jsx as XD}from"react/jsx-runtime";var SE=RE.forwardRef(function(t,o){return Rl("Clear"),XD(CE,{...t,ref:o})});import*as ME from"react";import*as Yg from"react";import*as Kg from"react";var QD="⁠",JD=200;function eF(e){let t=e.ownerDocument.createTreeWalker(e,NodeFilter.SHOW_TEXT),o=null;for(;t.nextNode();){let a=t.currentNode;a.nodeValue!==""&&(o=a)}return o}function EE(e=!0){let t=Qe(),o=Kg.useRef(null);return Kg.useEffect(()=>{if(!e||at.os.ios)return;let a=o.current;if(a==null)return;let r=eF(a);if(r==null)return;let n=r.data,s=`${n}${QD}`;return r.nodeValue=s,t.start(JD,()=>{r.nodeValue===s&&(r.nodeValue=n)}),()=>{t.clear(),r.nodeValue===s&&(r.nodeValue=n)}},[e,o,t]),o}var TE=Yg.forwardRef(function(t,o){let{render:a,className:r,style:n,...s}=t,{store:l}=vn(),i=Yr(l,zu.isEmpty),[c,u]=Yg.useState(!1);_(()=>{u(!0)},[]);let d=c&&i,m=EE(d);return ae("div",t,{enabled:d,ref:[o,m],props:[{role:"status","aria-live":"polite","aria-atomic":!0},s]})});import{jsx as tF}from"react/jsx-runtime";var PE=ME.forwardRef(function(t,o){return Rl("Empty"),tF(TE,{...t,ref:o})});var Nl={};Jo(Nl,{Arrow:()=>H0,Backdrop:()=>B0,CheckboxItem:()=>G0,CheckboxItemIndicator:()=>$0,Group:()=>q0,GroupLabel:()=>j0,Item:()=>K0,LinkItem:()=>Y0,Popup:()=>ug,Portal:()=>mg,Positioner:()=>LE,RadioGroup:()=>bg,RadioItem:()=>wg,RadioItemIndicator:()=>xg,Root:()=>kE,Separator:()=>kg,SubmenuRoot:()=>Tg,SubmenuTrigger:()=>Ag,Trigger:()=>zE});import*as Zr from"react";import{jsx as fy}from"react/jsx-runtime";function kE(e){let[t,o]=Zr.useState({getBoundingClientRect(){return DOMRect.fromRect({width:0,height:0,x:0,y:0})}}),a=Zr.useRef(null),r=Zr.useRef(null),n=Zr.useRef(null),s=Zr.useRef(null),l=Zr.useRef(!0),i=Zr.useRef(null),c=Da(),u=Zr.useMemo(()=>({anchor:t,setAnchor:o,actionsRef:n,backdropRef:a,internalBackdropRef:r,positionerRef:s,allowMouseUpTriggerRef:l,initialCursorPointRef:i,rootId:c}),[t,c]);return fy(Zb.Provider,{value:u,children:fy(li.Provider,{value:void 0,children:fy(lr.Root,{...e})})})}import*as In from"react";var AE=500,zE=In.forwardRef(function(t,o){let{render:a,className:r,style:n,...s}=t,{setAnchor:l,actionsRef:i,internalBackdropRef:c,backdropRef:u,positionerRef:d,allowMouseUpTriggerRef:m,initialCursorPointRef:p,rootId:f}=bn(!1),{store:v}=_e(!1),g=v.useState("open"),b=v.useState("disabled"),w=In.useRef(null),y=In.useRef(null),x=Qe(),h=Qe(),I=In.useRef(!1),R=In.useRef(null);function C(M,O,H){let k=H.type.startsWith("touch");p.current={x:M,y:O},l({getBoundingClientRect(){return DOMRect.fromRect({width:k?10:0,height:k?10:0,x:M,y:O})}}),I.current=!1,i.current?.setOpen(!0,we(q.triggerPress,H)),h.start(AE,()=>{I.current=!0})}function S(M){if(b)return;m.current=!0,Ot(M),C(M.clientX,M.clientY,M.nativeEvent);let O=Ie(w.current);R.current?.abort();let H=new AbortController;R.current=H,O.addEventListener("mouseup",k=>{if(m.current=!1,!I.current)return;h.clear(),I.current=!1;let N=He(k);ue(d.current,N)||f&&N&&Tu(N)===f||i.current?.setOpen(!1,we(q.cancelOpen,k))},{once:!0,signal:H.signal})}function T(){x.clear(),y.current=null}function P(M){if(b){T();return}if(m.current=!1,M.touches.length!==1){T();return}M.stopPropagation();let O=M.touches[0],H={x:O.clientX,y:O.clientY};y.current=H,x.start(AE,()=>{C(H.x,H.y,M.nativeEvent)})}function V(M){if(M.touches.length!==1){T();return}if(x.isStarted()&&y.current){let O=M.touches[0],H=10,k=Math.abs(O.clientX-y.current.x),N=Math.abs(O.clientY-y.current.y);(k>H||N>H)&&T()}}return In.useEffect(()=>()=>{R.current?.abort()},[]),In.useEffect(()=>{function M(H){if(b)return;let N=He(H);(ue(w.current,N)||ue(c.current,N)||ue(u.current,N))&&H.preventDefault()}let O=Ie(w.current);return Ae(O,"contextmenu",M)},[u,b,c]),ae("div",t,{state:{open:g},ref:[w,o],props:[{onContextMenu:S,onTouchStart:P,onTouchMove:V,onTouchEnd:T,onTouchCancel:T,style:{WebkitTouchCallout:"none"}},s],stateAttributesMapping:rc})});var LE=gg;import{jsx as Pa,jsxs as jwe}from"react/jsx-runtime";var hy=ka.createContext({mode:"click",mark:()=>{},pressed:{current:null}}),fF="ms-auto flex shrink-0 items-center gap-1 ps-4",gF='[data-menu-target], tr, [role="row"], li';function gy(e,t){if(!(e instanceof Element))return null;let o=e.closest(gF),a=t??o?.closest("[data-menu-area]");return o&&a&&a.contains(o)&&o!==a?o:null}function Dl({trigger:e="click",onOpenChange:t,onTargetChange:o,...a}){let r=ka.useRef(null),n=ka.useRef(null),s=ka.useRef(o);ka.useLayoutEffect(()=>{s.current=o});let l=ka.useCallback(u=>{u!==r.current&&(r.current?.removeAttribute("data-menu-target-open"),r.current=u,u?.setAttribute("data-menu-target-open",""),s.current?.(u))},[]),i=ka.useMemo(()=>({mode:e,mark:l,pressed:n}),[e,l]),c=(u,d)=>{u&&!r.current&&l(e==="contextmenu"?n.current:gy(d.event?.target)),u||(l(null),n.current=null),t?.(u,d)};return Pa(hy.Provider,{value:i,children:e==="contextmenu"?Pa(Nl.Root,{"data-slot":"dropdown-menu",onOpenChange:c,...a}):Pa(lr.Root,{"data-slot":"dropdown-menu",onOpenChange:c,...a})})}function hF(e){let t=er();return Pa(lr.Portal,{"data-slot":"dropdown-menu-portal",container:t,...e})}function Fl({selectable:e=!1,className:t,...o}){let{mode:a,mark:r,pressed:n}=ka.useContext(hy);if(a==="contextmenu"){let s=F(!e&&"select-none","[&_[data-menu-target-open]]:bg-pressed","forced-colors:[&_[data-menu-target-open]]:outline-solid forced-colors:[&_[data-menu-target-open]]:outline-2 forced-colors:[&_[data-menu-target-open]]:-outline-offset-2");return Pa(Nl.Trigger,{"data-slot":"dropdown-menu-trigger","data-menu-area":"","data-selectable":e||void 0,onPointerDown:l=>{l.pointerType!=="mouse"&&(n.current=gy(l.target,l.currentTarget))},onContextMenu:l=>{r(gy(l.target,l.currentTarget))},onKeyDown:l=>{if(!(l.shiftKey&&l.key==="F10"))return;let i=document.activeElement;if(!i||!l.currentTarget.contains(i))return;l.preventDefault();let c=i.getBoundingClientRect(),u=Math.min(c.width/2,160),d=getComputedStyle(i).direction==="rtl"?c.right-u:c.left+u;i.dispatchEvent(new MouseEvent("contextmenu",{bubbles:!0,cancelable:!0,clientX:d,clientY:c.top+c.height/2,button:2}))},className:Et(s,t),...o})}return Pa(lr.Trigger,{"data-slot":"dropdown-menu-trigger",className:t,...o})}function Ol({align:e,alignOffset:t,side:o,sideOffset:a,collisionPadding:r=8,collisionAvoidance:n,anchor:s,size:l="default",className:i,...c}){let{mode:u}=ka.useContext(hy),d=Pa(lr.Popup,{"data-slot":"dropdown-menu-content","data-size":l,"aria-label":u==="contextmenu"?"Actions":void 0,className:Et(S8,i),...c});return Pa(hF,{children:u==="contextmenu"?Pa(Nl.Positioner,{className:"isolate z-(--z-overlay) outline-none",align:e??"start",alignOffset:t??4,side:o??"inline-end",sideOffset:a??0,collisionPadding:r,collisionAvoidance:n,children:d}):Pa(lr.Positioner,{className:"isolate z-(--z-overlay) outline-none",align:e??"start",alignOffset:t??0,side:o??"bottom",sideOffset:a??6,collisionPadding:r,collisionAvoidance:n,anchor:s,children:d})})}function Du({className:e,inset:t,...o}){return Pa(lr.GroupLabel,{"data-slot":"dropdown-menu-label","data-inset":t||void 0,className:Et(Cm,e),...o})}function Ua({className:e,inset:t,variant:o="default",...a}){return Pa(lr.Item,{"data-slot":"dropdown-menu-item","data-inset":t||void 0,"data-variant":o,"data-status":o==="destructive"?"fail":void 0,className:Et(Nc,e),...a})}function Fu({className:e,...t}){return Pa(lr.Separator,{"data-slot":"dropdown-menu-separator",className:Et(E8,e),...t})}function by({className:e,keys:t,children:o,...a}){let r=t??(typeof o=="string"?[o]:null);return Pa("kbd",{"data-slot":"dropdown-menu-shortcut",className:F(fF,e),...a,children:r?r.map((n,s)=>Pa(ri,{children:n},s)):o})}import{useEffect as bF,useState as NE}from"react";var DE=3e4;function FE(e){let[t,o]=NE([]),[a,r]=NE(!1);return bF(()=>{if(!e?.rest)return;let n=!0,s=()=>{Promise.resolve(e.rest("/bots")).then(i=>{n&&(o(Array.isArray(i?.bots)?i.bots:[]),r(!1))}).catch(()=>{n&&r(!0)})};s();let l=e.setInterval?e.setInterval(s,DE):window.setInterval(s,DE);return()=>{n=!1,typeof l=="function"?l():window.clearInterval(l)}},[e]),{rows:t,failed:a}}import{jsx as ke,jsxs as Nt}from"react/jsx-runtime";var HE="default";function vF(e){return(Array.isArray(e)?e:[]).filter(o=>o&&(o.id==="claude"||o.id==="opencode_go")).map(o=>{let a=Array.isArray(o.windows)?o.windows:[];return{id:o.id,label:o.label||o.id,session:a.find(r=>r?.id==="session"),week:a.find(r=>r?.id==="week")}})}function wy({selected:e,className:t,innerClassName:o,onClick:a,label:r,children:n}){return ke("div",{role:"button",tabIndex:0,"aria-label":r,"aria-current":e?"true":void 0,onClick:a,onKeyDown:s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),a())},className:F("rounded-tag focus-visible:focus-ring-row",e?"bg-pressed":"hover:bg-hover",t),children:ke(gf,{size:"sm",className:F("h-full gap-2.5 px-2.5",o),children:n})})}function vy({ctx:e}){let t=Ht(Le,E=>E.bots),o=Ht(Le,E=>E.bot),a=Ht(Le,E=>E.live),r=Ht(Le,E=>E.sessionsByBot),n=Ht(Le,E=>E.storedId),s=Ht(Le,E=>E.usage),{rows:l}=FE(e),[i,c]=yy(""),[u,d]=yy(!1),[m,p]=yy(!1),f=OE(null),v=OE(null),g=wF(()=>{let E=new Map(l.map(z=>[z.name,z]));return[...t].sort((z,M)=>(E.get(M.name)?.last_active||0)-(E.get(z.name)?.last_active||0)).map(z=>{let M=E.get(z.name);return{name:z.name,label:si(z),heading:ZR(z.name,z.description),output:M?.last_output||"",active:M?.last_active?M.last_active*1e3:null,identity:k0(z.name)}})},[t,l]),b=g.find(E=>E.name===HE)||null,w=g.filter(E=>E.name!==HE),y=i.trim().toLowerCase(),x=E=>!y||`${E.label} ${E.heading} ${E.output}`.toLowerCase().includes(y),h=w.filter(x),I=b&&x(b)?b:null,R=(o?r[o]:null)||[],C=y?R.filter(E=>String(E.title||"").toLowerCase().includes(y)):R,S=E=>!!a&&E===o,T=()=>{d(!1),c("")};yF(()=>{let E=f.current,z=v.current;if(!E||!z||typeof IntersectionObserver!="function")return;let M=new IntersectionObserver(O=>{let H=O[0];if(!H)return;let k=H.rootBounds?H.rootBounds.top:0;p(!H.isIntersecting&&H.boundingClientRect.top<k)},{root:E,threshold:0});return M.observe(z),()=>M.disconnect()},[]);let P=E=>{try{e?.runAction?.(E)}catch{}},V=b?[b,...w]:w;return Nt("aside",{className:"relative flex h-full min-h-0 min-w-0 flex-col bg-page",children:[m?ke("div",{className:"absolute inset-x-0 top-0 z-(--z-raised) flex items-center gap-1 bg-page px-3 py-2","data-enter":"rail-bar",children:V.map(E=>ke("span",{role:"button",tabIndex:0,onClick:()=>qi(E.name),onKeyDown:z=>{(z.key==="Enter"||z.key===" ")&&(z.preventDefault(),qi(E.name))},"aria-label":E.label,"aria-current":E.name===o?"true":void 0,className:F("cursor-pointer rounded-pill p-0.5",E.name===o?"focus-ring focus-sm":"hover:bg-hover"),children:ke(ii,{size:24,colors:E.identity.colors,shape:E.identity.shape,label:E.label})},E.name))}):null,Nt("div",{ref:f,className:"flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 pt-2",children:[ke("div",{className:"flex items-center justify-end gap-1",children:Nt(un,{children:[Nt(or,{children:[ke(ar,{render:ke($e,{variant:"ghost",size:"icon","aria-label":"Rechercher un bot ou une conversation",onClick:()=>d(E=>!E)}),children:ke(Ce,{icon:Zi,size:16})}),ke(Va,{shortcut:["/"],children:"Rechercher"})]}),Nt(or,{children:[ke(ar,{render:ke($e,{variant:"ghost",size:"icon","aria-label":"Nouvelle conversation",onClick:()=>Gc()}),children:ke(Ce,{icon:Hs,size:16})}),ke(Va,{shortcut:["mod","shift","O"],children:"Nouvelle conversation"})]})]})}),u?ke(vb,{mode:"search",size:"sm",autoFocus:!0,"aria-label":"Filtrer les bots et les conversations",value:i,placeholder:"Filtrer les bots et les conversations",onChange:E=>c(E.target.value),onKeyDown:E=>{E.key==="Escape"&&(E.stopPropagation(),T())}}):null,I?ke("div",{className:"flex justify-center pb-1",children:Nt(wy,{selected:I.name===o,onClick:()=>qi(I.name),label:I.label,className:"size-30 rounded-panel",innerClassName:"flex-col justify-center gap-2 px-0",children:[Nt("span",{className:"relative",children:[ke(ii,{size:64,colors:I.identity.colors,shape:I.identity.shape,label:I.label}),ke("span",{className:"absolute end-0 bottom-0 grid size-4.5 place-items-center rounded-pill bg-warn text-text-inverse",children:ke(Ce,{icon:N6,size:12})})]}),ke("span",{className:"type-label text-text-1",children:I.label})]})}):null,ke("div",{className:"flex flex-col gap-1",children:h.map(E=>Nt(wy,{selected:E.name===o,onClick:()=>qi(E.name),label:E.heading,className:"h-14",children:[ke(ii,{size:36,colors:E.identity.colors,shape:E.identity.shape,label:E.label}),Nt("span",{className:"flex min-w-0 flex-1 flex-col gap-0.5",children:[Nt("span",{className:"flex min-w-0 items-center gap-1.5",children:[ke("span",{className:"truncate type-label text-text-1",children:E.heading}),Nt("span",{className:"ms-auto flex shrink-0 items-center gap-1",children:[S(E.name)?ke(xF,{}):null,ke("span",{className:"type-caption text-text-3",children:Vb(E.active)})]})]}),ke("span",{className:"truncate type-body-sm text-text-2",children:E.output||"Aucune sortie récente"})]})]},E.name))}),ke("div",{ref:v,"aria-hidden":"true",className:"h-px w-full"}),Nt("div",{className:"flex min-h-0 flex-col",children:[Nt("div",{className:"flex items-center justify-between gap-2 pb-1",children:[ke("h2",{className:"type-caption text-text-2",children:"Conversations"}),ke(un,{children:Nt(or,{children:[ke(ar,{render:ke($e,{variant:"ghost",size:"icon-sm","aria-label":"Nouvelle conversation",onClick:()=>Gc()}),children:ke(Ce,{icon:Hs,size:12})}),ke(Va,{children:"Nouvelle conversation"})]})})]}),wl.map(E=>{let z=C.filter(M=>PR(M.at)===E);return z.length?Nt("div",{className:"flex flex-col pb-2",children:[ke("span",{className:"px-2 pb-1 type-caption text-text-3",children:E}),z.map(M=>Nt(wy,{selected:M.id===n,onClick:()=>Q6(M.id),label:M.title||"Conversation",className:"h-8",innerClassName:"gap-2 px-2",children:[ke("span",{className:"min-w-0 flex-1 truncate type-body-sm text-text-1",children:M.title||"Conversation"}),ke("span",{className:"shrink-0 type-caption text-text-3",children:Vb(M.at)})]},M.id))]},E):null}),!C.length&&y?ke("span",{className:"px-2 type-caption text-text-3",children:"Aucune conversation"}):null]})]}),Nt("div",{className:"flex flex-col gap-3 px-3 pb-3 pt-2",children:[vF(s).map(E=>Nt("div",{className:"flex flex-col gap-1",children:[Nt("div",{className:"flex items-baseline justify-between gap-2",children:[ke("span",{className:"type-caption text-text-2",children:E.label}),ke("span",{className:"type-caption tabular-nums text-text-3",children:E.session?`${A0(E.session.used)} %`:"—"})]}),ke("div",{className:"h-(--progress-bar-sm) w-full overflow-hidden rounded-pill bg-field",children:ke("div",{className:"h-full w-(--pct) rounded-pill bg-ink",style:{"--pct":`${A0(E.session?.used)}%`}})}),ke("span",{className:"type-caption text-text-3",children:E.week?`Semaine ${A0(E.week.used)} %`:"Semaine —"})]},E.id)),Nt("div",{className:"flex items-center gap-2",children:[ke(D0,{type:"person",size:"sm",name:"Ilyass Bm",children:ke(gu,{})}),ke("span",{className:"min-w-0 flex-1 truncate type-label text-text-1",children:"Ilyass Bm"}),Nt(Dl,{children:[ke(Fl,{render:ke($e,{variant:"ghost",size:"icon-sm","aria-label":"Ouvrir les réglages et les pages de l'application"}),children:ke(Ce,{icon:Oc,size:14})}),Nt(Ol,{align:"end",side:"top",size:"sm",children:[ke(Du,{children:"Hermes"}),Nt(Ua,{onClick:()=>P("nav.settings"),children:["Réglages",ke(by,{keys:["⌘",","]})]}),ke(Ua,{onClick:()=>P("nav.capabilities"),children:"Capabilities"}),ke(Ua,{onClick:()=>P("nav.messaging"),children:"Messaging"}),ke(Ua,{onClick:()=>P("nav.artifacts"),children:"Artifacts"}),ke(Ua,{onClick:()=>P("nav.cron"),children:"Tâches planifiées"}),ke(Fu,{}),ke(Ua,{onClick:()=>P("nav.agents"),children:"Agents et connexions"}),Nt(Ua,{onClick:()=>P("keybinds.openPanel"),children:["Raccourcis",ke(by,{keys:["⌘","/"]})]})]})]})]})]})]})}function xF(){return ke("span",{role:"img","aria-label":"Travaille",className:"inline-flex size-1.5 text-ok",children:ke("svg",{viewBox:"0 0 6 6","aria-hidden":"true",className:"size-full",children:ke("circle",{cx:"3",cy:"3",r:"2.6",fill:"currentColor"})})})}import{useEffect as IF,useState as CF}from"react";function xy(e){let[t,o]=CF(()=>typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia(e).matches:!1);return IF(()=>{if(typeof window>"u"||typeof window.matchMedia!="function")return;let a=window.matchMedia(e),r=()=>o(a.matches);return r(),a.addEventListener("change",r),()=>a.removeEventListener("change",r)},[e]),t}import{Fragment as GE,jsx as $a,jsxs as Xg}from"react/jsx-runtime";var VE="hermes-ui-glaze",BE=272,_E=320;function SF(){Ou(()=>{let e=document.getElementById(VE);return e||(e=document.createElement("style"),e.id=VE,document.head.appendChild(e)),e.textContent=ff,()=>{e?.remove()}},[])}var ZE=!1;function EF(e){Ou(()=>{if(ZE)return;ZE=!0;let t=setTimeout(()=>{try{UE.paneVisibility?.("sessions")?.get?.()&&e.runAction("view.toggleSidebar")}catch{}},300);return()=>clearTimeout(t)},[e])}function $E({ctx:e}){SF(),EF(e);let t=RF(UE.state.gateway),o=Ht(ir,l=>l.asideOpen),a=Ht(ir,l=>l.railOpen),r=xy("(max-width: 1099px)"),n=xy("(max-width: 759px)");Ou(()=>{GR(e)},[e]),Ou(()=>{t==="open"&&nI()},[t]),Ou(()=>{r&&ir.set({asideOpen:!1})},[r]);let s=`${n?0:BE}px minmax(0, 1fr) ${o&&!r?_E:0}px`;return $a("div",{className:"glaze absolute inset-0 bg-page text-text-1","data-theme":"dark",children:Xg(kc,{children:[Xg("div",{className:"grid h-full min-h-0 w-full grid-cols-(--cols)",style:{"--cols":s},children:[$a("div",{className:"flex h-full min-h-0 min-w-0 flex-col",children:n?null:$a(vy,{ctx:e})}),$a("div",{className:"flex h-full min-h-0 min-w-0 flex-col",children:$a(UR,{ctx:e,narrowRail:n})}),$a("div",{className:"flex h-full min-h-0 min-w-0 flex-col overflow-hidden",children:!r&&o?$a(I2,{ctx:e}):null})]}),n&&a?Xg(GE,{children:[$a("div",{className:"absolute inset-0 z-(--z-overlay) bg-scrim",onClick:()=>ir.set({railOpen:!1})}),$a("div",{className:"absolute inset-y-0 start-0 z-(--z-overlay) w-(--rail-w) bg-page","data-enter":"aside",style:{"--rail-w":`${BE}px`},children:$a(vy,{ctx:e})})]}):null,r&&o?Xg(GE,{children:[$a("div",{className:"absolute inset-0 z-(--z-overlay) bg-scrim",onClick:()=>ir.set({asideOpen:!1})}),$a("div",{className:"absolute inset-y-0 end-0 z-(--z-overlay) w-(--aside-w) bg-page","data-enter":"aside",style:{"--aside-w":`${_E}px`},children:$a(I2,{ctx:e})})]}):null,$a(K6,{})]})})}import{useEffect as JT,useRef as KT,useState as F9}from"react";import{createContext as TF,useContext as MF,useEffect as WE,useLayoutEffect as PF,useRef as Qg,useState as qE}from"react";import{Fragment as XE,jsx as Wa,jsxs as Iy}from"react/jsx-runtime";function kF(e,t=!0){let[o,a]=qE(!1);return WE(()=>{let r=e.current;if(!r||!t){a(!1);return}let n=()=>a(r.scrollWidth>r.clientWidth+1||r.scrollHeight>r.clientHeight+1),s=new ResizeObserver(n),l=()=>{s.disconnect(),s.observe(r);for(let c of r.children)s.observe(c);n()},i=new MutationObserver(l);return i.observe(r,{childList:!0}),l(),()=>{s.disconnect(),i.disconnect()}},[e,t]),o?0:void 0}function AF(e){let t=e.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i)?.[1],o=e.match(/^\s{0,3}#{1,6}\s+(.+?)\s*#*\s*$/m)?.[1],a=e.match(/^(?!\s*$)([^\n]+)\n\s{0,3}(=+|-+)\s*$/m)?.[1],r=e.match(/^\s*(?:\*\*|__)([^*_\n]+)(?:\*\*|__)\s*$/m)?.[1],n=[t,o,a,r].filter(l=>!!l).map(l=>({h:l,at:e.indexOf(l)})).sort((l,i)=>l.at-i.at)[0]?.h;return n&&n.replace(/<[^>]+>/g,"").replace(/`([^`]*)`/g,"$1").replace(/\[([^\]]+)\]\([^)]*\)/g,"$1").replace(/(\*\*|__|\*|_)(.+?)\1/g,"$2").trim()||void 0}var zF={thinking:"Thinking",stoppedEarly:"Stopped before thinking",thoughtFor:e=>`Thought for ${e}`,moment:"a moment"},jE=TF(null);function KE(){let e=MF(jE);if(!e)throw new Error("Reasoning parts must be used inside <Reasoning>");return e}function LF(e,t){let[o,a]=qE(e||t),r=Qg(!1),n=Qg(!1),s=Qg(e);return WE(()=>{let i=s.current;s.current=e,e&&!i?(r.current=!1,a(!0)):!e&&i&&!r.current&&a(!1)},[e]),{open:o,onOpenChange:i=>{a(i),r.current=i,!e&&i&&(n.current=!0)},fromTop:n}}function YE({streaming:e=!1,duration:t,defaultOpen:o=!1,open:a,onOpenChange:r,heading:n,labels:s,className:l,children:i,...c}){let u={...zF,...s},d=LF(e,o),m=a!==void 0,p=m?a:d.open,f=typeof i=="string"?[i]:Array.isArray(i)&&i.every(w=>typeof w=="string")?i:null,v=f?f.join(`

`):"",g=n??(f?AF(f.at(-1)??""):void 0),b=w=>{m||d.onOpenChange(w),r?.(w)};return Wa(jE.Provider,{value:{streaming:e,words:u,open:p,duration:t,heading:g,text:v,parts:!!f,fromTop:d.fromTop},children:Wa(_a.Root,{"data-slot":"reasoning","data-streaming":e||void 0,open:p,onOpenChange:w=>b(w),className:Et("group/reasoning @container/reasoning flex min-w-0 flex-col",l),render:w=>{let{"data-open":y,...x}=w;return Wa("div",{...x})},...c,children:f?Iy(XE,{children:[Wa(DF,{}),Wa(FF,{})]}):i})})}function NF(e,t){if(!Number.isFinite(e)||e<1)return t;let o=Math.round(e);return o<60?`${o}s`:`${Math.floor(o/60)}m ${String(o%60).padStart(2,"0")}s`}function DF({className:e,label:t,children:o,...a}){let{streaming:r,words:n,duration:s,heading:l,text:i,parts:c}=KE(),u=c&&!i.trim(),d=t?.({streaming:r,duration:s,heading:l})??(r?l??n.thinking:u?n.stoppedEarly:n.thoughtFor(s===void 0?n.moment:NF(s,n.moment)));return Iy(_a.Trigger,{"data-slot":"reasoning-trigger",className:Et(al(),e),...a,children:[Wa(Yc,{open:!0}),o??Iy(XE,{children:[Wa(k2,{active:r,className:F("max-w-full min-w-0 shrink-0 truncate text-text-2"),children:d}),Wa("span",{"data-slot":"reasoning-heading",className:"min-w-0 truncate text-text-2 empty:hidden",children:!r&&!t?l:null}),Wa("span",{"data-slot":"reasoning-status",className:"flex shrink-0 items-center justify-end whitespace-nowrap text-text-2",children:r&&(l?Wa(_t,{status:"running",size:"sm",className:"text-text-2",children:n.thinking}):Wa($s,{}))})]})]})}function FF({className:e,children:t,...o}){let{streaming:a,open:r,fromTop:n,text:s}=KE(),l=Qg(null),i=W2(l,{enabled:a&&r}),c=kF(l,r);return PF(()=>{let u=l.current;!u||!r||n.current&&!a&&(u.scrollTop=0,n.current=!1)},[t,s,r,a,n]),Wa(_a.Panel,{"data-slot":"reasoning-content",children:Wa("div",{ref:i.ref,"data-slot":"reasoning-content","data-attached":i.attached,"aria-busy":a||void 0,tabIndex:c,className:F("max-h-40 min-w-0 overflow-y-auto ps-6 pb-3 type-body-sm text-text-2","focus-visible:focus-ring-inset",e),...o,children:t??Wa(bl,{size:"sm",streaming:a,className:"text-text-2",children:s})})})}import{useEffect as S9,useRef as ZT,useState as E9}from"react";import{useEffect as OF,useRef as Zve,useState as HF}from"react";var Gr="None",On="No data in this range",Cy=[{unit:"ms",size:1},{unit:"s",size:1e3},{unit:"min",size:6e4},{unit:"h",size:36e5}],Ry=[{unit:"",size:1},{unit:"k",size:1e3},{unit:"M",size:1e6},{unit:"B",size:1e9}],QE=e=>e.reduce((t,o)=>Number.isFinite(o)?Math.max(t,Math.abs(o)):t,0),VF=(e,t)=>Number(e.toFixed(t));function Sy(e,t){let o=e.toFixed(t);return/^-0(\.0+)?$/.test(o)?o.slice(1):o}function JE(e,t,o,a){let r=0;for(;r<t.length-1&&e>=o(r+1);)r++;for(;r<t.length-1&&VF(e/t[r].size,a(r))*t[r].size>=o(r+1);)r++;return r}function eT(e,t=1){let o=r=>r===0?0:t,a=JE(QE(e),Cy,r=>Cy[r].size,o);return{...Cy[a],digits:o(a)}}function tT(e,t=1){let o=r=>r===0?0:t,a=JE(QE(e),Ry,r=>Ry[r].size*10,o);return{...Ry[a],digits:o(a)}}function oT(e,t,o){if(!e||typeof getComputedStyle>"u")return o;let r=getComputedStyle(e).getPropertyValue(t).trim().match(/^(-?[\d.]+)(px|ms|s)?$/);if(!r)return o;let n=parseFloat(r[1]);return r[2]==="s"?n*1e3:n}function Jg(e,t=!0){let[o,a]=HF(!1);return OF(()=>{let r=e.current;if(!r||!t){a(!1);return}let n=()=>a(r.scrollWidth>r.clientWidth+1||r.scrollHeight>r.clientHeight+1),s=new ResizeObserver(n),l=()=>{s.disconnect(),s.observe(r);for(let c of r.children)s.observe(c);n()},i=new MutationObserver(l);return i.observe(r,{childList:!0}),l(),()=>{s.disconnect(),i.disconnect()}},[e,t]),o?0:void 0}import{createContext as $F,useContext as WF,useId as qF,useLayoutEffect as jF,useRef as ky,useState as KF}from"react";var a1={};Jo(a1,{Indicator:()=>uT,Root:()=>cT});import*as Hn from"react";var aT="data-checked",rT="data-unchecked";var Hu={checked(e){return e?{[aT]:""}:{[rT]:""}},...la,...ma};var Vu="data-composite-item-active";import*as e1 from"react";var Ey=e1.createContext(void 0);function sT(){return e1.useContext(Ey)}import*as t1 from"react";var Ty=t1.createContext(void 0);function iT(){let e=t1.useContext(Ty);if(e===void 0)throw new Error(De(52));return e}import{jsx as lT,jsxs as BF}from"react/jsx-runtime";var cT=Hn.forwardRef(function(t,o){let{render:a,className:r,disabled:n=!1,readOnly:s=!1,required:l=!1,"aria-labelledby":i,value:c,inputRef:u,nativeButton:d=!1,id:m,style:p,...f}=t,v=sT(),{disabled:g,readOnly:b,required:w,form:y,checkedValue:x,touched:h=!1,validation:I,name:R,setCheckedValue:C=Be,setTouched:S=Be,registerInputRef:T=Be}=v??{},{setTouched:P,setFilled:V,state:E,disabled:z}=Bo(),M=fl(),{labelId:O,getDescriptionProps:H}=_o(),k=z||M.disabled||g||n,N=b||s,L=w||l,U=y,A=v?x===c:c==="",ee=Hn.useRef(null),B=r0(k,ee),Z=Hn.useRef(null),G=I?.registerInput,X=Hn.useCallback(he=>G?.(he,{controlRef:ee,value:void 0}),[G]),be=Bt(u,Z,T,X);_(()=>{Z.current?.checked&&V(!0)},[V]),_(()=>{if(Z.current){if(k&&A){T(null);return}T(Z.current)}},[A,k,T]);let K=qe(),Y=t0({id:m}),j=d?void 0:Y,se=PC(i,O,Z,!d,j,f["aria-label"]),pe={role:"radio","aria-checked":A,"aria-labelledby":se,[Vu]:A?"":void 0,id:d?Y:K,onKeyDown(he){he.key==="Enter"&&he.preventDefault()},onClick(he){if(he.defaultPrevented||k||N)return;he.preventDefault();let le=Z.current;le&&on(le,he)},onFocus(he){B(!0),!(he.defaultPrevented||k||N||!h)&&(Z.current?.click(),S(!1))},onBlur(){v||B(!1)}},{getButtonProps:oe,buttonRef:Se}=Ut({disabled:k,native:d,composite:!1}),ie={type:"radio",ref:be,form:U,id:j,name:R,tabIndex:-1,style:R?Hw:Ri,"aria-hidden":!0,...c!==void 0?{value:zg(c)}:ze,disabled:k,checked:A,required:L,readOnly:N,onChange(he){if(he.nativeEvent.defaultPrevented||k||N||c===void 0)return;let le=we(q.none,he.nativeEvent);C(c,le),!le.isCanceled&&P(!0)},onClick(he){he.stopPropagation()},onFocus(){ee.current?.focus()}},te=Hn.useMemo(()=>({...E,required:L,disabled:k,readOnly:N,checked:A}),[E,k,N,A,L]),fe=te,de=v!==void 0,ve=[o,ee,Se],ge=[pe,f,oe,H,I?he=>I.getValidationProps(k,he):ze],je=ae("span",t,{enabled:!de,state:te,ref:ve,props:ge,stateAttributesMapping:Hu});return BF(Ty.Provider,{value:fe,children:[de?lT(yl,{tag:"span",render:a,className:r,style:p,state:te,refs:ve,props:ge,stateAttributesMapping:Hu}):je,lT("input",{...ie,suppressHydrationWarning:!0})]})});import*as o1 from"react";var uT=o1.forwardRef(function(t,o){let{render:a,className:r,style:n,keepMounted:s=!1,...l}=t,i=iT(),c=i.checked,{mounted:u,transitionStatus:d,setMounted:m}=da(c),p={...i,transitionStatus:d},f=o1.useRef(null),v=s||u,g=ae("span",t,{ref:[o,f],state:p,props:l,stateAttributesMapping:Hu});return Oo({batch:!0,enabled:!c,open:c,ref:f,onComplete(){c||m(!1)}}),v?g:null});import*as Ur from"react";import*as pT from"react";import*as di from"react";function dT(e){let{loopFocus:t=!0,orientation:o="both",grid:a,onLoop:r,direction:n,highlightedIndex:s,onHighlightedIndexChange:l,rootRef:i,enableHomeAndEndKeys:c=!1,stopEventPropagation:u,disabledIndices:d,modifierKeys:m=Ft}=e,[p,f]=di.useState(0),v=a!=null,g=di.useRef(null),b=Bt(g,i),w=di.useRef([]),y=di.useRef(!1),x=di.useRef(null),h=s??p,I=$((P,V=!1)=>{if(x.current=w.current[P]??null,(l??f)(P),V){let E=w.current[P];Kb(g.current,E,n,o)}}),R=$(P=>{if(P.size===0)return;if(y.current){let M=w.current,O=M.indexOf(x.current);if(O===-1){let H=M[h];!H||Tn(M,h,d)?I(_F(M,d)):x.current=H}else O!==h&&I(O);return}y.current=!0;let V=Array.from(P.keys()),E=V.find(M=>M?.hasAttribute(Vu))??null,z=E?P.get(E)?.index??-1:-1;if(z!==-1)I(z);else if(Tn(V,h,d)){let M=Kn(V,{disabledIndices:d});En(V,M)||I(M)}Kb(g.current,E,n,o)});_(()=>{if(d==null||s!=null||!y.current)return;let P=w.current;if(Tn(P,h,d)){let V=Kn(P,{disabledIndices:d});En(P,V)||I(V)}},[d,s,h,w,I]);let C=$((P,V,E)=>r?r(P,V,E,w):E),S=$(P=>{let V=P.key===rg||P.key===ng;if(!sg.has(P.key)||!c&&V||ZF(P,m)||!g.current)return;let z=n==="rtl",M=z?og:ag,O=z?ag:og,H=o==="vertical"?tg:M,k=o==="vertical"?eg:O,N=He(P.nativeEvent);if(N!=null&&jb(N)&&!$S(N)){let Z=N.selectionStart,G=N.selectionEnd,X=N.value;if(Z==null||P.shiftKey||Z!==G||P.key!==k&&Z<X.length||P.key!==H&&Z>0)return}let L=h,U=Ar(w,d),A=tn(w,d);a!=null&&(L=a({disabledIndices:d,elementsRef:w,event:P,highlightedIndex:h,loopFocus:t,maxIndex:A,minIndex:U,onLoop:C,orientation:o,rtl:z}));let ee=o!=="vertical"&&P.key===M||o!=="horizontal"&&P.key===tg,B=o!=="vertical"&&P.key===O||o!=="horizontal"&&P.key===eg;c&&(P.key===rg?L=U:P.key===ng&&(L=A)),L===h&&(ee||B)&&(t&&L===A&&ee?(L=U,r&&(L=r(P,h,L,w))):t&&L===U&&B?(L=A,r&&(L=r(P,h,L,w))):L=Kn(w.current,{startingIndex:L,decrement:B,disabledIndices:d})),L!==h&&!En(w.current,L)&&(u&&P.stopPropagation(),(v||V||ee||B)&&P.preventDefault(),I(L,!0),queueMicrotask(()=>{w.current[L]?.focus()}))});return{props:{ref:b,onFocus(P){let V=g.current,E=He(P.nativeEvent);!V||E==null||!jb(E)||E.setSelectionRange(0,E.value.length)},onKeyDown:S},highlightedIndex:h,onHighlightedIndexChange:I,elementsRef:w,onMapChange:R,relayKeyboardEvent:S}}function _F(e,t){let o=-1;for(let a=0;a<e.length;a+=1){let r=e[a];if(!(!r||Tn(e,a,t))){if(r.hasAttribute(Vu))return a;o===-1&&(o=a)}}return Math.max(o,0)}function ZF(e,t){for(let o of cS)if(!t.includes(o)&&e.getModifierState(o))return!0;return!1}import{jsx as mT}from"react/jsx-runtime";function r1(e){let{render:t,className:o,style:a,refs:r=Ft,props:n=Ft,state:s=ze,stateAttributesMapping:l,highlightedIndex:i,onHighlightedIndexChange:c,orientation:u,grid:d,loopFocus:m,onLoop:p,enableHomeAndEndKeys:f,onMapChange:v,stopEventPropagation:g=!0,rootRef:b,disabledIndices:w,modifierKeys:y,highlightItemOnHover:x=!1,tag:h="div",...I}=e,R=Ko(),{props:C,highlightedIndex:S,onHighlightedIndexChange:T,elementsRef:P,onMapChange:V,relayKeyboardEvent:E}=dT({grid:d,loopFocus:m,onLoop:p,orientation:u,highlightedIndex:i,onHighlightedIndexChange:c,rootRef:b,stopEventPropagation:g,enableHomeAndEndKeys:f,direction:R,disabledIndices:w,modifierKeys:y}),z=ae(h,e,{state:s,ref:r,props:[C,...n,I],stateAttributesMapping:l}),M=pT.useMemo(()=>({highlightedIndex:S,onHighlightedIndexChange:T,highlightItemOnHover:x,relayKeyboardEvent:E}),[S,T,x,E]);return mT(X1.Provider,{value:M,children:mT(pg,{elementsRef:P,onMapChange:O=>{v?.(O),V(O)},children:z})})}import{jsx as fT}from"react/jsx-runtime";var GF=[qb],My=Ur.forwardRef(function(t,o){let{render:a,className:r,disabled:n,readOnly:s,required:l,onValueChange:i,value:c,defaultValue:u,form:d,name:m,inputRef:p,id:f,style:v,...g}=t,{setTouched:b,setFocused:w,validationMode:y,name:x,disabled:h,state:I,validation:R,setDirty:C,setFilled:S,validityData:T}=Bo(),{labelId:P}=_o(),{clearErrors:V,elementRef:E}=Ir(),z=Xf(!0),M=h||n,O=x??m,H=qe(f),[k,N]=Ba({controlled:c,default:u,name:"RadioGroup",state:"value"}),[L,U]=Ur.useState(!1),A=$((ie,te)=>{i?.(ie,te),!te.isCanceled&&N(ie)}),ee=R.getInputControl,B=Ur.useMemo(()=>({get current(){return ee()}}),[ee]),Z=Ur.useRef(null),G=Ur.useRef(null),X=Bt(Z,p),be=Ur.useRef(X),K=$(ie=>{Z.current===ie&&be.current===X||(be.current=X,X?.(ie))});_(()=>{K(Z.current)},[X,K]);let Y=$(ie=>{if(ie){if(!ie.disabled){G.current||(G.current=ie);let te=Z.current;(ie.checked||te==null||te.disabled)&&K(ie)}return()=>{G.current===ie&&(G.current=null),Z.current===ie&&K(null)}}}),j=$(()=>{let ie=E.current;if(!ie)return k??null;for(let te of R.registeredInputs.keys())if(te.checked&&fb(te,ie))return k??null;return null});n0(B,H,k??null,j,!M,m),gl(k,()=>{V(O),C(k!==T.initialValue),S(k!=null),R.change(k);let ie=G.current;k==null&&ie&&!ie.disabled&&K(ie)});let se=P??z?.legendId,pe={...I,disabled:M??!1,required:l??!1,readOnly:s??!1},oe=Ur.useMemo(()=>({checkedValue:k,disabled:M,form:d,validation:R,name:O,readOnly:s,registerInputRef:Y,required:l,setCheckedValue:A,setTouched:U,touched:L}),[k,M,d,R,O,s,Y,l,A,U,L]),Se={id:f,role:"radiogroup","aria-required":l||void 0,"aria-disabled":M||void 0,"aria-readonly":s||void 0,"aria-labelledby":se,onBlur(ie){ue(ie.currentTarget,ie.relatedTarget)||(U(!1),b(!0),w(!1),y==="onBlur"&&R.commit(k))},onKeyDownCapture(ie){ie.key.startsWith("Arrow")&&U(!0)}};return fT(Ey.Provider,{value:oe,children:fT(r1,{render:a,className:r,style:v,state:pe,props:[Se,g,ie=>R.getValidationProps(M??!1,ie)],refs:[o],stateAttributesMapping:ma,enableHomeAndEndKeys:!1,modifierKeys:GF})})});import*as s1 from"react";import*as n1 from"react";var UF=n1.createContext(void 0);function gT(){return n1.useContext(UF)}import{jsx as hT}from"react/jsx-runtime";var Py=s1.forwardRef(function(t,o){let{defaultValue:a,disabled:r=!1,loopFocus:n=!0,onValueChange:s,orientation:l="horizontal",multiple:i=!1,value:c,className:u,render:d,style:m,...p}=t,f=Q0(!0),v=gT(),g=a??Ft,b=c!==void 0||a!==void 0,w=(f?.disabled??!1)||(v?.disabled??!1)||r,[y,x]=Ba({controlled:c,default:g,name:"ToggleGroup",state:"value"}),h=$((T,P,V)=>{let E;i?(E=y.slice(),P?E.push(T):E.splice(y.indexOf(T),1)):E=P?[T]:[],s?.(E,V),!V.isCanceled&&x(E)}),I={disabled:w,multiple:i,orientation:l},R=s1.useMemo(()=>({disabled:w,setGroupValue:h,value:y,isValueInitialized:b}),[w,h,y,b]),C={role:"group"},S=ae("div",t,{enabled:!!f,state:I,ref:o,props:[C,p]});return hT(Pb.Provider,{value:R,children:f?S:hT(r1,{render:d,className:u,style:m,state:I,refs:[o],props:[C,p],loopFocus:n,enableHomeAndEndKeys:!0,orientation:l})})});import{Fragment as JF,jsx as Cn,jsxs as zy}from"react/jsx-runtime";var YF=Ye("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-pill border border-line-faint bg-paper p-0.5 forced-colors:border-[CanvasText]",{variants:{size:{sm:`${ns.sm} type-label-sm`,default:`${ns.default} type-label`,lg:`${ns.lg} type-label-lg`},fill:{true:"flex w-full *:flex-1",false:""}},defaultVariants:{size:"default",fill:!1}}),Ay=$F({size:"default",multiple:!1});function XF(){let e=ky(null),t=ky(null),[o,a]=KF(!1);return jF(()=>{let r=e.current,n=t.current;if(!r||!n)return;let s=!0,l=()=>{let u=r.querySelector(":scope > [data-slot=segmented-control-item][data-checked]");n.hidden=!u,u&&(s&&(n.style.transition="none"),r.style.setProperty("--seg-x",`${u.offsetLeft}px`),r.style.setProperty("--seg-w",`${u.offsetWidth}px`),n.toggleAttribute("data-disabled",u.hasAttribute("data-disabled")),s&&(n.offsetWidth,n.style.transition="",s=!1))};l(),a(!0);let i=new MutationObserver(l);i.observe(r,{subtree:!0,attributes:!0,attributeFilter:["data-checked","data-disabled"]});let c=new ResizeObserver(l);return c.observe(r),r.querySelectorAll(":scope > [data-slot=segmented-control-item]").forEach(u=>c.observe(u)),()=>{i.disconnect(),c.disconnect()}},[]),{track:e,thumb:t,ready:o}}function IT(e){let{className:t,size:o="default",fill:a=!1,children:r}=e,n=F(YF({size:o,fill:a}),t),{track:s,thumb:l,ready:i}=XF(),c={size:o??"default",countMax:e.countMax,multiple:!!e.multiple,sliding:i};if(e.multiple){let{multiple:w,onValueChange:y,size:x,fill:h,className:I,children:R,countMax:C,...S}=e;return Cn(Py,{"data-slot":"segmented-control","data-size":o,"data-multiple":"",multiple:!0,onValueChange:T=>y?.(T),className:n,...S,children:Cn(Ay.Provider,{value:c,children:r})})}let{multiple:u,onValueChange:d,size:m,fill:p,className:f,children:v,countMax:g,...b}=e;return zy(My,{ref:s,"data-slot":"segmented-control","data-size":o,onValueChange:w=>d?.(w),className:F("relative",n),...b,children:[Cn("span",{ref:l,"aria-hidden":!0,"data-slot":"segmented-control-thumb",className:F("glaze-sm pointer-events-none absolute inset-y-0.5 left-0 w-(--seg-w) translate-x-(--seg-x) rounded-pill","transition-[translate,width] duration-(--dur-slide) ease-out motion-reduce:transition-none",!i&&"invisible")}),Cn(Ay.Provider,{value:c,children:r})]})}var bT=new Intl.NumberFormat("en-US"),yT=["relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-pill focus-sm border border-transparent whitespace-nowrap select-none [-webkit-tap-highlight-color:transparent]","transition-[color,background-color] duration-(--dur-slide) ease-out motion-reduce:transition-none","[&_svg]:pointer-events-none [&_svg]:shrink-0","data-disabled:cursor-not-allowed"].join(" "),wT={sm:"px-2.5 type-label-sm [&_svg]:size-(--icon-sm)",default:"px-3 type-label [&_svg]:size-(--icon)",lg:"px-3.5 type-label-lg [&_svg]:size-(--icon-lg)"},vT="glaze-sm forced-colors:[forced-color-adjust:none] forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",QF="text-(--glaze-sm-text) data-disabled:text-text-disabled forced-colors:[forced-color-adjust:none] forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",xT="text-text-2 hover:not-data-disabled:text-text-1 active:not-data-disabled:bg-hover data-disabled:text-text-disabled forced-colors:data-disabled:text-[GrayText]";function Ly({className:e,children:t,count:o,countMax:a,...r}){let{size:n,countMax:s,multiple:l,sliding:i}=WF(Ay),c=qF(),u=ky(0);o!==void 0&&(u.current=Math.max(u.current,o));let d=a??s??u.current,m=typeof t=="string"?t:void 0,p=zy(JF,{children:[Cn("span",{"data-slot":"segmented-control-label",className:"inline-flex min-w-0 items-center gap-1.5",children:Cn("span",{className:"min-w-0 truncate",children:t})}),o!==void 0&&zy("span",{"data-slot":"segmented-control-count","aria-hidden":!0,className:"grid shrink-0 justify-items-start tabular-nums opacity-70 [grid-template-areas:'c']",children:[Cn("span",{className:"invisible [grid-area:c]",children:bT.format(Math.max(d,o))}),Cn("span",{id:c,className:"[grid-area:c]",children:bT.format(o)})]})]}),f={"data-slot":"segmented-control-item",title:m,"aria-describedby":o!==void 0?c:void 0};return l?Cn(du,{...f,...r,className:v=>F(yT,wT[n],v.pressed?vT:xT,e),children:p}):Cn(a1.Root,{...f,...r,className:v=>F(yT,wT[n],v.checked?i?QF:vT:xT,e),children:p})}import{useEffect as _8e,useRef as Z8e,useState as G8e}from"react";import{Fragment as W8e,jsx as e9,jsxs as q8e}from"react/jsx-runtime";function i1({className:e,...t}){return e9("div",{"data-slot":"skeleton","aria-hidden":!0,className:F("shrink-0 rounded-tag bg-field forced-colors:bg-[GrayText]",e),...t})}import{createContext as t9,memo as o9,useCallback as a9,useContext as RT,useId as r9,useLayoutEffect as ST,useMemo as n9,useRef as l1,useState as Bu}from"react";import{Fragment as l9,jsx as zt,jsxs as mi}from"react/jsx-runtime";var Oy=t9(null);function _u(){let e=RT(Oy);if(!e)throw new Error("useChart must be used within a <ChartContainer/>");return e}function Hy(){return RT(Oy)}function Vy({config:e,xKey:t,defaultHidden:o,className:a,children:r,...n}){let[s,l]=Bu(()=>new Set(o)),[i,c]=Bu(null),u=a9(m=>l(p=>{let f=new Set(p);return f.has(m)?f.delete(m):f.add(m),f}),[]),d=n9(()=>({config:e,keys:Object.keys(e).filter(m=>m!==t),hidden:s,toggle:u,highlight:i,setHighlight:c}),[e,t,s,u,i]);return zt(Oy.Provider,{value:d,children:zt("div",{"data-slot":"chart",className:F("flex w-full min-w-0 flex-col",a),...n,children:r})})}function c1({config:e,xKey:t,children:o}){return Hy()||!e?o:zt(Vy,{config:e,xKey:t,children:o})}var s9={ink:"text-text-1","ink-2":"text-text-2",ok:"text-ok",warn:"text-warn",fail:"text-fail"},i9={ink:"text-text-inverse","ink-2":"text-text-inverse/60",ok:"text-ok",warn:"text-warn",fail:"text-fail"};function ys(e,t,o=Object.keys(e)){let{status:a,dashed:r=!1}=e[t]??{};if(a)return{tone:a,dashed:r};let n=Math.max(0,o.filter(s=>!e[s]?.status).indexOf(t));return{tone:n%2===0?"ink":"ink-2",dashed:r||n>=2}}function pi(e,t,o=!1,a){let{tone:r}=ys(e,t,a);return(o?i9:s9)[r]}function u1({config:e,series:t,onInk:o,off:a,className:r}){let n=Hy()?.keys,{dashed:s}=ys(e,t,n);return zt("svg",{"data-slot":"chart-swatch","aria-hidden":!0,focusable:"false",width:8,height:8,viewBox:"0 0 8 8",className:F("shrink-0",a?"text-text-3":pi(e,t,o,n),r),children:zt("line",{x1:0,y1:4,x2:8,y2:4,strokeWidth:2,strokeDasharray:s?"3 2":void 0,className:"stroke-current forced-colors:stroke-[CanvasText]"})})}function Zu(){let e=l1(null),[t,o]=Bu(0);return ST(()=>{let a=e.current;if(!a)return;o(a.clientWidth);let r=new ResizeObserver(([n])=>o(Math.round(n.contentRect.width)));return r.observe(a),()=>r.disconnect()},[]),[e,t]}function By(e){return bm(e)}function Hl(e,t){let[o,a]=Bu(e-1),r=l1([]),n=Math.min(Math.max(o,0),e-1),s=i=>{let c=Math.min(Math.max(i,0),e-1);a(c);let u=r.current[c];u?.focus(),t(c,u??null)};return{current:n,setCurrent:a,onKeyDown:(i,c)=>{let u=i.shiftKey?7:1,d=getComputedStyle(i.currentTarget).direction==="rtl"?-1:1,m={ArrowRight:c+u*d,ArrowDown:c+u,ArrowLeft:c-u*d,ArrowUp:c-u,Home:0,End:e-1};i.key in m&&(i.preventDefault(),s(m[i.key]))},tabIndex:i=>i===n?0:-1,ref:i=>c=>{r.current[i]=c}}}var Ny=8,Dy=8;function Vl({anchor:e,children:t,className:o}){let a=er(),r=l1(null),[n,s]=Bu(null);if(ST(()=>{let i=r.current;if(!e||!i){s(null);return}let{width:c,height:u}=i.getBoundingClientRect(),d=document.documentElement.clientWidth,m=e.y-Ny-u<Dy?e.y+Ny:e.y-Ny-u,p=Math.min(Math.max(e.x-c/2,Dy),d-c-Dy);s({left:p,top:m})},[e,t]),!e||a===null)return null;let l=zt("div",{ref:r,"data-slot":"chart-tooltip","aria-hidden":!0,className:F(qc,"pointer-events-none fixed z-(--z-overlay) min-w-32 flex-col items-stretch gap-1 py-1.5",!n&&"invisible",o),style:{left:n?.left??0,top:n?.top??0},children:t});return a?Mr(l,a):l}function Bl({title:e,children:t,className:o}){return mi("div",{"data-slot":"chart-tooltip-content",className:F("flex flex-col gap-1",o),children:[e&&zt("div",{"data-slot":"chart-tooltip-title",className:"type-label-sm text-text-inverse/70",children:e}),t]})}function fi({indicator:e,label:t,value:o,className:a}){return mi("div",{"data-slot":"chart-tooltip-row",className:F("flex items-center gap-2 type-label-sm",a),children:[e,zt("span",{className:"min-w-0 flex-1 truncate text-text-inverse/70",children:t}),zt("span",{className:"data text-text-inverse",children:o})]})}var CT="sticky top-0 h-8 border-b border-line-faint bg-paper px-3 align-middle type-label-sm text-text-2",Fy="h-8 px-3 align-middle type-label-sm",ws=o9(function({caption:t,rowHeader:o="Date",columns:a,rows:r,empty:n=On,visible:s,className:l}){let i=l1(null),c=Jg(i,!!s),u=r9();return zt("div",{ref:i,"data-slot":"chart-data-table","data-visible":s||void 0,tabIndex:c,role:c===0?"region":void 0,...c===0?typeof t=="string"?{"aria-label":t}:{"aria-labelledby":u}:{},className:F(s?"max-h-(--popup-max) overflow-auto focus-visible:focus-ring-inset":"sr-only",l),children:mi("table",{className:"w-full border-separate border-spacing-0 text-start",children:[zt("caption",{id:u,className:"sr-only",children:t}),zt("thead",{children:mi("tr",{children:[zt("th",{scope:"col",className:F(CT,"text-start"),children:o}),a.map(m=>zt("th",{scope:"col",className:F(CT,"text-end"),children:m.label},m.key))]})}),mi("tbody",{className:"[&>tr:not(:last-child)>*]:border-b [&>tr:not(:last-child)>*]:border-line-faint",children:[r.length===0&&zt("tr",{"data-slot":"chart-data-table-empty",children:zt("td",{colSpan:a.length+1,className:F(Fy,"text-start text-text-2"),children:n})}),r.map(m=>mi("tr",{children:[zt("th",{scope:"row",className:F(Fy,"text-start font-normal whitespace-nowrap text-text-2"),children:m.label}),a.map(p=>zt("td",{className:F(Fy,"data text-end text-text-1"),children:m.values[p.key]??Gr},p.key))]},m.key))]})]})})}),ET=Ye("flex min-w-0",{variants:{layout:{row:"flex-wrap items-center gap-0.5",column:"flex-col gap-0.5"}},defaultVariants:{layout:"row"}});function TT({series:e,values:t,toggle:o=!0,layout:a="row",className:r,...n}){let{config:s,keys:l,hidden:i,toggle:c,highlight:u,setHighlight:d}=_u(),m=e??l;return zt("ul",{"data-slot":"chart-legend","data-layout":a,className:F(ET({layout:a}),r),...n,children:m.map(p=>{let f=i.has(p),v=u!==null&&u!==p,g=mi(l9,{children:[zt(u1,{config:s,series:p,off:f}),zt("span",{className:F("min-w-0 truncate",f?"text-text-2 line-through decoration-1":"text-text-1"),children:s[p]?.label??p}),t?.[p]!==void 0&&zt("span",{className:"data ms-auto ps-2 text-text-2",children:t[p]})]}),b="flex h-(--control-sm) w-full min-w-0 items-center gap-1.5 rounded-pill px-2 type-label-sm";return zt("li",{className:F("min-w-0 transition-opacity duration-(--dur-state)",v&&"opacity-(--stale)",a==="column"&&"w-full"),children:o?zt("button",{type:"button","data-slot":"chart-legend-item","aria-pressed":!f,onClick:()=>c(p),onPointerEnter:()=>!f&&d(p),onPointerLeave:()=>d(null),onFocus:()=>!f&&d(p),onBlur:()=>d(null),onKeyDown:w=>{w.key==="Escape"&&d(null)},className:F(b,"transition-colors duration-(--dur-state) ease-out hover:bg-hover"),children:g}):zt("span",{"data-slot":"chart-legend-item",className:b,children:g})},p)})})}import{useEffect as u9,useRef as d9,useState as PT}from"react";function _y(e,t,o=4){(!Number.isFinite(e)||!Number.isFinite(t))&&(e=0,t=1),e>t&&([e,t]=[t,e]),o=Math.max(1,Math.round(o)||1),e===t&&(t=e===0?1:e+Math.abs(e));let a=(t-e)/o,r=10**Math.floor(Math.log10(a)),n=a/r,s=(n<=1?1:n<=2?2:n<=2.5?2.5:n<=5?5:10)*r,l=Math.floor(e/s)*s,i=Math.ceil(t/s)*s,c=[];for(let u=l;u<=i+s/2;u+=s)c.push(Number(u.toPrecision(12)));return{min:l,max:i,ticks:c}}var c9=new Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1});function Gu(e){return c9.format(e)}function MT(e,t){if(!e)return;let{unit:o,size:a}=e==="duration"?eT(t):tT(t),r=new Intl.NumberFormat("en-US",{maximumFractionDigits:0,signDisplay:"negative"});return n=>{let s=n/a;return a===1?`${e==="duration"?Sy(s,0):r.format(s)}${o}`:`${Sy(s,Math.abs(Number(s.toFixed(1)))>=10?0:1)}${o}`}}function ia(e,t){let o=e?.[t];return typeof o=="number"&&Number.isFinite(o)?o:null}function Zy(e){if(e.length<3)return d1(e);let t=e.length,o=[],a=[];for(let s=0;s<t-1;s++)o.push(e[s+1].x-e[s].x),a.push((e[s+1].y-e[s].y)/(o[s]||1));let r=[a[0]];for(let s=1;s<t-1;s++)r.push(a[s-1]*a[s]<=0?0:(a[s-1]+a[s])/2);r.push(a[t-2]);for(let s=0;s<t-1;s++){if(a[s]===0){r[s]=0,r[s+1]=0;continue}let l=r[s]/a[s],i=r[s+1]/a[s],c=l*l+i*i;if(c>9){let u=3/Math.sqrt(c);r[s]=u*l*a[s],r[s+1]=u*i*a[s]}}let n=`M${e[0].x},${e[0].y}`;for(let s=0;s<t-1;s++){let l=e[s],i=e[s+1],c=o[s]/3;n+=`C${l.x+c},${l.y+r[s]*c},${i.x-c},${i.y-r[s+1]*c},${i.x},${i.y}`}return n}function d1(e){return e.map((t,o)=>`${o?"L":"M"}${t.x},${t.y}`).join("")}function Gy(e){return e.map((t,o)=>o?`H${(e[o-1].x+t.x)/2}V${t.y}`:`M${t.x},${t.y}`).join("")+(e.length?`H${e[e.length-1].x}`:"")}import{Fragment as x9,jsx as dt,jsxs as gi}from"react/jsx-runtime";var Uy=24,m9=7,kT=72,p9=28;function Wy({data:e,xKey:t,series:o,config:a,mode:r,extent:n,height:s,label:l,xFormat:i,valueFormat:c,tooltipFormat:u=c,tooltipFooter:d,children:m,overlay:p,empty:f=On,className:v}){let[g,b]=Zu(),w=By(g)==="rtl",[y,x]=PT(null),[h,I]=PT(null),R=d9(null),C=e.length,S=_y(n[0],n[1],Math.min(4,Math.max(1,Math.floor((s-Uy)/p9)))),T=S.ticks.map(c),P=b?oT(g.current,"--space-2",8):8,V=Math.max(...T.map(Y=>Y.length))*m9+P,E=r==="point"?P:0,z=w?{left:E,right:Math.max(E+1,b-V),top:P,bottom:s-Uy}:{left:V,right:Math.max(V+1,b-E),top:P,bottom:s-Uy},M=z.right-z.left,O=r==="band"?M/Math.max(C,1):M/Math.max(C-1,1),H=w?z.right:z.left,k=w?-1:1,N=Y=>r==="band"?H+k*O*(Y+.5):C===1?z.left+M/2:H+k*O*Y,L=Y=>z.bottom-(Y-S.min)/(S.max-S.min)*(z.bottom-z.top),U={width:b,height:s,plot:z,x:N,y:L,band:O,active:y,rtl:w},A=Y=>{let j=R.current?.getBoundingClientRect();if(!j)return null;let se=o.map(oe=>ia(e[Y],oe)).filter(oe=>oe!==null),pe=se.length?L(Math.max(...se)):z.top;return{x:j.left+N(Y),y:j.top+Math.min(pe,z.bottom)}},ee=Y=>{x(Y),I(A(Y))},B=()=>{x(null),I(null)},Z=Hl(C,Y=>ee(Y));u9(()=>{if(y===null)return;let Y=()=>{g.current?.contains(document.activeElement)||B()};return window.addEventListener("scroll",Y,{capture:!0,passive:!0}),()=>window.removeEventListener("scroll",Y,{capture:!0})},[y,g]);let G=Math.max(1,Math.ceil(C/Math.max(1,Math.floor(M/kT)))),X=Y=>{let j=e[Y],se=o.map(pe=>{let oe=ia(j,pe);return`${a[pe]?.label??pe} ${oe===null?"no data":u(oe)}`});return`${i(j?.[t],Y)}: ${se.join(", ")}`},be=dt(ws,{caption:l,empty:f,rowHeader:a[t]?.label??"Date",columns:o.map(Y=>({key:Y,label:a[Y]?.label??Y})),rows:e.map((Y,j)=>({key:String(j),label:i(Y[t],j),values:Object.fromEntries(o.map(se=>{let pe=ia(Y,se);return[se,pe===null?Gr:u(pe)]}))}))}),K={height:s};return C===0?gi("div",{ref:g,"data-slot":"chart-plot",className:F("relative type-body-sm text-text-2",v),style:K,children:[be,dt("span",{"aria-hidden":!0,className:"block pt-2",children:f}),dt("span",{"aria-hidden":!0,className:"absolute inset-x-0 bottom-6 h-px bg-line"})]}):gi("div",{ref:g,"data-slot":"chart-plot",className:F("relative w-full min-w-0",v),style:K,children:[be,b>0&&gi(x9,{children:[gi("svg",{ref:R,"aria-hidden":!0,direction:"ltr",width:b,height:s,className:"block overflow-visible",children:[r==="band"&&y!==null&&dt("rect",{x:N(y)-O/2,y:z.top,width:O,height:z.bottom-z.top,rx:4,className:"fill-hover"}),S.ticks.map((Y,j)=>gi("g",{children:[dt("line",{x1:z.left,x2:z.right,y1:L(Y),y2:L(Y),strokeWidth:1,className:Y===0?"stroke-line":"stroke-line-faint",shapeRendering:"crispEdges"}),dt("text",{x:w?z.right+P:z.left-P,y:L(Y),dy:"0.32em",textAnchor:w?"start":"end",className:"fill-text-2 type-caption",children:T[j]})]},Y)),e.map((Y,j)=>{if((C-1-j)%G!==0||r==="point"&&j!==C-1&&Math.abs(N(C-1)-N(j))<kT)return null;let se=w?"end":"start",pe=w?"start":"end",oe=r==="point"&&C>1?j===0?se:j===C-1?pe:"middle":"middle";return dt("text",{x:N(j),y:s-6,textAnchor:oe,className:"fill-text-2 type-caption",children:i(Y[t],j)},j)}),r==="point"&&y!==null&&dt("line",{x1:N(y),x2:N(y),y1:z.top,y2:z.bottom,strokeWidth:1,className:"stroke-line-strong",shapeRendering:"crispEdges"}),m(U),p?.(U)]}),dt("div",{role:"group","aria-label":l,"aria-roledescription":"chart",className:"absolute flex",style:{left:r==="band"||C===1?z.left:z.left-O/2,top:z.top,width:r==="band"||C===1?M:M+O,height:z.bottom-z.top},onPointerLeave:()=>{g.current?.contains(document.activeElement)||B()},children:e.map((Y,j)=>dt("button",{ref:Z.ref(j),type:"button",tabIndex:Z.tabIndex(j),"aria-label":X(j),onPointerEnter:()=>{Z.setCurrent(j),ee(j)},onFocus:()=>{Z.setCurrent(j),ee(j)},onBlur:se=>{se.currentTarget.parentElement?.contains(se.relatedTarget)||B()},onKeyDown:se=>{se.key==="Escape"?B():Z.onKeyDown(se,j)},className:"h-full min-w-0 flex-1 cursor-crosshair rounded-tag focus-visible:focus-ring-inset"},j))}),dt(Vl,{anchor:y!==null?h:null,children:y!==null&&gi(Bl,{title:i(e[y]?.[t],y),children:[o.map(Y=>{let j=ia(e[y],Y);return dt(fi,{indicator:dt(u1,{config:a,series:Y,onInk:!0}),label:a[Y]?.label??Y,value:j===null?Gr:u(j)},Y)}),d?.(e[y])]})})]})]})}var f9={linear:d1,monotone:Zy,step:Gy};function g9(e,t,o,a){let r=[],n=[];return e.forEach((s,l)=>{let i=ia(s,t);if(i===null){n.length&&r.push(n),n=[];return}n.push({x:o(l),y:a(i)})}),n.length&&r.push(n),r}var h9=1.5,b9="4 3";function y9({data:e,xKey:t,series:o,label:a,height:r=200,curve:n="monotone",area:s,zero:l=!0,xFormat:i=p=>String(p),valueFormat:c=Gu,tooltipFormat:u,empty:d,className:m}){let{config:p,keys:f,hidden:v,highlight:g}=_u(),b=(o??f).filter(h=>!v.has(h)),w=e.flatMap(h=>b.map(I=>ia(h,I)).filter(I=>I!==null)),y=[l?Math.min(0,...w):Math.min(...w),Math.max(...w,l?0:-1/0)],x=f9[n];return dt(Wy,{data:e,xKey:t,series:b,config:p,mode:"point",extent:y,height:r,label:a,xFormat:i,valueFormat:c,tooltipFormat:u,empty:d,className:m,overlay:h=>h.active!==null&&b.map(I=>{let R=ia(e[h.active],I);return R===null?null:dt("rect",{x:h.x(h.active)-3.5,y:h.y(R)-3.5,width:7,height:7,strokeWidth:2,className:F("fill-current stroke-paper",pi(p,I,!1,f))},I)}),children:h=>b.map(I=>{let{dashed:R}=ys(p,I,f),C=g9(e,I,h.x,h.y),S=g!==null&&g!==I,T=Math.min(Math.max(h.y(0),h.plot.top),h.plot.bottom);return gi("g",{"data-slot":"line-chart-series","data-series":I,className:F(pi(p,I,!1,f),"transition-opacity duration-(--dur-state)",S&&"opacity-(--stale)"),children:[s&&b.length===1&&C.map((P,V)=>P.length>1&&dt("path",{d:`${x(P)}L${P[P.length-1].x},${T}L${P[0].x},${T}Z`,className:"fill-hover stroke-none"},`a${V}`)),C.map((P,V)=>P.length===1?dt("rect",{x:P[0].x-2,y:P[0].y-2,width:4,height:4,className:"fill-current"},V):dt("path",{d:x(P),fill:"none",strokeWidth:h9,strokeDasharray:R?b9:void 0,strokeLinejoin:"round",strokeLinecap:"round",className:"stroke-current forced-colors:stroke-[CanvasText]"},V))]},I)})})}function LT({config:e,...t}){return dt(c1,{config:e,xKey:t.xKey,children:dt(y9,{...t})})}var $y=1,AT=2,w9=2;function zT({x:e,width:t,y:o,height:a,up:r,hollow:n,className:s,...l}){let i=Math.min(w9,t/2,a),c=n?.5:0,u=e+c,d=e+t-c,m=o+c,p=o+a-c,f=r?`M${u},${p}V${m+i}Q${u},${m} ${u+i},${m}H${d-i}Q${d},${m} ${d},${m+i}V${p}Z`:`M${u},${m}V${p-i}Q${u},${p} ${u+i},${p}H${d-i}Q${d},${p} ${d},${p-i}V${m}Z`;return dt("path",{d:f,strokeWidth:n?1:0,className:F(n?"fill-paper stroke-current":"fill-current","forced-colors:fill-[CanvasText]",s),...l})}function v9({data:e,xKey:t,series:o,label:a,height:r=200,stacked:n,fill:s=.64,xFormat:l=p=>String(p),valueFormat:i=Gu,tooltipFormat:c,total:u=n,empty:d,className:m}){let{config:p,keys:f,hidden:v,highlight:g}=_u(),b=(o??f).filter(I=>!v.has(I)),w=(I,R)=>b.reduce((C,S)=>{let T=ia(I,S)??0;return R>0?C+Math.max(T,0):C+Math.min(T,0)},0),y=n?e.flatMap(I=>[w(I,1),w(I,-1)]):e.flatMap(I=>b.map(R=>ia(I,R)??0)),x=[Math.min(0,...y),Math.max(0,...y)],h=c??i;return dt(Wy,{data:e,xKey:t,series:b,config:p,mode:"band",extent:x,height:r,label:a,xFormat:l,valueFormat:i,tooltipFormat:c,empty:d,className:m,tooltipFooter:u&&b.length>1?I=>dt(fi,{className:"mt-0.5 border-t border-text-inverse/20 pt-1",label:"Total",value:h(w(I,1)+w(I,-1))}):void 0,children:I=>{let R=Math.max(1,I.band*s),C=I.y(0),S=P=>g!==null&&g!==P;if(n)return e.map((P,V)=>{let E=0,z=0,M=I.x(V)-R/2,O=[...b].reverse().find(k=>(ia(P,k)??0)>0),H=[...b].reverse().find(k=>(ia(P,k)??0)<0);return dt("g",{children:b.map(k=>{let N=ia(P,k);if(!N)return null;let L=N>0?E:z,U=L+N;N>0?E=U:z=U;let A=Math.min(I.y(L),I.y(U)),ee=Math.abs(I.y(U)-I.y(L))-(L===0?0:$y),B=k===(N>0?O:H);return dt("g",{className:F(pi(p,k,!1,f),"transition-opacity duration-(--dur-state)",S(k)&&"opacity-(--stale)"),children:B?dt(zT,{"data-series":k,x:M,width:R,y:N>0?A:A+(L===0?0:$y),height:Math.max(ee,1),up:N>0,hollow:ys(p,k,f).dashed}):dt("rect",{"data-series":k,x:M,width:R,y:N>0?A:A+(L===0?0:$y),height:Math.max(ee,1),shapeRendering:"crispEdges",className:ys(p,k,f).dashed?"fill-paper stroke-current":"fill-current"})},k)})},V)});let T=(R-AT*(b.length-1))/Math.max(b.length,1);return e.map((P,V)=>dt("g",{children:b.map((E,z)=>{let M=ia(P,E);return M===null||M===0?null:dt("g",{className:F(pi(p,E,!1,f),"transition-opacity duration-(--dur-state)",S(E)&&"opacity-(--stale)"),children:dt(zT,{"data-series":E,x:I.x(V)-R/2+(I.rtl?b.length-1-z:z)*(T+AT),width:Math.max(T,1),y:Math.min(I.y(M),C),height:Math.max(Math.abs(C-I.y(M)),1),up:M>=0,hollow:ys(p,E,f).dashed})},E)})},V))}})}function NT({config:e,...t}){return dt(c1,{config:e,xKey:t.xKey,children:dt(v9,{...t})})}import{useRef as qy,useState as m1}from"react";import{Fragment as OT,jsx as Do,jsxs as Uu}from"react/jsx-runtime";var HT=Ye("relative inline-block min-w-0 align-middle",{variants:{size:{sm:"h-4",default:"h-(--control-sm)",lg:"h-(--control-lg)"}},defaultVariants:{size:"default"}}),I9={ok:"text-ok",warn:"text-warn",fail:"text-fail"},hi=100,DT=8;function C9(e,t){if(!e.length)return"no data";let o=e[0],a=e[e.length-1];return`${a>o?"up":a<o?"down":"flat"} from ${t(o)} to ${t(a)}, low ${t(Math.min(...e))}, high ${t(Math.max(...e))}`}function VT({data:e,label:t,status:o,variant:a="line",area:r,end:n=a==="line",labels:s,valueFormat:l=m=>m.toLocaleString("en-US"),interactive:i,size:c="default",className:u,...d}){let m=e.filter(H=>H!==null&&Number.isFinite(H)),p=e.length,f=a==="bar"?Math.min(0,...m):Math.min(...m),v=Math.max(...m,f+1),g=Math.max(p-1,1)*10,b=H=>DT+(1-(H-f)/(v-f||1))*(hi-DT*2),w=H=>a==="bar"?(H+.5)*(g/p):p===1?g/2:H/(p-1)*g,y=H=>s?.[H]??`Point ${H+1}`,x=[],h=[];e.forEach((H,k)=>{if(H===null||!Number.isFinite(H)){h.length&&x.push(h),h=[];return}h.push({x:w(k),y:b(H)})}),h.length&&x.push(h);let I=e.findLastIndex(H=>H!==null&&Number.isFinite(H)),R=qy(null),[C,S]=m1(null),[T,P]=m1(null),V=H=>{S(H);let k=R.current,N=k?.getBoundingClientRect(),L=e[H];if(!k||!N)return;let U=w(H)/g*N.width,A=getComputedStyle(k).direction==="rtl";P({x:A?N.right-U:N.left+U,y:N.top+(L===null?hi:b(L))/hi*N.height})},E=()=>{S(null),P(null)},z=Hl(p,H=>V(H)),M=(H,k)=>`${H/k*100}%`,O=o?I9[o]:"text-text-1";return Uu("div",{"data-slot":"sparkline","data-status":o,"data-variant":a,className:F(HT({size:c}),"w-24",O,u),...d,children:[Do(ws,{caption:`${t}: ${C9(m,l)}`,empty:On,rowHeader:"Point",columns:[{key:"v",label:t}],rows:e.map((H,k)=>({key:String(k),label:y(k),values:{v:H===null?Gr:l(H)}}))}),Do("svg",{ref:R,"aria-hidden":!0,viewBox:`0 0 ${g} ${hi}`,preserveAspectRatio:"none",className:"block size-full overflow-visible rtl:-scale-x-100",children:a==="bar"?e.map((H,k)=>H!==null&&Number.isFinite(H)&&Do("rect",{x:w(k)-g/p*.32,width:g/p*.64,y:Math.min(b(H),b(0)),height:Math.max(Math.abs(b(0)-b(H)),2),className:F("fill-current transition-opacity duration-(--dur-state)",C!==null&&C!==k&&"opacity-(--stale)")},k)):Uu(OT,{children:[r&&x.map((H,k)=>H.length>1&&Do("path",{d:`M${H[0].x},${hi}${H.map(N=>`L${N.x},${N.y}`).join("")}L${H[H.length-1].x},${hi}Z`,className:"fill-hover"},`a${k}`)),x.map((H,k)=>H.length===1&&Do("path",{d:`M${H[0].x},${H[0].y}h0`,fill:"none",vectorEffect:"non-scaling-stroke",strokeLinecap:"round",strokeWidth:4,className:"stroke-current"},`d${k}`)),x.map((H,k)=>H.length>1&&Do("path",{d:H.map((N,L)=>`${L?"L":"M"}${N.x},${N.y}`).join(""),fill:"none",vectorEffect:"non-scaling-stroke",strokeLinejoin:"round",strokeLinecap:"round",strokeWidth:c==="sm"?1:1.5,className:"stroke-current forced-colors:stroke-[CanvasText]"},k))]})}),a==="line"&&(C??(n?I:-1))>=0&&(()=>{let H=C??I,k=e[H];return k===null||!Number.isFinite(k)?null:Do("span",{"aria-hidden":!0,"data-slot":"sparkline-end",className:"pointer-events-none absolute size-1.5 -translate-x-1/2 -translate-y-1/2 bg-current rtl:translate-x-1/2",style:{insetInlineStart:M(w(H),g),top:M(b(k),hi)}})})(),i&&p>0&&Uu(OT,{children:[Do("span",{role:"group","aria-label":t,"aria-roledescription":"chart",className:"absolute inset-0 flex",onPointerLeave:E,children:e.map((H,k)=>Do("button",{ref:z.ref(k),type:"button",tabIndex:z.tabIndex(k),"aria-label":`${y(k)}: ${H===null?"no data":l(H)}`,onPointerEnter:()=>{z.setCurrent(k),V(k)},onFocus:()=>{z.setCurrent(k),V(k)},onBlur:N=>{N.currentTarget.parentElement?.contains(N.relatedTarget)||E()},onKeyDown:N=>{N.key==="Escape"?E():z.onKeyDown(N,k)},className:"h-full min-w-0 flex-1 rounded-tag focus-visible:focus-ring-inset"},k))}),Do(Vl,{anchor:C!==null?T:null,children:C!==null&&Do(Bl,{title:y(C),children:Do(fi,{label:t,value:e[C]===null?Gr:l(e[C])})})})]})]})}var BT=Ye("flex w-full min-w-0",{variants:{size:{sm:"h-4",default:"h-(--control-sm)",lg:"h-(--control)"}},defaultVariants:{size:"default"}}),FT={ok:"Passed",warn:"Warning",fail:"Failed"},R9={quiet:"bg-field",ok:"bg-line-strong",warn:"bg-warn",fail:"bg-fail"};function _T({data:e,label:t,unit:o=["run","runs"],range:a,onBucketClick:r,size:n="default",className:s,...l}){let i=qy(null),[c,u]=m1(null),[d,m]=m1(null),p=qy([]),f=(S,T)=>{u(S);let P=(T??p.current[S])?.getBoundingClientRect();P&&m({x:P.left+P.width/2,y:P.top})},v=()=>{u(null),m(null)},g=Hl(e.length,(S,T)=>f(S,T)),b=S=>`${S.toLocaleString("en-US")} ${S===1?o[0]:o[1]}`,w=S=>{if(S.description)return S.description;let T=[S.count?b(S.count):`No ${o[1]}`];return S.status&&S.status!=="ok"&&T.push(`${S.issues??""} ${S.status==="fail"?"failed":"with warnings"}`.trim()),T.join(", ")},y=a===!1?null:a??[e[0]?.label,e[e.length-1]?.label],[x,h]=Zu(),I=e.length>60?1:2,R=h-I*(e.length-1),C=S=>h&&R>=e.length?Math.floor((S+1)*R/e.length)-Math.floor(S*R/e.length):void 0;return Uu("div",{ref:i,"data-slot":"status-bar",className:F("flex w-full min-w-0 flex-col gap-1.5",s),...l,children:[Do(ws,{caption:t,rowHeader:"Bucket",columns:[{key:"count",label:o[1][0].toUpperCase()+o[1].slice(1)},{key:"status",label:"Status"}],rows:e.map((S,T)=>({key:String(T),label:S.label,values:{count:S.count.toLocaleString("en-US"),status:S.count?FT[S.status??"ok"]:Gr}})),empty:On}),Do("div",{ref:x,role:"group","aria-label":t,"aria-roledescription":"status bar",className:F(BT({size:n}),e.length>60?"gap-px":"gap-0.5"),onPointerLeave:()=>{i.current?.contains(document.activeElement)||v()},children:e.map((S,T)=>{let P=S.count===0?"quiet":S.status??"ok",V=C(T);return Do("button",{ref:E=>{p.current[T]=E,g.ref(T)(E)},type:"button",tabIndex:g.tabIndex(T),"data-slot":"status-bar-cell","data-tone":P,"aria-label":`${S.label}: ${w(S)}`,onPointerEnter:E=>{g.setCurrent(T),f(T,E.currentTarget)},onFocus:E=>{g.setCurrent(T),f(T,E.currentTarget)},onBlur:E=>{E.currentTarget.parentElement?.contains(E.relatedTarget)||v()},onKeyDown:E=>{E.key==="Escape"?v():g.onKeyDown(E,T)},onClick:r&&(()=>r(S,T)),style:V?{width:V,flex:"none"}:void 0,className:F("h-full min-w-px flex-1 rounded-pill transition-opacity duration-(--dur-state) focus-sm",R9[P],P==="quiet"?"forced-colors:bg-[Canvas] forced-colors:outline-1 forced-colors:-outline-offset-1":"forced-colors:bg-[CanvasText]",c!==null&&c!==T&&"opacity-(--stale)",r?"cursor-pointer":"cursor-default")},T)})}),y&&Uu("div",{"aria-hidden":!0,className:"flex justify-between gap-4 type-caption text-text-2 data",children:[Do("span",{children:y[0]}),Do("span",{children:y[1]})]}),Do(Vl,{anchor:c!==null?d:null,children:c!==null&&e[c]&&Do(Bl,{title:e[c].label,children:Do(fi,{indicator:Do(u2,{status:e[c].count===0?"idle":e[c].status??"ok",className:"h-auto text-text-inverse"}),label:e[c].count?FT[e[c].status??"ok"]:"Quiet",value:w(e[c])})})})]})}import{Fragment as Ky,jsx as ht,jsxs as ha}from"react/jsx-runtime";var jy=[38,52,44,66,58,72,49,61,80,68,74,90];function UT({shape:e}){if(e==="bar")return ht(Ky,{children:jy.map((o,a)=>ht(i1,{className:"flex-1 rounded-b-none",style:{height:`${o}%`}},a))});if(e==="status")return ht("span",{"aria-hidden":!0,className:"flex h-(--control-sm) w-full gap-0.5 self-center",children:Array.from({length:30},(o,a)=>ht(i1,{className:"h-full min-w-1 flex-1 rounded-pill"},a))});let t=jy.map((o,a)=>`${a/(jy.length-1)*100},${100-o}`).join(" ");return ht("svg",{"aria-hidden":!0,viewBox:"0 0 100 100",preserveAspectRatio:"none",className:"size-full overflow-visible text-field",children:ht("polyline",{points:t,fill:"none",vectorEffect:"non-scaling-stroke",strokeLinejoin:"round",strokeLinecap:"round",strokeWidth:e==="line"?4:2,className:"stroke-current forced-colors:stroke-[GrayText]"})})}function GT({title:e,description:t,actions:o,footer:a,height:r=200,loading:n,error:s,onRetry:l,retrying:i,empty:c,table:u,shape:d="bar",frame:m="card",live:p,className:f,children:v,...g}){let[b,w]=E9("chart"),y=n?"loading":s?"error":c?"empty":"ready",x=ZT(null),h=ZT(!1);S9(()=>{y==="error"||!h.current||(h.current=!1,(!document.activeElement||document.activeElement===document.body)&&x.current?.focus())},[y]);let I=u&&b==="table"&&y==="ready",R=m==="card",C=ha("header",{"data-slot":"chart-frame-header",className:F("flex min-w-0 items-start justify-between gap-3",R?"p-3":"pb-3"),children:[ha("div",{className:"flex min-w-0 flex-col gap-0.5",children:[ht("h3",{ref:x,tabIndex:-1,"data-slot":"chart-frame-title",className:"min-w-0 truncate type-label text-text-1 outline-none",children:e}),t&&ht("p",{"data-slot":"chart-frame-description",className:"type-body-sm text-text-2",children:t})]}),(o||u||p)&&ha("div",{"data-slot":"chart-frame-actions",className:"-my-0.5 flex shrink-0 items-center gap-2",children:[p&&ht(_t,{status:"running",size:"sm",children:"Live"}),o,u&&ha(IT,{size:"sm","aria-label":"View",value:b,onValueChange:P=>w(P),children:[ht(Ly,{value:"chart","aria-label":"Chart",children:ht(Ce,{icon:w6})}),ht(Ly,{value:"table","aria-label":"Table",children:ht(Ce,{icon:O6})})]})]})]}),S=ht("div",{"data-slot":"chart-frame-plot",className:F("min-w-0",R&&(I?"border-t border-line-faint":"px-3 pb-3")),children:ha("div",{"data-slot":"chart-frame-body",className:"relative min-w-0",style:I?void 0:{height:r},children:[y==="loading"&&ha("div",{"data-slot":"chart-frame-loading","data-shape":d,className:"flex h-full items-end gap-1",children:[ha("span",{className:"sr-only",children:["Loading ",typeof e=="string"?e:"chart"]}),ht(UT,{shape:d})]}),y==="error"&&ha("div",{role:"status",className:"flex h-full flex-col items-start gap-2",children:[ht(_t,{status:"fail",children:s}),l&&ha($e,{size:"sm",variant:"secondary",pending:!!i,pendingLabel:"Retrying",onFocus:()=>{h.current=!0},onBlur:P=>{P.relatedTarget&&(h.current=!1)},onClick:l,children:[ht(Ce,{icon:Bs}),"Retry"]})]}),y==="empty"&&ha("div",{className:"relative h-full type-body-sm text-text-2",children:[c,ht("span",{"aria-hidden":!0,className:"absolute inset-x-0 bottom-6 h-px bg-line"})]}),y==="ready"&&(I?u:v)]})}),T=a&&!I?ht("div",{"data-slot":"chart-frame-footer","aria-hidden":y!=="ready"||void 0,inert:y!=="ready"||void 0,className:F(R?"shell-foot ps-0.5":"pt-2",y!=="ready"&&"invisible"),children:a}):null;return ha("section",{"data-slot":"chart-frame","data-state":y,"data-frame":m,"aria-busy":n||void 0,className:F("flex min-w-0 flex-col text-text-1",R&&"shell forced-colors:border-[CanvasText]",f),...g,children:[R?ha("div",{"data-slot":"chart-frame-panel",className:"panel flex min-w-0 flex-col overflow-hidden forced-colors:border-[CanvasText]",children:[C,S]}):ha(Ky,{children:[C,S]}),T]})}function $T(e){let{type:t,label:o,title:a,description:r,actions:n,height:s,loading:l,error:i,onRetry:c,retrying:u,empty:d,unit:m,className:p,live:f}=e,v=e.frame??(t==="sparkline"?"none":"card"),g;if(e.type==="line"||e.type==="bar"){let C=e.series??Object.keys(e.config);g=[];for(let S of e.data)for(let T of C)if(T!==e.xKey){let P=ia(S,T);P!==null&&g.push(P)}}else e.type==="sparkline"?g=e.data.filter(C=>typeof C=="number"):g=e.data.map(C=>C.count);let b=e.valueFormat??MT(m,g),w=!l&&!i&&e.data.length===0,y=d??On,x=e.type==="line"||e.type==="bar"?(e.series??Object.keys(e.config).filter(C=>C!==e.xKey)).map(C=>({key:C,label:e.config[C]?.label??C})):e.type==="status"?[{key:"count",label:"Count"},{key:"status",label:"Status"}]:[{key:"v",label:o}],h=w?ha(Ky,{children:[ht("span",{"aria-hidden":!0,children:y}),ht(ws,{caption:o,rowHeader:e.type==="line"||e.type==="bar"?e.config[e.xKey]?.label??"Date":e.type==="status"?"Bucket":"Point",columns:x,rows:[],empty:y})]}):void 0,I=s??(t==="status"?(e.size==="sm"?16:e.size==="lg"?32:26)+24:t==="sparkline"?26:200);if(t==="line"||t==="bar"){let{data:C,xKey:S,config:T,series:P,xFormat:V,curve:E,area:z,zero:M,stacked:O,defaultHidden:H}=e,k=P??Object.keys(T).filter(A=>A!==S),N=e.legend??k.length>1,L=t==="line"?ht(LT,{data:C,xKey:S,series:P,label:o,height:I,curve:E,area:z,zero:M,xFormat:V,valueFormat:b,empty:d}):ht(NT,{data:C,xKey:S,series:P,label:o,height:I,stacked:O,xFormat:V,valueFormat:b,empty:d}),U=null;if(e.table){let A=b??Gu;U=ht(ws,{visible:!0,caption:o,rowHeader:T[S]?.label??"Date",columns:k.map(ee=>({key:ee,label:T[ee]?.label??ee})),rows:C.map((ee,B)=>({key:String(B),label:(V??(Z=>String(Z)))(ee[S],B),values:Object.fromEntries(k.map(Z=>{let G=ia(ee,Z);return[Z,G===null?Gr:A(G)]}))}))})}return ht(Vy,{config:T,xKey:S,defaultHidden:H,className:"min-w-0",children:ht(GT,{title:a??o,description:r,actions:n,footer:N?ht(TT,{series:P}):null,height:I,loading:l,error:i,onRetry:c,retrying:u,empty:h,table:U,shape:t,frame:v==="card"?"card":"plain",live:f,"data-chart-type":t,className:p,children:L})})}let R=null;if(e.type==="sparkline"){let{data:C,status:S,variant:T,area:P,end:V,labels:E,interactive:z,size:M}=e;R=ht(VT,{data:C,label:o,status:S,variant:T,area:P,end:V,labels:E,interactive:z,size:M,valueFormat:b,className:v==="none"?p:"w-full"})}else if(e.type==="status"){let{data:C,noun:S,range:T,onBucketClick:P,size:V}=e;R=ht(_T,{data:C,label:o,unit:S,range:T,onBucketClick:P,size:V,className:v==="none"?p:void 0})}return v==="none"?l?ha("span",{"data-slot":"chart-frame-loading","data-shape":t,"aria-busy":!0,className:F("inline-flex",t==="sparkline"?"h-(--control-sm) w-24":"h-(--control-sm) w-full",p),children:[ha("span",{className:"sr-only",children:["Loading ",o]}),ht(UT,{shape:t})]}):R:ht(GT,{title:a??o,description:r,actions:n,height:I,loading:l,error:i,onRetry:c,retrying:u,empty:h,shape:t,frame:v,live:f,"data-chart-type":t,className:p,children:R})}import*as vs from"react";import{Fragment as $6e,jsx as qo,jsxs as $u}from"react/jsx-runtime";function T9({title:e,count:t,actions:o,id:a,className:r}){return $u("div",{"data-slot":"table-title",className:F("flex min-h-(--row) min-w-0 shrink-0 items-center gap-2 border-b border-line-faint ps-3 pe-1.5",r),children:[qo("span",{id:a,className:"min-w-0 truncate type-label text-text-1",children:e}),t!=null&&qo("span",{"data-slot":"table-count",className:"shrink-0 type-label text-text-2 data",children:t}),o!=null&&qo("div",{"data-slot":"table-actions",className:"ms-auto flex shrink-0 items-center gap-1",children:o})]})}function M9({className:e,...t}){return qo("div",{"data-slot":"table-toolbar",className:F("flex min-h-(--row) min-w-0 shrink-0 flex-wrap items-center gap-2 border-b border-line-faint px-1.5 py-1",e),...t})}function P9({frame:e="card",footer:t,className:o,children:a,...r}){return e==="none"?$u("div",{"data-slot":"table-frame","data-frame":"none",className:F("flex min-w-0 flex-col",o),...r,children:[a,t!=null&&qo("div",{"data-slot":"table-footer-row",className:"flex min-h-(--row) min-w-0 items-center gap-2 border-t border-line-faint px-3 type-caption text-text-2",children:t})]}):$u("div",{"data-slot":"table-frame","data-frame":"card",className:F("shell text-text-1 forced-colors:border-[CanvasText]",o),...r,children:[qo("div",{"data-slot":"table-panel",className:"panel flex min-w-0 flex-col overflow-hidden forced-colors:border-[CanvasText]",children:a}),t!=null&&qo("div",{"data-slot":"table-footer-row",className:"shell-foot [&>:first-child]:me-auto",children:t})]})}function WT({className:e,frame:t="card",title:o,count:a,actions:r,toolbar:n,footer:s,stickyHeader:l=!1,maxHeight:i,frameClassName:c,containerClassName:u,scrollFocus:d=!0,...m}){let p=vs.useRef(null),f=Jg(p,d),v=vs.useId(),g=m["aria-label"],b=!g&&o?v:void 0;return $u(P9,{frame:t,footer:s,className:c,children:[o!=null&&qo(T9,{id:v,title:o,count:a,actions:r}),n!=null&&qo(M9,{children:n}),qo("div",{ref:p,"data-slot":"table-container","data-sticky-header":l||void 0,tabIndex:f,role:f===0&&(g||b)?"region":void 0,"aria-label":f===0&&g?g:void 0,"aria-labelledby":f===0?b:void 0,className:F("group/table relative w-full min-w-0 overflow-auto overscroll-contain focus-visible:focus-ring-inset",u),style:i!==void 0?{maxHeight:i}:void 0,children:qo("table",{"data-slot":"table","aria-labelledby":b,className:F(k9,e),...m})})]})}var k9="w-full caption-bottom border-separate border-spacing-0 text-start type-body-sm text-text-1";function qT({className:e,...t}){return qo("thead",{"data-slot":"table-header",className:e,...t})}function jT({className:e,...t}){return qo("tbody",{"data-slot":"table-body",className:F(A9,e),...t})}var A9="[&>tr:not(:last-child)>td]:border-b [&>tr:not(:last-child)>td]:border-line-faint [&>tr:not(:last-child)>th]:border-b [&>tr:not(:last-child)>th]:border-line-faint";var z9=F("group/row transition-colors duration-(--dur-state) ease-out","[tbody>&]:hover:bg-hover-row has-aria-expanded:bg-hover-row","data-selected:bg-pressed data-selected:hover:bg-pressed data-open:bg-pressed data-open:hover:bg-pressed","forced-colors:data-selected:outline-1 forced-colors:data-selected:-outline-offset-1 forced-colors:data-selected:outline-[Highlight] forced-colors:data-open:outline-2 forced-colors:data-open:-outline-offset-2 forced-colors:data-open:outline-[Highlight]");function Yy({className:e,selected:t,open:o,...a}){return qo("tr",{"data-slot":"table-row","data-selected":t||void 0,"data-open":o||void 0,"aria-selected":t===void 0?void 0:t,"aria-current":o?"true":void 0,className:F(z9,e),...a})}var L9=F("h-8 border-b border-line-faint bg-paper px-3 text-start align-middle type-label-sm whitespace-nowrap text-text-2","[&:has([role=checkbox])]:w-10 [&:has([role=checkbox])]:pe-0","group-data-sticky-header/table:sticky group-data-sticky-header/table:top-0 group-data-sticky-header/table:z-(--z-raised)"),N9="h-(--row) px-3 align-middle whitespace-nowrap text-text-1 [&:has([role=checkbox])]:pe-0";function Wu({className:e,numeric:t,sort:o,onSort:a,children:r,...n}){let s=!!a||o!==void 0;return qo("th",{"data-slot":"table-head",scope:"col","aria-sort":s?o==="asc"?"ascending":o==="desc"?"descending":"none":void 0,className:F(L9,t&&"text-end",e),...n,children:s?qo(D9,{sort:o??!1,numeric:t,onClick:a,children:r}):r})}function D9({sort:e,numeric:t,className:o,children:a,...r}){let n=e==="asc"?_i:e==="desc"?tf:y6;return $u("button",{type:"button","data-slot":"table-sort","data-sorted":e||void 0,className:F("group/sort -mx-1.5 inline-flex h-(--control-sm) items-center gap-1 rounded-pill px-1.5 type-label-sm text-text-2","transition-colors duration-(--dur-state) ease-out hover:bg-hover hover:text-text-1 data-sorted:text-text-1",t&&"flex-row-reverse",o),...r,children:[qo("span",{className:"whitespace-nowrap",children:a}),qo(Ce,{icon:n,size:12,className:F("shrink-0",!e&&"text-text-3 opacity-0 group-hover/sort:opacity-100 group-focus-visible/sort:opacity-100 pointer-coarse:opacity-100")})]})}function qu({className:e,numeric:t,mono:o,...a}){return qo("td",{"data-slot":"table-cell",className:F(N9,t&&"text-end data",o&&"type-code-sm",e),...a})}var G6e=vs.createContext(null);import{jsx as Pe,jsxs as Ct}from"react/jsx-runtime";var YT="hermes-ui-glaze";function O9(){JT(()=>{let e=document.getElementById(YT);return e||(e=document.createElement("style"),e.id=YT,document.head.appendChild(e)),e.textContent=ff,()=>{e?.remove()}},[])}var bi=Date.now(),XT=["hermes-3-405b","deepseek-v4.1-flash","qwen3-coder-30b"],H9=`Je commence par les journaux de la routine, puis je compare les trois derniers passages.
La coupure tombe toujours entre la 30e et la 31e seconde : c'est le délai par défaut du gateway, pas une panne du bot.
Je vérifie ensuite le fichier de configuration avant de proposer une relance.`,QT=`## Pourquoi nightly-report échoue

Trois nuits de suite, la routine s'arrête sur le même point : le gateway rend un \`504\` après 30 s, alors que la collecte des journaux en demande 40.

- **Branco** relance la routine à 02:14, sans changer le délai.
- **Dex** a coupé la reprise automatique pour éviter la boucle.
- **Preto** garde le dernier rapport complet du 5 novembre.

| Passage | Début | Durée | Résultat |
| - | - | - | - |
| run_8f2a | 02:10 | 38 s | échec |
| run_7d1c | 02:10 | 41 s | échec |
| run_6b03 | 02:09 | 39 s | échec |

Le correctif tient en une ligne : passer \`--timeout\` à 60 s dans \`routines/nightly-report.toml\`.`,V9=`hermes routine run nightly-report --bot branco --timeout 60
run_9a41 démarré · 3 étapes
  lecture routines/nightly-report.toml  ok
  collecte des journaux          40 s   ok
  envoi du rapport vers #veille         ok
terminé en 44 s`,B9=[{id:"call_read",tool:"read",status:"completed",seq:1,input:{filePath:"routines/nightly-report/run.log"},output:`02:10:31 gateway timeout after 30000ms
02:10:32 retry 1/1 refusé (reprise automatique coupée)`,startedAt:bi-13800,endedAt:bi-13100},{id:"call_shell",tool:"shell",status:"completed",seq:2,input:{command:"hermes routine logs nightly-report --bot branco --tail 40"},output:"3 passages · 3 échecs · dernier 2026-11-08 02:10",startedAt:bi-13e3,endedAt:bi-12200},{id:"call_search",tool:"websearch",status:"completed",seq:3,input:{query:"gateway 504 timeout routine hermes"},output:"Le délai par défaut du gateway est de 30 s ; il se règle par --timeout.",startedAt:bi-12e3,endedAt:bi-11400},{id:"call_run",tool:"shell",status:"running",seq:4,input:{command:"hermes routine run nightly-report --bot branco --timeout 60"},metadata:{output:"collecte des journaux 32 s / 40 s"},startedAt:bi-4e3},{id:"call_rm",tool:"shell",status:"awaiting-permission",seq:5,input:{command:"rm -rf cache/shared/2026-11-07"},permission:{patterns:["rm -rf cache/shared/2026-11-07"],message:"Supprime les 214 Mo de journaux temporaires que les trois bots ont écrits hier."}}],_9=[{label:"Lire les journaux des trois passages",detail:"run.log",status:"ok"},{label:"Relancer avec un délai de 60 s",detail:"nightly-report",status:"running"},{label:"Envoyer le rapport dans #veille",detail:"slack",status:"queued"}],Z9=[{nom:"nightly-report",bot:"Branco",duree:"38 s",statut:"fail"},{nom:"inbox-triage",bot:"Dex",duree:"12 s",statut:"ok"},{nom:"veille-prix",bot:"Preto",duree:"54 s",statut:"warn"},{nom:"backup-cache",bot:"Branco",duree:"67 s",statut:"ok"}],G9=[{jour:"lun",reussies:18,echouees:1},{jour:"mar",reussies:21,echouees:0},{jour:"mer",reussies:17,echouees:2},{jour:"jeu",reussies:22,echouees:1},{jour:"ven",reussies:20,echouees:3},{jour:"sam",reussies:11,echouees:1},{jour:"dim",reussies:9,echouees:2}];function eM(){O9();let[e,t]=M4(B9),[o,a]=F9(XT[0]),r=KT(100),n=KT(!1);JT(()=>{if(n.current)return;n.current=!0;let l=setTimeout(()=>{t({type:"progress",seq:++r.current,id:"call_run",metadata:{output:"collecte des journaux 40 s / 40 s"}})},1200);return()=>clearTimeout(l)},[]);let s=(l,i)=>{console.log(`[glaze-demo] tool ${l.id} → ${i}`),t({type:"reply",seq:++r.current,id:l.id,reply:i,feedback:i==="reject"?"Journaux à garder cette semaine.":void 0})};return Pe("div",{className:"glaze flex h-dvh min-h-0 w-full flex-col bg-page text-text-1","data-theme":"dark",children:Ct(kc,{children:[Ct("header",{className:"flex items-center gap-2 border-b border-line-faint px-4 py-2",children:[Pe(D0,{type:"agent",size:"sm",name:"Dex",children:Pe(gu,{})}),Pe("span",{className:"type-label",children:"Dex"}),Pe(Ji,{variant:"outline",size:"sm",children:"démo Glaze"}),Pe("span",{className:"type-caption text-text-3",children:"/hui/glaze"}),Ct("div",{className:"ms-auto flex items-center gap-1",children:[Pe(un,{children:Ct(or,{children:[Pe(ar,{render:Pe($e,{variant:"ghost",size:"icon-sm","aria-label":"Relancer la routine"}),children:Pe(Ce,{icon:Bs,size:14})}),Pe(Va,{shortcut:["mod","shift","R"],children:"Relancer la routine"})]})}),Ct(Dl,{children:[Pe(Fl,{render:Pe($e,{variant:"ghost",size:"icon-sm","aria-label":"Actions de la routine"}),children:Pe(Ce,{icon:Uh,size:14})}),Ct(Ol,{align:"end",size:"sm",children:[Pe(Du,{children:"Routine nightly-report"}),Pe(Ua,{onClick:()=>console.log("[glaze-demo] ouvrir les journaux"),children:"Ouvrir les journaux"}),Pe(Ua,{onClick:()=>console.log("[glaze-demo] copier le lien du passage"),children:"Copier le lien du passage"}),Pe(Fu,{}),Pe(Ua,{variant:"destructive",onClick:()=>console.log("[glaze-demo] désactiver la routine"),children:"Désactiver la routine"})]})]})]})]}),Pe("div",{className:"min-h-0 flex-1 overflow-y-auto",children:Ct("div",{className:"mx-auto flex w-full max-w-measure flex-col gap-6 px-4 py-5",children:[Pe(js,{from:"user",children:Ct(Ks,{children:[Ct(Ys,{children:["Ilyass",Pe(Xs,{children:"21:12"})]}),Pe(nl,{children:Pe(sl,{children:"Relance la routine nightly-report du bot Branco et dis-moi pourquoi elle a échoué trois nuits de suite."})})]})}),Ct(rl,{name:"Dex",state:"done",time:"21:14",children:[Pe(YE,{streaming:!1,duration:7,children:H9}),Pe(b4,{label:"Consultant les journaux",doneLabel:"Journaux consultés",active:!0,status:"ok",announce:!1}),Pe(N4,{calls:e.calls,onReply:s}),Pe(bl,{children:QT}),Ct(D4,{children:[Pe(F4,{children:"14 s"}),Pe(c0,{value:QT,label:"la réponse",size:"icon-sm"})]})]}),Ct("div",{className:"flex flex-col gap-2",children:[Ct("div",{className:"flex items-baseline gap-2",children:[Pe("h2",{className:"type-heading-sm",children:"Plan de l'agent"}),Ct("span",{className:"type-caption text-text-3",children:["Ouvrir un appel : ",Pe(ri,{keys:"enter"})]})]}),Ct(Lf,{children:[Ct(Nf,{children:[Pe(Df,{children:"Réparer nightly-report"}),Pe(p4,{children:"Trois étapes, la relance est en cours sur le bot Branco."})]}),Pe(Ff,{flush:!0,children:_9.map(l=>Ct("div",{className:"rule-row flex min-h-(--row) items-center gap-3 px-3 py-2",children:[Pe("span",{className:"type-body-sm flex-1 text-text-1",children:l.label}),Pe("span",{className:"mono text-text-3",children:l.detail}),Pe(_t,{status:l.status,size:"sm"})]},l.label))}),Ct(Gs,{children:[Pe(f4,{children:"3 étapes · 44 s"}),Pe($e,{size:"sm",variant:"secondary",onClick:()=>console.log("[glaze-demo] modifier le plan"),children:"Modifier"}),Pe($e,{size:"sm",variant:"confirm",onClick:()=>console.log("[glaze-demo] plan validé"),children:"Valider le plan"})]})]})]}),Ct("div",{className:"flex flex-col gap-2",children:[Pe("h2",{className:"type-heading-sm",children:"La relance, en ligne de commande"}),Pe(w0,{variant:"command",code:V9})]}),Ct("div",{className:"flex flex-col gap-2",children:[Pe("h2",{className:"type-heading-sm",children:"Routines des trois bots"}),Ct(WT,{"aria-label":"Routines des trois bots, dernier passage",children:[Pe(qT,{children:Ct(Yy,{children:[Pe(Wu,{children:"Routine"}),Pe(Wu,{children:"Bot"}),Pe(Wu,{numeric:!0,children:"Durée"}),Pe(Wu,{children:"Résultat"})]})}),Pe(jT,{children:Z9.map(l=>Ct(Yy,{children:[Pe(qu,{mono:!0,children:l.nom}),Pe(qu,{children:l.bot}),Pe(qu,{numeric:!0,children:l.duree}),Pe(qu,{children:Pe(_t,{status:l.statut,size:"sm"})})]},l.nom))})]})]}),Ct("div",{className:"flex flex-col gap-2",children:[Pe("h2",{className:"type-heading-sm",children:"Passages par jour"}),Pe($T,{type:"bar",label:"Routines par jour, sept derniers jours",data:G9,xKey:"jour",unit:"count",stacked:!0,height:170,config:{reussies:{label:"Réussies"},echouees:{label:"Échouées",status:"fail"}}})]})]})}),Pe("footer",{className:"border-t border-line-faint px-4 py-3",children:Ct("div",{className:"mx-auto flex w-full max-w-measure flex-col gap-2",children:[Pe(b0,{draftKey:"hermes-ui-glaze-demo",placeholder:"Demander à Dex de relancer une routine",status:"ready",generation:"run_9a41",onAttach:()=>console.log("[glaze-demo] pièce jointe"),attachments:[],accept:".md,.txt,.json",onSubmit:l=>console.log("[glaze-demo] envoi",l.serialized),tools:Ct(Dl,{children:[Pe(Fl,{render:Pe(nR,{model:o})}),Ct(Ol,{align:"start",side:"top",size:"sm",children:[Pe(Du,{children:"Modèle"}),XT.map(l=>Pe(Ua,{onClick:()=>a(l),children:l},l))]})]})}),Ct("p",{className:"type-caption text-text-3",children:["Entrée envoie · ",Pe(ri,{keys:"shift+enter"})," pour une nouvelle ligne"]})]})})]})})}import{jsx as aM}from"react/jsx-runtime";var ju="/hui",W9="/hui/glaze",IIe={id:"hermes-ui",name:"Hermes UI",register(e){rI(e),e.onEvent("*",t=>{try{aI(t)}catch(o){console.warn("[hermes-ui] event",t?.type,o)}}),e.registerMany([{id:"page",area:oM,data:{path:ju},render:()=>aM($E,{ctx:e})},{id:"glaze",area:oM,data:{path:W9},render:()=>aM(eM,{})},{id:"nav",area:$9,data:{path:ju,label:"Hermes UI",codicon:"comment-discussion"}},{id:"open",area:U9,data:{id:"hermes-ui.open",label:"Ouvrir Hermes UI",keywords:["hermes","ui","chat","bots"],run:()=>Xy.navigate(ju)}},{id:"new",area:tM,data:{id:"hermes-ui.newConversation",label:"Hermes UI : nouvelle conversation",category:"view",defaults:["mod+shift+o"],run:()=>{Xy.navigate(ju),Gc()}}},{id:"aside",area:tM,data:{id:"hermes-ui.toggleAside",label:"Hermes UI : afficher ou masquer le panneau",category:"view",defaults:["mod+alt+b"],run:()=>{Xy.navigate(ju),z0(e)}}}])}};export{IIe as default};
