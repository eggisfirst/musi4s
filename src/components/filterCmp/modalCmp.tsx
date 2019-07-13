import { View, Modal, Text, Image, StyleSheet, Platform } from "react-native";
import React, { useState } from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import pxToDp from "../../utils/fixcss";

export const ModalCmp: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(true)
  return (
    <View >
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          
        }} >
          <View style={styles.modalStyle}>
            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.list}>
                <Text style={styles.listItem}>申请时间升序</Text>
                <Image  style={styles.checkStyle}
                        source={require("../../images/filter/checked.png")} />
              </View>
            </TouchableHighlight>
          </View>
      </Modal>
    </View>

  )
}

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor:"rgba(0,0,0,0.5)",
    // marginTop:Platform.OS === "ios"? pxToDp(290) : pxToDp(190),
    flex:1,
    borderTopWidth:pxToDp(1),
    borderColor:"#e1e1e1",
  },
  list: {
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
    height: pxToDp(22)
  }
})