<template>
  <LayoutContainer>
    <template #breadcrumbs>
      <LayoutBreadcrumb name="users.title" to="users" />
    </template>
  </LayoutContainer>
</template>

<script>
export default {
  head() {
    return {
      title: 'User Profile'
    }
  }
}
</script>
