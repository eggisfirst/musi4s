import { combineReducers } from 'redux';
import counter from './counter';
import sort from './filter/sort'
import rightFilter from './filter/rightFilter';


export default combineReducers({
  counter,
  sort,
  rightFilter
})