const canv = document.getElementById("game_canv")
const ctx = canv.getContext("2d")
const ctx3D = render.getContext("2d")
const ray_test = []
const walls = []
const FOV = 40
const vision = []
let keys = {}
let memory = [0,0]
let playerAngle = 37.5
let count = 0
let isHidden = false
canv.onclick = evt => {
  count++
  const rect = canv.getBoundingClientRect()
  const mouseX = evt.clientX - rect.left
  const mouseY = evt.clientY - rect.top
  console.log(count, pointMemory);
  if (count % 2 == 0 && pointMemory.length != 0) {
    const wall = new Wall(pointMemory[0].x, pointMemory[0].y, mouseX, mouseY)
    wall.computeEquation()
    walls.push(wall)
    pointMemory.pop()
    return
  }
  pointMemory[0] = { x: mouseX, y: mouseY }
}

function hide() {
  if(isHidden) {
    canv.style.transform = "translate(0%, 0%) scale(1)"
    canv.style.position = "relative"
    isHidden = false
    return
  }
  canv.style.transform = "translate(-500%, 50%) scale(0)"
  canv.style.position = "absolute"
  isHidden = true
}

let pX = 300
let pY = 300


const direction = {
  x: memory[0] - pX,
  y: memory[1] - pY
}


let AnglesList = []
let X, Y;
render.addEventListener("click", async evt => {
  await render.requestPointerLock()
})
render.addEventListener("mousemove", evt => {
  const cx = -evt.movementX



  // Map horizontal mouse position to playerAngle (0..360)
  playerAngle += cx

  for(let i = 0; i < vision.length; i++) {

    vision[i].globalAngle += cx
    if (vision[i].globalAngle >= 360) vision[i].globalAngle -= 360
    if (vision[i].globalAngle < 0) vision[i].globalAngle += 360
  }

  // Recenter vision rays around playerAngle using FOV
 
})

let index = 0
function setup() {
  for (let angle = 0; angle <= 300; angle += 1) {
    vision.push(new Ray(1, angle/4, index))
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
  let square2 =  [
    new Wall(20 + xoff*2, 20 + yoff, 150 + xoff*2, 20 + yoff),
    new Wall(20 + xoff*2, 20 + yoff, 20 + xoff*2, 180 + yoff),
    new Wall(20 + xoff*2, 180 + yoff, 150 + xoff*2, 180 + yoff) ,
    new Wall(150 + xoff*2, 20 + yoff, 150 + xoff*2, 140 + yoff)
  ] 

 
  // add walls that are the edges of the canvas
  walls.push(new Wall(0, 0, WIDTH, 0))
  walls.push(new Wall(WIDTH, 0, WIDTH, HEIGHT))
  walls.push(new Wall(0, HEIGHT, WIDTH, HEIGHT))
  walls.push(new Wall(0, 0, 0, HEIGHT))

 
}
window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
    console.log(e.key);
});

window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});
// add a keydown event listener to documentElement if left or right arrow add or sub 4 from the angle of each vision ray
// document.documentElement.addEventListener("keydown", evt => {
//   // update px and py with w,a,s,d keys with a speed of 4 units
//   if (evt.key === "w") {
//     pY -= 4
//   } else if (evt.key === "s") {
//     pY += 4
//   } else if (evt.key === "a") {
//     pX -= 4
//   } else if (evt.key === "d") {
//     pX += 4
//   }

//   if (evt.key === "ArrowLeft") {  
//     playerAngle += 4
//     if(playerAngle >= 360) playerAngle -= 360

//     vision.forEach(ray => {
//       ray.globalAngle += 4
//       console.log('once');
      
//       if(ray.globalAngle >= 360) ray.globalAngle -= 360
//     })
//   } else if (evt.key === "ArrowRight") {
//     playerAngle -= 4
//     if(playerAngle < 0) playerAngle += 360
//     vision.forEach(ray => {
//       ray.globalAngle -= 4
//       if(ray.globalAngle < 0) ray.globalAngle += 360
//     })
//   }
// })

function draw() {
  const [mouseX, mouseY] = [pX, pY];
  X = WIDTH - mouseX

  Y = HEIGHT - mouseY
  let speed = 1

  if (keys["Shift"]) {
    speed *= 3
    console.log(speed);
    
  } else if (keys["Shift"] == false) {
    speed = 1
  }
 
  // use the keys object to update px and py with w,a,s,d keys with a speed of 4 units
  if (keys["w"]) {
    pY += Math.sin(toRad(-playerAngle)) * speed
    pX += Math.cos(toRad(-playerAngle)) * speed
    
  }  if (keys["s"]) {
    pY -= Math.sin(toRad(-playerAngle)) * speed
    pX -= Math.cos(toRad(playerAngle)) * speed
    //
  }  if (keys["a"]) {
    pY += Math.sin(toRad(-playerAngle - 90)) * speed
    pX += Math.cos(toRad(-playerAngle - 90)) * speed
  }  if (keys["d"]) {
    pY += Math.sin(toRad(-playerAngle + 90)) * speed
    pX += Math.cos(toRad(-playerAngle + 90))  * speed
  } 
  // use the keys object to update playerAngle with left and right arrow keys with a speed of 4 units
  if (keys["ArrowLeft"]) {
    playerAngle += 4
    vision.forEach(ray => {
      ray.globalAngle += 4
      if (ray.globalAngle >= 360) ray.globalAngle -= 360
    })
  } else if (keys["ArrowRight"]) {
    playerAngle -= 4
    vision.forEach(ray => {
      ray.globalAngle -= 4
      if (ray.globalAngle < 0) ray.globalAngle += 360
    })
  }

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
