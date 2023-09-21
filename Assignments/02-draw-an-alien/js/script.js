/**
 * Alien Drawing
 * Graeme Peters
 * 
 * This is an alien drawing for CART 253
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}


/**
 * Description of setup
*/
function setup() {

//Making Background
    createCanvas(640, 480);
    background(255, 120, 160);

//Making Body
    rectMode(CENTER);
    noStroke();
    fill(255, 165, 0);
    rect(320, 480, 250, 150);

//Making Neck
    fill(140, 220, 140);
    rect(320, 400, 100, 50);
    ellipse(320, 425, 100, 20);

//Making Head
    fill(100, 200, 100);
    ellipse(320, 240, 250, 330);
    triangle(242, 370, 398, 370, 320, 430);


}


/**
 * Description of draw()
*/
function draw() {

    //Making Eyes
    stroke(50, 150, 50);
    strokeWeight(3);
    fill(255, 255, 255);
    ellipse(272, 240, 70, 100);
    ellipse(368, 240, 70, 100);

}