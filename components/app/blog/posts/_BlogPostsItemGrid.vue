<template>
  <div class="card" :id="`post-${post.id}`">
    <NuxtLink v-if="layout !== 'top' && post.image" :to="{name: 'blogPost', params: {id: post.id}}">
      <img class="card-image-top" :src="post.imageUrl" :alt="post.title">
    </NuxtLink>

    <div class="card-body d-flex flex-column">
      <div v-if="layout === 'top' && post.image" class="d-block mb-3">
        <NuxtLink :to="{name: 'blogPost', params: {id: post.id}}">
          <img class="w-100 rounded" :src="post.imageUrl" :alt="post.title">
        </NuxtLink>
      </div>

      <BlogPostsItemHeader :post="post" />
      <BlogPostsItemContent :post="post" />
      <BlogPostsItemFooter :post="post" :exclude="['author', 'readmore']" />
    </div>
  </div>
</template>

<script>
import BlogPostsItemContent from './_BlogPostsItemContent.vue';
import BlogPostsItemFooter  from './_BlogPostsItemFooter.vue';
import BlogPostsItemHeader  from './_BlogPostsItemHeader.vue';

export default {
  components: {
    BlogPostsItemContent,
    BlogPostsItemFooter,
    BlogPostsItemHeader
  },

  props: {
    post: {
      type:     Object,
      required: true
    }
  },

  data: () => ({
    layout: null
  }),

  created() {
    this.layout = this.$params.get('blogPosts.postsItemLayout');
  }
}
</script>
