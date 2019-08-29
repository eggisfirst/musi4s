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
   * 获取所有的检查项
   * @param {*} categoryId 
   * @param shopId
   */
  subcategories(categoryId, shopId) {
    return this.getSecretData({
      url: "v2/api/cert/approve/subcategories",
      data: {
        categoryId,
        shopId
      }
    })
  }
  /**
   * 提交评分
   * @param {*} data 
   */
  submitForm(data) {
    return this.getJsonData({
      url: "v2/api/cert/approve/submit",
      data: data
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
  getCheckList(page, limit = 10, key = '') {
    return this.getSecretData({
      url: "v2/api/cert/approve/checkList",
      data: {
        page,
        limit,
        key
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
   * 获取检查 检查详情头部星级选择条
   * @param {*} shopId 
   * @param {*} startTime 
   * @param {*} endTime 
   */
  getCheckcategories(shopId, startTime, endTime) {
    return this.getSecretData({
      url: "v2/api/cert/approve/checkcategories",
      data: {
        shopId,
        startTime,
        endTime
      }
    })
  }
  /**
   * 获取检查 检查详情页面的详情
   * shopId,levelId,startTime,endTime
   */
  getCheckLogInfo(shopId, levelId, startTime, endTime) {
    return this.getSecretData({
      url: "v2/api/cert/approve/checkloginfo",
      data: {
        shopId,
        levelId,
        startTime,
        endTime
      }
    })
  }

  /**
   * 获取检查 -- 检查记录详情的各项列表
   * @param {*} shopId 
   * @param {*} categoryId 
   * @param {*} startTime 
   * @param {*} endTime 
   */
  getStandard(shopId, categoryId, startTime, endTime) {
    return this.getSecretData({
      url: "v2/api/cert/approve/standards",
      data: {
        shopId,
        categoryId,
        startTime,
        endTime
      }
    })
  }
  /**
   * 检查 -----获取评分项明细
   * @param {*} shopId 
   * @param {*} standardId 
   * @param {*} startTime 
   * @param {*} endTime 
   */
  getStandardinfo(shopId, standardId, startTime, endTime) {
    return this.getSecretData({
      url: "v2/api/cert/approve/standardinfo",
      data: {
        shopId,
        standardId,
        startTime,
        endTime
      }
    })
  }


  /**
   * 获取验收评分列表
   * @param {*页数} page 
   * @param {*全部1/及格2/不及格3} status 
   */
  getApproveCheckLogList(page, limit = 10, key = '') {
    return this.getSecretData({
      url: "v2/api/cert/approve/approveCheckLog/list",
      data: {
        page,
        limit,
        key
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
   * 获取评分过来的  各星级评分详情
   * @param {*shopId,qualificationId,starLevelId,type} data 
   */
  getStarGrade(data) {
    return this.getSecretData({
      url: "v2/api/cert/approve/approveCheckLog/starGrade",
      data: data
    })
  }
  /**
   * 获取验收 -- 检查详情下拉框的列表
   * @param {*店铺id} shopId 
   * @param {*认证id} qualificationId 
   * @param {*每个模块的id} id 
   * @param {*3区域/4 4s} type 
   */
  getGradeDetailList(shopId, qualificationId, id, type) {
    return this.getSecretData({
      url: "v2/api/cert/approve/approveCheckLog/gradeDetailList",
      data: {
        shopId,
        qualificationId,
        id,
        type
      }
    })
  }
  /**
   * 获取验收评分-- 每一项扣分详情
   * @param {*} id 
   */
  getGradeDetailInfo(id) {
    return this.getSecretData({
      url: "v2/api/cert/approve/approveCheckLog/gradeDetailInfo",
      data: {
        id
      }
    })
  }

}


export { IndexModel }