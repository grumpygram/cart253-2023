/**
 * I like to move it
 * Graeme Peters
 * 
 * I am making something that will move, with bla bla bla.

"use strict";

/**
 * Making Javascript objects
*/


//Objects
let bg = {
    r: 0,
    g: 0,
    b: 0

};

let circle1 = {
    x: 0,
    y: 250,
    size: 100,
    growthRate: 1,
    speed: 1,
    fill: 255,
    alpha: 200
};

let circle2 = {
    x: 500,
    y: 250,
    size: 75,
    sizeRatio: 0.5,
    speed: -1,
    fill: 255,
    alpha: 200
};

function preload() {

}


//Setup
function setup() {

    createCanvas(500, 500);
    noStroke();
}


//Drawing
function draw() {

    //Background
    background(bg.r, bg.g, bg.b);
    bg.r = map(circle1.size, 100, width/4*3, 0, 255);

    //Drawing Circle1
    circle1.x = circle1.x + circle1.speed;
    circle1.x = constrain(circle1.x, 0, width/2);
    circle1.size = circle1.size + circle1.growthRate;
    circle1.size = constrain(circle1.size, 0, width/4*3);
    fill(circle1.fill, circle1.alpha);
    ellipse(circle1.x, circle1.y, circle1.size);

    //Drawing Circle2
    circle2.x = circle2.x + circle2.speed;
    circle2.x = constrain(circle2.x, width/2, width);
    circle2.size = circle1.size * circle2.sizeRatio;
    fill(circle2.fill, circle2.alpha);
    ellipse(circle2.x, circle2.y, circle2.size);
 
} 