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
    vx: 8,
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

let rock = {
    x: 0,
    y: 0,
    size: 80,
    vx: 2,
    vy: 2,
    fill: {
        r: 255,
        g: 255,
        b: 255
    }
}

let state = `title`;

//PRELOAD
function preload() {

}


//SETUP
function setup() {
    createCanvas(windowWidth, windowHeight);

    rock.x1 = random(0, width);
    rock.y1 = random(0, 300);
    rock.x2 = random(0, width);
    rock.y2 = random(0, 300);

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

function title() {
    background(background1.r, background1.g, background1.b);
    textSize(74);
    fill(255, 100, 100);
    textAlign(CENTER, CENTER);
    text(`GEM MINING`, width/2, 300);
    textSize(50);
    text(`press any key to continue`, width/2, 370);
}

function moving() {
    background(background1.r, background1.g, background1.b);
    fill(cart.fill.r, cart.fill.g, cart.fill.b);

    rectMode(CENTER);
    rect(cart.x, cart.y, cart.width, cart.height);

    fill(rock.fill.r, rock.fill.g, rock.fill.b);
    ellipse(rock.x1, rock.y1, rock.size);
    ellipse(rock.x2, rock.y2, rock.size);

    if (cart.x = rock.x1) {
        rock.y1 = rock.y1 + rock.vy;
    }

    if (rock.y1 === cart.y && rock.x1 > (cart.x + cart.width/2) && rock.x1 (cart.x - cart.width/2)) {
        state = `gemOrBust`;
    }
    else if (rock.y2 === cart.y && rock.x2 > (cart.x + cart.width/2) && rock.x2 (cart.x - cart.width/2)) {
        state = `gemOrBust`;
    }
}

function gemOrBust() {
    fill(255);
    ellipse(width/2, height/2, 300);
}

function keyPressed(LEFT_ARROW) {
    cart.x = cart.x + cart.vx;
}

function mousePressed() {
    if (state === `title`) {
        state = `moving`;
    }
}