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

}

export { IndexModel }