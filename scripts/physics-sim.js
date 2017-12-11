const constants = {
  gravitational: 6.67408 * Math.pow(10, -11),
  mercury: {
    mass: 0.330 * Math.pow(10, 24),
    gravity: 3.7
  },
  venus: {
    mass: 4.87 * Math.pow(10, 24),
    gravity: 8.9
  },
  earth: {
    mass: 5.97 * Math.pow(10, 24),
    gravity: 9.8
  },
  moon: {
    mass: 0.073 * Math.pow(10, 24),
    gravity: 1.6
  },
  mars: {
    mass: 0.643 * Math.pow(10, 24),
    gravity: 3.7
  },
  jupiter: {
    mass: 1898 * Math.pow(10, 24),
    gravity: 23.1
  },
  saturn: {
    mass: 568 * Math.pow(10, 24),
    gravity: 9
  },
  uranus: {
    mass: 86.8 * Math.pow(10, 24),
    gravity: 8.7
  },
  neptune: {
    mass: 102 * Math.pow(10, 24),
    gravity: 11
  },
  pluto: {
    mass: 0.0146,
    gravity: 0.7
  }
}

class Acceleration {
  /**
   * Dictates the acceleration of an object
   * @param {number} xAccel - The horizontal acceleration of an object
   * @param {number} yAccel - The vertical acceleration of an object
   */
  constructor (xAccel, yAccel) {
    this.x = xAccel || 0
    this.y = yAccel || 0
  }
}

class Force {
  /**
   * Creates a force
   * @param {number} xForce - The horizontal force
   * @param {number} yForce - The vertical force
   */
  constructor (xForce, yForce) {
    this.x = xForce
    this.y = yForce
  }
}

class Position {
  /**
   * Dictates the position of an object
   * @param {number} xPos - The horizontal position of an object
   * @param {number} yPos - The vertical position of an object
   */
  constructor (xPos, yPos) {
    this.x = xPos || 0
    this.y = yPos || 0
  }
}

class Velocity {
  /**
   * Dictates the velocity of an object
   * @param {number} xVel - The horizontal velocity of an object
   * @param {number} yVel - The vertical velocity of an object
   */
  constructor (xVel, yVel) {
    this.x = xVel || 0
    this.y = yVel || 0
  }
}

/** Class representing an object */
class PhysicsObject {
  /**
   * Options for an object
   * @typedef {ObjectOptions} ObjectOptions
   * @property {number} [mass] - The mass of the object
   * @property {Velocity} [velocity] - the velocity of the object.
   * @property {Acceleration} [acceleration] - the acceleration of the object.
   * @property {Postition} [position] - the (x,y) cooridinates of the object,
   */

  /**
   * Create an object
   * @param {ObjectOptions} options - The options for the object
   */
  constructor (options) {
    this.mass = options.mass
    this.velocity = options.velocity
    this.acceleration = options.acceleration
    this.position = options.position
    this.gravitationalAcceleration = new Force(0, 0)
  }

  /**
   * Applies a force to an Object
   * @param {Force} force - the force to apply
   */
  applyForce (force) {
    let gravitationalAccelerationX = force.x / this.mass
    let gravitationalAccelerationY = force.y / this.mass
    this.gravitationalAcceleration = new Force(gravitationalAccelerationX, gravitationalAccelerationY)
  }
}

class PhysicsSystem {
  /**
   * Create a new system.
   * @param {PhysicsObject[]} objects - the objects to add to the system
   */
  constructor (objects) {
    this.objects = objects
  }

  /**
   * Updates all objects in the system for the specified time.
   * @param {number} time - ammount of time to calculate
   */
  tick (time) {
    for (let key in this.objects) {
      let object = this.objects[key]
      for (let secondaryKey in this.objects) {
        // Make sure the object does not interact with itself
        if (key === secondaryKey) continue

        let secondaryObject = this.objects[secondaryKey]

        let xDistance = object.position.x - secondaryObject.position.x
        let yDistance = object.position.y - secondaryObject.position.y

        let hypotenuse = Math.sqrt(xDistance * xDistance + yDistance * yDistance)

        let gravitationalForce = constants.gravitational * object.mass * secondaryObject.mass / Math.pow(hypotenuse, 2)

        let xForce = gravitationalForce * xDistance / hypotenuse
        let yForce = gravitationalForce * yDistance / hypotenuse

        object.applyForce(new Force(xForce, yForce))
      }

      // Calulate velocities
      object.velocity.x = object.velocity.x + (object.acceleration.x - object.gravitationalAcceleration.x) * time
      object.velocity.y = object.velocity.y + (object.acceleration.y - object.gravitationalAcceleration.y) * time

      // Calculate positions
      object.position.x = object.position.x + (object.velocity.x * time) + (0.5 * object.acceleration.x * Math.pow(time, 2))
      object.position.y = object.position.y + (object.velocity.y * time) + (0.5 * object.acceleration.y * Math.pow(time, 2))
    }
  }
}

const physics = {
  Velocity: Velocity,
  Acceleration: Acceleration,
  Position: Position,
  Force: Force,
  Object: PhysicsObject,
  System: PhysicsSystem,
  constants: constants
}
