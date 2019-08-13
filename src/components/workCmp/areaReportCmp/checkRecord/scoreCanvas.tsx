import React from "react";

import { View, Text, StyleSheet } from "react-native";
import pxToDp from "../../../../utils/fixcss";

export default class ScoreCanvas extends React.Component{
  render (){
    return(
      <View style={styles.container}>
        <View style={styles.circle}></View>
        <Text style={styles.shopname}>慕思家居专卖店</Text>
        <Text style={styles.week}>第一周</Text>
        <View style={styles.footer}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: pxToDp(440),
    borderTopWidth: pxToDp(1),
    borderTopColor: "#e5e5e5",
    marginTop: pxToDp(33),
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  circle: {
    marginTop: pxToDp(55),
    width: pxToDp(228),
    height: pxToDp(208),
    borderWidth: 1,
    marginBottom: pxToDp(30),
    borderRadius: pxToDp(114)

  },
  shopname: {
    color: "rgba(45, 45, 45, 1)",
    fontSize: pxToDp(28),
    fontWeight: "500",
  },
  week: {
    color: "rgba(102,102,102,0.8)",
    fontSize: pxToDp(24),
    lineHeight: pxToDp(48)
  },

  footer: {
    width: pxToDp(720),
    height: pxToDp(20),
    backgroundColor: "#f5f5f5",
    marginLeft: pxToDp(15),
    marginTop: pxToDp(20)
  }
})