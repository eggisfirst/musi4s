import * as Types from '../../actionTypes/4s/actionTypes';

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

export const handleSituation = (index: number) => {
  return {
    type: Types.Filter_SITUATION,
    index
  }
}

export const selectStartDate = (startDate:any) => {
  console.log('startdate',startDate)
  return {
    type: Types.SELECT_START_DATE,
    startDate
  }
}

export const selectEndDate = (endDate: any) => {
  return {
    type: Types.SELECT_END_DATE,
    endDate
  }
}



