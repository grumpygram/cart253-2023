class Player {

    constructor (x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.fill = {
            r: 255,
            g: 0,
            b: 0

        };

        this.synth = new p5.PolySynth();
        this.note;
        this.playNote = false;
    }

    display() {
        push();
        noStroke();
        fill(this.fill.r, this.fill.g, this.fill.b);
        ellipse(this.x, this.y, this.size);
        pop();
    }

    move() {
        let d1 = dist(this.x, this.y, mouseX, mouseY);
        if (d1 < this.size/2) {
            this.x = mouseX;
            this.y = mouseY;
        }
    }

    play() {
        if (this.playNote = true) {
        this.synth.play(this.note, 0.4, 0, 0.1);
        }
    }
}
