import MarkdownEditor from "./MarkdownEditor";

export default {
  title: 'Supercode/MarkdownEditor',
  component: MarkdownEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

const content = `# My Markdown Example

This is a **bold** and *italic* paragraph with _underlined_ text. 

## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

Here's a list:
1. Item 1
2. Item 2
3. Item 3

Here's some \`inline code\` for you.

\`\`\`python
def greet():
    print("Hello, world!")
\`\`\`

End of File, Bye
`

export const SupercodePlugin = {
  args: {
    skin: 'oxide',
    initialValue: content
  },
  argTypes: {
    skin: {
      options: ['oxide', 'oxide-dark'],
      control: { type: 'select' }
    }
  }
};