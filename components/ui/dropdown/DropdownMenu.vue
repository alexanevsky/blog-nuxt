<template>
  <component :is="tag" ref="dropdown" :class="normalizedClass" @click="close()">
    <slot></slot>
  </component>
</template>

<script>
import Dropdown from '~/assets/js/components/dropdown';

const TAG_VALUES = ['div', 'ul', 'ol'];
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
    tag: {
      type:       String,
      default:    TAG_VALUES[0],
      validator:  (v) => TAG_VALUES.includes(v)
    },
    color: {
      type:       String,
      validator: (v) => !v || COLOR_VALUES.includes(v)
    },
    right: {
      type:     Boolean,
      default:  false
    }
  },

  data: () => ({
    dropdown: null
  }),

  computed: {
    normalizedClass() {
      return [
        'dropdown-menu',
        this.color ? `dropdown-${this.color}` : null,
        this.right ? 'dropdown-right' : null
      ].filter(c => c).join(' ').trim();
    }
  },

  mounted() {
    this.dropdown = new Dropdown(this.$refs.dropdown);
  },

  methods: {
    toggle() {
      this.dropdown.toggle();
    },

    open() {
      this.dropdown.open();
    },

    close() {
      this.dropdown.close();
    }
  }
}
</script>
