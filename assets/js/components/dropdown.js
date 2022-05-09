import $ from 'jquery';

const NAME = 'dropdown';

const CLASS_DROPDOWN =        'dropdown-menu';
const CLASS_DROPDOWN_OPENED = 'opened';
const CLASS_PARENT_OPENED =   'opened';
const CLASS_TOGGLER =         'dropdown-toggler';
const CLASSES_PARENTS =       ['dropup', 'dropdown', 'dropleft', 'dropright'];

const SELECTOR_DROPDOWN =   `.${CLASS_DROPDOWN}`;
const SELECTOR_TOGGLER =    `.${CLASS_TOGGLER}`;
const SELECTORS_PARENTS =   CLASSES_PARENTS.map(c => `.${c}`);
const SELECTOR_PARENT =     SELECTORS_PARENTS.join(', ');

const EVENT_OPEN =    'open';
const EVENT_OPENED =  'opened';
const EVENT_CLOSE =   'close';
const EVENT_CLOSED =  'closed';

const ANIMATIONS_DURATION = 150;

const CONFIG = {
  duration: ANIMATIONS_DURATION
};

class Dropdown {
  // Constructor
  constructor(dropdown, config = {}) {
    if (!$(dropdown).length) {
      throw new Error(`Given element does not exist in the DOM`);
    } else if (!$(dropdown).hasClass(CLASS_DROPDOWN)) {
      throw new Error(`Given element has not class "${CLASS_DROPDOWN}"`);
    }

    this._dropdown =  dropdown;
    this._parent =    $(this._dropdown).closest(SELECTOR_PARENT);
    this._config =    { ...CONFIG, ...config, ...$(this._dropdown).data() };

    this._eventClose = (e) => {
      if (this.isOpened() && !$(e.target).closest(this._dropdown).length) {
        this.close();
      }
    }

    this._eventKeypress = (e) => {
      if (this.isOpened() && e.code === 'Escape') {
        this.close();
      }
    }

    if ($(this._parent).length) {
      $(SELECTOR_TOGGLER, this._parent).on('click', (e) => {
        e.preventDefault();

        this.toggle();
      });
    }
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

    $(this._parent).addClass(CLASS_PARENT_OPENED);

    $(this._dropdown)
      .addClass(CLASS_DROPDOWN_OPENED)
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

    $(this._parent).removeClass(CLASS_PARENT_OPENED);

    $(this._dropdown)
      .removeClass(CLASS_DROPDOWN_OPENED)
      .fadeOut(this._config.duration, () => {
        this.trigger(EVENT_CLOSED);
      });
  }

  isOpened() {
    return $(this._dropdown).is(':visible');
  }

  trigger(eventName) {
    $(this._dropdown).trigger(eventName);
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

export default Dropdown;

export {
  Dropdown,

  ANIMATIONS_DURATION,
  CLASS_DROPDOWN_OPENED,
  CLASS_DROPDOWN,
  CLASS_PARENT_OPENED,
  CLASS_TOGGLER,
  CLASSES_PARENTS,
  CONFIG,
  EVENT_CLOSE,
  EVENT_CLOSED,
  EVENT_OPEN,
  EVENT_OPENED,
  NAME,
  SELECTOR_DROPDOWN,
  SELECTOR_PARENT,
  SELECTOR_TOGGLER,
  SELECTORS_PARENTS
}
