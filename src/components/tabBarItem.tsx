import React from 'react'
import { Image } from 'react-native'


export default class TabBarItem extends React.Component<any>{
  render() {
    const {focused, selectedImage, normalImage} = this.props
    return (
      <Image
        source = {focused ? selectedImage : normalImage}
        style={{ width: 25, height: 25 }}/>
    )
  }
}
