import product1 from '../assets/placeholders/product-1.svg'
import product2 from '../assets/placeholders/product-2.svg'
import product3 from '../assets/placeholders/product-3.svg'
import product4 from '../assets/placeholders/product-4.svg'
import product5 from '../assets/placeholders/product-5.svg'
import poojaKitImg from '../assets/placeholders/pooja-kit.svg'
import incenseImg from '../assets/placeholders/incense.svg'
import comboImg from '../assets/placeholders/combo.svg'
import decorImg from '../assets/placeholders/decor.svg'

export const products = [
  {
    id: 1,
    name: 'Divine Pooja Kit (Small)',
    subtitle: 'Complete essentials for daily pooja',
    description:
      'A complete pooja kit with all essential items for daily prayers and rituals.',
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    image: product1,
    category: 'Pooja Kits',
    rating: 4.8,
    reviews: 101,
    inStock: true,
    createdAt: '2026-01-10',
    features: [
      'Premium quality materials',
      'Perfect for daily pooja',
      'Includes essential items',
      'Beautifully packaged',
    ],
  },
  {
    id: 2,
    name: 'Sandalwood Incense',
    subtitle: 'Sacred aroma for peaceful rituals',
    description:
      'Premium sandalwood incense sticks created to bring a calm and devotional fragrance to your space.',
    price: 349,
    originalPrice: 399,
    discount: 13,
    image: product2,
    category: 'Incense',
    rating: 4.7,
    reviews: 84,
    inStock: true,
    createdAt: '2026-01-18',
    features: [
      'Premium sandalwood fragrance',
      'Long-lasting aroma',
      'Ideal for daily prayers',
      'Carefully packed',
    ],
  },
  {
    id: 3,
    name: 'Brass Lotus Diya',
    subtitle: 'Elegant brass diya for sacred spaces',
    description:
      'A beautifully crafted brass lotus diya designed for pooja, festivals and elegant spiritual decor.',
    price: 899,
    originalPrice: 999,
    discount: 10,
    image: product3,
    category: 'Decor',
    rating: 4.8,
    reviews: 67,
    inStock: true,
    createdAt: '2026-02-01',
    features: [
      'Premium brass finish',
      'Elegant lotus design',
      'Perfect for pooja',
      'Reusable and durable',
    ],
  },
  {
    id: 4,
    name: 'Herbal Dhoop Sticks',
    subtitle: 'Natural fragrance for peaceful rituals',
    description:
      'A soothing blend of herbal fragrances for a peaceful and devotional atmosphere.',
    price: 299,
    originalPrice: 349,
    discount: 14,
    image: product4,
    category: 'Dhoop',
    rating: 4.6,
    reviews: 52,
    inStock: true,
    createdAt: '2026-02-12',
    features: [
      'Herbal fragrance',
      'Pleasant natural aroma',
      'Ideal for daily rituals',
      'Easy to use',
    ],
  },
  {
    id: 5,
    name: 'Sacred Brass Temple Ghanti',
    subtitle: 'Resonant handcrafted brass prayer bell',
    description:
      'A solid brass bell crafted with traditional acoustic resonance to invoke positive vibrations and sacred focus.',
    price: 599,
    originalPrice: 799,
    discount: 25,
    image: product5,
    category: 'Decor',
    rating: 4.9,
    reviews: 48,
    inStock: true,
    createdAt: '2026-02-20',
    features: [
      '100% Pure cast brass',
      'Crisp, sustained sacred chime',
      'Garuda motif handle',
      'Tarnish-resistant clear coating',
    ],
  },
  {
    id: 6,
    name: 'Vedic Mahapooja Grand Kit',
    subtitle: 'Comprehensive 21-item ritual collection',
    description:
      'An exhaustive, masterfully curated pooja ensemble including brass thali, panchamrut cups, bell, camphor burner, and organic offerings.',
    price: 2499,
    originalPrice: 2999,
    discount: 17,
    image: poojaKitImg,
    category: 'Pooja Kits',
    rating: 4.9,
    reviews: 92,
    inStock: true,
    createdAt: '2026-03-01',
    features: [
      'Includes 21 authentic ritual items',
      'Heavy-gauge brassware',
      'Velvet-lined gift presentation box',
      'Detailed ritual guidance booklet',
    ],
  },
  {
    id: 7,
    name: 'Pure Kasturi & Rose Agarbatti',
    subtitle: 'Hand-rolled floral & musk blend',
    description:
      'Traditional hand-rolled bamboo-less sticks blending pure Himalayan kasturi notes and Kannauj damask rose.',
    price: 449,
    originalPrice: 499,
    discount: 10,
    image: incenseImg,
    category: 'Incense',
    rating: 4.8,
    reviews: 36,
    inStock: true,
    createdAt: '2026-03-10',
    features: [
      'Zero synthetic charcoal',
      'Over 60 minutes burn time per stick',
      'Organic essential oils base',
      'Includes clay holder',
    ],
  },
  {
    id: 8,
    name: 'Spiritual Harmony Ritual Combo',
    subtitle: 'Dhoop, dhoop daani & pure havan samagri',
    description:
      'An auspicious bundle featuring natural guggul sambrani cups, cast brass burner, and sacred temple herbs.',
    price: 1899,
    originalPrice: 2299,
    discount: 17,
    image: comboImg,
    category: 'Combos',
    rating: 4.9,
    reviews: 75,
    inStock: true,
    createdAt: '2026-03-18',
    features: [
      'Authentic sambrani & cow dung dhoop',
      'Hand-carved brass burner with wooden handle',
      'Purifying temple aromas',
      'Great festive gift package',
    ],
  },
  {
    id: 9,
    name: 'Handcrafted Brass Urli Bowl',
    subtitle: 'Traditional floral & floating diya vessel',
    description:
      'A statement handcrafted brass urli bowl for floating flowers, floating diyas, and welcoming sacred abundance.',
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    image: decorImg,
    category: 'Decor',
    rating: 4.7,
    reviews: 41,
    inStock: true,
    createdAt: '2026-03-25',
    features: [
      'Heirloom quality brass casting',
      'Traditional engraved rim',
      'Diameter: 10 inches',
      'Ideal for festive altar decor',
    ],
  },
]

export function getProductById(id) {
  return products.find((product) => product.id === Number(id))
}