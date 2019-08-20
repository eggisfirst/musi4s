import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from "react-native";
import { HeaderCmp } from "../../../../../components/headerCmp/headerCmp";
import PullDownCmp from "../../../../../components/filterCmp/pullDownCmp";
import pxToDp from "../../../../../utils/fixcss";
import {connect} from 'react-redux';
import * as actions from '../../../../../store/actions/filter/pullDownSelect';
import {SliderCmp} from '../../../../../components/workCmp/areaReportCmp/checkDetailsCmp/everyTerm/silder';
import SwiperIndex from "../../../../../components/workCmp/areaReportCmp/checkDetailsCmp/swiperIndex";


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
function wp (percentage: number) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

class DetailsPage extends React.Component<any>{
  static navigationOptions = {
    header: null
  }
  /**
   * 初始进来的时候设置下拉选择框初始为0
   */
  componentDidMount() {
    this.props.pullDownSelect(0)
  }
  render (){
    const navigation = this.props.navigation
    return(
      <View style={styles.container}>
        <HeaderCmp bgColor={"#fbfbfb"} title={"店面SI标准一阶段"} eggHandleBack={() => {navigation.goBack()}}/>
        <View style={styles.pullDown}>
          <PullDownCmp />
        </View>
        <View style={styles.showPictureBox}>
          <SwiperIndex />

          <View style={styles.sliderCmp}>
            <SliderCmp cutScore={9} maxNum={18}/>

            <View style={styles.reason}>
              <Text style={styles.reasontext}>扣分原因：</Text>
              <Text style={styles.text}>店面海报旧，海报位置不合理，卫生差不够干净不合理不合理不合理不合理不合理不合理不合理不合理，故扣9分。</Text>
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