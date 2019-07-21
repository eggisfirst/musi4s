import React from "react";
import { View,Text, StyleSheet, Image } from "react-native";
import pxToDp from "../../../utils/fixcss";

interface IProps {
  score: number
  week: number
  date: string
}

export const ApplyFooter:React.FC<IProps> = (props) =>{
    return(
      <View style={styles.container}>
        <View style={styles.footerLeft}>
          <Text style={styles.textStyle}>区域评分:</Text>
          <Text style={styles.score}>{props.score}</Text>
          <Text style={styles.textStyle}>累计周期:</Text>
          <Text style={styles.textStyle}>{props.week}</Text>
        </View>
        <View>
          <Text style={styles.textStyle}>{props.date}</Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: pxToDp(20)
  },
  footerLeft: {
    display: "flex",
    flexDirection: "row",
  },
  textStyle: {
    color:"#666",
    fontSize: pxToDp(28),
    marginRight: pxToDp(10)
  },
  score: {
    color:"#ff2d55",
    fontSize: pxToDp(28),
    marginRight: pxToDp(15)
  }
})
