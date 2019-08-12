import React from "react";
import { View, StyleSheet, FlatList, Text} from "react-native";
import pxToDp from "../../../utils/fixcss";
import {CheckHeader} from '../../../components/workCmp/starCheck/CheckHeader';
import Sort from '../../../components/filterCmp/sortCmp';
import FilterIcon from '../../../components/filterCmp/filterCmp';
import FilterContentCmp from "../../../components/filterCmp/filterContentCmp";
import { ApplyItem } from '../../../components/workCmp/starCheck/applyItem';
import { ApplyBtn } from '../../../components/workCmp/starCheck/applyBtn';
import { BtnTypes, BtnTitle, AlertBtnTypes, StarCheckTypes, Duty } from '../../../utils/enum';
import { ApplyFooter } from '../../../components/workCmp/starCheck/applyFooter';
import { AlertCmp } from '../../../components/altrtCmp';

import { connect } from 'react-redux';
import * as sort from '../../../store/actions/filter/sort'
import * as rightFliter from '../../../store/actions/filter/rightFliter';
import * as handlePageState from '../../../store/actions/4s/handlePageState';
import { SponsorBox } from '../../../components/workCmp/sponsorCmp/sponsorBox';
import { ScoreItem } from '../../../components/workCmp/processCmp/scoreItem';
import ProcessBox from '../../../components/workCmp/processCmp/processBox';
const actions = {
  ...rightFliter,
  ...handlePageState,
  ...sort
}

interface IState {
  alertBox: BtnTitle
  starCheckType: StarCheckTypes
  index: number
  sponsorStatus: boolean
  processBoxStatus: boolean
}

class HandelPage extends React.Component<any,IState>{
  static navigationOptions = {
    header: null,
  }
  state:IState = {
    alertBox: BtnTitle.null,
    starCheckType: StarCheckTypes.wait_handle,
   
    index: -1,
    sponsorStatus: false,
    processBoxStatus: false

  }

  list =  [
    {name: '广东广州何秋明', star: "三星", week: 48, score: 90, date: "2019.06.04",key:'1'},
    {name: '广东广州马梅',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'2'},
    {name: '广东广州冬梅',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'3'},
    {name: '广东广州马冬',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'4'},
    {name: '广东广州马冬梅',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'5'},
    {name: '广东广州马冬梅',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'6'},
    {name: '广东广州马冬梅',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'7'},
    {name: '广东广州马',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'8'},
    {name: '广东广州马',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'9'},
    {name: '广东广州马',star: "一星",  week: 37, score: 82, date: "2019.05.04",key:'10'},
  ]
 
  //安卓点击穿透处理

  /**退回 */
  handleSendBack = (index: number) => {
    this._setHanleClick(index,BtnTitle.sendBack)
  }
  /**受理 */
  handleApplying = (index:number) => {
    this._setHanleClick(index,BtnTitle.applying)
  }
  /**发起验证 */
  handleSponsor = (index: number) => {
    console.log('发起认证')
    this._setSponsorStatus(true, index)
  }
  /**验收 */
  handleReception = (index: number) => {
    console.log(index)
    this.props.navigation.navigate('ReceptionPage',{
      index
    })
    // this._setHanleClick(index,BtnTitle.reception)
  }
  /**退回和受理 */
  handleAlert = (status:AlertBtnTypes,value?: string) => {
    this._setAlertBoxStatus(BtnTitle.null)
    switch (status) {
      case AlertBtnTypes.cancle:
        console.log('cancle')
        break;
      case AlertBtnTypes.comfirm:
        //请求
        this.list.splice(this.state.index,1)
        console.log('confirm',this.list[this.state.index])
        break;
      case AlertBtnTypes.sendBack:
        this.list.splice(this.state.index,1)
        console.log(value)
        break;
    }
  }
  _setAlertBoxStatus = (status: BtnTitle) => {
    this.setState({
      alertBox: status
    })
  }
  _setHanleClick = (index: number,state: BtnTitle) => {
    this.setState({
      index: index
    })
    this._setAlertBoxStatus(state)
  }

  /**提交认证 */
  handleSponsorComfirm = () => {
    //请求
    this._setSponsorStatus(false)
    this.list.splice(this.state.index,1)
  }
  /**取消认证 */
  handleSponsorCancle = () => {
    this._setSponsorStatus(false)
  }
  /**弹出认证进度弹框 */
  handleShowReceptionBox = (index: number) => {
    if(this.state.starCheckType !== StarCheckTypes.processing_record) {
      return
    }
    /**请求 */
    this.setState({
      processBoxStatus: true
    })
  }
  /**关闭认证弹框 */
  handleCloseProcessBox = () => {
    this.setState({
      processBoxStatus: false
    })
  }
  

  _setSponsorStatus = (sponsorStatus: boolean, index?:number) => {
    if(index !== undefined) {
      this.setState({
        index: index
      })
    }
    this.setState({
      sponsorStatus,
    })
    
  }
  /**初始化筛选框 */
  initFilter = () => {
    /**排序 */
    this.props.handleSortIndex(0)
    /**筛选日期 */
    this.props.selectStartDate(new Date())
    this.props.selectEndDate(new Date())
    /**认证进度里面的处理情况 */
    this.props.handleSituation(-1)
    /**星级选择 */
    this.props.handleSelectStarIndex(-1)
  }
  /**获取上一页传过来的状态并设置顶部标题 */
  getPageState() {
    this.props.changeHandleState(this.props.navigation.state.params.type)
    this.setState({
      starCheckType: this.props.navigation.state.params.type
    })
  }
  componentWillMount() {
    this.initFilter()
    this.getPageState()
  }

 render (){
  // console.log(this.props.handlePageState.HState)
  const {navigation} = this.props
  const HState = this.props.handlePageState.HState
  const scoreType = {
    shop: true,
    area: false,
    four: false
  }
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
        this.props.rightFilter.isActive && <FilterContentCmp type={this.state.starCheckType}/>
      }

      <FlatList style={{backgroundColor:"#f8f8f8",marginBottom: pxToDp(300)}} 
                data={this.list}
                keyExtractor={item => item.key}
                renderItem={({ item,index }) => (
                <ApplyItem  title={item.name} 
                            star={item.star} 
                            type={this.state.starCheckType}
                            index={index}
                            handleShowReceptionBox={this.handleShowReceptionBox}>
                  <View style={styles.btnStyle}>
                    {
                      HState === StarCheckTypes.wait_handle &&
                      <>
                        <ApplyBtn handleClick={this.handleSendBack} index={index} title={BtnTitle.sendBack} color={BtnTypes.Red}/>
                        <ApplyBtn handleClick={this.handleApplying} index={index} title={BtnTitle.applying} color={BtnTypes.Blue}/>
                      </>
                    }
                    {
                      HState === StarCheckTypes.wait_reception &&
                      <>
                        <ApplyBtn  handleClick={this.handleReception} index={index} title={BtnTitle.reception} color={BtnTypes.Blue}/>
                      </>
                    }
                    {
                      HState === StarCheckTypes.wait_sponsor &&
                      <View style={styles.sponsor}>
                        <Text style={styles.sponsorDate}>申请时间：2019.06.04</Text>
                        <ApplyBtn handleClick={this.handleSponsor} index={index} title={BtnTitle.sponsor} color={BtnTypes.Blue}/>
                      </View>
                    }
                    {
                      HState === StarCheckTypes.processing_record &&
                      <Text style={styles.processStatus_red}>已撤回</Text>
                    }
                  </View>
                  {
                    HState === StarCheckTypes.wait_handle || HState === StarCheckTypes.wait_reception?
                      <ApplyFooter score={item.score} week={item.week} date={item.date}/> : <></>
                  }
                  {
                    HState === StarCheckTypes.processing_record &&
                    <View style={styles.process_footer}>
                      <ScoreItem scoreType={scoreType}/>
                      <ScoreItem reason={'不符合规范'} />
                    </View>
                  }
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
      {
        this.state.sponsorStatus && 
        <SponsorBox duty={Duty.fourS} 
                    handleSponsorCancle={this.handleSponsorCancle}
                    handleSponsorComfirm={this.handleSponsorComfirm}/>
      }

      {
        this.state.processBoxStatus &&
        <ProcessBox handleCloseProcessBox={this.handleCloseProcessBox}/>
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
  },
  sponsor: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: pxToDp(24)
  },
  sponsorDate: {
    color: "#666",
    fontSize: pxToDp(26)
  },
  processStatus_blue: {
    color: "#007aff",
    fontSize: pxToDp(30)
  },
  processStatus_red: {
    color: "#FF2D55",
    fontSize: pxToDp(30)
  },
  process_footer: {
    marginTop: pxToDp(20)
  }
})