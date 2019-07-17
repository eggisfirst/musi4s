import * as Types from '../actionTypes';


export const add = (n: any) => {
  return {
    type: Types.COUNT_ADD,
    n
  }
}