import * as Types from '../../actionTypes/4s/actionTypes';

export const handleSelectActiveIndex = (index: number ) => {
  return {
    type: Types.Select_ACTIVEINDEX,
    index
  }
}
