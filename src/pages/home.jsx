import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TopPicks from '../components/TopPicks'
import Bestsellers from '../components/Bestsellers'
import Testimonials from '../components/Testimonials'
import Journey from '../components/Journey'
import Features from '../components/Features'
import Footer from '../components/Footer'
import { scrollToCollections } from '../utils/navigation'

function Home() {
  const location = useLocation()

  useEffect(() => {
    if (
      location.state?.scrollToSection === 'collections' ||
      location.hash === '#collections' ||
      location.hash === '#top-picks'
    ) {
      // Ensure we start from top of Home page so smooth scroll animates cleanly down
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

      const timer = setTimeout(() => {
        scrollToCollections()
      }, 50)

      return () => clearTimeout(timer)
    }
  }, [location.key, location.state, location.hash])
  return (
    <div className="min-h-screen bg-cream-light">
      <Navbar />
      <main>
        <Hero />
        <TopPicks />
        <Bestsellers />
        <Testimonials />
        <Journey />
        <Features />
      </main>
      <Footer />
    </div>
  )
}
export default Home