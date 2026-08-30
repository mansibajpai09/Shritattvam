import { Navigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import Breadcrumb from '../components/Productpage/Breadcrumb'
import ProductGallery from '../components/Productpage/ProductGallery'
import ProductInfo from '../components/Productpage/ProductInfo'
import ServiceHighlights from '../components/Productpage/ServiceHighlights'
import ProductTabs from '../components/Productpage/ProductTabs'
import RelatedProducts from '../components/Productpage/RelatedProducts'
import TrustBanner from '../components/Productpage/TrustBanner'

import { getProductById } from '../data/products'

function ProductDetails() {
  const { productId } = useParams()
  const product = getProductById(productId)

  if (!product) {
    return <Navigate to="/collection" replace />
  }

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-stone-900">
      <Navbar />

      <main>
        <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 md:px-8 lg:px-11">
          <Breadcrumb product={product} />

          <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 xl:gap-16">
            <ProductGallery product={product} />

            <ProductInfo product={product} />
          </section>

          <div className="mt-8">
            <ServiceHighlights />
          </div>

          <ProductTabs product={product} />

          <RelatedProducts currentProductId={product.id} />

          <TrustBanner />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ProductDetails