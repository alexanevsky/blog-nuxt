<template>
  <UIModal ref="modal" :id="id" :is-form="true" @form-submit.prevent="handleForm()">
    <template #body>
      <template v-if="!$params.get('blogPosts.restoreDaysLimit')">
        <p>{{ $t('blogPosts.confirmations.delete', {title: post.title}) }}</p>
      </template>
      <template v-else>
        <p>{{ $t('blogPosts.confirmations.deleteRestorable', {title: post.title, days: $params.get('blogPosts.restoreDaysLimit')}) }}</p>
        <hr>
        <div class="form-group">
          <FormCheckbox v-model="force" :id="`${id}-force`" :label="$t('blogPosts.deleteForm.labels.force')" />
        </div>
      </template>
    </template>
    <template #footer>
      <div class="btn-toolbar">
        <a href="#" class="btn btn-muted mr-2" @click.prevent="close()">{{ $t('common.buttons.cancel') }}</a>
        <FormButtonSubmit :spin="isHandling" color="negative" :value="$t(`blogPosts.buttons.${force ? 'deleteForce' : 'delete'}`)" />
      </div>
    </template>
  </UIModal>
</template>

<script>
export default {
  props: {
    post: {
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
          ? await this.$repositories.posts.delete(this.post.id, true)
          : await this.$repositories.posts.delete(this.post.id);
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
