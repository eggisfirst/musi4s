import React from "react";
import { View,Text, Platform, StyleSheet } from "react-native";
import pxToDp from "../../../utils/fixcss";
import CheckHeader from '../../../components/workCmp/starCheck/CheckHeader';
import { Sort } from '../../../components/filterCmp/sortCmp';
import { FilterCmp } from '../../../components/filterCmp/filterCmp';


interface IState {
  activeIndex: number,
  sortList: Array<string>
}

export default class HandelPage extends React.Component<any,IState>{
  static navigationOptions = {
    header: null,
  }
  state:IState = {
    activeIndex: 0,
    sortList:['申请时间升序','申请时间降序']
  }
  //排序
  handleSort = (i:number) => {
    if(this.state.activeIndex === i) {
      return
    }
    this.setState({
      activeIndex: i
    })
    //请求数据
  }

 render (){
   const {navigation} = this.props
  return(
    <View>
      <CheckHeader  eggHandleBack={() => {navigation.goBack()}}
                    eggHandleSearch={() => {navigation.push("SearchPage")}} />
      <View style={styles.filterContainer}>
        <Sort handleSort={this.handleSort} 
              activeIndex={this.state.activeIndex}
              sortList={this.state.sortList}/>
        <FilterCmp />
      </View>
      <View style={{borderTopWidth:1,borderColor:"#e1e1e1",width:"100%",height:80}}>
        <Text>123</Text>
      </View>
    </View>
   )
 }
}

const styles = StyleSheet.create({
  filterContainer: {
    position:"relative",
    zIndex:999,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  }
})