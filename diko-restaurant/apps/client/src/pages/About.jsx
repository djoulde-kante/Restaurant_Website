export default function About() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              À propos de DIKO Restaurant
            </h1>
            <p className="mt-4 text-gray-500">
              DIKO Restaurant est né d'une passion pour la cuisine authentique et le service de qualité. 
              Notre mission est de vous offrir une expérience culinaire unique dans un cadre chaleureux 
              et convivial.
            </p>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">Notre Histoire</h2>
              <p className="mt-4 text-gray-500">
                Fondé en 2023, DIKO Restaurant s'est rapidement imposé comme une référence dans la 
                restauration locale. Notre équipe passionnée travaille chaque jour pour vous proposer 
                des plats savoureux préparés avec des ingrédients frais et de qualité.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">Notre Engagement</h2>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-lg font-medium text-gray-900">Qualité</dt>
                  <dd className="mt-2 text-gray-500">
                    Nous sélectionnons rigoureusement nos ingrédients auprès de producteurs locaux.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg font-medium text-gray-900">Service</dt>
                  <dd className="mt-2 text-gray-500">
                    Notre équipe est formée pour vous offrir un service attentionné et personnalisé.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg font-medium text-gray-900">Innovation</dt>
                  <dd className="mt-2 text-gray-500">
                    Nous renouvelons régulièrement notre carte pour vous surprendre avec de nouvelles saveurs.
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
            <div className="space-y-12">
              <div className="aspect-w-3 aspect-h-2">
                <img
                  src="/restaurant.jpg"
                  alt="Restaurant interior"
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src="/chef.jpg"
                    alt="Our chef"
                    className="rounded-lg object-cover shadow-lg"
                  />
                </div>
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src="/food.jpg"
                    alt="Food presentation"
                    className="rounded-lg object-cover shadow-lg"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">Horaires d'ouverture</h2>
              <dl className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Lundi - Vendredi</dt>
                  <dd className="text-gray-900">11:30 - 14:30, 18:30 - 22:30</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Samedi</dt>
                  <dd className="text-gray-900">18:30 - 23:00</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Dimanche</dt>
                  <dd className="text-gray-900">11:30 - 15:00</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
