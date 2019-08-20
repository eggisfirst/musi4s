import { combineReducers } from 'redux';
import sort from './filter/sort'
import rightFilter from './filter/rightFilter';
import handlePageState from './4s/handlePageState';
import selectFilter from './filter/select';
import pullDownData from './filter/pullDownSelect';
import Loading from './global/loading';



export default combineReducers({
  Loading,
  sort,
  rightFilter,
  handlePageState,
  selectFilter,
  pullDownData
})