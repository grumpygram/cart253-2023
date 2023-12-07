class Camera {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 1;
        this.growthRate = 4
        this.maxSize = 20;
    }

    display() {
        this.size += this.growthRate;
        
        if (this.size >= this.maxSize) {
            this.growthRate = -this.growthRate;
        }

        push();
        fill(255);
        noStroke();
        ellipse(this.x, this.y, this.size)
        pop();
    }
}