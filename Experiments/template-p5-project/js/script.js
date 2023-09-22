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
let circleX = 0;
let circleY = 250;
let circleSize = 200;
let circleSpeed = 2;
let circleAcceleration = 0.25;


function setup() {

    createCanvas(1000, 500);

}


function draw() {

    circleX+= circleSpeed;
    circleSpeed = circleSpeed + circleAcceleration;

    background(backgroundShade);
    ellipse(circleX, circleY, circleSize);

}