<template>
  <LayoutContainer>
    <template #breadcrumbs>
      <LayoutBreadcrumb name="blog.title" to="blogPosts" />
      <LayoutBreadcrumb name="blogCategories.title" to="blogCategories" :active="true" />
    </template>
    <template #toolbar>
      <ModalButton v-if="$security.isGranted('createBlogCategory')" modal="ModalBlogCategoryForm" class="btn btn-positive" :label="$t('blogCategories.buttons.add')" />
    </template>

    <template v-if="categories.length">
      <AppBlogCategoriesList :categories="categories" />
    </template>
    <template v-else>
      <div class="alert alert-muted">{{ $t('blogCategories.messages.empty') }}</div>
    </template>
  </LayoutContainer>
</template>

<script>
export default {
  async asyncData({ error, $repositories }) {
    const response  = await $repositories.blogCategories.fetchAll();

    if (!response.success) {
      error({statusCode: e.status, message: e.message});
      return;
    }

    return {
      categories: response.data.categories
    }
  },

  head() {
    return {
      title: this.$t('blogCategories.title')
    }
  }
}
</script>
