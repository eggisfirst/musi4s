import * as Types from '../../actionTypes/4s/actionTypes';

const initState = {
  status: false,
  token: ''
}

interface action {
  type: string
  status: boolean
  token: string
}


export default (state=initState, action:action) => {
  const newState = JSON.parse( JSON.stringify(state));
  switch (action.type) {
    case Types.LOADING:
      newState.status = action.status
      return newState;
    case Types.TOKEN:
      newState.token = action.token
      return newState;
  }
  return state;
}