'use strict';

/**
* All actions combined
* @author skh
**/

const navActions = require('./navigation')
const postActions = require('./post')

module.exports = {
  ...navActions,
  ...postActions
};
