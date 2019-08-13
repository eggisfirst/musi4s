import React from "react";

import { View, Text, StyleSheet } from "react-native";
import pxToDp from "../../utils/fixcss";
import * as actions from '../../store/actions/filter/select'
import { connect } from 'react-redux';

interface IState {
  timeoutId: any
}

class SelectCmp extends React.Component<any>{
  state:IState = {
    timeoutId: null
  }
  /**
   * 点击切换选择
   */
  handleSelectClick = (index: number) => {
    if(index === this.props.selectFilter.activeIndex) {
      return
    }
    this.props.handleSelectActiveIndex(index)
    this.processor(index) 
  }
  /**
   * 防抖
   * @param index 
   */
  processor(index: number) {
    clearTimeout(this.state.timeoutId); 
    const timer = setTimeout(() => { 
      this.performProcessiong(index);
    },500) 
    this.setState({
      timeoutId: timer
    })
  }
  /**请求 */
  performProcessiong(index: number) {
    console.log(index)
  }

  render (){
    const selectList = this.props.selectFilter.selectList
    const activeIndex = this.props.selectFilter.activeIndex
    const activeColor = {
      color: "#FFCB38"
    }

    return(
      <View style={styles.container}> 
        {
          selectList && selectList.map((item : any, index : any) => (
            <Text key={index} style={[styles.text, activeIndex === index && activeColor]} onPress={() => {this.handleSelectClick(index)}}>{item}</Text>
          ))
        }
      </View>
    )
  }
}
const mapStateToProps = (state:any) => state
export default connect(mapStateToProps,actions)(SelectCmp)

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontSize: pxToDp(28),
    fontWeight: "500",
    marginRight: pxToDp(36)
  
  }
})