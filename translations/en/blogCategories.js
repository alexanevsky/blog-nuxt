export default {
  title:  'Categories',

  titles: {
    create: 'Add Category',
    update: 'Edit Category'
  },

  entity:     'Category',
  entities:   'Categories',

  messages: {
    empty: 'There are no categories!'
  },

  properties: {
    name:       'Name',
    alias:      'Alias',
    isActive:   'Status',
    posts:      'Posts',
    postsCount: 'Posts'
  },

  values: {
    inactive:   'Inactive',
    postsCount: '{count, plural, =0 {No posts} =1 {# post} other {# posts}}'
  },

  entityForm: {
    labels: {
      isActive: 'Category is active'
    },
    submits: {
      create: 'Add category',
      update: 'Save category'
    }
  },

  buttons: {
    create: 'Add new category',
    update: 'Edit',
    delete: 'Delete'
  },

  confirmations: {
    delete: 'Are you sure you want to delete the category «{name}»?'
  }
};
