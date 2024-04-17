import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import '../public/tinymce/tinymce.js'

/**
 * Supercode utilizes an elegant modal as a fallback when tinymce editor version is below v5 where 'Custom Views' are not supported or editor is set to inline mode. 
 */

export default function TinymceEditor({ skin = 'oxide', value}) {
  const commonConfiguration = {
    skin,
    base_url: '/tinymce',
    promotion: false,
    statusbar: false,
    menubar: false,
    highlight_on_focus: false,
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
  }

  return (
    <div style={{background: 'white', color: ' #283747 ', padding: '1rem', borderRadius: '1rem', maxWidth: '50rem'}}>
      <div style={{display: 'flex', gap: '15px'}}>
      <h1>Subject: </h1>
      <Editor
          inline
          initialValue={"<h1>An Open letter to John Doe</h1>"}
          init={{...commonConfiguration, 
                plugins: [
                'advlist', 'autolink', 'lists', 'link', 'anchor',
                'searchreplace', 'visualblocks', 'table', 'help', 'supercode'
              ],
              toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'supercode',
              highlight_on_focus: false,
            }}
        />
      </div>
      <h4>Write your content below</h4>
      <div style={{background: '  #eaeded ', padding: '0.5rem', borderRadius: '5px', marginBottom: '1.5rem'}}>
        <Editor
          inline
          initialValue={value ?? "<h1>Hello World</h1><p>This is the initial content of the editor.</p>"}
          init={{...commonConfiguration, 
                plugins: [
                'advlist', 'autolink', 'lists', 'link', 'anchor',
                'searchreplace', 'visualblocks', 'table', 'help', 'supercode'
              ],
              toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'supercode',
              highlight_on_focus: false,
            }}
        />
      </div>
    </div>
  );
}