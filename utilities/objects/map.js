export default (object, mapFn) => {
  return Object.keys(object).reduce((result, key) => {
    result[key] = mapFn(object[key], key);

    return result;
  }, {});
};
