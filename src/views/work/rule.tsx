import React from "react";

import { View, Text, StyleSheet, ScrollView } from "react-native";
import pxToDp from '../../utils/fixcss';
import { HeaderCmp } from '../../components/headerCmp/headerCmp';

export default class Rule extends React.Component<any> {

  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <>
        <HeaderCmp
          title={'检查标准'}
          eggHandleBack={() => { this.props.navigation.goBack() }}
        />
        <ScrollView style={styles.container}>
          <Text style={styles.text}>
            1、店面距离最近一次装修：街边独立店、旗舰店保持6年， 6年后必须重装。
        </Text>
          <Text style={styles.text}>
            2、商场综合系列以及单系列店面新3D、新凯奇、新歌蒂娅、托尼诺•兰博基尼装修期限增加到4，如4年后店面形象维持良好由终端展示部评定是否可延期（最长可延期1年）， 其他系列店面仍然按照3年期限装修标准执行（如V6店面维护良好可向终端展示部申请延期一年评估）,但必须动态维护达到终端展示部最新SI/VI要求,否则不予星级验收；
        </Text>
        <Text style={styles.text}>
            1、店面距离最近一次装修：街边独立店、旗舰店保持6年， 6年后必须重装。
        </Text>
          <Text style={styles.text}>
            2、商场综合系列以及单系列店面新3D、新凯奇、新歌蒂娅、托尼诺•兰博基尼装修期限增加到4，如4年后店面形象维持良好由终端展示部评定是否可延期（最长可延期1年）， 其他系列店面仍然按照3年期限装修标准执行（如V6店面维护良好可向终端展示部申请延期一年评估）,但必须动态维护达到终端展示部最新SI/VI要求,否则不予星级验收；
        </Text>
        <Text style={styles.text}>
            1、店面距离最近一次装修：街边独立店、旗舰店保持6年， 6年后必须重装。
        </Text>
          <Text style={styles.text}>
            2、商场综合系列以及单系列店面新3D、新凯奇、新歌蒂娅、托尼诺•兰博基尼装修期限增加到4，如4年后店面形象维持良好由终端展示部评定是否可延期（最长可延期1年）， 其他系列店面仍然按照3年期限装修标准执行（如V6店面维护良好可向终端展示部申请延期一年评估）,但必须动态维护达到终端展示部最新SI/VI要求,否则不予星级验收；
        </Text>
        <Text style={styles.text}>
            1、店面距离最近一次装修：街边独立店、旗舰店保持6年， 6年后必须重装。
        </Text>
          <Text style={styles.text}>
            2、商场综合系列以及单系列店面新3D、新凯奇、新歌蒂娅、托尼诺•兰博基尼装修期限增加到4，如4年后店面形象维持良好由终端展示部评定是否可延期（最长可延期1年）， 其他系列店面仍然按照3年期限装修标准执行（如V6店面维护良好可向终端展示部申请延期一年评估）,但必须动态维护达到终端展示部最新SI/VI要求,否则不予星级验收；
        </Text>
       
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