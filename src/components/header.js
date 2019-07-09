import React, { useState } from "react"; 
import { View, Text, Button } from "react-native";

export default function Welcome(props) {
  const [count, setCount] = useState(0)
  return (
    <View>
      <Text>Hello, {props.name}{count}</Text>
      <Button
      onPress={() => {
        setCount(count + 1)
      }}
      title="click me"
      ></Button>
    </View>
  );
}