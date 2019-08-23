import React from "react";

import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from "react-native";
import { HeaderCmp } from '../../../../../components/headerCmp/headerCmp';
import SelectCmp from '../../../../../components/filterCmp/selectCmp';
import { SelectType } from "../../../../../utils/enum";
import pxToDp from "../../../../../utils/fixcss";

import * as actions from '../../../../../store/actions/filter/select'
import { connect } from 'react-redux';
import { ScoreCanvas } from "../../../../../components/workCmp/areaReportCmp/checkDetailsCmp/scoreCanvas";
import { MaxtermCmp } from '../../../../../components/workCmp/areaReportCmp/checkDetailsCmp/maxTerm';
import { IndexModel } from "../../../../../request";
import { getStar } from "../../../../../utils";
const indexModel = new IndexModel()

interface IState {
  starTitle: Array<string>
  /**
   * {levelId,shopId,name}
   */
  starData: Array<any>
}
class CheckDetails extends React.Component<any>{
  static navigationOptions = {
    header: null,
  }
  state = {
    starTitle: [],
    starData: [],
    checkInfo: {}
  }
  //----------------
  /**
   * 获取页面评分详情
   */
  getStarGrade(data: any) {
    indexModel.getStarGrade(data).then(res => {

    })
  }
  /**
   * 检查记录进来的检查详情
   * 1星返回12星，如果没有打分返回1星
   */
  getCheckcategories() {
    const { shopId, startTime, endTime } = this.getCheckParams()
    indexModel.getCheckcategories(shopId, startTime, endTime).then(res => {
      if (res.status) {
        this.props.handleSelectStarActiveIndex(0)
        this.setState({
          starTitle: this.getStarTitle(res.checkCategories),
          starData: res.checkCategories
        })
      }
    })
  }
  /**
   * 获取检查进来的页面评分详情
   */
  getCheckLogInfo() {
    const { shopId, levelId, startTime, endTime } = this.getCheckParams()
    indexModel.getCheckLogInfo(shopId, levelId, startTime, endTime).then(res => {

    })
  }
  //------------------
  /**
   * 获取检查记录进来的路由参数
   */
  getCheckParams() {
    const shopId = this.props.navigation.state.params.shopId
    const startTime = this.props.navigation.state.params.startTime
    const endTime = this.props.navigation.state.params.endTime
    const levelId = this.props.navigation.state.params.levelId
    return {
      shopId,
      startTime,
      endTime,
      levelId
    }
  }

  /**
   * 获取星级排序列表 倒序 54321
   */
  getStarTitle(list: any) {
    const arr: any = []
    const len = list.length
    for (let i = len; i > 0; i--) {
      arr.push(`${getStar(i)} |`)
    }
    return arr
  }

  /**
   * 获取认证页面 --上级页面传过来的参数
   * @param data 
   */
  getParmas(data: any) {
    const { shopId, qualificationId, starLevelId, type } = data
    return {
      shopId,
      qualificationId,
      starLevelId,
      type
    }
  }
  /**
   * 获取1-5星对应的5-1星
   * @param num 
   */
  getInitStar(num: number | string) {
    switch (num) {
      case 1:
        return 4
      case 2:
        return 3
      case 3:
        return 2
      case 4:
        return 1
      case 5:
        return 0
    }
  }

  /**
   * 跳转检查详情页面
   */
  linkToDetail(id: string | number) {
    //检查---
    const { shopId, startTime, endTime } = this.getCheckParams()
    const categoryId = id
    this.props.navigation.push("DetailsPage", {
      shopId,
      categoryId,
      startTime,
      endTime
    })
  }

  /**
   * 初始化的时候请求的数据
   */
  initGetData() {
    if (this.props.navigation.state.params.type === 'check') {
      this.getCheckcategories()
      this.getCheckLogInfo()
    } else {
      this.props.handleSelectStarActiveIndex(this.getInitStar(this.props.navigation.state.params.starLevelId))
      const data = this.getParmas(this.props.navigation.state.params)
      this.getStarGrade(data)
    }
  }
  /**请求筛选星级的数据 */
  handleSelect = (index: number) => {
    console.log(index)
  }
  /**设置初始点击进来的星级 index-1*/
  componentDidMount() {

    //判断初始进来是验证还是检查


    this.initGetData()

  }

  render() {
    const navigation = this.props.navigation
    const checkInfo = {
      checkLohInfo: {
        categoryId: '123',
        name: '一星检查',
        score: '80',
        cycle: "1",
        checkCategorier: [
          {
            name: '门店门面检查',
            total: '40',
            deduct: '8',
            score: '32',
            inspector: '老外',
            inspectTime: '2019-08-08',
            categoryId: '111'
          },
          {
            name: '门店门面检查',
            total: '40',
            deduct: '8',
            score: '22',
            inspector: '老外',
            inspectTime: '2019-08-08',
            categoryId: '222'
          }
        ]
      }
    }
    return (
      <View style={styles.container}>
        <HeaderCmp title={"检查详情"} eggHandleBack={() => { navigation.goBack() }} />
        <View style={styles.line}>
          <View style={styles.selectContainer}>
            <SelectCmp selectType={SelectType.StarCheck}
              color={"#838383"} activeColor={"#007aff"}
              handleSelect={this.handleSelect}
              mySelectList={this.state.starTitle}
            />
          </View>
        </View>
        <ScrollView>
          <ScoreCanvas score={checkInfo.checkLohInfo.score} />
          {
            checkInfo.checkLohInfo.checkCategorier.map((item, index) => (
              <TouchableOpacity key={item.categoryId} activeOpacity={0.6} onPress={() => { this.linkToDetail(item.categoryId) }}>
                <MaxtermCmp data={item}  />
              </TouchableOpacity>

            ))
          }
        </ScrollView>
      </View>
    )
  }
}


const mapStateToProps = (state: any) => state
export default connect(mapStateToProps, actions)(CheckDetails)
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingBottom: Platform.OS === "ios" ? 0 : pxToDp(80)
  },
  line: {
    width: "100%",
    paddingBottom: pxToDp(34),
    borderBottomWidth: pxToDp(1),
    borderBottomColor: "#e5e5e5",
  },
  selectContainer: {
    width: pxToDp(500),
    marginLeft: pxToDp(50),
  }
})