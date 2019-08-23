import React from "react";

import { View, Text, StyleSheet, Image } from "react-native";
import pxToDp from "../../../../utils/fixcss";

interface IProps {
  data: any
}


export const MaxtermCmp: React.FC<IProps> = (props) => {
  return(
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.leftScore}>{props.data.score}<Text style={styles.score}>分</Text></Text>
        <Text style={styles.allScore}>总分{props.data.total}</Text>
      </View>
      <View style={styles.center}>
        <Text style={styles.title}>{props.data.name}</Text>
        <View style={styles.hasCircle}>
          <View style={styles.circle}></View>
          <Text style={styles.text}>检查人: {props.data.inspector}</Text>
        </View>
        <View style={styles.hasCircle}>
          <View style={styles.circle}></View>
          <Text style={styles.text}>检查时间：{props.data.inspectTime}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Image style={styles.righticon} source={require("../../../../images/work/areaReport/checkRecord/more.png")} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: pxToDp(14),
    marginRight: pxToDp(14),
    display: "flex",
    flexDirection:"row",
    alignItems: "center",
    borderBottomColor: "#eee",
    borderBottomWidth: pxToDp(1),
    paddingLeft: pxToDp(44)
  },
  left: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 0.2,
    // borderWidth: 1
  },
  leftScore: {
    color: "#007aff",
    fontSize: pxToDp(64)
  },
  allScore: {
    color: "#007aff",
    fontSize: pxToDp(18),
    borderWidth: pxToDp(1),
    borderRadius: pxToDp(6),
    borderColor:"#007aff",
    paddingLeft: pxToDp(31),
    lineHeight: pxToDp(28),
    paddingRight: pxToDp(22),
    marginTop: pxToDp(10)
  },
  score: {
    color: "#2d2d2d",
    fontSize: pxToDp(18)
  },
  center: {
    flex: 0.6,
    height: pxToDp(200),
    paddingLeft: pxToDp(40)
  },
  text: {
    fontSize: pxToDp(24),
    color: "#666",
    lineHeight:pxToDp(40),
  },
  title: {
    color: "#2d2d2d",
    fontSize: pxToDp(28),
    marginTop: pxToDp(41),
    paddingLeft: pxToDp(24),
    marginBottom: pxToDp(10)

  },
  hasCircle: {
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  circle: {
    width: pxToDp(12),
    height: pxToDp(12),
    backgroundColor: "rgba(153,153,153,0.3)",
    borderRadius: pxToDp(6),
    marginRight: pxToDp(12)
  },

  right: {
    flex: 0.2,
    // borderWidth: 1,
    height: pxToDp(200),
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  righticon: {
    width: pxToDp(16),
    height: pxToDp(9),
    transform: [{rotate:'-90deg'}]
  }
})
