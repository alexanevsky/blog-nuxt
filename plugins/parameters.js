export default async ({ $api }, inject) => {
  const parameters = await $api.get('/config', { flatten: 1 })
    .then(response => response.data.parameters || {});

  const all = () => {
    return parameters;
  };

  const get = (key) => {
    return parameters[key] || null;
  };

  inject('params', {
    all,
    get
  });
}