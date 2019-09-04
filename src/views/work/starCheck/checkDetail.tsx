import React from "react";
import { connect } from 'react-redux';

import { View, StyleSheet } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { CheckHeader } from '../../../components/workCmp/starCheck/CheckHeader';
import { changeCheckList } from '../../../store/actions/4s/checkList';
// import { SliderCmp } from '../../../components/workCmp/areaReportCmp/checkDetailsCmp/everyTerm/silder';
import InputAreaCmp from '../../../components/common/inputAreaCmp';
import BigBtn from '../../../components/common/bigBtn';
import ImgUploadCmp from '../../../components/common/imgUploadCmp';
import ScoreSlider from '../../../components/common/scoreSlider';
import { IndexModel } from "../../../request";
const indexModel = new IndexModel()

const actions = {
  ...changeCheckList,
}

// interface IPros {
//   minimumValue?: number
//   maximumValue?: number
// }

interface IState {
  total: number
  deduct: number
  imageList: object[]
  inputAreaVal: string
  score: number
}

class CheckDetailPage extends React.Component<any, IState>{
  state: IState = {
    total: 23,
    deduct: 9,
    imageList: [],
    inputAreaVal: '',
    score: 0,
  }

  static navigationOptions = {
    header: null,
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
    this.setState({ inputAreaVal: text })
  }

  save = (): void => {
    this.sentScore()
    console.log(`输入框的值：${this.state.inputAreaVal}`, `扣分：${this.state.score}`)
  }

  scoreChange = (score: number) => {
    this.setState({ score: score })
  }

  sentScore = () => {
    let data: object = {
      levelId: "1140447743186251778", //星级id，一星检查id
      shopId: "1129280494286794754", //门店id
      qualificationId: "1129280494286794754", //认证id
      categoryList: [ //打分分类列表，必须提交全部
        {
          categoryId: "1140918983948636162", //分类id
          standardList: [ //打分细项列表，必须提交全部
            {
              standardId: "1143774370314014721", //打分细项id
              deduct: 10, //扣分分数
              reason: "不需要不需要理由", //扣分理由
              urls: [ //上传文件url集合
                "https://derucci-app-test.oss-cn-hangzhou.aliyuncs.com/upload/20190709/31aa61edcf990ecf7d38b2b5a4829eb6.pptx",
                "https://derucci-app-test.oss-cn-hangzhou.aliyuncs.com/upload/20190709/31aa61edcf990ecf7d38b2b5a4829eb6.pptx"
              ]
            },
          ]
        }]
    }
    indexModel.submitForm(data).then(res => {
      console.log('数据请求成功：', res)
    })
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

const mapStateToProps = (state: any) => state
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
