// returns given string with a capitalized first letter
const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

// checks if a given string is a number
// https://github.com/lodash/lodash/issues/1148#issuecomment-347293517
// eslint-disable-next-line no-restricted-globals
const isNumeric = x => ((typeof x === 'number' || typeof x === 'string') && !isNaN(Number(x)));

export { capitalizeFirstLetter, isNumeric };
