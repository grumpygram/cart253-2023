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
    fill: 255,
    alpha: 200
};

let circle2 = {
    x: 500,
    y: 250,
    size: 75,
    fill: 255,
    alpha: 200
};

function preload() {

}


//Setup
function setup() {

    createCanvas(500,500);
    noStroke();
}


//Drawing
function draw() {

    //Background
    background(bg.r,bg.g,bg.b);
    bg.r = bg.r + 1;

    //Drawing Circle1
    circle1.x = circle1.x + 1;
    circle1.x = constrain(circle1.x,0,width/2);
    fill(circle1.fill,circle1.alpha);
    ellipse(circle1.x,circle1.y,circle1.size);

    //Drawing Circle2
    circle2.x = circle2.x - 1;
    circle2.x = constrain(circle2.x,width/2,width);
    fill(circle2.fill,circle2.alpha);
    ellipse(circle2.x,circle2.y,circle2.size);
 
} 