'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { MeshTransmissionMaterial } from '@react-three/drei'

export default function Crystal() {
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x += 0.003
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.2, 0]} />
      <MeshTransmissionMaterial
        backside
        samples={10}
        resolution={1024}
        transmission={1}
        thickness={0.6}
        chromaticAberration={0.03}
        anisotropy={0.1}
        distortion={0.1}
        distortionScale={0.3}
        temporalDistortion={0.1}
        roughness={0}
        ior={1.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  )
}
