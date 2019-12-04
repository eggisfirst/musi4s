import React from "react"
import { View, Text, Dimensions, StyleSheet, TouchableHighlight, Platform, Alert } from "react-native"
import { TabBarItem } from "../../components/tabBarItem"
import { WebView } from "react-native-webview";


const { width, height } = Dimensions.get("window");

export default class AnnouncementScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: '公告',
    tabBarIcon: ({ focused }: any) => (
      <TabBarItem
        focused={focused}
        normalImage={require('../../images/tabBar/announcement.png')}
        selectedImage={require('../../images/tabBar/announcement_select.png')} />
    ),
  }
  webview: any
  //发送信息给h5
  sendPostMessage = () => {
    const message: string = '我来自rn!'
    this.webview.postMessage(message)
  }
  //接收h5的信息
  onMesg = (e: any) => {
    console.log(1123, e.nativeEvent.data)
  }

  render() {
    const runFirst = `(function() {
      window.postMessage = function(data) {
        window.ReactNativeWebView.postMessage(data);
      };
    })()`;
    return (
      <View style={styles.container}>
        <Text>公告</Text>
        {/* <TouchableHighlight style={{ padding: 10, backgroundColor: 'blue', marginTop: 20 }} onPress={() => this.sendPostMessage()}>
          <Text style={{ color: 'white' }}>Send post message from react natives</Text>
        </TouchableHighlight> */}
        {/* <WebView
          ref={w => this.webview = w}
          javaScriptEnabled={true}
          startInLoadingState={true}
          style={{ width: width, height: height }}
          source={{ uri: "https://mobiletest.derucci.net/web/h5/#/" }}
          onMessage={event => {
            this.onMesg(event)
          }}
          injectedJavaScript={runFirst}
        /> */}
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

