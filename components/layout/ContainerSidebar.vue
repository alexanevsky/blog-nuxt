<template>
  <div class="container-sidebar">
    <div v-if="sticky" class="sticky-top">
      <slot></slot>
    </div>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    sticky: {
      type:     Boolean,
      default:  false
    }
  }
}
</script>
