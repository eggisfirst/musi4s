import React from "react";
import { connect } from 'react-redux';

import { View, Text, StyleSheet, Dimensions, Alert, ScrollView, Image } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { HeaderCmp } from "../../../components/headerCmp/headerCmp"
import MiddleCategoryCmp from '../../../components/workCmp/starCheck/check/middleCategoryCmp'
import BotBtn from '../../../components/common/botBtn'
import { CheckAlert } from '../../../components/workCmp/starCheck/checkAlert'
import { IndexModel } from "../../../request";
import store from '../../../store';
import * as actions from '../../../store/actions/4s/checkList';
import { TouchableOpacity } from "react-native-gesture-handler";
import { BackGroundHeader } from "../../../components/headerCmp/backgroundHeader";
import ExtraDimensions from 'react-native-extra-dimensions-android';
const indexModel = new IndexModel()
// const actions = {
//   ...changeCheckList,
// }
interface IState {
  deductTotal: number
  scoreTotal: number
  levelId: string
  checkAlertStatus: boolean
  gardeStatus: boolean
}

interface IIndex {
  fatherIndex: number,
  index: number,
}

class CheckListPage extends React.Component<any, IState>{
  state: IState = {
    deductTotal: 0,
    scoreTotal: 0,
    levelId: '',
    checkAlertStatus: false,
    gardeStatus: true, // 为真时是已评分
  }

  static navigationOptions = {
    header: null
  }

  /**
   * 展开折叠
   */
  open = (index: number): void => {
    let temp = this.props.checkList.checkList[index].status
    if (!temp) {
      this.props.checkList.checkList[index].status = true
      this.props.changeCheckList(this.props.checkList.checkList)
    }
  }

  /**
   * 收起折叠
   */
  close = (index: number): void => {
    let temp = this.props.checkList.checkList[index].status
    if (temp) {
      this.props.checkList.checkList[index].status = false
      this.props.changeCheckList(this.props.checkList.checkList)
    }
  }

  /**
   * 确认提交表单
   */
  sureSubmit = () => {
    let checkList = this.props.checkList.checkList
    console.log('提交的数据', checkList)
    let temp = this.filterParams(checkList)
    // if (temp.status){
      this.setState({checkAlertStatus: true})
    // } else {
    //   let [fatherIndex, index] = [temp.tempArr[0].fatherIndex, temp.tempArr[0].index]
    //   Alert.alert(
    //     '',
    //     `分类（${checkList[fatherIndex].name}）,选项（${checkList[fatherIndex].standardList[index].name}）未评分，不可提交！`,
    //     [
    //       {text: '确定', onPress: () => console.log('onPress OK')},
    //     ],
    //     { cancelable: false }
    //   )
    // }
  }

  /**
   * 提交表单
   * @param {* type为'goback'时表示提交后后退页面，type为'toCheckRecord'时，表示提交后跳转验收记录页面} type
   */
  submit = (type?: string) => {
    const params = this.props.navigation.state.params
    let data: object = {
      levelId: this.state.levelId, //星级id，一星检查id
      shopId: params.shopId, //门店id
      qualificationId: params.qualificationId, //认证id
      //打分分类列表，必须提交全部
      categoryList: this.filterParams(this.props.checkList.checkList).arr
    }
    indexModel.submitForm(data).then(res => {
      if (res.status) {
        const { goBack, state } = this.props.navigation;
        if (type === 'goback') {
          state.params.callBack()
          goBack()
        } else {
          this.props.navigation.push("AcceptancePage")
        }
      } else {
        Alert.alert(
          '提示',
          `${res.msg}`,
          [
            { text: '确定', onPress: () => console.log('onPress OK') },
          ],
          { cancelable: false }
        )
      }
    })
    // console.log(this.filterParams(this.props.checkList.checkList))
    // console.log(params, `levelId:${this.state.levelId}`, `总分：${this.state.scoreTotal}`, `总扣分${this.state.deductTotal}`, this.props.checkList.checkList)
  }

  /**
   * 重置表单
   */
  reset = () => {
    Alert.alert(
      '',
      `重置将清空已评数据，是否重置？`,
      [
        {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: '确定', onPress: () => {
          let temp = this.filterData(this.props.checkList.checkList)
          this.props.changeCheckList(temp.arr)
          this.setState({ deductTotal: 0 })
          // this.subcategories()
        }},
      ],
      { cancelable: false }
    )
  }

  /**
   * 跳转检查详情页面
   */
  toDetail = (index: number, fatherIndex: number): void => {
    let {type, qualificationId} = this.props.navigation.state.params
    let {name, standardId} = this.props.checkList.checkList[fatherIndex].standardList[index]
    this.props.navigation.navigate('CheckDetailPage', {
      name,
      index,
      fatherIndex,
      standardId,
      type,
      qualificationId,
      callBack: () => {
        this.setState({ deductTotal: this.computeDeductTotal(this.props.checkList.checkList) | 0 })
      }
    })
  }

  /**
   * 计算扣分
   */
  computeDeductTotal = (checkList: any[]) => {
    let sum = 0
    for (let i = 0; i < checkList.length; i++) {
      if (checkList[i].standardList) {
        for (let j = 0; j < checkList[i].standardList.length; j++) {
          sum += checkList[i].standardList[j].deduct | 0
        }
      }
    }
    return sum
  }

  /** 
   * 获取店铺检查列表
   */
  subcategories = () => {
    let {categoryId, shopId, type, qualificationId} = this.props.navigation.state.params
    indexModel.subcategories(categoryId, shopId, qualificationId, type === '已评分').then(res => {
      if (res.data) {
        this.setState({ levelId: res.data.starLevelId })
        let data = res.data.categories
        if (data && data.length > 0) {
          let temp = this.filterData(data)
          this.props.changeCheckList(temp.arr)
          this.setState({ scoreTotal: temp.scoreTotal })
        }
      }
      // indexModel.getShopHistory(this.props.navigation.state.shopId).then(res => {
    })
  }

  /**
   * 筛选检查列表
   */
  filterData = (data: any[], type?: string) => {
    let params = this.props.navigation.state.params
    let arr: object[] = []
    let scoreTotal = 0
    for (let i = 0; i < data.length; i++) {
      scoreTotal += data[i].total
      let temp: any = {}
      temp.status = i === 0 ? true : false
      temp.standardList = []
      temp.name = data[i].name
      temp.categoryId = data[i].id ? data[i].id : data[i].categoryId
      if (data[i].standardList) {
        for (let j = 0; j < data[i].standardList.length; j++) {
          let obj: any = {}
          obj.name = data[i].standardList[j].name
          obj.type = params.type === '未评分' ? false : true
          obj.standardId = data[i].standardList[j].id ? data[i].standardList[j].id : data[i].standardList[j].standardId
          obj.urls = [] //上传文件url集合
          temp.standardList.push(obj)
        }
      }
      arr.push(temp)
    }
    return {
      arr,
      scoreTotal
    }
  }

  /**
   * 筛选提交评分接口参数
   */
  filterParams = (data: any[]) => {
    let arr: object[] = []
    // 用于判断是否评分完全，为false时，说明没有评完
    let status: Boolean = true
    let tempArr: IIndex[] = []
    for (let i = 0; i < data.length; i++) {
      let temp: any = {}
      temp.standardList = []
      temp.categoryId = data[i].categoryId
      if (data[i].standardList) {
        for (let j = 0; j < data[i].standardList.length; j++) {
          let obj: any = {}
          obj.standardId = data[i].standardList[j].standardId
          obj.reason = data[i].standardList[j].text
          obj.deduct = data[i].standardList[j].deduct
          if (!data[i].standardList[j].type) {
            status = false
            tempArr.push({
              fatherIndex: i,
              index: j,
            })
          }
          obj.urls = data[i].standardList[j].urls || [] // 上传文件url集合
          temp.standardList.push(obj)
        }
      }
      arr.push(temp)
    }
    return {arr,status,tempArr}
  }

  toCheckRecord = () => {
    this.submit()
  }

  continue = () => {
    this.setState({ checkAlertStatus: false })
    this.submit('goback')
  }

  cancel = () => {
    this.setState({ checkAlertStatus: false })
  }

  componentDidMount() {
    let {type} = this.props.navigation.state.params
    this.subcategories()
    this.setState({ deductTotal: this.computeDeductTotal(this.props.checkList.checkList) | 0, gardeStatus: type === '已评分' })
    this.props.changeCheckList([])
  }

  render() {
    const { navigation } = this.props
    const MiddleCategoryCmpList = this.props.checkList.checkList && this.props.checkList.checkList.map((item: any, index: number) => {
      return <MiddleCategoryCmp
        key={`middleCategory${index}`}
        list={item.standardList}
        title={item.name}
        status={item.status}
        index={index}
        open={this.open}
        toDetail={this.toDetail}
        close={this.close}
      />
    })
    return (
      <View style={styles.checkList}>
        <BackGroundHeader
          title={this.props.navigation.state.params.title}
          eggHandleBack={() => { navigation.goBack() }}
          bgColor={'#007aff'}
          fontColor={'#fff'}
          setHeight={223}
          imgUrl={require('../../../images/work/reception/back.png')}
          Children={
            <TouchableOpacity activeOpacity={0.8} style={styles.topRight}  onPress={() => { navigation.push('RulePage') }}>
                <Image style={{width: pxToDp(40),height: pxToDp(40)}} source={require('../../../images/work/rule.png')} />
            </TouchableOpacity>
          }
        />

        <View style={styles.grad}>
          <Text style={styles.gradText}>分数统计：</Text>
          <View style={styles.grad}>
            <Text style={styles.gradTotal}>总分 {this.state.scoreTotal}   |</Text>
            <Text style={styles.gradDeduct}>   扣分 {this.state.deductTotal}</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          {MiddleCategoryCmpList}
          {/* <MiddleCategoryCmp
            list={this.state.list}
            title={'SI/VI应用规范及维护'}
          />
          <MiddleCategoryCmp
            list={this.state.list}
            title={'SI/VI检查'}
          /> */}
        </ScrollView>

        {!this.state.gardeStatus && <BotBtn
          reset={this.reset}
          submit={this.sureSubmit}
        ></BotBtn>}

        {/* 检查结果弹框 */}
        <CheckAlert
          toCheckRecord={this.toCheckRecord}
          continue={this.continue}
          cancel={this.cancel}
          scoreTotal={this.state.scoreTotal - this.state.deductTotal}
          deductTotal={this.state.deductTotal}
          showStatus={this.state.checkAlertStatus}
        />
      </View>
    )
  }
}

const mapStateToProps = (state: any) => ({
  checkList: state.checkList
})
// const mapDispatchToProps = (dispatch: any) => ({
//   changeCheckList: (arr: object[]) => dispatch(changeCheckList(arr))
// })

export default connect(mapStateToProps, actions)(CheckListPage)

const styles: any = StyleSheet.create({
  checkList: {
    height: '100%',
    width: '100%'
  },
  grad: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: pxToDp(30),
    paddingRight: pxToDp(30),
    backgroundColor: '#f8f8f8',
    height: pxToDp(110),
  },
  gradText: {
    color: '#007AFF',
    lineHeight: pxToDp(110),
  },
  gradTotal: {
    color: '#007AFF',
    lineHeight: pxToDp(110),
    fontWeight: '700',
  },
  gradDeduct: {
    color: '#FF0718',
    lineHeight: pxToDp(110),
    fontWeight: '700',
  },
  scrollView: {
    marginBottom: pxToDp(100),
  },

  topRight: {
    width: pxToDp(180),
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  text: {
    width: pxToDp(38),
    height: pxToDp(38),
  }

})
