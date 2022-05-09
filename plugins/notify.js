import toastr from 'toastr';

const MESSAGE_ERROR_DEFAULT = 'Something went wrong...';

const TYPE_DEFAULT =  'info';
const TYPE_SUCCESS =  'success';
const TYPE_ERROR =    'error';
const TYPE_WARNING =  'warning';

export default({}, inject) => {
  toastr.options = {
    closeButton:        false,
    debug:              false,
    newestOnTop:        true,
    progressBar:        false,
    positionClass:      'toast-top-right',
    preventDuplicates:  false,
    onclick:            null,
    showDuration:       150,
    hideDuration:       150,
    timeOut:            5000,
    extendedTimeOut:    1000,
    showEasing:         'swing',
    hideEasing:         'swing',
    showMethod:         'fadeIn',
    hideMethod:         'fadeOut'
  }

  const message = (text, type = TYPE_DEFAULT) => {
    if (text) {
      toastr[type](text);
    }
  }

  const success = (text) => {
    message(text, TYPE_SUCCESS);
  }

  const error = (text) => {
    message(text || MESSAGE_ERROR_DEFAULT, TYPE_ERROR);
  }

  const warning = (text) => {
    message(text, TYPE_WARNING);
  }

  inject('notify', { message, success, error, warning });
}
