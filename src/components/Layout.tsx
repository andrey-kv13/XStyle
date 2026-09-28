import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowUpRight, Phone, Pause, Play } from 'lucide-react';
import { Preloader } from './Preloader';
import { CollectionsCarousel } from './CollectionsCarousel';

type View = 'home' | 'collections' | 'philosophy' | 'contacts';
const navigation: { id: View; label: string }[] = [{ id: 'collections', label: 'Коллекции' }, { id: 'philosophy', label: 'Философия' }, { id: 'contacts', label: 'Контакты' }];
const images = ['showroom-hero', 'dining-room', 'bedroom'];
function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const [large, setLarge] = useState(false);
  useEffect(() => {
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); setLarge(!!(e.target as Element).closest('button,a,img')); };
    const leave = () => { x.set(-100); y.set(-100); };
    window.addEventListener('pointermove', move); document.addEventListener('pointerleave', leave);
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); };
  }, [x, y]);
  return <motion.div aria-hidden className="custom-cursor pointer-events-none fixed left-0 top-0 z-[110] h-2 w-2 rounded-full bg-[#B18D73]" style={{ x, y }} animate={{ scale: large ? 4 : 1, opacity: large ? 0.45 : 1 }} transition={{ duration: 0.3 }} />;
}
function Home({ explore }: { explore: () => void }) {
  const [index, setIndex] = useState(0), [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 35, damping: 25 }), y = useSpring(0, { stiffness: 35, damping: 25 }), bx = useSpring(0), by = useSpring(0);
  useEffect(() => { if (paused || reduced) return; const timer = window.setInterval(() => setIndex(value => (value + 1) % images.length), 7000); return () => clearInterval(timer); }, [paused, reduced]);
  return <section className="hero relative h-full overflow-hidden bg-[#343B35] text-[#E5E5E5]" onPointerMove={e => { if (!reduced && e.pointerType === 'mouse') { x.set((e.clientX / window.innerWidth - 0.5) * 16); y.set((e.clientY / window.innerHeight - 0.5) * 12); } }} onPointerLeave={() => { x.set(0); y.set(0); }}>
    <motion.div className="absolute -inset-4" style={{ x, y }}><AnimatePresence initial={false}><motion.img key={index} src={`/media/${images[index]}.jpg`} alt="Мебель и интерьер шоурума X-style" className="absolute h-full w-full object-cover" initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: reduced || paused ? 1.02 : 1.09 }} exit={{ opacity: 0 }} transition={{ opacity: { duration: 1 }, scale: { duration: 8, ease: 'linear' } }} /></AnimatePresence></motion.div>
    <div className="absolute inset-0 bg-[#121212]/30" />
    <div className="hero-copy absolute left-6 bottom-24 md:left-14 md:bottom-28 max-w-xl"><p className="mb-5 text-xs uppercase text-[#DDDCD2]">X-style / Интерьерный бутик</p><h1 className="font-serif text-5xl md:text-6xl leading-tight">Искусство<br />жить красиво.</h1><p className="mt-5 max-w-sm text-base leading-relaxed">Мебель с характером.<br />Пространство, в котором вы дома.</p>
      <motion.button style={{ x: bx, y: by }} onPointerMove={e => { if (reduced || e.pointerType !== 'mouse') return; const r = e.currentTarget.getBoundingClientRect(); bx.set((e.clientX - r.left - r.width / 2) * 0.15); by.set((e.clientY - r.top - r.height / 2) * 0.15); }} onPointerLeave={() => { bx.set(0); by.set(0); }} onClick={explore} className="mt-8 flex items-center gap-9 border border-[#E5E5E5]/65 px-6 py-4 text-sm hover:bg-[#E5E5E5]/10 transition-colors">Исследовать <ArrowUpRight size={18} /></motion.button>
    </div>
    <div className="absolute inset-x-6 bottom-6 flex items-center justify-between md:inset-x-14"><span className="text-xs text-[#D7D9D2]">Форма. Фактура. Ощущение.</span><div className="flex items-center gap-3">{images.map((_, i) => <button key={i} aria-label={`Интерьер ${i + 1}`} aria-pressed={index === i} onClick={() => setIndex(i)} className="flex h-11 w-9 items-center"><span className={`h-px w-full ${i === index ? 'bg-[#E5E5E5]' : 'bg-[#E5E5E5]/35'}`} /></button>)}<button className="p-3" onClick={() => setPaused(!paused)} aria-label={paused ? 'Продолжить слайдер' : 'Остановить слайдер'}>{paused ? <Play size={14} /> : <Pause size={14} />}</button></div></div>
  </section>;
}
function Philosophy() {
  return <section className="editorial view-padding grid h-full min-h-0 gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-16"><img className="h-full min-h-0 w-full object-cover rounded-sm" src="/media/table-detail.jpg" alt="Фактура и детали обеденного стола" /><div className="flex flex-col justify-center max-w-xl"><p className="eyebrow mb-6">Философия X-style</p><h1 className="font-serif text-4xl md:text-5xl leading-tight">Меньше шума.<br /><span className="text-sage">Больше смысла.</span></h1><p className="mt-7 text-base leading-relaxed text-muted">Мы ценим вещи, к которым хочется прикоснуться. Честные фактуры, спокойные формы и пропорции, которые чувствуешь с первого взгляда.</p><p className="mt-4 text-base leading-relaxed text-muted">Хорошая мебель оставляет место для главного: вашей жизни.</p><span className="signature mt-8 font-serif text-2xl text-brass">X-style.</span></div></section>;
}
function Contacts() {
  return <section className="editorial view-padding grid h-full gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-16"><div className="flex max-w-xl flex-col justify-center"><p className="eyebrow mb-6">Личное знакомство</p><h1 className="font-serif text-4xl md:text-5xl leading-tight">Почувствуйте<br />свой интерьер.</h1><p className="mt-7 text-base leading-relaxed text-muted">Рассмотрите фактуры, сравните оттенки и найдите предметы, с которыми хочется жить.</p><p className="mt-6 border-t border-ink/15 pt-6 text-sm text-muted">Контакты шоурума скоро появятся здесь.</p></div><img src="/media/decor.jpg" alt="Детали интерьера шоурума" className="h-full min-h-0 w-full object-cover rounded-sm" /></section>;
}
export function Layout() {
  const [view, setView] = useState<View>('home'), [loading, setLoading] = useState(true);
  const reduced = useReducedMotion(), loaded = useCallback(() => setLoading(false), []), home = view === 'home';
  useEffect(() => { document.title = `X-style | ${navigation.find(item => item.id === view)?.label ?? 'Интерьерный бутик'}`; }, [view]);
  return <div className="app-shell relative h-screen overflow-hidden bg-surface text-ink font-sans"><div inert={loading} className="h-full">
    <header className={`app-header absolute inset-x-0 top-0 z-30 grid items-center border-b px-6 md:px-14 ${home ? 'text-[#E5E5E5] border-[#E5E5E5]/25 bg-[#121212]/20' : 'border-ink/15 bg-surface'}`}><button onClick={() => setView('home')} className="justify-self-start font-serif text-3xl" aria-label="X-style: главная">X-style<span className="text-[#B18D73]">.</span></button><nav className="main-nav flex justify-center gap-6 md:gap-10" aria-label="Основная навигация">{navigation.map(item => <button key={item.id} onClick={() => setView(item.id)} aria-current={view === item.id ? 'page' : undefined} className={`relative py-4 text-xs transition-opacity hover:opacity-100 ${view === item.id ? 'opacity-100' : 'opacity-70'}`}>{item.label}{view === item.id && <motion.span layoutId="nav-line" className="absolute inset-x-0 bottom-1 h-px bg-brass" />}</button>)}</nav><button onClick={() => setView('contacts')} className="call-link flex items-center justify-self-end gap-2 text-xs"><Phone size={14} /><span>Позвонить</span></button></header>
    <main className={`scene absolute inset-0 ${home ? '' : 'inner-scene'}`}><AnimatePresence mode="wait" initial={false}><motion.div key={view} className="h-full min-h-0" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: reduced ? 0 : 0.8, ease: 'easeInOut' }}>{home ? <Home explore={() => setView('collections')} /> : view === 'collections' ? <CollectionsCarousel onSelect={() => setView('contacts')} /> : view === 'philosophy' ? <Philosophy /> : <Contacts />}</motion.div></AnimatePresence></main>
    </div><AnimatePresence>{loading && <Preloader onComplete={loaded} />}</AnimatePresence><Cursor /></div>;
}
