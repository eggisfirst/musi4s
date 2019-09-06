import React from "react";

import { View, Text, StyleSheet, Linking, TouchableOpacity, Image, Dimensions } from "react-native";
import pxToDp from "../../utils/fixcss";
import { MapCanvas } from './mapCanvas';
import { MapToApp } from './mapToApp';
import TouchStartAndRelease from '../gestures';

interface IState {
  curLat: number
  curLong: number
  targerLat: number
  targetLong: number
  toAppStatus: boolean
  address: string
}
interface Iprops {
  handleCloseMap: () => void
  shopInfo: any
}

export default class MapCmp extends React.Component<Iprops>{
  state: IState = {
    curLat: 23.025205,
    curLong: 113.758683,
    toAppStatus: false,
    address: "广东省广州市天河区珠江新城花城大道马场路马会家居西区一楼1513慕思0769专卖店",
    targerLat: 23.1186700000,
    targetLong: 113.3464100000

  }
  componentDidMount() {
    console.log(this.props)
    // this.getLocationPosition()  //在华为以及一些手机型号上定位不了自己位置。
    // const url = 'iosamap://path?sourceApplication=test&slat=39.92848272&slon=116.39560823&sname=A&dlat=39.98848272&dlon=116.47560823&dname=B&dev=0&t=0'
    // Linking.getInitialURL().then((url) => {
    //   if (url) {
    //     console.log('Initial url is: ' + url);
    //   }
    // }).catch(err => console.error('An error occurred', err));
  }
  /**
   * 当前定位
   */
  getLocationPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          curLat: position.coords.latitude,
          curLong: position.coords.longitude
        })
      }
    )
  }
  /**
   * 打开导航到店
   */
  handleOpenToApp = () => {
    console.log('open')
    this.setState({
      toAppStatus: true
    })
  }
  /**
   * 关闭导航到店
   */
  handleCloseToApp = () => {
    this.setState({
      toAppStatus: false
    })
  }
  /**
   * 手势下滑触发隐藏事件
   */
  handleHide = () => {
    this.props.handleCloseMap()
  }
  /**
   * 点击空白区域关闭地图
   */
  closeMap = () => {
    this.props.handleCloseMap()
  }
  render() {
    const shopInfo = this.props.shopInfo
    return (
      <View style={styles.wrapper} >
        <TouchableOpacity style={styles.topStyle} onPress={this.closeMap}></TouchableOpacity>
        <View style={styles.addressBox}>
          <View style={styles.lineToHide}>
            <TouchStartAndRelease handleHide={this.handleHide} />
          </View>
          <Text style={styles.title}>{shopInfo.shopName}</Text>
          <Text style={styles.address}>地址：{shopInfo.address}</Text>

          <MapCanvas targerLat={this.state.targerLat} targetLong={this.state.targetLong} />

          <Text style={styles.text}>店长：{shopInfo.username}</Text>
          <Text style={styles.text}>联系电话：{shopInfo.phone}</Text>
          <Text style={styles.text}>门店电话：{shopInfo.shopPhone}</Text>
          <Text style={styles.text}>状态：{this.props.shopInfo.passFlag ? '已评分' : '未评分'}</Text>
          <TouchableOpacity style={styles.toShop} onPress={() => { this.handleOpenToApp() }}>
            <Image source={require('../../images/work/toShop.png')} style={styles.toShopIcon} />
            <Text style={styles.toShopText}>导航到店</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.close} onPress={() => {this.props.handleCloseMap()}}>
            <Text style={styles.closeText}>关闭</Text>
          </TouchableOpacity> */}
          {
            this.state.toAppStatus &&
            <MapToApp handleCloseToApp={this.handleCloseToApp}
              address={shopInfo.address}
              curLat={this.state.curLat}
              curLong={this.state.curLong}
              targerLat={this.state.targerLat}
              targetLong={this.state.targetLong} />
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: "absolute",
    top: 0,
    left: 0,
  },
  topStyle: {
    width: "100%",
    height: Dimensions.get('screen').height - pxToDp(930),
    backgroundColor: 'rgba(0,0,0,0)',
    position: "absolute",
    top: 0,
    left: 0,
  },
  addressBox: {
    width: "100%",
    height: pxToDp(926),
    backgroundColor: "#fff",
    borderTopLeftRadius: pxToDp(60),
    borderTopRightRadius: pxToDp(60),
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: pxToDp(31),
    paddingBottom: 0
  },
  title: {
    color: "#363636",
    fontSize: pxToDp(40),
    marginTop: pxToDp(38),
    fontWeight: "bold"
  },
  address: {
    fontSize: pxToDp(28),
    color: "#666",
    lineHeight: pxToDp(40),
    marginTop: pxToDp(20),
    marginBottom: pxToDp(22)
  },
  map: {
    width: pxToDp(686),
    height: pxToDp(300),
    marginBottom: pxToDp(39)
  },
  text: {
    color: "#363636",
    fontSize: pxToDp(28),
    lineHeight: pxToDp(50)
  },
  toShop: {
    position: "absolute",
    right: pxToDp(20),
    bottom: pxToDp(160)
  },
  toShopIcon: {
    width: pxToDp(100),
    height: pxToDp(100)
  },
  toShopText: {
    color: "#909090",
    fontSize: pxToDp(18),
    textAlign: "center"
  },
  close: {
    position: "absolute",
    right: pxToDp(20),
    top: pxToDp(20)
  },
  closeText: {
    color: "#007aff",
    fontSize: pxToDp(30)
  },


  lineToHide: {
    // position:"absolute",
    // left: pxToDp(250),
    // bottom:pxToDp(796),
    width: pxToDp(250),
    height: pxToDp(20),
    marginLeft: pxToDp(230),
    // borderRadius: pxToDp(12),
    // backgroundColor: "#ccc",
    borderTopWidth: pxToDp(10),
    borderTopColor: "#ccc",
    // borderTopLeftRadius: pxToDp(12),
  }
})