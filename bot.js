"use strict"

var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var config = require('./config.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

//// Stored functions for commands

let DefaultError = "Something has gone wrong. Console has been pinged."

// Rolls a dice of user equested size
function rollOneDice(DiceSize){
    let roll = Math.floor(Math.random() * DiceSize) + 1;
    return roll
};

// Rolls X amount of dice of a user size
function rollXDice(HowMany, DiceSize){
    let DiceRolls = [];
    let Start = 0;
    for(Start; Start < HowMany; Start++){
            DiceRolls.push(rollOneDice(DiceSize))
    }
    return DiceRolls
};

//Returns what the user sent and what the bot read
function whatDidISay(ChannelID, ChatMessage, TotalArguments){
    bot.sendMessage({
        to: ChannelID,
        message: 'Message Sent: ' + ChatMessage
    });
    bot.sendMessage({
        to: ChannelID,
        message: 'Arguments I found: ' + TotalArguments
    });
}

// Bot's listening function
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`

    if (message.substring(0, 1) == config.prefix) {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        var BotController = (userID == auth.owner);
       
        args = args.splice(1);
        switch(cmd) {

            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;

            // !Hello
            case 'hello':
                bot.sendMessage({
                    to: channelID,
                    message: 'Oh, hi there!'
                });
            break;

            //!roll20
            case 'roll20':
                let Roll = rollOneDice(20);
                bot.sendMessage({
                    to: channelID,
                    message: user + ' you rolled a ' + Roll + ' out of 20.'
                });
            break;

            //!roll X Y
            case 'roll':
                let LocalHowMany = args[0];
                let LocalDiceSize = args [1];
                let UserRolls = rollXDice(LocalHowMany, LocalDiceSize);

                bot.sendMessage({
                    to: channelID,
                    message: user + ' you rolled (' + UserRolls + ")"
                });

                // whatDidISay(channelID, message, args);
            break;

            //!shutdown
            case 'shutdown': {
                if (!BotController){
                    return;
                }
                
                bot.sendMessage({
                    to: channelID,
                    message: "Don't go quietly into that good night."
                }).then( Successful =>{
                    bot.disconnect()
                }).then( Unsuccessful =>{
                    throw new Error()
                })

                break;

            }

            // Just add any case commands if you want to..
         }
     }
});