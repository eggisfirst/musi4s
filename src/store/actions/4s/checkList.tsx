import * as Types from '../../actionTypes/4s/actionTypes';


export const changeCheckList = (state: any[]) => {
  return {
    type: Types.CHECK_LIST,
    state
  }
}