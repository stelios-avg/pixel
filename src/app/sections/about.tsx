'use client'

import FadeInSection from '../../components/FadeInSection'

export default function About() {
  return (
    <section
      id="about"
      className="h-screen w-full bg-black text-white flex items-center justify-center px-8"
    >
      <FadeInSection>
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Φωτογραφία */}
          <div className="w-full aspect-square overflow-hidden">
            <img
              src="/website designers near me.jpg"
              alt="Portrait"
              className="w-full h-full object-cover grayscale contrast-125 duration-300 hover:scale-105 hover:shadow-xl hover:rounded-xl transform skew-y-2"
            />
          </div>

          {/* Πληροφορίες */}
          <div className="text-center md:text-left space-y-4 font-serif">
            <h1 className="text-xl font-bold uppercase font-sans transition-all duration-300 hover:tracking-widest">About Me</h1>
            <h2 className="text-5xl font-bold uppercase hover:text-pink-500 hover:tracking-widest duration-300">Stelios Avgousti</h2>
            <p className="italic text-xl hover:scale-120 hover:text-yellow-500 duration-300">Creative Developer</p>
            <p className="text-lg leading-relaxed max-w-md duration-300 hover:rotate-3 hover:scale-105 hover:text-red-500">
              I specialize in crafting immersive, pixel-perfect 3D experiences on the web.
              Passionate about blending design, interactivity, and motion.
            </p>
            <p className="text-lg duration-300 hover:opacity-70">
              🧠 Currently focused on Three.js & Next.js 
            </p>
          </div>
        </div>
      </FadeInSection>
    </section>
  )
}
