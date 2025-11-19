export type MenuCategory = 'omakase' | 'sushi' | 'hot-dish' | 'drinksdessert';

export interface MenuItem {
  id: string;
  category: MenuCategory;
  name: string;
  price: number; // store numeric, format when displaying
  description: string;
  image: string; // public path e.g. /Menu/omakase-1.jpg
}

export const omakaseItems: MenuItem[] = [
  {
    id: 'omakase-signature',
    category: 'omakase',
    name: 'Aozora Signature Omakase',
    price: 1500,
    description: 'A nine-course tasting menu highlighting the finest seasonal seafood, handcrafted nigiri, and delicate appetizers.',
    image: 'Menu/omakase-1.jpg',
  },
  {
    id: 'omakase-premium-edomae',
    category: 'omakase',
    name: 'Premium Edomae Omakase',
    price: 2000,
    description: 'Traditional Tokyo-style sushi using aged fish and red vinegar rice — a true expression of craftsmanship.',
    image: 'Menu/omakase-2.jpg',
  },
  {
    id: 'omakase-sakura',
    category: 'omakase',
    name: 'Sakura Omakase',
    price: 2000,
    description: 'A poetic balance of sashimi, grilled dishes, and chef’s selection sushi inspired by cherry blossoms.',
    image: 'Menu/omakase-3.jpg',
  },
  {
    id: 'omakase-chef-counter',
    category: 'omakase',
    name: 'Chef’s Counter Experience',
    price: 5000,
    description: 'Exclusive counter seating with direct service from Chef Haruto — includes rare seasonal specialties.',
    image: 'Menu/omakase-4.jpg',
  },
];

export const formatPrice = (value: number) => `₱${value.toLocaleString('en-PH')}`;
