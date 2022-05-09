export default {
  redirect: {
    login:    '/login',
    logout:   '/',
    callback: '/login',
    home:     false
  },
  strategies: {
    local: {
      token: {
        property: 'response.accessToken'
      },
      user: {
        property: 'response.user'
      },
      endpoints: {
        login:    { method: 'POST', url: '/api/auth' },
        user:     { method: 'GET',  url: '/api/auth/user' }
      }
    }
  },
  plugins: [
    '~/plugins/security.js'
  ]
};
