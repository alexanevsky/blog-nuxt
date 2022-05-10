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
    name:       'userCreate',
    path:       '/users/add',
    component:  '~/views/users/userCreate.vue'
  },
  {
    path:       '/users/:id(\\w+)',
    component:  '~/views/users/user.vue',
    children: [
      {
        name:       'user',
        path:       '/users/:id(\\w+)',
        component:  '~/views/users/user/profile.vue',
      },
      {
        name:       'userUpdate',
        path:       'edit',
        component:  '~/views/users/user/update.vue'
      },
      {
        name:       'userUpdatePassword',
        path:       'edit/password',
        component:  '~/views/users/user/updatePassword.vue'
      },
      {
        name:       'userUpdateBan',
        path:       'edit/ban',
        component:  '~/views/users/user/updateBan.vue'
      },
      {
        name:       'userUpdateRoles',
        path:       'edit/roles',
        component:  '~/views/users/user/updateRoles.vue'
      }
    ]
  }
];
