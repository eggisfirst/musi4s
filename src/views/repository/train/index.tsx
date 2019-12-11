import React from "react"
import { View, Text, Dimensions, StyleSheet, TouchableHighlight, Platform, Alert } from "react-native"
import { WebView } from "react-native-webview";
import { HeaderCmp } from "../../../components/headerCmp/headerCmp";


const { width, height } = Dimensions.get("window");

export default class AnnouncementScreen extends React.Component<any> {
  static navigationOptions = {
    header: null,
  }

  state = {
    title: '培训报名'
  }

  webview: any
  //发送信息给h5
  sendPostMessage = () => {
    const message: string = '我来自rn!'
    console.log('send msg')
    this.webview.postMessage(message)
  }
  //接收h5的信息
  onMesg = (e: any) => {
    if(e.nativeEvent.data === 'scan') {
      console.log('开始扫码')
      // this.props.navigation.goBack();
      this.props.navigation.push('Scan')
    }

  }

  render() {
    const runFirst = `(function() {
      window.postMessage = function(data) {
        window.ReactNativeWebView.postMessage(data);
      };
    })()`;
    return (
      <View style={styles.container}>
        <HeaderCmp title={this.state.title}
          eggHandleBack={() => { this.props.navigation.goBack() }}
        />
        {/* <TouchableHighlight style={{ padding: 10, backgroundColor: 'blue', marginTop: 20 }} onPress={() => this.sendPostMessage()}>
          <Text style={{ color: 'white' }}>Send post message from react natives</Text>
        </TouchableHighlight> */}
        <WebView
          ref={w => this.webview = w}
          javaScriptEnabled={true}
          startInLoadingState={true}
          style={{ width: width, height: height }}
          source={{ uri: "http://127.0.0.1:12306/#/train" }}
          onMessage={event => {
            this.onMesg(event)
          }}
          injectedJavaScript={runFirst}
        />
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

