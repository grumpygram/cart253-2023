class Musician {

    constructor (x, y, note) {
        this.x = x;
        this.y = y;
        this.size = 100;
        this.fill = musicianFill;

    //synth
    this.note = note;
    this.vel = vel;
    this.dur = dur;
    this.synth = new p5.PolySynth();
    }

    move() {
        x = mouseX;
        y = mouseY;
    }
    
    playNote() {
        this.synth.play(this.note, this.vel, 0, this.dur);
    }

    display() {
        push();
        noStroke();
        fill(this.fill);
        ellipse(this.x, this.y, this.size);
        pop();
    }
}