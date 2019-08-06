import React from "react";

import { View, Text, Platform, StatusBar, StyleSheet } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { HeaderCmp } from '../../../components/workCmp/starCheck/headerCmp';


export default class GradePage extends React.Component<any>{
  static navigationOptions = {
    header: null
  }
  eggHandleBack = () => {

  }
  render (){
    const {navigation} = this.props
    return(
      <View>
        <HeaderCmp title={'五星认证评分'} eggHandleBack={() => {navigation.goBack()}}/>
        <View style={styles.sum}>
          <Text style={styles.sum_title}>广州马会家居凯奇门店</Text>
          <Text style={styles.sum_text}>共<Text style={styles.sum_blue}>18</Text>项 已评<Text style={styles.sum_green}>5</Text>项 剩余 <Text style={styles.sum_red}>14</Text>项未评</Text>
        </View>
        
      </View>
      )
  }
}

const styles = StyleSheet.create({
  sum: {
    width: pxToDp(439),
    // height: pxToDp(80),
    backgroundColor: "#f8f8f8",
    textShadowColor:`0px ${pxToDp(4)} ${pxToDp(10)} 0px rgba(225,228,230,1)`,
    borderTopRightRadius: pxToDp(10),
    borderBottomRightRadius: pxToDp(40),
    paddingLeft: pxToDp(31),
    paddingTop: pxToDp(8),
    paddingBottom: pxToDp(8)
  },
  sum_title: {
    fontSize: pxToDp(30),
    color: "#363636",
    lineHeight: pxToDp(40)
  },
  sum_text: {
    fontSize:pxToDp(24),
    color: "#909090",
  },
  sum_blue: {
    color: "#007AFF"
  },
  sum_green: {
    color: "#4CD964"
  },
  sum_red: {
    color: "#FF2D55"
  }
})
