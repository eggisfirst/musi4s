import * as Types from '../../actionTypes/4s/actionTypes';

const initState = [
  {
    status: true,
    standardList: [
      {
        name: '店面1',
        type: true,
      },
      {
        name: '店面面积1',
        type: true,
      },
      {
        name: '店面类型1',
        type: false,
      },
    ],
    name: 'SI/VI应用规范及维护'
  },
  {
    status: false,
    standardList: [
      {
        name: '门头清洁维护1',
        type: false,
      },
      {
        name: '门头清洁维护1',
        type: false,
      },
      {
        name: '门头清洁维护1',
        type: false,
      },
    ],
    name: 'SI/VI应用规范及维护'
  },
]

interface action {
  type: string
  checkList: any[]
}


export default (state=initState, action:action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case Types.CHECK_LIST:
      newState.checkList = action.checkList
      return newState;
  }
  return state;
}
