/**
 * Throw Hard
 * Graeme Peters
 * 
 * Game where you choose the angle and power of a ball, then your players catch it and score a touchdown
 */

"use strict";

let state = `chuckin'`;

//Power stuff
let powerValue = 200;
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
let angleValue = 220;
let angleArrow = {
    centerX: 600,
    centerY: 350,
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

//Ball stuff
let ball = {
    startX: 600,
    startY: 350,
    x: 600,
    y: 350,
    vx: 0,
    vy: 0,
    speed: 5,
    fill: {
        r: 255,
        g: 150,
        b: 0
    },
    size: {
        w: 12,
        h: 6
    },
    growthX: 0,
    growthY: 0,
    catchingSize: {
        w: 20,
        h: 10
    },
    minSize: {
        w: 10, 
        h: 5
    }
}
let isThrown = false;
let isCatchable = false;

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
    if (state === `chuckin'`) {
        chuck();
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
    console.log(angleValue);
}

//Throwing function
function chuck() {

    //Displaying the ball
    push();
    stroke(0);
    fill(ball.fill.r, ball.fill.g, ball.fill.b);
    ellipse(ball.x, ball.y, ball.size.w, ball.size.h);
    pop();
    

    //Manipulating the ball
    if (isThrown) {
        //Giving the ball its trajectory, angle, and endpoint
        ball.x += ball.vx
        ball.y += ball.vy

        ball.vx = ball.speed * cos(radians(angleValue));
        ball.vy = ball.speed * sin(radians(angleValue));

        let ballEndPointX = ball.startX + powerValue * cos(radians(angleValue));
        let ballEndPointY = ball.startY + powerValue * sin(radians(angleValue));

        if (ball.x <= ballEndPointX) {
            ball.vx = 0;
            ball.vy = 0;
        }

        ball.size.w += ball.growthX;
        ball.size.h += ball.growthY;

        let d1 = dist(ball.startX, ball.startY, ballEndPointX, ballEndPointY)
        let d2 = dist(ball.x, ball.y, ball.startX, ball.startY)

        //Changing the ball's size
        if (d2 < d1/2) {
            ball.growthX = 0.6;
            ball.growthY = 0.3;
        }
        if (d2 > d1/2) {
            ball.growthX = -0.6;
            ball.growthY = -0.3;
        }

        if (ball.size.w <= ball.catchingSize.w && ball.size.w > ball.minSize.w) {
            isCatchable = true;
            console.log(`catchable`);
        }

        if (ball.size.w < ball.minSize.w) {
            ball.growthX = 0;
            ball.growthY = 0;
            isCatchable = false;
        }
    }
}

function keyPressed() {
    isThrown = true;
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
