export default [
  {
    name:       'users',
    path:       '/users',
    component:  '~/views/users/users.vue'
  },
  {
    name:       'usersPaginated',
    path:       '/users/page:page(\\d+)',
    component:  '~/views/users/users.vue'
  },
  {
    name:       'usersBanned',
    path:       '/users/banned',
    component:  '~/views/users/usersBanned.vue'
  },
  {
    name:       'usersBannedPaginated',
    path:       '/users/banned/page:page(\\d+)',
    component:  '~/views/users/usersBanned.vue'
  },
  {
    name:       'usersRemoved',
    path:       '/users/removed',
    component:  '~/views/users/usersRemoved.vue'
  },
  {
    name:       'usersRemovedPaginated',
    path:       '/users/removed/page:page(\\d+)',
    component:  '~/views/users/usersRemoved.vue'
  },
  {
    name:       'user',
    path:       '/users/:id(\\w+)',
    component:  '~/views/users/user.vue'
  },
  {
    name:       'userUpdate',
    path:       '/users/:id(\\w+)/edit',
    component:  '~/views/users/userUpdate.vue'
  },
  {
    name:       'userUpdatePassword',
    path:       '/users/:id(\\w+)/edit/password',
    component:  '~/views/users/userUpdatePassword.vue'
  },
  {
    name:       'userUpdateBan',
    path:       '/users/:id(\\w+)/edit/ban',
    component:  '~/views/users/userUpdateBan.vue'
  },
  {
    name:       'userUpdateRoles',
    path:       '/users/:id(\\w+)/edit/roles',
    component:  '~/views/users/userUpdateRoles.vue'
  }
];
