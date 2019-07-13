
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import pxToDp from '../../utils/fixcss';


interface IProps {
  handleSort: (i: number) => void
  activeIndex: number
  sortList: Array<string>
}

export const Sort:React.FC<IProps> = (IProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  //点击事件
  const handleClick = (i:number) => {
    IProps.handleSort(i)
    setModalVisible(!modalVisible)
  }
  let list = null;
  if(modalVisible) {
    list = (
      <View style={styles.modalStyle}>
          {
            IProps.sortList.map((item,i) => (
              <TouchableOpacity key={item}  style={styles.listWrapper} 
                                activeOpacity={0.8}
                                onPress={() => {handleClick(i)}} >
                                <Text style={styles.listItem}>{item}</Text>
                                {
                                  IProps.activeIndex === i && (
                                    <Image  style={styles.checkStyle}
                                            source={require("../../images/filter/checked.png")} />
                                  )
                                }
              </TouchableOpacity>
            ))
          }
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity  
        style={styles.btnStyle}
        onPress={() => {setModalVisible(!modalVisible)}}>
        <Text style={styles.textStyle}>{IProps.sortList[IProps.activeIndex]}</Text>
        <Image  style={modalVisible? styles.imageStyle2 : styles.imageStyle}
                source={require('../../images/filter/down.png')} />
      </TouchableOpacity>
      {list}
    </View>
  )
 
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth:pxToDp(1),
    borderColor:"#e1e1e1",
    position:"relative",
  },
  btnStyle: {
    paddingLeft: pxToDp(32),
    display:'flex',
    flexDirection:"row",
    alignItems:"center",
    width:pxToDp(250),
    height:pxToDp(80),
    paddingRight: pxToDp(20),
  },
  imageStyle: {
    width: pxToDp(16),
    height: pxToDp(16),
    marginLeft: pxToDp(10)
  },
  imageStyle2: {
    width: pxToDp(16),
    height: pxToDp(16),
    marginLeft: pxToDp(10),
    transform: [{rotateX:'180deg'}]
  },
  textStyle: {
    color: "#363636",
    fontSize: pxToDp(30),
    lineHeight: pxToDp(80)
  },
  modalStyle: {
    backgroundColor:"rgba(0,0,0,0.5)",
    height: pxToDp(2000),
    width:pxToDp(750),
    // borderTopWidth:pxToDp(1),
    // borderColor: "#e1e1e1"
  },
  listWrapper: {
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row",
    width:"100%",
    paddingLeft: pxToDp(34),
    paddingRight: pxToDp(34),
    backgroundColor:"rgba(248,248,248,1)",

  },
  listItem: {
    height: pxToDp(80),
    color: "#363636",
    fontSize: pxToDp(30),
    lineHeight: pxToDp(80)
  },
  checkStyle: {
    width: pxToDp(22),
    height: pxToDp(22),
  }
})