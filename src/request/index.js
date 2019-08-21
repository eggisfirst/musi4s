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
      url: "v2/api/cert/approve/region/acceptList",
      data: data
    })
  }

  /**退回 待受理*/
  sendBack(id,remark) {
    return this.getSecretData({
      url: "v2/api/cert/approve/region/list",
      data: {
        id,
        remark
      }
    })
  }
  /**受理 待受理 */
  accept(id) {
    return this.getSecretData({
      url: "v2/api/cert//approve/region/accept",
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
}

export { IndexModel }