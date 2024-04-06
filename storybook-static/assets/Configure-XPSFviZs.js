import{r as a}from"./index-BBkUAzwr.js";import{useMDXComponents as l}from"./index-z5U8iC57.js";import{M as f}from"./index-CjuFu3ws.js";import"./iframe-BX350Blt.js";import"../sb-preview/runtime.js";import"./index-PqR-_bA4.js";import"./index-B_J8iUie.js";import"./index-DrlA5mbP.js";import"./index-DrFu-skq.js";var u={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var x=a,_=Symbol.for("react.element"),h=Symbol.for("react.fragment"),j=Object.prototype.hasOwnProperty,y=x.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,v={key:!0,ref:!0,__self:!0,__source:!0};function d(t,e,p){var r,n={},i=null,m=null;p!==void 0&&(i=""+p),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(m=e.ref);for(r in e)j.call(e,r)&&!v.hasOwnProperty(r)&&(n[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)n[r]===void 0&&(n[r]=e[r]);return{$$typeof:_,type:t,key:i,ref:m,props:n,_owner:y.current}}s.Fragment=h;s.jsx=d;s.jsxs=d;u.exports=s;var o=u.exports;function c(t){const e={h1:"h1",p:"p",...l(),...t.components};return o.jsxs(o.Fragment,{children:[o.jsx(f,{title:"Testing Supercode"}),`
`,o.jsx("div",{className:"sb-container",children:o.jsxs("div",{className:"sb-section-title",children:[o.jsx(e.h1,{id:"testing-supercode-plugin",children:"Testing Supercode Plugin"}),o.jsx(e.p,{children:"We use storybook to test and work on the plugin during development."})]})})]})}function C(t={}){const{wrapper:e}={...l(),...t.components};return e?o.jsx(e,{...t,children:o.jsx(c,{...t})}):c(t)}export{C as default};
