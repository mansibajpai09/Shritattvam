import { useEffect, useState } from 'react'

import hero1 from '../assets/placeholders/hero1.svg'
import hero2 from '../assets/placeholders/hero2.svg'
import hero3 from '../assets/placeholders/hero3.svg'
import hero4 from '../assets/placeholders/hero4.svg'
import hero5 from '../assets/placeholders/hero5.svg'

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const slides = [
    {
      image: hero1,
      alt: 'Shritattvam premium pooja essentials',
    },
    {
      image: hero2,
      alt: 'Shritattvam divine pooja collection',
    },
    {
      image: hero3,
      alt: 'Shritattvam festive pooja collection',
    },
    {
      image: hero4,
      alt: 'Shritattvam premium incense and pooja collection',
    },
    {
      image: hero5,
      alt: 'Shritattvam divine gifts and pooja collection',
    },
  ]

  /* -----------------------------
     NEXT SLIDE
  ----------------------------- */
  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length)
  }

  /* -----------------------------
     PREVIOUS SLIDE
  ----------------------------- */
  const previousSlide = () => {
    setActiveSlide(
      (current) => (current - 1 + slides.length) % slides.length
    )
  }

  /* -----------------------------
     AUTOMATIC SLIDES
     Changes every 5 seconds
  ----------------------------- */
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isPaused, slides.length])

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="Shritattvam hero banner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* =========================
          HERO CAROUSEL
      ========================== */}

      <div className="relative aspect-[21/9] min-h-[420px] max-h-[560px] w-full md:min-h-[480px]">

        {/* SLIDES CONTAINER */}

        <div className="absolute inset-0 overflow-hidden">

          <div
            className="flex h-full w-full transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${activeSlide * 100}%)`,
            }}
          >

            {slides.map((slide, index) => (
              <div
                key={index}
                className="relative h-full w-full flex-shrink-0"
              >

                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="h-full w-full object-cover object-center"
                />

              </div>
            ))}

          </div>

        </div>


        {/* =========================
            LEFT ARROW
        ========================== */}

        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="
            absolute
            left-4
            top-1/2
            z-30
            flex
            h-10
            w-10
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/40
            bg-black/20
            text-2xl
            leading-none
            text-white
            backdrop-blur-sm
            transition-all
            duration-300
            hover:scale-110
            hover:bg-black/40
            md:left-6
            md:h-12
            md:w-12
          "
        >
          ‹
        </button>


        {/* =========================
            RIGHT ARROW
        ========================== */}

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="
            absolute
            right-4
            top-1/2
            z-30
            flex
            h-10
            w-10
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/40
            bg-black/20
            text-2xl
            leading-none
            text-white
            backdrop-blur-sm
            transition-all
            duration-300
            hover:scale-110
            hover:bg-black/40
            md:right-6
            md:h-12
            md:w-12
          "
        >
          ›
        </button>


        {/* =========================
            TIMER BAR
        ========================== */}

        <div className="absolute bottom-0 left-0 z-30 h-[2px] w-full bg-white/20">

          <div
            key={activeSlide}
            className="h-full origin-left bg-gold"
            style={{
              animation: 'heroTimer 5s linear forwards',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          />

        </div>


        {/* =========================
            PAGINATION DOTS
        ========================== */}

        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">

          {slides.map((_, index) => (

            <button
              key={index}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={
                activeSlide === index ? 'true' : 'false'
              }
              className={`
                h-2
                rounded-full
                transition-all
                duration-300
                ${
                  activeSlide === index
                    ? 'w-6 bg-gold'
                    : 'w-2 bg-white/50 hover:bg-white/80'
                }
              `}
            />

          ))}

        </div>

      </div>


      {/* =========================
          TIMER ANIMATION
      ========================== */}

      <style>
        {`
          @keyframes heroTimer {
            from {
              transform: scaleX(0);
            }

            to {
              transform: scaleX(1);
            }
          }
        `}
      </style>

    </section>
  )
}

export default Hero