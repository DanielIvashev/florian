var h=Object.defineProperty;var c=Object.getOwnPropertySymbols;var y=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;var m=(a,e,l)=>e in a?h(a,e,{enumerable:!0,configurable:!0,writable:!0,value:l}):a[e]=l,_=(a,e)=>{for(var l in e||(e={}))y.call(e,l)&&m(a,l,e[l]);if(c)for(var l of c(e))f.call(e,l)&&m(a,l,e[l]);return a};import{_ as S,a2 as k,p as b,r as w}from"./index.1354ada4.js";import{a as V}from"./QSelect.9824e459.js";import{Q as B}from"./QInput.96ed1be8.js";import{Q as F}from"./QForm.36e334ba.js";import{a as Q,Q as I}from"./QCard.49d3573a.js";import{x as n,I as u,p as s,z as d,A as r,U as C,F as U,N as D,B as x,C as T,P as $,y as g,M as A}from"./quasar.c7fe1536.js";var E="/assets/bullbear-icon.65d0aaad.png";const{mapFields:M}=k({getterType:"bullbearSignal/getField",mutationType:"bullbearSignal/updateField"}),L={name:"BullbearSignal",computed:_({},M(["fields"])),methods:{updateFieldValue({value:a,name:e}){this.$store.commit("bullbearSignal/UPDATE_FIELD_VALUE",{value:a,name:e})}},mounted(){window.MemberStack&&window.MemberStack.reload()}},v=a=>(x("data-v-b0269012"),a=a(),T(),a),j={class:"bullbear-signal"},H={class:"bullbear-signal__logo-wrapper"},P=v(()=>r("h4",{class:"bullbear-signal__title"},"What are your bullbear signals preferences:",-1)),R=["type","value","ms-field"],W=["for"],q=v(()=>r("a",{href:"https://discord.gg/HvXT6CdRWR",target:"_blank",class:"bullbear-signal__discord-link"}," Also, for Discord: connect to our Server ",-1));function z(a,e,l,X,G,p){return n(),u("div",j,[s(b,{label:"Back to Dashboard",type:"button",color:"primary",onClick:e[0]||(e[0]=t=>a.$router.push({name:"Dashboard"}))}),s(I,{class:"bullbear-signal__form-card"},{default:d(()=>[s(Q,null,{default:d(()=>[r("div",H,[s(w,{class:"bullbear-signal__logo",src:E,"spinner-color":"white"})]),P,s(F,{class:"q-gutter-md",onSubmit:e[1]||(e[1]=C(()=>{},["prevent"])),"ms-update":"profile"},{default:d(()=>[(n(!0),u(U,null,D(a.fields,(t,o)=>(n(),u("div",{key:o},[r("input",{type:t.type,value:t.value,"ms-field":o,hidden:"","aria-hidden":"true"},null,8,R),r("label",{for:o,class:"bullbear-signal__label"},$(t.label),9,W),t.type==="select"?(n(),g(V,{key:0,"emit-value":"","map-options":"",filled:"",id:o,"model-value":t.value,"onUpdate:modelValue":i=>p.updateFieldValue({value:i,name:o}),options:t.options,"transition-show":"jump-up","transition-hide":"jump-down"},null,8,["id","model-value","onUpdate:modelValue","options"])):t.type==="text"?(n(),g(B,{key:1,filled:"",id:o,"model-value":t.value,"onUpdate:modelValue":i=>p.updateFieldValue({value:i,name:o})},null,8,["id","model-value","onUpdate:modelValue"])):A("",!0)]))),128)),r("div",null,[q,s(b,{class:"bullbear-signal__submit-btn",label:"That looks about right",type:"submit",color:"primary"})])]),_:1})]),_:1})]),_:1})])}var ae=S(L,[["render",z],["__scopeId","data-v-b0269012"]]);export{ae as default};
