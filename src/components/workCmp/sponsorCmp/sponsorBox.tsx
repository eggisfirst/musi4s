import React from "react";

import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Duty } from "../../../utils/enum";

interface IProps {
  type: string | number  //判断4s或者区域
  handleSponsorCancle: () => void
  handleSponsorComfirm: () => void
  sponsorBoxData: any
}


export const SponsorBox: React.FC<IProps> = (props) => {
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
  const scoreList1 = [
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
      key: "区域评分日期",
      value: "2018.05.02 16:00",
      status: false
    },
  ]
  const scoreList2 = [
    {
      key: "4s部评分",
      status: true,
      value: "89分",
      textVal: "查看4s部评分报表",
    },
    {
      key: "4s评分日期",
      value: "2018.05.02 16:00",
      status: false
    },
  ]
  const socreList = props.type === 3 ? scoreList1 : [...scoreList1, ...scoreList2]
  const container = props.type === 3 ? styles.areaHeight : styles.fourHeight

  /**
   * 返回接口对应的value
   * @param val 传入list里面的key值
   */
  const getList = (val: string) => {
    const data = props.sponsorBoxData
    switch (val) {
      case '省份城市':
        return data.provinceCity
      case '区域':
        return data.regionName
      case '城市级别':
        return data.cityLevel
      case '经销商':
        return data.distributor
      case '联系方式':
        return data.phone
      case '代理系列':
        return data.brand
      case '门店数量':
        return data.shopNumber
      case '原有星级':
        return data.originalStarLevel
      case '认证星级':
        return data.starLevel
      case '门店评分':
        return data.scoreShop
      case '评分周期':
        return data.cycle
      case '区域评分':
        return data.scoreRegion
      case '4s部评分':
        return data.scoreCertification
      case '区域评分日期':
        return data.scoreRegionTimeS
      case '4s评分日期':
        return data.scoreCertificationTimeS
      default:
        break;
    }

  }

  //跳转到报表
  const handleToReport = (key: string) => {
    if(key === '区域评分') {

    }else if(key === '4s部评分') {
    }
    console.log('gogoggo',key)
  }

  return (
    <View style={styles.mask}>
      <View style={container}>
        <Image style={styles.header} source={require("../../../images/work/sponsor/box_header.png")} />
        <View style={styles.sponsorBox}>
          <Text style={styles.title}>发起认证</Text>
          {
            list.map((item, index) => (
              <View style={styles.content} key={index}>
                <View style={styles.left}>
                  {
                    item.key.split("").map((item, index) => (
                      <Text key={index} style={styles.leftText}>{item}</Text>
                    ))
                  }
                </View>
                <Text>：</Text>
                <Text style={styles.right} numberOfLines={1}>{getList(item.key)}</Text>
              </View>
            ))
          }
        </View>
        <View style={styles.scoreBox}>
          {
            socreList.map((item, index) => (
              <View key={index} style={styles.content}>
                {
                  item.key === '4s评分日期' || item.key === '区域评分日期'?
                  <Text style={styles.left1}>评分日期：</Text> :
                  <Text style={styles.left1}>{item.key}：</Text>
                }
                <Text style={styles.right}>{getList(item.key)}</Text>
                {
                 item.status && getList(item.key)?
                  <>
                    <Text style={styles.toReport} onPress={() => { handleToReport(item.key) }}>{item.textVal}>></Text>
                  </>
                  :<></>
                }

              </View>
            ))
          }
        </View>
        <View style={styles.btn}>
          <TouchableOpacity style={styles.btnWrap} onPress={() => { props.handleSponsorCancle() }}>
            <Text style={styles.cancle}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnWrap, styles.borderLeft]} onPress={() => { props.handleSponsorComfirm() }}>
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
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    width: '100%',
    height: Dimensions.get('screen').height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
  },
  areaHeight: {
    width: pxToDp(620),
    height: pxToDp(1050),
    backgroundColor: "#fff",
    borderRadius: pxToDp(10),
    marginTop: pxToDp(200)
  },
  fourHeight: {
    width: pxToDp(620),
    height: pxToDp(1150),
    backgroundColor: "#fff",
    borderRadius: pxToDp(10),
    marginTop: pxToDp(279)
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
    marginTop: pxToDp(130),
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
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
    maxWidth: pxToDp(430)
  },
  scoreBox: {
    marginTop: pxToDp(20),
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
    display: "flex",
    flexDirection: "row",
    borderTopColor: "#e1e1e1",
    borderTopWidth: pxToDp(1),
    marginTop: pxToDp(40)
  },
  btnWrap: {
    width: pxToDp(310),
    height: pxToDp(100),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
