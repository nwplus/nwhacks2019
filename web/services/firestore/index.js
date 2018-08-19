export const constructFirestoreObject = (firestore, key) => {
  const { data } = firestore;

  const isLoaded = !!data[key];

  let body;
  if (isLoaded) {
    const { data } = firestore;

    body = data[key];
  }

  return {
    isLoaded,
    data: body,
  };
};
