import { Link } from 'react-router-dom'
import { useMenu } from '@repo/utils'

export default function Home() {
  const { categories, loading } = useMenu()

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  DIKO Restaurant
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Découvrez une expérience culinaire unique mêlant tradition et modernité. Nos plats sont préparés avec des ingrédients frais et locaux.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    to="/menu"
                    className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    Voir le menu
                  </Link>
                  <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900">
                    En savoir plus <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
            src="/hero-image.jpg"
            alt="Restaurant interior"
          />
        </div>
      </div>

      {/* Featured Categories */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Nos spécialités</h2>
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {loading ? (
              <div>Chargement...</div>
            ) : (
              categories.slice(0, 3).map((category) => (
                <div key={category.id} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={category.image_url || 'https://via.placeholder.com/800x600'}
                      alt={category.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <Link to={`/menu?category=${category.id}`}>
                      <span className="absolute inset-0" />
                      {category.name}
                    </Link>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">
                    {category.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">
              Pourquoi nous choisir ?
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Une expérience unique
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Nous mettons tout en œuvre pour vous offrir le meilleur service possible.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  Qualité premium
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Des ingrédients soigneusement sélectionnés et des recettes authentiques.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  Service rapide
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Commandez facilement en ligne et profitez d'un service rapide sur place.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  Ambiance chaleureuse
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Un cadre agréable et un personnel attentionné pour votre confort.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}