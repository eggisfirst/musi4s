import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import pxToDp from "../../../utils/fixcss";

interface list {
  imgUrl: any,
  link: string
}

interface IProps {
  list: Array<list>
  navigation: any
}

export const ReportForm: React.FC<IProps> = ({navigation, list}) => {
  return (
    <>
      <Text style={styles.title}>区域报表</Text>
        <View style={styles.reportWrapper}>
          {
            list && list.map(item => (
              <TouchableOpacity key={item.imgUrl} onPress={() => {navigation.push(item.link)}}>
                <Image 
                    style={styles.reportStyle}
                    source={item.imgUrl} />
              </TouchableOpacity>
            ))
          }
        </View>
    </>
  )
}

const styles = StyleSheet.create({
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
    // justifyContent:"space-between",
    flexWrap:"wrap"
  },
  reportStyle: {
    width:pxToDp(200),
    height:pxToDp(160),
    marginTop:pxToDp(51),
    marginRight:pxToDp(28)
  
  },
})