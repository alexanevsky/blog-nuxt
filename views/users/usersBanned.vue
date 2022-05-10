<template>
  <LayoutContainer>
    <template #breadcrumbs>
      <LayoutBreadcrumb name="users.title" to="users" />
      <LayoutBreadcrumb name="users.titles.usersBanned" to="usersBanned" :active="true" />
    </template>

    <template v-if="users.length">
      <AppUsersList :users="users" />
      <UIPaginationRouted :meta="meta" class="mt-5" />
    </template>
    <template v-else>
      <div class="alert alert-muted">{{ $t('users.messages.emptyBanned') }}</div>
    </template>
  </LayoutContainer>
</template>

<script>
export default {
  async asyncData({ params, error, $repositories }) {
    const response = await $repositories.users.fetchBanned(params.page || 1);

    if (!response.success) {
      error({statusCode: response.status, message: response.message});
      return;
    }

    return {
      users:  response.data.users,
      meta:   response.data.usersMeta
    }
  },

  head() {
    return {
      title: this.$t('users.title')
    }
  }
}
</script>
