/**
 * Make Some Noise 
 * Graeme Peters
 * 
 * This is an exercise where the user will be able to pick up and 
 * move notes to have them begin playing.
 */

"use strict";

//Array of musicians
let musicians = [];

//Array of slots
let openings = [];

//Array of notes
let notes = [`F3`, `G3`, `Ab4`, `Bb4`, `C4`, `Db4`, `Eb4`, `F4`];

//Variables for my musicians
let circle = {
    x: 50,
    y: 50,
    size: 65,
    numMusicians: 8
}

//Variables for slots
let slot = {
    x: 550,
    y: 50,
    size: 68,
    numSlots: 8
}

//SETUP
function setup() {
    createCanvas(600, 600);

    userStartAudio();

//Adding players and giving a new y each time
    for (let i = 0; i < circle.numMusicians; i++) {
        musicians.push(new Player(circle.x, circle.y, circle.size));
        circle.y = circle.y + 50;
    }

//Adding slots and giving a new y each time
    for (let i = 0; i < slot.numSlots; i++) {
        openings.push(new Slot(slot.x, slot.y, slot.size));
        slot.y = slot.y + 70;
    }

//Assigning a sequential note to each player entity
    for (let i = 0; i < musicians.length; i++) {
        for (let j = 0; j < notes.length; j++) {
            if (j = notes.length) {
                musicians[i].note = notes[j];
            }
        }
    }
}

//DRAW
function draw() {
    background(0);

//Displaying player objects
    for (let i = 0; i < musicians.length; i++) {
        let player = musicians[i];
        player.display();
    }
    for (let i = 0; i < musicians.length; i++) {
        let slot = openings[i];
        slot.display();
    }
}

function mouseDragged() {
    for (let i = 0; i < musicians.length; i++) {
        let player = musicians[i];
        player.move();
    }

    
}