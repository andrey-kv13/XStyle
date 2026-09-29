import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { collections } from '../../shared/config/site';
import type { CollectionItem } from '../../shared/types';

type CollectionsCarouselProps = {
  onSelect: () => void;
};

type CollectionCardProps = {
  item: CollectionItem;
  index: number;
  onSelect: () => void;
};

function CollectionCard({ item, index, onSelect }: CollectionCardProps) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const reduced = useReducedMotion();

  return (
    <div
      className="collection-slide min-w-0 shrink-0 pl-5"
      style={{ perspective: 1200 }}
      role="group"
      aria-roledescription="слайд"
      aria-label={`${index + 1} из 4: ${item.title}`}
    >
      <motion.button
        className="collection-card group relative h-full w-full overflow-hidden rounded-sm text-left"
        onClick={onSelect}
        aria-label={`${item.title}: узнать подробнее`}
        animate={tilt}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        onPointerMove={(event) => {
          if (reduced || event.pointerType !== 'mouse') return;

          const rect = event.currentTarget.getBoundingClientRect();
          setTilt({
            rotateX: -((event.clientY - rect.top - rect.height / 2) / rect.height) * 5,
            rotateY: ((event.clientX - rect.left - rect.width / 2) / rect.width) * 5,
          });
        }}
        onPointerLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
      >
        <img
          src={item.image}
          alt={item.title}
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <span className="absolute left-5 top-5 bg-[#2C2C2C]/65 px-2 py-1 text-xs text-[#E5E5E5]">0{index + 1}</span>
        <span className="card-caption absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-[#222623]/90 p-6 text-[#E5E5E5] opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span>
            <span className="block font-serif text-3xl">{item.title}</span>
            <span className="mt-2 block text-sm text-[#CBCFC9]">Цена по запросу</span>
          </span>
          <ArrowUpRight size={20} />
        </span>
      </motion.button>
    </div>
  );
}

export function CollectionsCarousel({ onSelect }: CollectionsCarouselProps) {
  const reduced = useReducedMotion();
  const [viewportRef, api] = useEmblaCarousel({ align: 'start', containScroll: false, duration: reduced ? 0 : 40 });
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const syncCarouselState = useCallback(() => {
    if (!api) return;

    setSelected(api.selectedScrollSnap());
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, [api]);

  useEffect(() => {
    if (!api) return;

    syncCarouselState();
    api.on('select', syncCarouselState).on('reInit', syncCarouselState);

    return () => {
      api.off('select', syncCarouselState).off('reInit', syncCarouselState);
    };
  }, [api, syncCarouselState]);

  return (
    <section
      className="view-padding flex h-full min-h-0 flex-col"
      aria-label="Коллекции"
      aria-roledescription="карусель"
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          api?.scrollNext();
        }

        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          api?.scrollPrev();
        }
      }}
    >
      <div className="collection-heading mb-7 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-3">Предметы и пространства</p>
          <h1 className="font-serif text-4xl leading-tight md:text-5xl">Коллекции</h1>
        </div>
        <p className="hidden max-w-xs text-sm leading-relaxed text-muted md:block">
          Продуманные формы. Тактильные материалы. Ваш собственный ритм.
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden" ref={viewportRef}>
        <div className="-ml-5 flex h-full touch-pan-y">
          {collections.map((item, index) => (
            <CollectionCard key={item.title} item={item} index={index} onSelect={onSelect} />
          ))}
        </div>
      </div>

      <div className="mt-5 flex h-12 shrink-0 items-center justify-between gap-4">
        <p className="text-sm" aria-live="polite">
          <span className="text-brass">0{selected + 1}</span>
          <span className="mx-3 text-muted">/ 04</span>
          <span className="hidden sm:inline">{collections[selected].description}</span>
        </p>
        <div className="flex items-center gap-4">
          <button
            className="icon-button"
            title="Предыдущая коллекция"
            aria-label="Предыдущая коллекция"
            disabled={!canPrev}
            onClick={() => api?.scrollPrev()}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            className="icon-button"
            title="Следующая коллекция"
            aria-label="Следующая коллекция"
            disabled={!canNext}
            onClick={() => api?.scrollNext()}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
