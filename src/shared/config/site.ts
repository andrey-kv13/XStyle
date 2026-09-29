import type { CollectionItem, HeroSlide, NavItem, ViewId } from '../types';

export const brand = {
  name: 'X-style',
  title: 'Интерьерный бутик',
  accent: '.',
} as const;

export const navigation: NavItem[] = [
  { id: 'collections', label: 'Коллекции' },
  { id: 'philosophy', label: 'Философия' },
  { id: 'contacts', label: 'Контакты' },
];

export const viewTitles: Record<ViewId, string> = {
  home: 'Интерьерный бутик',
  collections: 'Коллекции',
  philosophy: 'Философия',
  contacts: 'Контакты',
};

export const heroSlides: HeroSlide[] = [
  {
    id: 'showroom-hero',
    image: '/media/showroom-hero.jpg',
    alt: 'Мебель и интерьер шоурума X-style',
  },
  {
    id: 'dining-room',
    image: '/media/dining-room.jpg',
    alt: 'Обеденная зона шоурума X-style',
  },
  {
    id: 'bedroom',
    image: '/media/bedroom.jpg',
    alt: 'Спальная зона шоурума X-style',
  },
];

export const collections: CollectionItem[] = [
  { title: 'Столы', image: '/media/dining-room.jpg', description: 'Место для встреч' },
  { title: 'Стулья', image: '/media/chairs.jpg', description: 'Искусство быть удобным' },
  { title: 'Кровати', image: '/media/bedroom.jpg', description: 'Личное пространство' },
  { title: 'Декор', image: '/media/decor.jpg', description: 'Характер в деталях' },
];
