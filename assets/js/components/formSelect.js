import $ from 'jquery';

const NAME = 'form-select';

const CLASS_SELECT =          NAME;
const CLASS_FIELD =           `${NAME}-field`;
const CLASS_DROPDOWN =        `${NAME}-dropdown`;
const CLASS_DROPDOWN_ITEM =   `${NAME}-dropdown-item`;
const CLASS_OPENED =          'opened';
const CLASS_MUPTIPLE =        `${NAME}-multiple`;

const SELECTOR_SELECT =         `.${CLASS_SELECT}`;
const SELECTOR_FIELD =          `.${CLASS_FIELD}`;
const SELECTOR_DROPDOWN =       `.${CLASS_DROPDOWN}`;
const SELECTOR_DROPDOWN_ITEM =  `.${CLASS_DROPDOWN_ITEM}`;

const EVENT_OPEN =    'open';
const EVENT_OPENED =  'opened';
const EVENT_CLOSE =   'close';
const EVENT_CLOSED =  'closed';

const ANIMATIONS_DURATION = 150;

const CONFIG = {
  duration: ANIMATIONS_DURATION
};

class FormSelect {
  // Constructor
  constructor(select, config = {}) {
    if (!$(select).length) {
      throw new Error(`Given element does not exist in the DOM`);
    } else if (!$(select).hasClass(CLASS_SELECT)) {
      throw new Error(`Given element has not class "${CLASS_SELECT}"`);
    }

    this._select =    $(select);
    this._field =     $(SELECTOR_FIELD, this._select);
    this._dropdown =  $(SELECTOR_DROPDOWN, this._select);
    this._items =     $(SELECTOR_DROPDOWN_ITEM, this._dropdown);
    this._config =    { ...CONFIG, ...config, ...$(this._select).data() };

    this._eventClose = (e) => {
      if (this.isOpened() && !$(e.target).closest(this._select).length) {
        this.close();
      }
    }

    this._eventKeypress = (e) => {
      if (this.isOpened() && e.code === 'Escape') {
        this.close();
      }
    }

    $(this._field).on('click', (e) => {
      e.preventDefault();
      this.toggle();
    });

    $(this._field).on('keydown', (e) => {
      if (e.code === 'Space') {
        this.toggle();
      }
    });

    $(this._select).on('keydown', (e) => {
      if (e.code === 'Tab' && this.isOpened()) {
        e.preventDefault();

        if (!$(this._items).filter(':focus').length || !$(this._items).filter(':focus').next().length) {
          $(this._items).first().trigger('focus');
        } else {
          $(this._items).filter(':focus').next().trigger('focus');
        }
      } else if (e.code === 'ArrowUp') {
        this.open();

        if (!$(this._items).filter(':focus').length) {
          $(this._items).first().trigger('focus');
        } else if (!$(this._items).filter(':focus').prev().length) {
          $(this._items).last().trigger('focus');
        } else {
          $(this._items).filter(':focus').prev().trigger('focus');
        }
      } else if (e.code === 'ArrowDown') {
        this.open();

        if (!$(this._items).filter(':focus').length) {
          $(this._items).first().trigger('focus');
        } else if (!$(this._items).filter(':focus').next().length) {
          $(this._items).first().trigger('focus');
        } else {
          $(this._items).filter(':focus').next().trigger('focus');
        }
      }
    });
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

    $(this._select).addClass(CLASS_OPENED);
    $(this._items).attr('tabindex', 0);

    $(this._dropdown)
      .fadeIn(this._config.duration, () => {
        this.trigger(EVENT_OPENED);
        this._addEventListeners();
      });
  }

  close() {
    if (!this.isOpened()) {
      return;
    }

    this.trigger(EVENT_CLOSE);
    this._removeEventListeners();

    $(this._select).removeClass(CLASS_OPENED);
    $(this._items).attr('tabindex', -1);

    $(this._dropdown)
      .fadeOut(this._config.duration, () => {
        this.trigger(EVENT_CLOSED);
      });
  }

  isOpened() {
    return $(this._dropdown).is(':visible');
  }

  trigger(eventName) {
    $(this._select).trigger(eventName);
  }

  // Private methods
  _addEventListeners() {
    $(document).on('click', this._eventClose);
    $(document).on('keydown', this._eventKeypress);
  }

  _removeEventListeners() {
    $(document).off('click', this._eventClose);
    $(document).off('keydown', this._eventKeypress);
  }
}

export default FormSelect;

export {
  FormSelect,

  ANIMATIONS_DURATION,
  CLASS_DROPDOWN,
  CLASS_DROPDOWN_ITEM,
  CLASS_FIELD,
  CLASS_MUPTIPLE,
  CLASS_OPENED,
  CLASS_SELECT,
  CONFIG,
  EVENT_CLOSE,
  EVENT_CLOSED,
  EVENT_OPEN,
  EVENT_OPENED,
  NAME,
  SELECTOR_DROPDOWN,
  SELECTOR_DROPDOWN_ITEM,
  SELECTOR_FIELD,
  SELECTOR_SELECT
}
