class Wall {
  constructor(initX, initY, endX, endY) {
    // y = mx + b
    this.m;
    this.b;
    this.initX = initX
    this.initY = initY
    this.endX = endX
    this.endY = endY

  }

  computeEquation() {
    this.m = (this.initY - this.endY) / (this.initX * this.endX)
    this.b = this.endY / (this.m * this.endX)
    if (this.m === Infinity || this.m == -Infinity) this.m = 1
    if (this.b === 0) this.b = 0
    console.log(`${this.m.toString().slice(0, 6)}x ${this.b >= 0 ? '+' : ''} ${this.b}`);
  }

  equation() {
    console.log(`${this.m.toString().slice(0, 5)}x ${(this.b >= 0) ? '+' : ''} ${this.b}`);
  }

  show() {
    line(this.initX, this.initY, this.endX, this.endY, "black", 6)
  }


}