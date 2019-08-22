import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, Alert, Linking } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { DealerCard } from '../../../components/workCmp/receptionCmp/dealerCard';
import { ReceItem } from '../../../components/workCmp/receptionCmp/receItem';
import { AlertBtnTypes, BtnTitle } from "../../../utils/enum";
import { AlertCmp } from '../../../components/altrtCmp';
import MapCmp from '../../../components/mapCmp/map';
import { IndexModel } from "../../../request";
import { _retrieveData } from "../../../utils/utils";
const indexModel = new IndexModel()

interface IState {
  index: number //前一个页面的索引
  gradeState: Boolean
  mapStatue: boolean
  cardData: any
  shopList: Array<any>
  time: any
  shopInfo: any
  type: number | string
}

export default class index extends React.Component<any>{
  static navigationOptions = {
    header: null
  }
  state: IState = {
    gradeState: false,
    index: -1,
    mapStatue: false,
    cardData: {},
    shopList: [],
    time: '',
    shopInfo: {},
    type: ''
  }
  list = [
    { name: '广州马会家居凯奇门店', status: true, score1: 48, score2: 90, date: "2019.06.04", key: '1' },
    { name: '广州马会家居歌蒂娅门店', status: false, score1: 48, score2: 90, date: "2019.05.04", key: '2' },
    { name: '广州马会家居兰博基尼门店', status: false, score1: 48, score2: 90, date: "2019.05.04", key: '3' },
    { name: '广州马会家居凯奇门店', status: false, score1: 48, score2: 90, date: "2019.05.04", key: '4' },
    { name: '广州马会家居凯奇门店', status: true, score1: 48, score2: 90, date: "2019.05.04", key: '5' },
  ]
  //请求
  /**
   * 获取验收店铺列表
   */
  getReceShopList(id: number) {
    indexModel.getReceShopList(id).then(res => {
      if (res.status) {
        this.setState({
          cardData: res.data.distributor,
          shopList: res.data.shopList,
          time: res.data.distributor.time
        })
      }
    })
  }
  /**
   * 获取店铺信息
   */
  getShopInfo(index: number) {
    const qualificationId = this.props.navigation.state.params.id
    const shopId = this.state.shopList[index].shopId
    indexModel.getShopInfo(qualificationId, shopId).then(res => {
      if (res.status) {
        this.setState({
          shopInfo: res.data
        })
      } 
    })
  }


  /**获取级别 */
  getLevelType() {
    _retrieveData('type').then(res => {
      if (!res) {
        return
      }
      this.setState({
        type: res
      })
    })
  }
  /**
   * 验收弹框提示
   */
  toGrade = () => {
    this.setState({
      gradeState: true
    })
  }
  /**
   * 提示弹框的确认取消
   */
  handleAlert = (status: AlertBtnTypes) => {
    switch (status) {
      case AlertBtnTypes.comfirm:
        this.props.navigation.navigate('GradePage', {
          index: this.state.index
        })
        this.setState({
          gradeState: false
        })
        break;
      case AlertBtnTypes.cancle:
        this.setState({
          gradeState: false
        })
        break;
    }
  }
  /**
   * 打开地图
   */
  handleShowMap = (index: number) => {
    this.setState({
      mapStatue: true
    })
    this.getShopInfo(index)
  }
  /**
   * 关闭地图
   */
  handleCloseMap = () => {
    this.setState({
      mapStatue: false
    })
  }
  componentDidMount() {
    /**
     * @param 传过来的id
     */
    const id = this.props.navigation.state.params.id
    this.getReceShopList(id)
  }
  render() {
    return (
      <View style={{ backgroundColor: "#f8f8f8", width: "100%", height: "100%", overflow: "scroll" }}>
        <View style={styles.header}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.icon} onPress={() => { this.props.navigation.goBack() }}>
              <Image source={require('../../../images/work/reception/back.png')}
                style={styles.back} />
            </TouchableOpacity>
            <Text style={styles.time}>申请日期：{this.state.time}</Text>
          </View>
        </View>
        <View style={styles.dealerCard}>
          <DealerCard cardData={this.state.cardData} />
        </View>
        <FlatList style={styles.shopList}
          data={this.list}
          keyExtractor={item => item.key}
          renderItem={({ item, index }) => (
            <ReceItem type={this.state.type} toGrade={this.toGrade} shopItem={item} index={index} handleShowMap={this.handleShowMap} />
          )}
        />

        {
          this.state.gradeState &&
          <AlertCmp title={BtnTitle.tips}
            comfirm={AlertBtnTypes.comfirm}
            cancle={AlertBtnTypes.cancle}
            handleAlert={this.handleAlert}
            boxValue={'该经销商，已有门店评分不合格，是否继续评分？'} />
        }
        {
          this.state.mapStatue && <MapCmp shopInfo={this.state.shopInfo} handleCloseMap={this.handleCloseMap} />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: pxToDp(420),
    backgroundColor: "linear-gradient(45deg,rgba(0,122,255,1),rgba(70,159,255,1))",
    paddingLeft: pxToDp(32),
    paddingRight: pxToDp(32),
  },
  headerWrapper: {
    width: "100%",
    height: pxToDp(36),
    marginTop: pxToDp(115),
    display: 'flex',
    justifyContent: "space-between",
    flexDirection: "row",
    position: "relative"
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
    paddingLeft: pxToDp(32),
  }
})