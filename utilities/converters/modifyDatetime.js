export default (datetime, input = {}) => {
  const date =    new Date(datetime);
  const seconds = (input.seconds || 0);
  const minutes = (input.minutes || 0);
  const hours =   (input.hours || 0);
  const days =    (input.days || 0);

  if (seconds) {
    date.setSeconds(date.getSeconds() + seconds);
  }

  if (minutes) {
    date.setMinutes(date.setMinutes() + minutes);
  }

  if (hours) {
    date.setHours(date.setHours() + minutes);
  }

  if (days) {
    date.setDate(date.getDate() + days);
  }

  return date;
}
