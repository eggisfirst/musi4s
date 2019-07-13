import React from "react";
import { View,Text, Platform, StyleSheet, Button } from "react-native";
import pxToDp from "../../../utils/fixcss";
import CheckHeader from '../../../components/workCmp/starCheck/CheckHeader';
import { Sort } from '../../../components/filterCmp/sortCmp';
import { FilterCmp } from '../../../components/filterCmp/filterCmp';
import { FilterContentCmp } from "../../../components/filterCmp/filterContentCmp";
import DateTimePicker from "react-native-modal-datetime-picker";

interface IState {
  sortActiveIndex: number,
  sortList: Array<string>,
  finterActiveIndex: number,
  filterList: Array<string>
  finterStatus: boolean
  isDateTimePickerVisibl: boolean
}

export default class HandelPage extends React.Component<any,IState>{
  static navigationOptions = {
    header: null,
  }
  state:IState = {
    sortActiveIndex: 0,
    sortList:['申请时间升序','申请时间降序'],
    finterActiveIndex: -1,
    filterList: ['一星','二星','三星','四星','五星'],
    finterStatus: false,
    isDateTimePickerVisibl: false
  }
  //排序
  handleSort = (i:number) => {
    if(this.state.sortActiveIndex === i) {
      return
    }
    this.setState({
      sortActiveIndex: i,
    })
    //请求数据
  }
  //侧边栏出现隐藏
  handleFilterStatus = () => {
    this._setFilterStatus()
  }
  //筛选
  handleFilter = (i:number) => {
    if(this.state.finterActiveIndex === i) {
      this._setFilterActiveIndex(-1)
      return
    }
    this._setFilterActiveIndex(i)
  }
  //重置
  handleReset = () => {
    this._setFilterActiveIndex(-1)
  }
  //完成
  handleComfirm = () => {
    this._setFilterStatus()
    //请求
  }
  _setFilterStatus = () => {
    this.setState({
      finterStatus: !this.state.finterStatus
    })
  }
  _setFilterActiveIndex = (i: number) => {
    this.setState({
      finterActiveIndex: i
    })
  }


  showDateTimePicker = () => {
    this.setState({ 
      isDateTimePickerVisibl: true 
    });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisibl: false });
  };

  handleDatePicked = (date:any) => {
    console.log("A date has been picked: ", date);
    this.hideDateTimePicker();
  };

 render (){
   const {navigation} = this.props
  return(
    <View>
      <CheckHeader  eggHandleBack={() => {navigation.goBack()}}
                    eggHandleSearch={() => {navigation.push("SearchPage")}} />
      <View style={styles.filterContainer}>
        <Sort handleSort={this.handleSort} 
              sortActiveIndex={this.state.sortActiveIndex}
              sortList={this.state.sortList}/>
        <FilterCmp  handleFilterStatus={this.handleFilterStatus} />
      </View>
      {
        this.state.finterStatus &&  
        <FilterContentCmp filterList={this.state.filterList} 
                          finterActiveIndex={this.state.finterActiveIndex}
                          handleFilter={this.handleFilter}
                          handleReset={this.handleReset}
                          handleComfirm={this.handleComfirm}/>
      }
      <View style={{borderTopWidth:1,borderColor:"#e1e1e1",width:"100%",height:80}}>
      <Button title="Show DatePicker" onPress={this.showDateTimePicker} />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisibl}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
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