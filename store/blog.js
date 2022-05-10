export const state = () => ({
  sidebar: {
    categories: []
  }
});

export const getters = {
  sidebar(state) {
    return state.sidebar;
  },

  sidebarCategories(state) {
    return state.sidebar.categories;
  }
};

export const mutations = {
  setSidebarCategories(state, categories = []) {
    state.sidebar.categories = categories;
  }
};
