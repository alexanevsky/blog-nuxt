import blogCategoriesRepository from '~/repositories/blogCategoriesRepository';
import blogPostsRepository      from '~/repositories/blogPostsRepository';

export default (context, inject) => {
  inject('repositories', {
    blogCategories: blogCategoriesRepository(context),
    blogPosts:      blogPostsRepository(context)
  });
};
