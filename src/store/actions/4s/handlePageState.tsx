import * as Types from '../../actionTypes/4s/actionTypes';


export const changeHandleState = (state: string) => {
  return {
    type: Types.HANDLEPAGE_STATE,
    state
  }
}