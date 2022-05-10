<template>
  <LayoutContainer>
    <template #breadcrumbs>
      <LayoutBreadcrumb name="users.title" to="users" />
      <LayoutBreadcrumb :name="user.username" :to="{name: 'user', params: {id: user.alias || user.id}}" />
      <LayoutBreadcrumb name="users.titles.updateBan" :to="{name: 'userUpdateBan', params: {id: user.alias || user.id}}" :active="true" />
    </template>

    <LayoutContainerWrapper>
      <LayoutContainerSidebar :sticky="true">
        <AppUserSidebar :user="user" />
      </LayoutContainerSidebar>
      <LayoutContainerMain>
        <AppUserEditBan :user="user" @form-handled="formHandled()" />
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
      redirect(301, { name: 'userUpdateBan', params: { id: user.alias } });
      return;
    }

    return {
      user
    };
  },

 methods: {
    formHandled() {
      this.$nuxt.refresh();
      this.$router.push({name: 'user', params: {id: this.user.id}});
    }
  },

  head() {
    return {
      title: this.user.username
    }
  }
}
</script>
