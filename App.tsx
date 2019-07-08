import React, {Fragment} from 'react';
import AppContainer from './src/routes'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App = () => {
  return (
    <AppContainer />
    // <Fragment>
    //   <StatusBar barStyle="dark-content" />
    //   <SafeAreaView>
    //     <ScrollView
    //       contentInsetAdjustmentBehavior="automatic">
    //       <Text>首页</Text>
    //     </ScrollView>
    //   </SafeAreaView>
    // </Fragment>
  );
};

export default App;
