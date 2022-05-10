<template>
  <div class="mb-o5">
    <div v-if="user.isRemoved && user.permissions.restore" class="alert alert-negative mb-5 text">
      <p v-if="$params.get('users.restoreDaysLimit')">{{ $t('users.info.removedRestorable', {restorableTo: $utils.convert.datetime($utils.convert.datetimeModify(user.removedAt, {days: $params.get('users.restoreDaysLimit')}))}) }}</p>
      <p v-else>{{ $t('users.info.removed') }}</p>
    </div>

    <div class="card">

      <!-- Contacts -->
      <div v-if="user.email || user.phone || user.website || user.contacts.length" class="card-body">
        <div v-if="user.email || user.phone || user.website" class="flex-around-center mb-o3">
          <div class="d-flex flex-column flex-md-row flex-md-wrap mb-n2 font-bold">

            <!-- Email -->
            <div v-if="user.email" class="mb-o2 mb-md-0 mr-md-o4">
              <i class="fas fa-at fa-fw mr-1 text-muted"></i>
              <a :href="`mailto:${user.email}`">{{ user.email }}</a>
              <span v-if="user.isEmailHidden" class="badge badge-muted ml-2">{{ $t('users.values.emailHidden') }}</span>
            </div>

            <!-- Phone -->
            <div v-if="user.phone" class="mb-o2 mb-md-0 mr-md-o4">
              <i class="fas fa-phone-alt fa-fw mr-1 text-muted"></i>
              <a :href="`tel:${user.phone}`">{{ user.phone }}</a>
            </div>

            <!-- Website -->
            <div v-if="user.website" class="mb-o2 mb-md-0 mr-md-o4">
              <i class="fas fa-link fa-fw mr-1 text-muted"></i>
              <a :href="user.website">{{ user.website }}</a>
            </div>
          </div>
        </div>

        <!-- Contacts -->
        <div v-if="user.contacts.length" class="flex-around-center">
          <div class="btn-toolbar btn-toolbar-sm flex-center-center mt-n2">
            <template v-for="contact in user.contacts">
              <a :key="contact.contact" :class="`btn btn-icon btn-brand-${contact.contact} mt-2 mr-o2`" :href="contact.link" target="_blank" :title="$t('common.values.contact', {contact: contact.contact})"><i :class="`fab fa-${contact.contact} fa-fw`"></i></a>
            </template>
          </div>
        </div>
      </div>

      <!-- Info -->
      <div class="card-body">
        <!-- Username -->
        <div class="row mb-o2">
          <div class="col-md-3 text-muted">{{ $t('users.properties.username') }}:</div>
          <div v-if="user.username" class="col-md-9">{{ user.username }}</div>
          <div v-else class="col-md-9 text-muted">{{ $t('common.valueEmpty') }}</div>
        </div>

        <!-- Birthdate -->
        <div v-if="$params.get('users.enableBirthdate')" class="row mb-o2">
          <div class="col-md-3 text-muted">{{ $t('users.properties.birthdate') }}:</div>
          <div v-if="user.birthdate" class="col-md-9">{{ $utils.convert.date(user.birthdate) }}</div>
          <div v-else class="col-md-9 text-muted">{{ $t('common.valueEmpty') }}</div>
        </div>

        <!-- City -->
        <div v-if="$params.get('users.enableCity')" class="row mb-o2">
          <div class="col-md-3 text-muted">{{ $t('users.properties.city') }}:</div>
          <div v-if="user.city" class="col-md-9">{{ user.city }}</div>
          <div v-else class="col-md-9 text-muted">{{ $t('common.valueEmpty') }}</div>
        </div>

        <!-- Biography -->
        <div v-if="user.biography && (user.biography.length || user.roles.length)" class="row mb-o2">
          <div class="col-md-3 text-muted">{{ $t('users.properties.biography') }}:</div>
          <div v-if="user.biography.length" class="col-md-9 text" v-html="$utils.convert.blockContent(user.biography)"></div>
          <div v-else class="col-md-9 text-muted">{{ $t('common.valueEmpty') }}</div>
        </div>
      </div>

      <!-- Tech Info -->
      <div v-if="user.permissions.update || $security.hasAnyRole(['ROLE_ADMIN', 'ROLE_USERS_MANAGER', 'ROLE_TECH'])" class="card-body">
        <!-- Created at -->
        <div class="row mb-o2">
          <div class="col-md-3 text-muted">{{ $t('users.properties.createdAt') }}:</div>
          <div class="col-md-9">{{ $utils.convert.datetime(user.createdAt) }}</div>
        </div>

        <!-- First IP -->
        <div v-if="user.firstIp && $security.hasRole('ROLE_TECH')" class="row mb-o2">
          <div class="col-md-3 text-muted">{{ $t('users.properties.firstIp') }}:</div>
          <div class="col-md-9"><a :href="`https://ipinfo.io/${user.firstIp}`" target="_blank">{{ user.firstIp }}</a></div>
        </div>

        <!-- First user agent -->
        <div v-if="user.firstUseragent && $security.hasRole('ROLE_TECH')" class="row mb-o2">
          <div class="col-md-3 text-muted">{{ $t('users.properties.firstUseragent') }}:</div>
          <div class="col-md-9">{{ user.firstUseragent }}</div>
        </div>

        <!-- Removed at -->
        <div v-if="user.isRemoved && user.removedAt" class="row mb-o2">
          <div class="col-md-3 text-muted">{{ $t('users.properties.removedAt') }}:</div>
          <div class="col-md-9">{{ $utils.convert.datetime(user.removedAt) }}</div>
        </div>

        <!-- Roles -->
        <div v-if="user.permissions.updateRoles" class="row mb-o2">
          <div class="col-md-3 text-muted">{{ $t('users.properties.roles') }}:</div>
          <div v-if="user.roles.length" class="col-md-9">
            <ul>
              <li v-for="role in user.roles" :key="role">{{ $t('users.values.role', {role}) }}</li>
            </ul>
          </div>
          <div v-else class="col-md-9 text-muted">{{ $t('users.values.rolesEmpty') }}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type:     Object,
      required: true
    }
  }
}
</script>
