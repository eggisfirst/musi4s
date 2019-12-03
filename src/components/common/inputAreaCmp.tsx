
<<<<<<< HEAD
import React, {Component} from 'react';
=======
import React, { Component } from 'react';
>>>>>>> newtoken
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import pxToDp from '../../utils/fixcss';
import { placeholder } from '@babel/types';

interface IProps {
  setInputAreaVal: (text: string) => void
  inputAreaVal: string
  placeholder: string
}

interface IState {
  inputAreaVal: string
}

export default class InputAreaCmp extends Component<IProps, IState> {
  state: IState = {
    inputAreaVal: '',
  }
  setInputAreaVal = (text: string) => {
    //过滤表情
    var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
    if (regStr.test(text)) {
      text = text.replace(regStr, "");
    }
    // this.setState({inputAreaVal: text})
    this.props.setInputAreaVal(text)
  }
  componentDidMount() {
    this.setState({ inputAreaVal: this.props.inputAreaVal })
  }
  render() {
    return (
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
          returnKeyType={"go"}
          ref={'keyBroad'}
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
