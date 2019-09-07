import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from 'react'
import pxToDp from "../../utils/fixcss";

interface IProps {
  handleLogout:() => void
}
export const BtnCmp:React.FC<IProps> = ({handleLogout}) => {
  return (
    <TouchableOpacity onPress={() => {handleLogout()}} style={styles.btn}>
      <Text style={styles.btnStyle} >
        退出账号
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btnStyle: {
    color:"#fff",
    // lineHeight:pxToDp(98),
    fontSize:pxToDp(36),
    textAlign:"center"
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: pxToDp(600),
    height: pxToDp(98),
    borderColor:"#005dc2",
    borderWidth:pxToDp(1),
    borderRadius:pxToDp(4),
    marginTop:pxToDp(101),
    marginLeft:pxToDp(75),
    backgroundColor:"#007aff",
  }
})