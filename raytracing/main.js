const canv = document.getElementById("game_canv")
const ctx = canv.getContext("2d")
const ray_test = []
const walls = []
let memory = []


let AnglesList = []
let X, Y;

canv.addEventListener("mousemove", evt => {
  memory = [evt.pageX, evt.pageY]
})

function setup() {
  for (let angle = 0; angle <= 360; angle += 1) {
    if(angle===270) continue
    ray_test.push(new Ray(1, angle))
  }

  // ray_test.push(new Ray(1, 1))
  // walls.push(new Wall(0, 0, 400, 400))
  // walls.push(new Wall(400, 400, 700, 0))
  // walls.push(new Wall(0, 500, 700, 500))

  for (let i = 0; i < 8; i++) {
    let randX_1 = Math.random() * WIDTH
    let randY_1 = Math.random() * HEIGHT

    let randX_2 = Math.random() * WIDTH
    let randY_2 = Math.random() * HEIGHT

    let wall = new Wall(randX_1, randY_1, randX_2, randY_2)
    wall.computeEquation()
    walls.push(wall)
  }
}



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

  ctx.fill = "black"
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  walls.forEach(wall => {
    wall.show()
  })

  ray_test.forEach(ray => {



    // console.log(chunks);

    ray.update(mouseX, mouseY, AnglesList)
    ray.show(walls)
  })

}






setup()
setInterval(draw, 20)