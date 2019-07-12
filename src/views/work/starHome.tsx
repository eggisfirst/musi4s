import React from 'react';
import { Text, StatusBar, Platform, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {Header} from '../../components/work/starHome/header';
import pxToDp from '../../utils/fixcss';
import StarItem from '../../components/work/starHome/starItem';

export default class StarHome extends React.Component<any> {
  static navigationOptions = {
    headerTitle: <Header/>, 
    headerTintColor:"#fff",
    headerStyle: {
      height:pxToDp(353),
      width:pxToDp(750),
      marginTop:Platform.OS ==="ios"?  pxToDp(-100):0,
      borderBottomWidth: 0,
      elevation: 0,
    }
  }

  render() {
    const list = [
      {
        imgUrl:require("../../images/work/starHome/wait1.png"),
        title:"待受理",
        num:3
      },
      {
        imgUrl:require("../../images/work/starHome/wait2.png"),
        title:"待验收",
        num:12
      },
      {
        imgUrl:require("../../images/work/starHome/wait3.png"),
        title:"待发起",
        num:5
      },
      {
        imgUrl:require("../../images/work/starHome/wait4.png"),
        title:"处理记录",
        num:6
      },
    ]
    const imgArr = [
      {
        imgUrl:require('../../images/work/starHome/record.png')
      },
      {
        imgUrl:require('../../images/work/starHome/progress.png')
      }, 
      {
        imgUrl:require('../../images/work/starHome/score.png')
      },
    ]
    return(
      <View>
         {/* <StatusBar
          backgroundColor={'transparent'} 
          translucent={true}
          barStyle="light-content"
          hidden={false}
        /> */}
        <Text style={styles.title}>星级认证</Text>
        <View style={styles.list}>
          {
            list && list.map(item => (
              <TouchableOpacity  
                      key={item.title}>
                <StarItem title={item.title} imgUrl={item.imgUrl} num={item.num}/>
              </TouchableOpacity>
            ))
          }
        </View>
        <Text style={styles.title}>区域报表</Text>
        <View style={styles.reportWrapper}>
          {
            imgArr && imgArr.map(item => (
              <TouchableOpacity key={item.imgUrl}>
                <Image 
                    style={styles.reportStyle}
                    source={item.imgUrl} />
              </TouchableOpacity>
            ))
          }
        
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    paddingBottom:pxToDp(70),
    marginLeft:pxToDp(52),
    marginRight:pxToDp(52),
    borderBottomColor:"#e1e1e1",
    borderBottomWidth:pxToDp(1),
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    flexWrap:"wrap"
  },
  title: {
    marginTop:pxToDp(75),
    color:"#363636",
    fontSize:pxToDp(48),
    fontWeight:"bold",
    paddingLeft:pxToDp(32)
  },
  reportWrapper: {
    marginLeft:pxToDp(32),
    marginRight:pxToDp(32),
    borderColor: "#e1e1e1",
    borderBottomWidth:pxToDp(1),
    paddingBottom:pxToDp(40),
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    flexWrap:"wrap"
  },
  reportStyle: {
    width:pxToDp(200),
    height:pxToDp(160),
    marginTop:pxToDp(51)
  },
})