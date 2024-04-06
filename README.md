# Supercode TinyMCE Plugin

**SuperCode** is an enhanced source code editor plugin designed specifically for TinyMCE, the popular web-based WYSIWYG editor. This plugin provides users with a seamless experience for editing and displaying source code within the TinyMCE editor environment. (No ugly popup modal)

![chrome-capture-2024-4-7 (1)](https://github.com/prathamVaidya/supercode-tinymce-plugin/assets/61202986/eb519154-ac86-423a-8d63-450f174c7e4b)

## Features

Supercode internally uses Ace Editor to provide the following features:

- **Syntax Highlighting:** SuperCode offers syntax highlighting for a wide range of programming languages, making code easier to read and understand.
- **Code Formatting:** Users can format their code effortlessly with built-in formatting options, ensuring consistency and cleanliness.
- **Line Numbers:** SuperCode automatically adds line numbers to the code editor, aiding in navigation and reference.
- **Customizable Themes:** Users can choose from a variety of themes to customize the appearance of the ace code editor to suit their preferences.
- **Integration with TinyMCE:** SuperCode seamlessly integrates with TinyMCE, allowing users to insert and edit code directly within their content. The official and premium code plugins utilize a modal box, which can create a disruptive user experience for individuals who aim to seamlessly switch between both modes.
- **Markdown Editing:** SuperCode allows a parser and renderer to be passed as a configuration which can be used to convert TinyMCE into markdown editor or any editor.

## Installation

To install the SuperCode plugin, follow these steps:

1. Download the SuperCode plugin files (Plugin files in the `supercode` directory).
2. Upload the plugin files to your TinyMCE plugin directory.
3. Include the SuperCode plugin in your TinyMCE configuration.
4. Add the supercode in the toolbar.
5. Customize the plugin settings as needed.

## Usage

To use the SuperCode plugin in TinyMCE, simply:

1. Click on the SuperCode Toggle button in the TinyMCE toolbar or use Ctrl+Space to enter code mode.
2. The SuperCode source code editor will appear, allowing you to enter or edit code.
3. Make changes to your code as needed, utilizing the features provided by SuperCode.
4. Click again on the Supercode Toggle button or press escape or use Ctrl+Space shortcut to switch back to visual editing.


## Using as a Markdown Editor

SuperCode allows a parser method and renderer method to be passed as a configuration, this gives the ability to convert the languages when switching between visual and code mode. A good use case can be converting TinyMCE into a Markdown editor.

![chrome-capture-2024-4-7 (2)](https://github.com/prathamVaidya/supercode-tinymce-plugin/assets/61202986/00fb07c3-3ef9-485f-984c-5ce03b4a72e3)

## Configuration

Supercode is highly configurable. You can configure the SuperCode plugin by modifying the TinyMCE configuration options. There are many options but none of them are required. Here's an example configuration:

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
| theme           | The theme to be applied to the ace code editor.                                  | String           |
| fontSize        | The font size of the ace code editor.                                            | Number           |
| wrap            | Determines whether code lines should wrap or not.                                 | Boolean          |
| autocomplete    | Specifies whether autocomplete functionality is enabled.                          | Boolean          |
| iconName        | The name of the icon used for the SuperCode plugin in the toolbar.  [View Supported Icon List](https://www.tiny.cloud/docs/advanced/editor-icon-identifiers/)              | String           |
| parser          | The method used for converting HTML content back into the target language.        | Function         |
| renderer        | The method used for rendering the source language into HTML.                      | Function         |
| language        | The default language for syntax highlighting. [Supported Languages](https://cloud9-sdk.readme.io/docs/language-mode)                                     | String           |
| shortcut        | Specifies whether (Ctrl+Space) keyboard shortcuts are enabled.                                 | Boolean          |
| aceCss          | The custom CSS or CSS fonts to customize the appearance of the code editor.            | String           |
| fontFamily      | The font family applied to the code editor.                                       | String           |

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

SuperCode is compatible with the latest versions of TinyMCE and supports modern web browsers, ensuring a smooth editing experience for all users. I have only tested it on v7 till now. Create an issue if it has or has not worked for your version.

## Contributing

If you'd like to contribute to the development of SuperCode, please feel free to fork this repository and submit a pull request. We welcome any contributions or feedback to help improve the plugin.

## Support

For any questions, issues, or support requests related to SuperCode, please [contact us](mailto:hi@prathamvaidya.in). I'll be happy to help!

---
**SuperCode** - Enhanced Source Code Editor for TinyMCE
