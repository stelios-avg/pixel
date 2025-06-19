'use client'
import { useState } from 'react'
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa'
import { motion } from 'framer-motion'
import ContactModal from '../../components/ContactModal'

export default function Contact() {
  const [showModal, setShowModal] = useState(false)

  return (
    <section id="contact" className="relative h-screen w-full text-white overflow-hidden">

      {/* Background video */}
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover z-0" 
        src="/bg-contact.mp4" 
        autoPlay 
        muted 
        loop 
        playsInline
      />

      
      <div className="fixed bottom-2 left-2 text-white text-xs italic font-sans opacity-60">
  powered by <span className="font-semibold">pixel</span>
</div>





      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Κεντρικό περιεχόμενο με animation */}
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8 z-10">

       <motion.button
  className="px-8 py-4 bg-black text-white text-lg font-semibold rounded-xl hover:bg-neutral-900 transition shadow-lg"
  onClick={() => setShowModal(true)}
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
>
  Send Project
</motion.button>


        <motion.div
          className="flex space-x-8 text-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a href="https://www.instagram.com/pixel_cy?utm_source=ig_web_button_share_sheet&igsh=MWtydzRmczFjamkxMA==" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-pink-500 transition" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61571004800946" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="hover:text-blue-500 transition" />
          </a>
          <a href="https://www.tiktok.com/@pixel.websites?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">
            <FaTiktok className="hover:text-red-500 transition" />
          </a>
        </motion.div>

      </div>

      {showModal && <ContactModal onClose={() => setShowModal(false)} />}
    </section>
  )
}
