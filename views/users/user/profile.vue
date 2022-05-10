<template>
  <AppUserProfile :user="user" />
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
  }
}
</script>
