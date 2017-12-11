'use strict';

window.requestAnimationFrame(draw)

let runSim = false

if (window.DeviceOrientationEvent) {
  runSim = true
}

window.addEventListener('deviceorientation', function(angle) {
  ball.acceleration.y = 9.8 * Math.sin(angle.beta * (Math.PI / 180))
  ball.acceleration.x = 9.8 * Math.sin(angle.gamma * (Math.PI / 180))
})

let ball = new physics.Object({
  mass: 100,
  velocity: new physics.Velocity(0, 0),
  position: new physics.Position(0, 0),
  acceleration: new physics.Acceleration(0, 0)
})

let system = new physics.System({
  ball: ball
})

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

  if (ball.position.x * 50 + window.innerWidth / 2 + 8 > window.innerWidth || ball.position.x * 50 + window.innerWidth / 2 - 8 < 0) {
    ball.velocity.x = -ball.velocity.x * 0.75
    if (ball.position.x * 50 + window.innerWidth / 2 + 8 > window.innerWidth) ball.position.x = (window.innerWidth / 2 - 8) / 50
    else ball.position.x = (-window.innerWidth / 2 + 8) / 50
  }
  if (ball.position.y * 50 + window.innerHeight / 2 + 8 > window.innerHeight || ball.position.y * 50 + window.innerHeight / 2 - 8 < 0) {
    ball.velocity.y = -ball.velocity.y * 0.75
    if (ball.position.y * 50 + window.innerHeight / 2 + 8 > window.innerHeight) ball.position.y = (window.innerHeight / 2 - 8) / 50
    else ball.position.y = (-window.innerHeight / 2 + 8) / 50
  }

  ball.position.x = Math.sign(window.innerWidth - ball.position.x * 50 + window.innerWidth / 2 + 8) * ball.position.x

  ctx.beginPath()
  ctx.arc(ball.position.x * 50 + window.innerWidth / 2, ball.position.y * 50 + window.innerHeight / 2, 8, 0, Math.PI * 2)
  ctx.stroke()

  system.tick(1 / 60)

  ctx.restore()

  if (runSim) window.requestAnimationFrame(draw)
}

