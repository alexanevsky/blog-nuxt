<template>
  <component :is="tag" :href="tag === 'a' ? href : null" class="dropdown-item" @click="$emit('click', $event)">
    <slot></slot>
    {{ label }}
  </component>
</template>

<script>
const TAG_VALUES = ['a', 'div', 'span', 'li'];

export default {
  props: {
    tag: {
      type:       String,
      default:    TAG_VALUES[0],
      validator:  (label) => TAG_VALUES.includes(label)
    },
    label: {
      type: String
    },
    href: {
      type:     String,
      default:  '#'
    }
  }
}
</script>
