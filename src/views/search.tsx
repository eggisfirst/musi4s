import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import pxToDp from "../utils/fixcss";
import { TextInput, FlatList } from "react-native-gesture-handler";
import { BtnTitle, SearchTypes } from "../utils/enum";
import { IndexModel } from "../request";
const indexModel = new IndexModel()
interface IProps {

}

interface IState {
  pageNo: number;
  showFoot: number;
  value: string
  alertBox: BtnTitle
  index: number
  list: Array<any>
}

export default class Search extends React.Component<any, IState> {
  static navigationOptions = {
    header: null,
  }
  state: IState = {
    value: '',
    alertBox: BtnTitle.null,
    index: -1,
    list: [],
    showFoot: 0,
    pageNo: 1
  }
  /**
  * 检查数据
  * @param page 
  */
  getCheckList(page: number, limit: number, key: string) {
    let list = this.state.list
    indexModel.getCheckList(page, limit, key).then(res => {
      if (res.status) {
        /**是否第一次加载 */
        if (res.data.list.length < 20) {
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
   * 验收评分
   * @param page 
   * @param key 
   */
  getApproveCheckLogList(page: number, limit: number, key: string) {
    let list = this.state.list
    indexModel.getApproveCheckLogList(page, limit, key).then(res => {
      if (res.status) {
        /**是否第一次加载 */
        if (res.data.list.length < 20) {
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
          /**
          * 防止连续加载两次
          */
          this.preventLoadMoreTime()
          this.setState({
            list: [...list, ...res.data.list],
          })

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
    }, 500);
  }
  /**
   * 总的获取数据
   */
  getData = (page: number, limit: number, key: string) => {
    if (this.getType() === SearchTypes.acceptance) {
      this.getApproveCheckLogList(page, limit, key)
    }
    else if (this.getType() === SearchTypes.check) {
      this.getCheckList(page, limit, key)
    }
  }
  /**
   * 获取是哪个页面跳转到搜索页面
   */
  getType = () => {
    return this.props.navigation.state.params.type
  }
  //更改输入框的值
  handleChange = (value: string) => {
    this.setState({
      value
    })
  }
  //搜索请求数据
  handleSubmit = () => {
    const value = this.state.value.replace(/ /g, '')
    this.setState({
      list: [],
      pageNo: 1
    })
    setTimeout(() => {
      this.getData(1, 20, value)
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
    this.getData(page, 20, this.state.value)
  }
  /**
   * 跳转到相应的页面
   */
  handleLinkTo = (index: number) => {
    if (this.getType() === SearchTypes.acceptance) {
      this.props.navigation.push('AcceptancePage', {
        key: this.state.list[index].distributor
      })
    }
    else if (this.getType() === SearchTypes.check) {
      this.props.navigation.push('GencyShopPage', {
        key: this.state.list[index].distributor
      })
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
    const { navigation } = this.props

    return (
      <View style={styles.home}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => { navigation.goBack() }}>
            <Image style={styles.arrow}
              source={require("../images/work/starCheck/arrow.png")} />
          </TouchableOpacity>
          <View style={styles.inputStyle}>
            <Image style={styles.searchIcon}
              source={require("../images/work/starCheck/search.png")} />
            <TextInput
              style={styles.input}
              maxLength={20}
              value={this.state.value}
              onChangeText={(text) => { this.handleChange(text) }}
              autoFocus={true}
              placeholder="请输入经销商名称"
              returnKeyType="search"
              onSubmitEditing={() => { this.handleSubmit() }}
            />
          </View>
        </View>
        <FlatList style={styles.scorllList}
          data={this.state.list}
          ItemSeparatorComponent={this._separator}
          ListFooterComponent={this._renderFooter()}
          onEndReached={() => { this._onEndReached() }}
          onEndReachedThreshold={0.2}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.list} activeOpacity={0.6} onPress={() => { this.handleLinkTo(index) }}>
              <Text style={styles.listItem}>{item.distributor}</Text>
            </TouchableOpacity>
          )}
        />


      </View>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: "#f8f8f8",
    width: pxToDp(750),
    height: "100%"
  },
  container: {
    // marginTop:pxToDp(55),
    paddingLeft: pxToDp(32),
    paddingRight: pxToDp(22),
    display: "flex",
    flexDirection: "row",
    // justifyContent:"space-between",
    alignItems: "center",
    width: "100%",
    height: pxToDp(176),
    backgroundColor: "#fff",
    paddingTop: pxToDp(90)

  },
  backBtn: {
    paddingRight: pxToDp(40),
  },
  arrow: {
    width: pxToDp(20),
    height: pxToDp(36),
  },
  inputStyle: {
    width: pxToDp(590),
    height: pxToDp(60),
    backgroundColor: "#f7f7f7",
    borderRadius: pxToDp(30),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: pxToDp(30),
    paddingRight: pxToDp(30),
  },
  searchIcon: {
    width: pxToDp(32),
    height: pxToDp(32),
    marginRight: pxToDp(10)
  },
  input: {
    color: "#999",
    fontSize: pxToDp(26),
    padding: 0,
    width: pxToDp(450),
  },
  btnStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%"
  },

  list: {
    borderBottomColor: "rgba(225,225,225,0.6)",
    borderBottomWidth: pxToDp(1),
    marginLeft: pxToDp(20),
    marginRight: pxToDp(20)
  },
  listItem: {
    lineHeight: pxToDp(80),
    paddingLeft: pxToDp(20),
    fontSize: pxToDp(32),
    color: "#363636",

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
