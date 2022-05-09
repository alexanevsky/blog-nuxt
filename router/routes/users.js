export default [
  {
    name:       'users',
    path:       '/users',
    component:  '~/views/users/users.vue'
  },
  {
    name:       'user',
    path:       '/users/:id(\\w+)',
    component:  '~/views/users/user.vue'
  }
];
