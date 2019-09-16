import { View, Text, Modal, StyleSheet, Dimensions, Image, TouchableOpacity, Animated, Easing, TextInput, Alert } from "react-native";
import React, { useState } from 'react'
import pxToDp from "../utils/fixcss";
import { AlertBtnTypes, BtnTitle } from "../utils/enum";
import { getStar } from "../utils";

interface IProps {
  title: BtnTitle
  comfirm?: AlertBtnTypes
  sendBack?: AlertBtnTypes
  cancle?: AlertBtnTypes
  handleAlert?: (status: AlertBtnTypes, val?: string) => void
  boxValue?: string
  data?: any
}


export const AlertCmp: React.FC<IProps> = (props: IProps) => {
  const [value, setValue] = useState('')
  const handleClick = (status: AlertBtnTypes) => {
    if (!props.handleAlert) {
      return
    }
    switch (status) {
      case AlertBtnTypes.sendBack:
        if (value) {
          props.handleAlert(AlertBtnTypes.sendBack, value)
        } else {
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
              <Image style={styles.image} source={require("../images/applying.png")} />
              <Text style={styles.titleStyle}>{BtnTitle.applying}</Text>
              <Text style={styles.textStyle}>是否确定受理，{props.data.username}供应商《{getStar(props.data.approveLevel)}认证》申请？</Text>
            </>
          )
        }
        {
          props.title === BtnTitle.sendBack && (
            <>
              <Image style={styles.image} source={require("../images/sendback.png")} />
              <Text style={styles.titleStyle}>{BtnTitle.sendBack}</Text>
              <TextInput
                style={styles.input}
                maxLength={30}
                value={value}
                onChangeText={(text) => { setValue(text) }}
                autoFocus={true}
                placeholder="请输入退回原因"
                returnKeyType="done"
              />
            </>
          )
        }
        {
          props.title === BtnTitle.tips && (
            <>
              <View style={styles.tipsBox} ></View>
              <Text style={styles.titleStyle}>{BtnTitle.tips}</Text>
              <Text style={styles.textStyle2}>{props.boxValue}</Text>
            </>
          )
        }
        <View style={styles.btn}>
          <>
            {
              props.cancle === AlertBtnTypes.cancle && (
                <TouchableOpacity activeOpacity={0.6}
                  onPress={() => { handleClick(AlertBtnTypes.cancle) }}
                  style={[{ borderColor: "#e1e1e1", borderRightWidth: pxToDp(1) }, styles.btnWrapper]}>
                  <Text style={styles.cancle} >{AlertBtnTypes.cancle}</Text>
                </TouchableOpacity>
              )
            }
            {
              props.comfirm === AlertBtnTypes.comfirm && (
                <TouchableOpacity
                  style={styles.btnWrapper}
                  activeOpacity={0.6}
                  onPress={() => { handleClick(AlertBtnTypes.comfirm) }}>
                  <Text style={styles.comfirm} >{AlertBtnTypes.comfirm}</Text>
                </TouchableOpacity>
              )
            }
            {
              props.sendBack === AlertBtnTypes.sendBack && (
                <TouchableOpacity
                  style={styles.btnWrapper}
                  activeOpacity={0.6}
                  onPress={() => { handleClick(AlertBtnTypes.sendBack) }}>
                  <Text style={styles.comfirm}>{AlertBtnTypes.sendBack}</Text>
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    width: '100%',
    height: Dimensions.get('screen').height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: "flex",
    flexDirection: 'row',
    paddingTop: "60%",
    // alignItems:"center",
    justifyContent: "center",
  },
  alertBox: {
    width: pxToDp(560),
    height: pxToDp(370),
    backgroundColor: "#fff",
    borderRadius: pxToDp(10),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  tipsBox: {
    width: pxToDp(52),
    height: pxToDp(52),
  },

  image: {
    width: pxToDp(52),
    height: pxToDp(52),
    marginTop: pxToDp(20),
  },
  titleStyle: {
    color: "#363636",
    fontSize: pxToDp(38),
    fontWeight: "bold",

  },
  textStyle: {
    color: "#666",
    fontSize: pxToDp(28),
    width: pxToDp(380),
    textAlign: "center",
    lineHeight: pxToDp(44)
  },
  textStyle2: {
    color: "#666",
    fontSize: pxToDp(28),
    width: pxToDp(450),
    textAlign: "center",
    lineHeight: pxToDp(44)
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: pxToDp(100),
    borderColor: "#e1e1e1",
    borderTopWidth: pxToDp(1),
  },
  cancle: {
    color: "#909090",
    fontSize: pxToDp(36),
    // lineHeight: pxToDp(100),
    width: pxToDp(280),
    textAlign: "center",
  },
  comfirm: {
    color: "#363636",
    fontSize: pxToDp(36),
    // lineHeight: pxToDp(100),
    width: pxToDp(280),
    textAlign: "center",
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
  },


  btnWrapper: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // height: pxToDp(100),
    // backgroundColor: "#fff"
  }
})