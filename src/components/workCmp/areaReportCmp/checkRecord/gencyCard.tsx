import React, { useState } from "react";

import { View, Text, StyleSheet, Image, ScrollView, Platform } from "react-native";
import pxToDp from '../../../../utils/fixcss';
import { StarBox } from './starBox';
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationActions } from "react-navigation";
import { ReportType } from "../../../../utils/enum";
import { getStar } from "../../../../utils";


interface IProps {
  listData: any
  navigation: any
  type: ReportType
}

export const GencyCard: React.FC<IProps> = (props) => {
  const [loadState, setLoadState] = useState(false)
  /**按需求显示多少条数据 */
  const getList = () => {
    if (loadState) {
      return props.listData.shopList
    } else {
      return props.listData.shopList.slice(0, 4)
    }
  }
  /**点击加载全部数据 */
  const loadMore = () => {
    setLoadState(!loadState)
  }
  /**跳转到检查记录页面  传递shopname过去！！*/
  const handleClickToRecord = (index: number) => {
    const id = props.listData.shopList[index].shopId
    const shopName = props.listData.shopList[index].shopName
    /**跳转检查记录页面 */
    props.type === ReportType.check && props.navigation.push('CheckRecordPage', {
      id,
      shopName
    })
    /**跳转验收认证详情页面 */
    props.type === ReportType.acceptance && props.navigation.push('AcceptanceDetailsPage', {
      id,
      shopName: props.listData.shopList[index].shopName
    })
  }
  const myRotate = {
    transform: [{ rotate: '180deg' }]
  }
  /**
   * 检查记录得到是+1，认证记录是得到的数据
   */
  const title = props.type === ReportType.acceptance ? getStar(props.listData.starLevel) : getStar(props.listData.starLevel + 1)
  const starNum = props.type === ReportType.acceptance ? props.listData.starLevel : props.listData.starLevel + 1
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.via} source={require('../../../../images/personal/via.png')} />
        <Text style={styles.name}>{props.listData.distributor}</Text>
        <View style={styles.starbox}>
          <StarBox starTitle={title + props.type}
            starNum={starNum} />
        </View>
      </View>
      {
        getList().map((item: any, index: number) => (
          <TouchableOpacity onPress={() => { handleClickToRecord(index) }} style={styles.shop} key={index} activeOpacity={0.6}>
            <Text style={styles.shopText}>{item.shopName}</Text>
            <Image style={styles.backIcon} source={require("../../../../images/work/areaReport/checkRecord/arrow.png")} />
          </TouchableOpacity>
        ))
      }
      {
        props.listData.shopList.length > 4 ?
        <TouchableOpacity activeOpacity={0.6} style={styles.loadMore} onPress={() => { loadMore() }}>
          <Text style={styles.shopText}>{loadState ? '点击收起' : '点击加载更多'}</Text>
          <Image style={[styles.loadMoreIcon, loadState && myRotate]} source={require("../../../../images/work/areaReport/checkRecord/more.png")} />
        </TouchableOpacity> : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: pxToDp(710),
    // height: pxToDp(480),
    borderRadius: pxToDp(20),
    backgroundColor: "#fff",
    marginLeft: pxToDp(20),
    marginTop: pxToDp(20), 
    shadowColor: '#ccc',
    shadowRadius: pxToDp(10),
    shadowOpacity: 0.3,
    // marginBottom: Platform.OS === "ios" ? pxToDp(20) : pxToDp(20)
  },
  via: {
    width: pxToDp(121),
    height: pxToDp(121),
  },
  name: {
    color: "#363636",
    fontSize: pxToDp(38),
    fontWeight: "bold",
    width: pxToDp(360),
    // borderWidth: 1,
    lineHeight: pxToDp(60)
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: pxToDp(12),
    paddingRight: pxToDp(12),
    paddingTop: pxToDp(10),
    marginBottom: pxToDp(19),
    paddingBottom: pxToDp(10),
  },
  starbox: {
    position: "absolute",
    right: 0,
    top: 0
  },
  shop: {
    width: pxToDp(686),
    lineHeight: pxToDp(60),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8f8f8",
    borderRadius: pxToDp(12),
    marginLeft: pxToDp(12),
    paddingLeft: pxToDp(31),
    paddingRight: pxToDp(14),
    marginBottom: pxToDp(10),
  },
  shopText: {
    color: "#666",
    fontSize: pxToDp(24),
    lineHeight: pxToDp(60)
  },

  loadMore: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    width: pxToDp(14),
    height: pxToDp(23)
  },
  loadMoreIcon: {
    width: pxToDp(16),
    height: pxToDp(9),
    marginLeft: pxToDp(5)
  }
})