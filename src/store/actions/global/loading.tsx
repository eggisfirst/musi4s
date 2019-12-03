import * as Types from '../../actionTypes/4s/actionTypes';

export const setLoading = (status: boolean ) => {
  return {
    type: Types.LOADING,
    status
  }
}

export const Token = (token: string ) => {
  return {
    type: Types.TOKEN,
    token
  }
}

export const TokenObj = (tokenObj: Object ) => {
  return {
    type: Types.TOKENOBJ,
    tokenObj
  }
}

