import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import pxToDp from "../../../utils/fixcss";


interface IProps {
  item: any
  index?: number
  handleToGrade?: (index: number, i: number, type: string) => void
  i?:number
}

export const CheckBox: React.FC<IProps> = ({item,index,handleToGrade,i}) => {
  //跳转到评分页面
  const handleClick = (type: '已评分' | '未评分') => {
    if(handleToGrade && index !== undefined && i!== undefined) {
      handleToGrade(index,i,type)
    }
  }
  return (
    <View style={styles.wrapper}>
      <Text style={styles.content}>{item.name}</Text>
      {
        item.scoreFlag? 
        <TouchableOpacity onPress={() => {handleClick('已评分')}} style={styles.hadGradeBtn}>
          <Image style={styles.icon} source={require('../../../images/work/grade/graded.png')} />
          <Text style={styles.hadGradeText}>已评分</Text>
        </TouchableOpacity> :
        <TouchableOpacity onPress={() => {handleClick('未评分')}} style={styles.btn}>
          <Text style={styles.grade}>去评分>></Text>
        </TouchableOpacity> 

      }
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: pxToDp(214),
    height: pxToDp(174),
    backgroundColor: "#f2f5f7",
    borderRadius: pxToDp(12),
    marginTop: pxToDp(22),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: pxToDp(22)

  },
  content: {
    fontSize: pxToDp(26),
    color: "#363636",
    // marginTop: pxToDp(20),
    paddingLeft: pxToDp(37),
    paddingRight: pxToDp(37),
    textAlign: "center",
    lineHeight: pxToDp(40)
  },
  btn: {
    width: pxToDp(121),
    height: pxToDp(44),
    backgroundColor: "rgba(0,122,255,0.3)",
    borderRadius: pxToDp(22),
    marginTop: pxToDp(20),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  hadGradeBtn: {
    width: pxToDp(121),
    height: pxToDp(44),
    backgroundColor: "rgba(76,217,100,0.3)",
    borderRadius: pxToDp(22),
    marginTop: pxToDp(20),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  hadGradeText: {
    color: "#4CD964",
    fontSize: pxToDp(23),
    paddingLeft: pxToDp(5)
  },
  grade: {
    fontSize: pxToDp(23),
    color: "#007aff",
    textAlign: "center",
    lineHeight: pxToDp(44),
  },
  icon: {
    width: pxToDp(24),
    height: pxToDp(24)
  }
})
