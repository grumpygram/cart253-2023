/**
 * Learning Conditionals
 * Graeme Peters
 * 
 * This is my file to learn to use conditionals by following along with Pippin's 
 * videos.
 */

"use strict";

let backgroundShade = 0;
let circle = {
    x: 0,
    y: 250,
    size: 100,
    speed: 1.5,
};

function setup() {
    createCanvas(500, 500);
}


function draw() {
    background(backgroundShade);
    
    circle.x = circle.x + circle.speed;

    fill(255);

    if (!(circle.x < width/3)) {
            fill(255, 0, 0);
        }

    ellipse(circle.x, circle.y, circle.size);
}