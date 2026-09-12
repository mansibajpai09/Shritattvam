import { Link } from 'react-router-dom'


function About() {
  return (
    <main className="min-h-screen bg-[#fcfaf7] text-[#211a14]">

      

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <section
        id="our-story"
        className="bg-[#fcfaf7] py-20 md:py-28"
      >

        <div className="section-container">

          <div className="mx-auto max-w-4xl text-center">

            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#9a722d]">
              More Than A Store
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight text-[#211a14] md:text-5xl">
              A Living Connection
              <br />
              Between Generations
            </h2>

            <div className="mx-auto mt-8 h-px w-16 bg-[#c9a45d]" />

            <p className="mt-8 text-base leading-8 text-[#62574e] md:text-lg">
              Shritattvam is more than an online store. It is a humble
              endeavour to preserve the richness of Indian culture,
              Vedic traditions and Sanatan values while bringing them
              gracefully into contemporary homes.
            </p>

            <p className="mt-5 text-base leading-8 text-[#62574e] md:text-lg">
              We believe that when a diya is lit, a mantra is recited
              or a sacred space is prepared, something deeper takes
              place. A moment of stillness. A connection with one's
              roots. A reminder of the values that have travelled
              through generations.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          LEGACY SECTION
      ====================================================== */}

      <section className="overflow-hidden bg-[#f3ede4] py-20 md:py-28">

        <div className="section-container">

          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

           


            {/* Story */}
            <div>

              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#9a722d]">
                Our Heritage
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#211a14] md:text-5xl">
                A Legacy That
                <br />
                Began With Devotion
              </h2>

              <div className="mt-7 space-y-5 text-[#62574e]">

                <p className="leading-8">
                  At the heart of Shritattvam is the life and wisdom of
                  our revered grandfather, Late Pandit Shri Kishorilal
                  Shastri — a man whose life was devoted to spirituality,
                  religious studies, astrology and service to society.
                </p>

                <p className="leading-8">
                  Born on 5 October 1897 on the auspicious occasion of
                  Vijayadashami in Sagar, Madhya Pradesh, his journey
                  began with an early education rooted in religion,
                  traditional practices and spiritual discipline.
                </p>

                <p className="leading-8">
                  His pursuit of knowledge eventually took him to
                  Varanasi, one of India's most revered centres of
                  Vedic learning, where he spent four years pursuing
                  advanced education.
                </p>

                <p className="leading-8">
                  He later made Jhansi his place of work, dedicating
                  himself to Hindu ceremonies, puja rituals, scriptural
                  studies and astrology.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TIMELINE
      ====================================================== */}

      <section className="bg-[#fcfaf7] py-20 md:py-28">

        <div className="section-container">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#9a722d]">
              The Journey
            </p>

            <h2 className="mt-4 font-serif text-4xl md:text-5xl">
              A Life Rooted In Knowledge
            </h2>

          </div>


          <div className="mx-auto mt-16 max-w-4xl">

            {/* Timeline Item */}
            <div className="grid gap-5 border-l border-[#d7c5aa] pb-12 pl-8 md:grid-cols-[130px_1fr]">

              <div>
                <span className="font-serif text-2xl text-[#9a722d]">
                  1897
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl">
                  The Beginning
                </h3>

                <p className="mt-3 leading-8 text-[#62574e]">
                  Born in Sagar, Madhya Pradesh, on Vijayadashami,
                  marking the beginning of a life deeply connected
                  with spirituality and tradition.
                </p>
              </div>

            </div>


            {/* Timeline Item */}
            <div className="grid gap-5 border-l border-[#d7c5aa] pb-12 pl-8 md:grid-cols-[130px_1fr]">

              <div>
                <span className="font-serif text-2xl text-[#9a722d]">
                  Varanasi
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl">
                  The Pursuit Of Knowledge
                </h3>

                <p className="mt-3 leading-8 text-[#62574e]">
                  Four years of advanced education in Varanasi deepened
                  his understanding of India's spiritual and Vedic
                  traditions.
                </p>
              </div>

            </div>


            {/* Timeline Item */}
            <div className="grid gap-5 border-l border-[#d7c5aa] pb-12 pl-8 md:grid-cols-[130px_1fr]">

              <div>
                <span className="font-serif text-2xl text-[#9a722d]">
                  Jhansi
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl">
                  A Life Of Service
                </h3>

                <p className="mt-3 leading-8 text-[#62574e]">
                  His work in religious ceremonies, scriptural studies,
                  astrology and social service allowed his knowledge
                  to become a source of guidance for countless people.
                </p>
              </div>

            </div>


            {/* Timeline Item */}
            <div className="grid gap-5 border-l border-[#c9a45d] pl-8 md:grid-cols-[130px_1fr]">

              <div>
                <span className="font-serif text-2xl text-[#9a722d]">
                  Today
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl">
                  The Legacy Continues
                </h3>

                <p className="mt-3 leading-8 text-[#62574e]">
                  Shritattvam carries this legacy forward by bringing
                  authentic, trustworthy and tradition-inspired
                  religious products to families across India.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          OUR PHILOSOPHY
      ====================================================== */}

      <section className="bg-[#211a14] py-20 text-[#faf5ed] md:py-28">

        <div className="section-container">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#d4ad67]">
              What We Believe
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">
              Worship Is More Than A Ritual.
            </h2>

            <p className="mt-7 leading-8 text-[#d9cec0]">
              It is a moment to pause. To reconnect. To create balance
              within and around us. It is a language through which
              generations have expressed gratitude, devotion and hope.
            </p>

          </div>


          <div className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">

            <div className="bg-[#211a14] p-8 text-center md:p-10">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#c9a45d]/50">
                <span className="font-serif text-xl text-[#d4ad67]">
                  I
                </span>
              </div>

              <h3 className="mt-6 font-serif text-2xl">
                Authenticity
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#cfc2b4]">
                Products chosen with care, respect for tradition and
                an unwavering commitment to trust.
              </p>

            </div>


            <div className="bg-[#211a14] p-8 text-center md:p-10">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#c9a45d]/50">
                <span className="font-serif text-xl text-[#d4ad67]">
                  II
                </span>
              </div>

              <h3 className="mt-6 font-serif text-2xl">
                Tradition
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#cfc2b4]">
                Honouring timeless practices while presenting them
                through a contemporary and accessible experience.
              </p>

            </div>


            <div className="bg-[#211a14] p-8 text-center md:p-10">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#c9a45d]/50">
                <span className="font-serif text-xl text-[#d4ad67]">
                  III
                </span>
              </div>

              <h3 className="mt-6 font-serif text-2xl">
                Integrity
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#cfc2b4]">
                Building a brand that treats spirituality, customers
                and cultural heritage with sincerity.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          QUOTE
      ====================================================== */}

      <section className="bg-[#f3ede4] px-6 py-20 md:py-28">

        <div className="mx-auto max-w-4xl text-center">

          <div className="font-serif text-6xl leading-none text-[#c9a45d]">
            “
          </div>

          <blockquote className="mt-4 font-serif text-3xl leading-relaxed text-[#211a14] md:text-4xl">
            Our commitment is to carry forward the teachings of
            Late Pandit Shri Kishorilal Shastri and bring the wisdom
            of tradition into every home through modern and
            accessible means.
          </blockquote>

          <div className="mx-auto mt-8 h-px w-14 bg-[#c9a45d]" />

          <p className="mt-5 text-xs font-medium uppercase tracking-[0.25em] text-[#8a6a38]">
            The Shritattvam Promise
          </p>

        </div>

      </section>


      {/* =====================================================
          VISION
      ====================================================== */}

      <section className="bg-[#fcfaf7] py-20 md:py-28">

        <div className="section-container">

          <div className="mx-auto max-w-4xl text-center">

            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#9a722d]">
              Looking Ahead
            </p>

            <h2 className="mt-4 font-serif text-4xl md:text-5xl">
              Bringing Ancient Wisdom
              <br />
              Into Modern Homes
            </h2>

            <p className="mx-auto mt-7 max-w-2xl leading-8 text-[#62574e]">
              Our vision reaches beyond the products we offer. We aspire
              to become a bridge between generations — preserving the
              timeless wisdom of Sanatan traditions while making it
              accessible to families growing up in a modern world.
            </p>

            <Link
              to="/collection"
              className="
                mt-9
                inline-flex
                items-center
                justify-center
                rounded-md
                bg-[#211a14]
                px-8
                py-4
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#3a2b20]
              "
            >
              Discover Shritattvam
            </Link>

          </div>

        </div>

      </section>

    </main>
  )
}

export default About