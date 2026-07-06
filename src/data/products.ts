export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  currency: string
  image: string
  category: string
  categorySlug: string
  subCategory?: string
  rarity?: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythical'
  inStock: boolean
  stockCount: number
  features: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
}

export const categories: Category[] = [
  {
    id: 'cat-bloxfruit',
    name: 'Blox Fruits',
    slug: 'bloxfruit',
    description: 'Premium Blox Fruits accounts, fruits, and gamepasses. Dominate the seas with the rarest items.',
    image: '/images/cat-bloxfruit.webp',
    productCount: 24,
  },
  {
    id: 'cat-robux',
    name: 'Robux',
    slug: 'robux',
    description: 'Cheapest Robux top-up in the market. Fast delivery via group funds, gamepass, or gift.',
    image: '/images/cat-robux.webp',
    productCount: 12,
  },
  {
    id: 'cat-accounts',
    name: 'Accounts',
    slug: 'accounts',
    description: 'Max level accounts with rare skins, limiteds, and full inventories. Ready to play.',
    image: '/images/cat-accounts.webp',
    productCount: 18,
  },
  {
    id: 'cat-gamepasses',
    name: 'Gamepasses',
    slug: 'gamepasses',
    description: 'Unlock premium gamepasses for your favorite Roblox experiences at the best prices.',
    image: '/images/cat-gamepasses.webp',
    productCount: 15,
  },
]

export const products: Product[] = [
  // Blox Fruits - Fruits
  {
    id: 'prod-001',
    name: 'Dragon Fruit',
    slug: 'dragon-fruit',
    description: 'The legendary Dragon Fruit transforms you into a mighty dragon. Breathe fire and dominate the seas with this mythical fruit. One of the rarest and most powerful fruits in Blox Fruits.',
    price: 32.00,
    originalPrice: 50.00,
    currency: 'USD',
    image: '/images/product-dragon.webp',
    category: 'Blox Fruits',
    categorySlug: 'bloxfruit',
    subCategory: 'Fruits',
    rarity: 'Legendary',
    inStock: true,
    stockCount: 67,
    features: ['Instant delivery via trade', 'Level 700+ required', 'Full transformation abilities', 'Best price guaranteed'],
  },
  {
    id: 'prod-002',
    name: 'Venom Fruit',
    slug: 'venom-fruit',
    description: 'Unleash toxic devastation with the Venom Fruit. Turn into a venomous hydra and poison all who stand in your way. A top-tier mythical fruit for serious players.',
    price: 28.00,
    originalPrice: 45.00,
    currency: 'USD',
    image: '/images/product-venom.webp',
    category: 'Blox Fruits',
    categorySlug: 'bloxfruit',
    subCategory: 'Fruits',
    rarity: 'Mythical',
    inStock: true,
    stockCount: 34,
    features: ['Instant delivery via trade', 'Level 700+ required', 'AOE poison attacks', 'Great for PvP'],
  },
  {
    id: 'prod-003',
    name: 'Kitsune Fruit',
    slug: 'kitsune-fruit',
    description: 'The mythical Kitsune Fruit grants fox-like abilities with devastating fire power. Transform into a nine-tailed fox and rain down fiery destruction.',
    price: 45.00,
    originalPrice: 70.00,
    currency: 'USD',
    image: '/images/product-kitsune.webp',
    category: 'Blox Fruits',
    categorySlug: 'bloxfruit',
    subCategory: 'Fruits',
    rarity: 'Mythical',
    inStock: true,
    stockCount: 22,
    features: ['Instant delivery via trade', 'Level 700+ required', 'Fire transformation', 'Rare galaxy skin variant'],
  },
  {
    id: 'prod-004',
    name: 'Light Fruit',
    slug: 'light-fruit',
    description: 'Become light itself with this legendary fruit. Move at incredible speeds and blind your enemies with dazzling light attacks. Perfect for grinding and PvP.',
    price: 12.00,
    currency: 'USD',
    image: '/images/product-light.webp',
    category: 'Blox Fruits',
    categorySlug: 'bloxfruit',
    subCategory: 'Fruits',
    rarity: 'Legendary',
    inStock: true,
    stockCount: 89,
    features: ['Instant delivery via trade', 'Fast grinding fruit', 'Speed buffs', 'Great for new players'],
  },
  // Blox Fruits - Perms
  {
    id: 'prod-005',
    name: 'Dragon Permanent',
    slug: 'dragon-permanent',
    description: 'Own the Dragon Fruit forever with this permanent version. Never lose your favorite fruit again. Keep it even if you eat another fruit.',
    price: 42.00,
    originalPrice: 65.00,
    currency: 'USD',
    image: '/images/product-dragon-perm.webp',
    category: 'Blox Fruits',
    categorySlug: 'bloxfruit',
    subCategory: 'Perms',
    rarity: 'Legendary',
    inStock: true,
    stockCount: 45,
    features: ['Permanent ownership', 'Delivery via gift', 'No level requirement', 'Never expires'],
  },
  {
    id: 'prod-006',
    name: 'Venom Permanent',
    slug: 'venom-permanent',
    description: 'Get the Venom Fruit permanently. Own this mythical fruit forever and never worry about losing it when switching fruits.',
    price: 38.00,
    originalPrice: 55.00,
    currency: 'USD',
    image: '/images/product-venom-perm.webp',
    category: 'Blox Fruits',
    categorySlug: 'bloxfruit',
    subCategory: 'Perms',
    rarity: 'Mythical',
    inStock: true,
    stockCount: 31,
    features: ['Permanent ownership', 'Delivery via gift', 'No level requirement', 'Safe and secure'],
  },
  // Robux
  {
    id: 'prod-007',
    name: '400 Robux',
    slug: '400-robux',
    description: 'Get 400 Robux at the cheapest price in the market. Instant delivery via group funds. Perfect for gamepasses, cosmetics, and more.',
    price: 3.50,
    originalPrice: 4.99,
    currency: 'USD',
    image: '/images/product-robux-400.webp',
    category: 'Robux',
    categorySlug: 'robux',
    rarity: 'Common',
    inStock: true,
    stockCount: 999,
    features: ['Instant delivery', 'Group funds method', 'Safe & secure', 'Best price guaranteed'],
  },
  {
    id: 'prod-008',
    name: '800 Robux',
    slug: '800-robux',
    description: 'Get 800 Robux at the cheapest price. Instant delivery via group funds. Best value for your money.',
    price: 6.50,
    originalPrice: 9.99,
    currency: 'USD',
    image: '/images/product-robux-800.webp',
    category: 'Robux',
    categorySlug: 'robux',
    rarity: 'Common',
    inStock: true,
    stockCount: 999,
    features: ['Instant delivery', 'Group funds method', 'Safe & secure', 'Best price guaranteed'],
  },
  {
    id: 'prod-009',
    name: '1700 Robux',
    slug: '1700-robux',
    description: 'Get 1700 Robux at an unbeatable price. Fast delivery and secure transaction. The most popular Robux package.',
    price: 12.99,
    originalPrice: 19.99,
    currency: 'USD',
    image: '/images/product-robux-1700.webp',
    category: 'Robux',
    categorySlug: 'robux',
    rarity: 'Uncommon',
    inStock: true,
    stockCount: 999,
    features: ['Instant delivery', 'Group funds method', 'Safe & secure', 'Most popular package'],
  },
  {
    id: 'prod-010',
    name: '4500 Robux',
    slug: '4500-robux',
    description: 'Get 4500 Robux at the best price per Robux ratio. Premium package for serious players.',
    price: 29.99,
    originalPrice: 49.99,
    currency: 'USD',
    image: '/images/product-robux-4500.webp',
    category: 'Robux',
    categorySlug: 'robux',
    rarity: 'Rare',
    inStock: true,
    stockCount: 500,
    features: ['Instant delivery', 'Group funds method', 'Safe & secure', 'Best value package'],
  },
  // Accounts
  {
    id: 'prod-011',
    name: 'Blox Fruit Max Account',
    slug: 'bloxfruit-max-account',
    description: 'Max level Blox Fruit account with full stats, all fighting styles unlocked, and rare items. Ready to dominate the Second Sea.',
    price: 55.00,
    originalPrice: 85.00,
    currency: 'USD',
    image: '/images/product-account-blox.webp',
    category: 'Accounts',
    categorySlug: 'accounts',
    subCategory: 'Blox Fruit Accounts',
    rarity: 'Legendary',
    inStock: true,
    stockCount: 8,
    features: ['Max level (2550+)', 'All fighting styles', 'Full stat reset available', 'Rare items included', 'Email change possible'],
  },
  {
    id: 'prod-012',
    name: 'OG Account 2018',
    slug: 'og-account-2018',
    description: 'Rare OG Roblox account from 2018 with limited items, rare skins, and old event items. Perfect for collectors.',
    price: 120.00,
    originalPrice: 200.00,
    currency: 'USD',
    image: '/images/product-account-og.webp',
    category: 'Accounts',
    categorySlug: 'accounts',
    rarity: 'Mythical',
    inStock: true,
    stockCount: 3,
    features: ['Created in 2018', 'Limited items included', 'Rare skins', 'Full email access', 'Premium verified'],
  },
  // Gamepasses
  {
    id: 'prod-013',
    name: '2x Mastery Gamepass',
    slug: '2x-mastery',
    description: 'Double your mastery gain in Blox Fruits. Level up your weapons and fighting styles twice as fast.',
    price: 8.99,
    originalPrice: 12.99,
    currency: 'USD',
    image: '/images/product-gamepass-mastery.webp',
    category: 'Gamepasses',
    categorySlug: 'gamepasses',
    rarity: 'Rare',
    inStock: true,
    stockCount: 200,
    features: ['Permanent boost', 'Instant delivery', 'Works on all weapons', 'Stackable with other boosts'],
  },
  {
    id: 'prod-014',
    name: '2x Money Gamepass',
    slug: '2x-money',
    description: 'Earn double Beli from all sources. Maximize your farming efficiency and become rich faster.',
    price: 8.99,
    originalPrice: 12.99,
    currency: 'USD',
    image: '/images/product-gamepass-money.webp',
    category: 'Gamepasses',
    categorySlug: 'gamepasses',
    rarity: 'Rare',
    inStock: true,
    stockCount: 200,
    features: ['Permanent boost', 'Instant delivery', 'All Beli sources', 'Best grinding tool'],
  },
  {
    id: 'prod-015',
    name: 'Dark Blade Gamepass',
    slug: 'dark-blade',
    description: 'Unlock the legendary Dark Blade. One of the most iconic swords in Blox Fruits with devastating special attacks.',
    price: 15.00,
    originalPrice: 25.00,
    currency: 'USD',
    image: '/images/product-dark-blade.webp',
    category: 'Gamepasses',
    categorySlug: 'gamepasses',
    rarity: 'Legendary',
    inStock: true,
    stockCount: 50,
    features: ['Legendary sword', 'Special Z attack', 'Increased damage', 'Instant delivery'],
  },
]

export function getProductsByCategory(slug: string): Product[] {
  return products.filter(p => p.categorySlug === slug)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}
