import React from "react";

import { View, StyleSheet, Text, Platform } from "react-native";
import pxToDp from "../../../../utils/fixcss";
import { CircleProgress } from './circle';

interface IProps {
  score: any
  name: string
  week? :any
  cycle: string | number
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

  let color = props.score>=60? '#007aff' : '#000'
  let textColor = props.score>=60? '#666' : '#f88675'

  // console.log(props)
  return(
    <View style={styles.container}>
      <View style={styles.circleBox}>  
        <CircleProgress score={props.score}/>
        <View style={styles.textBox}>
          <Text style={[styles.blueText,{color: color}]}>{getScore()[0] !==0 &&  getScore()[0]}
            <Text style={[styles.sBluetext,{color: color}]}>{getScore()[1]}</Text>
          </Text>
          <Text style={[styles.text,{color: textColor}]}>{props.score >= 80? '合格' : '不合格'}</Text>
        </View>
      </View>
    
      <Text style={styles.shopname}>{props.name}</Text>
      <Text style={styles.week}>{props.cycle && '第' +  props.cycle  + '月'}</Text>
      <View style={styles.footer}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  
  container: {
    width: "100%",
    // height: pxToDp(420),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circleBox: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: pxToDp(50)
  },
  textBox: {
    position: "absolute",
    // left: Platform.OS === 'ios'? '6%' : '6%',
    top:  '30%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: '20%',

  },
  blueText: {
    color:"#007aff",
    fontSize: pxToDp(70),
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
    width: "60%",
    textAlign: "center",
    lineHeight: pxToDp(40)
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