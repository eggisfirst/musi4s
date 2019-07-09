
import React, {Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const Login = () => {
  return (
    <View>
      <Text
      style={styles.title}
      >登陆页面</Text>
    </View>
  );
};

// type Style = {title: object}
const styles = StyleSheet.create({
  title: {
    color: 'red',
  },
  content: {
    color: 'blue',
  }
})

export default Login;
