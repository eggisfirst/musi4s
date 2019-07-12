import React from "react";
import { View, Text, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      <HeaderCmp  title="待受理" 
                  handleSearch={() => {eggHandleSearch()}}
                  handleBack={() => {eggHandleBack()}}/>
      {this.props.children}
    </View>
   )
 }
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor:"#e1e1e1",
    borderWidth: pxToDp(1),
    paddingBottom: pxToDp(32)
  }
})