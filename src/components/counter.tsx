import React, { useState } from "react"; 
import { View, Text, Button } from "react-native";
// import store from '../store'
import {connect} from 'react-redux';
import * as actions from '../store/actions/counter';



class Counter extends React.Component<any> {
 
  render() {
    console.log(this.props)
    return (
      <View>
        <Text>Hello, {this.props.count}</Text>
        <Button
        onPress={() => {this.handleClick()}}
        title="click me"
        ></Button>
    </View>
    )
  }
  handleClick = () => {
    this.props.add(6)
  }
}

const mapStateToProps = (state:any) => state.counter;

export default connect(mapStateToProps, actions)(Counter)

