import { Center } from "@react-three/drei"
import * as THREE from "three"
import {
  LineSegments2,
  LineMaterial,
  LineSegmentsGeometry,
} from "three/examples/jsm/Addons.js"

function createTurtle(length: number, angle: number) {
  let position = new THREE.Vector3(0, 0, 0)
  let direction = new THREE.Vector3(0, 1, 0)
  const geometry = new LineSegmentsGeometry()
  const vertices: number[] = []
  const transformations: any[] = []

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
        color: 0xc8e0f9,
        linewidth: 0.0025,
        dashed: false,
        worldUnits: false,
        alphaToCoverage: true,
        shadowSide: THREE.DoubleSide,
      })
    )
  }

  return { interpret }
}

type Rule = {
  F: string
}

let rules = {
  F: "FF+[F-^]-[+F-v-F^]",
}

const createLSystem = (axiom: string, rules: Rule) => {
  let sentence = axiom
  const ruleset = rules

  const generate = () => {
    let nextGen = ""

    for (let i = 0; i < sentence.length; i++) {
      const c = sentence.charAt(i)

      if (ruleset[c]) {
        nextGen += ruleset[c]
      } else {
        nextGen += c
      }
    }

    sentence = nextGen
  }

  return {
    getSentence: () => sentence,
    generate,
  }
}

export const Sketch = () => {
  return (
    <>
      <Lightning position={[0, 80, 0]} />
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[125, 125]} />
        <meshBasicMaterial color='#1b1e28' />
      </mesh>
    </>
  )
}

const Lightning = (props) => {
  const lSystem = createLSystem("F", rules)

  for (let i = 0; i < 5; i++) {
    lSystem.generate()
  }

  const turtle = createTurtle(1, 0.436332313)
  const curves = turtle.interpret(lSystem.getSentence())

  return (
    <group {...props}>
      <primitive object={curves} />
    </group>
  )
}
