import * as Types from '../../actionTypes/4s/actionTypes';

const initState = {
  activeIndex: 0,
  selectActiveIndex: -1,
}

interface action {
  index: number
  type: string
  list: Array<string>
}


export default (state=initState, action:action) => {
  const newState = JSON.parse( JSON.stringify(state));
  switch (action.type) {
    case Types.Select_ACTIVEINDEX:
      newState.activeIndex = action.index
      return newState;
    case Types.Select_STARACTIVEINDEX:
      newState.selectActiveIndex = action.index
      return newState;
  }
  return state;
}