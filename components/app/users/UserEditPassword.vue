<template>
  <div class="card">
    <form novalidate @submit.prevent="handleForm()">
      <div class="card-body">
        <div class="form-row">
          <div class="col-md-4 col-form-label">
            <label class="form-label required" for="password">{{ $t('users.entityForm.labels.newPassword') }}:</label>
          </div>
          <div class="col-md-8">
            <div class="form-field">
              <FormInput type="password" v-model="data.password" id="password" :required="true" :minlength="requirements.password.minlength" />
            </div>
            <FormError :error="errors.password" />
          </div>
        </div>
      </div>
      <div class="card-footer">
        <FormButtonSubmit :spin="isHandling" :value="$t('users.entityForm.submits.updatePassword')" :disabled="!data.password" />
      </div>
    </form>
  </div>
</template>

<script>
const FIELDS_DEFAULTS = {
  password: ''
};

const FIELDS = Object.keys(FIELDS_DEFAULTS);

const ERRORS = Object.fromEntries(FIELDS.map((f) => [f, null]));

const REQUIREMENTS = Object.fromEntries(FIELDS.map((f) => [f, { required: false }]));

export default {
  props: {
    user: {
      type:     Object,
      required: true
    }
  },

  data: () => ({
    data:         FIELDS_DEFAULTS,
    errors:       ERRORS,
    requirements: REQUIREMENTS,
    isHandling:   false
  }),

  async fetch() {
    this.clearData();
    this.clearErrors();

    const response = await this.$repositories.users.fieldsToUpdate(this.user.id);

    if (!response.success) {
      this.$notify.error(response.message);
      return;
    }

    this.data =         this.$utils.object.map(FIELDS_DEFAULTS, (v, k) => response.data.fields[k] ? response.data.fields[k].value : REQUIREMENTS[k]);
    this.requirements = this.$utils.object.map(FIELDS_DEFAULTS, (v, k) => response.data.fields[k] ? response.data.fields[k].requirements : REQUIREMENTS[k]);
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
      const response = await this.$repositories.users.update(this.user.id, data);

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
