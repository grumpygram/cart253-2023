class Grass {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 2;
        this.fill = {
            r: 0,
            g: 140,
            b: 20
        }
    }
    display() {
        push();
        noStroke();
        fill(this.fill.r, this.fill.g, this.fill.b);
        ellipse(this.x, this.y, this.size)
        pop();
    }
}