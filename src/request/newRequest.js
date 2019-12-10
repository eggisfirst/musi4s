import axios from 'axios'
import { sha1 } from '../utils/sha'
import { _storeData, _retrieveData, _removeItem } from '../utils/utils'
import { Alert } from 'react-native';
import { setLoading, Token, TokenObj } from '../store/actions/global/loading';
import store from '../store';
import MD5 from "react-native-md5";

const baseUrl = 'https://mobiletest.derucci.net/consumer-admin/'
// const baseUrl = 'http://localhost:8088/'
// const baseUrl = 'https://op.derucci.com/'
// const baseUrl = 'http://10.11.8.247:8088/'
timer = null
/**
 * 获取本地存储的token
 */
function getToken() {
  return store.getState().Loading.tokenObj || {}
}
/**
 * 刷新token
 * @param {*} baseUrl 
 */
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
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}

// 加密参数
function _getSign(obj, token) {
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
  // console.log(str+token);
  return sha1(str + token)
}

/**要等刷新token后才设置/sign里面是最新的token
 * 设置sign
 * @param {*} config 
 */
function setSign(config) {
  if(config.headers.sign) {
    const myData = config.headers.sign
    const sign = _getSign(myData, getToken().access_token)
    return sign
  }
  return false
}

axios.setToken = (obj) => {
  axios.defaults.headers['Authorization'] = `Bearer ${obj.access_token}`
  //同时存store和localStrage
  store.dispatch(TokenObj(obj))
  _storeData('token', JSON.stringify(obj))
}

let isRefreshing = false
let requests = []
//axios请求拦截
axios.interceptors.request.use(config => {
  store.dispatch(setLoading(true));
  console.log('congig',config);
  const tokenObj = getToken()
  config.headers['Authorization'] = `Bearer ${tokenObj.access_token}`
  if (config.url.indexOf('oauth/token') >= 0) {
    return config
  }
  if(tokenObj.access_token && tokenObj.tokenExpireTime) {
    const now = Date.now()
    if (now >= tokenObj.tokenExpireTime) {
      console.log('token过期，刷新token');
      store.dispatch(setLoading(false));
      // 刷新token
      if (!isRefreshing) {
        isRefreshing = true
        refreshToken(baseUrl).then(res => {
          store.dispatch(setLoading(false));
          console.log('刷新token的返回结果',res);
          if (res.data.access_token) {
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
          const sign = setSign(config)
          if(sign) {
            config.headers['sign'] = sign
          }
          requests.forEach(cb => cb(token))
          requests = []
        })
      }
      const retryOriginalRequest = new Promise((resolve, reject) => {
        requests.push(token => {
          config.headers['Authorization'] = `Bearer ${token}`
          resolve(config)
        })
      })
      return retryOriginalRequest
    }else {
      const sign = setSign(config)
      if(sign) {
        config.headers['sign'] = sign
      }
    }
  }
  return config
}, err => {
  return Promise.reject(err)
})
//axios响应拦截
axios.interceptors.response.use(response => {
  console.log(333,response);
  const reg = /Invalid refresh token/g
  if(response.data.code == 500 && !response.data.msg.match(reg)) {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      Alert.alert(
        '提示',
        response.data.msg,
        [
          { text: '好的', onPress: () => { } },
        ]
      )
      store.dispatch(setLoading(false))
    }, 100);
    return response
  }else {
    store.dispatch(setLoading(false));
    return response
  }
}, error => {
  console.log(222,error);
  //不是网络错误则弹出错误提示
  if(error.message !== 'Request failed with status code 510' && error.message !== 'Network Error') {
    alert(error)
  }
  store.dispatch(setLoading(false));
  return Promise.reject(error)
})
class Request {
  getSecretData({ url, that = null, data = {}, method = 'post'}) {
    return new Promise((resolve, reject) => {
      axios({
        url: baseUrl + url,
        method: method,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'sign': data
        },
        params: data
      }).then(res => {
        resolve(res.data)
      }, err => {
        if (err.message === 'Request failed with status code 510' || err.message === 'Network Error') {
          Alert.alert('提示', '登录已失效，请重新登录',
            [{
              text: '确定',
              onPress: () => {
                _removeItem('token')
                that.props.navigation.replace('Login')
              }
            }])
          }else {
            reject(err)
          }
      })
    })
  }
  //上传文件
  getFormData({ url, that = null, data = {} }) {
    return new Promise((resolve, reject) => {
      // const sign = this._getSign(data, getToken().access_token)
      axios({
        url: baseUrl + url,
        method: 'POST',
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data',
          'sign': data,
        },
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        if (err.message === 'Request failed with status code 510'  || err.message === 'Network Error') {
          Alert.alert('提示', '登录已失效，请重新登录',
            [{
              text: '确定',
              onPress: () => {
                _removeItem('token')
                that.props.navigation.replace('Login')
              }
            }])
          }else {
            reject(err)
          }
      })
    })
  }
  //使用json数据
  getJsonData({ url, that = null, data = {} }) {
    return new Promise((resolve, reject) => {
      axios({
        url: baseUrl + url,
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'sign': data,
        },
        data: data,
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        if (err.message === 'Request failed with status code 510' || err.message === 'Network Error') {
          Alert.alert('提示', '登录已失效，请重新登录',
            [{
              text: '确定',
              onPress: () => {
                _removeItem('token')
                that.props.navigation.replace('Login')
              }
            }])
          }else {
            reject(err)
          }
      })
    })
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
