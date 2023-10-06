/**
 * Learning Conditionals
 * Graeme Peters
 * 
 * This is my file to learn to use conditionals by following along with Pippin's 
 * videos.
 */

"use strict";

    let circle = {
        x: undefined,
        y: undefined,
        size: 100
    };

    let dangerZone = {
        x: 250,
        y: 250,
        size: 150
    };

function setup() {
    createCanvas(500, 500);

    circle.x = random(0, width);
    circle.y = random(0, height);

    let d = dist(circle.x, circle.y, dangerZone.x, dangerZone.y);
    while (d < circle.size/2 + dangerZone.size/2) {
        circle.x = random(0, width);
        circle.y = random(0, height);
        d = dist(circle.x, circle.y, dangerZone.x, dangerZone.y);
    }
}


function draw() {
    background(0);

//Danger zone
    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);
    ellipse(dangerZone.x, dangerZone.y, dangerZone.size);

    fill(255);
    noStroke();
    ellipse(circle.x, circle.y, circle.size);

}