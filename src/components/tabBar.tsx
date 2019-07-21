import React from 'react'
import { Image, StyleSheet, View, Platform } from 'react-native'
import pxToDp from '../utils/fixcss';


export const TabBar: React.FC = () => {
  return (
    <View style={style.ViewStyle}>
      <Image
        source = {require('../images/logo.png')}
        style={style.headTitle}/>
      </View> 
  )
}

const style = StyleSheet.create({
  ViewStyle: {
    backgroundColor:"#fff",
    width:"100%",
    height:Platform.OS === 'android'? pxToDp(180) : pxToDp(170),
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    paddingTop:Platform.OS === 'android'? pxToDp(80) : pxToDp(56)
  },
  headTitle: {
    height:40,
    width:58,
  }
})