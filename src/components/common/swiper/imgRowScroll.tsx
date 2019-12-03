//带图片横向滚动的列表
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React from "react";
import pxToDp from "../../../utils/fixcss";

interface Iprops {
  data: Array<any>
  handClick: (index: number) => void
}


export default class ImgRowScroll extends React.Component<Iprops> {
  state = {
  }
  /**
   * 点击切换样式/或者当前index
   */
  handleClick = (activeIndex: number) => {
    this.props.handClick(activeIndex)
  }

  render() {
    return (
      <View >
        <FlatList
          style={styles.container}
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
              <Image style={styles.img} source={{uri: item.image}} />
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: pxToDp(50),
    paddingRight: pxToDp(50)
  },
  wrapper: {
    marginRight: pxToDp(57),
    display: "flex",
    alignItems: "center",
  },
  img: {
    width: pxToDp(120),
    height: pxToDp(120),
    borderRadius: pxToDp(50),
    marginBottom: pxToDp(15)
  },
  text: {
    fontSize: pxToDp(28),
    color: "#666"
  }
})
