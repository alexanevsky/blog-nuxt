<template>
  <LayoutContainer>
    <template #breadcrumbs>
      <LayoutBreadcrumb name="blog.title" to="blogPosts" />
      <LayoutBreadcrumb name="blogCategories.title" to="blogCategories" />
      <LayoutBreadcrumb :name="category.name" :to="{name: 'blogCategoryPosts', params: {alias: category.alias}}" :active="true" />
    </template>
    <template #toolbar>
      <NuxtLink v-if="$security.isGranted('createBlogPost')" :to="{name: 'blogPostCreate', query: {category: category.id}}" class="btn btn-positive">{{ $t('blogPosts.buttons.create') }}</NuxtLink>
    </template>

    <AppBlogPostsLayout>
      <template v-if="posts.length">
        <AppBlogPostsList :posts="posts" />
      </template>
      <template v-else>
        <div class="alert alert-muted">{{ $t('blogPosts.messages.emptyCategory', {name: category.name}) }}</div>
      </template>

      <template #pagination>
        <UIPaginationRouted :meta="meta" />
      </template>
    </AppBlogPostsLayout>
  </LayoutContainer>
</template>

<script>
export default {
  async asyncData({ params, error, redirect, $repositories }) {
    const categoryResponse = await $repositories.blogCategories.fetch(params.alias);
    const postsResponse = await $repositories.blogPosts.fetchByCategory(params.alias, params.page || 1);

    if (!categoryResponse.success) {
      error({statusCode: categoryResponse.status, message: categoryResponse.message});
      return;
    } else if (!postsResponse.success) {
      error({statusCode: postsResponse.status, message: postsResponse.message});
      return;
    }

    const data = {
      category: categoryResponse.data.category,
      posts:    postsResponse.data.posts,
      meta:     postsResponse.data.postsMeta
    };

    if (data.category.id === parseInt(params.alias)) {
      redirect(301, { name: 'blogCategoryPosts', params: { alias: data.category.alias } });
      return;
    }

    return data;
  },

  head() {
    return {
      title: this.category.name
    }
  }
};
</script>
