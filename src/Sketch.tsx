import { createLSystem } from "./systems"
import { createTurtle } from "./turtle"
import type { GroupProps } from "@react-three/fiber"
import * as THREE from "three"

export const Sketch = () => {
  return (
    <>
      <Lightning position={[0, 40, 0]} rule='F' />
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[20, 20, 0.5]} />
        <meshPhongMaterial color='#202020' flatShading />
      </mesh>
    </>
  )
}

const rules = {
  F: "FF+[F-^]-[+F-v-F^]",
}

const Lightning = ({
  rule,
  angle = 0.43,
  width = 0.002,
  ...props
}: {
  rule: string
  angle?: number
  width?: number
  props: GroupProps
}) => {
  const lSystem = createLSystem(rule, rules)

  for (let i = 0; i < 4; i++) {
    lSystem.generate()
  }

  const turtle = createTurtle(1, angle, width, new THREE.Vector3(0, 1, 0))
  const curves = turtle.interpret(lSystem.getSentence())

  return (
    <group {...props}>
      <primitive object={curves} />
    </group>
  )
}
