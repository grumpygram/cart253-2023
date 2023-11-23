class Player {

    constructor (x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.fill = 255;

        this.synth = new p5.PolySynth();
        this.note;
    }

    display() {
        push();
        noStroke();
        fill(this.fill);
        ellipse(this.x, this.y, this.size);
        pop();
    }

    move() {
        let d = dist(this.x, this.y, mouseX, mouseY);
        if (d < this.size/2) {
            this.x = mouseX;
            this.y = mouseY;
        }
    }

    play() {
        this.synth.play(this.note, 0.4, 0, 0.1);
    }
}
