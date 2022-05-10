<template>
  <div class="card">
    <form novalidate @submit.prevent="handleForm()">
      <div class="card-body">

        <!-- Username -->
        <div class="form-row">
          <div class="col-md-4 col-form-label">
            <label class="form-label required" :for="`${idPrefix}-username`">{{ $t('users.properties.username') }}:</label>
          </div>
          <div class="col-md-8">
            <div class="form-field">
              <FormInput v-model="data.username" :id="`${idPrefix}-username`" :required="true" />
            </div>
            <FormError :error="errors.username" />
          </div>
        </div>

        <!-- Email -->
        <div class="form-row">
          <div class="col-md-4 col-form-label">
            <label class="form-label required" :for="`${idPrefix}-email`">{{ $t('users.properties.email') }}:</label>
          </div>
          <div class="col-md-8">
            <div class="form-field">
              <FormInput type="email" v-model="data.email" :id="`${idPrefix}-email`" :required="true" />
            </div>
            <FormError :error="errors.email" />
          </div>
        </div>

        <!-- Is email hidden -->
        <div class="form-row">
          <div class="col-md-8 offset-md-4">
            <div class="form-field">
              <FormSwitch v-model="data.isEmailHidden" :id="`${idPrefix}-isEmailHidden`" :label="$t('users.entityForm.labels.isEmailHidden')" />
            </div>
          </div>
        </div>

        <!-- Password -->
        <div class="form-row">
          <div class="col-md-4 col-form-label">
            <label class="form-label required" :for="`${idPrefix}-password`">{{ $t('users.properties.password') }}:</label>
          </div>
          <div class="col-md-8">
            <div class="form-field">
              <FormInput type="password" v-model="data.password" :id="`${idPrefix}-password`" :required="true" />
            </div>
            <FormError :error="errors.password" />
          </div>
        </div>
      </div>
      <div class="card-footer">
        <FormButtonSubmit :spin="isHandling" :value="$t('users.entityForm.submits.create')" :disabled="!isFormCompleted" />
      </div>
    </form>
  </div>
</template>

<script>
const FIELDS_DEFAULTS = {
  username:       '',
  email:          '',
  isEmailHidden:  false,
  password:       ''
};

const FIELDS = Object.keys(FIELDS_DEFAULTS);

const ERRORS = Object.fromEntries(FIELDS.map((f) => [f, null]));

export default {
  data: () => ({
    data:         FIELDS_DEFAULTS,
    errors:       ERRORS,
    isHandling:   false
  }),

  computed: {
    idPrefix() {
      return 'user-create';
    },

    isFormCompleted() {
      return [
        this.data.username,
        this.data.email,
        this.data.password
      ].filter((v) => !v || !v.length).length ? false : true;
    }
  },

  async fetch() {
    this.clearData();
    this.clearErrors();

    const response = await this.$repositories.users.fieldsToCreate();

    if (!response.success) {
      this.$notify.error(response.message);
      return;
    }

    this.data = this.$utils.object.map(FIELDS_DEFAULTS, (v, k) => response.data.fields[k] ? response.data.fields[k].value : FIELDS_DEFAULTS[k]);
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

      const data = this.data;
      const response = await this.$repositories.users.create(data);

      if (!response.success) {
        this.$notify.error(response.message);
        this.errors = { ...this.errors, ...response.errors };
        this.isHandling = false;

        return;
      }

      this.$notify.success(response.message);
      this.$emit('form-handled', response.data);
      this.isHandling = true;
    }
  }
}
</script>
