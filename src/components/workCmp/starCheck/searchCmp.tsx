

import React from "react";
import { View,Text, Platform, Image, StyleSheet, TouchableOpacity } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { StarCheckTypes, SearchTypes } from "../../../utils/enum";

interface IProps {
  eggHandleSearch: (type: SearchTypes) => void
  type: SearchTypes
}

export const SearchCmp: React.FC<IProps> = (props) => {
    return(
      <TouchableOpacity activeOpacity={0.8} onPress={() => {props.eggHandleSearch(props.type)}}>
        <View style={styles.rightContainer}>
          <Image  style={styles.search}
                  source={require("../../../images/work/starCheck/search.png")} />
          <Text style={styles.textStyle}>经销商</Text>
        </View>
      </TouchableOpacity>
     )
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
