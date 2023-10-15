/**
 * Exercise 05 Love, actually
 * Graeme Peters
 * 
 * This is where I will be doing the coding for exercise 5.
 */

"use strict";

//OBJECTS
let circle1 = {
    x: undefined,
    y: 250,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 1
};

let circle2 = {
    x: undefined,
    y: 250,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 1
};

let state = `title`; // Can be: title, simulation, love, heartbreak

//SETUP
function setup() {
    createCanvas(500, 500);

    //Positioning circles at thirds of the canvas
    circle1.x = width/3;
    circle2.x = 2 * width/3;

    //Start circle1 moving in a random direction
    circle1.vx = random(-circle1.speed, circle1.speed);
    circle1.vy = random(-circle1.speed, circle1.speed);

    //Start circle2 moving in a random direction
    circle2.vx = random(-circle2.speed, circle2.speed);
    circle2.vy = random(-circle2.speed, circle2.speed);
}

//DRAW
function draw() {
    background(0);

    if (state === `title`) {
        title();
    }
    else if (state === `simulation`) {
        simulation();
    }
    else if (state === `love`) {
        love();
    }
    else if (state === `heartbreak`) {
        heartbreak();
    }
}

function title() {
    //TITLE
    push();
    textSize(64);
    fill(240, 90, 90);
    textAlign(CENTER, CENTER);
    text(`COURTSHIP`, width/2, height/2);
    pop();
}

function simulation() {
    //Moving Circles
    move();
    //Checking if circles are offscreen (sad ending)
    checkOffScreen();
    //Checking if circles are overlapping (happy ending)
    checkOverlap();
    //Drawing circles
    display();
}

function love() {
    //LOVE
    push();
    textSize(64);
    fill(255, 90, 90);
    textAlign(CENTER, CENTER);
    text(`XOXO`, width/2, height/2);
    pop();
}

function heartbreak() {
    //HEARTBREAK
    push();
    textSize(55);
    fill(255, 90, 90);
    textAlign(CENTER, CENTER);
    text(`HEARTBREAK =(`, width/2, height/2);
    pop();
}

function move() {
    //Moving circle1
    circle1.x = circle1.x + circle1.vx;
    circle1.y = circle1.y + circle1.vy;

    //Moving circle2
    circle2.x = circle2.x + circle2.vx;
    circle2.y = circle2.y + circle2.vy;
}

function checkOffScreen() {
    //Check if circles have gone off screen
    if (circle1.x < 0 || circle1.x > width || circle1.y < 0 || circle1.y > height || circle2.x < 0 || circle2.x > width || circle2.y < 0 || circle2.y > height) {
        //SAD ENDING
        state = `heartbreak`
    } 
}

function checkOverlap() {
    //Check if circles overlap
    let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);
    if (d < circle1.size/2 + circle2.size/2) {
        //HAPPY ENDING
        state = `love`;
    }
}

function display() {
    //Drawing circles
    fill(255, 0, 0);
    ellipse(circle1.x, circle1.y, circle1.size);
    ellipse(circle2.x, circle2.y, circle2.size);
}

function mousePressed() {
    if (state === `title`) {
        state = `simulation`;
    }
}