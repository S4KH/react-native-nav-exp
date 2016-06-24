'use strict';

/**
*
* Reducer for post screen
* @author skh
**/

const initialState = {
  numOfText:140,
  images:[]
};

function post(state = initialState, action) {
	switch (action.type) {
	case 'update_text_num':
		return {
      ...state,
      numOfText: 140-action.text.length
    }
  case 'store_image':
  return {
    ...state,
    images:action.images
  }

	default:
		return state
	}
}

module.exports = post;
