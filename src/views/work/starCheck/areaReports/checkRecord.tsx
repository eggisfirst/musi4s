import React from "react";

import { View, Text, ScrollView, StyleSheet } from "react-native";
import { BackGroundHeader } from "../../../../components/headerCmp/backgroundHeader";
import pxToDp from "../../../../utils/fixcss";
import SelectCmp from '../../../../components/filterCmp/selectCmp';
import {StarCheckBox} from '../../../../components/workCmp/areaReportCmp/checkRecord/starCheckCard';
import { SelectType } from "../../../../utils/enum";


import * as actions from '../../../../store/actions/filter/select'
import { connect } from 'react-redux';

class CheckRecord extends React.Component<any>{
  static navigationOptions = {
    header: null,
  }
  /**请求筛选：合格/不合格/全部的数据 */
  handleSelect = (index:number) => {
    console.log(1111,index)
  }
  /**获取传递过来的门店名 */
  componentDidMount() {
    // console.log(this.props.navigation.state.parmas)
  }
  /**页面卸载的时候重新初始化数据 */
  componentWillUnmount() {
    this.props.handleSelectActiveIndex(0)
  }

  render (){
    const list = [
      {
        name: "二星检查",
        startDate: "2018.07.01",
        endDate: "2018.07.05",
        score: 90
      },
      {
        name: "二星检查",
        startDate: "2018.07.01",
        endDate: "2018.07.05",
        score: 90
      },
      {
        name: "二星检查",
        startDate: "2018.07.01",
        endDate: "2018.07.05",
        score: 70
      },
      {
        name: "二星检查",
        startDate: "2018.07.01",
        endDate: "2018.07.05",
        score: 90
      },
      {
        name: "二星检查",
        startDate: "2018.07.01",
        endDate: "2018.07.05",
        score: 70
      },
    ]
    return(
      <View style={styles.container}>
        <BackGroundHeader 
                          title={'检查记录'} 
                          eggHandleBack={() => {this.props.navigation.goBack()}}
                          bgColor={'#007aff'}
                          fontColor={"#fff"}
                          setHeight={263}
                          imgUrl={require("../../../../images/backicon.png")} />
        <View style={styles.banner}>
          <SelectCmp  selectType={SelectType.qualified} 
                      color={"#fff"} activeColor={"#FFCB38"}
                      handleSelect={this.handleSelect}
                      mySelectList={['全部', '合格', '不合格']}/>
          <Text style={styles.shop}>明世家博览馆慕思店</Text>
        </View>
        <ScrollView>
          <StarCheckBox list={list} navigation={this.props.navigation}/>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state:any) => state
export default connect(mapStateToProps,actions)(CheckRecord)

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#f8f8f8",
    width: "100%",
    height: "100%"
  },
  banner: {
    position: "absolute",
    left: pxToDp(57),
    top: pxToDp(200),
    width: pxToDp(650),
    lineHeight: pxToDp(60),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  shop: {
    color: "rgba(255,255,255,0.5)",
    lineHeight: pxToDp(42),
    fontWeight: "500",
    fontSize: pxToDp(26)
  }
})
