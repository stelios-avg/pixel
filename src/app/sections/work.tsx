'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, MeshTransmissionMaterial, Environment } from '@react-three/drei'




// 🗂️ Λίστα με projects και χαρακτηριστικά
const projects = [
  {
    title: 'Crystal UI',
    description: 'A futuristic 3D interface concept using glassmorphism and real-time motion.',
    tags: ['Three.js', 'React'],
preview: null, // Not used directly, handled in modal below
has3D: true,
  },
  {
    title: 'PixelMart',
    description: 'A clean and responsive e-commerce layout...',
    tags: ['Next.js', 'Tailwind'],
    preview: '/image/pixelmart.jpg',
    images: [
      '/image/pixelmart-1.jpg',
      '/image/pixelmart-2.jpg',
      '/image/pixelmart-3.jpg',
    ],
    hasDemo: false,
  },
  {
  title: 'StructureHub',
  description: '...',
  tags: ['Next.js', 'GSAP'],
  preview: '/images/structurehub.jpg',
  hasDemo: true,
  images: [
    '/image/hub-1.jpg',
    '/image/hub-2.jpg',
    '/image/hub-3.jpg',
    '/image/hub-4.jpg'
  ]
}
,
  {
    title: 'Simulator X',
    description: 'An interactive dashboard simulator with real-time data flow and user state control.',
    tags: ['React', 'Zustand', 'D3.js'],
    preview: '/images/simulatorx.jpg',
     href: '/simulator'
  },
]

// 🧠 Κύριο component του Work section
// Define the Project type for better type safety
type Project = typeof projects[number]

function Crystal() {
  // Simple 3D crystal mesh using Drei's MeshTransmissionMaterial for glass effect
  return (
    <mesh castShadow receiveShadow>
      <octahedronGeometry args={[1, 0]} />
      <MeshTransmissionMaterial
        thickness={0.6}
        roughness={0.1}
        transmission={1}
        ior={1.5}
        chromaticAberration={0.04}
        anisotropy={0.1}
        distortion={0.2}
        distortionScale={0.5}
        temporalDistortion={0.1}
        color="#aeeaff"
        backside={false}
      />
    </mesh>
  )
}

export default function Work() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [, setShowFullScreen] = useState(false)

  // ⎋ Ενεργοποίηση ESC για έξοδο από fullscreen
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowFullScreen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
 
 <section
  id="work"
  className="min-h-screen bg-black text-white px-6 py-20 relative overflow-hidden font-serif"
>




      {/* 🧱 Τίτλος ενότητας */}
      <h2 className="text-5xl font-bold text-center mb-16 tracking-wide">My Work</h2>

      {/* 🖼️ Πλέγμα προβολής έργων */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 z-10 relative">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            onClick={() => {
              if (project.title === 'Simulator X') {
                window.location.href = '/simulator'
              } else {
                setSelected(project)
              }
            }}
            className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md hover:border-pink-400 transition-all cursor-pointer"
          >
            <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
            <p className="text-sm text-white/60 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, j) => (
                <span
                  key={j}
                  className="bg-white/10 text-xs px-3 py-1 rounded-full text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🪟 Modal εμφάνισης project */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-neutral-900 rounded-xl p-8 max-w-2xl w-full text-white border border-white/10"
            >
              {/* 🧱 Τίτλος */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-3xl font-bold">{selected.title}</h3>
                  <p className="text-sm text-white/40 mt-1 uppercase tracking-wider">Concept Project</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-white/50 hover:text-white text-xl"
                >
                  ×
                </button>
              </div>

              {/* 📝 Περιγραφή */}
              <motion.p
                className="text-white/70 mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {selected.description}
              </motion.p>

              {/* 🏷️ Tags */}
              <motion.div
                className="flex gap-2 flex-wrap mb-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { },
                  visible: {
                    transition: { staggerChildren: 0.1 },
                  },
                }}
              >
                {selected.tags.map((tag, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="bg-white/10 text-sm px-3 py-1 rounded-full text-white/60"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              {/* 🖼️ Preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full h-64 overflow-hidden rounded-lg mb-6"
              >
{selected.has3D ? (
  <Canvas className="bg-transparent cursor-grab">
    <ambientLight intensity={0.5} />
    <directionalLight position={[2, 2, 2]} />
    <Crystal />
    <Environment files="/venice_sunset_4k.hdr" background={false} />
    <OrbitControls enablePan={false} enableZoom={false} makeDefault />
  </Canvas>
) : selected.images ? (
  <div className="mt-6 max-h-[60vh] overflow-y-auto pr-2">
    <div className="grid grid-cols-2 gap-4">
      {selected.images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Screenshot ${i + 1}`}
          className="rounded-lg shadow"
        />
      ))}
    </div>
  </div>
) : (
  <img
    src={selected.preview ?? ''}
    alt={selected.title}
    className="w-full h-full object-cover"
  />
)}


              </motion.div>

              {/* 🔙 Κουμπί επιστροφής */}
              <motion.div
                className="flex justify-end gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 border border-white/20 text-sm rounded-md hover:bg-white/10 transition"
                >
                  Back
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
