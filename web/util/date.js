// converts unix timestamp to string of form 'HH:MM AM/PM SHORT_MONTH DAY YEAR'
const decodeUnixTimestamp = (unixTimestamp) => {
  const dateObj = new Date(unixTimestamp);
  const time = dateObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const date = dateObj.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return `${time} ${date}`.replace(/,/, '');
};

export { decodeUnixTimestamp };
