import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold">Diko Restaurant</span>
              </Link>
            </div>
            <div className="flex space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium">
                Accueil
              </Link>
              <Link to="/menu" className="inline-flex items-center px-1 pt-1 text-sm font-medium">
                Menu
              </Link>
              <Link to="/about" className="inline-flex items-center px-1 pt-1 text-sm font-medium">
                À propos
              </Link>
              <Link to="/contact" className="inline-flex items-center px-1 pt-1 text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center">&copy; {new Date().getFullYear()} Diko Restaurant. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout