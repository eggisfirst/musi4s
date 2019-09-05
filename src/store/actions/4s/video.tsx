import * as Types from '../../actionTypes/4s/actionTypes';


export const videoControl = (state: string) => {
  return {
    type: Types.VIDEO_CONTROL,
    state
  }
}