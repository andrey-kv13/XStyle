import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [large, setLarge] = useState(false);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setLarge(Boolean((event.target as Element).closest('button,a,img')));
    };

    const leave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener('pointermove', move);
    document.addEventListener('pointerleave', leave);

    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[110] h-2 w-2 rounded-full bg-[#B18D73]"
      style={{ x, y }}
      animate={{ scale: large ? 4 : 1, opacity: large ? 0.45 : 1 }}
      transition={{ duration: 0.3 }}
    />
  );
}
