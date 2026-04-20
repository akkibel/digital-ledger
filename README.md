# Digital Ledger — Grocery Manager

A mobile-first Progressive Web App (PWA) for managing client accounts, debts, payments, and product catalog for small retail businesses.

---

## Features

### Client Management
- Register clients with name and optional phone number.
- View each client's **total balance** in real time.
- Record individual debts and payments, or settle the full balance in one tap.
- Instant search and filter by client name.
- Delete clients along with their full transaction history.

### Transactions
- Log debts with amount, description, and automatic timestamp.
- Register partial or full payments.
- Built-in **weight calculator**: enter kilograms and price per kg to compute the total automatically.
- Negative balance display when payments exceed debts (credit in favor).

### Product Catalog
- Organize products into custom **subcategories** (e.g. Dairy, Deli, Beverages).
- Add products with name, price, and optional photo (camera or gallery).
- Search products across all categories.
- Delete individual products or entire subcategories.

### Shopping List
- Maintain a quick list of items that need restocking.
- Mark items as purchased with a single tap.
- Remove items individually.

### WhatsApp Integration
- Generate a pre-formatted WhatsApp message for any client showing their current balance and recent transactions.

### Multi-Currency and Multi-Language
- Supports **Spanish** and **English** interfaces.
- Select your country during setup; the currency symbol is applied automatically across the entire app.

| Country | Currency |
|---|---|
| Paraguay | ₲ |
| Argentina, Mexico, Colombia, Chile, USA | $ |
| Spain | € |
| Peru | S/ |
| Brazil | R$ |

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | Component-based UI |
| [TypeScript](https://www.typescriptlang.org/) | Static typing |
| [Vite 8](https://vite.dev/) | Build tooling and dev server |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [Lucide React](https://lucide.dev/) | Icon library |
| PWA (Service Worker) | Installable, offline-capable |
| `localStorage` | Client-side data persistence, no backend required |

---

## Project Structure

```
DSSC/
├── public/
│   ├── manifest.json           # PWA manifest
│   └── sw.js                   # Service Worker
├── src/
│   ├── components/
│   │   ├── Setup.tsx           # Initial configuration screen
│   │   ├── Dashboard.tsx       # Main client dashboard
│   │   ├── TransactionModal.tsx # Debt and payment modal
│   │   ├── NewClientModal.tsx  # Add client modal
│   │   ├── Catalog.tsx         # Product catalog
│   │   ├── ProductModal.tsx    # Add product modal
│   │   └── MissingItems.tsx    # Restock list
│   ├── hooks/
│   │   └── useLocalStorage.ts  # Persistent state hook
│   ├── i18n/
│   │   └── index.ts            # EN/ES translations
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
git clone https://github.com/akkibel/digital-ledger.git
cd digital-ledger/DSSC
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

Output files will be generated in the `dist/` directory.

---

## Deployment on Vercel

This project is configured for deployment on [Vercel](https://vercel.com).

> **Note:** Since the application lives inside the `DSSC/` subdirectory, the Vercel **Root Directory** must be configured correctly:
> 1. Go to your project's **Settings > General**.
> 2. Set **Root Directory** to `DSSC`.
> 3. Save and redeploy.

---

## Data and Privacy

All data — clients, transactions, and products — is stored **exclusively on the user's device** via `localStorage`. No data is transmitted to any external server.

---

## Roadmap

- [ ] Export transaction history to PDF or CSV
- [ ] Optional cloud sync
- [ ] Debt analytics and reporting charts
- [ ] Payment reminder notifications
- [ ] Edit existing transactions

---

## License

Private use only. All rights reserved.
