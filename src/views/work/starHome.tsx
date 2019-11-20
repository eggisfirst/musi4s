import React from 'react';
import { Text, StatusBar, Platform, View, StyleSheet, Image, TouchableOpacity, Button, Alert } from 'react-native';
import { Header } from '../../components/workCmp/starHome/header';
import { StarCheck } from '../../components/workCmp/starHome/starCheck';
import { ReportForm } from '../../components/workCmp/starHome/reportForms';

import {setPage} from '../../utils/token'

import pxToDp from '../../utils/fixcss';
import { StarCheckTypes } from '../../utils/enum';


import { IndexModel } from '../../request';
import { _removeItem } from '../../utils/utils';
const indexModel = new IndexModel()

export default class StarHome extends React.Component<any> {
  static navigationOptions = {
    header: null,
  }
  state = {
    list: [
      {
        imgUrl: require("../../images/work/starHome/wait1.png"),
        num: 0,
        type: StarCheckTypes.wait_handle
      },
      {
        imgUrl: require("../../images/work/starHome/wait2.png"),
        num: 0,
        type: StarCheckTypes.wait_reception
      },
      {
        imgUrl: require("../../images/work/starHome/wait3.png"),
        num: 0,
        type: StarCheckTypes.wait_sponsor
      },
      {
        imgUrl: require("../../images/work/starHome/wait4.png"),
        num: 0,
        type: StarCheckTypes.processing_record
      },
    ]
  }
  /**
   * 后退的时候刷新数据
   */
  // refreshMsg = () => {
  //   this.getUserInfo()
  // }



  /**获取用户信息 获取未完成信息数量*/
  getUserInfo = () => {
    indexModel.getUserInfo(this).then(res => {
      if (res.status) {
        const data = res.data
        let list = this.state.list
        for (const key in data) {
          if (key === 'acceptListNumber') {
            list[0].num = data[key]
          }
          else if (key === 'gradeListNumber') {
            list[1].num = data[key]
          }
          else if (key === 'sponsorListNumber') {
            list[2].num = data[key]
          }
        }
        this.setState({
          list
        })
      }
    })
  }

  componentDidMount() {
    this.getUserInfo()
  }

  render() {
    const imgArr = [
      {
        imgUrl: require('../../images/work/starHome/record.png'),
        link: "GencyShopPage"
      },
      {
        imgUrl: require('../../images/work/starHome/score.png'),
        link: "AcceptancePage"
      },
    ]
    return (
      <View>
        <Header eggHandleBack={() => { this.props.navigation.goBack() }} />
        <StarCheck refreshMsg={this.getUserInfo} list={this.state.list} navigation={this.props.navigation} />
        <ReportForm list={imgArr} navigation={this.props.navigation} />
      </View>
    )
  }
}
