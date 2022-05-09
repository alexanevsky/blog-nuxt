import routes from '../router/routes';

export default {
  extendRoutes(router) {
    routes.forEach((route) => {
      router.push(route);
    });
  },

  linkActiveClass:      '',
  linkExactActiveClass: '',

  // trailingSlash: false,

  scrollBehavior: () => ({ x: 0, y: 0 })
};
