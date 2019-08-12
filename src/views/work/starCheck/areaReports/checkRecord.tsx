import React from "react";

import { View, Text, Platform } from "react-native";
import { BackGroundHeader } from "../../../../components/headerCmp/backgroundHeader";
import pxToDp from "../../../../utils/fixcss";

export default class CheckRecord extends React.Component<any>{
  

  static navigationOptions = {
    header: null,
  }

  render (){
    const {navigation} = this.props
    return(
      <View>
        <BackGroundHeader 
            title={'检查记录'} 
            eggHandleBack={() => {navigation.goBack()}}
            bgColor={'#007aff'}
            fontColor={"#fff"}
            imgUrl={require("../../../../images/backicon.png")}/>
      </View>
    )
  }
}

