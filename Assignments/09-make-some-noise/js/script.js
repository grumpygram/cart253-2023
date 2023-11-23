/**
 * Make Some Noise 
 * Graeme Peters
 * 
 * This is an exercise where the user will be able to pick up and 
 * move notes to have them begin playing.
 */

"use strict";

let musicians = [];

let circle = {
    x: 50,
    y: 50,
    size: 75,
    numMusicians: 8
}

function setup() {
    createCanvas(600, 600);

    let x = circle.x;
    let y = circle.y;
    let size = circle.size;

    let musician = new Musician(x, y, size);
    musician.push(musicians);
}

function draw() {
    background(0);

    for (let i = 0; i < circle.numMusicians; i++) {
        let musician = musicians[i];
        musician.display();
    }

}