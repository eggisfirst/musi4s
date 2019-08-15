import * as Types from '../../actionTypes/4s/actionTypes';

const initState = {
  activeIndex: 0,
}

interface action {
  type: string
  index: number
}


export default (state=initState, action:action) => {
  const newState = JSON.parse( JSON.stringify(state));
  switch (action.type) {
    case Types.Select_PULLDOWNINDEX:
      newState.activeIndex = action.index
      return newState;
  }
  return state;
}