import blogCategoriesRepository from '~/repositories/blogCategoriesRepository';

export default (context, inject) => {
  inject('repositories', {
    blogCategories: blogCategoriesRepository(context)
  });
};
