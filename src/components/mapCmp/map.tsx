import React from "react";

import { View, Text, StyleSheet, Linking, TouchableOpacity, Image} from "react-native";
import pxToDp from "../../utils/fixcss";
import { MapCanvas } from './mapCanvas';
import { MapToApp } from './mapToApp';

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
}

export default class MapCmp extends React.Component<Iprops>{
  state: IState = {
    curLat: 23.025205,
    curLong: 113.758683,
    toAppStatus: false,
    address: "地址：广东省广州市天河区珠江新城花城大道马场路马会家居西区一楼1513慕思0769专卖店",
    targerLat: 23.1186700000,
    targetLong: 113.3464100000

  }
  componentDidMount() {
    console.log(this.props)
    this.getLocationPosition()
    // const url = 'iosamap://path?sourceApplication=test&slat=39.92848272&slon=116.39560823&sname=A&dlat=39.98848272&dlon=116.47560823&dname=B&dev=0&t=0'
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('Initial url is: ' + url);
      }
    }).catch(err => console.error('An error occurred', err));
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
  render() {
    return(
      <View style={styles.wrapper}>
        <View style={styles.addressBox}>
          <Text style={styles.title}>广州马会家居凯奇门店</Text>
          <Text style={styles.address}>地址：{this.state.address}</Text>
          
          <MapCanvas targerLat={this.state.targerLat} targetLong={this.state.targetLong}/>
          
          <Text style={styles.text}>店长：广东广州何秋明</Text>
          <Text style={styles.text}>联系电话：13802516801</Text>
          <Text style={styles.text}>门店电话：020-87018070</Text>
          <Text style={styles.text}>状态：未评分</Text>
          <TouchableOpacity style={styles.toShop} onPress={() => {this.handleOpenToApp()}}>
            <Image source={require('../../images/work/toShop.png')} style={styles.toShopIcon} />
            <Text style={styles.toShopText}>导航到店</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.close} onPress={() => {this.props.handleCloseMap()}}>
            <Text style={styles.closeText}>关闭</Text>
          </TouchableOpacity>
          {
            this.state.toAppStatus && 
            <MapToApp handleCloseToApp={this.handleCloseToApp}
                      address={this.state.address}
                      curLat={this.state.curLat}
                      curLong={this.state.curLong}
                      targerLat={this.state.targerLat}
                      targetLong={this.state.targetLong}/>
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
    backgroundColor:'rgba(0,0,0,0.5)',
    position: "absolute",
    top: 0,
    left: 0
  },
  addressBox: {
    width: "100%",
    height: pxToDp(906),
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
    fontSize: pxToDp(48),
    marginTop: pxToDp(38),
    fontWeight: "bold"
  },
  address: {
    fontSize: pxToDp(28),
    color: "#666",
    lineHeight:pxToDp(40),
    marginTop: pxToDp(28),
    marginBottom: pxToDp(42)
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
    bottom: pxToDp(180)
  },
  toShopIcon: {
    width: pxToDp(100),
    height: pxToDp(100)
  },
  toShopText: {
    color: "#909090",
    fontSize: pxToDp(18),
    textAlign:"center"
  },
  close: {
    position:"absolute",
    right: pxToDp(20),
    top: pxToDp(20)
  },
  closeText: {
    color: "#007aff",
    fontSize: pxToDp(30)
  }
})