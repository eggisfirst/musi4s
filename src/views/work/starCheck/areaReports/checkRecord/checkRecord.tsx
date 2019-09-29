import React from "react";

import { View, Text, ScrollView, StyleSheet } from "react-native";
import { BackGroundHeader } from "../../../../../components/headerCmp/backgroundHeader";
import pxToDp from "../../../../../utils/fixcss";
import SelectCmp from '../../../../../components/filterCmp/selectCmp';
import { StarCheckBox } from '../../../../../components/workCmp/areaReportCmp/checkRecord/starCheckCard';
import { SelectType } from "../../../../../utils/enum";

import * as actions from '../../../../../store/actions/filter/select'
import { connect } from 'react-redux';
import { IndexModel } from "../../../../../request";
const indexModel = new IndexModel()


import axios from 'axios'
import store from '../../../../../store'
import { setLoading } from "../../../../../store/actions/global/loading";
interface IState {
  list: Array<any>
}

class CheckRecord extends React.Component<any>{
  static navigationOptions = {
    header: null,
  }
  state = {
    list: []
  }

  /**
   * 获取历史记录
   */
  getCheckLog(pass = '') {
    const shopId = this.props.navigation.state.params.id
    indexModel.getCheckLog(shopId, pass).then(res => {
      if (res.status) {
        this.setState({
          list: res.checkLogs
        })
      }
    })
  }

  /**请求筛选：合格/不合格/全部的数据 */
  handleSelect = (index: number) => {
    // console.log(1111,index)
    const pass = index === 0 ? '' : index === 1 ? '1' : '0'
    this.getCheckLog(pass)
  }
  /**获取传递过来的门店名 */
  componentDidMount() {
    this.getCheckLog()



    // console.log(this.props.navigation.state.parmas)
  }
  /**页面卸载的时候重新初始化数据 */
  componentWillUnmount() {
    this.props.handleSelectActiveIndex(0)
  }

  render() {
    return (
      <View style={styles.container}>
        <BackGroundHeader
          title={'检查记录'}
          eggHandleBack={() => { this.props.navigation.goBack() }}
          bgColor={'#007aff'}
          fontColor={"#fff"}
          setHeight={263}
          imgUrl={require("../../../../../images/backicon.png")} />
        <View style={styles.banner}>
          <SelectCmp selectType={SelectType.qualified}
            color={"#fff"} activeColor={"#FFCB38"}
            handleSelect={this.handleSelect}
            mySelectList={['全部', '合格', '不合格']} />
          <Text style={styles.shop} numberOfLines={1}>{this.props.navigation.state.params.shopName}</Text>
        </View>
        <ScrollView>
          {
            this.state.list && this.state.list.length ?
              <StarCheckBox shopName={this.props.navigation.state.params.shopName} list={this.state.list} navigation={this.props.navigation} />
              :
              <Text style={styles.noRecord}>暂无记录</Text>
          }
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state: any) => state
export default connect(mapStateToProps, actions)(CheckRecord)

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#f8f8f8",
    width: "100%",
    height: "100%"
  },
  banner: {
    position: "absolute",
    left: pxToDp(57),
    top: pxToDp(200),
    width: pxToDp(650),
    lineHeight: pxToDp(60),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  shop: {
    color: "rgba(255,255,255,0.5)",
    lineHeight: pxToDp(42),
    fontWeight: "500",
    fontSize: pxToDp(26),
    maxWidth: pxToDp(370)
  },
  noRecord: {
    width: "100%",
    textAlign: "center",
    color: "#666",
    marginTop: pxToDp(20)
  }
})
