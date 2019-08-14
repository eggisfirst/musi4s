import React from "react";

import { View, Text, ScrollView, StyleSheet } from "react-native";
import pxToDp from "../../../../utils/fixcss";
import {StarCheckBox} from '../../../../components/workCmp/areaReportCmp/checkRecord/starCheckCard';

import { HeaderCmp } from '../../../../components/headerCmp/headerCmp';
import { SearchCmp } from "../../../../components/workCmp/starCheck/searchCmp";
import { GencyCard } from "../../../../components/workCmp/areaReportCmp/checkRecord/gencyCard";
import { ReportType } from "../../../../utils/enum";

export default class Acceptance extends React.Component<any>{
  static navigationOptions = {
    header: null,
  }
  /**请求筛选：合格/不合格/全部的数据 */
  handleSelect = (index:number) => {
    console.log(1111,index)
  }
  eggHandleSearch = () => {

  }


  render (){
    const list: any[]= [
      {
        name: "通化市东昌区凯利家具中东店"
      },
      {
        name: "通化市东昌区凯利家具中东店"
      },
      {
        name: "通化市东昌区凯利家具中东店"
      },
      {
        name: "通化市东昌区凯利家具中东店"
      },
      {
        name: "通化市东昌区凯利家具中东店"
      },
      {
        name: "通化市东昌区凯利家具中东店"
      },
      {
        name: "通化市东昌区凯利家具中东店"
      },
      {
        name: "通化市东昌区凯利家具中东店"
      },
      {
        name: "通化市东昌区凯利家具中东店"
      },
      {
        name: "通化市东昌区凯利家具中东店"
      },
      {
        name: "通化市东昌区凯利家具中东店"
      },
      {
        name: "通化市东昌区凯利家具中东店"
      },
      {
        name: "通化市东昌区凯利家具中东店"
      },
      {
        name: "通化市东昌区凯利家具中东店"
      },
      {
        name: "通化市东昌区凯利家具中东店"
      },
      {
        name: "通化市东昌区凯利家具中东店"
      },
      {
        name: "通化市东昌区凯利家具中东店"
      },
      {
        name: "通化市东昌区凯利家具中东店"
      },
      {
        name: "通化市东昌区凯利家具中东店"
      },
      {
        name: "通化市东昌区凯利家具中东店"
      },
     
    ]
    return(
      <View style={styles.container}>
        <HeaderCmp  title={'验收评分'} 
                    eggHandleBack={() => {this.props.navigation.goBack()}}
                    Children={<SearchCmp eggHandleSearch={() => {this.props.navigation.push('SearchPage')}}/>}/>
        
        <ScrollView style={styles.scorllList}>
          <GencyCard type={ReportType.acceptance} list={list} navigation={this.props.navigation}/>
          <GencyCard type={ReportType.acceptance} list={list} navigation={this.props.navigation}/>
        </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%"
  },
  banner: {
    position: "absolute",
    left: pxToDp(57),
    top: pxToDp(200),
    width: pxToDp(650),
    lineHeight: pxToDp(60),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  shop: {
    color: "rgba(255,255,255,0.5)",
    lineHeight: pxToDp(42),
    fontWeight: "500",
    fontSize: pxToDp(26)
  },
  scorllList: {
    backgroundColor: "#f8f8f8"
  }
})
