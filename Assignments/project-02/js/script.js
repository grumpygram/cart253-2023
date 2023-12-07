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
    x: 500,
    y: 350,
    size: {
        w: 650, 
        h: 370
    }
}
let endzone1 = {
    x: 135,
    y: 350,
    size: {
        w: 80,
        h: 370
    },
    fill: {
        r: 20,
        g: 80,
        b: 200
    }
}
let endzone2 = {
    x: 865,
    y: 350,
    size: {
        w: 80,
        h: 370
    },
    fill: {
        r: 200,
        g: 80,
        b: 20
    }
}
let goalpost1 = {
    x: 170,
    y: 350,
    size: {
        w: 5,
        h: 70
    }
}
let goalpost2 = {
    x: 830,
    y: 350,
    size: {
        w: 5,
        h: 70
    }
}
let lawn = [];
let grassStuff = {
    x: 0,
    y: 0,
    numGrass: 2000
}
let bleachers1 = {
    x: 500,
    y: 625, 
    size: {
        w: 1000,
        h: 130
    },
    fill: {
        r: 50,
        g: 0,
        b: 0
    }
}
let bleachers2 = {
    x: 500,
    y: 75, 
    size: {
        w: 1000,
        h: 130
    },
    fill: {
        r: 50,
        g: 0,
        b: 0
    }
}
let fans1 = [];
let fans2 = [];
let fanStuff = {
    x: 0,
    y: 0,
    numFans: 500, 
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
let cheers;
let boos;
let crowd;

let cameraFlashes = [];
let cameraRules = {
    x: undefined,
    y: undefined,
    numCameras: 20
}

//Power stuff
let powerValue;
let powerBar = {
    x: 920,
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
    centerX: 825,
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
    startX: 825,
    startY: 350,
    x: 825,
    y: 350,
    vx: 0,
    vy: 0,
    speed: 3,
    fill: {
        r: 155,
        g: 85,
        b: 35
    },
    size: {
        w: 12,
        h: 6
    },
    growthX: 0,
    growthY: 0,
    catchingSize: {
        w: 20,
        h: 10,
    },
    minSize: {
        w: 10, 
        h: 5
    },
    isCatchable: false,
    isCaughtGood: false,
    isCaughtBad: false
}

let isThrown = false;

//The teammates
let team = [];
let teamRules = {
    numPlayers: 11,
    x: 800,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0
}

//The other team
let opponents = [];
let opponentRules = {
    numPlayers: 11,
    x: 780,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0
}

let footballFont;
let messages = {
    opacity: 255,
    fadeRate: 5
}

//Preload
function preload() {
    footballFont = loadFont(`assets/fonts/AtlantaCollegeRegular-1Gva2.ttf`)
    crowd = loadSound(`assets/sounds/crowd-noise.mp3`)
    //crowd.rate(1);
    boos = loadSound(`assets/sounds/outrage.mp3`)
   // boos.rate(1)
    cheers = loadSound(`assets/sounds/happiness.mp3`)
   // cheers.rate(1)
}

//Setup
function setup() {
    createCanvas(1000, 700); //Football field would be around 700 x 370 px
    //Also, 22 players per football team

    //Generating blue team
    for (let i = 0; i < teamRules.numPlayers; i++) {
        teamRules.y = random(165, 535);
        teamRules.vx = random(-0.5, -2.5);
        teamRules.vy = random(-0.5, 0.5);
        team.push(new Teammate(teamRules.x, teamRules.y, teamRules.vx, teamRules.vy))
    }
    //Generating red players
    for (let i = 0; i < opponentRules.numPlayers; i++) {
        opponentRules.y = random(165, 535);
        opponentRules.vx = random(-0.5, -2.5);
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
        fanStuff.x = random(0, 1000);
        fanStuff.y = random(bleachers1.y + bleachers1.size.h/2, bleachers1.y - bleachers1.size.h/2);
    }
    for (let i = 0; i < fanStuff.numFans; i++) {
        fans2.push(new Fan1(fanStuff.x, fanStuff.y, fanStuff.fill2.r, fanStuff.fill2.g, fanStuff.fill2.b));
        fanStuff.x = random(0, 1000);
        fanStuff.y = random(bleachers2.y + bleachers2.size.h/2, bleachers2.y - bleachers2.size.h/2);
    }
    userStartAudio();
}


function draw() {
    frameRate(45);
    background(0, 200, 0);

    //Field
    push();
    rectMode(CENTER);
    noFill();
    stroke(255);
    strokeWeight(2);
    rect(fieldOfPlay.x, fieldOfPlay.y, fieldOfPlay.size.w, fieldOfPlay.size.h);
    pop();
    for (let i = 0; i < lawn.length; i++) {
        let grass = lawn[i];
        grass.display();
    };
    //Endzone 1
    push();
    fill(endzone1.fill.r, endzone1.fill.g, endzone1.fill.b);
    rectMode(CENTER);
    stroke(255);
    strokeWeight(2);
    rect(endzone1.x, endzone1.y, endzone1.size.w, endzone1.size.h);
    pop();
    //Endzone 2
    push();
    fill(endzone2.fill.r, endzone2.fill.g, endzone2.fill.b);
    rectMode(CENTER);
    stroke(255);
    strokeWeight(2);
    rect(endzone2.x, endzone2.y, endzone2.size.w, endzone2.size.h);
    pop();
    //Goalposts
    push();
    stroke(0);
    fill(255);
    rectMode(CENTER);
    rect(goalpost1.x, goalpost1.y, goalpost1.size.w, goalpost1.size.h);
    ellipse(goalpost1.x, goalpost1.y + goalpost1.size.h/2 - 3, goalpost1.size.w + 2);
    ellipse(goalpost1.x, goalpost1.y - goalpost1.size.h/2 + 3, goalpost1.size.w + 2);
    rect(goalpost2.x, goalpost2.y, goalpost2.size.w, goalpost2.size.h);
    ellipse(goalpost2.x, goalpost2.y + goalpost2.size.h/2 - 3, goalpost2.size.w + 2);
    ellipse(goalpost2.x, goalpost2.y - goalpost2.size.h/2 + 3, goalpost2.size.w + 2);
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
        goodGuys();
        badGuys();
        chuck();
    }
}

//Title screen
function title() {
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
    fill(255, 255, 0);
    stroke(0);
    strokeWeight(5);
    text(round(powerValue), 850, 350);
    pop();
}

//Check power function
function checkPower() {
    powerValue = round(powerValue);
    console.log(powerValue);
}

//Angle function
function angle() {
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
    angleValue = angleArrow.angle;
    console.log(angleValue);
}

//Throwing function
function chuck() {
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
    if (isThrown === true) {
        if (ball.isCaughtGood === false && ball.isCaughtBad === false){

            
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
            if (ball.size.w <= ball.catchingSize.w && ball.size.w > ball.minSize.w && d2 > d1/2) {
                ball.isCatchable = true;
            }
            else {
                ball.isCatchable = false;
            }

            if (ball.size.w < ball.minSize.w) {
                ball.growthX = 0;
                ball.growthY = 0;
                playFans(0);
            }

            //Out of bounds
            if (ball.y > fieldOfPlay.y + fieldOfPlay.size.h/2) {
                push();
                const textColour = color(255, 255, 255);
                textColour.setAlpha(128 + 128 * sin (millis()/200));
                textSize(105)
                textAlign(CENTER);
                fill(textColour);
                textFont(footballFont);
                text(`Out Of Bounds`, width/2, height/2 + 30);
                pop();
            }
            if (ball.y < fieldOfPlay.y - fieldOfPlay.size.h/2) {
                push();
                const textColour = color(255, 255, 255);
                textColour.setAlpha(128 + 128 * sin (millis()/200));
                textSize(105)
                textAlign(CENTER);
                fill(textColour);
                textFont(footballFont);
                text(`Out Of Bounds`, width/2, height/2 + 30);
                pop();
            }
        }
        if (ball.isCaughtGood){
            starplayer.speed = 0;
            starplayer.vy = 0;
            ball.x=starplayer.x
            ball.y=starplayer.y-8
        }
        if (ball.isCaughtBad){
            starrival.speed = 0;
            starrival.vy = 0;
            ball.x=starrival.x
            ball.y=starrival.y-8
        }
        //Touchdown
        if (ball.x <= fieldOfPlay.x - fieldOfPlay.size.w/2) {
            push();
            const textColour = color(255, 255, 255);
            textColour.setAlpha(128 + 128 * sin (millis()/400));
            textSize(105)
            textAlign(CENTER);
            fill(textColour);
            textFont(footballFont);
            text(`TOUCHDOWN!!!`, width/2, height/2 + 30);
            pop();
            playFans(1);
            

            //Cameras
            for (let i = 0; i < cameraRules.numCameras; i++) {
                cameraFlashes.push(new Camera(cameraRules.x, cameraRules.y));
            }
            for (let i = 0; i < cameraRules.numCameras; i++) {
                let camera = cameraFlashes[i];
                camera.x = random(bleachers1.x - bleachers1.size.w/2 + 5, bleachers1.x + bleachers1.size.w/2 - 5);
                camera.y = random(bleachers1.y - bleachers1.size.h/2, bleachers1.y + bleachers1.size.h/2 - 5);
                camera.display();
            }
        }

        //Other team cameras
        if (ball.x > fieldOfPlay.x + fieldOfPlay.size.w/2) {
            for (let i = 0; i < cameraRules.numCameras; i++) {
                cameraFlashes.push(new Camera(cameraRules.x, cameraRules.y));
            }
            for (let i = 0; i < cameraRules.numCameras; i++) {
                let camera = cameraFlashes[i];
                camera.x = random(bleachers2.x - bleachers2.size.w/2 + 5, bleachers2.x + bleachers2.size.w/2 - 5);
                camera.y = random(bleachers2.y - bleachers2.size.h/2, bleachers2.y + bleachers2.size.h/2 - 5);
                camera.display();
            }
        }  
    }
}

function playFans(state){
    if (state==1){
        if (cheers.isPlaying()){
            return;
        }else{
            crowd.stop()
            cheers.loop()
        }
        
    }else{
        if (boos.isPlaying()){
            return;
        }else{
            crowd.stop()
            boos.loop();
        }
        
    }
}
let starplayer;
let starplayer_idx=1000;
let starplayer_vx;
let starplayer_x;
let starplayer_y;
//Function for the good guys to chase and receive the ball
function goodGuys() {
    
    for (let i = 0; i < team.length; i++) {
        let player = team[i]
        player.display();
        if (starplayer_idx != i){
            player.chaseBall(ball.x, ball.y, fieldOfPlay.y, fieldOfPlay.size.h);;
        }else if (ball.isCaughtGood){
            player.vx = starplayer_vx;
            player.x  += starplayer.vx;
            tackle();
        }
       
    }

    for (let i = 0; i < team.length; i++) {
            let player = team[i]
            starplayer_x = player.x;
            starplayer_y = player.y;
        let d1 = dist(player.x , player.y , ball.x , ball.y)
        if (d1 < 25 && ball.isCatchable === true && ball.isCaughtGood === false && ball.isCaughtBad === false) {

            ball.isCaughtGood = true;
            ball.isCatchable = false;
            starplayer = player
            starplayer_idx = i;
            starplayer_vx = player.vx
        }
    }
}
let starrival;
let starrival_idx = 1000;
let starrival_vx;
let starrival_vy;

//Function for the opponents to chase and receive the ball
function badGuys() {
        
    for (let i = 0; i < opponents.length; i++) {
        let rival = opponents[i]
        rival.display();
        if (starrival_idx != i){
            rival.chaseBall(ball.x, ball.y, fieldOfPlay.y, fieldOfPlay.size.h);;
        }else if (ball.isCaughtBad){
            rival.vx = starrival_vx;
            rival.x  += starrival.vx;
        }
       
    }

    for (let i = 0; i < opponents.length; i++) {
            let rival = opponents[i]
        let d1 = dist(rival.x , rival.y , ball.x , ball.y)
        if (d1 < 25 && ball.isCatchable === true && ball.isCaughtGood === false && ball.isCaughtBad === false) {

            ball.isCaughtBad = true;
            ball.isCatchable = false;
            starrival = rival;
            starrival_idx = i;
            starrival_vx = -rival.vx
        }
        if (ball.isCaughtBad) {
            playFans(0)
            push();
            const textColour = color(255, 255, 255);
            textColour.setAlpha(128 + 128 * sin (millis()/200));
            textSize(105)
            textAlign(CENTER);
            fill(textColour);
            textFont(footballFont);
            text(`Intercepted`, width/2, height/2 + 30);
            pop();
        }
    }
}

let isTackled = false;

function tackle() {
    for (let i = 0; i < opponents.length; i++) {
        for (let j = 0; j < team.length; j++) {
        let rival = opponents[i];
        let player = team[j];
        let d1 = dist(rival.x, rival.y, starplayer_x, starplayer_y) 

        if (d1 < 7 && isTackled === false) {
            starplayer_vx = 0;
            console.log("tackled");
            isTackled = true;
            return
        }
        if (isTackled) {
            rival.vx = rival.vx/1.0002;
            rival.vy = rival.vy/1.0002;
            player.vx = player.vx/1.0002;
            player.vy = player.vy/1.0002;
            ball.y = starplayer.y - 15;
            ball.x = starplayer.x - 15;
            playFans(0)
            push();
            const textColour = color(255, 255, 255);
            textColour.setAlpha(128 + 128 * sin (millis()/200));
            textSize(60)
            textAlign(CENTER);
            fill(textColour);
            textFont(footballFont);
            text(`Press ENTER to continue`, width/2, height/2 + 30);
            pop();
        }
    }
}
}


//MousePressed
function mousePressed() {
    if (state === `title`) {
        state = `powerSelector`
        crowd.loop();
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

function keyPressed() {
    if (state === `chuckin'` && keyCode === ENTER) {
        state = `powerSelector`
        chuck.reset();
    }
}