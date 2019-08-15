import React from "react";

import { View, Text, StyleSheet } from "react-native";
import pxToDp from "../../../../../utils/fixcss";
import LinearGradient from 'react-native-linear-gradient';
export default class SliderCmp extends React.Component{
  render (){
    const scaleList = [1,1,1,2,1,1,1]
    return(
      <View style={styles.container}>
        <View style={styles.scoreRange}>
          <Text style={styles.score}>0</Text>
          <Text style={styles.score}>18</Text>
        </View>
        <View style={styles.scale}>
          {
            scaleList.map((item, index) => (
              <View key={index} style={item === 1? styles.scale1 : styles.scale2}></View>
            ))
          }
        </View>
        <View style={styles.slider}>
          <LinearGradient style={styles.activeSlider} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FFBB02', '#FFA15B', '#FF6A5D']}></LinearGradient>
        </View>
      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  container: {
    width: "100%",
    height: "100%",
  },
  scoreRange: {
    display: 'flex',
    justifyContent: "space-between",
    flexDirection: "row",
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
    width: "100%",
    height: pxToDp(24),
    borderRadius: pxToDp(12),
    backgroundColor: "#f5f5f5",
    marginTop: pxToDp(18)
  },
  activeSlider: {
    width: "80%",
    height: pxToDp(24),
    backgroundColor: "#ff6a5d",
    borderRadius: pxToDp(12),
  }
})
