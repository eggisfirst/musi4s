import { Request } from './request'


class IndexModel extends Request {
  /**获取职位 */
  getAuth() {
    return this.getSecretData({
      url: "v2/api/cert/approve/getAuth",
    })
  }

  /**获取星级认证信息 */
  getUserInfo() {
    return this.getSecretData({
      url: "v2/api/cert/approve/getUserInfo",
    })
  }

  /**待受理名单 */
  getAcceptList(data) {
    return this.getSecretData({
      url: "v2/api/cert/approve/acceptList",
      data: data
    })
  }

  /**退回 待受理*/
  sendBack(id, remark) {
    return this.getSecretData({
      url: "v2/api/cert/approve/reject",
      data: {
        id,
        remark
      }
    })
  }
  /**受理 待受理 */
  accept(id) {
    return this.getSecretData({
      url: "v2/api/cert/approve/accept",
      data: {
        id
      }
    })
  }

  /**待验收名单 */
  getReceptionList(data) {
    return this.getSecretData({
      url: "v2/api/cert/approve/gradeList",
      data: data
    })
  }

  /**
   * 验收店铺列表
   */
  getReceShopList(qualificationId) {
    return this.getSecretData({
      url: 'v2/api/cert/approve/getShopList',
      data: {
        qualificationId
      }
    })
  }
  /**
   * 获取店铺信息
   * @param {*记录id} qualificationId 
   * @param {*店铺id} shopId 
   */
  getShopInfo(qualificationId, shopId) {
    return this.getSecretData({
      url: "v2/api/cert/approve/getShopInfo",
      data: {
        qualificationId,
        shopId,
      }
    })
  }
  /**
   * 获取待发起名单
   * @param {*} data 
   */
  getSponsorList(data) {
    return this.getSecretData({
      url: "v2/api/cert/approve/sponsorList",
      data: data
    })
  }
  /**
   * 获取认证进度名单
   * @param {*} data 
   */
  getLogList(data) {
    return this.getSecretData({
      url: "v2/api/cert/approve/logList",
      data: data
    })
  }
  /**
   * 获取认证进度条数据
   * @param {*} qualificationId 
   */
  getApproveFlowInfo(qualificationId) {
    return this.getSecretData({
      url: "v2/api/cert/approve/getApproveFlowInfo",
      data: {
        qualificationId
      }
    })
  }

  /**
   * 获取评星页面数据
   * @param {*申请认证id} qualificationId 
   * @param {*店铺id} shopId 
   */
  getCategories(qualificationId, shopId) {
    return this.getSecretData({
      url: "v2/api/cert/approve/getCategories",
      data: {
        qualificationId,
        shopId
      }
    })
  }

  /**
   * 发起认证
   * @param {*发起认证id} qualificationId 
   */
  getApproveList(qualificationId) {
    return this.getSecretData({
      url: "v2/api/cert/approve/getApproveInfo",
      data: {
        qualificationId
      }
    })
  }
  /**
   * 提交认证
   */
  sendApprove(qualificationId) {
    return this.getSecretData({
      url: "v2/api/cert/approve/saveApprove",
      data: {
        qualificationId
      }
    })
  }

  /**
   * 获取检查记录
   */
  getCheckList(page) {
    return this.getSecretData({
      url: "v2/api/cert/approve/checkList",
      data: {
        page,
        limit: 10
      }
    })
  }
  /**
   * 获取检查历史记录
   * @param {*} shopId 
   * @param {*0不合格，1合格，不传默认全部} pass 
   */
  getCheckLog(shopId, pass) {
    return this.getSecretData({
      url: "v2/api/cert/approve/checklogs",
      data: {
        shopId,
        pass
      }
    })
  }


  /**
   * 获取验收评分列表
   * @param {*页数} page 
   * @param {*全部1/及格2/不及格3} status 
   */
  getApproveCheckLogList(page) {
    return this.getSecretData({
      url: "v2/api/cert/approve/approveCheckLog/list",
      data: {
        page,
        limit: 10,
      }
    })
  }
  /**
   * 获取验收评分/门店检查列表
   * @param {*} shopId 
   */
  getShopHistory(shopId) {
    return this.getSecretData({
      url: "v2/api/cert/approve/approveCheckLog/shopHistory",
      data: {
        shopId
      }
    })
  }
  /**
   * 获取各星级评分详情
   * @param {*shopId,qualificationId,starLevelId,type} data 
   */
  getStarGrade(data) {
    return this.getSecretData({
      url: "v2/api/cert/approve/approveCheckLog/starGrade",
      data: data
    })
  }
}


export { IndexModel }