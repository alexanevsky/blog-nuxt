import ICON from '!raw-loader!~/assets/images/editorjs/icons/underline.svg';

/**
 * Underline Tool for the Editor.js.
 *
 * Allows to wrap inline fragment and style it somehow.
 */
export default class Underline {
  constructor({ api }) {
    this.api = api;
    this.button = null;
    this.tag = 'U';
    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive,
    };
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

    const termWrapper = this.api.selection.findParentTag(this.tag);

    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }
  }

  wrap(range) {
    const u = document.createElement(this.tag);

    u.appendChild(range.extractContents());
    range.insertNode(u);

    this.api.selection.expandToTag(u);
  }

  unwrap(termWrapper) {
    this.api.selection.expandToTag(termWrapper);

    const sel = window.getSelection();
    const range = sel.getRangeAt(0);

    const unwrappedContent = range.extractContents();

    termWrapper.parentNode.removeChild(termWrapper);

    range.insertNode(unwrappedContent);

    sel.removeAllRanges();
    sel.addRange(range);
  }

  checkState() {
    const termTag = this.api.selection.findParentTag(this.tag);

    this.button.classList.toggle(this.iconClasses.active, !!termTag);
  }

  static get isInline() {
    return true;
  }

  static get shortcut() {
    return 'Ctrl+U';
  }

  static get sanitize() {
    return {
      u: {}
    };
  }
}
