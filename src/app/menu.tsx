'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-50">
    
      {/* Burger Button */}
      <button
  onClick={() => setIsOpen((prev) => !prev)}
  className="absolute top-14 right-4 z-50 w-8 h-8 flex flex-col justify-between items-center group"
>
  {/* Line 1 */}
  <span
    className={`w-8 h-0.5 bg-white transform transition duration-300 ease-in-out ${
      isOpen ? 'rotate-45 translate-y-3' : ''
    }`}
  />

  {/* Line 2 */}
  <span
    className={`w-8 h-0.5 bg-white transition-all duration-300 ease-in-out ${
      isOpen ? 'opacity-0' : ''
    }`}
  />

  {/* Line 3 */}
  <span
    className={`w-8 h-0.5 bg-white transform transition duration-300 ease-in-out ${
      isOpen ? '-rotate-45 -translate-y-3' : ''
    }`}
  />
</button>


      {/* Animated Menu */}
      <AnimatePresence>
        {isOpen && (
  <motion.div
  initial={{ opacity: 0, x: 100 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: 100 }}
  transition={{ duration: 0.3 }}
  className="absolute top-0 right-0 h-screen w-2/3 bg-black/90 backdrop-blur-lg text-white z-40 p-10 flex flex-col justify-center items-start gap-8"
>
  <nav className="space-y-6 w-full">
    <a
      href="#about"
      onClick={() => setIsOpen(false)}
      className="text-2xl font-light uppercase tracking-wide hover:tracking-widest hover:text-pink-400 transition-all duration-300"
    style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
    >
       About
    </a>
    <a
      href="#work"
      onClick={() => setIsOpen(false)}
      className="text-2xl font-light uppercase tracking-wide hover:tracking-widest hover:text-blue-400 transition-all duration-300"
    >
      Work
    </a>
    <a
      href="#contact"
      onClick={() => setIsOpen(false)}
      className="text-2xl font-light uppercase tracking-wide hover:tracking-widest hover:text-teal-400 transition-all duration-300"
      style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
    >
      Contact
    </a>
  </nav>

  <div className="mt-10 text-xs text-white/40 uppercase tracking-widest">
    © 2025 pixel_cy
  </div>
</motion.div>

)}
      </AnimatePresence>
      
    </nav>
  
  )
}
