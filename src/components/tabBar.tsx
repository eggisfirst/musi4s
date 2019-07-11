import React from 'react'
import { Image } from 'react-native'


export default class TabBar extends React.Component<any>{
  render() {
    return (
      <Image
        source = {require('../images/logo.png')}
        style={{ width: 40, height: 35}}/>
    )
  }
}