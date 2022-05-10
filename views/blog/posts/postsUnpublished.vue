<template>
  <LayoutContainer>
    <template #breadcrumbs>
      <LayoutBreadcrumb name="blog.title" to="blogPosts" />
      <LayoutBreadcrumb name="blogPosts.titles.postsUnpublished" to="blogPostsUnpublished" :active="true" />
    </template>

    <AppBlogPostsLayout>
      <template v-if="posts.length">
        <AppBlogPostsList :posts="posts" />
      </template>
      <template v-else>
        <div class="alert alert-muted">{{ $t('blogPosts.messages.emptyUnpublished') }}</div>
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
    const response = await $repositories.blogPosts.fetchUnpublished(params.page || 1);

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
      title: this.$t('blogPosts.titles.postsUnpublished')
    }
  }
};
</script>
