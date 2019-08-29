import React from "react";
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { CheckHeader } from '../../../components/workCmp/starCheck/CheckHeader';
import Sort from '../../../components/filterCmp/sortCmp';
import FilterIcon from '../../../components/filterCmp/filterCmp';
import FilterContentCmp from "../../../components/filterCmp/filterContentCmp";
import { ApplyItem } from '../../../components/workCmp/starCheck/applyItem';
import { ApplyBtn } from '../../../components/workCmp/starCheck/applyBtn';
import { BtnTypes, BtnTitle, AlertBtnTypes, StarCheckTypes, Duty, SearchTypes } from '../../../utils/enum';
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
import { format, getApproveState, approveBoxLeftInfo, turnToArray } from "../../../utils";
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
  list: Array<any>
  parmas: any
  showFoot: number
  pageNo: number
  sponsorBoxData: any
  processLeftData: any
  processRightData: any
  /**判断是不是搜索页面跳过来 */
  searchIn: boolean
  searchVal: string,
  //认证弹框需要的星级
  starLevel: number
  //认证弹框需要的id
  qualificationId: string
}

class HandelPage extends React.Component<any, IState>{
  static navigationOptions = {
    header: null,
    
  }
  state: IState = {
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
      startDate: '',
      endDate: '',
      starLevel: '',
      status: '',
      key: ''
    },
    showFoot: 0,
    pageNo: 1,
    sponsorBoxData: {},
    processLeftData: '',
    processRightData: '',
    searchIn: false,
    searchVal: '',
    starLevel: -1,
    qualificationId: ''
  }
  /**
   * 筛选或者排序的时候初始话参数
   */
  initFilterData() {
    this.setState({
      pageNo: 1,
      list: [],
      showFoot: 0
    })
  }
  /**判断不同页面的请求名单数据 */
  getList(data: any) {
    const mydata = this.getParmas(data)
    if (this.props.navigation.state.params.type === StarCheckTypes.wait_handle) {
      this.getAcceptList(mydata)
    }
    else if (this.props.navigation.state.params.type === StarCheckTypes.wait_reception) {
      this.getReceptionList(mydata)
    }
    else if (this.props.navigation.state.params.type === StarCheckTypes.wait_sponsor) {
      this.getSponsorList(mydata)
    }
    else if (this.props.navigation.state.params.type === StarCheckTypes.processing_record) {
      this.getLogList(mydata)
    }

  }
  //请求 -------------------

  /**获取待受理名单 */
  getAcceptList(myData: any) {
    let list = this.state.list
    indexModel.getAcceptList(myData).then(res => {
      if (res.status) {
        /**是否第一次加载 */
        if (res.data.list.length < 10) {
          if (this.state.pageNo === 1) {
            this.setState({
              showFoot: 1,
              list: res.data.list
            })
          } else {
            this.setState({
              showFoot: 1,
              list: [...list, ...res.data.list]
            })
          }

        } else {
          this.setState({
            list: [...list, ...res.data.list]
          })
          this.preventLoadMoreTime()
        }
      }
    })
  }
  /**
   * 获取待验收名单
   */
  getReceptionList(myData: any) {
    let list = this.state.list
    indexModel.getReceptionList(myData).then(res => {
      if (res.status) {
        /**是否第一次加载 */
        if (res.data.list.length < 10) {
          if (this.state.pageNo === 1) {
            this.setState({
              showFoot: 1,
              list: res.data.list
            })
          } else {
            this.setState({
              showFoot: 1,
              list: [...list, ...res.data.list]
            })
          }

        } else {
          this.setState({
            list: [...list, ...res.data.list]
          })
          this.preventLoadMoreTime()
        }
      }
    })
  }
  /**
   * 获取待发起名单
   */
  getSponsorList(myData: any) {
    let list = this.state.list
    indexModel.getSponsorList(myData).then(res => {
      if (res.status) {
        /**是否第一次加载 */
        if (res.data.list.length < 10) {
          if (this.state.pageNo === 1) {
            this.setState({
              showFoot: 1,
              list: res.data.list
            })
          } else {
            this.setState({
              showFoot: 1,
              list: [...list, ...res.data.list]
            })
          }

        } else {
          this.setState({
            list: [...list, ...res.data.list]
          })
          this.preventLoadMoreTime()
        }
      }
    })
  }
  /**
   * 获取认证进度列表
   */
  getLogList(myData: any) {
    let list = this.state.list
    indexModel.getLogList(myData).then(res => {
      if (res.status) {
        /**是否第一次加载 */
        if (res.data.list.length < 10) {
          if (this.state.pageNo === 1) {
            this.setState({
              showFoot: 1,
              list: res.data.list
            })
          } else {
            this.setState({
              showFoot: 1,
              list: [...list, ...res.data.list]
            })
          }

        } else {
          this.setState({
            list: [...list, ...res.data.list],
          })
          /**
           * 防止连续加载两次
           */
          this.preventLoadMoreTime()
        }
      }
    })
  }
  /**
   * 发起认证弹框
   */
  getApproveList(index: number) {
    const qualificationId = this.state.list[index].id
    indexModel.getApproveList(qualificationId).then(res => {
      if (res.status) {
        this.setState({
          sponsorBoxData: res.data
        })
        this._setSponsorStatus(true, index)
      }
    })
  }
  /**
   * 发送认证请求
   */
  sendApprove(index: number) {
    const id = this.state.list[index].id
    const list = this.state.list
    indexModel.sendApprove(id).then(res => {
      if (res.status) {
        this._setSponsorStatus(false)
        list.splice(this.state.index, 1)
        this.setState({
          list
        })
      }
    })
  }
  /**
   * 获取认证弹框进度
   * @param index 
   */
  getApproveFlowInfo(index: number) {
    const id = this.state.list[index].id
    const starLevel = this.state.list[index].approveLevel
    indexModel.getApproveFlowInfo(id).then(res => {
      if (res.status) {
        this.setState({
          processBoxStatus: true,
          processLeftData: approveBoxLeftInfo(res.data),
          processRightData: turnToArray(res.data),
          starLevel,
          qualificationId: id
        })
      }
    })
  }

  //--------------------
  /**
   * 防止加载两次
   */
  preventLoadMoreTime() {
    setTimeout(() => {
      this.setState({
        showFoot: 0,
      })
    }, 200);
  }


  /**获取级别 */
  getLevelType() {
    _retrieveData('type').then(res => {
      if (!res) {
        return
      }
      this.setState({
        type: res
      })
    })
  }
  /**排序 */
  handleClickSort = () => {
    this.initFilterData()
    setTimeout(() => {
      let sort = this.props.sort.activeIndex === 0 ? 'asc' : 'desc'
      const data = {
        page: 1,
        limit: 10,
        sort,
        key: this.state.searchVal
      }
      this.getList(data)
    }, 100);
  }
  /**筛选重置 */
  filterReset = () => {
    this.initFilterData()
    const sort = this.props.sort.activeIndex === 0 ? 'asc' : 'desc'
    /**注意认证的参数！！！ */
    console.log('reset')
    const data = {
      page: 1,
      limit: 10,
      sort,
      key: this.state.searchVal
    }
    setTimeout(() => {
      this.getList(data)
    }, 100);
  }
  /**筛选 */
  filterComfirm = () => {
    this.initFilterData()
    let startDate = format(new Date(this.props.rightFilter.startDate))
    let endDate = format(new Date(this.props.rightFilter.endDate))
    let sort = this.props.sort.activeIndex === 0 ? 'asc' : 'desc'
    let starLevel = this.props.rightFilter.starIndex + 1
    let status = this.props.rightFilter.situationIndex + 1
    let key = this.state.searchVal && this.state.searchVal
    let data = {
      startDate,
      endDate,
      page: 1,
      limit: 10,
      sort,
      starLevel,
      status,
      key
    }
    // let newData = this.getParmas(data)
    this.getList(data)
  }

  /**底部加载更多 */
  _onEndReached = () => {
    // 如果是正在加载中或没有更多数据了，则返回
    if (this.state.showFoot !== 0) {
      return;
    }
    let page = this.state.pageNo + 1
    this.setState({
      pageNo: page,
      showFoot: 2
    });
    const data = this.state.parmas
    data.page = page
    this.getList(data)
  }


  /**获取参数 */
  getParmas(myData: any) {
    let data = this.state.parmas
    for (const key in data) {
      if (myData[key]) {
        data[key] = myData[key]
      } else {
        data[key] = ''
      }
    }
    this.setState({
      parmas: data
    })
    return data
  }
  //安卓点击穿透处理

  /**退回 */
  handleSendBack = (index: number) => {
    this._setHanleClick(index, BtnTitle.sendBack)
  }
  /**受理 */
  handleApplying = (index: number) => {
    this._setHanleClick(index, BtnTitle.applying)
  }
  /**发起验证 */
  handleSponsor = (index: number) => {
    this.setState({ index })
    this.getApproveList(index)
  }
  /**验收 */
  handleReception = (index: number) => {
    this.props.navigation.navigate('ReceptionPage', {
      id: this.state.list[index].id
    })
    // this._setHanleClick(index,BtnTitle.reception)
  }
  /**退回和受理 */
  handleAlert = (status: AlertBtnTypes, value?: string) => {
    const list = this.state.list
    const id = list[this.state.index].id
    const sort = this.props.sort.activeIndex === 0 ? 'asc' : 'desc'
    this._setAlertBoxStatus(BtnTitle.null)
    switch (status) {
      case AlertBtnTypes.cancle:
        console.log('cancle')
        break;
      case AlertBtnTypes.comfirm:
        //请求
        indexModel.accept(id).then(res => {
          if (res.status) {
            list.splice(this.state.index, 1)
            this.setState({
              list
            })
          }
        })
        break;
      case AlertBtnTypes.sendBack:
        indexModel.sendBack(id, value).then(res => {
          if (res.status) {
            list.splice(this.state.index, 1)
            this.setState({
              list
            })
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
  _setHanleClick = (index: number, state: BtnTitle) => {
    this.setState({
      index: index
    })
    this._setAlertBoxStatus(state)
  }

  /**提交认证 */
  handleSponsorComfirm = () => {
    //请求
    this.sendApprove(this.state.index)

  }
  /**取消认证 */
  handleSponsorCancle = () => {
    this._setSponsorStatus(false)
  }
  /**弹出认证进度弹框 */
  handleShowReceptionBox = (index: number) => {
    if (this.state.starCheckType !== StarCheckTypes.processing_record) {
      return
    }
    this.getApproveFlowInfo(index)

  }
  /**关闭认证弹框 */
  handleCloseProcessBox = () => {
    this.setState({
      processBoxStatus: false
    })
  }
  _setSponsorStatus = (sponsorStatus: boolean, index?: number) => {
    if (index !== undefined) {
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
      starCheckType: this.props.navigation.state.params.type,
    })
  }
  /**
   * 判断是否搜索页面跳过来
   */
  isSearchIn() {
    if (this.props.navigation.state.params != undefined && this.props.navigation.state.params.key) {
      this.setState({
        searchIn: true,
        searchVal: this.props.navigation.state.params.key
      })
      if (this.props.navigation.state.params.type === SearchTypes.wait_handle) {
        this.getAcceptList({ page: 1, limit: 10, key: this.props.navigation.state.params.key })
      }
      else if (this.props.navigation.state.params.type === SearchTypes.wait_reception) {
        this.getReceptionList({ page: 1, limit: 10, key: this.props.navigation.state.params.key })
      }
      else if (this.props.navigation.state.params.type === SearchTypes.wait_sponsor) {
        this.getSponsorList({ page: 1, limit: 10, key: this.props.navigation.state.params.key })
      }
      else if (this.props.navigation.state.params.type === SearchTypes.processing_record) {
        this.getLogList({ page: 1, limit: 10, key: this.props.navigation.state.params.key })
      }

    } else {
      this.setState({ searchIn: false, searchVal: '' })
      this.getList({ page: 1, limit: 10, sort: 'asc' })
    }
  }

  componentDidMount() {
    this.getPageState()
    this.initFilter()
    this.isSearchIn()
    this.getLevelType()
  }
  /**
   * 跳转搜索页面
   */
  handleSearch = (type: string) => {
    this.props.navigation.push("SearchPage", {
      type
    })
  }
  /**
 * 加载时加载动画
 */
  _renderFooter() {
    if (this.state.showFoot === 1) {
      return (
        <View style={{ height:pxToDp(100) , alignItems: 'center', justifyContent: 'flex-start', }}>
          <Text style={{ color: '#999999', fontSize: pxToDp(24), marginTop: pxToDp(10), marginBottom: pxToDp(40), }}>
            没有更多数据了
          </Text>
        </View>
      );
    } else if (this.state.showFoot === 2) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
          <Text>加载中...</Text>
        </View>
      );
    } else if (this.state.showFoot === 0) {
      return (
        <View style={styles.footer}>
          <Text></Text>
        </View>
      );
    }
  }
  _separator() {
    return <View style={{ height: 1, }} />;
  }
  render() {
    const { navigation } = this.props
    /**
     * 获取状态参数对应的style（红/蓝）
     * @param index 
     */
    const preceStyle = (index: any) => {
      if (index === 1 || index === 4 || index === 5 || index === 7 || index === 8 || index === 9
        || index === 11) {
        return 1
      } else if (index === 12) {
        return 3
      }
      return 2
    }

    return (
      <View>
        <CheckHeader title={this.state.starCheckType}
          searchIn={this.state.searchIn}
          eggHandleBack={() => { navigation.goBack() }}
          eggHandleSearch={this.handleSearch} />
        <View style={styles.filterContainer}>
          <Sort handleClickSort={this.handleClickSort} />
          <FilterIcon />
        </View>
        {
          this.props.rightFilter.isActive &&
          <FilterContentCmp type={this.state.starCheckType}
            filterComfirm={this.filterComfirm}
            filterReset={this.filterReset} />
        }
        <FlatList style={{ backgroundColor: "#f8f8f8", marginBottom: pxToDp(300), minHeight: pxToDp(1330) }}
          data={this.state.list}
          ItemSeparatorComponent={this._separator}
          ListFooterComponent={this._renderFooter()}
          onEndReached={() => { this._onEndReached() }}
          onEndReachedThreshold={0.2}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <ApplyItem title={item.distributor}
              star={item.approveLevel}
              type={this.state.starCheckType}
              index={index}
              time={this.state.starCheckType === StarCheckTypes.processing_record && item.createTime}
              handleShowReceptionBox={this.handleShowReceptionBox}>
              <View style={styles.btnStyle}>
                {
                  this.state.starCheckType === StarCheckTypes.wait_handle &&
                  <>
                    <ApplyBtn handleClick={this.handleSendBack} index={index} title={BtnTitle.sendBack} color={BtnTypes.Red} />
                    <ApplyBtn handleClick={this.handleApplying} index={index} title={BtnTitle.applying} color={BtnTypes.Blue} />
                  </>
                }
                {
                  this.state.starCheckType === StarCheckTypes.wait_reception &&
                  <>
                    <ApplyBtn handleClick={this.handleReception} index={index} title={BtnTitle.reception} color={BtnTypes.Blue} />
                  </>
                }
                {
                  this.state.starCheckType === StarCheckTypes.wait_sponsor &&
                  <View style={styles.sponsor}>
                    <Text style={styles.sponsorDate}>申请时间：{item.createTime}</Text>
                    <ApplyBtn handleClick={this.handleSponsor} index={index} title={BtnTitle.sponsor} color={BtnTypes.Blue} />
                  </View>
                }
                {
                  this.state.starCheckType === StarCheckTypes.processing_record &&
                  <Text style={preceStyle(item.status) === 1 ? styles.processStatus_blue :
                    preceStyle(item.status) === 3 ? styles.processStatus_green :
                      styles.processStatus_red}>{getApproveState(item.status)}</Text>
                }
              </View>
              {
                this.state.starCheckType === StarCheckTypes.wait_handle || this.state.starCheckType === StarCheckTypes.wait_reception ?
                  <ApplyFooter type={this.state.type} score={item.scoreShop} week={item.accumulativeCycle} date={item.createTime} /> : <></>
              }
              {
                this.state.starCheckType === StarCheckTypes.processing_record &&
                <View style={styles.process_footer}>
                  <ScoreItem item={item} />
                  <ScoreItem reason={item.status === 2 && item.remark} />
                </View>
              }
            </ApplyItem>
          )}
        />
        {
          this.state.alertBox !== BtnTitle.null &&
          <AlertCmp title={this.state.alertBox}
            data={this.state.list[this.state.index]}
            comfirm={this.state.alertBox === BtnTitle.applying ? AlertBtnTypes.comfirm : undefined}
            cancle={AlertBtnTypes.cancle}
            sendBack={this.state.alertBox === BtnTitle.sendBack ? AlertBtnTypes.sendBack : undefined}
            handleAlert={this.handleAlert}
          />
        }
        {
          this.state.sponsorStatus &&
          <SponsorBox type={this.state.type}
            sponsorBoxData={this.state.sponsorBoxData}
            handleSponsorCancle={this.handleSponsorCancle}
            handleSponsorComfirm={this.handleSponsorComfirm} />
        }

        {
          this.state.processBoxStatus &&
          <ProcessBox leftData={this.state.processLeftData}
            rightData={this.state.processRightData}
            starLevel={this.state.starLevel}
            id={this.state.qualificationId}
            handleCloseProcessBox={this.handleCloseProcessBox}
            navigation={this.props.navigation} />
        }

      </View>
    )
  }

}
const mapStateToProps = (state: any) => state

export default connect(mapStateToProps, actions)(HandelPage)

const styles = StyleSheet.create({
  filterContainer: {
    position: "relative",
    zIndex: 999,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#e1e1e1",
    borderBottomWidth: 1
  },
  btnStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
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
  processStatus_green: {
    color: "#4CD964",
    fontSize: pxToDp(30)
  },
  process_footer: {
    marginTop: pxToDp(20)
  },

  footer: {
    flexDirection: 'row',
    height: pxToDp(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: pxToDp(40),
  },
})