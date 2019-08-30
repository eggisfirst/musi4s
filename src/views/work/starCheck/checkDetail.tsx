import React from "react";
import { connect } from 'react-redux';

import { View, Text, StyleSheet } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { CheckHeader } from '../../../components/workCmp/starCheck/CheckHeader';
import { changeCheckList } from '../../../store/actions/4s/checkList';

const actions = {
  ...changeCheckList,
}

interface IState {
  total: number
  deduct: number
}

class CheckDetailPage extends React.Component<any, IState>{
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
    return (
      <View>
        <CheckHeader
          title={'店面SI标准一阶段'}
          eggHandleBack={() => { navigation.goBack() }}
          eggHandleSearch={() => { navigation.push("SearchPage") }}
        />
      </View>
    )
  }
}

const mapStateToProps = (state: any) => state
const mapDispatchToProps = (dispatch: any) => ({
  changeCheckList: (arr: object[]) => dispatch(changeCheckList(arr))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckDetailPage)

const styles: any = StyleSheet.create({

})
