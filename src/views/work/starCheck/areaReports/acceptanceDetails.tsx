import React from "react";

import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { HeaderCmp } from '../../../../components/headerCmp/headerCmp';
import {AcceptanceCard} from '../../../../components/workCmp/areaReportCmp/acceptance/acceptanceCard';
import pxToDp from "../../../../utils/fixcss";

export default class AcceptanceDetails extends React.Component<any>{
  static navigationOptions = {
    header: null,
  }
  /**获取传递过来的shopname */
  componentDidMount() {

  }
  render (){
    const navigation = this.props.navigation
    const list = [
      {
        star: "一星",
        areaScore: 80,
        fourS: 90,
        date: "2018.06.03"
      },
      {
        star: "二星",
        areaScore: '',
        fourS: '',
        date: "2018.06.03"
      },
      {
        star: "三星",
        areaScore: 80,
        fourS: '',
        date: "2018.06.03"
      },
      
    ]
    return(
      <View style={styles.container}>
        <HeaderCmp title={'吉林市船营区艾慕家具店'} eggHandleBack={() => {navigation.goBack()}}/>
        <ScrollView style={styles.scorllList}>

          <Text style={styles.new}>最新记录</Text>
          <AcceptanceCard starNum={5} list={list} navigation={navigation}/>

          <Text style={styles.history}>历史记录</Text>
          <AcceptanceCard starNum={4} list={list} navigation={navigation}/>
          <AcceptanceCard starNum={3} list={list} navigation={navigation}/>
          <AcceptanceCard starNum={2} list={list} navigation={navigation}/>
          <AcceptanceCard starNum={1} list={list} navigation={navigation}/>

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%"
  },
  scorllList: {
    backgroundColor: "#f8f8f8",
    paddingLeft: pxToDp(22),
    marginBottom: Platform.OS === 'ios'?  0 : pxToDp(50)
  },
  new: {
    color: "#999",
    fontSize: pxToDp(28),
    marginTop: pxToDp(29),
    marginBottom: pxToDp(20)
  },
  history: {
    color: "#999",
    fontSize: pxToDp(28),
    marginBottom: pxToDp(20)
  }
})
