import { View,Text, Modal, StyleSheet, Dimensions, Image, TouchableOpacity, Animated, Easing, TextInput, Alert } from "react-native";
import React, { useState } from 'react'
import pxToDp from "../utils/fixcss";
import { AlertBtnTypes, BtnTitle } from "../utils/enum";

interface IProps {
  title: BtnTitle
  comfirm?:AlertBtnTypes
  sendBack?:AlertBtnTypes
  cancle?:AlertBtnTypes
  handleAlert?: ( status:AlertBtnTypes,val?:string) => void 
}


export const AlertCmp: React.FC<IProps> = (props:IProps) => {
  const [value, setValue] = useState('')
  const handleClick = (status:AlertBtnTypes) => {
    if(!props.handleAlert) {
      return
    }
    switch (status) {
      case AlertBtnTypes.sendBack:
        if(value) {
          props.handleAlert(AlertBtnTypes.sendBack,value)
        }else {
          Alert.alert('请输入退回原因')
        }
        break;
      case AlertBtnTypes.cancle:
        props.handleAlert(AlertBtnTypes.cancle)
        break;
      case AlertBtnTypes.comfirm:
        props.handleAlert(AlertBtnTypes.comfirm)
        break;
    }

   
   
  }
  return (
    <View style={styles.container}>
      <View style={styles.alertBox}>
        {
          props.title === BtnTitle.applying && (
            <>
              <Image style={styles.image} source={require("../images/applying.png")}/>
              <Text style={styles.titleStyle}>受理</Text>
              <Text style={styles.textStyle}>是否确定受理，XX供应商</Text>
              <Text style={styles.textStyle}>《一星认证》申请？</Text>
            </>
          )
        }
        {
          props.title === BtnTitle.sendBack && (
            <>
              <Image style={styles.image} source={require("../images/sendback.png")}/>
              <Text style={styles.titleStyle}>退回</Text>
              <TextInput
                style={styles.input}
                maxLength={30}
                value={value}
                onChangeText={(text) => {setValue(text)}}
                autoFocus={true}
                placeholder="请输入退回原因"
                returnKeyType="done"
              />
            </>
          )
        }
        <View style={styles.btn}>
          <>
            {
              props.cancle === AlertBtnTypes.cancle && (
                <TouchableOpacity activeOpacity={1} style={{borderColor: "#e1e1e1",borderRightWidth:pxToDp(1)}}>
                                  <Text style={styles.cancle} onPress={() => {handleClick(AlertBtnTypes.cancle)}}>取消</Text>
                                  </TouchableOpacity>
              )
            }
            {
              props.comfirm === AlertBtnTypes.comfirm && (
                <TouchableOpacity activeOpacity={1}>
                  <Text style={styles.comfirm} onPress={() => {handleClick(AlertBtnTypes.comfirm)}}>确定</Text>
                </TouchableOpacity>
              )
            }
            {
              props.sendBack === AlertBtnTypes.sendBack && (
                <TouchableOpacity activeOpacity={1}>
                  <Text style={styles.comfirm} onPress={() => {handleClick(AlertBtnTypes.sendBack)}}>退回</Text>
                </TouchableOpacity>
              )
            }
          </>
          
        </View>
      </View>
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
    zIndex:9999, 
    width: '100%', 
    height: Dimensions.get('screen').height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: "flex",
    alignItems:"center",
    justifyContent:"center"
  },
  alertBox: {
    width: pxToDp(560),
    height: pxToDp(370),
    backgroundColor: "#fff",
    borderRadius: pxToDp(10),
    display: "flex",
    alignItems:"center",
    justifyContent:"space-between"
  },
  image: {
    width: pxToDp(52),
    height: pxToDp(52),
    marginTop: pxToDp(20),
  },
  titleStyle: {
    color: "#363636",
    fontSize: pxToDp(38),
    fontWeight: "bold"
  },
  textStyle: {
    color: "#666",
    fontSize: pxToDp(28),
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: pxToDp(100),
    borderColor: "#e1e1e1",
    borderTopWidth: pxToDp(1)
  },
  cancle: {
    color:"#909090",
    fontSize: pxToDp(36),
    lineHeight: pxToDp(100),
    width: pxToDp(280),
    textAlign:"center",
  },
  comfirm: {
    color:"#363636",
    fontSize: pxToDp(36),
    lineHeight: pxToDp(100),
    width: pxToDp(280),
    textAlign:"center",
  },
  input: {
    backgroundColor: "#efeff4",
    width: pxToDp(520),
    height: pxToDp(80),
    color: "#999",
    fontSize: pxToDp(28),
    borderRadius: pxToDp(10),
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
  }
})