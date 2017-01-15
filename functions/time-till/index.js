'use strict';


console.log('starting function')
let AlexaSkill = require('./AlexaSkill');



console.log('does it exist: ' + AlexaSkill);

exports.handle = function(e, ctx, cb) {
  console.log('processing event: %j', e)

  cb(null, { hello: 'world' })
}
