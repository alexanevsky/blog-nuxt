<template>
  <div v-if="categories.length" class="card mb-o5">
    <div class="card-header">
      <div class="card-title">
        <NuxtLink :to="{name: 'blogCategories'}">{{ $t('blogCategories.title') }}</NuxtLink>
      </div>
    </div>
    <ul class="list-group">
      <template v-for="category in categories">
        <NuxtLink :key="category.id" :to="{name: 'blogCategoryPosts', params: {alias: category.alias}}" class="list-group-item font-bold" active-class="active">
          <span>{{ category.name }}</span>
          <span v-if="!category.isActive" class="badge badge-muted ml-2">{{ $t('blogCategories.values.inactive') }}</span>
        </NuxtLink>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.getters['blog/sidebarCategories'];
    }
  },

  async mounted() {
    if (!this.categories.length) {
      const categories = await this.$repositories.blogCategories.fetchAll()
        .then((r) => r.data.categories)
        .catch(() => []);

      this.$store.commit('blog/setSidebarCategories', categories);
    }
  }
}
</script>
