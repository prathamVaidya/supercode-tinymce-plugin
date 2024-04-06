import TinymceEditor from "./TinymceEditor";

export default {
  title: 'Supercode/TinymceEditor',
  component: TinymceEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const ClassicPlugin = {
  args: {
    mode: 'classic',
    skin: 'oxide',
    value: '<h1>Classic Code Plugin</h1><p>This editor is using the classic code plugin that ships with TinyMCE.</p>',
  },
  argTypes: {
    skin: {
      options: ['oxide', 'oxide-dark'],
      control: { type: 'select' }
    }
  }
};

export const SupercodePlugin = {
  args: {
    mode: 'super',
    skin: 'oxide',
    value: '<h1>New Supercode Plugin</h1><p>This editor is using the supercode plugin which provides more powerful Source Code Editing. Use the code icon or Ctrl+Space to toggle between Editing Modes.</p>'
  },
  argTypes: {
    skin: {
      options: ['oxide', 'oxide-dark'],
      control: { type: 'select' }
    }
  }
};