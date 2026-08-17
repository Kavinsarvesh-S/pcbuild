import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CursorSpotlight: React.FC = () => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth spring physics for the cursor spotlight
  const springConfig = { damping: 30, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Outer Glow */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-60 mix-blend-color-dodge"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(140, 192, 235, 0.4) 0%, rgba(197, 179, 211, 0.2) 40%, rgba(255,255,255,0) 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Inner Highlight */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full mix-blend-overlay opacity-80"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 60%)',
          filter: 'blur(30px)',
        }}
      />
    </motion.div>
  );
};
