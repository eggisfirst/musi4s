import React from "react";

import { View, Text, Platform, StatusBar, StyleSheet, ScrollView } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { HeaderCmp } from '../../../components/headerCmp/headerCmp';
import { CheckBox } from '../../../components/workCmp/gradeCmp/checkBox';
import { IndexModel } from "../../../request";
import { getStar } from "../../../utils";
const indexModel = new IndexModel()
import store from '../../../store'
import { setLoading } from '../../../store/actions/global/loading';

interface IState {
  numberData: any
  list: Array<any>
  shopName: string
  levelId: string
}

export default class GradePage extends React.Component<any>{
  static navigationOptions = {
    header: null
  }
  state:IState = {
    numberData: {},
    list: [],
    shopName: '',
    levelId:''
  }
  //请求
  /**
   * 获取评星页面数据
   * @param id 
   * @param shopId 
   */
  getCategories(id: any,shopId: any) {
    indexModel.getCategories(id,shopId).then(res => {
      if(res.status) {

        this.setState({
          numberData: res.data.number,
          list: res.data.list
        })
      }
    })
  }
  /**
   * 初始数据
   */
  initData() {
    const {qualificationId,shopId,shopName} = this.props.navigation.state.params
    this.getCategories(qualificationId,shopId)
    this.setState({
      shopName
    })
  }

  //跳转到评分页面
  handleToGrade = (index: number, i: number, type: string) => {
    console.log(1122334455, index, i)
    const list = this.state.list
    const {shopId,qualificationId} = this.props.navigation.state.params
    this.props.navigation.navigate('CheckListPage', {
      qualificationId,
      shopId,
      categoryId: list[index][i].id,
      title: list[index][i].name,
      type,
      callBack: () => {
        const {qualificationId,shopId,shopName} = this.props.navigation.state.params
        this.getCategories(qualificationId,shopId)
      }
    })
  }

  componentDidMount() {
    this.initData()
  }
  render() { 
    const { navigation } = this.props
   
    return (
      <View style={styles.container}>
        <HeaderCmp title={'星级认证评分'} eggHandleBack={() => {navigation.goBack()}}/>
        <View style={styles.sum}>
          <Text style={styles.sum_title}>{this.state.shopName}</Text>
          <Text style={styles.sum_text}>共<Text style={styles.sum_blue}>{this.state.numberData.total}</Text>项 已评<Text style={styles.sum_green}>{this.state.numberData.comment}</Text>项 剩余 <Text style={styles.sum_red}>{this.state.numberData.notComment}</Text>项未评</Text>
        </View>
        <ScrollView style={styles.checkWrapper}>
            {
              this.state.list.map((item:any, index:number) => (
                <View key={index}>
                  <Text style={styles.start_check_title}>{getStar(index + 1)}检查</Text>
                  <View style={styles.checkBox} >
                    {
                      item.map((el:any, i:number) => (
                        <CheckBox key={el.id} 
                                  item={el} 
                                  index={index} 
                                  i={i}
                                  handleToGrade={this.handleToGrade}/>
                    ))
                    }
                  </View>
                  </View>
              ))
            }
         
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  sum: {
    width: pxToDp(439),
    // height: pxToDp(80),
    backgroundColor: "#f8f8f8",
    textShadowColor: `0px ${pxToDp(4)} ${pxToDp(10)} 0px rgba(225,228,230,1)`,
    borderTopRightRadius: pxToDp(10),
    borderBottomRightRadius: pxToDp(40),
    paddingLeft: pxToDp(31),
    paddingTop: pxToDp(8),
    paddingBottom: pxToDp(8),
  
  },
  sum_title: {
    fontSize: pxToDp(30),
    color: "#363636",
    lineHeight: pxToDp(40)
  },
  sum_text: {
    fontSize: pxToDp(24),
    color: "#909090",
  },
  sum_blue: {
    color: "#007AFF"
  },
  sum_green: {
    color: "#4CD964"
  },
  sum_red: {
    color: "#FF2D55"
  },
  checkWrapper: {
    paddingLeft: pxToDp(31),
    paddingRight: pxToDp(10),
    // paddingTop: pxToDp(50),
    paddingBottom: pxToDp(50),

  },
  start_check_title: {
    fontSize: pxToDp(45),
    fontWeight: "bold",
    color: "#363636",
    marginTop: pxToDp(40)
  },
  checkBox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",

  },

})
