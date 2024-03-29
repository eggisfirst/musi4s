import React from "react";

import { View, Text, StyleSheet, Image, Platform, TouchableOpacity } from "react-native";
import pxToDp from "../../../../utils/fixcss";
import { Duty } from "../../../../utils/enum";
import { getStar } from "../../../../utils";

interface IProps {
  starNum: number
  list: any
  navigation:any
}

export const AcceptanceCard:React.FC<IProps> = (props) => {
  const shopId = props.list.shopId
  const qualificationId = props.list.qualificationId
  /**点击区域分数跳转 参数未处理（star，type）*/
  const handleToAreaDetail = (index: number) => {
  const starLevel = props.list.gradeList[index].starLevel
  const starLevelId = props.list.gradeList[index].starLevelId
    props.navigation.push('CheckDetailsPage', {
      type: 3,
      shopId,
      qualificationId,
      starLevelId,
      starLevel
    })
  }
  /**点击4s分数跳转  参数未处理*/
  const handleToFourDetails = (index: number) => {
    const starLevel = props.list.gradeList[index].starLevel
    const starLevelId = props.list.gradeList[index].starLevelId
    props.navigation.push('CheckDetailsPage', {
      type: 4,
      shopId,
      qualificationId,
      starLevel,
      starLevelId
    })
  }
  /**判断返回几颗黄色几颗白色 */
  const star = () => {
    const list = [false,false,false,false,false]
    list.map((item, index) => {
      if(index < props.starNum) {
        list[index] = true
      }
    })
    return list
  }
  /**最后一条数据不设置borderbottom */
  const lastItem = (index: number) => {
    const len = props.list.gradeList.length
    if(index === len - 1) {
      return false
    }
  }
  /**设置borderbottom */
  const borderStyle = {
    borderBottomWidth: 0
  }
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.starAccept}>{getStar(props.list.gradeList.length)}认证</Text>
          {
            star().map((item, index) => {
              if(item) {
                return (
                  <Image key={index} style={styles.starIcon} source={require("../../../../images/work/areaReport/checkRecord/star.png")} />
                )
              }else {
                return (
                  <Image key={index} style={styles.starIcon} source={require("../../../../images/work/areaReport/checkRecord/star_white.png")} />
                )
              }
            })
          }
        </View>
        
        <View style={styles.title}>
          <Text style={styles.titleText}>星级</Text>
          <Text style={styles.titleText}>区域经理</Text>
          <Text style={styles.titleText}>4s认证部</Text>
          <Text style={styles.titleText}>评分时间</Text>
        </View>
        {
          props.list.gradeList.map((item:any, index:number) => (
            <View style={[styles.title,lastItem(index) === false && borderStyle ]} key={index}>
              <Text style={styles.contentText}>{getStar(item.starLevel)}</Text>

              {
                item.regionGet?  
                <TouchableOpacity style={styles.scoreText} onPress={() => {handleToAreaDetail(index)}}>
                  <Text style={[styles.scoreText,{color: "#007aff",textAlign: "left"}]}>{item.regionGet}</Text>
                </TouchableOpacity> : 
                <Text style={[styles.scoreText,{textAlign: "left"}]}>{'/'}</Text>
              }
              {
                 item.certificationGet? 
                <TouchableOpacity style={styles.scoreText2} onPress={() => {handleToFourDetails(index)}}>
                  <Text style={[styles.scoreText2,{color: "#007aff",textAlign: "right"}]}>{item.certificationGet}</Text>
                </TouchableOpacity> : 
                <Text style={[styles.scoreText,{textAlign: "right"}]}>{'/'}</Text>
              }
              <Text style={styles.dateText}>{item.certificationScoreTime || item.regionScoreTime}</Text>
            </View>
          ))
        }
         
       
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    width: pxToDp(710),
    // height: pxToDp(441),
    borderRadius: pxToDp(20),
    shadowColor: '#ccc',
    shadowRadius: pxToDp(5),
    shadowOpacity: 0.1,
    shadowOffset:{width:10,height:2},
    backgroundColor: "#fff",
    marginBottom:pxToDp(30)
  },
  header: {
    width: pxToDp(710),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: pxToDp(24),
    paddingRight: pxToDp(13),
    borderBottomColor: "#e1e1e1",
    borderBottomWidth: pxToDp(1)
  },
  starAccept: {
    lineHeight: pxToDp(80),
    fontSize: pxToDp(39),
    color: "#363636",
    fontWeight: "500",
    marginRight: pxToDp(12)
  },
  starIcon: {
    width: pxToDp(31),
    height: pxToDp(30),
  },

  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: pxToDp(24),
    paddingRight: pxToDp(13),
    borderBottomColor: "#e1e1e1",
    borderBottomWidth: pxToDp(1)
  },
  titleText: {
    color: "#363636",
    fontSize: pxToDp(28),
    lineHeight: pxToDp(59)
  },
  contentText: {
    color: "#666",
    fontSize: pxToDp(28),
    lineHeight: pxToDp(59),
    minWidth: pxToDp(80),
    textAlign: "left",
    flex: 0.1,
    // borderWidth: 1
  },
  scoreText: {
    color: "#666",
    fontSize: pxToDp(28),
    lineHeight: pxToDp(59),
    flex: 0.14,
    textAlign:"center",
    // borderWidth: 1
  },
  scoreText2: {
    color: "#666",
    fontSize: pxToDp(28),
    lineHeight: pxToDp(59),
    flex: 0.2,
    textAlign:"center",
    marginLeft: pxToDp(40)
  },
  dateText: {
    color: "#666",
    fontSize: pxToDp(28),
    lineHeight: pxToDp(59),
    flex: 0.35,
    textAlign:"right",
  }
})
