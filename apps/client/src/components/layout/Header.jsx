import { useState } from 'react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center">
              <i className="bi bi-phone text-primary"></i>
              <span className="ml-2">+1 5589 55488 55</span>
            </div>
            <div className="flex items-center">
              <i className="bi bi-clock text-primary"></i>
              <span className="ml-2">Mon-Sat: 11:00 AM - 23:00 PM</span>
            </div>
          </div>
          <a href="#book-a-table" className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition-colors">
            Book a table
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-t border-gray-100">
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
          <a href="/" className="flex items-center">
            <h1 className="text-2xl font-satisfy text-primary">Delicious</h1>
          </a>

          <nav className={`lg:block ${isMenuOpen ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col lg:flex-row lg:space-x-8">
              <li><a href="#hero" className="text-primary hover:text-primary-dark">Home</a></li>
              <li><a href="#about" className="hover:text-primary">About</a></li>
              <li><a href="#menu" className="hover:text-primary">Menu</a></li>
              <li><a href="#specials" className="hover:text-primary">Specials</a></li>
              <li><a href="#events" className="hover:text-primary">Events</a></li>
              <li><a href="#chefs" className="hover:text-primary">Chefs</a></li>
              <li><a href="#gallery" className="hover:text-primary">Gallery</a></li>
              <li><a href="#contact" className="hover:text-primary">Contact</a></li>
            </ul>
          </nav>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-2xl"
          >
            <i className="bi bi-list"></i>
          </button>
        </div>
      </div>
    </header>
  );
};