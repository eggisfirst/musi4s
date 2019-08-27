import { createStackNavigator, createBottomTabNavigator, createAppContainer, HeaderBackButton } from "react-navigation"; 

import WorkScreen from './views/work/work'
import LoginScreen from './views/login'
import ReportScreen from './views/report/report'
import AnnouncementScreen from './views/announcement/announcement'
import PersonalScreen from './views/personal/personal'
import StarHome from './views/work/starHome';
import { Easing, Animated } from "react-native";
import pxToDp from "./utils/fixcss";
import HandlePage from './views/work/starCheck/handlePage';
import SearchPage from './views/search';
import ReceptionPage from './views/work/reception/reception';
import GradePage from './views/work/gradePage/grade';
import GencyShopPage from './views/work/starCheck/areaReports/checkRecord/gencyShop';
import CheckRecordPage from './views/work/starCheck/areaReports/checkRecord/checkRecord';
import CheckDetailsPage from './views/work/starCheck/areaReports/checkRecord/checkDetails';
import AcceptancePage from './views/work/starCheck/areaReports/acceptance/acceptance';
import AcceptanceDetailsPage from './views/work/starCheck/areaReports/acceptance/acceptanceDetails';
import DetailsPage from './views/work/starCheck/areaReports/checkRecord/detailsPage';



const AppNavigator = createBottomTabNavigator({
    Work: WorkScreen,
    Report: ReportScreen,
    Announcement: AnnouncementScreen,
    Personal: PersonalScreen,
  },{
    initialRouteName: 'Work',
    tabBarOptions: {
      
      activeTintColor: '#007AFF',
      showIcon: true,
      style: {
        paddingBottom: 5,
      },
      labelStyle: {
        fontSize: pxToDp(18),
      },
      indicatorStyle: { height: 0 },
    },
  },
)


export default function configAppNavigator(isLoggedIn:boolean) {
  return createAppContainer(createStackNavigator({
    Login: {
      screen: LoginScreen,
    },
    DetailsPage,
  
    CheckDetailsPage,
  
    StarHome,
    AcceptanceDetailsPage,
    AcceptancePage,
    CheckRecordPage,
    Work: {
      screen: AppNavigator,
      //主导航页面不显示头部
      navigationOptions: {
        header: null,

      }
    },
    GencyShopPage,
    HandlePage,
    GradePage,
    ReceptionPage,
    
    SearchPage,
  },{
    //初始进来的页面
    initialRouteName: isLoggedIn ? 'Work' : 'Login',
    mode: 'modal',
    // 指定标头的呈现方式
    headerMode: "screen",
    //显示返回图标后的文字
    headerBackTitleVisible: false,
    cardOverlayEnabled: true,
    //标题居中
    headerLayoutPreset: "center",
    defaultNavigationOptions: {
      headerTintColor:"#000",
      
    },
    
      //页面跳转动画
    transitionConfig: () => ({


      transitionSpec: {
          duration: 300,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
          const {layout, position, scene} = sceneProps;
          const {index} = scene;
          const Width = layout.initWidth;
          //沿X轴平移
          const translateX = position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [Width, 0, -(Width - 10)],
          });
          //透明度
          const opacity = position.interpolate({
              inputRange: [index - 1, index],
              outputRange: [0,  1],
          });
          return {opacity, transform: [{translateX}]};
      }
    }),
  }))
}



