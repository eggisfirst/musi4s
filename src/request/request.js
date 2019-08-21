import { _storeData, _retrieveData } from '../utils/utils'
import MD5 from "react-native-md5";
import axios from 'axios'
import { Alert } from 'react-native';

import { setLoading } from '../store/actions/global/loading';
import store from '../store';

baseUrl = 'http://10.11.8.247:8088/'
  
axios.interceptors.request.use(config => {
  if(config.url.indexOf('oauth/token')!== -1) {
    console.log('no')
  }else {
    console.log('yes')
  }
  return config
}, error => {  //请求错误处理
 
  Promise.reject(error)
});
class Request {
  baseUrl = 'http://10.11.8.247:8088/'
  // baseUrl = 'https://mobiletest.derucci.net/consumer-admin/'
  // baseUrl = 'https://op.derucci.com/'
  // baseUrl = 'https://qiang.derucci.com/'
  // tokenUrl = "https://op.derucci.com/"



  getSecretData({ url, data = {} }) {
    store.dispatch(setLoading(true)); 
    return new Promise((resolve, reject) => {
      this._getToken().then(res => {
        if(res.access_token) {
          _storeData("refresh_token",res.refresh_token)
          const sign = this._getSign(data)
          axios({
            url: this.baseUrl + url,
            method: 'POST',
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'sign': sign,
              'Authorization': `Bearer ${res.access_token}`
            },
            params: data,
          }).then(res => {
            store.dispatch(setLoading(false)); 
            resolve(res.data)
          }) .catch(err => {
            reject(err)
          })
        }else {
          if(res.code === 500) {
            store.dispatch(setLoading(false)); 
            Alert.alert(res.msg)
            return
          }
          /**返回错误信息 */
          _refreshToken().then(res => {
            if (res.access_token) {
              token = res.access_token
              this.getSecretData()
            }
          })
        }
      })
    })
  }

  /**
   * 登录/获取token
   */
  _getToken = () => {
    return new Promise ((resolve,reject) => {
      const account = _retrieveData('account').then(res => res)
      const password = _retrieveData('password').then(res => res)
      Promise.all([account, password]).then(data => {
        if(!data[0]) {
          Alert.alert('请输入账号')
          return
        }
        if(!data[1]) {
          Alert.alert('请输入密码')
          return
        }
        axios({
          url: this.baseUrl + "oauth/token",
          method: 'post',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          params: {
            grant_type: 'password',
            username: data[0],
            password: MD5.hex_md5(data[1])
          }
        })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
      })
  })
  }

  //加密参数
  _getSign(obj, token) {
    // console.log(obj)
    let str = ""
    let keyArr = []
    for (let key in obj) {
      keyArr.push(key)
    }
    keyArr.sort((a, b) => {
      return a.length - b.length
    })
    keyArr.map((item, index) => {
      if (obj[item]) {
        if (!str) {
          str = `${item}=${obj[item]}`
        } else {
          str += `&${item}=${obj[item]}`
        }
      }
    })
    return MD5.hex_md5(str + token)
  }


}

/**刷新token */
export default function refreshToken() {
  return  new Promise((resolve,reject) => {
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
export { Request }




