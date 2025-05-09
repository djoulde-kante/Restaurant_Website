import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MenuManager from './pages/MenuManager';

const Layout = ({ children }) => (
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
      {children}
    </main>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><MenuManager /></Layout>} />
      <Route path="/menu" element={<Layout><MenuManager /></Layout>} />
      <Route path="/reservations" element={
        <Layout>
          <div className="p-8">
            <h1 className="heading-2">Gestion des réservations</h1>
            <p className="paragraph mt-4">Fonctionnalité à venir...</p>
          </div>
        </Layout>
      } />
      <Route path="/settings" element={
        <Layout>
          <div className="p-8">
            <h1 className="heading-2">Paramètres</h1>
            <p className="paragraph mt-4">Fonctionnalité à venir...</p>
          </div>
        </Layout>
      } />
    </Routes>
  );
}

export default App;
