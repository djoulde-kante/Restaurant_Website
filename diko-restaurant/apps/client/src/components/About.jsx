import { Container } from '@repo/ui/container'
import { motion } from 'framer-motion'

const teamMembers = [
  {
    name: 'Jean Dupont',
    role: 'Chef Cuisinier',
    image: '/team/chef.jpg',
    description: 'Fort de 15 ans d\'expérience dans la gastronomie française'
  },
  {
    name: 'Marie Laurent',
    role: 'Chef Pâtissière',
    image: '/team/pastry-chef.jpg',
    description: 'Spécialisée dans les desserts traditionnels français'
  },
  {
    name: 'Pierre Martin',
    role: 'Sommelier',
    image: '/team/sommelier.jpg',
    description: 'Expert en vins et accords mets-vins'
  }
]

export default function About() {
  return (
    <div className="bg-white py-16">
      <Container>
        {/* Histoire */}
        <div className="mb-20">
          <motion.h2 
            className="text-3xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Notre Histoire
          </motion.h2>
          <motion.div 
            className="max-w-3xl mx-auto text-gray-600 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Fondé en 2010, notre restaurant est né d'une passion pour la cuisine traditionnelle française
              et d'un désir de créer une expérience culinaire unique à Paris.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Installés dans un bâtiment historique du Marais, nous avons su préserver le charme de l'ancien
              tout en créant une ambiance contemporaine et chaleureuse.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Notre philosophie est simple : utiliser les meilleurs produits locaux et de saison pour créer
              des plats qui respectent la tradition tout en y apportant une touche de modernité.
            </motion.p>
          </motion.div>
        </div>

        {/* Équipe */}
        <div>
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Notre Équipe
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name} 
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-amber-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}