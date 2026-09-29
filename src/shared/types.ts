export type ViewId = 'home' | 'collections' | 'philosophy' | 'contacts';

export type NavItem = {
  id: Exclude<ViewId, 'home'>;
  label: string;
};

export type HeroSlide = {
  id: string;
  image: string;
  alt: string;
};

export type CollectionItem = {
  title: string;
  image: string;
  description: string;
};
