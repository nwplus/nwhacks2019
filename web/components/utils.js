// contains helper functions shared by component library

const concatClassName = (baseClassName, extraClassName = undefined) => (extraClassName ? [baseClassName, extraClassName].join(' ') : baseClassName);

export { concatClassName };
