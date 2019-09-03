
import React, {Component} from 'react';
import { 
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native"; 
import pxToDp from '../../utils/fixcss';

interface IProps {
  onClick:() => void
}

export default class BigBtn extends Component<IProps> {

  render() {
    return(
      <TouchableOpacity
        style={styleSheet.button}
        onPress={this.props.onClick}
      >
        <Text style={styleSheet.btnText}>登录</Text>
      </TouchableOpacity>
    )
  }
}
const styleSheet = StyleSheet.create({
  button: {
    height: pxToDp(98),
    borderRadius: pxToDp(49),
    backgroundColor:  '#007AFF',
    marginTop: pxToDp(96),
  },
  btnText: {
    color: '#fff',
    fontSize: pxToDp(34),
    textAlign: 'center',
    lineHeight: pxToDp(98),
    fontWeight:"bold"
  },
})
