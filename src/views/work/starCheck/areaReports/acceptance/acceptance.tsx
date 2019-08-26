import React from "react";

import { View, Text, ScrollView, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import pxToDp from "../../../../../utils/fixcss";
import { StarCheckBox } from '../../../../../components/workCmp/areaReportCmp/checkRecord/starCheckCard';

import { HeaderCmp } from '../../../../../components/headerCmp/headerCmp';
import { SearchCmp } from "../../../../../components/workCmp/starCheck/searchCmp";
import { GencyCard } from "../../../../../components/workCmp/areaReportCmp/checkRecord/gencyCard";
import { ReportType, SearchTypes } from "../../../../../utils/enum";
import { IndexModel } from "../../../../../request";
const indexModel = new IndexModel()

interface IState {
  list: Array<any>
  showFoot: number
  pageNo: number
}
export default class Acceptance extends React.Component<any>{
  static navigationOptions = {
    header: null,
  }
  state: IState = {
    list: [],
    showFoot: 0,
    pageNo: 1
  }
  /**
   * 获取验收评分列表
   * @param page 
   * @param status 
   */
  getApproveCheckList(page: number,limit?:number,key?:string) {
    let list = this.state.list
    indexModel.getApproveCheckLogList(page,limit,key).then(res => {
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
   * 触底刷新
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
    this.getApproveCheckList(page)
  }
  eggHandleSearch = (type:SearchTypes) => {
    this.props.navigation.push('SearchPage',{
      type
    })
  }
  componentDidMount() {
    /**
     * 判断是否搜索页面跳转过来的
     */
    if(this.props.navigation.state.params != undefined) {
      this.getApproveCheckList(1,10,this.props.navigation.state.params.key)
    }else {
      this.getApproveCheckList(1)
    }
  }
  /**
* 加载时加载动画
*/
  _renderFooter() {
    if (this.state.showFoot === 1) {
      return (
        <View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start', }}>
          <Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5, }}>
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
    return (
      <View style={styles.container}>
        <HeaderCmp title={'验收评分'}
          eggHandleBack={() => { this.props.navigation.goBack() }}
          Children={<SearchCmp type={SearchTypes.acceptance}
            eggHandleSearch={this.eggHandleSearch} />} />
        <FlatList style={styles.scorllList}
          data={this.state.list}
          ItemSeparatorComponent={this._separator}
          ListFooterComponent={this._renderFooter()}
          onEndReached={() => { this._onEndReached() }}
          onEndReachedThreshold={0.2}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <GencyCard
              type={ReportType.acceptance}
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
    width: "100%",
    height: "100%"
  },
  banner: {
    position: "absolute",
    left: pxToDp(57),
    top: pxToDp(200),
    width: pxToDp(650),
    lineHeight: pxToDp(60),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  shop: {
    color: "rgba(255,255,255,0.5)",
    lineHeight: pxToDp(42),
    fontWeight: "500",
    fontSize: pxToDp(26)
  },
  scorllList: {
    backgroundColor: "#f8f8f8"
  },

  footer: {
    flexDirection: 'row',
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
})
