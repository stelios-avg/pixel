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
  initial={{ opacity: 0, x: 10 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: 10 }}
  transition={{ duration: 0.3 }}
  className="fixed top-0 left-0 w-full h-screen bg-black text-white z-40 px-10 py-20 flex flex-col justify-start items-start gap-12"
>
  <nav className="flex flex-col w-full gap-11">
  <a
    href="#about"
    onClick={() => setIsOpen(false)}
    className="text-6xl font-black uppercase hover:tracking-widest transition-all duration-300"
    
  >
    About
  </a>
  <a
    href="#work"
    onClick={() => setIsOpen(false)}
    className="text-6xl font-black uppercase hover:tracking-widest transition-all duration-300"
    
  > 
    Work
  </a>
  <a
    href="#contact"
    onClick={() => setIsOpen(false)}
    className="text-6xl font-black uppercase hover:tracking-widest transition-all duration-300"
    
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
