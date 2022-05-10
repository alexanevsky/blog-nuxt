<template>
  <div class="card mt-o5">
    <div class="card-header">
      <div class="card-title">{{ $t('blogPosts.properties.comments') }}</div>
    </div>
    <div v-if="comments.length" class="card-body comments">
      <AppBlogComment v-for="comment in commentsTree" :key="comment.id" :comment="comment" />
    </div>
    <div class="card-body">
      <AppBlogCommentCreate v-if="post.permissions.createComment" :post="post" />
      <div v-else class="alert alert-negative">{{ $t(`blogComments.messages.commentCreate.${!$auth.loggedIn ? 'needAuth' : 'accessDenied'}`) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type:     Object,
      required: true
    },
    comments: {
      type: Array
    }
  },

  computed: {
    commentsTree() {
      if (!this.comments.length || this.comments[0].childrenComments) {
        return this.comments;
      }

      const tree = this.comments
        .filter((c) => !c.parentComment)
        .map((c) => this.parseChildren(c));

      return tree;
    }
  },

  methods: {
    parseChildren(comment) {
      return {
        ...comment,
        childrenComments: this.comments
          .filter((c) => c.parentComment && c.parentComment.id === comment.id)
          .map((c) => this.parseChildren(c))
      };
    }
  }
}
</script>
