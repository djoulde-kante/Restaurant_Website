import React from 'react';
import { useAuthContext } from '@repo/utils';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';

const Layout = ({ 
  children,
  showNavigation = true,
  showAuth = true
}) => {
  const { isAuthenticated, user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavigation && (
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <img
                    className="h-8 w-auto"
                    src="/logo.svg"
                    alt="Diko Restaurant"
                  />
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    Accueil
                  </Link>
                  <Link
                    to="/menu"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    Menu
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    Contact
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                    >
                      Administration
                    </Link>
                  )}
                </div>
              </div>
              {showAuth && (
                <div className="flex items-center">
                  {isAuthenticated ? (
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-700">
                        {user?.email}
                      </span>
                      <Button
                        variant="secondary"
                        onClick={handleLogout}
                      >
                        Déconnexion
                      </Button>
                    </div>
                  ) : (
                    <div className="space-x-4">
                      <Link to="/login">
                        <Button variant="secondary">
                          Connexion
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button>
                          Inscription
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-center text-base text-gray-400">
              &copy; {new Date().getFullYear()} Diko Restaurant. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;