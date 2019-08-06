import React from 'react';
import { Text, StatusBar, Platform, View, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import {Header} from '../../components/workCmp/starHome/header';
import Counter from '../../components/counter';
import {StarCheck}  from '../../components/workCmp/starHome/starCheck';
import { ReportForm } from '../../components/workCmp/starHome/reportForms';


import pxToDp from '../../utils/fixcss';
import { StarCheckTypes } from '../../utils/enum';


export default class StarHome extends React.Component<any> {
  static navigationOptions = {
    headerTitle: <Header/>, 
    headerTintColor:"#fff",
    headerStyle: {
      height:pxToDp(353),
      width:pxToDp(750),
      marginTop:Platform.OS ==="ios"?  pxToDp(-90):0,
      borderBottomWidth: 0,
      elevation: 0,
    }
  }

  render() {
    const list = [
      {
        imgUrl:require("../../images/work/starHome/wait1.png"),
        num:0,
        type: StarCheckTypes.wait_handle
      },
      {
        imgUrl:require("../../images/work/starHome/wait2.png"),
        num:12,
        type: StarCheckTypes.wait_reception
      },
      {
        imgUrl:require("../../images/work/starHome/wait3.png"),
        num:5,
        type: StarCheckTypes.wait_sponsor
      },
      {
        imgUrl:require("../../images/work/starHome/wait4.png"),
        num:6,
        type: StarCheckTypes.processing_record
      },
    ]
    const imgArr = [
      {
        imgUrl:require('../../images/work/starHome/record.png')
      },
      {
        imgUrl:require('../../images/work/starHome/score.png')
      },
    ]
    return(
      <View>
        <StarCheck list={list} navigation={this.props.navigation}/>
        <ReportForm  list={imgArr} navigation={this.props.navigation}/>
        <Counter />
      </View>
    )
  }
}
