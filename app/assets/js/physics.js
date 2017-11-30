let moon = new physics.Object({
  mass: 1,
  velocity: new physics.Velocity(0, 10),
  position: new physics.Position(50, 10),
  acceleration: new physics.Acceleration(0, 0)
})

let planet = new physics.Object({
  mass: 100000000000000,
  velocity: new physics.Velocity(0, 0),
  position: new physics.Position(150, 150),
  acceleration: new physics.Acceleration(0, 0)
})
let planet2 = new physics.Object({
  mass: 100000000000000,
  velocity: new physics.Velocity(0, 0),
  position: new physics.Position(100, 100),
  acceleration: new physics.Acceleration(0, 0)
})
let planet3 = new physics.Object({
  mass: 100000000000000,
  velocity: new physics.Velocity(0, 0),
  position: new physics.Position(150, 100),
  acceleration: new physics.Acceleration(0, 0)
})
let planet4 = new physics.Object({
  mass: 100000000000000,
  velocity: new physics.Velocity(0, 0),
  position: new physics.Position(100, 150),
  acceleration: new physics.Acceleration(0, 0)
})

let system = new physics.System({
  planet: planet,
  planet2: planet2,
  planet3: planet3,
  planet4: planet4,
  moon: moon
})

function init() {
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.transform(1, 0, 0, -1, 0, canvas.height)
  window.requestAnimationFrame(draw);
}


function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, 500, 500); // clear canvas

  ctx.fillStyle = '#fff';
  ctx.save();

  ctx.beginPath();
  ctx.arc(moon.position.x * 2, moon.position.y * 2, 3, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(planet.position.x * 2, planet.position.y * 2, 5, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(planet2.position.x * 2, planet2.position.y * 2, 5, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(planet3.position.x * 2, planet3.position.y * 2, 5, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(planet4.position.x * 2, planet4.position.y * 2, 5, 0, Math.PI * 2);
  ctx.stroke();

  system.tick(1/60)

  
  ctx.restore();

  window.requestAnimationFrame(draw);
}
 module.exports = init