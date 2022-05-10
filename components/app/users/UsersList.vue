<template>
  <div class="card">
    <div class="card-table">
      <table class="table table-align-middle">
        <thead class="card-table-header">
          <tr>
            <th class="table-sm"></th>
            <th>{{ $t('users.entities') }}</th>
            <th>{{ $t('users.properties.title') }}</th>
            <th>{{ $t('users.properties.email') }}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="user in users">
            <tr :key="user.id" :id="`user-${user.id}`">
              <td>
                <NuxtLink :to="{name: 'user', params: {id: user.alias || user.id}}">
                  <img v-if="user.avatar" class="avatar avatar-lg" :src="user.avatarUrl" :alt="user.username">
                  <img v-else class="avatar avatar-lg" src="@/assets/images/no-avatar.png">
                </NuxtLink>
              </td>
              <td class="title-3">
                <NuxtLink :to="{name: 'user', params: {id: user.alias || user.id}}">{{ user.username }}</NuxtLink>
                <span v-if="user.isBanned && user.permissions.update" class="badge badge-negative ml-2">{{ $t('users.values.banned') }}</span>
              </td>
              <td>{{ user.title }}</td>
              <td>
                <template v-if="user.email">
                  <span>{{ user.email }}</span>
                  <span v-if="user.isEmailHidden" class="badge badge-muted ml-2">{{ $t('users.values.emailHidden') }}</span>
                </template>
                <template v-else-if="user.isEmailHidden">
                  <span class="text-muted">{{ $t('users.values.emailHidden') }}</span>
                </template>
              </td>
              <td class="text-right">
                <UIActionsMenu>
                  <UIActionsMenuModal v-if="user.permissions.update && user.isBanned" modal="ModalUserUnban" :binds="{user}" :label="$t('users.buttons.unban')" />
                  <UIActionsMenuLink v-if="user.permissions.update" :to="{name: 'userUpdate', params: {id: user.alias || user.id}}" :label="$t('users.buttons.update')" />
                  <UIActionsMenuLink v-if="user.permissions.update" :to="{name: 'userUpdatePassword', params: {id: user.alias || user.id}}" :label="$t('users.buttons.updatePassword')" />
                  <UIActionsMenuLink v-if="user.permissions.update && $security.hasAnyRole(['ROLE_ADMIN', 'ROLE_USERS_MANAGER'])" :to="{name: 'userUpdateRoles', params: {id: user.alias || user.id}}" :label="$t('users.buttons.updateRoles')" />
                  <UIActionsMenuLink v-if="user.permissions.update && $security.hasAnyRole(['ROLE_ADMIN', 'ROLE_USERS_MANAGER'])" :to="{name: 'userUpdateBan', params: {id: user.alias || user.id}}" :label="$t('users.buttons.updateBan')" />
                  <UIActionsMenuModal v-if="user.permissions.remove && !user.isRemoved" modal="ModalUserRemove" :binds="{user}" :label="$t('users.buttons.remove')" />
                  <UIActionsMenuModal v-if="user.permissions.restore" modal="ModalUserRestore" :binds="{user}" :label="$t('users.buttons.restore')" />
                  <UIActionsMenuModal v-if="user.permissions.erase && user.isRemoved" modal="ModalUserErase" :binds="{user}" :label="$t('users.buttons.erase')" />
                </UIActionsMenu>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type:     Array,
      required: true
    }
  }
}
</script>
