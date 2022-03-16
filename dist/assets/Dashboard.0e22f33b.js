var le=Object.defineProperty,re=Object.defineProperties;var de=Object.getOwnPropertyDescriptors;var Q=Object.getOwnPropertySymbols;var ue=Object.prototype.hasOwnProperty,ce=Object.prototype.propertyIsEnumerable;var U=(e,t,o)=>t in e?le(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,S=(e,t)=>{for(var o in t||(t={}))ue.call(t,o)&&U(e,o,t[o]);if(Q)for(var o of Q(t))ce.call(t,o)&&U(e,o,t[o]);return e},w=(e,t)=>re(e,de(t));import{Q as H,a as N}from"./QCard.87930222.js";import{o as A,h as l,T as W,b as C,g as K,L as ge,r as R,f as p,w as me,M as Ce,D as be,x as E,I as fe,A as $,p as f,z as T,y as he,N as ve,B as ke,C as Te}from"./quasar.9bea6539.js";import{c as q,u as F,a as Y,b as J,d as _e,e as Le,f as Se,Q as xe,g as M,h as V,i as Ie,s as ye,_ as we,j as Ge}from"./index.964fddf4.js";import{Q as D}from"./QSelect.93065123.js";import{u as pe}from"./QInput.d9d52eaf.js";import{T as Me}from"./Table.fd720876.js";var Be=q({name:"QSlideTransition",props:{appear:Boolean,duration:{type:Number,default:300}},emits:["show","hide"],setup(e,{slots:t,emit:o}){let g=!1,r,n,m,s,d,u;function c(){r&&r(),r=null,g=!1,clearTimeout(m),clearTimeout(s),n!==void 0&&n.removeEventListener("transitionend",d),d=null}function x(a,b,h){a.style.overflowY="hidden",b!==void 0&&(a.style.height=`${b}px`),a.style.transition=`height ${e.duration}ms cubic-bezier(.25, .8, .50, 1)`,g=!0,r=h}function I(a,b){a.style.overflowY=null,a.style.height=null,a.style.transition=null,c(),b!==u&&o(b)}function L(a,b){let h=0;n=a,g===!0?(c(),h=a.offsetHeight===a.scrollHeight?0:void 0):u="hide",x(a,h,b),m=setTimeout(()=>{a.style.height=`${a.scrollHeight}px`,d=v=>{(Object(v)!==v||v.target===a)&&I(a,"show")},a.addEventListener("transitionend",d),s=setTimeout(d,e.duration*1.1)},100)}function G(a,b){let h;n=a,g===!0?c():(u="show",h=a.scrollHeight),x(a,h,b),m=setTimeout(()=>{a.style.height=0,d=v=>{(Object(v)!==v||v.target===a)&&I(a,"hide")},a.addEventListener("transitionend",d),s=setTimeout(d,e.duration*1.1)},100)}return A(()=>{g===!0&&c()}),()=>l(W,{css:!1,appear:e.appear,onEnter:L,onLeave:G},t.default)}});const qe={true:"inset",item:"item-inset","item-thumbnail":"item-thumbnail-inset"},B={xs:2,sm:4,md:8,lg:16,xl:24};var j=q({name:"QSeparator",props:w(S({},F),{spaced:[Boolean,String],inset:[Boolean,String],vertical:Boolean,color:String,size:String}),setup(e){const t=K(),o=Y(e,t.proxy.$q),g=C(()=>e.vertical===!0?"vertical":"horizontal"),r=C(()=>` q-separator--${g.value}`),n=C(()=>e.inset!==!1?`${r.value}-${qe[e.inset]}`:""),m=C(()=>`q-separator${r.value}${n.value}`+(e.color!==void 0?` bg-${e.color}`:"")+(o.value===!0?" q-separator--dark":"")),s=C(()=>{const d={};if(e.size!==void 0&&(d[e.vertical===!0?"width":"height"]=e.size),e.spaced!==!1){const u=e.spaced===!0?`${B.md}px`:e.spaced in B?`${B[e.spaced]}px`:e.spaced,c=e.vertical===!0?["Left","Right"]:["Top","Bottom"];d[`margin${c[0]}`]=d[`margin${c[1]}`]=u}return d});return()=>l("hr",{class:m.value,style:s.value,"aria-orientation":g.value})}});const _=ge({}),Pe=Object.keys(J);var z=q({name:"QExpansionItem",props:w(S(S(S({},J),_e),F),{icon:String,label:String,labelLines:[Number,String],caption:String,captionLines:[Number,String],dense:Boolean,expandIcon:String,expandedIcon:String,expandIconClass:[Array,String,Object],duration:Number,headerInsetLevel:Number,contentInsetLevel:Number,expandSeparator:Boolean,defaultOpened:Boolean,expandIconToggle:Boolean,switchToggleSide:Boolean,denseToggle:Boolean,group:String,popup:Boolean,headerStyle:[Array,String,Object],headerClass:[Array,String,Object]}),emits:[...Le,"click","after-show","after-hide"],setup(e,{slots:t,emit:o}){const{proxy:{$q:g}}=K(),r=Y(e,g),n=R(e.modelValue!==null?e.modelValue:e.defaultOpened),m=R(null),{hide:s,toggle:d}=Se({showing:n});let u,c;const x=C(()=>`q-expansion-item q-item-type q-expansion-item--${n.value===!0?"expanded":"collapsed"} q-expansion-item--${e.popup===!0?"popup":"standard"}`),I=C(()=>{if(e.contentInsetLevel===void 0)return null;const i=g.lang.rtl===!0?"Right":"Left";return{["padding"+i]:e.contentInsetLevel*56+"px"}}),L=C(()=>e.disable!==!0&&(e.href!==void 0||e.to!==void 0&&e.to!==null&&e.to!=="")),G=C(()=>{const i={};return Pe.forEach(k=>{i[k]=e[k]}),i}),a=C(()=>L.value===!0||e.expandIconToggle!==!0),b=C(()=>e.expandedIcon!==void 0&&n.value===!0?e.expandedIcon:e.expandIcon||g.iconSet.expansionItem[e.denseToggle===!0?"denseIcon":"icon"]),h=C(()=>e.disable!==!0&&(L.value===!0||e.expandIconToggle===!0));p(()=>e.group,i=>{c!==void 0&&c(),i!==void 0&&O()});function v(i){L.value!==!0&&d(i),o("click",i)}function X(i){i.keyCode===13&&P(i,!0)}function P(i,k){k!==!0&&m.value!==null&&m.value.focus(),d(i),ye(i)}function Z(){o("after-show")}function ee(){o("after-hide")}function O(){u===void 0&&(u=pe()),n.value===!0&&(_[e.group]=u);const i=p(n,y=>{y===!0?_[e.group]=u:_[e.group]===u&&delete _[e.group]}),k=p(()=>_[e.group],(y,se)=>{se===u&&y!==void 0&&y!==u&&s()});c=()=>{i(),k(),_[e.group]===u&&delete _[e.group],c=void 0}}function ne(){const i={class:[`q-focusable relative-position cursor-pointer${e.denseToggle===!0&&e.switchToggleSide===!0?" items-end":""}`,e.expandIconClass],side:e.switchToggleSide!==!0,avatar:e.switchToggleSide},k=[l(V,{class:"q-expansion-item__toggle-icon"+(e.expandedIcon===void 0&&n.value===!0?" q-expansion-item__toggle-icon--rotated":""),name:b.value})];return h.value===!0&&(Object.assign(i,{tabindex:0,onClick:P,onKeyup:X}),k.unshift(l("div",{ref:m,class:"q-expansion-item__toggle-focus q-icon q-focus-helper q-focus-helper--rounded",tabindex:-1}))),l(M,i,()=>k)}function te(){let i;return t.header!==void 0?i=[].concat(t.header()):(i=[l(M,()=>[l(D,{lines:e.labelLines},()=>e.label||""),e.caption?l(D,{lines:e.captionLines,caption:!0},()=>e.caption):null])],e.icon&&i[e.switchToggleSide===!0?"push":"unshift"](l(M,{side:e.switchToggleSide===!0,avatar:e.switchToggleSide!==!0},()=>l(V,{name:e.icon})))),e.disable!==!0&&i[e.switchToggleSide===!0?"unshift":"push"](ne()),i}function ie(){const i={ref:"item",style:e.headerStyle,class:e.headerClass,dark:r.value,disable:e.disable,dense:e.dense,insetLevel:e.headerInsetLevel};return a.value===!0&&(i.clickable=!0,i.onClick=v,L.value===!0&&Object.assign(i,G.value)),l(xe,i,te)}function ae(){return me(l("div",{key:"e-content",class:"q-expansion-item__content relative-position",style:I.value},Ie(t.default)),[[Ce,n.value]])}function oe(){const i=[ie(),l(Be,{duration:e.duration,onShow:Z,onHide:ee},ae)];return e.expandSeparator===!0&&i.push(l(j,{class:"q-expansion-item__border q-expansion-item__border--top absolute-top",dark:r.value}),l(j,{class:"q-expansion-item__border q-expansion-item__border--bottom absolute-bottom",dark:r.value})),i}return e.group!==void 0&&O(),A(()=>{c!==void 0&&c()}),()=>l("div",{class:x.value},[l("div",{class:"q-expansion-item__container relative-position"},oe())])}});const Oe=13100,Qe={name:"Dashboard",components:{CustomTable:Me},data(){return{isSmallTableOpen:!1,isLikedCoinsTableOpen:!1}},computed:{getLikedCoinsGeckoTableConfig(){return this.$store.getters["dashboard/getLikedCoinsGeckoTableConfig"]},getLikedCoinsIds(){return this.$store.getters.getLikedCoinsIds||[]},getLikedCoins(){return this.$store.getters.getLikedCoins||[]},getMainCoinsGeckoTableConfig(){return this.$store.getters["dashboard/getMainCoinsGeckoTableConfig"]},getSecondaryCoinsGeckoTableConfig(){return this.$store.getters["dashboard/getSecondaryCoinsGeckoTableConfig"]},getCoinsGecko(){return this.$store.getters.getCoinsGecko||[]},getCoinsGeckoSmall(){return(this.$store.getters.getCoinsGecko||[]).slice(0,4)},getCoinsGeckoLoading(){return this.$store.getters.getCoinsGeckoLoading||!1},getCoinsGeckoError(){return this.$store.getters.getCoinsGeckoError},bigTablePagesCount(){return Math.floor(Oe/this.getMainCoinsGeckoTableConfig.rowsPerPage.value)},getLikedCoinsGeckoLoading(){return!1}},watch:{"getMainCoinsGeckoTableConfig.timeRange.value"(e){this.currentPage=1,this.loadCoinsMarket()},"getMainCoinsGeckoTableConfig.rowsPerPage.value"(e){this.loadCoinsMarket()},"getMainCoinsGeckoTableConfig.currentPage"(e){this.loadCoinsMarket()}},created(){this.loadCoinsMarket()},mounted(){window.MemberStack.reload(),this.$store.dispatch("loadCoinBullbearInfo")},methods:{twoWayBindingsHandler({event:e,name:t,table:o}){this.$store.dispatch("dashboard/updateValue",{event:e,name:t,table:o})},loadCoinsMarket(){return this.$store.dispatch("loadCoinsMarket",{params:w(S({},!!this.getMainCoinsGeckoTableConfig.timeRange.value&&{price_change_percentage:this.getMainCoinsGeckoTableConfig.timeRange.value}),{page:this.getMainCoinsGeckoTableConfig.currentPage,per_page:this.getMainCoinsGeckoTableConfig.rowsPerPage.value,price_change_percentage:this.getMainCoinsGeckoTableConfig.timeRange.value})})},updateLikedCoins(e){this.$store.dispatch("updateLikedCoins",{coin:e})}}},Ue=e=>(ke("data-v-37659852"),e=e(),Te(),e),He={class:"dashboard"},Ne={class:"dashboard__content"},Re=Ue(()=>$("h1",{class:"dashboard__title"}," Dashboard ",-1));function Ee(e,t,o,g,r,n){const m=be("custom-table");return E(),fe("div",He,[$("div",Ne,[Re,f(Ge,{style:{"margin-bottom":"10px"}},{default:T(()=>[f(z,{modelValue:r.isSmallTableOpen,"onUpdate:modelValue":t[1]||(t[1]=s=>r.isSmallTableOpen=s),popup:"",icon:"perm_identity",label:"Small Table"},{default:T(()=>[f(H,null,{default:T(()=>[f(N,null,{default:T(()=>[f(m,{type:"small",coins:n.getCoinsGeckoSmall,columns:n.getSecondaryCoinsGeckoTableConfig.columns,loading:n.getCoinsGeckoLoading,"visible-columns":n.getSecondaryCoinsGeckoTableConfig.visibleColumns,"liked-coins-ids":n.getLikedCoinsIds,"onUpdate:visibleColumns":t[0]||(t[0]=s=>n.twoWayBindingsHandler({event:s,name:"visibleColumns",table:"likedCoinsTable"})),"onUpdate:likedCoinsIds":n.updateLikedCoins},null,8,["coins","columns","loading","visible-columns","liked-coins-ids","onUpdate:likedCoinsIds"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),f(W,{name:"router"},{default:T(()=>[n.getLikedCoins.length?(E(),he(z,{key:0,modelValue:r.isLikedCoinsTableOpen,"onUpdate:modelValue":t[3]||(t[3]=s=>r.isLikedCoinsTableOpen=s),popup:"",icon:"perm_identity",label:"Liked coins Table"},{default:T(()=>[f(H,null,{default:T(()=>[f(N,null,{default:T(()=>[f(m,{type:"small",coins:n.getLikedCoins,columns:n.getLikedCoinsGeckoTableConfig.columns,loading:n.getLikedCoinsGeckoLoading,"visible-columns":n.getLikedCoinsGeckoTableConfig.visibleColumns,"liked-coins-ids":n.getLikedCoinsIds,"onUpdate:visibleColumns":t[2]||(t[2]=s=>n.twoWayBindingsHandler({event:s,name:"visibleColumns",table:"secondaryCoinsTable"})),"onUpdate:likedCoinsIds":n.updateLikedCoins},null,8,["coins","columns","loading","visible-columns","liked-coins-ids","onUpdate:likedCoinsIds"])]),_:1})]),_:1})]),_:1},8,["modelValue"])):ve("",!0)]),_:1})]),_:1}),f(m,{type:"big",coins:n.getCoinsGecko,columns:n.getMainCoinsGeckoTableConfig.columns,loading:n.getCoinsGeckoLoading,"time-range":n.getMainCoinsGeckoTableConfig.timeRange,"rows-per-page":n.getMainCoinsGeckoTableConfig.rowsPerPage,"visible-columns":n.getMainCoinsGeckoTableConfig.visibleColumns,"current-page":n.getMainCoinsGeckoTableConfig.currentPage,"liked-coins-ids":n.getLikedCoinsIds,"max-page":n.bigTablePagesCount,"onUpdate:currentPage":t[4]||(t[4]=s=>n.twoWayBindingsHandler({event:s,name:"currentPage",table:"mainCoinsTable"})),"onUpdate:timeRange":t[5]||(t[5]=s=>n.twoWayBindingsHandler({event:s,name:"timeRange",table:"mainCoinsTable"})),"onUpdate:visibleColumns":t[6]||(t[6]=s=>n.twoWayBindingsHandler({event:s,name:"visibleColumns",table:"mainCoinsTable"})),"onUpdate:likedCoinsIds":n.updateLikedCoins},null,8,["coins","columns","loading","time-range","rows-per-page","visible-columns","current-page","liked-coins-ids","max-page","onUpdate:likedCoinsIds"])])])}var $e=we(Qe,[["render",Ee],["__scopeId","data-v-37659852"]]);export{$e as default};