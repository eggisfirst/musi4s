import * as Types from '../actionTypes';
import { SotrList } from '../../utils/enum';

export const handleSort = (status: SotrList ) => {
  return {
    type: Types.CHANGE_SORT,
    status
  }
}