/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";


function preload() {

}

let backgroundShade = 0;

let circle = {
    x: 0,
    y: 250,
    size: 200,
    speed: 2,
};

function setup() {

    createCanvas(500, 500);

}

function draw() {

    circle.x += circle.speed;

    background(backgroundShade);
    ellipse(circle.x, circle.y, circle.size);

}