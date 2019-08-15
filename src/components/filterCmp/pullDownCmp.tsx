import React from "react";

import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import pxToDp from "../../utils/fixcss";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/filter/pullDownSelect';

interface IProps {
  pullDownData?: any
  pullDownSelect?: (index: number) => void
}

interface IState {
  selectBoxStatus: boolean
}

 class PullDownCmp extends React.Component<IProps,IState>{
  state:IState = {
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
    this._setShowBoxStatus()
    if(this.props.pullDownData.activeIndex === index) {
      return
    }
    if(this.props.pullDownSelect) {
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
  render (){
    let activeIndex = this.props.pullDownData.activeIndex

    const activeBgColor = {
      backgroundColor: "#F3F8FF"
    }
    const activeRotate = {
      transform: [{rotate:'-180deg'}]
    }
    const activeColor = {
      color: "#007aff"
    }

    const list = [
      {
        name: "店面面积",
        score: '-8'
      },
      {
        name: "店面类型",
        score: ''
      },
      {
        name: "装修时间",
        score: '-4'
      },
      {
        name: "门店灯箱",
        score: ''
      }, {
        name: "地面",
        score: '-8'
      }
    ]
    return(
      <View>
        <TouchableOpacity onPress={() => {this.handleShowBox()}} style={styles.container} activeOpacity={0.6}> 
          <Text style={styles.text} numberOfLines={1}>{list[activeIndex].name}</Text>
          <Image style={[styles.downIcon, this.state.selectBoxStatus && activeRotate]} source={require("../../images/work/areaReport/checkRecord/more.png")}/>
        </TouchableOpacity>
        {
          this.state.selectBoxStatus && 
          <ScrollView style={styles.downSelect}>
            {
              list.map((item, index) => (
                <TouchableOpacity onPress={() => {this.handleSelect(index)}} style={[styles.textBox,activeIndex === index && activeBgColor]} key={index}>
                  <Text style={[styles.selectText,activeIndex === index && activeColor]}>{item.name}</Text>
                  <Text style={[styles.selectText,activeIndex === index && activeColor ]}>{item.score && item.score + '分'}</Text>
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
    textAlign:"center",
    paddingLeft: pxToDp(20),
    lineHeight: pxToDp(80)
  },
  downIcon: {
    width: pxToDp(20),
    height: pxToDp(11)
  },
  downSelect: {
    width: pxToDp(554),
    height: pxToDp(795),
    backgroundColor: "rgba(237,237,237,0.9)",
    borderRadius: pxToDp(10),
    borderWidth: pxToDp(1),
    borderColor: "#eee",
    marginTop: pxToDp(11)
    // position: "absolute",
    // left: 0,
    // top: pxToDp(111),
    // zIndex: 99,
  },
  textBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems:"center",
    flexDirection:"row",
    paddingLeft: pxToDp(57),
    paddingRight: pxToDp(57)
  },
  selectText: {
    color: "#090909",
    fontSize: pxToDp(30),
    lineHeight: pxToDp(80)
  },
})
