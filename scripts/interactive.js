'use strict';

window.requestAnimationFrame(draw)

let runSim = false

if (window.DeviceOrientationEvent) {
  runSim = true
}

window.addEventListener('deviceorientation', function(angle) {
  ball.acceleration.y = 9.8 * Math.sin(angle.beta * (Math.PI / 180))
  ball.acceleration.x = 9.8 * Math.sin(angle.gamma * (Math.PI / 180))
  ball2.acceleration.y = 9.8 * Math.sin(angle.beta * (Math.PI / 180))
  ball2.acceleration.x = 9.8 * Math.sin(angle.gamma * (Math.PI / 180))
  ball3.acceleration.y = 9.8 * Math.sin(angle.beta * (Math.PI / 180))
  ball3.acceleration.x = 9.8 * Math.sin(angle.gamma * (Math.PI / 180))
})

let ball = new physics.Object({
  mass: 1,
  velocity: new physics.Velocity(0, 0),
  position: new physics.Position(0, 0),
  acceleration: new physics.Acceleration(0, 0)
})

let ball2 = new physics.Object({
  mass: 1,
  velocity: new physics.Velocity(0, 0),
  position: new physics.Position(0.1, 0),
  acceleration: new physics.Acceleration(-0.010, 0)
})

let ball3 = new physics.Object({
  mass: 1,
  velocity: new physics.Velocity(0, 0),
  position: new physics.Position(0.1, 0),
  acceleration: new physics.Acceleration(-0.010, 0)
})

let system = new physics.System({
  ball: ball,
  ball2: ball2,
  ball3: ball3
}, true)

var canvas = document.getElementById('interactive')
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

  if (ball.position.x * 500 + window.innerWidth / 2 + 8 > window.innerWidth || ball.position.x * 500 + window.innerWidth / 2 - 8 < 0) {
    ball.velocity.x = -ball.velocity.x * 0.2
    if (ball.position.x * 500 + window.innerWidth / 2 + 8 > window.innerWidth) ball.position.x = (window.innerWidth / 2 - 8) / 500
    else ball.position.x = (-window.innerWidth / 2 + 8) / 500
  }
  if (ball.position.y * 500 + window.innerHeight / 2 + 8 > window.innerHeight || ball.position.y * 500 + window.innerHeight / 2 - 8 < 0) {
    ball.velocity.y = -ball.velocity.y * 0.2
    if (ball.position.y * 500 + window.innerHeight / 2 + 8 > window.innerHeight) ball.position.y = (window.innerHeight / 2 - 8) / 500
    else ball.position.y = (-window.innerHeight / 2 + 8) / 500
  }

  ball.position.x = Math.sign(window.innerWidth - ball.position.x * 500 + window.innerWidth / 2 + 8) * ball.position.x

  ctx.beginPath()
  ctx.arc(ball.position.x * 500 + window.innerWidth / 2, ball.position.y * 500 + window.innerHeight / 2, 8, 0, Math.PI * 2)
  ctx.stroke()

  if (ball2.position.x * 500 + window.innerWidth / 2 + 8 > window.innerWidth || ball2.position.x * 500 + window.innerWidth / 2 - 8 < 0) {
    ball2.velocity.x = -ball2.velocity.x * 0.9
    if (ball2.position.x * 500 + window.innerWidth / 2 + 8 > window.innerWidth) ball2.position.x = (window.innerWidth / 2 - 8) / 500
    else ball2.position.x = (-window.innerWidth / 2 + 8) / 500
  }
  if (ball2.position.y * 500 + window.innerHeight / 2 + 8 > window.innerHeight || ball2.position.y * 500 + window.innerHeight / 2 - 8 < 0) {
    ball2.velocity.y = -ball2.velocity.y * 0.9
    if (ball2.position.y * 500 + window.innerHeight / 2 + 8 > window.innerHeight) ball2.position.y = (window.innerHeight / 2 - 8) / 500
    else ball2.position.y = (-window.innerHeight / 2 + 8) / 500
  }

  ball2.position.x = Math.sign(window.innerWidth - ball2.position.x * 500 + window.innerWidth / 2 + 8) * ball2.position.x

  ctx.beginPath()
  ctx.arc(ball2.position.x * 500 + window.innerWidth / 2, ball2.position.y * 500 + window.innerHeight / 2, 8, 0, Math.PI * 2)
  ctx.stroke()
  
  if (ball3.position.x * 500 + window.innerWidth / 2 + 8 > window.innerWidth || ball3.position.x * 500 + window.innerWidth / 2 - 8 < 0) {
    ball3.velocity.x = -ball3.velocity.x * 0.5
    if (ball3.position.x * 500 + window.innerWidth / 2 + 8 > window.innerWidth) ball3.position.x = (window.innerWidth / 2 - 8) / 500
    else ball3.position.x = (-window.innerWidth / 2 + 8) / 500
  }
  if (ball3.position.y * 500 + window.innerHeight / 2 + 8 > window.innerHeight || ball3.position.y * 500 + window.innerHeight / 2 - 8 < 0) {
    ball3.velocity.y = -ball3.velocity.y * 0.5
    if (ball3.position.y * 500 + window.innerHeight / 2 + 8 > window.innerHeight) ball3.position.y = (window.innerHeight / 2 - 8) / 500
    else ball3.position.y = (-window.innerHeight / 2 + 8) / 500
  }

  ball3.position.x = Math.sign(window.innerWidth - ball3.position.x * 500 + window.innerWidth / 2 + 8) * ball3.position.x

  ctx.beginPath()
  ctx.arc(ball3.position.x * 500 + window.innerWidth / 2, ball3.position.y * 500 + window.innerHeight / 2, 8, 0, Math.PI * 2)
  ctx.stroke()

  system.tick(1 / 60)

  ctx.restore()

  if (runSim) window.requestAnimationFrame(draw)
}

