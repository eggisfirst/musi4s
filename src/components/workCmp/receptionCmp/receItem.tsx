import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Linking } from "react-native";
import pxToDp from "../../../utils/fixcss";

interface IProps {
  toGrade:(index: number) => void
  handleShowMap: (index: number) => void
  shopItem: any
  index: number
  /**
   * 级别
   */
  type: number | string
}
export const ReceItem:React.FC<IProps> = (props:IProps) =>{
  console.log(123123,props.type)
  return(
    <View style={styles.wrapper}>
      <View><Text style={styles.shopName}>{props.shopItem.shopName}</Text></View>
      <View style={styles.centerMsg}>
        <View style={styles.score}>
          <Text style={styles.textStyle}>门店评分：</Text>
          <Text style={styles.redStyle}>{props.shopItem.scoreShop? props.shopItem.scoreShop : '/'}</Text>
          <Text style={styles.textStyle}>{props.type == 3? '区域评分' : '4s评分'}：</Text>
          {
            props.type == 3? 
            props.shopItem.scoreRegion? 
            <Text style={styles.redStyle}>{props.shopItem.scoreRegion}</Text>
            :  <Text style={styles.textStyle}>/</Text> :
            props.shopItem.scoreCertification? 
            <Text style={styles.redStyle}>{props.shopItem.scoreCertification}</Text>
            :  <Text style={styles.textStyle}>/</Text>
          }
        </View>
        <View style={styles.status}>
          {
            props.shopItem.scoreRegion || props.shopItem.scoreCertification? 
            <Text style={styles.greenStyle}>已评分</Text> :
            <TouchableOpacity style={styles.toGradeBtn} onPress={() => {props.toGrade(props.index)}}>
              <Text style={styles.toGradeTxt}>进入评分</Text>
            </TouchableOpacity> 
          }
         
        </View>
      </View>

      <View style={styles.botMsg}>
        <TouchableOpacity style={styles.address} onPress={() => {props.handleShowMap(props.index)}}>
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
    lineHeight: pxToDp(60),
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  toGradeTxt: {
    color:"#007aff",
    fontSize: pxToDp(30),
    // lineHeight: pxToDp(60),
    // textAlign:'center'
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
