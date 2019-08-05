import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { DealerCard } from '../../../components/workCmp/receptionCmp/dealerCard';
import { ReceItem } from '../../../components/workCmp/receptionCmp/receItem';
import { ApplyItem } from "../../../components/workCmp/starCheck/applyItem";
import { StarCheckTypes, BtnTitle, BtnTypes } from "../../../utils/enum";
import { ApplyBtn } from "../../../components/workCmp/starCheck/applyBtn";
import { ApplyFooter } from "../../../components/workCmp/starCheck/applyFooter";


interface IState {
  index: number
}

export default class index extends React.Component<any,IState>{
  static navigationOptions = {
    header: null
  }
  list =  [
    {name: '广东广州何秋明发起申请！', star: "三星", week: 48, score: 90, date: "2019.06.04",key:'1'},
    {name: '广东广州马梅发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'2'},
    {name: '广东广州冬梅发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'3'},
    {name: '广东广州马冬梅发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'4'},
    {name: '广东广州马冬梅发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'5'},
    {name: '广东广州马冬梅发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'6'},
    {name: '广东广州马冬梅发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'7'},
    {name: '广东广州马发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'8'},
    {name: '广东广州马发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'9'},
    {name: '广东广州马发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'10'},
  ]
 render (){
  const { navigation } = this.props;
  const index = navigation.getParam('index')

  return(
    <View style={{backgroundColor: "#f8f8f8",width:"100%",height:"100%",overflow:"scroll"}}>
      <View style={styles.header}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.icon} onPress={() => {this.props.navigation.goBack()}}>
              <Image  source={require('../../../images/work/reception/back.png')}
                      style={styles.back} />
          </TouchableOpacity>
          <Text style={styles.time}>申请日期：2019.05.01</Text>
        </View>
      </View>
      <View style={styles.dealerCard}>
        <DealerCard />
      </View>
      <FlatList style={styles.shopList} 
                data={this.list}
                keyExtractor={item => item.key}
                renderItem={({ item,index }) => (
                  <ReceItem >
               
                  </ReceItem>
                )}
              />
    </View>
   )
 }
}

const styles = StyleSheet.create({
  header: {
    width:'100%',
    height:pxToDp(420),
    backgroundColor:"linear-gradient(45deg,rgba(0,122,255,1),rgba(70,159,255,1))",
    paddingLeft: pxToDp(32),
    paddingRight: pxToDp(32),
  },
  headerWrapper: {
    width: "100%",
    height: pxToDp(36),
    marginTop: pxToDp(115),
    display:'flex',
    justifyContent:"space-between",
    flexDirection: "row",
    position:"relative"
  },
  icon: {
    width: pxToDp(80),
    height: pxToDp(36),
  },
  back: {
    width: pxToDp(20),
    height: pxToDp(36),
  },
  time: {
    fontSize: pxToDp(28),
    color: "#fff",
  },
  dealerCard: {
    position: "absolute",
    top: pxToDp(175),
    left: pxToDp(32)
  },
  shopList: {
    marginTop: pxToDp(125),
    paddingLeft:pxToDp(32)
  }
})