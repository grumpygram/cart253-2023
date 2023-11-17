/**
 * Make Some Noise
 * Graeme Peters
 * 
 * Hey this is my make some noise project!
 */

"use strict";

let oscillator;
let t = 0;

function setup() {
    createCanvas(600, 600);
    userStartAudio();

    oscillator = new p5.Oscillator(440, `sine`);
    oscillator.amp(0.2);
}

function draw() {
    background(0);

    let noiseValue = noise(t);
    let newFreq = map(noiseValue, 0, 1, 40, 2000);

    oscillator.freq(newFreq);
    t = t + 0.05;
}

function mousePressed() {
    oscillator.start();
    
}

function mouseReleased() {
    oscillator.stop();

}