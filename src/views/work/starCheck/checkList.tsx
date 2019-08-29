import React from "react";
import { connect } from 'react-redux';

import { View, Text, StyleSheet } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { CheckHeader } from '../../../components/workCmp/starCheck/CheckHeader';
import MiddleCategoryCmp from '../../../components/workCmp/starCheck/check/middleCategoryCmp'
import { changeCheckList } from '../../../store/actions/4s/checkList';
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

  showClick = (index: number): void => {
    this.props.checkList[index].status = !this.props.checkList[index].status
    this.props.changeCheckList(this.props.checkList)
  }

  componentDidMount() {
    console.log('redux数据；', this.props.checkList)
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
      />
    })
    return (
      <View>
        <CheckHeader
          title={'店面SI标准一阶段'}
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
