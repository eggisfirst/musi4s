import React from 'react';
import AppContainer from './src/routes'
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux'
import store from './src/store'

const App = () => {
  return (
    <Provider store={store}>
       <AppContainer />
    </Provider>
  );
};

export default App;
