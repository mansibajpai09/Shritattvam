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
    if (location.state?.scrollTo === 'collections') {
      scrollToCollections()
    }
  }, [location.state])
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