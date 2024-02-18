import * as THREE from "three"
import {
  LineSegments2,
  LineMaterial,
  LineSegmentsGeometry,
} from "three/examples/jsm/Addons.js"

export function createTurtle(
  length: number,
  angle: number,
  width = 0.002,
  startingPosition = new THREE.Vector3(0, 0, 0)
) {
  let position = startingPosition.clone()
  let direction = new THREE.Vector3(0, 1, 0)
  const geometry = new LineSegmentsGeometry()
  const vertices: number[] = []
  const transformations: {
    position: THREE.Vector3
    direction: THREE.Vector3
  }[] = [{ position: position.clone(), direction: direction.clone() }]

  function forward() {
    const next = position.clone().sub(direction.clone().multiplyScalar(length))
    vertices.push(position.x, position.y, position.z)
    vertices.push(next.x, next.y, next.z)
    position = next
  }

  function turnRight() {
    const axis = new THREE.Vector3(0, 0, 1)
    direction.applyAxisAngle(axis, -angle)
  }

  function turnLeft() {
    const axis = new THREE.Vector3(0, 0, 1)
    direction.applyAxisAngle(axis, angle)
  }

  function turnUp() {
    const axis = new THREE.Vector3(0, 1, 0)
    direction.applyAxisAngle(axis, angle)
  }

  function turnDown() {
    const axis = new THREE.Vector3(0, 1, 0)
    direction.applyAxisAngle(axis, -angle)
  }

  function push() {
    transformations.push({
      position: position.clone(),
      direction: direction.clone(),
    })
  }

  function pop() {
    const t = transformations.pop()
    if (!t) return
    position = t.position
    direction = t.direction
  }

  function interpret(commands: string) {
    for (const command of commands) {
      if (command === "F") {
        forward()
      } else if (command === "+") {
        turnRight()
      } else if (command === "-") {
        turnLeft()
      } else if (command === "^") {
        turnUp()
      } else if (command === "v") {
        turnDown()
      } else if (command === "[") {
        push()
      }
      if (command === "]") {
        pop()
      }
    }

    geometry.setPositions(vertices)

    return new LineSegments2(
      geometry,
      new LineMaterial({
        color: "#A0EADE",
        linewidth: width,
        dashed: false,
        alphaToCoverage: true,
        shadowSide: THREE.DoubleSide,
      })
    )
  }

  return { interpret }
}
