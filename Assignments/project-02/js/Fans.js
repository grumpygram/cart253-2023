class Fan1 {
    constructor() {
        this.x = x
        this.y = y
        this.size = 10
        this.fill = {
            r: 135,
            g: 206,
            b: 235
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