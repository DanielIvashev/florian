var g=Object.defineProperty;var d=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var i=(s,e,o)=>e in s?g(s,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[e]=o,p=(s,e)=>{for(var o in e||(e={}))f.call(e,o)&&i(s,o,e[o]);if(d)for(var o of d(e))h.call(e,o)&&i(s,o,e[o]);return s};import{_ as y,a2 as w,q as b,a3 as v,o as V}from"./index.c74345e2.js";import{Q as n}from"./QInput.a6e2b53c.js";import{Q as U}from"./QForm.8199377d.js";import{a as m,Q as u}from"./QCard.296eb1f0.js";import{D as Q,x as S,I as F,A as r,p as t,z as l,U as I,B as C,C as k,E as _}from"./quasar.c7fe1536.js";const{mapFields:B}=w({getterType:"auth/getField",mutationType:"auth/updateField"}),z={name:"SignUp",computed:p({},B(["signUpForm.email","signUpForm.password","signUpForm.name"])),methods:{}},$=s=>(C("data-v-a3cd04c2"),s=s(),k(),s),N={class:"sign-up"},P={class:"sign-up__wrapper"},T={class:"sign-up__logo-wrapper"},Y=$(()=>r("h4",{class:"sign-up__title"},"Create an account",-1)),q={class:"sign-up__have-account-text"},x=_(" Already a member? "),A=_(" Log in here ");function E(s,e,o,L,D,H){const c=Q("router-link");return S(),F("div",N,[r("div",P,[t(u,{class:"sign-up__form-card"},{default:l(()=>[t(m,null,{default:l(()=>[r("div",T,[t(b,{class:"sign-up__logo",src:v,"spinner-color":"white"})]),Y,t(U,{class:"q-gutter-md","data-ms-form":"signup",onSubmit:e[3]||(e[3]=I(()=>{},["prevent"]))},{default:l(()=>[t(n,{filled:"","data-ms-member":"name",modelValue:s.name,"onUpdate:modelValue":e[0]||(e[0]=a=>s.name=a),label:"Your name *","lazy-rules":"",rules:[a=>a&&a.length>0||"Please type something"]},null,8,["modelValue","rules"]),t(n,{filled:"",modelValue:s.email,"onUpdate:modelValue":e[1]||(e[1]=a=>s.email=a),"data-ms-member":"email",label:"Your email *","lazy-rules":"",rules:[a=>a&&a.length>0||"Please type something"]},null,8,["modelValue","rules"]),t(n,{filled:"",modelValue:s.password,"onUpdate:modelValue":e[2]||(e[2]=a=>s.password=a),type:"password","data-ms-member":"password",label:"Your password *","lazy-rules":"",rules:[a=>a&&a.length>0||"Please type something"]},null,8,["modelValue","rules"]),r("div",null,[t(V,{label:"Submit",type:"submit",color:"primary",style:{width:"100%"}})])]),_:1})]),_:1})]),_:1}),t(u,{class:"sign-up__have-account-card"},{default:l(()=>[t(m,null,{default:l(()=>[r("b",q,[x,t(c,{to:{name:"Login"},class:"sign-up__have-account-link"},{default:l(()=>[A]),_:1})])]),_:1})]),_:1})])])}var R=y(z,[["render",E],["__scopeId","data-v-a3cd04c2"]]);export{R as default};