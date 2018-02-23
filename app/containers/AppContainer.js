
// Tutorial react native router flux: https://www.youtube.com/watch?v=JKIMbSXlMkY&list=PLgpnWB3j6BnJFGc7g1NyDHnAy2_ORQ_fK#t=197.389613

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions'

import {
  AsyncStorage,
  Alert,
  View,
  Text,
  TouchableHighlight,
  Stylesheet,
  Navigator,
} from 'react-native';

import {Router, Scene,} from 'react-native-router-flux';


//Imports for the navigator screens (Router)
import test1 from '../components/test1';
import test2 from '../components/test2';


class AppContainer extends Component {

  componentWillMount(){

  }

  render () {
    return (
      <Router duration={0}>

        <Scene key="root">

          <Scene
            key="test1"
            component={test1}
            title="test1"
            initial={true}
            hideNavBar={true}
            />

            <Scene
              key="test2"
              component={test2}
              title="test2"
              />

        </Scene>
      </Router>
    );
  }
}



function mapDispatchToProps (dispatch) {
  return bindActionCreators (ActionCreators, dispatch);
}

function mapStateToProps (state) {
  return {
    //demoState: state.demoState,
    //recipeCount: state.recipeCount,
    //highscore: state.highscore
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (AppContainer);
