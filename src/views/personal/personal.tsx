import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native"
import { TabBarItem } from "../../components/tabBarItem"
import pxToDp from "../../utils/fixcss";
import { HeaderCmp } from '../../components/personalCmp/headerCmp';
import { ListItem } from '../../components/personalCmp/listCmp';
import { BtnCmp } from "../../components/personalCmp/btnCmp";
import { _removeItem, _retrieveData } from "../../utils/utils";

interface IState {
  userInfo: Object
}

export default class PersonalScreen extends React.Component<any> {
  static navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon: ({ focused }: any) => (
      <TabBarItem
        focused={focused}
        normalImage={require('../../images/tabBar/personal.png')}
        selectedImage={require('../../images/tabBar/personal_select.png')} />
    ),
  }

  state:IState = {
    userInfo: {}
  }
  /**获取个人信息 */
  getUserInfo() {
    _retrieveData('userInfo').then(res => {
      if (res) {
        const data = JSON.parse(res)
        this.setState({
          userInfo: data
        })
      }
    })
  }

  componentDidMount() {
    this.getUserInfo()
  }
  /**退出登录 清除refresh_token*/
  handleLogout = () => {
    this.props.navigation.replace('Login')
    _removeItem('token')
    _removeItem('type')
  }

 
  render() {
    const list = [
      {
        title: '我的收藏',
        link: 'CollectPage'
      },
      {
        title: '意见反馈'
      },
      {
        title: '账号安全'
      },
      {
        title: '关于我们',
        version: "版本 1.0.1"
      },
    ]
    return (
      <View>
        <HeaderCmp userInfo={this.state.userInfo && this.state.userInfo}/>
        {
          list && list.map(item =>
            <TouchableOpacity onPress={() => {this.props.navigation.push(`${item.link}`)}} key={item.title}>
              <ListItem title={item.title} version={item.version} />
            </TouchableOpacity>
          )
        }
        <BtnCmp handleLogout={this.handleLogout} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btnCmpStyle: {

  }
})
