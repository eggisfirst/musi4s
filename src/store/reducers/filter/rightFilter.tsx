import * as Types from '../../actionTypes/4s/actionTypes';
import { format } from '../../../utils/index';

const initState = {
  isActive: false,
  starIndex: -1,
  starList:['一星','二星','三星','四星','五星'],
  situationIndex: -1,
  situationList: ['认证中','已认证','认证失败'],

  startDate: new Date().getTime(),
  endDate: new Date().getTime()
}

interface action {
  type: string
  isActive: boolean
  index: number
  startDate: any
  endDate: any
}


export default (state=initState, action:action) => {
  const newState = JSON.parse( JSON.stringify(state));
  switch (action.type) {
    case Types.Filter_ACTIVE:
      newState.isActive = action.isActive
      return newState;
    case Types.Filter_STAR:
      newState.starIndex = action.index
      return newState
    case Types.Filter_SITUATION:
      newState.situationIndex = action.index
      return newState
    case Types.SELECT_START_DATE:
      newState.startDate = action.startDate
      return newState
    case Types.SELECT_END_DATE:
      newState.endDate = action.endDate
      return newState
  }
  return state;
}