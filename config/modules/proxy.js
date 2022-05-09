export default {
  '/api/': {
    target: process.env.API_BASE_URL,
    pathRewrite: { '^/api/': '' }
  }
};
