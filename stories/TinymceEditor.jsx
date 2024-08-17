import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import '../public/tinymce/tinymce.js'

const sizes = {
  'none': {
  
  },
  'sm' : {
    width: 100,
    height: 500
  },
  'md' : {
    width: 1000,
    height: 500
  },
  'lg' : {
    width: 1000,
    height: 500
  }
}

const modes = {
    "super" : {
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'anchor',
        'searchreplace', 'visualblocks', 'table', 'help', 'supercode'
      ],
      toolbar: 'undo redo | blocks | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'codeeditor | supercode',
        supercode: {
          fontSize: 12,
        }
    },
    "classic" : {
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'anchor',
        'searchreplace', 'visualblocks', 'table', 'help', 'code'
      ],
      toolbar: 'undo redo | blocks | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'codeeditor | code',
    }
  }

export default function TinymceEditor({ skin = 'oxide', mode, value, size = 'none'}) {
  const editorRef = useRef(null);

    const commonConfiguration = {
    skin,
    base_url: '/tinymce',
    promotion: false,
    statusbar: false,
    menubar: false,
    highlight_on_focus: false,
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

      }



  React.useEffect(() => {
    console.debug('skin reloaded');
  }, [skin])

  return (
    <>
      <Editor
        onInit={(_, editor) => editorRef.current = editor}
        initialValue={value ?? "<h1>Hello World</h1><p>This is the initial content of the editor.</p>"}
        init={{...commonConfiguration, ...modes[mode], width: sizes[size].width, height: sizes[size].height}}
      />
    </>
  );
}