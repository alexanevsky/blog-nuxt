<template>
  <LayoutContainer>
    <template #breadcrumbs>
      <LayoutBreadcrumb name="blog.title" to="blogPosts" :active="true" />
    </template>
  </LayoutContainer>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t('blog.title')
    }
  }
};
</script>
