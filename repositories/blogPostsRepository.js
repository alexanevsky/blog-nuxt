const PAGE_LIMIT = 12;

export default ({ $api }) => ({
  async fetchAll(page = 1) {
    const limit = PAGE_LIMIT;
    const offset = limit * (page - 1);

    return await $api.get('/blog/posts', { offset, limit });
  },

  async fetchRemoved(page = 1) {
    const limit = PAGE_LIMIT;
    const offset = limit * (page - 1);

    return await $api.get('/blog/posts/removed', { offset, limit });
  },

  async fetchUnpublished(page = 1) {
    const limit = PAGE_LIMIT;
    const offset = limit * (page - 1);

    return await $api.get('/blog/posts/unpublished', { offset, limit });
  },

  async fetchByCategory(id, page = 1) {
    const limit = PAGE_LIMIT;
    const offset = limit * (page - 1);

    return await $api.get(`/blog/categories/${id}/posts`, { offset, limit });
  },

  async fetch(id) {
    return await $api.get(`/blog/posts/${id}`);
  },

  async create(data = {}) {
    return await $api.post('/blog/posts', data);
  },

  async update(id, data = {}) {
    return await $api.patch(`/blog/posts/${id}`, data);
  },

  async fieldsToCreate() {
    return await $api.get('/blog/posts/create');
  },

  async fieldsToUpdate(id) {
    return await $api.get(`/blog/posts/${id}/update`);
  },

  async imageUpload(id, content) {
    return await $api.post(`/blog/posts/${id}/image`, content);
  },

  async imageDelete(id) {
    return await $api.delete(`/blog/posts/${id}/image`);
  },

  async remove(id) {
    return await $api.post(`/blog/posts/${id}/remove`);
  },

  async restore(id) {
    return await $api.post(`/blog/posts/${id}/restore`);
  },

  async delete(id) {
    return await $api.delete(`/blog/posts/${id}`);
  }
});
