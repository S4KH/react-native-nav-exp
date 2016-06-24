/**
*
* Action creator for navigation, scope is used for differentiate between sub-reducers
* for each tab and achieves re-use of actions
*
* @author skh
**/

'use strict';

module.exports ={
	back: (scope) => ({
		type:'back',
		scope:scope
	}),

	push:(route, scope) => ({
		type: 'push',
		scope:scope,
		route
	}),

	openPost:() => ({
		type:'open_post',
		scope:'global'
	})
};
