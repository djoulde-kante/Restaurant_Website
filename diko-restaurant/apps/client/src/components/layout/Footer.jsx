import { Container } from '@repo/ui/container'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coordonnées */}
          <div>
            <h3 className="text-xl font-semibold mb-4">DIKO Restaurant</h3>
            <address className="not-italic">
              <p>15 Rue du Restaurant</p>
              <p>75003 Paris, France</p>
              <p className="mt-4">Tél : +33 1 23 45 67 89</p>
              <p>Email : contact@restaurant.fr</p>
            </address>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Horaires d'ouverture</h3>
            <ul className="space-y-2">
              <li>Lundi - Vendredi</li>
              <li>Déjeuner : 12h00 - 14h30</li>
              <li>Dîner : 19h00 - 22h30</li>
              <li>Samedi : 12h00 - 23h00</li>
              <li className="text-amber-500">Dimanche : Fermé</li>
            </ul>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="#menu" className="hover:text-amber-500 transition-colors">
                  Notre carte
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-500 transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="#reservation" className="hover:text-amber-500 transition-colors">
                  Réservation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors">
                  Mentions légales
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DIKO Restaurant. Tous droits réservés.</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer;