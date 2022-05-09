<template>
  <UIModal ref="modal" :id="id" :is-form="true" @form-submit.prevent="handleForm()">
    <template #body>
      <p>{{ $t('users.confirmations.restore', {username: user.username}) }}</p>
    </template>
    <template #footer>
      <div class="btn-toolbar">
        <a href="#" class="btn btn-muted mr-2" @click.prevent="close()">{{ $t('common.buttons.cancel') }}</a>
        <FormButtonSubmit :spin="isHandling" color="positive" :value="$t('users.buttons.restore')" />
      </div>
    </template>
  </UIModal>
</template>

<script>
export default {
  props: {
    user: {
      type:     Object,
      required: true
    },
    id: {
      type:     String,
      required: true
    }
  },

  data: () => ({
    isHandling: false
  }),

  methods: {
    async handleForm() {
      this.isHandling = true;

      let response;

      try {
        response = await this.$repositories.users.restore(this.user.id);
      } catch (e) {
        this.$notify.error(e.message);
        this.isHandling = false;
        return;
      }

      this.$notify.success(response.message);
      this.isHandling = false;
      this.$refs.modal.close();
      this.$nuxt.refresh();
    }
  }
}
</script>
