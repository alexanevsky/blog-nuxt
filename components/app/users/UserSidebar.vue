<template>
  <div class="card">
    <!-- Profile -->
    <div class="card-body">
      <div class="text-center mb-3">
        <img v-if="user.avatar" class="avatar avatar-xl" :src="user.avatarUrl" :alt="user.username">
          <img v-else class="avatar avatar-xl" src="@/assets/images/no-avatar.png">
      </div>
      <h1 class="title-1 mb-o2 text-center">{{ user.username }}</h1>
      <div v-if="user.isBanned && user.permissions.update" class="title-1 mb-o2 mt-n1 text-center">
        <span class="badge badge-negative">{{ $t('users.values.banned') }}</span>
      </div>
      <div v-if="user.title" class="font-bold text-center text-muted">{{ user.title }}</div>
    </div>

    <!-- Nav -->
    <div class="card-body">
      <ul class="nav nav-pills nav-vertical">
        <li v-for="item in nav" :key="item.name" class="nav-item mb-o2">
          <NuxtLink :to="{name: item.to, params: {id: user.alias || user.id}}" class="nav-link" active-class="active" :exact="item.exact">{{ $t(item.name) }}</NuxtLink>
        </li>
      </ul>
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
  },

  computed: {
    nav() {
      const nav = [
        { name: 'users.buttons.profile', to: 'user', exact: true }
      ];

      if (this.user.permissions.update) {
        nav.push({ name: 'users.buttons.update',          to: 'userUpdate', exact: true });
        nav.push({ name: 'users.buttons.updatePassword',  to: 'userUpdatePassword', exact: true });

        if (this.$security.hasAnyRole(['ROLE_ADMIN', 'ROLE_USERS_MANAGER'])) {
          nav.push({ name: 'users.buttons.updateRoles', to: 'userUpdateRoles', exact: true });
          nav.push({ name: 'users.buttons.updateBan',   to: 'userUpdateBan', exact: true });
        }
      }

      return nav;
    }
  }
}
</script>
