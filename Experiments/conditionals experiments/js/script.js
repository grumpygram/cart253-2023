let backgroundShade = 0;
let circle = {
    x: 0,
    y: 250,
    size: 100,
    speed: 2
}


function setup() {
    createCanvas(500, 500);
}



function draw() {
    background(backgroundShade);

    circle.x = circle.x + circle.speed;

    if (circle.x > width) {
        circle.speed = -circle.speed;
    }

    if (circle.x < 0) {
        circle.speed = -circle.speed;
    }

    ellipse(circle.x, circle.y, circle.size);
}