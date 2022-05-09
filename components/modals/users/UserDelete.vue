<template>
  <UIModal ref="modal" :id="id" :is-form="true" @form-submit.prevent="handleForm()">
    <template #body>
      <template v-if="!$params.get('users.restoreDaysLimit')">
        <p>{{ $t('users.confirmations.delete', {username: user.username}) }}</p>
      </template>
      <template v-else>
        <p>{{ $t('users.confirmations.deleteRestorable', {username: user.username, days: $params.get('users.restoreDaysLimit')}) }}</p>
        <hr>
        <div class="form-group">
          <FormCheckbox v-model="erase" :id="`${id}-erase`" :label="$t('users.deleteForm.labels.erase')" />
        </div>
      </template>
    </template>
    <template #footer>
      <div class="btn-toolbar">
        <a href="#" class="btn btn-muted mr-2" @click.prevent="close()">{{ $t('common.buttons.cancel') }}</a>
        <FormButtonSubmit :spin="isHandling" color="negative" :value="$t(`users.buttons.${erase ? 'erase' : 'delete'}`)" />
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
    isHandling: false,
    erase:      false
  }),

  methods: {
    async handleForm() {
      this.isHandling = true;

      let response;

      try {
        response = this.erase
          ? await this.$repositories.users.erase(this.user.id)
          : await this.$repositories.users.delete(this.user.id);
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
