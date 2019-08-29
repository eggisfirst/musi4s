import React, { PureComponent, Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder,
} from 'react-native';

export default class TouchStartAndRelease extends PureComponent<any> {
  state = {
    _panResponder: null
  }
  componentWillMount() {
    const _panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      onPanResponderGrant: (evt, gestureState) => {
      },
      onPanResponderMove: (evt, gestureState) => {
        // console.log(`gestureState.dx : ${gestureState.dx}   gestureState.dy : ${gestureState.dy}`);

      },
      onPanResponderRelease: (evt, gestureState) => {
        console.log(gestureState.dy)
        if (gestureState.dy > 0 && gestureState.dx === 0) {
          this.props.handleHide()
        }

      },
      onPanResponderTerminate: (evt, gestureState) => {
      },
    });
    this.setState({
      _panResponder
    })
  }


  render() {
    return (
      <View style={styles.container} {...(this.state._panResponder as any).panHandlers} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  redView: {
    width: '100%',
    height: 1334,
  }
})
