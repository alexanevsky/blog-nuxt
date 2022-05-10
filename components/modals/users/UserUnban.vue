<template>
  <UIModal ref="modal" :id="id" :is-form="true" @form-submit.prevent="handleForm()">
    <template #body>
      <p>{{ $t('users.confirmations.unban', {username: user.username}) }}</p>
    </template>
    <template #footer>
      <div class="btn-toolbar">
        <a href="#" class="btn btn-muted mr-2" @click.prevent="close()">{{ $t('common.buttons.cancel') }}</a>
        <FormButtonSubmit :spin="isHandling" :value="$t('users.buttons.unban')" />
      </div>
    </template>
  </UIModal>
</template>

<script>
export default {
  props: {
    id: {
      type:     String,
      required: true
    },
    user: {
      type:     Object,
      required: true
    }
  },

  data: () => ({
    isHandling: false
  }),

  methods: {
    close() {
      this.$refs.modal.close();
    },

    async handleForm() {
      this.isHandling = true;

      const response = await this.$repositories.users.update(this.user.id, { isBanned: false });

      if (!response.success) {
        this.$notify.error(response.message);
        this.isHandling = false;
        return;
      }

      this.$notify.success(response.message);
      this.isHandling = false;
      this.close();
      this.$nuxt.refresh();
    }
  }
}
</script>
