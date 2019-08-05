import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Linking } from "react-native";
import pxToDp from "../../../utils/fixcss";

interface IProps {

}
export const ReceItem:React.FC<IProps> = (props:IProps) =>{
  
  return(
    <View style={styles.wrapper}>
      <View><Text style={styles.shopName}>广州马会家居凯奇门店</Text></View>
      <View style={styles.centerMsg}>
        <View style={styles.score}>
          <Text style={styles.textStyle}>门店评分：</Text>
          <Text style={styles.redStyle}>82</Text>
          <Text style={styles.textStyle}>区域评分：</Text>
          <Text style={styles.redStyle}>83</Text>
        </View>
        <View style={styles.status}>
          <Text style={styles.greenStyle}>已评分</Text>
        </View>
      </View>
    </View>
   )
}

const styles = StyleSheet.create({
  wrapper: {
    width: pxToDp(686),
    height: pxToDp(240),
    backgroundColor: "#fff",
    borderRadius: pxToDp(20),
    marginBottom: pxToDp(11),
    padding: pxToDp(29),
  },
  shopName: {
    color: "#363636",
    fontSize: pxToDp(38),
    fontWeight: "bold"
  },
  centerMsg: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: pxToDp(40),
  },
  score: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    color: "#666",
    fontSize: pxToDp(28)
  },
  redStyle: {
    color: "#FF2D55",
    fontSize: pxToDp(28),
    marginRight: pxToDp(20)
  },
  status: {

  },
  greenStyle: {
    color: "#4CD964",
    fontSize: pxToDp(30)
  }

})
