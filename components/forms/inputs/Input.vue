<template>
  <input
    :type="normalizedType"
    :value="value"
    class="form-input"
    :class="size ? `form-input-${size}` : null"
    :required="required"
    @input="handleInput($event)"
  >
</template>

<script>
const SIZE_VALUES = ['sm', 'lg'];

const TYPE_TEXT =           'text';
const TYPE_NUMBER =         'number';
const TYPE_TEL =            'tel';
const TYPE_PHONE =          'phone';
const TYPE_EMAIL =          'email';
const TYPE_URL =            'url';
const TYPE_PASSWORD =       'password';

const TYPES_INPUT_MODES = {
  [TYPE_TEXT]:            'text',
  [TYPE_NUMBER]:          'number',
  [TYPE_TEL]:             'tel',
  [TYPE_PHONE]:           'tel',
  [TYPE_EMAIL]:           'email',
  [TYPE_URL]:             'url',
  [TYPE_PASSWORD]:        'password'
};

export default {
  props: {
    value: {
      type: [String, Number]
    },
    type: {
      type:       String,
      default:    'text',
      validator:  (v) => Object.keys(TYPES_INPUT_MODES).includes(v)
    },
    required: {
      type:     Boolean,
      default:  false
    },
    size: {
      type:       String,
      validator:  (v) => !v || SIZE_VALUES.includes(v)
    }
  },

  computed: {
    normalizedType() {
      return !this.type ? TYPE_TEXT : TYPES_INPUT_MODES[this.type];
    },
  },

  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value);
    }
  }
}
</script>
