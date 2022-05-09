<template>
  <component :is="tag" ref="el">
    <slot></slot>
  </component>
</template>

<script>
import $ from 'jquery';

const TAG_VALUES = ['div', 'ul', 'ol', 'li', 'p', 'section'];
const DURATION = 150;

export default {
  props: {
    visible: {
      type:     Boolean,
      default:  true
    },
    duration: {
      type:     Number,
      default:  DURATION
    },
    tag: {
      type:       String,
      default:    TAG_VALUES[0],
      validator:  (v) => TAG_VALUES.includes(v)
    }
  },

  data: () => ({
    isVisible: true
  }),

  watch: {
    visible() {
      this.isVisible = this.visible;
      this.toggle();
    }
  },

  mounted() {
    this.toggle(true);
  },

   methods: {
    toggle(instant = false) {
      if (this.isVisible) {
        this.show(instant);
      } else {
        this.hide(instant);
      }
    },

    show(instant = false) {
      this.isVisible = true;

      const $el = $(this.$refs.el);

      if (!$el.is(':visible')) {
        if (instant) {
          $el.show();
        } else {
          $el.css({opacity: 0}).slideDown(this.duration / 2, () => {
            $el.animate({opacity: 1}, this.duration / 2);
          });
        }
      }
    },

    hide(instant = false) {
      this.isVisible = false;

      const $el = $(this.$refs.el);

      if ($el.is(':visible')) {
        if (instant) {
          $el.hide();
        } else {
          $el.animate({opacity: 0}, this.duration / 2, () => {
            $el.slideUp(this.duration / 2);
          });
        }
      }
    }
  }
}
</script>
