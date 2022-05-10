<template>
  <UIModal ref="modal" :id="id" :is-form="true" @form-submit.prevent="handleForm()">
    <template #body>
      <template v-if="!$params.get('blogPosts.restoreDaysLimit')">
        <p>{{ $t('blogPosts.confirmations.remove', {title: post.title}) }}</p>
      </template>
      <template v-else>
        <p>{{ $t('blogPosts.confirmations.removeRestorable', {title: post.title, days: $params.get('blogPosts.restoreDaysLimit')}) }}</p>
        <hr>
        <div class="form-group">
          <FormCheckbox v-model="deletePermanently" :id="`${id}-force`" :label="$t('blogPosts.removeForm.labels.delete')" />
        </div>
      </template>
    </template>
    <template #footer>
      <div class="btn-toolbar">
        <a href="#" class="btn btn-muted mr-2" @click.prevent="close()">{{ $t('common.buttons.cancel') }}</a>
        <FormButtonSubmit :spin="isHandling" color="negative" :value="$t(`blogPosts.buttons.${deletePermanently ? 'delete' : 'remove'}`)" />
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
    post: {
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
          ? await this.$repositories.blogPosts.delete(this.post.id)
          : await this.$repositories.blogPosts.remove(this.post.id);

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
