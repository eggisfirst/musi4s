import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import pxToDp from "../../utils/fixcss";
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IProps {
  title: string
  leftText: string
  rightText: string
  handleLeft: () => void
  handleRight: () => void
}


export default class CommonBtn extends React.Component<IProps>{
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.head}>
            <Image style={styles.img} source={require('../../images/respository/warn.png')} />
            <Text style={styles.text}>{this.props.title}</Text>
          </View>
          <View style={styles.btn}>
            <TouchableOpacity style={styles.btn1} activeOpacity={0.6} onPress={this.props.handleLeft}>
              <Text style={styles.left}>{this.props.leftText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn2} activeOpacity={0.6} onPress={this.props.handleRight}>
              <Text style={styles.right}>{this.props.rightText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    width: '100%',
    height: Dimensions.get('screen').height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: "flex",
    flexDirection: 'row',
    paddingTop: "60%",
    // alignItems:"center",
    justifyContent: "center",
  },
  box: {
    width: pxToDp(560),
    height: pxToDp(280),
    backgroundColor: "#fff",
    borderRadius: pxToDp(10)
  },
  head: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: pxToDp(180)
  },
  img: {
    width: pxToDp(76),
    height: pxToDp(76),
    marginBottom: pxToDp(25)
  },
  text: {
    color: "#666",
    fontSize: pxToDp(28)
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    borderTopColor: "#e1e1e1",
    borderTopWidth: pxToDp(1)
  },
  btn1: {
    width: pxToDp(280),
    height: pxToDp(100),
    borderRightColor: "#e1e1e1",
    borderRightWidth: pxToDp(1)
  },
  btn2: {
    width: pxToDp(280),
    height: pxToDp(100),
  },
  left: {
    fontSize: pxToDp(36),
    color: "#363636",
    textAlign: "center",
    lineHeight: pxToDp(100)
  },
  right: {
    fontSize: pxToDp(36),
    color: "#909090",
    textAlign: "center",
    lineHeight: pxToDp(100)
  }
})
