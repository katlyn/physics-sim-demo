'use strict';

window.requestAnimationFrame(draw)

let runSim = true

let moon = new physics.Object({
  mass: 100,
  velocity: new physics.Velocity(0, 25.831373366509183 * 3),
  position: new physics.Position(70.710678118654752440084436210485, 0),
  acceleration: new physics.Acceleration(0, 0)
})

let planet = new physics.Object({
  mass: 10000000000000000,
  velocity: new physics.Velocity(0, 0),
  position: new physics.Position(0, 0),
  acceleration: new physics.Acceleration(0, 0)
})

let system = new physics.System({
  planet: planet,
  moon: moon
})

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

function init () {
  runSim = true
  window.requestAnimationFrame(draw)
}

function draw () {
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  ctx.globalCompositeOperation = 'destination-over'
  ctx.clearRect(0, 0, canvas.height, canvas.width) // clear canvas

  ctx.fillStyle = '#000'
  ctx.save()
/*
  ctx.beginPath()
  ctx.arc(moon.position.x * 2, moon.position.y * 2, 3, 0, Math.PI * 2)
  ctx.stroke()
*/
  ctx.beginPath()
  ctx.arc(planet.position.x * 3 + window.innerWidth / 2, planet.position.y * 3 + window.innerHeight / 2, 15, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(moon.position.x * 3 + window.innerWidth / 2, moon.position.y * 3 + window.innerHeight / 2, 15, 0, Math.PI * 2)
  ctx.stroke()

  system.tick(1 / 60)

  ctx.restore()

  if (runSim) window.requestAnimationFrame(draw)
}

