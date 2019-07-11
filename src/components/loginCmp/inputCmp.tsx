
import React, {Component} from 'react';
import { 
  View,
  Text,
  TextInput, 
  StyleSheet,
  Animated,
  Easing,
} from "react-native"; 
import pxToDp from '../../utils/fixcss';

type Props = {
  inputData: {
    title:string,
    maxLength: number,
    type:string
  },
  setVal:any
}

export default class InputCmp extends Component<Props> {
  state = {
    inputVal: '',
    activeStatus: false,
    animatedValue:new Animated.Value(0),
    bottom: 0,
    isAnimate: false
  }
  //创建动画
  eggAnimated = Animated.timing(
    this.state.animatedValue,
    {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
    }
  );
  animateTop = this.state.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 20, 40]
  });
  animateBottom = this.state.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [40, 20, 0]
  });

  //input框变化
  handleChange = (val:string) => {
    this.setState({
      inputVal: val
    })
    //传递父组件
    this.props.setVal({
      type: this.props.inputData.type,
      val
    })
  }
  handleFocus = () => {
    const inputVal = this.state.inputVal
    this._setStatus()
    if(inputVal) {
      return
    }
    this._startAnimated(this.animateTop)
  }
  handleBlur = () => {
    const inputVal = this.state.inputVal
    this._setStatus()
    if(inputVal) {
      return
    }
    this._startAnimated(this.animateBottom)
  }
  _startAnimated(bottom) {
    const isAnimate = !this.state.isAnimate
    this.setState({
      bottom,
      isAnimate
    })
    this.state.animatedValue.setValue(0);
    this.eggAnimated.start();
  }
  _setStatus = () => {
    const activeStatus = !this.state.activeStatus
    this.setState({
      activeStatus
    })
  }
  render() {
    const {inputData} = this.props
    
    return(
      <View style={styleSheet.inputBox}>
         <Animated.View
                    style={{
                      position:'absolute',
                      left:0,
                      bottom:this.state.bottom
                    }}>
        <Text style={this.state.isAnimate? styleSheet.activelabel: styleSheet.label}>
          {inputData.title}
        </Text>
        </Animated.View>
          <TextInput
            style={ this.state.activeStatus? styleSheet.activeInput: styleSheet.input}
            maxLength={inputData.maxLength}
            value={this.state.inputVal}
            onChangeText={(text) => {this.handleChange(text)}}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
      </View>
    )
  }
}
const styleSheet = StyleSheet.create({
  inputBox: {
    paddingTop:pxToDp(64),
    position:'relative'
  },
  input: {
    height: pxToDp(80),
    borderColor: '#eee',
    borderBottomWidth: pxToDp(1),
    fontSize: pxToDp(30),
  },
  activeInput: {
    height: pxToDp(80),
    borderColor: '#007aff',
    borderBottomWidth: pxToDp(2),
    fontSize: pxToDp(30),
  },
  label: {
    fontSize: pxToDp(30),
    color: '#BEBEBE',
    fontWeight:'bold',
    bottom:pxToDp(12)
  },
  activelabel: {
    fontSize: pxToDp(24),
    color: '#BEBEBE',
    fontWeight:'bold',
    bottom:pxToDp(12)
  },
})
