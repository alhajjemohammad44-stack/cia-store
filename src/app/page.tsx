import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { FeaturesStrip } from '@/components/FeaturesStrip'
import { CategoriesShowcase } from '@/components/CategoriesShowcase'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { Reviews } from '@/components/Reviews'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturesStrip />
        <CategoriesShowcase />
        <FeaturedProducts />
        <Reviews />
      </main>
      <Footer />
    </>
  )
}
