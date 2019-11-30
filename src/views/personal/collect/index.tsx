import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { HeaderCmp } from "../../../components/headerCmp/headerCmp";
import pxToDp from "../../../utils/fixcss";
import RowScroll from "../../../components/common/swiper/rowScroll";
import { IndexModel } from "../../../request";
import { _retrieveData } from "../../../utils/utils";
import Item from '../../../components/common/swiper/swiper_list_view'


const indexModel = new IndexModel()

export default class CollectPage extends React.Component<any> {
  static navigationOptions = {
    header: null,
  }

  state = {
    tabActiveIndex: 0,
    tabList: [{
      name: '常见问题',
      id: '1'
    },{
      name: '文章',
      id: '2'
    }],
    list: [],
    showFoot: 0,
    pageNo: 1,
  }

  //---------------
  /**
   * 获取收藏的问题
   */
  getCollectFaq(...data: any) {
    _retrieveData('account').then(res => {
      if (res) {
        let list = this.state.list
        indexModel.getCollectFaq(this, res,...data).then(res => {
          if (res.data) {
            /**是否第一次加载 */
            if (res.data.length < 10) {
              if (this.state.pageNo === 1) {
                this.setState({
                  showFoot: 1,
                  list: res.data
                })
              } else {
                this.setState({
                  showFoot: 1,
                  list: [...list, ...res.data]
                })
              }
    
            } else {
              this.setState({
                list: [...list, ...res.data],
              })
              /**
               * 防止连续加载两次
               */
              this.preventLoadMoreTime()
            }
          }
        })

      }
    })

  }
  /**
  * 切换tab时候获取list
  */
  getActiveIndex = (data: any) => {
    const id = data.id
    console.log('tab',data)
    // this.getFAQList(1, 10, id)
  }

  /**
   * 取消收藏
   */
  handleDelete = (index: number) => {
    _retrieveData('account').then(res => {
      
    })
    let obj = this.state.list
    obj.splice(index,1)
    this.setState({
      list: obj
    })
  }

  componentDidMount() {
    //默认进来的时候是常见问题
    this.getCollectFaq(1,10)
  }

   /**
   * 获取列表点击返回的内容并跳转到新页面
   * @param data 返回的内容包含id/name等属性
   */
  handleClick = (data: Object) => {
    console.log('click',data)
    // this.props.navigation.push('FaqContent', {
    //   data,
    // })
  }
  /**
 * 防止加载两次
 */
preventLoadMoreTime() {
  setTimeout(() => {
    this.setState({
      showFoot: 0,
    })
  }, 200);
}

/**
 * 设置showFoot和page两个参数
 */
setParams = (data: any) => {
  this.setState({
    showFoot: data.showFoot,
    pageNo: data.pageNo
  })
}
/**
 * 加载更多
 */
loadMore = (page: number) => {
  this.getCollectFaq(page, 10)
}
  render() {
    return (
      <View style={styles.wrapper}>
        <HeaderCmp title={'我的收藏'}
          eggHandleBack={() => { this.props.navigation.goBack() }}
        />
        <View style={styles.content}>
          <View>
            <RowScroll activeIndex={this.state.tabActiveIndex} data={this.state.tabList} getActiveIndex={this.getActiveIndex} />
          </View>

        </View>
        <Item  data={this.state.list} 
                handleDelete={this.handleDelete}
                handleClick={this.handleClick}
                showFoot={this.state.showFoot}
                pageNo={this.state.pageNo}
                setParams={this.setParams}
                loadMore={this.loadMore}/>

      </View >
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    backgroundColor: "#f8f8f8",
    height: '100%',
    width: '100%'
  },
  content: {
    width: '100%',
    backgroundColor: '#fff',
    paddingLeft: pxToDp(32),
  },
})