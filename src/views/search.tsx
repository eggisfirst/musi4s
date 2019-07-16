import React from "react";
import { View,Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import pxToDp from "../utils/fixcss";
import { TextInput } from "react-native-gesture-handler";

interface IState {
  value: string
}

export default class Search extends React.Component<any,IState> {
  static navigationOptions = {
    header: null,
  }
  state:IState = {
    value: ''
  }
  //更改输入框的值
  handleChange = (value:string) => {
    this.setState({
      value
    })
  }
  handleSubmit = () => {
    //请求
    Alert.alert('1111')
  }
  render() {
    const {navigation} = this.props
    return(
      <View style={styles.home}>
        <View style={styles.container}>
          <TouchableOpacity 
              style={styles.backBtn}
              onPress={() => {navigation.goBack()}}>
              <Image  style={styles.arrow}
                      source={require("../images/work/starCheck/arrow.png")}/>
          </TouchableOpacity>
          <View style={styles.inputStyle}>
            <Image  style={styles.searchIcon}
                    source={require("../images/work/starCheck/search.png")} />
            <TextInput
              style={styles.input}
              maxLength={20}
              value={this.state.value}
              onChangeText={(text) => {this.handleChange(text)}}
              autoFocus={true}
              placeholder="请输入经销商名称"
              returnKeyType="search"
              onSubmitEditing={() => {this.handleSubmit()}}
            />
          </View>
        </View>
      </View>
     )
    }
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: "#f8f8f8",
    width:pxToDp(750),
    height: "100%"
  },
  container: {
    // marginTop:pxToDp(55),
    paddingLeft:pxToDp(32),
    paddingRight:pxToDp(22),
    display:"flex",
    flexDirection:"row",
    // justifyContent:"space-between",
    alignItems:"center",
    width: "100%",
    height: pxToDp(176),
    backgroundColor:"#fff",
    paddingTop: pxToDp(90)

  },
  backBtn: {
    paddingRight: pxToDp(40),
  },
  arrow: {
    width:pxToDp(20),
    height:pxToDp(36),
  },
  inputStyle: {
    width: pxToDp(590),
    height: pxToDp(60),
    backgroundColor: "#f7f7f7",
    borderRadius: pxToDp(30),
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    paddingLeft:pxToDp(30),
    paddingRight:pxToDp(30),
  },
  searchIcon :{
    width: pxToDp(32),
    height: pxToDp(32),
    marginRight: pxToDp(10)
  },
  input: {
    color: "#999",
    fontSize: pxToDp(26),
    padding: 0
  }
})
