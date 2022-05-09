<template>
  <button ref="button" type="submit" :class="`btn btn-${color} text-nowrap ${size ? `btn-${size}` : ''}`" :disabled="disabled">{{ value }}</button>
</template>

<script>
import $ from 'jquery';

const COLOR_VALUES = [
  'primary',
  'secondary',
  'positive',
  'negative',
  'warning',
  'info',
  'muted',
  'dark',
  'light'
];

export default {
  props: {
    value: {
      type:     String,
      required: true
    },
    spin: {
      type:     Boolean,
      default:  false
    },
    color: {
      type:     String,
      default:  'primary',
      validator: (v) => COLOR_VALUES.includes(v)
    },
    disabled: {
      type:     Boolean,
      default:  false
    },
    size: {
      type: String,
      validator: (v) => ['sm', 'lg'].includes(v)
    }
  },

  data: () => ({
    width:        null,
    hiddenValue:  null
  }),

  watch: {
    spin() {
      if (this.spin) {
        this.startSpin();
      } else {
        this.stopSpin();
      }
    }
  },

  methods: {
    startSpin() {
      const $button = $(this.$refs.button);
      if ($('i', $button).length) {
        return;
      }

      this.width = $button.outerWidth();
      this.hiddenValue = $button.html();

      $button
        .css('width', this.width)
        .prop('disabled', true)
        .addClass('disabled')
        .html('<i class="fas fa-sync-alt fa-spin"></i>');
    },

    stopSpin() {
      const $button = $(this.$refs.button);
      if (!$('i', $button).length) {
        return;
      }
      $button
        .css('width', this.width)
        .prop('disabled', false)
        .removeClass('disabled')
        .html(this.hiddenValue);
    }
  }
}
</script>
