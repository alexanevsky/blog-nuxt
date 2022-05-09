<template>
  <div class="layout">
    <LayoutHeader />
    <Nuxt />
    <LayoutFooter />

    <component
      v-for="modal in modals"
      :ref="modal.id"
      :key="modal.id"
      :is="modal.modal"
      :id="modal.id"
      v-bind="modal.binds || {}"></component>
  </div>
</template>

<script>
export default {
  computed: {
    modals() {
      return this.$modals.all();
    }
  },

  watch: {
    $route() {
      this.$modals.clear();
    }
  }
}
</script>
