<template>
  <UIModal ref="modal" :id="id" :is-form="true" @form-submit.prevent="handleForm()">
    <template #body>
      <template v-if="!$params.get('users.restoreDaysLimit')">
        <p>{{ $t('users.confirmations.remove', {username: user.username}) }}</p>
      </template>
      <template v-else>
        <p>{{ $t('users.confirmations.removeRestorable', {username: user.username, days: $params.get('users.restoreDaysLimit')}) }}</p>
        <hr>
        <div class="form-group">
          <FormCheckbox v-model="erase" :id="`${id}-erase`" :label="$t('users.removeForm.labels.erase')" />
        </div>
      </template>
    </template>
    <template #footer>
      <div class="btn-toolbar">
        <a href="#" class="btn btn-muted mr-2" @click.prevent="close()">{{ $t('common.buttons.cancel') }}</a>
        <FormButtonSubmit :spin="isHandling" color="negative" :value="$t(`users.buttons.${erase ? 'erase' : 'remove'}`)" />
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
    isHandling: false,
    erase:      false
  }),

  methods: {
    close() {
      this.$refs.modal.close();
    },

    async handleForm() {
      this.isHandling = true;

      const response = this.erase
        ? await this.$repositories.users.erase(this.user.id)
        : await this.$repositories.users.remove(this.user.id);

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
