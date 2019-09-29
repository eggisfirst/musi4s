import React from "react";

import { View, Text, StyleSheet, Image } from "react-native";
import pxToDp from "../../../../utils/fixcss";
import { TouchableOpacity } from "react-native-gesture-handler";
import { removeSecond } from "../../../../utils";

interface IProps {
  list: Array<any>
  navigation: any
  shopName: string
}

export const StarCheckBox:React.FC<IProps> = (props) => {
    /**点击跳转检查详情页面 */
    const handleClickToDetails = (index: number) => {
      // const shopId = props.list[index].shopId
      // const startTime = props.list[index].startTime
      // const endTime = props.list[index].endTime
      // const levelId = props.list[index].levelId
      const shopName = props.shopName
      const {shopId,startTime,endTime,levelId} = props.list[index]
      props.navigation.push("CheckDetailsPage", {
        shopId,
        startTime,
        endTime,
        levelId,
        type: 'check',
        shopName
      })
    }
    const disqualification = {
      color: "#ff2d55"
    }
    const bgColor = {
      backgroundColor: "#f8f8f8",
    }
    return(
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <Text style={styles.text}>星级</Text>
          <Text style={styles.text}>开始时间</Text>
          <Text style={styles.text}>结束时间</Text>
          <Text style={styles.text}>评分</Text>
        </View>
        {
          props.list.map((item:any, index:number) => (
            <TouchableOpacity activeOpacity={0.6} onPress={() => {handleClickToDetails(index)}} style={[styles.noBgContainer,index%2 !==0 && bgColor ]} key={index}>
              <Text style={styles.starCheck}>{item.name}</Text>
              <Text style={styles.date}>{removeSecond(item.startTime)}</Text>
              <Text style={styles.date}>{removeSecond(item.endTime)}</Text>
              <View style={styles.rightBox}>
                <Text style={[styles.bluetext,item.pass !== 1 && disqualification]}>{item.pass === 1 ? '合格' : '不合格'}</Text>
                <Image style={styles.icon} source={require("../../../../images/work/areaReport/checkRecord/arrow.png")} />
              </View>
            </TouchableOpacity>
          ))
        }
      
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    width: pxToDp(710),
    backgroundColor: "#fff",
    borderRadius: pxToDp(20),
    marginLeft: pxToDp(19),
    marginTop: pxToDp(25),
    paddingLeft: pxToDp(12),
    paddingRight: pxToDp(12),
    paddingTop: pxToDp(20),
    marginBottom: pxToDp(80)
  },
  listContainer: {
    display: "flex",
    flexDirection:"row",
    justifyContent: "space-around",
    alignItems: "center",
    lineHeight: pxToDp(60),
    backgroundColor: "#f8f8f8",
    borderRadius: pxToDp(12),
    marginBottom: pxToDp(10)
  },
  text: {
    lineHeight: pxToDp(60),
    color: "#999",
    fontSize: pxToDp(26)
  },
  noBgContainer: {
    display: "flex",
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center",
    lineHeight: pxToDp(60),
    borderRadius: pxToDp(12),
    marginBottom: pxToDp(10)
  },
 
  starCheck: {
    color: "#57452C",
    fontSize: pxToDp(24),
    lineHeight: pxToDp(60),
    flex: 0.2,
    textAlign: "right"
  },
 
  date: {
    color: "#0e0e0e",
    fontSize: pxToDp(24),
    lineHeight: pxToDp(60),
    flex: 0.28,
    textAlign: "center"
  },
  rightBox: {
    display: "flex",
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 0.21,
    // borderWidth: 1
  },
  bluetext: {
    color: "#007aff",
    fontSize: pxToDp(24),
    fontWeight: "500",
    lineHeight: pxToDp(60),
    paddingLeft: pxToDp(38),

  },
  icon: {
    width: pxToDp(10),
    height: pxToDp(14),
    marginRight: pxToDp(12),
  }
})