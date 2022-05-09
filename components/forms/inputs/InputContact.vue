<template>
  <div ref="inputGroup" class="embed-input-group form-input" :class="this.focused ? 'focus' : null">
    <label v-if="prefix" class="embed-input-group-prefix" :for="id">{{ prefix }}</label>
    <input
      type="text"
      :id="id"
      :value="normalizedValue"
      :required="required"
      @focus="focused = true"
      @blur="focused = false"
      @input="handleInput($event)"
    >
    <label v-if="suffix" class="embed-input-group-suffix" :for="id">{{ suffix }}</label>
  </div>
</template>

<script>
const SKIP_FORMAT = ['skype', 'telegram'];

export default {
  props: {
    id: {
      type:     [String, Number],
      required: true
    },
    value: {
      type: Object,
      validator: (v) => Object.keys(v).includes('contact')
    },
    required: {
      type:     Boolean,
      default:  false
    },
  },

  data: () => ({
    focused: false
  }),

  computed: {
    normalizedValue() {
      return this.value.value || '';
    },

    regex() {
      return this.$params.get(`contactsRegex.${this.value.contact}`);
    },

    format() {
      const format = this.$params.get(`contactsFormats.${this.value.contact}`);

      if (!format || SKIP_FORMAT.includes(this.value.contact)) {
        return [];
      }

      return format.split('%s');
    },

    prefix() {
      return this.format[0] || null;
    },

    suffix() {
      return (this.format[1] || null) !== '/' ? this.format[1] : null;
    }
  },

  methods: {
    handleInput(e) {
      let value = e.target.value;

      if (this.regex) {
        value = value.replace(new RegExp(this.regex), '$1');
      }

      this.$emit('input', { contact: this.value.contact, value } );
    }
  }
}
</script>
