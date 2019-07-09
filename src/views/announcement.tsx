import React from "react"
import { View, Text } from "react-native"
import TabBarItem from "../components/tabBarItem"

export default class AnnouncementScreen extends React.Component { 
  static navigationOptions = {
    tabBarLabel: '公告',  
    tabBarIcon: ({tintColor,focused}) => (
      <TabBarItem
        tintColor={tintColor}  
        focused={focused}  
        normalImage={require('../images/tabBar/announcement.png')}  
        selectedImage={require('../images/tabBar/announcement_select.png')} />
    ),
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Announcement Screen</Text>
      </View>
    )
  }
}
