const flat = (obj, prefix = '') => Object.keys(obj).reduce((acc, k) => {
  const pre = prefix.length ? prefix + '.' : '';

  if (typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
    Object.assign(acc, flat(obj[k], pre + k));
  } else {
    acc[pre + k] = obj[k];
  }

  return acc;
}, {});

export default flat;
