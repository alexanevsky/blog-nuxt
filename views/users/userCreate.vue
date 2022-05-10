<template>
  <LayoutContainer>
    <template #breadcrumbs>
      <LayoutBreadcrumb name="users.title" to="users" />
      <LayoutBreadcrumb name="users.titles.create" to="userCreate" :active="true" />
    </template>

    <div class="row">
      <div class="col-md-6 offset-md-3">
        <AppUserCreate @form-handled="formHandled($event)" />
      </div>
    </div>
  </LayoutContainer>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t('users.titles.create')
    }
  },

  methods: {
    formHandled(e) {
      this.$router.push({ name: 'user', params: { id: e.user.id } });
    }
  }
}
</script>
