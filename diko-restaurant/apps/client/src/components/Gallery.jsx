import { Container } from '@repo/ui/container'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const images = [
  {
    src: '/gallery/plat-1.jpg',
    alt: 'Plat gastronomique 1'
  },
  {
    src: '/gallery/plat-2.jpg',
    alt: 'Plat gastronomique 2'
  },
  {
    src: '/gallery/plat-3.jpg',
    alt: 'Plat gastronomique 3'
  },
  {
    src: '/gallery/ambiance-1.jpg',
    alt: 'Ambiance du restaurant'
  },
  {
    src: '/gallery/ambiance-2.jpg',
    alt: 'Décoration du restaurant'
  }
]

export default function Gallery() {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Notre Galerie
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="gallery-swiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <motion.div 
                  className="relative aspect-[4/3] rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </Container>
    </section>
  )
}