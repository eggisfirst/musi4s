import React from "react"; 
import { View, Text, Button } from "react-native";
import Header from '../components/header'
import TabBarItem from "../components/tabBarItem"


export default class WorkScreen extends React.Component<any>{ 
  static navigationOptions = {
    tabBarLabel: '工作', 
    headerStyle: {
      backgroundColor: '#f4511e',
    }, 
    tabBarIcon: ({focused}) => (
      <TabBarItem
        focused={focused}  
        normalImage={require('../images/tabBar/work.png')}  
        selectedImage={require('../images/tabBar/work_select.png')} />
    ),
  }
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Work Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.replace('Login')}
        />
        <Header name="mangoguang" />
      </View>
    )
  }
}
