import { View, Text, StyleSheet, TouchableOpacity, Button, Platform, Dimensions, Alert, AlertIOS } from "react-native";
import React, { useState } from "react";
import pxToDp from "../../utils/fixcss";
import { DatePickerCmp } from "./dateCmp";
import { format } from '../../utils/index';
import { connect } from "react-redux";
import * as actions from '../../store/actions/filter/rightFliter'


interface IProps {
  handleSelectStarIndex: (i: number) => void
  handleFilterActive: (statue: boolean) => void
  selectStartDate: (date: any) => void
  selectEndDate: (date: any) => void
  starList: Array<string>
  starIndex: number
  isActive: boolean
  startDate: any
  endDate: any
}

class FilterContentCmp extends React.Component<IProps> {
  state = {
    startStatus: false,
    endStatus: false
  }
  //选择星级
  handleClick = (i: number) => {
    if(this.props.starIndex === i) {
      this.props.handleSelectStarIndex(-1)
      return
    }
    this.props.handleSelectStarIndex(i)
  }
  //重置
  handleReset = () => {
    this.props.handleSelectStarIndex(-1)
  }
  //确认
  handleComfirm = () => {
    const isActive = this.props.isActive
    this.props.handleFilterActive(!isActive)
  }

  //打开起始  日期选择器
  setStartStatus = () => {
    this.setState({
      startStatus: !this.state.startStatus
    })
  }
  //打开结束  日期选择器
  setEndStatus = () => {
    this.setState({
      endStatus: !this.state.endStatus
    })
  }

   //时间选择确定按钮
  startComfirm = (date:any) => {
    this.setState({
      startStatus: !this.state.startStatus
    })
    if(date === this.props.startDate) {
      return
    }
    if(new Date(this.props.endDate).getTime() - new Date(date).getTime() < 0) {
      Alert.alert(
        '提示',
        '结束日不能小于起始日',
        [{text: '确定'}, ],
        { cancelable: false }
     );
     return
    }
    this.props.selectStartDate(date.getTime())
  }
  //时间选择取消
  startCancle = () => {
    this.setState({
      startStatus: !this.state.startStatus
    })
  }

  endComfirm = (date:any) => {
    this.setState({
      endStatus: !this.state.endStatus
    })
    if(date === this.props.endDate) {
      return
    }
    if(new Date(date).getTime() - new Date(this.props.startDate).getTime() < 0) {
      Alert.alert(
        '提示',
        '结束日不能小于起始日',
        [{text: '确定'}, ],
        { cancelable: false }
     );
     return
    }
    this.props.selectEndDate(date.getTime())
  }
  //时间选择取消
  endCancle = () => {
    this.setState({
      endStatus: !this.state.endStatus
    })
  }
  //获取时间间隔
  _getRestDate = (end:any,start:any) => {
    const restDate = new Date(end).getTime() - new Date(start).getTime()
    const day =  Math.floor(restDate/(24*3600*1000))
    return day + 1
  }
  render() {
    console.log('props', format(new Date(this.props.startDate)))


    return(
      <View style={styles.container}>
      <View style={styles.modalStyle}>
          <View>
            <Text style={styles.textStyle}>时间</Text>
            <View style={styles.datePickerContainer}>
               <TouchableOpacity activeOpacity={0.6} onPress={() => {this.setStartStatus()}}>
                 <Text style={styles.dateText}>起始日</Text>
                 <Text style={styles.date}>{format(new Date(this.props.startDate))}</Text>
               </TouchableOpacity>
               <Text  style={styles.dateText}>至</Text>
               <TouchableOpacity  activeOpacity={0.6} onPress={() => {this.setEndStatus()}}>
                 <Text style={styles.dateText}>结束日</Text>
                 <Text style={styles.date}>{format(new Date(this.props.endDate))}</Text>
               </TouchableOpacity>
               <Text style={styles.dateText}>共{this._getRestDate(this.props.endDate, this.props.startDate)}日</Text>
            </View>
          </View>

          <View style={styles.star}>
            <Text style={styles.textStyle}>认证星级</Text>
            <View style={styles.btnList}>
              {
                this.props.starList.map((item, i) => (
                  <TouchableOpacity activeOpacity={0.6} key={item} onPress={() => {this.handleClick(i)}}> 
                    <View style={this.props.starIndex === i? styles.starItemActive:styles.starItem}>
                      <Text style={this.props.starIndex === i? styles.btnColorActive:styles.btnColor}>{item}</Text>
                    </View>
                  </TouchableOpacity>
                )) 
              }
            </View>
          </View>

          <View style={styles.footerBtn}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => {this.handleReset()}}> 
              <Text style={styles.reset}>重置</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={() => {this.handleComfirm()}}> 
              <Text style={styles.comfirm}>完成</Text>
            </TouchableOpacity>
          </View>
          {
        this.state.startStatus && 
        <View style={styles.datePickerMask}>
          <DatePickerCmp  date={new Date(this.props.startDate)} 
                          showPickerDate={this.state.startStatus}
                          comfirm={this.startComfirm}
                          cancle={this.startCancle}/>
            </View>
        }
        {
          this.state.endStatus && 
          <View style={styles.datePickerMask}>
            <DatePickerCmp  date={new Date(this.props.endDate)} 
                            showPickerDate={this.state.endStatus}
                            comfirm={this.endComfirm}
                            cancle={this.endCancle}/>
          </View>
        }
      </View>
    </View>
    )
  }
}

const mapStateToProps = (state: { rightFilter: any; }) => state.rightFilter 

export default connect(mapStateToProps, actions)(FilterContentCmp)

const styles = StyleSheet.create({
  container: {
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
  modalStyle: {
    position: 'absolute',
    top:0,
    right:0,
    bottom:0, 
    zIndex:9999, 
    width: pxToDp(600), 
    height: Dimensions.get('screen').height,
    backgroundColor: '#fff',
    paddingTop: pxToDp(90),
    paddingLeft:pxToDp(33),
    paddingRight:pxToDp(6),
  },
  textStyle: {
    color:"#999",
    fontSize: pxToDp(28)
  },
  star: {
    marginTop: pxToDp(40),
  },
  btnList: {
    display:"flex",
    flexDirection:"row",
    flexWrap:"wrap",
    alignItems:"center"
  },
  starItem: {
    width: pxToDp(160),
    height: pxToDp(80),
    borderRadius: pxToDp(12),
    backgroundColor: "#f8f8f8",
    marginTop:pxToDp(20),
    marginRight: pxToDp(27)
  },
  starItemActive: {
    width: pxToDp(160),
    height: pxToDp(80),
    borderRadius: pxToDp(12),
    backgroundColor: "#b2d7ff",
    marginTop:pxToDp(20),
    marginRight: pxToDp(27)
  },
  btnColor: {
    color: "#666",
    lineHeight: pxToDp(80),
    textAlign:"center",
  },
  btnColorActive: {
    color: "#007aff",
    lineHeight: pxToDp(80),
    textAlign:"center",
  },
  footerBtn: {
    width: pxToDp(600),
    height: pxToDp(165),
    position:"absolute",
    bottom: 0,
    left:0,
    display:"flex",
    flexDirection:"row",
    alignItems:"center"
  },
  reset: {
    width: pxToDp(300),
    height:pxToDp(165),
    backgroundColor: "#b2d7ff",
    color: "#007aff",
    fontSize:pxToDp(34),
    textAlign:"center",
    lineHeight: pxToDp(165)
  },
  comfirm: {
    width: pxToDp(300),
    height:pxToDp(165),
    backgroundColor: "#007aff",
    color: "#fff",
    fontSize:pxToDp(34),
    textAlign:"center",
    lineHeight: pxToDp(165)

  },

  datePickerMask: {
    position:"absolute",
    top:0,
    right:0,
    bottom:0, 
    zIndex:9999, 
    width: pxToDp(750), 
    height: Dimensions.get('screen').height,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  datePickerContainer: {
    width: pxToDp(534),
    height: pxToDp(120),
    backgroundColor: "#f8f8f8",
    padding: pxToDp(30),
    marginTop: pxToDp(20),
    borderRadius: pxToDp(12),
    display: "flex",
    flexDirection:"row",
    alignItems:"flex-end",
    justifyContent: "space-between"
  },
  dateText: {
    color: "#999",
    fontSize: pxToDp(22),
    marginBottom: pxToDp(6)
  },
  date: {
    color: "#363636",
    fontSize: pxToDp(28),
    // marginTop: pxToDp(10),
    // lineHeight: pxToDp(28)
  }
})