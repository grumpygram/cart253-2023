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
        r: 50,
        g: 30,
        b: 3
    }
}
let background1 = {
    r: 30,
    g: 10,
    b: 0
}

let background2 = {
    r: 80,
    g: 50,
    b: 10
}

let rock1 = {
    x: 0,
    y: 0,
    size: 80,
    vx: 2,
    vy: 2,
    fill: {
        r: 100,
        g: 100,
        b: 100,
        a: 255
    },
    stroke: {
        r: 50,
        g: 50,
        b: 50,
        a: 255,
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
        r: 100,
        g: 100,
        b: 100,
        a: 255
    },
    stroke: {
        r: 50,
        g: 50,
        b: 50,
        a: 255,
    },
    falling: false
}

let bigRock = {
    x: undefined,
    y: undefined,
    fill: {
        r: 105,
        g: 105,
        b: 105,
        a: 255
        },
    fade: false,
    fadeRate: 5,
    size: 300
}

let d1;
let d2;
let d3;

let cave;
let choc;
let jewel;

let geode = {
    x: undefined,
    y: undefined,
    size: 250,
    contents: undefined
}

let state = `title`;

//PRELOAD
function preload() {
    cave = loadImage("assets/images/cave_background3.png");

    choc = loadFont("assets/fonts/choc.ttf");
    jewel = loadFont("assets/fonts/ScalaJewelSaphyr.otf");

}


//SETUP
function setup() {
    createCanvas(1000, 600);

    rock1.x = random(0, 1000);
    rock1.y = random(0, 600/2);
    rock2.x = random(0, 1000);
    rock2.y = random(0, 600/2);

    geode.contents = round(random(0, 1));

    bigRock.x = 1000/2;
    bigRock.y = 600/2;

    geode.x = 1000/2;
    geode.y = 600/2;
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
    textFont(choc);
    text(`GEM MINING`, 1000/2, 300);
    textSize(50);
    text(`press any key to continue`, 1000/2, 370);
}

//MOVING PAGE
function moving() {
    background(background1.r, background1.g, background1.b);
    image(cave, 0, 0, 1000, 600);

    rectMode(CENTER);
    //Rock 1
    push();
    strokeWeight(5);
    stroke(rock1.stroke.r, rock1.stroke.g, rock1.stroke.b, rock1.stroke.a);
    fill(rock1.fill.r, rock1.fill.g, rock1.fill.b, rock1.fill.a);
    ellipse(rock1.x, rock1.y, rock1.size);
    pop();

    //Rock 2
    push();
    strokeWeight(5);
    stroke(rock2.stroke.r, rock2.stroke.g, rock2.stroke.b, rock2.stroke.a);
    fill(rock2.fill.r, rock2.fill.g, rock2.fill.b, rock2.fill.a);
    ellipse(rock2.x, rock2.y, rock2.size);
    pop();

    //Cart
    fill(cart.fill.r, cart.fill.g, cart.fill.b);
    rect(cart.x, cart.y, cart.width, cart.height);


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
                if (cart.y - rock1.y < 2) {
                print(`Rock 1`)
                //rock1.falling = false;
                state = `gemOrBust`;
                push();
                noStroke();
                rock1.stroke.a = 0;
                rock1.fill.a = 0;
                pop();
                }
            }
        }
    }      
    if (rock2.x < (cart.x + cart.width/2)) {
        if (rock2.x > (cart.x - cart.width/2)) {
            if (cart.y - rock2.y > 0) {
                if (cart.y - rock2.y < 2) {
                print(`Rock 2`)
                //rock2.falling = false;
                state = `gemOrBust`;
                push();
                rock2.stroke.a = 0;
                rock2.fill.a = 0;
                pop();
                }
            }
        }
    }  

    //Sending 
}

//GEM OR BUST PAGE
function gemOrBust() {
    background(background2.r, background2.g, background2.b);

    rectMode(CORNER);
    noStroke();
    fill(60, 40, 10)
    rect(0, 0, 1000, 85);
    rect(0, 515, 1000, 85);
    rect(0, 0, 100, 600);
    rect(900, 0, 100, 600);

    //Displaying geode and big rock and checking if geode is a gem or slag
    checkGeode();
    fill(geode.fill.r, geode.fill.g, geode.fill.b);
    ellipse(geode.x, geode.y, geode.size);

    push();
    noStroke();
    fill(bigRock.fill.r, bigRock.fill.g, bigRock.fill.b, bigRock.fill.a);
    ellipse(bigRock.x, bigRock.y, bigRock.size);
    pop();

    //Making clicking on bigRock fade it out
    d3 = dist(bigRock.x, bigRock.y, mouseX, mouseY);
    unearthing();
}

function keyPressed() {
    //From title to moving
    if (state === `title`) {
        state = `moving`;
    }
    //From gemOrBust to moving
    if (state === `gemOrBust`) {
        if (keyCode === ENTER) {
            print(`Pressed enter`);
            state = `moving`;
        }
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
        bigRock.fill.a = bigRock.fill.a - bigRock.fadeRate;
        print(`unearthing...`);
        textSize(30);
        textFont(jewel);
        textAlign(CENTER);
        fill(255, 105, 180);
        text(`Press enter to continue`, 1000/2, 540);
        if (geode.contents === 1) {
            textSize(70);
            textFont(jewel);
            text(`You Got A Gem!`, 1000/2, 480);
        }
        else if (geode.contents === 0) {
            textSize(70);
            textFont(jewel);
            text(`Just Slag... Try Again`, 1000/2, 480);
        }
    }
}

//Checks if geode is a gem or not
function checkGeode() {
    if (geode.contents === 1) {
        geode.fill = {
            r: 255,
            g: 0,
            b: 0
        };
    }
    else if (geode.contents === 0) {
        geode.fill = {
            r: 110,
            g: 110,
            b: 110
        };
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
            bigRock.fade = true;
        }
    }
}