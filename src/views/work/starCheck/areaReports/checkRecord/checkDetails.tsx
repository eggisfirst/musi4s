import React from "react";

import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from "react-native";
import { HeaderCmp } from '../../../../../components/headerCmp/headerCmp';
import SelectCmp from '../../../../../components/filterCmp/selectCmp';
import { SelectType } from "../../../../../utils/enum";
import pxToDp from "../../../../../utils/fixcss";

import * as actions from '../../../../../store/actions/filter/select'
import { connect } from 'react-redux';
import ScoreCanvas from "../../../../../components/workCmp/areaReportCmp/checkDetailsCmp/scoreCanvas";
import { MaxtermCmp } from '../../../../../components/workCmp/areaReportCmp/checkDetailsCmp/maxTerm';

class CheckDetails extends React.Component<any>{
  static navigationOptions = {
    header: null,
  }
  /**请求筛选星级的数据 */
  handleSelect = (index: number) => {
    console.log(index)
  }
  /**设置初始点击进来的星级 index-1*/
  componentDidMount() {
    // index
    this.props.handleSelectStarActiveIndex(3)
  }
 
  render (){
    const navigation = this.props.navigation
    return(
      <View style={styles.container}>
        <HeaderCmp title={"检查详情"} eggHandleBack={() => {navigation.goBack()}}/>
        <View style={styles.line}>
          <View style={styles.selectContainer}>
            <SelectCmp  selectType={SelectType.StarCheck} 
                        color={"#838383"} activeColor={"#007aff"}
                        handleSelect={this.handleSelect}
                        mySelectList={['五星 |','四星 |', '三星 |', '二星 | ', '一星 |']}
                      />
          </View>
        </View>
        <ScrollView>
          <ScoreCanvas />
          <TouchableOpacity activeOpacity={0.6} onPress={() => {navigation.push("DetailsPage")}}>
            <MaxtermCmp />
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}


const mapStateToProps = (state:any) => state
export default connect(mapStateToProps,actions)(CheckDetails)
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingBottom: Platform.OS === "ios"? 0 :  pxToDp(80)
  },
  line: {
    width: "100%",
    paddingBottom: pxToDp(34),
    borderBottomWidth: pxToDp(1),
    borderBottomColor: "#e5e5e5",
  },
  selectContainer: {
    width: pxToDp(500),
    marginLeft: pxToDp(50),
  }
})