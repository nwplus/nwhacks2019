// contains helper functions shared by component library

const concatClassName = (baseClassName, extraClassName = undefined) => {
  return extraClassName ? [baseClassName, extraClassName].join(" ") : baseClassName;
}

export { concatClassName }