import React from "react";
import { connect } from 'react-redux';

import { View, StyleSheet, Text } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { CheckHeader } from '../../../components/workCmp/starCheck/CheckHeader';
import { changeCheckList } from '../../../store/actions/4s/checkList';
// import { SliderCmp } from '../../../components/workCmp/areaReportCmp/checkDetailsCmp/everyTerm/silder';
import InputAreaCmp from '../../../components/common/inputAreaCmp';
import BigBtn from '../../../components/common/bigBtn';
import ImgUploadCmp from '../../../components/common/imgUploadCmp';
import Slider from '@react-native-community/slider';

const actions = {
  ...changeCheckList,
}

interface IState {
  total: number
  deduct: number
  imageList: object[]
  inputAreaVal: string
}

class CheckDetailPage extends React.Component<any, IState>{
  state: IState = {
    total: 23,
    deduct: 9,
    imageList: [],
    inputAreaVal: ''
  }

  static navigationOptions = {
    header: null
  }
  //跳转到评分列表页面
  handleToCheckList = (index: number): void => {
    console.log('跳转检查小项', index)
  }

  showClick = (index: number): void => {
    this.props.checkList[index].status = !this.props.checkList[index].status
    this.props.changeCheckList(this.props.checkList)
  }

  setInputAreaVal = (text: string): void => {
    this.setState({inputAreaVal: text})
  }

  save = ():void => {
    console.log('点击事件。')
  }

  componentDidMount() {
    console.log('url参数', this.props.navigation.state.params)
  }

  render() {
    const { navigation } = this.props
    return (
      <View>
        <CheckHeader
          title={this.props.navigation.state.params.name}
          eggHandleBack={() => { navigation.goBack() }}
        // eggHandleSearch={() => { navigation.push("SearchPage") }}
        />
        <View style={styles.contentBox}>
          {/* 文本域 */}
          <InputAreaCmp
            setInputAreaVal={this.setInputAreaVal}
          ></InputAreaCmp>


          {/* 图片上传组件 */}
          <ImgUploadCmp></ImgUploadCmp>
        </View>

        <View style={styles.sliderBox}>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
        </View>

        {/* <View style={styles.gradBox}>
          <Text style={styles.gradTitle}>扣分：</Text>
          <SliderCmp cutScore={navigation.state.params.type === 'check' ? 50 : 40}
                maxNum={100} />
        </View> */}

        <BigBtn
          onClick={this.save}
        ></BigBtn>
      </View>
    )
  }
}

const mapStateToProps = (state: any) => state
const mapDispatchToProps = (dispatch: any) => ({
  changeCheckList: (arr: object[]) => dispatch(changeCheckList(arr))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckDetailPage)

const styles: any = StyleSheet.create({
  contentBox: {
    display: 'flex',
    alignItems: 'center',
  },
  gradBox: {
    width: pxToDp(640),
    marginLeft: pxToDp(50),
    marginTop: pxToDp(12),
  },
  gradTitle: {
    lineHeight: pxToDp(100),
  },
  // sliderBox: {
  //   marginLeft: pxToDp(55),
  //   width: pxToDp(640),
  //   height: pxToDp(10),
  // },
  // slider: {
    
  // },
})
