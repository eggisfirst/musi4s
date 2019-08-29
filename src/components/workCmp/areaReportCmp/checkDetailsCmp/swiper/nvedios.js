import React, {
  Component
} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  BackHandler
} from 'react-native';

import Video from 'react-native-video';
import pxToDp from '../../../../../utils/fixcss';

function formatTime(second) {
  let h = 0, i = 0, s = parseInt(second);
  if (s > 60) {
    i = parseInt(s / 60);
    s = parseInt(s % 60);
  }
  // 补零
  let zero = function (v) {
    return (v >> 0) < 10 ? "0" + v : v;
  };
  // console.log([zero(h), zero(i), zero(s)].join(":"));
  // return [zero(h), zero(i), zero(s)].join(":");
  return zero(s);
}

export default class VideoScreen extends Component {

  static navigationOptions = {
    header: null
  };

  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    paused: true,
    isFull: false
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }

  onBackAndroid = () => {
    this.props.navigation.goBack();
    return true;
  };


  onLoad = (data) => {
    this.setState({ duration: data.duration });
    // console.log(data.duration + "xxx");
  };

  onProgress = (data) => {
    this.setState({ currentTime: data.currentTime });
    // console.log(data.currentTime + "hhh");
  };

  onEnd = () => {
    this.setState({ paused: true })
    this.video.seek(0)
  };

  onAudioBecomingNoisy = () => {
    this.setState({ paused: true })
  };

  onAudioFocusChanged = (event) => {
    this.setState({ paused: !event.hasAudioFocus })
  };

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    }
    return 0;
  };

  handleFull = () => {
    console.log(11111)
    this.setState({
      isFull: true
    })
  }

  handleCloseFull = () => {
    console.log(222)
    this.setState({
      isFull: false
    })
  }
  renderRateControl(rate) {
    const isSelected = (this.state.rate === rate);

    return (
      <TouchableOpacity onPress={() => {
        this.setState({ rate })
      }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
          {rate}x
              </Text>
      </TouchableOpacity>
    );
  }

  renderResizeModeControl(resizeMode) {
    const isSelected = (this.state.resizeMode === resizeMode);

    return (
      <TouchableOpacity onPress={() => {
        this.setState({ resizeMode })
      }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    )
  }

  renderVolumeControl(volume) {
    const isSelected = (this.state.volume === volume);

    return (
      <TouchableOpacity onPress={() => {
        this.setState({ volume })
      }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
          {volume * 100}%
              </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
    const fullStyle = this.state.isFull ? styles.full : styles.container
    return (
      <View style={fullStyle}>
        <TouchableOpacity
          style={styles.fullScreen}
          onPress={() => this.setState({ paused: !this.state.paused })}>
          <Video
            ref={(ref) => {
              this.video = ref
            }}
            /* For ExoPlayer */
            source={{ uri: "http://124.129.157.208:8810/SD/2017qingdao/xiaoxueEnglish/grade3/b/1.mp4" }}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            onAudioBecomingNoisy={this.onAudioBecomingNoisy}
            onAudioFocusChanged={this.onAudioFocusChanged}
            repeat={false}
          />
          <Text style={{ color: "#fff", position: "absolute", top: 150, zIndex: 99999 }} onPress={() => { this.handleCloseFull() }}>退出全屏</Text>
        </TouchableOpacity>
        <Text style={{ color: "#000", marginTop: 100 }} onPress={() => { this.handleFull() }}>全屏</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
    // width: "70%",
    // height: 800
  },
  full: {
    position: 'absolute',
    top: 0,
    left: -pxToDp(135),
    bottom: 0,
    right: 0,
    width: pxToDp(750),
    // zIndex: 999,
    // height: pxToDp(1000)

  },
  textStyle: {
    paddingLeft: 10,
    paddingTop: 25,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    // width: "100%"
  },
  btnStyle: {
    paddingRight: 10,
    paddingTop: 25,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // width: pxToDp(750)
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingTop: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    fontSize: 25,
    color: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
});