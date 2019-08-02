import * as Types from '../actionTypes';


export const changeHandleState = (state: string) => {
  return {
    type: Types.HANDLEPAGE_STATE,
    state
  }
}