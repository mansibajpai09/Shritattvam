import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TopPicks from '../components/TopPicks'
import Bestsellers from '../components/Bestsellers'
import Testimonials from '../components/Testimonials'
import Journey from '../components/Journey'
import Features from '../components/Features'
import Footer from '../components/Footer'
function Home() {
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