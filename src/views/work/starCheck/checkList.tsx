import React from "react";
import { connect } from 'react-redux';

import { View, Text, StyleSheet } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { CheckHeader } from '../../../components/workCmp/starCheck/CheckHeader';
import MiddleCategoryCmp from '../../../components/workCmp/starCheck/check/middleCategoryCmp'
import { changeCheckList } from '../../../store/actions/4s/checkList';
import { IndexModel } from "../../../request";
const indexModel = new IndexModel()
const actions = {
  ...changeCheckList,
}
interface IState {
  total: number
  deduct: number
}

class CheckListPage extends React.Component<any, IState>{
  state: IState = {
    total: 23,
    deduct: 9,
  }

  static navigationOptions = {
    header: null
  }
  //跳转到评分列表页面
  handleToCheckList = (index: number): void => {
    console.log('跳转检查小项', index)
  }

  /**
   * 显示/隐藏中类检查项
   */
  showClick = (index: number): void => {
    this.props.checkList[index].status = !this.props.checkList[index].status
    this.props.changeCheckList(this.props.checkList)
  }

  /**
   * 跳转检查详情页面
   */
  toDetail = (index: number): void => {
    this.props.navigation.push('CheckDetailPage')
  }

  /**
   * 获取店铺检查列表
   */
  getShopHistory = () => {
    indexModel.getShopHistory('1140542075666898945').then(res => {
      // indexModel.getShopHistory(this.props.navigation.state.shopId).then(res => {
      console.log('获取抽奖列表接口：', res)
      if (res.status) {

      }
    })
  }

  componentDidMount() {
    this.getShopHistory()
    console.log('url数据；', this.props.navigation.state)
  }

  render() {
    const { navigation } = this.props
    const MiddleCategoryCmpList = this.props.checkList.map((item: any, index: number) => {
      return <MiddleCategoryCmp
        key={`middleCategory${index}`}
        list={item.list}
        title={item.title}
        status={item.status}
        index={index}
        showClick={this.showClick}
        toDetail={this.toDetail}
      />
    })
    return (
      <View>
        <CheckHeader
          title={'店面SI标准一阶段'}
          // title={this.props.navigation.state.title}
          eggHandleBack={() => { navigation.goBack() }}
          eggHandleSearch={() => { navigation.push("SearchPage") }}
        />

        <View style={styles.grad}>
          <Text onPress={this.changeCheckList} style={styles.gradText}>分数统计：</Text>
          <View style={styles.grad}>
            <Text style={styles.gradTotal}>总分 {this.state.total} | </Text>
            <Text style={styles.gradDeduct}>扣分 {this.state.deduct}</Text>
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
      </View>
    )
  }
}

const mapStateToProps = (state: any) => state
const mapDispatchToProps = (dispatch: any) => ({
  changeCheckList: (arr: object[]) => dispatch(changeCheckList(arr))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckListPage)

const styles: any = StyleSheet.create({
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
  }
})
