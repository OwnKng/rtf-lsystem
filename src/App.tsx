import { Canvas } from "@react-three/fiber"
import { Sketch } from "./Sketch"
import { OrbitControls } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"

function App() {
  return (
    <div className='w-full h-screen'>
      <Canvas orthographic camera={{ position: [0, 100, 50] }} linear>
        <EffectComposer>
          <OrbitControls />
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.5} height={300} />
          <Sketch />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export default App
