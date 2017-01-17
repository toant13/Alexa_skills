"use strict";
const APP_ID = undefined; // TODO replace with your app ID (OPTIONAL).


const Alexa = require("alexa-sdk");
const https = require('https');
const parseString = require('xml2js').parseString;
const _ = require('lodash');



const URL_BASE = 'https://www.fantasybasketballnerd.com/service/';



const TEAM_CODE = {
    "atlanta hawks": "ATL",
    "brooklyn nets": "BKN",
    "boston celtics": "BOS",
    "charlotte hornets": "CHA",
    "chicago bulls": "CHI",
    "cleveland cavaliers": "CLE",
    "dallas mavericks": "DAL",
    "denver nuggets": "DEN",
    "detroit pistons": "DET",
    "golden state warriors": "GSW",
    "houston rockets": "HOU",
    "indiana pacers": "IND",
    "los angeles clippers": "LAC",
    "los angeles lakers": "LAL",
    "memphis grizzlies": "MEM",
    "miami heat": "MIA",
    "milwaukee bucks": "MIL",
    "minnesota timberwolves": "MIN",
    "new orleans pelicans": "NOP",
    "new york knicks": "NYK",
    "oklahoma city thunder": "OKC",
    "orlando magic": "ORL",
    "philadelphia 70 sixers": "PHI",
    "phoenix suns": "PHX",
    "portland Trail blazers": "POR",
    "sacramento kings": "SAC",
    "san antonio spurs": "SAS",
    "toronto raptors": "TOR",
    "utah jazz": "UTA",
    "washington wizards": "WAS"
}



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

        getTeamInjuries(this, team, (speechOutput, inst) => {
            inst.emit(':tellWithCard', speechOutput, "List of injuries for this team", randomFact)
        });
    }
};



// function injuries


function getTeamCode(teamName) {
    const teamCode = TEAM_CODE[teamName.toLowerCase()];
    return teamCode;
}


function getSchedule(teamName, date) {

}

function getTeamInjuries(inst, teamName, eventCallback) {
    var url = URL_BASE + 'injuries';

    console.log('url is: ' + url);

    https.get(url, function(res) {
        console.log('enters https get');


        var body = '';

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', () => {
            const speechOutput = parseInjuriesJson(inst, body, teamName, eventCallback);
        });
    }).on('error', function(e) {
        console.error('Got error: ' + e + ' trying to GET at: ' + url);
    });
}

function parseInjuriesJson(inst, body, teamName, callback) {
    const teamCode = getTeamCode(teamName);
    console.log('parseInjuries team code is: ' + teamCode + ' for team code: ' + teamName);

    if (!teamCode) {
        callback('Sorry I cannot find the team name you have given ' + teamName + ' please try again', inst);
    }

    parseString(body, function(err, result) {
        const teamsArray = result.FantasyBasketballNerd.Team;

        let injuriesForTeam = _.find(teamsArray, (currentObject) => {
            return currentObject.$.code === teamCode;
        });

        console.log('team object: ' + JSON.stringify(injuriesForTeam));

        if(injuriesForTeam){
            const playerTest = injuriesForTeam.Player[0].name;
            const speechOutput = formatInjurieSpeechOutput(injuriesForTeam.Player)

            callback('The ' + teamName + ' have the following injuries, ' + speechOutput, inst);
        } else {
            callback('The ' teamName + ' do not have any injuries.', inst);
        }
    });
}

function formatInjurieSpeechOutput(playersArray){
    let speechOutput = '';
    playersArray.forEach(function(player) {
        speechOutput += player.name[0] + ' with ' + player.injury[0] + ', '
    });

    console.log('speechOutput is: ' + speechOutput);
    return speechOutput;
}


function getTeamDepthChart(teamName) {

}