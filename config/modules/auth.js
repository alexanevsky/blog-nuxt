export default {
  redirect: {
    login:    '/login',
    logout:   '/',
    callback: '/login',
    home:     false
  },
  strategies: {
    local: {
      scheme: 'refresh',
      token: {
        property: 'response.accessToken'
      },
      refreshToken: {
        property: 'response.refreshToken',
        data:     'refreshToken'
      },
      user: {
        property: 'response.user'
      },
      endpoints: {
        login:    { method: 'POST', url: '/api/auth' },
        refresh:  { method: 'POST', url: '/api/auth/refresh' },
        user:     { method: 'GET',  url: '/api/auth/user' }
      }
    }
  },
  plugins: [
    '~/plugins/security.js'
  ]
};
