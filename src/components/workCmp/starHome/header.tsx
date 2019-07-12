import React from 'react'
import { Image, StyleSheet, Platform } from 'react-native'
import pxToDp from '../../../utils/fixcss';


export const Header: React.FC = () =>{
  return (
    <Image
      source = {require('../../../images/work/starHome/banner.png')}
      style={style.headTitle}/>
  )
}

const style = StyleSheet.create({
  headTitle: {
    height:pxToDp(353),
    width:pxToDp(750),
  }
})