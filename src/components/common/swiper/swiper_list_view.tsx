import React from 'react';
import {
  View,
  Text,
  ListView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import pxToDp from '../../../utils/fixcss';
import { ListContent } from '../../respository/FAQ/listContent';


interface Iprops {
  data: Array<any>
  handleDelete: (index: number) => void
  handleClick: (data: Object) => void
  setParams: (data: Object) => void
  loadMore: (page: number) => void
  showFoot: number
  pageNo: number
}
export default class Item extends React.Component<Iprops> {
  /**
  * 触底刷新
  */
  _onEndReached() {
    // 如果是正在加载中或没有更多数据了，则返回
    if (this.props.showFoot !== 0) {
      return;
    }
    let page = this.props.pageNo + 1
    let obj = {
      pageNo: page,
      showFoot: 2
    }
    this.props.setParams(obj)
    this.props.loadMore(page)
  }
  /**
 * 加载时加载动画
 */
  _renderFooter() {
    if (this.props.showFoot === 1) {
      return (
        <View style={{ height: pxToDp(100), alignItems: 'center', justifyContent: 'flex-start', }}>
          <Text style={{ color: '#999999', fontSize: pxToDp(24), marginTop: pxToDp(10), marginBottom: pxToDp(40), }}>
            没有更多数据了
      </Text>
        </View>
      );
    } else if (this.props.showFoot === 2) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
          <Text>加载中...</Text>
        </View>
      );
    } else if (this.props.showFoot === 0) {
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

  /**
   * 删除某一项
   */
  deleteRow = (...data: any) => {
    let index = data[0].index
    this.props.handleDelete(index)
  }

  render() {
    return (
      <View style={styles.outView}>
        <SwipeListView
          onEndReached={() => { this._onEndReached() }}
          onEndReachedThreshold={0.2}
          ItemSeparatorComponent={this._separator}
          ListFooterComponent={this._renderFooter()}
          disableRightSwipe={true}
          data={this.props.data}
          keyExtractor={item => item.id}
          renderItem={(data: any) => (
            <TouchableOpacity activeOpacity={1} onPress={() => {this.props.handleClick(data)}}>
              <View style={styles.rowFront}>
                <Text style={styles.text}>{data.item.title}</Text>
                <Image style={styles.img} source={require("../../../images/arrow.png")} />
              </View>
            </TouchableOpacity>
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}>
              <Text></Text>
              <TouchableOpacity style={styles.btn} onPress={_ => this.deleteRow(data, rowMap)}>
                <Text style={styles.deleteTxt}>删除</Text>
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={75}
          rightOpenValue={-75}
        />

      </View>
    )
  }

}

const styles = StyleSheet.create({
  outView: {
    flex: 1,
  },
  btn: {
    backgroundColor: '#ff3338',
    width: pxToDp(120),
    display: 'flex',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: pxToDp(80)
  },
  deleteTxt: {
    fontSize: pxToDp(28),
    color: "#fff"
  },
  rowBack: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  rowFront: {
    backgroundColor: '#f8f8f8',
    height: pxToDp(80),
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#e1e1e1",
    marginLeft: pxToDp(32)
  },
  footer: {
    flexDirection: 'row',
    height: pxToDp(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: pxToDp(40),
  },
  text: {
    lineHeight: pxToDp(40),
    paddingTop: pxToDp(20),
    paddingBottom: pxToDp(20),
    fontSize: pxToDp(28),
    color: "#363636",
    marginRight: pxToDp(30)
  },
  img: {
    width: pxToDp(12),
    height: pxToDp(20),
    marginRight: pxToDp(32)
  }
})