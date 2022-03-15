import{r as B,v as E,G as P,H as R,k as V,h as q,g as I,t as Q}from"./quasar.c7fe1536.js";import{c as k,i as O,s as F,X as j}from"./index.c74345e2.js";import{h as D}from"./QInput.a6e2b53c.js";var M=k({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validation-success","validation-error"],setup(n,{slots:S,emit:m}){const C=I(),f=B(null);let u=0;const r=[];function v(e){const o=[],l=typeof e=="boolean"?e:n.noErrorFocus!==!0,b=++u,d=(s,t)=>{m("validation-"+(s===!0?"success":"error"),t)};for(let s=0;s<r.length;s++){const t=r[s],a=t.validate();if(typeof a.then=="function")o.push(a.then(i=>({valid:i,comp:t}),i=>({valid:!1,comp:t,err:i})));else if(a!==!0){if(n.greedy===!1)return d(!1,t),l===!0&&typeof t.focus=="function"&&t.focus(),Promise.resolve(!1);o.push({valid:!1,comp:t})}}return o.length===0?(d(!0),Promise.resolve(!0)):Promise.all(o).then(s=>{const t=s.filter(A=>A.valid!==!0);if(t.length===0)return b===u&&d(!0),!0;const{valid:a,comp:i,err:x}=t[0];return b===u&&(x!==void 0&&console.error(x),d(!1,i),l===!0&&a!==!0&&typeof i.focus=="function"&&i.focus()),!1})}function p(){u++,r.forEach(e=>{typeof e.resetValidation=="function"&&e.resetValidation()})}function g(e){e!==void 0&&F(e);const o=u+1;v().then(l=>{o===u&&l===!0&&(n.onSubmit!==void 0?m("submit",e):e!==void 0&&e.target!==void 0&&typeof e.target.submit=="function"&&e.target.submit())})}function h(e){e!==void 0&&F(e),m("reset"),Q(()=>{p(),n.autofocus===!0&&n.noResetFocus!==!0&&c()})}function c(){D(()=>{if(f.value===null)return;const e=f.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(f.value.querySelectorAll("[tabindex]"),o=>o.tabIndex>-1);e!=null&&e.focus({preventScroll:!0})})}E(j,{bindComponent(e){r.push(e)},unbindComponent(e){const o=r.indexOf(e);o>-1&&r.splice(o,1)}});let y=!1;return P(()=>{y=!0}),R(()=>{y===!0&&n.autofocus===!0&&c()}),V(()=>{n.autofocus===!0&&c()}),Object.assign(C.proxy,{validate:v,resetValidation:p,submit:g,reset:h,focus:c,getValidationComponents:()=>r}),()=>q("form",{class:"q-form",ref:f,onSubmit:g,onReset:h},O(S.default))}});export{M as Q};
