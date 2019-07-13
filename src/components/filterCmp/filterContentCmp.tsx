import { View, Text, StyleSheet, TouchableOpacity, Button, Platform, Dimensions } from "react-native";
import React from "react";
import pxToDp from "../../utils/fixcss";

interface IProps {
  filterList: Array<string>
  finterActiveIndex: number
  handleFilter: (i: number) => void
  handleReset: () => void
  handleComfirm: () => void
}

export const FilterContentCmp: React.FC<IProps> = (IProps) => {
  const {filterList,finterActiveIndex, handleFilter, handleReset, handleComfirm} = IProps
  const handleClick = (i:number) => {
    handleFilter(i)
  }
  return (
    <View style={styles.container}>
      <View style={styles.modalStyle}>
          <View>
            <Text style={styles.textStyle}>时间</Text>
          </View>
          <View style={styles.star}>
            <Text style={styles.textStyle}>认证星级</Text>
            <View style={styles.btnList}>
              {
                filterList.map((item, i) => (
                  <TouchableOpacity activeOpacity={0.6} key={item} onPress={() => {handleClick(i)}}> 
                    <View style={finterActiveIndex === i? styles.starItemActive:styles.starItem}>
                      <Text style={finterActiveIndex === i? styles.btnColorActive:styles.btnColor}>{item}</Text>
                    </View>
                  </TouchableOpacity>
                )) 
              }
            </View>
          </View>
          <View style={styles.footerBtn}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => {handleReset()}}> 
              <Text style={styles.reset}>重置</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={() => {handleComfirm()}}> 
              <Text style={styles.comfirm}>完成</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0, 
    zIndex:9999, 
    width: '100%', 
    height: Dimensions.get('screen').height,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalStyle: {
    position: 'absolute',
    top:0,
    right:0,
    bottom:0, 
    zIndex:99999, 
    width: pxToDp(600), 
    height: Dimensions.get('screen').height,
    backgroundColor: '#fff',
    paddingTop: pxToDp(90),
    paddingLeft:pxToDp(33),
    paddingRight:pxToDp(6),
  },
  textStyle: {
    color:"#999",
    fontSize: pxToDp(28)
  },
  star: {
    marginTop: pxToDp(40),
  },
  btnList: {
    display:"flex",
    flexDirection:"row",
    flexWrap:"wrap",
    alignItems:"center"
  },
  starItem: {
    width: pxToDp(160),
    height: pxToDp(80),
    borderRadius: pxToDp(12),
    backgroundColor: "#f8f8f8",
    marginTop:pxToDp(20),
    marginRight: pxToDp(27)
  },
  starItemActive: {
    width: pxToDp(160),
    height: pxToDp(80),
    borderRadius: pxToDp(12),
    backgroundColor: "#b2d7ff",
    marginTop:pxToDp(20),
    marginRight: pxToDp(27)
  },
  btnColor: {
    color: "#666",
    lineHeight: pxToDp(80),
    textAlign:"center",
  },
  btnColorActive: {
    color: "#007aff",
    lineHeight: pxToDp(80),
    textAlign:"center",
  },
  footerBtn: {
    width: pxToDp(600),
    height: pxToDp(165),
    position:"absolute",
    bottom: 0,
    left:0,
    display:"flex",
    flexDirection:"row",
    alignItems:"center"
  },
  reset: {
    width: pxToDp(300),
    height:pxToDp(165),
    backgroundColor: "#b2d7ff",
    color: "#007aff",
    fontSize:pxToDp(34),
    textAlign:"center",
    lineHeight: pxToDp(165)
  },
  comfirm: {
    width: pxToDp(300),
    height:pxToDp(165),
    backgroundColor: "#007aff",
    color: "#fff",
    fontSize:pxToDp(34),
    textAlign:"center",
    lineHeight: pxToDp(165)

  }
})