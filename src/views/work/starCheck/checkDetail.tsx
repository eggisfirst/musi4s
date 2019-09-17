import React from "react";
import { connect } from 'react-redux';

import { View, StyleSheet, Alert } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { HeaderCmp } from "../../../components/headerCmp/headerCmp"
import { changeCheckList } from '../../../store/actions/4s/checkList';
import InputAreaCmp from '../../../components/common/inputAreaCmp';
import BigBtn from '../../../components/common/bigBtn';
import ImgUploadCmp from '../../../components/common/imgUploadCmp';
import ScoreSlider from '../../../components/common/scoreSlider';
import { IndexModel } from "../../../request";
const indexModel = new IndexModel()

// interface IPros {
//   minimumValue?: number
//   maximumValue?: number
// }

interface IState {
  total: number
  deduct: number
  imageList: string[]
  inputAreaVal: string
  score: number
}

interface IData {
  imgDataList: string[]
}

class CheckDetailPage extends React.Component<any, IState>{
  state: IState = {
    total: 23,
    deduct: 9,
    imageList: [],
    inputAreaVal: '',
    score: 0,
  }

  _data: IData = {
    imgDataList: []
  }

  static navigationOptions = {
    header: null
  }

  /**
   * 获取文本域的值
   * @param {*文本域的值} text 
   */
  setInputAreaVal = (text: string): void => {
    this.setState({ inputAreaVal: text })
  }

  /**
   * 获取扣分
   * @param {*扣分值} score 
   */
  scoreChange = (score: number) => {
    this.setState({ score: score })
  }

  /**
   * 获取上传的图片
   * @param {*图片列表} arr
   */
  getImageList = (arr: string[]):void => {
    this._data.imgDataList = arr
    this.setState({})
    console.log('上传的图片：', arr)
  }

  /**
   * 提交检查信息到vuex
   */
  save = (): void => {
    let temp = this.props.checkList
    let params = this.props.navigation.state.params
    let obj = temp[params.fatherIndex].standardList[params.index]
    obj.deduct = this.state.score
    obj.text = this.state.inputAreaVal
    obj.type = true
    obj.urls = this._data.imgDataList

    const { goBack,state } = this.props.navigation;
    state.params.callBack()
    goBack()
    // console.log(`输入框的值：${this.state.inputAreaVal}`, `扣分：${this.state.score}`, temp)
  }

  /**
   * 获取已评分数据
   */
  getGradeDetailInfo() {
    let id = ''
    indexModel.getGradeDetailInfo(id).then(res => {
      if (res.status) {
        console.log('已评分详情：', res)
      }
    })
  }

  componentWillReceiveProps() {
    let temp = this.props.checkList
    let params = this.props.navigation.state.params
    let arr = temp[params.fatherIndex].standardList[params.index].urls
    let tempArr = arr ? arr : []
    this.setState({imageList: tempArr})
  }

  componentDidMount() {
    // this.getGradeDetailInfo()
    console.log(1)
    let temp = this.props.checkList
    let params = this.props.navigation.state.params
    let arr = temp[params.fatherIndex].standardList[params.index].urls
    let tempArr = arr ? arr : []
    this.setState({imageList: tempArr})
    const {index, fatherIndex }= this.props.navigation.state.params
    this.setState({
      inputAreaVal: this.props.checkList[fatherIndex].standardList[index].text,
      score: this.props.checkList[fatherIndex].standardList[index].deduct | 0
    })
  }

  render() {
    const { navigation } = this.props
    return (
      <View>
        <HeaderCmp
          title={this.props.navigation.state.params.name}
          // title={'this.props.navigation.state.params.name'}
          eggHandleBack={() => { navigation.goBack() }}
        />
        <View style={styles.contentBox}>
          {/* 文本域 */}
          <InputAreaCmp
            setInputAreaVal={this.setInputAreaVal}
            inputAreaVal={this.state.inputAreaVal}
            placeholder={'请填写扣分原因。'}
          ></InputAreaCmp>

          {/* 图片上传组件 */}
          <ImgUploadCmp
            getImageList={(obj) => this.getImageList(obj)}
            imageList={ this.state.imageList }
          ></ImgUploadCmp>
        </View>

        {/* 滑动选择分数组件 */}
        <ScoreSlider
          step={1}
          minimumValue={0}
          maximumValue={10}
          value={this.state.score}
          scoreChange={this.scoreChange}
        ></ScoreSlider>

        <View style={styles.bitBtnBox}>
          <BigBtn
            onClick={this.save}
            text={'保存'}
          ></BigBtn>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state: any) => ({
  checkList: state.checkList.checkList
})
const mapDispatchToProps = (dispatch: any) => ({
  changeCheckList: (arr: object[]) => dispatch(changeCheckList(arr))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckDetailPage)

const styles: any = StyleSheet.create({
  contentBox: {
    display: 'flex',
    alignItems: 'center',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: pxToDp(10),
  },
  gradBox: {
    width: pxToDp(640),
    marginLeft: pxToDp(50),
    marginTop: pxToDp(12),
  },
  gradTitle: {
    lineHeight: pxToDp(100),
  },
  bitBtnBox: {
    width: pxToDp(640),
    marginLeft: pxToDp(55),
  }
})
