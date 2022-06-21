import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Authstack from './src/appstack/authstack/auThindex';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Store, persistor} from './src/redux/store';

const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <Authstack />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
