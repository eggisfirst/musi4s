
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import pxToDp from "../../../utils/fixcss";

interface IProps {
  toCheckRecord: () => void
  continue: () => void
  cancel: () => void
  scoreTotal: number
  deductTotal: number
  showStatus: boolean
}

export  const CheckAlert:React.FC<IProps> = (props:IProps) =>{
  return props.showStatus ? (
    <View
      style={[styles.alertContainer]}
    >
      <View
        style={styles.alertBox}
      >
        <View
          style={styles.centent}
        >
          <Image
            source={require("../../../images/work/grade/warning.png")}
            style={styles.warnningImg}
          />
          <Text style={styles.tip}>提示</Text>
          <Text style={styles.Text}>该检查得分：<Text style={styles.score}>{props.scoreTotal}分</Text>  <Text style={styles.deduct}>扣分：{props.deductTotal}分</Text></Text>
          {/* <Text style={[styles.Text, {color: '#666'}]}>注意：提交后无法修改分数</Text> */}
          <TouchableOpacity
            onPress={props.toCheckRecord}
          ><Text style={[styles.Text, {color: '#FF0718', marginTop: pxToDp(28)}]}>查看检查记录》</Text></TouchableOpacity>
        </View>
        <View
          style={styles.btnList}
        >
          <TouchableOpacity
            onPress={props.cancel}
            style={[styles.btnBox, {borderRightWidth: pxToDp(1), borderRightColor: '#ddd'}]}
          ><Text style={[styles.btn, styles.goback]}>返回修改</Text></TouchableOpacity>
          <TouchableOpacity
            onPress={props.continue}
            style={styles.btnBox}
          ><Text style={[styles.btn, styles.continue]}>继续评分</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  ) : (<View></View>)
}

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    height: Dimensions.get('screen').height,
    width: pxToDp(750),
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: pxToDp(600),
    height: pxToDp(410),
    backgroundColor: "#fff",
    borderRadius: pxToDp(10),
    display: "flex",
    alignItems:"center",
    justifyContent:"space-between"
  },
  centent: {
    alignItems: 'center',
  },
  warnningImg: {
    width: pxToDp(42),
    height: pxToDp(42),
    marginTop: pxToDp(34),
  },
  tip: {
    fontSize: pxToDp(30),
    fontWeight: '700',
    marginBottom: pxToDp(24),
    lineHeight: pxToDp(64),
  },
  Text: {
    color: '#363636',
    fontSize: pxToDp(28),
    lineHeight: pxToDp(40),
  },
  score: {
    color: '#007AFF',
  },
  deduct: {
    color: '#FF0718',
  },
  btnList: {
    flexDirection: 'row',
  },
  btnBox:{
    borderTopColor: '#ddd',
    borderTopWidth: pxToDp(1),
    width: '50%',
    height: pxToDp(102),
  },
  btn: {
    lineHeight: pxToDp(102),
    textAlign: 'center',
    fontSize: pxToDp(34),
    color: '#909090',
  },
  goback: {
    
  },
  continue: {
    color: '#007AFF',
  },
})
