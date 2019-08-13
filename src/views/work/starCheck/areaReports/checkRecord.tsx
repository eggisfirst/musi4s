import React from "react";

import { View, Text, ScrollView, StyleSheet } from "react-native";
import { BackGroundHeader } from "../../../../components/headerCmp/backgroundHeader";
import pxToDp from "../../../../utils/fixcss";
import SelectCmp from '../../../../components/filterCmp/selectCmp';
import {StarCheckBox} from '../../../../components/workCmp/areaReportCmp/checkRecord/starCheckBox';

export default class CheckRecord extends React.Component<any>{
  static navigationOptions = {
    header: null,
  }
 
  render (){
    const list = [
      {
        name: "二星检查",
        startDate: "2018.07.01",
        endDate: "2018.07.05",
        score: 90
      },
      {
        name: "二星检查",
        startDate: "2018.07.01",
        endDate: "2018.07.05",
        score: 90
      },
      {
        name: "二星检查",
        startDate: "2018.07.01",
        endDate: "2018.07.05",
        score: 70
      },
      {
        name: "二星检查",
        startDate: "2018.07.01",
        endDate: "2018.07.05",
        score: 90
      },
      {
        name: "二星检查",
        startDate: "2018.07.01",
        endDate: "2018.07.05",
        score: 70
      },
    ]
    return(
      <View style={styles.container}>
        <BackGroundHeader 
                          title={'检查记录'} 
                          eggHandleBack={() => {this.props.navigation.goBack()}}
                          bgColor={'#007aff'}
                          fontColor={"#fff"}
                          setHeight={263}
                          imgUrl={require("../../../../images/backicon.png")} />
        <View style={styles.banner}>
          <SelectCmp />
          <Text style={styles.shop}>明世家博览馆慕思店</Text>
        </View>
        <ScrollView>
          <StarCheckBox list={list} navigation={this.props.navigation}/>
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
  }
})
