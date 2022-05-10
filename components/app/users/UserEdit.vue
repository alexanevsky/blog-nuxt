<template>
  <div class="card">
    <form novalidate @submit.prevent="handleForm()">

      <!-- Profile -->
      <div class="card-body">
        <div class="title-2 mb-3">{{ $t('users.titles.updateProfile') }}</div>

        <!-- Email -->
        <div class="form-row">
          <div class="col-md-4 col-form-label">
            <label class="form-label" :class="isRequired.email ? 'required' : null" for="email">{{ $t('users.properties.email') }}:</label>
          </div>
          <div class="col-md-8">
            <div class="form-field">
              <FormInput type="email" v-model="data.email" id="email" :required="isRequired.email" />
            </div>
            <div class="form-help">{{ $t('users.entityForm.helps.email') }}</div>
            <FormError :error="errors.email" />
          </div>
        </div>

        <!-- Is email hidden -->
        <div class="form-row">
          <div class="col-md-8 offset-md-4">
            <div class="form-field">
              <FormSwitch v-model="data.isEmailHidden" id="isEmailHidden" :label="$t('users.entityForm.labels.isEmailHidden')" />
            </div>
          </div>
        </div>

        <!-- Username -->
        <div class="form-row">
          <div class="col-md-4 col-form-label">
            <label class="form-label" :class="isRequired.username ? 'required' : null" for="username">{{ $t('users.properties.username') }}:</label>
          </div>
          <div class="col-md-8">
            <div class="form-field">
              <FormInput v-model="data.username" id="username" :required="isRequired.username" />
            </div>
            <FormError :error="errors.username" />
          </div>
        </div>

        <!-- Title -->
        <div v-if="hasField('title')" class="form-row">
          <div class="col-md-4 col-form-label">
            <label class="form-label" :class="isRequired.title ? 'required' : null" for="title">{{ $t('users.properties.title') }}:</label>
          </div>
          <div class="col-md-8">
            <div class="form-field">
              <FormInput v-model="data.title" id="title" :required="isRequired.title" />
            </div>
            <FormError :error="errors.title" />
          </div>
        </div>

        <!-- Alias -->
        <div v-if="hasField('alias')" class="form-row">
          <div class="col-md-4 col-form-label">
            <label class="form-label" :class="isRequired.alias ? 'required' : null" for="alias">{{ $t('users.properties.alias') }}:</label>
          </div>
          <div class="col-md-8">
            <div class="form-field">
              <FormInputPrefixed v-model="data.alias" id="alias" prefix="/users/" :required="isRequired.alias" />
            </div>
            <FormError :error="errors.alias" />
          </div>
        </div>
      </div>

      <!-- Contacts -->
      <div v-if="hasAnyField(['phone', 'website', 'contacts'])" class="card-body">
        <div class="title-2 mb-3">{{ $t('users.titles.updateContacts') }}</div>

        <!-- Phone -->
        <div v-if="hasField('phone')" class="form-row">
          <div class="col-md-4 col-form-label">
            <label class="form-label" :class="isRequired.phone ? 'required' : null" for="phone">{{ $t('users.properties.phone') }}:</label>
          </div>
          <div class="col-md-8">
            <div class="form-field">
              <FormInput type="phone" v-model="data.phone" id="phone" :required="isRequired.phone" />
            </div>
            <FormError :error="errors.phone" />
          </div>
        </div>

        <!-- Website -->
        <div v-if="hasField('website')" class="form-row">
          <div class="col-md-4 col-form-label">
            <label class="form-label" :class="isRequired.website ? 'required' : null" for="website">{{ $t('users.properties.website') }}:</label>
          </div>
          <div class="col-md-8">
            <div class="form-field">
              <FormInput type="url" v-model="data.website" id="website" :required="isRequired.website" />
            </div>
            <FormError :error="errors.website" />
          </div>
        </div>

        <!-- Contacts -->
        <template v-if="hasField('contacts')">
          <template v-for="(c, i) in data.contacts">
            <div :key="c.contact" class="form-row">
              <div class="col-md-4 col-form-label">
                <label class="form-label" :for="`contact-${c.contact}`">{{ $t('common.properties.contact', {contact: c.contact}) }}:</label>
              </div>
              <div class="col-md-8">
                <div class="form-field">
                  <FormInputContact v-model="data.contacts[i]" :id="`contact-${c.contact}`" />
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>

      <!-- Info -->
      <div v-if="hasAnyField(['city', 'birthdate', 'biography'])" class="card-body">
        <div class="title-2 mb-3">{{ $t('users.titles.updateInfo') }}</div>

        <!-- City -->
        <div v-if="hasField('city')" class="form-row">
          <div class="col-md-4 col-form-label">
            <label class="form-label" :class="isRequired.city ? 'required' : null" for="city">{{ $t('users.properties.city') }}:</label>
          </div>
          <div class="col-md-8">
            <div class="form-field">
              <FormInput v-model="data.city" id="city" :required="isRequired.city" />
            </div>
            <FormError :error="errors.city" />
          </div>
        </div>

        <!-- Birthdate -->
        <div v-if="hasField('birthdate')" class="form-row">
          <div class="col-md-4 col-form-label">
            <label class="form-label" :class="isRequired.birthdate ? 'required' : null" for="birthdate">{{ $t('users.properties.birthdate') }}:</label>
          </div>
          <div class="col-md-8">
            <div class="form-field">
              <FormInput v-model="data.birthdate" id="birthdate" :required="isRequired.birthdate" />
            </div>
            <FormError :error="errors.birthdate" />
          </div>
        </div>

        <!-- Biography -->
        <div v-if="hasField('biography')" class="form-group">
          <label class="form-label" :class="isRequired.biography ? 'required' : null" for="biography">{{ $t('users.properties.biography') }}:</label>
          <div class="form-field">
            <FormTextarea v-model="data.biography" id="biography" :required="isRequired.biography" />
          </div>
          <FormError :error="errors.biography" />
        </div>
      </div>

      <!-- Submit -->
      <div class="card-footer">
        <FormButtonSubmit :spin="isHandling" :value="$t('users.entityForm.submits.update')" />
      </div>
    </form>
  </div>
</template>

<script>
const FIELDS_DEFAULTS = {
  username:       '',
  email:          '',
  isEmailHidden:  false,
  title:          '',
  alias:          '',
  phone:          '',
  website:        '',
  contacts:       [],
  city:           '',
  birthdate:      '',
  biography:      []
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
    fields:       [],
    data:         FIELDS_DEFAULTS,
    errors:       ERRORS,
    requirements: REQUIREMENTS,
    isHandling:   false
  }),

  computed: {
    isRequired() {
      return this.$utils.object.map(this.requirements, (v) => v.required);
    }
  },

  async fetch() {
    this.clearData();
    this.clearErrors();

    const response = await this.$repositories.users.fieldsToUpdate(this.user.id);

    if (!response.success) {
      this.$notify.error(response.message);
      return;
    }

    this.fields =       Object.keys(response.data.fields);
    this.data =         this.$utils.object.map(FIELDS_DEFAULTS, (v, k) => response.data.fields[k] ? response.data.fields[k].value : REQUIREMENTS[k]);
    this.requirements = this.$utils.object.map(FIELDS_DEFAULTS, (v, k) => response.data.fields[k] ? response.data.fields[k].requirements : REQUIREMENTS[k]);

    this.$utils.consoleLog(this.data);
  },

  methods: {
    clearData() {
      this.fields = [];
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
    },

    hasField(field) {
      return this.fields.includes(field);
    },

    hasAnyField(fields) {
      let result = false;

      fields.forEach((field) => {
        if (this.fields.includes(field)) {
          result = true;
        }
      });

      return result;
    }
  }
}
</script>
