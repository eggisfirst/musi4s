//轮播图
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Swiper from 'react-native-swiper';
import pxToDp from '../../../utils/fixcss';

interface IProps {
  location: any
  dotStyle: any
  activeDotStyle: any
  loopData: any
}

export default class SwiperCmp extends React.Component<any, IProps> {
  render() {
    const dotStyle = this.props.dotStyle ? this.props.dotStyle : <View style={{ backgroundColor: 'rgba(0,0,0,.5)', width: pxToDp(10), height: pxToDp(10), borderRadius: 5, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />
    const activeDot = this.props.activeDotStyle ? this.props.activeDotStyle : <View style={{ backgroundColor: '#fff', width: pxToDp(20), height: pxToDp(10), borderRadius: 5, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />
    const location = this.props.location ? this.props.location : { bottom: pxToDp(20), left: 0, right: 0 }
    return (
      <Swiper style={styles.wrapper}
        showsButtons={true}
        key={this.props.loopData.length}
        // autoplay
        paginationStyle={location}
        dot={dotStyle}
        activeDot={activeDot}
        >
        {
          this.props.loopData.map((it:any) => (
              <Image key={it.imgUrl} source={{uri: it.imgUrl}} style={styles.slide1}/>
          )) 
        }
      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: pxToDp(354)
  },
  slide1: {
    height: pxToDp(354)
  },
  text: {
    color: '#fff',
    fontSize: pxToDp(30),
    fontWeight: 'bold'
  },
})
