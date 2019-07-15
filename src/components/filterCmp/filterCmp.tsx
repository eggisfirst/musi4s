
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react'
import pxToDp from '../../utils/fixcss';

interface IProps {
  handleFilterStatus: () => void
}
export const FilterCmp:React.FC<IProps> = ({handleFilterStatus}) => {
  return (
    <TouchableOpacity style={styles.container}
                      onPress={() => {handleFilterStatus()}}>
                      <Text style={styles.line}>|</Text>
                      <Text style={styles.textStyle}>筛选</Text>
                      <Image style={styles.image} source={require("../../images/filter/filter.png")} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:{
    marginRight: pxToDp(32),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  line: {
    color: "#999",
    marginRight: pxToDp(32),
    paddingLeft:pxToDp(20)
  },
  textStyle: {
    color: "#363636",
    fontSize: pxToDp(30)
  },
  image: {
    width: pxToDp(18),
    height: pxToDp(18),
    marginLeft: pxToDp(12)
  }
})