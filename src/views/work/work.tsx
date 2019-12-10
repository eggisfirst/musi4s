import React from "react";
import { View, StyleSheet, TouchableOpacity, Button, Alert, Text, StatusBar } from "react-native";
import { TabBarItem } from "../../components/tabBarItem"
import { IndexIcon } from '../../components/workCmp/indexIcon'
import pxToDp from "../../utils/fixcss";
import { TabBar } from "../../components/tabBar";

import { IndexModel } from "../../request";
import { knowledgeLibrary } from "../../utils/enum";
const indexModel = new IndexModel()


export default class WorkScreen extends React.Component<any>{
  static navigationOptions = {
    tabBarLabel: '工作',
    gesturesEnabled: false,
    tabBarIcon: ({ focused }: any) => (
      <TabBarItem
        focused={focused}
        normalImage={require('../../images/tabBar/work.png')}
        selectedImage={require('../../images/tabBar/work_select.png')} />
    ),
  }

  render() {
    const list = [
      {
        imgUrl: require('../../images/work/4s.png'),
        title: "4S星级认证",
        link: "StarHome"
      },
      {
        imgUrl: require('../../images/work/news.png'),
        title: "我的消息",
        // link:"StarHome"
      },
      {
        imgUrl: require('../../images/work/daiban.png'),
        title: "我的代办",
        // link:"StarHome"
      },
      {
        imgUrl: require('../../images/work/news.png'),
        title: knowledgeLibrary.webSxy,
        link: "WebCollage"
      },
      {
        imgUrl: require('../../images/work/news.png'),
        title: knowledgeLibrary.goldGj,
        link: "WebCollage"
      },
      {
        imgUrl: require('../../images/work/news.png'),
        title: "常见问题",
        link: "FAQ"
      },
      {
        imgUrl: require('../../images/work/news.png'),
        title: "培训",
        link: "Train"
      },
      {
        imgUrl: require('../../images/work/news.png'),
        title: "saoyisao",
        link: "Scan"
      }
    ]
    return (
      <View style={styles.wrapper}>

        <TabBar />
        <View style={styles.viewStyle}>
          {
            list && list.map(item => (
              <TouchableOpacity
                key={item.title}
                onPress={() => { this.props.navigation.push(`${item.link}`, {title: item.title}) }}>
                <IndexIcon imgUrl={item.imgUrl} title={item.title} key={item.title} />
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    backgroundColor: "#f8f8f8"
  },
  viewStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: pxToDp(58),
    flexWrap: "wrap",
    width: '100%',
    alignItems: "center",
    paddingLeft: pxToDp(95),
    paddingRight: pxToDp(45),
    // height:'100%',
    // backgroundColor:"#f8f8f8"
  }
})
