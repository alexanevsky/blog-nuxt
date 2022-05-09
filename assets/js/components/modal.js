import $ from 'jquery';

const NAME = 'modal';

const CLASS_MODAL =           NAME;
const CLASS_MODAL_OPENED =    'opened';
const CLASS_CLOSE =           `${CLASS_MODAL}-close`;

const SELECTOR_MODAL = `.${CLASS_MODAL}`;
const SELECTOR_CLOSE = `.${CLASS_CLOSE}`;

const EVENT_OPEN =    'open';
const EVENT_OPENED =  'opened';
const EVENT_CLOSE =   'close';
const EVENT_CLOSED =  'closed';

const ANIMATIONS_DURATION = 150;

const Z_INDEX_STEP = 10;

const CONFIG = {
  duration: ANIMATIONS_DURATION,
  zIndex:   null
};

class Modal {
  // Constructor
  constructor(modal, config = {}) {
    if (!$(modal).length) {
      throw new Error(`Given element does not exist in the DOM`);
    } else if (!$(modal).hasClass(CLASS_MODAL)) {
      throw new Error(`Given element has not class "${CLASS_MODAL}"`);
    }

    this._modal =         modal;
    this._config =        { ...CONFIG, ...config, ...$(this._modal).data() };
    this._zIndex =        this._config.zIndex || parseInt($(this._modal).css('z-index'));
    this._zIndexDefault = this._zIndex;

    this._eventClose = (e) => {
      if ($(e.target).is(this._modal) || $(e.target).closest(SELECTOR_CLOSE).length) {
        e.preventDefault();

        this.close();
      }
    }

    this._eventKeypress = (e) => {
      if (this.isOpened() && e.code === 'Escape') {
        this.close();
      }
    }

    /*this._moveModalToBody();*/
  }

  // Public methods
  toggle() {
    if (this.isOpened()) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (this.isOpened()) {
      return;
    }

    this.trigger(EVENT_OPEN);
    this._addEventListeners();
    this._parseZIndex();
    this._setZIndex(this._zIndex);

    $(this._modal)
      .addClass(CLASS_MODAL_OPENED)
      .fadeIn(this._config.duration, () => {
        this.trigger(EVENT_OPENED);
      });
  }

  close() {
    if (!this.isOpened()) {
      return;
    }

    this.trigger(EVENT_CLOSE);
    this._removeEventListeners();

    $(this._modal)
      .removeClass(CLASS_MODAL_OPENED)
      .fadeOut(this._config.duration, () => {
        this.trigger(EVENT_CLOSED);
        this._setZIndex(this._zIndexDefault);
      });
  }

  isOpened() {
    return $(this._modal).is(':visible');
  }

  trigger(eventName) {
    $(this._modal).trigger(eventName);
  }

  // Private methods
  _addEventListeners() {
    $(this._modal).on('click', this._eventClose);
    $(document).on('keydown', this._eventKeypress);
  }

  _removeEventListeners() {
    $(this._modal).off('click', this._eventClose);
    $(document).off('keydown', this._eventKeypress);
  }

  _parseZIndex() {
    this._zIndex = $(this._modal).css('z-index');

    const modals = $(SELECTOR_MODAL).filter(':visible').not(this._modal);

    if (!$(modals).length) {
      return;
    }

    $(modals).each((i, modal) => {
      let zIndex = parseInt($(modal).css('z-index'));
      if (zIndex >= this._zIndex) {
        this._zIndex = zIndex + Z_INDEX_STEP;
      }
    });
  }

  _setZIndex(zIndex) {
    $(this._modal).css('z-index', zIndex);
  }

  _moveModalToBody() {
    if (!$(this._modal).parent().is('body')) {
      $(this._modal).appendTo('body');
    }
  }
}

export default Modal;

export {
  Modal,

  ANIMATIONS_DURATION,
  CLASS_CLOSE,
  CLASS_MODAL_OPENED,
  CLASS_MODAL,
  CONFIG,
  EVENT_CLOSE,
  EVENT_CLOSED,
  EVENT_OPEN,
  EVENT_OPENED,
  NAME,
  SELECTOR_CLOSE,
  SELECTOR_MODAL,
  Z_INDEX_STEP
}
