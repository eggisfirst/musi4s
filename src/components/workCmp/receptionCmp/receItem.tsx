import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Linking } from "react-native";
import pxToDp from "../../../utils/fixcss";

interface IProps {
  toGrade:() => void
  shopItem: {
    name: string
    score1: number
    score2: number
    status: boolean
    date: string
  }
}
export const ReceItem:React.FC<IProps> = (props:IProps) =>{
  
  return(
    <View style={styles.wrapper}>
      <View><Text style={styles.shopName}>{props.shopItem.name}</Text></View>
      <View style={styles.centerMsg}>
        <View style={styles.score}>
          <Text style={styles.textStyle}>门店评分：</Text>
          <Text style={styles.redStyle}>{props.shopItem.score1}</Text>
          <Text style={styles.textStyle}>区域评分：</Text>
          {
            props.shopItem.status? 
            <Text style={styles.redStyle}>{props.shopItem.score2}</Text>
            :  <Text style={styles.textStyle}>/</Text>
          }
        </View>
        <View style={styles.status}>
          {
            props.shopItem.status? 
            <Text style={styles.greenStyle}>已评分</Text> :
            <TouchableOpacity style={styles.toGradeBtn} onPress={() => {props.toGrade()}}>
              <Text style={styles.toGradeTxt}>进入评分</Text>
            </TouchableOpacity>

          }
         
        </View>
      </View>

      <View style={styles.botMsg}>
        <TouchableOpacity style={styles.address}>
          <Image style={styles.add_icon} source={require("../../../images/work/reception/location.png")} />
          <Text style={styles.add_text}>门店地址</Text>
        </TouchableOpacity>
        {
          props.shopItem.status && 
          <Text style={styles.botDate}>{props.shopItem.date}</Text>
        }
        
      </View>
    </View>
   )
}

const styles = StyleSheet.create({
  wrapper: {
    width: pxToDp(686),
    // height: pxToDp(240),
    backgroundColor: "#fff",
    borderRadius: pxToDp(20),
    marginBottom: pxToDp(11),
    padding: pxToDp(29),
  },
  shopName: {
    color: "#363636",
    fontSize: pxToDp(38),
    fontWeight: "bold",
    marginBottom: pxToDp(30)
  },
  centerMsg: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: pxToDp(30)
  },
  score: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    color: "#666",
    fontSize: pxToDp(28)
  },
  redStyle: {
    color: "#FF2D55",
    fontSize: pxToDp(28),
    marginRight: pxToDp(20)
  },
  status: {

  },
  greenStyle: {
    color: "#4CD964",
    fontSize: pxToDp(30)
  },
  toGradeBtn: {
    width:pxToDp(160),
    height:pxToDp(60),
    borderRadius: pxToDp(30),
    backgroundColor:'rgba(0,122,255,0.3)',
  },
  toGradeTxt: {
    color:"#007aff",
    fontSize: pxToDp(30),
    lineHeight: pxToDp(60),
    textAlign:'center'
  },
  botMsg: {
    // marginTop:pxToDp(35)
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  address: {
    width: pxToDp(160),
    height: pxToDp(46),
    borderRadius: pxToDp(8),
    backgroundColor: 'rgba(204,204,204,0.3)',
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-around"
  },
  add_icon: {
    width: pxToDp(30),
    height: pxToDp(30)
  },
  add_text: {
    color: "#909090",
    fontSize: pxToDp(28)
  },
  botDate: {
    fontSize: pxToDp(28),
    color: "#666"
  }
})
