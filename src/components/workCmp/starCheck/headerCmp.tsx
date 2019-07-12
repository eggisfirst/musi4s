import React from "react";
import { View,Text, Platform, Image, StyleSheet, TouchableOpacity } from "react-native";
import pxToDp from "../../../utils/fixcss";

interface IProps {
  title: string
  handleSearch: () => void
  handleBack: () => void
}

export default class HeaderCmp extends React.Component<IProps> {
  render() {
    const {title,handleSearch,handleBack} = this.props
    return(
      <View style={styles.container}>
        <TouchableOpacity 
            style={styles.backBtn}
            onPress={() => {handleBack()}}>
            <Image  style={styles.arrow}
                    source={require("../../../images/work/starCheck/arrow.png")}/>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => {handleSearch()}}>
          <View style={styles.rightContainer}>
            <Image  style={styles.search}
                    source={require("../../../images/work/starCheck/search.png")} />
            <Text style={styles.textStyle}>经销商</Text>
          </View>
        </TouchableOpacity>
      </View>
     )
  }
  
}

const styles = StyleSheet.create({
  container: {
    marginTop:pxToDp(115),
    paddingLeft:pxToDp(32),
    paddingRight:pxToDp(22),
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    width: "100%"
  },
  backBtn: {
    padding: pxToDp(20),
  },
  arrow: {
    width:pxToDp(20),
    height:pxToDp(36),
  },
  title: {
    color:"#363636",
    fontSize:pxToDp(38),
    fontWeight:"bold",
    textAlign:"right",
    flex:0.52,
  },
  rightContainer: {
    display:"flex",
    flexDirection:"row",
    width:pxToDp(180),
    height: pxToDp(60),
    borderRadius: pxToDp(30),
    backgroundColor: "#f7f7f7",
    alignItems:"center",
    paddingLeft: pxToDp(30),
    paddingRight: pxToDp(30)
  },
  search: {
    width: pxToDp(32),
    height: pxToDp(32),
    marginRight: pxToDp(9),
  },
  textStyle: {
    color: "#999",
    fontSize: pxToDp(26)
  }
})
