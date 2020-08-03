"use strict"

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
    
    return DiceRolls;
};

console.log(rollXDice(4,20).toString());