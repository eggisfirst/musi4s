import {_storeData, _retrieveData} from '../utils/utils'
import MD5 from "react-native-md5";
import axios from 'axios'

import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';


class Request {
  baseUrl = 'http://10.11.8.247:8088/'
  // baseUrl = 'https://mobiletest.derucci.net/consumer-admin/'
  // baseUrl = 'https://op.derucci.com/'
  // baseUrl = 'https://qiang.derucci.com/'
  // tokenUrl = "https://op.derucci.com/"

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
          console.log(res.access_token)
          axios({
            url: this.baseUrl + url,
            method: 'POST',
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              "Authorization": `Bearer ${res.access_token}`,
              'sign': sign
            },
            params: data,
          })
          .then(res => {
            console.log(222,res)
            resolve(res.data)
          })
          .catch(err => {
            console.log(333,err)
            reject(err)
          })

        }else {
          /**返回错误信息 */
          Alert.alert(res.msg)
          // this._refreshToken().then(res => {
          //   if (res.access_token) {
          //     this.getSecretData()
          //   }
          // })
        }
      })
    })
  }

/**
 * 登录/获取token
 */
_getToken() {
  return new Promise((resolve, reject) => {
    // const account = _retrieveData('account').then(res => res)
    // const password = _retrieveData('password').then(res => res)
    // Promise.all([account, password]).then(data=>{
      
      axios({
        url: this.baseUrl + "oauth/token",
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        params: {
          grant_type: 'password',
          username: '11300445',
          password: MD5.hex_md5(123456)
        },
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  // })
   
  
}
  _refreshToken() {
    return new Promise((resolve, reject) => {
      _retrieveData('refresh_token').then(res => {
        axios({
          url: this.baseUrl + "oauth/token",
          method: 'post',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          params: {
            grant_type: 'refresh_token',
            refresh_token: res,
          },
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
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
  return MD5.hex_md5(str + token)
}


}

export { Request }




