<template>
  <form @submit.prevent="handleForm()" novalidate>
    <div class="form-group">
      <div class="form-field">
        <FormTextarea v-model="data" :required="true" :rows="3" />
      </div>
      <FormError :error="error" />
    </div>
    <div class="form-group flex-end-center">
      <div class="btn-toolbar">
        <a v-if="parent || comment" href="#" class="btn btn-muted btn-sm mr-2" @click.prevent="$emit('cancel')">{{ $t('common.buttons.cancel') }}</a>
        <FormButtonSubmit :value="$t(`blogComments.entityForm.submits.${comment ? 'update' : (parent ? 'reply' : 'create')}`)" size="sm" />
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    post: {
      type: Object
    },
    comment: {
      type: Object
    },
    parent: {
      type: Object
    }
  },

  data: () => ({
    data:       [],
    error:      null,
    isHandling: false
  }),

  created() {
    if (this.comment) {
      this.data = this.comment.content;
    }
  },

  methods: {
    async handleForm() {
      this.isHandling = true;

      const data = {
        content: typeof this.data === 'string' ? JSON.parse(this.data) : this.data
      };

      let response;

      if (this.comment) {
          response = await this.$repositories.blogComments.update(this.comment.id, data);
        } else if (this.parent) {
          response = await this.$repositories.blogComments.reply(this.parent.id, data);
        } else {
          response = await this.$repositories.blogComments.createToPost(this.post.id, data);
        }

      if (!response.success) {
        this.$notify.error(response.errors && response.errors.length ? Object.values(response.errors)[0] : response.message);
        this.isHandling = false;

        return;
      }

      if (!this.comment) {
        this.data = [];
      }

      this.$emit('form-handled');

      this.isHandling = false;
      this.$nuxt.refresh();
    }
  }
}
</script>
