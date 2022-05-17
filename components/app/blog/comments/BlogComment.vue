<template>
  <div class="comment" :id="`comment-${comment.id}`">
    <div class="comment-body">
      <div class="comment-header">
        <NuxtLink v-if="comment.author" :to="{name: 'user', params: {id: comment.author.alias || comment.author.id}}" class="comment-userlabel userlabel userlabel-sm text-nowrap">
          <img v-if="comment.author.avatar" class="userlabel-avatar" :src="comment.author.avatarUrl" :alt="comment.author.username">
          <img v-else class="userlabel-avatar" src="~/assets/images/no-avatar.png" alt="">
          <span class="userlabel-name">{{ comment.author.username }}</span>
        </NuxtLink>
        <div v-else class="comment-userlabel userlabel userlabel-sm text-nowrap">
          <span class="userlabel-name text-muted">Deleted user</span>
        </div>
        <div class="comment-toolbar">
          <UIActionsMenu>
            <UIActionsMenuItem v-if="comment.permissions.update && !update" :label="$t('blogComments.buttons.update')" @click.prevent="update = true" />
            <UIActionsMenuModal v-if="comment.permissions.remove && !comment.isRemoved" modal="ModalBlogCommentRemove" :binds="{comment}" :label="$t('blogComments.buttons.remove')" />
            <UIActionsMenuModal v-if="comment.permissions.restore" modal="ModalBlogCommentRestore" :binds="{comment}" :label="$t('blogComments.buttons.restore')" />
            <UIActionsMenuModal v-if="comment.permissions.delete && comment.isRemoved" modal="ModalBlogCommentDelete" :binds="{comment}" :label="$t('blogComments.buttons.delete')" />
          </UIActionsMenu>
        </div>
      </div>
      <template v-if="!update">
        <div v-if="!comment.isRemoved" class="comment-content text" v-html="$utils.convert.blockContent(comment.content)"></div>
        <div v-else class="comment-content text-muted">
          {{ $t('blogComments.values.removed') }}
        </div>
      </template>
      <template v-else>
        <AppBlogCommentForm :comment="comment" @cancel="update = false" @form-handled="update = false" />
      </template>
      <div class="comment-footer">
        <div class="comment-date">{{ $utils.convert.datetime(comment.createdAt) }}</div>
        <div class="comment-footer-link-group">
          <a v-if="comment.permissions.reply && !reply" href="#" class="comment-footer-link" @click.prevent="reply = true">{{ $t('blogComments.buttons.reply') }}</a>
        </div>
      </div>
    </div>
    <div v-if="reply" class="comment-reply">
      <component :is="reply ? `AppBlogCommentCreate` : null" :parent="comment" @cancel="reply = false" @form-handled="reply = false" />
    </div>
    <div v-if="comment.childrenComments && comment.childrenComments.length" class="comment-replies">
      <AppBlogComment v-for="child in comment.childrenComments" :key="child.id" :comment="child" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type:     Object,
      required: true
    }
  },

  data: () => ({
    reply:  false,
    update: false
  })
}
</script>