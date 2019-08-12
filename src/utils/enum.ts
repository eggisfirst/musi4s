/**登录状态 */
export enum LoginStatus {
  logining,
  logout
}

/**记住密码状态 */
export enum RemPwd {
  remembered = 'remembered',
  unremember = 'unremember'
}


/**按钮颜色  */
export enum BtnTypes {
  Blue,
  Red
}

/**经销商状态：退回/受理 */
export enum BtnTitle {
  reception = '验收',
  applying = '受理',
  sendBack = '退回',
  tips = "温馨提示",
  sponsor = '发起认证',
  null = ''
}

/**alert框按钮 确定/退回/取消 */
export enum AlertBtnTypes {
  comfirm = '确定',
  sendBack = '退回',
  cancle = '取消',
}

/**星级认证状态 */
export enum StarCheckTypes {
  wait_handle = '待处理',
  wait_reception = '待验收',
  wait_sponsor = '待发起',
  processing_record = '认证进度'
}

/**排序 */
export enum SotrList {
  timeUp = '申请时间升序',
  timeDown = '申请时间降序'
}

/**身份职责 */
export enum Duty {
  area = '区域',
  fourS = '4s部'
}

/**状态 */
export enum ProcessState {
  grade = '已评分',
  apply = '已申请',
  approve = '已认证',
  sendBack = '区域已退回',
  accept = '4s已受理',
  revocation = '已撤销',
  unAccept = '未通过'
}

/**认证节点 */
export enum ApproveNode {
  agency = "经销商",
  area = "区域",
  fourS = "4s认证部",
  saleCenter = "销售中心",
  marketCenter = '市场中心',
  president = '总裁',
  headquarters = '总部'
}

