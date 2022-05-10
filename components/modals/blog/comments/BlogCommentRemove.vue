<template>
  <UIModal ref="modal" :id="id" :is-form="true" @form-submit.prevent="handleForm()">
    <template #body>
      <p>{{ $t('blogComments.confirmations.remove') }}</p>
      <hr>
      <div class="form-group">
        <FormCheckbox v-model="deletePermanently" :id="`${id}-deletePermanently`" :label="$t('blogComments.removeForm.labels.delete')" />
      </div>
    </template>
    <template #footer>
      <div class="btn-toolbar">
        <a href="#" class="btn btn-muted mr-2" @click.prevent="close()">{{ $t('common.buttons.cancel') }}</a>
        <FormButtonSubmit :spin="isHandling" color="negative" :value="$t(`blogComments.buttons.${deletePermanently ? 'delete' : 'remove'}`)" />
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
    comment: {
      type:     Object,
      required: true
    }
  },

  data: () => ({
    isHandling:         false,
    deletePermanently:  false
  }),

  methods: {
    close() {
      this.$refs.modal.close();
    },

    async handleForm() {
      this.isHandling = true;

      const response = this.deletePermanently
          ? await this.$repositories.blogComments.delete(this.comment.id)
          : await this.$repositories.blogComments.remove(this.comment.id);

      if (!response.success) {
        this.$notify.error(e.message);
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
