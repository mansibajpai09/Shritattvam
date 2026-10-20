import poojaKitImg from '../assets/placeholders/pooja-kit.svg'
import incenseImg from '../assets/placeholders/incense.svg'
import comboImg from '../assets/placeholders/combo.svg'
import decorImg from '../assets/placeholders/decor.svg'
const smallCards = [
  {
    title: 'Incense Sticks',
    subtitle: 'Sacred aromas for every prayer',
    image: incenseImg,
    imageAlt: 'Incense sticks placeholder',
  },
  {
    title: 'Combos',
    subtitle: 'Curated bundles at great value',
    image: comboImg,
    imageAlt: 'Combo box placeholder',
  },
  {
    title: 'Decor & Gifts',
    subtitle: 'Thoughtful gifts for loved ones',
    image: decorImg,
    imageAlt: 'Brass decor placeholder',
  },
]
function ShopLink() {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-medium text-brown transition-all duration-300 group-hover:gap-2 group-hover:text-gold-dark">
      Shop Now
      <span aria-hidden="true">→</span>
    </span>
  )
}
function TopPicks() {
  return (
    <section className="py-16 md:py-20" id="collections">
      <div className="section-container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="section-heading">Collections</h2>
          
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr] lg:grid-rows-[1fr_1fr] lg:gap-5">
          {/* Large card — Pooja Kits */}
          <a
            href="#pooja-kits"
            className="group flex min-h-[280px] overflow-hidden rounded-lg bg-cream-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover lg:row-span-2 lg:min-h-0"
          >
            <div className="flex flex-1 flex-col justify-center p-8 md:p-10">
              <h3 className="font-serif text-2xl font-medium text-brown md:text-[28px]">
                Pooja Kits
              </h3>
              <p className="mt-2 text-sm text-brown-muted">
                Complete kits for Every Occasion
              </p>
              <div className="mt-6">
                <ShopLink />
              </div>
            </div>
            <div className="relative w-[42%] shrink-0 overflow-hidden">
              <img
                src={poojaKitImg}
                alt="Brass pooja kit set"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </a>
          {/* Incense Sticks — top right */}
          <a
            href="#incense-sticks"
            className="group flex min-h-[130px] overflow-hidden rounded-lg bg-cream-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <h3 className="font-serif text-lg font-medium text-brown md:text-xl">
                {smallCards[0].title}
              </h3>
              <p className="mt-1 text-xs text-brown-muted md:text-sm">
                {smallCards[0].subtitle}
              </p>
              <div className="mt-3">
                <ShopLink />
              </div>
            </div>
            <div className="relative w-[120px] shrink-0 overflow-hidden md:w-[140px]">
              <img
                src={smallCards[0].image}
                alt={smallCards[0].imageAlt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </a>
          {/* Combos + Decor — bottom right row */}
          <div className="grid grid-cols-2 gap-4 lg:gap-5">
            {smallCards.slice(1).map((card) => (
              <a
                key={card.title}
                href={`#${card.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="group flex flex-col overflow-hidden rounded-lg bg-cream-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="flex flex-1 flex-col justify-center p-5 md:p-6">
                  <h3 className="font-serif text-base font-medium text-brown md:text-lg">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-xs text-brown-muted">
                    {card.subtitle}
                  </p>
                  <div className="mt-2">
                    <ShopLink />
                  </div>
                </div>
                <div className="relative h-[100px] overflow-hidden md:h-[110px]">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default TopPicks