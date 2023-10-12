/**
 * Learning Conditionals
 * Graeme Peters
 * 
 * This is my file to learn to use conditionals by following along with Pippin's 
 * videos.
 */

"use strict";

let covid = {
    x: 0,
    y: 250,
    size: 100,
    vx: 5,
    vy: 5,
    ax: 0,
    ay: 0,
    acceleration: 0.15,
    maxSpeed: 4,
    fill: {
        r: 70,
        g:220,
        b: 20
    }
};

let user = {
    x: 500,
    y: 250,
    size: 100,
    fill: {
        r:0,
        g:0,
        b:255
    }
};

let bg = {
    r: 0,
    g: 0,
    b: 0
};

//SETUP
function setup() {

    createCanvas(windowWidth, windowHeight);
    covid.y = random(0, height);

}

//DRAW
function draw() {

    background(bg.r, bg.g, bg.b);
   
    /*
    //Display static
    for (let i = 0; i < 1000; i++) {
    let x = random(0, width);
    let y = random(0, height);
    stroke(255);
    point(x, y);
    };
    */

    // Covid object
    fill(covid.fill.r, covid.fill.g, covid.fill.b);
    noStroke();
    ellipse(covid.x, covid.y, covid.size);

    covid.x = covid.x + covid.vx;
    covid.y = covid.y + covid.vy;

        //Making restart
    if (covid.x > width) {
        covid.x = 0;
        covid.y = random(0, height);
    }

        //Making slingshot movement
    if (mouseY < covid.y) {
        covid.ay = -covid.acceleration;
    }
    else {
        covid.ay = covid.acceleration;
    }

    covid.vy = covid.vy + covid.ay;
    covid.vy = constrain(covid.vy, -covid.maxSpeed, covid.maxSpeed);

    // User object
    fill(user.fill.r, user.fill.g, user.fill.b);
    noStroke();
    ellipse(user.x, user.y, user.size);
    user.x = mouseX
    user.y = mouseY

    //Checking for distance
    let d = dist(user.x, user.y, covid.x, covid.y);

    if (d < (covid.size + user.size)/2) {
        noLoop();
    }
 
}