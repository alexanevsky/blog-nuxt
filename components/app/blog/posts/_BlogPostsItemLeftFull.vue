<template>
  <div class="card mb-o5" :id="`post-${post.id}`">
    <div class="row">
      <div v-if="post.image" class="col-md-4 pr-0 d-none d-md-block">
        <NuxtLink :to="{name: 'blogPost', params: {id: post.id}}">
          <img class="w-100 h-100 rounded-left object-fit-cover" :src="post.imageUrl" :alt="post.title">
        </NuxtLink>
      </div>
      <div :class="post.image ? 'col-md-8 pl-md-0' : 'col-12'">
        <div class="card-body d-flex flex-column h-100">
          <BlogPostsItemHeader :post="post" />
          <BlogPostsItemContent :post="post" />
          <BlogPostsItemFooter :post="post" />
        </div>
      </div>
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
  }
}
</script>
