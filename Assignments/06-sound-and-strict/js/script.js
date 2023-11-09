/**
Sound and Strict
Graeme Peters

Learning to do sound and strict!
 */

"use strict";

let circle = {
    x: 0,
    y: 0,
    size: 100
}


function setup() {
    createCanvas(500,500);

}


function draw() {
    background(0);

    circle.x = mouseX;
    circle.y = mouseY;

    ellipse(circle.x, circle.y, 100);

}