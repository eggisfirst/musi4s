import { _storeData, _retrieveData } from '../utils/utils'
import MD5 from "react-native-md5";
import axios from 'axios'
import { Alert } from 'react-native';

import { setLoading, Token } from '../store/actions/global/loading';
import store from '../store';

timer = null
timer1 = null
// baseUrl = 'http://10.11.8.247:8088/'
// baseUrl = 'http://172.16.4.201:8088/'
// baseUrl = 'http://10.11.8.8:8088/'
baseUrl = 'https://mobiletest.derucci.net/consumer-admin/'
// baseUrl = 'https://op.derucci.com/'
// baseUrl = 'https://qiang.derucci.com/'
// tokenUrl = "https://op.derucci.com/"
axios.interceptors.request.use(config => {
  store.dispatch(setLoading(true));
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    store.dispatch(setLoading(false));
  }, 60000);
  if (config.url.indexOf('oauth/token') === -1) {
    config.headers['Authorization'] = `Bearer ${store.getState().Loading.token}`
  }
  return config
}, error => {  //请求错误处理
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    store.dispatch(setLoading(false));
  }, 60000);
  return Promise.reject(error)
});

//返回拦截器
axios.interceptors.response.use(
  response => {
    console.log(111, response)
    if (response.data.code == 500) {
      if (response.data.msg == 'refresh_token不能为空') {
        store.dispatch(setLoading(false));
        return response
      } else {
        if(timer1) {
          clearTimeout(timer1)
        }
        timer1 = setTimeout(() => {
          Alert.alert(
            '提示',
            response.data.msg,
            [
              { text: '好的', onPress: () => { store.dispatch(setLoading(false)) } },
            ]
          )
        }, 100);
        return response
      }
    } else {
      store.dispatch(setLoading(false));
      return response
    }
  },
  function (error) {
    // console.log(222, error)
    if(timer1) {
      clearTimeout(timer1)
    }
    timer1 = setTimeout(() => {
      Alert.alert(
        '提示',
        '登录已失效，请重新操作',
        [
          { text: '好的', onPress: () => { store.dispatch(setLoading(false)) } },
        ]
      )
    }, 100);
    return Promise.reject(error)
  }
)


class Request {
  getSecretData({ url, data = {}, method = 'post' }) {
    return new Promise((resolve, reject) => {
      const sign = this._getSign(data)
      axios({
        url: baseUrl + url,
        method: method,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'sign': sign,
        },
        params: data,
      }).then(res => {
        store.dispatch(setLoading(false));
        resolve(res.data)
      }).catch(err => {
        store.dispatch(setLoading(false));
        /**返回错误信息 */
        refreshToken().then(res => {
          if (res.access_token) {
            store.dispatch(Token(res.access_token))
            // this.getSecretData()
          } else {
            getToken().then(res => {
              if (res.access_token) {
                _storeData("refresh_token", res.refresh_token)
                store.dispatch(Token(res.access_token))
              }
            })
          }
        })
      })
    })

  }


  getFormData({ url, data = {} }) {
    return new Promise((resolve, reject) => {
      const sign = this._getSign(data)
      axios({
        url: baseUrl + url,
        method: 'POST',
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data',
          'sign': sign,
        },
      }).then(res => {
        store.dispatch(setLoading(false));
        resolve(res.data)
      }).catch(err => {
        store.dispatch(setLoading(false));
        /**返回错误信息 */
        refreshToken().then(res => {
          if (res.access_token) {
            store.dispatch(Token(res.access_token))
            // this.getSecretData()
          } else {
            getToken().then(res => {
              if (res.access_token) {
                _storeData("refresh_token", res.refresh_token)
                store.dispatch(Token(res.access_token))
                // this.getSecretData()
              }
            })
          }
        })
      })
    })

  }

  getJsonData({ url, data = {} }) {
    // console.log('again')
    return new Promise((resolve, reject) => {
      const sign = this._getSign(data)
      axios({
        url: baseUrl + url,
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'sign': sign,
        },
        data: data,
      }).then(res => {
        store.dispatch(setLoading(false));
        resolve(res.data)
      }).catch(err => {
        store.dispatch(setLoading(false));
        /**返回错误信息 */
        refreshToken().then(res => {
          if (res.access_token) {
            store.dispatch(Token(res.access_token))
            // this.getSecretData()
          } else {
            getToken().then(res => {
              if (res.access_token) {
                _storeData("refresh_token", res.refresh_token)
                store.dispatch(Token(res.access_token))
                // this.getSecretData()
              }
            })
          }
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

  getFormData({ url, data = {} }) {
    return new Promise((resolve, reject) => {
      const sign = this._getSign(data)
      axios({
        url: baseUrl + url,
        method: 'POST',
        headers: {
          'Content-type': 'multipart/form-data',
          'sign': sign,
        },
        data: data,
      }).then(res => {
        store.dispatch(setLoading(false));
        resolve(res.data)
      }).catch(err => {
        store.dispatch(setLoading(false));
        /**返回错误信息 */
        refreshToken().then(res => {
          if (res.access_token) {
            store.dispatch(Token(res.access_token))
            this.getSecretData()
          } else {
            getToken().then(res => {
              if (res.access_token) {
                _storeData("refresh_token", res.refresh_token)
                store.dispatch(Token(res.access_token))
                this.getSecretData()
              }
            })
          }
        })
      })
    })
  }
}
/**
 * 登录/获取token
 */
export function getToken() {
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

/**刷新token */
export function refreshToken() {
  return new Promise((resolve, reject) => {
    _retrieveData('refresh_token').then(res => {
      axios({
        url: baseUrl + "oauth/token",
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        params: {
          grant_type: 'refresh_token',
          refresh_token: res,
        },
      }).then(res => {
        store.dispatch(setLoading(false));
        resolve(res.data)
      }).catch(err => {
        store.dispatch(setLoading(false));
        reject(err)
      })
    })
  })
}

export { Request }




