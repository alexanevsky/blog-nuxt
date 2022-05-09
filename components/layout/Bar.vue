<template>
  <div v-if="breadcrumbs.length" class="flex-md-between-center mb-4">
    <ul v-if="breadcrumbs.length" class="breadcrumbs">
      <li class="breadcrumbs-item">
        <NuxtLink :to="{name: 'index'}" class="breadcrumbs-link"><i class="fas fa-home"></i></NuxtLink>
      </li>
      <li v-for="(breadcrumb, i) in breadcrumbs" :key="i" class="breadcrumbs-item">
        <NuxtLink v-if="breadcrumb.to && !breadcrumb.active" :to="breadcrumb.to" class="breadcrumbs-link">{{ breadcrumb.name }}</NuxtLink>
        <span v-else class="breadcrumbs-value">{{ breadcrumb.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      return this.$breadcrumbs.all();
    }
  }
};
</script>
