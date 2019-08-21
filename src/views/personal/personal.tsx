import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import {TabBarItem} from "../../components/tabBarItem"
import pxToDp from "../../utils/fixcss";
import { HeaderCmp } from '../../components/personalCmp/headerCmp';
import { ListItem } from '../../components/personalCmp/listCmp';
import { BtnCmp } from "../../components/personalCmp/btnCmp";
import { _removeItem } from "../../utils/utils";

export default class PersonalScreen extends React.Component<any> { 
  static navigationOptions = {
    tabBarLabel: '我的',  
    tabBarIcon: ({focused}:any) => (
      <TabBarItem
        focused={focused}  
        normalImage={require('../../images/tabBar/personal.png')}  
        selectedImage={require('../../images/tabBar/personal_select.png')} />
    ),
   
  }
  /**退出登录 清除refresh_token*/
  handleLogout = () => {
    this.props.navigation.replace('Login')
    _removeItem('refresh_token')
    _removeItem('type')
  }
  render() {
    const list = [
      {
        title: '我的收藏'
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
        <HeaderCmp />
        {
          list && list.map(item =>
            <TouchableOpacity onPress={() => {console.log(123)}}  key={item.title}>
              <ListItem title={item.title} version={item.version}/>
            </TouchableOpacity>
          )
        }
        <BtnCmp handleLogout={() => {this.handleLogout()}}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btnCmpStyle: {
   
  }
})
