export const addCurrentUser = currentUser => ({
  type: 'ADD_CURRENT_USER',
  currentUser
});

export const removeCurrentUser = () => ({
  type: 'REMOVE_CURRENT_USER',
  currentUser: null
})
