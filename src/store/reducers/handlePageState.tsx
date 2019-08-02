import * as Types from '../actionTypes';
import { StarCheckTypes } from '../../utils/enum';

const initState = {
  HState: StarCheckTypes.wait_handle
}

interface action {
  type: string
  state: string
}


export default (state=initState, action:action) => {
  const newState = JSON.parse( JSON.stringify(state));
  switch (action.type) {
    case Types.HANDLEPAGE_STATE:
      newState.HState = action.state
      return newState;
  }
  return state;
}