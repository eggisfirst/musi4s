import React from "react"; 
import { View, StyleSheet, TouchableOpacity } from "react-native";
import TabBarItem from "../../components/tabBarItem"
import IndexIcon from '../../components/work/indexIcon'
import pxToDp from "../../utils/fixcss";

export default class WorkScreen extends React.Component<any>{ 
  static navigationOptions = {
    tabBarLabel: '工作', 
    headerStyle: {
      backgroundColor: '#f4511e',
    }, 
    tabBarIcon: ({focused}) => (
      <TabBarItem
        focused={focused}  
        normalImage={require('../../images/tabBar/work.png')}  
        selectedImage={require('../../images/tabBar/work_select.png')} />
    ),
  }
  render() {
    const list = [
      {
        imgUrl:require('../../images/work/4s.png'),
        title:"4S星级认证",
        link:"StarHome"
      },
      {
        imgUrl:require('../../images/work/news.png'),
        title:"我的消息",
        link:"StarHome"
      },
      {
        imgUrl:require('../../images/work/daiban.png'),
        title:"我的代办",
        link:"StarHome"
      }
    ]
    return (
      <View style={styles.viewStyle}>
        {
          list && list.map(item => (
            <TouchableOpacity 
                    key={item.title}
                    onPress={() => {this.props.navigation.push(`${item.link}`)}}>
             <IndexIcon imgUrl={item.imgUrl} title={item.title} key={item.title}/>
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:pxToDp(58),
    flexWrap:"wrap",
    width:'100%',
    alignItems:"center",
    paddingLeft:pxToDp(95),
    paddingRight:pxToDp(45)
  }
})
