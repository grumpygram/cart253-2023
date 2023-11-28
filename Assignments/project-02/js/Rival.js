class Rival {
    constructor(r, g, b) {
        this.position = 0;
        this.speed = random(1, 5);
        this.colour = {
            r,
            g,
            b
        };
        this.size = 100;

    }

    move() {
        this.position = this.position + this.speed;
    }

    display() {
        push();
        noStroke();
        fill(this.colour.r, this.colour.g, this.colour.b);
        ellipse(this.position % width, height/3, this.size);
        pop();
    }

    lapDone() {
        return this.position >= width;
    }
}