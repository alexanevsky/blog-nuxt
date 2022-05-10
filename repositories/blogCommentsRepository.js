const PAGE_LIMIT = 12;

export default ({ $api }) => ({
  async fetchByPost(postId) {
    return await $api.get(`/blog/posts/${postId}/comments`);
  },

  async fetch(id) {
    return await $api.get(`/blog/comments/${id}`);
  },

  async createToPost(postId, data = {}) {
    return await $api.post(`/blog/posts/${postId}/comments`, data);
  },

  async update(id, data = {}) {
    return await $api.patch(`/blog/comments/${id}`, data);
  },

  async reply(parentId, data = {}) {
    return await $api.post(`/blog/comments/${parentId}/replies`, data);
  },

  async remove(id) {
    return await $api.post(`/blog/comments/${id}/remove`);
  },

  async restore(id) {
    return await $api.post(`/blog/comments/${id}/restore`);
  },

  async delete(id) {
    return await $api.delete(`/blog/comments/${id}`);
  }
});
