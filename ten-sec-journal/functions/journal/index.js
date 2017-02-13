"use strict";
const APP_ID = 'amzn1.ask.skill.46a0552d-4087-4cef-b615-093cad2ff9ae';

const Alexa = require("alexa-sdk");
const AWS = require("aws-sdk");
const _ = require('lodash');



console.log('Starting ten second journal');
exports.handle = function(e, ctx, cb) {
	console.log('Processing event: %j', e);

	const alexa = Alexa.handler(event, context);
	alexa.appId = APP_ID;
	alexa.registerHandlers(handlers);
	alexa.execute();
	const dynamodb = new AWS.DynamoDB({
		apiVersion: '2012-08-10'
	});

	dynamodb.putItem({
		"TableName": 'journal',
		"Item": {
			"userId": {
				"S": '3242343'
			}
		}
	}, function(err, data) {
		if (err) {
			const errorMessage = JSON.stringify(err, null, '');
			console.log('put error ' + errorMessage);

			cb(null, {
				hello: errorMessage
			});
		} else {
			const dataMessage = JSON.stringify(data, null, '');
			console.log('great success: ' + dataMessage);
			cb(null, {
				hello: dataMessage
			});
		}
	});



	



}


const handlers = {
	'LaunchRequest': function() {
		console.log('LaunchRequest function');

		this.emit(':ask', 'Welcome to ten seccond journal. Please tell me your ten second journal entry for today?',
			'Please tell me your journal entry');
	}
}