import React from "react";

import { View, Text, StyleSheet, Button, Linking, Alert, Picker} from "react-native";
import pxToDp from "../../utils/fixcss";
import { MapView } from 'react-native-amap3d'
import myMap from "../../utils/map";
import RoutePlan from "../../utils/routeMap";

export default class MapCmp extends React.Component{

  componentDidMount() {
    const url = 'iosamap://path?sourceApplication=test&slat=39.92848272&slon=116.39560823&sname=A&dlat=39.98848272&dlon=116.47560823&dname=B&dev=0&t=0'
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('Initial url is: ' + url);
      }
    }).catch(err => console.error('An error occurred', err));
  }
  render() {
  return(
    <View style={styles.wrapper}>
      <View style={styles.addressBox}>
            <Button
                onPress={() => {
                    RoutePlan.openAmap({
                        slat: 23.025205, slon: 113.758683, sname: "我的位置",
                        dlat: 23.025205, dlon: 113.758683, dname: "北京",
                        mode: RoutePlan.Mode.DRIVING
                    }).then(res => Alert.alert(res)).catch(err => Alert.alert(err))
                }}
                title="打开高德地图"
            />
            <Button
                onPress={() => {
                    RoutePlan.openQQMap({
                        slat: 39.92848272, slon: 113.758683, sname: "A",
                        dlat: 39.98848272, dlon: 116.47560823, dname: "B",
                        mode: RoutePlan.Mode.DRIVING
                    }).then(res => Alert.alert(res)).catch(err => Alert.alert(err))
                }}
                title="打开腾讯地图"
            />
            <Button
                onPress={() => {
                    RoutePlan.openBaiDuMap({
                        slat: 39.92848272, slon: 116.39560823, sname: "A",
                        dlat: 39.98848272, dlon: 116.47560823, dname: "B",
                        mode: RoutePlan.Mode.DRIVING
                    }).then(res => Alert.alert(res)).catch(err => Alert.alert(err))
                }}
                title="打开百度地图"
            />
        <Text style={styles.title}>广州马会家居凯奇门店</Text>
        <Text style={styles.address}>地址：广东省广州市天河区珠江新城花城大道马场路马会家居西区一楼1513慕思0769专卖店</Text>
        
        <View style={styles.map}>
          <MapView  style={styles.map}  
                    coordinate={{
                      latitude:  23.025205,
                      longitude: 113.758683,
                    }}
                    onLocation={({nativeEvent}) =>
                    console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)}
          mapType='navigation'
          locationEnabled={true}

          >
          <MapView.Marker
            draggable
            coordinate={{
              latitude: 23.025205,
              longitude: 113.758683,
            }}
          />
        </MapView>
      
        </View>
        
        <Text style={styles.text}>店长：广东广州何秋明</Text>
        <Text style={styles.text}>联系电话：13802516801</Text>
        <Text style={styles.text}>门店电话：020-87018070</Text>
        <Text style={styles.text}>状态：未评分</Text>
       
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
  }
})