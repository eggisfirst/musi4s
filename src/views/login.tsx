import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import pxToDp from '../utils/fixcss';
import InputCmp from '../components/loginCmp/inputCmp';
import { RemPwd } from '../utils/enum';

import { IndexModel } from '../request';
const indexModel = new IndexModel()
import { _storeData, _retrieveData, _removeItem, } from '../utils/utils';
import Loader from '../components/loading'
import { getToken } from '../request/request';
import store from '../store';
import { setLoading, Token } from '../store/actions/global/loading';
import { deepClone } from '../utils';

interface IState {
  inputVal: string
  btnStatue: RemPwd
  account: string
  password: string
}

export default class LoginScreen extends Component<any> {
  static navigationOptions = {
    header: null,
    headerBackTitle: 'back',
    gesturesEnabled: false,
  }

  state: IState = {
    inputVal: '',
    btnStatue: RemPwd.unremember,
    account: '',
    password: ""
  }
  componentDidMount() {
    let temp = [{
      name: 'guang',
      list: [
        { name: 'wei' }
      ]
    }]
    // console.log('深度克隆：', deepClone(temp,{}))
    this.initLoginData()
  }
  /**
   * 判断如果有缓存，使用缓存
   */
  initLoginData() {
    /**密码状态框 */
    _retrieveData('pwdStatus').then(res => {
      this.setState({
        btnStatue: res
      })
      if (res === RemPwd.unremember) {
        _removeItem('account')
        _removeItem('password')
      }
    })
  }

  /**
   * 登录
   */
  handleLoginIn = () => {
    this.state.account && _storeData('account', this.state.account)
    this.state.password && _storeData('password', this.state.password)
    /**请求token */
    getToken().then(res => {
      if (res.access_token) {
        _storeData("refresh_token", res.refresh_token)
        store.dispatch(Token(res.access_token))
        indexModel.getAuth().then(res => {
          if (res.status) {
            //用户级别
            if (res.type) {
              _storeData('type', JSON.stringify(res.type))
            }
            /**获取用户信息 */
            _retrieveData('account').then(res => {
              indexModel.getTheInfo(res, 'get').then(res => {
                if (res.status) {
                  _storeData('userInfo', JSON.stringify(res.userInfo))
                  this.props.navigation.navigate('Work')
                }
              })
            })
          }
        })
      }
    })


  }

  //输入框的值
  setVal = (value: any) => {
    value.type === 'account' && this.setState({ account: value.val })
    value.type === 'password' && this.setState({ password: value.val })
  }
  //记住密码状态
  handleRememberPwd = () => {
    const btnStatue = this.state.btnStatue === RemPwd.remembered ? RemPwd.unremember : RemPwd.remembered
    this.setState({
      btnStatue
    })
    _storeData('pwdStatus', btnStatue)
  }

  render() {
    const inputAcData = {
      title: '账号',
      maxLength: 20,
      type: 'account'
    }
    const inputPdData = {
      title: '密码',
      maxLength: 20,
      type: 'password'
    }
    // const circltStyle = {
    //   display: this.state.btnStatue === RemPwd.remembered? "flex" : "none"
    // }
    return (
      <View style={styleSheet.container}>
        <View style={styleSheet.top}>
          <Image
            style={styleSheet.icon}
            source={require('../images/icon.png')}
          />
          <View>
            <Text style={styleSheet.h1}>Hello,</Text>
            <Text style={styleSheet.h2}>欢迎使用慕思助手</Text>
          </View>
        </View>
        <View style={styleSheet.inputWrap}>
          <Text style={styleSheet.formTit}>密码登录</Text>
          <InputCmp isPassWord={false} inputData={inputAcData} setVal={this.setVal} />
          <InputCmp isPassWord={true} inputData={inputPdData} setVal={this.setVal} />

          <View style={styleSheet.remPwd} >
            <TouchableOpacity
              style={styleSheet.left}
              onPress={() => { this.handleRememberPwd() }}>
              <View style={styleSheet.leftRadio}>
                <View style={[styleSheet.circle,
                { display: this.state.btnStatue === RemPwd.remembered ? "flex" : "none" }]} ></View>
              </View>
              <Text style={styleSheet.leftText} >记住密码</Text>
            </TouchableOpacity>
            {/* <View>
              <Text style={styleSheet.rightText}>忘记密码？</Text>
            </View> */}
          </View>

          <TouchableOpacity
            style={styleSheet.button}
            onPress={() => { this.handleLoginIn() }}
          >
            <Text style={styleSheet.btnText}>登录</Text>
          </TouchableOpacity>
        </View>

        <Text style={styleSheet.copyright}>Copyright © 2019 de RUCCI All rights reserved</Text>
      </View>
    )
  }
}


const styleSheet: any = StyleSheet.create({
  container: {
    paddingLeft: pxToDp(73),
    paddingRight: pxToDp(73),
    backgroundColor: '#fff',
    height: '100%',
  },
  top: {
    width: '100%',
    height: pxToDp(136),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: pxToDp(210),
  },
  icon: {
    width: pxToDp(136),
    height: pxToDp(136),
    marginRight: pxToDp(17)
    // flex: 1,
  },
  h1: {
    fontSize: pxToDp(72),
    lineHeight: pxToDp(92),
    color: "#001b38"
  },
  h2: {
    fontSize: pxToDp(48),
    lineHeight: pxToDp(72),
    color: "#001b38"
  },
  formTit: {
    fontSize: pxToDp(36),
    marginTop: pxToDp(149),
    marginBottom: pxToDp(41),
    fontWeight: 'bold',
    color: "#001b38"
  },
  inputWrap: {
    flex: 1
  },
  inputBox: {
    paddingTop: pxToDp(64),
  },
  input: {
    height: pxToDp(80),
    borderColor: '#eee',
    borderBottomWidth: pxToDp(1),
    fontSize: pxToDp(30),
    // lineHeight:pxToDp(50)
  },
  label: {
    fontSize: pxToDp(24),
    color: '#BEBEBE',
    fontWeight: 'bold'
  },
  button: {
    height: pxToDp(98),
    borderRadius: pxToDp(49),
    backgroundColor: '#007AFF',
    marginTop: pxToDp(96),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  btnText: {
    color: '#fff',
    fontSize: pxToDp(34),
    textAlign: 'center',
    lineHeight: pxToDp(98),
    fontWeight: "bold"
  },
  copyright: {
    fontSize: pxToDp(24),
    color: '#909090',
    textAlign: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: pxToDp(67),
    width: '100%',
  },
  remPwd: {
    width: '100%',
    marginTop: pxToDp(47),
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  left: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "center"
  },
  leftRadio: {
    width: pxToDp(38),
    height: pxToDp(38),
    borderRadius: 50,
    borderColor: "#d2d2d2",
    borderWidth: pxToDp(1),
    marginRight: pxToDp(17),
    backgroundColor: "#eee",
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center"
  },
  circle: {
    backgroundColor: 'linear-gradient(0deg,rgba(0,122,255,1),rgba(67,173,254,1))',
    width: pxToDp(18),
    height: pxToDp(18),
    borderRadius: 50,
  },
  leftText: {
    color: '#909090',
    fontSize: pxToDp(28),
    fontWeight: "500"
  },
  rightText: {
    color: "#007aff",
    fontSize: pxToDp(28),
    fontWeight: "500"
  }
})

