import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StarItem } from "./starItem";
import { StarCheckTypes } from "../../../utils/enum";
import pxToDp from "../../../utils/fixcss";

interface list {
  imgUrl: any
  num: number
  type: StarCheckTypes
}

interface IProps {
  list: Array<list>
  navigation: any
}

export const StarCheck: React.FC<IProps> = ({navigation, list}) => {
  return (
    <>
      <Text style={styles.title}>星级认证</Text>
      <View style={styles.list}>
        {
          list && list.map(item => (
            <TouchableOpacity  
                    onPress={() => {navigation.push('HandlePage',{
                      type: item.type
                    }
                    )}}
                    key={item.type}>
              <StarItem title={item.type} imgUrl={item.imgUrl} num={item.num}/>
            </TouchableOpacity>
          ))
        }
      </View>
    </>
  )
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
})