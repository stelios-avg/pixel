'use client'

import Menu from './menu'
import Crystal from './Crystal'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Environment, Text } from '@react-three/drei'
import About from './sections/about'
import Work from './sections/work'
import Contact from './sections/contact'
import Cursor from '../components/Cursor';






export default function Home() {
  return (
    <div className="relative w-screen h-auto  bg-black text-white">
      {/* 🔹 Fixed Canvas in background */}
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden z-0">

        {/* 🎥 Background Video */}
        <video
  autoPlay
  loop
  muted
  preload="auto"
  disablePictureInPicture
  playsInline
  className="absolute top-0 left-0 w-full h-full object-cover z-0"
  >

  <source src="/web design company.mp4" type="video/mp4" />
</video>

        {/* 🎨 3D Crystal Canvas */}
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} shadows>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1.2} />
          <Suspense fallback={<></>}>
            <Crystal />
            <Text
              position={[0, 0, -2]}
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              crafting web pixel by pixel
            </Text>
            <Environment files="/venice_sunset_4k.hdr" background={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* 🔸 Logo */}
      <div className="absolute top left w-24 h-12 md:w-40 md:h-20 md:top-3 z-50">
        <img
          src="/web design nicosia.png"
          alt="Logo"
        />
      </div>

      {/* 🔸 Burger Menu */}
      <Menu />

      {/* 🔸 Custom Cursor */
      <Cursor />}
      


   
      {/* 🔹 Sections πάνω από τον crystal */}
      <div className="relative z-10">
        <section id="home" className="h-screen flex items-center justify-center">
        </section>
        <About />
        <Work />
        <Contact />
      </div>
    </div>
  )
}
