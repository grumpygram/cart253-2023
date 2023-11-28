/**
 * Throw Hard
 * Graeme Peters
 * 
 * Game where you choose the angle and power of a ball, then your players catch it and score a touchdown
 */

"use strict";

let state = `powerSelector`;

//Power stuff
let powerValue;
let powerBar = {
    x: 600,
    y: 150,
    width: 40,
    height: 100,
    minHeight: 0,
    maxHeight: 400,
    fill: {
        r: 255,
        g: 220,
        b: 0
    },
    heightChange: 5
}

//Angle stuff
let angleValue;

let angleArrow = {
    centerX: 600,
    centerY: 400,
    length: 200,
    angle: 180,
    angleChange: 1,
    centerSize: 20,
    fill: {
        r: 255,
        g: 0,
        b: 0
    },
    maxAngle: 230,
    minAngle: 130
}

//Setup
function setup() {
    createCanvas(700, 700);

}


function draw() {
    background(0, 200, 0);

    if (state === `powerSelector`) {
        power();
    }
    if (state === `angleSelector`) {
        angle();
    }
}

//Function for the power bar
function power() {
    //Making the rectangle shrink then grow
    powerBar.height = powerBar.height + powerBar.heightChange;

    if (powerBar.height >= powerBar.maxHeight) {
        powerBar.heightChange = -powerBar.heightChange;
    }
    if (powerBar.height <= powerBar.minHeight) {
        powerBar.heightChange = powerBar.heightChange * -1;
    }
    
    //Mapping the power value
    powerValue = map(powerBar.height, 0, 400, 0, 100);

    push();
    fill(255);
    rect(powerBar.x, powerBar.y, powerBar.width, powerBar.maxHeight);
    pop();

    push();
    fill(powerBar.fill.r, powerBar.fill.g, powerBar.fill.b);
    rect(powerBar.x, powerBar.y, powerBar.width, powerBar.height);
    pop();

    push();
    textSize(32);
     stroke(200, 0, 0);
    strokeWeight(5);
    text(round(powerValue), 600, 125);
    pop();
}

//Check power function
function checkPower() {
    powerBar.heightChange = 0;
    powerValue = round(powerValue);
    console.log(powerValue);
}

//MousePressed
function mouseClicked() {
    if (state === `powerSelector`) {
        checkPower()
        state = `angleSelector`
    }
    if (state === `angleSelector`) {
        checkAngle()
    }
}

//Angle function
function angle() {
    //Making the angle change and bounce
    angleArrow.angle = angleArrow.angle + angleArrow.angleChange;

    if (angleArrow.angle >= angleArrow.maxAngle) {
        angleArrow.angleChange = -angleArrow.angleChange;
    }
    if (angleArrow.angle <= angleArrow.minAngle) {
        angleArrow.angleChange = angleArrow.angleChange * -1;
    }
        
    // Calculate the arrow endpoint
    let arrowEndX = angleArrow.centerX + angleArrow.length * cos(radians(angleArrow.angle));
    let arrowEndY = angleArrow.centerY + angleArrow.length * sin(radians(angleArrow.angle));

    // Draw the arrow
    push();
    stroke(angleArrow.fill.r, angleArrow.fill.g, angleArrow.fill.b);
    strokeWeight(10);
    line(angleArrow.centerX, angleArrow.centerY, arrowEndX, arrowEndY);
    pop();

    // Drawing the central point
    push();
    fill(0);
    ellipse(angleArrow.centerX, angleArrow.centerY, angleArrow.centerSize);
    pop();
}

//Check angle function
function checkAngle() {
    angleArrow.angleChange = 0;
    angleValue = angleArrow.angle;
    console.log(angleArrow.angle);
}