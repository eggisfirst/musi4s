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
 

  render() {
    const runFirst = `
    document.body.style.backgroundColor = '#ccc';
    setTimeout(function() { window.alert('hi') }, 2000);
    true; // note: this is required, or you'll sometimes get silent failures
  `;
    return (
      <View style={styles.container}>
        <Text>公告</Text>
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

