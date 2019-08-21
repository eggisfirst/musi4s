import * as Types from '../../actionTypes/4s/actionTypes';

const initState = {
  status: false,
}

interface action {
  type: string
  status: boolean
}


export default (state=initState, action:action) => {
  const newState = JSON.parse( JSON.stringify(state));
  switch (action.type) {
    case Types.LOADING:
      newState.status = action.status
      return newState;
  }
  return state;
}