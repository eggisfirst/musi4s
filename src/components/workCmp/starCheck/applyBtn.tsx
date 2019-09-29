
import React from "react";
import { View,Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { BtnTypes,BtnTitle } from "../../../utils/enum";


interface IProps {
  color: BtnTypes
  title: BtnTitle
  handleClick: (index: number) => void
  index: number
}

export  const ApplyBtn:React.FC<IProps> = (props:IProps) =>{
  const btnStyle = props.color === BtnTypes.Blue? styles.btnBlue : styles.btnRed
  const textStyle = props.color === BtnTypes.Blue? styles.Blue : styles.Red
  const title = props.title
    return(
      <TouchableOpacity style={btnStyle} activeOpacity={0.6} onPress={() => {props.handleClick(props.index)}}>
        <Text style={textStyle}>{title}</Text>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  btnRed: {
    minWidth: pxToDp(140),
    height: pxToDp(60),
    borderRadius: pxToDp(30),
    marginLeft: pxToDp(20),
    backgroundColor: "rgba(255,45,85,0.3)",

    display: 'flex',
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "center"
  },
  btnBlue: {
    minWidth: pxToDp(160),
    height: pxToDp(60),
    borderRadius: pxToDp(30),
    marginLeft: pxToDp(20),
    backgroundColor:"rgba(0,122,255,0.3)",
    display: 'flex',
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "center",
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
  },
  Red: {
    color: '#ff2d55',
    fontSize: pxToDp(30),
    fontWeight: "500",
    // lineHeight: pxToDp(60),
    // textAlign:"center",
    // paddingLeft: pxToDp(20),
    // paddingRight: pxToDp(20)
  },
  Blue: {
    color: '#007AFF',
    fontSize: pxToDp(30),
    fontWeight: "500",
    // lineHeight: pxToDp(60),
    
    // textAlign:"center",
    // paddingLeft: pxToDp(20),
    // paddingRight: pxToDp(20),

  }
})
