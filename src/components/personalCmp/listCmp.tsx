import { View, Text, StyleSheet, Image } from "react-native";
import React from 'react';
import pxToDp from '../../utils/fixcss';

interface IProps {
  title: string
  version?:string
}

export const ListItem:React.FC<IProps> = ({title,version}) => {
  return(
    <View style={styles.container}>
      <Text style={styles.textStyle}>{title}</Text>
      <View style={styles.rightContainer}>
        <Text style={styles.version}>{version}</Text>
        <Image  style={styles.imageStyle}
              source={require("../../images/personal/arrow.png")}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: pxToDp(32),
    borderBottomWidth:pxToDp(1),
    // width:"100%",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    paddingRight: pxToDp(34),
    height: pxToDp(90),
    flexDirection:"row",
    borderColor:"#e1e1e1"
  },
  textStyle: {
    color: "#363636",
    fontSize: pxToDp(30)
  },
  imageStyle: {
    width: pxToDp(24),
    height: pxToDp(24)
  },
  rightContainer: {
    display:"flex",
    flexDirection:"row",
    alignItems:"center"
  },
  version: {
    color:"#666",
    fontSize:pxToDp(30),
    marginRight:pxToDp(19)
  }
})