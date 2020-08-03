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

const doSomethingElse = function(){
    return new Promise((resolve,reject)=>{
        console.log("Initial");
        resolve();
    }).then(()=>{
        throw new Error('Something failed')
        console.log("Do this");
    }).catch(()=>{
        console.log("Do that");
        reject();
    }).then(()=>{
        console.log("Do this after whatever happened before");
    });
}

doSomethingElse()