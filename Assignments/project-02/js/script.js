/**
 * Bike Fast
 * Graeme Peters
 * 
 * This is a game where you control a little cyclist who moves
 * faster depending on how quickly you click.
 */

"use strict";

let badGuys = [];

let userRacer;
let lapsCompleted = 0;
let button;

let rivalsRules = {
    numRivals: 2
}


function setup() {
    createCanvas(600, 600);

    for (let i = 0; i < rivalsRules.numRivals; i++) {
        badGuys.push(new Rival(random(0, 255), random(0, 255), random(0, 255)));
    }

    userRacer = new UserRacer();

//Making button to control speed
    button = createButton(`Click to pedal faster`)
    button.position(width/2, height/2);
    button.mousePressed(userRacer.accelerate());

}


function draw() {
    background(0);

    for (let i = 0; i < rivalsRules.numRivals; i++) {
        let rival = badGuys[i];

//Displayin
    rival.display();
    userRacer.display();

//Moving the rivals
    rival.move();

// Moving the user
    userRacer.move();

//Adding laps
    if (rival.lapDone() && userRacer.lapDone()) {
        lapsCompleted++;
    }

//Checking who won and displaying message
    if (lapsCompleted === 3) {
        if (userRacer.position > rival.position) {
            push();
            textSize(64)
            textAlign(CENTER);
            fill(255, 255, 0);
            text(`You WIN!`, width/2, height/2);
            pop();
        }
        else {
            push();
            textSize(48)
            textAlign(CENTER);
            fill(255, 255, 0);
            text(`You Lose`, width/2, height/2);
            pop();
        }
        noLoop();
    }
    }


}