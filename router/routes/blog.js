export default [

  {
    name:       'blogPosts',
    path:       '/blog',
    component:  '~/views/blog/posts/posts.vue'
  },
  {
    name:       'blogPostsPaginated',
    path:       '/blog/page:page(\\d+)',
    component:  '~/views/blog/posts/posts.vue'
  },
  {
    name:       'blogPostsUnpublished',
    path:       '/blog/unpublished',
    component:  '~/views/blog/posts/postsUnpublished.vue'
  },
  {
    name:       'blogPostsUnpublishedPaginated',
    path:       '/blog/unpublished/page:page(\\d+)',
    component:  '~/views/blog/posts/postsUnpublished.vue'
  },
  {
    name:       'blogPostsRemoved',
    path:       '/blog/deleted',
    component:  '~/views/blog/posts/postsRemoved.vue'
  },
  {
    name:       'blogPostsRemovedPaginated',
    path:       '/blog/deleted/page:page(\\d+)',
    component:  '~/views/blog/posts/postsRemoved.vue'
  },
  {
    name:       'blogCategories',
    path:       '/blog/categories',
    component:  '~/views/blog/categories/categories.vue'
  },
  {
    name:       'blogCategoryPosts',
    path:       '/blog/categories/:alias',
    component:  '~/views/blog/posts/postsCategory.vue'
  },
  {
    name:       'blogCategoryPostsPaginated',
    path:       '/blog/categories/:alias/page:page(\\d+)',
    component:  '~/views/blog/posts/postsCategory.vue'
  },
  {
    name:       'blogPostCreate',
    path:       '/blog/add',
    component:  '~/views/blog/posts/form.vue'
  },
  {
    name:       'blogPost',
    path:       '/blog/:id(\\d+)',
    component:  '~/views/blog/posts/post.vue'
  },
  {
    name:       'blogPostUpdate',
    path:       '/blog/:id(\\d+)/edit',
    component:  '~/views/blog/posts/form.vue'
  }
];
