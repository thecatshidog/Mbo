
const initState = {
}
const getBook = (state = initState, action) => {
  switch (action.type) {
    case 'getBook':
      return action.payload;
    default:
      return state;
  }
}

export default getBook;
