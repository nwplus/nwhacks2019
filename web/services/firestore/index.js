export const getFromFirestore = (firestore, key) => {
  const { data } = firestore;

  const isLoaded = !!data[key];

  let body;
  if (isLoaded) {
    body = data[key];
  }

  return {
    isLoaded,
    data: body,
  };
};
