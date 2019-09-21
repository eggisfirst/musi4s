import React from "react";

import { View, Text, Platform, StyleSheet, ScrollView, FlatList, ActivityIndicator } from "react-native";
import { BackGroundHeader } from "../../../../../components/headerCmp/backgroundHeader";
import pxToDp from "../../../../../utils/fixcss";
import { SearchCmp } from "../../../../../components/workCmp/starCheck/searchCmp";
import { GencyCard } from '../../../../../components/workCmp/areaReportCmp/checkRecord/gencyCard';
import { ReportType, SearchTypes } from "../../../../../utils/enum";
import { IndexModel } from "../../../../../request";
const indexModel = new IndexModel()

interface IState {
  list: Array<any>
  pageNo: number;
  showFoot: number;
  searchIn: boolean
}
export default class CheckRecord extends React.Component<any>{
  static navigationOptions = {
    header: null,
  }
  state: IState = {
    showFoot: 0,
    pageNo: 1,
    list: [],
    searchIn: false
  }
  /**
   * 请求数据
   * @param page 
   */
  getCheckList(page: number, limit?: number, key?: string) {
    let list = this.state.list
    indexModel.getCheckList(page, limit, key).then(res => {
      if (res.status) {
        /**是否第一次加载 */
        if (res.data.list.length < 10) {
          if (this.state.pageNo === 1) {
            this.setState({
              showFoot: 1,
              list: res.data.list
            })
          } else {
            this.setState({
              showFoot: 1,
              list: [...list, ...res.data.list]
            })
          }

        } else {
          this.setState({
            list: [...list, ...res.data.list],
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
   * 触底刷新加载数据
   */
  _onEndReached() {
    // 如果是正在加载中或没有更多数据了，则返回
    if (this.state.showFoot !== 0) {
      return;
    }
    let page = this.state.pageNo + 1
    this.setState({
      pageNo: page,
      showFoot: 2
    });
    this.getCheckList(page)
  }
  /**
  * 判断是否搜索页面跳转过来的
  */
  isSearchIn() {
    if (this.props.navigation.state.params != undefined && this.props.navigation.state.params.key) {
      this.setState({ searchIn: true })
      this.getCheckList(1, 10, this.props.navigation.state.params.key)
    } else {
      this.setState({ searchIn: false })
      this.getCheckList(1)
    }
  }
  componentDidMount() {
    this.isSearchIn()
  }
  eggHandleSearch = (type: SearchTypes) => {
    this.props.navigation.push('SearchPage', {
      type
    })
  }

  /**
* 加载时加载动画
*/
  _renderFooter() {
    if (this.state.showFoot === 1) {
      return (
        <View style={{ height: pxToDp(100), alignItems: 'center', justifyContent: 'flex-start', }}>
          <Text style={{ color: '#999999', fontSize: pxToDp(24), marginTop: pxToDp(20), marginBottom: pxToDp(40), }}>
            没有更多数据了
      </Text>
        </View>
      );
    } else if (this.state.showFoot === 2) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
          <Text>加载中...</Text>
        </View>
      );
    } else if (this.state.showFoot === 0) {
      return (
        <View style={styles.footer}>
          <Text></Text>
        </View>
      );
    }
  }
  _separator() {
    return <View style={{ height: 1, }} />;
  }
  render() {
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        <BackGroundHeader
          title={'检查记录'}
          eggHandleBack={() => { navigation.goBack() }}
          bgColor={'#007aff'}
          fontColor={"#fff"}
          setHeight={200}
          imgUrl={require("../../../../../images/backicon.png")} 
          Children={!this.state.searchIn && 
            <SearchCmp eggHandleSearch={this.eggHandleSearch} type={SearchTypes.check} />
          }/>
        {/* <View style={styles.search}>
          {
            !this.state.searchIn &&
            <SearchCmp eggHandleSearch={this.eggHandleSearch} type={SearchTypes.check} />
          }
        </View> */}
        <FlatList style={styles.scorllList}
          data={this.state.list}
          ItemSeparatorComponent={this._separator}
          ListFooterComponent={this._renderFooter()}
          onEndReached={() => { this._onEndReached() }}
          onEndReachedThreshold={0.2}
          keyExtractor={(item) => item.distributor}
          renderItem={({ item }) => (
            <GencyCard
              type={ReportType.check}
              listData={item}
              navigation={this.props.navigation} />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#f8f8f8",
    width: "100%",
    height: "100%"
  },
  search: {
    position: "absolute",
    right: pxToDp(25),
    top: pxToDp(60)
  },

  scorllList: {
    backgroundColor: "#f8f8f8"
  },

  footer: {
    flexDirection: 'row',
    height: pxToDp(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: pxToDp(40),
  },
})