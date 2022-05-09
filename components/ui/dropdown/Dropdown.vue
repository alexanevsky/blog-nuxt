<template>
  <component :is="component || tag" :class="normalizedClass">
    <slot></slot>
  </component>
</template>

<script>
const TAG_VALUES =       ['div', 'span', 'li'];
const DIRECTION_VALUES = ['down', 'up', 'left', 'right'];

export default {
  props: {
    component: {},
    tag: {
      type:       String,
      default:    TAG_VALUES[0],
      validator:  (value) => TAG_VALUES.includes(value)
    },
    direction: {
      type:       String,
      default:    DIRECTION_VALUES[0],
      validator:  (value) => DIRECTION_VALUES.includes(value)
    }
  },
  computed: {
    normalizedClass() {
      return `drop${this.direction}`;
    }
  }
}
</script>
