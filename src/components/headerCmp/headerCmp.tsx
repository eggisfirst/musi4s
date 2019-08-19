import React from "react";
import { View,Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import pxToDp from "../../utils/fixcss";
import { StarCheckTypes } from "../../utils/enum";

interface IProps {
  title: string
  eggHandleBack: () => void
  Children?: JSX.Element
  bgColor?: string
}

/**通用头部需要设置页面默认头部为null */
/**
 * 
 * @param props static navigationOptions = {
  header: null,
}
 */
export const HeaderCmp:React.FC<IProps> = (props:IProps) => {
    const {title,eggHandleBack} = props
    return(
      <View style={[styles.container, {backgroundColor: props.bgColor? props.bgColor : "#fff"}]}>
        <TouchableOpacity 
            style={styles.backBtn}
            onPress={() => {eggHandleBack()}}>
            <Image  style={styles.arrow}
                    source={require("../../images/work/starCheck/arrow.png")}/>
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.title} >{title}</Text>
        { props.Children || <View style={styles.right}></View>}
      </View>
     )
}

const styles = StyleSheet.create({
  container: {
    marginTop:pxToDp(55),
    paddingLeft:pxToDp(32),
    paddingRight:pxToDp(22),
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    width: "100%",
    height: pxToDp(150),
    backgroundColor: "#fff"
  },
  backBtn: {
    paddingRight: pxToDp(40),
    flex: 0.3,
  },
  arrow: {
    width:pxToDp(20),
    height:pxToDp(36),
  },
  title: {
    color:"#363636",
    fontSize:pxToDp(38),
    fontWeight:"bold",
    textAlign:"center",
    flex:0.68,
  },
  right: {
    flex: 0.4
  }
})
