import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import pxToDp from '../../../utils/fixcss';
import { TouchableOpacity } from "react-native-gesture-handler";
import { TimerShaft } from './ timerShaft';
import { ApproveNode } from "../../../utils/enum";

interface IProps {
  handleCloseProcessBox: () => void
}
export default class ProcessBox extends React.Component<IProps>{
 


 render (){
  const nodeList = [
    ApproveNode.agency,
    ApproveNode.area,
    ApproveNode.fourS,
    ApproveNode.saleCenter,
    ApproveNode.fourS,
    ApproveNode.marketCenter,
    ApproveNode.president,
    ApproveNode.headquarters
  ]
  const list = [
    {
      name:  ApproveNode.agency,
      data: [
        {
          time: "2018.05.15",
          remark: "已申请"
        }
      ]
    },
    {
      name:  ApproveNode.area,
      data: [
        {
          time: "2018.05.15",
          remark: "已申请"
        },
        {
          time: "2018.05.15",
          remark: "已通过"
        }
      ]
    }
  ]
  const myMarginTop = (index: number) => {
    if(index === 0) {
      return pxToDp(38)
    }
    if(list[index]) {
      const i = list[index].data.length
      return pxToDp(57 + i*20)
    }
  }
  return(
    <View style={styles.mask}>
      <View style={styles.container}>
        <Text style={styles.title}>进度--认证中</Text>

        <ScrollView style={styles.content}>
          <View style={styles.linePosition}>
            <TimerShaft />
          </View>
          {
            nodeList.map((item, index) => (
              <View style={{marginTop: myMarginTop(index)}} key={index} >
                <Text style={styles.lefttext} >{item}</Text>
              </View>
            ))
          }
          <View style={styles.rightBox}>
            {
              list.map((item, index) => (
                <View style={{marginTop: myMarginTop(index)}} key={index}>
                  <View style={styles.rightStatus} >
                    {
                      item.data && item.data.map((el, i) => (
                        <Text key={i} style={styles.rightText}>{el.time}{el.remark}</Text>
                      ))
                    }
                  
                  </View>
                </View>
              ))
            }
           
          </View>

        </ScrollView>

        <TouchableOpacity style={styles.botBtn} activeOpacity={0.6}
                          onPress={() => {this.props.handleCloseProcessBox()}}>
          <Text style={styles.botTxt}>知道了</Text>
        </TouchableOpacity>
      </View>
    </View>
   )
 }
}

const styles = StyleSheet.create({
  mask: {
    position: "absolute",
    top:0,
    left:0,
    right:0,
    bottom:0, 
    zIndex:999999, 
    width: pxToDp(750), 
    height: Dimensions.get('screen').height,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    width: pxToDp(620),
    height: pxToDp(794),
    backgroundColor: "#fff",
    borderRadius: pxToDp(10),
    position: "absolute",
    left: pxToDp(65),
    top: pxToDp(279),
  },
  title: {
    lineHeight: pxToDp(80),
    backgroundColor: "#007aff",
    width: "100%",
    fontSize: pxToDp(38),
    fontWeight:"bold",
    color: "#fff",
    textAlign: "center"
  },
  content: {
    width:"100%",
    height: pxToDp(640),
    paddingLeft: pxToDp(21),
    paddingRight: pxToDp(21),
    // paddingTop: pxToDp(40),
    // paddingBottom: pxToDp(150),
  
  },
  botBtn: {
    width:"100%",
    height: pxToDp(99),
    borderTopWidth: pxToDp(1),
    borderTopColor: "#e1e1e1",
  },
  botTxt: {
    lineHeight: pxToDp(99),
    color:"#007aff",
    fontSize: pxToDp(36),
    textAlign:"center"
  },
  linePosition: {
    position: "absolute",
    left: pxToDp(146),
    top: pxToDp(38)
  },

  lefttext: {
    color: "#363636",
    fontSize: pxToDp(24),
    textAlign: "right",
    width: pxToDp(140),
    paddingRight: pxToDp(20),
    fontWeight: "500"
  },

  rightBox: {
    position: "absolute",
    top: 0,
    left: pxToDp(182)
  },
  rightStatus: {
    width: pxToDp(400),
    borderWidth: pxToDp(1),
    borderColor: "#e1e1e1",
    borderTopRightRadius: pxToDp(12),
    borderBottomRightRadius: pxToDp(12),
    borderBottomLeftRadius: pxToDp(12),
    lineHeight: pxToDp(40)
  },
  rightText: {
    color: "#666",
    fontSize: pxToDp(24),
    paddingLeft: pxToDp(20)
  }

})
