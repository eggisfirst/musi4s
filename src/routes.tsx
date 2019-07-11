import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation"; 
import React from "react";

import WorkScreen from './views/work/work'
import LoginScreen from './views/login'
import ReportScreen from './views/report/report'
import AnnouncementScreen from './views/announcement/announcement'
import PersonalScreen from './views/personal/personal'
import Home from './components/tabBar'
import StarHome from './views/work/starHome';


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


