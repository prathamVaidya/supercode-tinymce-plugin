! function() {
    "use strict";

    /**
        modal ->
     {
        element : Modal Container Ref
        editor : Ace Editor
     }
     */
    
    const MODAL_HTML = `
    <div id="supercode-backdrop"></div>
    <div id="supercode-modal">
        <div id="supercode-header">
            <h1>Source Code Editor</h1>
            <button id="supercode-close-btn">
                Close
            </button>
        </div>
        <div id="supercode-editor"></div>
    </div>
`

    const MODAL_CSS = `

    /* Media query for mobile devices */
    @media only screen and (max-width: 767px) {
        #supercode-modal {
            width: 100% !important;
            height: 100% !important;
            border-radius: 0 !important;
        }
    }
    .disable-scroll {
        overflow: hidden;
    }
    #supercode-modal-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 990;
        display: none;
        opacity: 0;
        transition: opacity 0.1s linear;
    }
    #supercode-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        background: black;
        opacity: 0.8;
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    #supercode-modal {
        width: 90%;
        height: 80%;
        max-width: 1200px;
        z-index: 2;
        overflow: hidden;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
    }
    #supercode-header {
        display: flex;
        padding: 0.5rem 1rem;
        border-bottom: 1px solid #ebebeb;
    }
    #supercode-modal h1 {
        flex-grow: 1;
        margin: auto;
        font-size: 14px;
    }
    #supercode-modal button {
        background: none;
        border: none;
        padding: 0;
        height: 100%;
        cursor:pointer;
    }
    #supercode-editor {
        width: 100%;
        height: 100%;
        position: relative;
    }
`

    let modal = null;

    const initDependencies = (config) => {
        const scripts = {
           "ace-default" : {
                url: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.9.6/ace.js',
                loaded: false,
                required: true,
            }, 
           "beautify-html" : {
                url: 'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.15.1/beautify-html.min.js',
                loaded: false,
                required: true,
            },
           "ace-autocomplete" : {
                url: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.9.6/ext-language_tools.min.js',
                loaded: false,
                required: false,
            }, 
        }

        if(config.autocomplete){
            scripts['ace-autocomplete'].required = true;
        }

        Object.values(scripts).forEach((script) => {
            if (script.loaded) return;
            let element = document.createElement('script');
            element.src = script.url;
            element.type = "text/javascript";
            document.body.appendChild(element);
        })
    }

    const injectCSS = (css) => {
        const style = document.createElement('style');
        style.innerHTML = css;
        document.head.append(style);
    }

    // on plugin load
    const mainPlugin = function(editor) {

        let editorWidth = 0, originalHeader, isScreenSizeChanged = false, session, aceEditor;
        const Config = {
            theme: 'chrome',
            fontSize: 14, // in px
            wrap: true,
            icon: undefined, // auto set during config
            iconName: 'sourcecode',
            autocomplete: false,
            language: 'html',
            renderer: null,
            parser: null,
            shortcut: true,
            aceCss: null,
            fontFamily: null,
            fallbackModal: false, // enabled in cases like inline, or versions where `CustomView` is not supported.
            modalPrimaryColor: '#ffffff',
            modalSecondaryColor: '#222f3e'
        }

        // Get Configurations
        const setConfig = (editor) => {
            const supercodeOptions = editor.getParam('supercode');
        
            if (supercodeOptions && typeof supercodeOptions === "object") {
                for (const key in supercodeOptions) {
                    if (supercodeOptions.hasOwnProperty(key)) {
                        const value = supercodeOptions[key];
                        
                        switch (key) {
                            case 'theme':
                            case 'language':
                            case 'iconName':
                            case 'aceCss':
                            case 'fontFamily':
                            case 'modalPrimaryColor':
                            case 'modalSecondaryColor':
                                if (typeof value === "string") {
                                    Config[key] = value;
                                }
                                break;
                            case 'fontSize':
                                if (typeof value === "number" && value > 0) {
                                    Config.fontSize = parseInt(value);
                                }
                                break;
                            case 'wrap':
                            case 'autocomplete':
                            case 'shortcut':
                            case 'fallbackModal':
                                if (typeof value === "boolean") {
                                    Config[key] = value;
                                }
                                break;
                            case 'parser':
                            case 'renderer':
                                if (typeof value === "function") {
                                    Config[key] = value;
                                }
                                break;
                            default:
                                // Ignore unrecognized options
                                break;
                        }
                    }
                }
            }
            
            // Set plugin icon
            Config.icon = editor.ui.registry.getAll().icons[Config.iconName];
            if (!Config.icon) {
                throw new Error("Supercode Icon name is invalid");
            }

            
            // Detect and set fallback model if its required
            if(!Config.fallbackModal){
                // case: inline mode, < v5
                if(editor.getParam('inline') === true || tinymce.majorVersion < 5){
                    Config.fallbackModal = true
                }
            }

        }
        
        const setAceOptions = () => {
            const options = {};

            if(Config.autocomplete){
                options.enableLiveAutocompletion = true;
            }

            if(Config.fontFamily){
                options.fontFamily = Config.fontFamily;
            }

            aceEditor.setOptions(options);
            aceEditor.setTheme(`ace/theme/${Config.theme}`);
            aceEditor.setFontSize(Config.fontSize);
            aceEditor.setShowPrintMargin(false);
        }

        // Builds ace editor only on the first run 
        const buildAceEditor = (view) => {
            // Attach Ace Editor to shadow dom to prevent tinymce css affecting it
            view.attachShadow({ mode: 'open' });
            
            if(Config.aceCss){
                const sheet = new CSSStyleSheet()
                sheet.replaceSync(Config.aceCss);
                view.shadowRoot.adoptedStyleSheets.push(sheet);
            }

            view.shadowRoot.innerHTML = `<div class="supercode-editor" style="width: 100%; height: 100%; position: absolute; left:0; top:0"></div>`;
            const editorElement = view.shadowRoot.querySelector('.supercode-editor');

            editorElement.style.width = '100%';
            editorElement.style.height = '100%';
            aceEditor = ace.edit(editorElement);
            // https://github.com/josdejong/jsoneditor/issues/742#issuecomment-698449020
            aceEditor.renderer.attachToShadowRoot();
            setAceOptions();
        }

        const setHeader = (view, originalHeader, onSave) => {
            // add a copy of original header to give original header look
            const newHeader = originalHeader.cloneNode(true);
            newHeader.style.position = 'relative';
            // If menu-bar exists utilize the space to show Title "Source Code Editor"
            const menubar = newHeader.querySelector('.tox-menubar');
            if(menubar){
                menubar.innerHTML = `<b style='font-size: 14px; font-weight: bold; padding: 9px;'>Source Code Editor</b>`
            }

            // hide all the buttons except supercode button, attach event listener
            let isOverflow = true;
            newHeader.querySelectorAll('.tox-tbtn, .tox-split-button').forEach((btn) => {
                if(btn.getAttribute('data-mce-name') != 'supercode'){
                    // remove overflow button to make space for code button
                    if(btn.getAttribute('data-mce-name') === 'overflow-button'){
                        btn.style.display = 'none';
                        btn.removeAttribute('data-mce-name')
                        return;
                }
                    btn.classList.remove('tox-tbtn--enabled');
                    btn.classList.add('tox-tbtn--disabled');
                    btn.removeAttribute('data-mce-name');
                }
                else{
                    isOverflow = false;
                    btn.setAttribute('data-mce-name', 'supercode-toggle')
                    btn.classList.add('tox-tbtn--enabled');
                    btn.onclick = onSave;
                }
            });

            // in case of overflow, button is inside a floating toolbar
            if(isOverflow){
                const div = document.createElement('div')
                div.classList = 'tox-toolbar__group';
                div.style.position = 'absolute';
                div.style.right = 0;
                div.style.height = '100%';
                const button = document.createElement('button');
                button.classList = 'tox-tbtn tox-tbtn--enabled';
                button.innerHTML = `<span class="tox-icon tox-tbtn__icon-wrap">${Config.icon}</span>`;
                button.onclick = onSave;
                div.append(button);
                newHeader.append(div);
            }
            view.innerHTML = ''; // delete any existing header
            view.append(newHeader);
        }

        const setMainView = (view, width) => {
            // configure body of view to look similar to tinymce body, adds ace editor

            view.style.width = width+'px';
            view.style.height = '100%';
            view.style.position = 'relative';
            
            buildAceEditor(view);
        }

        setConfig(editor);
        initDependencies(Config);

        // todo: fix event listener issue
        // const modalKeydownListener = (e) => {
        //     if((e.key === ' ' && e.ctrlKey) || e.key === 'Escape') {
        //         hideModal();
        //     }
        // };

        const showModal = () => {
            if(!modal){
                // Build Modal
                const modalContainer = document.createElement('div');
                modalContainer.id = 'supercode-modal-container';
                modalContainer.innerHTML = MODAL_HTML
    
                injectCSS(MODAL_CSS);
    
                document.body.append(modalContainer);
                modal = {
                    element: modalContainer,
                    editor: ace.edit(modalContainer.querySelector('#supercode-editor'))
                }
            }

            // transfer global editor in active scope (All methods work on local scope and need aceEditor)
            aceEditor = modal.editor;
            setAceOptions(); // update ace options according to current editor configs

            /* Update Event Listeners */
            modal.element.querySelector('#supercode-backdrop').onclick = hideModal;
            modal.element.querySelector('button').onclick = hideModal;
            // modal.element.querySelector('#supercode-editor').addEventListener('keydown', modalKeydownListener);

            /* Update Modal based on editor's theme */
            document.querySelector('body').classList.add('disable-scroll');
            document.querySelector('#supercode-modal').style.background = Config.modalPrimaryColor
            document.querySelector('#supercode-header').style.color = Config.modalSecondaryColor
            document.querySelector('#supercode-close-btn').innerHTML = editor.ui.registry.getAll().icons['close']
            document.querySelector('#supercode-close-btn').style.fill = Config.modalSecondaryColor
            modal.element.style.display = 'flex';
            setTimeout(() => {
                modal.element.style.opacity = 1;
            }, 10)

            /* Load current editor's ace session into aceEditor */
            loadAceSession();
        }

        const hideModal = () => {
            // removeEventListener('keydown', modalKeydownListener);
            onSaveHandler();
            document.querySelector('body').classList.remove('disable-scroll');
            modal.element.style.opacity = 0;
            setTimeout(() => {
                modal.element.style.display = 'none';
            }, 10)
        }
    
        const onSaveHandler = () => {
            editor.focus();
            editor.undoManager.transact(function() {
            let value = aceEditor.getValue();
            if(Config.renderer){
                value = Config.renderer(value);
            }
            editor.setContent(value);
            });
            editor.selection.setCursorLocation();
            editor.nodeChanged();
            editor.execCommand('ToggleView', false, 'supercode');
        }

        const onKeyDownHandler = (e) => {
            if((e.key === ' ' && e.ctrlKey) || e.key === 'Escape'){
                onSaveHandler();
            }
        };

        const getSourceCode = (value) => {
            if(Config.parser){
                return Config.parser(value);
            }
            return html_beautify(value);
        }

        const loadAceSession = () => {
            // Load or build new ace session from editor
            let content = getSourceCode(editor.getContent());
            if(!session){
                session = ace.createEditSession(content, `ace/mode/${Config.language}`);
                session.setUseWrapMode(Config.wrap);
            }
            aceEditor.setSession(session);
            session.setValue(content);
            aceEditor.gotoLine(Infinity);
            aceEditor.focus();
        }

        const startPlugin = function() {
            if(Config.fallbackModal){
                showModal();
            } else {
                const container = editor.getContainer();

                if(editorWidth){
                    isScreenSizeChanged = editorWidth != container.clientWidth;
                }
    
                editorWidth = container.clientWidth;
    
                if(isScreenSizeChanged || !originalHeader){
                    originalHeader = container.querySelector('.tox-editor-header');
                }

                editor.execCommand('ToggleView', false, 'supercode');
            }
        }

        if(!Config.fallbackModal){
            const CodeView = {
                onShow: (api) => {
                  const codeView = api.getContainer();
                  
                  // On tinymce size change => resize code view
                  if(isScreenSizeChanged){
                      setHeader(codeView.querySelector('.supercode-header'), originalHeader, onSaveHandler);
                      codeView.querySelector('.supercode-body ').style.width = editorWidth+'px';
                  }
  
                  // Only on First time plugin opened => mount view
                  if(codeView.childElementCount === 0){
                      codeView.style.padding = 0;
                      codeView.style.display = 'flex';
                      codeView.style.flexDirection = 'column';
                      codeView.innerHTML = `<div class="supercode-header"></div><div class="supercode-body"></div>`
                  
                      // Ctrl + Space Toggle Shortcut, Escape to Exit Source Code Mode
                      if(Config.shortcut){
                          codeView.addEventListener('keydown', onKeyDownHandler)
                      }
                      // configure header
                      setHeader(codeView.querySelector('.supercode-header'), originalHeader, onSaveHandler);
                      // configure main code view to look same
                      setMainView(codeView.querySelector('.supercode-body '), editorWidth);
                  }
  
                  loadAceSession();
                },
                onHide: () => {
                  if(Config.shortcut){
                      removeEventListener('keydown', onKeyDownHandler)
                  }
                }
          };
            editor.ui.registry.addView('supercode', CodeView);
        }

        editor.ui.registry.addButton('supercode', {
            icon: Config.iconName,
            tooltip: 'Source Code Editor (Ctrl + space)',
            onAction: startPlugin
        });

        // Ctrl + Space Toggle Shortcut
        if(Config.shortcut){
            editor.shortcuts.add('ctrl+32', 'Toggles Source Code Editing Mode', startPlugin);
        }

        return {
            getMetadata: function () {
                return {
                    name: "Supercode",
                    url: "https://github.com/prathamVaidya/supercode-tinymce-plugin"
                };
            }
        }
    };

    // On Script Load, the plugin will be loaded
    tinymce.PluginManager.add('supercode', mainPlugin);
}();
