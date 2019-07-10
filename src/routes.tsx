import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation"; 
import WorkScreen from './views/work'
import LoginScreen from './views/login'
import ReportScreen from './views/report'
import AnnouncementScreen from './views/announcement'
import PersonalScreen from './views/personal'
import Home from './components/tabBar'
import React from "react";
import { View } from "react-native";

const AppNavigator = createBottomTabNavigator(
  {
    Work: WorkScreen,
    Report: ReportScreen,
    Announcement: AnnouncementScreen,
    Personal: PersonalScreen,
  },
  {
    initialRouteName: 'Work',
    tabBarOptions: {
      activeTintColor: '#007AFF',
      showIcon: true,
    },
    navigationOptions: {
      headerTitle: <Home />,
      headerRight:<View />,
      headerLeft: <View/>,
      headerTitleStyle: {
        flex: 1,
       textAlign: 'center'
      }
    },
    // tabBarVisible: false,
  },
)

const AppContainer = createAppContainer(
  createStackNavigator({
    Login: LoginScreen,
    Work: AppNavigator,
  })
)

export default AppContainer;


