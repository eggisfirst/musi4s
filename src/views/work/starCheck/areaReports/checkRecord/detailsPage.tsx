import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { HeaderCmp } from "../../../../../components/headerCmp/headerCmp";
import PullDownCmp from "../../../../../components/filterCmp/pullDownCmp";
import pxToDp from "../../../../../utils/fixcss";
import { BackGroundHeader } from '../../../../../components/headerCmp/backgroundHeader';



export default class DetailsPage extends React.Component<any>{
  static navigationOptions = {
    header: null
  }
  render (){
    const navigation = this.props.navigation
    return(
      <View style={styles.container}>
        <HeaderCmp bgColor={"#fbfbfb"} title={"店面SI标准一阶段"} eggHandleBack={() => {navigation.goBack()}}/>
        <View style={styles.pullDown}>
          <PullDownCmp />
        </View>
        <View style={styles.showPictureBox}>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  pullDown: {
    marginTop: pxToDp(51),
    marginLeft: pxToDp(91),
    position: "relative",
    zIndex: 99
  },
  showPictureBox: {
    width: pxToDp(600),
    height: pxToDp(438),
    borderWidth: 1,
    marginLeft: pxToDp(67),
    marginTop: pxToDp(70),
    position: "relative",
    zIndex: 10
  }
})