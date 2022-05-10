<template>
  <AppUserUpdatePassword :user="user" @form-handled="formHandled()" />
</template>

<script>
export default {
  async asyncData({ params, error, redirect, $repositories, $auth, $t }) {
    const response = await $repositories.users.fetch(params.id);

    if (!response.success) {
      error({statusCode: response.status, message: response.message});
      return;
    }

    const user = response.data.user;

    if (user.alias && user.id === parseInt(params.id)) {
      redirect(301, { name: 'userUpdatePassword', params: { id: user.alias } });
      return;
    } else if (!user.permissions.update) {
      error({statusCode: 403, message: $t('common.messages.accessDenied') });
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
  }
}
</script>
