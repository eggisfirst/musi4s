
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Text } from 'react-native';
import pxToDp from '../../utils/fixcss';

export default class IconItem extends React.Component<any> {
  render() {
    const {imgUrl,title} = this.props
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
  },
  textStyle: {
    color:"#363636",
    fontSize:pxToDp(28),
    textAlign:"center"
  }
})