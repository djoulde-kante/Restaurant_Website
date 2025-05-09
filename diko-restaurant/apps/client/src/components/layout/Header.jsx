import { useState, useEffect } from 'react'
import { Container } from '@repo/ui/container'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold">
            <span className={isScrolled ? 'text-amber-600' : 'text-white'}>
              DIKO Restaurant
            </span>
          </a>

          {/* Navigation */}
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#menu"
                  className={`hover:text-amber-600 transition-colors ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className={`hover:text-amber-600 transition-colors ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  Galerie
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className={`hover:text-amber-600 transition-colors ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  À propos
                </a>
              </li>
              <li>
                <a
                  href="#reservation"
                  className={`
                    px-4 py-2 rounded-md transition-colors
                    ${
                      isScrolled
                        ? 'bg-amber-600 text-white hover:bg-amber-700'
                        : 'bg-white text-amber-600 hover:bg-gray-100'
                    }
                  `}
                >
                  Réserver
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  )
}

export default Header;