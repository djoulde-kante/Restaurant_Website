Voici le **cahier des charges** du projet **DIKO Restaurant** au format **Markdown** :

---

````markdown
# 📘 Cahier des charges – DIKO Restaurant (Admin + Client)

## 1. Présentation générale

**Nom du projet** : DIKO Restaurant  
**Type de projet** : Application web monorepo (admin + client + API)  
**Objectif** : Développer une solution complète de gestion de restaurant avec un dashboard admin (gestion de commandes, menu, stock, personnel…) et un site client public (consultation menu, scan QR code, commandes).

---

## 2. Parties prenantes

- **Oumar** – Chef de projet / Analyse / Documentation
- **Kanté** – Frontend / IA
- **Ibrahim** – Backend / Infrastructure
- **Abdoulaye** – Backend / Sécurité

---

## 3. Stack technique

| Élément       | Technologie                             |
|--------------|------------------------------------------|
| Frontend     | React (Vite), Tailwind CSS               |
| Backend      | Supabase (PostgreSQL, Auth, Realtime)    |
| Authentification | Supabase Auth                        |
| UI/UX        | Tailwind + Framer Motion + Dark/Light    |
| State Mgmt   | Zustand ou Context API                   |
| API          | Supabase Functions (Edge)                |
| Monorepo     | Turborepo                                |
| Design System| `@diko/ui` (lib partagée)                |

---

## 4. Structure du projet

```bash
diko-restaurant/
├── apps/
│   ├── admin/                  # App dashboard admin
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/     # Composants spécifiques admin
│   │   │   ├── pages/          # Pages : /orders, /menu, ...
│   │   │   ├── hooks/          # Hooks (auth, queries Supabase)
│   │   │   ├── layout/         # Navbar, Sidebar, Layout principal
│   │   │   ├── lib/            # Client Supabase
│   │   │   └── index.tsx
│   │   └── vite.config.ts
│   ├── client/                 # App client publique
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── pages/          # Menu, À propos, Commande
│   │   │   └── components/
│   ├── api/                    # Fonctions Supabase edge ou REST
│   │   └── src/
│   └── docs/                   # Documentation, changelog
├── libs/
│   ├── ui/                     # Design system réutilisable
│   ├── utils/                  # Fonctions JS/TS globales
│   └── styles/                 # Config Tailwind partagée
├── packages/
│   ├── eslint-config/
│   └── typescript-config/
├── .env                        # Clés Supabase et autres secrets
├── turbo.json
├── package.json
└── README.md
````

---

## 5. Fonctionnalités prévues

### ADMIN (Dashboard)

* 🔐 Authentification (admin/staff)
* 📊 Dashboard (statistiques, performances, revenus)
* 🛍️ Gestion des commandes
* 🧾 POS (Point of Sale)
* 🍽️ Menu et produits
* 🧩 Variantes et catégories
* 📦 Inventaire
* 💳 Paiements
* 📚 Comptabilité
* 🙋‍♂️ Clients
* 🧑‍🍳 Personnel
* 🖼️ Médias (images produits)
* ⚙️ Paramètres (langue, thème, sécurité)
* 🔗 QR Code dynamique

### CLIENT

* 👀 Consultation menu
* 📱 Scan QR
* 🧾 Commande directe depuis table
* 🎨 Thème responsive

---

## 6. Permissions et rôles

| Rôle  | Accès                                                    |
| ----- | -------------------------------------------------------- |
| Admin | Toutes les fonctionnalités                               |
| Staff | POS, commandes, menu, inventaire (selon les permissions) |

---

## 7. Supabase – Collections principales

* `users` (admin, staff)
* `orders` (commandes clients)
* `products` (plats, boissons)
* `categories` (catégories produits)
* `variants` (taille, options)
* `inventory` (stock réel)
* `payments` (transactions)
* `customers` (infos clients)
* `media` (images uploadées)
* `settings` (configs globales)
* `logs` (audit)

---

## 8. UX/UI

* ✅ Responsive (mobile + desktop)
* 🌙 Mode sombre / clair
* 🔔 Notifications (toast, alerts)
* 🌍 Multi-langue (français / anglais)
* 📥 Upload médias (menu, QR, etc.)
* ✨ Animations douces (Framer Motion)

---

## 9. Sécurité

* 🔐 Auth par rôle (Supabase Auth)
* 🛡️ JWT et Row-Level Security (RLS)
* 🗃️ Validation des données
* 🔍 Logs et suivi des actions

---

## 10. Planning

| Étape                     | Durée estimée | Statut      |
| ------------------------- | ------------- | ----------- |
| 📁 Mise en place monorepo | 1 jour        | ✅ Terminé   |
| ⚙️ Setup Supabase         | 1 jour        | 🟡 En cours |
| 🧱 Construction Admin     | 5-7 jours     | 🔜 À venir  |
| 🧪 Tests / déploiement    | 3 jours       | 🔜          |
| 🧑‍🍳 Construction Client | 5 jours       | 🔜          |

---

## 11. Déploiement

| App    | Cible                   | Outils          |
| ------ | ----------------------- | --------------- |
| Admin  | Netlify / Vercel        | CI/CD Turborepo |
| Client | Netlify / Vercel        |                 |
| API    | Supabase Edge Functions |                 |

---

## 12. Documentation

* Guide installation
* Organisation code
* Permissions & sécurité
* Gestion données Supabase
* Changelog et roadmap

---

## 13. Évolutions futures

* 📱 Application mobile (PWA)
* 📦 Intégration Zettle, Stripe
* 🎯 Recommandation IA
* 📉 Module comptabilité avancée
* 📊 Export Excel / PDF

