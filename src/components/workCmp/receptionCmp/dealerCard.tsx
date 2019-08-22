import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Linking } from "react-native";
import pxToDp from "../../../utils/fixcss";

interface IProps {
  cardData: any
}

export const DealerCard:React.FC<IProps> = (props) =>{
  /**
   * 
   * @param phone 电话
   */
  const linking = (phone:any) => {
    if(!phone) {
      return
    }
    let tel = `tel:${phone}`// 目标电话
    Alert.alert('', phone,
      [ { text: '取消', onPress: () => { console.log('取消') } },
        { text: '呼叫',
          onPress: () => {
            Linking.canOpenURL(tel).then((supported) => {
              if (!supported) {
                console.log('Can not handle tel:' + tel)
              } else {
                return Linking.openURL(tel)
              }
            }).catch(error => console.log('tel error', error))
          } }])
  }
  return(
    <View style={styles.wrapper}>
      <View style={styles.topMsg}>
        <Image style={styles.icon} source={require('../../../images/work/reception/manage.png')}/>
        <Image style={styles.via} source={require('../../../images/personal/via.png')}/>
        <View style={styles.msg}>
          <Text style={styles.name}>{props.cardData.distributor}</Text>
          <View style={styles.phoneMsg}>
            <Image style={styles.phone} source={require('../../../images/work/reception/phone.png')}/>
            <Text style={styles.phoneNum} onPress={() => {linking(props.cardData.phone)}}>电话：{props.cardData.phone}</Text>
          </View>
        </View>
        <Image style={styles.logo} source={require('../../../images/personal/logo.png')}/>
      </View>

      <View style={styles.botMsg}>
        <View>
          <View style={styles.recePerson}>
            <Text style={{color: "#E8D3A8",fontSize:pxToDp(28)}}>对接人：</Text>
            <Text style={{color: "#E8D3A8",fontSize:pxToDp(36),fontWeight:"bold"}}>{props.cardData.agentName}</Text>
          </View>
          <View style={[styles.recePerson,styles.recePhone]} >
            <Text style={{color: "#E8D3A8",fontSize:pxToDp(28)}}>电话：</Text>
            <Text style={{color: "#E8D3A8",fontSize:pxToDp(28)}} >{props.cardData.agentPhone}</Text>
          </View>
        </View>
        {
          props.cardData.agentPhone &&
          <TouchableOpacity style={styles.callBtn} onPress={() => {linking(props.cardData.agentPhone)}}>
            <Text style={styles.call}>一键通话</Text>
          </TouchableOpacity>
        }
      </View>
    </View>
   )
}

const styles = StyleSheet.create({
  wrapper: {
    width: pxToDp(686),
    height: pxToDp(330),
    backgroundColor: "#fff",
    borderRadius: pxToDp(20)
  },
  topMsg: {
    width: "100%",
    height: pxToDp(190),
    display: "flex",
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection: "row",
  
  },
  icon: {
    width: pxToDp(28),
    height: pxToDp(84),
  },
  via: {
    width: pxToDp(100),
    height: pxToDp(100),
    marginRight: pxToDp(30),
    marginLeft: pxToDp(12)
  },
  phone: {
    width: pxToDp(24),
    height: pxToDp(24)
  },
  logo: {
    width: pxToDp(130),
    height: pxToDp(150),
    marginRight:pxToDp(40)
  },

  msg: {
    width: pxToDp(350),
  },
  name: {
    color:"#363636",
    fontSize: pxToDp(38),
    fontWeight: "bold"
  },
  phoneMsg: {
    display:"flex",
    flexDirection: "row",
    alignItems:"center",
    marginTop: pxToDp(20)
  },
  phoneNum: {
    fontSize: pxToDp(28),
    color: "#666",
    marginLeft: pxToDp(10)
  },


  botMsg: {
    width: '100%',
    height: pxToDp(140),
    backgroundColor:'linear-gradient(-90deg,rgba(82,88,106,1),rgba(49,53,66,1))',
    borderBottomRightRadius: pxToDp(20),
    borderBottomLeftRadius: pxToDp(20),
    paddingLeft: pxToDp(39),
    paddingRight: pxToDp(39),
    display: "flex",
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  recePerson: {
    display:"flex",
    flexDirection:"row",
    alignItems:"center",

  },
  recePhone: {
    marginTop: pxToDp(15)
  },


  callBtn: {
    width: pxToDp(170),
    height: pxToDp(60),
    borderRadius: pxToDp(30),
    backgroundColor:'rgba(255,255,255,0.3)'
  },
  call: {
    fontSize: pxToDp(30),
    color: "#fff",
    textAlign:"center",
    lineHeight: pxToDp(60),
    fontWeight: "500"
  }
})
