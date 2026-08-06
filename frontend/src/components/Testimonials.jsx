const testimonials = [
  {
    quote: 'The quality and packaging is simply divine. Every item feels thoughtfully curated.',
    author: 'Anjali Mehta',
  },
  {
    quote: 'Beautiful brass diya — the craftsmanship is exceptional. Will order again!',
    author: 'Rajesh Kumar',
  },
  {
    quote: 'Perfect pooja kit for our home temple. Authentic products, fast delivery.',
    author: 'Priya Sharma',
  },
  {
    quote: 'The incense sticks have the most calming fragrance. Highly recommend ShriTatvam.',
    author: 'Meera Patel',
  },
]
function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4 text-gold" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}
function Testimonials() {
  return (
    <section className="py-16 md:py-20" id="testimonials">
      <div className="section-container">
        <h2 className="section-heading mb-10 text-center md:mb-12">Happy Customers</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item) => (
            <blockquote
              key={item.author}
              className="flex flex-col rounded-lg bg-cream-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover md:p-7"
            >
              <StarRating />
              <p className="mt-4 flex-1 text-sm italic leading-relaxed text-brown-muted">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-5 text-sm font-medium text-brown">
                — {item.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Testimonials