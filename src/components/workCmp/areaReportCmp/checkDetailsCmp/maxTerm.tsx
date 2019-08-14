import React from "react";

import { View, Text, StyleSheet } from "react-native";
import pxToDp from "../../../../utils/fixcss";

export const MaxtermCmp: React.FC = () => {
  return(
    <View style={styles.container}>
      <Text>
        123
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: pxToDp(14),
    paddingRight: pxToDp(14)
  }
})
