'use strict';

/**
*
* Reducer for top-level navigation
* @author skh
**/

import * as NavigationStateUtils from 'NavigationStateUtils';

const initialState = {
  key: 'global',
	index: 0,
	children: [
		{ key: 'mainTabs', type: 'mainTabs', index:0}
	],
};

function globalNavigation(state = initialState, action) {
	switch (action.type) {
	case 'push':
		if (state.children[state.index].key === (action.scene && action.scene.key)) return state
		return NavigationStateUtils.push(state, action.scene)
	case 'back':
		if (state.index === 0 || state.children.length === 1) return state
		return NavigationStateUtils.pop(state)
  case 'open_post':
    return NavigationStateUtils.push(state, {
      key:`Post-${Date.now()}`,
      type:'post',
      title:'Post'
    })
	case 'reset':
		return {
			...state,
			index: 0,
			children: initialState.children
		}

	default:
		return state
	}
}

module.exports = globalNavigation;
