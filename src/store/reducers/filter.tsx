import * as Types from '../actionTypes';
import {SotrList} from '../../utils/enum'

const initState = {
  status: SotrList.timeUp
}

interface action {
  type: 'CHANGE_SORT'
  status: SotrList
}


export default (state=initState, action:action) => {
  const newState = JSON.parse( JSON.stringify(state));
  switch (action.type) {
    case Types.CHANGE_SORT:
      newState.status = action.status
      return newState;
  }
  return state;
}