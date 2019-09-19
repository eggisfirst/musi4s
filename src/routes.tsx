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
import CheckListPage from './views/work/starCheck/checkList';
import CheckDetailPage from './views/work/starCheck/checkDetail';
import GencyShopPage from './views/work/starCheck/areaReports/checkRecord/gencyShop';
import CheckRecordPage from './views/work/starCheck/areaReports/checkRecord/checkRecord';
import CheckDetailsPage from './views/work/starCheck/areaReports/checkRecord/checkDetails';
import AcceptancePage from './views/work/starCheck/areaReports/acceptance/acceptance';
import AcceptanceDetailsPage from './views/work/starCheck/areaReports/acceptance/acceptanceDetails';
import DetailsPage from './views/work/starCheck/areaReports/checkRecord/detailsPage';
import RulePage from './views/work/rule';



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
      navigationOptions: {
        headerTransparent: true,
      }
    },
    Work: {
      screen: AppNavigator,
      //主导航页面不显示头部
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
        headerTransparent: true,
      }
    },
    CheckListPage: {
      screen: CheckListPage,
      navigationOptions: {
        headerTransparent: true,
      }
    },
    CheckDetailPage:{
      screen: CheckDetailPage,
      navigationOptions: {
        headerTransparent: true,
      }
    },
    DetailsPage: {
      screen: DetailsPage,
      navigationOptions: {
        headerTransparent: true,
      }
    },
    CheckDetailsPage: {
      screen: CheckDetailsPage,
      navigationOptions: {
        headerTransparent: true,
      }
    },
    StarHome: {
      screen: StarHome,
      navigationOptions: {
        headerTransparent: true,
      }
    },
    AcceptanceDetailsPage: {
      screen: AcceptanceDetailsPage,
      navigationOptions: {
        headerTransparent: true,
      }
    },
    AcceptancePage: {
      screen: AcceptancePage,
      navigationOptions: {
        headerTransparent: true,
      }
    },
    CheckRecordPage: {
      screen: CheckRecordPage,
      navigationOptions: {
        headerTransparent: true,
      }
    },
   
    GencyShopPage: {
      screen: GencyShopPage,
      navigationOptions: {
        headerTransparent: true,
      }
    },
    HandlePage: {
      screen: HandlePage,
      navigationOptions: {
        headerTransparent: true,
      }
    },
    GradePage: {
      screen: GradePage,
      navigationOptions: {
        headerTransparent: true,
      }
    },
    ReceptionPage: {
      screen: ReceptionPage,
      navigationOptions: {
        headerTransparent: true,
      }
    },
    
    SearchPage: {
      screen: SearchPage,
      navigationOptions: {
        headerTransparent: true,
      }
    },
    RulePage: {
      screen: RulePage,
      navigationOptions: {
        headerTransparent: true,
      }
    }
  },{
    //初始进来的页面
    // initialRouteName: 'Login',
    initialRouteName: isLoggedIn ? 'Work' : 'Login',
    // initialRouteName: 'CheckDetailPage',
    // initialRouteName: 'CheckListPage',
    mode: 'card',
    // 指定标头的呈现方式
    headerMode: "screen",    //显示返回图标后的文字
    headerBackTitleVisible: false,
    cardOverlayEnabled: true,
    //标题居中
    headerLayoutPreset: "center",
    defaultNavigationOptions: {
      headerTransparent: true,
      headerTintColor:"#000",
      gesturesEnabled: true,
      gestureResponseDistance: {
        horizontal: 20
      },
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



