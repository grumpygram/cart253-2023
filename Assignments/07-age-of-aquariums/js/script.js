/**
 * Age of Aquariums
 * Graeme Peters
 * 
 * Hello, this is where I will be working on the Age of Aquariums
 * exercise for CART 253
 */

"use strict";

/*let fortunes = [
    `nice hair!`,
    `your bike will slide in the snow`,
    `happiness is not promised; create it yourself`,
    `life is better when shared with friends`
    `je t'aime <3 xoxo`
];
*/

let images = [1.5,1.75,2.25,2.75,3];
let displayImage;

function preload() {
    images[0] = loadImage(`assets/images/clown-0.png`);
    images[1] = loadImage(`assets/images/clown-1.png`);
    images[2] = loadImage(`assets/images/clown-2.png`);
    images[3] = loadImage(`assets/images/clown-3.png`);
    images[4] = loadImage(`assets/images/clown-4.png`);
    images[5] = loadImage(`assets/images/clown-5.png`);
    images[6] = loadImage(`assets/images/clown-6.png`);
    images[7] = loadImage(`assets/images/clown-7.png`);
    images[8] = loadImage(`assets/images/clown-8.png`);
    images[9] = loadImage(`assets/images/clown-9.png`);
}

function setup() {
    createCanvas(600, 600);

    displayImage = random(images);
}

function draw() {
    background(0);

    push();
    imageMode(CENTER);
    image(displayImage, width/2, height/2);
    pop();
}