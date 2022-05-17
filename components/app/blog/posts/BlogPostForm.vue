<template>
  <div class="card">
    <form @submit.prevent="handleForm()" novalidate>
      <div class="card-row no-gutters">
        <div class="col-md-8 card-col">
          <div class="card-body">
            <div class="form-group">
              <label class="form-label" for="image">{{ $t('blogPosts.properties.image') }}:</label>
              <div class="form-field">
                <FormImage v-model="image" id="image" :original="post ? post.imageUrl : ''" />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-4 col-form-label">
                <label class="form-label" :class="isRequired.title ? 'required' : null" for="title">{{ $t('blogPosts.properties.title') }}:</label>
              </div>
              <div class="col-md-8">
                <div class="form-field">
                  <FormInput v-model="data.title" id="title" :required="isRequired.title" />
                </div>
                <FormError :error="errors.title" />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-4 col-form-label">
                <label class="form-label" :class="isRequired.alias ? 'required' : null" for="alias">{{ $t('blogPosts.properties.alias') }}:</label>
              </div>
              <div class="col-md-8">
                <div class="form-field">
                  <FormInput v-model="data.alias" id="alias" :required="isRequired.alias" />
                </div>
                <FormError :error="errors.alias" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" :class="isRequired.description ? 'required' : null" for="description">{{ $t('blogPosts.properties.description') }}:</label>
              <div class="form-field">
                <FormEditorJs v-model="data.description" id="description" :required="isRequired.description" :tools="[]" />
              </div>
              <FormError :error="errors.description" />
            </div>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label" :class="isRequired.content ? 'required' : null" for="content">{{ $t('blogPosts.properties.content') }}:</label>
              <div class="form-field">
                <FormEditorJs v-model="data.content" id="content" :required="isRequired.content" />
              </div>
              <FormError :error="errors.content" />
            </div>
          </div>
        </div>
        <div class="col-md-4 card-col">
          <div class="sticky-top">
            <div class="card-body">
              <div class="form-group">
                <div class="form-label">{{ $t(`blogPosts.properties.${data.categories.length > 1 ? 'categories' : 'category'}`) }}:</div>
                <div class="form-field">
                  <FormSelectMultiple v-model="data.categories" :options="categoriesOptions" :placeholder="$t('blogPosts.entityForm.placeholders.categories')" />
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <div class="form-field">
                  <FormSwitch v-model="data.isPublished" id="isPublished" color="positive" :label="$t('blogPosts.entityForm.labels.isPublished')" />
                </div>
              </div>
              <UISpoiler v-if="post" class="form-group" :visible="data.isPublished">
                <div class="form-field">
                  <FormSwitch v-model="data.updatePublishedAt" id="updatePublishedAt" color="positive" :label="$t('blogPosts.entityForm.labels.updatePublishedAt')" />
                </div>
              </UISpoiler>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <FormButtonSubmit :spin="isHandling" :value="$t(`blogPosts.entityForm.submits.${post ? 'update' : 'create'}`)" />
      </div>
    </form>
  </div>
</template>

<script>
const FIELDS_DEFAULTS = {
  title:              '',
  alias:              '',
  description:        '',
  content:            [],
  categories:         [],
  isPublished:        false,
  updatePublishedAt:  false
};

const FIELDS = Object.keys(FIELDS_DEFAULTS);

const ERRORS = Object.fromEntries(FIELDS.map((f) => [f, null]));

const REQUIREMENTS = Object.fromEntries(FIELDS.map((f) => [f, { required: false }]));

export default {
  props: {
    post: {
      type: Object
    },
    categoryId: {
      type: Number
    }
  },

  data: () => ({
    data:         FIELDS_DEFAULTS,
    image:        null,
    errors:       ERRORS,
    requirements: REQUIREMENTS,
    categories:   [],
    isHandling:   false
  }),

  computed: {
    categoriesOptions() {
      return this.categories.map((c) => ({ value: c.id, label: c.name }));
    },

    isRequired() {
      return this.$utils.object.map(this.requirements, (v) => v.required);
    }
   },

  async fetch() {
    this.clearData();
    this.clearErrors();

    const fieldsResponse = this.post
      ? await this.$repositories.blogPosts.fieldsToUpdate(this.post.id)
      : await this.$repositories.blogPosts.fieldsToCreate();

    const categoriesResponse = await this.$repositories.blogCategories.fetchAll();

    if (!fieldsResponse.success) {
      this.$notify.error(fieldsResponse.message);
      return;
    } else if (!categoriesResponse.success) {
      this.$notify.error(categoriesResponse.message);
      return;
    }

    this.data =         this.$utils.object.map(fieldsResponse.data.fields, (v) => v.value);
    this.requirements = this.$utils.object.map(FIELDS_DEFAULTS, (v, k) => fieldsResponse.data.fields[k] ? fieldsResponse.data.fields[k].requirements : REQUIREMENTS[k]);
    this.categories =   categoriesResponse.data.categories;

    if (!this.post && this.categoryId && !this.data.categories.length) {
      this.data.categories.push(this.categoryId);
    }
  },

  methods: {
    clearData() {
      this.data = FIELDS_DEFAULTS;
    },

    clearErrors() {
      this.errors = ERRORS;
    },

    async handleForm() {
      this.isHandling = true;
      this.clearErrors();

      const data = { ...this.data, ... {
        description:        typeof this.data.description === 'string' ? JSON.parse(this.data.description) : this.data.description,
        content:            typeof this.data.content === 'string' ? JSON.parse(this.data.content) : this.data.content,
        updatePublishedAt:  this.data.isPublished ? this.data.updatePublishedAt : false
      } };

      const fieldsResponse = this.post
        ? await this.$repositories.blogPosts.update(this.post.id, data)
        : await this.$repositories.blogPosts.create(data);

      if (!fieldsResponse.success) {
        this.$notify.error(fieldsResponse.message);
        this.errors = { ...this.errors, ...fieldsResponse.errors };
        this.isHandling = false;

        return;
      }

      if (this.image || this.image === false) {
        const imageResponse = this.image === false
          ? await this.$repositories.blogPosts.imageDelete(fieldsResponse.data.post.id)
          : await this.$repositories.blogPosts.imageUpload(fieldsResponse.data.post.id, this.image);

        if (!imageResponse.success) {
          this.$notify.error(imageResponse.message);
        }
      }

      this.$notify.success(fieldsResponse.message);
      this.$emit('form-handled', fieldsResponse.data);
      this.isHandling = true;
    }
  }
}
</script>
