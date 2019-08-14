import React from "react";

import { View, Text, StyleSheet, Image, Platform, TouchableOpacity } from "react-native";
import pxToDp from "../../../../utils/fixcss";
import { Duty } from "../../../../utils/enum";

interface IProps {
  starNum: number
  list: Array<any>
  navigation:any
}

export const AcceptanceCard:React.FC<IProps> = (props) => {
  /**点击区域分数跳转 参数未处理（star，type）*/
  const handleToAreaDetail = () => {
    props.navigation.push('CheckDetailsPage', {
      type: Duty.area
    })
  }
  /**点击4s分数跳转  参数未处理*/
  const handleToFourDetails = () => {
    props.navigation.push('CheckDetailsPage', {
      type: Duty.fourS
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
    const len = props.list.length
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
          <View style={styles.head_left}>
            <Text style={styles.starAccept}>五星认证</Text>
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
          <View style={styles.head_right}>
            <Text style={styles.detail}>明细</Text>
            <Image style={styles.arrowIcon} source={require('../../../../images/work/areaReport/checkRecord/arrow.png')} />
          </View>
        </View>
        
        <View style={styles.title}>
          <Text style={styles.titleText}>星级</Text>
          <Text style={styles.titleText}>区域经理</Text>
          <Text style={styles.titleText}>4s认证部</Text>
          <Text style={styles.titleText}>评分时间</Text>
        </View>
        {
          props.list.map((item, index) => (
            <View style={[styles.title,lastItem(index) === false && borderStyle ]} key={index}>
              <Text style={styles.contentText}>{item.star}</Text>

              {
                item.areaScore !== '' && 
                <TouchableOpacity style={styles.scoreText} onPress={() => {handleToAreaDetail()}}>
                  <Text style={styles.scoreText}>{item.areaScore}</Text>
                </TouchableOpacity>
              }
              {
                item.areaScore === '' && 
                <Text style={styles.scoreText}>{'/'}</Text>
              }

              {
                 item.fourS !== '' && 
                <TouchableOpacity style={styles.scoreText} onPress={() => {handleToFourDetails()}}>
                  <Text style={styles.scoreText}>{item.fourS}</Text>
                </TouchableOpacity>
              }
              {
                item.fourS === '' && 
                <Text style={styles.scoreText}>{'/'}</Text>
              }


              <Text style={styles.dateText}>{item.date}</Text>
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
    shadowRadius: pxToDp(10),
    shadowOpacity: 0.3,
    backgroundColor: "#fff",
    marginBottom:pxToDp(30)
  },
  header: {
    width: pxToDp(710),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: pxToDp(24),
    paddingRight: pxToDp(13),
    borderBottomColor: "#e1e1e1",
    borderBottomWidth: pxToDp(1)
  },
  head_left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
  head_right: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  detail: {
    color: "#909090",
    fontSize: pxToDp(24),
    lineHeight: pxToDp(80)
  },
  arrowIcon: {
    width: pxToDp(14),
    height: pxToDp(23),
    marginLeft: pxToDp(14)
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
    flex: 0.01
  },
  scoreText: {
    color: "#666",
    fontSize: pxToDp(28),
    lineHeight: pxToDp(59),
    flex: 0.3,
    textAlign:"center",
    // borderWidth: 1
  },
  dateText: {
    color: "#666",
    fontSize: pxToDp(28),
    lineHeight: pxToDp(59),
    flex: 0.25,
    textAlign:"right"
  }
})
