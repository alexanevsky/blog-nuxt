const URL_PREFIX = '/api';

class ApiResponse {
  constructor(response) {
    this.status =     response.status || 500;
    this.statusText = response.statusText || 'Internal Server Error';
    this.success =    response.data.success || false;
    this.message =    response.data.message || null;
    this.data =       response.data.response || {};
    this.errors =     response.data.errors && Object.keys(response.data.errors).length ? response.data.errors : null;
  }
}

export default ({ $axios }, inject) => {
  const request = (method, url, data = {}, config = {}) => {
    return $axios({
      method: method,
      url:    URL_PREFIX + url,
      data:   data,
      ...config
    })
    .then((response) => new ApiResponse(response))
    .catch((error) => new ApiResponse(error.response));
  };

  const get = (url, query = {}, config = {}) => {
    if (Object.values(query).length) {
      url = url + (url.includes('?') ? '&' : '?') + new URLSearchParams(query).toString();
    }

    return request('get', url, {}, config);
  }

  const post = (url, data = {}, config = {}) => request('post', url, data, config);

  const put = (url, data = {}, config = {}) => request('put', url, data, config);

  const patch = (url, data = {}, config = {}) => request('patch', url, data, config);

  const del = (url, data = {}, config = {}) => request('delete', url, data, config);

  inject('api', {
    request:  request,
    get:      get,
    post:     post,
    put:      put,
    patch:    patch,
    delete:   del
  });
}
