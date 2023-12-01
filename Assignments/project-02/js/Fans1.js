class Fan1 {
    constructor(x, y, r, g, b) {
        this.x = x
        this.y = y
        this.size = 10
        this.fill = {
            r: r,
            g: g,
            b: b
        }
    }

    display() {
        push();
        noStroke();
        fill(this.fill.r, this.fill.g, this.fill.b);
        ellipse(this.x, this.y, this.size);
        pop();
    }
}