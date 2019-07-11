import React from "react"
import { View, Text, Button } from "react-native"
import TabBarItem from "../../components/tabBarItem"

export default class ReportScreen extends React.Component { 
  static navigationOptions = {
    tabBarLabel: '报表',  
    tabBarIcon: ({tintColor,focused}) => (
      <TabBarItem
        tintColor={tintColor}  
        focused={focused}  
        normalImage={require('../../images/tabBar/report.png')}  
        selectedImage={require('../../images/tabBar/report_select.png')} />
    ),
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Report Screen</Text>
      </View>
    )
  }
}
