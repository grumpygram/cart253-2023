class Slot {

    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.fill = 255;
    }

    display() {
        push();
        noStroke();
        fill(this.fill);
        ellipse(this.x, this.y, this.size);
        pop();
    }
}