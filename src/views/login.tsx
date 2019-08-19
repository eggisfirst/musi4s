
import React, {Component} from 'react';
import { 
  View,
  Text,
  Image, 
  TouchableOpacity, 
  StyleSheet,
} from "react-native"; 
import pxToDp from '../utils/fixcss';
import InputCmp from '../components/loginCmp/inputCmp';
import { RemPwd } from '../utils/enum';


interface IProps {
  inputVal:string
  btnStatue: RemPwd
}

export default class LoginScreen extends Component<any,IProps> {
  state:IProps = {
    inputVal: '',
    btnStatue: RemPwd.unremember
  }

  static navigationOptions = {
    header: null,
    headerBackTitle: 'back',
  }

  //输入框的值
  setVal = (val:object) => {
    console.log('111',val)
  }
  //记住密码状态
  handleRememberPwd = () => {
    const btnStatue = this.state.btnStatue === RemPwd.unremember? RemPwd.remembered : RemPwd.unremember
    this.setState({
      btnStatue
    })
    console.log(btnStatue)
  }
  render() {
    const  inputAcData =  {
      title: '账号',
      maxLength: 20,
      type: 'account'
    }
    const  inputPdData =  {
      title: '密码',
      maxLength:20,
      type: 'password'
    }
    const circltStyle = {
      display: this.state.btnStatue === RemPwd.remembered? "flex" : "none"
    }
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
          <InputCmp inputData={inputAcData} setVal={this.setVal}/>
          <InputCmp inputData={inputPdData} setVal={this.setVal}/>
          
          <View style={styleSheet.remPwd} >
            <TouchableOpacity
                style={styleSheet.left} 
                onPress={this.handleRememberPwd}>
                <View style={styleSheet.leftRadio}>
                  <View style={[styleSheet.circle,circltStyle]} ></View>
                </View>
                <Text style={styleSheet.leftText} >记住密码</Text>
            </TouchableOpacity>
            <View>
              <Text style={styleSheet.rightText}>忘记密码？</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styleSheet.button}
            onPress={() => {this.props.navigation.replace('Work')}}
          >
            <Text style={styleSheet.btnText}>登录</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styleSheet.copyright}>Copyright © 2019 de RUCCI All rights reserved</Text>
      </View>
    )
  }
}


const styleSheet:any = StyleSheet.create({
  container: {
    paddingLeft: pxToDp(73),
    paddingRight: pxToDp(73),
    backgroundColor: '#fff',
    height:  '100%',
  },
  top: {
    width: '100%',
    height: pxToDp(136),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:pxToDp(210),
  },
  icon: {
    width: pxToDp(136),
    height: pxToDp(136),
    marginRight:pxToDp(17)
    // flex: 1,
  },
  h1: {
    fontSize: pxToDp(72),
    lineHeight:pxToDp(92),
    color:"#001b38"
  },
  h2: {
    fontSize: pxToDp(48),
    lineHeight: pxToDp(72),
    color:"#001b38"
  },
  formTit: {
    fontSize: pxToDp(36),
    marginTop: pxToDp(149),
    marginBottom: pxToDp(41),
    fontWeight:'bold',
    color:"#001b38"
  },
  inputWrap: {
    flex:1
  },
  inputBox: {
    paddingTop:pxToDp(64),
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
    fontWeight:'bold'
  },
  button: {
    height: pxToDp(98),
    borderRadius: pxToDp(49),
    backgroundColor:  '#007AFF',
    marginTop: pxToDp(96),
  },
  btnText: {
    color: '#fff',
    fontSize: pxToDp(34),
    textAlign: 'center',
    lineHeight: pxToDp(98),
    fontWeight:"bold"
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
    width:'100%',
    marginTop: pxToDp(47),
    display:"flex",
    flexDirection: 'row',
    justifyContent:"space-between"
  },
  left: {
    display:"flex",
    flexDirection: 'row',
    alignItems:"center"
  },
  leftRadio: {
    width:pxToDp(38),
    height:pxToDp(38),
    borderRadius:50,
    borderColor:"#d2d2d2",
    borderWidth:pxToDp(1),
    marginRight:pxToDp(17),
    backgroundColor:"#eee",
    display:'flex',
    alignItems:'center',
    justifyContent:"center"
  },
  circle: {
    backgroundColor:'linear-gradient(0deg,rgba(0,122,255,1),rgba(67,173,254,1))',
    width:pxToDp(18),
    height:pxToDp(18),
    borderRadius:50,
  },
  leftText: {
    color:'#909090',
    fontSize:pxToDp(28),
    fontWeight:"500"
  },
  rightText: {
    color:"#007aff",
    fontSize:pxToDp(28),
    fontWeight:"500"
  }
})

