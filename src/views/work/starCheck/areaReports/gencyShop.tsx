import React from "react";

import { View, Text, Platform, StyleSheet, ScrollView } from "react-native";
import { BackGroundHeader } from "../../../../components/headerCmp/backgroundHeader";
import pxToDp from "../../../../utils/fixcss";
import { SearchCmp } from "../../../../components/workCmp/starCheck/searchCmp";
import { GencyCard } from '../../../../components/workCmp/areaReportCmp/checkRecord/gencyCard';

export default class CheckRecord extends React.Component<any>{
  

  static navigationOptions = {
    header: null,
  }
  eggHandleSearch = () => {
    this.props.navigation.push('SearchPage')
  }
  render (){
    const {navigation} = this.props
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
        <BackGroundHeader 
            title={'检查记录'} 
            eggHandleBack={() => {navigation.goBack()}}
            bgColor={'#007aff'}
            fontColor={"#fff"}
            setHeight={263}
            imgUrl={require("../../../../images/backicon.png")} />
        <View style={styles.search}>
          <SearchCmp eggHandleSearch={this.eggHandleSearch}/>
        </View>
        <ScrollView>
          <GencyCard list={list} navigation={this.props.navigation}/>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#f8f8f8",
    width: "100%",
    height: "100%"
  },
  search: {
    position: "absolute",
    right: pxToDp(25),
    top: pxToDp(180)
  }
})