<template>
  <LayoutContainer>
    <template #breadcrumbs>
      <LayoutBreadcrumb name="blog.title" to="blogPosts" />
      <template v-if="post">
        <LayoutBreadcrumb :name="post.title" :to="{name: 'blogPost', params: {id: post.id}}" />
        <LayoutBreadcrumb name="blogPosts.titles.update" :to="{name: 'blogPostUpdate', params: {id: post.id}}" :active="true" />
      </template>
      <template v-else>
        <LayoutBreadcrumb name="blogPosts.titles.create" to="blogPostCreate" :active="true" />
      </template>
    </template>

    <AppBlogPostForm :post="post || null" :category-id="categoryId" @form-handled="handleForm($event)" />
  </LayoutContainer>
</template>

<script>
export default {
  async asyncData({ params, error, $repositories }) {
    if (!params.id) {
      return {
        post: null
      };
    }

    const response = await $repositories.blogPosts.fetch(params.id);

    if (!response.success) {
      error({statusCode: e.status, message: e.message});
      return;
    }

    return {
      post: response.data.post
    };
  },

  computed: {
    categoryId() {
      return this.$route.query.category ? parseInt(this.$route.query.category) : null;
    }
  },

  head() {
    return {
      title: this.post ? this.post.title : this.$t('blogPosts.titles.create')
    }
  },

  methods: {
    async handleForm(e) {
      this.$router.push({ name: 'blogPost', params: { id: e.post.id } });
    }
  }
}
</script>
