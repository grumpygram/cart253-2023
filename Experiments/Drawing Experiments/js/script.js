/**
 * Project Title
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
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

}


/**
 * Description of draw()
*/
function draw() {
    createCanvas(300, 600);
    background(255, 180, 0);

    //square
    strokeWeight(5);
    stroke(0, 0, 200);
    fill(mouseX, mouseY, random(0, 255), random(0, 255));
    rectMode(CENTER);
    rect(150, 300, 80, 80);
    rect(150, 300, 50, 50);

   



}