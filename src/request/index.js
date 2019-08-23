import { Request } from './request'


class IndexModel extends Request {
  /**获取职位 */
  getAuth(data) {
    return this.getSecretData({
      url: "v2/api/cert/approve/getAuth",
    }, data)
  }
  
  /**获取星级认证信息 */
  getUserInfo() {
    return this.getSecretData({
      url: "v2/api/cert/approve/getUserInfo",
    })
  }
}

export { IndexModel }