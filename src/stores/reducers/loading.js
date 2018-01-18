
const initState = {
  loading: false
}
const loading = (state = initState, action) => {
  switch (action.type) {
    case 'showLoading':
      return {loading: true}
    default:
      return state
  }
}

export default loading;
