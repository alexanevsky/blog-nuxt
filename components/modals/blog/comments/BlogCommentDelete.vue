<template>
  <UIModal ref="modal" :id="id" :is-form="true" @form-submit.prevent="handleForm()">
    <template #body>
      <p>{{ $t('blogComments.confirmations.delete') }}</p>
      <template v-if="comment.childrenComments && comment.childrenComments.length">
        <hr>
        <div class="form-group">
          <FormCheckbox v-model="force" :id="`${id}-force`" :label="$t('blogComments.deleteForm.labels.force')" />
        </div>
      </template>
    </template>
    <template #footer>
      <div class="btn-toolbar">
        <a href="#" class="btn btn-muted mr-2" @click.prevent="close()">{{ $t('common.buttons.cancel') }}</a>
        <FormButtonSubmit :spin="isHandling" color="negative" :value="$t(`blogComments.buttons.${force ? 'deleteForce' : 'delete'}`)" />
      </div>
    </template>
  </UIModal>
</template>

<script>
export default {
  props: {
    comment: {
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
    force:      false
  }),

  methods: {
    async handleForm() {
      this.isHandling = true;

      let response;

      try {
        response = this.force
          ? await this.$repositories.comments.delete(this.comment.id, true)
          : await this.$repositories.comments.delete(this.comment.id);
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
