<template>
  <div class="card">
    <form novalidate @submit.prevent="handleForm()">
      <div class="card-body">
        <template v-for="role in roles">
          <div :key="role" class="form-group">
            <div class="form-field">
              <FormSwitch v-model="data[role]" :id="role" :label="$t('users.values.role', {role})" />
            </div>
          </div>
        </template>
      </div>
      <div class="card-footer">
        <FormButtonSubmit :spin="isHandling" :value="$t('users.entityForm.submits.updateRoles')" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type:     Object,
      required: true
    }
  },

  data: () => ({
    data:         {},
    isHandling:   false,
    roles:        []
  }),

  async fetch() {
    const response = await this.$repositories.users.fieldsToUpdate(this.user.id);

    if (!response.success) {
      this.$notify.error(response.message);
      return;
    }

    this.roles =  response.data.fields.roles.requirements.each.in.filter((r) => r !== 'ROLE_USER');
    this.data =   Object.fromEntries(this.roles.map(role => [role, response.data.fields.roles.value.includes(role)]));
  },

  methods: {
    async handleForm() {
      this.isHandling = true;

      const data = {
        roles: Object.keys(this.data).filter(role => this.data[role])
      };

      const response = await this.$repositories.users.update(this.user.id, data);

      if (!response.success) {
        this.$notify.error(response.message);
        this.isHandling = false;

        return;
      }

      this.$notify.success(response.message);
      this.$emit('form-handled');
      this.isHandling = true;
    }
  }
}
</script>
