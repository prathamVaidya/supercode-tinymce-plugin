# Supercode TinyMCE Plugin

**Supercode** is an enhanced source code editor plugin for TinyMCE, the popular web-based WYSIWYG editor. This plugin provides users with a seamless experience for editing and displaying source code within the TinyMCE editor environment. Supported on tinyMCE versions `v5`, `v6` and `v7`.

![chrome-capture-2024-4-7 (1)](https://github.com/prathamVaidya/supercode-tinymce-plugin/assets/61202986/eb519154-ac86-423a-8d63-450f174c7e4b)

[![View Demo](https://img.shields.io/badge/View%20Demo-2ecc71?style=for-the-badge)](https://supercode.prathamvaidya.in/iframe.html?args=&globals=backgrounds.grid:!true&id=supercode-tinymceeditor--supercode-plugin&viewMode=story)       

[![Storybook](https://img.shields.io/badge/View%20Storybook-ff4785?style=for-the-badge&logo=storybook&logoColor=fff)](https://supercode.prathamvaidya.in)

## Features

Supercode internally uses [Ace Editor](https://github.com/ajaxorg/ace) to provide the following features:

- **Syntax Highlighting:** Supercode offers syntax highlighting for a wide range of programming languages, making code easier to read and understand.
- **Code Formatting:** Users can format their code effortlessly with built-in formatting options, ensuring consistency and cleanliness.
- **Line Numbers:** Supercode automatically adds line numbers to the code editor, aiding in navigation and reference.
- **Customizable Themes:** Users can choose from a variety of themes to customize the appearance of the ace code editor to suit their preferences.
- **Integration with TinyMCE:** Supercode seamlessly integrates with TinyMCE, allowing users to insert and edit code directly within their content. The official and premium code plugins utilize a modal box, which can create a disruptive user experience for individuals who aim to seamlessly switch between both modes.
- **Markdown Editing:** Supercode allows a parser and renderer to be passed as a configuration which can be used to convert TinyMCE into markdown editor or any editor.

## Installation

To install the Supercode plugin, follow these steps:

1. Download the Supercode plugin files (Plugin files in the `supercode` directory).
2. Upload the plugin files (`supercode` folder) to your TinyMCE plugin directory. (In `tinymce/plugins`)
3. Include the Supercode plugin in your TinyMCE configuration.
4. Add the supercode in the toolbar.
5. Customize the plugin settings as needed.

## Usage

To use the Supercode plugin in TinyMCE, simply:

1. Click on the Supercode Toggle button in the TinyMCE toolbar or use Ctrl+Space to enter code mode.
2. The Supercode source code editor will appear, allowing you to enter or edit code.
3. Make changes to your code as needed, utilizing the features provided by Supercode.
4. Click again on the Supercode Toggle button or press escape or use Ctrl+Space shortcut to switch back to visual editing.

## Using Modal Dialog box

Supercode uses [Custom View](https://www.tiny.cloud/docs/tinymce/latest/custom-view/) to view source code in tinymce editor itself. This Custom View is not supported on older version `<=v5` and in `inline` mode. A modal dialog is used as a fallback in case `Custom Views` is not available or `fallbackModal` is set to `true`.

This modal can be customized using following modal related options like `fallbackModal`, `modalPrimaryColor`, `modalSecondaryColor`, `dark`.

![chrome-capture-2024-4-19 (1)](https://github.com/prathamVaidya/supercode-tinymce-plugin/assets/61202986/3f8cc702-442a-4eb9-8a91-e3db5c640229)

## Using as a Markdown Editor

Supercode allows a parser method and renderer method to be passed as a configuration, this gives the ability to convert the languages when switching between visual and code mode. A good use case can be converting TinyMCE into a Markdown editor.

The basic implementation will look like this :
```jsx
<Editor
      value={value}
      onEditorChange={(htmlCode) => {
        setValue(htmlCode);
      }}
      init={{
        plugins: [
          'supercode'
        ],
        toolbar: 'supercode',
        supercode: {
          renderer: renderer, // Function : Markdown => HTML 
          parser: parser, // Function: HTML => Markdown
          language: 'markdown', // Uses 'markdown' language for code highlighting and autocomplete
        },
      }}
      />

```

[![View Markdown](https://img.shields.io/badge/View%20Markdown%20Demo-2ecc71?style=for-the-badge)](https://supercode.prathamvaidya.in/?path=/story/supercode-markdowneditor--supercode-plugin&globals=backgrounds.grid:!true)       

![chrome-capture-2024-4-7 (2)](https://github.com/prathamVaidya/supercode-tinymce-plugin/assets/61202986/00fb07c3-3ef9-485f-984c-5ce03b4a72e3)

## Configuration

Supercode is highly configurable. You can configure the Supercode plugin by modifying the TinyMCE configuration options. There are many options but none of them are required. Here's an example configuration:

```javascript
tinymce.init({
  selector: 'textarea',
  plugins: 'supercode',
  toolbar: 'supercode',
  supercode: {
    theme: 'chrome',
    fontSize: 14,
    wrap: true,
    autocomplete: true,
    iconName: 'sourcecode',
    parser: myParserFunction,
    renderer: myRendererFunction,
    language: 'html',
    shortcut: true,
    aceCss: 'your custom CSS rules or fonts for ace',
    fontFamily: 'Monospace',
  }
});
```

Here are all the configurations

| Option          | Description                                                                      | Data Type        |
|-----------------|----------------------------------------------------------------------------------|------------------|
| `theme`           | The theme to be applied to the ace code editor.                                  | String           |
| `fontSize`        | The font size of the ace code editor.                                            | Number           |
| `wrap`            | Determines whether code lines should wrap or not.                                 | Boolean          |
| `autocomplete`    | Specifies whether autocomplete functionality is enabled.                          | Boolean          |
| `iconName`        | The name of the icon used for the Supercode plugin in the toolbar.  [View Supported Icon List](https://www.tiny.cloud/docs/advanced/editor-icon-identifiers/)              | String           |
| `parser`          | The method used for converting HTML content back into the target language.        | Function         |
| `renderer`        | The method used for rendering the source language into HTML.                      | Function         |
| `language`        | The default language for syntax highlighting. [Supported Languages](https://cloud9-sdk.readme.io/docs/language-mode)                                     | String           |
| `shortcut`        | Specifies whether (Ctrl+Space) keyboard shortcuts are enabled.                                 | Boolean          |
| `aceCss`          | The custom CSS or CSS fonts to customize the appearance of the code editor.            | String           |
| `fontFamily`      | The font family applied to the code editor.                                       | String           |
| `fallbackModal`      | Set it to true to explicitly use code editor in modal dialog. Defaults to automatic detection.                                       | String           |
| `modalPrimaryColor`      | Modal Primary color if using custom tinymce skin editor.                                       | String           |
| `modalSecondaryColor`      | Modal Secondary color if using custom tinymce skin editor.                                       | String           |
| `dark`      | Set `true` if your modal primary color is dark to add matching border editor.                                       | String           |
| `debug`      | Set `false` to disable debug warnings. Default `false` editor.                                       | String           |

# Editor Themes

All the ace themes are supported. You can try out the themes [here](https://ace.c9.io/build/kitchen-sink.html). Here is a list to choose from: 

### Light Themes

| theme                | Name              |
|--------------------|--------------------|
| chrome             | Chrome             |
| clouds             | Clouds             |
| crimson_editor     | Crimson Editor     |
| dawn               | Dawn               |
| dreamweaver        | Dreamweaver        |
| eclipse            | Eclipse            |
| github             | GitHub             |
| iplastic           | IPlastic           |
| katzenmilch        | KatzenMilch        |
| kuroir             | Kuroir             |
| solarized_light    | Solarized Light    |
| sqlserver          | SQL Server         |
| textmate           | TextMate           |
| tomorrow           | Tomorrow           |
| xcode              | XCode              |

### Dark Themes

| theme                     | Name                   |
|-------------------------|-------------------------|
| ambiance                | Ambiance                |
| chaos                   | Chaos                   |
| clouds_midnight         | Clouds Midnight         |
| cobalt                  | Cobalt                  |
| dracula                 | Dracula                 |
| gob                     | Green on Black          |
| gruvbox                 | Gruvbox                 |
| idle_fingers            | idle Fingers            |
| kr_theme                | krTheme                 |
| merbivore               | Merbivore               |
| merbivore_soft          | Merbivore Soft          |
| mono_industrial         | Mono Industrial         |
| monokai                 | Monokai                 |
| pastel_on_dark          | Pastel on Dark          |
| solarized_dark          | Solarized Dark          |
| terminal                | Terminal                |
| tomorrow_night          | Tomorrow Night          |
| tomorrow_night_blue     | Tomorrow Night Blue     |
| tomorrow_night_bright   | Tomorrow Night Bright   |
| tomorrow_night_eighties | Tomorrow Night 80s      |
| twilight                | Twilight                |
| vibrant_ink             | Vibrant Ink             |

## Compatibility

Supercode is compatible with the latest versions of TinyMCE and supports all the themes. It has been tested on `v5`, `v6` and `v7` of tinyMCE. In `v5` the in-editor integration is not supported so a fallback modal is always used. It is not tested on older versions that are less than `v5`. If you have tested on any older versions then please create an issue and let us know.

## Todos

- [x] Added parser and renderer
- [ ] Add i18n support for localization
- [ ] Allow Custom Key bindings
- [ ] Preserve cursor position on mode change
- [ ] Resize support for Supercode editor. (Current behavior: supercode will not resize until user goes back to TinyMCE visual mode)
- [ ] Optimizations for Markdown editor

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=prathamVaidya/supercode-tinymce-plugin&type=Date)](https://star-history.com/#prathamVaidya/supercode-tinymce-plugin&Date)

## Contributing

If you'd like to contribute to the development of Supercode, please feel free to fork this repository and submit a pull request. We welcome any contributions or feedback to help improve the plugin.

## Support

For any questions, issues, or support requests related to Supercode, please feel free to [contact me](mailto:hi@prathamvaidya.in). I'll be happy to help!

## Special Thanks

Took some inspiration from this [Advanced Source Code Editor plugin](https://github.com/melquibrito/source-code-editor-tinymce-plugin) made by [@melquibrito](https://github.com/melquibrito).

---
**Supercode** - Enhanced Source Code Editor for TinyMCE
