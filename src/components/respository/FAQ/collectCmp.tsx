import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from 'react'
import pxToDp from '../../../utils/fixcss';

interface Iprops {
  clickCollect: () => void
  isCollect: boolean
}


export const CollectCmp: React.FC<Iprops> = (props: Iprops) => {
  /**
   * 收藏
   */
  const collectClick = () => {
    props.clickCollect()
  }

  return (
    <>
      {
        !props.isCollect?
        <TouchableOpacity style={styles.box} activeOpacity={0.6} onPress={collectClick}>
          <Image style={styles.img} source={require('../../../images/respository/collect.png')} />
          <Text style={styles.text}>加入收藏</Text>
        </TouchableOpacity> :
        <View style={styles.boxed} >
          <Image style={styles.img} source={require('../../../images/respository/collected.png')} />
          <Text style={styles.texted}>已收藏</Text>
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  box: {
    width: pxToDp(130),
    height: pxToDp(60),
    borderWidth: pxToDp(2),
    borderColor: '#ffba00',
    borderRadius: pxToDp(8),
    marginLeft: pxToDp(50),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  img: {
    width: pxToDp(32),
    height: pxToDp(32)
  },
  text: {
    fontSize: pxToDp(18),
    color: "#ffba00",
  },
  boxed: {
    width: pxToDp(130),
    height: pxToDp(60),
    borderWidth: pxToDp(1),
    borderColor: '#BC8A04',
    backgroundColor: "#FFBA00",
    borderRadius: pxToDp(8),
    marginLeft: pxToDp(50),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  texted: {
    fontSize: pxToDp(24),
    color: "#fff",
    fontWeight: "500"
  }
})