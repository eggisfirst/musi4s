import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, ScrollView } from "react-native";
import { HeaderCmp } from "../../../../../components/headerCmp/headerCmp";
import PullDownCmp from "../../../../../components/filterCmp/pullDownCmp";
import pxToDp from "../../../../../utils/fixcss";
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/filter/pullDownSelect';
import { SliderCmp } from '../../../../../components/workCmp/areaReportCmp/checkDetailsCmp/everyTerm/silder';
import SwiperIndex from "../../../../../components/workCmp/areaReportCmp/checkDetailsCmp/swiperIndex";
import { IndexModel } from "../../../../../request";
const indexModel = new IndexModel()


import axios from 'axios';
import store from "../../../../../store";
import { setLoading } from "../../../../../store/actions/global/loading";


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

interface IState {
  standards: any
  standardinfo: any
  gradeDetailInfo: any

  urls: any
}

class DetailsPage extends React.Component<any>{
  static navigationOptions = {
    header: null
  }
  state: IState = {
    /**
     * 下拉框列表
     */
    standards: [],
    standardinfo: {},
    gradeDetailInfo: {},
    urls: []
  }
  /**
   * 检查记录 --生成urls
   * @param list 
   */
  changeUrl(list:any) {
    let arr:any = []
    list.map((it:any) => {
      var reg = /\.mp4$/gm
      if(reg.test(it)) {
        arr.push({url: it,type:'mp4'})
      }else {
        arr.push({url: it,type:'image'})
      }
     
    })
    return arr
  }
  /**
   * 验证评分生成urls
   */
  getUrls(list: any) {
    let arr:any = []
    list.map((it:any) => {
      var reg = /\.mp4$/gm
      if(reg.test(it.url)) {
        arr.push({url: it.url,type:'mp4'})
      }else {
        arr.push({url: it.url,type:'image'})
      }
     
    })
    return arr
  }

  test = () => { 
    axios.get('../../../../../../data.json')
    .then( (res) => {
      const urls = this.changeUrl(res.data.standardinfo.urls)
      store.dispatch(setLoading(false));
        this.setState({
          standards: res.data.standards,
          urls: urls
        })
      
    })
  }
  //----------请求----------
  /**
   * 获取检查 -- 检查详情的每个项目
   */
  getStandard() {
    const { shopId, startTime, endTime, categoryId } = this.getCheckParams()
    indexModel.getStandard(shopId, categoryId, startTime, endTime).then(res => {
      if (res.status) {
        // this.setState({
        //   standards: res.standards
        // })
        // this.getStandardinfo(0, res.standards[0].standardId)
      }
    })
  }
  /**
   * 获取检查 --评分明细
   * @param index 
   */
  getStandardinfo(index: number, id?: any) {
    const { shopId, startTime, endTime } = this.getCheckParams()
    const standardId = id ? id : this.state.standards[index].standardId
    indexModel.getStandardinfo(shopId, standardId, startTime, endTime).then(res => {
      if (res.status) {
        this.setState({
          standardinfo: res.standardinfo
        })
      }
    })
  }
  /**
   * 获取评分 --下拉列表
   */
  getGradeDetailList() {
    const { shopId, qualificationId, id, type } = this.getGradeParams()
    indexModel.getGradeDetailList(shopId, qualificationId, id, type).then(res => {
      if (res.status) {
        this.setState({
          standards: res.data
        })
        this.getGradeDetailInfo(res.data[0].id)
      }
    })
  }
  /**
   * 获取评分-- 每一项扣分详情
   * @param id 初始进来不传，id为上个页面带过来的id
   */
  getGradeDetailInfo(id: any) {
    indexModel.getGradeDetailInfo(id).then(res => {
      if (res.status) {
        // console.log(123,this.getUrls(res.data.attachment))
        this.setState({
          gradeDetailInfo: res.data,
          urls: this.getUrls(res.data.attachment)
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
  pullDownSelect = (index: number) => {
    console.log('index', index)
    if (this.props.navigation.state.params.type === 'check') {
    // this.getStandardinfo(index)
    }else {
      const id = this.state.standards[index].id
      this.getGradeDetailInfo(id)
    }
  }
  /**
   * 初始化数据
   */
  initGetData() {
    this.props.pullDownSelect(0)
    if (this.props.navigation.state.params.type === 'check') {
      this.getStandard()
    this.test()

    } else {
      this.getGradeDetailList()
    }
  }

  /**
   * 初始进来的时候设置下拉选择框初始为0
   */
  componentDidMount() {
    this.initGetData()
  }



  render() {
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
    return (
      <View style={styles.container}>
        <HeaderCmp bgColor={"#fbfbfb"} title={this.getGradeParams().name} eggHandleBack={() => { navigation.goBack() }} />
        <ScrollView  horizontal={false}>
          <View style={styles.pullDown}>
            <PullDownCmp data={this.state.standards} select={this.pullDownSelect} />
          </View>
          <View style={styles.showPictureBox}>
            <SwiperIndex urls={this.state.urls}  />

            <View style={styles.sliderCmp}>
              <SliderCmp cutScore={navigation.state.params.type === 'check' ? standardinfo.dedect : this.state.gradeDetailInfo.deduct}
                maxNum={18} />
              <View style={styles.reason}>
                <Text style={styles.reasontext}>扣分原因：</Text>
                <Text style={styles.text}>{navigation.state.params.type === 'check' ? standardinfo.reason : this.state.gradeDetailInfo.reason}</Text>
              </View>
            </View>

          </View>
          </ScrollView>
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
    position: "relative",
  },
  pullDown: {
    marginTop: pxToDp(51),
    marginLeft: pxToDp(91),
    position: "absolute",
    zIndex: 99,
    // height: pxToDp(106),
  },
  showPictureBox: {
    position: "relative",
    zIndex: 10,
    width: pxToDp(600),
    // height: pxToDp(438),
    // marginLeft: pxToDp(67),
    marginTop: pxToDp(200),
    // position: "absolute",
    // zIndex: 10,
    // left: 0,
    // top: pxToDp(392)
    // top: pxToDp(202),
    // height: pxToDp(1200),
  },
  sliderCmp: {
    // position: "absolute",
    width: pxToDp(544),
    // height: pxToDp(400),
    // zIndex: 10,
    // left: pxToDp(100),
    // top: pxToDp(viewportHeight * 0.65 + 300),
    // marginTop: pxToDp(viewportHeight * 0.65 + 300),
    marginLeft: pxToDp(100),
    marginTop: pxToDp(100),
  },
  reason: {
    width: "100%",
    // height: pxToDp(500),
    // borderWidth: 1
    // position: "absolute",
    // left: 0,
    // top: pxToDp(150)
  },
  reasontext: {
    color: "#7c7c7c",
    fontSize: pxToDp(26),
    marginBottom: pxToDp(26),
  },
  text: {
    fontSize: pxToDp(26),
    color: "#303030",
    lineHeight: pxToDp(40),
  }
})