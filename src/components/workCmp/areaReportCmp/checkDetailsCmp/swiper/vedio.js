import React, {Component} from 'react';
import {View,Slider, Dimensions, Image, Text, TouchableWithoutFeedback, TouchableOpacity, Button, StyleSheet} from 'react-native';
import Video from 'react-native-video';
// import Slider from '@react-native-community/slider'
// import Orientation from 'react-native-orientation';
import pxToDp from "../../../../../utils/fixcss";
const screenWidth = Dimensions.get('window').width;
import store from '../../../../../store';
import { setLoading } from '../../../../../store/actions/global/loading';

import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/4s/video'


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
  return [zero(h), zero(i), zero(s)].join(":");
}

class VideoPlayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoUrl: "http://124.129.157.208:8810/SD/2017qingdao/xiaoxueEnglish/grade3/b/1.mp4",
      videoCover: "http://124.129.157.208:8889/data/uploads/kecheng/2018/01/18/5a600b2c99836.png@0o_0l_220w.png",
      videoWidth: pxToDp(500),
      videoHeight: pxToDp(485)*1.33, // 默认16：9的宽高比
      showVideoCover: false,    // 是否显示视频封面
      showVideoControl: false, // 是否显示视频控制组件
      isPlaying: false,        // 视频是否正在播放
      currentTime: 0,        // 视频当前播放的时间
      duration: 0,           // 视频的总时长
      isFullScreen: false,     // 当前是否全屏显示
      playFromBeginning: false, // 是否从头开始播放
    };
  }
  
  render() {
    // console.log('play',this.props.videoControl)
    const fullScreen = this.state.isFullScreen? styles.full : styles.container
    return (
      // onLayout={this._onLayout}
      <View style={fullScreen} >
        <View style={{ width: this.state.videoWidth, height: pxToDp(485)*1.32, backgroundColor:'#000000' }}>
          <Video
            ref={(ref) => this.videoPlayer = ref}
            source={{uri: this.props.videoUrl}}
            rate={1.0}
            volume={1.0}
            muted={false}
            // paused={!this.state.isPlaying}
            paused={!this.props.video.isPlay}
            resizeMode={'contain'}
            playWhenInactive={false}
            playInBackground={false}
            ignoreSilentSwitch={'ignore'}
            progressUpdateInterval={250.0}
            onLoadStart={this._onLoadStart}
            onLoad={this._onLoaded}
            onProgress={this._onProgressChanged}
            onEnd={this._onPlayEnd}
            onError={this._onPlayError}
            onBuffer={this._onBuffering}
            style={{width: this.state.videoWidth, height:  pxToDp(485)*1.32}}
          />
          {
            this.state.showVideoCover ?
              <Image
                style={{
                  position:'absolute',
                  top: 0,
                  left: 0,
                  width: this.state.videoWidth,
                  height: pxToDp(485)*1.32
                }}
                resizeMode={'cover'}
                source={{uri: this.state.videoCover}}
              /> : null
          }
          <TouchableWithoutFeedback onPress={() => { this.hideControl() }}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: this.state.videoWidth,
                height:  pxToDp(480)*1.33,
                backgroundColor: this.props.video.isPlay ? 'transparent' : 'rgba(0, 0, 0, 0.2)',
                alignItems:'center',
                justifyContent:'center'
              }}>
              {
                this.props.video.isPlay ? null :
                  <TouchableWithoutFeedback onPress={() => { this.onPressPlayButton() }}>
                    <Image
                      style={styles.playButton}
                      source={require('./images/play.png')}
                    />
                  </TouchableWithoutFeedback>
              }
            </View>
          </TouchableWithoutFeedback>
          {
            this.state.showVideoControl ?
              <View style={[styles.control, {width: this.state.videoWidth}]}>
                <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlPlayPress() }}>
                  <Image
                    style={styles.playControl}
                    source={this.props.video.isPlay ? require('./images/pause.png') : require('./images/play.png')}
                  />
                </TouchableOpacity>
                <Text style={styles.time}>{formatTime(this.state.currentTime)}</Text>
                <Slider
                  style={{flex: 1,width: pxToDp(10),height: pxToDp(10)}}
                  maximumTrackTintColor={'#999999'}
                  minimumTrackTintColor={'#00c06d'}
                  // thumbImage={require('./images/slider.png')}
                  value={this.state.currentTime}
                  minimumValue={0}
                  maximumValue={this.state.duration}
                  onValueChange={(currentTime) => { this.onSliderValueChanged(currentTime) }}
                />
                <Text style={styles.time}>{formatTime(this.state.duration)}</Text>
                {/* <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlShrinkPress() }}>
                  <Image
                    style={styles.shrinkControl}
                    source={this.state.isFullScreen ? require('./images/closefull.png') : require('./images/full.png')}
                  />
                </TouchableOpacity> */}
              </View> : null
          }
        </View>
        {/* <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
          <Button title={'开始播放'} onPress={() => {this.playVideo()}}/>
          <Button title={'暂停播放'} onPress={() => {this.pauseVideo()}}/>
          <Button title={'切换视频'} onPress={() => {this.switchVideo("http://124.129.157.208:8810/SD/zhishidian/grade_8_1/wuli_shu/01.mp4", 0)}}/>
        </View> */}
      </View>
    )
  }
  
  /// -------Video组件回调事件-------
  
  _onLoadStart = () => {
    // console.log('视频开始加载');
    // store.dispatch(setLoading(true));

  };
  
  _onBuffering = () => {
    // console.log('视频缓冲中...')
    // store.dispatch(setLoading(true));
  };
  
  _onLoaded = (data) => {
    // console.log('视频加载完成');
    // store.dispatch(setLoading(false));
    this.setState({
      duration: data.duration,
    });
  };
  
  _onProgressChanged = (data) => {
    // console.log('视频进度更新');
    // store.dispatch(setLoading(true));
    // store.dispatch(setLoading(false));
    if (this.props.video.isPlay) {
      this.setState({
        currentTime: data.currentTime,
      })
    }
  };
  
  _onPlayEnd = () => {
    // console.log('视频播放结束');
    this.setState({
      currentTime: 0,
      isPlaying: false,
      playFromBeginning: true
    });
    this.props.videoControl(false)
  };
  
  _onPlayError = () => {
    // console.log('视频播放失败');
  };
  
  ///-------控件点击事件-------
  
  /// 控制播放器工具栏的显示和隐藏
  hideControl() {
    if (this.state.showVideoControl) {
      this.setState({
        showVideoControl: false,
      })
    } else {
      this.setState(
        {
          showVideoControl: true,
        },
        // 5秒后自动隐藏工具栏
        () => {
          setTimeout(
            () => {
              this.setState({
                showVideoControl: false
              })
            }, 5000
          )
        }
      )
    }
  }
  
  /// 点击了播放器正中间的播放按钮
  onPressPlayButton() {
    // let isPlay = !this.state.isPlaying;
    let isPlay = !this.props.video.isPlay
    this.setState({
      isPlaying: isPlay,
      showVideoCover: false
    });

    this.props.videoControl(isPlay)

    if (this.state.playFromBeginning) {
      this.videoPlayer.seek(0);
      this.setState({
        playFromBeginning: false,
      })
    }
  }
  
  /// 点击了工具栏上的播放按钮
  onControlPlayPress() {
    this.onPressPlayButton();
  }
  
  /// 点击了工具栏上的全屏按钮
  onControlShrinkPress() {
    // const isFullScreen = !this.state.isFullScreen
    // this.setState({
    //   isFullScreen
    // })
    // if (this.state.isFullScreen) {
    //   Orientation.lockToPortrait();
    // } else {
    //   Orientation.lockToLandscape();
    // }
  }
  
  /// 进度条值改变
  onSliderValueChanged(currentTime) {
    this.videoPlayer.seek(currentTime);
    if (this.props.video.isPlay) {
      this.setState({
        currentTime: currentTime
      })
    } else {
      this.props.videoControl(true)
      this.setState({
        currentTime: currentTime,
        isPlaying: true,
        showVideoCover: false
      })
    }
  }
  
  /// 屏幕旋转时宽高会发生变化，可以在onLayout的方法中做处理，比监听屏幕旋转更加及时获取宽高变化
  _onLayout = (event) => {
    //获取根View的宽高
    let {width, height} = event.nativeEvent.layout;
    // console.log('通过onLayout得到的宽度：' + width);
    // console.log('通过onLayout得到的高度：' + height);
    
    // 一般设备横屏下都是宽大于高，这里可以用这个来判断横竖屏
    let isLandscape = (width > height);
    if (isLandscape){
      this.setState({
        videoWidth: width,
        videoHeight: height,
        isFullScreen: true,
      })
    } else {
      this.setState({
        videoWidth: width,
        videoHeight: width * 9/16,
        isFullScreen: false,
      })
    }
    // Orientation.unlockAllOrientations();
  };
  
  /// -------外部调用事件方法-------
  
  ///播放视频，提供给外部调用
  playVideo() {
    this.setState({
      isPlaying: true,
      showVideoCover: false
    })
  }
  
  /// 暂停播放，提供给外部调用
  pauseVideo() {
    this.setState({
      isPlaying: false,
    })
  }
  
  /// 切换视频并可以指定视频开始播放的时间，提供给外部调用
  switchVideo(videoURL, seekTime) {
    this.setState({
      videoUrl: videoURL,
      currentTime: seekTime,
      isPlaying: true,
      showVideoCover: false
    });
    this.videoPlayer.seek(seekTime);
  }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps, actions)(VideoPlayScreen)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
    width: "100%"
  },
  full: {
    // position: "relative",
    // top: 0,
    // left: -pxToDp(135),
    // bottom: 0,
    // right: 0,
    width: pxToDp(750),
    // height: pxToDp(600),
  },
  playButton: {
    width: pxToDp(100),
    height: pxToDp(100),
  },
  playControl: {
    width: pxToDp(24),
    height:  pxToDp(24),
    marginLeft:  pxToDp(15),
  },
  shrinkControl: {
    width: pxToDp(15),
    height: pxToDp(15),
    marginRight: pxToDp(15),
    borderColor: "#fff",
  },
  time: {
    fontSize: pxToDp(23),
    color: 'white',
    marginLeft: pxToDp(10),
    marginRight: pxToDp(10)
  },
  control: {
    flexDirection: 'row',
    height: 44,
    alignItems:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    bottom: 0,
    left: 0
  },
});