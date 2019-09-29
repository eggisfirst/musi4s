import React from "react";

import { View, Text, StyleSheet, ScrollView } from "react-native";
import pxToDp from '../../utils/fixcss';
import { HeaderCmp } from '../../components/headerCmp/headerCmp';


export default class Rule extends React.Component<any> {

  static navigationOptions = {
    header: null
  }

  
  render() {
    const content = () => {
      const data = this.props.navigation.state.params.remark
      return data.split('\\n')
    }
    return (
      <>
        <HeaderCmp
          title={'检查标准'}
          eggHandleBack={() => { this.props.navigation.goBack() }}
        />
        <ScrollView style={styles.container}>
           {/* {this.props.navigation.state.params.remark || '暂无数据'} */}
           {
             content() && content().length > 0 && content().map((item : string, index: number) => (
              <Text style={styles.text} key={index}>
                {item || '暂无数据'}
              </Text>
             )) 
           }
        </ScrollView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    width: "100%",
    height: "100%",
    paddingLeft: pxToDp(53),
    paddingRight: pxToDp(53),
    paddingTop: pxToDp(31),
  },
  text: {
    fontSize: pxToDp(24),
    color: "#666",
    lineHeight: pxToDp(38),
    marginBottom: pxToDp(52)
  }
})