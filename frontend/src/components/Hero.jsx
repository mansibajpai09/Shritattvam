import { useState } from 'react'
import heroBg from '../assets/placeholders/hero-bg.svg'
function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const slides = 5
  return (
    <section className="relative w-full overflow-hidden" aria-label="Hero banner">
      <div className="relative aspect-[21/9] min-h-[420px] max-h-[560px] w-full md:min-h-[480px]">
        <img
          src={heroBg}
          alt="Premium brass pooja essentials arranged on a wooden surface"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-dark/70 via-brown-dark/40 to-transparent" />
        <div className="section-container relative flex h-full items-center">
          <div className="max-w-xl py-16">
            <h1 className="font-serif text-4xl font-medium leading-[1.15] tracking-tight text-cream md:text-5xl lg:text-[52px]">
              Elevate Every Ritual.
              <br />
              Enrich Every Moment.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-cream/85 md:text-[17px]">
              Premium pooja essentials, exquisitely curated for a divine experience.
            </p>
            <a href="#shop" className="btn-primary mt-8">
              Shop Now
            </a>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {Array.from({ length: slides }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === i
                  ? 'w-6 bg-gold'
                  : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
export default Hero