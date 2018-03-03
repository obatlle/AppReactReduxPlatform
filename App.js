
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

import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient,
} from 'react-apollo';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import { addGraphQLSubscriptions } from 'add-graphql-subscriptions';
import { getUser, loadUserAsync } from 'react-native-authentication-helpers';

import Graphcool from './app/constants/Graphcool';




const networkInterface = createNetworkInterface({
  uri: Graphcool.simpleEndpoint,
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      const user = getUser();
      req.options.headers.authorization = user ? `Bearer ${user.token}` : null;
      next();
    },
  },
]);

const wsClient = new SubscriptionClient(Graphcool.subscriptionEndpoint, {
  reconnect: true,
  connectionParams: {
    authToken: getUser() && getUser().token,
  },
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
});


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
        <ApolloProvider client={client}>
          <AppContainer />
        </ApolloProvider>
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
