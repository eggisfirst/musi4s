import React from "react";
import { connect } from 'react-redux';

import { View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { HeaderCmp } from "../../../components/headerCmp/headerCmp"
import { changeCheckList } from '../../../store/actions/4s/checkList';
import InputAreaCmp from '../../../components/common/inputAreaCmp';
import BigBtn from '../../../components/common/bigBtn';
import ImgUploadCmp from '../../../components/common/imgUploadCmp';
import ScoreSlider from '../../../components/common/scoreSlider';
import { IndexModel } from "../../../request";
import SwiperIndex from "../../../components/workCmp/areaReportCmp/checkDetailsCmp/swiperIndex";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const indexModel = new IndexModel()

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
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
  bigImage: string
  bigImageStatus: boolean
  urls: any
  gradeStatus: boolean
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
    bigImage: '',
    bigImageStatus: false,
    urls: [],
    gradeStatus: true,
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
  getImageList = (arr: string[]): void => {
    this._data.imgDataList = arr
    this.setState({ urls: this.filterImageList(arr) })
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

    const { goBack, state } = this.props.navigation;
    state.params.callBack()
    goBack()
    // console.log(`输入框的值：${this.state.inputAreaVal}`, `扣分：${this.state.score}`, temp)
  }

  /**
   * 获取已评分数据
   */
  getGradeDetailInfo() {
    let id = this.props.navigation.state.params.standardId
    indexModel.getGradeDetailInfo(id).then(res => {
      if (res.status && res.data) {
        let data = res.data
        let imageList = data.attachment.map((item: any) => {
          return item.url
        })
        this.setState({
          score: data.deduct,
          inputAreaVal: data.reason,
          imageList: imageList,
          urls: this.filterImageList(imageList),
        })
      }
    })
  }

  /**
   * 关闭大图框
   */
  closeBigImageBox = () => {
    this.setState({ bigImageStatus: false })
  }

  /**
   * 打开大图框
   */
  openBigImageBox = () => {
    this.setState({ bigImageStatus: true })
  }

  /**
   * 更改大图框的图片链接
   */
  changeBigImage = (str: string) => {
    this.setState({ bigImage: str })
  }

  /**
   * @param {*图片链接数组} imageList
   */
  filterImageList = (imageList: string[]) => {
    let arr: any = []
    imageList.map((it: any) => {
      var reg = /\.mp4$/gm
      if (reg.test(it)) {
        arr.push({ url: it, type: 'mp4' })
      } else {
        arr.push({ url: it, type: 'image' })
      }

    })
    return arr
  }

  wp = (percentage: any) => {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  }

  componentWillReceiveProps() {
    let temp = this.props.checkList
    let params = this.props.navigation.state.params
    let arr = temp[params.fatherIndex].standardList[params.index].urls
    let tempArr = arr ? arr : []
    this.setState({ imageList: tempArr })
    // this.filterImageList(tempArr)
    console.log('props:', temp, this.props.imageList)
  }

  componentDidMount() {
    const { type, index, fatherIndex } = this.props.navigation.state.params
    if (type === '已评分') {this.getGradeDetailInfo()}
    let temp = this.props.checkList
    let arr = temp[fatherIndex].standardList[index].urls
    let tempArr = arr ? arr : []
    this.setState({
      imageList: tempArr,
      urls: this.filterImageList(tempArr),
      inputAreaVal: this.props.checkList[fatherIndex].standardList[index].text,
      score: this.props.checkList[fatherIndex].standardList[index].deduct | 0,
      // 标记是否查看已评分
      gradeStatus: type === '已评分'
    })
    this._data.imgDataList = tempArr
    // this.filterImageList(tempArr)
    console.log('mount:', temp, tempArr, arr)
  }

  render() {
    const { navigation } = this.props
    const itemHorizontalMargin = this.wp(2);
    const slideWidth = this.wp(60);
    const itemWidth = slideWidth + itemHorizontalMargin * 2;
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <HeaderCmp
          title={this.props.navigation.state.params.name}
          // title={'this.props.navigation.state.params.name'}
          eggHandleBack={() => { navigation.goBack() }}
        />
        <ScrollView>
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
              imageList={this.state.imageList}
              openBigImageBox={this.openBigImageBox}
              changeBigImage={this.changeBigImage}
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

          {!this.state.gradeStatus && <View style={styles.bitBtnBox}>
            <BigBtn
              onClick={this.save}
              text={'保存'}
            ></BigBtn>
          </View>}

          {
            this.state.bigImageStatus ? <View style={styles.bigImageBox}>
              <TouchableOpacity
                style={styles.closeBigImageBox}
                onPress={this.closeBigImageBox}
              >
                <Image
                  style={styles.closeBigImage}
                  source={require('../../../images/egg_delete.png')}
                ></Image>
              </TouchableOpacity>
              <View style={{
                width: pxToDp(750),
                height: itemWidth * 1.33,
              }}>
                <SwiperIndex urls={this.state.urls} />
              </View>
            </View> : <View></View>
          }
        </ScrollView>
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
    marginBottom: pxToDp(100)
  },
  bigImageBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
    height: Dimensions.get('screen').height,
    width: pxToDp(750),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    // flexDirection: 'column',
  },
  // bigImageBox: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   zIndex: 999,
  //   height: Dimensions.get('screen').height,
  //   width: pxToDp(750),
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: 'rgba(0,0,0,0.5)', 
  //   flexDirection: 'column',
  // },
  // bigImage: {
  //   width: pxToDp(750),
  //   height: pxToDp(750),
  // },
  closeBigImageBox: {
    position: 'absolute',
    top: pxToDp(100),
    right: pxToDp(40),
    width: pxToDp(60),
    height: pxToDp(60),
    // alignSelf: 'flex-end',
    // marginBottom: pxToDp(100),
    // marginRight: pxToDp(40),
  },
  closeBigImage: {
    width: '100%',
    height: '100%',
  },
})
