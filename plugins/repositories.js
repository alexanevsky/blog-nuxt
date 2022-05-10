import blogCategoriesRepository from '~/repositories/blogCategoriesRepository';
import blogCommentsRepository   from '~/repositories/blogCommentsRepository';
import blogPostsRepository      from '~/repositories/blogPostsRepository';
import usersRepository          from '~/repositories/usersRepository';

export default (context, inject) => {
  inject('repositories', {
    blogCategories: blogCategoriesRepository(context),
    blogComments:   blogCommentsRepository(context),
    blogPosts:      blogPostsRepository(context),
    users:          usersRepository(context)
  });
};
