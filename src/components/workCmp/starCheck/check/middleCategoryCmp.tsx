import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import pxToDp from "../../../../utils/fixcss";

export default class middleCategory extends React.Component<any> {
  static navigationOptions = {
    header: null,
  }
  toDetail = (index: number) => {
    this.props.navigation.push('CheckDetailPage')
    console.log('dinajia:', this.props.navigation)
  }
  
  render() {
    const { navigation } = this.props
    console.log(this.props)
    const TextList = this.props.list.map((element: any, index: number) => {
      return <View key={`detail${index}`} style={[styles.liBox, {justifyContent: 'space-between',}]}>
              <TouchableOpacity
                onPress={() => this.toDetail(index)}
              >
                <Text style={styles.li}>{element.name}</Text>
              </TouchableOpacity>
              {element.status && <Image
                source={require("../../../../images/work/starCheck/yes_blue.png")}
                style={styles.yesImage}
              ></Image>}
            </View>
    })
    return (
      <View style={this.props.status ? {} : {
        height: pxToDp(130),
        overflow: "hidden",
      }}>
        {/* 检查标题 */}
        <View style = {[styles.liBox, !this.props.status && {justifyContent: 'center'}]}>
          <TouchableOpacity
            onPress={() => this.props.showClick(this.props.index)}
          >
            <Text style={[styles.title, !this.props.status && styles.title_open]}>{this.props.title}</Text>
          </TouchableOpacity>
          <Image
            source={require('../../../../images/work/starCheck/more_blue.png')}
            style={[styles.openImage, this.props.status && {display: 'none'}]}
          ></Image>
        </View>

        {/* 检查条目 */}
        {TextList}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  liBox: {
    borderColor: '#eee',
    borderBottomWidth: pxToDp(1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#767A7F',
    fontSize: pxToDp(24),
    lineHeight: pxToDp(130),
    borderColor: 'red',
    borderBottomWidth: pxToDp(12),
    paddingLeft: pxToDp(32),
    paddingRight: pxToDp(32),
  },
  title_open: {
    textAlign: 'center',
    color: '#007aff',
    paddingRight: pxToDp(10),
  },
  openImage: {
    width: pxToDp(26),
    height: pxToDp(14),
  },
  yesImage: {
    width: pxToDp(31),
    height: pxToDp(22),
    marginRight: pxToDp(32),
  },
  li: {
    color: '#000',
    fontSize: pxToDp(32),
    lineHeight: pxToDp(120),
    paddingLeft: pxToDp(32),
    paddingRight: pxToDp(32),
  }
})
