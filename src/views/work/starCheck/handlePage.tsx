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
import { IndexModel } from "../../../request";
import { _retrieveData } from "../../../utils/utils";
import { format } from "../../../utils";
const indexModel = new IndexModel()
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
  type: string | number
  list:Array<any> 
  parmas: any
  pageType: StarCheckTypes | undefined
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
    processBoxStatus: false,
    type: '',
    list: [],
    parmas: {
      page: '',
      limit: '',
      sort: '',
    },
    pageType: undefined
  }
  
  //请求
  /**获取待受理页面名单数据 */
  getAcceptList(myData:any) {
    indexModel.getAcceptList(myData).then(res => {
      if(res.status) {
        this.setState({
          list:res.data.list
        })
      }
    })
  }
  /**判断不同页面的请求名单数据 */
  getList(data:any) {
    if(this.props.navigation.state.params.type === StarCheckTypes.wait_handle) {
      this.getAcceptList(data)
    }
  }


  /**获取级别 */
  getLevelType() {
    _retrieveData('type').then(res => {
      if(!res) {
        return
      }
      this.setState({
        type: res
      })
    })
  }


  /**排序 */
  handleClickSort = () => {
    setTimeout(() => {
      let sort = this.props.sort.activeIndex === 0? 'asc' : 'desc'
      this.getList({page:1,limit:10,sort})
    }, 100);
  }
  /**筛选重置 */
  filterReset = () => {
    const sort = this.props.sort.activeIndex === 0? 'asc' : 'desc'
    /**注意认证的参数！！！ */
    console.log('reset')
    this.getList({page:1,limit:10,sort})
  }
  /**筛选 */
  filterComfirm = () => {
    let startDate = format(new Date(this.props.rightFilter.startDate))
    let endDate = format(new Date(this.props.rightFilter.endDate))
    let sort = this.props.sort.activeIndex === 0? 'asc' : 'desc'
    let starLevel = this.props.rightFilter.starIndex + 1
    let status = this.props.rightFilter.situationIndex + 1
    let data = {
      startDate,
      endDate,
      page: 1,
      limit: 10,
      sort,
      starLevel: starLevel,
      status: this.props.handlePageState.HState === StarCheckTypes.wait_reception &&  status
    }
    let newData = this.getParmas(data)
    console.log('筛选')
    this.getList(newData)
  }

  /**获取参数 */
  getParmas(myData:any) {
    let data = this.state.parmas
    console.log('data',myData)
    for (const key in myData) {
      if(myData[key]) {
        data[key] = myData[key]
      }else {
        delete data[key]
      }
    }
    return data
  }
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
    const list = this.state.list
    const id = list[this.state.index].id
    const sort = this.props.sort.activeIndex === 0? 'asc' : 'desc'
    this._setAlertBoxStatus(BtnTitle.null)
    switch (status) {
      case AlertBtnTypes.cancle:
        console.log('cancle')
        break;
      case AlertBtnTypes.comfirm:
        //请求
        indexModel.accept(id).then(res => {
          if(res.status) {
            this.getList({page:1,limit:10,sort})
          }
        })
        break;
      case AlertBtnTypes.sendBack:
        indexModel.sendBack(id,value).then(res => {
          if(res.status) {
            this.getList({page:1,limit:10,sort})
          }
        })
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
    // this.list.splice(this.state.index,1)
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
  componentDidMount() {
    this.setState({
      pageType: this.props.navigation.state.params.type
    })
    this.getPageState()
    this.initFilter()
    this.getList({page:1,limit:10,sort:'asc'})
    this.getLevelType()
  }

 render (){
  const {navigation} = this.props
  // const HState = this.props.handlePageState.HState
 
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
        <Sort handleClickSort={this.handleClickSort}/>
        <FilterIcon />
      </View>
        {
          this.props.rightFilter.isActive && 
          <FilterContentCmp type={this.state.starCheckType}
                            filterComfirm={this.filterComfirm}
                            filterReset={this.filterReset}/>
        }
      <FlatList style={{backgroundColor:"#f8f8f8",marginBottom: pxToDp(300)}} 
                data={this.state.list}
                keyExtractor={item => item.id}
                renderItem={({ item,index }) => (
                <ApplyItem  title={item.distributor} 
                            star={item.approveLevel} 
                            type={this.state.starCheckType}
                            index={index}
                            handleShowReceptionBox={this.handleShowReceptionBox}>
                  <View style={styles.btnStyle}>
                    {
                      this.state.pageType === StarCheckTypes.wait_handle &&
                      <>
                        <ApplyBtn handleClick={this.handleSendBack} index={index} title={BtnTitle.sendBack} color={BtnTypes.Red}/>
                        <ApplyBtn handleClick={this.handleApplying} index={index} title={BtnTitle.applying} color={BtnTypes.Blue}/>
                      </>
                    }
                    {
                      this.state.pageType === StarCheckTypes.wait_reception &&
                      <>
                        <ApplyBtn  handleClick={this.handleReception} index={index} title={BtnTitle.reception} color={BtnTypes.Blue}/>
                      </>
                    }
                    {
                      this.state.pageType === StarCheckTypes.wait_sponsor &&
                      <View style={styles.sponsor}>
                        <Text style={styles.sponsorDate}>申请时间：2019.06.04</Text>
                        <ApplyBtn handleClick={this.handleSponsor} index={index} title={BtnTitle.sponsor} color={BtnTypes.Blue}/>
                      </View>
                    }
                    {
                      this.state.pageType === StarCheckTypes.processing_record &&
                      <Text style={styles.processStatus_red}>已撤回</Text>
                    }
                  </View>
                  {
                    this.state.pageType === StarCheckTypes.wait_handle || this.state.pageType === StarCheckTypes.wait_reception?
                      <ApplyFooter type={this.state.type} score={this.state.type == 3?item.scoreShop : item.scoreRegion} week={item.accumulativeCycle} date={item.createTime}/> : <></>
                  }
                  {
                    this.state.pageType === StarCheckTypes.processing_record &&
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
                  data={this.state.list[this.state.index]}
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