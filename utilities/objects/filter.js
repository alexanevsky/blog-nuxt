export default (object, mapFn = null) => {
  if (!mapFn) {
    mapFn = (v) => Array.isArray(v) ? !!v.length : !!v;
  }

  let result = {};

  Object.keys(object).forEach((key) => {
    if (true == mapFn(object[key], key)) {
      result[key] = object[key];
    }
  });

  return result;
};
