/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { connect } from 'react-redux'
import {View, Text, Button} from 'react-native';
// import {increment, decrement} from '../actions'

class Add extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'mangoguang'
    }

    this.add = () => {
      // console.log(this.props)
      // this.props.add(2)
    }

    this.delete = () => {
      // this.props.delete(2)
    }
  }

  render() {
    return (
      <View>
        {/* <Text>数字：{this.props.increment}:{this.props.decrement}</Text> */}
        <Text onPress={this.add}>Add1</Text>
        <Text onPress={this.delete}>Delete</Text>
      </View>
    );
  }

  componentDidMount() {
    console.log('add组件:', this)
  }
}

const mapStateToProps = (state) => ({
  // increment: state.increment,
  // decrement: state.decrement
})
const mapDispatchToProps = (dispatch) => ({
  // add: (num) => {
  //   dispatch(increment(num))
  // },
  // delete: (num) => {
  //   dispatch(decrement(num))
  // }
})
export default connect(mapStateToProps, mapDispatchToProps)(Add)
