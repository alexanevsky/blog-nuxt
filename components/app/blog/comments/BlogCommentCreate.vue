<template>
  <div class="comment">
    <div class="comment-body">
      <div class="comment-header">
        <div class="comment-userlabel userlabel userlabel-sm">
            <img class="userlabel-avatar" :src="$auth.user.avatarUrl" :alt="$auth.user.username">
            <span class="userlabel-name">{{ $auth.user.username }}</span>
        </div>
      </div>
      <div class="comment-content">
        <AppBlogCommentForm :post="post" :parent="parent" @cancel="$emit('cancel')" @form-handled="$emit('form-handled')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object
    },
    parent: {
      type: Object
    }
  }
}
</script>
