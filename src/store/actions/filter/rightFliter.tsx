import * as Types from '../../actionTypes';

export const handleFilterActive = (isActive: boolean ) => {
  return {
    type: Types.Filter_ACTIVE,
    isActive
  }
}


export const handleSelectStarIndex = (index: number) => {
  return {
    type: Types.Filter_STAR,
    index
  }
}

export const selectStartDate = (startDate:Date) => {
  return {
    type: Types.SELECT_START_DATE,
    startDate
  }
}

export const selectEndDate = (endDate: Date) => {
  return {
    type: Types.SELECT_END_DATE,
    endDate
  }
}



