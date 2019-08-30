import * as Types from '../../actionTypes/4s/actionTypes';

const initState = [
  {
    status: true,
    list: [
      {
        name: '店面',
        status: true,
      },
      {
        name: '店面面积',
        status: true,
      },
      {
        name: '店面类型',
        status: false,
      },
    ],
    title: 'SI/VI应用规范及维护'
  },
  {
    status: false,
    list: [
      {
        name: '门头清洁维护',
        status: false,
      },
      {
        name: '门头清洁维护',
        status: false,
      },
      {
        name: '门头清洁维护',
        status: false,
      },
    ],
    title: 'SI/VI应用规范及维护'
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
