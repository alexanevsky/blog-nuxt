<template>
  <div class="flex-between-end mt-auto">
    <div class="label-group label-group-sm label-group-m-top">
      <template v-if="post.author && !exclude.includes('readmore')">
        <NuxtLink :to="{name: 'user', params: {id: post.author.alias || post.author.id}}" class="userlabel userlabel-muted">
          <img v-if="post.author.avatar" class="userlabel-avatar" :src="post.author.avatarUrl" :alt="post.author.username" :title="$t('blogPosts.properties.author')">
          <img v-else class="userlabel-avatar" src="~/assets/images/no-avatar.png" alt="">
          <div class="userlabel-name">{{ post.author.username }}</div>
        </NuxtLink>
      </template>
      <template v-if="post.publishedAt">
        <span class="label label-muted">
          <span class="label-symbol" :title="$t('blogPosts.properties.publishedAt')"><i class="fas fa-calendar"></i></span>
          <span class="label-value">{{ $utils.convert.date(post.publishedAt) }}</span>
        </span>
      </template>
    </div>
    <NuxtLink v-if="!exclude.includes('readmore')" class="btn btn-readmore btn-sm d-none d-md-block" :to="{name: 'blogPost', params: {id: post.id}}">
      <span class="btn-readmore-value">{{ $t('blogPosts.buttons.readmore') }}</span>
      <i class="btn-readmore-icon fas fa-chevron-right"></i>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type:     Object,
      required: true
    },
    exclude: {
      type:     Array,
      default:  () => []
    }
  }
}
</script>
