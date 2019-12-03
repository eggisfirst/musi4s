import React from "react";
import { View, StyleSheet,Text } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { HeaderCmp } from "../../../components/headerCmp/headerCmp";



export default class WorkScreen extends React.Component<any>{
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <HeaderCmp title={'网络商学院'}
          eggHandleBack={() => { this.props.navigation.goBack() }}
        />
        <Text>123</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    backgroundColor: "#f8f8f8"
  },
})
