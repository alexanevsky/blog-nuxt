<template>
  <LayoutContainer>
    <template #breadcrumbs>
      <LayoutBreadcrumb name="blog.title" to="blogPosts" :active="true" />
    </template>
    <template #toolbar>
      <NuxtLink v-if="$security.isGranted('createBlogPost')" :to="{name: 'blogPostCreate'}" class="btn btn-positive">{{ $t('blogPosts.buttons.create') }}</NuxtLink>
    </template>

    <AppBlogPostsLayout>
      <template v-if="posts.length">
        <AppBlogPostsList :posts="posts" />
      </template>
      <template v-else>
        <div class="alert alert-muted">{{ $t('blogPosts.messages.empty') }}</div>
      </template>

      <template #pagination>
        <UIPaginationRouted :meta="meta" />
      </template>
    </AppBlogPostsLayout>
  </LayoutContainer>
</template>

<script>
export default {
  async asyncData({ params, error, $repositories }) {
    const response = await $repositories.blogPosts.fetchAll(params.page || 1);

    if (!response.success) {
      error({statusCode: response.status, message: response.message});
      return;
    }

    return {
      posts:  response.data.posts,
      meta:   response.data.postsMeta
    }
  },

  head() {
    return {
      title: this.$t('blog.title')
    }
  }
};
</script>
