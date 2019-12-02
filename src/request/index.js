import { Request } from './newRequest'


class IndexModel extends Request {
  /**获取账号的个人信息 */
  getTheInfo(account,method) {
    return this.getSecretData({
      url: "v1/api/userinfo",
      data: {
        account
      },
      method,
    })
  }

  /**获取职位 */
  getAuth() {
    return this.getSecretData({
      url: "v2/api/cert/approve/getAuth",
    })
  }

  /**获取星级认证信息 */
  getUserInfo(that) {
    return this.getSecretData({
      url: "v2/api/cert/approve/getUserInfo",
      that,
    })
  }

  /**待受理名单 */
  getAcceptList(that,data) {
    return this.getSecretData({
      url: "v2/api/cert/approve/acceptList",
      that,
      data: data
    })
  }

  /**退回 待受理*/
  sendBack(that,id, remark) {
    return this.getSecretData({
      url: "v2/api/cert/approve/reject",
      that,
      data: {
        id,
        remark
      }
    })
  }
  /**受理 待受理 */
  accept(that,id) {
    return this.getSecretData({
      url: "v2/api/cert/approve/accept",
      that,
      data: {
        id
      }
    })
  }

  /**待验收名单 */
  getReceptionList(that,data) {
    return this.getSecretData({
      url: "v2/api/cert/approve/gradeList",
      that,
      data: data
    })
  }

  /**
   * 验收店铺列表
   */
  getReceShopList(that,qualificationId) {
    return this.getSecretData({
      url: 'v2/api/cert/approve/getShopList',
      that,
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
  getShopInfo(that,qualificationId, shopId) {
    return this.getSecretData({
      url: "v2/api/cert/approve/getShopInfo",
      that,
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
  getSponsorList(that,data) {
    return this.getSecretData({
      url: "v2/api/cert/approve/sponsorList",
      that,
      data: data
    })
  }
  /**
   * 获取认证进度名单
   * @param {*} data 
   */
  getLogList(that,data) {
    return this.getSecretData({
      url: "v2/api/cert/approve/logList",
      that,
      data: data
    })
  }
  /**
   * 获取认证进度条数据
   * @param {*} qualificationId 
   */
  getApproveFlowInfo(that,qualificationId) {
    return this.getSecretData({
      url: "v2/api/cert/approve/getApproveFlowInfo",
      that,
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
  getCategories(that,qualificationId, shopId) {
    return this.getSecretData({
      url: "v2/api/cert/approve/getCategories",
      that,
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
  subcategories(that,categoryId, shopId, qualificationId, scoreFlag) {
    return this.getSecretData({
      url: "v2/api/cert/approve/subcategories",
      that,
      data: {
        categoryId,
        shopId,
        qualificationId,
        scoreFlag,
      }
    })
  }
  /**
   * 提交评分
   * @param {*} data 
   */
  submitForm(that,data) {
    return this.getJsonData({
      url: "v2/api/cert/approve/submit",
      that,
      data: data
    })
  }


  /**
   * 发起认证
   * @param {*发起认证id} qualificationId 
   */
  getApproveList(that,qualificationId) {
    return this.getSecretData({
      url: "v2/api/cert/approve/getApproveInfo",
      that,
      data: {
        qualificationId
      }
    })
  }
  /**
   * 提交认证
   */
  sendApprove(that,qualificationId) {
    return this.getSecretData({
      url: "v2/api/cert/approve/saveApprove",
      that,
      data: {
        qualificationId
      }
    })
  }

  /**
   * 获取检查记录
   */
  getCheckList(that,page, limit = 10, key = '') {
    return this.getSecretData({
      url: "v2/api/cert/approve/checkList",
      that,
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
  getCheckLog(that,shopId, pass) {
    return this.getSecretData({
      url: "v2/api/cert/approve/checklogs",
      that,
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
  getCheckcategories(that, shopId, startTime, endTime) {
    return this.getSecretData({
      url: "v2/api/cert/approve/checkcategories",
      that,
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
  getCheckLogInfo(that,shopId, levelId, startTime, endTime) {
    return this.getSecretData({
      url: "v2/api/cert/approve/checkloginfo",
      that,
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
  getStandard(that,shopId, categoryId, startTime, endTime) {
    return this.getSecretData({
      url: "v2/api/cert/approve/standards",
      that,
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
  getStandardinfo(that,shopId, standardId, startTime, endTime) {
    return this.getSecretData({
      url: "v2/api/cert/approve/standardinfo",
      that,
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
  getApproveCheckLogList(that, page, limit = 10, key = '') {
    return this.getSecretData({
      url: "v2/api/cert/approve/approveCheckLog/list",
      that,
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
  getShopHistory(that,shopId) {
    return this.getSecretData({
      url: "v2/api/cert/approve/approveCheckLog/shopHistory",
      that,
      data: {
        shopId
      }
    })
  }
  /**
   * 获取评分过来的  各星级评分详情
   * @param {*shopId,qualificationId,starLevelId,type} data 
   */
  getStarGrade(that, data) {
    return this.getSecretData({
      url: "v2/api/cert/approve/approveCheckLog/starGrade",
      that,
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
  getGradeDetailList(that, shopId, qualificationId, id, type) {
    return this.getSecretData({
      url: "v2/api/cert/approve/approveCheckLog/gradeDetailList",
      that,
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
  getGradeDetailInfo(that, id) {
    return this.getSecretData({
      url: "v2/api/cert/approve/approveCheckLog/gradeDetailInfo",
      that,
      data: {
        id
      }
    })
  }
  /**
   * 上传视频/图片
   * @param {*上传FormData格式文件时传dataFile参数} dataFile
   */
  // uploadFile(formData) {
  //   return this.getFormData({
  //     url: "/upload/file",
  //     data: formData
  //   })
  // }
  uploadFile(that, formData) {
    return this.getFormData({
      url: "v2/api/cert/approve/upload",
      that,
      data: formData
    })
  }
  /**
   * 上传base64图片
   * @param {*上传base64格式的图片时传file参数} file
   */
  uploadBase64(that, file) {
    return this.getSecretData({
      url: "v2/api/cert/approve/upload",
      that,
      data: {
        file
      }
    })
  }

  getPosition(that, data) {
    return this.getSecretData({
      url:"/v1/api/shop/getShopsByLocation",
      that,
      data
    })
  }

  //--------知识库内容接口
  /**
   * 获取常见问题分类
   * @param {*} that 
   * @param {*} id 
   */
  getFAQTab(that, id = null) {
    return this.getSecretData({
      url: "api/question/repository/v1/getCategoryList",
      that,
      data: {
        id,
        platform: '慕思助手',
        modular: '常见问题'
      },
      method: 'get'
    })
  }
  /**
   * 常见问题列表
   */
  getFAQList(that, page, limit, id = '', key = '') {
    return this.getSecretData({
      url: 'api/question/repository/v1/getQuestionList',
      that,
      data: {
        categoryId: id, //  问题分类id
        page,
        limit,
        key,
        platform: '慕思助手',
        modular: '常见问题'
      },
      method: 'get'
    })
  }

  /**
   * 常见问题内容
   * @param {*} that 
   * @param {*} id 文章id
   */
   getFAQContent(that, id, account) {
    return this.getSecretData({
      url: 'api/question/repository/v1/getDrAssistant',
      that,
      data: {
        id,
        account,
        platform: '慕思助手',
        modular: '常见问题'
      },
      method: 'get'
    })
  }

  /**
   * 记录访问次数
   */
  collectFaqNum (that, id) {
    return this.getSecretData({
      url: 'api/question/repository/v1/browse',
      that,
      data: {
        id
      },
      method: 'get'
    })
  }
  /**
   * 收藏统计
   * @param {*} that 
   * @param {*} id  问题id
   */
  collectFaqCount (that, id) {
    return this.getSecretData({
      url: "api/question/repository/v1/collection",
      that,
      data: {
        id
      }
    })
  }
  /**
   * 收藏问题
   * @param {*} that 
   * @param {*} id 
   */
  collectFaq (that, id, account) {
    return this.getSecretData({
      url: "api/user/collect/v2/collect",
      that,
      data: {
        id,
        account,
        type: 2 //收藏类型（1：文章   2：问题）
      },
      method: 'get'
    })
  }

  /**
   * 获取我的收藏的常见问题
   */
  getCollectFaq(that,account,page,limit) {
    return this.getSecretData({
      url: "api/user/collect/v2/getcollect",
      that,
      data: {
        account,
        page,
        limit,
        type: 2 //收藏类型（1：文章   2：问题）
      },
      method: 'get'
    })
  }
  /**
   * 取消文章收藏
   * @param {*} that 
   * @param {*} account 
   * @param {*} id 
   */
  cancleCollectFaq(that,account,id) {
    return this.getSecretData({
      url: "api/user/collect/v2/cancelCollect",
      that,
      data: {
        account,
        id,
        type: 2
      },
      method: 'get'
    })
  }
}


export { IndexModel }