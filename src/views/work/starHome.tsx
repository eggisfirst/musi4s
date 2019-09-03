import React from 'react';
import { Text, StatusBar, Platform, View, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import {Header} from '../../components/workCmp/starHome/header';
import {StarCheck}  from '../../components/workCmp/starHome/starCheck';
import { ReportForm } from '../../components/workCmp/starHome/reportForms';


import pxToDp from '../../utils/fixcss';
import { StarCheckTypes } from '../../utils/enum';


import { IndexModel } from '../../request';
const indexModel = new IndexModel()

export default class StarHome extends React.Component<any> {
  static navigationOptions = {
    header: null
    // headerTitle: <Header/>, 
    // headerTintColor:"#fff",
    // headerStyle: {
    //   height:pxToDp(353),
    //   width:pxToDp(750),
    //   marginTop:Platform.OS ==="ios"?  pxToDp(-90):0,
    //   borderBottomWidth: 0,
    //   elevation: 0,
    // }
  }
  componentDidMount() {
    this.getUserInfo()
  }
  /**获取用户信息 获取未完成信息数量*/
  getUserInfo() {
    indexModel.getUserInfo().then(res => {
      if(res.status) {
        const data = res.data
        const list = this.state.list
        for (const key in data) {
          if(key === 'acceptListNumber') {
            list[0].num = data[key]
          }
          else if(key === 'gradeListNumber') {
            list[1].num = data[key]
          }
          else if(key === 'sponsorListNumber') {
            list[2].num = data[key]
          }
        }
        this.setState({
          list
        })
      }
    })
  }
  state = {
     list : [
      {
        imgUrl:require("../../images/work/starHome/wait1.png"),
        num:0,
        type: StarCheckTypes.wait_handle
      },
      {
        imgUrl:require("../../images/work/starHome/wait2.png"),
        num:0,
        type: StarCheckTypes.wait_reception
      },
      {
        imgUrl:require("../../images/work/starHome/wait3.png"),
        num:0,
        type: StarCheckTypes.wait_sponsor
      },
      {
        imgUrl:require("../../images/work/starHome/wait4.png"),
        num:0,
        type: StarCheckTypes.processing_record
      },
    ]
  }
  
  render() {
    const imgArr = [
      {
        imgUrl:require('../../images/work/starHome/record.png'),
        link: "GencyShopPage"
      },
      {
        imgUrl:require('../../images/work/starHome/score.png'),
        link: "AcceptancePage"
      },
    ]
    return(
      <View>
        <Header eggHandleBack={()=> {this.props.navigation.goBack()}}/>
        <StarCheck list={this.state.list} navigation={this.props.navigation}/>
        <ReportForm  list={imgArr} navigation={this.props.navigation}/>
      </View>
    )
  }
}
