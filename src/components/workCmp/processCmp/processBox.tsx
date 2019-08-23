import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import pxToDp from '../../../utils/fixcss';
import { TouchableOpacity } from "react-native-gesture-handler";
import { TimerShaft } from './ timerShaft';
import { ApproveNode } from "../../../utils/enum";
import { approveBoxLeftInfo, getApproveBoxState, getApproveOtherBoxState } from "../../../utils";

interface IProps {
  handleCloseProcessBox: () => void
  rightData: any
  leftData: any
}
interface IState {
  nodeList: Array<any>
  nodeStateList: Array<any>
}
export default class ProcessBox extends React.Component<IProps,IState>{
  state:IState = {
    nodeList: [],
    nodeStateList:[]
  }
  /**获取左边固定的节点 */
  getNodeList = () => {
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
    this.setState({
      nodeList
    })
  }
  /**获取接口返回的数据 */
  getNodeState = () => {
    const nodeStateList = [
      {
        data: [
          {
            time: "2018.01.15",
            remark: "已申请",
            status: true
          }
        ]
      },
      {
        data: [
          {
            time: "2018.02.15",
            remark: "已申请",
            status: true
          },
          {
            time: "2018.02.15",
            remark: "已申请",
            status: true
          },
        ]
      },
      {
        data: [
          {
            time: "2018.02.15",
            remark: "已申请",
            status: true
          },
          {
            time: "2018.02.15",
            remark: "已申请",
            status: false
          },
        ]
      },
      
    ]
    this.setState({
      nodeStateList
    })
  }
  /**获取完整的包括未到节点的时间轴 */
  getAllList = () => {
    if(this.state.nodeList.length === this.props.rightData.length) {
      const getAllList = this.props.rightData
      return getAllList
    }
    let getAllList:any = []
    this.state.nodeList.map((item, index) => {
      if(this.props.rightData[index] && this.props.rightData[index].data) {
        getAllList.push({data:this.props.rightData[index].data})
      }else {
        getAllList.push({status: 'no'})
      }
    })
    return getAllList
  }
  componentDidMount() {
    this.getNodeList()
    this.getNodeState()
  }

 render (){
  /**获取每个节点的margintop */
  const myMarginTop = (index: number) => {
    if(index === -1) {
      return pxToDp(36)
    }
    if(this.props.rightData[index]) {
      const i = this.props.rightData[index].data.length
      return pxToDp( (i)*40)
    }else {
      return pxToDp(56)
    }
  }
  /**最后一个元素底部加距离 */
  const myLastBottom = (type: string) => {
    if(type === ApproveNode.headquarters) {
      return pxToDp(93)
    }
  }
  /**
   * 获取接口数据status对应的数据
   * @param index 状态status
   * @param type 前面三个节点 <=2,后面的节点>2
   */
  const preceStyle = (index: any,type:any) => {
    /**后面的节点 */
    if(type > 2) {
      /**不通过 */
      if(index === 2) {
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
  /**
   * 获取弹框标题
   * @param list 
   */
  const title = (list:any) => {
    const len = list.length
    const lastlen = list[len - 1].data.length
    const status = list[len - 1].data[lastlen - 1].status
    const title = preceStyle(status, len - 1)
    if(len > 3) {
      if(status === 2) {
        return '认证失败'
      }else if(status === 3) {
        return '认证成功'
      }
      return '认证中'
    }else {
      if(title === 1) {
        return '认证中'
      }
      return '认证失败'
    }
  }
  
  return(
    <View style={styles.mask}>
      <View style={styles.container}>
        <Text style={styles.title}>进度--{title(this.props.rightData)}</Text>

        <ScrollView style={styles.content}>
          <View style={styles.linePosition}>
            <TimerShaft getAllList={this.getAllList()} nodeStateList={this.props.rightData}/>
          </View>
          {
            this.state.nodeList.map((item, index) => (
              <View style={{marginTop: myMarginTop(index - 1)}} key={index} >
                <Text style={[styles.lefttext,{marginBottom: myLastBottom(item)}]} >{item}</Text>
              </View>
            ))
          }
          <View style={styles.rightBox}>
            {
              this.props.rightData.map((item:any, index:number) => (
                <View style={{marginTop: pxToDp(40)}} key={index}>
                  <View style={styles.rightStatus} >
                    {
                      item.data && item.data.map((el:any, i:number) => (
                        <View key={i}>
                          {
                            preceStyle(el.status, index) === 1? 
                            <Text style={styles.rightText}>{el.createTime} {index <=2? getApproveBoxState(el.status):getApproveOtherBoxState(el.status)}</Text>
                            : 
                            <Text style={styles.rightText}>{el.createTime} <Text style={styles.rightTextRed} onPress={() => {console.log(index)}}> {index <=2? getApproveBoxState(el.status):getApproveOtherBoxState(el.status)}</Text>
                            </Text>
                          }
                           {
                             preceStyle(el.status, index) === 2? 
                              <Text style={styles.rightText}>备注:{el.remark}</Text> : <></>
                            }
                        </View>
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
    fontWeight: "500",
    lineHeight:pxToDp(40)
  },

  rightBox: {
    position: "absolute",
    top: 0,
    left: pxToDp(182),
  },
  rightStatus: {
    width: pxToDp(400),
    borderWidth: pxToDp(1),
    borderColor: "#e1e1e1",
    borderTopRightRadius: pxToDp(12),
    borderBottomRightRadius: pxToDp(12),
    borderBottomLeftRadius: pxToDp(12),
  },
  rightText: {
    color: "#666",
    fontSize: pxToDp(24),
    paddingLeft: pxToDp(20),
    lineHeight: pxToDp(40)
  },
  rightTextRed: {
    color: "#FF2D55",
    fontSize:pxToDp(24),
    lineHeight: pxToDp(40),
    textDecorationLine:'underline'
  }

})
