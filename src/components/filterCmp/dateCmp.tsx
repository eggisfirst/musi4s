import { StyleSheet, View, TouchableHighlight, Text, Dimensions, TouchableOpacity } from "react-native";
import pxToDp from "../../utils/fixcss";
import React, { useState } from "react";
import DatePicker from "react-native-date-picker";

interface IProps {
  date: Date
  showPickerDate: boolean
  cancle: () => void
  comfirm: (date:Date) => void
}


export const DatePickerCmp: React.FC<IProps> = (props:IProps) => {
  const [pickerDate, setPickerDate] = useState(props.date)

  return (
    <View>
      {
        props.showPickerDate && (
            <View style={styles.dateWrapper}>  
              <View style={styles.btnWrapper}>
                <TouchableOpacity onPress={() => {props.cancle()}}>
                  <Text style={styles.btn}>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {props.comfirm(pickerDate)}}>
                  <Text style={styles.btn}>确定</Text>
                </TouchableOpacity>
              </View>
              <DatePicker
                locale={"zh_CN"}
                maximumDate={new Date()}
                mode={'date'}
                style={styles.datePicker}
                date={pickerDate}
                onDateChange={time => {setPickerDate(time)}}
              />
           </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  dateWrapper: {
    position:"absolute",
    bottom:0,
    left:0,
    top:0,
    right:0,
    zIndex:9999, 
    width: '100%', 
    height: Dimensions.get('screen').height,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  btnWrapper: {
    backgroundColor:"#fff",
    position:"absolute",
    bottom: pxToDp(400),
    left:0,
    width:pxToDp(750),
    height:pxToDp(100),
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    zIndex:10000,
  },
  datePicker: {
    backgroundColor:"#fff",
    position:"absolute",
    bottom: 0,
    left:0,
    width:pxToDp(750),
    zIndex: 9999,
    height:pxToDp(500),
    paddingLeft: pxToDp(80)
  },
  btn: {
    width:pxToDp(150),
    height:pxToDp(80),
    lineHeight: pxToDp(80),
    color: "#007aff",
    fontSize: pxToDp(36),
    textAlign:"center"
  }
})
