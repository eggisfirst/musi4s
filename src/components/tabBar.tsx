import React from 'react'
import { Image, StyleSheet } from 'react-native'


export default class TabBar extends React.Component<any>{
  render() {
    return (
      <Image
        source = {require('../images/logo.png')}
        style={style.headTitle}/>
    )
  }
}

const style = StyleSheet.create({
  headTitle: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    marginRight:'auto',
    marginLeft:"auto",
    height:40,
    width:58,
  }
})