import React from "react";

import { View, StyleSheet, Text, Platform } from "react-native";
import pxToDp from "../../../../utils/fixcss";
import { CircleProgress } from './circle';

interface IProps {
  score: any
  name: string
  week? :any
}


export const ScoreCanvas: React.FC<IProps> = (props) => {
  /**获取个位十位的数字 */
  const getScore = () => {
    if(props.score === 100) {
      return [100]
    }
    else if(props.score >= 10 && props.score < 100) {
      const firstScore = Math.floor(props.score/10)
      const secScore = props.score % 10
      return [firstScore,secScore]
    }
    return [0,props.score]
  }
  return(
    <View style={styles.container}>
      <View style={styles.circleBox}>  
        <CircleProgress score={props.score}/>
        <View style={styles.textBox}>
          <Text style={styles.blueText}>{getScore()[0] !==0 &&  getScore()[0]}
            <Text style={styles.sBluetext}>{getScore()[1]}</Text>
          </Text>
          <Text style={styles.text}>{props.score >= 80? '合格' : '不合格'}</Text>
        </View>
      </View>
    
      <Text style={styles.shopname}>{props.name}</Text>
      <Text style={styles.week}>{props.week? '第一周' : ''}</Text>
      <View style={styles.footer}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  
  container: {
    width: "100%",
    height: pxToDp(420),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circleBox: {
    position: "relative"
  },
  textBox: {
    position: "absolute",
    left: Platform.OS === 'ios'? '6%' : '4.7%',
    top:  '30%',
    // borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: '20%',
  },
  blueText: {
    color:"#007aff",
    fontSize: pxToDp(78),
    fontWeight: "500",
    lineHeight: pxToDp(80),
    textAlign: "center"
  },
  sBluetext: {
    color:"#007aff",
    fontSize: pxToDp(48),
    // lineHeight: pxToDp(60),
  },
  text: {
    color: "#666",
    fontSize: pxToDp(24),
    textAlign: "center",
    // lineHeight: pxToDp(30),
  },
  shopname: {
    color: "rgba(45, 45, 45, 1)",
    fontSize: pxToDp(28),
    fontWeight: "500",
  },
  week: {
    color: "rgba(102,102,102,0.8)",
    fontSize: pxToDp(24),
    lineHeight: pxToDp(48)
  },



  footer: {
    width: pxToDp(720),
    height: pxToDp(20),
    backgroundColor: "#f5f5f5",
    marginLeft: pxToDp(15),
    marginTop: pxToDp(20)
  }
})