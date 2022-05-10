<template>
  <UIModal ref="modal" v-if="!isPending" :id="id" size="lg" :is-form="true" @form-submit.prevent="handleForm()">
    <template #title>
      {{ category ? category.name : $t('blogCategories.titles.create') }}
    </template>
    <template #body>
      <div class="form-row">
        <div class="col-md-4 col-form-label">
          <label class="form-label required" :for="`${idPrefix}-name`">{{ $t('blogCategories.properties.name') }}:</label>
        </div>
        <div class="col-md-8">
          <div class="form-field">
            <FormInput v-model="data.name" :id="`${idPrefix}-name`" :required="true" />
          </div>
          <FormError :error="errors.name" />
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-4 col-form-label">
          <label class="form-label required" :for="`${idPrefix}-alias`">{{ $t('blogCategories.properties.alias') }}:</label>
        </div>
        <div class="col-md-8">
          <div class="form-field">
            <FormInput v-model="data.alias" :id="`${idPrefix}-alias`" :required="true" />
          </div>
          <FormError :error="errors.alias" />
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-8 offset-md-4">
          <div class="form-field">
            <FormSwitch v-model="data.isActive" :id="`${idPrefix}-isActive`" color="positive" :label="$t('blogCategories.entityForm.labels.isActive')" />
          </div>
          <FormError :error="errors.isActive" />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="btn-toolbar">
        <a href="#" class="btn btn-muted mr-2" @click.prevent="close()">{{ $t('common.buttons.cancel') }}</a>
        <FormButtonSubmit :spin="isHandling" :value="$t(`blogCategories.entityForm.submits.${category ? 'update' : 'create'}`)" />
      </div>
    </template>
  </UIModal>
</template>

<script>
const FIELDS_DEFAULTS = {
  name:     '',
  alias:    '',
  isActive: false
};

const FIELDS = Object.keys(FIELDS_DEFAULTS);

export default {
  props: {
    id: {
      type:     String,
      required: true
    },
    category: {
      type: Object
    }
  },

  data: () => ({
    data:       FIELDS_DEFAULTS,
    errors:     Object.fromEntries(FIELDS.map((f) => [f, null])),
    isHandling: false,
    isPending:  true
  }),

  computed: {
    idPrefix() {
      return `blog-category-${this.category ? `${this.category.id}-update` : 'create'}`;
    }
  },

  async fetch() {
    this.clearData();
    this.clearErrors();

    const response = this.category
      ? await this.$repositories.blogCategories.fieldsToUpdate(this.category.id)
      : await this.$repositories.blogCategories.fieldsToCreate();

    if (!response.success) {
      this.$notify.error(response.message);
      this.$modals.remove(this.id);
      return;
    }

    this.data = this.$utils.object.map(response.data.fields, (v) => v.value);
    this.isPending = false;
  },

  methods: {
    close() {
      this.$refs.modal.close();
    },

    clearData() {
      this.data = FIELDS_DEFAULTS;
    },

    clearErrors() {
      this.errors = Object.fromEntries(FIELDS.map((f) => [f, null]));
    },

    async handleForm() {
      this.isHandling = true;
      this.clearErrors();

      const data = this.data;
      const response = this.category
        ? await this.$repositories.blogCategories.update(this.category.id, data)
        : await this.$repositories.blogCategories.create(data);

      if (!response.success) {
        this.$notify.error(response.message);
        this.errors = { ...this.errors, ...response.errors };
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
