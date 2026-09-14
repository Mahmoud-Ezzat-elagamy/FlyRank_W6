import { Center, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'

function Model({ color = '#ffffff' }) {
  // Automatically loads and decodes the Draco-compressed model
  const { scene } = useGLTF('/model-compressed.glb')
  const modelRef = useRef()

  // Continuous gentle spin
  useFrame(() => {
    if (modelRef.current) {
      // Gentle rotation around the Y-axis (up/down)
      modelRef.current.rotation.y += 0.002
    }
  })

  // Change or tint the model's material colors
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        // Set the color tint (use '#ffffff' for original textures)
        child.material.color.set(color)
        child.material.needsUpdate = true
      }
    })
  }, [scene, color])

  return <primitive ref={modelRef} object={scene} />
}

export default function TorusCanvas() {
  // You can change this color to tint or recolor your 3D model!
  // e.g. '#ffffff' (original), '#38bdf8' (cyan), '#f43f5e' (rose), '#a855f7' (purple)
  const [modelColor, setModelColor] = useState('#f43f5e')

  return (
    <Canvas
      camera={{ position: [1, 0.7, 2], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: 'default' }}
    >
      {/* minDistance increased from 1 to 3 to prevent zooming too close */}
      <OrbitControls enableZoom={true} minDistance={5} maxDistance={10} />

      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 5, 3]} intensity={1.8} />
      <directionalLight position={[-4, -3, -2]} intensity={0.8} color="#38bdf8" />
      <pointLight position={[-2, 3, 2]} intensity={0.6} />

      <Suspense fallback={null}>
        <Center>
          <Model color={modelColor} />
        </Center>
      </Suspense>
    </Canvas>
  )
}
