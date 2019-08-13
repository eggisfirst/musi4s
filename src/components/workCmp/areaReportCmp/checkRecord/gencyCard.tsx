import React, { useState } from "react";

import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import pxToDp from '../../../../utils/fixcss';
import {StarBox} from './starBox';
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationActions } from "react-navigation";


interface IProps {
  list: Array<any>
  navigation: any
}

export const GencyCard:React.FC<IProps> = (props) => {
  const [loadState, setLoadState] = useState(false)
  /**按需求显示多少条数据 */
  const getList = () => {
     if(loadState) {
       return props.list
     }else {
       return props.list.slice(0,4)
     }
  }
  /**点击加载全部数据 */
  const loadMore = () => {
    setLoadState(!loadState)
  }
  /**跳转到检查记录页面  传递shopname过去！！*/
  const handleClickToRecord =(index: number) => {
    props.navigation.push('CheckRecordPage',{
      index
    })
  }
  const myRotate = {
    transform:[{rotate:'180deg'}]
  }
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.via} source={require('../../../../images/personal/via.png')}/>
        <Text style={styles.name}>广东深圳新国</Text>
        <View style={styles.starbox}>
          <StarBox starTitle={"二星检查"} starNum={2}/>
        </View>
      </View>
      {
        getList().map((item, index) => (
          <TouchableOpacity onPress={() => {handleClickToRecord(index)}} style={styles.shop} key={index} activeOpacity={0.6}>
            <Text style={styles.shopText}>{item.name}</Text>
            <Image style={styles.backIcon} source={require("../../../../images/work/areaReport/checkRecord/arrow.png")} />
          </TouchableOpacity>
        ))
      }
      {
        props.list.length > 4 &&
        <TouchableOpacity activeOpacity={0.6} style={styles.loadMore} onPress={() => {loadMore()}}>
          <Text style={styles.shopText}>{loadState? '点击收起' : '点击更多'}</Text>
          <Image style={[styles.loadMoreIcon,loadState && myRotate ]} source={require("../../../../images/work/areaReport/checkRecord/more.png")} />
        </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width:pxToDp(710),
    // height: pxToDp(480),
    borderRadius: pxToDp(20),
    backgroundColor: "#fff",
    marginLeft: pxToDp(20),
    marginTop: pxToDp(28),
    shadowColor: '#ccc',
    shadowRadius: pxToDp(10),
    shadowOpacity: 0.3,
    marginBottom: pxToDp(80)
  },
  via: {
    width: pxToDp(121),
    height: pxToDp(121),
  },
  name: {
    color: "#363636",
    fontSize: pxToDp(38),
    fontWeight: "bold"
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
    flexDirection:"row",
    alignItems:"center",
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
    flexDirection:"row",
    alignItems:"center",
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