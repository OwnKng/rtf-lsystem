import { Canvas } from "@react-three/fiber"
import { Sketch } from "./Sketch"
import { OrbitControls } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"

function App() {
  return (
    <div className='w-full h-screen'>
      <Canvas camera={{ position: [0, 20, 30] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 40, 0]} intensity={1} />
        <EffectComposer>
          <OrbitControls
            target={[0, 15, 0]}
            minPolarAngle={Math.PI * 0.5}
            maxPolarAngle={Math.PI * 0.5}
          />
          <Bloom luminanceThreshold={0} luminanceSmoothing={1} height={300} />
          <Sketch />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export default App
