class UserRacer {
    constructor() {
        this.position = 0;
        this.speed = 0;
        this.colour = {r: 0, g: 0, b: 255};
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

    accelerate() {
        this.speed = this.speed + 3;
    }
}