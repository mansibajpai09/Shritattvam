import journeyImg from '../assets/placeholders/journey.svg'
const badges = [
  { icon: '✦', label: '100% Authentic' },
  { icon: '♻', label: 'Ethically Sourced' },
  { icon: '☸', label: 'Pure Devotion' },
]
function Journey() {
  return (
    <section className="py-16 md:py-20" id="journey">
      <div className="section-container">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-lg shadow-card">
            <img
              src={journeyImg}
              alt="Lit diya in a traditional stone-carved shrine niche"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
          <div>
            <h2 className="section-heading mb-6">Our Journey</h2>
            <p className="text-[15px] leading-[1.8] text-brown-muted">
              ShriTatvam was born from a deep reverence for tradition and a desire to bring
              authentic, premium pooja essentials to every home. We carefully source each item —
              from hand-crafted brass diyas to pure sandalwood incense — ensuring that every
              ritual you perform is enriched with purity and devotion. Our mission is simple:
              to elevate your spiritual practice with products that honour the sacred.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-0 rounded-full bg-cream-card px-2 py-2 shadow-card">
              {badges.map((badge, i) => (
                <div
                  key={badge.label}
                  className={`flex flex-1 items-center justify-center gap-2 px-4 py-2.5 text-center ${
                    i < badges.length - 1 ? 'border-r border-brown/10' : ''
                  }`}
                >
                  <span className="text-gold text-sm" aria-hidden="true">{badge.icon}</span>
                  <span className="text-xs font-medium text-brown md:text-[13px]">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Journey