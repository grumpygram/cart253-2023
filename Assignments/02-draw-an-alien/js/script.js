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
 * Drawing Basic Shapes Here
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

//Making Nostrils
    fill(0, 0, 0);
    ellipse(312, 290, 10, 20);
    ellipse(328, 290, 10, 20);

//Making Antennae
    stroke(80, 180, 80);
    strokeWeight(5);
    line(230, 20, 270, 130); //Antenna 1
    line(410, 20, 370, 130); //Antenna 2



}


/**
 * Making Alien Face Do Cool Stuff
*/
function draw() {

//Making Eyes
    stroke(50, 150, 50);
    strokeWeight(3);
    fill(random(35, 220), random(35, 220), random(35, 220));
    ellipse(272, 240, 70, 100);
    ellipse(368, 240, 70, 100);

//Making Pupils
    noStroke();
    fill(0, 0, 0);
    ellipse(272, 250, 7, 7);
    ellipse(368, 250, 7, 7);

//Making Mouth
    fill(mouseX, mouseY, 0, 200);
    ellipse(320, 350, 110, 50);

    noStroke();
    fill(225, 255, 255);
    triangle(283, 331, 300, 326, 290, 340); //Tooth 1
    triangle(300, 326, 320, 325, 310, 340); //Tooth 2
    triangle(320, 325, 340, 326, 330, 340); //Tooth 3
    triangle(340, 326, 357, 331, 350, 340); //Tooth 4

    triangle(283, 369, 300, 374, 290, 360); //Tooth 5
    triangle(300, 374, 320, 375, 310, 360); //Tooth 6
    triangle(320, 375, 340, 374, 330, 360); //Tooth 7
    triangle(340, 374, 357, 369, 350, 360); //Tooth 8

    stroke(180, 0, 0);
    noFill();
    ellipse(320, 350, 110, 50);
    

}