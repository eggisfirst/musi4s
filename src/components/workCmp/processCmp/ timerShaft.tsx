import React from "react";
import { View, Text, StyleSheet, Platform, Dimensions } from "react-native";
import pxToDp from "../../../utils/fixcss";
import ExtraDimensions from 'react-native-extra-dimensions-android';
interface IProps {
  getAllList: Array<any>
  nodeStateList: Array<any>
}


export const TimerShaft: React.FC<IProps> = ({ getAllList, nodeStateList }) => {
  /**获取每段时间轴的长度 */
  const myMarginTop = (index: number) => {
    if (index === -1) {
      return
    }
    const w = Dimensions.get("window").width
    const h = Dimensions.get("window").height + ExtraDimensions.getStatusBarHeight() 
    console.log(h, w)
    if (getAllList[index].data.length) {
      const i = getAllList[index].data.length
      if (Platform.OS === 'ios') {
        return pxToDp((i) * 31.5 + 40)
      } else {
        if (w === 360 && h <= 760) {
          return pxToDp((i) * 36 + 40)
        } else {
          return pxToDp((i) * 33 + 36.5)
        }
      }
    }
  }
  /**未完成节点的时间轴第一段长度 */
  const myUnFinishMarTop = (index: number) => {
    const len = nodeStateList.length
    // console.log('len',len)
    // console.log('index',index)
    const h =  Dimensions.get("window").height + ExtraDimensions.getStatusBarHeight() 
    const w = Dimensions.get("window").width
    console.log(w, h)
    if (index === len) {
      const length = nodeStateList[len - 1].data.length
      if (Platform.OS === 'ios') {
        return length * 33 + 31
      } else {
        if (w === 360 && h <= 760) {
          return length * 33 + 50
        } else {
          return length * 33 + 36
        }
      }
      // return length * 33 + 31
    } else {
      if (Platform.OS === 'ios') {
        return 76
      } else {

        if (w === 360 && h <= 760) {
          return 80
        } else {
          return 75
        }
      }
    }
  }
  /**获取未通过的节点 的颜色 2 红色 1 蓝色 */
  const unFinishNode = (item: any, index: number) => {
    const len = item.data.length - 1
    const i = preceStyle(item.data[len].status, index)
    return i
  }

  const preceStyle = (index: any, type: any) => {
    /**后面的节点 */
    if (type > 2) {
      /**不通过 */
      if (index === 2) {
        return 2
      }
      return 1
    }
    /**前3个节点 */
    if (index === 1 || index === 4 || index === 5 || index === 7 || index === 8 || index === 9 || index === 11) {
      return 1
    } else if (index === 'no') {
      return 2
    }
    return 2
  }
  return (
    <View >
      {
        getAllList.map((item, index) => (

          <View key={index} style={styles.container}>
            {
              item.status && item.status === 'no' ?
                <>
                  <View style={[styles.greyLine, { height: pxToDp(myUnFinishMarTop(index)) }]}></View>
                  <View style={styles.grey}>
                    <View style={styles.greyIn}></View>
                  </View>
                </> :
                <>
                  {
                    unFinishNode(item, index) === 1 ?
                      <>
                        <View style={[styles.blueLine, { height: myMarginTop(index - 1) }]}></View>
                        <View style={styles.blue}>
                          <View style={styles.blueIn}></View>
                        </View>
                      </> :
                      <>
                        <View style={[styles.blueLine, { height: myMarginTop(index - 1) }]}></View>
                        <View style={styles.red}>
                          <View style={styles.redIn}></View>
                        </View>
                      </>
                  }

                </>
            }
          </View>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  blue: {
    width: pxToDp(20),
    height: pxToDp(20),
    borderRadius: pxToDp(10),
    backgroundColor: "rgba(90,200,250,0.3)",
    position: "relative",
  },
  blueIn: {
    width: pxToDp(12),
    height: pxToDp(12),
    borderRadius: pxToDp(6),
    backgroundColor: "#5AC8FA",
    position: "absolute",
    top: pxToDp(4),
    left: pxToDp(4),
    zIndex: 99
  },
  blueLine: {
    width: pxToDp(4),
    height: pxToDp(200),
    backgroundColor: "#5AC8FA",
    borderRadius: pxToDp(2)
  },

  grey: {
    width: pxToDp(20),
    height: pxToDp(20),
    borderRadius: pxToDp(10),
    backgroundColor: "rgba(144,144,144,0.3)",
    position: "relative",
  },
  greyIn: {
    width: pxToDp(12),
    height: pxToDp(12),
    borderRadius: pxToDp(6),
    backgroundColor: "#909090",
    position: "absolute",
    top: pxToDp(4),
    left: pxToDp(4),
    zIndex: 99
  },
  greyLine: {
    width: pxToDp(4),
    height: pxToDp(57),
    backgroundColor: "#F8F8F8",
    borderRadius: pxToDp(2)
  },

  red: {
    width: pxToDp(20),
    height: pxToDp(20),
    borderRadius: pxToDp(10),
    backgroundColor: "rgba(255,45,85,0.3)",
    position: "relative",
  },
  redIn: {
    width: pxToDp(12),
    height: pxToDp(12),
    borderRadius: pxToDp(6),
    backgroundColor: "#FF2D55",
    position: "absolute",
    top: pxToDp(4),
    left: pxToDp(4),
    zIndex: 99
  },
})
