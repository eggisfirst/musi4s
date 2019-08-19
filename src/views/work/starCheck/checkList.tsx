import React from "react";

import { View, Text, StyleSheet } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { CheckHeader } from '../../../components/workCmp/starCheck/CheckHeader';
import MiddleCategoryCmp from '../../../components/workCmp/starCheck/check/middleCategoryCmp'

interface IState {
  total: number
  deduct: number
  list: Array<{name:string,status:boolean}>
}

export default class CheckList extends React.Component<any, IState>{
  state: IState = {
    total: 23,
    deduct: 9,
    list: [
      // {
      //   name: '店面',
      //   status: false,
      // },
      // {
      //   name: '店面面积',
      //   status: false,
      // },
      // {
      //   name: '店面类型',
      //   status: false,
      // },
      // {
      //   name: '装修时间/到期时间',
      //   status: false,
      // }
    ]
  }

  static navigationOptions = {
    header: null
  }
  //跳转到评分列表页面
  handleToCheckList = (index: number): void => {
    console.log('跳转检查小项', index)
  }

  componentDidMount() {
    this.setState({
      list: 
      [
        {
          name: '店面1',
          status: true,
        },
        {
          name: '店面面积1',
          status: false,
        },
        {
          name: '店面类型',
          status: false,
        },
        {
          name: '装修时间/到期时间',
          status: false,
        },
      ]
    })

  }

  render() {
    const { navigation } = this.props
    return (
      <View>
        <CheckHeader
          title={'店面SI标准一阶段'}
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
          <MiddleCategoryCmp list={this.state.list} />
        </View>
      </View>
    )
  }
}

const styles: any = StyleSheet.create({
  grad: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: pxToDp(32),
    paddingRight: pxToDp(32),
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
