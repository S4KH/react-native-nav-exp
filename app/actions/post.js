/**
*
* Action creator for post screen
*
* @author skh
**/

'use strict';

module.exports ={
	updateTextNum:(text) => ({
		type:'update_text_num',
    text
	}),
	storeImages:(images)=>({
		type:'store_image',
		images
	})
};
