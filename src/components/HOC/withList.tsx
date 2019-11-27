import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { Text, StyleSheet, ActivityIndicator, View } from 'react-native'
import pxToDp from '../../utils/fixcss'

interface IProps {
  list: Array<any>
  handleClick: (data: Object) => void
  setParams: (data: Object) => void
  loadMore: (page: number) => void
  showFoot: number
  pageNo: number
}

/**
 * 高阶组件，包装后有下啦加载更多功能
 * @param Comp 
 */
export default function WithLoadList(Comp: any) {
  return class WithWrapper extends React.Component<IProps> {
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
    render() {
      return (
        <FlatList style={styles.scorllList}
          data={this.props.list}
          ItemSeparatorComponent={this._separator}
          ListFooterComponent={this._renderFooter()}
          onEndReached={() => { this._onEndReached() }}
          onEndReachedThreshold={0.2}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <Comp {...this.props} obj={item} />
          )}
        />
      )
    }
  }
}

const styles = StyleSheet.create({
  scorllList: {
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderColor: "#e1e1e1"
  },

  footer: {
    flexDirection: 'row',
    height: pxToDp(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: pxToDp(40),
  },
})