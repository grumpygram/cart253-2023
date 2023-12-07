class Teammate {

    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.ax;
        this.ay;
        this.speed = 0.005;

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

    chaseBall(ballX, ballY, fieldY, fieldHeight) {

        //Changing the ax and ay
        if (ballX > this.x) {
            this.ax = this.speed;
        }
        if (ballX < this.x) {
            this.ax = -this.speed;
        }
        if (ballY > this.y) {
            this.ay = this.speed;
        }
        if (ballY < this.y) {
            this.ay = -this.speed;
        }

        //Making it not go out of bounds
        if (this.y > fieldY + fieldHeight/2) {
            this.vy = this.vy * -1
        }
        if (this.y < fieldY - fieldHeight/2) {
            this.vy = this.vy * -1
        }

        //Making the player a bit less predictable
        this.vx += this.ax;
        this.vy += this.ay;

        //Changing the player's x and y
        this.x += this.vx;
        this.y += this.vy;
    }
}