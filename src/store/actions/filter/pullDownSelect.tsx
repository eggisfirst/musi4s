import * as Types from '../../actionTypes/4s/actionTypes';

export const pullDownSelect = (index: number ) => {
  return {
    type: Types.Select_PULLDOWNINDEX,
    index
  }
}
