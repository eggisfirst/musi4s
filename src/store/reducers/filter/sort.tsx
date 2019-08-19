import * as Types from '../../actionTypes/4s/actionTypes';
import { SotrList } from '../../../utils/enum';

const initState = {
  isActive: false,
  activeIndex: 0,
  sortList: [SotrList.timeUp, SotrList.timeDown]
}

interface action {
  type: string
  isActive: boolean
  activeIndex: number
}


export default (state=initState, action:action) => {
  const newState = JSON.parse( JSON.stringify(state));
  switch (action.type) {
    case Types.SORT_ACTIVE:
      newState.isActive = action.isActive
      return newState;
    case Types.SORT_ACTIVEINDEX:
      newState.activeIndex = action.activeIndex
      return newState;
  }
  return state;
}