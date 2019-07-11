import React from 'react'
import { Image, StyleSheet, View, Platform } from 'react-native'
import pxToDp from '../utils/fixcss';


export default class TabBar extends React.Component<any>{
  render() {
    return (
      <View style={style.ViewStyle}>
        <Image
          source = {require('../images/logo.png')}
          style={style.headTitle}/>
       </View> 
    )
  }
}

const style = StyleSheet.create({
  ViewStyle: {
    backgroundColor:"#fff",
    width:"100%",
    height:Platform.OS === 'android'? pxToDp(106) : pxToDp(170),
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    paddingTop:Platform.OS === 'android'? 0 : pxToDp(56)
  },
  headTitle: {
    height:40,
    width:58,
  }
})