import React from 'react'
import { Image } from 'react-native'

interface IProps {
  focused:boolean
  selectedImage:any
  normalImage:any
}

export const TabBarItem: React.FC<IProps> = (IProps) =>{
  const {focused, selectedImage, normalImage} = IProps
  return (
    <Image
      source = {focused ? selectedImage : normalImage}
      style={{ width: 25, height: 25 }}/>
  )
}
