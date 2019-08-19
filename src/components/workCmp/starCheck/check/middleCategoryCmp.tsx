import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import pxToDp from "../../../../utils/fixcss";

export default class middleCategory extends React.Component<any> {
  state: any = {
    title: 'SI/VI应用规范及维护',
  }
  render() {
    const TextList = this.props.list.map((element: any, index: number) => {
      return <View key={`detail${index}`} style={styles.liBox}>
              <Text style={styles.li}>{element.name}</Text>
            </View>
    })
    return (
      <View>
        <View style={styles.liBox}>
          <Text style={styles.title}>中类组件</Text>
        </View>
        {TextList}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  liBox: {
    borderColor: '#eee',
    borderBottomWidth: pxToDp(1),
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
  li: {
    color: '#000',
    fontSize: pxToDp(32),
    lineHeight: pxToDp(120),
    paddingLeft: pxToDp(32),
    paddingRight: pxToDp(32),
  }
})
