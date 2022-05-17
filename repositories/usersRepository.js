const PAGE_LIMIT = 12;

export default ({ $api }) => ({
  async fetchAll(page = 1) {
    const limit = PAGE_LIMIT;
    const offset = limit * (page - 1);

    return await $api.get('/users', { offset, limit });
  },

  async fetchRemoved(page = 1) {
    const limit = PAGE_LIMIT;
    const offset = limit * (page - 1);

    return await $api.get('/users/removed', { offset, limit });
  },

  async fetchBanned(page = 1) {
    const limit = PAGE_LIMIT;
    const offset = limit * (page - 1);

    return await $api.get('/users/banned', { offset, limit });
  },

  async fetch(id) {
    return await $api.get(`/users/${id}`);
  },

  async create(data = {}) {
    return await $api.post('/users', data);
  },

  async update(id, data = {}) {
    return await $api.patch(`/users/${id}`, data);
  },

  async fieldsToCreate() {
    return await $api.get('/users/create');
  },

  async fieldsToUpdate(id) {
    return await $api.get(`/users/${id}/update`);
  },

  async avatarUpload(id, content) {
    return await $api.post(`/users/${id}/avatar`, content);
  },

  async avatarDelete(id) {
    return await $api.delete(`/users/${id}/avatar`);
  },

  async remove(id) {
    return await $api.post(`/users/${id}/remove`);
  },

  async restore(id) {
    return await $api.post(`/users/${id}/restore`);
  },

  async erase(id) {
    return await $api.post(`/users/${id}/erase`);
  }
});
