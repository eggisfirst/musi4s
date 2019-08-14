import React from "react";

import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import pxToDp from "../../utils/fixcss";

export default class PullDownCmp extends React.Component{
  render (){
    return(
      <View>
        <View style={styles.container}> 
          <Text style={styles.text} numberOfLines={1}>店面面积</Text>
          <Image style={styles.downIcon} source={require("../../images/work/areaReport/checkRecord/more.png")}/>
        </View>
        <ScrollView style={styles.downSelect}>
          <View style={styles.textBox}>
            <Text style={styles.selectText}>店面面积</Text>
            <Text style={styles.selectText}>-8分</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: pxToDp(538),
    height: pxToDp(100),
    borderRadius: pxToDp(50),
    borderWidth: pxToDp(1),
    borderColor: "#e5e5e5",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  text: {
    color: "#090909",
    fontSize: pxToDp(30),
    flex: 0.8,
    textAlign:"center",
    paddingLeft: pxToDp(20),
    lineHeight: pxToDp(80)
  },
  downIcon: {
    width: pxToDp(20),
    height: pxToDp(11)
  },
  downSelect: {
    width: pxToDp(554),
    height: pxToDp(795),
    backgroundColor: "rgba(237,237,237,0.7)",
    borderRadius: pxToDp(10),
    borderWidth: pxToDp(1),
    borderColor: "#eee",
    position: "absolute",
    left: 0,
    top: pxToDp(111),
    zIndex: 99
  },
  textBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems:"center",
    flexDirection:"row",
    paddingLeft: pxToDp(57),
    paddingRight: pxToDp(57)
  },
  selectText: {
    color: "#090909",
    fontSize: pxToDp(30),
    lineHeight: pxToDp(80)
  },
})
