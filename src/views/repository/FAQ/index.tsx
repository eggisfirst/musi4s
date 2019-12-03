import React from "react";
import { View, StyleSheet, Text } from "react-native";
import pxToDp from "../../../utils/fixcss";
import { HeaderCmp } from "../../../components/headerCmp/headerCmp";
import { SearchCmp } from '../../../components/workCmp/starCheck/searchCmp';
import { SearchTypes } from "../../../utils/enum";
import RowScroll from "../../../components/common/swiper/rowScroll";
import { ListContent } from '../../../components/respository/FAQ/listContent';
import WithLoadList from '../../../components/HOC/withList';
import { IndexModel } from "../../../request";
const indexModel = new IndexModel()

const WithLoadListA = WithLoadList(ListContent)

interface IState {
  tabList: Array<any>
  list: Array<any>
  showFoot: number //加载更多状态显示
  pageNo: number  //页数
  id: string    
}

export default class FAQ extends React.Component<any, IState>{
  static navigationOptions = {
    header: null,
  }

  state: IState = {
    tabList: [],
    list: [],
    showFoot: 0,
    pageNo: 1,
    id: ''
  }


  /**
   * 获取常见问题分类
   */
  getFAQTab() {
    indexModel.getFAQTab(this).then(res => {
      if (res.data) {
        const id = res.data[0].id
        this.setState({
          tabList: res.data,
          id
        })
        this.getFAQList(1, 10, id)
      }
    })
  }
  /**
   * 获取常见问题标题列表
   * @param data 参数包括page,limit,id,key （id,key可不填）
   */
  getFAQList(...data: any) {
    let list = this.state.list
    indexModel.getFAQList(this, ...data).then(res => {
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
    this.getFAQList(page, 10, this.state.id)
  }

  /**
   * 点击跳转搜索框页面
   */
  eggHandleSearch = (type: SearchTypes) => {
    this.props.navigation.push('SearchPage', {
      type,
    })
  }
  /**
  * 切换tab时候获取list
  */
  getActiveIndex = (data: any) => {
    const id = data.id
    this.getFAQList(1, 10, id)
  }

  /**
   * 获取列表点击返回的内容并跳转到新页面
   * @param data 返回的内容包含id/name等属性
   */
  handleClick = (data: Object) => {
    this.props.navigation.push('FaqContent', {
      data,
    })
  }

  componentDidMount() {
    this.getFAQTab()
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <HeaderCmp title={'常见问题'}
          eggHandleBack={() => { this.props.navigation.goBack() }}
        />
        <View style={styles.content}>
          <SearchCmp eggHandleSearch={this.eggHandleSearch}
            type={SearchTypes.faq}
            searchText={'常见问题'}
            searchWidth={686}
          />
          <View style={styles.scrollList}>
            <RowScroll data={this.state.tabList} getActiveIndex={this.getActiveIndex} />
          </View>

        </View>
        <WithLoadListA
          list={this.state.list}
          handleClick={this.handleClick}
          showFoot={this.state.showFoot}
          pageNo={this.state.pageNo}
          setParams={this.setParams}
          loadMore={this.loadMore} />
      </View>
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
  scrollList: {
    marginTop: pxToDp(24),
  }
})
