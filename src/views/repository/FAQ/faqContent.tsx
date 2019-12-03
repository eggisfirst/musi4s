import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IndexModel } from "../../../request";
import { HeaderCmp } from "../../../components/headerCmp/headerCmp";
import pxToDp from "../../../utils/fixcss";
const indexModel = new IndexModel()
export default class FaqContent extends React.Component<any> {
  static navigationOptions = {
    header: null,
  }

  /**
   * 获取常见内容详情
   */
  getFAQContent = (id: string) => {
    indexModel.getFAQContent(this, id).then(res => {
      console.log(res)
    })
  }

  collectFaqNum = (id: string) => {
    indexModel.collectFaqNum(this, id).then(res => {
      console.log(res)
    })
  }
  componentDidMount() {
    const id = this.props.navigation.state.params.data.id
    this.getFAQContent(id)
    this.collectFaqNum(id)
  }

  render() {
    return (
      <View style={styles.wrapper}> 
         <HeaderCmp title={'常见问题'}
          eggHandleBack={() => { this.props.navigation.goBack() }}
        />
        <View style={styles.content}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>床垫除螨哪种工具最好？</Text>
          </View>
          <Text style={styles.text}>
          除螨用xxxxxxxx最好除螨用xxxxxxxx最好除螨用xxxxxxxx最好除螨用xxxxxxxx最好除螨用xxxxxxxx最好除螨用xxxxxxxx最好除螨用xxxxxxxx最好除螨用xxxxxxxx最好.
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
    backgroundColor: "#f8f8f8"
  },
  content: {
    width: '100%',
    height: 200,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {height: pxToDp(1), width: 0},
    shadowOpacity: 0.1,
  },
  titleBox: {
    marginLeft: pxToDp(33),
    borderBottomWidth: 1,
    borderColor: "#c1c1c1"
  },
  title: {
    lineHeight: pxToDp(40),
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(20),
    width: '100%',
    color: "#363636",
    fontSize: pxToDp(36)
  },
  text: {
    paddingLeft: pxToDp(32),
    paddingRight: pxToDp(32),
    fontSize: pxToDp(28),
    color: "#666",
    lineHeight: pxToDp(40),
    paddingTop: pxToDp(30),
    paddingBottom: pxToDp(40)
  }
})
