import * as Types from '../../actionTypes/4s/actionTypes';

/**合格筛选activeindex */
export const handleSelectActiveIndex = (index: number ) => {
  return {
    type: Types.Select_ACTIVEINDEX,
    index
  }
}
/**星级筛选activeindex */
export const handleSelectStarActiveIndex = (index: number ) => {
  return {
    type: Types.Select_STARACTIVEINDEX,
    index
  }
}

