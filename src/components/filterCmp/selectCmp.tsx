import React from "react";

import { View, Text, StyleSheet } from "react-native";
import pxToDp from "../../utils/fixcss";
import * as actions from '../../store/actions/filter/select'
import { connect } from 'react-redux';
import { SelectType } from "../../utils/enum";

interface IState {
  timeoutId: any
}

interface IProps {
  selectFilter?: any
  handleSelectActiveIndex?: any
  handleSelectStarActiveIndex?: any

  mySelectList: Array<string>
  selectType: SelectType
  color: string
  activeColor: string
  handleSelect: (index: number) => void
}
class SelectCmp extends React.Component<IProps,IState>{
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
    if(this.props.selectType === SelectType.qualified) {
      this.props.handleSelectActiveIndex(index)
    }else {
      this.props.handleSelectStarActiveIndex(index)
    }
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
    this.props.handleSelect(index)
  }

  render (){
    /**判断是哪个数据 */
    const selectList =  this.props.mySelectList

    const activeIndex = this.props.selectType === SelectType.qualified? 
                        this.props.selectFilter.activeIndex : this.props.selectFilter.selectActiveIndex 

    const activeColor = {
      color: this.props.activeColor
    }

    return(
      <View style={styles.container}> 
        {
          selectList && selectList.map((item : any, index : any) => (
            <Text key={index} style={[{color: this.props.color},styles.text, activeIndex === index && activeColor]} onPress={() => {this.handleSelectClick(index)}}>{item}</Text>
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
    fontSize: pxToDp(28),
    fontWeight: "500",
    marginRight: pxToDp(36)
  
  }
})