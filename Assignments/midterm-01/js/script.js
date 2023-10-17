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
    }
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
    }
}

let state = `title`;

//PRELOAD
function preload() {

}


//SETUP
function setup() {
    createCanvas(windowWidth, windowHeight);

    rock1.x = random(0, width);
    rock1.y = random(0, 300);
    rock2.x = random(0, width);
    rock2.y = random(0, 300);

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
    keyPressed();

    if (cart.x >= rock1.x) {
        rock1.y = rock1.y + rock1.vy;
    }

    if (rock1.y > cart.y && rock.x1 > (cart.x + cart.width/2) && rock.x1 (cart.x - cart.width/2)) {
        state = `gemOrBust`;
    }
    else if (rock2.y > cart.y && rock.x2 > (cart.x + cart.width/2) && rock.x2 (cart.x - cart.width/2)) {
        state = `gemOrBust`;
    }
}

    //GEM OR BUST PAGE
function gemOrBust() {
    fill(255);
    ellipse(width/2, height/2, 300);
}

function keyPressed() {
    //From title to moving
    if (state === `title`) {
        state = `moving`;
    }
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