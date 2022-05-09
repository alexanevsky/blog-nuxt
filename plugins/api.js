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
  const get = async (url, query = {}, config = {}) => {
    const apiUrl = URL_PREFIX + url + (Object.values(query).length ? (url.includes('?') ? '&' : '?') + new URLSearchParams(query).toString() : '');
    const apiConfig = config;

    const response = await $axios.get(apiUrl, apiConfig)
      .then(response => new ApiResponse(response))
      .catch(error => new ApiResponse(error.response));

    return response;
  }

  const post = (url, data = {}, config = {}) => {
    const apiUrl = URL_PREFIX + url;
    const apiData = data;
    const apiConfig = config;

    const response = $axios.post(apiUrl, apiData, apiConfig)
      .then(response => new ApiResponse(response))
      .catch(error => new ApiResponse(error.response));

    return response;
  }

  inject('api', { get, post });
}
