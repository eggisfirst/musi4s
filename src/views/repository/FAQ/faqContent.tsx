import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, Alert } from "react-native";
import WebView from 'react-native-webview'
import { IndexModel } from "../../../request";
import { HeaderCmp } from "../../../components/headerCmp/headerCmp";
import pxToDp from "../../../utils/fixcss";
import { CollectCmp } from '../../../components/respository/FAQ/collectCmp';
import { _retrieveData } from "../../../utils/utils";
import { b64DecodeUnicode, waterMark } from "../../../utils";
// import HTML from 'react-native-render-html';

const indexModel = new IndexModel()
interface IState {
  isCollect: boolean
  title: string
  collect: boolean
  detail: string
  id: string
  height: number
  showWebView: boolean

}
export default class FaqContent extends React.Component<any, IState> {
  static navigationOptions = {
    header: null,
  }

  state: IState = {
    isCollect: false,
    title: '',
    collect: false,
    detail: '<div>这是一个测试页面</div>',
    id: '',
    showWebView: false,
    height: 0
  }

  /**
   * 获取常见内容详情
   */
  getFAQContent = (id: string) => {
    _retrieveData('account').then(res => {
      if (res) {
        indexModel.getFAQContent(this, id, '11510025').then((res: { data: any; }) => {
            const data = res.data
            const remark = b64DecodeUnicode(data.remark)
            this.setState({
              title: data.title,
              collect: data.collect,
              detail: remark,
              id: data.id,
              showWebView: true
            })
        })
        .catch((err: string | undefined) => {
          Alert.alert('err',err)
        }) 
      }
    })


  }

  /**
   * 浏览量增加
   */
  collectFaqNum = (id: string) => {
    indexModel.collectFaqNum(this, id).then((res: { status: any; }) => {
      if (res.status) {

      }
    })
  }
  componentDidMount() {
    const id = this.props.navigation.state.params.data.id
    this.collectFaqNum(id)
    this.getFAQContent(id)
  }
  /**
   * 点击收藏的时候统计收藏数
   */
  collectFaqCount = (id: string) => {
    indexModel.collectFaqCount(this, id).then((res: any) => {

    })
  }
  /**
   * 点击收藏问题
   */
  clickCollect = () => {
    const id = this.state.id
    //收藏
    _retrieveData('account').then(res => {
      if (res) {
        indexModel.collectFaq(this, id, res).then((res: { status: any; }) => {
          if (res.status) {
            this.collectFaqCount(id)
            this.setState({
              collect: true
            })
          }
        })
      }
    })
  }



  render() {
    const injectedJs = 'var timer = setInterval(() => {window.ReactNativeWebView.postMessage(document.getElementById("content").clientHeight);clearInterval(timer)}, 100);'

    return (
      <View style={styles.wrapper}>
        <HeaderCmp title={'常见问题'}
          eggHandleBack={() => { this.props.navigation.goBack() }}
          Children={<CollectCmp isCollect={this.state.collect} clickCollect={this.clickCollect} />}
        />
        <ScrollView style={styles.content}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>{this.props.navigation.state.params.data.title}</Text>
          </View>
          {/* <HTML
            html={this.state.detail.replace(/(style=")[^;"]+([^"]*")/ig, "")}
            imagesMaxWidth={Dimensions.get('window').width} 
            /> */}
            {
              this.state.showWebView? 
              <WebView
              style={{
                width: Dimensions.get('window').width,
                height: this.state.height
              }}
              injectedJavaScript={injectedJs}
              automaticallyAdjustContentInsets={true}
              source={{
                html: `<!DOCTYPE html><html> <style type="text/css">
                  .tour_product_explain img{ display: block!important; vertical-align: top!important; width: 100%!important;}
                  .tour_product_explain{ padding: 0 15px 20px 15px;}
                  .tour_product_explain *{text-align: left!important;
                    font-size: 28px!important;
                    color: #666;
                    line-height: 1.3!important;
                    font-family: Arial,"Lucida Grande",Verdana,"Microsoft YaHei",hei!important;
                    float: none!important;
                    padding: 0!important;
                    position: static!important;
                    height: auto!important}
                  </style><body><div class='tour_product_explain' id='content'>${this.state.detail}</div></body></html>`
              }}
              scalesPageToFit={true}
              javaScriptEnabled={true} // 仅限Android平台。iOS平台JavaScript是默认开启的。
              domStorageEnabled={true} // 适用于安卓a
              scrollEnabled={false}
              startInLoadingState={true}
              onMessage={(event) => {
                this.setState({ height: pxToDp(+event.nativeEvent.data) })
              }}
            /> : null
            }
         
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
    backgroundColor: "#f8f8f8"
  },
  content: {
    width: '100%',
    // height: ,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: { height: pxToDp(1), width: 0 },
    shadowOpacity: 0.1,
  },
  titleBox: {
    marginLeft: pxToDp(33),
    borderBottomWidth: 1,
    borderColor: "#c1c1c1"
  },
  title: {
    lineHeight: pxToDp(40),
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(20),
    width: '100%',
    color: "#363636",
    fontSize: pxToDp(36)
  },
  text: {
    paddingLeft: pxToDp(32),
    paddingRight: pxToDp(32),
    fontSize: pxToDp(28),
    color: "#666",
    lineHeight: pxToDp(40),
    paddingTop: pxToDp(30),
    paddingBottom: pxToDp(40)
  }
})
