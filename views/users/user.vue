<template>
  <LayoutContainer>
    <template #breadcrumbs>
      <LayoutBreadcrumb name="users.title" to="users" />
      <template v-if="!nestedBreadcrumb">
        <LayoutBreadcrumb :name="user.username" :to="{name: 'user', params: {id: user.alias || user.id}}" :active="true" />
      </template>
      <template v-else>
        <LayoutBreadcrumb :name="user.username" :to="{name: 'user', params: {id: user.alias || user.id}}" />
        <LayoutBreadcrumb :name="nestedBreadcrumb.name" :to="nestedBreadcrumb.to" :active="true" />
      </template>
    </template>

    <template #toolbar>
      <template v-if="$route.name === 'user'">
        <ModalButton v-if="user.permissions.update && user.isBanned" modal="ModalUserUnban" :binds="{user}" class="btn btn-primary mr-o2" :label="$t('users.buttons.unban')" />
        <NuxtLink v-if="user.permissions.update" :to="{name: 'userUpdate', params: {id: user.alias || user.id}}" class="btn btn-primary mr-o2">{{ $t('users.buttons.update') }}</NuxtLink>
        <ModalButton v-if="user.permissions.remove && !user.isRemoved" modal="ModalUserRemove" :binds="{user}" class="btn btn-negative mr-o2" :label="$t('users.buttons.remove')" />
        <ModalButton v-if="user.permissions.restore" modal="ModalUserRestore" :binds="{user}" class="btn btn-positive mr-o2" :label="$t('users.buttons.restore')" />
        <ModalButton v-if="user.permissions.erase && user.isRemoved" modal="ModalUserErase" :binds="{user}" class="btn btn-negative mr-o2" :label="$t('users.buttons.erase')" />
      </template>
    </template>

    <LayoutContainerWrapper>
      <LayoutContainerSidebar :sticky="true">
        <AppUserSidebar :user="user" />
      </LayoutContainerSidebar>
      <LayoutContainerMain>
        <NuxtChild />
      </LayoutContainerMain>
    </LayoutContainerWrapper>
  </LayoutContainer>
</template>

<script>
export default {
  async asyncData({ params, error, $repositories }) {
    const response = await $repositories.users.fetch(params.id);

    if (!response.success) {
      error({statusCode: response.status, message: response.message});
      return;
    }

    return {
      user: response.data.user
    };
  },

  computed: {
    nestedBreadcrumb() {
      const name = this.$utils.convert.case.camel(this.$route.name.substring(4));
      const transKey = `users.titles.${name}`;

      if (this.$route.name.indexOf('user') === 0 && this.$route.name !== 'user' && name !== this.$t(transKey)) {
        return {
          name: `users.titles.${name}`,
          to:   { name: this.$route.name, params: this.$route.params }
        }
      }

      return null;
    }
  },

  head() {
    return {
      title: this.user.username
    }
  }
}
</script>
