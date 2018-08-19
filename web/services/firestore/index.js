export const constructFirestoreObject = (firestore, key) => {
  const {
    status: {
      requested,
    }
  } = firestore;

  const isLoaded = requested[key];

  let body;
  if (isLoaded) {
    const { data } = firestore;

    body = data[key];
  }

  return {
    isLoaded,
    data: body,
  }
}
