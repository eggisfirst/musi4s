import React, { Component } from 'react';
import configAppNavigator from './src/routes'
import { Provider } from 'react-redux'
import store from './src/store'
import Loader from './src/components/loading';
import { refreshToken } from './src/request/request';
import { _storeData } from './src/utils/utils';
import { Token } from './src/store/actions/global/loading';
// import ExtraDimensions from 'react-native-extra-dimensions-android';
import { Platform, StatusBar } from 'react-native';

class App extends Component {
  state = {
    isLoggedIn: true,
    checkLogin: false
  }

  /**刷新token判断有没有登录 */
  refreshToken() {
    refreshToken().then(res => {
      if (res.access_token) {
        store.dispatch(Token(res.access_token))
        this.setState({ isLoggedIn: true, checkLogin: true })
      } else {
        this.setState({ isLoggedIn: false, checkLogin: true })
      }
    }).catch(err => {
      this.setState({ isLoggedIn: false, checkLogin: true })
    })
  }




  componentDidMount() {
    this.refreshToken()
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
