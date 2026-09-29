import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type PreloaderProps = {
  onComplete: () => void;
};

export function Preloader({ onComplete }: PreloaderProps) {
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    let active = true;
    const image = new Image();
    const finish = () => {
      if (active) setReady(true);
    };

    image.onload = finish;
    image.onerror = finish;
    image.src = '/media/showroom-hero.jpg';

    const timeout = window.setTimeout(finish, 5000);

    return () => {
      active = false;
      clearTimeout(timeout);
      image.onload = null;
      image.onerror = null;
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#121212] text-[#E5E5E5]"
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.8 }}
      role="status"
      aria-label="Загрузка X-style"
    >
      <span className="font-serif text-5xl">
        X-style<span className="text-[#B18D73]">.</span>
      </span>
      <div className="mt-8 h-px w-36 overflow-hidden bg-[#E5E5E5]/20">
        <motion.div
          className="h-full origin-left bg-[#B18D73]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: ready ? 1 : 0.7 }}
          transition={{ duration: reduced ? 0 : ready ? 0.7 : 3 }}
          onAnimationComplete={() => {
            if (ready) onComplete();
          }}
        />
      </div>
    </motion.div>
  );
}
