import React from "react"
import { View, Text, Dimensions, StyleSheet, TouchableHighlight, Platform, Alert } from "react-native"
import { WebView } from "react-native-webview";
import { HeaderCmp } from "../../../components/headerCmp/headerCmp";


const { width, height } = Dimensions.get("window");

export default class Result extends React.Component<any> {
  static navigationOptions = {
    header: null,
  }

  state = {
    title: '发放物资'
  }

  webview: any
  //发送信息给h5
  sendPostMessage = () => {
    const message = this.props.navigation.state.params.data
    //异步
    var timer = setTimeout(() => {
      this.webview.postMessage(message)
      clearTimeout(timer)
    }, 100);
  }
  //接收h5的信息
  onMesg = (e: any) => {
    console.log(e.nativeEvent.data)
  }

  componentDidMount() {
    const obj = this.props.navigation.state.params
    if(obj.type === 'result') {
      this.sendPostMessage()
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
        <WebView
          ref={w => this.webview = w}
          javaScriptEnabled={true}
          startInLoadingState={true}
          style={{ width: width, height: height }}
          source={{ uri: "https://mobiletest.derucci.net/web/derucci_app_h5/#/result" }}
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

