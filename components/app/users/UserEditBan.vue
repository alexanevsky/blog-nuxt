<template>
  <div class="card">
    <form novalidate @submit.prevent="handleForm()">
      <div class="card-body">
        <template v-for="field in Object.keys(data)">
          <div :key="field" class="form-group">
            <div class="form-field">
              <FormSwitch v-model="data[field]" :id="field" :label="$t(`users.entityForm.labels.${field}`)" />
            </div>
            <FormError :error="errors[field]" />
          </div>
        </template>
      </div>
      <div class="card-footer">
        <FormButtonSubmit :spin="isHandling" :value="$t('users.entityForm.submits.updateBan')" />
      </div>
    </form>
  </div>
</template>

<script>
const FIELDS_DEFAULTS = {
  isBanned:               false,
  isCommunicationBanned:  false
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

    this.data = this.$utils.object.map(FIELDS_DEFAULTS, (v, k) => response.data.fields[k] ? response.data.fields[k].value : REQUIREMENTS[k]);
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
