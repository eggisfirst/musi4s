import React from "react";

import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import pxToDp from "../../../../utils/fixcss";

interface IProps {
  starTitle: string
  starNum: number
}


export const StarBox:React.FC <IProps>= (props) => {
  /**判断返回几颗黄色几颗白色 */
  const star = () => {
    const list = [false,false,false,false,false]
    list.map((item, index) => {
      if(index < props.starNum) {
        list[index] = true
      }
    })
    return list
  }
  return(

    <ImageBackground style={styles.starContainer} source={require('../../../../images/work/areaReport/checkRecord/starbg.png')}>
      <View style={styles.starBox}>
        {
          star().map((item, index) => {
            if(item) {
              return (
                <Image key={index} style={styles.star} source={require("../../../../images/work/areaReport/checkRecord/star.png")} />
              )
            }else {
              return (
                <Image key={index} style={styles.star} source={require("../../../../images/work/areaReport/checkRecord/star_white.png")} />
              )
            }
          })
        }
      </View>
      <Text style={styles.starcheck}>{props.starTitle}</Text>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  starContainer: {
    width: pxToDp(188),
    height: pxToDp(81),
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: pxToDp(13)
  },
  starBox:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  star: {
    width: pxToDp(30),
    height: pxToDp(30),
  },
  starcheck: {
    color: "#57452C",
    fontSize: pxToDp(24),
    marginTop: pxToDp(7),
  }
})
