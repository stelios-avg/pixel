"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, MeshTransmissionMaterial } from '@react-three/drei';

const projects = [
  {
    title: 'Crystal UI',
    description: 'Beyond flat screens. Into real depth.',
    tags: ['UI/UX', '3D Design'],
    has3D: true,
    preview: null,
    images: [],
  },
  {
    title: 'PixelMart',
    description: 'Turning visitors into customers.',
    tags: ['E-commerce', 'Marketing', 'SEO', 'Analytics', 'Performance'],
    has3D: false,
    preview: '/image/pixelmart-preview.jpg',
    images: [
      '/image/pixelmart-1.jpg',
      '/image/pixelmart-2.jpg',
      '/image/pixelmart-3.jpg',
    ],
  },
  {
    title: 'StructureHub',
    description: 'Your brand. Your story. Online.',
    tags: ['Design System', 'Branding', 'Web Development', 'UI/UX'],
    has3D: false,
    preview: '/image/structurehub.jpg',
    images: [
      '/image/hub-1.jpg',
      '/image/hub-2.jpg',
      '/image/hub-3.jpg',
      '/image/hub-4.jpg',
    ],
  },
  {
    title: 'AppCrafter',
    description: 'Apps that scale with you.',
    tags: ['Apps'],
    has3D: false,
    preview: '/image/appcrafter-preview.jpg',
    images: [
      '/image/appcrafter-1.jpg',
      '/image/appcrafter-2.jpg',
      '/image/appcrafter-3.jpg',
      '/image/appcrafter-4.jpg',
    ],
  },
];

type Project = typeof projects[number];

function Crystal() {
  return (
    <mesh castShadow receiveShadow scale={1.5}>
      <octahedronGeometry args={[1, 0]} />
      <MeshTransmissionMaterial
        thickness={0.8}
        roughness={0}
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
  );
}

export default function Work() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
        setSelected(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section id="work" className="min-h-screen bg-black text-white px-6 py-20">
      <h2 className="text-5xl font-bold text-center mb-16">My Work</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onClick={() => setSelected(project)}
            className="p-6 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:border-pink-400 transition"
          >
            <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
            <p className="text-sm text-white/60 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, j) => (
                <span key={j} className="bg-white/10 text-xs px-3 py-1 rounded-full text-white/60">{tag}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
  {selected && (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, type: "tween",  ease: "easeOut" }}
    >
            <motion.div
        onClick={e => e.stopPropagation()}
        className="bg-neutral-900 p-8 max-w-2xl w-full rounded-xl"
        initial={{ y: "-50%", opacity: 0, scale: 0.8 }}
        animate={{ y: "0%",  opacity: 1, scale: 1   }}
        exit={{ y: "-50%", opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-3xl font-bold">{selected.title}</h3>
                  <p className="text-white/40 uppercase tracking-wider text-sm">Concept Project</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-white/50 hover:text-white text-xl">✕</button>
              </div>

              <p className="text-white/70 mb-6">{selected.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selected.tags.map((tag, i) => (
                  <span key={i} className="bg-white/10 text-sm px-3 py-1 rounded-full text-white/60">{tag}</span>
                ))}
              </div>

              {/* PREVIEW */}
              {selected.has3D ? (
                <div className="w-full h-[300px] mb-6 rounded-lg overflow-hidden">
                  <Canvas camera={{ position: [2, 2, 5], fov: 60 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} />
                    <Crystal />
                    <Environment preset="sunset" background={false} />
                    <OrbitControls enablePan={false} enableZoom={false} />
                  </Canvas>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {selected.images.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`screenshot ${i + 1}`}
                      className="rounded-lg shadow cursor-pointer"
                      onClick={() => setSelectedImage(src)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen image */}
      <AnimatePresence>
  {selectedImage && (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, type: "tween",  ease: "easeOut" }}
      onClick={() => setSelectedImage(null)}
    >
      <motion.img
        src={selectedImage}
        alt="Full Preview"
        className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1,   opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onClick={e => e.stopPropagation()}
      />
    </motion.div>
  )}
</AnimatePresence>

    </section>
  );
}
