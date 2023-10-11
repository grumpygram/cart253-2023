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

    let bg = {
        r: 0,
        g: 0,
        b: 0
    };

function setup() {

    createCanvas(500, 500);

}


function draw() {

    background(bg.r, bg.g, bg.b);

    ellipse(circle.x, circle.y, circle.size);

}

function mouseDragged() {

    bg.r = random(0, 255);
    bg.g = random(0, 255);
    bg.b = random(0, 255);

}