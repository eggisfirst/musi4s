import { combineReducers } from 'redux';
import sort from './filter/sort'
import rightFilter from './filter/rightFilter';
import handlePageState from './4s/handlePageState';
import selectFilter from './filter/select';
import pullDownData from './filter/pullDownSelect';
import checkList from './4s/checkList';
import Loading from './global/loading';
import video from './4s/video';



export default combineReducers({
  Loading,
  sort,
  rightFilter,
  handlePageState,
  selectFilter,
  pullDownData,
  checkList,
  video
})