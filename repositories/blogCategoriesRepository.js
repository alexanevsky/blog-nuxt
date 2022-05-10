export default ({ $api }) => ({
  async fetchAll() {
    return await $api.get('/blog/categories');
  },

  async fetch(id) {
    return await $api.get(`/blog/categories/${id}`);
  },

  async create(data = {}) {
    return await $api.post('/blog/categories', data);
  },

  async update(id, data = {}) {
    return await $api.patch(`/blog/categories/${id}`, data);
  },

  async fieldsToCreate() {
    return await $api.get('/blog/categories/create');
  },

  async fieldsToUpdate(id) {
    return await $api.get(`/blog/categories/${id}/update`);
  },

  async delete(id) {
    return await $api.delete(`/blog/categories/${id}`);
  }
});
