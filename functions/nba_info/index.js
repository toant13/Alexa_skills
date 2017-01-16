"use strict";
const APP_ID = undefined; // TODO replace with your app ID (OPTIONAL).


const Alexa = require("alexa-sdk");
const https = require('https');


const URL_BASE = 'https://www.fantasybasketballnerd.com/service/';


exports.handler = function(event, context, callback) {
    console.log('Received event:', JSON.stringify(event));

    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);



    alexa.execute();
};


const handlers = {
    'LaunchRequest': function() {
        this.emit('GetInjuries');
    },
    'GetTeamInjuries': function() {
        this.emit('GetInjuries');
    },
    'GetInjuries': function() {
        const team = this.event.request.intent.slots.team.value

        console.log('The given team is: ' + team);

        const randomFact = "The team is " + team;

        // Create speech output
        const speechOutput = "Here's your fact: " + randomFact;
        this.emit(':tellWithCard', speechOutput, "American Space Facts", randomFact)
    }
};

function getSchedule(teamName, date) {

}

function getTeamInjuries(teamName) {

}

function getTeamDepthChart(teamName) {

}