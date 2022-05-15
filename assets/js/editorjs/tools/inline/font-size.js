import ICON from '!raw-loader!~/assets/images/editorjs/icons/font-size.svg';

/**
 * List of actions classes.
 */
const CSS = {
  select: 'ce-inline-tool--select'
};

/**
 * Allowed values of element class.
 */
const ALLOWED_CLASSES = {
  'Small':  'text-sm',
  'Large':  'text-lg'
};

/**
 * Default element class.
 */
const DEFAULT_CLASS = 'text-sm';

/**
 * Font Size Tool for the Editor.js.
 *
 * Allows to wrap inline fragment and style it somehow.
 */
export default class FontSize {
  constructor({ api, config }) {
    this.api = api;
    this.config = config;
    this.button = null;
    this.tag = 'SPAN';

    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive,
    };

    this.allowedClasses = {};
    this.defaultClass = this.config.defaultClass || DEFAULT_CLASS;

    if (typeof this.config.allowedClasses === 'object') {
      Object.keys(this.config.allowedClasses).forEach(label => {
        let value = this.config.allowedClasses[label];

        if (Object.values(ALLOWED_CLASSES).indexOf(value) !== -1) {
          this.allowedClasses[parseInt(label) == label ? this.api.i18n.t(Object.keys(ALLOWED_CLASSES)[Object.values(ALLOWED_CLASSES).indexOf(value)]) : label] = value;
        }
      });
    } else {
      Object.keys(ALLOWED_CLASSES).forEach(label => {
        this.allowedClasses[this.api.i18n.t(label)] = ALLOWED_CLASSES[label];
      });
    }
  }

  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.classList.add(this.iconClasses.base);
    this.button.innerHTML = ICON;

    return this.button;
  }

  surround(range) {
    if (!range) {
      return;
    }

    let el;

    Object.values(this.allowedClasses).forEach(value => {
      if (this.api.selection.findParentTag(this.tag, value)) {
        el = this.api.selection.findParentTag(this.tag, value);
      }
    });

    if (el) {
      this.unwrap(el);
    } else {
      this.wrap(range);
    }
  }

  checkState() {
    let el;

    Object.values(this.allowedClasses).forEach(value => {
      if (this.api.selection.findParentTag(this.tag, value)) {
        el = this.api.selection.findParentTag(this.tag, value);
      }
    });

    this.button.classList.toggle(this.iconClasses.active, !!el);

    if (!!el) {
      this.showActions(el);
    } else {
      this.hideActions();
    }
  }

  wrap(range) {
    const parent = this.api.selection.findParentTag(this.tag);

    if (parent) {
      parent.classList.add(this.defaultClass);

      return;
    }

    const el = document.createElement(this.tag);

    el.classList.add(this.defaultClass);
    el.appendChild(range.extractContents());
    range.insertNode(el);

    this.api.selection.expandToTag(el);
  }

  unwrap(el) {
    this.api.selection.expandToTag(el);

    const sel = window.getSelection();
    const range = sel.getRangeAt(0);


    Object.values(this.allowedClasses).forEach(value => {
      el.classList.remove(value);
    });

    if (!el.className.trim()) {
      const unwrappedContent = range.extractContents();

      el.parentNode.removeChild(el);
      range.insertNode(unwrappedContent);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  renderActions() {
    this.classSelector = document.createElement('select');
    this.classSelector.className = CSS.select;
    this.classSelector.hidden = true;

    Object.keys(this.allowedClasses).forEach(label => {
      let value = this.allowedClasses[label];
      let opt = document.createElement('option');

      opt.appendChild(document.createTextNode(label));
      opt.value = value;

      this.classSelector.appendChild(opt);
    });

    return this.classSelector;
  }

  showActions(el) {
    this.classSelector.value = this.defaultClass;

    Object.values(this.allowedClasses).forEach(value => {
      if (el.classList.contains(value)) {
        this.classSelector.value = value;
      }
    });

    this.classSelector.onchange = () => {
      Object.values(this.allowedClasses).forEach(value => {
        if (value === this.classSelector.value) {
          el.classList.add(value);
        } else if (el.classList.contains(value)) {
          el.classList.remove(value);
        }
      });
    };

    this.classSelector.hidden = false;
  }

  hideActions() {
    this.classSelector.onchange = null;
    this.classSelector.hidden = true;
  }

  static get isInline() {
    return true;
  }

  static get sanitize() {
    let sanitizer = {};

    sanitizer['SPAN'.toLowerCase()] = {
      class: true
    };

    return sanitizer;
  }
}
