import React from "react";
import { connect } from 'react-redux';

import { View, Text, StyleSheet } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { CheckHeader } from '../../../components/workCmp/starCheck/CheckHeader';
import MiddleCategoryCmp from '../../../components/workCmp/starCheck/check/middleCategoryCmp'
import { IndexModel } from "../../../request";
import store from '../../../store';
import { changeCheckList } from '../../../store/actions/4s/checkList';

const indexModel = new IndexModel()
// const actions = {
//   ...changeCheckList,
// }
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
    console.log(!this.props.checkList[index].status, this.props.checkList[index].status)
    this.props.checkList[index].status = !this.props.checkList[index].status
    this.props.changeCheckList(this.props.checkList)
  }

  /**
   * 跳转检查详情页面
   */
  toDetail = (index: number, fatherIndex: number): void => {
    let name = this.props.checkList[fatherIndex].standardList[index].name
    this.props.navigation.navigate('CheckDetailPage', {
      name,
    })
  }

  /**
   * 获取店铺检查列表
   */
  subcategories = () => {
    let params = this.props.navigation.state.params
    console.log('参数：', params.categoryId, params.shopId)
    indexModel.subcategories(params.categoryId, params.shopId).then(res => {
      if (res.data) {
        if (res.data.categories && res.data.categories.length > 0) {
          this.props.changeCheckList(res.data.categories)
        }
      }
      // indexModel.getShopHistory(this.props.navigation.state.shopId).then(res => {
      console.log('获取抽奖列表接口：', res)
    })
  }

  componentDidMount() {
    console.log(123, this.props.navigation.state.params)
    // this.subcategories()
  }

  render() {
    const { navigation } = this.props
    const MiddleCategoryCmpList = this.props.checkList.map((item: any, index: number) => {
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
      <View>
        <CheckHeader
          // title={this.props.navigation.state.params.title}
          title={'this.props.navigation.state.title'}
          eggHandleBack={() => { navigation.goBack() }}
          eggHandleSearch={() => { navigation.push("SearchPage") }}
        />

        <View style={styles.grad}>
          <Text style={styles.gradText}>分数统计：</Text>
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
