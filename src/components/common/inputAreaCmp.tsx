
import React, {Component} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native"; 
import pxToDp from '../../utils/fixcss';
import { placeholder } from '@babel/types';

interface IProps {
  setInputAreaVal:(text:string) => void
  inputAreaVal: string
  placeholder: string
}

interface IState {
  inputAreaVal: string
}

export default class InputAreaCmp extends Component<IProps,IState> {
  state:IState = {
    inputAreaVal: '',
  }
  setInputAreaVal = (text: string) => {
    // this.setState({inputAreaVal: text})
    this.props.setInputAreaVal(text)
  }
  componentDidMount() {
    this.setState({inputAreaVal: this.props.inputAreaVal})
  }
  render() {
    return(
      <View style={styles.inputAreaBox}>
        <TextInput
          textContentType='none'
          value={this.props.inputAreaVal}
          onChangeText={(text) => this.setInputAreaVal(text)}
          style={styles.textarea}
          placeholder={this.props.placeholder}
          placeholderTextColor={"#999"}
          maxLength={100}
          multiline={true}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  inputAreaBox: {

  },
  textarea: {
    width: pxToDp(640),
    // height: pxToDp(100),
    textAlignVertical: 'top',
    color: '#2d2d2d',
  },
})
