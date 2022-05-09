<template>
  <LayoutContainer>
    <template #breadcrumbs>
      <LayoutBreadcrumb :name="$t('security.titles.login')" to="authLogin" />
    </template>

    <div class="row">
      <div class="col-md-4 offset-md-4">
        <div class="card">
          <form @submit.prevent="handleForm()" novalidate>
            <div class="card-header">
              <div class="card-title">{{ $t('security.titles.login') }}</div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="form-label required" for="email">{{ $t('security.loginForm.labels.email') }}:</label>
                <div class="form-field">
                  <input type="email" class="form-input" v-model="data.email" required>
                </div>
                <FormError :error="errors.email" />
              </div>
              <div class="form-group">
                <label class="form-label required" for="password">{{ $t('security.loginForm.labels.password') }}:</label>
                <div class="form-field">
                  <input type="password" class="form-input" v-model="data.password" required>
                </div>
                <FormError :error="errors.password" />
                <!-- <div class="form-help text-right">
                  <a href="#">Reset password</a>
                </div> -->
              </div>
            </div>
            <div class="card-footer">
              <button type="submit" class="btn btn-primary">{{ $t('security.loginForm.submit') }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </LayoutContainer>
</template>

<script>
export default {
  middleware: [
    ({ $auth, redirect }) => {
      if ($auth.loggedIn) {
        redirect('/');
      }
    }
  ],

  data: () => ({
    data: {
      email:    'dumbledore@hogwarts.uk',
      password: '123456'
    },
    errors: {}
  }),

  methods: {
    async handleForm() {
      const data = {
        email:    this.data.email,
        password: this.data.password
      };

      this.errors = {};

      const response = await this.$auth.loginWith('local', { data })
        .then(r => r.data)
        .catch(e => e.response.data || {});

      if (!response.success) {
        this.$notify.error(response.message);
        this.errors = response.errors || {};
        return;
      }

      if (response.message) {
        this.$notify.success(response.message);
      }

      this.$router.push({ name: 'index' });
    }
  }
}
</script>
