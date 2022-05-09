<template>
  <UIModal ref="modal" :id="id" size="lg" :is-form="true" @form-submit.prevent="handleForm()">
    <template #title>
      {{ category ? category.name : $t('blogCategories.titles.add') }}
    </template>
    <template #body>
      <div class="form-row">
        <div class="col-md-4 col-form-label">
          <label class="form-label required" for="name">{{ $t('blogCategories.properties.name') }}:</label>
        </div>
        <div class="col-md-8">
          <div class="form-field">
            <FormInput v-model="data.name" id="name" :required="true" />
          </div>
          <FormError :error="errors.name" />
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-4 col-form-label">
          <label class="form-label required" for="alias">{{ $t('blogCategories.properties.alias') }}:</label>
        </div>
        <div class="col-md-8">
          <div class="form-field">
            <FormInput v-model="data.alias" id="alias" :required="true" />
          </div>
          <FormError :error="errors.alias" />
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-8 offset-md-4">
          <div class="form-field">
            <FormSwitch v-model="data.isHidden" id="isHidden" color="negative" :label="$t('blogCategories.form.labels.isHidden')" />
          </div>
          <FormError :error="errors.isActive" />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="btn-toolbar">
        <a href="#" class="btn btn-muted mr-2" @click.prevent="close()">{{ $t('common.buttons.cancel') }}</a>
        <FormButtonSubmit :spin="isHandling" :value="$t(`blogCategories.form.submits.${category ? 'edit' : 'add'}`)" />
      </div>
    </template>
  </UIModal>
</template>

<script>
export default {
  props: {
    category: {
      type: Object
    },
    id: {
      type:     String,
      required: true
    }
  },

  data: () => ({
    data: {
      name:     null,
      alias:    null,
      isHidden: false
    },

    isHandling:   false,
    errors:       {}
  }),

  async fetch() {
    this.data.name =      null;
    this.data.alias =     null;
    this.data.isHidden =  false;
    this.errors =         {};

    let fieldsResponse;

    try {
      fieldsResponse = await this.$repositories.categories.fields(this.category ? this.category.id : null);
    } catch (e) {
      return;
    }

    this.data.name =      fieldsResponse.data.fields.name.value;
    this.data.alias =     fieldsResponse.data.fields.alias.value;
    this.data.isHidden =  !fieldsResponse.data.fields.isActive.value;
  },

  watch: {
    category() {
      this.$fetch();
    }
  },

  methods: {
    async handleForm() {
      this.isHandling = true;

      const data = {
        name:     this.data.name,
        alias:    this.data.alias,
        isActive: !this.data.isHidden
      };

      let response;

      try {
        response = await this.$repositories.categories.submit(this.category ? this.category.id : null, data);
      } catch (e) {
        this.$notify.error(e.message);
        this.errors = e.errors || {};
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
