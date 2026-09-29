import type { CollectionItem, HeroSlide, NavItem, ViewId } from '../types';
import { assetPath } from '../lib/assetPath';

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
    image: assetPath('media/showroom-hero.jpg'),
    alt: 'Мебель и интерьер шоурума X-style',
  },
  {
    id: 'dining-room',
    image: assetPath('media/dining-room.jpg'),
    alt: 'Обеденная зона шоурума X-style',
  },
  {
    id: 'bedroom',
    image: assetPath('media/bedroom.jpg'),
    alt: 'Спальная зона шоурума X-style',
  },
];

export const collections: CollectionItem[] = [
  { title: 'Столы', image: assetPath('media/dining-room.jpg'), description: 'Место для встреч' },
  { title: 'Стулья', image: assetPath('media/chairs.jpg'), description: 'Искусство быть удобным' },
  { title: 'Кровати', image: assetPath('media/bedroom.jpg'), description: 'Личное пространство' },
  { title: 'Декор', image: assetPath('media/decor.jpg'), description: 'Характер в деталях' },
];
