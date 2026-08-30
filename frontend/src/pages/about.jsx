import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function About() {
  return (
    <div className="min-h-screen bg-cream-light">
      <Navbar />

      <main className="section-container py-16 text-center md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
          ShriTatvam
        </p>

        <h1 className="mt-3 font-serif text-4xl text-brown">
          About Us
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-brown-muted">
          ShriTatvam brings together thoughtfully selected
          pooja essentials and spiritual products with a
          premium, elegant experience.
        </p>
      </main>

      <Footer />
    </div>
  )
}

export default About