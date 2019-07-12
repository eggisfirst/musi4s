import React from "react";
import { View,Text, Platform, StyleSheet } from "react-native";
import pxToDp from "../../../utils/fixcss";
import CheckHeader from '../../../components/workCmp/starCheck/CheckHeader';

export default class HandelPage extends React.Component<any>{
  static navigationOptions = {
    header: null,
  }
 render (){
   const {navigation} = this.props
  return(
    <View>
      <CheckHeader  eggHandleBack={() => {navigation.goBack()}}
                    eggHandleSearch={() => {navigation.push()}}>
        <Text style={styles.headerContainer}>全部</Text>
      </CheckHeader>
      <Text>111</Text>
    </View>
   )
 }
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingLeft: pxToDp(30),
    marginTop:pxToDp(53)
  }
})