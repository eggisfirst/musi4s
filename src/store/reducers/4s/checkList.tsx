import * as Types from '../../actionTypes/4s/actionTypes';
import { deepClone } from '../../../utils';


const initState  = {
  checkList: [
    {
      status: true,
      standardList: [
        {
          name: '店面',
          type: false,
        },
        {
          name: '店面面积',
          type: false,
        },
        {
          name: '店面类型',
          type: false,
        },
      ],
      name: 'SI/VI应用规范及维护'
    },
    {
      status: false,
      standardList: [
        {
          name: '门头清洁维护',
          type: false,
        },
        {
          name: '门头清洁维护',
          type: false,
        },
        {
          name: '门头清洁维护',
          type: false,
        },
      ],
      name: 'SI/VI应用规范及维护'
    },
  ]
}

interface action {
  type: string
  state: any[]
}


export default (state=initState, action:action) => {
  // const newState = deepClone(state, {});
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case Types.CHECK_LIST:
      newState.checkList = action.state
      return newState;
  }
  return state;
}
