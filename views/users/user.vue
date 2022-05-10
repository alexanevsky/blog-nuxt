<template>
  <LayoutContainer>
    <template #breadcrumbs>
      <LayoutBreadcrumb name="users.title" to="users" />
      <LayoutBreadcrumb :name="user.username" :to="{name: 'user', params: {id: user.alias || user.id}}" :active="true" />
    </template>

    <template #toolbar>
      <ModalButton v-if="user.permissions.update && user.isBanned" modal="ModalUserUnban" :binds="{user}" class="btn btn-primary mr-o2" :label="$t('users.buttons.unban')" />
      <NuxtLink v-if="user.permissions.update" :to="{name: 'userUpdate', params: {id: user.alias || user.id}}" class="btn btn-primary mr-o2">{{ $t('users.buttons.update') }}</NuxtLink>
      <ModalButton v-if="user.permissions.remove && !user.isRemoved" modal="ModalUserRemove" :binds="{user}" class="btn btn-negative mr-o2" :label="$t('users.buttons.remove')" />
      <ModalButton v-if="user.permissions.restore" modal="ModalUserRestore" :binds="{user}" class="btn btn-positive mr-o2" :label="$t('users.buttons.restore')" />
      <ModalButton v-if="user.permissions.erase && user.isRemoved" modal="ModalUserErase" :binds="{user}" class="btn btn-negative mr-o2" :label="$t('users.buttons.erase')" />
    </template>

    <LayoutContainerWrapper>
      <LayoutContainerSidebar :sticky="true">
        <AppUserSidebar :user="user" />
      </LayoutContainerSidebar>
      <LayoutContainerMain>
        <AppUserProfile :user="user" />
      </LayoutContainerMain>
    </LayoutContainerWrapper>
  </LayoutContainer>
</template>

<script>
export default {
  async asyncData({ params, error, redirect, $repositories }) {
    const response = await $repositories.users.fetch(params.id);

    if (!response.success) {
      error({statusCode: response.status, message: response.message});
      return;
    }

    const user = response.data.user;

    if (user.alias && user.id === parseInt(params.id)) {
      redirect(301, {name: 'user', params: {id: user.alias}});
      return;
    }

    return { user };
  },

  head() {
    return {
      title: this.user.username
    }
  }
}
</script>
