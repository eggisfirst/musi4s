
import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Text } from 'react-native';
import pxToDp from '../../utils/fixcss';

interface IProps {
  imgUrl: any
  title: string
}

export const IndexIcon:React.FC<IProps> = (IProps) => {
    const {imgUrl,title} = IProps
    return(
      <View style={styles.viewStyle}>
        <Image
          style={styles.imageStyle}
          source={imgUrl}
        ></Image>
        <Text style={styles.textStyle}>{title}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  viewStyle: {
    marginRight:pxToDp(55),
    marginBottom:pxToDp(58),
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  imageStyle: {
    height:pxToDp(130),
    width:pxToDp(130),
    marginBottom: pxToDp(10)
  },
  textStyle: {
    color:"#363636",
    fontSize:pxToDp(28),
    textAlign:"center"
  }
})