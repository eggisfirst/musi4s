import { createStackNavigator, createBottomTabNavigator, createAppContainer, HeaderBackButton } from "react-navigation"; 
import React from "react";

import WorkScreen from './views/work/work'
import LoginScreen from './views/login'
import ReportScreen from './views/report/report'
import AnnouncementScreen from './views/announcement/announcement'
import PersonalScreen from './views/personal/personal'
import LogoBanner from './components/tabBar'
import StarHome from './views/work/starHome';
import { Platform, StatusBar, Easing, Animated } from "react-native";


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
      headerTitle: <LogoBanner />,
      headerTruncatedBackTitle: null,
      headerStyle: {
        borderBottomWidth: 0,
        elevation: 0,
      },
    },
    
    // tabBarVisible: false,
  },
)

const AppContainer = createAppContainer(
  createStackNavigator({
    Work: AppNavigator,
    StarHome:StarHome,
    Login: LoginScreen,
  })
)

export default AppContainer;


