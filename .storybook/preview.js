/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    backgrounds:{
      default: 'dark',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
