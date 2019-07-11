import React from "react"
import { View, Text } from "react-native"
import TabBarItem from "../../components/tabBarItem"

export default class PersonalScreen extends React.Component { 
  static navigationOptions = {
    tabBarLabel: '我的',  
    tabBarIcon: ({tintColor,focused}) => (
      <TabBarItem
        tintColor={tintColor}  
        focused={focused}  
        normalImage={require('../../images/tabBar/personal.png')}  
        selectedImage={require('../../images/tabBar/personal_select.png')} />
    ),
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Personal Screen</Text>
      </View>
    )
  }
}
