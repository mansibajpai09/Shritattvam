import product1 from '../assets/placeholders/product-1.svg'
import product2 from '../assets/placeholders/product-2.svg'
import product3 from '../assets/placeholders/product-3.svg'
import product4 from '../assets/placeholders/product-4.svg'

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
    features: [
      'Herbal fragrance',
      'Pleasant natural aroma',
      'Ideal for daily rituals',
      'Easy to use',
    ],
  },
]

export function getProductById(id) {
  return products.find((product) => product.id === Number(id))
}