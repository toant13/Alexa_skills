"use strict";
const APP_ID = 'amzn1.ask.skill.a43030db-980d-4f62-8b87-463419f67670'


const Alexa = require("alexa-sdk");
const https = require('https');
const parseString = require('xml2js').parseString;
const _ = require('lodash');



const URL_BASE = 'https://www.fantasybasketballnerd.com/service/';



const TEAM_CODE = {
    "atlanta hawks": "ATL",
    "atlanta": "ATL",
    "hawks": "ATL",
    "brooklyn nets": "BKN",
    "brooklyn": "BKN",
    "nets": "BKN",
    "boston celtics": "BOS",
    "boston": "BOS",
    "celtics": "BOS",
    "charlotte hornets": "CHA",
    "charlotte": "CHA",
    "hornets": "CHA",
    "chicago bulls": "CHI",
    "chicago": "CHI",
    "bulls": "CHI",
    "cleveland cavaliers": "CLE",
    "cleveland": "CLE",
    "cavaliers": "CLE",
    "cavs": "CLE",
    "dallas mavericks": "DAL",
    "mavs": "DAL",
    "dallas": "DAL",
    "mavericks": "DAL",
    "denver nuggets": "DEN",
    "denver": "DEN",
    "nuggets": "DEN",
    "detroit pistons": "DET",
    "detroit": "DET",
    "pistons": "DET",
    "golden state warriors": "GSW",
    "golden state": "GSW",
    "warriors": "GSW",
    "houston rockets": "HOU",
    "houston": "HOU",
    "rockets": "HOU",
    "indiana pacers": "IND",
    "indiana": "IND",
    "pacers": "IND",
    "los angeles clippers": "LAC",
    "clippers": "LAC",
    "los angeles lakers": "LAL",
    "lakers": "LAL",
    "memphis grizzlies": "MEM",
    "memphis": "MEM",
    "grizzlies": "MEM",
    "miami heat": "MIA",
    "miami": "MIA",
    "heat": "MIA",
    "milwaukee bucks": "MIL",
    "milwaukee": "MIL",
    "bucks": "MIL",
    "minnesota timberwolves": "MIN",
    "minnesota": "MIN",
    "timberwolves": "MIN",
    "t-wolves": "MIN",
    "new orleans pelicans": "NOP",
    "new orleans": "NOP",
    "pelicans": "NOP",
    "new york knicks": "NYK",
    "new york": "NYK",
    "knicks": "NYK",
    "oklahoma city thunder": "OKC",
    "oklahoma city": "OKC",
    "thunder": "OKC",
    "orlando magic": "ORL",
    "orlando": "ORL",
    "magic": "ORL",
    "philadelphia 70 sixers": "PHI",
    "philadelphia": "PHI",
    "70 sixers": "PHI",
    "phoenix suns": "PHX",
    "phoenix": "PHX",
    "suns": "PHX",
    "portland trail blazers": "POR",
    "portland": "POR",
    "trail blazers": "POR",
    "blazers": "POR",
    "sacramento kings": "SAC",
    "sacramento": "SAC",
    "kings": "SAC",
    "san antonio spurs": "SAS",
    "san antonio": "SAS",
    "spurs": "SAS",
    "toronto raptors": "TOR",
    "toronto": "TOR",
    "raptors": "TOR",
    "utah jazz": "UTA",
    "utah": "UTA",
    "jazz": "UTA",
    "washington wizards": "WAS",
    "washington": "WAS",
    "wizards": "WAS"
}

const CITY_MAP = {
    "atlanta": "hawks",
    "brooklyn": "nets",
    "boston": "celtics",
    "charlotte": "hornets",
    "chicago": "bulls",
    "cleveland": "cavaliers",
    "dallas": "mavericks",
    "denver": "nuggets",
    "detroit": "pistons",
    "golden state": "warriors",
    "houston": "rockets",
    "indiana": "pacers",
    "memphis": "grizzlies",
    "miami": "heat",
    "milwaukee": "bucks",
    "minnesota": "timberwolves",
    "new orleans": "pelicans",
    "new york": "knicks",
    "oklahoma city": "thunder",
    "orlando": "magic",
    "philadelphia": "70 sixers",
    "phoenix": "suns",
    "portland": "trail blazers",
    "sacramento": "kings",
    "san antonio": "spurs",
    "toronto": "raptors",
    "utah": "jazz",
    "washington ": "wizards"
}



exports.handler = function(event, context, callback) {
    console.log('Received event:', JSON.stringify(event));

    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};


function sonicsEasterEgg(inst, team) {
    const teamNameLowerCase = team.toLowerCase();
    if (teamNameLowerCase === 'seattle supersonics' || teamNameLowerCase === 'seattle sonics' || teamNameLowerCase === 'sonics') {
        console.log('are supersonics');
        inst.emit(':askWithCard', 'ha-ha-ha-ha very funny. I miss the sonics so much.  Gary Payton is my favorite player of all time.  Can you please name another team?', "Sonic Easter Egg", 'sonics easter egg');
    }
}

const handlers = {
    'LaunchRequest': function() {
        console.log('LaunchRequest function');

        this.emit(':ask', 'Welcome to basketball doctor. What team would you like to check injuries for?',
            'Please tell me the team');
    },
    'GetTeamInjuries': function() {
        console.log('Team injuries');

        this.emit('GetInjuries');
    },
    'AMAZON.StopIntent': function() {
        console.log('AMAZON.StopIntent');
        this.emit(':tell', 'Ok, this was a good basketball check-up. See you next time!');
    },
    'AMAZON.YesIntent': function() {
        this.emit(':ask', 'Okay! What team would you like to check injuries for?',
            'Please tell me the team');
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', 'No problem, see you again!');
    },
    'AMAZON.HelpIntent': function() {
        this.emit(':ask', 'You can say a phrase like, who\'s injured on the Phoenix Suns, or tell me who\'s hurt on the mavericks',
            'Please tell me the team');
    },
    'GetInjuries': function() {
        let team = this.event.request.intent.slots.team.value

        if (!team) {
            this.emit(':ask', ' I\'m sorry can you repeat the team?',
                'Please tell me the team');
        }

        console.log('is it a city? ' + CITY_MAP[team.toLowerCase()]);

        if (CITY_MAP[team.toLowerCase()]) {
            team = CITY_MAP[team.toLowerCase()];
        }

        console.log('The given team is: ' + team);

        sonicsEasterEgg(this, team);

        getTeamInjuries(this, team, (speechOutput, inst) => {
            inst.emit(':askWithCard', speechOutput + 'would you like to check injuries for another team?', 'Sorry, I didn\'t here you, do you want to check another team?', "List of injuries for this team", speechOutput);
        });
    }
};


function getTeamCode(teamName) {
    console.log('finding team code for: ' + teamName.toLowerCase());
    const teamCode = TEAM_CODE[teamName.toLowerCase()];
    return teamCode;
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
        this.emit(':tell', 'I\'m sorry I can look up any injuries right now, Try again later');
    });
}

function parseInjuriesJson(inst, body, teamName, callback) {
    const teamCode = getTeamCode(teamName);

    if (!teamCode) {
        inst.emit(':ask', ' I\'m sorry can you repeat the team? I heard ' + teamName + ' I can\'t find that basketball team',
            'Please tell me the team');
    }

    console.log('parseInjuries team code is: ' + teamCode + ' for team code: ' + teamName);

    parseString(body, function(err, result) {
        const teamsArray = result.FantasyBasketballNerd.Team;

        let injuriesForTeam = _.find(teamsArray, (currentObject) => {
            return currentObject.$.code === teamCode;
        });

        console.log('team object: ' + JSON.stringify(injuriesForTeam));

        if (injuriesForTeam) {
            const playerTest = injuriesForTeam.Player[0].name;
            const speechOutput = formatInjurieSpeechOutput(injuriesForTeam.Player)

            callback('The ' + teamName + ' have the following injuries, ' + speechOutput, inst);
        } else {
            callback('The ' + teamName + ' do not have any injuries,', inst);
        }
    });
}

function formatInjurieSpeechOutput(playersArray) {
    let speechOutput = '';
    playersArray.forEach(function(player) {
        speechOutput += player.name[0] + ' with ' + player.injury[0] + ', he\'s ' + player.notes[0] + ','
    });

    console.log('speechOutput is: ' + speechOutput);
    return speechOutput;
}