export const getPrimaryButtonText = (activeIndex, count) => {
  if (activeIndex === count - 1) {
    return 'Submit hackerApplcation';
  }
  if (activeIndex === count - 2) {
    return 'One last step';
  }
  return 'Next';
};
