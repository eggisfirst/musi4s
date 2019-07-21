import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import pxToDp from "../../../utils/fixcss";

interface IProps {
  imgUrl:any
  title:string
  num:number
}

export const StarItem:React.FC<IProps> = (IProps) =>{
   const {imgUrl, title, num} = IProps
  return(
    <View style={styles.listItem}>
      <Image
        style={styles.imageStyle}
        source={imgUrl}>
      </Image>
      <Text style={styles.textStyle}>{title}</Text>
      <View style={styles.tips}>
        <Text style={styles.tipsText}>{num}</Text>
      </View>
    </View>
   )
}

const styles = StyleSheet.create({
  listItem: {
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    position:"relative",
    width:pxToDp(150),
    marginTop:pxToDp(71)
  },
  imageStyle: {
    width:pxToDp(50),
    height: pxToDp(50)
  },
  textStyle: {
    color:"#363636",
    fontSize:pxToDp(28),
    textAlign:"center",
    marginTop:pxToDp(35)
  },
  tips: {
    width:pxToDp(30),
    height:pxToDp(30),
    backgroundColor:"#ff3b30",
    position:"absolute",
    top:-pxToDp(14),
    right:pxToDp(36),
    borderRadius:50,
    opacity:0.8
  },
  tipsText: {
    color:"#fff",
    fontSize:pxToDp(18),
    textAlign:"center",
    lineHeight:pxToDp(30)
  }
})
