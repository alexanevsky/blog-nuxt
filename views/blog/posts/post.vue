<template>
  <LayoutContainer>
    <template #breadcrumbs>
      <LayoutBreadcrumb name="blog.title" to="blogPosts" />
      <LayoutBreadcrumb :name="post.title" :to="{name: 'blogPost', params: {id: post.id}}" :active="true" />
    </template>
    <template #toolbar>
      <ModalButton v-if="post.permissions.update && !post.isPublished" modal="ModalBlogPostPublish" :binds="{post}" class="btn btn-primary mr-o2" :label="$t('blogPosts.buttons.publish')" />
      <NuxtLink v-if="post.permissions.update" :to="{name: 'blogPostUpdate', params: {id: post.id}}" class="btn btn-primary mr-o2">{{ $t('blogPosts.buttons.update') }}</NuxtLink>
      <ModalButton v-if="post.permissions.remove && !post.isRemoved" modal="ModalBlogPostRemove" :binds="{post}" class="btn btn-negative mr-o2" :label="$t('blogPosts.buttons.remove')" />
      <ModalButton v-if="post.permissions.restore" modal="ModalBlogPostRestore" :binds="{post}" class="btn btn-positive mr-o2" :label="$t('blogPosts.buttons.restore')" />
      <ModalButton v-if="post.permissions.delete && post.isRemoved" modal="ModalBlogPostDelete" :binds="{post}" class="btn btn-negative mr-o2" :label="$t('blogPosts.buttons.delete')" />
    </template>

    <LayoutContainerWrapper>
      <component :is="layout === 'fullwidth' ? `LayoutContainerFull` : `LayoutContainerMain`">
        <AppBlogPost :post="post" />
        <AppBlogComments :post="post" :comments="comments" />
      </component>
      <LayoutContainerSidebar v-if="layout === 'sidebar'" :sticky="true">
        <AppBlogPostSidebar :post="post" />
      </LayoutContainerSidebar>
    </LayoutContainerWrapper>
  </LayoutContainer>
</template>

<script>
export default {
  async asyncData({ params, error, $repositories }) {
    const postResponse = await $repositories.blogPosts.fetch(params.id);
    const commentsResponse = await $repositories.blogComments.fetchByPost(params.id);

    if (!postResponse.success) {
      error({statusCode: postResponse.status, message: postResponse.message});
      return;
    } else if (!commentsResponse.success) {
      error({statusCode: commentsResponse.status, message: commentsResponse.message});
      return;
    }

    return {
      post:     postResponse.data.post,
      comments: commentsResponse.data.comments
    };
  },

  data: () => ({
    layout: null
  }),

  created() {
    this.layout = this.$params.get('blogPosts.postLayout');
  },

  head() {
    return {
      title: this.post.title
    }
  }
}
</script>
