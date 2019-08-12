import { combineReducers } from 'redux';
import sort from './filter/sort'
import rightFilter from './filter/rightFilter';
import handlePageState from './4s/handlePageState';


export default combineReducers({
  sort,
  rightFilter,
  handlePageState
})