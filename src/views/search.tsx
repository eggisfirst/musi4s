import React from "react";
import { View,Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import pxToDp from "../utils/fixcss";
import { TextInput, FlatList } from "react-native-gesture-handler";
import { ApplyItem } from "../components/workCmp/starCheck/applyItem";
import { ApplyBtn } from "../components/workCmp/starCheck/applyBtn";
import { BtnTitle, BtnTypes, AlertBtnTypes } from "../utils/enum";
import { ApplyFooter } from "../components/workCmp/starCheck/applyFooter";
import { AlertCmp } from "../components/altrtCmp";

interface obj {
  name: string
  star: string
  week: number
  score: number
  date: string
}
interface IState {
  value: string
  list: Array<obj>
  alertBox: BtnTitle
  index: number
}

export default class Search extends React.Component<any,IState> {
  static navigationOptions = {
    header: null,
  }
  state:IState = {
    value: '',
    list: [],
    alertBox:BtnTitle.null,
    index: -1
  }
  //更改输入框的值
  handleChange = (value:string) => {
    this.setState({
      value
    })
  }
  //搜索请求数据
  handleSubmit = () => {
    //请求
    const list = [
      {name: '广东广州何秋明发起申请！', star: "三星", week: 48, score: 90, date: "2019.06.04",},
      {name: '广东广州马冬梅发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04",},
      {name: '广东广州马冬梅发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04",},
      {name: '广东广州马冬梅发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04"},
      {name: '广东广州马冬梅发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04"},
      {name: '广东广州马冬梅发起申请！',star: "一星",  week: 37, score: 82, date: "2019.05.04"},
    ]
    this.setState({
      list
    })
  }
  //退回
  handleSendBack = (index: number) => {
    this.setState({
      index
    })
    this._setAlertBoxStatus(BtnTitle.sendBack)
  }
  //受理
  handleApplying = (index: number) => {
    this.setState({
      index
    })
    this._setAlertBoxStatus(BtnTitle.applying)
  }
  //弹出框状态以及点击回调
  handleAlert = (status:AlertBtnTypes,value?: string) => {
    switch (status) {
      case AlertBtnTypes.cancle:
        this._setAlertBoxStatus(BtnTitle.null)
        break;
      case AlertBtnTypes.comfirm:
        this._setList(this.state.index)
        this._setAlertBoxStatus(BtnTitle.null)

        break;
      case AlertBtnTypes.sendBack:
        this._setList(this.state.index)
        console.log(value)
        this._setAlertBoxStatus(BtnTitle.null)
        break;
    }
  }
  //
  _setList(index: number) {
    //请求
    let list = this.state.list
    list.splice(index,1)
    this.setState({
      list
    })
  }
  _setAlertBoxStatus = (status: BtnTitle) => {
    this.setState({
      alertBox: status
    })
  }
  render() {
    const {navigation} = this.props
    return(
      <View style={styles.home}>
        <View style={styles.container}>
          <TouchableOpacity 
              style={styles.backBtn}
              onPress={() => {navigation.goBack()}}>
              <Image  style={styles.arrow}
                      source={require("../images/work/starCheck/arrow.png")}/>
          </TouchableOpacity>
          <View style={styles.inputStyle}>
            <Image  style={styles.searchIcon}
                    source={require("../images/work/starCheck/search.png")} />
            <TextInput
              style={styles.input}
              maxLength={20}
              value={this.state.value}
              onChangeText={(text) => {this.handleChange(text)}}
              autoFocus={true}
              placeholder="请输入经销商名称"
              returnKeyType="search"
              onSubmitEditing={() => {this.handleSubmit()}}
            />
          </View>
        </View>
       
        <FlatList style={{backgroundColor:"#f8f8f8"}} 
                data={this.state.list}
                keyExtractor={(item,index) => index + "1"}
                renderItem={({ item, index }) => (
                  <ApplyItem title={item.name} star={item.star}>
                    <View style={styles.btnStyle}>
                      <ApplyBtn handleClick={this.handleSendBack} index={index} title={BtnTitle.sendBack} color={BtnTypes.Red}/>
                      <ApplyBtn handleClick={this.handleApplying} index={index} title={BtnTitle.applying} color={BtnTypes.Blue}/>
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

const styles = StyleSheet.create({
  home: {
    backgroundColor: "#f8f8f8",
    width:pxToDp(750),
    height: "100%"
  },
  container: {
    // marginTop:pxToDp(55),
    paddingLeft:pxToDp(32),
    paddingRight:pxToDp(22),
    display:"flex",
    flexDirection:"row",
    // justifyContent:"space-between",
    alignItems:"center",
    width: "100%",
    height: pxToDp(176),
    backgroundColor:"#fff",
    paddingTop: pxToDp(90)

  },
  backBtn: {
    paddingRight: pxToDp(40),
  },
  arrow: {
    width:pxToDp(20),
    height:pxToDp(36),
  },
  inputStyle: {
    width: pxToDp(590),
    height: pxToDp(60),
    backgroundColor: "#f7f7f7",
    borderRadius: pxToDp(30),
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    paddingLeft:pxToDp(30),
    paddingRight:pxToDp(30),
  },
  searchIcon :{
    width: pxToDp(32),
    height: pxToDp(32),
    marginRight: pxToDp(10)
  },
  input: {
    color: "#999",
    fontSize: pxToDp(26),
    padding: 0,
    width: pxToDp(450),
  },
  btnStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent:"flex-end",
    width: "100%"
  }
})
