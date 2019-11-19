import React, { Component } from 'react';
import configAppNavigator from './src/routes'
import { Provider } from 'react-redux'
import store from './src/store'
import Loader from './src/components/loading';
import { refreshToken, getToken} from './src/request/request';
import { _storeData, _removeItem } from './src/utils/utils';
import { Token } from './src/store/actions/global/loading';
// import ExtraDimensions from 'react-native-extra-dimensions-android';
import { Platform, StatusBar } from 'react-native';

class App extends Component {
  state = {
    isLoggedIn: true,
    // checkLogin: false
    checkLogin: true

  }

  isLogin() {
    const tokenObj = getToken();
    console.log(1111,tokenObj)
    if (tokenObj.access_token && tokenObj.tokenExpireTime) {
      const now = Date.now();
      if (now >= tokenObj.tokenExpireTime) {
        // 刷新token
          refreshToken()
            .then(res => {
              if (res.data) {
                const { expires_in, access_token } = res.data;
                const tokenExpireTime = now + expires_in * 1000;
                const obj = {
                  ...res.data,
                  tokenExpireTime
                };
                _storeData('token', JSON.stringify(obj))
                this.setState({ isLoggedIn: true, checkLogin: true })
              }
            }).catch(err => {
              _removeItem('token');
              this.setState({ isLoggedIn: false, checkLogin: true })
            });
      }
      else {
        this.setState({ isLoggedIn: false, checkLogin: true })
      }
    }
  }


  /**刷新token判断有没有登录 */
  // refreshToken() {
  //   refreshToken().then(res => {
  //     if (res.access_token) {
  //       store.dispatch(Token(res.access_token))
  //       this.setState({ isLoggedIn: true, checkLogin: true })
  //     } else {
  //       this.setState({ isLoggedIn: false, checkLogin: true })
  //     }
  //   }).catch(err => {
  //     this.setState({ isLoggedIn: false, checkLogin: true })
  //   })
  // }




  componentDidMount() {
    // this.refreshToken()
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
