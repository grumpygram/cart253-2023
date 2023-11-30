class Teammate {

    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.speed = speed;
        this.acceleration = 0.1;
        this.jerseySize = {
            w: 15,
            h: 20,
            radius: 5
        };
        this.jerseyFill = {
            r: 135,
            g: 206,
            b: 235
        };
        this.helmetSize = 10
        this.helmetFill = {
            r: 0,
            g: 0,
            b: 200
        };
    }

    display() {
        push();
        stroke(0);
        fill(this.jerseyFill.r, this.jerseyFill.g, this.jerseyFill.b);
        ellipse(this.x, this.y, this.jerseySize.w, this.jerseySize.h, this.jerseySize.radius);
        fill(this.helmetFill.r, this.helmetFill.g, this.helmetFill.b);
        ellipse(this.x, this.y, this.helmetSize)
        pop();
    }

    chaseBall(ballEndPointX, ballEndPointY) {
        //Making the player a bit less predictable
        this.vx += this.speed;
        this.vy += this.speed;

        this.speed += this.acceleration;
        
        //Making the player move
        this.x += this.vx;
        this.y += this.vy;

        b


    }

    caught() {

    }

    
}