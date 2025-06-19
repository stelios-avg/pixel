'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useEffect, useRef,} from 'react'

// Terrain
function DesertScene() {
  const { scene } = useGLTF('/models/desert_scene.glb')
  return <primitive object={scene} scale={0.5} />
}

// Car component
function Car() {
  const { scene } = useGLTF('/models/truck.glb')
  const carRef = useRef<THREE.Group | null>(null)

  const camera = useThree((state) => state.camera)

  const keys = useRef({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  })

  // Apply color to car model
  useEffect(() => {
    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({ color: '#ff6600' }) // Πορτοκαλί
      }
    })
  }, [scene])

  // Load engine sound
  const engineAudio = useRef<HTMLAudioElement | null>(null)
  useEffect(() => {
    engineAudio.current = new Audio
    engineAudio.current.loop = true
  }, [])

  // Keyboard listeners
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code in keys.current) keys.current[e.code as keyof typeof keys.current] = true
    }
    const up = (e: KeyboardEvent) => {
      if (e.code in keys.current) keys.current[e.code as keyof typeof keys.current] = false
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  // Main loop
  useFrame(() => {
    if (!carRef.current) return

    const rotationSpeed = 0.03
    const moveSpeed = 0.1

    if (keys.current.ArrowLeft) carRef.current.rotation.y += rotationSpeed
    if (keys.current.ArrowRight) carRef.current.rotation.y -= rotationSpeed

    const direction = new THREE.Vector3(0, 0, -1).applyEuler(carRef.current.rotation)

    if (keys.current.ArrowUp) {
      carRef.current.position.add(direction.clone().multiplyScalar(moveSpeed))
    }
    if (keys.current.ArrowDown) {
      carRef.current.position.add(direction.clone().multiplyScalar(-moveSpeed))
    }

    if (keys.current.ArrowUp || keys.current.ArrowDown) {
      if (engineAudio.current && engineAudio.current.paused) engineAudio.current.play()
    } else {
      if (engineAudio.current && !engineAudio.current.paused) engineAudio.current.pause()
    }

    // Smooth camera follow
    const offset = new THREE.Vector3(0, 5, 10).applyEuler(carRef.current.rotation)
    camera.position.lerp(carRef.current.position.clone().add(offset), 0.1)
    camera.lookAt(carRef.current.position)
  })

  return (
    <>
      {/* Car model with corrected rotation */}
      <group ref={carRef}>
        <group rotation={[0, Math.PI, 0]} position={[0, 0.3, 0]}>
          <primitive object={scene} scale={0.5} />
        </group>
      </group>

      {/* Mobile controls */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
        <button className="bg-white text-black p-4 rounded-full shadow-lg"
          onTouchStart={() => keys.current.ArrowUp = true}
          onTouchEnd={() => keys.current.ArrowUp = false}>↑</button>

        <button className="bg-white text-black p-4 rounded-full shadow-lg"
          onTouchStart={() => keys.current.ArrowDown = true}
          onTouchEnd={() => keys.current.ArrowDown = false}>↓</button>

        <button className="bg-white text-black p-4 rounded-full shadow-lg"
          onTouchStart={() => keys.current.ArrowLeft = true}
          onTouchEnd={() => keys.current.ArrowLeft = false}>←</button>

        <button className="bg-white text-black p-4 rounded-full shadow-lg"
          onTouchStart={() => keys.current.ArrowRight = true}
          onTouchEnd={() => keys.current.ArrowRight = false}>→</button>
      </div>
    </>
  )
}

export default function SimulatorPage() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[-5, 10, 5]} intensity={1} />
        <Environment preset="sunset" background={false} />
        <DesertScene />
        <Car />
        <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </div>
  )
}
