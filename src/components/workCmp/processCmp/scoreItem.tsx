import React from "react";

import { View, Text, StyleSheet } from "react-native";
import pxToDp from "../../../utils/fixcss";

interface IProps {
  scoreType?: {
    shop: boolean,
    area: boolean,
    four: boolean
  },
  reason?: string
}


export const ScoreItem:React.FC<IProps> = ({scoreType,reason}) => {
  return(
    <View style={styles.wrapper}>
      {
        scoreType && scoreType.shop && 
        <Text style={styles.text}>门店评分：<Text style={styles.red}>82</Text></Text>
      }
      {
        scoreType && scoreType.area && 
       <Text style={styles.text}>区域评分：<Text style={styles.red}>82</Text></Text>
      }
      {
        scoreType && scoreType.four && 
       <Text style={styles.text}>4s评分：<Text style={styles.red}>82</Text></Text>
      }
      {
        reason && 
        <Text style={styles.text}>退回原因：{reason}</Text>
      }
    </View>
   )
}

const styles = StyleSheet.create({
  wrapper: {
    width: pxToDp(710),
    borderRadius: pxToDp(10),
    backgroundColor: "#f0f0f0",
    display: "flex",
    flexDirection: "row",
    alignItems:"center",
    marginTop: pxToDp(8)
  },
  text: {
    color: "#666",
    fontSize: pxToDp(28),
    lineHeight: pxToDp(48),
    marginRight: pxToDp(20)
  },
  red: {
    color: "#FF2D55",
  }
})