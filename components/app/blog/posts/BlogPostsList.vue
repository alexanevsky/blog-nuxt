<template>
  <div :class="listLayout === 'grid' ? 'grid grid-md-2 grid-lg-3 mb-o5' : 'mb-o5'">
    <template v-for="post in posts">
      <component :is="itemComponent" :key="post.id" :post="post" />
    </template>
  </div>
</template>

<script>
import BlogPostsItemGrid      from './_BlogPostsItemGrid.vue';
import BlogPostsItemLeft      from './_BlogPostsItemLeft.vue';
import BlogPostsItemLeftFull  from './_BlogPostsItemLeftFull.vue';
import BlogPostsItemTop       from './_BlogPostsItemTop.vue';

export default {
  components: {
    BlogPostsItemGrid,
    BlogPostsItemLeft,
    BlogPostsItemLeftFull,
    BlogPostsItemTop
  },

  props: {
    posts: {
      type:     Array,
      required: true
    }
  },

  data: () => ({
    listLayout:     null,
    itemLayout:     null,
    itemComponent:  null
  }),

  created() {
    this.listLayout = this.$params.get('blogPosts.postsLayout');
    this.itemLayout = this.$params.get('blogPosts.postsItemLayout');

    if (this.listLayout === 'grid') {
      this.itemComponent = BlogPostsItemGrid;
    } else if (this.itemLayout === 'left_full') {
      this.itemComponent = BlogPostsItemLeftFull;
    } else if (this.itemLayout === 'left') {
      this.itemComponent = BlogPostsItemLeft;
    } else {
      this.itemComponent = BlogPostsItemTop;
    }
  }
}
</script>
