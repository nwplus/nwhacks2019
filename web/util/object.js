

// converts all primitive values in an object into strings
const convertObjectPrimitivesToStrings = (obj) => {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (typeof value === 'object') {
      return convertObjectPrimitivesToStrings(value);
    }
    obj[key] = '' + value;
    return true;
  });
  return obj;
};

export { convertObjectPrimitivesToStrings };
