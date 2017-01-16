"use strict";
const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).




const Alexa = require("alexa-sdk");



exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};


const handlers = {
    'LaunchRequest': function () {
        this.emit('GetInjuries');
    },
    'GetTeamInjuries': function () {
        this.emit('GetInjuries');
    },
    'GetInjuries': function () {
        const team = this.event.request.intent.slots.team.value

        const randomFact = "The team is " + team;

        // Create speech output
        const speechOutput = "Here's your fact: " + randomFact;
        this.emit(':tellWithCard', speechOutput, "American Space Facts", randomFact)
    }
};