var ctx = document.getElementById('canvas').getContext('2d')
ctx.transform(1, 0, 0, -1, 0, 500)

function init () {
  runSim = true
  window.requestAnimationFrame(draw)
}

function draw () {
  ctx.globalCompositeOperation = 'destination-over'
  ctx.clearRect(0, 0, 500, 500) // clear canvas

  ctx.fillStyle = '#fff'
  ctx.save()
/*
  ctx.beginPath()
  ctx.arc(moon.position.x * 2, moon.position.y * 2, 3, 0, Math.PI * 2)
  ctx.stroke()
*/
  ctx.beginPath()
  ctx.arc(planet.position.x, planet.position.y, 5, 0, Math.PI * 2)
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(moon.position.x, moon.position.y, 5, 0, Math.PI * 2)
  ctx.stroke()

  system.tick(1 / 60)

  ctx.restore()

  if (runSim) window.requestAnimationFrame(draw)
}
module.exports = {
  start: init,
  step: draw
}
