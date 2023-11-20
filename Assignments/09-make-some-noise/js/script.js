/**
 * Make Some Noise 
 * Graeme Peters
 * 
 * This is an exercise where the user will be able to pick up and 
 * move notes to have them begin playing.
 */

"use strict";

//The musicians
let musicians = [8];

let x = 50;
let y = 50;

//The notes
let notes = [`F3`, `G3`, `Ab4`, `Bb4`, `C4`, `Db4`, `Eb4`, `F4`];

function setup() {
    createCanvas(600, 600);

    userStartAudio();
}


function draw() {
    background(0);

    for (i = 0; i < musicians.length; i++) {
        let musician = musicians[i];
        x = x + 50;
        y = y+ 50;
        musician.move();
        musician.playNote();
        musician.display(); 
    }

}