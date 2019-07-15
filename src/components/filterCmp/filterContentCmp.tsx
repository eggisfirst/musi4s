import { View, Text, StyleSheet, TouchableOpacity, Button, Platform, Dimensions, Alert, AlertIOS } from "react-native";
import React, { useState } from "react";
import pxToDp from "../../utils/fixcss";
import { DatePickerCmp } from "./dateCmp";
import { format } from '../../utils/index';

enum picker {
  startPicker,
  endPicker
}
interface IProps {
  filterList: Array<string>
  finterActiveIndex: number
  handleFilter: (i: number) => void
  handleReset: () => void
  handleComfirm: () => void
  startDate: Date
  setStartDate: (date: Date) => void
  endDate: Date
  setEndtDate: (date: Date) => void
}

export const FilterContentCmp: React.FC<IProps> = (IProps) => {
  const {filterList,finterActiveIndex, handleFilter, handleReset, handleComfirm} = IProps
  const [startStatus, setStartStatus] = useState(false)
  const [endStatus, setEndStatus] = useState(false)

  //选择星级
  const handleClick = (i:number) => {
    handleFilter(i)
  }
  //时间选择确定按钮
  const startComfirm = (date:Date) => {
    setStartStatus(!startStatus)
    if(new Date(IProps.endDate).getTime() - new Date(date).getTime() < 0) {
      Alert.alert(
        '提示',
        '结束日不能小于起始日',
        [{text: '确定'}, ],
        { cancelable: false }
     );
     return
    }
    IProps.setStartDate(date)
  }
  //时间选择取消
  const startCancle = () => {
    setStartStatus(!startStatus)
  }

  const endComfirm = (date:Date) => {
    setEndStatus(!endStatus)
    if(new Date(date).getTime() - new Date(IProps.startDate).getTime() < 0) {
      Alert.alert(
        '提示',
        '结束日不能小于起始日',
        [{text: '确定'}, ],
        { cancelable: false }
     );
     return
    }
    IProps.setEndtDate(date)
  }
  //时间选择取消
  const endCancle = () => {
    setEndStatus(!endStatus)
  }
  //获取时间间隔
  const getRestDate = (end:Date,start:Date) => {
    const restDate = new Date(end).getTime() - new Date(start).getTime()
    const day =  Math.floor(restDate/(24*3600*1000))
    return day + 1
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.modalStyle}>
          <View>
            <Text style={styles.textStyle}>时间</Text>
            <View style={styles.datePickerContainer}>
              <TouchableOpacity activeOpacity={0.6} onPress={() => {setStartStatus(!startStatus)}}>
                <Text style={styles.dateText}>起始日</Text>
                <Text style={styles.date}>{format(IProps.startDate)}</Text>
              </TouchableOpacity>
              <Text  style={styles.dateText}>至</Text>
              <TouchableOpacity  activeOpacity={0.6} onPress={() => {setEndStatus(!endStatus)}}>
                <Text style={styles.dateText}>结束日</Text>
                <Text style={styles.date}>{format(IProps.endDate)}</Text>
              </TouchableOpacity>
              <Text style={styles.dateText}>共{getRestDate(IProps.endDate, IProps.startDate)}日</Text>
            </View>
          </View>
          <View style={styles.star}>
            <Text style={styles.textStyle}>认证星级</Text>
            <View style={styles.btnList}>
              {
                filterList.map((item, i) => (
                  <TouchableOpacity activeOpacity={0.6} key={item} onPress={() => {handleClick(i)}}> 
                    <View style={finterActiveIndex === i? styles.starItemActive:styles.starItem}>
                      <Text style={finterActiveIndex === i? styles.btnColorActive:styles.btnColor}>{item}</Text>
                    </View>
                  </TouchableOpacity>
                )) 
              }
            </View>
          </View>
          <View style={styles.footerBtn}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => {handleReset()}}> 
              <Text style={styles.reset}>重置</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={() => {handleComfirm()}}> 
              <Text style={styles.comfirm}>完成</Text>
            </TouchableOpacity>
          </View>
      </View>
     {
        startStatus && 
        <View style={styles.datePickerMask}>
          <DatePickerCmp  date={IProps.startDate} 
                          showPickerDate={startStatus}
                          comfirm={startComfirm}
                          cancle={startCancle}/>
        </View>
     }
    {
      endStatus && 
      <View style={styles.datePickerMask}>
        <DatePickerCmp  date={IProps.endDate} 
                        showPickerDate={endStatus}
                        comfirm={endComfirm}
                        cancle={endCancle}/>
      </View>
     }
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0, 
    zIndex:999, 
    width: '100%', 
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
    position: "relative",
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