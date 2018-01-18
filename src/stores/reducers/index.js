import { combineReducers } from 'redux';
import Loading from './loading';
import getBook from './getBook';

export default combineReducers({
  Loading,
  getBook,
});
