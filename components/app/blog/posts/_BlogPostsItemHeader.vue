<template>
  <div class="flex-between-center mb-o3">
    <div class="title-2">
      <NuxtLink :to="{name: 'blogPost', params: {id: post.id}}" class="ml-o2">{{ post.title }}</NuxtLink>
      <span v-if="!post.isPublished" class="badge badge-negative">{{ $t('blogPosts.values.unpublished') }}</span>
    </div>
    <UIActionsMenu>
      <UIActionsMenuModal v-if="post.permissions.update && !post.isPublished" modal="ModalBlogPostPublish" :binds="{post}" :label="$t('blogPosts.buttons.publish')" />
      <UIActionsMenuLink v-if="post.permissions.update" :to="{name: 'blogPostUpdate', params: {id: post.id}}" :label="$t('blogPosts.buttons.update')" />
      <UIActionsMenuModal v-if="post.permissions.remove && !post.isRemoved" modal="ModalBlogPostRemove" :binds="{post}" :label="$t('blogPosts.buttons.remove')" />
      <UIActionsMenuModal v-if="post.permissions.restore" modal="ModalBlogPostRestore" :binds="{post}" :label="$t('blogPosts.buttons.restore')" />
      <UIActionsMenuModal v-if="post.permissions.delete && post.isRemoved" modal="ModalBlogPostDelete" :binds="{post}" :label="$t('blogPosts.buttons.delete')" />
    </UIActionsMenu>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type:     Object,
      required: true
    }
  }
}
</script>
