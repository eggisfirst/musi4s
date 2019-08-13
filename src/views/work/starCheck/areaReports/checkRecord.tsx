import React from "react";

import { View, Text, ScrollView, StyleSheet } from "react-native";
import { BackGroundHeader } from "../../../../components/headerCmp/backgroundHeader";
import { SearchCmp } from "../../../../components/workCmp/starCheck/searchCmp";
import { GencyCard } from "../../../../components/workCmp/areaReportCmp/checkRecord/gencyCard";
import pxToDp from "../../../../utils/fixcss";

export default class CheckRecord extends React.Component<any>{
  static navigationOptions = {
    header: null,
  }
 
  render (){
    console.log(this.props.navigation.state.params.index)
    return(
      <View style={styles.container}>
        <BackGroundHeader 
            title={'检查记录'} 
            eggHandleBack={() => {this.props.navigation.goBack()}}
            bgColor={'#007aff'}
            fontColor={"#fff"}
            setHeight={263}
            imgUrl={require("../../../../images/backicon.png")} />
        <View style={styles.sort}>
          
        </View>
        <ScrollView>
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
  sort: {
    position: "absolute",
    right: pxToDp(25),
    top: pxToDp(180)
  }
})
