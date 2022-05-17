<template>
  <div class="mb-o5">

    <!-- Post alerts -->
    <div v-if="post.isRemoved && post.permissions.restore" class="alert alert-negative mb-5 text">
      <p v-if="$params.get('blogPosts.restoreDaysLimit')">{{ $t('blogPosts.info.removedRestorable', {restorableTo: $utils.convert.datetime($utils.convert.datetimeModify(post.removedAt, {days: $params.get('blogPosts.restoreDaysLimit')}))}) }}</p>
      <p v-else>{{ $t('blogPosts.info.removed') }}</p>
    </div>

    <div v-else-if="!post.isPublished && post.permissions.update" class="alert alert-warning mb-5 text">
      <p>{{ $t('blogPosts.info.unpublished') }}</p>
    </div>

    <!-- Post header -->
    <div class="card mb-o5">
      <img v-if="post.image" class="card-image-top" :src="post.imageUrl" :alt="post.title">
      <div class="card-body">
        <div class="flex-between-center mb-o3">
          <h1 class="title-1">
            <span>{{ post.title }}</span>
            <span v-if="!post.isPublished" class="badge badge-negative ml-2">{{ $t('blogPosts.values.unpublished') }}</span>
          </h1>
        </div>
        <div class="mb-o3 text" v-html="$utils.convert.blockContent(post.description)"></div>
        <div v-if="layout !== 'sidebar'" class="label-group label-group-sm label-group-m-top">
          <template v-if="post.author">
            <NuxtLink :to="{name: 'user', params: {id: post.author.alias || post.author.id}}" class="userlabel userlabel-muted">
              <img v-if="post.author.avatar" class="userlabel-avatar" :src="post.author.avatarUrl" :alt="post.author.username" :title="$t('blogPosts.properties.author')">
              <img v-else class="userlabel-avatar" src="~/assets/images/no-avatar.png" alt="">
              <div class="userlabel-name">{{ post.author.username }}</div>
            </NuxtLink>
          </template>
          <template v-if="post.categories.length === 1">
            <NuxtLink :to="{name: 'blogCategoryPosts', params: {alias: post.categories[0].alias}}" class="label label-muted">
              <span class="label-symbol" :title="$t('blogPosts.properties.category')"><i class="fas fa-folder-open"></i></span>
              <span class="label-value">{{ post.categories[0].name }}</span>
            </NuxtLink>
          </template>
          <template v-else-if="post.categories.length">
            <span class="label label-muted">
              <span class="label-symbol" :title="$t('blogPosts.properties.categories')"><i class="fas fa-folder-open"></i></span>
              <NuxtLink v-for="category in post.categories" :key="category.id" :to="{name: 'blogCategoryPosts', params: {alias: category.alias}}" class="label-value mr-o2">{{ category.name }}</NuxtLink>
            </span>
          </template>
          <template v-if="post.publishedAt">
            <span class="label label-muted">
              <span class="label-symbol" :title="$t('blogPosts.properties.publishedAt')"><i class="fas fa-calendar"></i></span>
              <span class="label-value">{{ $utils.convert.datetime(post.publishedAt) }}</span>
            </span>
          </template>
        </div>
      </div>
    </div>

    <!-- Post body -->
    <div class="card mb-o5">
      <div class="card-body text" v-html="$utils.convert.blockContent(post.content)"></div>
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
  },

  data: () => ({
    layout: null
  }),

  created() {
    this.layout = this.$params.get('blogPosts.postLayout');
  }
}
</script>
