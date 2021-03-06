import React from "react";

import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import pxToDp from "../../utils/fixcss";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/filter/pullDownSelect';

interface IProps {
  pullDownData?: any
  pullDownSelect?: (index: number) => void
  data: any,
  select: (index: number) => void

}

interface IState {
  selectBoxStatus: boolean
}

/**
 * 每次使用需要在主页面初始化
 * componentDidMount() {
    this.props.pullDownSelect(0)
  }
 */
class PullDownCmp extends React.Component<IProps, IState>{
  state: IState = {
    selectBoxStatus: false
  }

  /**
   * 点击出现下拉框
   */
  handleShowBox = () => {
    this._setShowBoxStatus()
  }
  /**
   * 点击选择
   */
  handleSelect = (index: number) => {
    this.props.select(index)
    this._setShowBoxStatus()
    if (this.props.pullDownData.activeIndex === index) {
      return
    }
    if (this.props.pullDownSelect) {
      this.props.pullDownSelect(index)
    }
  }
  /**
   * 下拉框的出现隐藏
   */
  _setShowBoxStatus = () => {
    this.setState({
      selectBoxStatus: !this.state.selectBoxStatus
    })
  }
  render() {
    let activeIndex = this.props.pullDownData.activeIndex

    const activeBgColor = {
      backgroundColor: "#F3F8FF"
    }
    const activeRotate = {
      transform: [{ rotate: '-180deg' }]
    }
    const activeColor = {
      color: "#007aff"
    }
    // console.log('data',this.props.data)
    return (
      <View>
        <TouchableOpacity onPress={() => { this.handleShowBox() }} style={styles.container} activeOpacity={0.6}>
          <Text style={styles.text} numberOfLines={1}>{this.props.data.length?this.props.data[activeIndex].name : "暂无数据"}</Text>
          <Image style={[styles.downIcon, this.state.selectBoxStatus && activeRotate]} source={require("../../images/work/areaReport/checkRecord/more.png")} />
        </TouchableOpacity>
        {
          this.state.selectBoxStatus &&
          <ScrollView style={styles.downSelect}>
            {
              this.props.data.map((item: any, index: number) => (
                <TouchableOpacity onPress={() => { this.handleSelect(index) }} style={[styles.textBox, activeIndex === index && activeBgColor]} key={index}>
                  <Text style={[styles.selectText, activeIndex === index && activeColor]}>{item.name}</Text>
                  <Text style={[styles.selectScoreText, activeIndex === index && activeColor]}>{item.deduct!=0 && '-' + item.deduct + '分'}</Text>
                </TouchableOpacity>
              ))
            }

          </ScrollView>
        }

      </View>
    )
  }
}
const mapStateToProps = (state: any) => state
export default connect(mapStateToProps, actions)(PullDownCmp)

const styles = StyleSheet.create({
  container: {
    width: pxToDp(538),
    height: pxToDp(100),
    borderRadius: pxToDp(50),
    borderWidth: pxToDp(1),
    borderColor: "#e5e5e5",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  text: {
    color: "#090909",
    fontSize: pxToDp(30),
    flex: 0.8,
    textAlign: "center",
    paddingLeft: pxToDp(20),
    lineHeight: pxToDp(80)
  },
  downIcon: {
    width: pxToDp(20),
    height: pxToDp(12)
  },
  downSelect: {
    width: pxToDp(554),
    maxHeight: pxToDp(795),
    backgroundColor: "rgba(237,237,237,0.9)",
    borderRadius: pxToDp(10),
    // borderWidth: pxToDp(1),
    borderColor: "#eee",
    marginTop: pxToDp(11),
  },
  textBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: pxToDp(57),
    paddingRight: pxToDp(57),
  },
  selectText: {
    color: "#090909",
    fontSize: pxToDp(30),
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(20),
    lineHeight: pxToDp(40),
    // minHeight: pxToDp(80),
    width: '85%'
  },
  selectScoreText: {
    color: "#090909",
    fontSize: pxToDp(30),
    // lineHeight: pxToDp(80),
    textAlign:"right",
    width: '25%',
  },
})
