import * as Types from '../../actionTypes/4s/actionTypes';

const initState = {
  activeIndex: 0,
  selectList:['全部', '合格', '不合格'],
}

interface action {
  index: number
  type: string
}


export default (state=initState, action:action) => {
  const newState = JSON.parse( JSON.stringify(state));
  switch (action.type) {
    case Types.Select_ACTIVEINDEX:
      newState.activeIndex = action.index
      return newState;
  }
  return state;
}