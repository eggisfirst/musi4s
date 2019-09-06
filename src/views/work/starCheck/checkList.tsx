import React from "react";
import { connect } from 'react-redux';

import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { CheckHeader } from '../../../components/workCmp/starCheck/CheckHeader';
import MiddleCategoryCmp from '../../../components/workCmp/starCheck/check/middleCategoryCmp'
import BotBtn from '../../../components/common/botBtn'
import {CheckAlert} from '../../../components/workCmp/starCheck/checkAlert'
import { IndexModel } from "../../../request";
import store from '../../../store';
import * as actions from '../../../store/actions/4s/checkList';

const indexModel = new IndexModel()
// const actions = {
//   ...changeCheckList,
// }
interface IState {
  deductTotal: number
  scoreTotal: number
  levelId: string
  checkAlertStatus: boolean
}

class CheckListPage extends React.Component<any, IState>{
  state: IState = {
    deductTotal: 0,
    scoreTotal: 0,
    levelId: '',
    checkAlertStatus: false
  }

  static navigationOptions = {
    header: null
  }

  /**
   * 显示/隐藏中类检查项
   */
  showClick = (index: number): void => {
    // console.log(!this.props.checkList[index].status, this.props.checkList[index].status)
    this.props.checkList.checkList[index].status = !this.props.checkList.checkList[index].status
    this.props.changeCheckList(this.props.checkList.checkList)
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
      categoryList: this.filterParams(this.props.checkList.checkList)
    }
    indexModel.submitForm(data).then(res => {
      if (res.status) {
        const { goBack,state } = this.props.navigation;
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
            {text: '确定', onPress: () => console.log('onPress OK')},
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
    // this.subcategories()
  }

  /**
   * 跳转检查详情页面
   */
  toDetail = (index: number, fatherIndex: number): void => {
    let name = this.props.checkList.checkList[fatherIndex].standardList[index].name
    this.props.navigation.navigate('CheckDetailPage', {
      name,
      index,
      fatherIndex,
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
    let params = this.props.navigation.state.params
    indexModel.subcategories(params.categoryId, params.shopId).then(res => {
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
  filterData = (data: any[]) => {
    let arr: object[] = []
    let scoreTotal = 0
    for (let i = 0; i < data.length; i++) {
      scoreTotal += data[i].total
      let temp: any = {}
      temp.status = i === 0 ? true : false
      temp.standardList = []
      temp.name = data[i].name
      temp.categoryId = data[i].id
      if (data[i].standardList) {
        for (let j = 0; j < data[i].standardList.length; j++) {
          let obj: any = {}
          obj.name = data[i].standardList[j].name
          obj.type = false
          obj.standardId = data[i].standardList[j].id
          obj.urls = [ //上传文件url集合
            "https://derucci-app-test.oss-cn-hangzhou.aliyuncs.com/upload/20190709/31aa61edcf990ecf7d38b2b5a4829eb6.pptx",
            "https://derucci-app-test.oss-cn-hangzhou.aliyuncs.com/upload/20190709/31aa61edcf990ecf7d38b2b5a4829eb6.pptx"
          ]
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
          obj.urls = [ // 上传文件url集合
            "https://derucci-app-test.oss-cn-hangzhou.aliyuncs.com/upload/20190709/31aa61edcf990ecf7d38b2b5a4829eb6.pptx",
            "https://derucci-app-test.oss-cn-hangzhou.aliyuncs.com/upload/20190709/31aa61edcf990ecf7d38b2b5a4829eb6.pptx"
          ]
          temp.standardList.push(obj)
        }
      }
      arr.push(temp)
    }
    return arr
  }

  toCheckRecord = () => {
    this.submit()
  }

  continue = () => {
    this.setState({checkAlertStatus: false})
    this.submit('goback')
  }

  cancel = () => {
    console.log('取消')
    this.setState({checkAlertStatus: false})
  }

  componentDidMount() {
    this.subcategories()
    this.setState({ deductTotal: this.computeDeductTotal(this.props.checkList.checkList) | 0 })
    this.props.changeCheckList([])
  }

  render() {
    console.log(this.props)
    const { navigation } = this.props
    const MiddleCategoryCmpList = this.props.checkList.checkList && this.props.checkList.checkList.map((item: any, index: number) => {
      return <MiddleCategoryCmp
        key={`middleCategory${index}`}
        list={item.standardList}
        title={item.name}
        status={item.status}
        index={index}
        showClick={this.showClick}
        toDetail={this.toDetail}
      />
    })
    return (
      <View style={styles.checkList}>
        <CheckHeader
          title={this.props.navigation.state.params.title}
          // title={'this.props.navigation.state.title'}
          eggHandleBack={() => { navigation.goBack() }}
          eggHandleSearch={() => { navigation.push("SearchPage") }}
        />

        <View style={styles.grad}>
          <Text style={styles.gradText}>分数统计：</Text>
          <View style={styles.grad}>
            <Text style={styles.gradTotal}>总分 {this.state.scoreTotal} | </Text>
            <Text style={styles.gradDeduct}>扣分 {this.state.deductTotal}</Text>
          </View>
        </View>

        <View>
          {MiddleCategoryCmpList}
          {/* <MiddleCategoryCmp
            list={this.state.list}
            title={'SI/VI应用规范及维护'}
          />
          <MiddleCategoryCmp
            list={this.state.list}
            title={'SI/VI检查'}
          /> */}
        </View>
        <BotBtn
          reset={this.reset}
          submit={() => {this.setState({checkAlertStatus: true})}}
        ></BotBtn>

        {/* 检查结果弹框 */}
        <CheckAlert
          toCheckRecord={this.toCheckRecord}
          continue={this.continue}
          cancel={this.cancel}
          scoreTotal={this.state.scoreTotal}
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
    height: Dimensions.get('screen').height,
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
})
