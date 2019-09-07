
import React, {Component} from 'react';
import { 
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Slider,
} from "react-native"; 
import pxToDp from '../../utils/fixcss';

interface IProps {
  step: number
  minimumValue: number
  maximumValue: number
  value: number
  scoreChange: () => void
}

export default class ScoreSlider extends Component<any, IProps> {

  render() {
    const keduList = (() => {
      let temp = []
      for (let i=0;i<7;i++) {
        temp.push(<View
          style={[styleSheet.kedu, i === 3 ? styleSheet.longKedu : {}]} 
          key={`keduList${i}`}
        ></View>)
      }
      return temp
    })()
    return(
      <View style={styleSheet.sliderBox}>
        <Text style={styleSheet.scoreTitle}>扣分：</Text>
        <View>
          <View style={styleSheet.sliderGrad}>
          <Text>{0}</Text>
            <ImageBackground style={[styleSheet.bubble]} source={require("../../images/work/areaReport/checkRecord/bubble.png")}>
              <Text style={styleSheet.cutScore}>扣{this.props.value | 0}分</Text>
            </ImageBackground>
            <Text>{this.props.maximumValue}</Text>
          </View>
          <View style={styleSheet.keduBox}>
            {keduList}
          </View>
        </View>
        <Slider
          style={styleSheet.slider}
          minimumTrackTintColor={'#ff6a5d'}
          maximumTrackTintColor={'#f4f4f4'}
          step={this.props.step | 1}
          minimumValue={this.props.minimumValue | 0}
          maximumValue={this.props.maximumValue | 10}
          value={this.props.value}
          onValueChange={(val) => this.props.scoreChange(val)}
        ></Slider>
      </View>
    )
  }
}
const styleSheet = StyleSheet.create({
  sliderBox: {
    marginLeft: pxToDp(105),
    width: pxToDp(540),
    // height: pxToDp(100),
  },
  scoreTitle: {
    marginLeft: pxToDp(-50),
    lineHeight: pxToDp(100),
  },
  sliderGrad: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: pxToDp(30),
    paddingBottom: pxToDp(30),
    fontSize: pxToDp(24),
  },
  bubble: {
    width: pxToDp(98),
    height: pxToDp(61),
    marginLeft: pxToDp(61)
  },
  cutScore: {
    color: "#E4675B",
    fontSize: pxToDp(26),
    textAlign: "center",
    lineHeight: pxToDp(41)
  },
  keduBox: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  kedu: {
    width: pxToDp(6),
    height: pxToDp(16),
    borderRadius: pxToDp(3),
    backgroundColor: '#BDC3CF',
  },
  longKedu: {
    height: pxToDp(48),
  },
})
