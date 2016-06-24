/**
 * Entry point of the app
 * @author skh
 **/
import React, {
   Component
 } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import GNavigation from './components/GNavigation';
const store = configureStore();

function setup(){
  class Root extends Component {
    render() {
      return (
        <Provider store={store}>
          <GNavigation />
        </Provider>
      );
    }
  }
  return Root;
}


module.exports = setup;
