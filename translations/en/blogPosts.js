export default {
  titles: {
    postsAll:         'Posts',
    postsRemoved:     'Deleted Posts',
    postsUnpublished: 'Unpublished Posts',
    create:           'Add Post',
    update:           'Edit Post'
  },

  entity:   'Post',
  entities: 'Posts',

  messages: {
    empty:            'There are no posts!',
    emptyRemoved:     'There are no deleted posts!',
    emptyUnpublished: 'There are no unpublished posts!',
    emptyCategory:    'There are no posts in the category «{name}»!'
  },

  properties: {
    title:          'Title',
    alias:          'Alias',
    author:         'Author',
    category:       'Category',
    categories:     'Categories',
    description:    'Description',
    content:        'Content',
    image:          'Image',
    isPublished:    'Status',
    createdAt:      'Created at',
    publishedAt:    'Published at',
    updatedAt:      'Edited at',
    removedAt:      'Deleted at',
    comments:       'Comments',
    commentsCount:  'Comments'
  },

  values: {
    unpublished:  'Unpublished',
    removed:      'Deleted'
  },

  entityForm: {
    labels: {
      isPublished:        'Publish',
      updatePublishedAt:  'Update publication date'
    },
    placeholders: {
      categories: 'Category not selected'
    },
    submits: {
      create: 'Add post',
      update: 'Save post'
    }
  },

  removeForm: {
    labels: {
      delete: 'Delete permanently'
    }
  },

  buttons: {
    create:   'Add new post',
    update:   'Edit',
    remove:   'Delete',
    restore:  'Restore',
    delete:   'Delete permanently',
    publish:  'Publish',
    readmore: 'Read more'
  },

  confirmations: {
    remove:           'Are you sure you want to delete the post «{title}»?',
    removeRestorable: 'Are you sure you want to delete the post «{title}»? You will be able to restore it in {days, plural, =1 {# day} other {# days}}.',
    delete:           'Are you sure you want to permanently delete the post «{title}»? You won\'t be able to restore it.',
    restore:          'Are you sure you want to restore the post «{title}»?',
    publish:          'Are you sure you want to publish the post «{title}»?'
  },

  info: {
    removed:            'The post is deleted.',
    removedRestorable:  'The post has been deleted, but you can restore it until {restorableTo}.',
    unpublished:        'Site users do not see this post because it is not published, but you can publish it at any time.'
  }
};
