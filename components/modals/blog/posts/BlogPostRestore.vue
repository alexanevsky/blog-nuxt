<template>
  <UIModal ref="modal" :id="id" :is-form="true" @form-submit.prevent="handleForm()">
    <template #body>
      <p>{{ $t('blogPosts.confirmations.restore', {title: post.title}) }}</p>
    </template>
    <template #footer>
      <div class="btn-toolbar">
        <a href="#" class="btn btn-muted mr-2" @click.prevent="close()">{{ $t('common.buttons.cancel') }}</a>
        <FormButtonSubmit :spin="isHandling" color="positive" :value="$t('blogPosts.buttons.restore')" />
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
    isHandling: false
  }),

  methods: {
    close() {
      this.$refs.modal.close();
    },

    async handleForm() {
      this.isHandling = true;

      const response = await this.$repositories.blogPosts.restore(this.post.id);

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
