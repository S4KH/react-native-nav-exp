'use strict';

/**
* All reducers combined
*
* @author skh
**/

import { combineReducers } from 'redux';

// Used for differentiating between sub-reducers
const scopeNavigationReducer = (reducer, scopeName) => {
  return (state, action) => {
    if (action.scope && action.scope !== scopeName) {
      return state;
    } else {
      return reducer(state, action);
    }
  };
};

module.exports = combineReducers({
  globalNavigation: scopeNavigationReducer(require('./globalNavigation'), 'global'),
  tabs: require('./tabs'),
  post: require('./post')
});
