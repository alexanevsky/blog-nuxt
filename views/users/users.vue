<template>
  <LayoutContainer>
    <template #breadcrumbs>
      <LayoutBreadcrumb name="users.title" to="users" :active="true" />
    </template>
  </LayoutContainer>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t('users.title')
    }
  }
}
</script>
