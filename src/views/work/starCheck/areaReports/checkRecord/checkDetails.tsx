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

import axios from 'axios'
import store from "../../../../../store";
import { setLoading } from "../../../../../store/actions/global/loading";

interface IState {
  starTitle: Array<string>
  /**
   * {levelId,shopId,name}
   */
  starData: Array<any>
  checkInfo: any
  scoreData: any
  categorierData: any
  allStarLength: number
}
class CheckDetails extends React.Component<any>{
  static navigationOptions = {
    header: null,
  }
  state: IState = {
    /**
     * 头部星级列表
     */
    starTitle: [],
    /**
     * 用来获取levelid/shopid
     *  */
    starData: [],
    allStarLength: -1,
    /**
     * 用来获取总分/各模块分数
     */
    checkInfo: {},
    /**
     * 分数模块的数据/得分/店门/周期？
     */
    scoreData: {},
    /**
     * 各模块的得分/数据
     */
    categorierData: []
  }


  
  
  //----------------
  /**
   * 获取评分进来的 页面评分详情
   */
  getStarGrade(data: any, index?: number) {
    indexModel.getStarGrade(data).then(res => {
      if (res.status) {
        const allLen = res.data.starList.length
        /**
         * 初始进来的index跟自己选择的index
         */
        let myIndex = index!== undefined ? index : 
        this.getInitStar(allLen, this.props.navigation.state.params.starLevel)
        console.log('myIndex',myIndex)
        this.props.handleSelectStarActiveIndex(myIndex)
        const scoreData = {
          getTotal: res.data.getTotal,
          shopName: res.data.shopName,
        }
        this.setState({
          starTitle: this.getStarTitle(res.data.starList),
          scoreData,
          categorierData: res.data.gradeList,
          starData: res.data.starList,
          allStarLength: allLen
        })
      }
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
          starData: res.checkCategories,
          allStarLength: res.checkCategories.length
        })
      }
    })
  }
  /**
   * 测试
   */
  starTest() {
    axios.get('../../../../../../data.json')
    .then( (res) => {
      store.dispatch(setLoading(false));
      this.props.handleSelectStarActiveIndex(0)
      this.setState({
        starTitle: this.getStarTitle(res.data.checkCategories),
        scoreData: {
          getTotal: 90,
          shopName: '慕思专卖店'
        },
        categorierData: res.data.checkLogInfo.checkCategories

      })

    })
  }


  /**
   * 获取检查 --进来的页面评分详情
   */
  getCheckLogInfo(data: any) {
    const { shopId, levelId, startTime, endTime } = data
    indexModel.getCheckLogInfo(shopId, levelId, startTime, endTime).then(res => {
      if (res.status) {
        this.setState({
          checkInfo: res.checkLogInfo
        })
      }
    })
  }
  //------------------

  /**
   * 获取检查记录进来的路由参数
   */
  getCheckParams() {
    const { shopId, startTime, endTime, levelId } = this.props.navigation.state.params
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
  getParams() {
    const { shopId, qualificationId, starLevelId, type } = this.props.navigation.state.params
    return {
      shopId,
      qualificationId,
      starLevelId,
      type
    }
  }
  /**
   * 获取评分 1-5星对应的5-1星
   * @param num 
   */
  getInitStar(len: any, num: any) {
    return len - num
  }

  /**
   * 跳转检查详情页面
   */
  //检查--- 跳转到详情页
  linkToCheckDetail(id: any) {
    const { shopId, startTime, endTime } = this.getCheckParams()
    const categoryId = id
    this.props.navigation.push("DetailsPage", {
      shopId,
      categoryId,
      startTime,
      endTime,
      type: 'check'
    })
  }
  //评分-- 跳转到详情页
  linkToGradeDetail(id: any, name: string) {
    const { shopId, qualificationId, type } = this.getParams()
    this.props.navigation.push("DetailsPage", {
      shopId,
      qualificationId,
      type,
      id,
      name
    })
  }

  /**
   * 初始化的时候请求的数据
   */
  initGetData() {
    if (this.props.navigation.state.params.type === 'check') {
      // this.getCheckcategories()
      const data = this.getCheckParams()
      this.starTest()
      // this.getCheckLogInfo(data)
    } else {
      const data = this.getParams()
      this.getStarGrade(data)
    }
  }
  /**请求筛选星级的数据 */
  handleSelect = (index: number) => {
    if (this.props.navigation.state.params.type === 'check') {
      console.log(index)
      //注意返回来的stardata的顺序？ 321 还是123
       // const myIndex = this.state.allStarLength - index
      // console.log(myIndex)
      // const levelId = this.state.starData[index].starLevelId
      // const {shopId, startTime, endTime } = this.getCheckParams()
      // const data = {shopId, startTime, endTime,levelId}
      // this.getCheckLogInfo(data)
    } else {
      const { shopId, qualificationId, type } = this.getParams()
      const starLevelId = this.state.starData[index].starLevelId
      // const myIndex = this.state.allStarLength - index
      const data = {
        shopId,
        qualificationId,
        starLevelId,
        type
      }
      this.getStarGrade(data, index)
    }
    console.log('index', index)
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
          <ScoreCanvas score={this.state.scoreData.getTotal} name={this.state.scoreData.shopName} />
          {
            this.props.navigation.state.params.type === 'check' ?
            this.state.categorierData.map((item:any, index:number) => (
                <TouchableOpacity key={item.categoryId} activeOpacity={0.6} onPress={() => { this.linkToCheckDetail(item.categoryId) }}>
                  <MaxtermCmp checkData={item} />
                </TouchableOpacity>

              ))
              :
              this.state.categorierData.map((item: any, index: number) => (
                <TouchableOpacity key={item.id} activeOpacity={0.6} onPress={() => { this.linkToGradeDetail(item.id,item.name) }}>
                  <MaxtermCmp data={item} />
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