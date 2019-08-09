import React from "react";
import { View,Text, StyleSheet, Image } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { StarCheckTypes } from "../../../utils/enum";

interface IProps {
  title: string
  star: string
  type: StarCheckTypes  //认证进度的跟其他三个不同
}

export const ApplyItem:React.FC<IProps> = (props) =>{
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Image  style={styles.ImageStyle}
                  source={require("../../../images/work/starCheck/via.png")}/>
          <View>
            <View style={styles.processTitle}>
              <Text style={styles.name}>
                {
                  props.type === StarCheckTypes.processing_record? 
                  props.title :
                  props.title + '发起申请！'
                }
              </Text>
              {
                props.type === StarCheckTypes.processing_record &&
                <Text style={styles.processText}>06-04  15：00</Text>
              }
            </View>
            <Text style={styles.star}>认证星级：{props.star}</Text>
          </View>
        </View>
        {props.children}
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: pxToDp(32),
    marginRight: pxToDp(32),
    borderBottomColor: "#e1e1e1",
    borderBottomWidth: pxToDp(1),
    // width: "100%",
    paddingTop: pxToDp(30),
    paddingBottom: pxToDp(30),
  },
  header: {
    display: "flex",
    flexDirection: 'row',
    alignItems:"center"
  },
  ImageStyle: {
    width: pxToDp(100),
    height: pxToDp(100),
    marginRight: pxToDp(30)
  },
  name: {
    color: "#363636",
    fontSize: pxToDp(38),
    fontWeight: "bold",
    // width: pxToDp(600),
    lineHeight: pxToDp(60)
  },
  star: {
    color: "#363636",
    fontSize: pxToDp(30)
  },

  processTitle: {
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    width: pxToDp(580)
  },
  processText: {
    color: "#666",
    fontSize: pxToDp(24)
  }
})
