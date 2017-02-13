// "use strict";
// const APP_ID = 'amzn1.ask.skill.46a0552d-4087-4cef-b615-093cad2ff9ae';

// const Alexa = require("alexa-sdk");
// const _ = require('lodash');
// const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});


// console.log('Starting ten second journal');
exports.handle = function(e, ctx, cb) {
	console.log('Processing event: %j', e);


	// if(dynamodb){
	// 	console.log('we good');
	// } else {
	// 	console.log('nope');
	// }


	// const alexa = Alexa.handler(event, context);
	// alexa.appId = APP_ID;
	// alexa.registerHandlers(handlers);
	// alexa.execute();



	cb(null, {
		hello: 'world'
	});
}


// const handlers = {
// 	'LaunchRequest': function() {
//         console.log('LaunchRequest function');

//         this.emit(':ask', 'Welcome to ten seccond journal. Please tell me your ten second journal entry for today?',
//             'Please tell me your journal entry');
//     }
// }