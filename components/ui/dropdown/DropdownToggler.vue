<template>
  <a href="#" :class="normalizedClass">
    <template v-if="!!$slots.default">
      <span><slot></slot></span>
    </template>
    <i v-if="icon" :class="icon === true ? 'fas fa-angle-down dropdown-icon' : icon"></i>
  </a>
</template>

<script>
import { CLASS_TOGGLER } from '~/assets/js/components/dropdown';

export default {
  props: {
    caret: {
      type:     Boolean,
      default:  false
    },
    icon: {
      type:     [Boolean, String],
      default:  true
    }
  },
  computed: {
    normalizedClass() {
      return [
        CLASS_TOGGLER,
        this.caret ? 'dropdown-caret' : ''
      ].filter(c => c).join(' ').trim();
    }
  }
}
</script>
