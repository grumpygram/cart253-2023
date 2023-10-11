/**
 * Learning Conditionals
 * Graeme Peters
 * 
 * This is my file to learn to use conditionals by following along with Pippin's 
 * videos.
 */

"use strict";

    let circle = {
        x: 250,
        y: 250,
        size: 100
    };

function setup() {

    createCanvas(500, 500);

}


function draw() {
    background(0);

    ellipse(circle.x, circle.y, circle.size);

}