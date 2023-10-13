/**
 * Learning Functions
 * Graeme Peters
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

let circle = {
    x: 0,
    y: 250,
    vx: 2,
    vy: 0,
    size: 80
};

let state = `title`;

function setup() {
    createCanvas(500, 500);
    textSize(64);
    textAlign(CENTER, CENTER);
}

function draw() {
    background(0);

    if(state === `title`) {
    title();
    }
    else if (state === `animation`) {
    animation();
    }
    else if (state === `ending`) {
    ending();
    }
}

function title() {
    //TITLE
    fill(255);
    text(`Life.`, width/2, height/2);
}

function animation() {
    //ANIMATION
    circle.x = circle.x + circle.vx;
    circle.y = circle.y + circle.vy;

    if (circle.x > width) {
        state = `ending`;
    }

    ellipse(circle.x, circle.y, circle.size);
}

function ending() {
    //ENDING
    fill(127);
    text(`The End.`, width/2, height/2);
}

function keyPressed() {
    if (state === `title`) {
    state = `animation`;
    }
}
