import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => (
  <div className="min-h-screen bg-gray-100">
    <nav className="bg-white shadow">
      <div className="container-custom">
        <div className="flex justify-between h-16 items-center">
          <div className="flex">
            <Link to="/" className="text-xl font-semibold text-restaurant">
              Diko Admin
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link 
              to="/menu" 
              className="text-gray-700 hover:text-restaurant px-3 py-2 rounded-md text-sm font-medium"
            >
              Menu
            </Link>
            <Link 
              to="/reservations" 
              className="text-gray-700 hover:text-restaurant px-3 py-2 rounded-md text-sm font-medium"
            >
              Réservations
            </Link>
            <Link 
              to="/settings" 
              className="text-gray-700 hover:text-restaurant px-3 py-2 rounded-md text-sm font-medium"
            >
              Paramètres
            </Link>
          </div>
        </div>
      </div>
    </nav>
    
    <main className="container-custom py-8">
      <Outlet />
    </main>
  </div>
);

export default Layout;
