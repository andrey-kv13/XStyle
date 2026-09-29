import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CollectionsCarousel } from '../features/collections/CollectionsCarousel';
import { ContactsView } from '../features/contacts/ContactsView';
import { HomeView } from '../features/home/HomeView';
import { PhilosophyView } from '../features/philosophy/PhilosophyView';
import { brand, viewTitles } from '../shared/config/site';
import type { ViewId } from '../shared/types';
import { CustomCursor } from '../shared/ui/CustomCursor';
import { Header } from '../shared/ui/Header';
import { Preloader } from '../shared/ui/Preloader';

function getView(view: ViewId, onNavigate: (view: ViewId) => void) {
  switch (view) {
    case 'home':
      return <HomeView onExplore={() => onNavigate('collections')} />;
    case 'collections':
      return <CollectionsCarousel onSelect={() => onNavigate('contacts')} />;
    case 'philosophy':
      return <PhilosophyView />;
    case 'contacts':
      return <ContactsView />;
  }
}

export function Layout() {
  const [view, setView] = useState<ViewId>('home');
  const [loading, setLoading] = useState(true);
  const reduced = useReducedMotion();
  const loaded = useCallback(() => setLoading(false), []);
  const isHome = view === 'home';

  useEffect(() => {
    document.title = `${brand.name} | ${viewTitles[view]}`;
  }, [view]);

  return (
    <div className="app-shell relative h-screen overflow-hidden bg-surface font-sans text-ink">
      <div inert={loading ? true : undefined} className="h-full">
        <Header currentView={view} onNavigate={setView} />

        <main className={`scene absolute inset-0 ${isHome ? '' : 'inner-scene'}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={view}
              className="h-full min-h-0"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: reduced ? 0 : 0.8, ease: 'easeInOut' }}
            >
              {getView(view, setView)}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>{loading && <Preloader onComplete={loaded} />}</AnimatePresence>
      <CustomCursor />
    </div>
  );
}
