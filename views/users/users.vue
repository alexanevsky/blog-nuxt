<template>
  <LayoutContainer>
    <template #breadcrumbs>
      <LayoutBreadcrumb name="users.title" to="users" :active="true" />
    </template>

    <template #toolbar>
      <NuxtLink v-if="$security.isGranted('createUser')" :to="{name: 'userCreate'}" class="btn btn-positive">{{ $t('users.buttons.create') }}</NuxtLink>
    </template>

    <AppUsersList :users="users" />
    <UIPaginationRouted :meta="meta" class="mt-5" />
  </LayoutContainer>
</template>

<script>
export default {
  async asyncData({ params, error, $repositories }) {
    const response = await $repositories.users.fetchAll(params.page || 1);

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
