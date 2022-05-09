export default (datetime, withTime = true) => {
  const date = new Date(datetime);

  return withTime
    ? date.toLocaleString('en-US', {dateStyle: 'long', timeStyle: 'short'})
    : date.toLocaleString('en-US', {dateStyle: 'long'});
}
