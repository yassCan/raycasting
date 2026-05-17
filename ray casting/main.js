const canv = document.getElementById("game_canv")
const ctx = canv.getContext("2d")
const ctx3D = render.getContext("2d")
const ray_test = []
const walls = []
const FOV = 40
const vision = []
let memory = [0,0]

function line2(x1, y1, x2, y2, color = "white", strokeWidth = 1) {
  ctx3D.strokeStyle = color;
  ctx3D.lineWidth = strokeWidth;
  ctx3D.beginPath();
  ctx3D.moveTo(x1, y1);
  ctx3D.lineTo(x2, y2);
  ctx3D.stroke();
}
let pX = 300
let pY = 300


const direction = {
  x: memory[0] - pX,
  y: memory[1] - pY
}



let AnglesList = []
let X, Y;

canv.addEventListener("mousemove", evt => {
  memory = [evt.pageX, evt.pageY]
})
let index = 0
function setup() {
  for (let angle = 60; angle <= 120; angle += 1) {
    vision.push(new Ray(1, angle, index))
    index += 1
  }

  // ray_test.push(new Ray(1, 1))
  // walls.push(new Wall(0, 0, 400, 400))
  // walls.push(new Wall(400, 400, 700, 0))
  // walls.push(new Wall(0, 500, 700, 500))
  const xoff = Math.random()*980 + 20
  const yoff = Math.random()*520 + 180
  let square = [
    new Wall(20 + xoff, 20 + yoff, 150 + xoff, 20 + yoff),
    new Wall(20 + xoff, 20 + yoff, 20 + xoff, 180 + yoff),
    new Wall(20 + xoff, 180 + yoff, 150 + xoff, 180 + yoff) ,
    new Wall(150 + xoff, 20 + yoff, 150 + xoff, 140 + yoff)
  ] 

  for(const side of square){
    side.computeEquation()
    walls.push(side)
  }

  for (let i = 0; i < 3; i++) {
    let randX_1 = Math.random() * WIDTH
    let randY_1 = Math.random() * HEIGHT

    let randX_2 = Math.random() * WIDTH
    let randY_2 = Math.random() * HEIGHT

    let wall = new Wall(randX_1, randY_1, randX_2, randY_2)
    wall.computeEquation()
    walls.push(wall)
  }
}

// add a keydown event listener to documentElement if left or right arrow add or sub 4 from the angle of each vision ray
document.documentElement.addEventListener("keydown", evt => {
  
  if (evt.key === "ArrowLeft") {  
    vision.forEach(ray => {
      ray.globalAngle += 4
      if(ray.globalAngle >= 360) ray.globalAngle -= 360
    })
  } else if (evt.key === "ArrowRight") {
    vision.forEach(ray => {
      ray.globalAngle -= 4
      if(ray.globalAngle < 0) ray.globalAngle += 360
    })
  }
})

function draw() {
  const [mouseX, mouseY] = memory;
  X = WIDTH - mouseX

  Y = HEIGHT - mouseY

  // chunks = {
  //   "first": 0,
  //   "second": 0,
  //   "thrid": 0,
  //   "frouth": 0,
  //   "fifth": 0,
  //   "sixth": 0,
  //   "seventh": 0,
  //   "eith": 0,
  // }

  AnglesList = [
    atan(mouseY / X) * 180 / Math.PI,
    atan(mouseY / mouseX) * 180 / Math.PI,
    atan(Y / mouseX) * 180 / Math.PI,
    atan(X / Y) * 180 / Math.PI
  ]

  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, WIDTH, HEIGHT)
  ctx3D.fillStyle = "black"
  ctx3D.fillRect(0, 0, WIDTH, HEIGHT)
  walls.forEach(wall => {
    wall.show()
  })

  vision.forEach(ray => {



    // console.log(chunks);

    ray.update(mouseX, mouseY, AnglesList)
    ray.show(walls)
  })

}






setup()
setInterval(draw, 10)