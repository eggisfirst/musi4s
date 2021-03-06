import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { StarCheckTypes } from "../../../utils/enum";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import store from '../../../store'
<<<<<<< HEAD
import { getStar, removeSecond } from "../../../utils";
=======
import { getStar, removeSecond, removeMin } from "../../../utils";
>>>>>>> newtoken

interface IProps {
  title: string
  star: number
  type: StarCheckTypes  //认证进度的跟其他三个不同
  index: number
  time?: any
  handleShowReceptionBox: (index: number) => void
}



export const ApplyItem: React.FC<IProps> = (props) => {
  return (
    <>
      {
        props.type === StarCheckTypes.processing_record &&
        <TouchableWithoutFeedback onPress={() => { props.handleShowReceptionBox(props.index) }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image style={styles.ImageStyle}
                source={require("../../../images/work/starCheck/via.png")} />
              <View>
                <View style={styles.processTitle}>
                  <Text style={styles.name} >
                    {props.title}
                  </Text>
                  <View style={styles.time}>
                  <Text style={styles.processText}>{removeSecond(props.time)}</Text>
                  <Text  style={styles.processText}>{removeMin(props.time)}</Text>
                  </View>
                </View>
                <Text style={styles.star}>认证星级：{getStar(props.star)}</Text>
              </View>
            </View>
            {props.children}
          </View>
        </TouchableWithoutFeedback>
      }
      {
        props.type !== StarCheckTypes.processing_record &&
        <View style={styles.container}>
          <View style={styles.header}>
            <Image style={styles.ImageStyle}
              source={require("../../../images/work/starCheck/via.png")} />
            <View>
              <View style={styles.processTitle}>
                <Text style={styles.allName} >
                  {props.title + '发起申请！'}
                </Text>
              </View>
              <Text style={styles.star}>认证星级：{getStar(props.star)}</Text>
            </View>
          </View>
          {props.children}
        </View>
      }
    </>

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
    paddingBottom: pxToDp(19),
  },
  header: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "center"
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
    lineHeight: pxToDp(50),
    width: pxToDp(330),
  },
  allName: {
    color: "#363636",
    fontSize: pxToDp(38),
    fontWeight: "bold",
    // width: pxToDp(600),
    lineHeight: pxToDp(60),
    width: pxToDp(580),
  },
  star: {
    color: "#363636",
    fontSize: pxToDp(30),
    lineHeight: pxToDp(40)
  },

  processTitle: {
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    width: pxToDp(580)
  },

  time: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  processText: {
    color: "#666",
    fontSize: pxToDp(24),
    paddingRight: pxToDp(32),
<<<<<<< HEAD
    lineHeight: pxToDp(50)
=======
    lineHeight: pxToDp(50),
>>>>>>> newtoken
  }
})
