import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from "react-native";
import { HeaderCmp } from "../../../../../components/headerCmp/headerCmp";
import PullDownCmp from "../../../../../components/filterCmp/pullDownCmp";
import pxToDp from "../../../../../utils/fixcss";
import {connect} from 'react-redux';
import * as actions from '../../../../../store/actions/filter/pullDownSelect';
import {SliderCmp} from '../../../../../components/workCmp/areaReportCmp/checkDetailsCmp/everyTerm/silder';
import SwiperIndex from "../../../../../components/workCmp/areaReportCmp/checkDetailsCmp/swiperIndex";
import { IndexModel } from "../../../../../request";
const indexModel = new IndexModel()

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
function wp (percentage: number) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

interface IState {
  standards: any
  standardinfo: any
}

class DetailsPage extends React.Component<any>{
  static navigationOptions = {
    header: null
  }
  state:IState = {
    /**
     * 下拉框列表
     */
    standards: [],
    standardinfo: {}
  }
  //----------请求----------
  /**
   * 获取检查 -- 检查详情的每个项目
   */
  getStandard() {
    const {shopId,startTime,endTime,categoryId} = this.getCheckParams()
    indexModel.getStandard(shopId,categoryId,startTime,endTime).then(res => {
      if(res.status) {
        this.setState({
          standards:res.standards
        })
        this.getStandardinfo(0,res.standards[0].standardId)
      }
    })
  }
  /**
   * 获取检查 --评分明细
   * @param index 
   */
  getStandardinfo(index: number,id?:any) {
    const {shopId,startTime,endTime} = this.getCheckParams()
    const standardId = id? id : this.state.standards[index].standardId
    indexModel.getStandardinfo(shopId,standardId,startTime,endTime).then(res => {
      if(res.status) {
        this.setState({
          standardinfo: res.standardinfo
        })
      }
    })
  }

  getGradeDetailList() {
    const { shopId, qualificationId, id, type } = this.getGradeParams()
    indexModel.getGradeDetailList(shopId,qualificationId,id,type).then(res => {
      if(res.status) {
        this.setState({
          standards: res.data
        })
      }
    })
  }

  //------------------------

  /**
   * 获取检查记录页面过来路由数据
   */
  getCheckParams() {
    const { shopId, startTime, endTime, categoryId } = this.props.navigation.state.params
    return {
      shopId,
      startTime,
      endTime,
      categoryId
    }
  }
  /**
   * 获取评分页面过来的数据
   */
  getGradeParams() {
    const { shopId, qualificationId, id, type, name } = this.props.navigation.state.params
    return {
      shopId,
      qualificationId,
      id,
      type,
      name
    }
  }

  /**
   * 下拉选择
   * @param index 
   */
  pullDownSelect(index: number) {
    console.log('index',index)
    // this.getStandardinfo(index)
  }
  /**
   * 初始化数据
   */
  initGetData() {
    this.props.pullDownSelect(0)
    if(this.props.navigation.state.params.type === 'check') {
    // this.getStandard()
    }else {
      this.getGradeDetailList()
    }
  }

  /**
   * 初始进来的时候设置下拉选择框初始为0
   */
  componentDidMount() {
    this.initGetData()
  }



  render (){
    const navigation = this.props.navigation

    const standards = [
      {
        deduct: 0,
        name: '店门面积',
        standardId: '1'
      },
      {
        deduct: 0,
        name: '店面类型',
        standardId: '2'
      },
      {
        deduct: -1,
        name: '装修时间',
        standardId: '3'
      },
      {
        deduct: -2,
        name: '门店灯箱',
        standardId: '4'
      }
    ]
    const standardinfo = {
      dedect: 9,
      reason: '店面海报旧，海报位置不合理，卫生差不够干净不合理不合理不合理不合理不合理不合理不合理不合理，故扣9分。',
      urls: [
        
      ]
    }
    return(
      <View style={styles.container}>
        <HeaderCmp bgColor={"#fbfbfb"} title={this.getGradeParams().name} eggHandleBack={() => {navigation.goBack()}}/>
        <View style={styles.pullDown}>
          <PullDownCmp data={this.state.standards} select={this.pullDownSelect}/>
        </View>
        <View style={styles.showPictureBox}>
          <SwiperIndex />

          <View style={styles.sliderCmp}>
            <SliderCmp cutScore={standardinfo.dedect} maxNum={18}/>

            <View style={styles.reason}>
              <Text style={styles.reasontext}>扣分原因：</Text>
              <Text style={styles.text}>{standardinfo.reason}</Text>
            </View>
          </View>

        </View>
     
      </View>
    )
  }
}

const mapStateToProps = (state: any) => state
export default connect(mapStateToProps, actions)(DetailsPage)

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative"
  },
  pullDown: {
    marginTop: pxToDp(51),
    marginLeft: pxToDp(91),
    position: "relative",
    zIndex: 99
  },
  showPictureBox: {
    width: pxToDp(600),
    // height: pxToDp(438),
    // marginLeft: pxToDp(67),
    // marginTop: pxToDp(30),
    position: "absolute",
    zIndex: 10,
    left: 0,
    top: pxToDp(392)
  },
  sliderCmp: {
    position: "absolute",
    width: pxToDp(544),
    // height: pxToDp(400),
    zIndex: 10,
    left: pxToDp(100),
    top: pxToDp(viewportHeight * 0.65 + 300),
  },
  reason: {
    position: "absolute",
    left: 0,
    top: pxToDp(150)
  },
  reasontext: {
    color: "#7c7c7c",
    fontSize: pxToDp(26),
    marginBottom: pxToDp(26)
  },
  text: {
    fontSize: pxToDp(26),
    color: "#303030",
    lineHeight: pxToDp(40)
  }
})