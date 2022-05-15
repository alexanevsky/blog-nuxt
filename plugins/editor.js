import EditorJS from '@editorjs/editorjs';

// import Anchor     from '~/assets/js/editorjs/tools/block/anchor';
import Delimiter  from '~/assets/js/editorjs/tools/block/delimiter';
import Header     from '~/assets/js/editorjs/tools/block/header';
import List       from '~/assets/js/editorjs/tools/block/list';
import Paragraph  from '~/assets/js/editorjs/tools/block/paragraph';
import Quote      from '~/assets/js/editorjs/tools/block/quote';
import Raw        from '~/assets/js/editorjs/tools/block/raw';
// import Table      from '~/assets/js/editorjs/tools/block/table';

import Color          from '~/assets/js/editorjs/tools/inline/color';
import FontSize       from '~/assets/js/editorjs/tools/inline/font-size';
import Hyperlink      from '~/assets/js/editorjs/tools/inline/hyperlink';
import Italic         from '~/assets/js/editorjs/tools/inline/italic';
import Marker         from '~/assets/js/editorjs/tools/inline/marker';
import Strikethrough  from '~/assets/js/editorjs/tools/inline/strikethrough';
import Strong         from '~/assets/js/editorjs/tools/inline/strong';
import Underline      from '~/assets/js/editorjs/tools/inline/underline';

import objectFilter from '~/utilities/objects/filter';

const VERSION = '2.24.3';

const BLOCK_TOOLS = {
  paragraph: {
    class:          Paragraph,
    inlineToolbar:  true,
    preserveBlank:  true,
    config: {
      placeholder: 'Press Tab to select block or just type anything...'
    }
  },
  header: {
    class:          Header,
    inlineToolbar:  true,
    config: {
      levels:       [2, 3, 4],
      defaultLevel: 2
    }
  },
  list: {
    class:          List,
    inlineToolbar:  true
  },
  /*table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 3,
      cols: 2,
    },
  },*/
  blockquote: {
    class:          Quote,
    inlineToolbar:  true,
    config: {
      quotePlaceholder:   'Text',
      captionPlaceholder: 'Author',
    }
  },
  delimiter: {
    class: Delimiter
  },
  /*anchor: {
    class: Anchor
  },*/
  raw: {
    class: Raw
  }
};

const INLINE_TOOLS = {
  hyperlink: {
    class: Hyperlink,
    shortcut: Hyperlink.shortcut
  },
  strong: {
    class: Strong,
    shortcut: Strong.shortcut
  },
  em: {
    class: Italic,
    shortcut: Italic.shortcut
  },
  underline: {
    class: Underline,
    shortcut: Underline.shortcut
  },
  strikethrough: {
    class: Strikethrough
  },
  fontsize: {
    class: FontSize
  },
  color: {
    class: Color
  },
  marker: {
    class: Marker
  }
};

export default ({}, inject) => {
  const defaultOptions = {
    id:           '',
    data:         [],
    placeholder:  '',
    logLevel:     'ERROR',
    tools:        [...Object.keys(BLOCK_TOOLS), ...Object.keys(INLINE_TOOLS)],
    onChange:     () => {}
  };

  const init = (options) => {
    options = { ...defaultOptions, ...options };

    const parameters = {
      holder:       options.id,
      placeholder:  options.placeholder,
      onChange:     options.onChange,
      data: {
        version:  VERSION,
        time:     new Date().getTime(),
        blocks:   options.data
      },
      tools: {
        link: false,
        bold: false,
        italic: false,
        ...objectFilter({ ...BLOCK_TOOLS, ...INLINE_TOOLS }, (v, k) => ['paragraph', ...options.tools].includes(k))
      }
    };

    const editor = new EditorJS(parameters);

    return editor;
  };

  inject('editorjs', (options) => init(options));
};
