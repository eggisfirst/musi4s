import React from "react";
import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import pxToDp from "../../../utils/fixcss";

interface Iprops {
  //标题加id
  obj: {
    title: string
  }
  handleClick: (data: Object) => void
}
export const ListContent: React.FC<Iprops> = (props) => {
  return (
    <TouchableOpacity style={styles.li} activeOpacity={0.6} onPress={() => {props.handleClick(props.obj)}}>
      <Text style={styles.text}>{props.obj.title}</Text>
      <Image style={styles.img} source={require("../../../images/arrow.png")} />
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  li: {
    marginLeft: pxToDp(33),
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: pxToDp(32),
    borderBottomWidth: 1,
    borderColor: "#e1e1e1"
  },
  text: {
    lineHeight: pxToDp(40),
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(20),
    fontSize: pxToDp(28),
    color: "#363636",
    marginRight: pxToDp(30)
  },
  img: {
    width: pxToDp(12),
    height: pxToDp(20),
  }
})
