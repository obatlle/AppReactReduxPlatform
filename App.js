
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './app/containers/AppContainer'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import {createLogger} from 'redux-logger'
import reducer from './app/reducers'

export default class App extends React.Component {



  render() {

    const loggerMiddleware = createLogger({predicate:(getState, action) => __DEV__});

    function configureStore (initialState) {
      const enhancer = compose(
        applyMiddleware (
          thunkMiddleware,
          loggerMiddleware,
          thunk,
          promise,
        ),
      );
      return createStore(reducer, initialState, enhancer);
    }

    const store = configureStore ({});

    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
