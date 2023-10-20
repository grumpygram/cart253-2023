/**
 * Midterm
 * Graeme Peters
 * 
 * A simple game that makes the most of the tools that I have.
 */

"use strict";

//OBJECTS
let cart = {
    x: 100,
    y: 500,
    width: 200,
    height: 100,
    vx: 5,
    fill: {
        r: 255,
        g: 255,
        b: 255
    }
}
let background1 = {
    r: 0,
    g: 0,
    b: 0
}

let background2 = {
    r: 100,
    g: 100,
    b: 100
}

let rock1 = {
    x: 0,
    y: 0,
    size: 80,
    vx: 2,
    vy: 2,
    fill: {
        r: 255,
        g: 255,
        b: 255
    },
    falling: false
}

let rock2 = {
    x: 0,
    y: 0,
    size: 80,
    vx: 2,
    vy: 2,
    fill: {
        r: 255,
        g: 255,
        b: 255
    },
    falling: false
}

let bigRockAlpha = 255;
let bigRock = {
    x: undefined,
    y: undefined,
    fill: (255, 255, 255, bigRockAlpha),
    fade: false,
    fadeRate: 5,
    size: 300
}

let d1;
let d2;
let d3;

let geode = {
    x: undefined,
    y: undefined,
    size: 250,
    contents: undefined
}

let state = `title`;

//PRELOAD
function preload() {

}


//SETUP
function setup() {
    createCanvas(windowWidth, windowHeight);

    rock1.x = random(0, width);
    rock1.y = random(0, height/2);
    rock2.x = random(0, width);
    rock2.y = random(0, height/2);

    //geode.contents = round(random(0, 1));

    bigRock.x = width/2;
    bigRock.y = height/2;

    geode.x = width/2;
    geode.y = height/2;
}


//DRAW
function draw() {
    if (state === `title`) {
        title();
    }
    if (state === `moving`) {
        moving();
    }
    if (state === `gemOrBust`) {
        gemOrBust();
    }

}

//TITLE PAGE
function title() {
    background(background1.r, background1.g, background1.b);
    textSize(74);
    fill(255, 100, 100);
    textAlign(CENTER, CENTER);
    text(`GEM MINING`, width/2, 300);
    textSize(50);
    text(`press any key to continue`, width/2, 370);
}

//MOVING PAGE
function moving() {
    background(background1.r, background1.g, background1.b);

    //Cart
    fill(cart.fill.r, cart.fill.g, cart.fill.b);
    rect(cart.x, cart.y, cart.width, cart.height);

    rectMode(CENTER);
    //Rock 1
    push();
    fill(rock1.fill.r, rock1.fill.g, rock1.fill.b);
    ellipse(rock1.x, rock1.y, rock1.size);
    pop();

    //Rock 2
    push();
    fill(rock2.fill.r, rock2.fill.g, rock2.fill.b);
    ellipse(rock2.x, rock2.y, rock2.size);
    pop();


    //Calling the function to make the cart move
    cartMove();

    //Making the rocks fall
    d1 = dist(rock1.x, rock1.y, mouseX, mouseY);
    d2 = dist(rock2.x, rock2.y, mouseX, mouseY);
    rockFall();

    //Checking if rock fell in cart and moving to GemOrBust
    if (rock1.x < (cart.x + cart.width/2)) {
        if (rock1.x > (cart.x - cart.width/2)) {
            if (cart.y - rock1.y > 0) {
                if (cart.y - rock1.y < 10) {
                print(`Rock 1`)
                rock1.falling = false;
                state = `gemOrBust`;
                }
            }
        }
    }      
    if (rock2.x < (cart.x + cart.width/2)) {
        if (rock2.x > (cart.x - cart.width/2)) {
            if (cart.y - rock2.y > 0) {
                if (cart.y - rock2.y < 10) {
                print(`Rock 2`)
                rock2.falling = false;
                state = `gemOrBust`;
                }
            }
        }
    }  
}

//GEM OR BUST PAGE
function gemOrBust() {
    background(background2.r, background2.g, background2.b);

    //Displaying geode and big rock
    /*
    fill(geode.fill)
    ellipse(geode.x, geode.y, geode.size);
    */

    push();
    noStroke();
    fill(bigRock.fill);
    ellipse(bigRock.x, bigRock.y, bigRock.size);
    pop();

    //Making clicking on bigRock fade it out
    d3 = dist(bigRock.x, bigRock.y, mouseX, mouseY);
    unearthing();

    /*
    if (geode.contents === 1) {
        geode.fill = {
            r: 255,
            g: 0,
            b: 0
        }
    }
    else if (geode.contents === 0) {
        geode.fill = (255);
        }
    */
}

function keyPressed() {
    //From title to moving
    if (state === `title`) {
        state = `moving`;
    }
}

function cartMove() {
    //Moving the cart
    if (state === `moving`) {
        if (keyIsDown(39)) {
            cart.x = cart.x + cart.vx;
        }
        else if (keyIsDown(37)) {
            cart.x = cart.x - cart.vx;
        }
    }
}

//Makes rocks fall
function rockFall() {
    if (rock1.falling === true) {
        rock1.y = rock1.y + rock1.vy;
    }
    if (rock2.falling === true) {
        rock2.y = rock2.y + rock2.vy;
    }
}

//Makes bigRock fade
function unearthing() {
    if (bigRock.fade === true) {
        bigRockAlpha = bigRockAlpha - bigRock.fadeRate;
        print(`unearthing...`)
    }
}

function mousePressed() {
    //Clicking on rocks makes them fall
    if (state === `moving`) {
        if (d1 < rock1.size/2) {
            rock1.falling = true;
        }
        if (d2 < rock2.size/2) {
            rock2.falling = true;
        }
    }
    //Clicking on bigRock makes it fade away
    if (state === `gemOrBust`) {
        if (d3 < bigRock.size/2) {
            print(`fading...`)
            bigRock.fade = true;
        }
    }
}