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
let circle1 = {
    x: 50,
    y: 50,
    size: 65,
    numMusicians: 8
}

//Variables for slots
let circle2 = {
    x: 550,
    y: 50,
    size: 68,
    numSlots: 8
}

//SETUP
function setup() {
    createCanvas(600, 600);

    userStartAudio();

//Adding slots and giving a new y each time
    for (let i = 0; i < circle2.numSlots; i++) {
        openings.push(new Slot(circle2.x, circle2.y, circle2.size));
        circle2.y = circle2.y + 70;
    }

//Adding players and giving a new y each time
    for (let i = 0; i < circle1.numMusicians; i++) {
        musicians.push(new Player(circle1.x, circle1.y, circle1.size));
        circle1.y = circle1.y + 50;
    }

//Assigning a sequential note to each player entity
    for (let i = 0; i < musicians.length; i++) {
        if (i<notes.length) {
            musicians[i].note = notes[i]
        }
        else {
            let j = i%notes.length
            musicians[i].note = notes[j]
        }

    }
}

//DRAW
function draw() {
    background(0);

//Displaying slots
    for (let i = 0; i < musicians.length; i++) {
        let slot = openings[i];
        slot.display();
    }

//Displaying player objects
    for (let i = 0; i < musicians.length; i++) {
        let player = musicians[i];
        player.display();
    }

//Making the players snap to the border of the slot
    for (let i = 0; i < musicians.length; i++) {
        for (let j=0;j<notes.length;j++){
            let player = musicians[i]
            let slot = openings[j]
    
            let d2 = dist(player.x, player.y, slot.x, slot.y);
    
            if (d2 < circle2.size/2) {
                player.inSlot = true;
                if (player.inSlot) {
                    player.x = slot.x;
                    player.y = slot.y;
                }
            }
    
            if (player.x === slot.x && player.y === slot.y) {
                playMusic(player)
            }

        }

    }
 

}



//Moving the players
function mouseDragged() {
    for (let i = 0; i < musicians.length; i++) {
        let player = musicians[i];
        player.move()
        if (player.inSlot) {
            player.x=mouseX;
            player.y=mouseY;
            player.inSlot = false;
        }
        
    }
}

function playMusic(player) {
   player.playNote = true;
   player.play()
}