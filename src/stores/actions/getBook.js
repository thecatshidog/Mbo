import axios from 'axios';

const getBook = () => async (dispatch) => {
  const data = await axios.get(`http://api.jirengu.com/fm/getChannels.php`);
  dispatch({
    type: 'getBook',
    payload: data,
  })
  return data;
}

export default getBook;