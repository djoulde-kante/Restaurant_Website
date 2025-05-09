import { useState } from 'react'
import { Container } from '@repo/ui/container'
import { motion, AnimatePresence } from 'framer-motion'

const menuCategories = [
  { id: 'entrees', name: 'Entrées' },
  { id: 'plats', name: 'Plats principaux' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'boissons', name: 'Boissons' }
]

const menuItems = {
  entrees: [
    { name: 'Salade César', price: '12.00', description: 'Laitue romaine, croûtons maison, parmesan, sauce césar' },
    { name: 'Soupe à l\'oignon', price: '10.00', description: 'Gratinée au fromage avec croûtons' },
  ],
  plats: [
    { name: 'Entrecôte grillée', price: '28.00', description: 'Sauce au poivre, pommes de terre rôties et légumes' },
    { name: 'Saumon en croûte d\'herbes', price: '26.00', description: 'Riz sauvage et légumes de saison' },
  ],
  desserts: [
    { name: 'Crème brûlée', price: '9.00', description: 'À la vanille de Madagascar' },
    { name: 'Tarte Tatin', price: '8.00', description: 'Servie avec crème glacée à la vanille' },
  ],
  boissons: [
    { name: 'Vin rouge maison', price: '7.00', description: 'Verre de 15cl' },
    { name: 'Eau minérale', price: '4.00', description: 'Plate ou gazeuse 50cl' },
  ],
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('plats')

  return (
    <section className="py-16 bg-white">
      <Container>
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Notre Menu
        </motion.h2>
        
        {/* Catégories */}
        <div className="flex justify-center space-x-4 mb-12">
          {menuCategories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeCategory === category.id
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Liste des plats */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            className="grid gap-8 md:grid-cols-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {menuItems[activeCategory].map((item, index) => (
              <motion.div
                key={index}
                className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <span className="text-amber-600 font-semibold">
                    {item.price}€
                  </span>
                </div>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  )
}