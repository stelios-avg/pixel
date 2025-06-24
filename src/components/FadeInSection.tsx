// components/FadeInSection.tsx
'use client'

import { motion, useInView } from 'framer-motion'
import React, { ReactNode, useRef } from 'react'

type FadeInSectionProps = {
  children: ReactNode
  /** ποιο στοιχείο είμαστε για το staggered delay */
  index?: number
}

export default function FadeInSection({
  children,
  index = 0,            // default 0 αν δεν περαστεί
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index *3 }}
    >
      {children}
    </motion.div>
  )
}
