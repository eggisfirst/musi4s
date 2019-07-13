
import { View, Text, StyleSheet, Image, Modal, TouchableHighlight, Platform,StatusBar, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import pxToDp from '../../utils/fixcss';

interface IProps {
  handleSort: () => void
}

export const Sort:React.FC<IProps> = ({handleSort}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [status,setStatus] = useState(false)
  const listItem = [
    {
      name: "申请时间升序",
      status: true
    },
    {
      name: '申请时间降序',
      status: false
    }
  ]
  let list = null;
  if(status) {
    list = (
      <View style={styles.modalStyle}>
          {
            listItem.map( item => (
              <TouchableOpacity 
                style={styles.listWrapper} 
                onPress={() => {setStatus(!status)}} key={item.name}>
                  <Text style={styles.listItem}>{item.name}</Text>
                  {
                    item.status && (
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
        onPress={() => {setStatus(!status)}}>
        <Text style={styles.textStyle}>申请时间升序</Text>
        <Image  style={styles.imageStyle}
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
  textStyle: {
    color: "#363636",
    fontSize: pxToDp(30),
    lineHeight: pxToDp(80)
  },
  modalStyle: {
    backgroundColor:"rgba(0,0,0,0.5)",
    height: pxToDp(2000),
    width:pxToDp(750),
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