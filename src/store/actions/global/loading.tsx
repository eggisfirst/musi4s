import * as Types from '../../actionTypes/4s/actionTypes';

export const setLoading = (status: boolean ) => {
  return {
    type: Types.LOADING,
    status
  }
}

