export const format = (date: any) => {
  if (date) {
    let mday = date.getDate();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    mday = mday < 10 ? `0${mday}` : mday;
    return `${date.getFullYear()}-${month}-${mday}`;
  }
}

/**
 * 获取星级
 * @param star 
 */
export const getStar = (star: number) => {
  if (star === 1) {
    return '一星'
  }
  else if (star === 2) {
    return '二星'
  }
  else if (star === 3) {
    return '三星'
  }
  else if (star === 4) {
    return '四星'
  }
  else if (star === 5) {
    return '五星'
  }
}

/**
 * 获取认证进度条状态
 * @param state 
 */
export const getApproveState = (state: number | string) => {
  switch (state) {
    case 1:
      return '已申请'
    case 2:
      return '已退回'
    case 3:
      return '已撤销'
    case 4:
      return '区域经理已受理（评分中）'
    case 5:
      return '区域经理已评分（通过'
    case 6:
      return '区域经理未通过'
    case 7:
      return '区域经理发起认证'
    case 8:
      return '4s认证部已受理'
    case 9:
      return '4s认证部已评分（通过）'
    case 10:
      return '4s认证部未通过'
    case 11:
      return '4s认证部发起认证'
    case 12:
      return 'OA认证通过'
    case 13:
      return 'OA认证未通过'
    default:
      break;
  }
}
