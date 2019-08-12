import * as Types from '../actionTypes/4s/actionTypes';

const initState = {
  count: 10
}


export default (state=initState, action:any) => {
  const newState = JSON.parse( JSON.stringify(state));

  switch (action.type) {
    case Types.COUNT_ADD:
      newState.count = newState.count + action.n;
      return newState;
  }

  return state;
}