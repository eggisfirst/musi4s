import * as Types from '../actionTypes/4s/actionTypes';


export const add = (n: any) => {
  return {
    type: Types.COUNT_ADD,
    n
  }
}