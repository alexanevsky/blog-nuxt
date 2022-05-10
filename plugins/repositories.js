import blogCategoriesRepository from '~/repositories/blogCategoriesRepository';
import blogPostsRepository      from '~/repositories/blogPostsRepository';
import usersRepository          from '~/repositories/usersRepository';

export default (context, inject) => {
  inject('repositories', {
    blogCategories: blogCategoriesRepository(context),
    blogPosts:      blogPostsRepository(context),
    users:          usersRepository(context)
  });
};
