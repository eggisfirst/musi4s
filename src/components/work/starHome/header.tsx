import React from 'react'
import { Image, StyleSheet, Platform } from 'react-native'
import pxToDp from '../../../utils/fixcss';


export default class Header extends React.Component<any>{
  render() {
    return (
      <Image
        source = {require('../../../images/work/starHome/banner.png')}
        style={style.headTitle}/>
    )
  }
}

const style = StyleSheet.create({
  headTitle: {
    height:pxToDp(353),
    width:pxToDp(750),
    marginLeft:Platform.OS !== "ios" ? -56 : 0,
  }
})