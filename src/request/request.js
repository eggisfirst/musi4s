const util = require("./sha1.js")
import {_storeData, _retrieveData} from '../utils/utils'

class Request {
  baseUrl = 'http://10.11.8.247:8080/'
  // baseUrl = 'https://mobiletest.derucci.net/consumer-admin/'
  // baseUrl = 'https://op.derucci.com/'
  // baseUrl = 'https://qiang.derucci.com/'
  // tokenUrl = "https://op.derucci.com/"

  refreshToken = ''
 
  //有token
  getSecretData({ url, data = {}}) {
    return new Promise((resolve, reject) => {
      // wx.showLoading({
      //   title: '加载中',
      //   mask: true
      // })
      this._getToken().then(res => {
        if (res.access_token) {
          _storeData("refresh_token",res.refresh_token)
          const sign = this._getSign(data)
          axios({
            url: baseUrl + url,
            method: 'post',
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              "Authorization": `Bearer ${res.access_token}`,
              'sign': sign
            },
            data: data,
          }).then(res => {
            resolve(res.data)
          }).catch(err => {
            reject(err)
          })

        }else {
          this._refreshToken().then(res => {
            if (res.access_token) {
              this.getSecretData()
            }
          })
        }
      })
    })
  }

_getToken() {
  return new Promise((resolve, reject) => {
    axios({
      url: baseUrl + "oauth/token",
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        grant_type: 'password',
        username: '11300445',
        password: '123456'
      },
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
  
}

  _refreshToken() {
    return new Promise((resolve, reject) => {
      axios({
        url: baseUrl + "oauth/token",
        method: 'post',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          grant_type: 'refresh_token',
          refresh_token: _retrieveData('refresh_token'),
        },
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
}

//加密参数
_getSign(obj,token) {
  // console.log(obj)
  let str = ""
  let keyArr = []
  for(let key in obj) {
    keyArr.push(key)
  }
  keyArr.sort((a,b) => {
    return a.length - b.length
  })
  keyArr.map((item, index) => {
    if(obj[item]) {
      if(!str) {
        str = `${item}=${obj[item]}`
      }else {
        str += `&${item}=${obj[item]}`
      }
    }
  })
  return util.sha1(str + token)
}


}

export { Request }




