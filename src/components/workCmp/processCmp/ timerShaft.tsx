import React from "react";
import { View, Text, StyleSheet } from "react-native";
import pxToDp from "../../../utils/fixcss";

interface IProps {
  getAllList: Array<any>   
  nodeStateList: Array<any>
}


export const TimerShaft:React.FC<IProps> = ({getAllList, nodeStateList}) => {
  /**获取每段时间轴的长度 */
  const myMarginTop = (index: number) => {
    if(index === -1) {
      return
    }
    if(getAllList[index].data.length) {
      const i = getAllList[index].data.length
      return pxToDp((i)*38 + 27)
    }
  }
  /**未完成节点的时间轴第一段长度 */
  const myUnFinishMarTop = (index: number) => {
    const len = nodeStateList.length
    if(index === len) {
      const length = nodeStateList[len - 1].data.length
      return pxToDp(length*38 + 31)
    }else {
      return pxToDp(76)
    }
  }
  /**获取未通过的节点 */
  const unFinishNode = (item: any,index: number) => {
    for (const key of item.data) {
      if(!key.status) {
        return false
      }
    }
   
  }
  return(
    <View >
      {
        getAllList.map((item, index) => (
          
          <View key={index} style={styles.container}>
            {
              item.status && item.status === 'no'?
              <>
                <View style={[styles.greyLine,{height: myUnFinishMarTop(index)}]}></View>
                <View style={styles.grey}>
                  <View style={styles.greyIn}></View>
                </View>
              </> : 
              <>
                {
                  unFinishNode(item,index) !== false? 
                  <>
                    <View style={[styles.blueLine,{height: myMarginTop(index - 1)}]}></View>
                    <View style={styles.blue}>
                      <View style={styles.blueIn}></View>
                    </View>
                  </> : 
                  <>
                    <View style={[styles.blueLine,{height: myMarginTop(index - 1)}]}></View>
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
  container:{
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
  greyIn:{ 
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
