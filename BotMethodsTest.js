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

//Test basic async
async function test(){
    return "Hello World"
};

//console.log(test())

//Test Async Function
async function TestWait(){
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 1000),
        setTimeout(() => reject("Oh No"), 2000)
      });

      let result = await promise;
      console.log(result)
}

TestWait();

//Test async with try catch
async function testTry(){
    try {
        console.log("Hello World")
    } 
    catch (error) {
        console.warn("Something has gone wrong")
    }
}

//testTry();

//Shutdown method using async
async function shutdown(){
    return new Promise((resolve, reject) => {
        resolve(bot.sendMessage({
            to: channelID,
            message: "Do not go gentle into that good night."
        })),
        reject(bot.sendMessage({
            to: channelID,
            message: DefaultError
        }))
    });
    
}
