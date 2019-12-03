import React from "react";

import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { HeaderCmp } from '../../../../../components/headerCmp/headerCmp';
import {AcceptanceCard} from '../../../../../components/workCmp/areaReportCmp/acceptance/acceptanceCard';
import pxToDp from "../../../../../utils/fixcss";
import { IndexModel } from "../../../../../request";
const indexModel = new IndexModel()

interface IState {
  list:Array<any>
}

export default class AcceptanceDetails extends React.Component<any>{
  static navigationOptions = {
    header: null,
  }
  state:IState = {
    list: []
  }
  /**
   * 获取门店记录
   */
  getShopHistory() {
    const id = this.props.navigation.state.params.id
    indexModel.getShopHistory(this, id).then(res => {
      if(res.status) {
        this.setState({
          list: res.data
        })
      }
    }) 
  }
  /**获取传递过来的shopname */
  componentDidMount() {
    this.getShopHistory()
  }
  render (){
    const navigation = this.props.navigation
  
    return(
      <View style={styles.container}>
        <HeaderCmp title={navigation.state.params.shopName} eggHandleBack={() => {navigation.goBack()}}/>
        <ScrollView style={styles.scorllList}>

          <Text style={styles.new}>最新记录</Text>
          {
            this.state.list && this.state.list[0]?
            <AcceptanceCard starNum={this.state.list[0].gradeList.length} 
                            list={this.state.list[0]} 
                            navigation={navigation}/> : <></>
          }
          {
            this.state.list && this.state.list.length > 1?
            <>
              <Text style={styles.history}>历史记录</Text>
              {
                this.state.list.slice(1).map((item, index) => (
                  <View key={item.qualificationId}>
                    <AcceptanceCard starNum={item.gradeList.length} list={item} navigation={navigation}/>
                  </View>
                ))
              }
            </> : <></>
          }
         

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
