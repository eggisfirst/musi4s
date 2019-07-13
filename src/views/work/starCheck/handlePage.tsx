import React from "react";
import { View,Text, Platform, StyleSheet } from "react-native";
import pxToDp from "../../../utils/fixcss";
import CheckHeader from '../../../components/workCmp/starCheck/CheckHeader';
import { Sort } from '../../../components/filterCmp/sortCmp';
import { ModalCmp } from '../../../components/filterCmp/modalCmp';

export default class HandelPage extends React.Component<any>{
  static navigationOptions = {
    header: null,
  }
 render (){
   const {navigation} = this.props
  return(
    <View>
      <CheckHeader  eggHandleBack={() => {navigation.goBack()}}
                    eggHandleSearch={() => {navigation.push("SearchPage")}} />
      <View style={{position:"relative",zIndex:9999999}}>
      <Sort handleSort={() => {console.log(111)}}/>
      </View>
      <View style={{borderTopWidth:1,borderColor:"#e1e1e1",width:"100%",height:80}}>
        <Text>123</Text>
      </View>
    </View>
   )
 }
}

const styles = StyleSheet.create({
  headerContainer: {
    // paddingLeft: pxToDp(30),
    // marginTop:pxToDp(53)
  }
})