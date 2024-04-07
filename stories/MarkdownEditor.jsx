import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import '../public/tinymce/tinymce.js'
import markdownIt from 'markdown-it'
import TurndownService from 'turndown';

const markdownToHtml = markdownIt()
const HtmlToMarkdown = new TurndownService();

// A function that renders markdown to HTML
const renderer = (markdownCode) => {
  return markdownToHtml.render(markdownCode);
};

// A function that converts HTML back to Markdown
const parser = (htmlCode) => {
  return HtmlToMarkdown.turndown(htmlCode);
};

/**
 * This Markdown editor is implemented using TinyMCE and Supercode.
 *  Using the `renderer` and `parser` methods TinyMCE can be converted
 *  into a format Editor for any language. Also note that few tools like 
 * indentation, text color, alignment has no effect on markdown, so its better to not add them in toolbar.
 */
export default function MarkdownEditor({ skin = 'oxide', initialValue}) {
  const editorRef = React.useRef(null);
  const [value, setValue] = React.useState(renderer(initialValue)); // the actual value will be HTML. Parse it when needed.

  React.useEffect(() => {
    console.log(parser(value));
  }, [value])

  return (
      <Editor
        onInit={(_, editor) => editorRef.current = editor}
        value={value}
        onEditorChange={(htmlCode) => {
          setValue(htmlCode);
        }}
        init={{
          plugins: [
            'autolink', 'lists', 'link', 'anchor', 'searchreplace', 'visualblocks', 'fullscreen',
            'table', 'help', 'supercode'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic underline' +
            '| bullist numlist | ' +
            'supercode',
          skin,
          base_url: '/tinymce',
          promotion: false,
          statusbar: false,
          menubar: false,
          highlight_on_focus: false,
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          supercode: {
            renderer: renderer, // Function : Markdown => HTML 
            parser: parser, // Function: HTML => Markdown
            fontSize: 14,
            language: 'markdown', // Uses 'markdown' language for code highlighting and autocomplete
          },
        }}
      />
  );
}