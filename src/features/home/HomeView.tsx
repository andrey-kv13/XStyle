import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { brand, heroSlides } from '../../shared/config/site';

type HomeViewProps = {
  onExplore: () => void;
};

export function HomeView({ onExplore }: HomeViewProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 35, damping: 25 });
  const y = useSpring(0, { stiffness: 35, damping: 25 });
  const buttonX = useSpring(0);
  const buttonY = useSpring(0);

  useEffect(() => {
    if (paused || reduced) return;

    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % heroSlides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [paused, reduced]);

  return (
    <section
      className="hero relative h-full overflow-hidden bg-[#343B35] text-[#E5E5E5]"
      onPointerMove={(event) => {
        if (!reduced && event.pointerType === 'mouse') {
          x.set((event.clientX / window.innerWidth - 0.5) * 16);
          y.set((event.clientY / window.innerHeight - 0.5) * 12);
        }
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div className="absolute -inset-4" style={{ x, y }}>
        <AnimatePresence initial={false}>
          <motion.img
            key={heroSlides[index].id}
            src={heroSlides[index].image}
            alt={heroSlides[index].alt}
            className="absolute h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: reduced || paused ? 1.02 : 1.09 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1 }, scale: { duration: 8, ease: 'linear' } }}
          />
        </AnimatePresence>
      </motion.div>

      <div className="absolute inset-0 bg-[#121212]/30" />

      <div className="hero-copy absolute bottom-24 left-6 max-w-xl md:bottom-28 md:left-14">
        <p className="mb-5 text-xs uppercase text-[#DDDCD2]">
          {brand.name} / {brand.title}
        </p>
        <h1 className="font-serif text-5xl leading-tight md:text-6xl">
          Искусство
          <br />
          жить красиво.
        </h1>
        <p className="mt-5 max-w-sm text-base leading-relaxed">
          Мебель с характером.
          <br />
          Пространство, в котором вы дома.
        </p>

        <motion.button
          style={{ x: buttonX, y: buttonY }}
          onPointerMove={(event) => {
            if (reduced || event.pointerType !== 'mouse') return;
            const rect = event.currentTarget.getBoundingClientRect();
            buttonX.set((event.clientX - rect.left - rect.width / 2) * 0.15);
            buttonY.set((event.clientY - rect.top - rect.height / 2) * 0.15);
          }}
          onPointerLeave={() => {
            buttonX.set(0);
            buttonY.set(0);
          }}
          onClick={onExplore}
          className="mt-8 flex items-center gap-9 border border-[#E5E5E5]/65 px-6 py-4 text-sm transition-colors hover:bg-[#E5E5E5]/10"
        >
          Исследовать <ArrowUpRight size={18} />
        </motion.button>
      </div>

      <div className="absolute inset-x-6 bottom-6 flex items-center justify-between md:inset-x-14">
        <span className="text-xs text-[#D7D9D2]">Форма. Фактура. Ощущение.</span>
        <div className="flex items-center gap-3">
          {heroSlides.map((slide, slideIndex) => (
            <button
              key={slide.id}
              aria-label={`Интерьер ${slideIndex + 1}`}
              aria-pressed={index === slideIndex}
              onClick={() => setIndex(slideIndex)}
              className="flex h-11 w-9 items-center"
            >
              <span className={`h-px w-full ${slideIndex === index ? 'bg-[#E5E5E5]' : 'bg-[#E5E5E5]/35'}`} />
            </button>
          ))}
          <button
            className="p-3"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? 'Продолжить слайдер' : 'Остановить слайдер'}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
      </div>
    </section>
  );
}
