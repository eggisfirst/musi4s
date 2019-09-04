import * as Types from '../../actionTypes/4s/actionTypes';

const initState = {
  isPlay: false
}

interface action {
  type: string
  state: string
}


export default (state=initState, action:action) => {
  const newState = JSON.parse( JSON.stringify(state));
  switch (action.type) {
    case Types.VIDEO_CONTROL:
      newState.isPlay = action.state
      return newState;
  }
  return state;
}