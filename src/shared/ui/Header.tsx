import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { brand, navigation } from '../config/site';
import type { ViewId } from '../types';

type HeaderProps = {
  currentView: ViewId;
  onNavigate: (view: ViewId) => void;
};

export function Header({ currentView, onNavigate }: HeaderProps) {
  const isHome = currentView === 'home';

  return (
    <header
      className={`app-header absolute inset-x-0 top-0 z-30 grid items-center border-b px-6 md:px-14 ${
        isHome ? 'border-[#E5E5E5]/25 bg-[#121212]/20 text-[#E5E5E5]' : 'border-ink/15 bg-surface'
      }`}
    >
      <button
        onClick={() => onNavigate('home')}
        className="justify-self-start font-serif text-3xl"
        aria-label={`${brand.name}: главная`}
      >
        {brand.name}
        <span className="text-[#B18D73]">{brand.accent}</span>
      </button>

      <nav className="main-nav flex justify-center gap-6 md:gap-10" aria-label="Основная навигация">
        {navigation.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            aria-current={currentView === item.id ? 'page' : undefined}
            className={`relative py-4 text-xs transition-opacity hover:opacity-100 ${
              currentView === item.id ? 'opacity-100' : 'opacity-70'
            }`}
          >
            {item.label}
            {currentView === item.id && (
              <motion.span layoutId="nav-line" className="absolute inset-x-0 bottom-1 h-px bg-brass" />
            )}
          </button>
        ))}
      </nav>

      <button onClick={() => onNavigate('contacts')} className="call-link flex items-center justify-self-end gap-2 text-xs">
        <Phone size={14} />
        <span>Позвонить</span>
      </button>
    </header>
  );
}
