import { Container } from '@repo/ui/container'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Sophie Martin',
    role: 'Cliente régulière',
    content: 'Une expérience gastronomique exceptionnelle. Les plats sont délicieux et le service est impeccable.',
    image: '/testimonials/sophie.jpg'
  },
  {
    name: 'Thomas Dubois',
    role: 'Critique culinaire',
    content: 'Un véritable joyau de la gastronomie française. La créativité du chef est remarquable.',
    image: '/testimonials/thomas.jpg'
  },
  {
    name: 'Julie Leroy',
    role: 'Blogueuse food',
    content: 'L\'ambiance est chaleureuse et les plats sont un festival de saveurs. Je recommande vivement !',
    image: '/testimonials/julie.jpg'
  }
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ce que disent nos clients
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}