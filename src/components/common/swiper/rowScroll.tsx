//可以横向滚动的列表
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import pxToDp from "../../../utils/fixcss";

interface Iprops {
  data: Array<any>
  getActiveIndex: (data: Object) => void
  activeIndex?: number
}


export default class RowScroll extends React.Component<Iprops> {
  state = {
    activeIndex: 0 || this.props.activeIndex
  }
  /**
   * 点击切换样式/或者当前index
   */
  handleClick = (activeIndex: number) => {
    if(activeIndex === this.state.activeIndex) return
    this.setState({
      activeIndex
    })
    const data = this.props.data[activeIndex]
    this.props.getActiveIndex(data)
  }
  render() {
    return (
      <View>
        <FlatList
          extraData={this.state}
          data={this.props.data}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.wrapper}
              activeOpacity={0.6}
              onPress={() => { this.handleClick(index) }}>
              <Text style={this.state.activeIndex == index ? styles.active : styles.textType}>
                {item.name}
              </Text>
              {
                this.state.activeIndex == index &&
                <View style={styles.line}></View>
              }
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginRight: pxToDp(40)
  },
  textType: {
    color: '#666',
    fontSize: pxToDp(28),
    lineHeight: pxToDp(80)
  },
  active: {
    color: '#363636',
    fontSize: pxToDp(28),
    fontWeight: '500',
    lineHeight: pxToDp(80),
  },
  line: {
    width: '100%',
    height: pxToDp(6),
    backgroundColor: "#363636",
    borderRadius: pxToDp(3),
  }
})
