import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import MenuManager from './pages/MenuManager';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MenuManager />
      },
      {
        path: 'menu',
        element: <MenuManager />
      },
      {
        path: 'reservations',
        element: (
          <div className="p-8">
            <h1 className="heading-2">Gestion des réservations</h1>
            <p className="paragraph mt-4">Fonctionnalité à venir...</p>
          </div>
        )
      },
      {
        path: 'settings',
        element: (
          <div className="p-8">
            <h1 className="heading-2">Paramètres</h1>
            <p className="paragraph mt-4">Fonctionnalité à venir...</p>
          </div>
        )
      }
    ]
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});
