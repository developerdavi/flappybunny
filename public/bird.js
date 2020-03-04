 class Bird {
  constructor(x,y,type,json) {
    this.X = x;
    this.Y = y;
    this.W = 64;
    this.H = 64;

    this.type = type

    this.GRAVITY = 0.81;

    this.speed = this.GRAVITY;
  }
  getJSON() {
    return this.net.toJSON()
  }
  getX() {
    return this.X - this.W/2
  }
  getY() {
    return this.Y - this.H/2
  }
  up() {
    this.speed = -10;
    this.Y -= 10;
  }
  think(pipeY) {
    let chances
    let difficulty = 30
    chances = [2 - (score / difficulty), 2 + (score / difficulty)]
    if (pipeY < this.Y - this.H * random(chances[0], chances[1])) {
      this.up()
    }
  }
  collide(closestX, closestBotY, closestTopY, testing) {
    if (testing) {
      return false
    }
    if (this.Y > 768 - this.H) {
        return true
    }
    if (this.X + this.W/2 >= closestX && this.X <= closestX + 100) {
      if ((this.Y + (this.H / 2)) < closestBotY && (this.Y - (this.H/2)) > closestTopY && this.Y < 670) {
        return false
      } else {
        return true
      }
    }
    return false
  }
  draw() {
    if (this.Y < 768 - this.H) {
      this.Y += this.speed;
      this.speed += this.GRAVITY;
    }
  }
}
