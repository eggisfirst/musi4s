import { combineReducers } from 'redux';
import counter from './counter';
import sort from './filter/sort'

export default combineReducers({
  counter,
  sort
})