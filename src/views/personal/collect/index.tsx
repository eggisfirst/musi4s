import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { HeaderCmp } from "../../../components/headerCmp/headerCmp";
import pxToDp from "../../../utils/fixcss";
import RowScroll from "../../../components/common/swiper/rowScroll";
import { IndexModel } from "../../../request";
import { _retrieveData } from "../../../utils/utils";
import Item from '../../../components/common/swiper/swiper_list_view'
import CommonBtn from '../../../components/common/commonBtn';

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
    }, {
      name: '文章',
      id: '2'
    }],
    list: [],
    showFoot: 0,
    pageNo: 1,
    showModal: false,
    deleteIndex: 0
  }

  //---------------
  /**
   * 获取收藏的问题
   */
  getCollectFaq(...data: any) {
    _retrieveData('account').then(res => {
      if (res) {
        let list = this.state.list
        indexModel.getCollectFaq(this, res, ...data).then(res => {
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
    console.log('tab', data)
    // this.getFAQList(1, 10, id)
  }

  /**
   * 点击弹框右键/取消
   */
  handleRight = () => {
    this.setState({
      showModal: false
    })
  }
  /**
   * 点击弹框左键/移除
   */
  handleLeft = () => {
     //拿到账号
     _retrieveData('account').then(res => {
      if (res) {
        const data = this.state.list[this.state.deleteIndex]
        const id = data['id']
        indexModel.cancleCollectFaq(this, res, id).then(res => {
          if (res.status) {
            let obj = this.state.list
            obj.splice(this.state.deleteIndex, 1)
            this.setState({
              list: obj,
              showModal: false
            })
          }
        })
      }
    })
  }
  /**
   * 取消收藏
   */
  handleDelete = (index: number) => {
    this.setState({
      showModal: true,
      deleteIndex: index
    })
  }

  componentDidMount() {
    //默认进来的时候是常见问题
    this.getCollectFaq(1, 10)
  }

  /**
  * 获取列表点击返回的内容并跳转到新页面
  * @param data 返回的内容包含id/name等属性
  */
  handleClick = (data: any) => {
    this.props.navigation.push('FaqContent', {
      data: data.item,
    })
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
        <Item data={this.state.list}
          handleDelete={this.handleDelete}
          handleClick={this.handleClick}
          showFoot={this.state.showFoot}
          pageNo={this.state.pageNo}
          setParams={this.setParams}
          loadMore={this.loadMore} />
        {
          this.state.showModal ?
            <CommonBtn title={'是否从收藏夹中移除？'}
              leftText={'移除'}
              rightText={'取消'}
              handleLeft={this.handleLeft}
              handleRight={this.handleRight} /> : null
        }

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