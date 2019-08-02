import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import pxToDp from "../../../utils/fixcss";
import {CheckHeader} from '../../../components/workCmp/starCheck/CheckHeader';
import Sort from '../../../components/filterCmp/sortCmp';
import FilterIcon from '../../../components/filterCmp/filterCmp';
import FilterContentCmp from "../../../components/filterCmp/filterContentCmp";
import { ApplyItem } from '../../../components/workCmp/starCheck/applyItem';
import { ApplyBtn } from '../../../components/workCmp/starCheck/applyBtn';
import { BtnTypes, BtnTitle, AlertBtnTypes, StarCheckTypes } from '../../../utils/enum';
import { ApplyFooter } from '../../../components/workCmp/starCheck/applyFooter';
import { AlertCmp } from '../../../components/altrtCmp';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/filter/rightFliter';


interface IState {
  alertBox: BtnTitle
  starCheckType: StarCheckTypes
}

class HandelPage extends React.Component<any,IState>{
  static navigationOptions = {
    header: null,
  }
  state:IState = {
    alertBox: BtnTitle.null,
    starCheckType: StarCheckTypes.wait_handle
  }
 
  //安卓点击穿透处理
  handleSendBack = () => {

    this._setAlertBoxStatus(BtnTitle.sendBack)
  }
  handleApplying = () => {
    
    this._setAlertBoxStatus(BtnTitle.applying)
  }
  handleAlert = (status:AlertBtnTypes,value?: string) => {
    this._setAlertBoxStatus(BtnTitle.null)
    switch (status) {
      case AlertBtnTypes.cancle:
        break;
      case AlertBtnTypes.comfirm:
        break;
      case AlertBtnTypes.sendBack:
        console.log(value)
        break;
    }
  }
  _setAlertBoxStatus = (status: BtnTitle) => {
    this.setState({
      alertBox: status
    })
  }
  componentDidMount(){
    //顶部标题
    this.setState({
      starCheckType: this.props.navigation.state.params.type
    })
  }
 render (){
   const {navigation} = this.props
   const list = [
     {name: '广东广州何秋明发起申请！', star: "三星", week: 48, score: 90, date: "2019.06.04",key:'1'},
     {name: '广东广州马冬梅发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'2'},
     {name: '广东广州马冬梅发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'3'},
     {name: '广东广州马冬梅发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'4'},
     {name: '广东广州马冬梅发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'5'},
     {name: '广东广州马冬梅发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'6'},
     {name: '广东广州马冬梅发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'7'},
     {name: '广东广州马发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'8'},
     {name: '广东广州马发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'9'},
     {name: '广东广州马发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'10'},
   ]
 
   return(
    <View>
      <CheckHeader  title={this.state.starCheckType}
                    eggHandleBack={() => {navigation.goBack()}}
                    eggHandleSearch={() => {navigation.push("SearchPage")}} />
      <View style={styles.filterContainer}>
        <Sort />
        <FilterIcon />
      </View>
      {
        this.props.rightFilter.isActive && <FilterContentCmp />
      }

      <FlatList style={{backgroundColor:"#f8f8f8",marginBottom: pxToDp(300)}} 
                data={list}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (
                  <ApplyItem title={item.name} star={item.star}>
                    <View style={styles.btnStyle}>
                      <ApplyBtn handleClick={this.handleSendBack} title={BtnTitle.sendBack} color={BtnTypes.Red}/>
                      <ApplyBtn handleClick={this.handleApplying} title={BtnTitle.applying} color={BtnTypes.Blue}/>
                    </View>
                    <ApplyFooter score={item.score} week={item.week} date={item.date}/>
                  </ApplyItem>
                )}
              />
      {
        this.state.alertBox !== BtnTitle.null &&  
        <AlertCmp title={this.state.alertBox} 
                  comfirm={this.state.alertBox === BtnTitle.applying?  AlertBtnTypes.comfirm : undefined}
                  cancle={AlertBtnTypes.cancle}
                  sendBack={this.state.alertBox === BtnTitle.sendBack?  AlertBtnTypes.sendBack : undefined}
                  handleAlert={this.handleAlert}
                  />
      }
    </View>
   )
 }
}
const mapStateToProps = (state:any) => state

export default connect(mapStateToProps,actions)(HandelPage)

const styles = StyleSheet.create({
  filterContainer: {
    position:"relative",
    zIndex:999,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    borderColor:"#e1e1e1",
    borderBottomWidth:1
  },
  btnStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent:"flex-end",
    width: "100%"
  }
})