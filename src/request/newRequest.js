import axios from 'axios'
import { sha1 } from '../utils/sha'
import { _storeData, _retrieveData, _removeItem } from '../utils/utils'
import { Alert } from 'react-native';
import { setLoading, Token, TokenObj } from '../store/actions/global/loading';
import store from '../store';
import MD5 from "react-native-md5";
import {
  Navigator
} from 'react-native';

// const baseUrl = 'https://mobiletest.derucci.net/consumer-admin/'
const baseUrl = 'http://172.16.8.42:8081'

/**
 * 获取本地存储的token
 */
function getToken() {
  return store.getState().Loading.tokenObj || {}
}

function refreshToken(baseUrl) {
  return new Promise((resolve, reject) => {
    const refresh_token = getToken().refresh_token
    axios({
      url: baseUrl + '/oauth/token',
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      params: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }
    }).then(res => {
      store.dispatch(setLoading(false));
      resolve(res)
    }, err => {
      store.dispatch(setLoading(false));
      reject(err)
    })
  })
}

axios.setToken = (obj) => {
  axios.defaults.headers['Authorization'] = `Bearer ${obj.access_token}`
  //同时存store和localStrage
  store.dispatch(TokenObj(obj))
  _storeData('token', JSON.stringify(obj))
}

let isRefreshing = false
let requests = []

axios.interceptors.request.use(config => {
  const tokenObj = getToken()
  console.log('tokenObj', tokenObj);
  config.headers['Authorization'] = `Bearer ${tokenObj.access_token}`
  // console.log(config)
  let params = config.params.grant_type ? config.params.grant_type : null
  if (config.url.indexOf('/login') >= 0 || params === 'refresh_token') {
    return config
  }
  if (tokenObj.access_token && tokenObj.tokenExpireTime) {
    const now = Date.now()
    if (now >= tokenObj.tokenExpireTime) {
      // 刷新token
      if (!isRefreshing) {
        isRefreshing = true
        refreshToken(baseUrl).then(res => {
          if (res.data) {
            const { expires_in, access_token } = res.data
            const tokenExpireTime = now + expires_in * 1000
            const obj = {
              ...res.data,
              tokenExpireTime
            }
            axios.setToken(obj)
            isRefreshing = false
            return access_token
          }
        }).then(token => {
          requests.forEach(cb => cb(token))
          requests = []
        }).catch(err => {
          console.log(err)
          _removeItem('token')
          // Navigator.push('Login')
          window.location.herf = '/Login'
        })
      }
      const retryOriginalRequest = new Promise(resolve => {
        requests.push(token => {
          config.headers['Authorization'] = `Bearer ${token}`
          resolve(config)
        })
      })
      return retryOriginalRequest
    }
  }
  return config

}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(
  response => {
    console.log(111, response)
    return response
  }, error => {
    return Promise.reject(error)
  }
)
class Request {
  // baseUrl = 'http://172.16.8.42:8088/'
  getSecretData({ url, data = {}, method = 'post' }) {
    return new Promise((resolve, reject) => {
      const sign = this._getSign(data, getToken().access_token)
      axios({
        url: baseUrl + url,
        method: method,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'sign': sign
        },
        params: data
      }).then(res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
    })
  }
  //上传文件
  getFormData({ url, data = {} }) {
    return new Promise((resolve, reject) => {
      const sign = this._getSign(data, getToken().access_token)
      axios({
        url: baseUrl + url,
        method: 'POST',
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data',
          'sign': sign,
        },
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
  //使用json数据
  getJsonData({ url, data = {} }) {
    // console.log('again')
    return new Promise((resolve, reject) => {
      const sign = this._getSign(data, getToken().access_token)
      axios({
        url: baseUrl + url,
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'sign': sign,
        },
        data: data,
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }


  // 加密参数
  _getSign(obj, token) {
    let str = ''
    let keyArr = []
    for (let key in obj) {
      keyArr.push(key)
    }
    keyArr = keyArr.sort()
    keyArr.map((item, index) => {
      if (obj[item] !== '') {
        if (!str) {
          str = `${item}=${obj[item]}`
        } else {
          str += `&${item}=${obj[item]}`
        }
      }
    })
    return sha1(str + token)
  }
}

export function Login() {
  return new Promise((resolve, reject) => {
    const account = _retrieveData('account').then(res => res)
    const password = _retrieveData('password').then(res => res)
    Promise.all([account, password]).then(data => {
      if (!data[0]) {
        Alert.alert('请输入账号')
        return
      }
      if (!data[1]) {
        Alert.alert('请输入密码')
        return
      }
      axios({
        url: baseUrl + "oauth/token",
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

export { axios, Request, getToken, refreshToken, baseUrl }
