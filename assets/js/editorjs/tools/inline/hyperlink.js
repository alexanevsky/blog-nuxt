import ICON from '!raw-loader!~/assets/images/editorjs/icons/hyperlink.svg';

/**
 * List of actions classes.
 */
const CSS = {
  input:  'ce-inline-tool--input',
  select: 'ce-inline-tool--select'
};

/**
 * Default class of button (if any style class selected).
 */
const BTN_CLASS = 'btn';

/**
 * Allowed values of element class.
 */
const BTN_STYLE_CLASSES = {
  'Primary Color':    'btn-primary',
  'Secondary Color':  'btn-secondary',
  'Positive Color':   'btn-positive',
  'Negative Color':   'btn-negative',
  'Warning Color':    'btn-warning',
  'Info Color':       'btn-info',
  'Muted Color':      'btn-muted',
  'Dark Color':       'btn-dark',
  'Light Color':      'btn-light'
};

/**
 * Allowed values of element attrubute "rel".
 */
const REL_VALUES = {
  'Nofollow': 'nofollow'
};

/**
 * Allowed values of element attrubute "target".
 */
const TARGET_VALUES = {
  'Target Blank': '_blank'
};

/**
 * Link Tool for the Editor.js.
 *
 * Allows to wrap inline fragment and style it somehow.
 */
export default class Hyperlink {
  constructor({ api, config }) {
    this.api = api;
    this.config = config;
    this.button = null;
    this.tag = 'A';

    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive,
    };

    this.btnClass = BTN_CLASS;
    this.btnStyleClasses = {};
    this.targetValues = {};
    this.relValues = {};

    this.nodes = {
      wrapper:    null,
      href:       null,
      classSelector:  null,
      targetSelector: null,
      relSelector:  null
    };

    if (typeof this.config.btnStyleClasses === 'object') {
      Object.keys(this.config.btnStyleClasses).forEach(label => {
        let value = this.config.btnStyleClasses[label];

        if (Object.values(BTN_STYLE_CLASSES).indexOf(value) !== -1) {
          this.btnStyleClasses[parseInt(label) == label ? this.api.i18n.t(Object.keys(BTN_STYLE_CLASSES)[Object.values(BTN_STYLE_CLASSES).indexOf(value)]) : label] = value;
        }
      });
    } else {
      Object.keys(BTN_STYLE_CLASSES).forEach(label => {
        this.btnStyleClasses[this.api.i18n.t(label)] = BTN_STYLE_CLASSES[label];
      });
    }

    if (typeof this.config.targetValues === 'object') {
      Object.keys(this.config.targetValues).forEach(label => {
        let value = this.config.targetValues[label];

        if (Object.values(TARGET_VALUES).indexOf(value) !== -1) {
          this.targetValues[parseInt(label) == label ? Object.keys(TARGET_VALUES)[Object.values(TARGET_VALUES).indexOf(value)] : label] = value;
        }
      });
    } else {
      Object.keys(TARGET_VALUES).forEach(label => {
        this.targetValues[this.api.i18n.t(label)] = TARGET_VALUES[label];
      });
    }

    if (typeof this.config.relValues === 'object') {
      Object.keys(this.config.relValues).forEach(label => {
        let value = this.config.relValues[label];

        if (Object.values(REL_VALUES).indexOf(value) !== -1) {
          this.relValues[parseInt(label) == label ? Object.keys(REL_VALUES)[Object.values(REL_VALUES).indexOf(value)] : label] = value;
        }
      });
    } else {
      Object.keys(REL_VALUES).forEach(label => {
        this.relValues[this.api.i18n.t(label)] = REL_VALUES[label];
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

    const el = this.api.selection.findParentTag(this.tag);

    if (el) {
      this.unwrap(el);
    } else {
      this.wrap(range);
    }
  }

  checkState() {
    const el = this.api.selection.findParentTag(this.tag);

    this.button.classList.toggle(this.iconClasses.active, !!el);

    if (!!el) {
      this.showActions(el);
    } else {
      this.hideActions();
    }
  }

  wrap(range) {
    const el = document.createElement(this.tag);

    // el.classList.add(this.defaultClass);
    el.appendChild(range.extractContents());
    range.insertNode(el);

    this.api.selection.expandToTag(el);
  }

  unwrap(el) {
    this.api.selection.expandToTag(el);

    const sel = window.getSelection();
    const range = sel.getRangeAt(0);
    const unwrappedContent = range.extractContents();

    el.parentNode.removeChild(el);
    range.insertNode(unwrappedContent);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  renderActions() {
    this.nodes.wrapper = document.createElement('div');
    this.nodes.wrapper.hidden = true;

    // Create href field
    this.nodes.href = document.createElement('input');
    this.nodes.href.className = CSS.input;
    this.nodes.href.type = 'text';
    this.nodes.href.setAttribute('placeholder', this.api.i18n.t('Type a link...'));

    // Create btn class selector
    this.nodes.classSelector = document.createElement('select');
    this.nodes.classSelector.className = CSS.select;

    // Create first option for class selector
    let classFirstOpt = document.createElement('option');

    classFirstOpt.appendChild(document.createTextNode(this.api.i18n.t('Simple link')));
    classFirstOpt.value = '';

    this.nodes.classSelector.appendChild(classFirstOpt);

    // Create all options for class selector
    Object.keys(this.btnStyleClasses).forEach(label => {
      let value = this.btnStyleClasses[label];
      let opt = document.createElement('option');

      opt.appendChild(document.createTextNode(label));
      opt.value = value;

      this.nodes.classSelector.appendChild(opt);
    });

    // Create target selector
    this.nodes.targetSelector = document.createElement('select');
    this.nodes.targetSelector.className = CSS.select;

    // Create first option for target selector
    let targetFirstOpt = document.createElement('option');

    targetFirstOpt.appendChild(document.createTextNode(this.api.i18n.t('Target by default')));
    targetFirstOpt.value = '';

    this.nodes.targetSelector.appendChild(targetFirstOpt);

    // Create all options for target selector
    Object.keys(this.targetValues).forEach(label => {
      let value = this.targetValues[label];
      let opt = document.createElement('option');

      opt.appendChild(document.createTextNode(label));
      opt.value = value;

      this.nodes.targetSelector.appendChild(opt);
    });

    // Create rel selector
    this.nodes.relSelector = document.createElement('select');
    this.nodes.relSelector.className = CSS.select;

    // Create first option for rel selector
    let relFirstOpt = document.createElement('option');

    relFirstOpt.appendChild(document.createTextNode(this.api.i18n.t('Follow by default')));
    relFirstOpt.value = '';

    this.nodes.relSelector.appendChild(relFirstOpt);

    // Create all options for rel selector
    Object.keys(this.relValues).forEach(label => {
      let value = this.relValues[label];
      let opt = document.createElement('option');

      opt.appendChild(document.createTextNode(label));
      opt.value = value;

      this.nodes.relSelector.appendChild(opt);
    });

    // Append nodes
    this.nodes.wrapper.appendChild(this.nodes.href);
    this.nodes.wrapper.appendChild(this.nodes.classSelector);
    this.nodes.wrapper.appendChild(this.nodes.targetSelector);
    this.nodes.wrapper.appendChild(this.nodes.relSelector);

    return this.nodes.wrapper;
  }

  showActions(el) {
    // Href actions
    this.nodes.href.value = el.getAttribute('href') || '';
    this.nodes.href.onblur = () => {
      el.setAttribute('href', this.nodes.href.value);
    };

    // Btn class actions
    Object.values(this.btnStyleClasses).forEach(value => {
      if (el.classList.contains(value)) {
        this.nodes.classSelector.value = value;
      }
    });

    this.nodes.classSelector.onchange = () => {
      if (!this.nodes.classSelector.value) {
        el.classList.remove(this.btnClass);

        Object.values.forEach(value => {
          el.classList.remove(value);
        });
      } else {
        el.classList.add(this.btnClass);

        Object.values(this.btnStyleClasses).forEach(value => {
          if (value === this.nodes.classSelector.value) {
            el.classList.add(value);
          } else if (el.classList.contains(value)) {
            el.classList.remove(value);
          }
        });
      }
    };

    // Target actions
    this.nodes.targetSelector.value = el.getAttribute('target') || '';

    this.nodes.targetSelector.onchange = () => {
      if (!!this.nodes.targetSelector.value) {
        el.setAttribute('target', this.nodes.targetSelector.value);
      } else {
        el.removeAttribute('target');
      }
    };

    // Rel actions
    this.nodes.relSelector.value = el.getAttribute('rel') || '';

    this.nodes.relSelector.onchange = () => {
      if (!!this.nodes.relSelector.value) {
        el.setAttribute('rel', this.nodes.relSelector.value);
      } else {
        el.removeAttribute('rel');
      }
    };

    // Show nodes
    this.nodes.wrapper.hidden = false;
  }

  hideActions() {
    this.nodes.wrapper.hidden = true;

    this.nodes.href.onchange = null;
    this.nodes.classSelector.onchange = null;
    this.nodes.targetSelector.onchange = null;
    this.nodes.relSelector.onchange = null;
  }

  static get isInline() {
    return true;
  }

  static get shortcut() {
    return 'Ctrl+K';
  }

  static get sanitize() {
    return {
      a: (el) => {
        if (!!el.getAttribute('href')) {
          return {
            class: el.classList.contains(BTN_CLASS) ? true : false,
            href: true,
            target: true,
            rel: true
          };
        } else {
          return false;
        }
      }
    };
  }
};
