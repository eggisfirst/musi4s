import React from "react";
import { View, Text, StyleSheet } from "react-native";
import pxToDp from "../../../utils/fixcss";

interface node {
  num: number

}


export const TimerShaft:React.FC = () => {
  


  return(
    <View style={styles.container}>
      <View style={styles.blue}>
        <View style={styles.blueIn}></View>
      </View>
      <View style={styles.blueLine}></View>

      <View style={styles.blue}>
        <View style={styles.blueIn}></View>
      </View>
      <View style={styles.blueLine}></View>

      <View style={styles.grey}>
         <View style={styles.greyIn}></View>
       </View>
       <View style={styles.greyLine}></View>
    </View>
   )
}

const styles = StyleSheet.create({
  container:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  blue: {
    width: pxToDp(20),
    height: pxToDp(20),
    borderRadius: pxToDp(10),
    backgroundColor: "rgba(90,200,250,0.3)",
    position: "relative",
  },
  blueIn: {
    width: pxToDp(12),
    height: pxToDp(12),
    borderRadius: pxToDp(6),
    backgroundColor: "#5AC8FA",
    position: "absolute",
    top: pxToDp(4),
    left: pxToDp(4),
    zIndex: 99
  },
  blueLine: {
    width: pxToDp(4),
    height: pxToDp(200),
    backgroundColor: "#5AC8FA",
    borderRadius: pxToDp(2)
  },

  grey: {
    width: pxToDp(20),
    height: pxToDp(20),
    borderRadius: pxToDp(10),
    backgroundColor: "rgba(144,144,144,0.3)",
    position: "relative",
  },
  greyIn:{ 
    width: pxToDp(12),
    height: pxToDp(12),
    borderRadius: pxToDp(6),
    backgroundColor: "#909090",
    position: "absolute",
    top: pxToDp(4),
    left: pxToDp(4),
    zIndex: 99
  },
  greyLine: {
    width: pxToDp(4),
    height: pxToDp(200),
    backgroundColor: "#F8F8F8",
    borderRadius: pxToDp(2)
  }
})
