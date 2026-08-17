import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CursorSpotlight: React.FC = () => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Fast spring physics for the primary spotlight
  const fastSpring = { damping: 25, stiffness: 200, mass: 0.5 };
  const fastX = useSpring(mouseX, fastSpring);
  const fastY = useSpring(mouseY, fastSpring);

  // Slower/laggier spring physics for the secondary spotlight
  const slowSpring = { damping: 40, stiffness: 80, mass: 1.5 };
  const slowX = useSpring(mouseX, slowSpring);
  const slowY = useSpring(mouseY, slowSpring);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden select-none">
      {/* Secondary Spotlight (Slow, Soft Aqua #B0DEED) */}
      <motion.div
        className="absolute top-0 left-0 rounded-full"
        style={{
          x: slowX,
          y: slowY,
          translateX: '-50%',
          translateY: '-50%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(176, 222, 237, 0.4) 0%, rgba(176, 222, 237, 0) 70%)',
          filter: 'blur(40px)',
        }}
      />
      
      {/* Primary Spotlight (Fast, Deeper Sky Blue #80CCE3) */}
      <motion.div
        className="absolute top-0 left-0 rounded-full"
        style={{
          x: fastX,
          y: fastY,
          translateX: '-50%',
          translateY: '-50%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(128, 204, 227, 0.6) 0%, rgba(128, 204, 227, 0) 60%)',
          filter: 'blur(30px)',
        }}
      />
    </div>
  );
};

export default CursorSpotlight;
