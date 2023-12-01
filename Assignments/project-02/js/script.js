/**
 * Throw Hard
 * Graeme Peters
 * 
 * Game where you choose the angle and power of a ball, then your players catch it and score a touchdown
 */

"use strict";

let state = `title`;

//Field
let fieldOfPlay = {
    x: 350,
    y: 350,
    size: {
        w: 650, 
        h: 370
    }
}
let lawn = [];
let grassStuff = {
    x: 0,
    y: 0,
    numGrass: 600
}
let bleachers1 = {
    x: 350,
    y: 625, 
    size: {
        w: 700,
        h: 140
    },
    fill: {
        r: 200,
        g: 0,
        b: 0
    }
}
let bleachers2 = {
    x: 350,
    y: 75, 
    size: {
        w: 700,
        h: 140
    },
    fill: {
        r: 200,
        g: 0,
        b: 0
    }
}
let fans1 = [];
let fans2 = [];
let fanStuff = {
    x: 0,
    y: 0,
    numFans: 300, 
    fill1: {
        r: 135,
        g: 206,
        b: 235
    },
    fill2: {
        r: 255,
        g: 114,
        b: 118
    }
}

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
    speed: 3,
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
    },
    isCatchable: false,
    isCaught: false
}


let isThrown = false;

//The teammates
let team = [];
let teamRules = {
    numPlayers: 11,
    x: 520,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0
}

//The other team
let opponents = [];
let opponentRules = {
    numPlayers: 11,
    x: 510,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0
}

let footballFont;

function preload() {
    footballFont = loadFont(`assets/fonts/AtlantaCollegeRegular-1Gva2.ttf`)

}

//Setup
function setup() {
    createCanvas(700, 700); //Football field would be around 700 x 370 px
    //Also, 22 players per football team

    //Generating blue team
    for (let i = 0; i < teamRules.numPlayers; i++) {
        teamRules.y = random(165, 535);
        teamRules.vx = random(-0.5, -2);
        teamRules.vy = random(-0.5, 0.5);
        team.push(new Teammate(teamRules.x, teamRules.y, teamRules.vx, teamRules.vy))
    }
    //Generating red players
    for (let i = 0; i < opponentRules.numPlayers; i++) {
        opponentRules.y = random(165, 535);
        opponentRules.vx = random(-0.5, -2);
        opponentRules.vy = random(-0.5, 0.5);
        opponents.push(new Opponent(opponentRules.x, opponentRules.y, opponentRules.vx, opponentRules.vy))
    }
    //Generating grass
    for (let i = 0; i < grassStuff.numGrass; i++) {
        lawn.push(new Grass(grassStuff.x, grassStuff.y));
        grassStuff.x = random(0, width);
        grassStuff.y = random(0, height);
    }
    //Generating red fans
    for (let i = 0; i < fanStuff.numFans; i++) {
        fans1.push(new Fan1(fanStuff.x, fanStuff.y, fanStuff.fill1.r, fanStuff.fill1.g, fanStuff.fill1.b));
        fanStuff.x = random(0, 700);
        fanStuff.y = random(0, 145);
    }
    for (let i = 0; i < fanStuff.numFans; i++) {
        fans2.push(new Fan1(fanStuff.x, fanStuff.y, fanStuff.fill2.r, fanStuff.fill2.g, fanStuff.fill2.b));
        fanStuff.x = random(0, 700);
        fanStuff.y = random(555, 700);
    }
}


function draw() {
    background(0, 200, 0);

    push();
    rectMode(CENTER);
    noFill();
    stroke(255);
    strokeWeight(2);
    rect(fieldOfPlay.x, fieldOfPlay.y, fieldOfPlay.size.w, fieldOfPlay.size.h);
    pop();

    if (state === `title`) {
        title();
    }
    if (state === `powerSelector`) {
        power();
    }
    if (state === `angleSelector`) {
        angle();
    }
    if (state === `chuckin'`) {
        chuck();
        goodGuys();
        badGuys();
    }
}

//Title screen
function title() {
    for (let i = 0; i < lawn.length; i++) {
        let grass = lawn[i];
        grass.display();
    };
    push();
    textSize(115)
    textAlign(CENTER);
    fill(255);
    textFont(footballFont);
    text(`TOUCHDOWN`, width/2, height/2 + 30);
    pop();
}

//Function for the power bar
function power() {
    //Cosmetics
    for (let i = 0; i < lawn.length; i++) {
        let grass = lawn[i];
        grass.display();
    };
    push();
    fill(bleachers1.fill.r, bleachers1.fill.g, bleachers1.fill.b)
    rectMode(CENTER);
    rect(bleachers1.x, bleachers1.y, bleachers1.size.w, bleachers1.size.h);
    pop();
    push();
    fill(bleachers2.fill.r, bleachers2.fill.g, bleachers2.fill.b)
    rectMode(CENTER);
    rect(bleachers2.x, bleachers2.y, bleachers2.size.w, bleachers2.size.h);
    pop();
    for (let i = 0; i < fans1.length; i++) {
        let goodFans = fans1[i];
        goodFans.display();
    }    
    for (let i = 0; i < fans2.length; i++) {
        let badFans = fans2[i];
        badFans.display();
    }

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
    for (let i = 0; i < lawn.length; i++) {
        let grass = lawn[i];
        grass.display();
    };
    push();
    fill(bleachers1.fill.r, bleachers1.fill.g, bleachers1.fill.b)
    rectMode(CENTER);
    rect(bleachers1.x, bleachers1.y, bleachers1.size.w, bleachers1.size.h);
    pop();
    push();
    fill(bleachers2.fill.r, bleachers2.fill.g, bleachers2.fill.b)
    rectMode(CENTER);
    rect(bleachers2.x, bleachers2.y, bleachers2.size.w, bleachers2.size.h);
    pop();
    for (let i = 0; i < fans1.length; i++) {
        let goodFans = fans1[i];
        goodFans.display();
    }
    for (let i = 0; i < fans2.length; i++) {
        let badFans = fans2[i];
        badFans.display();
    }

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
    for (let i = 0; i < lawn.length; i++) {
        let grass = lawn[i];
        grass.display();
    };
    push();
    fill(bleachers1.fill.r, bleachers1.fill.g, bleachers1.fill.b)
    rectMode(CENTER);
    rect(bleachers1.x, bleachers1.y, bleachers1.size.w, bleachers1.size.h);
    pop();
    push();
    fill(bleachers2.fill.r, bleachers2.fill.g, bleachers2.fill.b)
    rectMode(CENTER);
    rect(bleachers2.x, bleachers2.y, bleachers2.size.w, bleachers2.size.h);
    pop();
    for (let i = 0; i < fans1.length; i++) {
        let goodFans = fans1[i];
        goodFans.display();
    }
    for (let i = 0; i < fans2.length; i++) {
        let badFans = fans2[i];
        badFans.display();
    }

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

        let ballEndPointX = ball.startX + powerBar.height * cos(radians(angleValue));
        let ballEndPointY = ball.startY + powerBar.height * sin(radians(angleValue));

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

        //Defining when the ball is catchable
        if (ball.size.w <= ball.catchingSize.w && ball.size.w > ball.minSize.w) {
            ball.isCatchable = true;
        }
        else {
            ball.isCatchable = false;
        }

        if (ball.size.w < ball.minSize.w) {
            ball.growthX = 0;
            ball.growthY = 0;
        }
    }
}

//Function for the good guys to chase and receive the ball
function goodGuys() {
    for (let i = 0; i < team.length; i++) {
        let player = team[i]
        player.display();
        player.chaseBall(ball.x, ball.y, fieldOfPlay.x, fieldOfPlay.size.w, fieldOfPlay.size.h);
    }

    for (let i = 0; i < team.length; i++) {
            let player = team[i]
        let d1 = dist(player.x , player.y , ball.x , ball.y)
        if (d1 < 20 && ball.isCatchable === true) {
            player.speed = 0;
            player.vy = 0;
            ball.isCatchable = false;
            ball.x = player.x;
            ball.y = player.y;
            ball.vx = player.vx;
            ball.growthX = 0;
            ball.growthY = 0;
            return;
        }
    }
}

//Function for the opponents to chase and receive the ball
function badGuys() {
    for (let i = 0; i < opponents.length; i++) {
        let player = opponents[i]
        player.display();
        player.chaseBall(ball.x, ball.y, fieldOfPlay.x, fieldOfPlay.size.w, fieldOfPlay.size.h);
    }
    for (let i = 0; i < opponents.length; i++) {
        let player = opponents[i]
        let d1 = dist(player.x , player.y , ball.x , ball.y)
        if (d1 < 20 && ball.isCatchable === true) {
            player.speed = 0;
            player.vy = 0;
            player.vx = teamRules.vx * -1;
            ball.isCatchable = false;
            ball.x = player.x;
            ball.y = player.y;
            ball.vx = player.vx;
            ball.growthX = 0;
            ball.growthY = 0;
            return;
        }
    }
}

//MousePressed
function mousePressed() {
    if (state === `title`) {
        state = `powerSelector`
        return;
    }
    if (state === `powerSelector`) {
        checkPower()
        state = `angleSelector`;
        return;
    }
    if (state === `angleSelector`) {
        checkAngle()
        isThrown = true;
        state = `chuckin'`
        return;
    }
}
