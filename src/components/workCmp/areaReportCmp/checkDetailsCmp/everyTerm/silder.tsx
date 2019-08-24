import React from "react";

import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import pxToDp from "../../../../../utils/fixcss";
import LinearGradient from 'react-native-linear-gradient';

interface IProps {
  cutScore: number
  maxNum: number
}


export const SliderCmp: React.FC<IProps> = (props) => {
  /**刻度 */
  const scaleList = [1, 1, 1, 2, 1, 1, 1]
  /**扣的分数占18分的比例 */
  const sliderActivePrecent = (props.cutScore / props.maxNum) * 100 + "%"
  return (
    <View style={styles.container}>
      <View style={styles.scoreRange}>
        <Text style={styles.score}>0</Text>
        {
          scaleList.map((item, index) => (
            <View key={index} style={item === 1 ? styles.scale1 : styles.scale2}></View>
          ))
        }
        <Text style={styles.score}>{props.maxNum}</Text>
      </View>
      {
        props.cutScore ?
          <ImageBackground style={[styles.bubble, { left: sliderActivePrecent }]} source={require("../../../../../images/work/areaReport/checkRecord/bubble.png")}>
            <Text style={styles.cutScore}>扣{props.cutScore}分</Text>
          </ImageBackground> : <></>
      }

      <View style={styles.slider}>
        <LinearGradient style={[styles.activeSlider, { width: sliderActivePrecent }]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FFBB02', '#FFA15B', '#FF6A5D']}></LinearGradient>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: pxToDp(490),
    height: "100%",
    marginLeft: pxToDp(20)
  },
  scoreRange: {
    display: 'flex',
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  score: {
    fontSize: pxToDp(32),
    color: "#222444"
  },
  scale: {
    display: 'flex',
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    marginTop: pxToDp(20)
  },
  scale1: {
    width: pxToDp(3),
    height: pxToDp(8),
    backgroundColor: "#bdc3cf",
    borderRadius: pxToDp(2)
  },
  scale2: {
    width: pxToDp(3),
    height: pxToDp(24),
    backgroundColor: "#bdc3cf",
    borderRadius: pxToDp(2)
  },

  slider: {
    width: pxToDp(490),
    height: pxToDp(24),
    borderRadius: pxToDp(12),
    backgroundColor: "#f5f5f5",
    marginTop: pxToDp(18)
  },
  activeSlider: {
    height: pxToDp(24),
    backgroundColor: "#ff6a5d",
    borderRadius: pxToDp(12),
  },

  bubble: {
    width: pxToDp(98),
    height: pxToDp(61),
    marginLeft: pxToDp(-40),
    position: "absolute",
    left: '50%',
    top: pxToDp(-80)
  },
  cutScore: {
    color: "#E4675B",
    fontSize: pxToDp(26),
    textAlign: "center",
    lineHeight: pxToDp(41)
  }
})
