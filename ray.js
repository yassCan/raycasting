const offsetX = WIDTH / 2
const offsetY = HEIGHT / 2
const { sqrt, sin, cos, atan, abs } = Math
const toRad = deg => deg * Math.PI / 180

class Ray {
  constructor(angle, globalAngle, index) {
    this.initX = null;
    this.initY = null;
    this.angle = angle;
    this.globalAngle = Math.abs(globalAngle);
    this.rayIndex = index
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
    const R = 550
    const dx = this.vector.x - this.initX
    const dy = this.vector.y - this.initY
    const dist = sqrt(dx * dx + dy * dy) || 0.000001
    const endX = dist > R ? this.initX + (dx / dist) * R : this.vector.x
    const endY = dist > R ? this.initY + (dy / dist) * R : this.vector.y

    const memory = []
    this.m = memory
    let collisionPoint;
    walls.forEach(wall => {
      const pt = lineLine(endX, endY, this.initX, this.initY, wall.initX, wall.initY, wall.endX, wall.endY)
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



    


    if (!collisionPoint) {
      line(this.initX, this.initY, endX, endY, "white")
    }
    if (collisionPoint) {
      // console.log(this);
        // pt being intersection of a line with another line, give me the angular size of a point at pt supposing the angle is 60degrees and the distance is the distance between the ray and the point, then give me the height of a wall at that point, then draw a rect with that height at the position of the point
        // what is the distance from mouse to pt
      const dx_ = collisionPoint.intersectionX - this.initX
      const dy_ = collisionPoint.intersectionY - this.initY
      const dist_ = sqrt(dx_ * dx_ + dy_ * dy_) || 0.000001
      // tan(angle/2) = wallHeight/2 * distance
      // wallHeight = 2 * distance * tan(angle/2)
      const correctedDistance = dist_ * Math.cos(toRad(+this.globalAngle-playerAngle))
      const wallHeight = 50000 / correctedDistance
      
      ctx3D.fillStyle = `rgba(255, 255, 0, ${1 - correctedDistance / R})`
      ctx3D.strokeStyle = `black`
      // use line instead of rect to draw a line from the top of the wall to the bottom of the wall at the position of the point

      rect(-(this.rayIndex * 1000/300 - 500), -10, 1000/300, wallHeight, "lime")
      line(this.initX, this.initY, Math.floor(collisionPoint.intersectionX), Math.floor(collisionPoint.intersectionY), "white")

    }

  }
}