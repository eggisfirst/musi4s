import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation"; 
import LoginScreen from './views/login'

// const AppNavigator = createBottomTabNavigator(
//   {
//     Work: WorkScreen,
//     Report: ReportScreen,
//     Announcement: AnnouncementScreen,
//     Personal: PersonalScreen,
//   },
//   {
//     initialRouteName: 'Work',
//     tabBarOptions: {
//       activeTintColor: '#007AFF',
//       showIcon: true,
//     },
//     // tabBarVisible: false,
//   },
// )

const AppContainer = createAppContainer(
  createStackNavigator({
    Login: LoginScreen,
    // Work: AppNavigator,
  })
)

export default AppContainer;
