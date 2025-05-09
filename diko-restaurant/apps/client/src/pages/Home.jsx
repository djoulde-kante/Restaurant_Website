import Menu from '../components/Menu'
import About from '../components/About'
import Contact from '../components/Contact'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import { Container } from '@repo/ui/container'
import AnimateOnScroll from '../components/animations/AnimateOnScroll'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="/hero.jpg"
            alt="Restaurant ambiance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>

        <Container className="relative h-full flex items-center">
          <div className="text-white max-w-2xl">
            <motion.h1
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Une expérience gastronomique unique
            </motion.h1>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Découvrez notre cuisine raffinée dans une ambiance chaleureuse et élégante
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href="#reservation"
                className="bg-amber-600 text-white px-8 py-3 rounded-md hover:bg-amber-700 transition-colors inline-block"
              >
                Réserver une table
              </a>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Sections principales */}
      <AnimateOnScroll>
        <Menu />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <Gallery />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <About />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <Testimonials />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <Contact />
      </AnimateOnScroll>
    </>
  )
}