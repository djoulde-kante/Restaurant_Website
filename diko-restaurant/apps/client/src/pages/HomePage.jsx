import React from 'react';
import { Button, Card } from '@repo/ui';
import { formatPrice } from '@repo/utils';

const featuredDishes = [
  {
    id: 1,
    name: 'Couscous Royal',
    description: 'Un délicieux couscous aux légumes frais, accompagné de viandes variées',
    price: 24.90,
    image: '/images/couscous.jpg'
  },
  {
    id: 2,
    name: 'Tajine d\'Agneau',
    description: 'Tajine traditionnel aux pruneaux et amandes, viande fondante',
    price: 22.90,
    image: '/images/tajine.jpg'
  }
];

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-restaurant-light py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-1 mb-6">
              Découvrez une expérience culinaire unique
            </h1>
            <p className="paragraph mb-8">
              Une cuisine authentique qui mélange tradition et modernité, dans un cadre chaleureux et élégant.
            </p>
            <Button size="lg">
              Réserver une table
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="heading-2 mb-12 text-center">Nos Plats Signature</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredDishes.map((dish) => (
              <Card key={dish.id} className="overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                  <p className="paragraph mb-4">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-restaurant">
                      {formatPrice(dish.price)}
                    </span>
                    <Button variant="outline" size="sm">
                      En savoir plus
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;