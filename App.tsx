import React, { Component } from 'react';
import configAppNavigator from './src/routes'
import { Provider } from 'react-redux'
import store from './src/store'
import Loader from './src/components/loading';
import { refreshToken, baseUrl} from './src/request/newRequest';
import { _storeData, _removeItem, _retrieveData } from './src/utils/utils';
import { Token,TokenObj } from './src/store/actions/global/loading';
// import ExtraDimensions from 'react-native-extra-dimensions-android';
import { Platform, StatusBar } from 'react-native';

class App extends Component {
  state = {
    isLoggedIn: true,
    checkLogin: true
  }
  //判断token是否过期
  isLogin() {
    _retrieveData('token').then(res => {
      if(res) {
        const tokenObj = JSON.parse(res)
        if (tokenObj.access_token && tokenObj.tokenExpireTime) {
          const now = Date.now();
          this.setStore(tokenObj)
          if (now >= tokenObj.tokenExpireTime) {
            // 刷新token
              refreshToken(baseUrl)
                .then(res => {
                  if (res.data.access_token) {
                    const obj = this.setStore(res.data)
                    _storeData('token', JSON.stringify(obj))
                    this.setState({ isLoggedIn: true, checkLogin: true })
                  }else {
                    _removeItem('token');
                    this.setState({ isLoggedIn: false, checkLogin: true })
                  }
                })
          }
          //设置store里面的值
          else {
            this.setState({ isLoggedIn: true, checkLogin: true })
          }
        }
      }else {
        this.setState({ isLoggedIn: false, checkLogin: true })
      }
    })
    
  }
  //辅助函数
  setStore(data: any) {
    const now = Date.now();
    const { expires_in} = data;
    const tokenExpireTime = now + expires_in * 1000;
    const obj = {
      ...data,
      tokenExpireTime
    };
    store.dispatch(TokenObj(obj))
    return obj
  }

  componentDidMount() {
    this.isLogin()
  }

  render() {
    const { checkLogin, isLoggedIn } = this.state;
    if (!checkLogin) {
      return null;
    }
    const AppContainer = configAppNavigator(isLoggedIn)
    return (
      <Provider store={store}>
        <StatusBar backgroundColor={'transparent'} //状态栏背景颜色
          barStyle={'dark-content'} //状态栏样式（黑字）
          translucent={true}
       />
        <AppContainer />
        <Loader />
      </Provider>
    );
  }
};

export default App;
