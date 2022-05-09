<template>
  <NuxtLink :to="to" class="dropdown-item">
    <slot></slot>
    {{ label }}
  </NuxtLink>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    label: {
      type: String
    }
  },
  computed: {
    normalizedClass() {
      return 'dropdown-item';
    }
  }
}
</script>
