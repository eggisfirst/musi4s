
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import pxToDp from '../../utils/fixcss';

interface IProps {
  submit: () => void
  reset: () => void
}

export default class BigBtn extends Component<IProps> {

  render() {
    return (
      <View style={styleSheet.btnBox}>
        <TouchableOpacity
          style={[styleSheet.button, styleSheet.reset]}
          onPress={this.props.reset}
        >
          <Text style={[styleSheet.btnText, styleSheet.resetText]}>重置</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styleSheet.button}
          onPress={this.props.submit}
        >
          <Text style={styleSheet.btnText}>提交</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styleSheet = StyleSheet.create({
  btnBox: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#007AFF',
    borderWidth: pxToDp(1),
    position: 'absolute',
    bottom: 0,
  },
  button: {
    flex: 1,
    height: pxToDp(98),
    backgroundColor: '#007AFF',
  },
  reset: {
    backgroundColor: '#fff',
  },
  btnText: {
    color: '#fff',
    fontSize: pxToDp(34),
    textAlign: 'center',
    lineHeight: pxToDp(98),
    fontWeight: "bold"
  },
  resetText: {
    color: '#007AFF',
  }
})
