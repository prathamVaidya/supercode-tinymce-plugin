import{r as b,R as e}from"./index-BBkUAzwr.js";import{E as x}from"./tinymce-oI5Eg39T.js";import"./index-_4_hgnnR.js";const n={none:{},sm:{width:100,height:500},md:{width:1e3,height:500},lg:{width:1e3,height:500}};function p({skin:t="oxide",mode:h,value:g,size:s="none"}){const m=b.useRef(null),f={skin:t,base_url:"/tinymce",promotion:!1,statusbar:!1,menubar:!1,highlight_on_focus:!1,content_style:"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"},y={super:{plugins:["advlist","autolink","lists","link","image","charmap","preview","anchor","searchreplace","visualblocks","code","fullscreen","insertdatetime","media","table","code","help","supercode"],toolbar:"undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | codeeditor | supercode"},classic:{plugins:["advlist","autolink","lists","link","image","charmap","preview","anchor","searchreplace","visualblocks","code","fullscreen","insertdatetime","media","table","code","help","code"],toolbar:"undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | codeeditor | code"}};return e.useEffect(()=>{console.debug("skin reloaded")},[t]),e.createElement(e.Fragment,null,e.createElement(x,{onInit:(w,k)=>m.current=k,initialValue:g??"<h1>Hello World</h1><p>This is the initial content of the editor.</p>",init:{...f,...y[h],width:n[s].width,height:n[s].height}}))}p.__docgenInfo={description:"",methods:[],displayName:"TinymceEditor",props:{skin:{defaultValue:{value:"'oxide'",computed:!1},required:!1},size:{defaultValue:{value:"'none'",computed:!1},required:!1}}};const C={title:"Supercode/TinymceEditor",component:p,parameters:{layout:"centered"},tags:["autodocs"]},i={args:{mode:"classic",skin:"oxide",value:"<h1>Classic Code Plugin</h1><p>This editor is using the classic code plugin that ships with TinyMCE.</p>"},argTypes:{skin:{options:["oxide","oxide-dark"],control:{type:"select"}}}},o={args:{mode:"super",skin:"oxide",value:"<h1>New Supercode Plugin</h1><p>This editor is using the supercode plugin which provides more powerful Source Code Editing. Use the code icon or Ctrl+Space to toggle between Editing Modes.</p>"},argTypes:{skin:{options:["oxide","oxide-dark"],control:{type:"select"}}}};var r,l,a;i.parameters={...i.parameters,docs:{...(r=i.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    mode: 'classic',
    skin: 'oxide',
    value: '<h1>Classic Code Plugin</h1><p>This editor is using the classic code plugin that ships with TinyMCE.</p>'
  },
  argTypes: {
    skin: {
      options: ['oxide', 'oxide-dark'],
      control: {
        type: 'select'
      }
    }
  }
}`,...(a=(l=i.parameters)==null?void 0:l.docs)==null?void 0:a.source}}};var d,c,u;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    mode: 'super',
    skin: 'oxide',
    value: '<h1>New Supercode Plugin</h1><p>This editor is using the supercode plugin which provides more powerful Source Code Editing. Use the code icon or Ctrl+Space to toggle between Editing Modes.</p>'
  },
  argTypes: {
    skin: {
      options: ['oxide', 'oxide-dark'],
      control: {
        type: 'select'
      }
    }
  }
}`,...(u=(c=o.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};const S=["ClassicPlugin","SupercodePlugin"];export{i as ClassicPlugin,o as SupercodePlugin,S as __namedExportsOrder,C as default};
