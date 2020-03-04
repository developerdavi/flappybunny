class Pipe {
  constructor(x) {
    this.width = 100
    this.spacing = 200
    this.topY = Math.random() * 200 + 200
    this.botY = this.topY + this.spacing

    this.velocity = 5
    this.X = x
    this.out = false
  }
  draw() {
    strokeWeight(3)
    stroke('black')
    fill('#FFCC33')
    rect(this.X, 0, this.width, this.topY)
    rect(this.X, this.topY + this.spacing, this.width, 768)
    this.X -= this.velocity
  }
  outOfBounds() {
    return (this.X < (-this.width))
  }
  checkOut(x) {
    if (this.X + this.width < x) {
      this.out = true
    }
    return this.out
  }
  getX() {
    return this.X
  }
  getTopY() {
    return this.topY
  }
  getBotY() {
    return this.botY
  }
}
