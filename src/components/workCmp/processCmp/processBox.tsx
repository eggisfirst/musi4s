import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import pxToDp from '../../../utils/fixcss';
import { TouchableOpacity } from "react-native-gesture-handler";

interface IProps {
  handleCloseProcessBox: () => void
}
export default class ProcessBox extends React.Component<IProps>{
 render (){
  return(
    <View style={styles.mask}>
      <View style={styles.container}>
        <Text style={styles.title}>进度--认证中</Text>

        <View style={styles.content}>
          <View style={styles.blue}>
            <View style={styles.blueIn}></View>
          </View>
          <Text>经销商</Text>

        </View>

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
    height: pxToDp(600),
    paddingLeft: pxToDp(21),
    paddingRight: pxToDp(21),
    paddingTop: pxToDp(40),
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
  blue: {
    width: pxToDp(160),
    height: pxToDp(160),
    borderRadius: pxToDp(50),
    backgroundColor: "#5AC8FA",
    opacity: 0.3,
    position: "relative",
    zIndex: 1
  },
  blueIn: {
    width: pxToDp(120),
    height: pxToDp(120),
    borderRadius: pxToDp(50),
    backgroundColor: "#5AC8FA",
    position: "absolute",
    top: pxToDp(20),
    left: pxToDp(20),
    zIndex: 99
  }

})
