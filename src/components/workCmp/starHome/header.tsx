import React from 'react'
import { Image, StyleSheet, Platform, View, TouchableOpacity } from 'react-native'
import pxToDp from '../../../utils/fixcss';

interface IProps {
  eggHandleBack:() => void
}

export const Header: React.FC<IProps> = (props) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../images/work/starHome/banner.png')}
        style={styles.headTitle} />
      <TouchableOpacity
        style={styles.backBtn}
        onPress={props.eggHandleBack}
        >
        <Image style={styles.arrow}
          source={require("../../../images/work/reception/back.png")} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  headTitle: {
    height: pxToDp(353),
    width: pxToDp(750),
  },
  container: {
    position: "relative"
  },
  backBtn: {
    position: "absolute",
    left: pxToDp(20),
    top: pxToDp(90),
    zIndex: 99,
    width:pxToDp(80),
    height:pxToDp(80),
    paddingLeft: pxToDp(20),
    paddingTop: pxToDp(20)
  },
  arrow: {
    width:pxToDp(20),
    height:pxToDp(36),
  }
})