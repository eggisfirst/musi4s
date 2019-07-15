import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import  HeaderCmp  from "./headerCmp"
import pxToDp from "../../../utils/fixcss";

interface IProps {
  eggHandleSearch: () => void
  eggHandleBack: () => void
}

export default class CheckHeader extends React.Component<IProps>{
 render (){
  const {eggHandleSearch, eggHandleBack} = this.props
  return(
    <View>
      <HeaderCmp  title="待受理" 
                  handleBack={() => {eggHandleBack()}}>
                  <TouchableOpacity onPress={() => {eggHandleSearch()}}>
                    <View style={styles.rightContainer}>
                      <Image  style={styles.search}
                              source={require("../../../images/work/starCheck/search.png")} />
                      <Text style={styles.textStyle}>经销商</Text>
                    </View>
                  </TouchableOpacity>
      </HeaderCmp>
    </View>
   )
 }
}

const styles = StyleSheet.create({
  rightContainer: {
    display:"flex",
    flexDirection:"row",
    width:pxToDp(180),
    height: pxToDp(60),
    borderRadius: pxToDp(30),
    backgroundColor: "#f7f7f7",
    alignItems:"center",
    paddingLeft: pxToDp(30),
    paddingRight: pxToDp(30)
  },
  search: {
    width: pxToDp(32),
    height: pxToDp(32),
    marginRight: pxToDp(9),
  },
  textStyle: {
    color: "#999",
    fontSize: pxToDp(26)
  }
})

