import React from 'react';
import { Text } from 'react-native';
import Header from '../../components/work/starHome/header';

export default class StarHome extends React.Component<any> {
  static navigationOptions = {
    headerTitle: <Header/>, 
    headerBackTitle: null
  }

  render() {
    return(
      <Text>
        {/* 123 */}
      </Text>
    )
  }
}