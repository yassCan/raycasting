const offsetX = WIDTH / 2
const offsetY = HEIGHT / 2
const { sqrt, sin, cos, atan, abs } = Math
const toRad = deg => deg * Math.PI / 180

class Ray {
  constructor(angle, globalAngle) {
    this.initX = null;
    this.initY = null;
    this.angle = angle;
    this.globalAngle = globalAngle;
    this.vector = {}
  }

  update(mouseX, mouseY, AnglesList) {

    const theta = (this.globalAngle)
    const X = Math.abs(WIDTH - mouseX)
    const Y = Math.abs(HEIGHT - mouseY)


    const BETA = 0
    const BETA_1 = 1
    const BETA_2 = 2
    const BETA_3 = 3





    // Problem: JS uses Radians, the code is built with Degrees

    this.AnglesList = AnglesList


    const alpha = (180 - theta)
    const Phi = (90 - (270 - theta))
    const Phi_1 = (270 - theta)
    const Phi_2 = (90 - (360 - theta))
    const Phi_3 = (360 - theta)

    if (theta === 0) {
      this.vector.x = WIDTH
      this.vector.y = mouseY
    } else if (theta === 90) {
      this.vector.x = mouseX
      this.vector.y = 0
    } else if (theta === 180) {
      this.vector.x = 0
      this.vector.y = mouseY
    } else if (theta === 270) {
      this.vector.x = mouseX
      this.vector.Y = HEIGHT
    }

    if (cpr(0, theta, AnglesList[BETA])) {
      this.vector.y = mouseY - sin(toRad(theta)) * (X / cos(toRad(theta)))
      this.vector.x = WIDTH
    }
    if (cpr(AnglesList[BETA], theta, 90)) {
      this.vector.y = 0
      this.vector.x = mouseX + cos(toRad(theta)) * mouseY / sin(toRad(theta))
    }

    if (cpr(90, theta, (180) - AnglesList[BETA_1])) {
      this.vector.y = 0
      this.vector.x = mouseX - (cos(toRad(alpha)) * mouseY / sin(toRad(alpha)))
    }

    if (cpr((180) - AnglesList[BETA_1], theta, 180)) {
      this.vector.y = mouseY - sin(toRad(alpha)) * (mouseX / cos(toRad(alpha)))
      this.vector.x = 0
    }

    if (cpr(180, theta, (180) + AnglesList[BETA_2])) {
      this.vector.y = mouseY + sin(toRad(Phi)) * (mouseX / cos(toRad(Phi)))
      this.vector.x = 0
    }

    if (cpr((180) + AnglesList[BETA_2], theta, 270)) {
      this.vector.y = HEIGHT
      this.vector.x = mouseX - sin(toRad(Phi_1)) * (Y / cos(toRad(Phi_1)))
    }

    if (cpr(270, theta, (270) + AnglesList[BETA_3])) {
      this.vector.y = HEIGHT
      this.vector.x = mouseX + sin(toRad(Phi_2)) * (Y / cos(toRad(Phi_2)))
    }

    if (cpr((270) + AnglesList[BETA_3], theta, 360)) {
      this.vector.y = mouseY + sin(toRad(Phi_3)) * (X / cos(toRad(Phi_3)))
      this.vector.x = WIDTH
    }


    this.initX = mouseX
    this.initY = mouseY

  }





  show(walls) {
    // if(cpr(0, this.globalAngle, this.AnglesList[0])) line(this.initX, this.initY, this.vector.x, this.vector.y, "red")
    // if(cpr(this.AnglesList[0], this.globalAngle, 90)) line(this.initX, this.initY, this.vector.x, this.vector.y, "blue")
    // if(cpr(90, this.globalAngle, this.AnglesList[1])) line(this.initX, this.initY, this.vector.x, this.vector.y, "white")
    // @ts-check
    const memory = []
    this.m = memory
    let collisionPoint;
    walls.forEach(wall => {
      const pt = lineLine(this.vector.x, this.vector.y, this.initX, this.initY, wall.initX, wall.initY, wall.endX, wall.endY)
      if (pt) memory.push(pt)
    })

    // memory.forEach(inter => {
    //   line(0, 0, inter.intersectionX, inter.intersectionY)
    // })
    // console.log(memory.length);
    if (memory.length > 1) {
      let init = 0
      for (let i = 0; i < memory.length; i++) {
        if (i == init) continue
        const H = sqrt(abs(memory[init].intersectionX - this.initX) ** 2 + abs(memory[init].intersectionY - this.initY) ** 2)
        const H_1 = sqrt(abs(memory[i].intersectionX - this.initX) ** 2 + abs(memory[i].intersectionY - this.initY) ** 2)
        if (H < H_1) continue
        init = i
      }
      collisionPoint = memory[init]
    } else {
      collisionPoint = memory[0]
    }


    if (!collisionPoint) line(this.initX, this.initY, this.vector.x, this.vector.y, "white")
    if (collisionPoint) {
      line(this.initX, this.initY, Math.floor(collisionPoint.intersectionX), Math.floor(collisionPoint.intersectionY))
    }

  }
}