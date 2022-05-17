<template>
  <div class="card mb-o5">
    <div class="card-body">
    <div class="label-group">
      <template v-if="post.author">
        <NuxtLink :to="{name: 'user', params: {id: post.author.alias || post.author.id}}" class="userlabel">
          <img v-if="post.author.avatar" class="userlabel-avatar" :src="post.author.avatarUrl" :alt="post.author.username">
          <img v-else class="userlabel-avatar" src="~/assets/images/no-avatar.png" alt="">
          <div class="userlabel-content">
            <span class="userlabel-title">{{ $t('blogPosts.properties.author') }}</span>
            <span class="userlabel-name">{{ post.author.username }}</span>
          </div>
        </NuxtLink>
      </template>
      <template v-if="post.categories.length === 1">
        <NuxtLink :to="{name: 'blogCategoryPosts', params: {alias: post.categories[0].alias}}" class="label">
          <span class="label-symbol"><i class="fas fa-folder-open"></i></span>
          <span class="label-content">
            <div class="label-key">{{ $t('blogPosts.properties.category') }}</div>
            <span class="label-value">{{ post.categories[0].name }}</span>
          </span>
        </NuxtLink>
      </template>
      <template v-else-if="post.categories.length">
        <div class="label">
          <span class="label-symbol"><i class="fas fa-folder-open"></i></span>
          <span class="label-content">
            <div class="label-key">{{ $t('blogPosts.properties.categories') }}</div>
            <template v-for="category in post.categories">
              <NuxtLink :key="category.id" :to="{name: 'blogCategoryPosts', params: {alias: category.alias}}" class="label-value">{{ category.name }}</NuxtLink>
            </template>
          </span>
        </div>
      </template>
      <template v-if="post.publishedAt">
        <div class="label">
          <span class="label-symbol"><i class="fas fa-calendar"></i></span>
          <span class="label-content">
            <div class="label-key">{{ $t('blogPosts.properties.publishedAt') }}</div>
            <span class="label-value">{{ $utils.convert.datetime(post.publishedAt) }}</span>
          </span>
        </div>
      </template>
    </div>
    </div>
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
