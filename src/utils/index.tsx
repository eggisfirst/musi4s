export const format = (date: any) => {
  if (date) {
    let mday = date.getDate();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    mday = mday < 10 ? `0${mday}` : mday;
    return `${date.getFullYear()}-${month}-${mday}`;
  }
}

/**区域职位 */
export const areaDuty =
  [
    '经销商',
    '区域',
    '销售中心',
    '市场中心',
    '总裁',
    '总部'
  ]

/**4s职位 */
export const fourDuty =
  [
    '经销商',
    '区域',
    '4s认证部',
    '销售中心',
    '4s认证部',
    '市场中心',
    '总裁',
    '总部'
  ]


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
 * 获取认证进度状态 
 * @param state 
 */
export const getApproveState = (state: number | string, lastFlow: any, rejectType: number | undefined) => {
  /**三星后而且到了oa的节点才有这个参数 */
  if (lastFlow) {
    const type = lastFlow.type
    const status = lastFlow.status
    switch (type) {
      case 8:
        if (status == 1) {
          return '总部已审批'
        } else if (status == 2) {
          return '总部已退回'
        } else if (status == 3) {
          return '已认证'
        }
        break;
      case 4:
        if (status == 1) {
          return '销售中心已审批'
        } else if (status == 2) {
          return '销售中心已退回'
        }
        break;
      case 5:
        if (status == 1) {
          return '4s已审批'
        } else if (status == 2) {
          return '4s已退回'
        }
        break;
      case 6:
        if (status == 1) {
          return '市场中心已审批'
        } else if (status == 2) {
          return '市场中心已退回'
        }
        break;
      case 7:
        if (status == 1) {
          return '总裁已审批'
        } else if (status == 2) {
          return '总裁已退回'
        }
        break;
      default:
        break;
    }
  }
  switch (state) {
    case 1:
      return '已申请'
    case 2:
      if (rejectType) {
        return rejectType == 2 ? '区域已退回' : '4s已退回'
      }
    case 3:
      return '已撤销'
    case 4:
      return '区域已受理'
    case 5:
      return '区域已通过'
    case 6:
      return '区域未通过'
    case 7:
      return '区域已发起'
    case 8:
      return '4s已受理'
    case 9:
      return '4s已通过'
    case 10:
      return '4s未通过'
    case 11:
      return '4s已发起'
    case 12:
      return '已认证'
    case 13:
      return 'OA认证未通过'
    default:
      break;
  }
}
/**
 * 获取认证进度条状态 其他节点 
 * @param state 
 */
export const getApproveOtherBoxState = (state: number | string) => {
  switch (state) {
    case 1:
      return '通过'
    case 2:
      return '退回'
    case 3:
      return '验收通过'
    default:
      break;
  }
}
/**
 * 获取认证进度条状态经销商 区域 4s认证部
 * @param state 
 */
export const getApproveBoxState = (state: number | string) => {
  switch (state) {
    case 1:
      return '已申请'
    case 2:
      return '已退回'
    case 3:
      return '已撤销'
    case 4:
      return '已受理'
    case 5:
      return '已评分'
    case 6:
      return '未通过'
    case 7:
      return '发起认证'
    case 8:
      return '已受理'
    case 9:
      return '已评分'
    case 10:
      return '未通过'
    case 11:
      return '发起认证'
    case 12:
      return 'OA认证通过'
    case 13:
      return 'OA认证未通过'
    case 'no':
      return 'no'
    default:
      break;
  }
}

/**
 * 返回认证弹框右边有几个节点
 */
export const approveBoxLeftInfo = (data: any) => {
  let i = 0
  for (const key in data) {
    if (data[key].length) {
      i += 1
    } else {
      return i
    }
  }
}
/**
 * 认证弹框数据对象转数组
 * @param data 
 */
export const turnToArray = (data: any) => {
  let arr = []
  for (const key in data) {
    if (data[key].length) {
      arr.push({ data: data[key] })
    }
  }
  return arr
}

/**
 * 返回的时间参数去除时分秒
 */
export const removeSecond = (data: any) => {
  const time = data.split(' ')
  if (time) {
    return time[0]
  }
}

/**
 * 对象/数组深度拷贝
 */
export const deepClone = (origin: any, target: any) => {
  let toStr = Object.prototype.toString
  let arrStr = '[object Array]'
  for (var prop in origin) {
    // 判断一个对象是否包含自定义属性而不是原型链上的属性
    if (origin.hasOwnProperty(prop)) {
      if (origin[prop] !== 'null' && typeof (origin[prop]) == 'object') {
        if (toStr.call(origin[prop]) == arrStr) {
          target[prop] = []
        } else {
          target[prop] = {}
        }
        deepClone(origin[prop], target[prop])
      } else {
        target[prop] = origin[prop]
      }
    }
  }
  return target
}
