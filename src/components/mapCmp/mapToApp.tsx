import { View, Button, Alert, StyleSheet, Text } from "react-native";
import React from "react";
import RoutePlan from "../../utils/routeMap";
import pxToDp from "../../utils/fixcss";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Iprops {
    handleCloseToApp: () => void
    address: string
    curLat: number
    curLong: number
    targerLat: number
    targetLong: number
}

export const MapToApp:React.FC<Iprops> = (props:Iprops) => {
    const position = {
        slat: props.curLat, slon: props.curLong, sname: "我的位置",
        dlat: props.targerLat, dlon: props.targetLong, dname: `${props.address}`,
        mode: RoutePlan.Mode.DRIVING
    }
    const gaodeMap = () => {
        RoutePlan.openAmap(position).then(res => Alert.alert(res)).catch(err => Alert.alert(err))
    }
    const qqMap = () => {
        RoutePlan.openQQMap(position).then(res => Alert.alert(res)).catch(err => Alert.alert(err))
    }
    const baiduMap = () => {
        RoutePlan.openBaiDuMap(position).then(res => Alert.alert(res)).catch(err => Alert.alert(err))
    }

  return (
    <View style={styles.mask}>
        <View style={styles.container} >
            <TouchableOpacity style={styles.mapItem} onPress={() => {gaodeMap()}}>
                <Text style={styles.text}>高德地图</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mapItem} onPress={() => {qqMap()}}>
                <Text style={styles.text}>腾讯地图</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.lastItem} onPress={() => {baiduMap()}}>
                <Text style={styles.text}>百度地图</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.cancle} >
            <TouchableOpacity style={styles.lastItem} onPress={() => {props.handleCloseToApp()}}>
                <Text style={styles.text}>取消</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mask: {
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 999,
        width: pxToDp(750),
        height: pxToDp(926),
        borderTopLeftRadius: pxToDp(60),
        borderTopRightRadius: pxToDp(60),
        backgroundColor:'rgba(0,0,0,0.5)',
    },
    container: {
        backgroundColor: "#fff",
        width: pxToDp(700),
        position: "absolute",
        left: pxToDp(25),
        bottom: pxToDp(190),
        borderRadius: pxToDp(20),
        opacity: 0.95,
        zIndex: 999,
    },
    mapItem: {
        width: "100%",
        borderBottomColor: "#e1e1e1",
        borderBottomWidth: pxToDp(1),
    },
    lastItem: {
        width: "100%",
    },
    text: {
        color: "#007aff",
        fontSize: pxToDp(34),
        lineHeight: pxToDp(90),
        textAlign: "center",
        fontWeight: "bold"
    },
    cancle: {
        backgroundColor: "#fff",
        width: pxToDp(700),
        position: "absolute",
        bottom: pxToDp(80),
        left: pxToDp(25),
        borderRadius: pxToDp(20),
        opacity: 0.95
    }
})