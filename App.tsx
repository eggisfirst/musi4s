import React, { Component } from 'react';
import configAppNavigator from './src/routes'
import { Provider } from 'react-redux'
import store from './src/store'
import Loader from './src/components/loading';
import {refreshToken} from './src/request/request';
import { _storeData } from './src/utils/utils';
import { Token } from './src/store/actions/global/loading';

class App extends Component {
  state = {
    isLoggedIn: true,
    checkLogin: false
  }
  componentDidMount() {
    /**刷新token判断有没有登录 */
    refreshToken().then(res => {
      if(res.access_token) {
        store.dispatch(Token(res.access_token))
        this.setState({isLoggedIn: true,checkLogin:true})
      }else {
        this.setState({isLoggedIn: false,checkLogin:true})
      }
    }).catch(err => {
      this.setState({isLoggedIn: false,checkLogin:true})
    })
  }

  render() {
    const { checkLogin, isLoggedIn } = this.state;
    if (!checkLogin) {
      return null;
    }
    const AppContainer = configAppNavigator(isLoggedIn)
    return (
      <Provider store={store}>
        <AppContainer />
        <Loader />
      </Provider>
    );
  }
};

export default App;
