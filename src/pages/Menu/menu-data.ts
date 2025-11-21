export type MenuCategory = 'omakase' | 'sushi' | 'hot-dish' | 'drinksdessert';

export interface MenuItem {
  id: string;
  category: MenuCategory;
  name: string;
  price: number; 
  description: string;
  image: string;
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

export const sushiItems: MenuItem[] = [
  {
    id: 'sushi-otoro-nigiri',
    category: 'sushi',
    name: 'Otoro Nigiri',
    price: 250,
    description: 'The most prized cut of bluefin tuna belly, melt-in-your-mouth rich and buttery.',
    image: 'Menu/sushi-1.jpg',
  },
  {
    id: 'sushi-yellowtail-sashimi',
    category: 'sushi',
    name: 'Yellowtail Sashimi',
    price: 300,
    description: 'Fresh, subtly sweet yellowtail with a smooth texture and balanced flavor.',
    image: 'Menu/sushi-2.jpg',
  },
  {
    id: 'sushi-salmon-aburi',
    category: 'sushi',
    name: 'Salmon Aburi Roll',
    price: 200,
    description: 'Flame-seared salmon roll topped with creamy mayo and tobiko for a smoky finish.',
    image: 'Menu/sushi-3.jpg',
  },
  {
    id: 'sushi-ebi-tempura',
    category: 'sushi',
    name: 'Ebi Tempura Roll',
    price: 180,
    description: 'Crispy shrimp tempura roll with avocado, drizzled with sweet soy glaze.',
    image: 'Menu/sushi-4.jpg',
  },
  {
    id: 'sushi-unagi-don',
    category: 'sushi',
    name: 'Unagi Don',
    price: 390,
    description: 'Grilled freshwater eel served over sushi rice, glazed with house-made tare sauce.',
    image: 'Menu/sushi-5.jpg',
  },
  {
    id: 'sushi-spicy-tuna-maki',
    category: 'sushi',
    name: 'Spicy Tuna Maki',
    price: 180,
    description: 'Chopped tuna mixed with chili oil, sesame, and spicy mayo — bold and satisfying.',
    image: 'Menu/sushi-6.jpg',
  },
  {
    id: 'sushi-chirashi-bowl',
    category: 'sushi',
    name: 'Chirashi Bowl',
    price: 300,
    description: 'A colorful assortment of sashimi over seasoned rice, topped with tamago and pickles.',
    image: 'Menu/sushi-7.jpg',
  },
  {
    id: 'sushi-aozora-special',
    category: 'sushi',
    name: 'Aozora Special Nigiri Set',
    price: 600,
    description: 'A curated selection of eight premium nigiri — from scallop to uni.',
    image: 'Menu/sushi-8.jpg',
  },
];

export const hotDishItems: MenuItem[] = [
  {
    id: 'hotdish-miso-soup',
    category: 'hot-dish',
    name: 'Miso Soup with Tofu & Wakame',
    price: 100,
    description: 'A comforting broth of dashi and miso with silky tofu and seaweed.',
    image: 'Menu/addons-1.jpg',
  },
  {
    id: 'hotdish-agedashi-tofu',
    category: 'hot-dish',
    name: 'Agedashi Tofu',
    price: 250,
    description: 'Crispy fried tofu in light dashi broth, topped with grated radish and bonito flakes.',
    image: 'Menu/addons-2.jpg',
  },
  {
    id: 'hotdish-wagyu-tataki',
    category: 'hot-dish',
    name: 'Wagyu Tataki',
    price: 400,
    description: 'Lightly seared wagyu beef slices with ponzu sauce and garlic chips.',
    image: 'Menu/addons-3.jpg',
  },
  {
    id: 'hotdish-gindara-saikyo',
    category: 'hot-dish',
    name: 'Gindara Saikyo Yaki',
    price: 450,
    description: 'Grilled black cod marinated in sweet miso — buttery and delicate.',
    image: 'Menu/addons-4.jpg',
  },
  {
    id: 'hotdish-tori-karaage',
    category: 'hot-dish',
    name: 'Tori Karaage',
    price: 200,
    description: 'Japanese-style fried chicken with citrus mayo — crisp and juicy perfection.',
    image: 'Menu/addons-5.jpg',
  },
];

export const drinkItems: MenuItem[] = [
  {
    id: 'drink-matcha-latte',
    category: 'drinksdessert',
    name: 'Matcha Iced Latte',
    price: 200,
    description: 'Creamy matcha with a perfect balance of sweetness and nuttiness.',
    image: '',
  },
  {
    id: 'drink-yuzu-soda',
    category: 'drinksdessert',
    name: 'Yuzu Sparkling Soda',
    price: 90,
    description: 'Refreshing citrus fizz with Japanese yuzu and mint.',
    image: '',
  },
  {
    id: 'drink-green-tea',
    category: 'drinksdessert',
    name: 'Hot Green Tea (Sencha)',
    price: 250,
    description: 'Traditional loose-leaf green tea served in a ceramic pot.',
    image: '',
  },
  {
    id: 'drink-asahi-beer',
    category: 'drinksdessert',
    name: 'Asahi Draft Beer',
    price: 170,
    description: 'Crisp and refreshing — the perfect pairing for sushi.',
    image: '',
  },
  {
    id: 'drink-sake',
    category: 'drinksdessert',
    name: 'Dassai 45 Junmai Daiginjo (Sake Glass)',
    price: 90,
    description: 'Premium sake with floral aroma and smooth finish.',
    image: '',
  },
];

export const dessertItems: MenuItem[] = [
  {
    id: 'dessert-matcha-cheesecake',
    category: 'drinksdessert',
    name: 'Matcha Cheesecake',
    price: 250,
    description: 'Creamy, rich cheesecake infused with premium Uji matcha.',
    image: '',
  },
  {
    id: 'dessert-sesame-ice-cream',
    category: 'drinksdessert',
    name: 'Black Sesame Ice Cream',
    price: 100,
    description: 'Smooth and nutty with roasted sesame flavor — a Japanese classic.',
    image: '',
  },
  {
    id: 'dessert-yuzu-sorbet',
    category: 'drinksdessert',
    name: 'Yuzu Sorbet',
    price: 200,
    description: 'Light, tangy, and refreshing — the perfect palate cleanser.',
    image: '',
  },
  {
    id: 'dessert-mochi-trio',
    category: 'drinksdessert',
    name: 'Mochi Trio',
    price: 250,
    description: 'Soft rice cakes filled with matcha, red bean, and mango cream.',
    image: '',
  },
  {
    id: 'dessert-hojicha-pudding',
    category: 'drinksdessert',
    name: 'Hojicha Pudding',
    price: 180,
    description: 'Roasted green tea custard with caramel glaze — subtly sweet and aromatic.',
    image: '',
  },
];

export const formatPrice = (value: number) => `₱${value.toLocaleString('en-PH')}`;
