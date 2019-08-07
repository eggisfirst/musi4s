import React from "react";

import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { TouchableOpacity } from "react-native-gesture-handler";

export const SponsorBox:React.FC = () => {
  const list = [
    {
      key: '省份城市',
      value: "广东省广州市"
    },
    {
      key: '区域',
      value: "华南区"
    },
    {
      key: '城市级别',
      value: "一级"
    },
    {
      key: '经销商',
      value: "广东广州何秋明"
    },
    {
      key: '联系方式',
      value: "13800000000"
    },
    {
      key: '代理系列',
      value: "V6、0769、凯奇"
    },
    {
      key: '门店数量',
      value: "10"
    },
    {
      key: '原有星级',
      value: "0星"
    },
    {
      key: '认证星级',
      value: "1星"
    },
    
  ]
  const scoreList = [
    {
      key: "门店评分",
      value: "85分",
      status: false
    },
    {
      key: "评分周期",
      status: false,
      value: "2018.01.05-2018.04.05",
    },
    {
      key: "区域评分",
      status: true,
      value: "89分",
      textVal: "查看区域评分报表",
    },
    {
      key: "评分日期",
      value: "2018.05.02 16:00",
      status: false
    },
    {
      key: "4s部评分",
      status: true,
      value: "89分",
      textVal: "查看4s部评分报表",
    },
    {
      key: "评分日期",
      value: "2018.05.02 16:00",
      status: false
    },

  ]
  const handleToReport = () => {
    console.log('gogoggo')
  }
  return(
    <View style={styles.mask}>
      <View style={styles.container}>
        <Image style={styles.header} source={require("../../../images/work/sponsor/box_header.png")} />
        <View style={styles.sponsorBox}>
          <Text style={styles.title}>发起认证</Text>
          {
            list.map((item, index) => (
              <View style={styles.content} key={index}>
                <View style={styles.left}>
                  {
                    item.key.split("").map((item,index) => (
                      <Text key={index} style={styles.leftText}>{item}</Text>
                    ))
                  }
                </View>
                <Text>：</Text>
                <Text style={styles.right}>{item.value}</Text>
              </View>
            ))
          }
        </View>
        <View style={styles.scoreBox}>
          {
            scoreList.map((item, index) => (
              <View key={index} style={styles.content}>
                <Text style={styles.left1}>{item.key}：</Text>
                <Text style={styles.right}>{item.value}</Text>
                {
                  item.status && 
                  <>
                    <Text style={styles.toReport} onPress={() => {handleToReport()}}>{item.textVal}>></Text>                  
                  </>
                }
                  
              </View>
            ))
          }
        </View>
        <View style={styles.btn}>
          <TouchableOpacity style={styles.btnWrap}>
            <Text style={styles.cancle}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={[styles.btnWrap,styles.borderLeft]}>
            <Text style={styles.comfirm}>提交</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
   )
}

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    top: 0,
    left:0,
    right:0,
    bottom:0, 
    zIndex:9999, 
    width: '100%', 
    height: Dimensions.get('screen').height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: "flex",
    flexDirection: 'row',
    justifyContent:"center",
  },
  container: {
    width: pxToDp(620),
    minHeight: pxToDp(1150),
    backgroundColor: "#fff",
    borderRadius: pxToDp(10),
    marginTop:pxToDp(279)
  },
  header: {
    width: pxToDp(408),
    height: pxToDp(234),
    position: "absolute",
    top: -pxToDp(117),
    left: '50%',
    marginLeft: pxToDp(-204)
  },
  sponsorBox: {
    marginTop:pxToDp(130),
    marginLeft: pxToDp(33),
    marginRight: pxToDp(33),
    borderBottomWidth: pxToDp(1),
    borderBottomColor: "#ccc",
    paddingBottom: pxToDp(30)
  },
  title: {
    fontSize: pxToDp(38),
    fontWeight: "bold",
    color: "#363636",
    textAlign: "center",
    marginBottom: pxToDp(20)
  },
  content: {
    display: 'flex',
    flexDirection: "row",
    alignItems: "center"
  },
  left: {
    width: pxToDp(120),
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row"
  },
  leftText: {
    color: "#363636",
    fontSize: pxToDp(28),
    lineHeight: pxToDp(50),
    fontWeight: "500",
  },
  left1: {
    color: "#363636",
    fontSize: pxToDp(28),
    lineHeight: pxToDp(50),
    fontWeight: "500",
  },
  right: {
    color: "#666",
    fontSize: pxToDp(28),
    lineHeight: pxToDp(50),
  },
  scoreBox: {
    marginTop:pxToDp(20),
    marginLeft: pxToDp(33),
    marginRight: pxToDp(33),
  },
  toReport: {
    fontSize: pxToDp(24),
    color: "#007aff",
    marginLeft: pxToDp(30)
  },
  btn: {
    width: pxToDp(610),
    height: pxToDp(100),
    display:"flex",
    flexDirection:"row",
    borderTopColor: "#e1e1e1",
    borderTopWidth: pxToDp(1),
    marginTop:pxToDp(40)
  },
  btnWrap: {
    width: pxToDp(310),
    height:pxToDp(100),
    display: "flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
  },
  borderLeft: {
    borderLeftWidth: pxToDp(1),
    borderLeftColor: "#e1e1e1"
  },
  cancle: {
    fontSize: pxToDp(36),
    color: "#909090",
  },
  comfirm: {
    fontSize: pxToDp(36),
    color: "#007aff",
  }
})