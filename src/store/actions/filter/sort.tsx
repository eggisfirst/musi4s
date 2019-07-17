import * as Types from '../../actionTypes';

export const handleSortActive = (isActive: boolean ) => {
  return {
    type: Types.SORT_ACTIVE,
    isActive
  }
}

export const handleSortIndex = (activeIndex: number ) => {
  return {
    type: Types.SORT_ACTIVEINDEX,
    activeIndex
  }
}
