import { combineReducers } from 'redux';
import counter from './counter';
import sort from './filter/sort'
import rightFilter from './filter/rightFilter';
import handlePageState from './handlePageState';


export default combineReducers({
  counter,
  sort,
  rightFilter,
  handlePageState
})